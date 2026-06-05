import { StyleSheet, Text, TouchableOpacity, type TextStyle, type TouchableOpacityProps } from "react-native";

type PrimaryButtonProps = Omit<TouchableOpacityProps, "children"> & {
  text: string;
  textStyle?: TextStyle;
};

export default function PrimaryButton({ text, style, textStyle, ...props }: PrimaryButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, style]} activeOpacity={0.8} {...props}>
      <Text style={[styles.buttonText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: "#4f46e5",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});
