import { useEffect, useRef, useState } from "react";
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";

interface VerificationModalProps {
  visible: boolean;
  email: string;
  onClose: () => void;
  onVerify: (code: string) => void;
}

export default function VerificationModal({
  visible,
  email,
  onClose,
  onVerify,
}: VerificationModalProps) {
  const [code, setCode] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (visible && inputRef.current) {
      inputRef.current.focus();
    }

    if (!visible) {
      setCode("");
      setHasSubmitted(false);
    }
  }, [visible]);

  useEffect(() => {
    if (code.length === 6 && !hasSubmitted) {
      setHasSubmitted(true);
      onVerify(code);
    }

    if (code.length < 6 && hasSubmitted) {
      setHasSubmitted(false);
    }
  }, [code, hasSubmitted, onVerify]);

  const handleCodeChange = (text: string) => {
    const numbers = text.replace(/[^0-9]/g, "").slice(0, 6);
    setCode(numbers);
  };

  const renderCodeDots = () => {
    const dots = [];
    for (let i = 0; i < 6; i++) {
      dots.push(
        <View key={i} style={styles.digitBox}>
          <Text style={styles.digitText}>{code[i] ? "•" : ""}</Text>
        </View>
      );
    }
    return dots;
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.overlay}>
          <View style={styles.content}>
            <Text style={styles.title}>Verify your email</Text>
            <Text style={styles.subtitle}>
              We've sent a verification code to{"\n"}
              <Text style={styles.email}>{email}</Text>
            </Text>

            <Pressable
              style={styles.codeInputContainer}
              onPress={() => inputRef.current?.focus()}
            >
              <TextInput
                ref={inputRef}
                style={styles.hiddenInput}
                value={code}
                onChangeText={handleCodeChange}
                keyboardType="number-pad"
                maxLength={6}
                textContentType="oneTimeCode"
                autoFocus={visible}
              />
              <View style={styles.digitBoxes}>{renderCodeDots()}</View>
            </Pressable>

            <Text style={styles.helperText}>Enter 6-digit code</Text>
            <Pressable style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  content: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
    minHeight: 350,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },
  email: {
    fontWeight: "700",
    color: "#111827",
  },
  codeInputContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    width: "100%",
    minHeight: 56,
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0,
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
  },
  digitBoxes: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  digitBox: {
    width: 48,
    height: 56,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#e5e7eb",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9fafb",
  },
  digitText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },
  helperText: {
    fontSize: 14,
    color: "#9ca3af",
    textAlign: "center",
    marginBottom: 20,
  },
  closeButton: {
    alignSelf: "center",
    marginTop: 8,
  },
  closeText: {
    fontSize: 16,
    color: "#4f46e5",
    fontWeight: "700",
  },
});
