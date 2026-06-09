import React from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useUser } from "@clerk/expo";
import { useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { images } from "@/constants/images";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useProgressStore } from "@/store/useProgressStore";
import { languages } from "@/data/languages";
import { units } from "@/data/units";
import { lessons } from "@/data/lessons";

const getGreeting = (langId: string | null, name: string) => {
  switch (langId) {
    case "es":
      return `Hola, ${name}! 👋`;
    case "fr":
      return `Bonjour, ${name}! 👋`;
    case "de":
      return `Hallo, ${name}! 👋`;
    case "ja":
      return `こんにちは, ${name}! 👋`;
    case "ko":
      return `안녕하세요, ${name}! 👋`;
    case "zh":
      return `你好, ${name}! 👋`;
    default:
      return `Hello, ${name}! 👋`;
  }
};

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useUser();
  const { selectedLanguageId, setSelectedLanguage } = useLanguageStore();
  const { xp, streak, completedLessons } = useProgressStore();

  const name = user?.firstName || user?.fullName || "Learner";

  // Match the active language details
  const currentLanguage = languages.find((lang) => lang.id === selectedLanguageId) || languages[0];
  const currentUnit = units.find((unit) => unit.languageId === selectedLanguageId) || units[0];
  const unitLessons = lessons.filter((lesson) => lesson.unitId === currentUnit?.id);
  
  // Match the active lesson dynamically (the first uncompleted lesson, or the first lesson if all are complete)
  const currentLesson = unitLessons.find((lesson) => !completedLessons.includes(lesson.id)) || unitLessons[0] || lessons[0];

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Scrollable Main Area */}
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image source={currentLanguage.flag} style={styles.flagIcon} resizeMode="cover" />
            <Text style={styles.greetingText}>{getGreeting(selectedLanguageId, name)}</Text>
          </View>
          
          <View style={styles.headerRight}>
            <View style={styles.streakContainer}>
              <Image source={images.streakFire} style={styles.streakIcon} resizeMode="contain" />
              <Text style={styles.streakText}>{streak}</Text>
            </View>
            <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
              <Ionicons name="notifications-outline" size={24} color="#334155" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Daily Goal Card */}
        <View style={styles.dailyGoalCard}>
          <View style={styles.dailyGoalLeft}>
            <Text style={styles.cardSectionTitle}>Daily goal</Text>
            <Text style={styles.xpText}>
              <Text style={styles.xpBold}>{xp}</Text>
              <Text style={styles.xpTotal}> / 20 XP</Text>
            </Text>
            {/* Custom Progress Bar */}
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBarFill, { width: `${Math.min((xp / 20) * 100, 100)}%` }]} />
            </View>
          </View>
          
          <Image source={images.treasure} style={styles.chestImage} resizeMode="contain" />
        </View>

        {/* Continue Learning Card */}
        <View style={styles.continueCard}>
          <View style={styles.continueLeft}>
            <Text style={styles.continueSubtitle}>Continue learning</Text>
            <Text style={styles.continueTitle}>{currentLanguage.name}</Text>
            <Text style={styles.continueUnit}>A1 • {currentUnit.title.split(":")[0] || "Unit 1"}</Text>
            
            <TouchableOpacity 
              style={styles.continueButton} 
              activeOpacity={0.9}
              onPress={() => router.push("/lesson" as any)}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
          
          <Image source={images.palace} style={styles.palaceImage} resizeMode="contain" />
        </View>

        {/* Today's Plan Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{"Today's plan"}</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.viewAllText}>View all</Text>
          </TouchableOpacity>
        </View>

        {/* Today's Plan Items */}
        <View style={styles.planContainer}>
          {/* Plan Item 1: Lesson */}
          <TouchableOpacity 
            style={styles.planItem} 
            activeOpacity={0.7}
            onPress={() => router.push("/lesson" as any)}
          >
            <View style={[styles.itemIconContainer, { backgroundColor: "#e0e7ff" }]}>
              <Ionicons name="book" size={22} color="#4f46e5" />
            </View>
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemTitle}>Lesson</Text>
              <Text style={styles.itemSubtitle}>{currentLesson.title}</Text>
            </View>
            <Ionicons name="checkmark-circle" size={28} color="#4f46e5" />
          </TouchableOpacity>

          {/* Plan Item 2: AI Conversation */}
          <TouchableOpacity 
            style={styles.planItem} 
            activeOpacity={0.7}
            onPress={() => router.push("/(tabs)/teacher")}
          >
            <View style={[styles.itemIconContainer, { backgroundColor: "#f3e8ff" }]}>
              <Ionicons name="headset" size={22} color="#a855f7" />
            </View>
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemTitle}>AI Conversation</Text>
              <Text style={styles.itemSubtitle}>Talk about your day</Text>
            </View>
            <Ionicons name="ellipse-outline" size={28} color="#cbd5e1" />
          </TouchableOpacity>

          {/* Plan Item 3: New Words */}
          <TouchableOpacity 
            style={styles.planItem} 
            activeOpacity={0.7}
            onPress={() => router.push("/(tabs)/learn")}
          >
            <View style={[styles.itemIconContainer, { backgroundColor: "#ffe4e6" }]}>
              <MaterialCommunityIcons name="translate" size={22} color="#f43f5e" />
            </View>
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemTitle}>New words</Text>
              <Text style={styles.itemSubtitle}>10 words</Text>
            </View>
            <Ionicons name="ellipse-outline" size={28} color="#cbd5e1" />
          </TouchableOpacity>
        </View>



        {/* Developer Language Reset Button */}
        <TouchableOpacity 
          style={styles.devResetButton} 
          activeOpacity={0.7}
          onPress={() => {
            setSelectedLanguage(null);
            router.replace("/choose-language");
          }}
        >
          <Text style={styles.devResetText}>Change Language / Dev Reset</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 100, // Extra padding to clear custom absolute bottom tab bar
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  flagIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
  },
  greetingText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    gap: 4,
  },
  streakIcon: {
    width: 20,
    height: 20,
  },
  streakText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#475569",
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    justifyContent: "center",
    alignItems: "center",
  },
  dailyGoalCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fffbeb",
    borderWidth: 1.5,
    borderColor: "#fef3c7",
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#f59e0b",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: "0 2px 6px rgba(245, 158, 11, 0.04)",
      },
    }),
  },
  dailyGoalLeft: {
    flex: 1,
  },
  cardSectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#d97706",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  xpText: {
    marginTop: 6,
    marginBottom: 12,
  },
  xpBold: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1e293b",
  },
  xpTotal: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748b",
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: "#fef3c7",
    borderColor: "#fde047",
    borderWidth: 1,
    borderRadius: 5,
    width: "80%",
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#f97316",
    borderRadius: 5,
  },
  chestImage: {
    width: 72,
    height: 72,
  },
  continueCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#6366f1",
    borderRadius: 28,
    padding: 24,
    marginBottom: 24,
    ...Platform.select({
      ios: {
        shadowColor: "#6366f1",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 5,
      },
      web: {
        boxShadow: "0 6px 12px rgba(99, 102, 241, 0.15)",
      },
    }),
  },
  continueLeft: {
    flex: 1,
    justifyContent: "center",
  },
  continueSubtitle: {
    color: "#e0e7ff",
    fontSize: 13,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  continueTitle: {
    color: "#ffffff",
    fontSize: 26,
    fontWeight: "800",
    marginTop: 4,
  },
  continueUnit: {
    color: "#c7d2fe",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 2,
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 18,
    alignSelf: "flex-start",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.08)",
      },
    }),
  },
  continueButtonText: {
    color: "#4f46e5",
    fontWeight: "700",
    fontSize: 15,
  },
  palaceImage: {
    width: 100,
    height: 100,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0f172a",
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#4f46e5",
  },
  planContainer: {
    marginBottom: 24,
  },
  planItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1.5,
    borderColor: "#f1f5f9",
    borderRadius: 20,
    padding: 14,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.02,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
      web: {
        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.02)",
      },
    }),
  },
  itemIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  itemTextContainer: {
    flex: 1,
    marginLeft: 14,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0f172a",
  },
  itemSubtitle: {
    fontSize: 13,
    color: "#64748b",
    marginTop: 2,
    fontWeight: "500",
  },

  devResetButton: {
    marginTop: 10,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },
  devResetText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748b",
  },
});
