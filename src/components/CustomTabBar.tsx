import React, { useEffect } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  useDerivedValue,
  Easing,
} from "react-native-reanimated";

const getIcon = (name: string, isFocused: boolean, color: string, size: number) => {
  switch (name) {
    case "home":
      return <Ionicons name={isFocused ? "home" : "home-outline"} size={size} color={color} />;
    case "learn":
      return <Ionicons name={isFocused ? "book" : "book-outline"} size={size} color={color} />;
    case "teacher":
      return <MaterialCommunityIcons name={isFocused ? "robot" : "robot-outline"} size={size} color={color} />;
    case "chat":
      return <Ionicons name={isFocused ? "chatbubble" : "chatbubble-outline"} size={size} color={color} />;
    case "profile":
      return <Ionicons name={isFocused ? "person" : "person-outline"} size={size} color={color} />;
    default:
      return null;
  }
};

const getLabel = (name: string) => {
  switch (name) {
    case "home":
      return "Home";
    case "learn":
      return "Learn";
    case "teacher":
      return "AI Teacher";
    case "chat":
      return "Chat";
    case "profile":
      return "Profile";
    default:
      return name;
  }
};

function TabButton({
  route,
  isFocused,
  onPress,
  tabWidth,
}: {
  route: any;
  isFocused: boolean;
  onPress: () => void;
  tabWidth: number;
}) {
  const activeProgress = useDerivedValue(() =>
    withTiming(isFocused ? 1 : 0, { duration: 180, easing: Easing.linear })
  );

  const activeStyle = useAnimatedStyle(() => {
    return {
      opacity: activeProgress.value,
      transform: [
        { scale: activeProgress.value },
        { translateY: (1 - activeProgress.value) * 10 },
      ],
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
    };
  });

  const inactiveStyle = useAnimatedStyle(() => {
    return {
      opacity: 1 - activeProgress.value,
      transform: [
        { scale: 1 - activeProgress.value * 0.1 },
        { translateY: activeProgress.value * -10 },
      ],
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
    };
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.tabButton, { width: tabWidth }]}
      activeOpacity={0.8}
    >
      <View style={styles.buttonInner}>
        <Animated.View style={activeStyle}>
          {getIcon(route.name, true, "#ffffff", 24)}
        </Animated.View>

        <Animated.View style={inactiveStyle}>
          {getIcon(route.name, false, "#94a3b8", 22)}
          <Text style={styles.label}>{getLabel(route.name)}</Text>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
}

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: any) {
  const { width: screenWidth } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const tabWidth = screenWidth / state.routes.length;
  const circleWidth = 52;
  const circleHeight = 52;
  const barHeight = 62;

  const activeIndex = useSharedValue(state.index);

  useEffect(() => {
    activeIndex.value = state.index;
  }, [state.index, activeIndex]);

  const animatedCircleStyle = useAnimatedStyle(() => {
    const targetX = activeIndex.value * tabWidth + (tabWidth - circleWidth) / 2;
    return {
      transform: [
        {
          translateX: withTiming(targetX, {
            duration: 200,
            easing: Easing.linear,
          }),
        },
      ],
    };
  });

  return (
    <View
      style={[
        styles.tabBarContainer,
        {
          height: barHeight + insets.bottom,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.activeCircle,
          {
            width: circleWidth,
            height: circleHeight,
            borderRadius: circleWidth / 2,
            top: (barHeight - circleHeight) / 2,
            pointerEvents: "none" as any,
          },
          animatedCircleStyle,
        ]}
      />

      <View style={[styles.tabItemsContainer, { height: barHeight }]}>
        {state.routes.map((route: any, index: number) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          return (
            <TabButton
              key={route.key}
              route={route}
              isFocused={isFocused}
              onPress={onPress}
              tabWidth={tabWidth}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderTopWidth: 1.5,
    borderTopColor: "#f1f5f9",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 99,
    ...Platform.select({
      ios: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
      web: {
        boxShadow: "0 -3px 8px rgba(0, 0, 0, 0.04)",
      },
    }),
  },
  activeCircle: {
    position: "absolute",
    backgroundColor: "#4f46e5",
    ...Platform.select({
      ios: {
        shadowColor: "#4f46e5",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
      web: {
        boxShadow: "0 4px 12px rgba(79, 70, 229, 0.3)",
      },
    }),
  },
  tabItemsContainer: {
    flexDirection: "row",
    width: "100%",
  },
  tabButton: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonInner: {
    height: 52,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 11,
    fontWeight: "700",
    color: "#94a3b8",
    marginTop: 4,
  },
});
