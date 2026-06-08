import { images } from "@/constants/images";
import PrimaryButton from "@/components/PrimaryButton";
import VerificationModal from "@/components/VerificationModal";
import { ensureClerkCaptchaElement } from "@/lib/clerkCaptcha";
import { useSignUp, useSSO, useAuth } from "@clerk/expo";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import {
    Image,
    Platform,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";

const socialStrategies: Record<string, string> = {
  google: "oauth_google",
  facebook: "oauth_facebook",
  apple: "oauth_apple",
};

export default function SignUp() {
  const router = useRouter();
  const { signUp } = useSignUp() as any;
  const { startSSOFlow } = useSSO();
  const { isSignedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [verificationVisible, setVerificationVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/");
    }
  }, [isSignedIn]);

  const handleSignUp = async () => {
    if (!email || !password || !signUp) {
      setErrorMessage("Please enter your email and password.");
      return;
    }

    ensureClerkCaptchaElement();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const result = await (signUp as any).password({ emailAddress: email, password });
      if (result.error) {
        setErrorMessage(result.error.message || "Unable to create your account.");
        return;
      }

      const sendResult = await (signUp as any).verifications.sendEmailCode();
      if (sendResult.error) {
        setErrorMessage(sendResult.error.message || "Unable to send verification code.");
        return;
      }

      setVerificationVisible(true);
    } catch {
      setErrorMessage("Something went wrong while creating your account.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialAuth = async (provider: string) => {
    if (!startSSOFlow) {
      setErrorMessage("Authentication is not ready yet.");
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const strategy = socialStrategies[provider] as any;
      if (!strategy) {
        setErrorMessage("That social provider is not supported.");
        return;
      }

      const redirectUrl = Platform.OS === "web"
        ? Linking.createURL("/")
        : Linking.createURL("/", { scheme: "doulingoclone" });

      const { createdSessionId, setActive } = await startSSOFlow({
        strategy,
        redirectUrl,
      });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.replace("/");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Social sign up failed. Please try another option.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerification = async (code: string) => {
    if (!signUp) {
      setErrorMessage("Verification is not available.");
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const verificationResult = await (signUp as any).verifications.verifyEmailCode({ code });
      if (verificationResult.error) {
        setErrorMessage(verificationResult.error.message || "Invalid code. Please try again.");
        return;
      }

      const finalizeResult = await (signUp as any).finalize();
      if (finalizeResult.error) {
        setErrorMessage(finalizeResult.error.message || "Unable to complete sign-up.");
        return;
      }

      router.replace("/");
    } catch {
      setErrorMessage("There was a problem verifying your code.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} hitSlop={8}>
            <AntDesign name="left" size={24} color="#111827" />
          </Pressable>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Create your account</Text>
          <Text style={styles.subtitle}>
            Start your language journey today <Text style={styles.emoji}>✨</Text>
          </Text>

          <View style={styles.mascotContainer}>
            <Image
              source={images.mascotAuth}
              style={styles.mascot}
              resizeMode="contain"
            />
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="alex@gmail.com"
                placeholderTextColor="#9ca3af"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Enter password"
                  placeholderTextColor="#9ca3af"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <Pressable
                  onPress={() => setShowPassword(!showPassword)}
                  hitSlop={8}
                >
                  <AntDesign
                    name={showPassword ? "eye" : "eye-invisible"}
                    size={20}
                    color="#9ca3af"
                  />
                </Pressable>
              </View>
            </View>

            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

            <PrimaryButton
              text={isSubmitting ? "Creating account..." : "Sign Up"}
              style={styles.signUpButton}
              onPress={handleSignUp}
            />
          </View>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.socialButtons}>
            <Pressable
              style={styles.socialButton}
              onPress={() => handleSocialAuth("google")}
            >
              <Image source={images.googleLogo} style={styles.socialIcon} resizeMode="contain" />
              <Text style={styles.socialText}>Continue with Google</Text>
            </Pressable>

            <Pressable
              style={styles.socialButton}
              onPress={() => handleSocialAuth("facebook")}
            >
              <Image source={images.facebookLogo} style={styles.socialIcon} resizeMode="contain" />
              <Text style={styles.socialText}>Continue with Facebook</Text>
            </Pressable>

            <Pressable
              style={styles.socialButton}
              onPress={() => handleSocialAuth("apple")}
            >
              <Image source={images.appleLogo} style={styles.socialIcon} resizeMode="contain" />
              <Text style={styles.socialText}>Continue with Apple</Text>
            </Pressable>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <Pressable onPress={() => router.push("/sign-in")}>
              <Text style={styles.footerLink}>Log in</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <VerificationModal
        visible={verificationVisible}
        email={email}
        onClose={() => setVerificationVisible(false)}
        onVerify={handleVerification}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 24,
    lineHeight: 24,
  },
  emoji: {
    fontSize: 18,
  },
  mascotContainer: {
    alignItems: "center",
    marginBottom: 32,
    height: 200,
  },
  mascot: {
    width: "100%",
    height: "100%",
  },
  form: {
    gap: 20,
    marginBottom: 32,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#9ca3af",
  },
  input: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#111827",
    backgroundColor: "#f9fafb",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    paddingHorizontal: 16,
    backgroundColor: "#f9fafb",
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: "#111827",
  },
  signUpButton: {
    marginTop: 8,
  },
  errorText: {
    color: "#dc2626",
    fontSize: 14,
    marginBottom: 12,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    gap: 12,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#e5e7eb",
  },
  dividerText: {
    fontSize: 14,
    color: "#9ca3af",
  },
  socialButtons: {
    gap: 12,
    marginBottom: 32,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#f9fafb",
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  socialText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: 16,
    color: "#6b7280",
  },
  footerLink: {
    fontSize: 16,
    fontWeight: "700",
    color: "#4f46e5",
  },
});
