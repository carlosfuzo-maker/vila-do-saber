"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { playSound } from "@/lib/soundEffects";
import { KnowledgeBattleModal } from "../vila/pokemonEngine/KnowledgeBattleModal";
import { SaberPhoneModal } from "../vila/pokemonEngine/SaberPhoneModal";
import { PokemonCaptureModal } from "./components/PokemonCaptureModal";
import { RpgBagModal } from "./components/RpgBagModal";
import { RpgMarketModal } from "./components/RpgMarketModal";
import RocketRescueModal from "./components/RocketRescueModal";
import { KantoPokedexModal } from "./components/KantoPokedexModal";
import { CharacterCustomizationModal, WARDROBE_CATALOG } from "./components/CharacterCustomizationModal";
import { GymChallengeModal, GYM_DEFINITIONS } from "./components/GymChallengeModal";
import { PokemonEvolutionModal } from "./components/PokemonEvolutionModal";
import { RivalChallengeModal } from "./components/RivalChallengeModal";
import { PokemonTradeModal } from "./components/PokemonTradeModal";
import { BuildingInteriorModal, BuildingType } from "./components/BuildingInteriorModal";
import { IndigoPlateauModal } from "./components/IndigoPlateauModal";
import { ExamAlertModal } from "../vila/components/ExamAlertModal";
import { RpgLoginScreen } from "./components/RpgLoginScreen";
import { RpgCloudSettingsModal } from "./components/RpgCloudSettingsModal";
import {
  KANTO_POKEDEX_151,
  getWaterPokemonPool,
  getLandPokemonPool,
  getPokemonArtworkUrl,
  getPokemonSpriteUrl,
  getPokemonAnimatedUrl,
  getWeightedEncounter,
  getPokemonById,
} from "./data/kantoPokedex";
import {
  getRegionalWeightedEncounter,
  RpgGeneration,
} from "./data/regionalPokedex";
import {
  CapturedPokemon,
  RpgInventory,
  WildPokemonDef,
  PokemonStatus,
  ExplorerSkills,
  GymBadges,
  PlayerCustomization,
  RivalConfig,
  SisterSyncState,
  ProfileId,
  RpgSaveData,
  CloudSyncStatus,
  ActiveInteriorState,
} from "./rpgTypes";
import {
  AcademicSubject,
  AcademicQuestion,
  ACADEMIC_QUESTIONS_BANK,
  getRandomAcademicQuestion,
  getSubjectMasteryStats,
  getAvailableQuestions,
} from "./data/academicQuestions";
import {
  MAP_COLS,
  MAP_ROWS,
  TILE_SIZE,
  KANTO_BUILDINGS,
  PROTECTED_BUILDING_DOORS,
  isProtectedDoorZone,
  ProtectedDoor,
  KANTO_SIGNPOSTS,
  getKantoZone,
  generateKantoWorldGrid,
} from "./data/kantoWorldData";
import {
  HOUSE_COLS,
  HOUSE_ROWS,
  isHouseTileWalkable,
  getHouseInteractable,
  drawFamilyHouseInterior,
} from "./data/familyHouseData";
import {
  POKEMON_CENTER_COLS,
  POKEMON_CENTER_ROWS,
  isPokemonCenterWalkable,
  getPokemonCenterInteractable,
  drawPokemonCenterInterior,
} from "./data/pokemonCenterData";
import {
  POKEMART_COLS,
  POKEMART_ROWS,
  isPokemartWalkable,
  getPokemartInteractable,
  drawPokemartInterior,
} from "./data/pokemartData";
import {
  CAVE_COLS,
  CAVE_ROWS,
  isCaveTileWalkable,
  getCaveInteractable,
  drawCaveInterior,
  drawCaveOverworldEntrance,
} from "./data/caveData";
import {
  FOREST_COLS,
  FOREST_ROWS,
  isForestTallGrass,
  isForestTileWalkable,
  getForestInteractable,
  drawForestInterior,
  drawForestOverworldGate,
} from "./data/forestData";
import {
  MATH_ACADEMY_COLS,
  MATH_ACADEMY_ROWS,
  isMathAcademyWalkable,
  getMathAcademyInteractable,
  drawMathAcademyInterior,
} from "./data/mathAcademyData";
import {
  PORTUGUESE_LIB_COLS,
  PORTUGUESE_LIB_ROWS,
  isPortugueseLibWalkable,
  getPortugueseLibInteractable,
  drawPortugueseLibInterior,
} from "./data/portugueseLibData";
import {
  ENGLISH_TOWER_COLS,
  ENGLISH_TOWER_ROWS,
  isEnglishTowerWalkable,
  getEnglishTowerInteractable,
  drawEnglishTowerInterior,
} from "./data/englishTowerData";
import {
  OAK_LAB_COLS,
  OAK_LAB_ROWS,
  isOakLabWalkable,
  getOakLabInteractable,
  drawOakLabInterior,
} from "./data/oakLabData";
import {
  RIVAL_HOUSE_COLS,
  RIVAL_HOUSE_ROWS,
  isRivalHouseWalkable,
  getRivalHouseInteractable,
  drawRivalHouseInterior,
} from "./data/rivalHouseData";
import {
  INDIGO_PLATEAU_COLS,
  INDIGO_PLATEAU_ROWS,
  isIndigoPlateauWalkable,
  getIndigoPlateauInteractable,
  drawIndigoPlateauInterior,
} from "./data/indigoPlateauData";
import {
  loadProfileSave,
  saveProfileSave,
  ACTIVE_PROFILE_KEY,
  getSupabaseClient,
  getDefaultProfileSave,
} from "@/lib/supabaseClient";
import { STUDENT_PROFILES, INITIAL_EXAMS, SUBJECTS_YEAR_2, SUBJECTS_YEAR_4 } from "../vila/data";
import { StudentProfile, PhoneMessage, ActiveStoryQuest, ExamAlert } from "../vila/types";
import {
  Sparkles,
  Volume2,
  VolumeX,
  ArrowLeft,
  Coins,
  Star,
  MapPin,
  HelpCircle,
  Footprints,
  Compass,
  Trophy,
  CheckCircle2,
  XCircle,
  Home,
  BookOpen,
  Award,
  ShieldAlert,
  ShieldCheck,
  RotateCcw,
  Swords,
  Lock,
  Unlock,
  Smartphone,
  PhoneCall,
  BellRing,
  ShoppingBag,
  Heart,
  AlertTriangle,
  Cloud,
  LogOut,
  Settings,
  Database,
  RefreshCw,
} from "lucide-react";

// Types
export type Direction = "down" | "up" | "left" | "right";
export type StudentYear = 2 | 4;
export type SubjectRouteId = "matematica" | "ciencias" | "portugues" | "ingles" | "biologia" | "quimica";

interface PlayerState {
  gridX: number;
  gridY: number;
  drawX: number;
  drawY: number;
  direction: Direction;
  isMoving: boolean;
  moveProgress: number;
  walkFrame: number;
  isRunning: boolean;
}

interface NpcDef {
  id: string;
  name: string;
  role: string;
  x: number;
  y: number;
  sprite:
    | "carlos"
    | "mamae"
    | "cecilia"
    | "bianca"
    | "pitagoras"
    | "flora"
    | "palavra"
    | "oliver"
    | "rocket"
    | "clerk"
    | "rival"
    | "rival_boy"
    | "rival_girl"
    | "picnic"
    | "pipoca"
    | "prof";
  dialog: (year: StudentYear, sisterName: string) => string;
  quiz?: (year: StudentYear) => {
    id?: string;
    question: string;
    options: (string | number)[];
    correctIndex: number;
    explanation: string;
  };
  isRocket?: boolean;
  subjectId?: SubjectRouteId;
  isQuestEvent?: boolean;
  forceBlock?: boolean;
}

interface SignpostDef {
  x: number;
  y: number;
  title: string;
  lines: string[];
  isQuestEvent?: boolean;
  forceBlock?: boolean;
}

export type { ProtectedDoor };
export { PROTECTED_BUILDING_DOORS, isProtectedDoorZone };

interface BuildingDoorDef {
  x: number;
  y: number;
  name: string;
  zone: string;
  accent: string;
  type?: "house" | "market" | "hideout" | "school" | "plateau";
}

interface RocketBattleData {
  isOpen: boolean;
  subjectId: SubjectRouteId;
  subjectName: string;
  cityName: string;
  questionId?: string;
  questionData: {
    question: string;
    options: (string | number)[];
    correctIndex: number;
    explanation: string;
  };
}

// Wild Pokemon Database generated dynamically from complete Kanto 151 Pokédex
const WILD_POKEMON_LIST: WildPokemonDef[] = KANTO_POKEDEX_151.map((p) => ({
  pokedexId: p.pokedexId,
  species: p.species,
  name: p.name,
  emoji: p.emoji,
  type: p.type,
  typeColor: p.typeColor,
  baseCatchRate: p.baseCatchRate,
  description: p.description,
  habitat: p.isWaterType ? "Rios e Mares de Kanto (Aquático)" : p.habitat,
  artworkUrl: getPokemonArtworkUrl(p.pokedexId),
  spriteUrl: getPokemonSpriteUrl(p.pokedexId),
  animatedUrl: getPokemonAnimatedUrl(p.pokedexId),
}));


// Academic Question Bank for Rocket Battles & Knowledge Duels
// Integrated with Anti-Repetition Engine (180+ Questions across all 6 subjects)
const getRocketQuestion = (
  subjectId: SubjectRouteId,
  year: StudentYear,
  answeredIds: string[]
) => {
  return getRandomAcademicQuestion(subjectId as AcademicSubject, year, answeredIds);
};

// Parental Directives Generator (Papai Carlos and Mamãe Renata)
const PARENT_DIRECTIVES_TEMPLATE: Array<{
  sender: "papai" | "mamae";
  senderName: string;
  avatarEmoji: string;
  title: string;
  text: (name: string, sisterName: string) => string;
  targetSubjectId: string;
  targetCityName: string;
  rewardCoins: number;
  rewardXp: number;
  rewardPotions?: number;
}> = [
  // Missões Urgentes do Papai Carlos (Bloqueio restritivo ativo de rotas)
  {
    sender: "papai",
    senderName: "Papai Carlos",
    avatarEmoji: "👨‍👧",
    title: "Missão Urgente do Pai: Investigar Ciências no Vale!",
    text: (name) =>
      `Filha ${name}, vá resolver a matéria de Ciências no Vale das Ciências! Não passe para outras cidades antes de concluir esse estudo!`,
    targetSubjectId: "ciencias",
    targetCityName: "Vale das Ciências",
    rewardCoins: 50,
    rewardXp: 40,
  },
  {
    sender: "papai",
    senderName: "Papai Carlos",
    avatarEmoji: "👨‍👧",
    title: "Missão Urgente do Pai: Multiplicação na Metrópole!",
    text: (name) =>
      `Filha ${name}, o Professor Pitágoras precisa da sua ajuda na Metrópole da Matemática com a tabuada! Vá direto para lá resolver o desafio!`,
    targetSubjectId: "matematica",
    targetCityName: "Metrópole da Matemática",
    rewardCoins: 50,
    rewardXp: 40,
  },
  {
    sender: "papai",
    senderName: "Papai Carlos",
    avatarEmoji: "👨‍👧",
    title: "Missão Urgente do Pai: Leitura na Cidadela!",
    text: (name) =>
      `Filha ${name}, a Dona Palavra tem um livro especial para você na Cidadela do Português! Vá lá agora mesmo e mostre sua dedicação!`,
    targetSubjectId: "portugues",
    targetCityName: "Cidadela do Português",
    rewardCoins: 50,
    rewardXp: 40,
  },
  {
    sender: "papai",
    senderName: "Papai Carlos",
    avatarEmoji: "👨‍👧",
    title: "Missão Urgente do Pai: Inglês no Distrito Tech!",
    text: (name) =>
      `Filha ${name}, hora da aula prática com o Teacher Oliver no Distrito de Inglês! Conclua o desafio de vocabulário antes de passear!`,
    targetSubjectId: "ingles",
    targetCityName: "Distrito de Inglês & Tech",
    rewardCoins: 50,
    rewardXp: 40,
  },
  // Missões Carinhosas da Mamãe Renata (Cuidado doméstico com pets e plantas -> Moedas + Poções!)
  {
    sender: "mamae",
    senderName: "Mamãe Renata",
    avatarEmoji: "👩‍👧",
    title: "Pedido da Mamãe: Regar as Plantinhas do Jardim!",
    text: (name) =>
      `Filha ${name}, regue com amor o canteiro de flores da nossa casa! Ganhe moedas e poções curativas para seus Pokémon!`,
    targetSubjectId: "flores",
    targetCityName: "Jardim da Família",
    rewardCoins: 40,
    rewardXp: 30,
    rewardPotions: 2,
  },
  {
    sender: "mamae",
    senderName: "Mamãe Renata",
    avatarEmoji: "👩‍👧",
    title: "Pedido da Mamãe: Cuidar do Cachorrinho Pipoca!",
    text: (name) =>
      `Filha ${name}, dê um carinho bem gostoso no nosso cachorrinho Pipoca no quintal da casa ou no Bosque dos Pets!`,
    targetSubjectId: "pet",
    targetCityName: "Quintal da Família",
    rewardCoins: 40,
    rewardXp: 30,
    rewardPotions: 2,
  },
  {
    sender: "mamae",
    senderName: "Mamãe Renata",
    avatarEmoji: "👩‍👧",
    title: "Pedido da Mamãe: Abraçar a Irmã!",
    text: (name, sisterName) =>
      `Meu amor ${name}, dê um abraço bem carinhoso na sua irmã ${sisterName} perto do quintal e brinquem juntas com amor!`,
    targetSubjectId: "irma",
    targetCityName: "Vila da Família",
    rewardCoins: 40,
    rewardXp: 30,
    rewardPotions: 2,
  },
];

export default function RpgPage() {
  // Player Profile & Cloud Login State
  const [activeProfileId, setActiveProfileId] = useState<ProfileId | null>(null);
  const [profilePin, setProfilePin] = useState<string>("4444");
  const [isCloudSettingsOpen, setIsCloudSettingsOpen] = useState<boolean>(false);
  const [cloudSyncStatus, setCloudSyncStatus] = useState<CloudSyncStatus>({
    isConfigured: false,
    isOnline: false,
    lastSavedAt: null,
    isSaving: false,
  });
  const [isCheckingInitialSession, setIsCheckingInitialSession] = useState<boolean>(true);

  // Periodic / debounced cloud save tracking refs
  const lastTileArrivalRef = useRef<number>(0);
  const lastSavedPosRef = useRef<{ x: number; y: number }>({ x: 32, y: 154 });

  // Player year: Cecília (4) or Bianca (2)
  const [currentYear, setCurrentYear] = useState<StudentYear>(4);
  const isPlayerCecilia = currentYear === 4;
  const playerName = isPlayerCecilia ? "Cecília" : "Bianca";
  const sisterName = isPlayerCecilia ? "Bianca" : "Cecília";

  // Score & Coins
  const [coins, setCoins] = useState<number>(180);
  const [xp, setXp] = useState<number>(420);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showHelp, setShowHelp] = useState<boolean>(false);

  // Active Zone tracking & Banner
  const [currentZone, setCurrentZone] = useState<string>("Vila da Família");
  const [zoneBanner, setZoneBanner] = useState<{ title: string; subtitle: string; icon: string } | null>({
    title: "Vila da Família",
    subtitle: "Lar do Papai Carlos, Mamãe Renata e as irmãs",
    icon: "🏡",
  });

  // Route Lock States (Defeating Rocket Grunt unlocks route)
  const [unlockedRoutes, setUnlockedRoutes] = useState<Record<SubjectRouteId, boolean>>({
    matematica: false,
    ciencias: false,
    portugues: false,
    ingles: false,
    biologia: false,
    quimica: false,
  });

  // ========================================================
  // INVENTORY & POKEMON STATES (WITH LOCALSTORAGE PERSISTENCE)
  // ========================================================
  const [inventory, setInventory] = useState<RpgInventory>({
    pokeballs: 5,
    potions: 2,
    antidotes: 2,
    berries: 3,
    thunderStones: 1,
    waterStones: 1,
    fireStones: 0,
    leafStones: 0,
    moonStones: 0,
  });

  const [pokemonList, setPokemonList] = useState<CapturedPokemon[]>([
    {
      id: "starter-1",
      name: isPlayerCecilia ? "Pikachu" : "Eevee",
      species: isPlayerCecilia ? "Pikachu" : "Eevee",
      emoji: isPlayerCecilia ? "⚡" : "🦊",
      pokedexId: isPlayerCecilia ? 25 : 133,
      artworkUrl: isPlayerCecilia ? getPokemonArtworkUrl(25) : getPokemonArtworkUrl(133),
      spriteUrl: isPlayerCecilia ? getPokemonSpriteUrl(25) : getPokemonSpriteUrl(133),
      animatedUrl: isPlayerCecilia ? getPokemonAnimatedUrl(25) : getPokemonAnimatedUrl(133),
      type: isPlayerCecilia ? "Elétrico" : "Normal",
      typeColor: isPlayerCecilia ? "#eab308" : "#b45309",
      level: 5,
      exp: 0,
      maxEnergy: 100,
      energy: 100,
      status: "healthy",
      caughtAt: "Início da Jornada",
      friendship: 90,
    },
  ]);

  const [stolenPokemonList, setStolenPokemonList] = useState<CapturedPokemon[]>([]);

  // Modals States
  const [isBagOpen, setIsBagOpen] = useState<boolean>(false);
  const [isMarketOpen, setIsMarketOpen] = useState<boolean>(false);
  const [isRescueOpen, setIsRescueOpen] = useState<boolean>(false);
  const [isPokedexOpen, setIsPokedexOpen] = useState<boolean>(false);
  const [isCustomizationOpen, setIsCustomizationOpen] = useState<boolean>(false);
  const [isGymModalOpen, setIsGymModalOpen] = useState<boolean>(false);
  const [activeGymId, setActiveGymId] = useState<"math" | "science" | "portuguese" | "english">("math");
  const [activeWildEncounter, setActiveWildEncounter] = useState<WildPokemonDef | null>(null);

  // Building Interior State
  const [activeBuilding, setActiveBuilding] = useState<{
    id: string;
    name: string;
    type: BuildingType;
    returnX: number;
    returnY: number;
  } | null>(null);

  // Walkable Mini-Map Interior Engine State (FireRed authentic rooms)
  const [activeInterior, setActiveInterior] = useState<ActiveInteriorState | null>(null);
  const [healingCenterSlots, setHealingCenterSlots] = useState<number>(0);
  const [brokenCaveRocks, setBrokenCaveRocks] = useState<Record<string, boolean>>({});
  const [cutForestBushes, setCutForestBushes] = useState<Record<string, boolean>>({});
  const [openedForestChests, setOpenedForestChests] = useState<Record<string, boolean>>({});

  // Restore 100% HP & Energy to all Pokemon
  const healAllPokemon = useCallback(() => {
    setPokemonList((prev) =>
      prev.map((p) => ({
        ...p,
        energy: p.maxEnergy,
        status: "healthy" as const,
      }))
    );
  }, []);

  // Pokemon Evolution Modal State
  const [isEvolutionModalOpen, setIsEvolutionModalOpen] = useState<boolean>(false);
  const [activeEvolution, setActiveEvolution] = useState<{
    pokemon: CapturedPokemon;
    targetPokedexId: number;
    method: "level" | "stone" | "trade";
  } | null>(null);

  // Rival Gary State & Modal
  const [isRivalModalOpen, setIsRivalModalOpen] = useState<boolean>(false);
  const [rivalConfig, setRivalConfig] = useState<RivalConfig | null>({
    name: "Gary",
    gender: "boy",
    starterPokedexId: isPlayerCecilia ? 133 : 25,
    defeatedEncounters: [],
  });

  // Multiplayer Live Synchronization & Trade State
  const [isTradeModalOpen, setIsTradeModalOpen] = useState<boolean>(false);
  const [otherPlayerSync, setOtherPlayerSync] = useState<SisterSyncState | null>(null);

  // Explorer Skills (HM: Surf, Cut, Flash, Smash)
  const [explorerSkills, setExplorerSkills] = useState<ExplorerSkills>({
    surf: false,
    cut: false,
    flash: false,
    smash: false,
  });

  // Gym Badges
  const [gymBadges, setGymBadges] = useState<GymBadges>({
    math_boulder: false,
    science_cascade: false,
    portuguese_rainbow: false,
    english_thunder: false,
  });

  // Character Visual Customization
  const [customization, setCustomization] = useState<PlayerCustomization>({
    hairStyle: isPlayerCecilia ? "ponytail" : "straight",
    hairColor: isPlayerCecilia ? "#4a2e18" : "#eab308",
    skinTone: "#fed7aa",
    eyeColor: isPlayerCecilia ? "#451a03" : "#0284c7",
    outfitId: "firered_classic",
    hatId: "red_cap",
    accessoryId: "explorer_backpack",
  });

  // Unlocked Wardrobe Items
  const [unlockedWardrobeItems, setUnlockedWardrobeItems] = useState<string[]>([
    "firered_classic",
    "red_cap",
    "explorer_backpack",
  ]);

  const updateExplorerSkills = (newSkills: ExplorerSkills) => {
    setExplorerSkills(newSkills);
  };

  const updateGymBadges = (newBadges: GymBadges) => {
    setGymBadges(newBadges);
  };

  const updateCustomization = (newCustom: PlayerCustomization) => {
    setCustomization(newCustom);
  };

  const unlockWardrobeItem = (itemId: string) => {
    setUnlockedWardrobeItems((prev) => [...prev, itemId]);
  };

  // Real-time multiplayer synchronization with Sister's tablet
  useEffect(() => {
    const syncInterval = setInterval(async () => {
      try {
        const p = playerRef.current;
        const currentTile = mapData.current[p.gridY]?.[p.gridX];
        const res = await fetch("/api/rpg/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sisterName,
            x: p.gridX,
            y: p.gridY,
            facing: p.direction,
            isMoving: p.isMoving,
            isSurfing: explorerSkills.surf && currentTile === "W",
            customization,
            activePokemonName: pokemonList[0]?.name,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.otherPlayer) {
            setOtherPlayerSync(data.otherPlayer);
          } else {
            setOtherPlayerSync(null);
          }
        }
      } catch {
        // Silently ignore if offline
      }
    }, 1500);

    return () => clearInterval(syncInterval);
  }, [sisterName, explorerSkills.surf, customization, pokemonList]);

  // Knowledge Battle Modal State
  const [activeBattle, setActiveBattle] = useState<RocketBattleData | null>(null);

  // Notice alert when a route is newly opened or Pokemon stolen
  const [victoryNotice, setVictoryNotice] = useState<string | null>(null);

  // Steps since last encounter in tall grass
  const tallGrassSteps = useRef<number>(0);

  // ========================================================
  // POKÉCELULAR STATES & SIMULATION
  // ========================================================
  const [isPhoneOpen, setIsPhoneOpen] = useState<boolean>(false);
  const [hasUnreadPhone, setHasUnreadPhone] = useState<boolean>(true);
  const [phoneToast, setPhoneToast] = useState<{ sender: string; title: string } | null>({
    sender: "Papai Carlos",
    title: "Nova Missão Escolar no PokéCelular!",
  });

  // Indigo Plateau Exam & Revision States (synchronized with Vila do Saber via localStorage)
  const [exams, setExams] = useState<ExamAlert[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("vila_exams");
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.warn("Failed to load exams", e);
      }
    }
    return INITIAL_EXAMS;
  });

  const [isPlateauModalOpen, setIsPlateauModalOpen] = useState<boolean>(false);
  const [isExamModalOpen, setIsExamModalOpen] = useState<boolean>(false);

  const currentSubjects = currentYear === 2 ? SUBJECTS_YEAR_2 : SUBJECTS_YEAR_4;
  const activeStudentExams = useMemo(() => {
    return exams.filter((e) => e.year === currentYear);
  }, [exams, currentYear]);
  const isExamWeekActive = activeStudentExams.length > 0;

  const handleSaveExam = (newExam: ExamAlert) => {
    setExams((prev) => {
      const idx = prev.findIndex((e) => e.id === newExam.id);
      const updated = idx >= 0 ? prev.map((e, i) => (i === idx ? newExam : e)) : [...prev, newExam];
      try {
        localStorage.setItem("vila_exams", JSON.stringify(updated));
      } catch {}
      return updated;
    });
    setVictoryNotice(`📅 Prova de ${newExam.subjectName} cadastrada! O Indigo Plateau ativará a Revisão Geral!`);
    setTimeout(() => setVictoryNotice(null), 5000);
  };

  const handleDeleteExam = (examId: string) => {
    setExams((prev) => {
      const updated = prev.filter((e) => e.id !== examId);
      try {
        localStorage.setItem("vila_exams", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Initial Story Quest from Papai Carlos
  const [activeQuest, setActiveQuest] = useState<ActiveStoryQuest | null>({
    id: "quest-initial-1",
    sender: "papai",
    title: isPlayerCecilia
      ? "Missão Urgente do Pai: Matemática na Metrópole"
      : "Missão Urgente do Pai: Ciências no Vale",
    description: isPlayerCecilia
      ? "Filha Cecília, vá até a Metrópole da Matemática resolver os desafios de tabuada! Conclua esse pedido antes de ir a outros lugares!"
      : "Filha Bianca, vá até o Vale das Ciências estudar os seres vivos e vencer a barreira da Equipe Rocket!",
    targetSubjectId: isPlayerCecilia ? "matematica" : "ciencias",
    targetCityName: isPlayerCecilia ? "Metrópole da Matemática" : "Vale das Ciências",
    rewardCoins: 50,
    rewardXp: 40,
    requiredCount: 1,
    currentCount: 0,
    isCompleted: false,
  });

  // PokéCelular Messages Feed
  const [messages, setMessages] = useState<PhoneMessage[]>([
    {
      id: "msg-1",
      sender: "papai",
      senderName: "Papai Carlos",
      avatarEmoji: "👨‍👧",
      text: isPlayerCecilia
        ? "Filha Cecília, o Professor Pitágoras na Metrópole da Matemática precisa da sua ajuda com a tabuada! Vá direto para lá e conclua seu dever escolar!"
        : "Filha Bianca, a Dra. Flora mandou um recado sobre as plantinhas no Vale das Ciências! Vá lá primeiro cumprir a missão!",
      timeAgo: "Agora",
      targetSubjectId: isPlayerCecilia ? "matematica" : "ciencias",
      targetCityName: isPlayerCecilia ? "Metrópole da Matemática" : "Vale das Ciências",
      rewardCoins: 50,
      rewardXp: 40,
      isCompleted: false,
      requiredToUnlockRoute: true,
    },
    {
      id: "msg-2",
      sender: "mamae",
      senderName: "Mamãe Renata",
      avatarEmoji: "👩‍👧",
      text: `Bom dia, meu amorzinho! Beba bastante água, regue as plantinhas no jardim da nossa casa e dê um carinho bem gostoso no Pipoca!`,
      timeAgo: "10 min atrás",
      rewardCoins: 40,
      rewardPotions: 2,
      isCompleted: false,
    },
  ]);

  // Dialog State (FireRed style bottom box)
  const [activeDialog, setActiveDialog] = useState<{
    speaker: string;
    role?: string;
    avatarSprite?: string;
    text: string;
    quiz?: {
      id?: string;
      question: string;
      options: (string | number)[];
      correctIndex: number;
      explanation: string;
    };
    actionButton?: {
      label: string;
      onClick: () => void;
    };
    hasAnswered?: boolean;
    isCorrect?: boolean;
    rewardClaimed?: boolean;
  } | null>(null);

  // Answered Academic Questions (Anti-Repetition Tracking per Profile)
  const [answeredQuestionIds, setAnsweredQuestionIds] = useState<string[]>([]);
  const answeredQuestionIdsRef = useRef<string[]>([]);

  const markQuestionAnswered = useCallback(
    (questionId: string) => {
      if (!questionId) return;
      if (answeredQuestionIdsRef.current.includes(questionId)) return;
      const updated = [...answeredQuestionIdsRef.current, questionId];
      answeredQuestionIdsRef.current = updated;
      setAnsweredQuestionIds(updated);

      if (typeof window !== "undefined" && activeProfileId) {
        try {
          const localKey = `vila_rpg_save_${activeProfileId}`;
          const raw = localStorage.getItem(localKey);
          if (raw) {
            const parsed = JSON.parse(raw);
            parsed.answeredQuestionIds = updated;
            localStorage.setItem(localKey, JSON.stringify(parsed));
          }
        } catch (e) {
          console.warn("[Anti-Repetition] LocalStorage sync warning:", e);
        }
      }
    },
    [activeProfileId]
  );

  // Camera Zoom State (FireRed closer framing, default 1.45x)
  const [cameraZoom, setCameraZoom] = useState<number>(1.45);
  const cameraZoomRef = useRef<number>(1.45);

  useEffect(() => {
    cameraZoomRef.current = cameraZoom;
    try {
      localStorage.setItem("vila_rpg_zoom", String(cameraZoom));
    } catch {
      // ignore
    }
  }, [cameraZoom]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("vila_rpg_zoom");
      if (saved) {
        const val = parseFloat(saved);
        if (!isNaN(val) && val >= 1.0 && val <= 2.5) {
          setCameraZoom(val);
          cameraZoomRef.current = val;
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Canvas Ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Player position state (Pallet Town outside Ash's House)
  const playerRef = useRef<PlayerState>({
    gridX: 32,
    gridY: 154,
    drawX: 32,
    drawY: 154,
    direction: "down",
    isMoving: false,
    moveProgress: 0,
    walkFrame: 0,
    isRunning: false,
  });

  // Movement input buffer
  const keysDown = useRef<Record<string, boolean>>({});
  const touchDirection = useRef<Direction | null>(null);
  const targetMoveTile = useRef<{ x: number; y: number } | null>(null);
  const doorCooldownRef = useRef<number>(0);

  // Clear movement buffers whenever any modal opens or closes to prevent ghost walking
  useEffect(() => {
    targetMoveTile.current = null;
    touchDirection.current = null;
    keysDown.current = {};
  }, [
    activeBuilding,
    activeInterior,
    isPlateauModalOpen,
    isBagOpen,
    isPhoneOpen,
    isMarketOpen,
    isRescueOpen,
    isPokedexOpen,
    isCustomizationOpen,
    isGymModalOpen,
    isEvolutionModalOpen,
    isRivalModalOpen,
    isTradeModalOpen,
    isExamModalOpen,
    isCloudSettingsOpen,
    showHelp,
  ]);

  // Map Data Generation
  const mapData = useRef<string[][]>([]);
  const waterTick = useRef<number>(0);

  // Modern Atmospheric Ambient Particles (Leaves, Petals, Light Dust)
  const particlesRef = useRef<
    Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      type: "leaf" | "petal" | "sparkle";
      rotation: number;
      rotSpeed: number;
    }>
  >([]);

  // Gen 3 FireRed Sprites Cache for Overworld Roaming Pokemon
  const pokemonSpriteImages = useRef<Record<number, HTMLImageElement>>({});

  // Official FireRed Overworld Tilesets & Buildings Cache
  const fireredTilesheets = useRef<Record<string, HTMLImageElement>>({});
  // Official FireRed Character Spritesheets Cache
  const fireredCharacters = useRef<Record<string, HTMLImageElement>>({});

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ids = [25, 133, 1, 4, 7, 39, 12, 16, 37, 54, 143, 175, 58];
    ids.forEach((id) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = getPokemonSpriteUrl(id);
      img.onload = () => {
        pokemonSpriteImages.current[id] = img;
      };
    });

    // Preload FireRed tiles, buildings & authentic interior maps
    const tileList: Array<{ name: string; path: string }> = [
      { name: "outdoor", path: "/assets/rpg/tiles/outdoor.png" },
      { name: "flowers", path: "/assets/rpg/tiles/flowers.png" },
      { name: "ground", path: "/assets/rpg/tiles/ground.png" },
      { name: "house", path: "/assets/rpg/tiles/house.png" },
      { name: "center", path: "/assets/rpg/tiles/center.png" },
      { name: "mart", path: "/assets/rpg/tiles/mart.png" },
      { name: "house_floor1", path: "/assets/rpg/house_floor1.png" },
      { name: "house_floor2", path: "/assets/rpg/house_floor2.png" },
      { name: "center_inside", path: "/assets/rpg/center_inside.png" },
      { name: "mart_inside", path: "/assets/rpg/mart_inside.png" },
      { name: "forest_map", path: "/assets/rpg/forest_map.png" },
      { name: "cave_map", path: "/assets/rpg/cave_map.png" },
      { name: "items_pokeball", path: "/assets/rpg/items/poke-ball.png" },
      { name: "items_potion", path: "/assets/rpg/items/potion.png" },
      { name: "gym_pewter", path: "/assets/rpg/gym_pewter.png" },
      { name: "gym_celadon", path: "/assets/rpg/gym_celadon.png" },
      { name: "gym_vermilion", path: "/assets/rpg/gym_vermilion.png" },
      { name: "lab_inside", path: "/assets/rpg/lab_inside.png" },
      { name: "plateau_inside", path: "/assets/rpg/plateau_inside.png" },
    ];
    tileList.forEach(({ name, path }) => {
      const img = new Image();
      fireredTilesheets.current[name] = img;
      img.src = path;
    });

    // Preload FireRed characters
    const charList = [
      "player",
      "cecilia",
      "bianca",
      "parent",
      "prof",
      "rival",
      "clerk",
      "nurse",
      "scout",
      "picnic",
      "villager",
      "villager2",
      "rocket",
      "rocket_f",
    ];
    charList.forEach((name) => {
      const img = new Image();
      fireredCharacters.current[name] = img;
      img.src = `/assets/rpg/characters/${name}.png`;
    });
  }, []);

  // Sound helper with mute check
  const playSfx = useCallback(
    (type: "pop" | "star" | "success" | "click" | "open" | "fanfare") => {
      if (!isMuted) {
        playSound(type);
      }
    },
    [isMuted]
  );

  // ========================================================
  // PER-PROFILE CLOUD & SUPABASE PERSISTENCE (LOAD & SAVE)
  // ========================================================

  // Apply a loaded save data snapshot to current game state
  const applySaveData = useCallback((data: RpgSaveData, fromCloud: boolean) => {
    setActiveProfileId(data.id);
    setCurrentYear(data.year);
    setProfilePin(data.pin || (data.id === "cecilia" ? "4444" : "2222"));
    setCoins(typeof data.coins === "number" ? data.coins : 180);
    setXp(typeof data.xp === "number" ? data.xp : 420);
    if (data.inventory) setInventory(data.inventory);
    if (Array.isArray(data.pokemonList) && data.pokemonList.length > 0) setPokemonList(data.pokemonList);
    if (Array.isArray(data.stolenPokemonList)) setStolenPokemonList(data.stolenPokemonList);
    if (data.unlockedRoutes) setUnlockedRoutes(data.unlockedRoutes as any);
    if (data.explorerSkills) setExplorerSkills(data.explorerSkills);
    if (data.gymBadges) setGymBadges(data.gymBadges);
    if (data.customization) setCustomization(data.customization);
    if (Array.isArray(data.unlockedWardrobeItems)) setUnlockedWardrobeItems(data.unlockedWardrobeItems);
    if (data.activeQuest) setActiveQuest(data.activeQuest);
    if (Array.isArray(data.phoneMessages)) setMessages(data.phoneMessages);
    if (data.rivalConfig) setRivalConfig(data.rivalConfig);
    if (data.currentZone) setCurrentZone(data.currentZone);
    if (Array.isArray(data.answeredQuestionIds)) {
      setAnsweredQuestionIds(data.answeredQuestionIds);
      answeredQuestionIdsRef.current = data.answeredQuestionIds;
    } else {
      setAnsweredQuestionIds([]);
      answeredQuestionIdsRef.current = [];
    }

    // Restore exact tile position on the map (safely fallback to Pallet Town)
    let targetX = typeof data.x === "number" ? data.x : 32;
    let targetY = typeof data.y === "number" ? data.y : 154;
    // Migrate legacy coordinates from old 40x64 map
    if ((targetX === 10 && targetY === 54) || targetX < 1 || targetX >= MAP_COLS - 1 || targetY < 1 || targetY >= MAP_ROWS - 1) {
      targetX = 32;
      targetY = 154;
    }
    const savedTile = mapData.current[targetY]?.[targetX];
    if (savedTile === "X" || savedTile === "H" || savedTile === "#" || savedTile === "W") {
      targetX = 32;
      targetY = 154;
    }
    playerRef.current.gridX = targetX;
    playerRef.current.gridY = targetY;
    playerRef.current.drawX = targetX;
    playerRef.current.drawY = targetY;
    playerRef.current.direction = data.direction || "down";
    playerRef.current.isMoving = false;
    playerRef.current.moveProgress = 0;
    lastSavedPosRef.current = { x: targetX, y: targetY };

    if (typeof window !== "undefined") {
      localStorage.setItem(ACTIVE_PROFILE_KEY, data.id);
    }

    setCloudSyncStatus({
      isConfigured: Boolean(getSupabaseClient()),
      isOnline: fromCloud,
      lastSavedAt: new Date(data.updatedAt || Date.now()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isSaving: false,
    });
    setIsCheckingInitialSession(false);
  }, []);

  // Check stored active profile session on page mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedActive = localStorage.getItem(ACTIVE_PROFILE_KEY) as ProfileId | null;
    if (storedActive === "cecilia" || storedActive === "bianca") {
      loadProfileSave(storedActive)
        .then(({ data, fromCloud }) => {
          applySaveData(data, fromCloud);
        })
        .catch(() => {
          setIsCheckingInitialSession(false);
        });
    } else {
      setIsCheckingInitialSession(false);
    }
  }, [applySaveData]);

  // Performs save to localStorage and Supabase database
  const performCloudSave = useCallback(
    async (isManual: boolean = false) => {
      if (!activeProfileId) return;

      setCloudSyncStatus((prev) => ({ ...prev, isSaving: true }));
      const p = playerRef.current;

      const currentSave: RpgSaveData = {
        id: activeProfileId,
        playerName: activeProfileId === "cecilia" ? "Cecília" : "Bianca",
        year: currentYear,
        pin: profilePin,
        x: activeInterior ? activeInterior.returnX : p.gridX,
        y: activeInterior ? activeInterior.returnY : p.gridY,
        direction: p.direction,
        currentZone,
        coins,
        xp,
        inventory,
        pokemonList,
        stolenPokemonList,
        unlockedRoutes: unlockedRoutes as any,
        explorerSkills,
        gymBadges,
        customization,
        unlockedWardrobeItems,
        activeQuest,
        phoneMessages: messages,
        rivalConfig,
        answeredQuestionIds: answeredQuestionIdsRef.current,
        updatedAt: new Date().toISOString(),
      };

      const res = await saveProfileSave(currentSave);
      const nowStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

      setCloudSyncStatus({
        isConfigured: Boolean(getSupabaseClient()),
        isOnline: res.cloudSaved,
        lastSavedAt: nowStr,
        isSaving: false,
        error: res.error,
      });

      if (isManual) {
        playSfx("success");
        setVictoryNotice(
          res.cloudSaved
            ? `☁️ Progresso de ${playerName} salvo na nuvem Supabase (${nowStr})!`
            : `💾 Progresso de ${playerName} salvo no tablet (${nowStr})!`
        );
      }
    },
    [
      activeProfileId,
      currentYear,
      profilePin,
      playerName,
      currentZone,
      coins,
      xp,
      inventory,
      pokemonList,
      stolenPokemonList,
      unlockedRoutes,
      explorerSkills,
      gymBadges,
      customization,
      unlockedWardrobeItems,
      activeQuest,
      messages,
      rivalConfig,
      answeredQuestionIds,
      playSfx,
    ]
  );

  // Auto-save on major state changes (debounced 1.2s)
  useEffect(() => {
    if (!activeProfileId || isCheckingInitialSession) return;
    const timer = setTimeout(() => {
      performCloudSave(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, [
    activeProfileId,
    isCheckingInitialSession,
    pokemonList,
    coins,
    xp,
    inventory,
    unlockedRoutes,
    explorerSkills,
    gymBadges,
    customization,
    unlockedWardrobeItems,
    activeQuest,
    answeredQuestionIds,
    performCloudSave,
  ]);

  // Auto-save position when player stops moving on a tile (debounced 1.5s)
  useEffect(() => {
    if (!activeProfileId || isCheckingInitialSession) return;

    const interval = setInterval(() => {
      const p = playerRef.current;
      if (!p.isMoving && lastTileArrivalRef.current > 0) {
        const timeSinceMove = Date.now() - lastTileArrivalRef.current;
        if (
          timeSinceMove > 1500 &&
          (p.gridX !== lastSavedPosRef.current.x || p.gridY !== lastSavedPosRef.current.y)
        ) {
          lastSavedPosRef.current = { x: p.gridX, y: p.gridY };
          performCloudSave(false);
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [activeProfileId, isCheckingInitialSession, performCloudSave]);

  // Logout / Switch Profile handler
  const handleLogout = useCallback(async () => {
    if (activeProfileId) {
      await performCloudSave(false);
    }
    setActiveProfileId(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem(ACTIVE_PROFILE_KEY);
    }
    playSfx("open");
  }, [activeProfileId, performCloudSave, playSfx]);

  // Periodic Message Simulation (Every 45s-60s or triggered on demand)
  const triggerNewParentMessage = useCallback(() => {
    const randomTemplate =
      PARENT_DIRECTIVES_TEMPLATE[Math.floor(Math.random() * PARENT_DIRECTIVES_TEMPLATE.length)];

    const potionsAward =
      randomTemplate.rewardPotions || (randomTemplate.sender === "mamae" ? 2 : undefined);

    const newQuest: ActiveStoryQuest = {
      id: `quest-${Date.now()}`,
      sender: randomTemplate.sender,
      title: randomTemplate.title,
      description: randomTemplate.text(playerName, sisterName),
      targetSubjectId: randomTemplate.targetSubjectId,
      targetCityName: randomTemplate.targetCityName,
      rewardCoins: randomTemplate.rewardCoins,
      rewardXp: randomTemplate.rewardXp,
      rewardPotions: potionsAward,
      requiredCount: 1,
      currentCount: 0,
      isCompleted: false,
    };

    setActiveQuest(newQuest);
    setMessages((prev) => [
      {
        id: `msg-${Date.now()}`,
        sender: randomTemplate.sender,
        senderName: randomTemplate.senderName,
        avatarEmoji: randomTemplate.avatarEmoji,
        text: randomTemplate.text(playerName, sisterName),
        timeAgo: "Agora",
        targetSubjectId: randomTemplate.targetSubjectId,
        targetCityName: randomTemplate.targetCityName,
        rewardCoins: randomTemplate.rewardCoins,
        rewardXp: randomTemplate.rewardXp,
        rewardPotions: potionsAward,
        isCompleted: false,
      },
      ...prev,
    ]);

    setHasUnreadPhone(true);
    setPhoneToast({
      sender: randomTemplate.senderName,
      title: randomTemplate.title,
    });
    playSfx("open");

    setTimeout(() => {
      setPhoneToast(null);
    }, 6000);
  }, [playerName, sisterName, playSfx]);

  // Periodic Notification Manager for PokéCelular
  // Emits periodic alerts based on school subject states, scheduled exams & domestic playful tasks
  useEffect(() => {
    const notificationInterval = setInterval(() => {
      // 1. If Dad's mission is urgent and pending, remind the student of the route lock
      if (activeQuest && activeQuest.sender === "papai" && !activeQuest.isCompleted) {
        setHasUnreadPhone(true);
        setPhoneToast({
          sender: "Papai Carlos",
          title: "⚠️ Missão Urgente Pendente!",
        });
        setMessages((prev) => [
          {
            id: `msg-alert-${Date.now()}`,
            sender: "papai",
            senderName: "Papai Carlos",
            avatarEmoji: "👨‍👧",
            text: `Atenção, ${playerName}! Volte aqui após finalizar o pedido de seu pai. Vá primeiro para ${activeQuest.targetCityName} concluir o desafio!`,
            timeAgo: "Agora",
            isCompleted: false,
          },
          ...prev,
        ]);
        playSfx("pop");
        setTimeout(() => setPhoneToast(null), 5000);
        return;
      }

      // 2. If an exam is scheduled for the student, emit School Bulletin for Indigo Plateau
      if (isExamWeekActive && activeStudentExams[0]) {
        const upcomingExam = activeStudentExams[0];
        setHasUnreadPhone(true);
        setPhoneToast({
          sender: "Indigo Plateau 🏔️",
          title: "Semana de Provas Ativada!",
        });
        setMessages((prev) => [
          {
            id: `msg-exam-${Date.now()}`,
            sender: "sistema",
            senderName: "Cúpula dos Campeões",
            avatarEmoji: "🏔️",
            text: `📅 Alerta Escolar: Prova de ${upcomingExam.subjectName} marcada (${upcomingExam.examDate})! Capítulos: ${upcomingExam.chaptersCovered}. Vá ao topo do mapa no Indigo Plateau para o Simulado de Revisão com EXP em Dobro (2x)!`,
            timeAgo: "Agora",
            isCompleted: false,
          },
          ...prev,
        ]);
        playSfx("open");
        setTimeout(() => setPhoneToast(null), 6000);
        return;
      }

      // 3. Periodic household / domestic playful reminder from Mamãe Renata
      if (!activeQuest || activeQuest.isCompleted) {
        triggerNewParentMessage();
      } else if (activeQuest.sender === "mamae" && !activeQuest.isCompleted) {
        setHasUnreadPhone(true);
        setPhoneToast({
          sender: "Mamãe Renata",
          title: "🌸 Tarefinha Doméstica!",
        });
        setMessages((prev) => [
          {
            id: `msg-mom-${Date.now()}`,
            sender: "mamae",
            senderName: "Mamãe Renata",
            avatarEmoji: "👩‍👧",
            text: `Oi ${playerName}! Não se esqueça de regar o canteiro de flores e dar água para o Pipoca no quintal para ganhar suas Poções extras!`,
            timeAgo: "Agora",
            rewardCoins: 40,
            rewardPotions: 2,
            isCompleted: false,
          },
          ...prev,
        ]);
        playSfx("pop");
        setTimeout(() => setPhoneToast(null), 5000);
      }
    }, 45000);

    return () => clearInterval(notificationInterval);
  }, [
    activeQuest,
    isExamWeekActive,
    activeStudentExams,
    playerName,
    triggerNewParentMessage,
    playSfx,
  ]);

  // Occasional Pokemon tiredness / care need simulation
  useEffect(() => {
    const careInterval = setInterval(() => {
      setPokemonList((prev) => {
        if (prev.length === 0) return prev;
        // 35% chance to make one random healthy pokemon tired or poisoned
        if (Math.random() < 0.35) {
          const updated = [...prev];
          const targetIdx = Math.floor(Math.random() * updated.length);
          const pkmn = updated[targetIdx];
          if (pkmn.status === "healthy") {
            const newStatus: PokemonStatus = Math.random() < 0.6 ? "tired" : "poisoned";
            updated[targetIdx] = {
              ...pkmn,
              status: newStatus,
              energy: newStatus === "tired" ? 30 : 60,
            };
            setVictoryNotice(
              `🐾 Seu ${pkmn.name} está ${
                newStatus === "tired" ? "cansadinho" : "indisposto"
              }! Abra sua Bolsa 🎒 para cuidar dele!`
            );
            playSfx("pop");
          }
          return updated;
        }
        return prev;
      });
    }, 80000);
    return () => clearInterval(careInterval);
  }, [playSfx]);

  // Check if player is attempting to enter a route blocked by Father's order
  const checkRouteAllowedByFather = useCallback(
    (targetSubjectId: SubjectRouteId): boolean => {
      if (
        activeQuest &&
        activeQuest.sender === "papai" &&
        !activeQuest.isCompleted &&
        activeQuest.targetSubjectId !== targetSubjectId
      ) {
        // ENFORCE EXACT USER REQUIREMENT: 'Volte aqui após finalizar o pedido de seu pai.'
        playSfx("click");
        setActiveDialog({
          speaker: "PokéCelular 📱 (Papai Carlos)",
          role: "Diretiva do Pai",
          avatarSprite: "carlos",
          text: `Volte aqui após finalizar o pedido de seu pai. (Papai Carlos pediu para você cumprir a missão em ${activeQuest.targetCityName} primeiro!)`,
        });
        setVictoryNotice("🚫 Volte aqui após finalizar o pedido de seu pai.");
        setTimeout(() => setVictoryNotice(null), 5000);
        return false;
      }
      return true;
    },
    [activeQuest, playSfx]
  );

  // Complete active quest from Mom or Dad (Supports coins + potions for Mamãe Renata)
  const completeQuestIfTarget = useCallback(
    (targetKey: string) => {
      if (
        activeQuest &&
        !activeQuest.isCompleted &&
        (activeQuest.targetSubjectId === targetKey ||
          (activeQuest.targetSubjectId === "pet" && targetKey === "flores") ||
          (activeQuest.targetSubjectId === "flores" && targetKey === "pet"))
      ) {
        setActiveQuest((prev) => (prev ? { ...prev, isCompleted: true } : null));
        const isMom = activeQuest.sender === "mamae";
        const awardedCoins = activeQuest.rewardCoins || 40;
        const awardedXp = activeQuest.rewardXp || 30;
        const awardedPotions = isMom ? activeQuest.rewardPotions || 2 : 0;

        setCoins((c) => c + awardedCoins);
        setXp((x) => x + awardedXp);

        // Award potions to inventory if Mom's quest
        if (awardedPotions > 0) {
          setInventory((inv) => ({
            ...inv,
            potions: inv.potions + awardedPotions,
          }));
        }

        playSfx("fanfare");

        confetti({
          particleCount: 75,
          spread: 70,
          origin: { y: 0.6 },
        });

        const thankText =
          activeQuest.sender === "papai"
            ? `Papai Carlos: "Muito bem, minha filha! Você cumpriu meu pedido em ${activeQuest.targetCityName} com excelência! Agora todas as rotas estão liberadas!"`
            : `Mamãe Renata: "Que orgulho de você, meu amor! Cuidou de tudo direitinho como a mamãe pediu! Aqui estão suas moedas e ${awardedPotions} Poções extras para cuidar dos seus Pokémon!"`;

        setMessages((prev) => [
          {
            id: `msg-${Date.now()}`,
            sender: activeQuest.sender,
            senderName: activeQuest.sender === "papai" ? "Papai Carlos" : "Mamãe Renata",
            avatarEmoji: activeQuest.sender === "papai" ? "👨‍👧" : "👩‍👧",
            text: thankText,
            timeAgo: "Agora",
            rewardCoins: awardedCoins,
            rewardPotions: awardedPotions > 0 ? awardedPotions : undefined,
            isCompleted: true,
          },
          ...prev,
        ]);

        const noticeMsg = isMom
          ? `⭐ Pedido da Mamãe Renata concluído! (+${awardedCoins} Moedas 🪙, +${awardedPotions} Poções 🧪 adicionadas à sua Bolsa!)`
          : `⭐ Pedido do Papai Carlos concluído! (+${awardedCoins} Moedas 🪙) Todas as rotas liberadas!`;

        setVictoryNotice(noticeMsg);
        setTimeout(() => {
          setVictoryNotice(null);
        }, 6000);
      }
    },
    [activeQuest, playSfx]
  );

  // Award EXP to all Pokemon in team with double EXP support for Indigo Plateau
  const awardExpToTeam = useCallback(
    (expGain: number, isDoubled: boolean = false) => {
      setPokemonList((prev) => {
        if (prev.length === 0) return prev;
        const updatedList = prev.map((pkmn, idx) => {
          const currentPkmnExp = (pkmn.exp || 0) + expGain;
          const expNeeded = (pkmn.level || 5) * 30;
          let newLevel = pkmn.level || 5;
          let leveledUp = false;

          if (currentPkmnExp >= expNeeded) {
            newLevel += 1;
            leveledUp = true;
          }

          const updated: CapturedPokemon = {
            ...pkmn,
            exp: currentPkmnExp,
            level: newLevel,
            friendship: Math.min(100, (pkmn.friendship || 50) + (isDoubled ? 10 : 5)),
          };

          // If leading pokemon leveled up, check level evolution
          if (idx === 0 && leveledUp) {
            const kantoDef = getPokemonById(updated.pokedexId);
            const levelEvo = kantoDef?.evolutions?.find((e) => e.method === "level");
            if (levelEvo && levelEvo.level && newLevel >= levelEvo.level) {
              setTimeout(() => {
                setActiveEvolution({
                  pokemon: updated,
                  targetPokedexId: levelEvo.toId,
                  method: "level",
                });
                setIsEvolutionModalOpen(true);
              }, 1200);
            }
          }

          return updated;
        });

        playSfx("star");
        setVictoryNotice(
          isDoubled
            ? `⚡ BÔNUS DE EXP EM DOBRO ATIVADO! Toda a equipe Pokémon recebeu +${expGain} EXP no Simulado do Indigo Plateau!`
            : `⭐ Sua equipe Pokémon recebeu +${expGain} EXP!`
        );
        setTimeout(() => setVictoryNotice(null), 6000);

        return updatedList;
      });
    },
    [playSfx]
  );

  // Trigger Wild Pokemon Encounter (Supports Regional Kanto vs Johto and Land vs Water pools with Rarity weighting)
  const triggerWildEncounter = useCallback(
    (isWaterEncounter: boolean = false, generation: RpgGeneration = 1) => {
      playSfx("open");
      const pDef = getRegionalWeightedEncounter(generation, isWaterEncounter);
      const wildDef: WildPokemonDef = {
        pokedexId: pDef.pokedexId,
        species: pDef.species,
        name: pDef.name,
        emoji: pDef.emoji,
        type: pDef.type,
        typeColor: pDef.typeColor,
        baseCatchRate: pDef.baseCatchRate,
        description: pDef.description,
        habitat: pDef.isWaterType ? "Rios e Mares (Aquático)" : pDef.habitat,
        artworkUrl: getPokemonArtworkUrl(pDef.pokedexId),
        spriteUrl: getPokemonSpriteUrl(pDef.pokedexId),
        animatedUrl: getPokemonAnimatedUrl(pDef.pokedexId),
      };
      setActiveWildEncounter(wildDef);
    },
    [playSfx]
  );

  // Trigger Subterranean Cave Wild Pokemon Encounter (Rock, Ground, Cave Species)
  const triggerCaveWildEncounter = useCallback(() => {
    playSfx("open");
    const cavePokedexIds = [74, 41, 95, 50, 66, 35, 140, 138, 75, 42]; // Geodude, Zubat, Onix, Diglett, Machop, Clefairy, Kabuto, Omanyte, Graveler, Golbat
    const chosenId = cavePokedexIds[Math.floor(Math.random() * cavePokedexIds.length)];
    const pDef = getPokemonById(chosenId) || getRegionalWeightedEncounter(1, false);
    const wildDef: WildPokemonDef = {
      pokedexId: pDef.pokedexId,
      species: pDef.species,
      name: pDef.name,
      emoji: pDef.emoji,
      type: pDef.type,
      typeColor: pDef.typeColor,
      baseCatchRate: pDef.baseCatchRate,
      description: pDef.description,
      habitat: "Cavernas Profundas & Montes Rochosos (Subterrâneo)",
      artworkUrl: getPokemonArtworkUrl(pDef.pokedexId),
      spriteUrl: getPokemonSpriteUrl(pDef.pokedexId),
      animatedUrl: getPokemonAnimatedUrl(pDef.pokedexId),
    };
    setActiveWildEncounter(wildDef);
  }, [playSfx]);

  // Trigger Viridian Forest Wild Pokemon Encounter (Insect, Plant & Forest Species)
  const triggerForestWildEncounter = useCallback(() => {
    playSfx("open");
    // Weighted encounters: Common bugs & plants, uncommon evolved forms, rare Scyther/Pinsir & signature Pikachu!
    const forestPool = [
      10, 10, 10, // Caterpie
      13, 13, 13, // Weedle
      11, 11, // Metapod
      14, 14, // Kakuna
      12, // Butterfree
      15, // Beedrill
      46, 46, // Paras
      48, 48, // Venonat
      43, 69, // Oddish, Bellsprout
      123, // Scyther
      127, // Pinsir
      25, 25, // Pikachu!
    ];
    const chosenId = forestPool[Math.floor(Math.random() * forestPool.length)];
    const pDef = getPokemonById(chosenId) || getRegionalWeightedEncounter(1, false);
    const wildDef: WildPokemonDef = {
      pokedexId: pDef.pokedexId,
      species: pDef.species,
      name: pDef.name,
      emoji: pDef.emoji,
      type: pDef.type,
      typeColor: pDef.typeColor,
      baseCatchRate: pDef.baseCatchRate,
      description: pDef.description,
      habitat: "Floresta dos Insetos & Bosques Nativos (Viridian Forest)",
      artworkUrl: getPokemonArtworkUrl(pDef.pokedexId),
      spriteUrl: getPokemonSpriteUrl(pDef.pokedexId),
      animatedUrl: getPokemonAnimatedUrl(pDef.pokedexId),
    };
    setActiveWildEncounter(wildDef);
  }, [playSfx]);

  // Award EXP to active leading Pokemon and trigger level evolution if threshold met
  const awardExpToActivePokemon = useCallback(
    (expGain: number) => {
      setPokemonList((prev) => {
        if (prev.length === 0) return prev;
        const leading = prev[0];
        const newExp = (leading.exp || 0) + expGain;
        const expNeeded = (leading.level || 5) * 30;

        let newLevel = leading.level || 5;
        let leveledUp = false;

        if (newExp >= expNeeded) {
          newLevel += 1;
          leveledUp = true;
          playSfx("star");
          setVictoryNotice(`✨ Parabéns! Seu ${leading.name} subiu para o Nível ${newLevel}!`);
        }

        const updated: CapturedPokemon = {
          ...leading,
          exp: newExp,
          level: newLevel,
          friendship: Math.min(100, (leading.friendship || 50) + 5),
        };

        // Check if level evolution requirement is met
        const kantoDef = getPokemonById(leading.pokedexId);
        const levelEvo = kantoDef?.evolutions?.find((e) => e.method === "level");
        if (levelEvo && levelEvo.level && newLevel >= levelEvo.level) {
          setTimeout(() => {
            setActiveEvolution({
              pokemon: updated,
              targetPokedexId: levelEvo.toId,
              method: "level",
            });
            setIsEvolutionModalOpen(true);
          }, 1200);
        }

        return [updated, ...prev.slice(1)];
      });
    },
    [playSfx]
  );

  // Handle successful capture
  const handleCaptureSuccess = (pokemon: CapturedPokemon) => {
    setPokemonList((prev) => [{ ...pokemon, exp: 0, level: Math.floor(Math.random() * 4) + 3 }, ...prev]);
    setVictoryNotice(`🎉 Parabéns! Você capturou um ${pokemon.name}! Ele foi guardado na sua Bolsa 🎒!`);
    playSfx("fanfare");
  };

  // Consume item helper
  const handleConsumeItem = (itemKey: keyof RpgInventory) => {
    setInventory((prev) => ({
      ...prev,
      [itemKey]: Math.max(0, prev[itemKey] - 1),
    }));
  };

  // Buy item in Market
  const handleBuyMarketItem = (itemKey: keyof RpgInventory, cost: number, quantity = 1) => {
    setCoins((c) => Math.max(0, c - cost));
    setInventory((prev) => ({
      ...prev,
      [itemKey]: prev[itemKey] + quantity,
    }));
  };

  // Use Potion on Pokemon
  const handleUsePotion = (pokemonId: string) => {
    handleConsumeItem("potions");
    setPokemonList((prev) =>
      prev.map((p) =>
        p.id === pokemonId
          ? {
              ...p,
              energy: p.maxEnergy,
              status: p.status === "tired" ? "healthy" : p.status,
              friendship: Math.min(100, p.friendship + 10),
            }
          : p
      )
    );
  };

  // Use Antidote on Pokemon
  const handleUseAntidote = (pokemonId: string) => {
    handleConsumeItem("antidotes");
    setPokemonList((prev) =>
      prev.map((p) =>
        p.id === pokemonId
          ? {
              ...p,
              status: "healthy",
              friendship: Math.min(100, p.friendship + 10),
            }
          : p
      )
    );
  };

  // Pet Pokemon
  const handlePetPokemon = (pokemonId: string) => {
    setPokemonList((prev) =>
      prev.map((p) =>
        p.id === pokemonId
          ? {
              ...p,
              friendship: Math.min(100, p.friendship + 5),
            }
          : p
      )
    );
  };

  // ========================================================
  // ROCKET THEFT & RESCUE LOGIC
  // ========================================================
  const handleRocketBattleDefeat = () => {
    // Equipe Rocket steals 1 of player's Pokemon if available
    if (pokemonList.length > 0) {
      // Pick last captured pokemon (leaving starter if multiple, or the one they have)
      const stolenIndex = pokemonList.length > 1 ? pokemonList.length - 1 : 0;
      const stolen = pokemonList[stolenIndex];

      setPokemonList((prev) => prev.filter((_, idx) => idx !== stolenIndex));
      setStolenPokemonList((prev) => [stolen, ...prev]);

      setVictoryNotice(
        `🚨 PERIGO! A Equipe Rocket roubou seu ${stolen.name}! Vá ao Esconderijo Rocket para resgatá-lo no Desafio em Dobro!`
      );
      playSfx("pop");
    } else {
      setVictoryNotice(`A Equipe Rocket zombou: 'Haha! Você não tem nenhum Pokémon para roubarmos! Treine mais!'`);
    }
  };

  const handleRescueSuccess = (pokemonId: string) => {
    const rescued = stolenPokemonList.find((p) => p.id === pokemonId);
    if (rescued) {
      setStolenPokemonList((prev) => prev.filter((p) => p.id !== pokemonId));
      setPokemonList((prev) => [{ ...rescued, friendship: Math.min(100, rescued.friendship + 15) }, ...prev]);
      setCoins((c) => c + 30);
      setXp((x) => x + 25);
      setVictoryNotice(`💖 O seu ${rescued.name} foi resgatado e está são e salvo na sua Bolsa! (+30 Moedas 🪙)`);
      playSfx("fanfare");
    }
  };

  // Base NPCs Definitions across all 10 Kanto Cities and Routes
  const baseNpcs: NpcDef[] = [
    // 1. Pallet Town (Vila da Família)
    {
      id: "carlos",
      name: "Papai Carlos",
      role: "Pai Coruja & Apoiador Nº 1",
      x: 34,
      y: 154,
      sprite: "carlos",
      dialog: (year) =>
        `Olá, minha filha querida! Estou muito orgulhoso do seu esforço. Olhe sempre o PokéCelular 📱 para ver as missões que te mando! Suba pela Rota 1 até a Cidade de Viridian e vença os desafios escolares!`,
    },
    {
      id: "mamae",
      name: "Mamãe Renata",
      role: "Mãe Carinhosa & Cuidadora",
      x: 30,
      y: 154,
      sprite: "mamae",
      dialog: () =>
        `Oi, meu amor! Que lindo te ver passeando e aprendendo pela Vila. Beba bastante água, regue as plantinhas do jardim e cuide do cachorrinho Pipoca no quintal! Se sua equipe se cansar, descanse na nossa casinha ou nos Centros Pokémon espalhados por Kanto!`,
    },
    {
      id: "pipoca",
      name: "Pipoca (Cachorrinho)",
      role: "Pet Amoroso da Casa",
      x: 29,
      y: 155,
      sprite: "pipoca",
      dialog: () =>
        `Au, au! Pipoca pula de alegria, abana o rabinho e lambe sua mãozinha! 🐶🦴 Você cuidou com todo amor do seu cãozinho!`,
    },
    {
      id: "sister",
      name: isPlayerCecilia ? "Bianca (Irmã)" : "Cecília (Irmã)",
      role: isPlayerCecilia ? "Irmã Menor (2º Ano)" : "Irmã Maior (4º Ano)",
      x: 36,
      y: 154,
      sprite: isPlayerCecilia ? "bianca" : "cecilia",
      dialog: () =>
        isPlayerCecilia
          ? `Oi Ceci! Quer trocar Pokémon comigo pelo Cabo Link? Vamos explorar todas as 10 cidades de Kanto e ver quem completa a Pokédex primeiro!`
          : `Oi Bibi! Se quiser trocar Pokémon comigo pelo Cabo Link ou evoluir seu Kadabra e Haunter, estou aqui em Pallet Town!`,
    },
    {
      id: "oak",
      name: "Professor Carvalho",
      role: "Pesquisador Pokémon de Kanto",
      x: 39,
      y: 161,
      sprite: "prof",
      dialog: () =>
        `Olá, jovem treinadora! Meu laboratório pesquisa a Pokédex de todos os 151 Pokémon de Kanto. Aventure-se pela Rota 1, explore a Floresta de Viridian, o Monte da Lua e todas as grandes cidades!`,
    },

    // 2. Route 1
    {
      id: "route1-clerk",
      name: "Atendente do PokéMart",
      role: "Divulgador da Rota 1",
      x: 35,
      y: 135,
      sprite: "clerk",
      dialog: () =>
        `Olá, aventureira! Eu trabalho no PokéMart da Cidade de Viridian. Pegue esta Poção de cortesia e visite nossa loja no centro da cidade para comprar mais Pokébolas!`,
    },
    {
      id: "rival-encounter",
      name: rivalConfig?.name || "Gary",
      role: "Seu Rival",
      x: 35,
      y: 125,
      sprite: rivalConfig?.gender === "girl" ? "picnic" : "rival",
      dialog: () =>
        `Ora, ora, ${playerName}! Acha que já sabe o suficiente para entrar na Cidade de Viridian? Vamos para o Duelo de Sabedoria!`,
    },

    // 3. Viridian City
    {
      id: "clerk",
      name: "Atendente do Market",
      role: "Comércio de Suprimentos",
      x: 39,
      y: 115,
      sprite: "clerk",
      dialog: () =>
        `Olá! Bem-vinda ao PokéMart de Viridian! Aqui você compra Pokébolas, Poções e Antídotos para sua jornada!`,
    },
    {
      id: "pitagoras",
      name: "Professor Pitágoras",
      role: "Mestre da Matemática",
      x: 24,
      y: 105,
      sprite: "pitagoras",
      dialog: (year) =>
        `Bem-vinda à Escola de Treinadores e Academia de Matemática de Viridian! Os números governam o universo. Topa resolver este desafio para ganhar mais moedas?`,
      quiz: (year) => {
        const { question: q } = getRandomAcademicQuestion("matematica", year, answeredQuestionIdsRef.current);
        return {
          id: q.id,
          question: q.question,
          options: q.options as string[],
          correctIndex: q.correctIndex,
          explanation: q.explanation,
        };
      },
    },
    {
      id: "flora",
      name: "Dra. Flora",
      role: "Cientista da Natureza & Centro Pokémon",
      x: 25,
      y: 115,
      sprite: "flora",
      dialog: () =>
        `Saudações, jovem pesquisadora! O Centro Pokémon de Viridian cura sua equipe gratuitamente. Responda à minha pergunta científica para ganhar EXP!`,
      quiz: (year) => {
        const { question: q } = getRandomAcademicQuestion("ciencias", year, answeredQuestionIdsRef.current);
        return {
          id: q.id,
          question: q.question,
          options: q.options as string[],
          correctIndex: q.correctIndex,
          explanation: q.explanation,
        };
      },
    },
    {
      id: "palavra",
      name: "Dona Palavra",
      role: "Guardiã das Letras",
      x: 25,
      y: 119,
      sprite: "palavra",
      dialog: () =>
        `Bem-vinda à Grande Biblioteca Encantada! Aqui cada palavra guarda poesia e imaginação. Prove seu domínio da nossa língua!`,
      quiz: (year) => {
        const { question: q } = getRandomAcademicQuestion("portugues", year, answeredQuestionIdsRef.current);
        return {
          id: q.id,
          question: q.question,
          options: q.options as string[],
          correctIndex: q.correctIndex,
          explanation: q.explanation,
        };
      },
    },
    {
      id: "oliver",
      name: "Teacher Oliver",
      role: "English & Tech Mentor",
      x: 42,
      y: 105,
      sprite: "oliver",
      dialog: () =>
        `Hello there! Welcome to the Viridian Gym & English Hub! Are you ready for a quick English knowledge challenge?`,
      quiz: (year) => {
        const { question: q } = getRandomAcademicQuestion("ingles", year, answeredQuestionIdsRef.current);
        return {
          id: q.id,
          question: q.question,
          options: q.options as string[],
          correctIndex: q.correctIndex,
          explanation: q.explanation,
        };
      },
    },

    // 4. Pewter City (Líder Brock & Museu)
    {
      id: "brock",
      name: "Líder Brock",
      role: "Líder de Rocha • Ginásio de Pewter",
      x: 27,
      y: 51,
      sprite: "pitagoras",
      dialog: () =>
        `Bem-vinda a Pewter City! A determinação é tão forte quanto a rocha sólida. Mostre que estudou Geometria e Cálculos de Engenharia!`,
      quiz: (year) => {
        const { question: q } = getRandomAcademicQuestion("matematica", year, answeredQuestionIdsRef.current);
        return {
          id: q.id,
          question: q.question,
          options: q.options as string[],
          correctIndex: q.correctIndex,
          explanation: q.explanation,
        };
      },
    },
    {
      id: "pewter-scientist",
      name: "Cientista do Museu",
      role: "Pesquisador de Paleontologia",
      x: 35,
      y: 43,
      sprite: "prof",
      dialog: () =>
        `Nosso Museu de Ciências de Pewter expõe meteoritos raros e fósseis de Kabuto e Aerodactyl! A ciência nos ajuda a compreender a história do planeta!`,
      quiz: (year) => {
        const { question: q } = getRandomAcademicQuestion("quimica", year, answeredQuestionIdsRef.current);
        return {
          id: q.id,
          question: q.question,
          options: q.options as string[],
          correctIndex: q.correctIndex,
          explanation: q.explanation,
        };
      },
    },

    // 5. Cerulean City (Líder Misty & Bike Shop)
    {
      id: "misty",
      name: "Líder Misty",
      role: "Líder Aquática • Ginásio de Cerulean",
      x: 106,
      y: 51,
      sprite: "flora",
      dialog: () =>
        `Olá! Bem-vinda a Cerulean City! A água é essencial para toda vida na Terra. Vença nosso desafio para demonstrar sua sabedoria em Ciências!`,
      quiz: (year) => {
        const { question: q } = getRandomAcademicQuestion("ciencias", year, answeredQuestionIdsRef.current);
        return {
          id: q.id,
          question: q.question,
          options: q.options as string[],
          correctIndex: q.correctIndex,
          explanation: q.explanation,
        };
      },
    },
    {
      id: "bike-shop-owner",
      name: "Gerente do Bike Shop",
      role: "Comércio de Bicicletas Velozes",
      x: 115,
      y: 51,
      sprite: "clerk",
      dialog: () =>
        `Nossas bicicletas de Cerulean são ultra-leves e velozes! Resolva este cálculo para ganhar um bônus especial de moedas!`,
      quiz: (year) => {
        const { question: q } = getRandomAcademicQuestion("matematica", year, answeredQuestionIdsRef.current);
        return {
          id: q.id,
          question: q.question,
          options: q.options as string[],
          correctIndex: q.correctIndex,
          explanation: q.explanation,
        };
      },
    },

    // 6. Celadon City (Líder Erika & Shopping)
    {
      id: "erika",
      name: "Líder Erika",
      role: "Líder de Planta & Botânica",
      x: 64,
      y: 93,
      sprite: "palavra",
      dialog: () =>
        `Bem-vinda a Celadon City! A flora de Kanto é linda e repleta de clorofila. Cuidar das plantas é cuidar do oxigênio de todo o planeta!`,
      quiz: (year) => {
        const { question: q } = getRandomAcademicQuestion("biologia", year, answeredQuestionIdsRef.current);
        return {
          id: q.id,
          question: q.question,
          options: q.options as string[],
          correctIndex: q.correctIndex,
          explanation: q.explanation,
        };
      },
    },

    // 7. Saffron City (Líder Sabrina & Silph Co)
    {
      id: "sabrina",
      name: "Líder Sabrina",
      role: "Líder Psíquica & Foco Mental",
      x: 123,
      y: 83,
      sprite: "palavra",
      dialog: () =>
        `Eu previ a sua chegada a Saffron City! O poder da mente, da concentração e do estudo diário é capaz de superar qualquer obstáculo!`,
      quiz: (year) => {
        const { question: q } = getRandomAcademicQuestion("matematica", year, answeredQuestionIdsRef.current);
        return {
          id: q.id,
          question: q.question,
          options: q.options as string[],
          correctIndex: q.correctIndex,
          explanation: q.explanation,
        };
      },
    },

    // 8. Vermilion City (Líder Lt. Surge & Porto)
    {
      id: "surge",
      name: "Líder Lt. Surge",
      role: "Líder Elétrico • Ginásio de Vermilion",
      x: 106,
      y: 127,
      sprite: "carlos",
      dialog: () =>
        `Hey kid! Bem-vinda a Vermilion City! Eletricidade e tecnologia fluem no porto internacional. Are you ready for an English test?`,
      quiz: (year) => {
        const { question: q } = getRandomAcademicQuestion("ingles", year, answeredQuestionIdsRef.current);
        return {
          id: q.id,
          question: q.question,
          options: q.options as string[],
          correctIndex: q.correctIndex,
          explanation: q.explanation,
        };
      },
    },

    // 9. Fuchsia City (Líder Koga & Safari Zone)
    {
      id: "koga",
      name: "Líder Koga",
      role: "Líder de Fuchsia • Safari Zone",
      x: 100,
      y: 152,
      sprite: "pitagoras",
      dialog: () =>
        `Fuchsia City abriga a famosa Safari Zone! O estudo biológico dos animais, ecossistemas e biodiversidade é a chave para o equilíbrio da natureza!`,
      quiz: (year) => {
        const { question: q } = getRandomAcademicQuestion("biologia", year, answeredQuestionIdsRef.current);
        return {
          id: q.id,
          question: q.question,
          options: q.options as string[],
          correctIndex: q.correctIndex,
          explanation: q.explanation,
        };
      },
    },

    // 10. Cinnabar Island (Líder Blaine & Laboratório de Fósseis)
    {
      id: "blaine",
      name: "Líder Blaine",
      role: "Líder de Fogo • Cinnabar Island",
      x: 37,
      y: 172,
      sprite: "prof",
      dialog: () =>
        `Hah! Bem-vinda à Ilha Vulcânica de Cinnabar! Aqui no Laboratório de Química nós ressuscitamos fósseis milenares com reações científicas de ponta!`,
      quiz: (year) => {
        const { question: q } = getRandomAcademicQuestion("quimica", year, answeredQuestionIdsRef.current);
        return {
          id: q.id,
          question: q.question,
          options: q.options as string[],
          correctIndex: q.correctIndex,
          explanation: q.explanation,
        };
      },
    },

    // 11. Indigo Plateau (Cúpula dos Campeões)
    {
      id: "plateau-guard",
      name: "Guardião da Cúpula",
      role: "Elite do Indigo Plateau",
      x: 20,
      y: 20,
      sprite: "prof",
      dialog: () =>
        `Bem-vinda ao Indigo Plateau! Aqui você realiza o Simulado das Provas Escolares da Vila do Saber e ganha EXP em Dobro (2x) para toda a sua equipe de Pokémon!`,
      quiz: (year) => {
        const { question: q } = getRandomAcademicQuestion("matematica", year, answeredQuestionIdsRef.current);
        return {
          id: q.id,
          question: q.question,
          options: q.options as string[],
          correctIndex: q.correctIndex,
          explanation: q.explanation,
        };
      },
    },
  ];

  // Dynamic Rocket Grunts blocking passages
  const rocketNpcs: NpcDef[] = [
    {
      id: "rocket-matematica",
      name: "Guarda Rocket (Matemática)",
      role: "Bloqueio da Escola de Treinadores",
      x: 26,
      y: 105,
      sprite: "rocket",
      isRocket: true,
      isQuestEvent: true,
      forceBlock: true,
      subjectId: "matematica",
      dialog: () =>
        "Alto lá! A Equipe Rocket bloqueou a entrada para a Escola de Matemática! Só passa se nos vencer na Batalha do Saber!",
    },
    {
      id: "rocket-ciencias",
      name: "Guarda Rocket (Ciências)",
      role: "Bloqueio do Monte da Lua",
      x: 83,
      y: 44,
      sprite: "rocket",
      isRocket: true,
      isQuestEvent: true,
      forceBlock: true,
      subjectId: "ciencias",
      dialog: () =>
        "Pára aí! A passagem para a Caverna dos Fósseis no Monte da Lua está bloqueada! Prove seu conhecimento científico para passar!",
    },
    {
      id: "rocket-portugues",
      name: "Guarda Rocket (Português)",
      role: "Bloqueio da Biblioteca",
      x: 23,
      y: 119,
      sprite: "rocket",
      isRocket: true,
      isQuestEvent: true,
      forceBlock: true,
      subjectId: "portugues",
      dialog: () =>
        "Nem tente passar! A Grande Biblioteca está fechada pela Equipe Rocket! Mostre que é boa com as palavras se tiver coragem!",
    },
    {
      id: "rocket-ingles",
      name: "Guarda Rocket (Inglês)",
      role: "Bloqueio do Ginásio de Viridian",
      x: 40,
      y: 105,
      sprite: "rocket",
      isRocket: true,
      isQuestEvent: true,
      forceBlock: true,
      subjectId: "ingles",
      dialog: () =>
        "Stop right there! A Equipe Rocket lacrou o Ginásio de Viridian! Desafie-nos em inglês se quiser avançar!",
    },
    {
      id: "rocket-biologia",
      name: "Guarda Rocket (Biologia & Safari)",
      role: "Bloqueio da Safari Zone",
      x: 111,
      y: 142,
      sprite: "rocket",
      isRocket: true,
      isQuestEvent: true,
      forceBlock: true,
      subjectId: "biologia",
      dialog: () =>
        "Alto lá! A Equipe Rocket cercou o portão da Safari Zone de Biologia! Só passa se nos vencer na Batalha do Saber!",
    },
    {
      id: "rocket-quimica",
      name: "Guarda Rocket (Química & Fósseis)",
      role: "Bloqueio do Laboratório de Cinnabar",
      x: 27,
      y: 171,
      sprite: "rocket",
      isRocket: true,
      isQuestEvent: true,
      forceBlock: true,
      subjectId: "quimica",
      dialog: () =>
        "Pára aí! A Equipe Rocket quer roubar as fórmulas químicas e os fósseis de Cinnabar! Desafie-nos em Química se tiver coragem!",
    },
  ];

  // Active NPCs list with Engine Anti-Block Safety Guard:
  // Automatically validate that no regular NPC occupies a protected door threshold
  const activeNpcs: NpcDef[] = [
    ...baseNpcs,
    ...rocketNpcs.filter((r) => r.subjectId && !unlockedRoutes[r.subjectId]),
  ].filter((npc) => {
    // Sole Allowed Exception: Explicit story quest blocks
    if (npc.isQuestEvent || npc.forceBlock) return true;
    if (isProtectedDoorZone(npc.x, npc.y)) {
      console.warn(`[Anti-Block] NPC '${npc.id}' em (${npc.x}, ${npc.y}) descartado automaticamente para liberar saída da porta.`);
      return false;
    }
    return true;
  });

  // Signpost Definitions with Engine Anti-Block Safety Guard
  const rawSignposts: SignpostDef[] = KANTO_SIGNPOSTS;

  // Discard any signpost attempting to obstruct a building door or exit tile
  const signposts: SignpostDef[] = rawSignposts.filter((s) => {
    if (s.isQuestEvent || s.forceBlock) return true;
    if (isProtectedDoorZone(s.x, s.y)) {
      console.warn(`[Anti-Block] Placa em (${s.x}, ${s.y}) descartada automaticamente para liberar porta.`);
      return false;
    }
    return true;
  });

  // Building Doors across all 10 Kanto Cities (Mapped dynamically from KANTO_BUILDINGS)
  const buildingDoors: BuildingDoorDef[] = KANTO_BUILDINGS.map((b) => ({
    x: b.doorX,
    y: b.doorY,
    name: b.name,
    zone: b.city,
    accent: b.type === "mart" ? "#38bdf8" : b.type === "center" ? "#ef4444" : "#10b981",
    type: b.type === "mart" ? "market" : b.type === "center" ? "school" : "house",
  }));

  // Trigger Knowledge Battle with Equipe Rocket for a specific subject (Anti-Repetition Engine)
  const triggerRocketBattle = useCallback(
    (subjectId: SubjectRouteId) => {
      if (!checkRouteAllowedByFather(subjectId)) {
        return;
      }

      playSfx("open");
      const { question: randomQuestion, wasPoolReset } = getRandomAcademicQuestion(
        subjectId as AcademicSubject,
        currentYear,
        answeredQuestionIdsRef.current
      );

      const subjectNames: Record<SubjectRouteId, { name: string; city: string }> = {
        matematica: { name: "Matemática", city: "Metrópole da Matemática" },
        ciencias: { name: "Ciências", city: "Vale das Ciências" },
        portugues: { name: "Português", city: "Cidadela do Português" },
        ingles: { name: "Inglês", city: "Distrito de Inglês & Tech" },
        biologia: { name: "Biologia & Ecologia", city: "Safari Zone de Fuchsia" },
        quimica: { name: "Química & Fósseis", city: "Laboratório de Cinnabar" },
      };

      if (wasPoolReset) {
        setVictoryNotice(
          `⭐ Parabéns! Você completou todo o banco de questões de ${subjectNames[subjectId].name}! O ciclo foi reciclado para novas vitórias!`
        );
      }

      setActiveBattle({
        isOpen: true,
        subjectId,
        subjectName: subjectNames[subjectId].name,
        cityName: subjectNames[subjectId].city,
        questionId: randomQuestion.id,
        questionData: {
          question: randomQuestion.question,
          options: randomQuestion.options,
          correctIndex: randomQuestion.correctIndex,
          explanation: randomQuestion.explanation,
        },
      });
    },
    [currentYear, playSfx, checkRouteAllowedByFather]
  );

  // Victory callback when defeating Rocket in battle
  const handleBattleVictory = (awardedCoins: number, awardedXp: number) => {
    if (!activeBattle) return;

    const victoriousSubject = activeBattle.subjectId;
    const subjectName = activeBattle.subjectName;

    if (activeBattle.questionId) {
      markQuestionAnswered(activeBattle.questionId);
    }

    playSfx("fanfare");
    setUnlockedRoutes((prev) => ({
      ...prev,
      [victoriousSubject]: true,
    }));
    setCoins((c) => c + (awardedCoins || 50));
    setXp((x) => x + (awardedXp || 40));
    awardExpToActivePokemon(awardedXp || 40);

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
    });

    setVictoryNotice(`🚀 Vitória! A Equipe Rocket decolou de novo! A passagem para ${subjectName} está desbloqueada!`);
    completeQuestIfTarget(victoriousSubject);

    setTimeout(() => {
      setVictoryNotice(null);
    }, 5000);
  };

  // Victory callback when defeating Rival in battle
  const handleRivalBattleVictory = (awardedCoins: number, awardedExp: number) => {
    setCoins((c) => c + (awardedCoins || 80));
    setXp((x) => x + (awardedExp || 120));
    awardExpToActivePokemon(awardedExp || 120);
    setVictoryNotice(`⚡ Você superou o ${rivalConfig?.name || "Rival"} no Duelo de Sabedoria! (+${awardedCoins} Moedas 🪙, +${awardedExp} EXP)`);
  };

  // Initialize Map Matrix (Full Authentic Pokémon FireRed Kanto Overworld: 160x180 Grid)
  useEffect(() => {
    mapData.current = generateKantoWorldGrid();
  }, []);

  // Determine current Zone, Region and Generation based on coordinates (Full Kanto Map)
  const getZoneFromCoords = (x: number, y: number) => {
    return getKantoZone(x, y);
  };

  // Check collision for target tile (including active Rocket Grunts and field obstacles)
  const isTileWalkable = useCallback(
    (targetX: number, targetY: number): boolean => {
      // 1. Walkable Room Interior Checks (Casa da Família, Centro Pokémon, PokéMart, Caverna, Floresta e Academias)
      if (activeInterior) {
        if (activeInterior.buildingId === "family_house") {
          return isHouseTileWalkable(targetX, targetY, activeInterior.floor);
        }
        if (activeInterior.buildingId === "pokemart") {
          return isPokemartWalkable(targetX, targetY);
        }
        if (activeInterior.buildingId === "science_lab") {
          return isPokemonCenterWalkable(targetX, targetY);
        }
        if (activeInterior.buildingId === "fossil_cave") {
          return isCaveTileWalkable(targetX, targetY, brokenCaveRocks);
        }
        if (activeInterior.buildingId === "insect_forest") {
          return isForestTileWalkable(targetX, targetY, cutForestBushes);
        }
        if (activeInterior.buildingId === "math_academy") {
          return isMathAcademyWalkable(targetX, targetY);
        }
        if (activeInterior.buildingId === "portuguese_lib") {
          return isPortugueseLibWalkable(targetX, targetY);
        }
        if (activeInterior.buildingId === "english_tower") {
          return isEnglishTowerWalkable(targetX, targetY);
        }
        if (activeInterior.buildingId === "oak_lab") {
          return isOakLabWalkable(targetX, targetY);
        }
        if (activeInterior.buildingId === "rival_house") {
          return isRivalHouseWalkable(targetX, targetY);
        }
        if (activeInterior.buildingId === "indigo_plateau") {
          return isIndigoPlateauWalkable(targetX, targetY);
        }
        return false;
      }

      // 2. Overworld Collision Checks
      if (targetX < 0 || targetX >= MAP_COLS || targetY < 0 || targetY >= MAP_ROWS) {
        return false;
      }
      const tile = mapData.current[targetY]?.[targetX];
      if (!tile) return false;

      // Ledge tile ("L"): Jumpable ONLY downwards!
      if (tile === "L") {
        return playerRef.current.direction === "down";
      }

      // Solid tile types
      if (tile === "X" || tile === "#" || tile === "H" || tile === "S" || tile === "O" || tile === "C" || tile === "R") {
        return false;
      }

      // Water tile ("W"): Walkable ONLY if player has Surf skill!
      if (tile === "W") {
        return explorerSkills.surf;
      }

      // Check NPC collision
      const isNpcOccupied = activeNpcs.some((npc) => npc.x === targetX && npc.y === targetY);
      if (isNpcOccupied) {
        return false;
      }

      return true;
    },
    [activeInterior, activeNpcs, brokenCaveRocks, cutForestBushes, explorerSkills.surf]
  );

  // Map door coordinate to Building Interior Definition across all Kanto
  const getBuildingFromDoor = useCallback(
    (
      doorX: number,
      doorY: number
    ): {
      id: string;
      name: string;
      type: BuildingType;
      returnX: number;
      returnY: number;
    } | null => {
      const b = KANTO_BUILDINGS.find((k) => k.doorX === doorX && k.doorY === doorY);
      if (!b) return null;
      let type: BuildingType = "family_house";
      if (b.id === "family_house") type = "family_house";
      else if (b.id === "math_academy") type = "math_academy";
      else if (b.id === "portuguese_lib") type = "portuguese_lib";
      else if (b.id === "english_tower") type = "english_tower";
      else if (b.type === "mart") type = "pokemart";
      else if (b.type === "center") type = "science_lab";
      else type = "family_house";

      return {
        id: b.id,
        name: b.name,
        type,
        returnX: b.returnX,
        returnY: b.returnY,
      };
    },
    []
  );

  // Unified Entrance to Walkable Mini-Map Interiors (100% GBA Pixel Art)
  const enterWalkableInterior = useCallback(
    (b: { id: string; name: string; returnX: number; returnY: number }) => {
      targetMoveTile.current = null;
      touchDirection.current = null;
      keysDown.current = {};
      doorCooldownRef.current = Date.now() + 2500;
      playSfx("open");

      const p = playerRef.current;
      p.direction = "up";
      p.isMoving = false;
      p.moveProgress = 0;

      // 1. Unique Landmark Interiors
      if (b.id === "oak_lab") {
        setActiveInterior({
          buildingId: "oak_lab",
          buildingName: b.name,
          floor: 1,
          returnX: b.returnX,
          returnY: b.returnY,
        });
        p.gridX = 6;
        p.gridY = 11;
        p.drawX = 6;
        p.drawY = 11;
        setCurrentZone(b.name);
        setVictoryNotice(`Entrou no ${b.name} 🔬`);
        return;
      }

      if (b.id === "indigo_plateau") {
        setActiveInterior({
          buildingId: "indigo_plateau",
          buildingName: b.name,
          floor: 1,
          returnX: b.returnX,
          returnY: b.returnY,
        });
        p.gridX = 6;
        p.gridY = 18;
        p.drawX = 6;
        p.drawY = 18;
        setCurrentZone(b.name);
        setVictoryNotice(`Entrou na ${b.name} 👑`);
        return;
      }

      if (b.id === "family_house") {
        setActiveInterior({
          buildingId: "family_house",
          buildingName: b.name,
          floor: 1,
          returnX: b.returnX,
          returnY: b.returnY,
        });
        p.gridX = 3;
        p.gridY = 7;
        p.drawX = 3;
        p.drawY = 7;
        setCurrentZone("Casa da Família • Térreo");
        setVictoryNotice("Entrou na Casa da Família 🏡");
        return;
      }

      if (b.id === "portuguese_lib") {
        setActiveInterior({
          buildingId: "portuguese_lib",
          buildingName: b.name,
          floor: 1,
          returnX: b.returnX,
          returnY: b.returnY,
        });
        p.gridX = 6;
        p.gridY = 17;
        p.drawX = 6;
        p.drawY = 17;
        setCurrentZone(b.name);
        setVictoryNotice(`Entrou na ${b.name} 📚`);
        return;
      }

      if (b.id === "english_tower") {
        setActiveInterior({
          buildingId: "english_tower",
          buildingName: b.name,
          floor: 1,
          returnX: b.returnX,
          returnY: b.returnY,
        });
        p.gridX = 5;
        p.gridY = 18;
        p.drawX = 5;
        p.drawY = 18;
        setCurrentZone(b.name);
        setVictoryNotice(`Entrou na ${b.name} ⚡`);
        return;
      }

      if (b.id === "fossil_cave") {
        setActiveInterior({
          buildingId: "fossil_cave",
          buildingName: b.name,
          floor: 1,
          returnX: b.returnX,
          returnY: b.returnY,
        });
        p.gridX = 18;
        p.gridY = 37;
        p.drawX = 18;
        p.drawY = 37;
        setCurrentZone(b.name);
        setVictoryNotice(`Entrou na ${b.name} ⛰️`);
        return;
      }

      if (b.id === "insect_forest") {
        setActiveInterior({
          buildingId: "insect_forest",
          buildingName: b.name,
          floor: 1,
          returnX: b.returnX,
          returnY: b.returnY,
        });
        p.gridX = 29;
        p.gridY = 66;
        p.drawX = 29;
        p.drawY = 66;
        setCurrentZone(b.name);
        setVictoryNotice(`Entrou na ${b.name} 🌲`);
        return;
      }

      // 2. PokéMarts & Stores across Kanto
      if (b.id === "pokemart" || b.id.includes("mart") || b.id.includes("shop") || b.id.includes("dept")) {
        setActiveInterior({
          buildingId: "pokemart",
          buildingName: b.name,
          floor: 1,
          returnX: b.returnX,
          returnY: b.returnY,
        });
        p.gridX = 4;
        p.gridY = 7;
        p.drawX = 4;
        p.drawY = 7;
        setCurrentZone(b.name);
        setVictoryNotice(`Entrou no ${b.name} 🛒`);
        return;
      }

      // 3. Pokémon Centers & Research Labs across Kanto
      if (b.id === "science_lab" || b.id.includes("center") || b.id.includes("lab") || b.id.includes("museum")) {
        setActiveInterior({
          buildingId: "science_lab",
          buildingName: b.name,
          floor: 1,
          returnX: b.returnX,
          returnY: b.returnY,
        });
        p.gridX = 7;
        p.gridY = 7;
        p.drawX = 7;
        p.drawY = 7;
        setCurrentZone(b.name);
        setVictoryNotice(`Entrou no ${b.name} 🏥`);
        return;
      }

      // 4. Gyms & Academies across Kanto
      if (b.id === "math_academy" || b.id.includes("gym") || b.id.includes("dojo")) {
        setActiveInterior({
          buildingId: "math_academy",
          buildingName: b.name,
          floor: 1,
          returnX: b.returnX,
          returnY: b.returnY,
        });
        p.gridX = 6;
        p.gridY = 13;
        p.drawX = 6;
        p.drawY = 13;
        setCurrentZone(b.name);
        setVictoryNotice(`Entrou no ${b.name} 🏆`);
        return;
      }

      // 5. Houses, Mansions, Cottages & Clubs across Kanto
      setActiveInterior({
        buildingId: "rival_house",
        buildingName: b.name,
        floor: 1,
        returnX: b.returnX,
        returnY: b.returnY,
      });
      p.gridX = 3;
      p.gridY = 7;
      p.drawX = 3;
      p.drawY = 7;
      setCurrentZone(b.name);
      setVictoryNotice(`Entrou na ${b.name} 🏡`);
    },
    [playSfx]
  );

  // Return smoothly outside the door when exiting a building
  const handleExitBuilding = useCallback(() => {
    // 1. Immediately reset all movement buffers so player doesn't walk into old click targets
    targetMoveTile.current = null;
    touchDirection.current = null;
    keysDown.current = {};

    // 2. Door cooldown so stepping or facing the door doesn't re-trigger immediately
    doorCooldownRef.current = Date.now() + 2000;

    if (activeBuilding) {
      const p = playerRef.current;
      p.gridX = activeBuilding.returnX;
      p.gridY = activeBuilding.returnY;
      p.drawX = activeBuilding.returnX;
      p.drawY = activeBuilding.returnY;
      p.direction = "down";
      p.isMoving = false;
      p.moveProgress = 0;
    }
    playSfx("open");
    setActiveBuilding(null);
  }, [activeBuilding, playSfx]);

  // Return smoothly outside the door when exiting any Walkable Interior
  const handleExitInterior = useCallback(() => {
    if (!activeInterior) return;
    targetMoveTile.current = null;
    touchDirection.current = null;
    keysDown.current = {};
    doorCooldownRef.current = Date.now() + 2500;

    const p = playerRef.current;
    p.gridX = activeInterior.returnX;
    p.gridY = activeInterior.returnY;
    p.drawX = activeInterior.returnX;
    p.drawY = activeInterior.returnY;
    p.direction = "down";
    p.isMoving = false;
    p.moveProgress = 0;

    playSfx("open");
    const exitedName = activeInterior.buildingName;
    setActiveInterior(null);
    setCurrentZone("Vila do Saber");
    setVictoryNotice(`Você saiu do ${exitedName} e voltou à Vila do Saber 🌳`);
  }, [activeInterior, playSfx]);

  // Nurse Joy Healing Sequence with animated Pokeball slots!
  const triggerNurseJoyHeal = useCallback(() => {
    playSfx("open");
    setHealingCenterSlots(0);
    setActiveDialog({
      speaker: "Enfermeira Joy 💖",
      role: "Centro Pokémon",
      avatarSprite: "parent",
      text: "Olá! Bem-vinda ao Centro Pokémon da Vila! Vou receber seus monstrinhos para curá-los!",
    });

    // Animate the 6 healing slots sequentially
    let slot = 1;
    const interval = setInterval(() => {
      setHealingCenterSlots(slot);
      playSfx("pop");
      slot++;
      if (slot > 6) {
        clearInterval(interval);
        setTimeout(() => {
          healAllPokemon();
          playSfx("fanfare");
          confetti({ particleCount: 35, spread: 65, origin: { y: 0.6 } });
          setVictoryNotice("💖 Toda a equipe Pokémon foi curada e recuperou 100% de Energia e Vida!");
          setActiveDialog({
            speaker: "Enfermeira Joy 💖",
            role: "Centro Pokémon",
            avatarSprite: "parent",
            text: "Prontinho! Seus parceiros Pokémon estão em perfeita saúde e transbordando energia! Esperamos ver você e suas irmãs novamente!",
          });
          setTimeout(() => {
            setHealingCenterSlots(0);
          }, 3500);
        }, 500);
      }
    }, 250);
  }, [healAllPokemon, playSfx]);

  // Handle interaction with whatever the player is facing
  const handleInteract = useCallback(() => {
    const p = playerRef.current;
    let targetX = p.gridX;
    let targetY = p.gridY;

    if (p.direction === "up") targetY -= 1;
    if (p.direction === "down") targetY += 1;
    if (p.direction === "left") targetX -= 1;
    if (p.direction === "right") targetX += 1;

    // 0. Interior Mini-Map Interactions (Spacebar / Action on Objects & NPCs)
    if (activeInterior) {
      if (activeInterior.buildingId === "family_house") {
        const item = getHouseInteractable(targetX, targetY, activeInterior.floor) || getHouseInteractable(p.gridX, p.gridY, activeInterior.floor);
        if (item) {
          if (item.type === "exit") {
            handleExitInterior();
            return;
          }
          if (item.type === "stairs_up") {
            playSfx("open");
            setActiveInterior((prev) => (prev ? { ...prev, floor: 2 } : null));
            p.gridX = 7;
            p.gridY = 2;
            p.drawX = 7;
            p.drawY = 2;
            p.direction = "down";
            setCurrentZone("Casa da Família • Quarto das Meninas");
            setVictoryNotice("Subiu para o 2º Andar 🛏️");
            return;
          }
          if (item.type === "stairs_down") {
            playSfx("open");
            setActiveInterior((prev) => (prev ? { ...prev, floor: 1 } : null));
            p.gridX = 9;
            p.gridY = 2;
            p.drawX = 9;
            p.drawY = 2;
            p.direction = "down";
            setCurrentZone("Casa da Família • Térreo");
            setVictoryNotice("Desceu para o 1º Andar 🏡");
            return;
          }
          if (item.type === "bed") {
            playSfx("fanfare");
            healAllPokemon();
            setActiveDialog({
              speaker: item.name,
              role: "Descanso da Família",
              avatarSprite: "sign",
              text: "Você tirou um cochilo revigorante na caminha quentinha! Todos os seus Pokémon recuperaram 100% de Vida!",
            });
            return;
          }
          if (item.type === "pc") {
            playSfx("click");
            performCloudSave(true);
            setActiveDialog({
              speaker: "Poké-PC de Estudos 💻",
              role: "Salvamento em Nuvem",
              avatarSprite: "sign",
              text: "Progresso da aventura e lições escolares sincronizados na nuvem da Vila do Saber com sucesso!",
            });
            return;
          }
          if (item.type === "papai") {
            playSfx("star");
            setActiveDialog({
              speaker: "Papai Carlos 👨‍👧",
              role: "Família",
              avatarSprite: "parent",
              text: "Oi minha filha linda! Que orgulho ver você estudando tanto e explorando Kanto! Continue se dedicando que o mundo é seu!",
            });
            return;
          }
          if (item.type === "mamae") {
            playSfx("star");
            setActiveDialog({
              speaker: "Mamãe Renata 👩‍👧",
              role: "Família",
              avatarSprite: "parent",
              text: "Oi meu amor! Preparei um lanchinho delicioso para você levar na sua jornada! Lembre-se de fazer suas lições e se hidratar!",
            });
            return;
          }
          setActiveDialog({
            speaker: item.name,
            role: "Casa da Família",
            avatarSprite: "sign",
            text: item.actionText || `Você examinou: ${item.name}! Tudo arrumadinho com carinho na casa.`,
          });
          return;
        }
      } else if (activeInterior.buildingId === "pokemart") {
        const item = getPokemartInteractable(targetX, targetY) || getPokemartInteractable(p.gridX, p.gridY);
        if (item) {
          if (item.type === "exit") {
            handleExitInterior();
            return;
          }
          if (item.type === "clerk") {
            playSfx("open");
            setIsMarketOpen(true);
            return;
          }
          setActiveDialog({
            speaker: item.name,
            role: "PokéMart",
            avatarSprite: "sign",
            text: `Prateleira organizada: ${item.name}! Itens de alta qualidade para sua jornada escolar.`,
          });
          return;
        }
      } else if (activeInterior.buildingId === "science_lab") {
        const item = getPokemonCenterInteractable(targetX, targetY) || getPokemonCenterInteractable(p.gridX, p.gridY);
        if (item) {
          if (item.type === "exit") {
            handleExitInterior();
            return;
          }
          if (item.type === "joy" || item.type === "machine") {
            triggerNurseJoyHeal();
            return;
          }
          if (item.type === "pc") {
            playSfx("click");
            performCloudSave(true);
            setActiveDialog({
              speaker: "Poké-PC do Centro 💻",
              role: "Terminal da Liga",
              avatarSprite: "sign",
              text: "Conexão estabelecida com o Centro de Dados Pokémon! Jogo salvo com sucesso!",
            });
            return;
          }
          setActiveDialog({
            speaker: item.name,
            role: "Centro Pokémon",
            avatarSprite: "sign",
            text: `Você examinou: ${item.name}!`,
          });
          return;
        }
      } else if (activeInterior.buildingId === "math_academy") {
        const item = getMathAcademyInteractable(targetX, targetY) || getMathAcademyInteractable(p.gridX, p.gridY);
        if (item) {
          if (item.type === "exit") {
            handleExitInterior();
            return;
          }
          if (item.type === "leader_pythagoras") {
            setActiveGymId("math");
            setIsGymModalOpen(true);
            playSfx("open");
            return;
          }
          if (item.type === "npc_student") {
            setActiveDialog({
              speaker: "Tales (Estudante de Geometria) 📐",
              role: "Academia de Matemática",
              avatarSprite: "villager",
              text: "Olá Bianca! Mestre Pitágoras ensina que os números governam o universo! Multiplicação e frações são como superpoderes em batalha!",
            });
            return;
          }
          if (item.type === "pedestal") {
            setActiveDialog({
              speaker: "Pedestal da Tabuada 🪙",
              role: "Enigma de Matemática",
              avatarSprite: "sign",
              text: "O pedestal reluz com moedas matemáticas! Pratique cálculos de cabeça com o Mestre Pitágoras para conquistar a Insígnia da Rocha!",
            });
            return;
          }
          setActiveDialog({
            speaker: item.name,
            role: "Academia de Matemática",
            avatarSprite: "sign",
            text: `Você examinou: ${item.name}!`,
          });
          return;
        }
      } else if (activeInterior.buildingId === "portuguese_lib") {
        const item = getPortugueseLibInteractable(targetX, targetY) || getPortugueseLibInteractable(p.gridX, p.gridY);
        if (item) {
          if (item.type === "exit") {
            handleExitInterior();
            return;
          }
          if (item.type === "leader_sofia") {
            setActiveGymId("portuguese");
            setIsGymModalOpen(true);
            playSfx("open");
            return;
          }
          if (item.type === "npc_student") {
            setActiveDialog({
              speaker: "Clara (Estudante de Letras) 📖",
              role: "Grande Biblioteca",
              avatarSprite: "villager",
              text: "Ler todos os dias abre portas para mundos mágicos! Quem lê bem, escreve com elegância e pensa com clareza!",
            });
            return;
          }
          if (item.type === "pedestal") {
            setActiveDialog({
              speaker: "Dicionário Encantado 📚",
              role: "Enigma de Português",
              avatarSprite: "sign",
              text: "O Dicionário brilha com palavras douradas: sinônimos, antônimos, rimas e regras de acentuação!",
            });
            return;
          }
          setActiveDialog({
            speaker: item.name,
            role: "Grande Biblioteca",
            avatarSprite: "sign",
            text: `Você examinou: ${item.name}!`,
          });
          return;
        }
      } else if (activeInterior.buildingId === "english_tower") {
        const item = getEnglishTowerInteractable(targetX, targetY) || getEnglishTowerInteractable(p.gridX, p.gridY);
        if (item) {
          if (item.type === "exit") {
            handleExitInterior();
            return;
          }
          if (item.type === "leader_oliver") {
            setActiveGymId("english");
            setIsGymModalOpen(true);
            playSfx("open");
            return;
          }
          if (item.type === "npc_student") {
            setActiveDialog({
              speaker: "Alex (Estudante Bilíngue) 🌐",
              role: "Torre Tech de Inglês",
              avatarSprite: "villager",
              text: "Hello friend! English is the international language of technology and friendship! Practice every day and you will travel the world!",
            });
            return;
          }
          if (item.type === "pedestal") {
            setActiveDialog({
              speaker: "Supercomputador Tradutor 🖥️",
              role: "Terminal Global",
              avatarSprite: "sign",
              text: "Conexão via satélite com o mundo todo! Desafie o Professor Oliver para testar seu vocabulário em inglês!",
            });
            return;
          }
          setActiveDialog({
            speaker: item.name,
            role: "Torre Tech",
            avatarSprite: "sign",
            text: `Você examinou: ${item.name}!`,
          });
          return;
        }
      } else if (activeInterior.buildingId === "oak_lab") {
        const item = getOakLabInteractable(targetX, targetY) || getOakLabInteractable(p.gridX, p.gridY);
        if (item) {
          if (item.type === "exit") {
            handleExitInterior();
            return;
          }
          if (item.type === "oak") {
            setActiveDialog({
              speaker: "Professor Carvalho 🔬",
              role: "Pesquisador Pokémon",
              avatarSprite: "prof",
              text: item.dialogText || "Olá Bianca! Continue se dedicando aos estudos escolares e aos seus Pokémon!",
            });
            return;
          }
          if (item.type === "pc") {
            playSfx("click");
            performCloudSave(true);
            setActiveDialog({
              speaker: "Poké-PC de Pesquisa 💻",
              role: "Laboratório",
              avatarSprite: "sign",
              text: "Dados da Pokédex e da jornada salvos na nuvem com segurança!",
            });
            return;
          }
          setActiveDialog({
            speaker: item.name,
            role: "Laboratório",
            avatarSprite: "sign",
            text: item.dialogText || `Você examinou: ${item.name}!`,
          });
          return;
        }
      } else if (activeInterior.buildingId === "rival_house") {
        const item = getRivalHouseInteractable(targetX, targetY) || getRivalHouseInteractable(p.gridX, p.gridY);
        if (item) {
          if (item.type === "exit") {
            handleExitInterior();
            return;
          }
          if (item.type === "daisy" || item.type === "tea") {
            playSfx("fanfare");
            healAllPokemon();
            setActiveDialog({
              speaker: "Daisy Carvalho 🍵",
              role: "Irmã do Rival",
              avatarSprite: "parent",
              text: "Tome um chá de ervas quentinho que preparei para você! Toda a sua equipe recuperou 100% de energia!",
            });
            return;
          }
          if (item.type === "bed") {
            playSfx("fanfare");
            healAllPokemon();
            setActiveDialog({
              speaker: "Sofá Aconchegante 🛏️",
              role: "Descanso",
              avatarSprite: "sign",
              text: "Você descansou no sofá macio! Equipe restaurada com 100% de energia!",
            });
            return;
          }
          setActiveDialog({
            speaker: item.name,
            role: "Casa do Rival",
            avatarSprite: "sign",
            text: item.dialogText || `Você examinou: ${item.name}!`,
          });
          return;
        }
      } else if (activeInterior.buildingId === "indigo_plateau") {
        const item = getIndigoPlateauInteractable(targetX, targetY) || getIndigoPlateauInteractable(p.gridX, p.gridY);
        if (item) {
          if (item.type === "exit") {
            handleExitInterior();
            return;
          }
          if (item.type === "champion") {
            setIsPlateauModalOpen(true);
            playSfx("open");
            return;
          }
          if (item.type === "healing_station") {
            playSfx("fanfare");
            healAllPokemon();
            setActiveDialog({
              speaker: "Cura dos Campeões 💖",
              role: "Liga Pokémon",
              avatarSprite: "sign",
              text: "A câmara regeneradora reenergizou completamente sua equipe!",
            });
            return;
          }
          setActiveDialog({
            speaker: item.name,
            role: "Indigo Plateau",
            avatarSprite: "sign",
            text: item.dialogText || `Você examinou: ${item.name}!`,
          });
          return;
        }
      } else if (activeInterior.buildingId === "fossil_cave") {
        const item = getCaveInteractable(targetX, targetY) || getCaveInteractable(p.gridX, p.gridY);
        if (item) {
          if (item.type === "exit") {
            handleExitInterior();
            return;
          }
          if (item.type === "rock") {
            if (explorerSkills.smash && item.id) {
              playSfx("fanfare");
              setBrokenCaveRocks((prev) => ({ ...prev, [item.id as string]: true }));
              setCoins((prev) => prev + 50);
              setActiveDialog({
                speaker: "Quebra-Rochas! 💥",
                role: "Exploração",
                avatarSprite: "sign",
                text: "CRASH! Você quebrou a rocha rachada e encontrou 50 PokéMoedas e minerais brilhantes!",
              });
            } else {
              setActiveDialog({
                speaker: "Rocha Rachada 🪨",
                role: "Caverna",
                avatarSprite: "sign",
                text: "Uma rocha fraturada bloqueia a passagem! Obtenha a habilidade Quebra-Rochas para despedaçá-la!",
              });
            }
            return;
          }
          if (item.type === "npc_geologist") {
            setActiveDialog({
              speaker: "Dr. Rocha (Geólogo da Liga) ⛏️",
              role: "Pesquisador",
              avatarSprite: "prof",
              text: "O Monte da Lua guarda segredos pré-históricos incríveis! Fósseis de Kabutops e Omanyte revelam a evolução da Terra há milhões de anos!",
            });
            return;
          }
          setActiveDialog({
            speaker: item.name,
            role: "Caverna dos Fósseis",
            avatarSprite: "sign",
            text: `Você examinou: ${item.name}!`,
          });
          return;
        }
      } else if (activeInterior.buildingId === "insect_forest") {
        const item = getForestInteractable(targetX, targetY) || getForestInteractable(p.gridX, p.gridY);
        if (item) {
          if (item.type === "exit") {
            handleExitInterior();
            return;
          }
          if (item.type === "cut_bush") {
            if (explorerSkills.cut && item.id) {
              playSfx("fanfare");
              setCutForestBushes((prev) => ({ ...prev, [item.id as string]: true }));
              setActiveDialog({
                speaker: "Cortar Arbusto! 🌿",
                role: "Exploração",
                avatarSprite: "sign",
                text: "SWISH! Você usou a habilidade Cortar e desobstruiu o caminho para o Baú Secreto!",
              });
            } else {
              setActiveDialog({
                speaker: "Arbusto Espinhoso 🌿",
                role: "Floresta",
                avatarSprite: "sign",
                text: "Um arbusto denso bloqueia a passagem! Vença o Professor Oliver no Ginásio para aprender a habilidade Cortar!",
              });
            }
            return;
          }
          if (item.type === "chest") {
            if (item.id && !openedForestChests[item.id]) {
              playSfx("fanfare");
              setOpenedForestChests((prev) => ({ ...prev, [item.id as string]: true }));
              setCoins((prev) => prev + 250);
              setActiveDialog({
                speaker: "Baú Dourado Secreto! 🎁",
                role: "Tesouro da Floresta",
                avatarSprite: "sign",
                text: "Você abriu o baú secreto e recebeu 250 PokéMoedas e uma Pedra da Folha Rara!",
              });
            } else {
              setActiveDialog({
                speaker: "Baú da Floresta",
                role: "Tesouro",
                avatarSprite: "sign",
                text: "O baú já foi aberto!",
              });
            }
            return;
          }
          if (item.type === "item_ball") {
            if (item.id && !openedForestChests[item.id]) {
              playSfx("star");
              setOpenedForestChests((prev) => ({ ...prev, [item.id as string]: true }));
              setInventory((prev) => ({ ...prev, pokeballs: (prev.pokeballs || 0) + 3 }));
              setActiveDialog({
                speaker: "Pokébola Perdida! 🔴",
                role: "Item Encontrado",
                avatarSprite: "sign",
                text: "Você encontrou 3 Pokébolas de alta qualidade caídas na grama!",
              });
            }
            return;
          }
          if (item.type === "npc_ranger") {
            playSfx("fanfare");
            healAllPokemon();
            setActiveDialog({
              speaker: "Robson (Guarda-Parque) 🌲",
              role: "Ecologista da Floresta",
              avatarSprite: "scout",
              text: "Bem-vinda à Floresta dos Insetos! Cuide da natureza e os Pokémon protegerão você! Cuidei de seus monstrinhos com poções naturais: 100% curados!",
            });
            return;
          }
          if (item.type === "npc_biologist") {
            setActiveDialog({
              speaker: "Bia (Bióloga & Entomologista) 🔬",
              role: "Pesquisadora",
              avatarSprite: "picnic",
              text: "Sabia que a metamorfose do Caterpie em Butterfree é um exemplo real de transformação biológica? O estudo da natureza é fascinante!",
            });
            return;
          }
          if (item.type === "npc_bugcatcher") {
            setActiveDialog({
              speaker: "Samuca (Caçador de Insetos) 🕸️",
              role: "Treinador",
              avatarSprite: "scout",
              text: "Caterpie, Weedle, Metapod e Pinsir! Esta floresta é um paraíso para quem ama colecionar insetos e aprender sobre seus habitats!",
            });
            return;
          }
          setActiveDialog({
            speaker: item.name,
            role: "Floresta dos Insetos",
            avatarSprite: "sign",
            text: `Você examinou: ${item.name}!`,
          });
          return;
        }
      }
      playSfx("pop");
      return;
    }

    const targetTile = mapData.current[targetY]?.[targetX];

    // Interaction with Water without Surf
    if (targetTile === "W" && !explorerSkills.surf) {
      playSfx("pop");
      setActiveDialog({
        speaker: "Água Profunda 🌊",
        role: "Exploração",
        avatarSprite: "sign",
        text: "A correnteza é forte! Vença a Dra. Clara no Ginásio de Ciências em Cerulean City para aprender a habilidade Nadar (Surf) e navegar na água!",
      });
      
      
      return;
    }

    // Interaction with Building Doors ("D"):
    if (targetTile === "D") {
      if (Date.now() < doorCooldownRef.current) {
        return;
      }
      const b = getBuildingFromDoor(targetX, targetY);
      if (b) {
        enterWalkableInterior(b);
        return;
      }
    }

    // 1. Check if facing an active Rocket Grunt -> TRIGGER BATTLE!
    const targetRocket = activeNpcs.find((n) => n.isRocket && n.x === targetX && n.y === targetY);
    if (targetRocket && targetRocket.subjectId) {
      triggerRocketBattle(targetRocket.subjectId);
      return;
    }

    // 2. Check if facing Market Clerk NPC
    const targetClerk = activeNpcs.find((n) => n.id === "clerk" && n.x === targetX && n.y === targetY);
    if (targetClerk) {
      playSfx("open");
      setIsMarketOpen(true);
      return;
    }

    // 3. Check if facing Gym Leader NPC directly
    const targetGymLeader = activeNpcs.find(
      (n) => (n.id === "pitagoras" || n.id === "flora" || n.id === "palavra" || n.id === "oliver") && n.x === targetX && n.y === targetY
    );
    if (targetGymLeader) {
      const gymMap: Record<string, "math" | "science" | "portuguese" | "english"> = {
        pitagoras: "math",
        flora: "science",
        palavra: "portuguese",
        oliver: "english",
      };
      setActiveGymId(gymMap[targetGymLeader.id]);
      setIsGymModalOpen(true);
      playSfx("open");
      return;
    }

    // 3. Check if facing Rival -> Open Rival Challenge!
    if (targetX === 20 && targetY === 16) {
      setIsRivalModalOpen(true);
      playSfx("open");
      return;
    }

    // 3.1 Check if standing next to online sister via multiplayer sync
    if (
      otherPlayerSync &&
      Math.abs(p.gridX - otherPlayerSync.x) <= 1 &&
      Math.abs(p.gridY - otherPlayerSync.y) <= 1
    ) {
      setIsTradeModalOpen(true);
      playSfx("open");
      return;
    }

    // 3.2 Check if facing a standard NPC
    const targetNpc = activeNpcs.find((n) => !n.isRocket && n.x === targetX && n.y === targetY);
    if (targetNpc) {
      playSfx("open");

      if (targetNpc.id === "rival-encounter") {
        setIsRivalModalOpen(true);
        return;
      }

      if (targetNpc.id === "sister") {
        completeQuestIfTarget("irma");
        setIsTradeModalOpen(true);
        return;
      }

      if (targetNpc.id === "pipoca") {
        completeQuestIfTarget("pet");
        playSfx("star");
        setActiveDialog({
          speaker: "Pipoca 🐶",
          role: "Cachorrinho da Família",
          avatarSprite: "sign",
          text: "Au, au! Pipoca pula de felicidade, lambe sua mãozinha e abana o rabinho! Você cuidou com todo amor do seu pet!",
        });
        return;
      }

      if (targetNpc.id === "plateau-guard") {
        setIsPlateauModalOpen(true);
        playSfx("open");
        return;
      }

      const quizData = targetNpc.quiz ? targetNpc.quiz(currentYear) : undefined;
      setActiveDialog({
        speaker: targetNpc.name,
        role: targetNpc.role,
        avatarSprite: targetNpc.sprite,
        text: targetNpc.dialog(currentYear, sisterName),
        quiz: quizData,
        hasAnswered: false,
        rewardClaimed: false,
      });
      return;
    }

    // 4. Check if facing flowers in front of the house -> Mamãe Renata's Errand!
    if (
      targetTile === "F" &&
      ((targetX === 17 && (targetY === 28 || targetY === 29)) ||
        (targetX === 24 && (targetY === 28 || targetY === 29)))
    ) {
      playSfx("star");
      setActiveDialog({
        speaker: "Jardim da Família 🌸",
        role: "Cuidado e Carinho",
        avatarSprite: "sign",
        text: "Você regou com amor as flores do jardim e cuidou do cachorrinho! O quintal está perfumado e radiante!",
      });
      completeQuestIfTarget("flores");
      return;
    }

    // 5. Check if facing a Signpost
    const targetSign = signposts.find((s) => s.x === targetX && s.y === targetY);
    if (targetSign) {
      playSfx("click");
      setActiveDialog({
        speaker: targetSign.title,
        role: "Placa de Informação",
        avatarSprite: "sign",
        text: targetSign.lines.join(" "),
      });
      return;
    }

    // 6. Check if standing at or facing a Building Door
    if (Date.now() < doorCooldownRef.current) {
      return;
    }

    const standingDoor = buildingDoors.find(
      (d) => (d.x === p.gridX && d.y === p.gridY) || (d.x === targetX && d.y === targetY)
    );
    if (standingDoor) {
      targetMoveTile.current = null;
      touchDirection.current = null;
      keysDown.current = {};
      doorCooldownRef.current = Date.now() + 2000;
      playSfx("open");

      if (standingDoor.type === "plateau" || standingDoor.name.includes("Indigo Plateau")) {
        setIsPlateauModalOpen(true);
        return;
      }

      if (standingDoor.type === "market") {
        setIsMarketOpen(true);
        return;
      }

      if (standingDoor.type === "hideout") {
        if (stolenPokemonList.length > 0) {
          setIsRescueOpen(true);
        } else {
          setActiveDialog({
            speaker: "Esconderijo Rocket 🚀",
            role: "Porta de Aço",
            avatarSprite: "door",
            text: "O Esconderijo está silencioso. Todos os seus Pokémon estão em segurança com você na Bolsa!",
          });
        }
        return;
      }

      setActiveDialog({
        speaker: standingDoor.name,
        role: standingDoor.zone,
        avatarSprite: "door",
        text: `Você está na porta de ${standingDoor.name}! Deseja entrar e explorar os conteúdos das matérias escolares?`,
      });
      return;
    }

    // 7. Fallback: gentle hint
    playSfx("pop");
  }, [
    activeNpcs,
    signposts,
    buildingDoors,
    currentYear,
    sisterName,
    playSfx,
    triggerRocketBattle,
    completeQuestIfTarget,
    stolenPokemonList.length,
  ]);

  // Handle Quiz answer in Dialog
  const handleAnswerQuiz = (selectedIndex: number) => {
    if (!activeDialog?.quiz || activeDialog.hasAnswered) return;

    const isCorrect = selectedIndex === activeDialog.quiz.correctIndex;
    if (isCorrect) {
      playSfx("fanfare");
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7 },
      });
      setCoins((prev) => prev + 15);
      setXp((prev) => prev + 25);
      if (activeDialog.quiz.id) {
        markQuestionAnswered(activeDialog.quiz.id);
      }
      setActiveDialog((prev) =>
        prev
          ? {
              ...prev,
              hasAnswered: true,
              isCorrect: true,
              rewardClaimed: true,
              text: activeDialog.quiz!.explanation + " 🎉 Você ganhou +15 Moedas e +25 XP!",
            }
          : null
      );
    } else {
      playSfx("pop");
      setActiveDialog((prev) =>
        prev
          ? {
              ...prev,
              hasAnswered: true,
              isCorrect: false,
              text: "Quase lá! Resposta incorreta, mas não desista! Fale comigo novamente para responder certo!",
            }
          : null
      );
    }
  };

  // Keyboard Event Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(e.code)) {
        e.preventDefault();
      }

      keysDown.current[e.code] = true;

      // Interaction shortcut (Space, Enter, KeyZ)
      if (e.code === "Space" || e.code === "Enter" || e.code === "KeyZ") {
        if (activeBattle?.isOpen || isPhoneOpen || isBagOpen || isMarketOpen || isRescueOpen || activeWildEncounter) {
          // modals handle their own input
        } else if (activeDialog) {
          setActiveDialog(null);
        } else {
          handleInteract();
        }
      }

      // Bag shortcut (KeyB)
      if (e.code === "KeyB") {
        setIsBagOpen((prev) => !prev);
        playSfx("open");
      }

      // Phone shortcut (KeyP)
      if (e.code === "KeyP") {
        setIsPhoneOpen((prev) => !prev);
        setHasUnreadPhone(false);
        playSfx("open");
      }

      // Running toggle (Shift or KeyX)
      if (e.code === "ShiftLeft" || e.code === "ShiftRight" || e.code === "KeyX") {
        playerRef.current.isRunning = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysDown.current[e.code] = false;
      if (e.code === "ShiftLeft" || e.code === "ShiftRight" || e.code === "KeyX") {
        playerRef.current.isRunning = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [
    handleInteract,
    activeDialog,
    activeBattle,
    isPhoneOpen,
    isBagOpen,
    isMarketOpen,
    isRescueOpen,
    activeWildEncounter,
    playSfx,
  ]);

  // Main 60 FPS Game Loop
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const updateAndRender = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      waterTick.current += delta;

      // Update modern atmosphere particles (leaves, flower petals, sun dust)
      if (particlesRef.current.length < 35) {
        particlesRef.current.push({
          x: Math.random() * MAP_COLS * TILE_SIZE,
          y: Math.random() * MAP_ROWS * TILE_SIZE,
          vx: 14 + Math.random() * 20,
          vy: 8 + Math.random() * 14,
          size: 3 + Math.random() * 4,
          color: Math.random() < 0.4 ? "#fbcfe8" : Math.random() < 0.75 ? "#86efac" : "#fef08a",
          type: Math.random() < 0.4 ? "petal" : Math.random() < 0.75 ? "leaf" : "sparkle",
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 3,
        });
      }
      particlesRef.current.forEach((pt) => {
        pt.x += pt.vx * delta;
        pt.y += pt.vy * delta;
        pt.rotation += pt.rotSpeed * delta;
        if (pt.x > MAP_COLS * TILE_SIZE || pt.y > MAP_ROWS * TILE_SIZE) {
          pt.x = Math.random() * MAP_COLS * TILE_SIZE * 0.4;
          pt.y = Math.random() * 40;
        }
      });

      const p = playerRef.current;
      const moveSpeed = p.isRunning ? 6.5 : 4.0;

      // If player is currently transitioning between tiles
      if (p.isMoving) {
        p.moveProgress += delta * moveSpeed;
        p.walkFrame = (p.walkFrame + delta * (p.isRunning ? 12 : 8)) % 4;

        if (p.moveProgress >= 1) {
          p.moveProgress = 0;
          p.isMoving = false;
          p.drawX = p.gridX;
          p.drawY = p.gridY;
          lastTileArrivalRef.current = Date.now();

          // INTERIOR TRIGGERS (Walkable Real Mini-Maps)
          if (activeInterior) {
            if (activeInterior.buildingId === "family_house") {
              // 1. Walked off door mat onto exit threshold (x: 3..4, y: 8)
              if (activeInterior.floor === 1 && (p.gridX === 3 || p.gridX === 4) && p.gridY >= 8) {
                handleExitInterior();
                return;
              }
              // 2. Stairs up to Floor 2 (x: 9..10, y: 1)
              if (activeInterior.floor === 1 && (p.gridX >= 8 && p.gridX <= 10) && p.gridY === 1) {
                targetMoveTile.current = null;
                playSfx("open");
                setActiveInterior((prev) => (prev ? { ...prev, floor: 2 } : null));
                p.gridX = 7;
                p.gridY = 2;
                p.drawX = 7;
                p.drawY = 2;
                p.direction = "down";
                p.isMoving = false;
                p.moveProgress = 0;
                setCurrentZone("Casa da Família • Quarto das Meninas");
                setVictoryNotice("Subiu para o 2º Andar: Quarto das Meninas 🛏️");
                return;
              }
              // 3. Stairs down to Floor 1 (x: 7..8, y: 1)
              if (activeInterior.floor === 2 && (p.gridX === 7 || p.gridX === 8) && p.gridY === 1) {
                targetMoveTile.current = null;
                playSfx("open");
                setActiveInterior((prev) => (prev ? { ...prev, floor: 1 } : null));
                p.gridX = 9;
                p.gridY = 2;
                p.drawX = 9;
                p.drawY = 2;
                p.direction = "down";
                p.isMoving = false;
                p.moveProgress = 0;
                setCurrentZone("Casa da Família • Térreo");
                setVictoryNotice("Desceu para o 1º Andar: Sala & Cozinha 🏡");
                return;
              }
            } else if (activeInterior.buildingId === "rival_house") {
              // Walked out of Rival House door mat (3..4, 8)
              if ((p.gridX === 3 || p.gridX === 4) && p.gridY >= 8) {
                handleExitInterior();
                return;
              }
            } else if (activeInterior.buildingId === "oak_lab") {
              // Walked out of Oak Lab door mat (6, 12)
              if (p.gridX === 6 && p.gridY >= 12) {
                handleExitInterior();
                return;
              }
            } else if (activeInterior.buildingId === "pokemart") {
              // Walked out of PokéMart exit mat (4, 8)
              if (p.gridX === 4 && p.gridY >= 8) {
                handleExitInterior();
                return;
              }
            } else if (activeInterior.buildingId === "science_lab") {
              // Walked out of Pokémon Center door mat (7, 8..9)
              if (p.gridX === 7 && p.gridY >= 8) {
                handleExitInterior();
                return;
              }
            } else if (activeInterior.buildingId === "indigo_plateau") {
              // Walked out of Indigo Plateau door mat (6, 19)
              if (p.gridX === 6 && p.gridY >= 19) {
                handleExitInterior();
                return;
              }
            } else if (activeInterior.buildingId === "fossil_cave") {
              // Walked out of Cave exit ladder (17..19, 38..39)
              if ((p.gridX >= 17 && p.gridX <= 19) && p.gridY >= 38) {
                handleExitInterior();
                return;
              }
              // Cave wild encounters every ~5 steps
              tallGrassSteps.current += 1;
              if (tallGrassSteps.current >= 5 && Math.random() < 0.26) {
                tallGrassSteps.current = 0;
                triggerCaveWildEncounter();
              }
            } else if (activeInterior.buildingId === "insect_forest") {
              // Walked out of Forest exit gatehouse (28..30, 68)
              if ((p.gridX >= 28 && p.gridX <= 30) && p.gridY >= 68) {
                handleExitInterior();
                return;
              }
              // Forest wild encounters only when walking on tall grass!
              if (isForestTallGrass(p.gridX, p.gridY)) {
                tallGrassSteps.current += 1;
                if (tallGrassSteps.current >= 4 && Math.random() < 0.28) {
                  tallGrassSteps.current = 0;
                  triggerForestWildEncounter();
                }
              }
            } else if (activeInterior.buildingId === "math_academy") {
              // Walked out of Math Academy door mat (5..6, 14)
              if ((p.gridX === 5 || p.gridX === 6) && p.gridY >= 14) {
                handleExitInterior();
                return;
              }
            } else if (activeInterior.buildingId === "portuguese_lib") {
              // Walked out of Portuguese Lib door mat (6, 18)
              if (p.gridX === 6 && p.gridY >= 18) {
                handleExitInterior();
                return;
              }
            } else if (activeInterior.buildingId === "english_tower") {
              // Walked out of English Tech Hub door mat (5, 19)
              if (p.gridX === 5 && p.gridY >= 19) {
                handleExitInterior();
                return;
              }
            }
          } else {
            // OVERWORLD TRIGGERS
            // Check if stepped into Building Door ('D')
            const currentTile = mapData.current[p.gridY]?.[p.gridX];
            if (currentTile === "D") {
              if (Date.now() < doorCooldownRef.current) {
                // Ignore door during cooldown after exiting
              } else {
                const b = getBuildingFromDoor(p.gridX, p.gridY);
                if (b) {
                  enterWalkableInterior(b);
                  return;
                }
              }
            }

            // Check if stepped into Tall Grass ('T'), Swimming Water ('W'), or Water Puddle ('U')
            if (currentTile === "T" || currentTile === "W" || currentTile === "U") {
              const isWaterTile = currentTile === "W" || currentTile === "U";
              const zone = getZoneFromCoords(p.gridX, p.gridY);

              const canTriggerEncounter = isWaterTile ? explorerSkills.surf : true;

              if (canTriggerEncounter) {
                tallGrassSteps.current += 1;

                // Wild Pokemon Encounter trigger (every ~4 steps or 28% chance)
                if (tallGrassSteps.current >= 4 && Math.random() < 0.28) {
                  tallGrassSteps.current = 0;
                  triggerWildEncounter(isWaterTile, zone.generation);
                } else if (Math.random() < 0.08) {
                  playSfx("star");
                  setCoins((c) => c + 5);
                  setXp((x) => x + 10);
                  confetti({ particleCount: 20, spread: 45, origin: { y: 0.6 } });
                }
              }
            }

            // Zone update check
            const newZone = getZoneFromCoords(p.gridX, p.gridY);
            if (newZone.name !== currentZone) {
              setCurrentZone(newZone.name);
              setZoneBanner({
                title: newZone.name,
                subtitle: newZone.subtitle,
                icon: newZone.icon,
              });
              playSfx("click");
            }
          }
        } else {
          if (p.direction === "up") {
            p.drawY = p.gridY + (1 - p.moveProgress);
          } else if (p.direction === "down") {
            p.drawY = p.gridY - (1 - p.moveProgress);
          } else if (p.direction === "left") {
            p.drawX = p.gridX + (1 - p.moveProgress);
          } else if (p.direction === "right") {
            p.drawX = p.gridX - (1 - p.moveProgress);
          }
        }
      }

      // Check for new movement input if idle and no modals are blocking
      if (
        !p.isMoving &&
        !activeDialog &&
        !activeBattle?.isOpen &&
        !isPhoneOpen &&
        !isBagOpen &&
        !isMarketOpen &&
        !isRescueOpen &&
        !isPokedexOpen &&
        !isCustomizationOpen &&
        !isGymModalOpen &&
        !activeWildEncounter &&
        !activeBuilding &&
        !isEvolutionModalOpen &&
        !isRivalModalOpen &&
        !isTradeModalOpen
      ) {
        let requestedDir: Direction | null = null;

        if (touchDirection.current) {
          requestedDir = touchDirection.current;
        } else if (keysDown.current["ArrowUp"] || keysDown.current["KeyW"]) {
          requestedDir = "up";
        } else if (keysDown.current["ArrowDown"] || keysDown.current["KeyS"]) {
          requestedDir = "down";
        } else if (keysDown.current["ArrowLeft"] || keysDown.current["KeyA"]) {
          requestedDir = "left";
        } else if (keysDown.current["ArrowRight"] || keysDown.current["KeyD"]) {
          requestedDir = "right";
        } else if (targetMoveTile.current) {
          const dx = targetMoveTile.current.x - p.gridX;
          const dy = targetMoveTile.current.y - p.gridY;
          if (Math.abs(dx) > 0 || Math.abs(dy) > 0) {
            if (Math.abs(dx) > Math.abs(dy)) {
              requestedDir = dx > 0 ? "right" : "left";
            } else {
              requestedDir = dy > 0 ? "down" : "up";
            }
          } else {
            targetMoveTile.current = null;
          }
        }

        if (requestedDir) {
          p.direction = requestedDir;
          let nextGridX = p.gridX;
          let nextGridY = p.gridY;

          if (requestedDir === "up") nextGridY -= 1;
          if (requestedDir === "down") nextGridY += 1;
          if (requestedDir === "left") nextGridX -= 1;
          if (requestedDir === "right") nextGridX += 1;

          if (!activeInterior) {
            // Check if entering a route blocked by Father's order:
            if (nextGridX === 11 && nextGridY === 11) {
              if (!checkRouteAllowedByFather("matematica")) {
                targetMoveTile.current = null;
                return;
              }
            }
            if (nextGridX === 31 && nextGridY === 12) {
              if (!checkRouteAllowedByFather("ciencias")) {
                targetMoveTile.current = null;
                return;
              }
            }
            if (nextGridX === 5 && nextGridY === 19) {
              if (!checkRouteAllowedByFather("portugues")) {
                targetMoveTile.current = null;
                return;
              }
            }
            if (nextGridX === 27 && nextGridY === 11) {
              if (!checkRouteAllowedByFather("ingles")) {
                targetMoveTile.current = null;
                return;
              }
            }

            // Check if colliding with an active Equipe Rocket NPC!
            const rocketCollision = activeNpcs.find(
              (npc) => npc.isRocket && npc.x === nextGridX && npc.y === nextGridY
            );
            if (rocketCollision && rocketCollision.subjectId) {
              triggerRocketBattle(rocketCollision.subjectId);
              targetMoveTile.current = null;
              return;
            }
          }

          if (isTileWalkable(nextGridX, nextGridY)) {
            const nextTile = mapData.current[nextGridY]?.[nextGridX];
            if (nextTile === "L" && p.direction === "down") {
              const jumpY = nextGridY + 1;
              if (
                jumpY < MAP_ROWS &&
                mapData.current[jumpY]?.[nextGridX] !== "X" &&
                mapData.current[jumpY]?.[nextGridX] !== "H"
              ) {
                p.gridX = nextGridX;
                p.gridY = jumpY;
                p.isMoving = true;
                p.moveProgress = 0;
                playSfx("pop");
                return;
              }
            }
            p.gridX = nextGridX;
            p.gridY = nextGridY;
            p.isMoving = true;
            p.moveProgress = 0;
            if (Math.random() < 0.3) {
              playSfx("pop");
            }
          } else {
            targetMoveTile.current = null;
          }
        }
      }

      renderGame();

      animationFrameId = requestAnimationFrame(updateAndRender);
    };

    animationFrameId = requestAnimationFrame(updateAndRender);
    return () => cancelAnimationFrame(animationFrameId);
  }, [
    activeDialog,
    activeBattle,
    isPhoneOpen,
    isBagOpen,
    isMarketOpen,
    isRescueOpen,
    activeWildEncounter,
    currentZone,
    isTileWalkable,
    playSfx,
    activeNpcs,
    triggerRocketBattle,
    checkRouteAllowedByFather,
    triggerWildEncounter,
  ]);

  // Canvas Drawing Routine (FireRed 16-bit Pixel Precision with authentic zoom)
  const renderGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const zoom = cameraZoomRef.current || 1.45;
    const viewWidth = canvas.width / zoom;
    const viewHeight = canvas.height / zoom;

    // Nintendo DS HeartGold / GBA Pixel Precision: Crisp 16-bit pixel rendering without blur
    ctx.imageSmoothingEnabled = false;

    const p = playerRef.current;
    const camX = p.drawX * TILE_SIZE - viewWidth / 2 + TILE_SIZE / 2;
    const camY = p.drawY * TILE_SIZE - viewHeight / 2 + TILE_SIZE / 2;

    // Sky / Void Background (Clear full canvas before transform)
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const startCol = Math.max(0, Math.floor(camX / TILE_SIZE));
    const endCol = Math.min(MAP_COLS - 1, Math.ceil((camX + viewWidth) / TILE_SIZE));
    const startRow = Math.max(0, Math.floor(camY / TILE_SIZE));
    const endRow = Math.min(MAP_ROWS - 1, Math.ceil((camY + viewHeight) / TILE_SIZE));

    ctx.save();
    ctx.scale(zoom, zoom);
    ctx.translate(-Math.floor(camX), -Math.floor(camY));

    // 0. Render Walkable Mini-Map Room Interior with strict Y-Sorting (100% GBA Proportions)
    if (activeInterior) {
      // Pass 1: Render Room Scenery Background (Floor, Walls, Static Furniture)
      if (activeInterior.buildingId === "family_house") {
        drawFamilyHouseInterior(
          ctx,
          activeInterior.floor,
          TILE_SIZE,
          viewWidth,
          viewHeight,
          null, // parents rendered via Y-sorting
          fireredTilesheets.current["house_floor1"],
          fireredTilesheets.current["house_floor2"]
        );
      } else if (activeInterior.buildingId === "pokemart") {
        drawPokemartInterior(
          ctx,
          TILE_SIZE,
          viewWidth,
          viewHeight,
          null, // clerk rendered via Y-sorting
          fireredTilesheets.current["items_pokeball"],
          fireredTilesheets.current["items_potion"],
          fireredTilesheets.current["mart_inside"]
        );
      } else if (activeInterior.buildingId === "science_lab") {
        drawPokemonCenterInterior(
          ctx,
          TILE_SIZE,
          viewWidth,
          viewHeight,
          healingCenterSlots,
          null, // nurse joy rendered via Y-sorting
          fireredTilesheets.current["center_inside"]
        );
      } else if (activeInterior.buildingId === "fossil_cave") {
        drawCaveInterior(
          ctx,
          TILE_SIZE,
          viewWidth,
          viewHeight,
          brokenCaveRocks,
          waterTick.current,
          fireredTilesheets.current["cave_map"],
          fireredTilesheets.current["outdoor"],
          undefined // Dr. Rocha rendered via Y-sorting
        );
      } else if (activeInterior.buildingId === "insect_forest") {
        drawForestInterior(
          ctx,
          TILE_SIZE,
          viewWidth,
          viewHeight,
          cutForestBushes,
          openedForestChests,
          waterTick.current,
          fireredTilesheets.current["forest_map"],
          fireredTilesheets.current["outdoor"],
          undefined, // Robson, Bia, Samuca rendered via Y-sorting
          fireredTilesheets.current
        );
      } else if (activeInterior.buildingId === "math_academy") {
        drawMathAcademyInterior(
          ctx,
          TILE_SIZE,
          viewWidth,
          viewHeight,
          openedForestChests,
          waterTick.current,
          undefined, // Pythagoras & Tales rendered via Y-sorting
          fireredTilesheets.current["gym_pewter"]
        );
      } else if (activeInterior.buildingId === "portuguese_lib") {
        drawPortugueseLibInterior(
          ctx,
          TILE_SIZE,
          viewWidth,
          viewHeight,
          openedForestChests,
          waterTick.current,
          undefined, // Sofia & Clara rendered via Y-sorting
          fireredTilesheets.current["gym_celadon"]
        );
      } else if (activeInterior.buildingId === "english_tower") {
        drawEnglishTowerInterior(
          ctx,
          TILE_SIZE,
          viewWidth,
          viewHeight,
          openedForestChests,
          waterTick.current,
          undefined, // Oliver & Alex rendered via Y-sorting
          fireredTilesheets.current["gym_vermilion"]
        );
      } else if (activeInterior.buildingId === "oak_lab") {
        drawOakLabInterior(
          ctx,
          TILE_SIZE,
          viewWidth,
          viewHeight,
          null,
          null,
          fireredTilesheets.current["lab_inside"]
        );
      } else if (activeInterior.buildingId === "rival_house") {
        drawRivalHouseInterior(
          ctx,
          TILE_SIZE,
          viewWidth,
          viewHeight,
          null,
          fireredTilesheets.current["house_floor1"]
        );
      } else if (activeInterior.buildingId === "indigo_plateau") {
        drawIndigoPlateauInterior(
          ctx,
          TILE_SIZE,
          viewWidth,
          viewHeight,
          null,
          fireredTilesheets.current["plateau_inside"]
        );
      }

      // Pass 2: Strict Depth Y-Sorting for Interior Characters
      interface InteriorRenderEntity {
        baselineY: number;
        render: () => void;
      }
      const interiorEntities: InteriorRenderEntity[] = [];

      // Player Avatar
      interiorEntities.push({
        baselineY: p.drawY * TILE_SIZE + TILE_SIZE,
        render: () => {
          drawPlayer(ctx, p);
          if (activeInterior.buildingId === "insect_forest" && isForestTallGrass(p.gridX, p.gridY)) {
            drawTallGrassTuft(ctx, p.drawX * TILE_SIZE, p.drawY * TILE_SIZE);
          }
        },
      });

      // Sister in multiplayer
      if (otherPlayerSync) {
        interiorEntities.push({
          baselineY: otherPlayerSync.y * TILE_SIZE + TILE_SIZE,
          render: () => drawSisterPlayer(ctx, otherPlayerSync),
        });
      }

      // Room-specific NPCs
      if (activeInterior.buildingId === "family_house" && activeInterior.floor === 1) {
        const parentSprite = fireredCharacters.current["parent"];
        if (parentSprite && parentSprite.complete && parentSprite.naturalWidth > 0) {
          interiorEntities.push({
            baselineY: 4 * TILE_SIZE + TILE_SIZE,
            render: () => ctx.drawImage(parentSprite, 0, 0, 32, 32, 3 * TILE_SIZE + 4, 4 * TILE_SIZE, TILE_SIZE - 8, TILE_SIZE),
          });
          interiorEntities.push({
            baselineY: 4 * TILE_SIZE + TILE_SIZE,
            render: () => ctx.drawImage(parentSprite, 32, 0, 32, 32, 7 * TILE_SIZE + 4, 4 * TILE_SIZE, TILE_SIZE - 8, TILE_SIZE),
          });
        }
      } else if (activeInterior.buildingId === "pokemart") {
        const clerkSprite = fireredCharacters.current["clerk"];
        if (clerkSprite && clerkSprite.complete && clerkSprite.naturalWidth > 0) {
          interiorEntities.push({
            baselineY: 3 * TILE_SIZE + TILE_SIZE,
            render: () => ctx.drawImage(clerkSprite, 0, 0, 32, 32, 2 * TILE_SIZE + 4, 3 * TILE_SIZE, TILE_SIZE - 8, TILE_SIZE),
          });
        }
      } else if (activeInterior.buildingId === "science_lab") {
        const nurseSprite = fireredCharacters.current["nurse"];
        if (nurseSprite && nurseSprite.complete && nurseSprite.naturalWidth > 0) {
          interiorEntities.push({
            baselineY: 2 * TILE_SIZE + TILE_SIZE,
            render: () => ctx.drawImage(nurseSprite, 0, 0, 32, 32, 7 * TILE_SIZE + 4, 2 * TILE_SIZE - 2, TILE_SIZE - 8, TILE_SIZE + 2),
          });
        }
      } else if (activeInterior.buildingId === "math_academy") {
        const leaderImg = fireredCharacters.current["parent"] || fireredCharacters.current["villager"];
        if (leaderImg && leaderImg.complete && leaderImg.naturalWidth > 0) {
          interiorEntities.push({
            baselineY: 3 * TILE_SIZE + TILE_SIZE,
            render: () => ctx.drawImage(leaderImg, 0, 0, 32, 32, 5 * TILE_SIZE + 4, 3 * TILE_SIZE - 2, TILE_SIZE - 8, TILE_SIZE),
          });
        }
        const studentImg = fireredCharacters.current["boy"] || fireredCharacters.current["villager2"];
        if (studentImg && studentImg.complete && studentImg.naturalWidth > 0) {
          interiorEntities.push({
            baselineY: 7 * TILE_SIZE + TILE_SIZE,
            render: () => ctx.drawImage(studentImg, 0, 0, 32, 32, 4 * TILE_SIZE + 4, 7 * TILE_SIZE, TILE_SIZE - 8, TILE_SIZE),
          });
        }
      } else if (activeInterior.buildingId === "portuguese_lib") {
        const leaderImg = fireredCharacters.current["picnic"] || fireredCharacters.current["villager2"];
        if (leaderImg && leaderImg.complete && leaderImg.naturalWidth > 0) {
          interiorEntities.push({
            baselineY: 3 * TILE_SIZE + TILE_SIZE,
            render: () => ctx.drawImage(leaderImg, 0, 0, 32, 32, 6 * TILE_SIZE + 4, 3 * TILE_SIZE - 2, TILE_SIZE - 8, TILE_SIZE),
          });
        }
        const studentImg = fireredCharacters.current["villager2"] || fireredCharacters.current["picnic"];
        if (studentImg && studentImg.complete && studentImg.naturalWidth > 0) {
          interiorEntities.push({
            baselineY: 11 * TILE_SIZE + TILE_SIZE,
            render: () => ctx.drawImage(studentImg, 0, 0, 32, 32, 4 * TILE_SIZE + 4, 11 * TILE_SIZE, TILE_SIZE - 8, TILE_SIZE),
          });
        }
      } else if (activeInterior.buildingId === "english_tower") {
        const oliverImg = fireredCharacters.current["rival"] || fireredCharacters.current["scout"] || fireredCharacters.current["villager"];
        if (oliverImg && oliverImg.complete && oliverImg.naturalWidth > 0) {
          interiorEntities.push({
            baselineY: 3 * TILE_SIZE + TILE_SIZE,
            render: () => ctx.drawImage(oliverImg, 0, 0, 32, 32, 5 * TILE_SIZE + 4, 3 * TILE_SIZE + 2, TILE_SIZE - 8, TILE_SIZE - 4),
          });
        }
        const alexImg = fireredCharacters.current["player"] || fireredCharacters.current["scout"];
        if (alexImg && alexImg.complete && alexImg.naturalWidth > 0) {
          interiorEntities.push({
            baselineY: 10 * TILE_SIZE + TILE_SIZE,
            render: () => ctx.drawImage(alexImg, 0, 0, 32, 32, 2 * TILE_SIZE + 4, 10 * TILE_SIZE + 2, TILE_SIZE - 8, TILE_SIZE - 4),
          });
        }
      } else if (activeInterior.buildingId === "oak_lab") {
        const profSprite = fireredCharacters.current["prof"];
        if (profSprite && profSprite.complete && profSprite.naturalWidth > 0) {
          interiorEntities.push({
            baselineY: 3 * TILE_SIZE + TILE_SIZE,
            render: () => ctx.drawImage(profSprite, 0, 0, 32, 32, 6 * TILE_SIZE + 4, 3 * TILE_SIZE - 2, TILE_SIZE - 8, TILE_SIZE),
          });
        }
        const villagerSprite = fireredCharacters.current["villager"];
        if (villagerSprite && villagerSprite.complete && villagerSprite.naturalWidth > 0) {
          interiorEntities.push({
            baselineY: 10 * TILE_SIZE + TILE_SIZE,
            render: () => ctx.drawImage(villagerSprite, 0, 0, 32, 32, 3 * TILE_SIZE + 4, 10 * TILE_SIZE, TILE_SIZE - 8, TILE_SIZE),
          });
          interiorEntities.push({
            baselineY: 10 * TILE_SIZE + TILE_SIZE,
            render: () => ctx.drawImage(villagerSprite, 0, 0, 32, 32, 10 * TILE_SIZE + 4, 10 * TILE_SIZE, TILE_SIZE - 8, TILE_SIZE),
          });
        }
      } else if (activeInterior.buildingId === "rival_house") {
        const daisySprite = fireredCharacters.current["picnic"] || fireredCharacters.current["parent"];
        if (daisySprite && daisySprite.complete && daisySprite.naturalWidth > 0) {
          interiorEntities.push({
            baselineY: 4 * TILE_SIZE + TILE_SIZE,
            render: () => ctx.drawImage(daisySprite, 0, 0, 32, 32, 4 * TILE_SIZE + 4, 4 * TILE_SIZE, TILE_SIZE - 8, TILE_SIZE),
          });
        }
      } else if (activeInterior.buildingId === "indigo_plateau") {
        const champSprite = fireredCharacters.current["villager"] || fireredCharacters.current["rival"];
        if (champSprite && champSprite.complete && champSprite.naturalWidth > 0) {
          interiorEntities.push({
            baselineY: 4 * TILE_SIZE + TILE_SIZE,
            render: () => ctx.drawImage(champSprite, 0, 0, 32, 32, 6 * TILE_SIZE + 4, 4 * TILE_SIZE - 2, TILE_SIZE - 8, TILE_SIZE),
          });
        }
      } else if (activeInterior.buildingId === "fossil_cave") {
        const profImg = fireredCharacters.current["prof"] || fireredCharacters.current["villager"];
        if (profImg && profImg.complete && profImg.naturalWidth > 0) {
          interiorEntities.push({
            baselineY: 30 * TILE_SIZE + TILE_SIZE,
            render: () => ctx.drawImage(profImg, 0, 0, 32, 32, 22 * TILE_SIZE + 4, 30 * TILE_SIZE + 2, TILE_SIZE - 8, TILE_SIZE - 4),
          });
        }
      } else if (activeInterior.buildingId === "insect_forest") {
        const scoutImg = fireredCharacters.current["scout"] || fireredCharacters.current["villager"];
        if (scoutImg && scoutImg.complete && scoutImg.naturalWidth > 0) {
          interiorEntities.push({
            baselineY: 58 * TILE_SIZE + TILE_SIZE,
            render: () => ctx.drawImage(scoutImg, 0, 0, 32, 32, 25 * TILE_SIZE + 4, 58 * TILE_SIZE + 2, TILE_SIZE - 8, TILE_SIZE - 4),
          });
          interiorEntities.push({
            baselineY: 38 * TILE_SIZE + TILE_SIZE,
            render: () => ctx.drawImage(scoutImg, 32, 0, 32, 32, 20 * TILE_SIZE + 4, 38 * TILE_SIZE + 2, TILE_SIZE - 8, TILE_SIZE - 4),
          });
        }
        const picnicImg = fireredCharacters.current["picnic"] || fireredCharacters.current["villager2"];
        if (picnicImg && picnicImg.complete && picnicImg.naturalWidth > 0) {
          interiorEntities.push({
            baselineY: 50 * TILE_SIZE + TILE_SIZE,
            render: () => ctx.drawImage(picnicImg, 0, 0, 32, 32, 32 * TILE_SIZE + 4, 50 * TILE_SIZE + 2, TILE_SIZE - 8, TILE_SIZE - 4),
          });
        }
      }

      interiorEntities.sort((a, b) => a.baselineY - b.baselineY);
      for (const ent of interiorEntities) {
        ent.render();
      }

      ctx.restore();
      return;
    }

    // 1. Pass 1: Render All Flat Ground Tiles
    for (let y = startRow; y <= endRow; y++) {
      for (let x = startCol; x <= endCol; x++) {
        const tile = mapData.current[y]?.[x] || "G";
        const tx = x * TILE_SIZE;
        const ty = y * TILE_SIZE;
        drawGroundTile(ctx, tile, tx, ty, x, y);
      }
    }

    // 2. Pass 2: Strict Depth Y-Sorting for all vertical scenery & characters
    interface OverworldDepthEntity {
      baselineY: number;
      render: () => void;
    }
    const depthEntities: OverworldDepthEntity[] = [];

    const outdoorImg = fireredTilesheets.current["outdoor"];
    const hasOutdoorImg = outdoorImg && outdoorImg.complete && outdoorImg.naturalWidth > 0;

    // A. Official FireRed Buildings
    FIRE_RED_BUILDINGS.forEach((b) => {
      if (b.x1 >= startCol && b.x0 <= endCol && b.y1 >= startRow - 2 && b.y0 <= endRow + 2) {
        const img = fireredTilesheets.current[b.type];
        if (img && img.complete && img.naturalWidth > 0) {
          const drawX = b.x0 * TILE_SIZE;
          const drawY = b.y0 * TILE_SIZE;
          const drawW = (b.x1 - b.x0 + 1) * TILE_SIZE;
          const drawH = (b.y1 - b.y0 + 1) * TILE_SIZE;
          depthEntities.push({
            baselineY: (b.y1 + 1) * TILE_SIZE,
            render: () => {
              ctx.imageSmoothingEnabled = false;
              ctx.drawImage(img, drawX, drawY, drawW, drawH);
            },
          });
        }
      }
    });

    // B. Cave Overworld Entrance (Monte da Lua: x: 80..86, y: 40..43, door at 83, 43)
    if (86 >= startCol && 80 <= endCol && 43 >= startRow && 40 <= endRow) {
      depthEntities.push({
        baselineY: 44 * TILE_SIZE,
        render: () => drawCaveOverworldEntrance(ctx, 80, 40, 86, 43, TILE_SIZE, 83, 43, outdoorImg),
      });
    }

    // C. Forest Overworld Gatehouse (x: 32..36, y: 90..92, door at 34, 92)
    if (36 >= startCol && 32 <= endCol && 92 >= startRow && 90 <= endRow) {
      depthEntities.push({
        baselineY: 93 * TILE_SIZE,
        render: () => drawForestOverworldGate(ctx, 32, 90, 36, 92, TILE_SIZE, 34, 92, outdoorImg),
      });
    }

    // D. Vertical Scenery Tiles (Trees, Fences, Signposts, Cut Bushes, Rocks, Fountain)
    const sceneryStartRow = Math.max(0, startRow - 2);
    const sceneryEndRow = Math.min(MAP_ROWS - 1, endRow + 2);
    for (let y = sceneryStartRow; y <= sceneryEndRow; y++) {
      for (let x = startCol; x <= endCol; x++) {
        const tile = mapData.current[y]?.[x];
        const tx = x * TILE_SIZE;
        const ty = y * TILE_SIZE;

        if (tile === "X") {
          // 🌲 Official FireRed Oak Tree: 2 tiles high, baseline at bottom of row y
          depthEntities.push({
            baselineY: (y + 1) * TILE_SIZE,
            render: () => {
              if (hasOutdoorImg) {
                ctx.drawImage(outdoorImg, 192, 32, 32, 64, tx, ty - TILE_SIZE, TILE_SIZE, TILE_SIZE * 2);
              } else {
                ctx.fillStyle = "#225a22";
                ctx.fillRect(tx, ty, TILE_SIZE, TILE_SIZE);
              }
            },
          });
        } else if (tile === "#") {
          // 🪵 Picket Fence
          depthEntities.push({
            baselineY: (y + 1) * TILE_SIZE,
            render: () => {
              if (hasOutdoorImg) {
                ctx.drawImage(outdoorImg, 32, 768, 32, 32, tx, ty, TILE_SIZE, TILE_SIZE);
              } else {
                ctx.fillStyle = "#854d0e";
                ctx.fillRect(tx + 4, ty + 8, TILE_SIZE - 8, TILE_SIZE - 16);
              }
            },
          });
        } else if (tile === "S") {
          // 📜 Signpost
          depthEntities.push({
            baselineY: (y + 1) * TILE_SIZE,
            render: () => {
              if (hasOutdoorImg) {
                ctx.drawImage(outdoorImg, 128, 96, 32, 32, tx, ty, TILE_SIZE, TILE_SIZE);
              } else {
                ctx.fillStyle = "#78350f";
                ctx.fillRect(tx + 8, ty + 8, TILE_SIZE - 16, TILE_SIZE - 16);
              }
            },
          });
        } else if (tile === "C") {
          // 🌿 Cut Bush
          depthEntities.push({
            baselineY: (y + 1) * TILE_SIZE,
            render: () => {
              if (hasOutdoorImg) {
                ctx.drawImage(outdoorImg, 32, 32, 32, 32, tx, ty, TILE_SIZE, TILE_SIZE);
              } else {
                ctx.fillStyle = "#58c850";
                ctx.fillRect(tx, ty, TILE_SIZE, TILE_SIZE);
              }
            },
          });
        } else if (tile === "R") {
          // ⛏️ Breakable Rock
          depthEntities.push({
            baselineY: (y + 1) * TILE_SIZE,
            render: () => {
              if (hasOutdoorImg) {
                ctx.drawImage(outdoorImg, 224, 96, 32, 32, tx, ty, TILE_SIZE, TILE_SIZE);
              } else {
                ctx.fillStyle = "#58c850";
                ctx.fillRect(tx, ty, TILE_SIZE, TILE_SIZE);
              }
            },
          });
        } else if (tile === "O") {
          // ⛲ Central Town Fountain / Well (100% FireRed Pixel Art)
          depthEntities.push({
            baselineY: (y + 1) * TILE_SIZE,
            render: () => {
              if (hasOutdoorImg) {
                ctx.drawImage(outdoorImg, 224, 96, 32, 32, tx, ty, TILE_SIZE, TILE_SIZE);
                ctx.drawImage(outdoorImg, 32, 1056, 32, 32, tx + 6, ty + 6, TILE_SIZE - 12, TILE_SIZE - 12);
              } else {
                ctx.fillStyle = "#475569";
                ctx.fillRect(tx + 4, ty + 4, TILE_SIZE - 8, TILE_SIZE - 8);
              }
            },
          });
        }
      }
    }

    // E. Active Overworld NPCs
    activeNpcs.forEach((npc) => {
      depthEntities.push({
        baselineY: (npc.y + 1) * TILE_SIZE,
        render: () => drawNpc(ctx, npc, p),
      });
    });

    // F. Sister Player (multiplayer)
    if (otherPlayerSync) {
      depthEntities.push({
        baselineY: (otherPlayerSync.y + 1) * TILE_SIZE,
        render: () => drawSisterPlayer(ctx, otherPlayerSync),
      });
    }

    // G. Player Avatar
    depthEntities.push({
      baselineY: p.drawY * TILE_SIZE + TILE_SIZE,
      render: () => {
        drawPlayer(ctx, p);
        const playerTile = mapData.current[p.gridY]?.[p.gridX];
        if (playerTile === "T") {
          drawTallGrassTuft(ctx, p.drawX * TILE_SIZE, p.drawY * TILE_SIZE);
        }
      },
    });

    // Sort all overworld depth entities strictly by baseline Y
    depthEntities.sort((a, b) => a.baselineY - b.baselineY);
    for (const ent of depthEntities) {
      ent.render();
    }

    // 5. Draw Floating "🎯 Foco da Semana" 3D Holographic Badge
    drawFocoDaSemanaBadge(ctx);

    // 6. Draw Ambient Atmosphere Particles (Falling Leaves, Flower Petals, Sun Sparkles)
    drawAmbientParticles(ctx, camX, camY, viewWidth, viewHeight);

    // 7. Draw Soft Warm Sunlight Overlay (Golden Hour Glow)
    drawAtmosphericLighting(ctx, camX, camY, viewWidth, viewHeight);

    ctx.restore();
  };

  // Modern Atmospheric Ambient Particles (Drifting with the breeze)
  const drawAmbientParticles = (
    ctx: CanvasRenderingContext2D,
    camX: number,
    camY: number,
    w: number,
    h: number
  ) => {
    particlesRef.current.forEach((pt) => {
      if (pt.x >= camX - 20 && pt.x <= camX + w + 20 && pt.y >= camY - 20 && pt.y <= camY + h + 20) {
        ctx.save();
        ctx.translate(pt.x, pt.y);
        ctx.rotate(pt.rotation);

        if (pt.type === "leaf") {
          // Green leaf
          ctx.fillStyle = pt.color;
          ctx.beginPath();
          ctx.ellipse(0, 0, pt.size, pt.size * 0.5, 0, 0, Math.PI * 2);
          ctx.fill();
        } else if (pt.type === "petal") {
          // Sakura pink flower petal
          ctx.fillStyle = pt.color;
          ctx.beginPath();
          ctx.arc(0, 0, pt.size * 0.7, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Golden sparkle
          ctx.fillStyle = pt.color;
          ctx.beginPath();
          ctx.arc(0, 0, pt.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }
    });
  };

  // Soft Golden Sunlight Overlay
  const drawAtmosphericLighting = (
    ctx: CanvasRenderingContext2D,
    camX: number,
    camY: number,
    w: number,
    h: number
  ) => {
    const sunGrad = ctx.createLinearGradient(camX, camY, camX + w, camY + h);
    sunGrad.addColorStop(0, "rgba(254, 240, 138, 0.08)");
    sunGrad.addColorStop(0.5, "rgba(251, 191, 36, 0.04)");
    sunGrad.addColorStop(1, "rgba(30, 41, 59, 0.06)");
    ctx.fillStyle = sunGrad;
    ctx.fillRect(camX, camY, w, h);
  };

  // ========================================================
  // OFFICIAL POKÉMON FIRE RED OVERWORLD ENGINE (GAME BOY ADVANCE)
  // Slicing authentic GBA tilesets, buildings & character charsets
  // ========================================================

  interface BuildingDecalDef {
    id: string;
    type: "house" | "center" | "mart";
    x0: number;
    y0: number;
    x1: number;
    y1: number;
    name: string;
  }

  const FIRE_RED_BUILDINGS: BuildingDecalDef[] = KANTO_BUILDINGS.map((b) => ({
    id: b.id,
    type: b.type,
    x0: b.x0,
    y0: b.y0,
    x1: b.x1,
    y1: b.y1,
    name: b.name,
  }));

    const drawGroundTile = (
    ctx: CanvasRenderingContext2D,
    type: string,
    x: number,
    y: number,
    gridX: number,
    gridY: number
  ) => {
    const outdoor = fireredTilesheets.current["outdoor"];
    const flowers = fireredTilesheets.current["flowers"];
    const hasOutdoor = outdoor && outdoor.complete && outdoor.naturalWidth > 0;

    switch (type) {
      case "G": {
        // 🌿 Official FireRed Pallet Town Grass (32x32 at 0, 0)
        if (hasOutdoor) {
          ctx.drawImage(outdoor, 0, 0, 32, 32, x, y, TILE_SIZE, TILE_SIZE);
        } else {
          ctx.fillStyle = "#58c850";
          ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        }
        break;
      }

      case "P": {
        // 🪨 Official FireRed Cobblestone / Dirt Road (32x32 at 32, 96)
        if (hasOutdoor) {
          ctx.drawImage(outdoor, 32, 96, 32, 32, x, y, TILE_SIZE, TILE_SIZE);
        } else {
          ctx.fillStyle = "#d8a860";
          ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        }
        break;
      }

      case "L": {
        // ⛰️ Official FireRed Jumpable Earth Ledge (100% Pixel Art)
        if (hasOutdoor) {
          ctx.drawImage(outdoor, 0, 0, 32, 32, x, y, TILE_SIZE, TILE_SIZE);
          ctx.drawImage(outdoor, 64, 1824, 32, 32, x, y, TILE_SIZE, TILE_SIZE);
        } else {
          ctx.fillStyle = "#58c850";
          ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        }
        break;
      }

      case "T": {
        // 🌾 Official FireRed Tall Grass (Base grass + Tall grass overlay at 0, 2880)
        if (hasOutdoor) {
          ctx.drawImage(outdoor, 0, 0, 32, 32, x, y, TILE_SIZE, TILE_SIZE);
          ctx.drawImage(outdoor, 0, 2880, 32, 32, x, y, TILE_SIZE, TILE_SIZE);
        } else {
          ctx.fillStyle = "#3e9e3c";
          ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        }
        break;
      }

      case "W": {
        // 🌊 Official FireRed Water (32x32 at 32, 1056)
        if (hasOutdoor) {
          ctx.drawImage(outdoor, 32, 1056, 32, 32, x, y, TILE_SIZE, TILE_SIZE);
          const sparkle = Math.sin(waterTick.current * 3 + gridX + gridY) > 0.6;
          if (sparkle) {
            ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
            ctx.fillRect(x + 12, y + 14, 8, 2);
          }
        } else {
          ctx.fillStyle = "#3b82f6";
          ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        }
        break;
      }

      case "B": {
        // 🌉 Official Wooden Bridge / Boardwalk Planks over Water (100% Pixel Art)
        if (hasOutdoor) {
          ctx.drawImage(outdoor, 32, 1056, 32, 32, x, y, TILE_SIZE, TILE_SIZE);
          ctx.drawImage(outdoor, 32, 1664, 32, 32, x, y, TILE_SIZE, TILE_SIZE);
        } else {
          ctx.fillStyle = "#a27038";
          ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        }
        break;
      }

      case "F": {
        // 🌸 Official FireRed Flower Clusters (Grass base + flowers.png)
        if (hasOutdoor) {
          ctx.drawImage(outdoor, 0, 0, 32, 32, x, y, TILE_SIZE, TILE_SIZE);
          if (flowers && flowers.complete && flowers.naturalWidth > 0) {
            ctx.drawImage(flowers, 0, 0, 32, 32, x, y, TILE_SIZE, TILE_SIZE);
          } else {
            ctx.drawImage(outdoor, 0, 480, 32, 32, x, y, TILE_SIZE, TILE_SIZE);
          }
        } else {
          ctx.fillStyle = "#58c850";
          ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        }
        break;
      }

      case "U": {
        // 💧 Water Puddle on Grass (100% Pixel Art - Water Pokemon Encounter Spot!)
        if (hasOutdoor) {
          ctx.drawImage(outdoor, 0, 0, 32, 32, x, y, TILE_SIZE, TILE_SIZE);
          ctx.drawImage(outdoor, 32, 1312, 32, 32, x, y, TILE_SIZE, TILE_SIZE);
        } else {
          ctx.fillStyle = "#38bdf8";
          ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        }
        break;
      }

      case "O": {
        // ⛲ Fountain cobblestone base
        if (hasOutdoor) {
          ctx.drawImage(outdoor, 32, 96, 32, 32, x, y, TILE_SIZE, TILE_SIZE);
        } else {
          ctx.fillStyle = "#d8a860";
          ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        }
        break;
      }

      default: {
        // Grass ground base under trees ("X"), fences ("#"), signs ("S"), bushes ("C"), rocks ("R"), buildings ("H", "D")
        if (hasOutdoor) {
          ctx.drawImage(outdoor, 0, 0, 32, 32, x, y, TILE_SIZE, TILE_SIZE);
        } else {
          ctx.fillStyle = "#58c850";
          ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        }
        break;
      }
    }
  };

  // Official FireRed Tall Grass Blades covering the player's boots/shins
  const drawTallGrassTuft = (ctx: CanvasRenderingContext2D, px: number, py: number) => {
    const outdoor = fireredTilesheets.current["outdoor"];
    if (outdoor && outdoor.complete && outdoor.naturalWidth > 0) {
      // Slicing top 16px of tall grass blades at (0, 2880 + 16)
      ctx.drawImage(outdoor, 0, 2880 + 16, 32, 16, px, py + 22, TILE_SIZE, 18);
    } else {
      ctx.fillStyle = "#2c7830";
      ctx.fillRect(px + 4, py + 26, TILE_SIZE - 8, 14);
    }
  };

  // Official Pokémon FireRed Player Avatar (Authentic GBA 4-Direction Charset)
  const drawPlayer = (ctx: CanvasRenderingContext2D, p: PlayerState) => {
    const px = Math.floor(p.drawX * TILE_SIZE);
    const py = Math.floor(p.drawY * TILE_SIZE);

    const isCecilia = currentYear === 4;
    const charKey = isCecilia ? "cecilia" : "bianca";
    const charImg = fireredCharacters.current[charKey] || fireredCharacters.current["player"];

    const currentTile = mapData.current[p.gridY]?.[p.gridX];
    const isSwimming = currentTile === "W";

    if (isSwimming) {
      // 🏄 Animated Water Ripple & Buoy under player
      const wave = Math.sin(waterTick.current * 5) * 2;
      ctx.fillStyle = "rgba(56, 189, 248, 0.45)";
      ctx.beginPath();
      ctx.ellipse(px + 20, py + 36, 16 + wave, 7 + wave * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Lapras / Blue Surfing Float
      ctx.fillStyle = "#0284c7";
      ctx.beginPath();
      ctx.ellipse(px + 20, py + 34, 14, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#e0f2fe";
      ctx.beginPath();
      ctx.ellipse(px + 20, py + 34, 10, 4, 0, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // GBA Oval Shadow
      ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
      ctx.beginPath();
      ctx.ellipse(px + 20, py + 36, 12, 5, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    if (charImg && charImg.complete && charImg.naturalWidth > 0) {
      const fw = charImg.width / 4;
      const fh = charImg.height / 4;
      const rowMap: Record<Direction, number> = { down: 0, left: 1, right: 2, up: 3 };
      const row = rowMap[p.direction] ?? 0;
      const frame = p.isMoving ? Math.floor(p.walkFrame) % 4 : 0;

      // Crisp GBA Charset rendering: 34px wide x 44px tall anchored on tile
      ctx.drawImage(
        charImg,
        frame * fw,
        row * fh,
        fw,
        fh,
        px + Math.round((TILE_SIZE - 34) / 2),
        py + TILE_SIZE - 42,
        34,
        44
      );

      // Hat Customization Overlay
      if (customization.hatId === "red_cap") {
        ctx.fillStyle = "#dc2626";
        ctx.fillRect(px + 10, py + 5, 14, 4);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(px + 14, py + 6, 4, 2);
      } else if (customization.hatId === "pink_bow") {
        ctx.fillStyle = "#f43f5e";
        ctx.beginPath();
        ctx.arc(px + 24, py + 7, 4, 0, Math.PI * 2);
        ctx.fill();
      } else if (customization.hatId === "straw_hat") {
        ctx.fillStyle = "#eab308";
        ctx.beginPath();
        ctx.ellipse(px + 17, py + 6, 13, 4, 0, 0, Math.PI * 2);
        ctx.fill();
      } else if (customization.hatId === "trainer_band") {
        ctx.fillStyle = "#dc2626";
        ctx.fillRect(px + 9, py + 8, 16, 3);
      }

      // Accessory Customization Overlay
      if (customization.accessoryId === "stylish_glasses") {
        ctx.fillStyle = "#1e293b";
        ctx.fillRect(px + 12, py + 14, 10, 2);
      } else if (customization.accessoryId === "headphones") {
        ctx.fillStyle = "#0284c7";
        ctx.fillRect(px + 8, py + 10, 3, 7);
        ctx.fillRect(px + 23, py + 10, 3, 7);
        ctx.beginPath();
        ctx.arc(px + 17, py + 10, 8, Math.PI, 0);
        ctx.strokeStyle = "#0284c7";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    } else {
      ctx.fillStyle = isCecilia ? "#4338ca" : "#f43f5e";
      ctx.fillRect(px + 12, py + 12, 16, 24);
    }
  };

  // Sister Player Rendering for Live Multiplayer Synchronization between Tablets
  const drawSisterPlayer = (ctx: CanvasRenderingContext2D, s: SisterSyncState) => {
    const sx = Math.floor(s.x * TILE_SIZE);
    const sy = Math.floor(s.y * TILE_SIZE);

    const isCecilia = s.sisterName === "Cecília";
    const charKey = isCecilia ? "cecilia" : "bianca";
    const charImg = fireredCharacters.current[charKey] || fireredCharacters.current["player"];

    if (s.isSurfing) {
      const wave = Math.sin(waterTick.current * 5) * 2;
      ctx.fillStyle = "rgba(56, 189, 248, 0.45)";
      ctx.beginPath();
      ctx.ellipse(sx + 20, sy + 36, 16 + wave, 7 + wave * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#ec4899";
      ctx.beginPath();
      ctx.ellipse(sx + 20, sy + 34, 14, 6, 0, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
      ctx.beginPath();
      ctx.ellipse(sx + 20, sy + 36, 12, 5, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    if (charImg && charImg.complete && charImg.naturalWidth > 0) {
      const fw = charImg.width / 4;
      const fh = charImg.height / 4;
      const rowMap: Record<Direction, number> = { down: 0, left: 1, right: 2, up: 3 };
      const row = rowMap[s.facing] ?? 0;
      const frame = s.isMoving ? Math.floor(waterTick.current * 4) % 4 : 0;

      ctx.drawImage(
        charImg,
        frame * fw,
        row * fh,
        fw,
        fh,
        sx + Math.round((TILE_SIZE - 34) / 2),
        sy + TILE_SIZE - 42,
        34,
        44
      );
    }

    // Floating online badge with green pulse dot
    const tagBob = Math.sin(waterTick.current * 4) * 2;
    ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
    ctx.beginPath();
    ctx.roundRect(sx - 12, sy - 28 + tagBob, 64, 17, 6);
    ctx.fill();
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Online green pulse dot
    ctx.fillStyle = "#22c55e";
    ctx.beginPath();
    ctx.arc(sx - 4, sy - 19 + tagBob, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 9px sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(s.sisterName, sx + 3, sy - 19 + tagBob);

    // If close to player, show interactive prompt
    const p = playerRef.current;
    const dist = Math.hypot(p.drawX - s.x, p.drawY - s.y);
    if (dist <= 1.5) {
      ctx.fillStyle = "#f59e0b";
      ctx.beginPath();
      ctx.roundRect(sx - 24, sy - 48 + tagBob, 88, 16, 6);
      ctx.fill();
      ctx.fillStyle = "#0f172a";
      ctx.font = "900 9px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("🤝 TROCA [Espaço]", sx + 20, sy - 40 + tagBob);
    }
  };

  // Official Pokémon FireRed NPC Rendering (Team Rocket Grunt, Oak, Mom, Mart Clerk, etc.)
  const drawNpc = (ctx: CanvasRenderingContext2D, npc: NpcDef, p: PlayerState) => {
    const nx = npc.x * TILE_SIZE;
    const ny = npc.y * TILE_SIZE;

    // Contact Soft Shadow
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.beginPath();
    ctx.ellipse(nx + 20, ny + 36, 12, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    if (npc.sprite === "pipoca") {
      const dogImg = pokemonSpriteImages.current[58] || pokemonSpriteImages.current[133];
      if (dogImg && dogImg.complete && dogImg.naturalWidth > 0) {
        ctx.drawImage(dogImg, nx + 2, ny + 2, TILE_SIZE - 4, TILE_SIZE - 4);
      }
      return;
    }

    let spriteKey = "villager";
    if (npc.sprite === "rocket") spriteKey = "rocket";
    else if (npc.sprite === "clerk") spriteKey = "clerk";
    else if (npc.sprite === "pitagoras") spriteKey = "prof";
    else if (npc.sprite === "flora") spriteKey = "picnic";
    else if (npc.sprite === "carlos") spriteKey = "player";
    else if (npc.sprite === "mamae") spriteKey = "parent";
    else if (npc.sprite === "oliver") spriteKey = "scout";
    else if (npc.sprite === "palavra") spriteKey = "villager";
    else if (npc.sprite === "cecilia") spriteKey = "cecilia";
    else if (npc.sprite === "bianca") spriteKey = "bianca";
    else if (npc.sprite === "rival" || npc.sprite === "rival_boy") spriteKey = "rival";
    else if (npc.sprite === "rival_girl") spriteKey = "picnic";

    const img = fireredCharacters.current[spriteKey] || fireredCharacters.current["villager"];
    if (img && img.complete && img.naturalWidth > 0) {
      const fw = img.width / 4;
      const fh = img.height / 4;
      // Row 0 = facing down / front
      ctx.drawImage(
        img,
        0,
        0,
        fw,
        fh,
        nx + Math.round((TILE_SIZE - 34) / 2),
        ny + TILE_SIZE - 42,
        34,
        44
      );
    } else {
      ctx.fillStyle = npc.isRocket ? "#0f172a" : "#3b82f6";
      ctx.fillRect(nx + 12, ny + 12, 16, 24);
    }

    // ⚡ Rival Visual Prompt
    if (npc.id === "rival-encounter") {
      const distToPlayer = Math.hypot(p.drawX - npc.x, p.drawY - npc.y);
      if (distToPlayer <= 2.5) {
        const alertBob = Math.sin(waterTick.current * 8) * 3;
        ctx.fillStyle = "#f59e0b";
        ctx.beginPath();
        ctx.roundRect(nx + 2, ny - 30 + alertBob, 36, 17, 6);
        ctx.fill();
        ctx.fillStyle = "#0f172a";
        ctx.font = "900 10px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("VS ⚡", nx + 20, ny - 22 + alertBob);
      }
    }

    // ❗ Proximity Alert: Pop-Up Exclamation Speech Bubble if Player is near Team Rocket Grunt!
    if (npc.isRocket) {
      const distToPlayer = Math.hypot(p.drawX - npc.x, p.drawY - npc.y);
      if (distToPlayer <= 2.5) {
        const alertBob = Math.sin(waterTick.current * 8) * 3;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(nx + 20, ny - 25 + alertBob, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#dc2626";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = "#dc2626";
        ctx.font = "900 13px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("!", nx + 20, ny - 25 + alertBob);
      }
    }

    // Floating Animated Question Mark (?) for Quiz NPCs
    if (npc.quiz && !npc.isRocket) {
      const qBob = Math.sin(waterTick.current * 4) * 2;
      ctx.fillStyle = "#facc15";
      ctx.beginPath();
      ctx.arc(nx + 20, ny - 8 + qBob, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#78350f";
      ctx.font = "900 9px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("?", nx + 20, ny - 8 + qBob);
    }
  };

  // Modern Floating 3D "🎯 Foco da Semana" Badge & Indicator
  const drawFocoDaSemanaBadge = (ctx: CanvasRenderingContext2D) => {
    if (!activeQuest || activeQuest.isCompleted) return;

    let targetCoords: { x: number; y: number } | null = null;
    if (activeQuest.targetSubjectId === "matematica") {
      targetCoords = { x: 10, y: 8 };
    } else if (activeQuest.targetSubjectId === "ciencias") {
      targetCoords = { x: 32, y: 8 };
    } else if (activeQuest.targetSubjectId === "portugues") {
      targetCoords = { x: 8, y: 25 };
    } else if (activeQuest.targetSubjectId === "ingles") {
      targetCoords = { x: 33, y: 25 };
    } else if (activeQuest.targetSubjectId === "irma") {
      const sisterNpc = activeNpcs.find((n) => n.id === "sister");
      if (sisterNpc) {
        targetCoords = { x: sisterNpc.x, y: sisterNpc.y };
      }
    } else if (activeQuest.targetSubjectId === "flores") {
      targetCoords = { x: 17, y: 28 };
    }

    if (!targetCoords) return;

    const bx = targetCoords.x * TILE_SIZE + TILE_SIZE / 2;
    const by = targetCoords.y * TILE_SIZE - 28;
    const floatBob = Math.sin(waterTick.current * 4) * 3.5;
    const pulseScale = 1 + Math.sin(waterTick.current * 5) * 0.05;

    ctx.save();
    ctx.translate(bx, by + floatBob);
    ctx.scale(pulseScale, pulseScale);

    // Glowing Aura
    ctx.fillStyle = "rgba(251, 191, 36, 0.4)";
    ctx.beginPath();
    ctx.arc(0, 0, 20, 0, Math.PI * 2);
    ctx.fill();

    // Modern 3D Holographic Pill
    ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
    ctx.beginPath();
    ctx.roundRect(-42, -10, 84, 22, 11);
    ctx.fill();

    const pillGrad = ctx.createLinearGradient(-40, -10, 40, 10);
    pillGrad.addColorStop(0, "#fbbf24");
    pillGrad.addColorStop(1, "#f59e0b");
    ctx.fillStyle = pillGrad;
    ctx.beginPath();
    ctx.roundRect(-40, -9, 80, 18, 9);
    ctx.fill();

    // Text & Target Icon
    ctx.fillStyle = "#78350f";
    ctx.font = "900 8.5px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("🎯 FOCO ATIVO", 0, 0);

    // Modern Downward Pointer Arrow
    ctx.fillStyle = "#f59e0b";
    ctx.beginPath();
    ctx.moveTo(-4, 9);
    ctx.lineTo(4, 9);
    ctx.lineTo(0, 15);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  };

  // Canvas Tap-to-Move handler for Tablet/iPad
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (
      activeBattle?.isOpen ||
      isPhoneOpen ||
      isBagOpen ||
      isMarketOpen ||
      isRescueOpen ||
      activeWildEncounter ||
      activeBuilding ||
      isPlateauModalOpen ||
      isCustomizationOpen ||
      isGymModalOpen ||
      isEvolutionModalOpen ||
      isRivalModalOpen ||
      isTradeModalOpen ||
      isExamModalOpen ||
      isCloudSettingsOpen ||
      showHelp ||
      Date.now() < doorCooldownRef.current
    ) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;

    const zoom = cameraZoomRef.current || 1.45;
    const viewWidth = canvas.width / zoom;
    const viewHeight = canvas.height / zoom;

    const p = playerRef.current;
    const camX = p.drawX * TILE_SIZE - viewWidth / 2 + TILE_SIZE / 2;
    const camY = p.drawY * TILE_SIZE - viewHeight / 2 + TILE_SIZE / 2;

    const worldX = Math.floor((camX + clickX / zoom) / TILE_SIZE);
    const worldY = Math.floor((camY + clickY / zoom) / TILE_SIZE);

    if (activeInterior) {
      let maxCols = HOUSE_COLS;
      let maxRows = HOUSE_ROWS;
      if (activeInterior.buildingId === "pokemart") {
        maxCols = POKEMART_COLS;
        maxRows = POKEMART_ROWS;
      } else if (activeInterior.buildingId === "science_lab") {
        maxCols = POKEMON_CENTER_COLS;
        maxRows = POKEMON_CENTER_ROWS;
      } else if (activeInterior.buildingId === "fossil_cave") {
        maxCols = CAVE_COLS;
        maxRows = CAVE_ROWS;
      } else if (activeInterior.buildingId === "insect_forest") {
        maxCols = FOREST_COLS;
        maxRows = FOREST_ROWS;
      } else if (activeInterior.buildingId === "math_academy") {
        maxCols = MATH_ACADEMY_COLS;
        maxRows = MATH_ACADEMY_ROWS;
      } else if (activeInterior.buildingId === "portuguese_lib") {
        maxCols = PORTUGUESE_LIB_COLS;
        maxRows = PORTUGUESE_LIB_ROWS;
      } else if (activeInterior.buildingId === "english_tower") {
        maxCols = ENGLISH_TOWER_COLS;
        maxRows = ENGLISH_TOWER_ROWS;
      } else if (activeInterior.buildingId === "oak_lab") {
        maxCols = OAK_LAB_COLS;
        maxRows = OAK_LAB_ROWS;
      } else if (activeInterior.buildingId === "rival_house") {
        maxCols = RIVAL_HOUSE_COLS;
        maxRows = RIVAL_HOUSE_ROWS;
      } else if (activeInterior.buildingId === "indigo_plateau") {
        maxCols = INDIGO_PLATEAU_COLS;
        maxRows = INDIGO_PLATEAU_ROWS;
      }
      if (worldX >= 0 && worldX < maxCols && worldY >= 0 && worldY < maxRows) {
        targetMoveTile.current = { x: worldX, y: worldY };
        playSfx("click");
      }
    } else {
      if (worldX >= 0 && worldX < MAP_COLS && worldY >= 0 && worldY < MAP_ROWS) {
        targetMoveTile.current = { x: worldX, y: worldY };
        playSfx("click");
      }
    }
  };

  // Virtual D-Pad Touch Handlers
  const handleDpadPress = (dir: Direction) => {
    if (
      activeBattle?.isOpen ||
      isPhoneOpen ||
      isBagOpen ||
      isMarketOpen ||
      isRescueOpen ||
      activeWildEncounter ||
      activeBuilding ||
      isPlateauModalOpen ||
      isCustomizationOpen ||
      isGymModalOpen ||
      isEvolutionModalOpen ||
      isRivalModalOpen ||
      isTradeModalOpen ||
      isExamModalOpen ||
      isCloudSettingsOpen ||
      showHelp
    ) {
      return;
    }
    touchDirection.current = dir;
    targetMoveTile.current = null;
    playSfx("pop");
  };

  const handleDpadRelease = () => {
    touchDirection.current = null;
  };

  const currentProfile: StudentProfile = {
    ...STUDENT_PROFILES[currentYear],
    coins,
    currentXp: xp,
  };

  // 1. Initial loading splash screen
  if (isCheckingInitialSession) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-300 select-none">
        <RefreshCw className="w-10 h-10 animate-spin text-red-500 mb-4" />
        <h2 className="text-xl font-black text-amber-400 tracking-wide mb-1">Vila do Saber • FireRed RPG</h2>
        <p className="text-xs text-slate-400">Verificando perfis das irmãs e conexão com a nuvem...</p>
      </div>
    );
  }

  // 2. Profile Selection & Login Gate
  if (!activeProfileId) {
    return (
      <RpgLoginScreen
        onLoginSuccess={(saveData, fromCloud) => {
          applySaveData(saveData, fromCloud);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none">
      {/* Top Retro Navigation Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow-md sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <Link
            href={`/vila?ano=${currentYear}`}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 px-3 py-1.5 rounded-xl border border-slate-700 text-xs font-bold transition shadow"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" />
            <span>Voltar à Vila</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="bg-red-600 text-white font-black text-[11px] px-2.5 py-0.5 rounded-full tracking-wider shadow-md border border-red-400">
              GBA 16-BIT
            </span>
            <h1 className="font-black text-sm md:text-base text-amber-400 tracking-wide flex items-center gap-1.5">
              <span>VILA DO SABER</span>
              <span className="text-red-400 font-bold text-xs hidden sm:inline">| Pokémon FireRed Edition</span>
            </h1>
          </div>
        </div>

        {/* Active Player Profile Badge & Cloud Sync Indicator */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Active Player Profile Pill */}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-black shadow-inner ${
              isPlayerCecilia
                ? "bg-amber-950/70 border-amber-500/50 text-amber-300"
                : "bg-emerald-950/70 border-emerald-500/50 text-emerald-300"
            }`}
          >
            <span>{isPlayerCecilia ? "⚡" : "🦊"}</span>
            <span>{playerName} ({currentYear}º Ano)</span>
          </div>

          {/* Cloud Sync Status Indicator & Manual Save Button */}
          <button
            onClick={() => performCloudSave(true)}
            disabled={cloudSyncStatus.isSaving}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition active:scale-95 cursor-pointer shadow-md ${
              cloudSyncStatus.isSaving
                ? "bg-blue-600/30 border-blue-400 text-blue-300 animate-pulse"
                : cloudSyncStatus.isOnline
                ? "bg-emerald-900/40 border-emerald-500/50 text-emerald-300 hover:bg-emerald-800/50"
                : "bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700"
            }`}
            title="Clique para Salvar o progresso agora"
          >
            {cloudSyncStatus.isSaving ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-300" />
            ) : cloudSyncStatus.isOnline ? (
              <Cloud className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Database className="w-3.5 h-3.5 text-amber-400" />
            )}
            <span className="hidden md:inline">
              {cloudSyncStatus.isSaving
                ? "Salvando..."
                : cloudSyncStatus.isOnline
                ? `Nuvem OK${cloudSyncStatus.lastSavedAt ? ` (${cloudSyncStatus.lastSavedAt})` : ""}`
                : "Salvo Local"}
            </span>
          </button>

          {/* Cloud & PIN Settings */}
          <button
            onClick={() => {
              setIsCloudSettingsOpen(true);
              playSfx("open");
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-bold transition active:scale-95 cursor-pointer shadow-sm"
            title="Configurações de Nuvem & Senha"
          >
            <Settings className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Nuvem & PIN</span>
          </button>

          {/* Logout / Switch Profile Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-red-950/80 hover:bg-red-900 border border-red-500/40 text-red-300 hover:text-white text-xs font-bold transition active:scale-95 cursor-pointer shadow-sm"
            title="Sair e trocar de perfil de Treinadora"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Trocar Perfil</span>
          </button>
        </div>

        {/* Header Badges & Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Bolsa Trigger */}
          <button
            onClick={() => {
              setIsBagOpen(true);
              playSfx("open");
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-indigo-700 to-purple-700 hover:from-indigo-600 hover:to-purple-600 text-white rounded-xl border border-indigo-400 text-xs font-black shadow-md cursor-pointer transition active:scale-95"
            title="Abrir Bolsa de Itens e Cuidados Pokémon"
          >
            <span>🎒</span>
            <span className="hidden sm:inline">Bolsa</span>
            <span className="text-[10px] bg-black/40 px-1.5 py-0.2 rounded-md font-bold">
              {pokemonList.length}
            </span>
          </button>

          {/* Pokédex Trigger (151 Kanto Species) */}
          <button
            onClick={() => {
              setIsPokedexOpen(true);
              playSfx("open");
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white rounded-xl border border-red-400 text-xs font-black shadow-md cursor-pointer transition active:scale-95"
            title="Abrir Pokédex Oficial de Kanto (151 Pokémon)"
          >
            <span>🔴</span>
            <span className="hidden sm:inline">Pokédex</span>
            <span className="text-[10px] bg-black/40 px-1.5 py-0.2 rounded-md font-bold">
              {pokemonList.length}/151
            </span>
          </button>

          {/* Character Customization & Wardrobe Trigger */}
          <button
            onClick={() => {
              setIsCustomizationOpen(true);
              playSfx("open");
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white rounded-xl border border-pink-400 text-xs font-black shadow-md cursor-pointer transition active:scale-95"
            title="Personalizar Personagem e Boutique de Roupas"
          >
            <span>✨</span>
            <span className="hidden sm:inline">Visual</span>
          </button>

          {/* Gym Badges Display */}
          <div className="flex items-center gap-1 bg-slate-950/80 border border-slate-700 px-2 py-1 rounded-xl shadow-inner">
            <span className="text-[9px] font-black text-amber-400 hidden lg:inline mr-0.5">
              Insígnias:
            </span>
            <button
              onClick={() => {
                setActiveGymId("math");
                setIsGymModalOpen(true);
                playSfx("open");
              }}
              className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs transition cursor-pointer ${
                gymBadges.math_boulder
                  ? "bg-amber-500/30 border border-amber-400 text-amber-300 shadow-sm"
                  : "bg-slate-800 border border-slate-700 opacity-40 hover:opacity-80"
              }`}
              title="Ginásio de Matemática (Pewter) - Insígnia dos Números 📐"
            >
              📐
            </button>
            <button
              onClick={() => {
                setActiveGymId("science");
                setIsGymModalOpen(true);
                playSfx("open");
              }}
              className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs transition cursor-pointer ${
                gymBadges.science_cascade
                  ? "bg-sky-500/30 border border-sky-400 text-sky-300 shadow-sm"
                  : "bg-slate-800 border border-slate-700 opacity-40 hover:opacity-80"
              }`}
              title="Ginásio de Ciências (Cerulean) - Insígnia da Descoberta 🔬"
            >
              🔬
            </button>
            <button
              onClick={() => {
                setActiveGymId("portuguese");
                setIsGymModalOpen(true);
                playSfx("open");
              }}
              className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs transition cursor-pointer ${
                gymBadges.portuguese_rainbow
                  ? "bg-emerald-500/30 border border-emerald-400 text-emerald-300 shadow-sm"
                  : "bg-slate-800 border border-slate-700 opacity-40 hover:opacity-80"
              }`}
              title="Ginásio de Português (Celadon) - Insígnia da Leitura 📚"
            >
              📚
            </button>
            <button
              onClick={() => {
                setActiveGymId("english");
                setIsGymModalOpen(true);
                playSfx("open");
              }}
              className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs transition cursor-pointer ${
                gymBadges.english_thunder
                  ? "bg-purple-500/30 border border-purple-400 text-purple-300 shadow-sm"
                  : "bg-slate-800 border border-slate-700 opacity-40 hover:opacity-80"
              }`}
              title="Ginásio de Inglês (Vermilion) - Insígnia Global 🌍"
            >
              🌍
            </button>
          </div>

          {/* Rival Gary Challenge Trigger */}
          <button
            onClick={() => {
              setIsRivalModalOpen(true);
              playSfx("open");
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white rounded-xl border border-red-400 text-xs font-black shadow-md cursor-pointer transition active:scale-95"
            title="Duelo com o Rival (Gary)"
          >
            <span>⚡</span>
            <span className="hidden sm:inline">{rivalConfig?.name || "Rival"}</span>
          </button>

          {/* Sister Trade Cable Link Trigger */}
          <button
            onClick={() => {
              setIsTradeModalOpen(true);
              playSfx("open");
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white rounded-xl border border-indigo-400 text-xs font-black shadow-md cursor-pointer transition active:scale-95"
            title="Trocar Pokémon com a irmã (Cabo Link)"
          >
            <span>🤝</span>
            <span className="hidden sm:inline">Troca</span>
            {otherPlayerSync && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            )}
          </button>

          {/* Market Trigger */}
          <button
            onClick={() => {
              setIsMarketOpen(true);
              playSfx("open");
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-700 to-cyan-700 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl border border-blue-400 text-xs font-black shadow-md cursor-pointer transition active:scale-95"
            title="Abrir PokéMarket da Cidade"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-cyan-200" />
            <span className="hidden sm:inline">Market</span>
          </button>

          {/* Indigo Plateau Exam & Revision Trigger */}
          <button
            onClick={() => {
              setIsPlateauModalOpen(true);
              playSfx("open");
            }}
            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-black shadow-md cursor-pointer transition active:scale-95 ${
              isExamWeekActive
                ? "bg-gradient-to-r from-amber-600 via-indigo-600 to-purple-700 text-white border-amber-400 animate-pulse"
                : "bg-gradient-to-r from-indigo-700 to-purple-800 hover:from-indigo-600 hover:to-purple-700 text-white border-indigo-400"
            }`}
            title="Abrir Simulado de Provas e Revisão no Indigo Plateau"
          >
            <span>🏔️</span>
            <span className="hidden sm:inline">Indigo Plateau</span>
            {isExamWeekActive ? (
              <span className="text-[9px] bg-amber-400 text-slate-950 px-1 rounded-sm font-black uppercase">
                Provas 2x!
              </span>
            ) : (
              <span className="text-[9px] bg-indigo-500/40 text-indigo-200 px-1 rounded-sm font-bold hidden md:inline">
                2x EXP
              </span>
            )}
          </button>

          {/* PokéCelular Trigger */}
          <button
            onClick={() => {
              setIsPhoneOpen(true);
              setHasUnreadPhone(false);
              playSfx("open");
            }}
            className="relative flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 rounded-xl border border-sky-400 text-white text-xs font-black shadow-md cursor-pointer transition active:scale-95"
            title="Abrir PokéCelular de Papai Carlos e Mamãe Renata"
          >
            <Smartphone className="w-4 h-4 text-sky-200 animate-pulse" />
            <span className="hidden sm:inline">PokéCelular</span>
            {hasUnreadPhone && (
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping absolute -top-1 -right-1 border border-white" />
            )}
          </button>

          {/* Stolen Pokemon Rescue Alert Trigger */}
          {stolenPokemonList.length > 0 && (
            <button
              onClick={() => {
                setIsRescueOpen(true);
                playSfx("open");
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-rose-600 to-red-600 text-white rounded-xl border border-rose-300 text-xs font-black shadow-md cursor-pointer animate-pulse active:scale-95"
              title="Resgatar Pokémon roubado pela Equipe Rocket"
            >
              <span>🚨</span>
              <span>Resgatar!</span>
            </button>
          )}

          {/* Coins & XP */}
          <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-lg text-amber-300 font-black text-xs">
            <Coins className="w-3.5 h-3.5 text-amber-400" />
            <span>{coins}</span>
          </div>

          <div className="flex items-center gap-1.5 bg-purple-500/10 border border-purple-500/30 px-2.5 py-1 rounded-lg text-purple-300 font-black text-xs">
            <Star className="w-3.5 h-3.5 text-purple-400" />
            <span>{xp} XP</span>
          </div>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition"
            title={isMuted ? "Ativar som" : "Desativar som"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          <button
            onClick={() => setShowHelp(true)}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition"
            title="Como jogar"
          >
            <HelpCircle className="w-4 h-4 text-blue-400" />
          </button>
        </div>
      </header>

      {/* Main Game Screen */}
      <main className="flex-1 flex flex-col items-center justify-center p-2 sm:p-4 max-w-6xl mx-auto w-full">
        {/* Victory Notification Banner */}
        {victoryNotice && (
          <div className="w-full max-w-4xl mb-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 text-white px-4 py-2.5 rounded-xl border border-emerald-400 shadow-lg flex items-center justify-between text-xs sm:text-sm font-black animate-bounce">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-300" />
              <span>{victoryNotice}</span>
            </div>
            <button
              onClick={() => setVictoryNotice(null)}
              className="text-emerald-100 hover:text-white text-xs bg-emerald-700/60 px-2 py-0.5 rounded"
            >
              OK
            </button>
          </div>
        )}

        {/* Game Boy Frame Wrapper */}
        <div className="relative w-full max-w-4xl bg-slate-900 border-4 border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
          {/* Top Zone Entrance Toast (Pokémon FireRed Banner) */}
          {zoneBanner && (
            <div className="absolute top-3 left-4 z-20 bg-slate-950/90 backdrop-blur-md border-2 border-amber-500/60 rounded-xl px-4 py-2 shadow-xl flex items-center gap-3 animate-fade-in pointer-events-none">
              <span className="text-2xl">{zoneBanner.icon}</span>
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-amber-400">{zoneBanner.title}</p>
                <p className="text-[11px] text-slate-300">{zoneBanner.subtitle}</p>
              </div>
            </div>
          )}

          {/* Floating PokéCelular Notification Toast */}
          {phoneToast && (
            <div
              onClick={() => {
                setIsPhoneOpen(true);
                setHasUnreadPhone(false);
                setPhoneToast(null);
                playSfx("open");
              }}
              className="absolute top-3 right-4 z-20 bg-gradient-to-r from-sky-600 to-indigo-700 border-2 border-sky-300 text-white px-4 py-2 rounded-2xl shadow-2xl flex items-center gap-3 cursor-pointer animate-bounce active:scale-95 transition"
            >
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-lg">
                📱
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-sky-200">
                  {phoneToast.sender} no PokéCelular
                </p>
                <p className="text-xs font-extrabold">{phoneToast.title}</p>
              </div>
            </div>
          )}

          {/* Canvas Viewport with Modern Bezel */}
          <div className="relative flex items-center justify-center bg-slate-950 aspect-[16/10] max-h-[62vh] w-full overflow-hidden modern-screen-border">
            <canvas
              ref={canvasRef}
              width={760}
              height={480}
              onClick={handleCanvasClick}
              className="modern-hd-canvas w-full h-full object-contain cursor-pointer touch-none"
            />

            {/* Zoom Controls inside Canvas Viewport (Authentic FireRed Framing) */}
            <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 px-2 py-1.5 rounded-2xl shadow-xl">
              <span className="text-[10px] font-black text-amber-400 flex items-center gap-1 select-none">
                <span>🔍</span>
                <span className="hidden sm:inline">Zoom:</span>
              </span>

              {/* Minus button */}
              <button
                onClick={() => {
                  setCameraZoom((prev) => Math.max(1.0, Math.round((prev - 0.15) * 100) / 100));
                  playSfx("click");
                }}
                className="w-6 h-6 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center text-xs font-black transition cursor-pointer active:scale-90"
                title="Diminuir Zoom"
              >
                −
              </button>

              {/* Preset 1.1x (Amplo) */}
              <button
                onClick={() => {
                  setCameraZoom(1.1);
                  playSfx("click");
                }}
                className={`px-2 py-0.5 rounded-lg text-[10px] font-black transition cursor-pointer ${
                  Math.abs(cameraZoom - 1.1) < 0.05
                    ? "bg-amber-500 text-slate-950 shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
                title="Modo Panorâmico (1.1x)"
              >
                1.1x
              </button>

              {/* Preset 1.45x (Padrão FireRed) */}
              <button
                onClick={() => {
                  setCameraZoom(1.45);
                  playSfx("click");
                }}
                className={`px-2 py-0.5 rounded-lg text-[10px] font-black transition cursor-pointer ${
                  Math.abs(cameraZoom - 1.45) < 0.05
                    ? "bg-amber-500 text-slate-950 shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
                title="Padrão FireRed GBA (1.45x - Recomendado)"
              >
                1.45x ★
              </button>

              {/* Preset 1.8x (Super Zoom) */}
              <button
                onClick={() => {
                  setCameraZoom(1.8);
                  playSfx("click");
                }}
                className={`px-2 py-0.5 rounded-lg text-[10px] font-black transition cursor-pointer ${
                  Math.abs(cameraZoom - 1.8) < 0.05
                    ? "bg-amber-500 text-slate-950 shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
                title="Modo Próximo (1.8x)"
              >
                1.8x
              </button>

              {/* Plus button */}
              <button
                onClick={() => {
                  setCameraZoom((prev) => Math.min(2.2, Math.round((prev + 0.15) * 100) / 100));
                  playSfx("click");
                }}
                className="w-6 h-6 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center text-xs font-black transition cursor-pointer active:scale-90"
                title="Aumentar Zoom"
              >
                +
              </button>
            </div>

            {/* Corner Quick Widgets inside Canvas Viewport */}
            <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
              {/* Pokédex button */}
              <button
                onClick={() => {
                  setIsPokedexOpen(true);
                  playSfx("open");
                }}
                className="flex items-center gap-1.5 bg-slate-900/90 hover:bg-slate-800 border border-red-400/60 text-white px-3 py-1.5 rounded-2xl shadow-xl transition active:scale-95 cursor-pointer backdrop-blur-md"
                title="Abrir Pokédex de Kanto (151 Pokémon)"
              >
                <span>🔴</span>
                <span className="text-[10px] font-black text-red-300 hidden sm:inline">
                  Pokédex ({pokemonList.length})
                </span>
              </button>

              {/* Visual / Wardrobe button */}
              <button
                onClick={() => {
                  setIsCustomizationOpen(true);
                  playSfx("open");
                }}
                className="flex items-center gap-1.5 bg-slate-900/90 hover:bg-slate-800 border border-pink-400/60 text-white px-3 py-1.5 rounded-2xl shadow-xl transition active:scale-95 cursor-pointer backdrop-blur-md"
                title="Personalizar Personagem e Roupas"
              >
                <span>✨</span>
                <span className="text-[10px] font-black text-pink-300 hidden sm:inline">Visual</span>
              </button>

              {/* Bag button */}
              <button
                onClick={() => {
                  setIsBagOpen(true);
                  playSfx("open");
                }}
                className="flex items-center gap-1.5 bg-slate-900/90 hover:bg-slate-800 border border-indigo-400/60 text-white px-3 py-1.5 rounded-2xl shadow-xl transition active:scale-95 cursor-pointer backdrop-blur-md"
                title="Abrir Bolsa Pokémon"
              >
                <span>🎒</span>
                <span className="text-[10px] font-black text-indigo-300 hidden sm:inline">
                  Bolsa ({pokemonList.length})
                </span>
              </button>

              {/* PokéCelular button */}
              <button
                onClick={() => {
                  setIsPhoneOpen(true);
                  setHasUnreadPhone(false);
                  playSfx("open");
                }}
                className="flex items-center gap-1.5 bg-slate-900/90 hover:bg-slate-800 border border-sky-400/60 text-white px-3 py-1.5 rounded-2xl shadow-xl transition active:scale-95 cursor-pointer backdrop-blur-md"
                title="Abrir PokéCelular"
              >
                <div className="relative">
                  <Smartphone className="w-4 h-4 text-sky-400" />
                  {hasUnreadPhone && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full animate-ping" />
                  )}
                </div>
                <span className="text-[10px] font-black text-sky-300 hidden sm:inline">Celular</span>
              </button>
            </div>

            {/* Authentic Pokémon FireRed Retro Dialogue Window */}
            {activeDialog && (
              <div className="absolute bottom-3 left-3 right-3 z-30 bg-[#f8f8f0] border-4 border-[#505860] rounded-2xl p-4 shadow-2xl animate-in fade-in slide-in-from-bottom-2 text-[#282828]">
                {/* Speaker Header with FireRed Badge */}
                <div className="flex items-center justify-between border-b-2 border-[#d0d8e0] pb-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#d03028] text-white px-3 py-0.5 rounded-lg flex items-center gap-1.5 shadow-sm border border-[#902018]">
                      <span className="text-xs">🔴</span>
                      <span className="font-black text-xs uppercase tracking-wider">
                        {activeDialog.speaker}
                      </span>
                    </div>
                    {activeDialog.role && (
                      <span className="bg-[#385890] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-lg border border-[#203860]">
                        {activeDialog.role}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setActiveDialog(null)}
                    className="text-[#606870] hover:text-[#181818] text-xs font-bold px-2 py-0.5 rounded bg-[#e8e8dc] hover:bg-[#d8d8cc] border border-[#c0c8d0] transition cursor-pointer"
                  >
                    Fechar ✕
                  </button>
                </div>

                {/* Dialog Body with clear retro font */}
                <p className="text-xs sm:text-sm font-bold leading-relaxed text-[#202020] mb-3 tracking-wide">
                  {activeDialog.text}
                </p>

                {/* Optional Teacher Quiz in Classic GBA Card */}
                {activeDialog.quiz && (
                  <div className="mt-2 bg-[#ecece0] border-2 border-[#b0b8c0] rounded-xl p-3 shadow-inner">
                    <p className="text-xs font-black text-[#8c2820] mb-2 flex items-center gap-1.5">
                      <span className="text-sm">❓</span>
                      <span>Desafio: {activeDialog.quiz.question}</span>
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {activeDialog.quiz.options.map((opt, idx) => (
                        <button
                          key={idx}
                          disabled={activeDialog.hasAnswered}
                          onClick={() => handleAnswerQuiz(idx)}
                          className={`px-3 py-2 rounded-xl text-xs font-bold transition text-left border-2 ${
                            activeDialog.hasAnswered
                              ? idx === activeDialog.quiz!.correctIndex
                                ? "bg-emerald-600 text-white border-emerald-700 shadow-md"
                                : "bg-[#d8d8cc] text-[#808890] border-[#b0b8c0] opacity-60"
                              : "bg-[#ffffff] hover:bg-[#d03028] text-[#282828] hover:text-white border-[#9098a0] shadow active:scale-95 cursor-pointer"
                          }`}
                        >
                          <span className="mr-1.5 text-[#d03028] font-black">▶</span>
                          <span>{opt}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Button for in-room NPC challenges/features */}
                {activeDialog.actionButton && (
                  <div className="mt-3 flex justify-start">
                    <button
                      onClick={() => {
                        const act = activeDialog.actionButton;
                        setActiveDialog(null);
                        act?.onClick();
                      }}
                      className="px-4 py-2 bg-[#d03028] hover:bg-[#b02018] text-white font-black text-xs rounded-xl shadow-lg border-2 border-[#902018] active:scale-95 transition flex items-center gap-2 cursor-pointer"
                    >
                      <span>▶</span>
                      <span>{activeDialog.actionButton.label}</span>
                    </button>
                  </div>
                )}

                {/* Blinking FireRed Red Prompt Arrow */}
                <div className="flex justify-end mt-2 items-center gap-1.5">
                  <span className="text-[10px] font-bold text-[#707880]">
                    Toque ou aperte ESPAÇO / ENTER para prosseguir
                  </span>
                  <span className="text-[#d03028] font-black text-sm animate-bounce">
                    ▼
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* iPad / Tablet Touch Controls & Game Bar (Authentic GBA Hardware Aesthetic) */}
          <div className="bg-slate-950 border-t-2 border-slate-800 p-3 flex flex-wrap items-center justify-between gap-4">
            {/* Virtual GBA D-Pad (Left side) */}
            <div className="flex items-center gap-3">
              <div className="relative w-32 h-32 gba-dpad-housing rounded-full p-2 flex items-center justify-center">
                {/* UP */}
                <button
                  onMouseDown={() => handleDpadPress("up")}
                  onMouseUp={handleDpadRelease}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    handleDpadPress("up");
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    handleDpadRelease();
                  }}
                  className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-10 bg-slate-800 active:bg-blue-600 text-slate-200 rounded-t-xl border-t-2 border-x-2 border-slate-600 flex items-center justify-center font-black text-sm shadow-md active:scale-95 transition"
                  title="Mover para Cima"
                >
                  ▲
                </button>

                {/* DOWN */}
                <button
                  onMouseDown={() => handleDpadPress("down")}
                  onMouseUp={handleDpadRelease}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    handleDpadPress("down");
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    handleDpadRelease();
                  }}
                  className="absolute bottom-2 left-1/2 -translate-x-1/2 w-10 h-10 bg-slate-800 active:bg-blue-600 text-slate-200 rounded-b-xl border-b-2 border-x-2 border-slate-600 flex items-center justify-center font-black text-sm shadow-md active:scale-95 transition"
                  title="Mover para Baixo"
                >
                  ▼
                </button>

                {/* LEFT */}
                <button
                  onMouseDown={() => handleDpadPress("left")}
                  onMouseUp={handleDpadRelease}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    handleDpadPress("left");
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    handleDpadRelease();
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-slate-800 active:bg-blue-600 text-slate-200 rounded-l-xl border-l-2 border-y-2 border-slate-600 flex items-center justify-center font-black text-sm shadow-md active:scale-95 transition"
                  title="Mover para Esquerda"
                >
                  ◀
                </button>

                {/* RIGHT */}
                <button
                  onMouseDown={() => handleDpadPress("right")}
                  onMouseUp={handleDpadRelease}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    handleDpadPress("right");
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    handleDpadRelease();
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-slate-800 active:bg-blue-600 text-slate-200 rounded-r-xl border-r-2 border-y-2 border-slate-600 flex items-center justify-center font-black text-sm shadow-md active:scale-95 transition"
                  title="Mover para Direita"
                >
                  ▶
                </button>

                {/* Tactile Center Pivot */}
                <div className="w-6 h-6 bg-slate-900 rounded-full border border-slate-700 shadow-inner" />
              </div>

              <div className="hidden sm:block text-[11px] text-slate-400 leading-tight">
                <p className="font-bold text-slate-200">🎮 Controles Touch & Teclado:</p>
                <p>Use o D-Pad virtual, teclado (setas/WASD) ou toque no mapa.</p>
              </div>
            </div>

            {/* Quick Status Bar */}
            <div className="flex-1 flex flex-col items-center justify-center text-center px-2">
              {activeInterior ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-amber-300 uppercase tracking-wider flex items-center gap-1.5 drop-shadow">
                    {activeInterior.buildingId === "family_house" && (
                      <>🏡 Casa da Família • {activeInterior.floor === 1 ? "1º Andar" : "2º Andar"}</>
                    )}
                    {activeInterior.buildingId === "pokemart" && <>🛒 PokéMart da Vila</>}
                    {activeInterior.buildingId === "science_lab" && <>🏥 Centro Pokémon & Laboratório</>}
                    {activeInterior.buildingId === "fossil_cave" && <>⛰️ Caverna dos Fósseis • Monte da Lua</>}
                    {activeInterior.buildingId === "insect_forest" && <>🌲 Floresta dos Insetos • Viridian Forest</>}
                    {activeInterior.buildingId === "oak_lab" && <>🔬 Laboratório do Prof. Carvalho</>}
                    {activeInterior.buildingId === "rival_house" && <>🏡 Casa do Rival & Daisy</>}
                    {activeInterior.buildingId === "indigo_plateau" && <>👑 Indigo Plateau • Cúpula dos Campeões</>}
                    {activeInterior.buildingId === "math_academy" && <>📐 Academia de Matemática</>}
                    {activeInterior.buildingId === "portuguese_lib" && <>📚 Grande Biblioteca</>}
                    {activeInterior.buildingId === "english_tower" && <>⚡ Torre Tech de Inglês</>}
                  </span>
                  <button
                    onClick={handleExitInterior}
                    className="px-2.5 py-0.5 rounded-full bg-rose-600/90 hover:bg-rose-500 text-white text-[10px] font-black shadow flex items-center gap-1 border border-rose-300/40 cursor-pointer active:scale-95 transition-all"
                    title="Sair para a Vila do Saber"
                  >
                    🚪 Sair
                  </button>
                </div>
              ) : (
                <span className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{currentZone}</span>
                </span>
              )}
              <p className="text-[11px] text-slate-400 mt-0.5">
                Treinadora: <strong className="text-slate-200">{playerName}</strong> • Irmã:{" "}
                <strong className="text-slate-200">{sisterName}</strong>
              </p>
              {activeQuest && !activeQuest.isCompleted && (
                <div className="mt-1 px-3 py-1 bg-amber-500/20 border-2 border-amber-400/50 rounded-full text-[10px] font-black text-amber-300 animate-pulse flex items-center gap-1 shadow">
                  <span>🎯 Pedido Ativo:</span>
                  <span>{activeQuest.title}</span>
                </div>
              )}
            </div>

            {/* Tactile Action Buttons (Right side - Bolsa, Celular, B and A) */}
            <div className="flex items-center gap-2.5">
              {/* Bolsa Touch Button */}
              <button
                onClick={() => {
                  setIsBagOpen(true);
                  playSfx("open");
                }}
                className="w-11 h-11 rounded-2xl gba-btn-sub-tactile flex flex-col items-center justify-center text-white cursor-pointer"
                title="Abrir Bolsa de Itens e Pokémon"
              >
                <span className="text-xs">🎒</span>
                <span className="text-[7.5px] font-black uppercase text-sky-200">Bolsa</span>
              </button>

              {/* PokéCelular Touch Button */}
              <button
                onClick={() => {
                  setIsPhoneOpen(true);
                  setHasUnreadPhone(false);
                  playSfx("open");
                }}
                className="w-11 h-11 rounded-2xl gba-btn-sub-tactile flex flex-col items-center justify-center text-white cursor-pointer relative"
                title="Abrir PokéCelular"
              >
                <Smartphone className="w-3.5 h-3.5 text-sky-200" />
                <span className="text-[7.5px] font-black uppercase text-sky-200">Celular</span>
                {hasUnreadPhone && (
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 absolute -top-1 -right-1 border border-white animate-ping" />
                )}
              </button>

              {/* B Button: Run / Cancel */}
              <button
                onMouseDown={() => {
                  playerRef.current.isRunning = true;
                }}
                onMouseUp={() => {
                  playerRef.current.isRunning = false;
                }}
                onTouchStart={(e) => {
                  e.preventDefault();
                  playerRef.current.isRunning = true;
                  playSfx("pop");
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  playerRef.current.isRunning = false;
                }}
                className="w-13 h-13 rounded-full gba-btn-b-tactile flex flex-col items-center justify-center text-slate-100 cursor-pointer"
                title="Correr (B)"
              >
                <span className="font-black text-sm">B</span>
                <span className="text-[8px] font-bold uppercase tracking-wider text-slate-300">Correr</span>
              </button>

              {/* A Button: Action / Interact */}
              <button
                onClick={handleInteract}
                className="w-14 h-14 rounded-full gba-btn-a-tactile flex flex-col items-center justify-center text-white cursor-pointer"
                title="Ação / Interagir (A)"
              >
                <span className="font-black text-base">A</span>
                <span className="text-[8.5px] font-black uppercase tracking-wider text-rose-100">Ação</span>
              </button>
            </div>
          </div>
        </div>

        {/* Route Blockade Status HUD (Rocket Checkpoints & Supplies) */}
        <div className="w-full max-w-4xl mt-3 bg-slate-900 border border-slate-800 p-3 rounded-2xl shadow-md">
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-800 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-base">🚀</span>
              <span className="text-xs font-black uppercase tracking-wider text-rose-400">
                Bloqueios da Equipe Rocket (Passagens das Cidades)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  triggerNewParentMessage();
                }}
                className="text-[11px] font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700 transition cursor-pointer"
                title="Simular nova mensagem do Papai ou Mamãe"
              >
                <PhoneCall className="w-3 h-3 text-sky-400" />
                <span>Simular Mensagem 📱</span>
              </button>

              <button
                onClick={() => {
                  playSfx("click");
                  setUnlockedRoutes({
                    matematica: false,
                    ciencias: false,
                    portugues: false,
                    ingles: false,
                    biologia: false,
                    quimica: false,
                  });
                  setVictoryNotice("🔄 Todos os guardas da Equipe Rocket voltaram aos seus postos para novos treinos!");
                }}
                className="text-[11px] font-bold text-slate-400 hover:text-amber-400 flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700 transition cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Resetar Batalhas</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
            {/* Matemática */}
            <div
              className={`p-2 rounded-xl border flex items-center justify-between ${
                unlockedRoutes.matematica
                  ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
                  : "bg-rose-950/40 border-rose-500/40 text-rose-300"
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold">
                <span>📐</span>
                <span>Matemática</span>
              </div>
              <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded bg-black/40">
                {unlockedRoutes.matematica ? "🔓 Aberta" : "🔒 Bloqueada"}
              </span>
            </div>

            {/* Ciências */}
            <div
              className={`p-2 rounded-xl border flex items-center justify-between ${
                unlockedRoutes.ciencias
                  ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
                  : "bg-rose-950/40 border-rose-500/40 text-rose-300"
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold">
                <span>🔬</span>
                <span>Ciências</span>
              </div>
              <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded bg-black/40">
                {unlockedRoutes.ciencias ? "🔓 Aberta" : "🔒 Bloqueada"}
              </span>
            </div>

            {/* Português */}
            <div
              className={`p-2 rounded-xl border flex items-center justify-between ${
                unlockedRoutes.portugues
                  ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
                  : "bg-rose-950/40 border-rose-500/40 text-rose-300"
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold">
                <span>📚</span>
                <span>Português</span>
              </div>
              <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded bg-black/40">
                {unlockedRoutes.portugues ? "🔓 Aberta" : "🔒 Bloqueada"}
              </span>
            </div>

            {/* Inglês */}
            <div
              className={`p-2 rounded-xl border flex items-center justify-between ${
                unlockedRoutes.ingles
                  ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
                  : "bg-rose-950/40 border-rose-500/40 text-rose-300"
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold">
                <span>🇬🇧</span>
                <span>Inglês & Tech</span>
              </div>
              <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded bg-black/40">
                {unlockedRoutes.ingles ? "🔓 Aberta" : "🔒 Bloqueada"}
              </span>
            </div>

            {/* Biologia & Safari */}
            <div
              className={`p-2 rounded-xl border flex items-center justify-between ${
                unlockedRoutes.biologia
                  ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
                  : "bg-rose-950/40 border-rose-500/40 text-rose-300"
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold">
                <span>🦁</span>
                <span>Biologia</span>
              </div>
              <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded bg-black/40">
                {unlockedRoutes.biologia ? "🔓 Aberta" : "🔒 Bloqueada"}
              </span>
            </div>

            {/* Química & Fósseis */}
            <div
              className={`p-2 rounded-xl border flex items-center justify-between ${
                unlockedRoutes.quimica
                  ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
                  : "bg-rose-950/40 border-rose-500/40 text-rose-300"
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold">
                <span>🧪</span>
                <span>Química</span>
              </div>
              <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded bg-black/40">
                {unlockedRoutes.quimica ? "🔓 Aberta" : "🔒 Bloqueada"}
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Wild Pokemon Capture Modal */}
      {activeWildEncounter && (
        <PokemonCaptureModal
          isOpen={!!activeWildEncounter}
          onClose={() => setActiveWildEncounter(null)}
          wildPokemon={activeWildEncounter}
          inventory={inventory}
          onConsumeItem={handleConsumeItem}
          onCaptureSuccess={handleCaptureSuccess}
          onOpenMarket={() => {
            setActiveWildEncounter(null);
            setIsMarketOpen(true);
          }}
        />
      )}

      {/* Rpg Bag Modal (Pokemon Care & Items) */}
      {isBagOpen && (
        <RpgBagModal
          isOpen={isBagOpen}
          onClose={() => setIsBagOpen(false)}
          pokemonList={pokemonList}
          stolenList={stolenPokemonList}
          inventory={inventory}
          coins={coins}
          onUsePotion={handleUsePotion}
          onUseAntidote={handleUseAntidote}
          onPetPokemon={handlePetPokemon}
          onOpenMarket={() => setIsMarketOpen(true)}
          onOpenRocketRescue={() => setIsRescueOpen(true)}
          onTriggerEvolution={(poke, targetId, method) => {
            setActiveEvolution({
              pokemon: poke,
              targetPokedexId: targetId,
              method,
            });
            setIsEvolutionModalOpen(true);
          }}
        />
      )}

      {/* Rpg Market Modal (Shop Supplies) */}
      {isMarketOpen && (
        <RpgMarketModal
          isOpen={isMarketOpen}
          onClose={() => setIsMarketOpen(false)}
          coins={coins}
          inventory={inventory}
          onBuyItem={handleBuyMarketItem}
        />
      )}

      {/* Rocket Rescue Modal (Double Question Challenge to Recover Stolen Pokemon) */}
      {isRescueOpen && stolenPokemonList.length > 0 && (
        <RocketRescueModal
          isOpen={isRescueOpen}
          onClose={() => setIsRescueOpen(false)}
          stolenPokemon={stolenPokemonList}
          year={currentYear}
          studentName={playerName}
          onRescueSuccess={handleRescueSuccess}
        />
      )}

      {/* Knowledge Battle Modal (Equipe Rocket) */}
      {activeBattle?.isOpen && (
        <KnowledgeBattleModal
          isOpen={activeBattle.isOpen}
          onClose={() => setActiveBattle(null)}
          onVictory={handleBattleVictory}
          onDefeat={handleRocketBattleDefeat}
          currentProfile={currentProfile}
          subjectName={activeBattle.subjectName}
          subjectId={activeBattle.subjectId}
          questionData={activeBattle.questionData}
        />
      )}

      {/* PokéCelular Modal (SaberPhone) */}
      {isPhoneOpen && (
        <SaberPhoneModal
          isOpen={isPhoneOpen}
          onClose={() => setIsPhoneOpen(false)}
          currentProfile={currentProfile}
          activeQuest={activeQuest}
          messages={messages}
          onNavigateToQuestCity={(citySubjectId) => {
            setIsPhoneOpen(false);
            const questNames: Record<string, string> = {
              matematica: "Metrópole da Matemática (Noroeste)",
              ciencias: "Vale das Ciências (Nordeste)",
              portugues: "Cidadela do Português (Sudoeste)",
              ingles: "Distrito de Inglês & Tech (Sudeste)",
            };
            const hint = questNames[citySubjectId] || citySubjectId;
            setActiveDialog({
              speaker: "PokéCelular GPS 🧭",
              role: "Navegação",
              avatarSprite: "sign",
              text: `Destino da missão marcado no mapa: siga para ${hint}!`,
            });
          }}
          sisterName={sisterName}
        />
      )}

      {/* Official 151 Kanto Pokédex Modal */}
      {isPokedexOpen && (
        <KantoPokedexModal
          isOpen={isPokedexOpen}
          onClose={() => setIsPokedexOpen(false)}
          capturedList={pokemonList}
        />
      )}

      {/* Character Customization & Boutique Wardrobe Modal */}
      {isCustomizationOpen && (
        <CharacterCustomizationModal
          isOpen={isCustomizationOpen}
          onClose={() => setIsCustomizationOpen(false)}
          customization={customization}
          onSaveCustomization={updateCustomization}
          coins={coins}
          onSpendCoins={(amount) => {
            if (coins >= amount) {
              setCoins((c) => c - amount);
              return true;
            }
            return false;
          }}
          unlockedItemIds={unlockedWardrobeItems}
          onUnlockItem={unlockWardrobeItem}
          studentName={playerName}
        />
      )}

      {/* Subject Gym & HM Skill Challenge Modal */}
      {isGymModalOpen && (
        <GymChallengeModal
          isOpen={isGymModalOpen}
          onClose={() => setIsGymModalOpen(false)}
          gymId={activeGymId}
          badges={gymBadges}
          skills={explorerSkills}
          onAwardBadgeAndSkill={(badgeId, skillId, coinsWon, xpWon) => {
            updateGymBadges({ ...gymBadges, [badgeId]: true });
            updateExplorerSkills({ ...explorerSkills, [skillId]: true });
            setCoins((c) => c + coinsWon);
            setXp((x) => x + xpWon);
            setVictoryNotice(`🏆 Insígnia e Habilidade ${String(skillId).toUpperCase()} conquistadas com sucesso!`);
          }}
        />
      )}

      {/* Pokemon Evolution Modal (GBA Animation, Cancel with B, Stat Boosts) */}
      {isEvolutionModalOpen && activeEvolution && (
        <PokemonEvolutionModal
          isOpen={isEvolutionModalOpen}
          onClose={() => {
            setIsEvolutionModalOpen(false);
            setActiveEvolution(null);
          }}
          pokemon={activeEvolution.pokemon}
          targetPokedexId={activeEvolution.targetPokedexId}
          evolutionMethod={activeEvolution.method}
          onEvolutionComplete={(updatedPokemon) => {
            setPokemonList((prev) =>
              prev.map((p) => (p.id === updatedPokemon.id ? updatedPokemon : p))
            );
            setVictoryNotice(`✨ Seu Pokémon evoluiu para ${updatedPokemon.name}!`);
          }}
        />
      )}

      {/* Rival Challenge & Customization Modal */}
      {isRivalModalOpen && (
        <RivalChallengeModal
          isOpen={isRivalModalOpen}
          onClose={() => setIsRivalModalOpen(false)}
          sisterName={sisterName}
          currentYear={currentYear}
          playerActivePokemon={pokemonList[0] || null}
          rivalConfig={rivalConfig}
          onSaveRivalConfig={(config) => {
            setRivalConfig(config);
            try {
              localStorage.setItem("rpg_rival_config", JSON.stringify(config));
            } catch {}
          }}
          onBattleVictory={handleRivalBattleVictory}
        />
      )}

      {/* Building Interior Modal (Interactive Houses, Beds, Homework, Shops, Gyms) */}
      {activeBuilding && (
        <BuildingInteriorModal
          isOpen={!!activeBuilding}
          onClose={handleExitBuilding}
          buildingType={activeBuilding.type}
          buildingName={activeBuilding.name}
          studentName={playerName}
          currentYear={currentYear}
          pokemonList={pokemonList}
          onHealAllPokemon={healAllPokemon}
          coins={coins}
          onAddCoins={(amount) => setCoins((c) => c + amount)}
          onAddXp={(amount) => setXp((x) => x + amount)}
          onAddPotion={() =>
            setInventory((inv) => ({ ...inv, potions: inv.potions + 1 }))
          }
          onOpenCustomization={() => setIsCustomizationOpen(true)}
          onOpenMarket={() => setIsMarketOpen(true)}
          onOpenGym={(gymId) => {
            setActiveGymId(gymId);
            setIsGymModalOpen(true);
          }}
          onOpenTrade={() => setIsTradeModalOpen(true)}
          onOpenPokedex={() => setIsPokedexOpen(true)}
          onOpenRescue={() => setIsRescueOpen(true)}
        />
      )}

      {/* Sister Link Cable Pokemon Trade Modal */}
      {isTradeModalOpen && (
        <PokemonTradeModal
          isOpen={isTradeModalOpen}
          onClose={() => setIsTradeModalOpen(false)}
          sisterName={sisterName}
          pokemonList={pokemonList}
          otherPlayerSync={otherPlayerSync}
          onCompleteTrade={(sentPokemonId, receivedPokemon, willEvolve) => {
            setPokemonList((prev) => [receivedPokemon, ...prev.filter((p) => p.id !== sentPokemonId)]);
            setVictoryNotice(`🤝 Troca concluída! Você recebeu um ${receivedPokemon.species}!`);
            if (willEvolve) {
              const tradeEvolutionTarget =
                receivedPokemon.pokedexId === 64
                  ? 65
                  : receivedPokemon.pokedexId === 67
                  ? 68
                  : receivedPokemon.pokedexId === 75
                  ? 76
                  : receivedPokemon.pokedexId === 93
                  ? 94
                  : null;
              if (tradeEvolutionTarget) {
                setTimeout(() => {
                  setActiveEvolution({
                    pokemon: receivedPokemon,
                    targetPokedexId: tradeEvolutionTarget,
                    method: "trade",
                  });
                  setIsEvolutionModalOpen(true);
                }, 1000);
              }
            }
          }}
        />
      )}

      {/* Indigo Plateau Exam & Revision Modal */}
      {isPlateauModalOpen && (
        <IndigoPlateauModal
          isOpen={isPlateauModalOpen}
          onClose={() => setIsPlateauModalOpen(false)}
          studentName={playerName}
          currentYear={currentYear}
          exams={exams}
          pokemonTeamCount={pokemonList.length}
          onOpenExamCalendar={() => setIsExamModalOpen(true)}
          onCompleteSimulado={(coinsReward, doubledExp, isDoubled) => {
            setCoins((c) => c + coinsReward);
            setXp((x) => x + doubledExp);
            awardExpToTeam(doubledExp, isDoubled);
          }}
        />
      )}

      {/* School Exam Calendar Modal */}
      {isExamModalOpen && (
        <ExamAlertModal
          isOpen={isExamModalOpen}
          onClose={() => setIsExamModalOpen(false)}
          year={currentYear}
          subjects={currentSubjects}
          exams={exams}
          onSaveExam={handleSaveExam}
          onDeleteExam={handleDeleteExam}
        />
      )}

      {/* Cloud & PIN Settings Modal */}
      <RpgCloudSettingsModal
        isOpen={isCloudSettingsOpen}
        onClose={() => setIsCloudSettingsOpen(false)}
        activeProfile={
          activeProfileId
            ? {
                id: activeProfileId,
                playerName: activeProfileId === "cecilia" ? "Cecília" : "Bianca",
                year: currentYear,
                pin: profilePin,
                x: playerRef.current.gridX,
                y: playerRef.current.gridY,
                direction: playerRef.current.direction,
                currentZone,
                coins,
                xp,
                inventory,
                pokemonList,
                stolenPokemonList,
                unlockedRoutes: unlockedRoutes as any,
                explorerSkills,
                gymBadges,
                customization,
                unlockedWardrobeItems,
                activeQuest,
                phoneMessages: messages,
                rivalConfig,
                updatedAt: new Date().toISOString(),
              }
            : null
        }
        onPinUpdated={(newPin) => {
          setProfilePin(newPin);
          performCloudSave(true);
        }}
        onManualSyncTrigger={async () => {
          await performCloudSave(true);
        }}
        isSyncing={cloudSyncStatus.isSaving}
      />

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h2 className="text-base font-black text-amber-400 flex items-center gap-2">
                <span>🎮</span>
                <span>Como Jogar (FireRed RPG)</span>
              </h2>
              <button
                onClick={() => setShowHelp(false)}
                className="text-slate-400 hover:text-white text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div>
                <p className="font-black text-slate-100 flex items-center gap-1.5 mb-1">
                  <span>🐾</span> Captura & Cuidados Pokémon:
                </p>
                <p className="text-slate-400">
                  Ande pela grama alta para encontrar Pokémon selvagens. Jogue <strong>Pokébolas 🔴</strong> compradas no Market para capturá-los sem causar dano. Cuide deles na sua <strong>Bolsa 🎒</strong> usando Poções 🧪 e Antídotos 💊!
                </p>
              </div>

              <div>
                <p className="font-black text-slate-100 flex items-center gap-1.5 mb-1">
                  <span>🚀</span> Risco de Roubo da Equipe Rocket:
                </p>
                <p className="text-slate-400">
                  Ao duelar na Batalha do Saber, se você errar a pergunta escolar, a Equipe Rocket <strong>rouba um dos seus Pokémon</strong>! Para resgatá-lo, vá ao <strong>Esconderijo Rocket</strong> e acerte o Desafio em Dobro!
                </p>
              </div>

              <div>
                <p className="font-black text-slate-100 flex items-center gap-1.5 mb-1">
                  <span>📱</span> PokéCelular & Ordens dos Pais:
                </p>
                <p className="text-slate-400">
                  Papai Carlos e Mamãe Renata mandam recados. Se o pai der uma ordem de estudo, outras rotas ficam bloqueadas até concluir o dever!
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowHelp(false)}
              className="mt-5 w-full py-2.5 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-black rounded-xl transition text-xs shadow-lg"
            >
              Entendido, Vamos Jogar!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
