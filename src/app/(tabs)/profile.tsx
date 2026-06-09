import { useClerk, useUser } from "@clerk/expo";
import PrimaryButton from "@/components/PrimaryButton";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const name = user?.firstName || user?.fullName || "Learner";

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>{name[0]?.toUpperCase() || "L"}</Text>
          </View>
          <Text style={styles.name}>{name}</Text>
        </View>

        <View style={styles.actions}>
          <PrimaryButton
            text="Sign out"
            style={styles.signOutButton}
            onPress={() => signOut()}
          />
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
    padding: 24,
    justifyContent: "space-between",
  },
  profileHeader: {
    alignItems: "center",
    marginTop: 20,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f5f3ff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#e0d7ff",
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#6366f1",
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 4,
  },
  actions: {
    width: "100%",
    marginBottom: 20,
  },
  signOutButton: {
    backgroundColor: "#f1f5f9",
  },
});
