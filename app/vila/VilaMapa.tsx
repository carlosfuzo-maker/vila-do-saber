"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  StudentYear,
  SubjectBuilding,
  ExamAlert,
  StudentProfile,
  PuzzleEnigma,
  AvatarCustomization,
  ShopItem,
  PhoneMessage,
  ActiveStoryQuest,
  RocketBattleState,
} from "./types";
import {
  STUDENT_PROFILES,
  SUBJECTS_YEAR_2,
  SUBJECTS_YEAR_4,
  INITIAL_EXAMS,
  PUZZLE_ENIGMAS,
  SHOP_ITEMS,
} from "./data";
import { TopNavBar } from "./components/TopNavBar";
import { ExamBanner } from "./components/ExamBanner";
import { VillageInteractiveMap } from "./components/VillageInteractiveMap";
import { BuildingCard } from "./components/BuildingCard";
import { ExamAlertModal } from "./components/ExamAlertModal";
import { ChapterSelectorModal } from "./components/ChapterSelectorModal";
import { MissionModal } from "./components/MissionModal";
import { LibraryWriterModal } from "./components/LibraryWriterModal";
import { ResetProgressModal } from "./components/ResetProgressModal";
import { TempleOfEnigmasModal } from "./components/TempleOfEnigmasModal";
import { AvatarCustomizerModal } from "./components/AvatarCustomizerModal";
import { VillageShopModal } from "./components/VillageShopModal";
import { BuildingInteriorView } from "./components/BuildingInteriorView";
import { ChapterFinalExamModal } from "./components/ChapterFinalExamModal";
import { SaberPhoneModal } from "./pokemonEngine/SaberPhoneModal";
import { RegionWorldMap, RegionCity } from "./pokemonEngine/RegionWorldMap";
import { KnowledgeBattleModal } from "./pokemonEngine/KnowledgeBattleModal";
import confetti from "canvas-confetti";
import {
  MapPin,
  LayoutGrid,
  CalendarDays,
  Sparkles,
  BookmarkCheck,
  Compass,
  Trophy,
  Feather,
  RotateCcw,
  KeyRound,
  Lock,
  Unlock,
  ShieldCheck,
  Home,
  ShoppingBag,
  Palette,
  GraduationCap,
  Smartphone,
  Swords,
  Tablet,
} from "lucide-react";
import { playSound } from "@/lib/soundEffects";

const BUILDING_DOOR_COORDS: Record<string, { x: number; y: number }> = {
  matematica: { x: 18, y: 38 },
  portugues: { x: 48, y: 28 },
  ciencias: { x: 78, y: 35 },
  historia_geografia: { x: 28, y: 64 },
  ingles: { x: 64, y: 58 },
  te: { x: 82, y: 80 },
  artes: { x: 82, y: 80 },
  house: { x: 20, y: 84 },
  market: { x: 50, y: 85 },
  casa_amiga: { x: 14, y: 52 },
  shop: { x: 50, y: 85 },
};

export function VilaMapa() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read URL query param ?ano=2 or ?ano=4 (default to 4 for Cecília)
  const paramYear = searchParams.get("ano");
  const currentYear: StudentYear = paramYear === "2" ? 2 : 4;

  // Sound muting state
  const [isMuted, setIsMuted] = useState(false);

  // Avatar position on the village map (synced so exiting any building puts avatar at its door)
  const [mapAvatarPos, setMapAvatarPos] = useState<{ x: number; y: number }>({ x: 48, y: 65 });

  // View mode: both, map only, or cards only
  const [activeTab, setActiveTab] = useState<"both" | "map" | "cards">("both");

  // Subject data state for Year 2 and Year 4
  const [subjectsYear2, setSubjectsYear2] = useState<SubjectBuilding[]>(SUBJECTS_YEAR_2);
  const [subjectsYear4, setSubjectsYear4] = useState<SubjectBuilding[]>(SUBJECTS_YEAR_4);

  // Student Profiles state
  const [profiles, setProfiles] = useState<Record<StudentYear, StudentProfile>>(STUDENT_PROFILES);

  // Exam alerts state
  const [exams, setExams] = useState<ExamAlert[]>(INITIAL_EXAMS);

  // Modals state
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);
  const [isChapterModalOpen, setIsChapterModalOpen] = useState(false);
  const [isMissionModalOpen, setIsMissionModalOpen] = useState(false);
  const [isLibraryWriterOpen, setIsLibraryWriterOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isTempleModalOpen, setIsTempleModalOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isChapterFinalExamOpen, setIsChapterFinalExamOpen] = useState(false);
  const [finalExamSubject, setFinalExamSubject] = useState<SubjectBuilding | null>(null);

  // Active Interior View (if inside building or house)
  const [activeInterior, setActiveInterior] = useState<{
    isOpen: boolean;
    buildingId: string;
    buildingName: string;
    subject?: SubjectBuilding;
  }>({
    isOpen: false,
    buildingId: "",
    buildingName: "",
    subject: undefined,
  });

  const [modalSubjectId, setModalSubjectId] = useState<string | undefined>(undefined);
  const [activeMissionData, setActiveMissionData] = useState<{
    subject: SubjectBuilding | null;
    missionId: string | null;
  }>({ subject: null, missionId: null });

  // Pokemon Engine & SaberPhone states
  const [isSaberPhoneOpen, setIsSaberPhoneOpen] = useState(false);
  const [isRegionMapOpen, setIsRegionMapOpen] = useState(false);
  const [activeRocketBattle, setActiveRocketBattle] = useState<RocketBattleState | null>(null);
  const [isIpadMode, setIsIpadMode] = useState(true);

  // Locked route alert message
  const [routeLockNotice, setRouteLockNotice] = useState<{
    isOpen: boolean;
    targetSubjectId: string;
    targetCityName: string;
  } | null>(null);

  // Story Quest from Papai Carlos
  const [activeStoryQuest, setActiveStoryQuest] = useState<ActiveStoryQuest>({
    id: "quest_papai_1",
    sender: "papai",
    title: currentYear === 4 ? "Desafio dos Números na Metrópole" : "Palavras Encantadas na Cidadela",
    description:
      currentYear === 4
        ? "Filha Cecília, vá até a Metrópole da Matemática e resolva os desafios de multiplicação para desbloquear novos caminhos!"
        : "Filha Bianca, vá até a Cidadela do Português e descubra as novas palavrinhas mágicas da leitura!",
    targetSubjectId: currentYear === 4 ? "matematica" : "portugues",
    targetCityName: currentYear === 4 ? "Metrópole da Matemática" : "Cidadela do Português",
    rewardCoins: 45,
    rewardXp: 35,
    requiredCount: 1,
    currentCount: 0,
    isCompleted: false,
  });

  // Dynamic sister rule:
  // When Cecília (4º Ano) is playing -> Sister NPC is Bianca (2º Ano)
  // When Bianca (2º Ano) is playing -> Sister NPC is Cecília (4º Ano)
  const isPlayerCecilia = currentYear === 4 || (profiles[currentYear]?.name || "").toLowerCase().includes("cecília");
  const sisterName = isPlayerCecilia ? "Bianca" : "Cecília";

  // Messages on the SaberPhone
  const [phoneMessages, setPhoneMessages] = useState<PhoneMessage[]>([
    {
      id: "msg_papai_1",
      sender: "papai",
      senderName: "Papai Carlos",
      avatarEmoji: "👨‍👧",
      text:
        currentYear === 4
          ? "Oi Ceci! Entreguei o seu primeiro SaberPhone! Vá até a Metrópole da Matemática e complete as lições do capítulo!"
          : "Oi Bibi! Aqui é o Papai Carlos. Vá até a Cidadela do Português e complete os desafios de leitura!",
      timeAgo: "Há 10 min",
      targetSubjectId: currentYear === 4 ? "matematica" : "portugues",
      targetCityName: currentYear === 4 ? "Metrópole da Matemática" : "Cidadela do Português",
      rewardCoins: 45,
      rewardXp: 35,
      requiredToUnlockRoute: true,
    },
    {
      id: "msg_mamae_1",
      sender: "mamae",
      senderName: "Mamãe Renata",
      avatarEmoji: "👩‍👧",
      text: "Oi meu amor! Lembre-se de regar as plantinhas da varanda e arrumar sua caminha fofa na nossa casa! Te amo! ❤️",
      timeAgo: "Há 25 min",
    },
    {
      id: "msg_sister_1",
      sender: "sistema",
      senderName: `Irmã ${sisterName}`,
      avatarEmoji: isPlayerCecilia ? "🧸" : "📚",
      text:
        isPlayerCecilia
          ? "Oi Ceci! Depois que você terminar a missão do Papai Carlos, passa aqui no quartinho pra gente brincar! 🧸"
          : "Oi Bibi! Você está indo muito bem! Se precisar de ajuda com a lição, me avisa no SaberPhone! 📚",
      timeAgo: "Há 30 min",
    },
  ]);

  // Load persisted state from localStorage on client mount
  useEffect(() => {
    try {
      // 1. Load profiles with deep merge to prevent corrupted/stale localStorage state
      const savedP2 = localStorage.getItem("vila_profile_2");
      const savedP4 = localStorage.getItem("vila_profile_4");
      if (savedP2 || savedP4) {
        setProfiles((prev) => {
          let p2Parsed = {};
          let p4Parsed = {};
          try {
            if (savedP2) p2Parsed = JSON.parse(savedP2) || {};
          } catch {
            // ignore
          }
          try {
            if (savedP4) p4Parsed = JSON.parse(savedP4) || {};
          } catch {
            // ignore
          }

          const defaultP2 = STUDENT_PROFILES[2];
          const defaultP4 = STUDENT_PROFILES[4];

          const p2Avatar = { ...defaultP2.avatar, ...(prev[2].avatar || {}), ...((p2Parsed as any).avatar || {}) };
          const p4Avatar = { ...defaultP4.avatar, ...(prev[4].avatar || {}), ...((p4Parsed as any).avatar || {}) };
          if (!p2Avatar.blushStyle) p2Avatar.blushStyle = "none";
          if (!p4Avatar.blushStyle) p4Avatar.blushStyle = "none";

          // Guarantee that pets ONLY exist if explicitly purchased in the shop
          const isPetBought = (petId: string | null) => {
            if (!petId) return false;
            try {
              return localStorage.getItem(`vila_bought_pet_${petId}`) === "true";
            } catch {
              return false;
            }
          };

          const p2Pets = (((p2Parsed as any).inventory?.pets || defaultP2.inventory.pets || []) as string[]).filter(isPetBought);
          const p4Pets = (((p4Parsed as any).inventory?.pets || defaultP4.inventory.pets || []) as string[]).filter(isPetBought);
          p2Avatar.petId = isPetBought(p2Avatar.petId) ? p2Avatar.petId : null;
          p4Avatar.petId = isPetBought(p4Avatar.petId) ? p4Avatar.petId : null;

          return {
            2: {
              ...defaultP2,
              ...prev[2],
              ...p2Parsed,
              avatar: p2Avatar,
              inventory: { ...defaultP2.inventory, ...(prev[2].inventory || {}), ...((p2Parsed as any).inventory || {}), pets: p2Pets },
              completedErrands: (p2Parsed as any).completedErrands || prev[2].completedErrands || [],
              friendName: (p2Parsed as any).friendName || defaultP2.friendName || "Lívia",
              housePlacedFurniture: (p2Parsed as any).housePlacedFurniture || prev[2].housePlacedFurniture || defaultP2.housePlacedFurniture,
              buildingUpgrades: { ...defaultP2.buildingUpgrades, ...(prev[2].buildingUpgrades || {}), ...((p2Parsed as any).buildingUpgrades || {}) },
            },
            4: {
              ...defaultP4,
              ...prev[4],
              ...p4Parsed,
              avatar: p4Avatar,
              inventory: { ...defaultP4.inventory, ...(prev[4].inventory || {}), ...((p4Parsed as any).inventory || {}), pets: p4Pets },
              completedErrands: (p4Parsed as any).completedErrands || prev[4].completedErrands || [],
              friendName: (p4Parsed as any).friendName || defaultP4.friendName || "Lívia",
              housePlacedFurniture: (p4Parsed as any).housePlacedFurniture || prev[4].housePlacedFurniture || defaultP4.housePlacedFurniture,
              buildingUpgrades: { ...defaultP4.buildingUpgrades, ...(prev[4].buildingUpgrades || {}), ...((p4Parsed as any).buildingUpgrades || {}) },
            },
          };
        });
      }

      // 2. Load exams
      const savedExams = localStorage.getItem("vila_exams");
      if (savedExams) {
        setExams(JSON.parse(savedExams));
      }

      // 3. Load chapters
      const savedChap4 = localStorage.getItem("vila_chapters_year4");
      if (savedChap4) {
        const parsed = JSON.parse(savedChap4);
        setSubjectsYear4((prev) =>
          prev.map((s) => ({
            ...s,
            currentChapterId: parsed[s.id] ?? s.currentChapterId,
          }))
        );
      }

      const savedChap2 = localStorage.getItem("vila_chapters_year2");
      if (savedChap2) {
        const parsed = JSON.parse(savedChap2);
        setSubjectsYear2((prev) =>
          prev.map((s) => ({
            ...s,
            currentChapterId: parsed[s.id] ?? s.currentChapterId,
          }))
        );
      }

      // 4. Load completed missions
      const savedM2 = localStorage.getItem("vila_missions_year2");
      if (savedM2) {
        const m2Map = JSON.parse(savedM2);
        setSubjectsYear2((prev) =>
          prev.map((s) => ({
            ...s,
            missions: s.missions.map((m) => ({
              ...m,
              completed: Boolean(m2Map[m.id] ?? m.completed),
            })),
          }))
        );
      }

      const savedM4 = localStorage.getItem("vila_missions_year4");
      if (savedM4) {
        const m4Map = JSON.parse(savedM4);
        setSubjectsYear4((prev) =>
          prev.map((s) => ({
            ...s,
            missions: s.missions.map((m) => ({
              ...m,
              completed: Boolean(m4Map[m.id] ?? m.completed),
            })),
          }))
        );
      }
    } catch {
      // ignore
    }
  }, []);

  // Save exams to localStorage
  const handleSaveExam = (newExam: ExamAlert) => {
    setExams((prev) => {
      // Replace existing if same subject, or append
      const filtered = prev.filter((e) => !(e.year === newExam.year && e.subjectId === newExam.subjectId));
      const updated = [newExam, ...filtered];
      try {
        localStorage.setItem("vila_exams", JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleDeleteExam = (examId: string) => {
    setExams((prev) => {
      const updated = prev.filter((e) => e.id !== examId);
      try {
        localStorage.setItem("vila_exams", JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  // Switch Daughter & update URL param
  const handleSwitchYear = (year: StudentYear) => {
    router.push(`/vila?ano=${year}`);
  };

  // Current grade active data
  const currentSubjects = currentYear === 2 ? subjectsYear2 : subjectsYear4;
  const currentProfile = useMemo(() => {
    const defaultP = STUDENT_PROFILES[currentYear];
    const p = profiles[currentYear] || defaultP;
    return {
      ...defaultP,
      ...p,
      avatar: { ...defaultP.avatar, ...(p.avatar || {}) },
      inventory: { ...defaultP.inventory, ...(p.inventory || {}) },
      housePlacedFurniture: p.housePlacedFurniture || defaultP.housePlacedFurniture || [],
      buildingUpgrades: p.buildingUpgrades || defaultP.buildingUpgrades || {},
    };
  }, [profiles, currentYear]);

  const currentExams = useMemo(
    () => exams.filter((e) => e.year === currentYear),
    [exams, currentYear]
  );

  // Update current chapter of a subject
  const handleUpdateChapter = (subjectId: string, chapterId: number) => {
    const updateFn = (prev: SubjectBuilding[]) =>
      prev.map((s) => (s.id === subjectId ? { ...s, currentChapterId: chapterId } : s));

    if (currentYear === 2) {
      setSubjectsYear2((prev) => {
        const updated = updateFn(prev);
        try {
          const map: Record<string, number> = {};
          updated.forEach((s) => (map[s.id] = s.currentChapterId));
          localStorage.setItem("vila_chapters_year2", JSON.stringify(map));
        } catch {
          // ignore
        }
        return updated;
      });
    } else {
      setSubjectsYear4((prev) => {
        const updated = updateFn(prev);
        try {
          const map: Record<string, number> = {};
          updated.forEach((s) => (map[s.id] = s.currentChapterId));
          localStorage.setItem("vila_chapters_year4", JSON.stringify(map));
        } catch {
          // ignore
        }
        return updated;
      });
    }
  };

  // Complete mission & grant rewards
  const handleCompleteMission = (subjectId: string, missionId: string) => {
    const updateMissions = (subjectsList: SubjectBuilding[]) =>
      subjectsList.map((s) => {
        if (s.id !== subjectId) return s;
        return {
          ...s,
          missions: s.missions.map((m) =>
            m.id === missionId ? { ...m, completed: true } : m
          ),
        };
      });

    const storageKey = currentYear === 2 ? "vila_missions_year2" : "vila_missions_year4";

    if (currentYear === 2) {
      setSubjectsYear2((prev) => {
        const updated = updateMissions(prev);
        try {
          const map: Record<string, boolean> = {};
          updated.forEach((s) => s.missions.forEach((m) => { if (m.completed) map[m.id] = true; }));
          localStorage.setItem(storageKey, JSON.stringify(map));
        } catch {
          // ignore
        }
        return updated;
      });
    } else {
      setSubjectsYear4((prev) => {
        const updated = updateMissions(prev);
        try {
          const map: Record<string, boolean> = {};
          updated.forEach((s) => s.missions.forEach((m) => { if (m.completed) map[m.id] = true; }));
          localStorage.setItem(storageKey, JSON.stringify(map));
        } catch {
          // ignore
        }
        return updated;
      });
    }

    // Award XP, stars, and coins to profile & persist
    setProfiles((prev) => {
      const p = prev[currentYear];
      const newXp = p.currentXp + 50;
      const leveledUp = newXp >= p.targetXp;

      const updatedProfile: StudentProfile = {
        ...p,
        level: leveledUp ? p.level + 1 : p.level,
        currentXp: leveledUp ? newXp - p.targetXp : newXp,
        targetXp: leveledUp ? Math.round(p.targetXp * 1.25) : p.targetXp,
        stars: p.stars + 3,
        coins: p.coins + 25,
      };

      try {
        localStorage.setItem(`vila_profile_${currentYear}`, JSON.stringify(updatedProfile));
      } catch {
        // ignore
      }

      return {
        ...prev,
        [currentYear]: updatedProfile,
      };
    });
  };

  // Reward student from Author Workshop
  const handleRewardFromAuthor = (xp: number, stars: number, coins: number) => {
    setProfiles((prev) => {
      const p = prev[currentYear];
      const newXp = p.currentXp + xp;
      const leveledUp = newXp >= p.targetXp;

      const updatedProfile: StudentProfile = {
        ...p,
        level: leveledUp ? p.level + 1 : p.level,
        currentXp: leveledUp ? newXp - p.targetXp : newXp,
        targetXp: leveledUp ? Math.round(p.targetXp * 1.25) : p.targetXp,
        stars: p.stars + stars,
        coins: p.coins + coins,
      };

      try {
        localStorage.setItem(`vila_profile_${currentYear}`, JSON.stringify(updatedProfile));
      } catch {
        // ignore
      }

      return {
        ...prev,
        [currentYear]: updatedProfile,
      };
    });
  };

  // Solve Enigma in Temple of Enigmas
  const handleSolveEnigma = (enigma: PuzzleEnigma) => {
    const nextChapter = enigma.unlocksChapter;
    setProfiles((prev) => {
      const p = prev[currentYear];
      const newXp = p.currentXp + enigma.rewardXp;
      const leveledUp = newXp >= p.targetXp;

      const updatedProfile: StudentProfile = {
        ...p,
        level: leveledUp ? p.level + 1 : p.level,
        currentXp: leveledUp ? newXp - p.targetXp : newXp,
        targetXp: leveledUp ? Math.round(p.targetXp * 1.25) : p.targetXp,
        stars: p.stars + enigma.rewardStars,
        coins: p.coins + enigma.rewardCoins,
        unlockedChapter: Math.max(p.unlockedChapter || 1, nextChapter),
        unlockedChapters: Array.from(new Set([...(p.unlockedChapters || [1]), nextChapter])),
        relicPieces: (p.relicPieces || 0) + 1,
        puzzleSolvedCount: (p.puzzleSolvedCount || 0) + 1,
      };

      try {
        localStorage.setItem(`vila_profile_${currentYear}`, JSON.stringify(updatedProfile));
      } catch {
        // ignore
      }

      return {
        ...prev,
        [currentYear]: updatedProfile,
      };
    });
  };

  // Export full JSON backup
  const handleExportBackup = () => {
    try {
      const backupData = {
        version: "1.0",
        exportedAt: new Date().toISOString(),
        studentYear: currentYear,
        profiles,
        exams,
        chaptersYear2: localStorage.getItem("vila_chapters_year2"),
        chaptersYear4: localStorage.getItem("vila_chapters_year4"),
        missionsYear2: localStorage.getItem("vila_missions_year2"),
        missionsYear4: localStorage.getItem("vila_missions_year4"),
        books: localStorage.getItem("vila_estante_livros"),
      };

      const blob = new Blob([JSON.stringify(backupData, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `backup_vila_do_saber_${currentProfile.name.toLowerCase()}_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      // ignore
    }
  };

  // Import JSON backup
  const handleImportBackup = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.profiles) {
        setProfiles(parsed.profiles);
        localStorage.setItem("vila_profile_2", JSON.stringify(parsed.profiles[2]));
        localStorage.setItem("vila_profile_4", JSON.stringify(parsed.profiles[4]));
      }
      if (parsed.exams) {
        setExams(parsed.exams);
        localStorage.setItem("vila_exams", JSON.stringify(parsed.exams));
      }
      if (parsed.chaptersYear2) localStorage.setItem("vila_chapters_year2", parsed.chaptersYear2);
      if (parsed.chaptersYear4) localStorage.setItem("vila_chapters_year4", parsed.chaptersYear4);
      if (parsed.missionsYear2) localStorage.setItem("vila_missions_year2", parsed.missionsYear2);
      if (parsed.missionsYear4) localStorage.setItem("vila_missions_year4", parsed.missionsYear4);
      if (parsed.books) localStorage.setItem("vila_estante_livros", parsed.books);
      return true;
    } catch {
      return false;
    }
  };

  const portugueseSubject =
    currentSubjects.find((s) => s.id === "portugues") || currentSubjects[0];

  // Open exam modal for a subject
  const openExamModalForSubject = (subjectId?: string) => {
    setModalSubjectId(subjectId);
    setIsExamModalOpen(true);
  };

  // Open chapter modal for a subject
  const openChapterModalForSubject = (subjectId?: string) => {
    setModalSubjectId(subjectId);
    setIsChapterModalOpen(true);
  };

  // Open mission modal
  const openMissionModal = (subject: SubjectBuilding, missionId: string) => {
    setActiveMissionData({ subject, missionId });
    setIsMissionModalOpen(true);
  };

  // Reset daily missions progress so the child can practice again
  const handleResetDailyMissions = () => {
    const storageKey = currentYear === 2 ? "vila_missions_year2" : "vila_missions_year4";
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // ignore
    }

    if (currentYear === 2) {
      setSubjectsYear2((prev) =>
        prev.map((s) => ({
          ...s,
          missions: s.missions.map((m) => ({ ...m, completed: false })),
        }))
      );
    } else {
      setSubjectsYear4((prev) =>
        prev.map((s) => ({
          ...s,
          missions: s.missions.map((m) => ({ ...m, completed: false })),
        }))
      );
    }
  };

  const handleResetAllData = () => {
    handleResetDailyMissions();
    const resetProfile = STUDENT_PROFILES[currentYear];
    try {
      localStorage.setItem(`vila_profile_${currentYear}`, JSON.stringify(resetProfile));
    } catch {
      // ignore
    }
    setProfiles((prev) => ({
      ...prev,
      [currentYear]: {
        ...resetProfile,
      },
    }));
  };

  // Avatar customization save
  const handleSaveCustomization = (newCustomization: AvatarCustomization) => {
    setProfiles((prev) => {
      const updatedProfile = {
        ...prev[currentYear],
        avatar: newCustomization,
      };
      try {
        localStorage.setItem(`vila_profile_${currentYear}`, JSON.stringify(updatedProfile));
      } catch {
        // ignore
      }
      return {
        ...prev,
        [currentYear]: updatedProfile,
      };
    });
  };

  // Village Shop Purchase
  const handleBuyShopItem = (item: ShopItem) => {
    setProfiles((prev) => {
      const p = prev[currentYear];
      if (p.coins < item.price) return prev;

      const currentInv = p.inventory || {
        outfits: ["starter"],
        furniture: ["bed-basic", "desk-study"],
        pets: [],
        accessories: ["acc-none"],
      };

      const categoryKey =
        item.category === "outfit"
          ? "outfits"
          : item.category === "furniture"
          ? "furniture"
          : item.category === "pet"
          ? "pets"
          : "accessories";

      if (currentInv[categoryKey]?.includes(item.id)) return prev;

      const updatedCoins = p.coins - item.price;
      const updatedInv = {
        ...currentInv,
        [categoryKey]: [...(currentInv[categoryKey] || []), item.id],
      };

      let updatedPlaced = p.housePlacedFurniture || [];
      const updatedAvatar = { ...p.avatar };

      // If furniture, automatically add to placed in house
      if (item.category === "furniture" && !updatedPlaced.some((f) => f.itemId === item.id)) {
        const offset = (updatedPlaced.length % 4) * 15;
        updatedPlaced = [...updatedPlaced, { itemId: item.id, x: 25 + offset, y: 65 }];
      }

      // If outfit, can equip directly
      if (item.category === "outfit") {
        updatedAvatar.outfitId = item.id;
      }

      // If pet, equip as companion and mark as bought
      if (item.category === "pet") {
        updatedAvatar.petId = item.id;
        try {
          localStorage.setItem(`vila_bought_pet_${item.id}`, "true");
        } catch {
          // ignore
        }
      }

      // If accessory, equip
      if (item.category === "accessory") {
        updatedAvatar.accessoryId = item.id;
      }

      const updatedProfile: StudentProfile = {
        ...p,
        coins: updatedCoins,
        inventory: updatedInv,
        housePlacedFurniture: updatedPlaced,
        avatar: updatedAvatar,
      };

      try {
        localStorage.setItem(`vila_profile_${currentYear}`, JSON.stringify(updatedProfile));
      } catch {
        // ignore
      }

      return {
        ...prev,
        [currentYear]: updatedProfile,
      };
    });
  };

  // Equip Item from Inventory / Wardrobe
  const handleEquipItem = (item: ShopItem) => {
    setProfiles((prev) => {
      const p = prev[currentYear];
      const updatedAvatar = { ...p.avatar };
      let updatedPlaced = p.housePlacedFurniture || [];

      if (item.category === "outfit") {
        updatedAvatar.outfitId = item.id;
      } else if (item.category === "pet") {
        updatedAvatar.petId = item.id;
      } else if (item.category === "accessory") {
        updatedAvatar.accessoryId = item.id;
      } else if (item.category === "furniture") {
        if (!updatedPlaced.some((f) => f.itemId === item.id)) {
          const offset = (updatedPlaced.length % 4) * 15;
          updatedPlaced = [...updatedPlaced, { itemId: item.id, x: 25 + offset, y: 65 }];
        }
      }

      const updatedProfile: StudentProfile = {
        ...p,
        avatar: updatedAvatar,
        housePlacedFurniture: updatedPlaced,
      };

      try {
        localStorage.setItem(`vila_profile_${currentYear}`, JSON.stringify(updatedProfile));
      } catch {
        // ignore
      }

      return {
        ...prev,
        [currentYear]: updatedProfile,
      };
    });
  };

  // Pass Chapter Final Exam & trigger World Upgrade
  const handlePassChapterExam = (subjectId: string, nextChapterId: number) => {
    // 1. Advance subject chapter
    handleUpdateChapter(subjectId, nextChapterId);

    // 2. Increase building upgrade level and award rewards
    setProfiles((prev) => {
      const p = prev[currentYear];
      const currentUpgrades = p.buildingUpgrades || {};
      const newBuildingLevel = (currentUpgrades[subjectId] || 1) + 1;

      const newXp = p.currentXp + 100;
      const leveledUp = newXp >= p.targetXp;

      const updatedProfile: StudentProfile = {
        ...p,
        level: leveledUp ? p.level + 1 : p.level,
        currentXp: leveledUp ? newXp - p.targetXp : newXp,
        targetXp: leveledUp ? Math.round(p.targetXp * 1.25) : p.targetXp,
        stars: p.stars + 5,
        coins: p.coins + 50,
        buildingUpgrades: {
          ...currentUpgrades,
          [subjectId]: newBuildingLevel,
        },
        unlockedChapter: Math.max(p.unlockedChapter || 1, nextChapterId),
        unlockedChapters: Array.from(new Set([...(p.unlockedChapters || [1]), nextChapterId])),
      };

      try {
        localStorage.setItem(`vila_profile_${currentYear}`, JSON.stringify(updatedProfile));
      } catch {
        // ignore
      }

      return {
        ...prev,
        [currentYear]: updatedProfile,
      };
    });
  };

  // Interior view navigation handlers
  const handleEnterBuildingInterior = (
    buildingId: string,
    buildingName: string,
    subject?: SubjectBuilding
  ) => {
    // Check if Papai Carlos has an active mission and player is trying to enter another subject building
    if (
      activeStoryQuest &&
      !activeStoryQuest.isCompleted &&
      subject &&
      buildingId !== "house" &&
      buildingId !== "market" &&
      buildingId !== "casa_amiga" &&
      buildingId !== activeStoryQuest.targetSubjectId
    ) {
      playSound("pop");
      setRouteLockNotice({
        isOpen: true,
        targetSubjectId: activeStoryQuest.targetSubjectId,
        targetCityName: activeStoryQuest.targetCityName,
      });
      return;
    }

    playSound("open");
    setActiveInterior({
      isOpen: true,
      buildingId,
      buildingName,
      subject,
    });
  };

  const handleOpenHouse = () => {
    playSound("open");
    setActiveInterior({
      isOpen: true,
      buildingId: "house",
      buildingName: `Casinha da ${currentProfile.name}`,
      subject: undefined,
    });
  };

  const handleExitInterior = () => {
    playSound("pop");
    const exitedId = activeInterior.buildingId;
    if (exitedId && BUILDING_DOOR_COORDS[exitedId]) {
      setMapAvatarPos(BUILDING_DOOR_COORDS[exitedId]);
    }
    setActiveInterior({
      isOpen: false,
      buildingId: "",
      buildingName: "",
      subject: undefined,
    });
  };

  // Direct Reward handler for interactive mini-games in buildings
  const handleDirectReward = (coins: number, xp: number) => {
    playSound("fanfare");
    setProfiles((prev) => {
      const p = prev[currentYear];
      const newXp = p.currentXp + xp;
      const leveledUp = newXp >= p.targetXp;

      const updatedProfile: StudentProfile = {
        ...p,
        coins: p.coins + coins,
        stars: p.stars + 2,
        currentXp: leveledUp ? newXp - p.targetXp : newXp,
        level: leveledUp ? p.level + 1 : p.level,
        targetXp: leveledUp ? Math.round(p.targetXp * 1.25) : p.targetXp,
      };

      try {
        localStorage.setItem(`vila_profile_${currentYear}`, JSON.stringify(updatedProfile));
      } catch {
        // ignore
      }

      return {
        ...prev,
        [currentYear]: updatedProfile,
      };
    });
  };

  // Update Friend Name in the Friend's House
  const handleUpdateFriendName = (newName: string) => {
    const trimmed = newName.trim();
    if (!trimmed) return;
    setProfiles((prev) => {
      const p = prev[currentYear];
      const updatedProfile: StudentProfile = {
        ...p,
        friendName: trimmed,
      };
      try {
        localStorage.setItem(`vila_profile_${currentYear}`, JSON.stringify(updatedProfile));
      } catch {
        // ignore
      }
      return {
        ...prev,
        [currentYear]: updatedProfile,
      };
    });
  };

  const handleOpenTaskFromInterior = (taskId: string, isFinalExam?: boolean) => {
    if (isFinalExam) {
      if (activeInterior.subject) {
        setFinalExamSubject(activeInterior.subject);
        setIsChapterFinalExamOpen(true);
      }
      return;
    }

    if (taskId === "writer_workshop") {
      setIsLibraryWriterOpen(true);
      return;
    }

    if (activeInterior.subject) {
      openMissionModal(activeInterior.subject, taskId);
    }
  };

  // Errand completion handler with celebration and coin rewards
  const handleCompleteErrand = (errandId: string, rewardCoins: number, rewardXp: number) => {
    playSound("fanfare");
    setProfiles((prev) => {
      const p = prev[currentYear];
      const prevCompleted = p.completedErrands || [];
      if (prevCompleted.includes(errandId)) return prev;

      const newXp = p.currentXp + rewardXp;
      const leveledUp = newXp >= p.targetXp;

      const updatedProfile: StudentProfile = {
        ...p,
        coins: p.coins + rewardCoins,
        stars: p.stars + 2,
        currentXp: leveledUp ? newXp - p.targetXp : newXp,
        level: leveledUp ? p.level + 1 : p.level,
        targetXp: leveledUp ? Math.round(p.targetXp * 1.25) : p.targetXp,
        completedErrands: [...prevCompleted, errandId],
      };

      try {
        localStorage.setItem(`vila_profile_${currentYear}`, JSON.stringify(updatedProfile));
      } catch {
        // ignore
      }

      return {
        ...prev,
        [currentYear]: updatedProfile,
      };
    });
  };

  // Check if all 6 subjects completed their missions
  const allSubjectsCompletedCurrentCycle = useMemo(() => {
    return (
      currentSubjects.length > 0 &&
      currentSubjects.every((s) => s.missions.every((m) => m.completed))
    );
  }, [currentSubjects]);

  // Current active enigma for this year and chapter progression
  const currentEnigmas = PUZZLE_ENIGMAS[currentYear] || [];
  const activeEnigma =
    currentEnigmas.find(
      (e) => e.unlocksChapter === (currentProfile.unlockedChapter || 1) + 1
    ) || currentEnigmas[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 via-sky-100 to-amber-50 flex flex-col selection:bg-pink-300">
      {/* Top Avatar World Status Navigation */}
      <TopNavBar
        currentProfile={currentProfile}
        currentYear={currentYear}
        onSwitchYear={handleSwitchYear}
        exams={exams}
        onOpenExamModal={() => openExamModalForSubject()}
        onOpenChapterModal={() => openChapterModalForSubject()}
        onOpenResetModal={() => setIsResetModalOpen(true)}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onOpenShop={() => setIsShopOpen(true)}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(!isMuted)}
      />

      {/* Exam Alert Banner if any exam is scheduled */}
      <ExamBanner
        exams={currentExams}
        onOpenExamDetails={(subjId) => openExamModalForSubject(subjId)}
      />

      {/* Main Village Content Area (iPad Tablet Styling) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-2 sm:px-6 py-4 sm:py-6">
        <div
          className={
            isIpadMode
              ? "relative bg-slate-900 p-2 sm:p-5 rounded-[32px] sm:rounded-[48px] shadow-2xl border-4 border-slate-700 ring-8 ring-slate-950/20 flex flex-col transition-all duration-300"
              : "flex flex-col space-y-6"
          }
        >
          {/* Top iPad Camera dot */}
          {isIpadMode && (
            <div className="absolute top-2 sm:top-3 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-slate-950 rounded-full border border-slate-800 flex items-center justify-center z-30 pointer-events-none">
              <div className="w-1.5 h-1.5 bg-slate-800 rounded-full" />
            </div>
          )}

          {/* iPad Inner Retina Display Area */}
          <div
            className={
              isIpadMode
                ? "bg-gradient-to-b from-sky-200 via-sky-100 to-amber-50 rounded-[22px] sm:rounded-[36px] overflow-hidden border border-slate-300 shadow-inner flex flex-col p-3 sm:p-6 space-y-6"
                : "contents"
            }
          >
            {/* iPadOS Status Bar */}
            {isIpadMode && (
              <div className="bg-white/85 backdrop-blur-md px-4 sm:px-6 py-1.5 sm:py-2 rounded-2xl border border-sky-200/80 flex items-center justify-between text-xs font-black text-slate-700 select-none shadow-sm">
                <div className="flex items-center gap-2">
                  <span>9:41</span>
                  <span className="text-[10px] text-sky-700 bg-sky-100 px-2.5 py-0.5 rounded-full font-extrabold flex items-center gap-1">
                    <span>iPad Pro</span>
                    <span className="text-slate-400">•</span>
                    <span>SaberOS</span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold">Wi-Fi 📶</span>
                  <span className="text-emerald-600 font-extrabold">100% 🔋</span>
                </div>
              </div>
            )}
        {activeInterior.isOpen ? (
          <BuildingInteriorView
            buildingId={activeInterior.buildingId}
            buildingName={activeInterior.buildingName}
            subject={activeInterior.subject}
            currentProfile={currentProfile}
            year={currentYear}
            friendName={currentProfile.friendName || "Lívia"}
            onExit={handleExitInterior}
            onOpenTask={handleOpenTaskFromInterior}
            onOpenWardrobe={() => setIsCustomizerOpen(true)}
            onOpenShop={() => setIsShopOpen(true)}
            onOpenSaberPhone={() => setIsSaberPhoneOpen(true)}
            onCompleteErrand={handleCompleteErrand}
            onReward={handleDirectReward}
            onUpdateFriendName={handleUpdateFriendName}
            onNavigateToBuilding={(bId, bName) => handleEnterBuildingInterior(bId, bName)}
          />
        ) : (
          <>
            {/* Welcome & Motivational Quote */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/80 backdrop-blur-md p-4 sm:p-5 rounded-3xl border-3 border-sky-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-400 text-white flex items-center justify-center shrink-0 shadow-md">
                  <Compass className="w-6 h-6 animate-spin-slow" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-800">
                      Mapa da Vila • {currentProfile.gradeLabel}
                    </h2>
                    <span className="text-xs bg-amber-100 text-amber-900 font-extrabold px-2.5 py-0.5 rounded-full border border-amber-300">
                      Modo {currentProfile.name}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium italic mt-0.5">
                    &ldquo;{currentProfile.quote}&rdquo;
                  </p>
                </div>
              </div>

              {/* Quick Filter / Action Bar */}
              <div className="flex flex-wrap items-center gap-2 self-start md:self-center">
                {/* Minha Casinha */}
                <button
                  onClick={handleOpenHouse}
                  className="btn-game px-3.5 py-2 rounded-2xl text-xs font-black flex items-center gap-1.5 transition-all bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/25 cursor-pointer"
                  title="Entrar na Minha Casinha"
                >
                  <Home className="w-4 h-4 text-emerald-100" />
                  <span>Minha Casinha</span>
                </button>

                {/* SaberPhone Button */}
                <button
                  type="button"
                  onClick={() => {
                    playSound("open");
                    setIsSaberPhoneOpen(true);
                  }}
                  className={`btn-game relative px-3.5 py-2 rounded-2xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeStoryQuest && !activeStoryQuest.isCompleted
                      ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md shadow-indigo-500/30 animate-pulse"
                      : "bg-sky-100 hover:bg-sky-200 text-sky-900 border border-sky-300"
                  }`}
                  title="Abrir SaberPhone da Família"
                >
                  <Smartphone className="w-4 h-4 text-sky-200" />
                  <span>SaberPhone 📱</span>
                  {activeStoryQuest && !activeStoryQuest.isCompleted && (
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-white animate-ping" />
                  )}
                </button>

                {/* Mapa Regional (Kanto) */}
                <button
                  type="button"
                  onClick={() => {
                    playSound("open");
                    setIsRegionMapOpen(true);
                  }}
                  className="btn-game px-3.5 py-2 rounded-2xl text-xs font-black flex items-center gap-1.5 transition-all bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md shadow-emerald-600/25 cursor-pointer"
                  title="Abrir Mapa Regional das Matérias (Estilo Pokémon Kanto)"
                >
                  <Compass className="w-4 h-4 text-emerald-200" />
                  <span>Mapa Regional 🗺️</span>
                </button>

                {/* Vila Market */}
                <button
                  type="button"
                  onClick={() => handleEnterBuildingInterior("market", "Vila Market (Poké Mart)")}
                  className="btn-game px-3.5 py-2 rounded-2xl text-xs font-black flex items-center gap-1.5 transition-all bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/25 cursor-pointer"
                  title="Entrar no Vila Market"
                >
                  <ShoppingBag className="w-4 h-4 text-emerald-200" />
                  <span>Vila Market 🏪</span>
                </button>

                {/* Casa da Amiga */}
                <button
                  onClick={() => handleEnterBuildingInterior("casa_amiga", `Casa da Amiga ${currentProfile.friendName || "Lívia"}`)}
                  className="btn-game px-3 py-2 rounded-2xl text-xs font-black flex items-center gap-1.5 transition-all bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-600/25 cursor-pointer"
                  title={`Casa da Amiga ${currentProfile.friendName || "Lívia"}`}
                >
                  <span>👭 Amiga {currentProfile.friendName || "Lívia"}</span>
                </button>

                {/* Loja da Vila */}
                <button
                  onClick={() => {
                    playSound("open");
                    setIsShopOpen(true);
                  }}
                  className="btn-game px-3.5 py-2 rounded-2xl text-xs font-black flex items-center gap-1.5 transition-all bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/25 cursor-pointer"
                  title="Abrir Loja da Vila"
                >
                  <ShoppingBag className="w-4 h-4 text-amber-100" />
                  <span>Loja da Vila</span>
                </button>

                {/* Personalizar Avatar */}
                <button
                  onClick={() => {
                    playSound("open");
                    setIsCustomizerOpen(true);
                  }}
                  className="btn-game px-3.5 py-2 rounded-2xl text-xs font-black flex items-center gap-1.5 transition-all bg-pink-500 hover:bg-pink-600 text-white shadow-md shadow-pink-500/25 cursor-pointer"
                  title="Personalizar Personagem"
                >
                  <Palette className="w-4 h-4 text-pink-100" />
                  <span>Meu Visual</span>
                </button>

                <div className="h-6 w-[2px] bg-slate-300 mx-1 hidden sm:block" />

                <button
                  onClick={() => {
                    playSound("click");
                    setActiveTab(activeTab === "map" ? "both" : "map");
                  }}
                  className={`btn-game px-3.5 py-2 rounded-2xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === "map" || activeTab === "both"
                      ? "bg-sky-600 text-white shadow-md shadow-sky-600/30"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span>Mapa Visual</span>
                </button>

                <button
                  onClick={() => {
                    playSound("click");
                    setActiveTab(activeTab === "cards" ? "both" : "cards");
                  }}
                  className={`btn-game px-3.5 py-2 rounded-2xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === "cards" || activeTab === "both"
                      ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                  <span>Edifícios ({currentSubjects.length})</span>
                </button>

                {/* Quick Author Workshop Button */}
                <button
                  onClick={() => {
                    playSound("open");
                    setIsLibraryWriterOpen(true);
                  }}
                  className="btn-game px-3.5 py-2 rounded-2xl text-xs font-black flex items-center gap-1.5 transition-all bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white shadow-md shadow-rose-500/25 cursor-pointer animate-pulse-glow"
                  title="Abrir Oficina do Jovem Autor na Biblioteca"
                >
                  <Feather className="w-4 h-4 text-yellow-200" />
                  <span className="hidden sm:inline">Oficina do Autor</span>
                  <span className="sm:hidden">Autor</span>
                </button>

                {/* Quick Temple of Enigmas Button */}
                <button
                  onClick={() => {
                    playSound("open");
                    setIsTempleModalOpen(true);
                  }}
                  className={`btn-game px-3.5 py-2 rounded-2xl text-xs font-black flex items-center gap-1.5 transition-all shadow-md cursor-pointer ${
                    allSubjectsCompletedCurrentCycle
                      ? "bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-amber-950 animate-bounce border-2 border-yellow-300 shadow-amber-500/40"
                      : "bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300"
                  }`}
                  title="Abrir Templo dos Enigmas"
                >
                  <KeyRound className="w-4 h-4 text-amber-700" />
                  <span className="hidden sm:inline">Templo dos Enigmas</span>
                  <span className="sm:hidden">Enigmas</span>
                  {allSubjectsCompletedCurrentCycle && (
                    <Sparkles className="w-3.5 h-3.5 text-amber-900 animate-spin" />
                  )}
                </button>

                {/* iPad Mode Frame Toggle */}
                <button
                  type="button"
                  onClick={() => {
                    playSound("click");
                    setIsIpadMode(!isIpadMode);
                  }}
                  className={`btn-game px-3.5 py-2 rounded-2xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                    isIpadMode
                      ? "bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-sky-300 shadow-md border-2 border-sky-400"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                  }`}
                  title="Ativar/Desativar Moldura de Tablet iPad"
                >
                  <Tablet className="w-4 h-4 text-sky-400" />
                  <span>Modo iPad {isIpadMode ? "✨" : ""}</span>
                </button>
              </div>
            </div>

            {/* Temple of Enigmas Challenge Banner */}
            {activeEnigma && (
              <div
                className={`p-4 sm:p-5 rounded-3xl border-3 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                  allSubjectsCompletedCurrentCycle
                    ? "bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 border-amber-500 text-amber-950 ring-4 ring-yellow-400/50"
                    : "bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 border-amber-400/50 text-white"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${
                      allSubjectsCompletedCurrentCycle
                        ? "bg-amber-900 text-yellow-300"
                        : "bg-amber-500/20 text-amber-300 border border-amber-400/40"
                    }`}
                  >
                    <KeyRound className="w-6 h-6 animate-bounce" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                          allSubjectsCompletedCurrentCycle
                            ? "bg-amber-900 text-amber-100"
                            : "bg-amber-500/30 text-amber-300"
                        }`}
                      >
                        {allSubjectsCompletedCurrentCycle ? "✨ Portão do Próximo Capítulo Pronto!" : "Templo dos Enigmas"}
                      </span>
                      <span className="text-xs font-bold opacity-80">
                        Capítulo Atual: {currentProfile.unlockedChapter || 1} Liberado
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-black leading-tight mt-1">
                      {activeEnigma.title}
                    </h3>
                    <p className="text-xs opacity-90 font-medium mt-0.5">
                      {allSubjectsCompletedCurrentCycle
                        ? "Parabéns! Todas as 6 matérias foram completadas! Abra o cofre secreto para destravar o próximo capítulo!"
                        : "Complete as matérias ou decifre o código de 3 dígitos do cofre para avançar na história da Vila!"}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    playSound("open");
                    setIsTempleModalOpen(true);
                  }}
                  className={`btn-game px-5 py-3 rounded-2xl font-black text-xs sm:text-sm shadow-md shrink-0 flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95 ${
                    allSubjectsCompletedCurrentCycle
                      ? "bg-slate-950 hover:bg-slate-900 text-yellow-300 border-2 border-yellow-300"
                      : "bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white"
                  }`}
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Entrar no Templo dos Enigmas</span>
                </button>
              </div>
            )}

            {/* 1. Interactive Panoramic Village Map View */}
            {(activeTab === "both" || activeTab === "map") && (
              <section className="space-y-2">
                <div className="flex items-center justify-between px-2">
                  <h3 className="text-sm font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-sky-600" />
                    <span>Exploração Geográfica da Vila do Saber</span>
                  </h3>
                  <span className="text-xs font-bold text-slate-500">
                    Tablet Responsive • Toque para andar e entrar nos locais
                  </span>
                </div>

                <VillageInteractiveMap
                  subjects={currentSubjects}
                  exams={currentExams}
                  currentProfile={currentProfile}
                  initialPosition={mapAvatarPos}
                  onAvatarMoved={setMapAvatarPos}
                  onSelectBuilding={(subj) => handleEnterBuildingInterior(subj.id, subj.name, subj)}
                  onOpenExamModal={(subjId) => openExamModalForSubject(subjId)}
                  onOpenChapterModal={(subjId) => openChapterModalForSubject(subjId)}
                  onOpenLibraryWriter={() => setIsLibraryWriterOpen(true)}
                  onEnterBuildingInterior={handleEnterBuildingInterior}
                  onOpenHouse={handleOpenHouse}
                  onOpenShop={() => setIsShopOpen(true)}
                  onOpenCustomizer={() => setIsCustomizerOpen(true)}
                />
              </section>
            )}

            {/* 2. Responsive Subject Buildings Grid (Cards Layout for Studying & Tablets) */}
            {(activeTab === "both" || activeTab === "cards") && (
              <section className="space-y-4 pt-2">
                <div className="flex items-center justify-between px-2">
                  <div>
                    <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                      <LayoutGrid className="w-5 h-5 text-indigo-600" />
                      <span>Edifícios de Matérias da {currentProfile.name}</span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      {currentYear === 4
                        ? "Matemática, Português/Biblioteca, Ciências, História/Geografia, Inglês e T.E."
                        : "Matemática, Alfabetização/Biblioteca, Ciências, História/Geografia, Inglês e Artes"}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openChapterModalForSubject()}
                      className="btn-game hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-sky-100 hover:bg-sky-200 text-sky-800 text-xs font-black rounded-xl border border-sky-300 cursor-pointer"
                    >
                      <BookmarkCheck className="w-3.5 h-3.5" />
                      <span>Gerenciar Capítulos</span>
                    </button>

                    <button
                      onClick={() => openExamModalForSubject()}
                      className="btn-game flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-black rounded-xl border border-amber-300 cursor-pointer"
                    >
                      <CalendarDays className="w-3.5 h-3.5" />
                      <span>Aviso de Prova</span>
                    </button>
                  </div>
                </div>

                {/* Grid of Buildings */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  {currentSubjects.map((subject) => {
                    const exam = currentExams.find((e) => e.subjectId === subject.id);

                    return (
                      <BuildingCard
                        key={subject.id}
                        subject={subject}
                        exam={exam}
                        onOpenExamModal={(sId) => openExamModalForSubject(sId)}
                        onOpenChapterModal={(sId) => openChapterModalForSubject(sId)}
                        onSelectMission={(s, mId) => openMissionModal(s, mId)}
                        onOpenLibraryWriter={() => setIsLibraryWriterOpen(true)}
                        onEnterInterior={(s) => handleEnterBuildingInterior(s.id, s.name, s)}
                      />
                    );
                  })}
                </div>
              </section>
            )}
          </>
        )}

        {/* Bottom iPad Home Indicator */}
            {isIpadMode && (
              <div className="pt-4 pb-1 flex justify-center select-none pointer-events-none">
                <div className="w-36 h-1.5 bg-slate-400/80 hover:bg-slate-500 rounded-full shadow-sm" />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 bg-white/70 backdrop-blur-md border-t-2 border-sky-200 py-6 text-center text-xs text-slate-500 space-y-1">
        <p className="font-extrabold text-slate-700 flex items-center justify-center gap-1.5">
          <span>Vila do Saber</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Feito com carinho para Bianca (2º Ano) e Cecília (4º Ano)</span>
        </p>
        <p className="text-[11px] text-slate-400">
          Estilo Avatar World • Gamificação Educacional Adaptativa para Tablets e Celulares
        </p>

        {/* Discrete Reset / Settings trigger */}
        <div className="pt-1">
          <button
            onClick={() => {
              playSound("click");
              setIsResetModalOpen(true);
            }}
            className="text-[11px] text-slate-400 hover:text-slate-600 underline cursor-pointer inline-flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Configurações / Reiniciar Treino do Dia ({currentProfile.name})</span>
          </button>
        </div>
      </footer>

      {/* Modals */}
      <ExamAlertModal
        isOpen={isExamModalOpen}
        onClose={() => setIsExamModalOpen(false)}
        year={currentYear}
        subjects={currentSubjects}
        initialSubjectId={modalSubjectId}
        exams={exams}
        onSaveExam={handleSaveExam}
        onDeleteExam={handleDeleteExam}
      />

      <ChapterSelectorModal
        isOpen={isChapterModalOpen}
        onClose={() => setIsChapterModalOpen(false)}
        year={currentYear}
        subjects={currentSubjects}
        initialSubjectId={modalSubjectId}
        unlockedChapter={currentProfile.unlockedChapter || 1}
        onUpdateChapter={handleUpdateChapter}
        onOpenTempleOfEnigmas={() => setIsTempleModalOpen(true)}
      />

      <MissionModal
        isOpen={isMissionModalOpen}
        onClose={() => setIsMissionModalOpen(false)}
        subject={activeMissionData.subject}
        missionId={activeMissionData.missionId}
        onCompleteMission={handleCompleteMission}
        year={currentYear}
        onOpenLibraryWriter={() => setIsLibraryWriterOpen(true)}
      />

      <LibraryWriterModal
        isOpen={isLibraryWriterOpen}
        onClose={() => setIsLibraryWriterOpen(false)}
        year={currentYear}
        authorName={currentProfile.name}
        portugueseSubject={portugueseSubject}
        onRewardStudent={handleRewardFromAuthor}
      />

      <ResetProgressModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        studentName={currentProfile.name}
        onResetDailyMissions={handleResetDailyMissions}
        onResetAllData={handleResetAllData}
        onExportBackup={handleExportBackup}
        onImportBackup={handleImportBackup}
      />

      <TempleOfEnigmasModal
        isOpen={isTempleModalOpen}
        onClose={() => setIsTempleModalOpen(false)}
        year={currentYear}
        studentName={currentProfile.name}
        enigma={activeEnigma}
        onSolveEnigma={handleSolveEnigma}
      />

      <AvatarCustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        studentName={currentProfile.name}
        level={currentProfile.level}
        currentCustomization={currentProfile.avatar}
        availableOutfits={currentProfile.inventory?.outfits || ["starter"]}
        availableAccessories={currentProfile.inventory?.accessories || ["acc-none"]}
        onSaveCustomization={handleSaveCustomization}
        onOpenShop={() => {
          setIsCustomizerOpen(false);
          setIsShopOpen(true);
        }}
      />

      <VillageShopModal
        isOpen={isShopOpen}
        onClose={() => setIsShopOpen(false)}
        currentProfile={currentProfile}
        onBuyItem={handleBuyShopItem}
        onEquipItem={handleEquipItem}
      />

      {finalExamSubject && (
        <ChapterFinalExamModal
          isOpen={isChapterFinalExamOpen}
          onClose={() => setIsChapterFinalExamOpen(false)}
          subject={finalExamSubject}
          studentName={currentProfile.name}
          year={currentYear}
          onPassExam={handlePassChapterExam}
        />
      )}

      {/* Route Locking Notice from Papai Carlos */}
      {routeLockNotice?.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border-4 border-amber-400 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-3xl shadow-md">
              👨‍👧
            </div>
            <div className="space-y-1">
              <span className="text-xs font-black uppercase text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                Pedido Especial do Papai Carlos
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-2">
                &ldquo;Volte aqui após finalizar o pedido de seu pai!&rdquo;
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Minha filha querida, antes de explorar outros locais, você precisa concluir a missão que te mandei no SaberPhone na <strong>{routeLockNotice.targetCityName}</strong>!
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  playSound("open");
                  const targetSubject = currentSubjects.find((s) => s.id === routeLockNotice.targetSubjectId);
                  setRouteLockNotice(null);
                  if (targetSubject) {
                    handleEnterBuildingInterior(targetSubject.id, targetSubject.buildingName, targetSubject);
                  }
                }}
                className="btn-game w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black rounded-2xl shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>Ir para {routeLockNotice.targetCityName} 🚀</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playSound("pop");
                  setRouteLockNotice(null);
                  setIsSaberPhoneOpen(true);
                }}
                className="btn-game w-full py-2.5 bg-sky-100 hover:bg-sky-200 text-sky-900 font-black rounded-2xl border border-sky-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Smartphone className="w-4 h-4 text-sky-700" />
                <span>Ver Mensagem no SaberPhone 📱</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playSound("click");
                  setRouteLockNotice(null);
                }}
                className="text-xs text-slate-400 hover:text-slate-600 font-bold py-1 cursor-pointer"
              >
                Continuar na Vila
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SaberPhone Modal */}
      <SaberPhoneModal
        isOpen={isSaberPhoneOpen}
        onClose={() => setIsSaberPhoneOpen(false)}
        currentProfile={currentProfile}
        activeQuest={activeStoryQuest}
        messages={phoneMessages}
        sisterName={sisterName}
        onNavigateToQuestCity={(citySubjectId) => {
          setIsSaberPhoneOpen(false);
          const subj = currentSubjects.find((s) => s.id === citySubjectId);
          if (subj) {
            handleEnterBuildingInterior(subj.id, subj.buildingName, subj);
          }
        }}
      />

      {/* Regional Kanto Map Modal */}
      <RegionWorldMap
        isOpen={isRegionMapOpen}
        onClose={() => setIsRegionMapOpen(false)}
        currentProfile={currentProfile}
        activeQuest={activeStoryQuest}
        onSelectCity={(city: RegionCity) => {
          setIsRegionMapOpen(false);
          if (city.subjectId === "home") {
            handleOpenHouse();
          } else {
            const subj = currentSubjects.find((s) => s.id === city.subjectId);
            if (subj) {
              handleEnterBuildingInterior(subj.id, subj.buildingName, subj);
            }
          }
        }}
        onTriggerRocketBattle={(subjId, subjName) => {
          setIsRegionMapOpen(false);
          setActiveRocketBattle({
            isActive: true,
            routeId: "rota_1",
            subjectId: subjId,
            subjectName: subjName,
            enemyHp: 100,
            maxEnemyHp: 100,
            playerHp: 100,
            maxPlayerHp: 100,
            enemyDialogue: "Prepare-se para o encrenca! A Equipe Rocket quer testar seu saber!",
          });
        }}
      />

      {/* Equipe Rocket Knowledge Battle Modal */}
      {activeRocketBattle?.isActive && (
        <KnowledgeBattleModal
          isOpen={activeRocketBattle.isActive}
          onClose={() => setActiveRocketBattle(null)}
          subjectId={activeRocketBattle.subjectId}
          subjectName={activeRocketBattle.subjectName}
          currentProfile={currentProfile}
          onVictory={(coins: number, xp: number) => {
            playSound("fanfare");
            try {
              confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
            } catch {}
            setActiveRocketBattle(null);
            handleDirectReward(coins, xp);
            // Mark story quest completed if it was in this subject!
            if (activeStoryQuest && activeStoryQuest.targetSubjectId === activeRocketBattle.subjectId) {
              setActiveStoryQuest((prev) => ({ ...prev, isCompleted: true }));
            }
          }}
        />
      )}
    </div>
  );
}
