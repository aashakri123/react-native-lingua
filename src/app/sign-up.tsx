import React from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import { Link } from "expo-router";

export default function SignUp() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Sign up for muolingo</Text>
        <Text style={styles.subtitle}>
          Create your account and start learning new words today.
        </Text>
        <Link href="/" style={styles.link}>Go back</Link>
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
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },
  link: {
    color: "#4f46e5",
    fontSize: 16,
    fontWeight: "700",
  },
});
