

// Configuration
const API_KEY = process.env.STREAM_API_KEY;
const API_SECRET = process.env.STREAM_API_SECRET;

// Helper to base64url decode
function base64UrlDecode(str: string) {
  let b64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (b64.length % 4) {
    b64 += "=";
  }
  try {
    return atob(b64);
  } catch {
    throw new Error("Invalid base64 string: " + str);
  }
}

// Verify Clerk JWT using JWKS
async function verifyClerkToken(token: string): Promise<{ userId: string } | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      console.warn("Invalid JWT format (must have 3 parts)");
      return null;
    }

    const [headerB64, payloadB64, signatureB64] = parts;

    const header = JSON.parse(base64UrlDecode(headerB64));
    const payload = JSON.parse(base64UrlDecode(payloadB64));

    // Verify expiration
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && now > payload.exp) {
      console.warn("Clerk token expired");
      return null;
    }

    // Retrieve JWKS from Clerk
    const issuer = payload.iss || "https://quiet-caiman-21.clerk.accounts.dev";
    const jwksRes = await fetch(`${issuer}/.well-known/jwks.json`);
    if (!jwksRes.ok) {
      console.error("Failed to fetch Clerk JWKS from issuer: " + issuer);
      return null;
    }
    const { keys } = await jwksRes.json();
    const jwk = keys.find((key: any) => key.kid === header.kid);
    if (!jwk) {
      console.error("Matching JWK not found for kid:", header.kid);
      return null;
    }

    // Import JWK key using Web Crypto
    const key = await crypto.subtle.importKey(
      "jwk",
      jwk,
      {
        name: "RSASSA-PKCS1-v1_5",
        hash: "SHA-256",
      },
      false,
      ["verify"]
    );

    // Verify signature
    const data = new TextEncoder().encode(`${headerB64}.${payloadB64}`);
    const signatureStr = base64UrlDecode(signatureB64);
    const signatureBytes = new Uint8Array(
      signatureStr.split("").map((c) => c.charCodeAt(0))
    );

    const isValid = await crypto.subtle.verify(
      "RSASSA-PKCS1-v1_5",
      key,
      signatureBytes,
      data
    );

    if (!isValid) {
      console.error("Clerk JWT signature verification failed");
      return null;
    }

    return { userId: payload.sub };
  } catch (error) {
    console.error("Error verifying Clerk token:", error);
    return null;
  }
}

// Generate HS256 JWT using Web Crypto (HMAC-SHA256)
async function signToken(payload: any, apiSecret: string): Promise<string> {
  const header = { alg: "HS256", typ: "JWT" };
  
  const base64UrlEncode = (obj: any) => {
    const str = JSON.stringify(obj);
    const bytes = new TextEncoder().encode(str);
    return btoa(String.fromCharCode(...bytes))
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  };

  const encodedHeader = base64UrlEncode(header);
  const encodedPayload = base64UrlEncode(payload);
  const dataToSign = `${encodedHeader}.${encodedPayload}`;

  const keyBytes = new TextEncoder().encode(apiSecret);
  const dataBytes = new TextEncoder().encode(dataToSign);

  const key = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", key, dataBytes);
  const signatureArray = new Uint8Array(signature);
  const encodedSignature = btoa(String.fromCharCode(...signatureArray))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return `${dataToSign}.${encodedSignature}`;
}

export async function POST(request: Request) {
  try {
    if (!API_KEY || !API_SECRET) {
      return Response.json(
        { error: "Stream API credentials are not set on server" },
        { status: 500 }
      );
    }

    // Authenticate Clerk session
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return Response.json({ error: "Missing or invalid Authorization header" }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const verified = await verifyClerkToken(token);
    if (!verified) {
      return Response.json({ error: "Invalid Clerk authentication token" }, { status: 401 });
    }

    const { userId } = verified;

    // Parse request body
    const body = await request.json();
    const { lessonId, languageId, userName, userImage } = body;

    if (!lessonId || !languageId) {
      return Response.json({ error: "Missing lessonId or languageId" }, { status: 400 });
    }

    // Generate callId based on user, language and lesson, sanitized for Stream Call ID constraints: [a-zA-Z0-9_-]
    const cleanUserId = userId.replace(/[^a-zA-Z0-9_-]/g, "");
    const cleanLessonId = lessonId.replace(/[^a-zA-Z0-9_-]/g, "");
    const cleanLanguageId = languageId.replace(/[^a-zA-Z0-9_-]/g, "");
    
    // Include timestamp to make it unique per session but trackable
    const sessionTime = Date.now();
    const callId = `call-${cleanUserId}-${cleanLanguageId}-${cleanLessonId}-${sessionTime}`;
    const callType = "default";

    // Generate tokens
    const now = Math.floor(Date.now() / 1000);
    const userToken = await signToken(
      {
        user_id: userId,
        iat: now - 60, // allow 1 min clock drift
        exp: now + 3600 * 4, // 4 hours
      },
      API_SECRET
    );

    const serverToken = await signToken(
      {
        server: true,
        iat: now - 60,
        exp: now + 3600 * 4,
      },
      API_SECRET
    );

    // Call Stream Video REST API to pre-create the call
    const createCallUrl = `https://video.stream-io-api.com/api/v2/video/call/${callType}/${callId}?api_key=${API_KEY}`;
    const streamResponse = await fetch(createCallUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "stream-auth-type": "jwt",
        "Authorization": serverToken,
      },
      body: JSON.stringify({
        data: {
          created_by_id: userId,
          members: [
            { user_id: userId, role: "admin" }
          ],
          custom: {
            lessonId,
            languageId,
            userName: userName || "Learner",
            userImage: userImage || "",
            sessionTime,
          }
        }
      })
    });

    if (!streamResponse.ok) {
      const errorText = await streamResponse.text();
      console.error("Stream REST API error: " + errorText);
      return Response.json(
        { error: "Failed to create call on Stream Video: " + errorText },
        { status: streamResponse.status }
      );
    }

    return Response.json({
      apiKey: API_KEY,
      token: userToken,
      callId,
      callType,
      userId,
      userName: userName || "Learner",
      userImage: userImage || "",
    });
  } catch (err: any) {
    console.error("API error: ", err);
    return Response.json({ error: "Internal server error: " + err.message }, { status: 500 });
  }
}
