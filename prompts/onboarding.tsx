import { images } from "@/constants/images";
import PrimaryButton from "@/components/PrimaryButton";
import { router } from "expo-router";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Onboarding = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white" }}
      className="bg-white"
    >
      <View className="flex-1 items-center justify-between p-6">
        <View className="flex-row items-center justify-center gap-2 mt-4">
          <Image
            source={images.mascotLogo}
            className="w-10 h-10"
            resizeMode="contain"
          />
          <Text className="text-3xl font-bold text-black">muolingo</Text>
        </View>

        <View className="items-center">
          <Image
            source={images.onboardingIllustration}
            className="w-[300px] h-[300px]"
            resizeMode="contain"
          />
          <Text className="text-3xl font-bold text-center mt-8 text-black">
            Learn a language in a fun way
          </Text>
          <Text className="text-base text-gray-500 text-center mt-4">
            Master new vocabulary and grammar with our interactive lessons.
          </Text>
        </View>

        <View className="w-full">
          <PrimaryButton
            text="Get Started"
            onPress={() => router.push("/sign-up")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;