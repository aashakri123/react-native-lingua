import { Lesson } from "../types/learning";

export const lessons: Lesson[] = [
  // ==========================================
  // SPANISH LESSONS (Unit 1)
  // ==========================================
  {
    id: "es-u1-l1",
    unitId: "es-unit-1",
    title: "Greetings & Basics",
    description: "Learn essential greetings like hello and goodbye, and introduce yourself.",
    order: 1,
    xpReward: 20,
    goals: ["Say hello and goodbye", "Ask how someone is doing", "Introduce yourself"],
    aiPrompt: "You are María, a warm, energetic, and encouraging Spanish teacher from Madrid...",
    vocabulary: [
      { word: "Hola", translation: "Hello", partOfSpeech: "greeting", pronunciation: "OH-lah" },
      { word: "Adiós", translation: "Goodbye", partOfSpeech: "greeting", pronunciation: "ah-DYOHS" },
      { word: "Gracias", translation: "Thank you", partOfSpeech: "expression", pronunciation: "GRAH-syahs" }
    ],
    phrases: [
      { text: "¿Cómo estás?", translation: "How are you?", context: "Polite greeting" }
    ],
    activities: [
      { id: "es-u1-l1-a1", type: "multiple-choice", question: "How do you say 'Hello' in Spanish?", options: ["Adiós", "Hola", "Gracias"], correctAnswer: "Hola" },
      { id: "es-u1-l1-a2", type: "translate", question: "Translate: 'Adiós'", correctAnswer: "Goodbye" }
    ]
  },
  {
    id: "es-u1-l2",
    unitId: "es-unit-1",
    title: "Meeting People",
    description: "Learn to ask someone's name and say nice to meet you.",
    order: 2,
    xpReward: 20,
    goals: ["Ask someone's name", "Express pleasure meeting someone"],
    aiPrompt: "You are Carlos, a friendly and patient Spanish tutor from Mexico...",
    vocabulary: [
      { word: "Mucho gusto", translation: "Nice to meet you", partOfSpeech: "expression", pronunciation: "MOO-choh GOOS-toh" },
      { word: "Amigo", translation: "Friend", partOfSpeech: "noun", pronunciation: "ah-MEE-goh" }
    ],
    phrases: [
      { text: "¿Cómo te llamas?", translation: "What is your name?", context: "Asking for name" }
    ],
    activities: [
      { id: "es-u1-l2-a1", type: "multiple-choice", question: "What is 'Mucho gusto'?", options: ["Please", "Nice to meet you", "Goodbye"], correctAnswer: "Nice to meet you" }
    ]
  },
  {
    id: "es-u1-l3",
    unitId: "es-unit-1",
    title: "At the Café",
    description: "Order coffee and ask for the bill politely in a café environment.",
    order: 3,
    xpReward: 20,
    goals: ["Order a coffee", "Ask for the check", "Use polite forms"],
    aiPrompt: "You are Sofia, a friendly barista at a bustling café in Buenos Aires...",
    vocabulary: [
      { word: "Café", translation: "Coffee", partOfSpeech: "noun", pronunciation: "cah-FEH" },
      { word: "Por favor", translation: "Please", partOfSpeech: "expression", pronunciation: "por fah-VOR" },
      { word: "La cuenta", translation: "The bill", partOfSpeech: "noun", pronunciation: "lah KWEHN-tah" }
    ],
    phrases: [
      { text: "Un café, por favor", translation: "A coffee, please", context: "Ordering a drink" }
    ],
    activities: [
      { id: "es-u1-l3-a1", type: "multiple-choice", question: "How do you order a coffee?", options: ["Un café, por favor", "Adiós", "La cuenta"], correctAnswer: "Un café, por favor" },
      { id: "es-u1-l3-a2", type: "translate", question: "Translate: 'La cuenta, por favor'", correctAnswer: "The bill, please" }
    ]
  },
  {
    id: "es-u1-l4",
    unitId: "es-unit-1",
    title: "Travel & Directions",
    description: "Ask where key spots like hotels and stations are located.",
    order: 4,
    xpReward: 20,
    goals: ["Ask for the hotel", "Find the train station", "Understand left and right"],
    aiPrompt: "You are Alejandro, a helpful local guide from Seville...",
    vocabulary: [
      { word: "Hotel", translation: "Hotel", partOfSpeech: "noun", pronunciation: "oh-TEL" },
      { word: "Estación", translation: "Station", partOfSpeech: "noun", pronunciation: "ehs-tah-SYOHN" },
      { word: "Dónde", translation: "Where", partOfSpeech: "pronoun", pronunciation: "DOHN-deh" }
    ],
    phrases: [
      { text: "¿Dónde está el hotel?", translation: "Where is the hotel?", context: "Asking directions" }
    ],
    activities: [
      { id: "es-u1-l4-a1", type: "multiple-choice", question: "How do you ask 'Where is the hotel?'", options: ["¿Dónde está el hotel?", "Gracias", "Hola"], correctAnswer: "¿Dónde está el hotel?" }
    ]
  },
  {
    id: "es-u1-l5",
    unitId: "es-unit-1",
    title: "Shopping",
    description: "Inquire about prices and make simple payments for souvenirs.",
    order: 5,
    xpReward: 20,
    goals: ["Ask how much something costs", "Name basic clothes", "Discuss currencies"],
    aiPrompt: "You are Carmen, a vendor selling handmade items in a market in Barcelona...",
    vocabulary: [
      { word: "Cuánto cuesta", translation: "How much does it cost", partOfSpeech: "expression", pronunciation: "KWAHN-toh KWEHS-tah" },
      { word: "Dinero", translation: "Money", partOfSpeech: "noun", pronunciation: "dee-NEH-roh" },
      { word: "Camisa", translation: "Shirt", partOfSpeech: "noun", pronunciation: "cah-MEE-sah" }
    ],
    phrases: [
      { text: "¿Cuánto cuesta esto?", translation: "How much does this cost?", context: "Asking price" }
    ],
    activities: [
      { id: "es-u1-l5-a1", type: "translate", question: "Translate: '¿Cuánto cuesta?'", correctAnswer: "How much does it cost?" }
    ]
  },
  {
    id: "es-u1-l6",
    unitId: "es-unit-1",
    title: "Family & Friends",
    description: "Discuss brothers, sisters, and describe your friends.",
    order: 6,
    xpReward: 20,
    goals: ["Introduce family members", "Use possessives like 'my'", "Describe your friend"],
    aiPrompt: "You are Mateo, a welcoming university student sharing details about his family in Colombia...",
    vocabulary: [
      { word: "Madre", translation: "Mother", partOfSpeech: "noun", pronunciation: "MAH-dreh" },
      { word: "Padre", translation: "Father", partOfSpeech: "noun", pronunciation: "PAH-dreh" },
      { word: "Hermano", translation: "Brother", partOfSpeech: "noun", pronunciation: "ehr-MAH-noh" }
    ],
    phrases: [
      { text: "Mi hermano es alto", translation: "My brother is tall", context: "Describing family" }
    ],
    activities: [
      { id: "es-u1-l6-a1", type: "multiple-choice", question: "What is 'Brother' in Spanish?", options: ["Hermano", "Madre", "Padre"], correctAnswer: "Hermano" }
    ]
  },

  // ==========================================
  // FRENCH LESSONS (Unit 1)
  // ==========================================
  {
    id: "fr-u1-l1",
    unitId: "fr-unit-1",
    title: "Welcome & Polite Words",
    description: "Learn basic French greetings and expressions of politeness.",
    order: 1,
    xpReward: 25,
    goals: ["Say hello formally and informally", "Polite expressions", "Ask how someone is doing"],
    aiPrompt: "You are Jean, a sophisticated and patient French instructor from Paris...",
    vocabulary: [
      { word: "Bonjour", translation: "Hello", partOfSpeech: "greeting", pronunciation: "bohn-ZHOOR" },
      { word: "Salut", translation: "Hi", partOfSpeech: "greeting", pronunciation: "sah-LOO" },
      { word: "Merci", translation: "Thank you", partOfSpeech: "expression", pronunciation: "mair-SEE" }
    ],
    phrases: [
      { text: "Ça va ?", translation: "How's it going?", context: "Casual greeting" }
    ],
    activities: [
      { id: "fr-u1-l1-a1", type: "multiple-choice", question: "Which means 'Thank you' in French?", options: ["Bonjour", "Merci", "Salut"], correctAnswer: "Merci" }
    ]
  },
  {
    id: "fr-u1-l2",
    unitId: "fr-unit-1",
    title: "At the Bistro",
    description: "Learn to order a croissant and coffee politely.",
    order: 2,
    xpReward: 25,
    goals: ["Order bakery items", "Use please/thanks in French", "Ask for the check"],
    aiPrompt: "You are Chloé, a warm waitress in a quiet café next to the Seine...",
    vocabulary: [
      { word: "Café", translation: "Coffee", partOfSpeech: "noun", pronunciation: "cah-FAY" },
      { word: "Croissant", translation: "Croissant", partOfSpeech: "noun", pronunciation: "krwa-SAHN" },
      { word: "S'il vous plaît", translation: "Please", partOfSpeech: "expression", pronunciation: "seel voo PLAY" }
    ],
    phrases: [
      { text: "Un croissant, s'il vous plaît", translation: "A croissant, please", context: "Ordering breakfast" }
    ],
    activities: [
      { id: "fr-u1-l2-a1", type: "translate", question: "Translate: 'Un croissant, s'il vous plaît'", correctAnswer: "A croissant, please" }
    ]
  },
  {
    id: "fr-u1-l3",
    unitId: "fr-unit-1",
    title: "Asking Directions",
    description: "Navigate around Paris, asking for the metro station.",
    order: 3,
    xpReward: 25,
    goals: ["Ask where the metro is", "Find the street", "Understand simple turn signs"],
    aiPrompt: "You are Lucas, a Paris local helping tourists navigate streets...",
    vocabulary: [
      { word: "Métro", translation: "Subway / Metro", partOfSpeech: "noun", pronunciation: "may-TROH" },
      { word: "Où est", translation: "Where is", partOfSpeech: "expression", pronunciation: "oo AY" },
      { word: "Rue", translation: "Street", partOfSpeech: "noun", pronunciation: "ROO" }
    ],
    phrases: [
      { text: "Où est le métro ?", translation: "Where is the metro?", context: "Asking way" }
    ],
    activities: [
      { id: "fr-u1-l3-a1", type: "multiple-choice", question: "How do you ask 'Where is the metro?'", options: ["Où est le métro ?", "Bonjour", "Merci"], correctAnswer: "Où est le métro ?" }
    ]
  },
  {
    id: "fr-u1-l4",
    unitId: "fr-unit-1",
    title: "Family & Friends",
    description: "Talk about your family members and introduce your friends.",
    order: 4,
    xpReward: 25,
    goals: ["Name parents", "Say my brother/sister", "Introduce your friend"],
    aiPrompt: "You are Alice, sharing stories about your family from Lyon...",
    vocabulary: [
      { word: "Mère", translation: "Mother", partOfSpeech: "noun", pronunciation: "MAIR" },
      { word: "Père", translation: "Father", partOfSpeech: "noun", pronunciation: "PAIR" },
      { word: "Frère", translation: "Brother", partOfSpeech: "noun", pronunciation: "FRAIR" }
    ],
    phrases: [
      { text: "Mon frère s'appelle Tom", translation: "My brother's name is Tom", context: "Introducing family" }
    ],
    activities: [
      { id: "fr-u1-l4-a1", type: "translate", question: "Translate: 'Mère'", correctAnswer: "Mother" }
    ]
  },
  {
    id: "fr-u1-l5",
    unitId: "fr-unit-1",
    title: "Daily Routines",
    description: "Talk about waking up, going to work, and daily activities.",
    order: 5,
    xpReward: 25,
    goals: ["Say the time", "Describe simple morning actions", "Talk about work"],
    aiPrompt: "You are Pierre, a busy executive talking about his schedule...",
    vocabulary: [
      { word: "Travailler", translation: "To work", partOfSpeech: "verb", pronunciation: "trah-vah-YAY" },
      { word: "Matin", translation: "Morning", partOfSpeech: "noun", pronunciation: "mah-TAN" },
      { word: "Café", translation: "Coffee", partOfSpeech: "noun", pronunciation: "cah-FAY" }
    ],
    phrases: [
      { text: "Je travaille le matin", translation: "I work in the morning", context: "Daily schedule" }
    ],
    activities: [
      { id: "fr-u1-l5-a1", type: "multiple-choice", question: "What is 'To work' in French?", options: ["Travailler", "Bonjour", "Merci"], correctAnswer: "Travailler" }
    ]
  },
  {
    id: "fr-u1-l6",
    unitId: "fr-unit-1",
    title: "Shopping in Paris",
    description: "Inquire about clothing sizes and prices in boutiques.",
    order: 6,
    xpReward: 25,
    goals: ["Ask how much a dress costs", "Talk about clothing colors", "Say it's expensive"],
    aiPrompt: "You are Manon, a helpful shop assistant in Le Marais...",
    vocabulary: [
      { word: "Combien", translation: "How much", partOfSpeech: "pronoun", pronunciation: "kohm-BYAN" },
      { word: "Robe", translation: "Dress", partOfSpeech: "noun", pronunciation: "ROHB" },
      { word: "Cher", translation: "Expensive", partOfSpeech: "adjective", pronunciation: "SHAIR" }
    ],
    phrases: [
      { text: "C'est combien ?", translation: "How much is it?", context: "Asking price" }
    ],
    activities: [
      { id: "fr-u1-l6-a1", type: "translate", question: "Translate: 'Combien'", correctAnswer: "How much" }
    ]
  },

  // ==========================================
  // JAPANESE LESSONS (Unit 1)
  // ==========================================
  {
    id: "ja-u1-l1",
    unitId: "ja-unit-1",
    title: "Hiragana Basics",
    description: "Learn primary Japanese Hiragana sounds: A, I, U, E, O.",
    order: 1,
    xpReward: 30,
    goals: ["Identify first Hiragana vowels", "Say hello in Japanese", "Acknowledge corrections"],
    aiPrompt: "You are Yuki, a supportive and helpful Japanese instructor from Kyoto...",
    vocabulary: [
      { word: "こんにちは (Konnichiwa)", translation: "Hello", partOfSpeech: "greeting", pronunciation: "kohn-nee-chee-wah" },
      { word: "はい (Hai)", translation: "Yes", partOfSpeech: "expression", pronunciation: "hai" },
      { word: "いいえ (Iie)", translation: "No", partOfSpeech: "expression", pronunciation: "ee-eh" }
    ],
    phrases: [
      { text: "こんにちは、元気ですか？", translation: "Hello, are you well?", context: "Greetings" }
    ],
    activities: [
      { id: "ja-u1-l1-a1", type: "multiple-choice", question: "How do you say 'Hello' in Japanese?", options: ["Sayounara", "Konnichiwa", "Arigatou"], correctAnswer: "Konnichiwa" }
    ]
  },
  {
    id: "ja-u1-l2",
    unitId: "ja-unit-1",
    title: "Meeting People",
    description: "Introduce your name and express nice to meet you.",
    order: 2,
    xpReward: 30,
    goals: ["Say your name", "Understand polite introductions", "Express gratitude"],
    aiPrompt: "You are Kenji, a polite university teacher from Tokyo...",
    vocabulary: [
      { word: "ありがとう (Arigatou)", translation: "Thank you", partOfSpeech: "expression", pronunciation: "ah-ree-gah-toh" },
      { word: "はじめまして (Hajimemashite)", translation: "Nice to meet you", partOfSpeech: "expression", pronunciation: "hah-jee-meh-mah-shee-teh" }
    ],
    phrases: [
      { text: "わたしはアレックスです (Watashi wa Arekkusu desu)", translation: "I am Alex", context: "Introducing oneself" }
    ],
    activities: [
      { id: "ja-u1-l2-a1", type: "translate", question: "Translate: 'はじめまして'", correctAnswer: "Nice to meet you" }
    ]
  },
  {
    id: "ja-u1-l3",
    unitId: "ja-unit-1",
    title: "At the Sushi Bar",
    description: "Order green tea and delicious sushi in a Japanese restaurant.",
    order: 3,
    xpReward: 30,
    goals: ["Order green tea", "Ask for sushi items", "Polite request using 'kudasai'"],
    aiPrompt: "You are Hiro, a passionate sushi chef in Osaka...",
    vocabulary: [
      { word: "お茶 (Ocha)", translation: "Green tea", partOfSpeech: "noun", pronunciation: "oh-chah" },
      { word: "寿司 (Sushi)", translation: "Sushi", partOfSpeech: "noun", pronunciation: "soo-shee" },
      { word: "ください (Kudasai)", translation: "Please", partOfSpeech: "expression", pronunciation: "koo-dah-sigh" }
    ],
    phrases: [
      { text: "お茶をください (Ocha wo kudasai)", translation: "Green tea, please", context: "Ordering food" }
    ],
    activities: [
      { id: "ja-u1-l3-a1", type: "multiple-choice", question: "What is 'Green tea' in Japanese?", options: ["Ocha", "Sushi", "Kudasai"], correctAnswer: "Ocha" }
    ]
  },
  {
    id: "ja-u1-l4",
    unitId: "ja-unit-1",
    title: "Asking Directions",
    description: "Locate train stations and convenience stores in Shibuya.",
    order: 4,
    xpReward: 30,
    goals: ["Ask where the station is", "Locate convenience stores", "Understand 'doko' (where)"],
    aiPrompt: "You are Sakura, a friendly resident in Tokyo helping foreigners...",
    vocabulary: [
      { word: "駅 (Eki)", translation: "Station", partOfSpeech: "noun", pronunciation: "eh-kee" },
      { word: "どこ (Doko)", translation: "Where", partOfSpeech: "pronoun", pronunciation: "doh-koh" },
      { word: "トイレ (Toire)", translation: "Restroom", partOfSpeech: "noun", pronunciation: "toy-reh" }
    ],
    phrases: [
      { text: "駅はどこですか？ (Eki wa doko desu ka?)", translation: "Where is the station?", context: "Asking directions" }
    ],
    activities: [
      { id: "ja-u1-l4-a1", type: "translate", question: "Translate: 'トイレはどこですか？'", correctAnswer: "Where is the restroom?" }
    ]
  },
  {
    id: "ja-u1-l5",
    unitId: "ja-unit-1",
    title: "Shopping in Tokyo",
    description: "Learn how to ask for prices and pay for items in Yen.",
    order: 5,
    xpReward: 30,
    goals: ["Ask how much something is", "Count to 10 in Japanese", "Discuss purchases"],
    aiPrompt: "You are Takeshi, a cashier at a trendy shop in Harajuku...",
    vocabulary: [
      { word: "いくら (Ikura)", translation: "How much", partOfSpeech: "pronoun", pronunciation: "ee-koo-rah" },
      { word: "これ (Kore)", translation: "This", partOfSpeech: "pronoun", pronunciation: "koh-reh" },
      { word: "円 (En)", translation: "Yen", partOfSpeech: "noun", pronunciation: "ehn" }
    ],
    phrases: [
      { text: "これはいくらですか？ (Kore wa ikura desu ka?)", translation: "How much is this?", context: "Asking price" }
    ],
    activities: [
      { id: "ja-u1-l5-a1", type: "multiple-choice", question: "What does 'Ikura' mean?", options: ["How much", "Hello", "Thank you"], correctAnswer: "How much" }
    ]
  },
  {
    id: "ja-u1-l6",
    unitId: "ja-unit-1",
    title: "Talking to Friends",
    description: "Learn to converse casually about hobbies and weather.",
    order: 6,
    xpReward: 30,
    goals: ["Use casual speech particles", "Talk about weather", "Ask about hobbies"],
    aiPrompt: "You are Risa, a cheerful anime fan talking to a classmate...",
    vocabulary: [
      { word: "友達 (Tomodachi)", translation: "Friend", partOfSpeech: "noun", pronunciation: "toh-moh-dah-chee" },
      { word: "天気 (Tenki)", translation: "Weather", partOfSpeech: "noun", pronunciation: "tehn-kee" },
      { word: "好き (Suki)", translation: "Like", partOfSpeech: "adjective", pronunciation: "soo-kee" }
    ],
    phrases: [
      { text: "日本が好きです (Nihon ga suki desu)", translation: "I like Japan", context: "Sharing preferences" }
    ],
    activities: [
      { id: "ja-u1-l6-a1", type: "translate", question: "Translate: '友達'", correctAnswer: "Friend" }
    ]
  },

  // ==========================================
  // KOREAN LESSONS (Unit 1)
  // ==========================================
  {
    id: "ko-u1-l1",
    unitId: "ko-unit-1",
    title: "Hangeul Vowels",
    description: "Learn simple Korean vowels: A, Ya, Eo, Yeo.",
    order: 1,
    xpReward: 30,
    goals: ["Read basic Korean vowels", "Learn greeting 'Annyeong'"],
    aiPrompt: "You are Ji-won, an encouraging Korean tutor from Seoul...",
    vocabulary: [
      { word: "안녕 (Annyeong)", translation: "Hello / Bye", partOfSpeech: "greeting", pronunciation: "ahn-nyuhng" },
      { word: "예 (Ye)", translation: "Yes", partOfSpeech: "expression", pronunciation: "yeh" },
      { word: "아니요 (Aniyo)", translation: "No", partOfSpeech: "expression", pronunciation: "ah-nee-yo" }
    ],
    phrases: [
      { text: "안녕하세요 (Annyeonghaseyo)", translation: "Hello (polite)", context: "Greetings" }
    ],
    activities: [
      { id: "ko-u1-l1-a1", type: "multiple-choice", question: "What is 'Annyeonghaseyo'?", options: ["Goodbye", "Please", "Hello (polite)"], correctAnswer: "Hello (polite)" }
    ]
  },
  {
    id: "ko-u1-l2",
    unitId: "ko-unit-1",
    title: "Hangeul Consonants",
    description: "Learn key Korean consonants: G, N, D, R, M.",
    order: 2,
    xpReward: 30,
    goals: ["Read consonants", "Spell simple Hangeul syllables"],
    aiPrompt: "You are Min-su, a friendly language student in Busan...",
    vocabulary: [
      { word: "감사합니다 (Gamsahabnida)", translation: "Thank you", partOfSpeech: "expression", pronunciation: "gahm-sah-hahb-nee-dah" },
      { word: "사람 (Saram)", translation: "Person", partOfSpeech: "noun", pronunciation: "sah-rahm" }
    ],
    phrases: [
      { text: "감사합니다, 친구 (Gamsahabnida, chingu)", translation: "Thank you, friend", context: "Polite expressions" }
    ],
    activities: [
      { id: "ko-u1-l2-a1", type: "translate", question: "Translate: '감사합니다'", correctAnswer: "Thank you" }
    ]
  },
  {
    id: "ko-u1-l3",
    unitId: "ko-unit-1",
    title: "Greetings & Polite Words",
    description: "Practice introducing your name and country.",
    order: 3,
    xpReward: 30,
    goals: ["Introduce your name", "Introduce your country", "Use formal endings"],
    aiPrompt: "You are Eun-ji, an enthusiastic teacher...",
    vocabulary: [
      { word: "이름 (Ireum)", translation: "Name", partOfSpeech: "noun", pronunciation: "ee-reum" },
      { word: "친구 (Chingu)", translation: "Friend", partOfSpeech: "noun", pronunciation: "cheen-goo" }
    ],
    phrases: [
      { text: "제 이름은 민우입니다 (Je ireumeun Minu-imnida)", translation: "My name is Minwoo", context: "Introductions" }
    ],
    activities: [
      { id: "ko-u1-l3-a1", type: "multiple-choice", question: "What is 'Friend' in Korean?", options: ["Chingu", "Ireum", "Annyeong"], correctAnswer: "Chingu" }
    ]
  },
  {
    id: "ko-u1-l4",
    unitId: "ko-unit-1",
    title: "Ordering K-Food",
    description: "Learn to order Bibimbap and water in Korean.",
    order: 4,
    xpReward: 30,
    goals: ["Order water", "Request food politely using 'juseyo'"],
    aiPrompt: "You are Yejin, a friendly restaurant owner in Insadong...",
    vocabulary: [
      { word: "물 (Mul)", translation: "Water", partOfSpeech: "noun", pronunciation: "mool" },
      { word: "밥 (Bap)", translation: "Rice / Food", partOfSpeech: "noun", pronunciation: "bahp" },
      { word: "주세요 (Juseyo)", translation: "Please give", partOfSpeech: "expression", pronunciation: "joo-seh-yo" }
    ],
    phrases: [
      { text: "물 주세요 (Mul juseyo)", translation: "Water, please", context: "Ordering drinks" }
    ],
    activities: [
      { id: "ko-u1-l4-a1", type: "translate", question: "Translate: '물 주세요'", correctAnswer: "Water, please" }
    ]
  },
  {
    id: "ko-u1-l5",
    unitId: "ko-unit-1",
    title: "Talking about Hobbies",
    description: "Discuss watching K-dramas and listening to K-pop.",
    order: 5,
    xpReward: 30,
    goals: ["List hobbies", "Say what you like"],
    aiPrompt: "You are Jun-seo, a friendly fellow K-pop fan...",
    vocabulary: [
      { word: "음악 (Eumak)", translation: "Music", partOfSpeech: "noun", pronunciation: "eu-mahk" },
      { word: "좋아하다 (Johahada)", translation: "To like", partOfSpeech: "verb", pronunciation: "joh-ah-hah-dah" }
    ],
    phrases: [
      { text: "한국 음악을 좋아해요 (Hanguk eumageul johahaeyo)", translation: "I like Korean music", context: "Hobbies" }
    ],
    activities: [
      { id: "ko-u1-l5-a1", type: "multiple-choice", question: "What is 'Music' in Korean?", options: ["Eumak", "Mul", "Bap"], correctAnswer: "Eumak" }
    ]
  },
  {
    id: "ko-u1-l6",
    unitId: "ko-unit-1",
    title: "Shopping in Myeongdong",
    description: "Learn sizes, colors, and prices of cosmetic items.",
    order: 6,
    xpReward: 30,
    goals: ["Ask how much a pack is", "Name common colors"],
    aiPrompt: "You are Hana, a retail assistant in Myeongdong...",
    vocabulary: [
      { word: "얼마 (Eolma)", translation: "How much", partOfSpeech: "pronoun", pronunciation: "uhl-mah" },
      { word: "이거 (Igeo)", translation: "This", partOfSpeech: "pronoun", pronunciation: "ee-guh" }
    ],
    phrases: [
      { text: "이거 얼마예요? (Igeo eolmayeyo?)", translation: "How much is this?", context: "Asking price" }
    ],
    activities: [
      { id: "ko-u1-l6-a1", type: "translate", question: "Translate: '이거 얼마예요?'", correctAnswer: "How much is this?" }
    ]
  },

  // ==========================================
  // GERMAN LESSONS (Unit 1)
  // ==========================================
  {
    id: "de-u1-l1",
    unitId: "de-unit-1",
    title: "German Greetings",
    description: "Learn Guten Tag, Hallo, and simple German introductions.",
    order: 1,
    xpReward: 20,
    goals: ["Say hello and goodbye", "Ask how someone is doing"],
    aiPrompt: "You are Hans, a friendly German tutor from Berlin...",
    vocabulary: [
      { word: "Hallo", translation: "Hello", partOfSpeech: "greeting", pronunciation: "HAH-loh" },
      { word: "Guten Tag", translation: "Good day / Hello", partOfSpeech: "greeting", pronunciation: "GOO-ten TAHK" },
      { word: "Tschüss", translation: "Goodbye", partOfSpeech: "greeting", pronunciation: "tshuess" }
    ],
    phrases: [
      { text: "Wie geht es dir?", translation: "How are you?", context: "Checking on friends" }
    ],
    activities: [
      { id: "de-u1-l1-a1", type: "multiple-choice", question: "How do you say 'Hello' in German?", options: ["Tschüss", "Hallo", "Nein"], correctAnswer: "Hallo" }
    ]
  },
  {
    id: "de-u1-l2",
    unitId: "de-unit-1",
    title: "Introducing Yourself",
    description: "Learn to state your name and where you live.",
    order: 2,
    xpReward: 20,
    goals: ["Say your name using 'Ich heiße'", "Say where you live"],
    aiPrompt: "You are Anna, a friendly university helper from Munich...",
    vocabulary: [
      { word: "Name", translation: "Name", partOfSpeech: "noun", pronunciation: "NAH-meh" },
      { word: "Deutschland", translation: "Germany", partOfSpeech: "noun", pronunciation: "DOYTCH-lahnt" }
    ],
    phrases: [
      { text: "Ich heiße Alex", translation: "My name is Alex", context: "Introductions" }
    ],
    activities: [
      { id: "de-u1-l2-a1", type: "translate", question: "Translate: 'Ich heiße Alex'", correctAnswer: "My name is Alex" }
    ]
  },
  {
    id: "de-u1-l3",
    unitId: "de-unit-1",
    title: "At the Beer Garden",
    description: "Order a soft drink or pretzel politely.",
    order: 3,
    xpReward: 20,
    goals: ["Order drinks politely", "Use 'Bitte' and 'Danke'"],
    aiPrompt: "You are Lukas, a cheerful beer garden server in Stuttgart...",
    vocabulary: [
      { word: "Wasser", translation: "Water", partOfSpeech: "noun", pronunciation: "VAHS-ser" },
      { word: "Bitte", translation: "Please", partOfSpeech: "expression", pronunciation: "BIT-teh" },
      { word: "Danke", translation: "Thank you", partOfSpeech: "expression", pronunciation: "DAHN-keh" }
    ],
    phrases: [
      { text: "Ein Wasser, bitte", translation: "A water, please", context: "Ordering" }
    ],
    activities: [
      { id: "de-u1-l3-a1", type: "multiple-choice", question: "What is 'Please' in German?", options: ["Danke", "Bitte", "Hallo"], correctAnswer: "Bitte" }
    ]
  },
  {
    id: "de-u1-l4",
    unitId: "de-unit-1",
    title: "Getting Around",
    description: "Find the bus station and train platforms.",
    order: 4,
    xpReward: 20,
    goals: ["Locate the train station", "Understand left and right"],
    aiPrompt: "You are Sarah, a local helping travelers at Frankfurt Hauptbahnhof...",
    vocabulary: [
      { word: "Bahnhof", translation: "Train station", partOfSpeech: "noun", pronunciation: "BAHN-hohf" },
      { word: "Wo", translation: "Where", partOfSpeech: "pronoun", pronunciation: "voh" }
    ],
    phrases: [
      { text: "Wo ist der Bahnhof ?", translation: "Where is the train station?", context: "Asking directions" }
    ],
    activities: [
      { id: "de-u1-l4-a1", type: "translate", question: "Translate: 'Wo ist der Bahnhof?'", correctAnswer: "Where is the train station?" }
    ]
  },
  {
    id: "de-u1-l5",
    unitId: "de-unit-1",
    title: "Shopping & Numbers",
    description: "Learn to request prices and count up to 10.",
    order: 5,
    xpReward: 20,
    goals: ["Count to ten", "Ask how much an apple costs"],
    aiPrompt: "You are Klaus, a friendly merchant in Hamburg market...",
    vocabulary: [
      { word: "Kostet", translation: "Costs", partOfSpeech: "verb", pronunciation: "KOHS-tet" },
      { word: "Euro", translation: "Euro", partOfSpeech: "noun", pronunciation: "OY-roh" }
    ],
    phrases: [
      { text: "Was kostet das?", translation: "How much does that cost?", context: "Asking prices" }
    ],
    activities: [
      { id: "de-u1-l5-a1", type: "multiple-choice", question: "What is 'Was kostet das?'", options: ["How much does that cost?", "Where is the station?", "Thank you"], correctAnswer: "How much does that cost?" }
    ]
  },
  {
    id: "de-u1-l6",
    unitId: "de-unit-1",
    title: "My Family",
    description: "Talk about your family members in German.",
    order: 6,
    xpReward: 20,
    goals: ["Introduce father/mother", "Talk about siblings"],
    aiPrompt: "You are Maximilian, describing your family in Berlin...",
    vocabulary: [
      { word: "Mutter", translation: "Mother", partOfSpeech: "noun", pronunciation: "MOOT-ter" },
      { word: "Vater", translation: "Father", partOfSpeech: "noun", pronunciation: "FAH-ter" }
    ],
    phrases: [
      { text: "Meine Mutter ist nett", translation: "My mother is nice", context: "Describing family" }
    ],
    activities: [
      { id: "de-u1-l6-a1", type: "translate", question: "Translate: 'Vater'", correctAnswer: "Father" }
    ]
  },

  // ==========================================
  // CHINESE LESSONS (Unit 1)
  // ==========================================
  {
    id: "zh-u1-l1",
    unitId: "zh-unit-1",
    title: "First Tones & Hello",
    description: "Learn basic flat tones and the greeting Ni Hao.",
    order: 1,
    xpReward: 25,
    goals: ["Master first tone pitch", "Say hello in Mandarin"],
    aiPrompt: "You are Lanlan, an encouraging Mandarin instructor from Beijing...",
    vocabulary: [
      { word: "你好 (Nǐ hǎo)", translation: "Hello", partOfSpeech: "greeting", pronunciation: "nee haow" },
      { word: "谢谢 (Xièxie)", translation: "Thank you", partOfSpeech: "expression", pronunciation: "shyeh-shyeh" },
      { word: "再见 (Zàijiàn)", translation: "Goodbye", partOfSpeech: "greeting", pronunciation: "dzigh-jee-en" }
    ],
    phrases: [
      { text: "你好吗？ (Nǐ hǎo ma?)", translation: "How are you?", context: "Greetings" }
    ],
    activities: [
      { id: "zh-u1-l1-a1", type: "multiple-choice", question: "How do you say 'Hello' in Chinese?", options: ["Zàijiàn", "Nǐ hǎo", "Xièxie"], correctAnswer: "Nǐ hǎo" }
    ]
  },
  {
    id: "zh-u1-l2",
    unitId: "zh-unit-1",
    title: "Numbers & Counting",
    description: "Learn to count from 1 to 10 in Chinese.",
    order: 2,
    xpReward: 25,
    goals: ["Count one to ten", "Hand gestures for Chinese numbers"],
    aiPrompt: "You are Chen, a patient math tutor from Shanghai...",
    vocabulary: [
      { word: "一 (Yī)", translation: "One", partOfSpeech: "noun", pronunciation: "yee" },
      { word: "二 (Èr)", translation: "Two", partOfSpeech: "noun", pronunciation: "uhr" },
      { word: "三 (Sān)", translation: "Three", partOfSpeech: "noun", pronunciation: "sahn" }
    ],
    phrases: [
      { text: "一 二 三 (Yī èr sān)", translation: "One two three", context: "Counting" }
    ],
    activities: [
      { id: "zh-u1-l2-a1", type: "translate", question: "Translate: '三'", correctAnswer: "Three" }
    ]
  },
  {
    id: "zh-u1-l3",
    unitId: "zh-unit-1",
    title: "At the Tea House",
    description: "Order Jasmine tea and green tea politely in Chinese.",
    order: 3,
    xpReward: 25,
    goals: ["Order tea", "Polite expressions like 'Qǐng'"],
    aiPrompt: "You are Xiaomei, a helpful tea master in Hangzhou...",
    vocabulary: [
      { word: "茶 (Chá)", translation: "Tea", partOfSpeech: "noun", pronunciation: "chah" },
      { word: "水 (Shuǐ)", translation: "Water", partOfSpeech: "noun", pronunciation: "shway" },
      { word: "请 (Qǐng)", translation: "Please", partOfSpeech: "expression", pronunciation: "ching" }
    ],
    phrases: [
      { text: "请给我茶 (Qǐng gěi wǒ chá)", translation: "Please give me tea", context: "Ordering" }
    ],
    activities: [
      { id: "zh-u1-l3-a1", type: "multiple-choice", question: "What is 'Tea' in Chinese?", options: ["Chá", "Shuǐ", "Qǐng"], correctAnswer: "Chá" }
    ]
  },
  {
    id: "zh-u1-l4",
    unitId: "zh-unit-1",
    title: "Asking the Way",
    description: "Find your way around Beijing's hutongs.",
    order: 4,
    xpReward: 25,
    goals: ["Ask where the restroom is", "Find the subway station"],
    aiPrompt: "You are Wang, a helpful local resident...",
    vocabulary: [
      { word: "在哪儿 (Zài nǎ'er)", translation: "Where is", partOfSpeech: "pronoun", pronunciation: "dzigh nar" },
      { word: "地铁站 (Dìtiězhàn)", translation: "Subway station", partOfSpeech: "noun", pronunciation: "dee-tyeh-jahn" }
    ],
    phrases: [
      { text: "地铁站在哪儿？ (Dìtiězhàn zài nǎ'er?)", translation: "Where is the subway station?", context: "Asking directions" }
    ],
    activities: [
      { id: "zh-u1-l4-a1", type: "translate", question: "Translate: '地铁站'", correctAnswer: "Subway station" }
    ]
  },
  {
    id: "zh-u1-l5",
    unitId: "zh-unit-1",
    title: "Buying Fruits",
    description: "Inquire about prices of apples and oranges at market.",
    order: 5,
    xpReward: 25,
    goals: ["Ask for prices using 'Duōshǎo qián'", "Identify basic fruits"],
    aiPrompt: "You are Auntie Zhang, a lively fruit vendor in Beijing...",
    vocabulary: [
      { word: "多少钱 (Duōshǎo qián)", translation: "How much money", partOfSpeech: "expression", pronunciation: "dwoh-shaow chyen" },
      { word: "苹果 (Píngguǒ)", translation: "Apple", partOfSpeech: "noun", pronunciation: "ping-gwoh" }
    ],
    phrases: [
      { text: "苹果多少钱？ (Píngguǒ duōshǎo qián?)", translation: "How much are apples?", context: "Asking price" }
    ],
    activities: [
      { id: "zh-u1-l5-a1", type: "multiple-choice", question: "What does 'Duōshǎo qián' mean?", options: ["How much money", "Thank you", "Goodbye"], correctAnswer: "How much money" }
    ]
  },
  {
    id: "zh-u1-l6",
    unitId: "zh-unit-1",
    title: "Introducing Friends",
    description: "Introduce your class friends to your parents.",
    order: 6,
    xpReward: 25,
    goals: ["Say 'This is my friend'", "Name standard pronouns like 'He'/'She'"],
    aiPrompt: "You are Lihua, introducing classmates at a high school gathering...",
    vocabulary: [
      { word: "朋友 (Péngyou)", translation: "Friend", partOfSpeech: "noun", pronunciation: "pung-yo" },
      { word: "他 (Tā)", translation: "He / Him", partOfSpeech: "pronoun", pronunciation: "tah" }
    ],
    phrases: [
      { text: "这是我的朋友 (Zhè shì wǒ de péngyou)", translation: "This is my friend", context: "Introductions" }
    ],
    activities: [
      { id: "zh-u1-l6-a1", type: "translate", question: "Translate: '朋友'", correctAnswer: "Friend" }
    ]
  }
];
