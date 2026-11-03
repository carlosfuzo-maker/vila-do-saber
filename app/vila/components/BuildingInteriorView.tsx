"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  SubjectBuilding,
  StudentProfile,
  InteriorStation,
  StudentYear,
  MomErrand,
} from "../types";
import { BUILDING_INTERIOR_STATIONS, SHOP_ITEMS, MOM_ERRANDS } from "../data";
import { GameAvatar } from "./GameAvatar";
import { ArticulatedNpc, NpcConfig } from "./ArticulatedNpc";
import {
  ArrowLeft,
  Trophy,
  DoorOpen,
  ShoppingBag,
  Palette,
  Play,
  Sparkles,
  Heart,
  CheckCircle2,
  Clock,
  ListTodo,
  Smile,
  X,
  Edit3,
} from "lucide-react";
import { playSound } from "@/lib/soundEffects";
import confetti from "canvas-confetti";

interface BuildingInteriorViewProps {
  buildingId: string;
  buildingName: string;
  subject?: SubjectBuilding;
  currentProfile: StudentProfile;
  year: StudentYear;
  friendName?: string;
  onExit: () => void;
  onOpenTask: (taskId: string, isFinalExam?: boolean) => void;
  onOpenWardrobe?: () => void;
  onOpenShop?: () => void;
  onOpenSaberPhone?: () => void;
  onCompleteErrand?: (errandId: string, rewardCoins: number, rewardXp: number) => void;
  onReward?: (coins: number, xp: number) => void;
  onUpdateFriendName?: (newName: string) => void;
  onNavigateToBuilding?: (buildingId: string, buildingName: string) => void;
}

export function BuildingInteriorView({
  buildingId,
  buildingName,
  subject,
  currentProfile,
  friendName,
  onExit,
  onOpenTask,
  onOpenWardrobe,
  onOpenShop,
  onOpenSaberPhone,
  onCompleteErrand,
  onReward,
  onUpdateFriendName,
  onNavigateToBuilding,
}: BuildingInteriorViewProps) {
  const roomRef = useRef<HTMLDivElement>(null);

  // Effective friend's name (customizable by user)
  const effectiveFriendName = friendName || currentProfile.friendName || "Lívia";
  const [isEditingFriendName, setIsEditingFriendName] = useState(false);
  const [friendNameInput, setFriendNameInput] = useState(effectiveFriendName);

  useEffect(() => {
    setFriendNameInput(effectiveFriendName);
  }, [effectiveFriendName]);

  // Mini-games state for interactive house / community stations
  const [activeMiniGame, setActiveMiniGame] = useState<
    "memory_game" | "riddles_game" | "baker_quiz" | "butcher_quiz" | "bedroom_cleanup" | null
  >(null);

  // Memory game state (6 cards, 3 pairs)
  const [memoryCards, setMemoryCards] = useState<
    Array<{ id: number; symbol: string; label: string; isFlipped: boolean; isMatched: boolean }>
  >([
    { id: 0, symbol: "🦄", label: "Unicórnio", isFlipped: false, isMatched: false },
    { id: 1, symbol: "🎨", label: "Pintura", isFlipped: false, isMatched: false },
    { id: 2, symbol: "🧁", label: "Cupcake", isFlipped: false, isMatched: false },
    { id: 3, symbol: "🦄", label: "Unicórnio", isFlipped: false, isMatched: false },
    { id: 4, symbol: "🎨", label: "Pintura", isFlipped: false, isMatched: false },
    { id: 5, symbol: "🧁", label: "Cupcake", isFlipped: false, isMatched: false },
  ]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [memoryDone, setMemoryDone] = useState(false);

  const initMemoryGame = () => {
    const raw = [
      { symbol: "🦄", label: "Unicórnio" },
      { symbol: "🎨", label: "Pintura" },
      { symbol: "🧁", label: "Cupcake" },
      { symbol: "🦄", label: "Unicórnio" },
      { symbol: "🎨", label: "Pintura" },
      { symbol: "🧁", label: "Cupcake" },
    ].sort(() => Math.random() - 0.5);

    setMemoryCards(raw.map((item, idx) => ({ id: idx, ...item, isFlipped: false, isMatched: false })));
    setFlippedCards([]);
    setMemoryDone(false);
  };

  const handleFlipCard = (index: number) => {
    if (flippedCards.length >= 2) return;
    if (memoryCards[index].isFlipped || memoryCards[index].isMatched) return;

    playSound("pop");
    const updated = [...memoryCards];
    updated[index].isFlipped = true;
    setMemoryCards(updated);

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (updated[first].symbol === updated[second].symbol) {
        setTimeout(() => {
          playSound("pop");
          const matched = [...updated];
          matched[first].isMatched = true;
          matched[second].isMatched = true;
          setMemoryCards(matched);
          setFlippedCards([]);

          if (matched.every((c) => c.isMatched)) {
            setMemoryDone(true);
            playSound("fanfare");
            try { confetti({ particleCount: 75, spread: 60 }); } catch {}
            if (onReward) onReward(40, 35);
            if (onCompleteErrand) {
              onCompleteErrand("errand_livia", 30, 25);
            }
          }
        }, 450);
      } else {
        setTimeout(() => {
          const reset = [...updated];
          reset[first].isFlipped = false;
          reset[second].isFlipped = false;
          setMemoryCards(reset);
          setFlippedCards([]);
        }, 900);
      }
    }
  };

  // Riddles game state (3 riddles)
  const [currentRiddleIndex, setCurrentRiddleIndex] = useState(0);
  const [riddlesDone, setRiddlesDone] = useState(false);

  const RIDDLES_DATA = [
    {
      question: "O que é, o que é? Tem coroa mas não é rei, tem escamas mas não é peixe?",
      options: ["Abacaxi 🍍", "Banana 🍌", "Morango 🍓"],
      correctIndex: 0,
    },
    {
      question: "O que é que quanto mais se tira, maior fica?",
      options: ["Um buraco 🕳️", "Uma montanha ⛰️", "Um castelo 🏰"],
      correctIndex: 0,
    },
    {
      question: "O que corre a casa inteira e depois vai dormir num cantinho?",
      options: ["A vassoura 🧹", "O despertador ⏰", "A cadeira 🪑"],
      correctIndex: 0,
    },
  ];

  // Baker quiz state
  const [bakerQIndex, setBakerQIndex] = useState(0);
  const [bakerDone, setBakerDone] = useState(false);
  const BAKER_QUESTIONS = [
    {
      question: "Seu Manuel assou uma deliciosa torta e a dividiu em 8 pedaços iguais. Os clientes comeram 3 pedaços. Quantos pedaços ainda restam na vitrine?",
      options: ["5 pedaços 🍰", "4 pedaços", "3 pedaços"],
      correctIndex: 0,
    },
    {
      question: "Se a mamãe pagou com uma nota de 10 moedas e os pães custaram 6 moedas, quanto você deve receber de troco?",
      options: ["4 moedas 🪙", "2 moedas", "5 moedas"],
      correctIndex: 0,
    },
  ];

  // Butcher quiz state
  const [butcherQIndex, setButcherQIndex] = useState(0);
  const [butcherDone, setButcherDone] = useState(false);
  const BUTCHER_QUESTIONS = [
    {
      question: "A balança do Sr. Carlos marca o peso em gramas e quilos. Quantos gramas (g) equivalem a 1 quilo (1 kg)?",
      options: ["1.000 gramas ⚖️", "100 gramas", "500 gramas"],
      correctIndex: 0,
    },
    {
      question: "Se 500 gramas (meio quilo) de frutas da fazenda custam 4 moedas, quanto custará 1 quilo inteiro?",
      options: ["8 moedas 🍎", "6 moedas", "10 moedas"],
      correctIndex: 0,
    },
  ];

  // Bedroom cleanup state
  const [bedroomDoneTasks, setBedroomDoneTasks] = useState<string[]>([]);
  const BEDROOM_TASKS = [
    { id: "cama", title: "Arrumar a caminha", emoji: "🛏️", desc: "Esticar o lençol macio e ajeitar o travesseiro" },
    { id: "estudo", title: "Organizar a mesa de estudos", emoji: "📚", desc: "Alinhar os cadernos e estojos de canetinhas" },
    { id: "calcados", title: "Guardar as sapatilhas", emoji: "👡", desc: "Colocar os calçados organizados no cantinho" },
  ];

  // Avatar position inside the room (percentage coords)
  const [avatarPos, setAvatarPos] = useState<{ x: number; y: number }>({
    x: 50,
    y: 72,
  });
  const [isWalking, setIsWalking] = useState(false);
  const [avatarDirection, setAvatarDirection] = useState<"left" | "right">("right");
  const [tapTarget, setTapTarget] = useState<{ x: number; y: number } | null>(null);

  // Modal for Mother's Errands ("Recados da Mamãe")
  const [isErrandsModalOpen, setIsErrandsModalOpen] = useState(false);
  // Active NPC dialog feedback
  const [npcDialogSpeech, setNpcDialogSpeech] = useState<string | null>(null);

  // Dedicated state for Papai Carlos, Mamãe Renata and Sister in Casa da Família
  const [dadDialogSpeech, setDadDialogSpeech] = useState<string | null>(null);
  const [momDialogSpeech, setMomDialogSpeech] = useState<string | null>(null);
  const [sisterDialogSpeech, setSisterDialogSpeech] = useState<string | null>(null);
  const [hasClaimedAllowance, setHasClaimedAllowance] = useState(false);
  const [hasHuggedSister, setHasHuggedSister] = useState(false);

  // Sister Dynamic Rule:
  // When Cecília (4º Ano) is playing -> Sister NPC is Bianca (2º Ano)
  // When Bianca (2º Ano) is playing -> Sister NPC is Cecília (4º Ano)
  const isPlayerCecilia = currentProfile.year === 4 || currentProfile.name.toLowerCase().includes("cecília");
  const sisterName = isPlayerCecilia ? "Bianca" : "Cecília";
  const sisterNpcId = isPlayerCecilia ? "bianca_npc" : "cecilia_npc";
  const sisterRole = isPlayerCecilia ? "Irmãzinha Caçula (2º Ano)" : "Irmã Mais Velha (4º Ano)";
  const sisterEmoji = isPlayerCecilia ? "🧸" : "📚";

  const dadNpc: NpcConfig = {
    id: "carlos",
    name: "Papai Carlos",
    role: "Papai Coruja",
    emoji: "👨‍👧",
    speechText: `Oi minha querida ${currentProfile.name}! Muito orgulho de ver você tão dedicada nos estudos da Vila do Saber! Já mandei uma missão especial no seu SaberPhone!`,
    badgeColor: "bg-blue-600 text-white",
    waypointA: { x: 22, y: 72 },
    waypointB: { x: 34, y: 68 },
  };

  const momNpc: NpcConfig = {
    id: "mamae",
    name: "Mamãe Renata",
    role: "Mamãe Amorosa",
    emoji: "👩‍👧",
    speechText: `Oi meu amor! Preparei recadinhos carinhosos para você: cuidar das flores, arrumar a caminha e encher nossa casa de alegria!`,
    badgeColor: "bg-pink-500 text-white",
    waypointA: { x: 48, y: 72 },
    waypointB: { x: 58, y: 68 },
  };

  const sisterNpc: NpcConfig = {
    id: sisterNpcId,
    name: `Irmã ${sisterName}`,
    role: sisterRole,
    emoji: sisterEmoji,
    speechText: isPlayerCecilia
      ? `Oi maninha Ceci! Olha a casinha de blocos e desenhos que eu fiz! Depois você me ajuda com as continhas do 2º ano? Você é a melhor irmã do mundo!`
      : `Oi maninha Bibi! Que orgulho ver você tão focada nos estudos da Vila! Se tiver dúvida em qualquer lição de ciências ou leitura, pode me chamar!`,
    badgeColor: isPlayerCecilia ? "bg-rose-500 text-white" : "bg-indigo-600 text-white",
    waypointA: { x: 74, y: 72 },
    waypointB: { x: 86, y: 68 },
  };

  const handleInteractDad = () => {
    playSound("open");
    setDadDialogSpeech(dadNpc.speechText);
  };

  const handleActionDad = () => {
    if (!hasClaimedAllowance) {
      playSound("fanfare");
      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      } catch {}
      setHasClaimedAllowance(true);
      setDadDialogSpeech(`Aqui está sua mesada de 25 moedinhas pelo esforço de hoje! Parabéns pelo empenho, filha! ⭐`);
      if (onReward) {
        onReward(25, 20);
      }
    } else if (onOpenSaberPhone) {
      onOpenSaberPhone();
    }
  };

  const handleInteractMom = () => {
    playSound("open");
    setMomDialogSpeech(momNpc.speechText);
    setIsErrandsModalOpen(true);
  };

  const handleInteractSister = () => {
    playSound("open");
    setSisterDialogSpeech(sisterNpc.speechText);
  };

  const handleActionSister = () => {
    playSound("fanfare");
    try {
      confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
    } catch {}
    setHasHuggedSister(true);
    setSisterDialogSpeech(
      isPlayerCecilia
        ? `Adorei nosso abraço, Ceci! Você é a melhor maninha de todas! Ganhou +15 moedas de carinho! 💖`
        : `Que abraço quentinho, Bibi! Vamos arrasar nos estudos juntas! Ganhou +15 moedas de carinho! 💖`
    );
    if (onReward) {
      onReward(15, 20);
    }
  };

  const isHouse = buildingId === "house";
  const upgradeLevel = currentProfile.buildingUpgrades?.[buildingId] || 1;
  const completedErrands = currentProfile.completedErrands || [];

  // Walk avatar to coordinates inside room
  const walkTo = (targetX: number, targetY: number) => {
    const clampedY = Math.max(48, Math.min(88, targetY));
    const clampedX = Math.max(12, Math.min(88, targetX));

    setAvatarDirection(clampedX < avatarPos.x ? "left" : "right");
    setIsWalking(true);
    setTapTarget({ x: clampedX, y: clampedY });
    playSound("pop");
    setAvatarPos({ x: clampedX, y: clampedY });

    setTimeout(() => {
      setIsWalking(false);
      setTapTarget(null);
    }, 600);
  };

  // Pointer event on room floor (Mouse + Tablet touch)
  const handleRoomPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest(".interactive-station") || target.closest("button") || target.closest(".npc-character")) {
      return;
    }

    if (!roomRef.current) return;
    const rect = roomRef.current.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    walkTo(clickX, clickY);
  };

  // Complete an errand with celebration
  const handleFulfillErrand = (errand: MomErrand) => {
    playSound("fanfare");
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    setNpcDialogSpeech(errand.speechText);
    if (onCompleteErrand) {
      onCompleteErrand(errand.id, errand.rewardCoins, errand.rewardXp);
    }
  };

  // Determine stations for this room
  const stations: InteriorStation[] = BUILDING_INTERIOR_STATIONS[buildingId] || [
    {
      id: "station-default-1",
      name: "Bancada de Lições & Prática",
      description: "Pratique os exercícios principais deste capítulo.",
      x: 32,
      y: 62,
      icon: "Sparkles",
      emoji: "⭐",
      type: "task",
      taskId: "task_1",
    },
    {
      id: "station-exam",
      name: "Mesa do Teste Final do Capítulo",
      description: "Passe na prova do capítulo para dar Upgrade no mundo!",
      x: 75,
      y: 62,
      icon: "Trophy",
      emoji: "🎓",
      type: "exam",
      taskId: "exam_final",
    },
  ];

  // Placed furniture for the child's house
  const rawHouseFurniture = currentProfile.housePlacedFurniture || [];

  // Articulated NPC Metadata and autonomous roam waypoints for the active room
  const getRoomNpc = (): NpcConfig => {
    switch (buildingId) {
      case "house":
        return momNpc;
      case "market":
        return {
          id: "market_clerk",
          name: "Seu Roberto do Market",
          emoji: "🏪",
          role: "Atendente do Poké Mart",
          speechText: `Bem-vinda ao Vila Market! Aqui você pode trocar suas moedas por roupas descoladas, móveis para decorar seu quarto e adotar bichinhos fofos!`,
          badgeColor: "bg-emerald-600 text-white",
          waypointA: { x: 70, y: 72 },
          waypointB: { x: 84, y: 70 },
        };
      case "casa_amiga":
        return {
          id: "amiga",
          name: effectiveFriendName,
          emoji: "👧",
          role: "Melhor Amiga",
          speechText: `Amigaaa! Que legal você veio na minha casinha! Quer brincar de jogos comigo ou mudar meu nome?`,
          badgeColor: "bg-purple-600 text-white",
          waypointA: { x: 70, y: 72 },
          waypointB: { x: 84, y: 70 },
        };
      case "ciencias":
        return {
          id: "clara",
          name: "Dra. Clara",
          emoji: "👩‍🔬",
          role: "Cientista Chefe",
          speechText: `Bem-vinda ao Laboratório de Ciências! Preparei lâminas fascinantes no microscópio para você investigar!`,
          badgeColor: "bg-teal-600 text-white",
          waypointA: { x: 70, y: 72 },
          waypointB: { x: 84, y: 70 },
        };
      case "matematica":
        return {
          id: "pitagoras",
          name: "Mestre Pitágoras",
          emoji: "🧙‍♂️",
          role: "Mago dos Números",
          speechText: `Saudações, jovem prodígio! A matemática é a chave que destranca os maiores enigmas do castelo!`,
          badgeColor: "bg-amber-500 text-amber-950",
          waypointA: { x: 70, y: 72 },
          waypointB: { x: 84, y: 70 },
        };
      case "portugues":
        return {
          id: "sofia",
          name: "Prof. Sofia & Peninha",
          emoji: "🦉",
          role: "Mestres das Letras",
          speechText: `Bem-vinda à Biblioteca do Saber! Cada livro aqui é um portal mágico esperando por você!`,
          badgeColor: "bg-rose-500 text-white",
          waypointA: { x: 70, y: 72 },
          waypointB: { x: 84, y: 70 },
        };
      case "ingles":
        return {
          id: "emily",
          name: "Teacher Emily",
          emoji: "🇬🇧",
          role: "English Teacher",
          speechText: `Hello my bright student! Ready for wonderful English conversations today?`,
          badgeColor: "bg-indigo-600 text-white",
          waypointA: { x: 70, y: 72 },
          waypointB: { x: 84, y: 70 },
        };
      case "te":
        return {
          id: "leo",
          name: "Engenheiro Léo",
          emoji: "🤖",
          role: "Mestre Maker",
          speechText: `E aí, construtora! O robô já está com os circuitos ligados esperando pelos seus comandos lógicos!`,
          badgeColor: "bg-cyan-600 text-white",
          waypointA: { x: 70, y: 72 },
          waypointB: { x: 84, y: 70 },
        };
      case "artes":
        return {
          id: "mona",
          name: "Pintora Mona",
          emoji: "🎨",
          role: "Artista da Vila",
          speechText: `Olá, minha pequena artista! As tintas e pincéis estão prontos para colorir o mundo!`,
          badgeColor: "bg-fuchsia-600 text-white",
          waypointA: { x: 70, y: 72 },
          waypointB: { x: 84, y: 70 },
        };
      default:
        return {
          id: "guia",
          name: "Guia da Vila",
          emoji: "✨",
          role: "Morador Amigável",
          speechText: `Seja muito bem-vinda a este ambiente especial da Vila do Saber!`,
          badgeColor: "bg-sky-600 text-white",
          waypointA: { x: 70, y: 72 },
          waypointB: { x: 84, y: 70 },
        };
    }
  };

  const roomNpc = getRoomNpc();

  // Handle station click with support for community mini-games and subject missions
  const handleStationClick = (st: InteriorStation) => {
    playSound("open");

    if (buildingId === "casa_amiga") {
      if (st.id === "amiga-brincar" || st.taskId === "errand_livia") {
        initMemoryGame();
        setActiveMiniGame("memory_game");
        return;
      }
      if (st.id === "amiga-cha" || st.taskId === "casa_amiga_chat") {
        setCurrentRiddleIndex(0);
        setRiddlesDone(false);
        setActiveMiniGame("riddles_game");
        return;
      }
    }

    if (buildingId === "market") {
      if (onOpenShop) {
        onOpenShop();
      }
      return;
    }

    if (isHouse) {
      if (st.id === "house-dad" || st.taskId === "dad_talk") {
        handleInteractDad();
        return;
      }
      if (st.id === "house-mom" || st.taskId === "mom_talk") {
        handleInteractMom();
        return;
      }
      if (st.id === "house-sister" || st.taskId === "sister_talk") {
        handleInteractSister();
        return;
      }
      if (st.taskId === "errand_quarto") {
        setActiveMiniGame("bedroom_cleanup");
        return;
      }
    }

    onOpenTask(st.taskId || "task_1", st.type === "exam");
  };


  // Check if there is an errand for this location
  const locationErrand = MOM_ERRANDS.find(
    (e) =>
      (buildingId === "house" && e.targetPlace === "house") ||
      (buildingId === "padaria" && e.targetPlace === "padaria") ||
      (buildingId === "acougue" && e.targetPlace === "acougue") ||
      (buildingId === "casa_amiga" && e.targetPlace === "casa_amiga")
  );

  const isErrandDone = locationErrand ? completedErrands.includes(locationErrand.id) : false;

  return (
    <div className="relative w-full min-h-[84vh] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-300 flex flex-col animate-fadeIn select-none touch-manipulation">
      {/* Top Interior Room Navigation Bar */}
      <div className="z-20 p-3.5 sm:p-4 bg-slate-950/85 backdrop-blur-md border-b-2 border-amber-400/50 flex flex-wrap items-center justify-between gap-3 text-white">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              playSound("click");
              onExit();
            }}
            className="btn-game px-3.5 py-2 bg-white/15 hover:bg-white/25 rounded-2xl flex items-center gap-1.5 text-xs font-black cursor-pointer border border-white/20 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Mapa da Vila</span>
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-amber-200">
                {isHouse ? `Casinha da ${currentProfile.name}` : buildingName}
              </h2>
              {!isHouse && (
                <span className="text-[10px] font-black bg-amber-500 text-amber-950 px-2 py-0.2 rounded-full uppercase">
                  Nível de Upgrade {upgradeLevel} ⭐
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-300">
              {isHouse
                ? "Seu cantinho aconchegante! Fale com a Mamãe e organize suas tarefinhas!"
                : subject?.chapters?.find((c) => c.id === subject.currentChapterId)?.title ||
                  "Ambiente vivo com moradores e atividades da Vila"}
            </p>
          </div>
        </div>

        {/* Quick Actions in Room */}
        <div className="flex items-center gap-2">
          {/* Recados da Mamãe Button */}
          <button
            type="button"
            onClick={() => {
              playSound("open");
              setIsErrandsModalOpen(true);
            }}
            className="btn-game px-3 py-1.5 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-1.5 cursor-pointer"
            title="Ver a Lista de Recados da Mamãe"
          >
            <ListTodo className="w-3.5 h-3.5 text-yellow-200" />
            <span>Recados da Família ({completedErrands.length}/{MOM_ERRANDS.length})</span>
          </button>

          {isHouse && (
            <>
              <button
                type="button"
                onClick={onOpenWardrobe}
                className="btn-game px-3 py-1.5 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Meu Visual</span>
              </button>

              <button
                type="button"
                onClick={onOpenShop}
                className="btn-game px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Shopping</span>
              </button>
            </>
          )}

          <button
            type="button"
            onClick={() => {
              playSound("click");
              onExit();
            }}
            className="p-2 bg-rose-500/80 hover:bg-rose-600 rounded-xl cursor-pointer"
            title="Sair para o Mapa"
          >
            <DoorOpen className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Interactive Walkable Themed Room Scene */}
      <div
        ref={roomRef}
        onPointerDown={handleRoomPointerDown}
        className="relative flex-1 cursor-pointer overflow-hidden flex flex-col justify-end"
      >
        {/* ROOM ARCHITECTURE LAYER: Specific Wall & Floor Styling */}
        {/* ============================================================== */}
        {/* 1. Minha Casinha (Quarto da Criança) */}
        {isHouse && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Wall: Cozy candy-striped wallpaper */}
            <div className="absolute top-0 left-0 right-0 h-[48%] bg-[#FFFBEB] bg-[repeating-linear-gradient(90deg,#FFFBEB,#FFFBEB_30px,#FEF3C7_30px,#FEF3C7_60px)] border-b-8 border-[#D97706]" />
            {/* White Wainscoting Trim */}
            <div className="absolute top-[43%] left-0 right-0 h-[5%] bg-white/80 border-t-2 border-b-2 border-amber-300" />
            {/* Floor: Polished warm oak wooden planks */}
            <div className="absolute bottom-0 left-0 right-0 h-[52%] bg-[#B45309] bg-[repeating-linear-gradient(0deg,#B45309,#B45309_24px,#92400E_24px,#92400E_26px,#D97706_26px,#D97706_50px)]" />
            {/* Window with curtains and garden view */}
            <div className="absolute top-4 left-10 w-28 h-26 rounded-t-full bg-gradient-to-b from-sky-300 to-sky-100 border-4 border-amber-800 shadow-xl overflow-hidden flex flex-col items-center justify-center">
              <span className="text-3xl animate-pulse">☀️</span>
              <div className="absolute inset-x-0 bottom-0 h-4 bg-emerald-400" />
              {/* Curtains */}
              <div className="absolute top-0 left-0 w-5 h-full bg-pink-400/80 rounded-r-lg" />
              <div className="absolute top-0 right-0 w-5 h-full bg-pink-400/80 rounded-l-lg" />
            </div>
            {/* Bookshelf & Desk on back wall */}
            <div className="absolute top-10 right-14 w-40 h-24 rounded-2xl bg-amber-900 border-2 border-amber-950 p-2 shadow-lg flex flex-col justify-between">
              <div className="flex gap-1 justify-center">
                <div className="w-3 h-8 bg-rose-500 rounded-sm" />
                <div className="w-3.5 h-7 bg-sky-500 rounded-sm" />
                <div className="w-3 h-9 bg-emerald-500 rounded-sm" />
                <div className="w-4 h-8 bg-purple-500 rounded-sm" />
                <div className="w-3 h-6 bg-yellow-400 rounded-sm" />
              </div>
              <div className="h-1 bg-amber-700 w-full" />
              <div className="text-[10px] text-amber-200 font-bold text-center">
                Livros & Troféus da {currentProfile.name}
              </div>
            </div>
          </div>
        )}

        {/* 2. Padaria do Seu Manuel */}
        {buildingId === "padaria" && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Wall: Rustic Warm Red Brick Wall */}
            <div className="absolute top-0 left-0 right-0 h-[48%] bg-[#7C2D12] bg-[radial-gradient(#9A3412_2px,transparent_2px)] [background-size:16px_16px] border-b-8 border-amber-950" />
            {/* Floor: Terracotta ceramic tiles */}
            <div className="absolute bottom-0 left-0 right-0 h-[52%] bg-[#EA580C] bg-[repeating-linear-gradient(45deg,#C2410C,#C2410C_40px,#9A3412_40px,#9A3412_42px)]" />
            {/* Stone Baker's Oven Glow */}
            <div className="absolute top-4 left-8 w-32 h-26 rounded-t-3xl bg-amber-950 border-4 border-stone-700 p-2 flex flex-col items-center justify-end">
              <div className="w-16 h-10 rounded-t-full bg-gradient-to-t from-orange-600 via-amber-500 to-yellow-300 animate-pulse flex items-center justify-center text-xl shadow-[0_0_20px_rgba(245,158,11,0.8)]">
                🔥
              </div>
              <span className="text-[9px] font-black text-amber-200 mt-1 uppercase">Forno à Lenha</span>
            </div>
            {/* Chalkboard Menu */}
            <div className="absolute top-6 right-12 w-48 h-24 rounded-2xl bg-slate-900 border-4 border-amber-800 p-2 text-center shadow-lg">
              <span className="text-yellow-300 font-mono text-[10px] font-bold block uppercase tracking-wider">
                Padaria do Seu Manuel 🥖
              </span>
              <p className="text-white text-[10px] font-bold mt-1">
                • Pão Francês Quentinho: R$ 0,80<br />
                • Croissant Dourado: R$ 3,50<br />
                • Bolo de Cenoura: R$ 4,00
              </p>
            </div>
          </div>
        )}

        {/* 3. Açougue & Mercearia do Sr. Carlos */}
        {buildingId === "acougue" && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Wall: Clean White Subway Tiles with Blue Border */}
            <div className="absolute top-0 left-0 right-0 h-[48%] bg-slate-100 bg-[linear-gradient(to_right,#CBD5E1_1px,transparent_1px),linear-gradient(to_bottom,#CBD5E1_1px,transparent_1px)] [background-size:24px_16px] border-b-8 border-sky-800" />
            {/* Royal blue accent stripe */}
            <div className="absolute top-[44%] left-0 right-0 h-[4%] bg-sky-600" />
            {/* Floor: Classic Light Terrazzo Shop Floor */}
            <div className="absolute bottom-0 left-0 right-0 h-[52%] bg-slate-300 bg-[radial-gradient(#64748B_1.5px,transparent_1.5px)] [background-size:12px_12px]" />
            {/* Butcher Display Scale */}
            <div className="absolute top-4 left-10 p-2 bg-white/90 rounded-2xl border-2 border-slate-400 shadow-md flex items-center gap-2">
              <span className="text-3xl">⚖️</span>
              <div>
                <span className="text-[10px] font-black text-slate-800 block">Balança de Precisão</span>
                <span className="text-[9px] font-bold text-emerald-700">1.000 kg • Fresco</span>
              </div>
            </div>
            {/* Shop Sign */}
            <div className="absolute top-6 right-10 w-48 h-22 rounded-2xl bg-gradient-to-r from-rose-700 to-red-800 border-4 border-white text-white p-2 text-center shadow-lg">
              <span className="text-yellow-300 font-mono text-[10px] font-bold uppercase block">
                Açougue & Carnes Nobres 🥩
              </span>
              <p className="text-[10px] text-rose-100 font-bold mt-0.5">
                Cortes Selecionados & Legumes Frescos da Fazenda da Vila
              </p>
            </div>
          </div>
        )}

        {/* 4. Casa da Amiga Lívia */}
        {buildingId === "casa_amiga" && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Wall: Sweet Lavender Pastel with Polka Dots */}
            <div className="absolute top-0 left-0 right-0 h-[48%] bg-purple-100 bg-[radial-gradient(#D8B4FE_2px,transparent_2px)] [background-size:20px_20px] border-b-8 border-purple-400" />
            {/* Bunting Flags */}
            <div className="absolute top-0 left-0 right-0 flex justify-around py-1">
              <span className="text-lg">🚩</span>
              <span className="text-lg">🎈</span>
              <span className="text-lg">🌸</span>
              <span className="text-lg">🚩</span>
              <span className="text-lg">💖</span>
              <span className="text-lg">🚩</span>
            </div>
            {/* Floor: Light Parquet with Big Pastel Rug */}
            <div className="absolute bottom-0 left-0 right-0 h-[52%] bg-amber-100 bg-[repeating-linear-gradient(90deg,#FEF3C7,#FEF3C7_30px,#FDE68A_30px,#FDE68A_60px)]" />
            {/* Big Dollhouse in the corner */}
            <div className="absolute top-8 left-10 w-28 h-24 rounded-t-2xl bg-pink-200 border-3 border-pink-400 p-2 flex flex-col justify-between shadow-md">
              <div className="w-full text-center text-xs">🏠 Casinha</div>
              <div className="flex justify-around text-lg">
                <span>🧸</span>
                <span>🪑</span>
                <span>🧁</span>
              </div>
            </div>
            {/* Friendship Banner with editable name */}
            <div className="absolute top-8 right-10 px-4 py-2.5 bg-white/95 rounded-2xl border-2 border-purple-300 shadow-md text-center pointer-events-auto">
              <span className="text-xs font-black text-purple-900 block">
                Quarto de Brincar da {effectiveFriendName} 👭
              </span>
              <span className="text-[10px] font-bold text-pink-600 block">
                Amigas para Sempre!
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  playSound("open");
                  setIsEditingFriendName(true);
                }}
                className="btn-game mt-1.5 px-2.5 py-0.5 bg-purple-100 hover:bg-purple-200 text-purple-800 text-[10px] font-black rounded-lg border border-purple-300 flex items-center justify-center gap-1 mx-auto cursor-pointer"
              >
                <Edit3 className="w-3 h-3 text-purple-700" />
                <span>Mudar Nome da Amiga ✏️</span>
              </button>
            </div>
          </div>
        )}

        {/* 5. Laboratório de Ciências */}
        {buildingId === "ciencias" && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Mint Green Tiles */}
            <div className="absolute top-0 left-0 right-0 h-[48%] bg-teal-50 bg-[linear-gradient(to_right,#99F6E4_1px,transparent_1px),linear-gradient(to_bottom,#99F6E4_1px,transparent_1px)] [background-size:20px_20px] border-b-8 border-teal-800" />
            {/* Floor: Checkered lab tiles */}
            <div className="absolute bottom-0 left-0 right-0 h-[52%] bg-teal-900 bg-[repeating-linear-gradient(45deg,#0F766E,#0F766E_30px,#115E59_30px,#115E59_60px)]" />
            {/* Giant Chemistry Chalkboard */}
            <div className="absolute top-4 right-10 w-52 sm:w-64 h-26 rounded-2xl bg-slate-900 border-4 border-teal-600 p-2.5 text-center shadow-lg">
              <span className="text-emerald-300 font-mono text-[11px] font-bold block uppercase">
                🔬 Laboratório de Pesquisa
              </span>
              <p className="text-white text-[10px] font-bold mt-1">
                H₂O + Luz Solar = Fotossíntese 🌱<br />
                Observação de Células no Microscópio
              </p>
            </div>
            {/* Bubbling Flasks Shelf */}
            <div className="absolute top-8 left-10 flex items-center gap-3 p-2 bg-teal-900/80 rounded-2xl border border-teal-400">
              <span className="text-3xl animate-bounce">🧪</span>
              <span className="text-3xl animate-pulse">🧬</span>
              <span className="text-3xl">🧫</span>
            </div>
          </div>
        )}

        {/* 6. Castelo da Matemática */}
        {buildingId === "matematica" && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Medieval Stone Blocks */}
            <div className="absolute top-0 left-0 right-0 h-[48%] bg-stone-700 bg-[repeating-linear-gradient(0deg,#57534E,#57534E_24px,#44403C_24px,#44403C_26px)] border-b-8 border-amber-950" />
            {/* Floor: Royal Stone Flagstones */}
            <div className="absolute bottom-0 left-0 right-0 h-[52%] bg-amber-950 bg-[radial-gradient(#CA8A04_2px,transparent_2px)] [background-size:24px_24px]" />
            {/* Flickering Torches */}
            <div className="absolute top-6 left-10 flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full border border-yellow-500">
              <span className="text-2xl animate-pulse">🔥</span>
              <span className="text-[10px] font-black text-yellow-300">Tocha Arcana</span>
            </div>
            {/* Royal Math Banner */}
            <div className="absolute top-4 right-10 w-56 h-26 rounded-2xl bg-gradient-to-br from-amber-600 to-yellow-600 border-4 border-yellow-300 p-2.5 text-center shadow-lg text-amber-950">
              <span className="font-mono text-xs font-black block uppercase tracking-wider">
                👑 Academia dos Números
              </span>
              <p className="text-[10px] font-bold mt-1">
                &quot;Os números governam a harmonia do universo&quot; • Mestre Pitágoras
              </p>
            </div>
          </div>
        )}

        {/* 7. Biblioteca do Saber (Português) */}
        {buildingId === "portugues" && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Towering Oak Bookshelves */}
            <div className="absolute top-0 left-0 right-0 h-[48%] bg-[#451A03] bg-[linear-gradient(to_right,#78350F_4px,transparent_4px)] [background-size:28px_100%] border-b-8 border-amber-950" />
            {/* Floor: Burgundy Parquet with Reading Carpet */}
            <div className="absolute bottom-0 left-0 right-0 h-[52%] bg-[#881337] bg-[radial-gradient(#BE123C_2px,transparent_2px)] [background-size:18px_18px]" />
            {/* Stained Glass Arched Window */}
            <div className="absolute top-4 left-10 w-24 h-26 rounded-t-full bg-gradient-to-br from-indigo-500 via-rose-500 to-amber-400 border-4 border-amber-900 shadow-xl flex items-center justify-center">
              <span className="text-2xl">✨</span>
            </div>
            {/* Library Crest */}
            <div className="absolute top-4 right-10 w-56 h-26 rounded-2xl bg-amber-950/90 border-4 border-amber-500 p-2 text-center shadow-lg text-amber-200">
              <span className="font-mono text-xs font-black block uppercase">
                📜 Santuário das Histórias
              </span>
              <p className="text-[10px] font-bold mt-1 text-white">
                Oficina do Jovem Autor • Contos, Poemas e Fábulas com a Coruja Peninha
              </p>
            </div>
          </div>
        )}

        {/* 8. Default fallback scenic background for any other buildings */}
        {!isHouse &&
          !["padaria", "acougue", "casa_amiga", "ciencias", "matematica", "portugues"].includes(
            buildingId
          ) && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 right-0 h-[48%] bg-gradient-to-b from-sky-200 to-sky-100 border-b-8 border-amber-800" />
              <div className="absolute bottom-0 left-0 right-0 h-[52%] bg-gradient-to-b from-amber-700 to-amber-900" />
              <div className="absolute top-4 left-8 text-4xl">☀️</div>
              <div className="absolute top-4 right-8 bg-slate-900 text-white px-4 py-2 rounded-2xl border-2 border-amber-400 text-center">
                <span className="text-xs font-black">{buildingName}</span>
              </div>
            </div>
          )}

        {/* Tap Destination Feedback Ripple */}
        {tapTarget && (
          <div
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ left: `${tapTarget.x}%`, top: `${tapTarget.y}%` }}
          >
            <div className="w-8 h-8 rounded-full border-4 border-amber-400 bg-amber-300/40 animate-ping" />
          </div>
        )}

        {/* House Furniture Items Placed on the Floor (Minha Casinha) */}
        {isHouse &&
          rawHouseFurniture.map((item, idx) => {
            const itemId = typeof item === "string" ? item : item.itemId;
            const posX = typeof item === "string" ? 22 + idx * 24 : item.x;
            const posY = typeof item === "string" ? 64 : item.y;
            const meta = SHOP_ITEMS.find((s) => s.id === itemId);

            return (
              <div
                key={idx}
                className="absolute z-10 flex flex-col items-center transition-transform hover:scale-105 pointer-events-none"
                style={{
                  left: `${posX}%`,
                  top: `${posY}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="text-5xl sm:text-6xl drop-shadow-lg">
                  {meta?.emoji || "🛋️"}
                </div>
                <span className="text-[10px] font-black bg-white/90 px-2 py-0.5 rounded-full text-slate-800 shadow-sm border border-slate-200">
                  {meta?.name || "Móvel"}
                </span>
              </div>
            );
          })}

        {/* Interactive Subject & Community Stations in Room */}
        {!isHouse &&
          stations.map((st) => {
            const isExam = st.type === "exam";

            return (
              <div
                key={st.id}
                onClick={(e) => {
                  e.stopPropagation();
                  handleStationClick(st);
                }}
                className="interactive-station absolute z-15 flex flex-col items-center group cursor-pointer transition-transform hover:scale-110 active:scale-95"
                style={{
                  left: `${st.x}%`,
                  top: `${st.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {/* Station Icon Disc */}
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-3xl p-1 flex items-center justify-center shadow-2xl transition-all ${
                    isExam
                      ? "bg-gradient-to-br from-amber-400 via-yellow-300 to-amber-500 border-4 border-amber-600 animate-pulse ring-4 ring-yellow-400/60"
                      : "bg-white border-4 border-amber-400 ring-2 ring-amber-300/60"
                  }`}
                >
                  <span className="text-3xl sm:text-4xl">{st.emoji}</span>
                </div>

                {/* Station Tag */}
                <div className="mt-2 text-center flex flex-col items-center">
                  <div
                    className={`px-3 py-0.5 rounded-full text-xs font-black shadow-md flex items-center gap-1.5 whitespace-nowrap ${
                      isExam
                        ? "bg-amber-500 text-amber-950 border-2 border-amber-600"
                        : "bg-white text-slate-800 border-2 border-slate-300"
                    }`}
                  >
                    {isExam && <Trophy className="w-3.5 h-3.5 text-amber-950" />}
                    <span>{st.name}</span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStationClick(st);
                    }}
                    className={`btn-game mt-1 px-3 py-1 rounded-xl text-[10px] sm:text-xs font-black shadow-md flex items-center gap-1 cursor-pointer ${
                      isExam
                        ? "bg-yellow-400 hover:bg-yellow-300 text-amber-950 border border-amber-600"
                        : "bg-emerald-500 hover:bg-emerald-600 text-white border border-emerald-600"
                    }`}
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>
                      {isExam
                        ? "Fazer Prova"
                        : buildingId === "casa_amiga" && st.id === "amiga-brincar"
                        ? "Jogo da Memória 🧸"
                        : buildingId === "casa_amiga" && st.id === "amiga-cha"
                        ? "Chá & Charadas 🫖"
                        : buildingId === "market"
                        ? "Abrir Loja 🛍️"
                        : isHouse && st.id === "house-dad"
                        ? "Falar com Papai 👨‍👧"
                        : isHouse && st.id === "house-mom"
                        ? "Recados da Mamãe ❤️"
                        : isHouse && st.id === "house-sister"
                        ? (isPlayerCecilia ? "Falar com Bianca 🧸" : "Falar com Cecília 📚")
                        : "Fazer Atividade"}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}

        {/* ARTICULATED AUTONOMOUS PATROLLING NPCS IN THE ROOM */}
        {isHouse ? (
          <>
            {/* 1. PAPAI CARLOS */}
            <ArticulatedNpc
              npc={dadNpc}
              speechBalloon={dadDialogSpeech}
              onInteract={handleInteractDad}
              customActionLabel={hasClaimedAllowance ? "📱 Abrir SaberPhone" : "Pegar Mesada (+25 Moedas) 🪙"}
              onCustomAction={handleActionDad}
            />

            {/* 2. MAMÃE RENATA */}
            <ArticulatedNpc
              npc={momNpc}
              speechBalloon={momDialogSpeech}
              onInteract={handleInteractMom}
              customActionLabel="Abrir Recados da Mamãe ❤️"
              onCustomAction={handleInteractMom}
            />

            {/* 3. A IRMÃ (BIANCA QUANDO CECÍLIA JOGA, OU CECÍLIA QUANDO BIANCA JOGA) */}
            <ArticulatedNpc
              npc={sisterNpc}
              speechBalloon={sisterDialogSpeech}
              onInteract={handleInteractSister}
              customActionLabel={
                hasHuggedSister
                  ? (isPlayerCecilia ? "Brincar com a Bianca 🧸" : "Conversar com a Cecília 📚")
                  : (isPlayerCecilia ? "Abraçar a Bianca (+15 moedas) 🧸" : "Abraçar a Cecília (+15 moedas) 💖")
              }
              onCustomAction={handleActionSister}
            />
          </>
        ) : (
          <ArticulatedNpc
            npc={roomNpc}
            speechBalloon={npcDialogSpeech}
            onInteract={() => {
              playSound("open");
              if (buildingId === "market") {
                if (onOpenShop) onOpenShop();
              } else if (buildingId === "casa_amiga") {
                setIsEditingFriendName(true);
              } else if (locationErrand && !isErrandDone) {
                handleFulfillErrand(locationErrand);
              } else {
                setNpcDialogSpeech(roomNpc.speechText);
              }
            }}
            customActionLabel={
              locationErrand && !isErrandDone
                ? locationErrand.completionPrompt
                : buildingId === "casa_amiga"
                ? "Mudar Nome da Amiga ✏️"
                : buildingId === "market"
                ? "Abrir Loja de Roupas & Pets 🛍️"
                : undefined
            }
            onCustomAction={() => {
              if (locationErrand && !isErrandDone) {
                handleFulfillErrand(locationErrand);
              } else if (buildingId === "casa_amiga") {
                setIsEditingFriendName(true);
              } else if (buildingId === "market") {
                if (onOpenShop) onOpenShop();
              }
            }}
          />
        )}

        {/* The Walking Avatar Inside Room with CONSTANT smooth transition */}
        <div
          className="absolute z-30 pointer-events-none select-none"
          style={{
            left: `${avatarPos.x}%`,
            top: `${avatarPos.y}%`,
            transform: "translate(-50%, -100%)",
            transition: "left 0.65s cubic-bezier(0.25, 1, 0.5, 1), top 0.65s cubic-bezier(0.25, 1, 0.5, 1)",
            willChange: "left, top",
          }}
        >
          <GameAvatar
            customization={currentProfile.avatar}
            studentName={currentProfile.name}
            level={currentProfile.level}
            isWalking={isWalking}
            direction={avatarDirection}
            scale={1.25}
          />
        </div>

        {/* Floor Footstep ripple effect prompt */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 bg-slate-950/70 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-xs font-bold pointer-events-none border border-white/20">
          👟 Toque em qualquer parte do chão para caminhar ou converse com {roomNpc.name}!
        </div>
      </div>

      {/* MODAL: "Recados da Mamãe" (Errands & Domestic Tasks List) */}
      {isErrandsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border-4 border-pink-400 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 p-4 sm:p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-white/20 rounded-2xl backdrop-blur-md">
                  <Heart className="w-6 h-6 text-yellow-200 fill-yellow-200" />
                </div>
                <div>
                  <h3 className="text-xl font-black">Recados da Mamãe ❤️</h3>
                  <p className="text-xs text-pink-100 font-medium">
                    Ajude sua família nas tarefas da vila e ganhe moedas para a loja!
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  playSound("click");
                  setIsErrandsModalOpen(false);
                }}
                className="p-2.5 bg-white/20 hover:bg-white/30 rounded-2xl cursor-pointer"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Errands List */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-3 flex-1 bg-slate-50">
              {MOM_ERRANDS.map((errand) => {
                const isDone = completedErrands.includes(errand.id);

                return (
                  <div
                    key={errand.id}
                    className={`p-4 rounded-2xl border-2 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isDone
                        ? "bg-emerald-50 border-emerald-300 shadow-sm"
                        : "bg-white border-slate-200 hover:border-pink-300 shadow-md"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-2xl shrink-0">
                        {errand.npcEmoji}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs sm:text-sm font-black text-slate-800">
                            {errand.title}
                          </h4>
                          {isDone ? (
                            <span className="px-2 py-0.2 rounded-full bg-emerald-500 text-white text-[9px] font-black uppercase flex items-center gap-0.5">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Feito</span>
                            </span>
                          ) : (
                            <span className="px-2 py-0.2 rounded-full bg-amber-400 text-amber-950 text-[9px] font-black uppercase flex items-center gap-0.5">
                              <Clock className="w-3 h-3" />
                              <span>Pendente</span>
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Local: <strong>{errand.placeName}</strong> ({errand.npcName})
                        </p>
                        <p className="text-[11px] text-slate-600 mt-1 italic">
                          &ldquo;{errand.description}&rdquo;
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[10px] font-black text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                            💰 +{errand.rewardCoins} Moedas
                          </span>
                          <span className="text-[10px] font-black text-sky-700 bg-sky-100 px-2 py-0.5 rounded-md">
                            ⭐ +{errand.rewardXp} XP
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Navigation or Instant Complete Action */}
                    <div className="flex sm:flex-col items-center gap-1.5 shrink-0 self-end sm:self-center">
                      {!isDone ? (
                        buildingId === errand.targetPlace ? (
                          <button
                            type="button"
                            onClick={() => {
                              handleFulfillErrand(errand);
                              setIsErrandsModalOpen(false);
                            }}
                            className="btn-game px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-black shadow-md cursor-pointer whitespace-nowrap"
                          >
                            Cumprir Agora ✨
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              playSound("open");
                              setIsErrandsModalOpen(false);
                              if (onNavigateToBuilding) {
                                onNavigateToBuilding(errand.targetPlace, errand.placeName);
                              }
                            }}
                            className="btn-game px-3.5 py-1.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white rounded-xl text-xs font-black shadow-md cursor-pointer whitespace-nowrap"
                          >
                            Ir até {errand.placeName.split(" ")[0]} 🚀
                          </button>
                        )
                      ) : (
                        <div className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Concluído!</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="p-3 bg-white border-t border-slate-200 text-center">
              <span className="text-xs text-slate-500 font-bold">
                Ao completar todos os recados da mamãe, você ganha moedas para comprar pets e roupas no Shopping!
              </span>
            </div>
          </div>
        </div>
      )}
      {/* MODAL 1: Personalizar Nome da Amiga */}
      {isEditingFriendName && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border-4 border-purple-400 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-purple-100 border-2 border-purple-300 flex items-center justify-center text-3xl shadow-sm">
              👭
            </div>
            <div>
              <h3 className="text-lg font-black text-purple-950">
                Quem é a sua melhor amiga?
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Digite o nome da sua amiguinha para ela morar nesta casinha com você!
              </p>
            </div>

            <input
              type="text"
              value={friendNameInput}
              onChange={(e) => setFriendNameInput(e.target.value)}
              placeholder="Ex: Sofia, Isabela, Maria..."
              className="w-full px-4 py-3 rounded-2xl border-2 border-purple-300 text-sm font-bold text-purple-950 focus:outline-none focus:border-purple-600 text-center shadow-inner"
              maxLength={20}
              autoFocus
            />

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsEditingFriendName(false)}
                className="btn-game flex-1 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  const trimmed = friendNameInput.trim();
                  if (trimmed) {
                    if (onUpdateFriendName) {
                      onUpdateFriendName(trimmed);
                    }
                    playSound("fanfare");
                    try {
                      confetti({ particleCount: 60, spread: 55 });
                    } catch {}
                    setIsEditingFriendName(false);
                  }
                }}
                className="btn-game flex-1 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xs font-black shadow-md cursor-pointer"
              >
                Salvar Nome ✨
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Jogo da Memória dos Brinquedos (Casa da Amiga) */}
      {activeMiniGame === "memory_game" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border-4 border-purple-400 text-center space-y-4">
            <button
              onClick={() => setActiveMiniGame(null)}
              className="absolute top-3 right-3 p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-center gap-2">
              <span className="text-3xl">🧸</span>
              <div>
                <h3 className="text-lg font-black text-purple-950">
                  Jogo da Memória com {effectiveFriendName}
                </h3>
                <p className="text-xs text-purple-600 font-bold">
                  Encontre os 3 pares de brinquedos favoritos!
                </p>
              </div>
            </div>

            {/* 6 Memory Cards Grid */}
            <div className="grid grid-cols-3 gap-3 my-4">
              {memoryCards.map((card, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleFlipCard(idx)}
                  className={`h-24 sm:h-28 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 font-black cursor-pointer shadow-md text-3xl ${
                    card.isFlipped || card.isMatched
                      ? "bg-purple-100 border-3 border-purple-500 scale-100 rotate-0"
                      : "bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-purple-600 hover:scale-105"
                  }`}
                >
                  {card.isFlipped || card.isMatched ? (
                    <>
                      <span>{card.symbol}</span>
                      <span className="text-[10px] font-bold text-purple-900 mt-1">
                        {card.label}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl text-white opacity-80">❓</span>
                  )}
                </button>
              ))}
            </div>

            {memoryDone ? (
              <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-3.5 space-y-2 animate-bounce-subtle">
                <div className="text-emerald-700 font-black text-sm flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Parabéns! Você encontrou todos os pares!</span>
                </div>
                <p className="text-xs text-emerald-800 font-medium">
                  {effectiveFriendName}: &ldquo;Amiga, você tem uma memória de elefante! Amei brincar com você!&rdquo;
                </p>
                <div className="flex justify-center gap-3 text-xs font-black text-amber-700">
                  <span>+40 Moedas 🪙</span>
                  <span>+35 XP ⭐</span>
                </div>
                <button
                  onClick={() => setActiveMiniGame(null)}
                  className="btn-game mt-2 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-md cursor-pointer"
                >
                  Continuar Brincando 💖
                </button>
              </div>
            ) : (
              <p className="text-xs text-slate-500 font-medium">
                Toque em duas cartas para virar e achar as figuras iguais.
              </p>
            )}
          </div>
        </div>
      )}

      {/* MODAL 3: Chá das Amigas & Charadas (Casa da Amiga) */}
      {activeMiniGame === "riddles_game" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border-4 border-pink-400 text-center space-y-4">
            <button
              onClick={() => setActiveMiniGame(null)}
              className="absolute top-3 right-3 p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-center gap-2">
              <span className="text-3xl">🫖</span>
              <div>
                <h3 className="text-lg font-black text-pink-950">
                  Chá com {effectiveFriendName} & Charadas
                </h3>
                <p className="text-xs text-pink-600 font-bold">
                  Charada {currentRiddleIndex + 1} de {RIDDLES_DATA.length}
                </p>
              </div>
            </div>

            {!riddlesDone ? (
              <div className="space-y-4">
                <div className="bg-pink-50 border-2 border-pink-200 rounded-2xl p-4 text-sm font-bold text-slate-800">
                  {RIDDLES_DATA[currentRiddleIndex].question}
                </div>

                <div className="space-y-2">
                  {RIDDLES_DATA[currentRiddleIndex].options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      type="button"
                      onClick={() => {
                        if (oIdx === RIDDLES_DATA[currentRiddleIndex].correctIndex) {
                          playSound("pop");
                          if (currentRiddleIndex + 1 < RIDDLES_DATA.length) {
                            setCurrentRiddleIndex((prev) => prev + 1);
                          } else {
                            setRiddlesDone(true);
                            playSound("fanfare");
                            try { confetti({ particleCount: 70, spread: 60 }); } catch {}
                            if (onReward) onReward(35, 30);
                          }
                        } else {
                          playSound("click");
                        }
                      }}
                      className="btn-game w-full py-3 px-4 rounded-2xl bg-white hover:bg-pink-100 border-2 border-pink-300 text-xs font-black text-slate-800 shadow-sm flex items-center justify-between cursor-pointer active:scale-98"
                    >
                      <span>{opt}</span>
                      <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 space-y-2 animate-bounce-subtle">
                <div className="text-emerald-700 font-black text-sm flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Todas as Charadas Desvendadas!</span>
                </div>
                <p className="text-xs text-emerald-800 font-medium">
                  {effectiveFriendName}: &ldquo;Você acertou tudo! Nosso lanche da tarde foi o mais gostoso de todos!&rdquo;
                </p>
                <div className="flex justify-center gap-3 text-xs font-black text-amber-700">
                  <span>+35 Moedas 🪙</span>
                  <span>+30 XP ⭐</span>
                </div>
                <button
                  onClick={() => setActiveMiniGame(null)}
                  className="btn-game mt-2 w-full py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xs font-black shadow-md cursor-pointer"
                >
                  Concluir o Chá 🫖
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 4: Desafio da Padaria do Seu Manuel */}
      {activeMiniGame === "baker_quiz" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border-4 border-amber-500 text-center space-y-4">
            <button
              onClick={() => setActiveMiniGame(null)}
              className="absolute top-3 right-3 p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-center gap-2">
              <span className="text-3xl">👨‍🍳</span>
              <div>
                <h3 className="text-lg font-black text-amber-950">
                  Desafio dos Bolos do Seu Manuel
                </h3>
                <p className="text-xs text-amber-700 font-bold">
                  Pergunta {bakerQIndex + 1} de {BAKER_QUESTIONS.length}
                </p>
              </div>
            </div>

            {!bakerDone ? (
              <div className="space-y-4">
                <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 text-sm font-bold text-slate-800">
                  {BAKER_QUESTIONS[bakerQIndex].question}
                </div>

                <div className="space-y-2">
                  {BAKER_QUESTIONS[bakerQIndex].options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      type="button"
                      onClick={() => {
                        if (oIdx === BAKER_QUESTIONS[bakerQIndex].correctIndex) {
                          playSound("pop");
                          if (bakerQIndex + 1 < BAKER_QUESTIONS.length) {
                            setBakerQIndex((prev) => prev + 1);
                          } else {
                            setBakerDone(true);
                            playSound("fanfare");
                            try { confetti({ particleCount: 70, spread: 60 }); } catch {}
                            if (onReward) onReward(35, 25);
                          }
                        } else {
                          playSound("click");
                        }
                      }}
                      className="btn-game w-full py-3 px-4 rounded-2xl bg-white hover:bg-amber-100 border-2 border-amber-300 text-xs font-black text-slate-800 shadow-sm flex items-center justify-between cursor-pointer"
                    >
                      <span>{opt}</span>
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 space-y-2 animate-bounce-subtle">
                <div className="text-emerald-700 font-black text-sm flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Matemática da Padaria Concluída!</span>
                </div>
                <p className="text-xs text-emerald-800 font-medium">
                  Seu Manuel: &ldquo;Muito bem, mocinha! Você tem talento para os números e para a confeitaria!&rdquo;
                </p>
                <div className="flex justify-center gap-3 text-xs font-black text-amber-700">
                  <span>+35 Moedas 🪙</span>
                  <span>+25 XP ⭐</span>
                </div>
                <button
                  onClick={() => setActiveMiniGame(null)}
                  className="btn-game mt-2 w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-black shadow-md cursor-pointer"
                >
                  Voltar à Padaria 🥖
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 5: Balança do Sr. Carlos (Açougue & Mercearia) */}
      {activeMiniGame === "butcher_quiz" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border-4 border-rose-500 text-center space-y-4">
            <button
              onClick={() => setActiveMiniGame(null)}
              className="absolute top-3 right-3 p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-center gap-2">
              <span className="text-3xl">⚖️</span>
              <div>
                <h3 className="text-lg font-black text-rose-950">
                  Balança do Sr. Carlos
                </h3>
                <p className="text-xs text-rose-700 font-bold">
                  Pergunta {butcherQIndex + 1} de {BUTCHER_QUESTIONS.length}
                </p>
              </div>
            </div>

            {!butcherDone ? (
              <div className="space-y-4">
                <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-4 text-sm font-bold text-slate-800">
                  {BUTCHER_QUESTIONS[butcherQIndex].question}
                </div>

                <div className="space-y-2">
                  {BUTCHER_QUESTIONS[butcherQIndex].options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      type="button"
                      onClick={() => {
                        if (oIdx === BUTCHER_QUESTIONS[butcherQIndex].correctIndex) {
                          playSound("pop");
                          if (butcherQIndex + 1 < BUTCHER_QUESTIONS.length) {
                            setButcherQIndex((prev) => prev + 1);
                          } else {
                            setButcherDone(true);
                            playSound("fanfare");
                            try { confetti({ particleCount: 70, spread: 60 }); } catch {}
                            if (onReward) onReward(35, 25);
                          }
                        } else {
                          playSound("click");
                        }
                      }}
                      className="btn-game w-full py-3 px-4 rounded-2xl bg-white hover:bg-rose-100 border-2 border-rose-300 text-xs font-black text-slate-800 shadow-sm flex items-center justify-between cursor-pointer"
                    >
                      <span>{opt}</span>
                      <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 space-y-2 animate-bounce-subtle">
                <div className="text-emerald-700 font-black text-sm flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Pesagem & Medidas Concluídas!</span>
                </div>
                <p className="text-xs text-emerald-800 font-medium">
                  Sr. Carlos: &ldquo;Sensacional! Você já sabe medir direitinho as compras da feira!&rdquo;
                </p>
                <div className="flex justify-center gap-3 text-xs font-black text-amber-700">
                  <span>+35 Moedas 🪙</span>
                  <span>+25 XP ⭐</span>
                </div>
                <button
                  onClick={() => setActiveMiniGame(null)}
                  className="btn-game mt-2 w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black shadow-md cursor-pointer"
                >
                  Voltar ao Açougue 🥩
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 6: Organizar o Quartinho da Mamãe (Minha Casinha) */}
      {activeMiniGame === "bedroom_cleanup" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border-4 border-pink-400 text-center space-y-4">
            <button
              onClick={() => setActiveMiniGame(null)}
              className="absolute top-3 right-3 p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-center gap-2">
              <span className="text-3xl">🧹</span>
              <div>
                <h3 className="text-lg font-black text-pink-950">
                  Organizar o Quarto com a Mamãe
                </h3>
                <p className="text-xs text-pink-600 font-bold">
                  Toque em cada tarefa para deixar o quarto brilhando!
                </p>
              </div>
            </div>

            <div className="space-y-2.5 text-left">
              {BEDROOM_TASKS.map((t) => {
                const isDone = bedroomDoneTasks.includes(t.id);
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      if (!isDone) {
                        playSound("pop");
                        const next = [...bedroomDoneTasks, t.id];
                        setBedroomDoneTasks(next);
                        if (next.length === BEDROOM_TASKS.length) {
                          playSound("fanfare");
                          try { confetti({ particleCount: 75, spread: 60 }); } catch {}
                          if (onReward) onReward(30, 25);
                          if (onCompleteErrand) {
                            onCompleteErrand("errand_quarto", 25, 20);
                          }
                        }
                      }
                    }}
                    className={`w-full p-3.5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                      isDone
                        ? "bg-emerald-50 border-emerald-400 text-emerald-950"
                        : "bg-white border-pink-200 hover:border-pink-400"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{t.emoji}</span>
                      <div>
                        <div className="text-xs font-black">{t.title}</div>
                        <div className="text-[10px] text-slate-500 font-medium">{t.desc}</div>
                      </div>
                    </div>
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-pink-300" />
                    )}
                  </button>
                );
              })}
            </div>

            {bedroomDoneTasks.length === BEDROOM_TASKS.length ? (
              <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-3.5 space-y-2 animate-bounce-subtle">
                <div className="text-emerald-700 font-black text-sm flex items-center justify-center gap-1.5">
                  <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
                  <span>Quarto Super Organizado!</span>
                </div>
                <p className="text-xs text-emerald-800 font-medium">
                  Mamãe: &ldquo;Que orgulho de você, meu amor! O quarto ficou cheiroso e impecável!&rdquo;
                </p>
                <div className="flex justify-center gap-3 text-xs font-black text-amber-700">
                  <span>+30 Moedas 🪙</span>
                  <span>+25 XP ⭐</span>
                </div>
                <button
                  onClick={() => setActiveMiniGame(null)}
                  className="btn-game mt-2 w-full py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xs font-black shadow-md cursor-pointer"
                >
                  Concluir Arrumação ❤️
                </button>
              </div>
            ) : (
              <p className="text-xs text-slate-400 font-medium">
                Conclua as 3 tarefas para receber o elogio da Mamãe e moedinhas.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
