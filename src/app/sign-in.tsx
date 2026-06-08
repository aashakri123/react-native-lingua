import { images } from "@/app/constants/images";
import PrimaryButton from "@/components/PrimaryButton";
import VerificationModal from "@/components/VerificationModal";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Image,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [verificationVisible, setVerificationVisible] = useState(false);

  const handleSignIn = () => {
    if (email) {
      setVerificationVisible(true);
    }
  };

  const handleSocialAuth = (provider: string) => {
    setVerificationVisible(true);
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
          <Text style={styles.title}>Sign in to your account</Text>
          <Text style={styles.subtitle}>
            Welcome back, let's continue learning <Text style={styles.emoji}>👋</Text>
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

            <PrimaryButton
              text="Sign In"
              style={styles.signInButton}
              onPress={handleSignIn}
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
              <Text style={styles.socialIcon}>🔍</Text>
              <Text style={styles.socialText}>Continue with Google</Text>
            </Pressable>

            <Pressable
              style={styles.socialButton}
              onPress={() => handleSocialAuth("facebook")}
            >
              <Text style={styles.socialIcon}>f</Text>
              <Text style={styles.socialText}>Continue with Facebook</Text>
            </Pressable>

            <Pressable
              style={styles.socialButton}
              onPress={() => handleSocialAuth("apple")}
            >
              <Text style={styles.socialIcon}>🍎</Text>
              <Text style={styles.socialText}>Continue with Apple</Text>
            </Pressable>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <Pressable onPress={() => router.push("/sign-up")}>
              <Text style={styles.footerLink}>Create one</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <VerificationModal
        visible={verificationVisible}
        email={email}
        onClose={() => setVerificationVisible(false)}
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
  signInButton: {
    marginTop: 8,
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
    fontSize: 20,
    marginRight: 12,
    width: 24,
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
