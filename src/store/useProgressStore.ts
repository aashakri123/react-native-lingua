import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ProgressState {
  completedLessons: string[];
  xp: number;
  streak: number;
  completeLesson: (lessonId: string, xpReward: number) => void;
  resetProgress: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      completedLessons: [],
      xp: 0,
      streak: 12, // Default to 12 to match the design's streak badge
      completeLesson: (lessonId, xpReward) =>
        set((state) => {
          if (state.completedLessons.includes(lessonId)) {
            return {};
          }
          return {
            completedLessons: [...state.completedLessons, lessonId],
            xp: state.xp + xpReward,
          };
        }),
      resetProgress: () =>
        set({
          completedLessons: [],
          xp: 0,
          streak: 12,
        }),
    }),
    {
      name: "user-progress-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
