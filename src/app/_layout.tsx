import { useEffect, useRef } from "react";
import { ClerkProvider, useUser } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { Stack } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { PostHogProvider, usePostHog } from "posthog-react-native";

import { posthog } from "@/lib/posthog";
import { useLanguageStore } from "@/store/useLanguageStore";

WebBrowser.maybeCompleteAuthSession();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;

if (!publishableKey) {
  throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your environment.");
}

function PostHogAuthTracker() {
  const { isLoaded, isSignedIn, user } = useUser();
  const ph = usePostHog();
  const selectedLanguageId = useLanguageStore((state) => state.selectedLanguageId);
  const lastIdentifiedUser = useRef<string | null>(null);
  const lastLanguage = useRef<string | null>(null);

  useEffect(() => {
    if (isLoaded && isSignedIn && user?.id && ph) {
      const hasUserChanged = lastIdentifiedUser.current !== user.id;
      const hasLanguageChanged = lastLanguage.current !== selectedLanguageId;

      if (hasUserChanged || hasLanguageChanged) {
        ph.identify(
          user.id,
          {
            preferred_language: selectedLanguageId,
            $set_once: { signup_date: new Date().toISOString() }
          }
        );

        lastIdentifiedUser.current = user.id;
        lastLanguage.current = selectedLanguageId;
      }
    } else if (isLoaded && !isSignedIn && ph && lastIdentifiedUser.current) {
      ph.reset();
      lastIdentifiedUser.current = null;
      lastLanguage.current = null;
    }
  }, [isLoaded, isSignedIn, user?.id, selectedLanguageId, ph]);

  return null;
}

export default function RootLayout() {
  return (
    <PostHogProvider client={posthog}>
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <PostHogAuthTracker />
        <Stack screenOptions={{ headerShown: false }} />
      </ClerkProvider>
    </PostHogProvider>
  );
}
