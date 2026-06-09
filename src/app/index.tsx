import { useClerk, useUser } from "@clerk/expo";
import { images } from "@/constants/images";
import PrimaryButton from "@/components/PrimaryButton";
import { Link, useRouter } from "expo-router";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import { useLanguageStore } from "@/store/useLanguageStore";

export default function Index() {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const isAuthenticated = Boolean(user);
  const name = user?.firstName || user?.fullName || "Learner";
  
  const selectedLanguageId = useLanguageStore((state) => state.selectedLanguageId);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      if (!selectedLanguageId) {
        router.replace("/choose-language");
      } else {
        router.replace("/(tabs)/home");
      }
    }
  }, [isLoaded, isSignedIn, selectedLanguageId, router]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.brandRow}>
          <Image source={images.mascotLogo} style={styles.logo} resizeMode="contain" />
          <Text style={styles.brandText}>Lingua</Text>
        </View>

        <View style={styles.content}>
          <Image
            source={images.onboardingIllustration}
            style={styles.heroImage}
            resizeMode="contain"
          />
          <Text style={styles.title}>
            {isAuthenticated ? `Welcome back, ${name}` : "Learn a language in a fun way"}
          </Text>

          <Text style={styles.subtitle}>
            {isAuthenticated
              ? "Your lessons are ready. Continue your streak and keep learning."
              : "Master new vocabulary and grammar with our interactive lessons."}
          </Text>
        </View>

        <View style={styles.actions}>
          {isAuthenticated ? (
            <>
              <Link href="/choose-language" asChild>
                <PrimaryButton text="Continue learning" />
              </Link>
              <PrimaryButton
                text="Sign out"
                style={styles.signOutButton}
                onPress={() => signOut()}
              />
            </>
          ) : (
            <>
              <Link href="/sign-up" asChild>
                <PrimaryButton text="Get Started" />
              </Link>
              <Link href="/onboarding" style={styles.secondaryLink}>
                View onboarding preview
              </Link>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 16,
  },
  logo: {
    width: 40,
    height: 40,
  },
  brandText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000000",
  },
  content: {
    alignItems: "center",
  },
  heroImage: {
    width: 300,
    height: 300,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000000",
    textAlign: "center",
    marginTop: 32,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 16,
    maxWidth: 320,
    lineHeight: 24,
  },
  actions: {
    width: "100%",
  },
  secondaryLink: {
    marginTop: 16,
    color: "#4f46e5",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  signOutButton: {
    marginTop: 16,
    backgroundColor: "#f3f4f6",
  },
});
