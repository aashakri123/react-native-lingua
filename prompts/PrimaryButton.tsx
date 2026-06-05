import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface PrimaryButtonProps extends TouchableOpacityProps {
  text: string;
}

const PrimaryButton = ({ text, ...props }: PrimaryButtonProps) => {
  return (
    <TouchableOpacity
      className="bg-primary-default h-[58px] rounded-2xl justify-center items-center"
      activeOpacity={0.8}
      {...props}
    >
      <Text className="text-white font-bold text-lg leading-5">
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;