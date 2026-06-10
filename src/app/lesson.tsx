import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { usePostHog } from "posthog-react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { images } from "@/constants/images";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useProgressStore } from "@/store/useProgressStore";
import { languages } from "@/data/languages";
import { units } from "@/data/units";
import { lessons } from "@/data/lessons";

export default function LessonScreen() {
  const router = useRouter();
  const posthog = usePostHog();
  const { lessonId } = useLocalSearchParams<{ lessonId?: string }>();
  const selectedLanguageId = useLanguageStore((state) => state.selectedLanguageId);
  const { completedLessons, completeLesson, streak } = useProgressStore();

  // Load selected language, unit, and lesson content
  const currentLanguage = languages.find((lang) => lang.id === selectedLanguageId) || languages[0];
  const currentUnit = units.find((unit) => unit.languageId === selectedLanguageId) || units[0];
  const unitLessons = lessons.filter((lesson) => lesson.unitId === currentUnit?.id);
  
  let currentLesson = lessons.find((lesson) => lesson.id === lessonId);
  if (!currentLesson) {
    currentLesson = unitLessons.find((lesson) => !completedLessons.includes(lesson.id)) || unitLessons[0] || lessons[0];
  }

  // Retrieve primary phrase/word for conversation display
  const primaryPhrase = currentLesson.phrases?.[0] || {
    text: "¡Hola! ¿Cómo estás?",
    translation: "Hello! How are you?",
    context: "Greeting",
  };

  // State controls
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [sessionStatus, setSessionStatus] = useState("Online"); // "Online" | "Listening..." | "Muted"

  // PostHog Timer References
  const startTimeRef = useRef<number>(0);
  const isCompletedRef = useRef<boolean>(false);

  useEffect(() => {
    // Record lesson started
    if (posthog) {
      posthog.capture("lesson_started", {
        lesson_id: currentLesson.id,
        language: currentLanguage.name,
        lesson_number: currentLesson.order,
      });
    }

    startTimeRef.current = Date.now();

    // Clean unmount handles lesson abandonment
    return () => {
      if (!isCompletedRef.current && posthog) {
        const durationSeconds = Math.round((Date.now() - startTimeRef.current) / 1000);
        posthog.capture("lesson_abandoned", {
          lesson_id: currentLesson.id,
          time_into_lesson_seconds: durationSeconds,
          last_question_index: 0, // Conversation screens don't have indexes
        });
      }
    };
  }, [posthog, currentLesson.id, currentLanguage.name, currentLesson.order]);

  const handleToggleMic = () => {
    setIsMicMuted((prev) => {
      const nextState = !prev;
      setSessionStatus(nextState ? "Muted" : "Online");
      return nextState;
    });
  };

  const handleToggleCamera = () => {
    setIsCameraOn((prev) => !prev);
  };

  const handleToggleSubtitles = () => {
    setShowSubtitles((prev) => !prev);
  };

  const handlePlayAudio = () => {
    if (isPlayingAudio) return;
    setIsPlayingAudio(true);
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 1200);
  };

  const handleEndCall = () => {
    isCompletedRef.current = true;
    if (posthog) {
      const durationSeconds = Math.round((Date.now() - startTimeRef.current) / 1000);
      posthog.capture("lesson_completed", {
        lesson_id: currentLesson.id,
        duration_seconds: durationSeconds,
      });
    }
    // Save completion state and award XP
    completeLesson(currentLesson.id, currentLesson.xpReward);
    router.replace("/(tabs)/learn");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header Row */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton} activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={24} color="#0f172a" />
          </TouchableOpacity>
          <View style={styles.titleWrapper}>
            <Text style={styles.headerTitle}>AI Teacher</Text>
            <View style={styles.statusRow}>
              <View style={[styles.statusDot, isMicMuted && styles.statusDotMuted]} />
              <Text style={styles.statusText}>{sessionStatus}</Text>
            </View>
          </View>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIconButton} activeOpacity={0.7}>
            <Ionicons name="videocam-outline" size={22} color="#0f172a" />
          </TouchableOpacity>
          <View style={styles.streakContainer}>
            <Image source={images.streakFire} style={styles.streakIcon} resizeMode="contain" />
            <Text style={styles.streakText}>{streak}</Text>
          </View>
          <TouchableOpacity style={styles.avatarButton} activeOpacity={0.7}>
            <Ionicons name="person-outline" size={18} color="#0f172a" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Calling Stage */}
      <View style={styles.stage}>
        {/* Blurred room visual wrapper */}
        <View style={styles.stageBackgroundOverlay}>
          {/* Centered waves animation or visual mascot background */}
          <View style={styles.mascotContainer}>
            <Image source={images.mascotWaving} style={styles.mascotImage} resizeMode="contain" />
          </View>

          {/* Teacher Conversation Speech Bubble */}
          <View style={styles.speechBubbleWrapper}>
            <View style={styles.speechBubble}>
              <View style={styles.speechTextContainer}>
                <Text style={styles.foreignPhraseText}>{primaryPhrase.text}</Text>
                {showSubtitles && (
                  <Text style={styles.translationText}>{primaryPhrase.translation}</Text>
                )}
              </View>
              <TouchableOpacity
                onPress={handlePlayAudio}
                style={[styles.speechSoundButton, isPlayingAudio && styles.speechSoundButtonActive]}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={isPlayingAudio ? "volume-medium" : "volume-high"}
                  size={22}
                  color={isPlayingAudio ? "#ffffff" : "#4f46e5"}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.speechBubbleTail} />
          </View>
        </View>
      </View>

      {/* Control Buttons Row */}
      <View style={styles.controlsRow}>
        {/* Toggle Camera */}
        <View style={styles.controlItem}>
          <TouchableOpacity
            onPress={handleToggleCamera}
            style={[styles.controlButton, !isCameraOn && styles.controlButtonInactive]}
            activeOpacity={0.8}
          >
            <Ionicons
              name={isCameraOn ? "videocam" : "videocam-off"}
              size={24}
              color={isCameraOn ? "#4f46e5" : "#94a3b8"}
            />
          </TouchableOpacity>
          <Text style={styles.controlLabel}>Camera</Text>
        </View>

        {/* Toggle Mic */}
        <View style={styles.controlItem}>
          <TouchableOpacity
            onPress={handleToggleMic}
            style={[styles.controlButton, isMicMuted && styles.controlButtonMuted]}
            activeOpacity={0.8}
          >
            <Ionicons
              name={isMicMuted ? "mic-off" : "mic"}
              size={24}
              color={isMicMuted ? "#ef4444" : "#4f46e5"}
            />
          </TouchableOpacity>
          <Text style={styles.controlLabel}>Mic</Text>
        </View>

        {/* Toggle Subtitles */}
        <View style={styles.controlItem}>
          <TouchableOpacity
            onPress={handleToggleSubtitles}
            style={[styles.controlButton, !showSubtitles && styles.controlButtonInactive]}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons
              name={showSubtitles ? "subtitles" : "subtitles-outline"}
              size={24}
              color={showSubtitles ? "#4f46e5" : "#94a3b8"}
            />
          </TouchableOpacity>
          <Text style={styles.controlLabel}>Subtitles</Text>
        </View>

        {/* End Call (Red Button) */}
        <View style={styles.controlItem}>
          <TouchableOpacity
            onPress={handleEndCall}
            style={styles.endCallButton}
            activeOpacity={0.8}
          >
            <Ionicons name="call" size={24} color="#ffffff" style={styles.endCallIcon} />
          </TouchableOpacity>
          <Text style={styles.controlLabel}>End Call</Text>
        </View>
      </View>

      {/* Lesson Feedback Dashboard Card */}
      <View style={styles.feedbackCardContainer}>
        <View style={styles.feedbackCard}>
          <View style={styles.feedbackCol}>
            <Text style={styles.feedbackHeader}>Speaking</Text>
            <Text style={[styles.feedbackValue, { color: "#22c55e" }]}>Excellent</Text>
          </View>
          <View style={styles.feedbackDivider} />
          <View style={styles.feedbackCol}>
            <Text style={styles.feedbackHeader}>Pronunciation</Text>
            <Text style={[styles.feedbackValue, { color: "#3b82f6" }]}>Great</Text>
          </View>
          <View style={styles.feedbackDivider} />
          <View style={styles.feedbackCol}>
            <Text style={styles.feedbackHeader}>Grammar</Text>
            <Text style={[styles.feedbackValue, { color: "#a855f7" }]}>Good</Text>
          </View>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  backButton: {
    padding: 4,
  },
  titleWrapper: {
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0f172a",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 2,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#22c55e",
  },
  statusDotMuted: {
    backgroundColor: "#ef4444",
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#64748b",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerIconButton: {
    padding: 6,
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    gap: 4,
  },
  streakIcon: {
    width: 16,
    height: 16,
  },
  streakText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#475569",
  },
  avatarButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#cbd5e1",
    justifyContent: "center",
    alignItems: "center",
  },
  stage: {
    flex: 1,
    backgroundColor: "#fdf8f6", // Warm indoor simulated color
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 28,
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: "#f5e6e0",
  },
  stageBackgroundOverlay: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  mascotContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  mascotImage: {
    width: "75%",
    height: "75%",
  },
  speechBubbleWrapper: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: "center",
  },
  speechBubble: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 20,
    width: "100%",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.04)",
      },
    }),
  },
  speechTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  foreignPhraseText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0f172a",
  },
  translationText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748b",
    marginTop: 4,
  },
  speechSoundButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#f1f0ff",
    justifyContent: "center",
    alignItems: "center",
  },
  speechSoundButtonActive: {
    backgroundColor: "#4f46e5",
  },
  speechBubbleTail: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderLeftColor: "transparent",
    borderRightWidth: 10,
    borderRightColor: "transparent",
    borderTopWidth: 10,
    borderTopColor: "#ffffff",
    marginTop: -1,
  },
  controlsRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  controlItem: {
    alignItems: "center",
    gap: 8,
  },
  controlButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#ffffff",
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.03)",
      },
    }),
  },
  controlButtonInactive: {
    backgroundColor: "#f8fafc",
    borderColor: "#e2e8f0",
  },
  controlButtonMuted: {
    backgroundColor: "#fee2e2",
    borderColor: "#fca5a5",
  },
  endCallButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#ef4444",
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#ef4444",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: "0 4px 6px rgba(239, 68, 68, 0.2)",
      },
    }),
  },
  endCallIcon: {
    transform: [{ rotate: "135deg" }],
  },
  controlLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#64748b",
  },
  feedbackCardContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  feedbackCard: {
    flexDirection: "row",
    backgroundColor: "#f8fafc",
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: "center",
  },
  feedbackCol: {
    flex: 1,
    alignItems: "center",
  },
  feedbackHeader: {
    fontSize: 12,
    fontWeight: "700",
    color: "#475569",
    marginBottom: 4,
  },
  feedbackValue: {
    fontSize: 14,
    fontWeight: "800",
  },
  feedbackDivider: {
    width: 1.5,
    height: 24,
    backgroundColor: "#cbd5e1",
  },
});
