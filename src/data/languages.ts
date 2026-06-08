import { images } from "../constants/images";
import { Language } from "../types/learning";

export const languages: Language[] = [
  {
    id: "es",
    name: "Spanish",
    flag: images.spainFlag,
    description: "Master conversational Spanish with interactive lessons.",
    learnersCount: "28.4M learners",
  },
  {
    id: "fr",
    name: "French",
    flag: images.franceFlag,
    description: "Learn French greetings, culture, and daily expressions.",
    learnersCount: "19.4M learners",
  },
  {
    id: "ja",
    name: "Japanese",
    flag: images.japanFlag,
    description: "Learn to read, write, and speak Japanese.",
    learnersCount: "12.7M learners",
  },
  {
    id: "ko",
    name: "Korean",
    flag: images.koreaFlag,
    description: "Learn Hangeul, vocabulary, and basic phrases.",
    learnersCount: "9.3M learners",
  },
  {
    id: "de",
    name: "German",
    flag: images.germanyFlag,
    description: "Learn German grammar and daily conversation.",
    learnersCount: "8.1M learners",
  },
  {
    id: "zh",
    name: "Chinese",
    flag: images.chinaFlag,
    description: "Learn Mandarin characters and pronunciation.",
    learnersCount: "7.4M learners",
  },
];
