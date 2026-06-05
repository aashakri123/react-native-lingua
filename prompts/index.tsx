import { Link } from "expo-router";
import { Text, View } from "react-native";

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home Screen</Text>
      <Link href="/onboarding">Go to Onboarding</Link>
    </View>
  );
};

export default HomeScreen;