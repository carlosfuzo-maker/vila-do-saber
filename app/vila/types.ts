export type StudentYear = 2 | 4;

export interface Chapter {
  id: number;
  number: number;
  title: string;
  description: string;
  tags?: string[];
}

export interface Mission {
  id: string;
  title: string;
  xp: number;
  stars: number;
  type: "quiz" | "minigame" | "leitura" | "desafio";
  durationMinutes: number;
  completed?: boolean;
}

export interface SubjectBuilding {
  id: string;
  name: string;
  buildingName: string;
  subtitle: string;
  accentColor: string; // Tailwind color token or class
  bgGradient: string;
  borderColor: string;
  textColor: string;
  icon: string; // Icon identifier
  currentChapterId: number;
  chapters: Chapter[];
  missions: Mission[];
  position: { x: number; y: number }; // For map layout coords if applicable
  buildingArtType: "castle" | "library" | "lab" | "tower" | "english" | "tech" | "art" | "garden";
}

export interface ExamAlert {
  id: string;
  year: StudentYear;
  subjectId: string;
  subjectName: string;
  examDate: string; // ISO date string YYYY-MM-DD
  chaptersCovered: string;
  notes?: string;
  createdAt: string;
}

export interface AvatarCustomization {
  gender: "girl" | "boy";
  skinTone: string;
  hairStyle: "pigtails" | "long" | "curly" | "bob" | "short" | "afro" | "ponytail";
  hairColor: string;
  eyeColor: string;
  outfitId: string;
  accessoryId: string;
  petId: string | null;
  blushStyle?: "none" | "soft" | "freckles";
}

export interface MomErrand {
  id: string;
  title: string;
  targetPlace: "padaria" | "acougue" | "casa_amiga" | "house";
  placeName: string;
  npcName: string;
  npcEmoji: string;
  npcRole: string;
  description: string;
  rewardCoins: number;
  rewardXp: number;
  speechText: string;
  completionPrompt: string;
}

export interface ShopItem {
  id: string;
  name: string;
  category: "outfit" | "furniture" | "pet" | "accessory";
  price: number;
  icon: string;
  description: string;
  emoji?: string;
}

export interface InteriorStation {
  id: string;
  name: string;
  description: string;
  x: number;
  y: number;
  icon: string;
  emoji?: string;
  type: "task" | "exam" | "wardrobe" | "pet_corner";
  taskId?: string;
  completed?: boolean;
}

export interface StudentProfile {
  name: string;
  year: StudentYear;
  gradeLabel: string;
  avatarUrl: string;
  level: number;
  currentXp: number;
  targetXp: number;
  stars: number;
  coins: number;
  streakDays: number;
  quote: string;
  unlockedChapter: number;
  unlockedChapters: number[];
  relicPieces: number;
  puzzleSolvedCount: number;
  avatar: AvatarCustomization;
  inventory: {
    outfits: string[];
    furniture: string[];
    pets: string[];
    accessories: string[];
  };
  housePlacedFurniture: Array<{ itemId: string; x: number; y: number }>;
  buildingUpgrades: Record<string, number>;
  completedErrands?: string[];
  friendName?: string;
}

export interface PuzzleEnigma {
  id: string;
  year: StudentYear;
  chapterSource: number;
  unlocksChapter: number;
  title: string;
  story: string;
  vaultCode: [number, number, number];
  digitClues: [
    { subject: string; question: string; hint: string; answer: number },
    { subject: string; question: string; hint: string; answer: number },
    { subject: string; question: string; hint: string; answer: number }
  ];
  rewardXp: number;
  rewardStars: number;
  rewardCoins: number;
}

export interface AuthorFeedback {
  hasBeginning: boolean;
  hasMiddle: boolean;
  hasEnding: boolean;
  wordCount: number;
  structureScore: number; // 1 to 5
  mascotReaction: "magnificent" | "great" | "good_start";
  title: string;
  praiseComment: string;
  tipsComment: string;
  badges: string[];
}

export interface WrittenBook {
  id: string;
  year: StudentYear;
  authorName: string;
  title: string;
  content: string;
  chapterTitle: string;
  themePrompt: string;
  coverColor: string;
  starsAwarded: number;
  coinsAwarded: number;
  xpAwarded: number;
  createdAt: string;
  feedback: AuthorFeedback;
}

export interface PhoneMessage {
  id: string;
  sender: "papai" | "mamae" | "amiga" | "sistema";
  senderName: string;
  avatarEmoji: string;
  text: string;
  timeAgo: string;
  targetSubjectId?: string;
  targetCityName?: string;
  rewardCoins?: number;
  rewardXp?: number;
  rewardPotions?: number;
  isCompleted?: boolean;
  requiredToUnlockRoute?: boolean;
}

export interface ActiveStoryQuest {
  id: string;
  sender: "papai" | "mamae";
  title: string;
  description: string;
  targetSubjectId: string;
  targetCityName: string;
  rewardCoins: number;
  rewardXp: number;
  rewardPotions?: number;
  requiredCount: number;
  currentCount: number;
  isCompleted: boolean;
}

export interface RocketBattleState {
  isActive: boolean;
  routeId: string;
  subjectId: string;
  subjectName: string;
  enemyHp: number;
  maxEnemyHp: number;
  playerHp: number;
  maxPlayerHp: number;
  enemyDialogue: string;
}
