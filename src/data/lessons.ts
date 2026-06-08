import { Lesson } from "../types/learning";

export const lessons: Lesson[] = [
  // Spanish Unit 1 Lessons
  {
    id: "es-u1-l1",
    unitId: "es-unit-1",
    title: "Greetings & Basics",
    description: "Learn essential greetings like hello and goodbye, and introduce yourself.",
    order: 1,
    xpReward: 20,
    goals: [
      "Say hello and goodbye",
      "Ask how someone is doing",
      "Introduce yourself",
    ],
    aiPrompt: 
      "You are María, a warm, energetic, and encouraging Spanish teacher from Madrid. " +
      "The student is an absolute beginner. Help them practice greetings ('Hola', 'Adiós', 'Buenos días') " +
      "and simple intros ('Me llamo...'). Keep your responses very simple, speak clearly, and offer constructive feedback " +
      "when they mispronounce words or make simple grammar errors.",
    vocabulary: [
      {
        word: "Hola",
        translation: "Hello / Hi",
        partOfSpeech: "greeting",
        pronunciation: "OH-lah",
      },
      {
        word: "Adiós",
        translation: "Goodbye",
        partOfSpeech: "greeting",
        pronunciation: "ah-DYOHS",
      },
      {
        word: "Gracias",
        translation: "Thank you",
        partOfSpeech: "expression",
        pronunciation: "GRAH-syahs",
      },
      {
        word: "Por favor",
        translation: "Please",
        partOfSpeech: "expression",
        pronunciation: "por fah-VOR",
      },
    ],
    phrases: [
      {
        text: "¿Cómo estás?",
        translation: "How are you?",
        context: "Polite greeting to check on someone",
      },
      {
        text: "Me llamo Alex",
        translation: "My name is Alex",
        context: "Introducing yourself to others",
      },
    ],
    activities: [
      {
        id: "es-u1-l1-a1",
        type: "multiple-choice",
        question: "How do you say 'Hello' in Spanish?",
        options: ["Adiós", "Hola", "Gracias", "Por favor"],
        correctAnswer: "Hola",
      },
      {
        id: "es-u1-l1-a2",
        type: "translate",
        question: "Translate: 'Adiós'",
        correctAnswer: "Goodbye",
      },
      {
        id: "es-u1-l1-a3",
        type: "speak",
        question: "Pronounce: 'Hola, ¿cómo estás?'",
        correctAnswer: "Hola, ¿cómo estás?",
      },
    ],
  },
  {
    id: "es-u1-l2",
    unitId: "es-unit-1",
    title: "Meeting People",
    description: "Learn to ask someone's name and say nice to meet you.",
    order: 2,
    xpReward: 20,
    goals: [
      "Ask someone's name",
      "Express pleasure meeting someone",
      "Mention a friend",
    ],
    aiPrompt:
      "You are Carlos, a friendly and patient Spanish tutor from Mexico. " +
      "Guide the student through basic introductory dialogue. Prompt them to ask your name using '¿Cómo te llamas?' " +
      "and to say 'Mucho gusto' (Nice to meet you). Praise their efforts and correct errors gently.",
    vocabulary: [
      {
        word: "Mucho gusto",
        translation: "Nice to meet you",
        partOfSpeech: "expression",
        pronunciation: "MOO-choh GOOS-toh",
      },
      {
        word: "Amigo",
        translation: "Friend",
        partOfSpeech: "noun",
        pronunciation: "ah-MEE-goh",
      },
      {
        word: "Señor",
        translation: "Sir / Mr.",
        partOfSpeech: "noun",
        pronunciation: "seh-NYOR",
      },
    ],
    phrases: [
      {
        text: "¿Cómo te llamas?",
        translation: "What is your name?",
        context: "Asking for someone's name in a friendly manner",
      },
      {
        text: "Este es mi amigo",
        translation: "This is my friend",
        context: "Introducing someone nearby",
      },
    ],
    activities: [
      {
        id: "es-u1-l2-a1",
        type: "multiple-choice",
        question: "What does 'Mucho gusto' translate to?",
        options: ["Thank you", "Please", "Nice to meet you", "Goodbye"],
        correctAnswer: "Nice to meet you",
      },
      {
        id: "es-u1-l2-a2",
        type: "translate",
        question: "Translate: '¿Cómo te llamas?'",
        correctAnswer: "What is your name?",
      },
    ],
  },

  // French Unit 1 Lessons
  {
    id: "fr-u1-l1",
    unitId: "fr-unit-1",
    title: "Welcome & Polite Words",
    description: "Learn basic French greetings and expressions of politeness.",
    order: 1,
    xpReward: 25,
    goals: [
      "Say hello formally and informally",
      "Polite expressions",
      "Ask how someone is doing",
    ],
    aiPrompt:
      "You are Jean, a sophisticated and patient French instructor from Paris. " +
      "Teach the student the difference between 'Bonjour' (formal) and 'Salut' (informal). " +
      "Practice 'Merci' (thank you) and 'S'il vous plaît' (please). Keep your prompts polite and elegant.",
    vocabulary: [
      {
        word: "Bonjour",
        translation: "Hello / Good morning",
        partOfSpeech: "greeting",
        pronunciation: "bohn-ZHOOR",
      },
      {
        word: "Salut",
        translation: "Hi / Bye (informal)",
        partOfSpeech: "greeting",
        pronunciation: "sah-LOO",
      },
      {
        word: "Merci",
        translation: "Thank you",
        partOfSpeech: "expression",
        pronunciation: "mair-SEE",
      },
    ],
    phrases: [
      {
        text: "Ça va ?",
        translation: "How's it going?",
        context: "Asking someone how they are casually",
      },
      {
        text: "S'il vous plaît",
        translation: "Please (formal/polite)",
        context: "Politely requesting something",
      },
    ],
    activities: [
      {
        id: "fr-u1-l1-a1",
        type: "multiple-choice",
        question: "Which of the following means 'Thank you' in French?",
        options: ["Bonjour", "Merci", "Salut", "S'il vous plaît"],
        correctAnswer: "Merci",
      },
      {
        id: "fr-u1-l1-a2",
        type: "translate",
        question: "Translate: 'Bonjour'",
        correctAnswer: "Hello",
      },
    ],
  },
];
