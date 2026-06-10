import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
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
import { useAuth, useUser } from "@clerk/expo";
import {
  StreamVideoClient,
  StreamVideo,
  StreamCall,
  Call,
  CallingState,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-native-sdk";

import { images } from "@/constants/images";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useProgressStore } from "@/store/useProgressStore";
import { languages } from "@/data/languages";
import { units } from "@/data/units";
import { lessons } from "@/data/lessons";

export default function LessonScreen() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { getToken } = useAuth();
  const router = useRouter();
  const posthog = usePostHog();
  const { lessonId } = useLocalSearchParams<{ lessonId?: string }>();
  const selectedLanguageId = useLanguageStore((state) => state.selectedLanguageId);
  const { completedLessons, completeLesson, streak } = useProgressStore();

  // Load selected language, unit, and lesson content
  const currentLanguage = languages.find((lang) => lang.id === selectedLanguageId) || languages[0];
  const currentUnit = units.find((unit) => unit.languageId === selectedLanguageId) || units[0];
  const unitLessons = lessons.filter((lesson) => lesson.unitId === currentUnit?.id);
  
  const currentLesson = lessons.find((lesson) => lesson.id === lessonId) ||
    unitLessons.find((lesson) => !completedLessons.includes(lesson.id)) ||
    unitLessons[0] ||
    lessons[0];

  // Stream Client and Call state management
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
    const isCompleted = isCompletedRef;
    const startTime = startTimeRef;

    // Clean unmount handles lesson abandonment
    return () => {
      if (!isCompleted.current && posthog) {
        const durationSeconds = Math.round((Date.now() - startTime.current) / 1000);
        posthog.capture("lesson_abandoned", {
          lesson_id: currentLesson.id,
          time_into_lesson_seconds: durationSeconds,
          last_question_index: 0,
        });
      }
    };
  }, [posthog, currentLesson.id, currentLanguage.name, currentLesson.order]);

  // Setup Stream Video client and Join Call
  useEffect(() => {
    let isActive = true;
    let activeClient: StreamVideoClient | null = null;
    let activeCall: Call | null = null;

    async function initStream() {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch user token from Clerk
        const clerkToken = await getToken();
        if (!clerkToken) {
          throw new Error("No authenticated session. Please log in.");
        }

        // POST request to Expo API Route
        const response = await fetch("/api/stream-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${clerkToken}`,
          },
          body: JSON.stringify({
            lessonId: currentLesson.id,
            languageId: selectedLanguageId,
            userName: user?.fullName || user?.username || "Learner",
            userImage: user?.imageUrl || "",
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to initiate lesson session.");
        }

        const sessionData = await response.json();
        if (!isActive) return;

        // Initialize Stream Video Client
        const tokenProvider = async () => sessionData.token;
        const c = StreamVideoClient.getOrCreateInstance({
          apiKey: sessionData.apiKey,
          user: {
            id: sessionData.userId,
            name: sessionData.userName,
            image: sessionData.userImage,
          },
          tokenProvider,
        });

        activeClient = c;
        setClient(c);

        // Create/Retrieve the call session
        const cl = c.call(sessionData.callType, sessionData.callId, { reuseInstance: true });
        cl.setDisconnectionTimeout(120);

        // Join the audio call session
        await cl.join({ create: false });
        // Disable camera for an audio-only lesson call
        await cl.camera.disable();

        activeCall = cl;
        setCall(cl);
        setIsLoading(false);
      } catch (err: any) {
        console.error("Stream initialization error:", err);
        if (isActive) {
          setError(err.message || "Failed to connect to the classroom session.");
          setIsLoading(false);
        }
      }
    }

    if (isLoaded && isSignedIn && user?.id) {
      initStream();
    } else if (isLoaded && !isSignedIn) {
      Promise.resolve().then(() => {
        setError("Please log in to join lesson audio rooms.");
        setIsLoading(false);
      });
    }

    return () => {
      isActive = false;
      if (activeCall) {
        if (activeCall.state.callingState !== CallingState.LEFT) {
          activeCall.leave().catch((err) => console.error("Error leaving Stream call:", err));
        }
      }
      if (activeClient) {
        activeClient.disconnectUser().catch((err) => console.error("Error disconnecting Stream user:", err));
      }
    };
  }, [
    isLoaded,
    isSignedIn,
    user?.id,
    user?.fullName,
    user?.username,
    user?.imageUrl,
    currentLesson.id,
    selectedLanguageId,
    getToken,
  ]);

  if (!currentLesson) {
    return null;
  }

  if (!isLoaded || isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4f46e5" />
          <Text style={styles.loadingText}>Connecting to audio classroom...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={56} color="#ef4444" />
          <Text style={styles.errorText}>Connection Error</Text>
          <Text style={styles.errorSubtext}>{error}</Text>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.retryButton}
            activeOpacity={0.7}
          >
            <Text style={styles.retryButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!client || !call) {
    return null;
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <LessonCallContent
          currentLesson={currentLesson}
          currentLanguage={currentLanguage}
          streak={streak}
          completeLesson={completeLesson}
          isCompletedRef={isCompletedRef}
          startTimeRef={startTimeRef}
          router={router}
          posthog={posthog}
          clerkUser={user}
        />
      </StreamCall>
    </StreamVideo>
  );
}

// Inner Component that has access to Stream Call context
function LessonCallContent({
  currentLesson,
  currentLanguage,
  streak,
  completeLesson,
  isCompletedRef,
  startTimeRef,
  router,
  posthog,
  clerkUser,
}: {
  currentLesson: any;
  currentLanguage: any;
  streak: number;
  completeLesson: any;
  isCompletedRef: React.MutableRefObject<boolean>;
  startTimeRef: React.MutableRefObject<number>;
  router: any;
  posthog: any;
  clerkUser: any;
}) {
  const call = useCall();
  const { useCallCallingState, useMicrophoneState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const { status: micStatus, isSpeakingWhileMuted } = useMicrophoneState();

  const isMicMuted = micStatus === "disabled";

  // Subtitles state
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Retrieve primary phrase/word for conversation display
  const primaryPhrase = currentLesson.phrases?.[0] || {
    text: "¡Hola! ¿Cómo estás?",
    translation: "Hello! How are you?",
    context: "Greeting",
  };

  const handleToggleMic = async () => {
    try {
      await call?.microphone.toggle();
    } catch (err) {
      console.error("Failed to toggle mic:", err);
    }
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

  const handleEndCall = async () => {
    isCompletedRef.current = true;
    if (posthog) {
      const durationSeconds = Math.round((Date.now() - startTimeRef.current) / 1000);
      posthog.capture("lesson_completed", {
        lesson_id: currentLesson.id,
        duration_seconds: durationSeconds,
      });
    }

    if (call && call.state.callingState !== CallingState.LEFT) {
      try {
        await call.leave();
      } catch (err) {
        console.error("Error leaving Stream call:", err);
      }
    }

    // Save completion state and award XP
    completeLesson(currentLesson.id, currentLesson.xpReward);
    router.replace("/(tabs)/learn");
  };

  // Map callingState and mic state to user friendly labels
  let sessionStatus = "Online";
  if (callingState === CallingState.JOINING) {
    sessionStatus = "Connecting...";
  } else if (callingState === CallingState.RECONNECTING) {
    sessionStatus = "Reconnecting...";
  } else if (isMicMuted) {
    sessionStatus = "Muted";
  } else if (callingState === CallingState.JOINED) {
    sessionStatus = "Joined";
  } else if (callingState === CallingState.LEFT) {
    sessionStatus = "Ended";
  }

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
              <View style={[
                styles.statusDot, 
                isMicMuted && styles.statusDotMuted,
                callingState === CallingState.JOINING && styles.statusDotConnecting
              ]} />
              <Text style={styles.statusText}>{sessionStatus}</Text>
            </View>
          </View>
        </View>

        <View style={styles.headerRight}>
          <View style={styles.streakContainer}>
            <Image source={images.streakFire} style={styles.streakIcon} resizeMode="contain" />
            <Text style={styles.streakText}>{streak}</Text>
          </View>
          <View style={styles.avatarButton}>
            {clerkUser?.imageUrl ? (
              <Image source={{ uri: clerkUser.imageUrl }} style={styles.avatarImage} />
            ) : (
              <Ionicons name="person-outline" size={18} color="#0f172a" />
            )}
          </View>
        </View>
      </View>

      {/* Main Calling Stage */}
      <View style={styles.stage}>
        {/* Blurred room visual wrapper */}
        <View style={styles.stageBackgroundOverlay}>
          {/* Centered waves animation or visual mascot background */}
          <View style={styles.mascotContainer}>
            <Image source={images.mascotWaving} style={styles.mascotImage} resizeMode="contain" />
            {isSpeakingWhileMuted && (
              <View style={styles.speakingMutedBanner}>
                <Ionicons name="mic-off" size={14} color="#ffffff" />
                <Text style={styles.speakingMutedText}>You are speaking while muted!</Text>
              </View>
            )}
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

      {/* Session Attendees & Connection Info */}
      <View style={styles.participantsSection}>
        <Text style={styles.participantsHeader}>Lesson Session Info</Text>
        <View style={styles.participantRow}>
          {/* Local User */}
          <View style={styles.participantCard}>
            <View style={styles.participantAvatarBg}>
              {clerkUser?.imageUrl ? (
                <Image source={{ uri: clerkUser.imageUrl }} style={styles.participantAvatar} />
              ) : (
                <Ionicons name="person" size={24} color="#64748b" />
              )}
            </View>
            <Text style={styles.participantName} numberOfLines={1}>
              {clerkUser?.firstName || "You"}
            </Text>
            <Text style={styles.participantRole}>Local User</Text>
            {isMicMuted ? (
              <Ionicons name="mic-off" size={16} color="#ef4444" style={styles.participantMicIcon} />
            ) : (
              <Ionicons name="mic" size={16} color="#22c55e" style={styles.participantMicIcon} />
            )}
          </View>

          {/* AI Teacher */}
          <View style={styles.participantCard}>
            <View style={[styles.participantAvatarBg, { backgroundColor: "#e0e7ff" }]}>
              <Image source={images.mascotLogo || images.mascotWaving} style={styles.participantAvatar} resizeMode="contain" />
            </View>
            <Text style={styles.participantName} numberOfLines={1}>
              AI Teacher
            </Text>
            <Text style={styles.participantRole}>Remote Host</Text>
            <Ionicons name="mic" size={16} color="#22c55e" style={styles.participantMicIcon} />
          </View>
        </View>
      </View>

      {/* Control Buttons Row */}
      <View style={styles.controlsRow}>
        {/* Toggle Camera (Disabled for audio call) */}
        <View style={styles.controlItem}>
          <View
            style={[styles.controlButton, styles.controlButtonInactive, { opacity: 0.5 }]}
          >
            <Ionicons
              name="videocam-off"
              size={24}
              color="#94a3b8"
            />
          </View>
          <Text style={styles.controlLabel}>Camera (N/A)</Text>
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
          <Text style={styles.controlLabel}>{isMicMuted ? "Unmute" : "Mute"}</Text>
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
  statusDotConnecting: {
    backgroundColor: "#eab308",
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
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  stage: {
    flex: 1,
    backgroundColor: "#fdf8f6",
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
    position: "relative",
  },
  mascotImage: {
    width: "75%",
    height: "75%",
  },
  speakingMutedBanner: {
    position: "absolute",
    top: 10,
    backgroundColor: "rgba(239, 68, 68, 0.9)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  speakingMutedText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "700",
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
  participantsSection: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  participantsHeader: {
    fontSize: 12,
    fontWeight: "800",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  participantRow: {
    flexDirection: "row",
    gap: 12,
  },
  participantCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
    borderRadius: 16,
    padding: 8,
    position: "relative",
  },
  participantAvatarBg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#e2e8f0",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginRight: 10,
  },
  participantAvatar: {
    width: "100%",
    height: "100%",
  },
  participantName: {
    flex: 1,
    fontSize: 13,
    fontWeight: "800",
    color: "#0f172a",
    marginRight: 4,
  },
  participantRole: {
    position: "absolute",
    top: 4,
    right: 8,
    fontSize: 8,
    fontWeight: "700",
    color: "#94a3b8",
  },
  participantMicIcon: {
    marginLeft: "auto",
  },
  controlsRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 16,
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "700",
    color: "#4f46e5",
    textAlign: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  errorText: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: "800",
    color: "#0f172a",
    textAlign: "center",
  },
  errorSubtext: {
    marginTop: 8,
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: "#4f46e5",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
  },
});
