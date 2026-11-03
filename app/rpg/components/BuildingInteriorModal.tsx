"use client";

import React, { useState } from "react";
import { CapturedPokemon, StudentYear } from "../rpgTypes";
import { playSound } from "@/lib/soundEffects";
import confetti from "canvas-confetti";
import {
  X,
  Bed,
  BookOpen,
  Sparkles,
  Tv,
  Heart,
  ShoppingBag,
  Share2,
  GraduationCap,
  DoorOpen,
  Gift,
  Coffee,
  HelpCircle,
  CheckCircle2,
  Coins,
  Zap,
  Shield,
  ArrowRight,
  Laptop,
  Check,
  AlertCircle,
} from "lucide-react";

export type BuildingType =
  | "family_house"
  | "pokemart"
  | "science_lab"
  | "math_academy"
  | "portuguese_lib"
  | "english_tower"
  | "rocket_hideout";

interface BuildingInteriorModalProps {
  isOpen: boolean;
  onClose: () => void;
  buildingType: BuildingType;
  buildingName: string;
  studentName: string;
  currentYear: StudentYear;
  pokemonList: CapturedPokemon[];
  onHealAllPokemon: () => void;
  coins: number;
  onAddCoins: (amount: number) => void;
  onAddXp: (amount: number) => void;
  onAddPotion?: () => void;
  onOpenCustomization: () => void;
  onOpenMarket: () => void;
  onOpenGym: (gymId: "math" | "science" | "portuguese" | "english") => void;
  onOpenTrade: () => void;
  onOpenPokedex: () => void;
  onOpenRescue: () => void;
}

// Homework Mini-Quiz Bank for Casa da Família tailored by school year (BNCC)
interface HomeworkQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  subject: string;
}

const HOMEWORK_BANK: Record<StudentYear, HomeworkQuestion[]> = {
  4: [
    {
      subject: "Matemática",
      question: "Qual é o resultado da multiplicação: 8 × 7?",
      options: ["48", "54", "56", "64"],
      correctIndex: 2,
      explanation: "Muito bem! 8 × 7 = 56. A tabuada do 8 foi dominada!",
    },
    {
      subject: "Português",
      question: "Na oração 'A casa da família é acolhedora', qual palavra é um adjetivo?",
      options: ["casa", "família", "acolhedora", "é"],
      correctIndex: 2,
      explanation: "Correto! 'Acolhedora' qualifica a casa, sendo portanto um adjetivo!",
    },
    {
      subject: "Ciências",
      question: "Qual é o processo em que a água líquida se transforma em vapor pelo calor?",
      options: ["Condensação", "Evaporação", "Precipitação", "Solidificação"],
      correctIndex: 1,
      explanation: "Exato! Com o calor do Sol, a água evapora subindo para formar as nuvens!",
    },
    {
      subject: "Matemática",
      question: "Se você comprar 3 Pokébolas de 20 moedas cada, quanto gastará no total?",
      options: ["50 moedas", "60 moedas", "70 moedas", "80 moedas"],
      correctIndex: 1,
      explanation: "Isso aí! 3 × 20 = 60 moedas. Cálculo de compras perfeito!",
    },
    {
      subject: "Português",
      question: "Qual das palavras abaixo possui um encontro consonantal?",
      options: ["Prato", "Bola", "Cama", "Mala"],
      correctIndex: 0,
      explanation: "Certo! O encontro 'PR' na palavra 'Prato' é um encontro consonantal!",
    },
  ],
  2: [
    {
      subject: "Matemática",
      question: "Quanto é 15 + 15?",
      options: ["20", "25", "30", "35"],
      correctIndex: 2,
      explanation: "Parabéns! 15 + 15 = 30. Conta certinha!",
    },
    {
      subject: "Português",
      question: "Quantas sílabas tem a palavra 'PI-KA-CHU'?",
      options: ["1 sílaba", "2 sílabas", "3 sílabas", "4 sílabas"],
      correctIndex: 2,
      explanation: "Excelente! Pi-ka-chu tem 3 sílabas!",
    },
    {
      subject: "Ciências",
      question: "Qual destes animais vive na água e respira por brânquias?",
      options: ["Gato", "Peixe", "Cachorro", "Pássaro"],
      correctIndex: 1,
      explanation: "Muito bem! Os peixes vivem na água e respiram por brânquias!",
    },
    {
      subject: "Matemática",
      question: "Se você tem 20 doces e come 5, quantos sobram?",
      options: ["10", "12", "15", "18"],
      correctIndex: 2,
      explanation: "Correto! 20 - 5 = 15 doces!",
    },
    {
      subject: "Português",
      question: "Qual palavra rima com 'BALÃO'?",
      options: ["Casa", "Coração", "Árvore", "Flor"],
      correctIndex: 1,
      explanation: "Isso mesmo! 'Balão' rima com 'Coração'!",
    },
  ],
};

export const BuildingInteriorModal: React.FC<BuildingInteriorModalProps> = ({
  isOpen,
  onClose,
  buildingType,
  buildingName,
  studentName,
  currentYear,
  pokemonList,
  onHealAllPokemon,
  coins,
  onAddCoins,
  onAddXp,
  onAddPotion,
  onOpenCustomization,
  onOpenMarket,
  onOpenGym,
  onOpenTrade,
  onOpenPokedex,
  onOpenRescue,
}) => {
  const [activeTab, setActiveTab] = useState<"overview" | "homework" | "tv" | "facts">("overview");
  const [isSleeping, setIsSleeping] = useState(false);
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  // Homework state
  const [homeworkIndex, setHomeworkIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [homeworkScore, setHomeworkScore] = useState(0);
  const [homeworkCompleted, setHomeworkCompleted] = useState(false);

  // TV Channel
  const [tvChannel, setTvChannel] = useState<1 | 2 | 3>(1);

  // Daily snack claim
  const [claimedSnack, setClaimedSnack] = useState(false);

  if (!isOpen) return null;

  // Handle sleeping in Sister's Bed (Healing)
  const handleSleep = () => {
    setIsSleeping(true);
    playSound("fanfare");
    setTimeout(() => {
      onHealAllPokemon();
      setIsSleeping(false);
      setNoticeMessage("💤 Que soninho gostoso! Todos os seus Pokémon recuperaram 100% da energia!");
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.6 } });
    }, 1400);
  };

  // Handle Homework Answer
  const questions = HOMEWORK_BANK[currentYear] || HOMEWORK_BANK[4];
  const currentQ = questions[homeworkIndex % questions.length];

  const handleSubmitHomework = () => {
    if (selectedAnswer === null) return;
    setIsAnswerSubmitted(true);
    const isCorrect = selectedAnswer === currentQ.correctIndex;

    if (isCorrect) {
      playSound("success");
      setHomeworkScore((s) => s + 1);
      confetti({ particleCount: 25, spread: 50, origin: { y: 0.5 } });
    } else {
      playSound("pop");
    }
  };

  const handleNextHomework = () => {
    if (homeworkIndex >= 2) {
      // Completed a 3-question set
      setHomeworkCompleted(true);
      playSound("fanfare");
      onAddCoins(60);
      onAddXp(120);
      setNoticeMessage("🎉 Parabéns! Dever de casa finalizado com sucesso! Você ganhou +60 Moedas 🪙 e +120 EXP!");
    } else {
      setHomeworkIndex((i) => i + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    }
  };

  const handleClaimSnack = () => {
    if (claimedSnack) return;
    setClaimedSnack(true);
    playSound("star");
    if (onAddPotion) onAddPotion();
    onAddCoins(25);
    setNoticeMessage("🥪 Mamãe Renata te deu um sanduíche quentinho, suco natural e +1 Poção de presente!");
    confetti({ particleCount: 25, spread: 50, origin: { y: 0.5 } });
  };

  // Render Theme & Accent based on building
  const getThemeInfo = () => {
    switch (buildingType) {
      case "family_house":
        return {
          icon: "🏡",
          subtitle: "Lar do Papai Carlos, Mamãe Renata e as filhas",
          bgGradient: "from-amber-950/70 via-stone-900 to-amber-950/80",
          borderCol: "border-amber-600/60",
          tag: "bg-amber-600 text-white",
        };
      case "pokemart":
        return {
          icon: "🏪",
          subtitle: "PokéMart da Vila • Suprimentos e Roupas",
          bgGradient: "from-blue-950/70 via-slate-900 to-blue-950/80",
          borderCol: "border-blue-500/60",
          tag: "bg-blue-600 text-white",
        };
      case "science_lab":
        return {
          icon: "🏥",
          subtitle: "Centro Pokémon & Laboratório de Ciências",
          bgGradient: "from-rose-950/70 via-slate-900 to-cyan-950/80",
          borderCol: "border-rose-500/60",
          tag: "bg-rose-600 text-white",
        };
      case "math_academy":
        return {
          icon: "📐",
          subtitle: "Cidade dos Números • Academia de Matemática (Geração 1)",
          bgGradient: "from-amber-950/70 via-stone-900 to-yellow-950/80",
          borderCol: "border-yellow-600/60",
          tag: "bg-yellow-600 text-stone-950",
        };
      case "portuguese_lib":
        return {
          icon: "📖",
          subtitle: "Grande Biblioteca Encantada • Oficina do Jovem Autor",
          bgGradient: "from-emerald-950/70 via-stone-900 to-teal-950/80",
          borderCol: "border-emerald-600/60",
          tag: "bg-emerald-600 text-white",
        };
      case "english_tower":
        return {
          icon: "⚡",
          subtitle: "Porto Global & English Tech Hub (Livro 'i Grow')",
          bgGradient: "from-indigo-950/70 via-slate-900 to-cyan-950/80",
          borderCol: "border-indigo-500/60",
          tag: "bg-indigo-600 text-white",
        };
      case "rocket_hideout":
        return {
          icon: "🚀",
          subtitle: "Esconderijo Secreto da Equipe Rocket",
          bgGradient: "from-red-950/80 via-neutral-900 to-black",
          borderCol: "border-red-600/70",
          tag: "bg-red-600 text-white",
        };
    }
  };

  const theme = getThemeInfo();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Sleeping overlay */}
      {isSleeping && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/90 text-white animate-pulse">
          <div className="text-7xl mb-4">💤</div>
          <h2 className="text-2xl font-bold tracking-wide text-amber-300">Descansando na caminha...</h2>
          <p className="text-sm text-stone-300 mt-2">Restaurando a energia de todos os Pokémon...</p>
        </div>
      )}

      {/* Main GBA Building Interior Container */}
      <div
        className={`relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl border-4 ${theme.borderCol} bg-gradient-to-b ${theme.bgGradient} text-white shadow-2xl overflow-hidden`}
        style={{
          boxShadow: "0 0 30px rgba(0,0,0,0.8), inset 0 0 20px rgba(255,255,255,0.05)",
        }}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-black/50 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{theme.icon}</span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-wide text-amber-200">
                  {buildingName}
                </h1>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${theme.tag}`}>
                  Interior
                </span>
              </div>
              <p className="text-xs text-stone-300">{theme.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 border border-amber-400/30 rounded-full text-xs font-bold text-amber-300">
              <Coins className="w-4 h-4 text-amber-400" />
              <span>{coins} Moedas</span>
            </div>
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600/80 hover:bg-red-600 text-white text-xs font-bold rounded-lg border border-red-400 transition-all shadow-md active:scale-95"
            >
              <DoorOpen className="w-4 h-4" />
              <span>Sair da Casa</span>
            </button>
          </div>
        </div>

        {/* Temporary Notice Banner */}
        {noticeMessage && (
          <div className="px-4 py-2.5 bg-emerald-600/90 text-white text-xs sm:text-sm font-semibold flex items-center justify-between gap-2 border-b border-emerald-400/40 animate-slideDown">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
              <span>{noticeMessage}</span>
            </div>
            <button
              onClick={() => setNoticeMessage(null)}
              className="text-white hover:text-stone-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Content Body: Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* ========================================================= */}
          {/* 1. CASA DA FAMÍLIA (Lar do Papai Carlos e Mamãe Renata) */}
          {/* ========================================================= */}
          {buildingType === "family_house" && (
            <div className="space-y-6">
              {/* Navigation Tabs for the House */}
              <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    activeTab === "overview"
                      ? "bg-amber-500 text-stone-950 shadow-md"
                      : "bg-white/5 text-stone-300 hover:bg-white/10"
                  }`}
                >
                  🏡 Cômodos da Casa
                </button>
                <button
                  onClick={() => setActiveTab("homework")}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === "homework"
                      ? "bg-amber-500 text-stone-950 shadow-md"
                      : "bg-white/5 text-stone-300 hover:bg-white/10"
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Dever de Casa do Dia</span>
                  {homeworkCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 ml-1" />}
                </button>
                <button
                  onClick={() => setActiveTab("tv")}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === "tv"
                      ? "bg-amber-500 text-stone-950 shadow-md"
                      : "bg-white/5 text-stone-300 hover:bg-white/10"
                  }`}
                >
                  <Tv className="w-4 h-4" />
                  <span>TV da Sala</span>
                </button>
              </div>

              {/* TAB 1: OVERVIEW & ROOM STATIONS */}
              {activeTab === "overview" && (
                <div className="space-y-5">
                  {/* Family Greeting Banner */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-amber-900/40 to-stone-900/60 border border-amber-600/30 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-3xl shadow-inner shrink-0">
                      👨‍👩‍👧‍👧
                    </div>
                    <div>
                      <h3 className="font-bold text-amber-200 text-sm sm:text-base">
                        Bem-vinda de volta ao lar, {studentName}!
                      </h3>
                      <p className="text-xs text-stone-300 mt-0.5 leading-relaxed">
                        Papai Carlos e Mamãe Renata adoram quando você e sua irmã voltam para casa. Aqui
                        você pode descansar na caminha para recuperar seus Pokémon, fazer suas tarefas na
                        escrivaninha e trocar de roupa no espelho!
                      </p>
                    </div>
                  </div>

                  {/* Grid of Interactive Stations in the House */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Station 1: Camas das Irmãs */}
                    <div className="p-4 rounded-xl bg-stone-900/80 border border-amber-700/40 hover:border-amber-400 transition-all flex flex-col justify-between group">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="p-2 rounded-lg bg-rose-500/20 text-rose-300">
                              <Bed className="w-5 h-5" />
                            </span>
                            <h4 className="font-bold text-stone-100 text-sm">Cama das Irmãs</h4>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold">
                            Cura 100% Grátis
                          </span>
                        </div>
                        <p className="text-xs text-stone-400">
                          Tire uma soneca gostosa para restaurar toda a energia e curar os status de todos os
                          seus Pokémon da bolsa!
                        </p>
                      </div>
                      <button
                        onClick={handleSleep}
                        className="mt-4 w-full py-2.5 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-bold rounded-lg border border-rose-400 shadow transition-all active:scale-95 flex items-center justify-center gap-2"
                      >
                        <Heart className="w-4 h-4 fill-white" />
                        <span>Dormir e Curar Pokémon</span>
                      </button>
                    </div>

                    {/* Station 2: Escrivaninha de Estudos */}
                    <div className="p-4 rounded-xl bg-stone-900/80 border border-amber-700/40 hover:border-amber-400 transition-all flex flex-col justify-between group">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="p-2 rounded-lg bg-blue-500/20 text-blue-300">
                              <BookOpen className="w-5 h-5" />
                            </span>
                            <h4 className="font-bold text-stone-100 text-sm">Escrivaninha de Estudos</h4>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold">
                            +60 Moedas 🪙
                          </span>
                        </div>
                        <p className="text-xs text-stone-400">
                          Abra seus cadernos e faça o dever de casa escolar deixado pelo Papai Carlos para
                          ganhar mesada em moedas e EXP!
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveTab("homework")}
                        className="mt-4 w-full py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-bold rounded-lg border border-blue-400 shadow transition-all active:scale-95 flex items-center justify-center gap-2"
                      >
                        <GraduationCap className="w-4 h-4" />
                        <span>Fazer Dever de Casa</span>
                      </button>
                    </div>

                    {/* Station 3: Guarda-Roupa & Espelho Mágico */}
                    <div className="p-4 rounded-xl bg-stone-900/80 border border-amber-700/40 hover:border-amber-400 transition-all flex flex-col justify-between group">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="p-2 rounded-lg bg-purple-500/20 text-purple-300">
                              <Sparkles className="w-5 h-5" />
                            </span>
                            <h4 className="font-bold text-stone-100 text-sm">Guarda-Roupa & Espelho</h4>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold">
                            Customizar
                          </span>
                        </div>
                        <p className="text-xs text-stone-400">
                          Escolha novos penteados, cores de cabelo, laços, vestidos, sapatos e mochilas no
                          espelho mágico do quarto!
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          onClose();
                          onOpenCustomization();
                        }}
                        className="mt-4 w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold rounded-lg border border-purple-400 shadow transition-all active:scale-95 flex items-center justify-center gap-2"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>Abrir Guarda-Roupa</span>
                      </button>
                    </div>

                    {/* Station 4: Cozinha da Mamãe Renata */}
                    <div className="p-4 rounded-xl bg-stone-900/80 border border-amber-700/40 hover:border-amber-400 transition-all flex flex-col justify-between group">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="p-2 rounded-lg bg-amber-500/20 text-amber-300">
                              <Coffee className="w-5 h-5" />
                            </span>
                            <h4 className="font-bold text-stone-100 text-sm">Cozinha da Mamãe Renata</h4>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold">
                            Lanche Quentinho
                          </span>
                        </div>
                        <p className="text-xs text-stone-400">
                          Mamãe Renata preparou um lanche saudável para a sua jornada. Fale com ela para ganhar
                          um mimo especial!
                        </p>
                      </div>
                      <button
                        onClick={handleClaimSnack}
                        disabled={claimedSnack}
                        className={`mt-4 w-full py-2.5 text-xs font-bold rounded-lg border shadow transition-all flex items-center justify-center gap-2 ${
                          claimedSnack
                            ? "bg-stone-800 text-stone-500 border-stone-700 cursor-not-allowed"
                            : "bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-stone-950 border-amber-400 active:scale-95"
                        }`}
                      >
                        <Gift className="w-4 h-4" />
                        <span>{claimedSnack ? "Lanche Já Coletado Hoje" : "Pedir Lanche para a Mamãe"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: DEVER DE CASA DO DIA (BNCC) */}
              {activeTab === "homework" && (
                <div className="p-5 rounded-2xl bg-stone-900/90 border border-amber-500/40 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-amber-400" />
                      <h3 className="font-bold text-amber-200 text-sm sm:text-base">
                        Caderno Escolar • {studentName} ({currentYear}º Ano)
                      </h3>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-400/30">
                      Questão {homeworkIndex + 1} de 3
                    </span>
                  </div>

                  {!homeworkCompleted ? (
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                          Matéria: {currentQ.subject}
                        </span>
                        <p className="text-sm sm:text-base font-semibold text-stone-100 mt-2">
                          {currentQ.question}
                        </p>
                      </div>

                      {/* Options */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {currentQ.options.map((opt, idx) => {
                          const isSelected = selectedAnswer === idx;
                          const isCorrect = idx === currentQ.correctIndex;

                          let btnStyle = "bg-stone-800/80 border-white/10 text-stone-200 hover:border-amber-400";
                          if (isSelected) {
                            btnStyle = "bg-amber-600/40 border-amber-400 text-amber-200";
                          }
                          if (isAnswerSubmitted) {
                            if (isCorrect) {
                              btnStyle = "bg-emerald-600/50 border-emerald-400 text-emerald-100";
                            } else if (isSelected) {
                              btnStyle = "bg-red-600/50 border-red-400 text-red-100";
                            }
                          }

                          return (
                            <button
                              key={idx}
                              onClick={() => {
                                if (!isAnswerSubmitted) setSelectedAnswer(idx);
                              }}
                              disabled={isAnswerSubmitted}
                              className={`p-3 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${btnStyle}`}
                            >
                              <span>
                                <span className="font-mono text-stone-400 mr-2">
                                  {["A", "B", "C", "D"][idx]}.
                                </span>
                                {opt}
                              </span>
                              {isAnswerSubmitted && isCorrect && (
                                <Check className="w-4 h-4 text-emerald-300 shrink-0" />
                              )}
                              {isAnswerSubmitted && isSelected && !isCorrect && (
                                <X className="w-4 h-4 text-red-300 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation if submitted */}
                      {isAnswerSubmitted && (
                        <div
                          className={`p-3.5 rounded-xl text-xs sm:text-sm font-medium border flex items-start gap-2.5 ${
                            selectedAnswer === currentQ.correctIndex
                              ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-200"
                              : "bg-amber-950/60 border-amber-500/40 text-amber-200"
                          }`}
                        >
                          <Sparkles className="w-4 h-4 mt-0.5 shrink-0 text-amber-400" />
                          <span>{currentQ.explanation}</span>
                        </div>
                      )}

                      {/* Action buttons */}
                      <div className="flex justify-end pt-2">
                        {!isAnswerSubmitted ? (
                          <button
                            onClick={handleSubmitHomework}
                            disabled={selectedAnswer === null}
                            className={`px-5 py-2.5 text-xs font-bold rounded-xl border shadow transition-all ${
                              selectedAnswer === null
                                ? "bg-stone-800 text-stone-500 border-stone-700 cursor-not-allowed"
                                : "bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 border-amber-300 active:scale-95"
                            }`}
                          >
                            Confirmar Resposta
                          </button>
                        ) : (
                          <button
                            onClick={handleNextHomework}
                            className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-xl border border-emerald-400 shadow transition-all active:scale-95 flex items-center gap-1.5"
                          >
                            <span>{homeworkIndex >= 2 ? "Finalizar Dever" : "Próxima Questão"}</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 text-center space-y-4">
                      <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-3xl">
                        🏆
                      </div>
                      <h4 className="text-lg font-bold text-amber-300">
                        Parabéns! Você completou o dever de casa!
                      </h4>
                      <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto">
                        Papai Carlos e Mamãe Renata conferiram suas respostas e deixaram sua mesada de{" "}
                        <strong className="text-amber-300">+60 Moedas 🪙</strong> e{" "}
                        <strong className="text-cyan-300">+120 EXP</strong> na mesa!
                      </p>
                      <button
                        onClick={() => {
                          setHomeworkCompleted(false);
                          setHomeworkIndex(0);
                          setSelectedAnswer(null);
                          setIsAnswerSubmitted(false);
                          setActiveTab("overview");
                        }}
                        className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl transition-all shadow"
                      >
                        Voltar aos Cômodos da Casa
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: TV DA SALA */}
              {activeTab === "tv" && (
                <div className="p-5 rounded-2xl bg-stone-900/90 border border-amber-500/40 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <Tv className="w-5 h-5 text-amber-400" />
                      <h3 className="font-bold text-amber-200 text-sm">TV da Família & Console Retro</h3>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setTvChannel(1)}
                        className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                          tvChannel === 1 ? "bg-amber-500 text-stone-950" : "bg-black/40 text-stone-400"
                        }`}
                      >
                        Canal 1
                      </button>
                      <button
                        onClick={() => setTvChannel(2)}
                        className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                          tvChannel === 2 ? "bg-amber-500 text-stone-950" : "bg-black/40 text-stone-400"
                        }`}
                      >
                        Canal 2
                      </button>
                      <button
                        onClick={() => setTvChannel(3)}
                        className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                          tvChannel === 3 ? "bg-amber-500 text-stone-950" : "bg-black/40 text-stone-400"
                        }`}
                      >
                        Canal 3
                      </button>
                    </div>
                  </div>

                  {/* TV Screen View */}
                  <div className="p-4 rounded-xl bg-black/70 border-2 border-stone-700 font-mono text-xs sm:text-sm text-green-400 space-y-2 shadow-inner">
                    {tvChannel === 1 && (
                      <div>
                        <p className="text-amber-300 font-bold mb-1">
                          📺 [CANAL 1: DICAS DE TREINADORES DA VILA]
                        </p>
                        <p>
                          "Atenção treinadoras! Pokémon aquáticos como Squirtle, Psyduck e Poliwag adoram
                          ficar na água e nas poças na grama. Lembrem-se: Água vence Fogo, Fogo vence Planta,
                          e Planta vence Água!"
                        </p>
                      </div>
                    )}
                    {tvChannel === 2 && (
                      <div>
                        <p className="text-cyan-300 font-bold mb-1">
                          📺 [CANAL 2: NOTICIÁRIO DAS CIDADES VIZINHAS]
                        </p>
                        <p>
                          "Últimas notícias: A Equipe Rocket montou bloqueios nas passagens para as quatro
                          grandes cidades de Kanto! Treinadoras corajosas devem responder às perguntas
                          educativas para liberar as pontes e resgatar os Pokémon!"
                        </p>
                      </div>
                    )}
                    {tvChannel === 3 && (
                      <div>
                        <p className="text-rose-300 font-bold mb-1">
                          📺 [CANAL 3: RECADO DOS PAIS GRAVADO NA TV]
                        </p>
                        <p>
                          "Para Cecília e Bianca: Papai Carlos e Mamãe Renata amam muito vocês! Lembrem de
                          estudar com alegria, fazer os deveres de casa e trocar Pokémon pelo Cabo Link no
                          Centro Pokémon!"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* 2. POKÉMART DA VILA (Loja de Suprimentos & Roupas) */}
          {/* ========================================================= */}
          {buildingType === "pokemart" && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-blue-900/30 border border-blue-500/40 flex items-center gap-4">
                <span className="text-4xl">🏪</span>
                <div>
                  <h3 className="font-bold text-blue-200 text-sm sm:text-base">
                    Bem-vinda ao PokéMart da Vila do Saber!
                  </h3>
                  <p className="text-xs text-stone-300 mt-0.5">
                    Aqui você encontra Pokébolas para suas capturas na grama alta, Poções curativas, Pedras
                    de Evolução raras e roupas estilosas para personalizar sua personagem!
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-stone-900/80 border border-blue-700/40 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <ShoppingBag className="w-5 h-5 text-blue-400" />
                      <h4 className="font-bold text-stone-100 text-sm">Balcão da Loja</h4>
                    </div>
                    <p className="text-xs text-stone-400">
                      Abra o catálogo completo para comprar Pokébolas, Poções, Antídotos e Pedras Evolutivas
                      com suas moedas de ouro!
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenMarket();
                    }}
                    className="mt-4 w-full py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-bold rounded-lg border border-blue-400 shadow transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Abrir Loja de Suprimentos</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-stone-900/80 border border-blue-700/40 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-5 h-5 text-amber-400" />
                      <h4 className="font-bold text-stone-100 text-sm">Vitrine de Pedras Elementais</h4>
                    </div>
                    <p className="text-xs text-stone-400">
                      Conheça o segredo das Pedras de Água, Fogo, Trovão, Folha e Lua para evoluir Eevee,
                      Pikachu, Vulpix e muitos outros!
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenMarket();
                    }}
                    className="mt-4 w-full py-2.5 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-stone-950 text-xs font-bold rounded-lg border border-amber-400 shadow transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Ver Pedras Evolutivas</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 3. CENTRO POKÉMON & LAB DE CIÊNCIAS (Cerulean City) */}
          {/* ========================================================= */}
          {buildingType === "science_lab" && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-rose-900/30 border border-rose-500/40 flex items-center gap-4">
                <span className="text-4xl">🏥</span>
                <div>
                  <h3 className="font-bold text-rose-200 text-sm sm:text-base">
                    Centro Pokémon & Laboratório Científico
                  </h3>
                  <p className="text-xs text-stone-300 mt-0.5">
                    A Enfermeira Joy cuida com muito carinho dos seus Pokémon. No terminal ao lado, você pode
                    trocar Pokémon pelo Cabo Link com sua irmã ou acessar o PC de Kanto!
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-stone-900/80 border border-rose-700/40 flex flex-col justify-between">
                  <div>
                    <Heart className="w-6 h-6 text-rose-400 mb-2" />
                    <h4 className="font-bold text-stone-100 text-sm">Enfermeira Joy</h4>
                    <p className="text-xs text-stone-400 mt-1">
                      Cure todos os seus Pokémon na máquina oficial do Centro Pokémon!
                    </p>
                  </div>
                  <button
                    onClick={handleSleep}
                    className="mt-4 w-full py-2 bg-gradient-to-r from-rose-600 to-pink-600 text-white text-xs font-bold rounded-lg border border-rose-400 shadow transition-all active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <Heart className="w-4 h-4" />
                    <span>Curar no Balcão</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-stone-900/80 border border-cyan-700/40 flex flex-col justify-between">
                  <div>
                    <Share2 className="w-6 h-6 text-cyan-400 mb-2" />
                    <h4 className="font-bold text-stone-100 text-sm">Máquina do Cabo Link</h4>
                    <p className="text-xs text-stone-400 mt-1">
                      Troque Pokémon entre os tablets de Cecília e Bianca e ative evoluções por troca!
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenTrade();
                    }}
                    className="mt-4 w-full py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-xs font-bold rounded-lg border border-cyan-400 shadow transition-all active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Troca entre Irmãs</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-stone-900/80 border border-emerald-700/40 flex flex-col justify-between">
                  <div>
                    <Laptop className="w-6 h-6 text-emerald-400 mb-2" />
                    <h4 className="font-bold text-stone-100 text-sm">Ginásio de Ciências</h4>
                    <p className="text-xs text-stone-400 mt-1">
                      Desafie a Dra. Clara para conquistar a Insígnia da Cascata e aprender a Nadar (Surf)!
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenGym("science");
                    }}
                    className="mt-4 w-full py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold rounded-lg border border-emerald-400 shadow transition-all active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <Shield className="w-4 h-4" />
                    <span>Desafiar Ginásio</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 4. ACADEMIA DE MATEMÁTICA (Pewter City) */}
          {/* ========================================================= */}
          {buildingType === "math_academy" && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-yellow-900/30 border border-yellow-500/40 flex items-center gap-4">
                <span className="text-4xl">📐</span>
                <div>
                  <h3 className="font-bold text-yellow-200 text-sm sm:text-base">
                    Academia de Matemática • Pewter City
                  </h3>
                  <p className="text-xs text-stone-300 mt-0.5">
                    O Mestre Pitágoras ensina a arte dos números, formas geométricas e lógica. Supere os
                    desafios para quebrar rochas rachadas no mapa!
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-stone-900/80 border border-yellow-700/40 flex flex-col justify-between">
                  <div>
                    <Shield className="w-6 h-6 text-yellow-400 mb-2" />
                    <h4 className="font-bold text-stone-100 text-sm">Desafio do Ginásio da Rocha</h4>
                    <p className="text-xs text-stone-400 mt-1">
                      Conquiste a Insígnia da Rocha e aprenda a habilidade Quebrar Rochas (Rock Smash) para
                      abrir atalhos e coletar moedas escondidas!
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenGym("math");
                    }}
                    className="mt-4 w-full py-2.5 bg-gradient-to-r from-yellow-500 to-amber-500 text-stone-950 text-xs font-bold rounded-lg border border-yellow-300 shadow transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Shield className="w-4 h-4" />
                    <span>Desafiar Mestre Pitágoras</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-stone-900/80 border border-yellow-700/40 flex flex-col justify-between">
                  <div>
                    <GraduationCap className="w-6 h-6 text-amber-400 mb-2" />
                    <h4 className="font-bold text-stone-100 text-sm">Quadro-Negro de Treino Rápido</h4>
                    <p className="text-xs text-stone-400 mt-1">
                      Cálculos mentais e tabuadas para turbinar o raciocínio e ganhar moedas de treino!
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onAddCoins(20);
                      onAddXp(40);
                      playSound("success");
                      setNoticeMessage("🧮 Você treinou tabuada no quadro e ganhou +20 Moedas!");
                    }}
                    className="mt-4 w-full py-2.5 bg-stone-800 hover:bg-stone-700 text-yellow-300 text-xs font-bold rounded-lg border border-yellow-500/40 shadow transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Resolver Cálculo Rápido (+20 🪙)</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 5. BIBLIOTECA DE PORTUGUÊS (Celadon City) */}
          {/* ========================================================= */}
          {buildingType === "portuguese_lib" && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-emerald-900/30 border border-emerald-500/40 flex items-center gap-4">
                <span className="text-4xl">📖</span>
                <div>
                  <h3 className="font-bold text-emerald-200 text-sm sm:text-base">
                    Biblioteca de Português • Celadon City
                  </h3>
                  <p className="text-xs text-stone-300 mt-0.5">
                    Estantes cheias de fábulas, poemas, regras gramaticais e histórias encantadas. Aprenda
                    com a Professora Sofia para cortar arbustos que bloqueiam seu caminho!
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-stone-900/80 border border-emerald-700/40 flex flex-col justify-between">
                  <div>
                    <Shield className="w-6 h-6 text-emerald-400 mb-2" />
                    <h4 className="font-bold text-stone-100 text-sm">Desafio do Ginásio do Arco-Íris</h4>
                    <p className="text-xs text-stone-400 mt-1">
                      Conquiste a Insígnia do Arco-Íris e aprenda a habilidade Cortar Arbustos (Cut) para
                      acessar passagens secretas na floresta!
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenGym("portuguese");
                    }}
                    className="mt-4 w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold rounded-lg border border-emerald-400 shadow transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Shield className="w-4 h-4" />
                    <span>Desafiar Professora Sofia</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-stone-900/80 border border-emerald-700/40 flex flex-col justify-between">
                  <div>
                    <BookOpen className="w-6 h-6 text-teal-400 mb-2" />
                    <h4 className="font-bold text-stone-100 text-sm">Leitura de Fábulas Encantadas</h4>
                    <p className="text-xs text-stone-400 mt-1">
                      Descubra a história do leão e do ratinho e aprenda interpretação de texto!
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onAddXp(60);
                      playSound("success");
                      setNoticeMessage("📚 Você leu uma fábula inspiradora e ganhou +60 EXP!");
                    }}
                    className="mt-4 w-full py-2.5 bg-stone-800 hover:bg-stone-700 text-emerald-300 text-xs font-bold rounded-lg border border-emerald-500/40 shadow transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Ler Fábula (+60 EXP)</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 6. TORRE TECH DE INGLÊS (Vermilion City) */}
          {/* ========================================================= */}
          {buildingType === "english_tower" && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-indigo-900/30 border border-indigo-500/40 flex items-center gap-4">
                <span className="text-4xl">⚡</span>
                <div>
                  <h3 className="font-bold text-indigo-200 text-sm sm:text-base">
                    Torre Tech de Inglês • Vermilion City
                  </h3>
                  <p className="text-xs text-stone-300 mt-0.5">
                    Centro de tecnologia, robótica e linguagem internacional. Aprenda vocabulário em inglês
                    e conquiste a habilidade Flash para iluminar áreas escuras!
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-stone-900/80 border border-indigo-700/40 flex flex-col justify-between">
                  <div>
                    <Zap className="w-6 h-6 text-indigo-400 mb-2" />
                    <h4 className="font-bold text-stone-100 text-sm">Desafio do Ginásio do Trovão</h4>
                    <p className="text-xs text-stone-400 mt-1">
                      Conquiste a Insígnia do Trovão e aprenda a habilidade Flash / Lanterna para explorar
                      lugares sem luz!
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenGym("english");
                    }}
                    className="mt-4 w-full py-2.5 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white text-xs font-bold rounded-lg border border-indigo-400 shadow transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Desafiar Líder Cyber</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-stone-900/80 border border-indigo-700/40 flex flex-col justify-between">
                  <div>
                    <Laptop className="w-6 h-6 text-cyan-400 mb-2" />
                    <h4 className="font-bold text-stone-100 text-sm">Robo-Buddy (Vocabulário)</h4>
                    <p className="text-xs text-stone-400 mt-1">
                      Pratique palavras em inglês: Colors (Red, Blue, Green), Animals e Numbers!
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onAddCoins(25);
                      onAddXp(50);
                      playSound("success");
                      setNoticeMessage("🤖 Robo-Buddy: 'Awesome! You learned 5 new English words!' (+25 🪙)");
                    }}
                    className="mt-4 w-full py-2.5 bg-stone-800 hover:bg-stone-700 text-cyan-300 text-xs font-bold rounded-lg border border-indigo-500/40 shadow transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Praticar Inglês (+25 🪙)</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 7. ESCONDERIJO DA EQUIPE ROCKET */}
          {/* ========================================================= */}
          {buildingType === "rocket_hideout" && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-red-950/40 border border-red-600/50 flex items-center gap-4">
                <span className="text-4xl">🚀</span>
                <div>
                  <h3 className="font-bold text-red-300 text-sm sm:text-base">
                    Esconderijo Secreto da Equipe Rocket
                  </h3>
                  <p className="text-xs text-stone-300 mt-0.5">
                    Covil subterrâneo onde os capangas trancaram Pokémon sequestrados! Resolva os enigmas
                    para abrir as jaulas e resgatá-los!
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-stone-900/90 border border-red-700/40 flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-red-600/20 border border-red-500 flex items-center justify-center text-3xl">
                  🚨
                </div>
                <div>
                  <h4 className="font-bold text-stone-100 text-base">Jaulas de Resgate Rocket</h4>
                  <p className="text-xs text-stone-400 max-w-md mt-1">
                    Derrote as travas digitais da Equipe Rocket com respostas corretas de Ciências e
                    Matemática para devolver os Pokémon aos seus donos!
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onOpenRescue();
                  }}
                  className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold rounded-xl border border-red-400 shadow transition-all active:scale-95 flex items-center gap-2"
                >
                  <Shield className="w-4 h-4" />
                  <span>Iniciar Missão de Resgate</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer with Exit Button */}
        <div className="px-5 py-3.5 bg-black/60 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs text-stone-400 flex items-center gap-1.5">
            <span>🚪 Pise no tapete de entrada ou clique em Sair para voltar à Vila.</span>
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold rounded-xl border border-white/20 transition-all active:scale-95 flex items-center gap-2"
          >
            <DoorOpen className="w-4 h-4" />
            <span>Sair para a Vila</span>
          </button>
        </div>
      </div>
    </div>
  );
};
