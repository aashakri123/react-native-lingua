export type ActivityType = "multiple-choice" | "translate" | "speak" | "listen";

export interface Activity {
  id: string;
  type: ActivityType;
  question: string;
  options?: string[]; // Used for multiple-choice
  correctAnswer: string;
  audioUrl?: string; // Optional URL for audio-based activities
}

export interface VocabularyItem {
  word: string;
  translation: string;
  partOfSpeech: "noun" | "verb" | "adjective" | "greeting" | "expression" | "pronoun" | "other";
  pronunciation?: string; // Phonetic spelling for pronunciation helpers
}

export interface PhraseItem {
  text: string;
  translation: string;
  context?: string; // Scenario context (e.g. "Polite greetings")
}

export interface Lesson {
  id: string;
  unitId: string;
  title: string;
  description: string;
  order: number;
  xpReward: number;
  goals: string[]; // Checklist of learning goals
  aiPrompt: string; // Background instructions for the AI Vision/Audio Agent tutor
  vocabulary: VocabularyItem[];
  phrases: PhraseItem[];
  activities: Activity[];
}

export interface Unit {
  id: string;
  languageId: string;
  title: string;
  description: string;
  order: number;
}

export interface Language {
  id: string;
  name: string;
  flag: any; // String emoji or ImageSourcePropType asset
  description: string;
  learnersCount?: string; // e.g. "28.4M learners"
}
