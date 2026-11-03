export type StudentYear = 2 | 4;

export type PokemonStatus = "healthy" | "tired" | "poisoned";

export interface CapturedPokemon {
  id: string;
  name: string;
  species: string;
  emoji: string;
  pokedexId: number;
  artworkUrl: string;
  spriteUrl: string;
  animatedUrl?: string;
  type: string;
  typeColor: string;
  level: number;
  exp: number;
  maxEnergy: number;
  energy: number;
  status: PokemonStatus;
  caughtAt: string;
  friendship: number; // 0 - 100
  notes?: string;
}

export interface RpgInventory {
  pokeballs: number;
  potions: number;
  antidotes: number;
  berries: number;
  fireStones: number;
  waterStones: number;
  thunderStones: number;
  leafStones: number;
  moonStones: number;
}

export interface WildPokemonDef {
  pokedexId: number;
  species: string;
  name: string;
  emoji: string;
  type: string;
  typeColor: string;
  baseCatchRate: number; // 0.0 - 1.0
  description: string;
  habitat: string;
  artworkUrl: string;
  spriteUrl: string;
  animatedUrl?: string;
}

export interface ExplorerSkills {
  surf: boolean;  // 🏊 Nadar na água (aprendido no Ginásio de Ciências)
  cut: boolean;   // 🌿 Cortar arbustos (aprendido no Ginásio de Português)
  flash: boolean; // 💡 Lanterna para cavernas (aprendido no Ginásio de Inglês)
  smash: boolean; // ⛏️ Quebrar rochas / cavar (aprendido no Ginásio de Matemática)
}

export interface GymBadges {
  math_boulder: boolean;      // 📐 Insígnia dos Números (Pewter City)
  science_cascade: boolean;   // 🔬 Insígnia da Descoberta (Cerulean City)
  portuguese_rainbow: boolean;// 📚 Insígnia da Leitura (Celadon City)
  english_thunder: boolean;   // 🌍 Insígnia Global (Vermilion City)
}

export type HairStyleId = "straight" | "ponytail" | "braids" | "bob_bangs" | "double_buns";

export interface PlayerCustomization {
  hairStyle: HairStyleId;
  hairColor: string; // Hex color code
  skinTone: string;  // Hex color code
  eyeColor: string;  // Hex color code
  outfitId: string;  // e.g. "firered_classic", "floral_dress", "school_uniform", "pikachu_hoodie"
  hatId: string | null; // e.g. "red_cap", "pink_bow", "trainer_band", null
  accessoryId: string | null; // e.g. "glasses", "backpack", "headphones", null
}

export interface WardrobeItem {
  id: string;
  category: "outfit" | "hat" | "accessory";
  name: string;
  description: string;
  emoji: string;
  price: number;
  unlockedByDefault?: boolean;
}

export type RivalGender = "boy" | "girl";

export interface RivalConfig {
  name: string;
  gender: RivalGender;
  starterPokedexId: number;
  defeatedEncounters: string[]; // e.g. ["intro", "route1", "gym_math", "gym_science", "gym_portuguese", "gym_english"]
}

export interface TradeOffer {
  senderSister: "Bianca" | "Cecília";
  pokemon: CapturedPokemon;
  timestamp: number;
  status: "pending" | "accepted" | "completed" | "cancelled";
}

export interface SisterSyncState {
  sisterName: "Bianca" | "Cecília";
  x: number;
  y: number;
  facing: "up" | "down" | "left" | "right";
  isMoving: boolean;
  isSurfing: boolean;
  customization?: PlayerCustomization;
  activePokemonName?: string;
  lastSeen: number;
  tradeOffer?: TradeOffer | null;
}

export type ProfileId = "cecilia" | "bianca";

export interface RpgSaveData {
  id: ProfileId;
  playerName: "Cecília" | "Bianca";
  year: StudentYear;
  pin: string; // 4-digit PIN or password
  x: number;
  y: number;
  direction: "up" | "down" | "left" | "right";
  currentZone: string;
  coins: number;
  xp: number;
  inventory: RpgInventory;
  pokemonList: CapturedPokemon[];
  stolenPokemonList: CapturedPokemon[];
  unlockedRoutes: Record<string, boolean>;
  explorerSkills: ExplorerSkills;
  gymBadges: GymBadges;
  customization: PlayerCustomization;
  unlockedWardrobeItems: string[];
  activeQuest: any | null; // ActiveStoryQuest
  phoneMessages: any[]; // PhoneMessage[]
  rivalConfig?: RivalConfig | null;
  answeredQuestionIds?: string[]; // IDs of correctly answered questions (Anti-Repetition Engine)
  updatedAt: string;
}

export interface CloudSyncStatus {
  isConfigured: boolean;
  isOnline: boolean;
  lastSavedAt: string | null;
  isSaving: boolean;
  error?: string | null;
}

export interface ActiveInteriorState {
  buildingId: string;
  buildingName: string;
  floor: 1 | 2;
  returnX: number;
  returnY: number;
}

