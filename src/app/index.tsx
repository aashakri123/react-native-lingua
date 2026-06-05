import { images } from "@/app/constants/images";
import PrimaryButton from "@/components/PrimaryButton";
import { Link } from "expo-router";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.brandRow}>
          <Image source={images.mascotLogo} style={styles.logo} resizeMode="contain" />
          <Text style={styles.brandText}>lingua</Text>
        </View>

        <View style={styles.content}>
          <Image
            source={images.onboardingIllustration}
            style={styles.heroImage}
            resizeMode="contain"
          />
          <Text style={styles.title}>Learn a language in a fun way</Text>
          <Text style={styles.subtitle}>
            Master new vocabulary and grammar with our interactive lessons.
          </Text>
        </View>

        <View style={styles.actions}>
          <Link href="/sign-up" asChild>
            <PrimaryButton text="Get Started" />
          </Link>
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
});
