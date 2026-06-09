import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { usePostHog } from "posthog-react-native";
import { Ionicons } from "@expo/vector-icons";

import { useLanguageStore } from "@/store/useLanguageStore";
import { languages } from "@/data/languages";
import { units } from "@/data/units";
import { lessons } from "@/data/lessons";

export default function LessonScreen() {
  const router = useRouter();
  const posthog = usePostHog();
  const selectedLanguageId = useLanguageStore((state) => state.selectedLanguageId);

  // Retrieve current lesson info dynamically
  const currentLanguage = languages.find((lang) => lang.id === selectedLanguageId) || languages[0];
  const currentUnit = units.find((unit) => unit.languageId === selectedLanguageId) || units[0];
  const unitLessons = lessons.filter((lesson) => lesson.unitId === currentUnit?.id);
  const currentLesson = unitLessons[0] || lessons[0];

  const startTimeRef = useRef<number>(0);
  const isCompletedRef = useRef<boolean>(false);
  const lastQuestionIndexRef = useRef<number>(0);

  // State to simulate question progress
  const [questionIndex, setQuestionIndex] = useState(0);

  useEffect(() => {
    // 1. Capture lesson_started on mount
    if (posthog) {
      posthog.capture("lesson_started", {
        lesson_id: currentLesson.id,
        language: currentLanguage.name,
        lesson_number: currentLesson.order,
      });
    }

    startTimeRef.current = Date.now();

    // 2. Capture lesson_abandoned on unmount (if not completed)
    return () => {
      if (!isCompletedRef.current && posthog) {
        const durationSeconds = Math.round((Date.now() - startTimeRef.current) / 1000);
        posthog.capture("lesson_abandoned", {
          lesson_id: currentLesson.id,
          time_into_lesson_seconds: durationSeconds,
          last_question_index: lastQuestionIndexRef.current,
        });
      }
    };
  }, [posthog, currentLesson.id, currentLanguage.name, currentLesson.order]);

  const handleNextQuestion = () => {
    const nextIndex = questionIndex + 1;
    setQuestionIndex(nextIndex);
    lastQuestionIndexRef.current = nextIndex;
  };

  const handleComplete = () => {
    isCompletedRef.current = true;
    if (posthog) {
      const durationSeconds = Math.round((Date.now() - startTimeRef.current) / 1000);
      posthog.capture("lesson_completed", {
        lesson_id: currentLesson.id,
        duration_seconds: durationSeconds,
      });
    }
    router.replace("/(tabs)/home");
  };

  const handleAbandon = () => {
    // Navigating back triggers screen unmount, firing lesson_abandoned if not completed
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleAbandon} style={styles.closeButton}>
            <Ionicons name="close" size={28} color="#475569" />
          </TouchableOpacity>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${Math.min(((questionIndex + 1) / 5) * 100, 100)}%` }]} />
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.lessonTitle}>{currentLesson.title}</Text>
          <Text style={styles.languageText}>Language: {currentLanguage.name}</Text>
          
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Question {questionIndex + 1}</Text>
            <Text style={styles.cardQuestion}>
              Translate: {currentLesson.vocabulary?.[questionIndex % (currentLesson.vocabulary?.length || 1)]?.word || "Hola"}
            </Text>
          </View>
        </View>

        {/* Footer Actions */}
        <View style={styles.footer}>
          <TouchableOpacity onPress={handleNextQuestion} style={styles.nextButton} activeOpacity={0.8}>
            <Text style={styles.nextButtonText}>Next Question</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleComplete} style={styles.completeButton} activeOpacity={0.8}>
            <Text style={styles.completeButtonText}>Finish & Complete Lesson</Text>
          </TouchableOpacity>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  closeButton: {
    padding: 4,
    marginRight: 16,
  },
  progressContainer: {
    flex: 1,
    height: 16,
    backgroundColor: "#f1f5f9",
    borderRadius: 8,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#22c55e",
    borderRadius: 8,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lessonTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0f172a",
    textAlign: "center",
  },
  languageText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748b",
    marginTop: 8,
    marginBottom: 32,
  },
  card: {
    width: "100%",
    backgroundColor: "#f8fafc",
    borderWidth: 2,
    borderColor: "#e2e8f0",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  cardQuestion: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0f172a",
    textAlign: "center",
  },
  footer: {
    gap: 12,
  },
  nextButton: {
    backgroundColor: "#4f46e5",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  nextButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  completeButton: {
    backgroundColor: "#22c55e",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  completeButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});
