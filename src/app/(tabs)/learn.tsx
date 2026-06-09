import React, { useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { images } from "@/constants/images";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useProgressStore } from "@/store/useProgressStore";
import { units } from "@/data/units";
import { lessons } from "@/data/lessons";

export default function LearnScreen() {
  const router = useRouter();
  const selectedLanguageId = useLanguageStore((state) => state.selectedLanguageId);
  const { completedLessons } = useProgressStore();

  const [activeTab, setActiveTab] = useState<"lessons" | "practice">("lessons");

  // Load language details
  const currentUnit = units.find((unit) => unit.languageId === selectedLanguageId) || units[0];
  const unitLessons = lessons.filter((lesson) => lesson.unitId === currentUnit?.id);

  // Compute stats
  const completedUnitLessonsCount = unitLessons.filter((l) => completedLessons.includes(l.id)).length;
  const inProgressLessonId = unitLessons.find((l) => !completedLessons.includes(l.id))?.id;

  const handleBack = () => {
    router.replace("/(tabs)/home");
  };

  const handleSelectLesson = (lessonId: string) => {
    router.push({
      pathname: "/lesson",
      params: { lessonId },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={24} color="#0f172a" />
        </TouchableOpacity>
        
        <View style={styles.headerTitleContainer}>
          <Text style={styles.unitTitle} numberOfLines={1}>
            {currentUnit?.title?.split(":")[1]?.trim() || currentUnit?.title || "At the Café"}
          </Text>
          <Text style={styles.unitSubtitle}>
            Unit {currentUnit?.order || 1} • {completedUnitLessonsCount} / {unitLessons.length} lessons
          </Text>
        </View>

        <TouchableOpacity style={styles.bookmarkButton} activeOpacity={0.7}>
          <Ionicons name="ribbon" size={24} color="#f59e0b" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Hero Banner Illustration */}
        <View style={styles.heroContainer}>
          <Image source={images.mascotCafe} style={styles.heroImage} resizeMode="contain" />
        </View>

        {/* Tab Selection Segments */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === "lessons" && styles.activeTabButton]}
            onPress={() => setActiveTab("lessons")}
            activeOpacity={0.9}
          >
            <Text style={[styles.tabButtonText, activeTab === "lessons" && styles.activeTabButtonText]}>
              Lessons
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButton, activeTab === "practice" && styles.activeTabButton]}
            onPress={() => setActiveTab("practice")}
            activeOpacity={0.9}
          >
            <Text style={[styles.tabButtonText, activeTab === "practice" && styles.activeTabButtonText]}>
              Practice
            </Text>
          </TouchableOpacity>
        </View>

        {/* Dynamic Section Contents */}
        {activeTab === "lessons" ? (
          <View style={styles.lessonsList}>
            {unitLessons.map((lesson) => {
              const isCompleted = completedLessons.includes(lesson.id);
              const isInProgress = lesson.id === inProgressLessonId;
              const isLocked = !isCompleted && !isInProgress;

              return (
                <TouchableOpacity
                  key={lesson.id}
                  style={[
                    styles.lessonCard,
                    isInProgress && styles.lessonCardInProgress,
                    isLocked && styles.lessonCardLocked,
                  ]}
                  activeOpacity={0.8}
                  onPress={() => handleSelectLesson(lesson.id)}
                >
                  <View style={styles.lessonTextContainer}>
                    <Text
                      style={[
                        styles.lessonLabel,
                        isInProgress && styles.lessonLabelInProgress,
                        isLocked && styles.lessonLabelLocked,
                      ]}
                    >
                      Lesson {lesson.order}
                    </Text>
                    <Text
                      style={[
                        styles.lessonTitle,
                        isInProgress && styles.lessonTitleInProgress,
                        isLocked && styles.lessonTitleLocked,
                      ]}
                    >
                      {lesson.title}
                    </Text>
                    {isInProgress && (
                      <Text style={styles.inProgressStatusText}>In progress</Text>
                    )}
                    {isLocked && (
                      <Text style={styles.lockedStatusText}>0 / {lesson.activities?.length || 1} tasks</Text>
                    )}
                  </View>

                  <View style={styles.lessonActionContainer}>
                    {isCompleted && (
                      <Ionicons name="checkmark-circle" size={28} color="#22c55e" />
                    )}
                    {isInProgress && (
                      <View style={styles.inProgressIconWrapper}>
                        <Ionicons name="cafe" size={24} color="#6366f1" />
                      </View>
                    )}
                    {isLocked && (
                      <Ionicons name="lock-closed-outline" size={24} color="#94a3b8" />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : (
          /* Practice Tab Contents */
          <View style={styles.practiceContainer}>
            <View style={styles.practiceCard}>
              <View style={styles.practiceHeaderIcon}>
                <MaterialCommunityIcons name="target" size={32} color="#a855f7" />
              </View>
              <Text style={styles.practiceCardTitle}>Daily Practice Mode</Text>
              <Text style={styles.practiceCardDesc}>
                Review vocabulary words and conversation sentences from all completed units to strengthen your memory!
              </Text>
              <TouchableOpacity
                style={styles.startPracticeButton}
                activeOpacity={0.8}
                onPress={() => alert("Practice sessions coming soon!")}
              >
                <Text style={styles.startPracticeButtonText}>Start Practice</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  backButton: {
    padding: 4,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 16,
  },
  unitTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0f172a",
    textAlign: "center",
  },
  unitSubtitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748b",
    marginTop: 2,
  },
  bookmarkButton: {
    padding: 4,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Safe padding for bottom tabs bar
  },
  heroContainer: {
    width: "100%",
    height: 200,
    borderRadius: 24,
    overflow: "hidden",
    marginTop: 16,
    marginBottom: 20,
    backgroundColor: "#f8fafc",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#f1f5f9",
    borderRadius: 20,
    padding: 4,
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 16,
  },
  activeTabButton: {
    backgroundColor: "#ffffff",
    ...Platform.select({
      ios: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
      },
    }),
  },
  tabButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#64748b",
  },
  activeTabButtonText: {
    color: "#4f46e5",
  },
  lessonsList: {
    gap: 12,
  },
  lessonCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
    borderRadius: 20,
    padding: 18,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.02,
        shadowRadius: 3,
      },
      android: {
        elevation: 1,
      },
      web: {
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.02)",
      },
    }),
  },
  lessonCardInProgress: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#818cf8",
    borderRadius: 20,
    padding: 18,
    ...Platform.select({
      ios: {
        shadowColor: "#6366f1",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: "0 4px 8px rgba(99, 102, 241, 0.08)",
      },
    }),
  },
  lessonCardLocked: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f8fafc",
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
    borderRadius: 20,
    padding: 18,
    opacity: 0.75,
  },
  lessonTextContainer: {
    flex: 1,
  },
  lessonLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  lessonLabelInProgress: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6366f1",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  lessonLabelLocked: {
    fontSize: 12,
    fontWeight: "600",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#334155",
    marginTop: 4,
  },
  lessonTitleInProgress: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0f172a",
    marginTop: 4,
  },
  lessonTitleLocked: {
    fontSize: 16,
    fontWeight: "600",
    color: "#64748b",
    marginTop: 4,
  },
  inProgressStatusText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6366f1",
    marginTop: 6,
  },
  lockedStatusText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#94a3b8",
    marginTop: 6,
  },
  lessonActionContainer: {
    marginLeft: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  inProgressIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#e0e7ff",
    justifyContent: "center",
    alignItems: "center",
  },
  practiceContainer: {
    width: "100%",
  },
  practiceCard: {
    backgroundColor: "#faf5ff",
    borderColor: "#f3e8ff",
    borderWidth: 1.5,
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
  },
  practiceHeaderIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f3e8ff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  practiceCardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#581c87",
    marginBottom: 8,
  },
  practiceCardDesc: {
    fontSize: 14,
    color: "#7e22ce",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 20,
  },
  startPracticeButton: {
    backgroundColor: "#a855f7",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 16,
  },
  startPracticeButtonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 15,
  },
});
