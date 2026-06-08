import { images } from "@/constants/images";
import PrimaryButton from "@/components/PrimaryButton";
import { Link } from "expo-router";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Onboarding() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.brandRow}>
          <Image source={images.mascotLogo} style={styles.logo} resizeMode="contain" />
          <Text style={styles.brandText}>lingua</Text>
        </View>

        <View style={styles.heroContent}>
          <Text style={styles.title}>
            Your AI language
            <Text style={styles.titleAccent}> teacher.</Text>
          </Text>
          <Text style={styles.subtitle}>Real conversations, personalized lessons, anytime, anywhere.</Text>
        </View>

        <Image source={images.onboardingIllustration} style={styles.illustration} resizeMode="contain" />

        <View style={styles.actions}>
          <Link href="/sign-up" asChild>
            <PrimaryButton text="Get Started" />
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  logo: {
    width: 40,
    height: 40,
  },
  brandText: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
    marginLeft: 8,
  },
  heroContent: {
    marginTop: 24,
    alignItems: "center",
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: "#0f172a",
    textAlign: "center",
    lineHeight: 44,
  },
  titleAccent: {
    color: "#5b21b6",
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 16,
    lineHeight: 24,
    maxWidth: 320,
  },
  illustration: {
    width: "100%",
    height: 320,
  },
  actions: {
    marginTop: 16,
  },
});
