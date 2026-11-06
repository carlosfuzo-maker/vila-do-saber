"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { GymBadges, ExplorerSkills } from "../rpgTypes";
import { playSound } from "@/lib/soundEffects";
import {
  Trophy,
  Award,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  BookOpen,
  Compass,
  X,
} from "lucide-react";

export interface GymDefinition {
  id: "math" | "science" | "portuguese" | "english";
  name: string;
  cityName: string;
  leaderName: string;
  leaderTitle: string;
  leaderAvatar: string;
  badgeId: keyof GymBadges;
  badgeName: string;
  badgeEmoji: string;
  skillId: keyof ExplorerSkills;
  skillName: string;
  skillDescription: string;
  skillEmoji: string;
  themeColor: string;
  accentBg: string;
  questions: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export const GYM_DEFINITIONS: Record<string, GymDefinition> = {
  math: {
    id: "math",
    name: "Ginásio de Matemática",
    cityName: "Pewter City (Metrópole da Matemática)",
    leaderName: "Mestre Pitágoras",
    leaderTitle: "O Guardião das Equações e da Lógica",
    leaderAvatar: "👨‍🏫",
    badgeId: "math_boulder",
    badgeName: "Insígnia dos Números",
    badgeEmoji: "📐",
    skillId: "smash",
    skillName: "Quebrar Rochas & Cavar",
    skillDescription:
      "Permite quebrar pedras rachadas que bloqueiam passagens secretas nas montanhas!",
    skillEmoji: "⛏️",
    themeColor: "#ca8a04",
    accentBg: "from-amber-600 to-yellow-700",
    questions: [
      {
        question:
          "Se Bianca tinha 24 Pokébolas e encontrou mais 3 pacotes com 6 Pokébolas cada um, quantas Pokébolas ela tem agora no total?",
        options: ["36 Pokébolas", "42 Pokébolas", "48 Pokébolas", "30 Pokébolas"],
        correctIndex: 1,
        explanation: "3 pacotes x 6 = 18 Pokébolas. Somando às 24 iniciais: 24 + 18 = 42 Pokébolas!",
      },
      {
        question:
          "Um treinador precisa repartir 45 frutas igualmente entre 5 Pokémon na bolsa. Quantas frutas cada Pokémon receberá?",
        options: ["7 frutas", "8 frutas", "9 frutas", "10 frutas"],
        correctIndex: 2,
        explanation: "45 dividido por 5 = 9 frutas para cada companheiro!",
      },
      {
        question:
          "Qual é o perímetro de um campo de batalha quadrado onde cada um dos 4 lados mede 12 metros?",
        options: ["24 metros", "36 metros", "48 metros", "144 metros"],
        correctIndex: 2,
        explanation: "O perímetro do quadrado é a soma dos 4 lados: 12 + 12 + 12 + 12 = 48 metros!",
      },
    ],
  },
  science: {
    id: "science",
    name: "Ginásio de Ciências",
    cityName: "Cerulean City (Cidade das Águas & Biologia)",
    leaderName: "Dra. Clara",
    leaderTitle: "Cientista Marinha e Pesquisadora da Natureza",
    leaderAvatar: "👩‍🔬",
    badgeId: "science_cascade",
    badgeName: "Insígnia da Descoberta",
    badgeEmoji: "🔬",
    skillId: "surf",
    skillName: "Nadar na Água (Surf)",
    skillDescription:
      "Permite entrar e navegar nos rios, lagos e no mar para encontrar Pokémon de água raros!",
    skillEmoji: "🏊",
    themeColor: "#0284c7",
    accentBg: "from-cyan-600 to-blue-700",
    questions: [
      {
        question:
          "Qual destes processos é realizado pelas plantas para produzir seu próprio alimento usando luz solar, água e gás carbônico?",
        options: ["Fotossíntese", "Digestão celular", "Evaporação", "Respiração vulcânica"],
        correctIndex: 0,
        explanation:
          "A fotossíntese transforma a luz do sol, a água e o gás carbônico em glicose (energia) e oxigênio!",
      },
      {
        question:
          "Por que peixes e Pokémon aquáticos conseguem respirar debaixo d'água?",
        options: [
          "Eles não precisam de oxigênio",
          "Usam brânquias para extrair oxigênio dissolvido na água",
          "Armazenam ar em pequenas garrafas submarinas",
          "Bebem toda a água do rio",
        ],
        correctIndex: 1,
        explanation:
          "As brânquias captam o oxigênio dissolvido na água e o transferem para a corrente sanguínea!",
      },
      {
        question:
          "Em qual estado físico a água se encontra na forma de chuva e nos rios da Vila do Saber?",
        options: ["Estado gasoso", "Estado sólido (gelo)", "Estado líquido", "Estado plasmático"],
        correctIndex: 2,
        explanation: "A chuva, rios e mares são formados por água no estado líquido!",
      },
    ],
  },
  portuguese: {
    id: "portuguese",
    name: "Ginásio de Português",
    cityName: "Celadon City (Cidadela dos Livros & Cultura)",
    leaderName: "Professora Sofia",
    leaderTitle: "Mestra das Letras, Poesias e Histórias",
    leaderAvatar: "👩‍🏫",
    badgeId: "portuguese_rainbow",
    badgeName: "Insígnia da Leitura",
    badgeEmoji: "📚",
    skillId: "cut",
    skillName: "Cortar Arbustos (Cut)",
    skillDescription:
      "Permite cortar arbustos espinhosos com folhagens para abrir atalhos entre cidades!",
    skillEmoji: "🌿",
    themeColor: "#16a34a",
    accentBg: "from-emerald-600 to-green-700",
    questions: [
      {
        question:
          "Assinale a alternativa em que todas as palavras estão com a ortografia e acentuação corretas:",
        options: [
          "Água, amizade e sábio",
          "Agua, amizade e sabio",
          "Água, amizade e sabio",
          "Agua, amisade e sábio",
        ],
        correctIndex: 0,
        explanation:
          "'Água' e 'sábio' são paroxítonas terminadas em ditongo e levam acento!",
      },
      {
        question:
          "Na frase: 'O fiel Pikachu CORREU alegremente pela grama alta', a palavra em destaque é um:",
        options: ["Substantivo", "Adjetivo", "Verbo", "Pronome"],
        correctIndex: 2,
        explanation: "'Correu' expressa a ação realizada pelo sujeito, portanto é um Verbo no pretérito!",
      },
      {
        question:
          "Qual é o coletivo correto de um grupo de peixes nadando juntos em um rio ou oceano?",
        options: ["Enxame", "Cardume", "Matilha", "Alcateia"],
        correctIndex: 1,
        explanation: "O substantivo coletivo de peixes é 'Cardume'!",
      },
    ],
  },
  english: {
    id: "english",
    name: "Ginásio de Inglês",
    cityName: "Vermilion City (Porto Global & Idiomas)",
    leaderName: "Capitão Bilíngue",
    leaderTitle: "Navegador dos Oceanos e Mestre dos Idiomas",
    leaderAvatar: "👨‍✈️",
    badgeId: "english_thunder",
    badgeName: "Insígnia Global",
    badgeEmoji: "🌍",
    skillId: "flash",
    skillName: "Lanterna Mágica (Flash)",
    skillDescription:
      "Ilumina cavernas escuras, túneis profundos e caminhos noturnos!",
    skillEmoji: "💡",
    themeColor: "#9333ea",
    accentBg: "from-purple-600 to-indigo-700",
    questions: [
      {
        question:
          "How do you say in English: 'O Squirtle é meu amigo azul'?",
        options: [
          "Squirtle is my blue friend",
          "Squirtle is my green friend",
          "Squirtle have blue friend",
          "Squirtle are my blue friend",
        ],
        correctIndex: 0,
        explanation: "Em inglês o adjetivo vem antes do substantivo: 'blue friend'!",
      },
      {
        question:
          "Which of these words represents a water animal in English?",
        options: ["Butterfly", "Turtle", "Rabbit", "Horse"],
        correctIndex: 1,
        explanation: "'Turtle' significa tartaruga em inglês (como Squirtle e Wartortle)!",
      },
      {
        question:
          "When you meet a new friend in Kanto in the morning, what is the polite greeting?",
        options: ["Good night!", "Good morning!", "Goodbye!", "See you later!"],
        correctIndex: 1,
        explanation: "'Good morning!' significa 'Bom dia!' em inglês!",
      },
    ],
  },
};

interface GymChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  gymId: "math" | "science" | "portuguese" | "english";
  badges: GymBadges;
  skills: ExplorerSkills;
  onAwardBadgeAndSkill: (
    badgeId: keyof GymBadges,
    skillId: keyof ExplorerSkills,
    coinsWon: number,
    xpWon: number
  ) => void;
}

export const GymChallengeModal: React.FC<GymChallengeModalProps> = ({
  isOpen,
  onClose,
  gymId,
  badges,
  skills,
  onAwardBadgeAndSkill,
}) => {
  const gym = GYM_DEFINITIONS[gymId] || GYM_DEFINITIONS.math;

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [isVictory, setIsVictory] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentQ = gym.questions[currentStep];
  const isAlreadyConquered = badges[gym.badgeId];

  const handleSelectOption = (index: number) => {
    if (hasAnswered) return;
    setSelectedOption(index);
    setHasAnswered(true);

    const isCorrect = index === currentQ.correctIndex;
    if (isCorrect) {
      try {
        playSound("star");
      } catch {}

      if (currentStep + 1 >= gym.questions.length) {
        // Won the gym!
        setIsVictory(true);
        try {
          confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
          playSound("fanfare");
        } catch {}
        onAwardBadgeAndSkill(gym.badgeId, gym.skillId, 35, 200);
      }
    } else {
      try {
        playSound("pop");
      } catch {}
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setHasAnswered(false);
    setCurrentStep((prev) => prev + 1);
  };

  const handleRetryQuestion = () => {
    setSelectedOption(null);
    setHasAnswered(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in select-none">
      <div className="relative w-full max-w-2xl bg-slate-900 border-4 border-amber-500 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-slate-100 max-h-[92vh]">
        {/* Header with Gym Leader Banner */}
        <div
          className={`bg-gradient-to-r ${gym.accentBg} p-4 border-b-2 border-white/20 flex items-center justify-between`}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-3xl shadow-md">
              {gym.leaderAvatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  {gym.name}
                </h3>
                {isAlreadyConquered && (
                  <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                    <Trophy className="w-3 h-3" /> Conquistado
                  </span>
                )}
              </div>
              <p className="text-xs text-white/90 font-bold">
                Líder: {gym.leaderName} • {gym.cityName}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 bg-black/20 hover:bg-black/40 rounded-xl transition cursor-pointer text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Victory Screen */}
        {isVictory ? (
          <div className="p-6 flex flex-col items-center justify-center text-center space-y-4 animate-in zoom-in-95">
            <div className="w-20 h-20 rounded-full bg-amber-500/20 border-4 border-amber-400 flex items-center justify-center text-5xl shadow-xl animate-bounce">
              {gym.badgeEmoji}
            </div>

            <div>
              <span className="text-xs font-black uppercase text-amber-400 tracking-wider">
                Parabéns, Treinadora Campeã!
              </span>
              <h2 className="text-xl font-black text-white mt-1">
                Você conquistou a {gym.badgeName}!
              </h2>
              <p className="text-xs text-slate-300 max-w-md mx-auto mt-1">
                Você demonstrou sabedoria e maestria vencendo o líder do ginásio.
              </p>
            </div>

            {/* Unlocked Skill Badge Box */}
            <div className="w-full max-w-md bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border-2 border-emerald-500/60 rounded-2xl p-4 flex items-center gap-4 text-left shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/30 flex items-center justify-center text-3xl flex-shrink-0">
                {gym.skillEmoji}
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
                  Nova Habilidade de Campo Aprendida (HM):
                </p>
                <p className="text-sm font-extrabold text-white">
                  {gym.skillName}
                </p>
                <p className="text-xs text-slate-300 mt-0.5">
                  {gym.skillDescription}
                </p>
              </div>
            </div>

            {/* Rewards */}
            <div className="flex items-center gap-3">
              <div className="bg-amber-500/20 border border-amber-400/50 px-4 py-2 rounded-xl font-black text-amber-300 text-xs">
                🪙 +35 Moedas
              </div>
              <div className="bg-purple-500/20 border border-purple-400/50 px-4 py-2 rounded-xl font-black text-purple-300 text-xs">
                ⭐ +200 XP
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full max-w-md bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black py-3 rounded-xl shadow-lg cursor-pointer transition active:scale-95 text-xs uppercase tracking-wider"
            >
              Continuar Jornada
            </button>
          </div>
        ) : (
          /* Question Quiz Mode */
          <div className="p-5 flex-1 flex flex-col justify-between overflow-y-auto">
            {/* Progress indicators */}
            <div className="flex items-center justify-between text-xs font-black text-slate-400 border-b border-slate-800 pb-2 mb-4">
              <span>
                DESAFIO DO GINÁSIO: PERGUNTA {currentStep + 1} DE{" "}
                {gym.questions.length}
              </span>
              <div className="flex items-center gap-1.5">
                {gym.questions.map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full ${
                      i < currentStep
                        ? "bg-emerald-500"
                        : i === currentStep
                        ? "bg-amber-400 animate-pulse"
                        : "bg-slate-700"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Question Text */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 mb-4 shadow-inner">
              <p className="text-sm sm:text-base font-extrabold text-white leading-relaxed">
                {currentQ.question}
              </p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 gap-2.5 mb-4">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;

                let btnStyle =
                  "bg-slate-800/80 border-slate-700 hover:bg-slate-750 text-slate-200";

                if (hasAnswered) {
                  if (isCorrect) {
                    btnStyle =
                      "bg-emerald-600/30 border-emerald-400 text-emerald-200 ring-2 ring-emerald-400/50";
                  } else if (isSelected && !isCorrect) {
                    btnStyle =
                      "bg-rose-600/30 border-rose-400 text-rose-200 ring-2 ring-rose-400/50";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={hasAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`p-3.5 rounded-xl border text-left font-bold text-xs sm:text-sm flex items-center justify-between transition cursor-pointer active:scale-98 ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {hasAnswered && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    )}
                    {hasAnswered && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation & Next action */}
            {hasAnswered && (
              <div className="animate-in fade-in slide-in-from-bottom-2 bg-slate-950 border border-slate-800 rounded-2xl p-3.5 flex flex-col gap-3">
                <div className="flex items-start gap-2">
                  <span className="text-base">
                    {selectedOption === currentQ.correctIndex ? "✨" : "💡"}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentQ.explanation}
                  </p>
                </div>

                {selectedOption === currentQ.correctIndex ? (
                  <button
                    onClick={handleNextQuestion}
                    className="self-end bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-md cursor-pointer transition active:scale-95"
                  >
                    <span>Próximo Desafio</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleRetryQuestion}
                    className="self-end bg-rose-700 hover:bg-rose-600 text-white font-black px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-md cursor-pointer transition active:scale-95"
                  >
                    <span>Tentar Novamente</span>
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
