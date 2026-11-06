"use client";

import React, { useState } from "react";
import { CapturedPokemon, RivalConfig, RivalGender, StudentYear } from "../rpgTypes";
import { getPokemonById, getPokemonArtworkUrl, getPokemonSpriteUrl } from "../data/kantoPokedex";
import { playSound } from "@/lib/soundEffects";
import confetti from "canvas-confetti";
import {
  X,
  Swords,
  Trophy,
  Sparkles,
  Shield,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  User,
  Zap,
} from "lucide-react";

interface QuestionItem {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const RIVAL_QUESTIONS: Record<StudentYear, QuestionItem[]> = {
  2: [
    {
      question: "Quanto é 15 + 25?",
      options: ["35", "40", "45", "50"],
      correctIndex: 1,
      explanation: "15 + 25 = 40! Você somou as dezenas e unidades certinho!",
    },
    {
      question: "Qual dessas palavras está escrita com a ortografia correta?",
      options: ["Pecégo", "Pêcego", "Pêssego", "Péçego"],
      correctIndex: 2,
      explanation: "Pêssego se escreve com SS!",
    },
    {
      question: "Qual destes seres vivos produz seu próprio alimento pela fotossíntese?",
      options: ["Cachorro", "Planta e Flores", "Borboleta", "Gato"],
      correctIndex: 1,
      explanation: "As plantas usam a luz solar para fazer fotossíntese!",
    },
    {
      question: "Como se diz 'Obrigado' em inglês?",
      options: ["Please", "Hello", "Thank you", "Goodbye"],
      correctIndex: 2,
      explanation: "Thank you significa 'Obrigado'!",
    },
  ],
  4: [
    {
      question: "Quanto é 125 x 4?",
      options: ["450", "480", "500", "550"],
      correctIndex: 2,
      explanation: "125 x 4 = 500! Multiplicação precisa!",
    },
    {
      question: "Na frase 'As alunas estudiosas venceram o desafio', qual é o sujeito?",
      options: ["venceram", "o desafio", "As alunas estudiosas", "estudiosas"],
      correctIndex: 2,
      explanation: "'As alunas estudiosas' é o sujeito da oração!",
    },
    {
      question: "Qual órgão do corpo humano é responsável por bombear o sangue para todos os tecidos?",
      options: ["Pulmão", "Coração", "Estômago", "Fígado"],
      correctIndex: 1,
      explanation: "O coração bombeia o sangue através dos vasos sanguíneos!",
    },
    {
      question: "Qual o significado da palavra em inglês 'Knowledge'?",
      options: ["Conhecimento / Sabedoria", "Brinquedo", "Caminho", "Desafio"],
      correctIndex: 0,
      explanation: "'Knowledge' significa conhecimento e sabedoria!",
    },
  ],
};

interface RivalChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  sisterName: "Bianca" | "Cecília";
  currentYear: StudentYear;
  playerActivePokemon: CapturedPokemon | null;
  rivalConfig: RivalConfig | null;
  onSaveRivalConfig: (config: RivalConfig) => void;
  onBattleVictory: (awardedCoins: number, awardedExp: number) => void;
}

export function RivalChallengeModal({
  isOpen,
  onClose,
  sisterName,
  currentYear,
  playerActivePokemon,
  rivalConfig,
  onSaveRivalConfig,
  onBattleVictory,
}: RivalChallengeModalProps) {
  // Configuration Mode (Prof. Oak prompt) vs Battle Mode
  const [isEditingConfig, setIsEditingConfig] = useState(!rivalConfig);
  const [tempName, setTempName] = useState(rivalConfig?.name || "Gary");
  const [tempGender, setTempGender] = useState<RivalGender>(rivalConfig?.gender || "boy");

  // Battle State
  const [battlePhase, setBattlePhase] = useState<"intro" | "question" | "result">("intro");
  const [currentRound, setCurrentRound] = useState(0);
  const [rivalHp, setRivalHp] = useState(100);
  const [playerHp, setPlayerHp] = useState(100);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [battleOutcome, setBattleOutcome] = useState<"win" | "lose" | null>(null);

  if (!isOpen) return null;

  const currentQuestions = RIVAL_QUESTIONS[currentYear] || RIVAL_QUESTIONS[2];
  const question = currentQuestions[currentRound % currentQuestions.length];

  // Opposing starter logic (if player has Bulbasaur, rival has Charmander; if Charmander, rival Squirtle; if Squirtle, rival Bulbasaur)
  const getRivalStarterId = (): number => {
    if (!playerActivePokemon) return 4; // Charmander by default
    const pId = playerActivePokemon.pokedexId;
    if (pId === 1 || pId === 2 || pId === 3) return 4; // Charmander
    if (pId === 4 || pId === 5 || pId === 6) return 7; // Squirtle
    if (pId === 7 || pId === 8 || pId === 9) return 1; // Bulbasaur
    return 133; // Eevee if other
  };

  const rivalStarterDef = getPokemonById(rivalConfig?.starterPokedexId || getRivalStarterId());

  // Save Config
  const handleSaveConfig = () => {
    const finalName = tempName.trim() || (tempGender === "boy" ? "Gary" : "Leaf");
    const newConfig: RivalConfig = {
      name: finalName,
      gender: tempGender,
      starterPokedexId: getRivalStarterId(),
      defeatedEncounters: rivalConfig?.defeatedEncounters || [],
    };
    onSaveRivalConfig(newConfig);
    setIsEditingConfig(false);
    setBattlePhase("intro");
    playSound("star");
  };

  // Start Battle
  const handleStartBattle = () => {
    playSound("open");
    setBattlePhase("question");
    setCurrentRound(0);
    setRivalHp(100);
    setPlayerHp(100);
    setSelectedOption(null);
    setFeedback(null);
    setBattleOutcome(null);
  };

  // Answer Question
  const handleAnswer = (optionIdx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(optionIdx);

    const isCorrect = optionIdx === question.correctIndex;
    if (isCorrect) {
      playSound("star");
      const damage = 35 + Math.floor(Math.random() * 15);
      const newRivalHp = Math.max(0, rivalHp - damage);
      setRivalHp(newRivalHp);
      setFeedback(`✨ Golpe Crítico da Sabedoria! Você acertou! (-${damage} HP no Pokémon do Rival!)`);

      if (newRivalHp <= 0) {
        setTimeout(() => {
          setBattlePhase("result");
          setBattleOutcome("win");
          playSound("fanfare");
          confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
          onBattleVictory(25, 120);
        }, 1500);
        return;
      }
    } else {
      playSound("pop");
      const damage = 25;
      const newPlayerHp = Math.max(0, playerHp - damage);
      setPlayerHp(newPlayerHp);
      setFeedback(`Ouch! O ${rivalConfig?.name || "Rival"} contra-atacou! Resposta correta: ${question.options[question.correctIndex]}`);

      if (newPlayerHp <= 0) {
        setTimeout(() => {
          setBattlePhase("result");
          setBattleOutcome("lose");
          playSound("pop");
        }, 1500);
        return;
      }
    }

    // Advance to next round after 2 seconds
    setTimeout(() => {
      setSelectedOption(null);
      setFeedback(null);
      setCurrentRound((r) => r + 1);
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/90 backdrop-blur-md animate-fadeIn select-none touch-manipulation">
      <div className="relative w-full max-w-xl bg-slate-900 rounded-[32px] overflow-hidden border-4 border-amber-400 shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-red-900 via-amber-900 to-purple-950 text-white flex items-center justify-between border-b border-amber-400/30">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center text-lg font-black shadow">
              ⚡
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black tracking-wide flex items-center gap-2">
                <span>Duelo do Rival</span>
                <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/40">
                  {rivalConfig?.name || "Rival"}
                </span>
              </h3>
              <p className="text-[11px] text-amber-200">
                Quem estuda e se dedica mais na Vila do Saber?
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {/* MODE 1: CONFIGURATION (PROF OAK) */}
          {isEditingConfig ? (
            <div className="space-y-4 bg-slate-950/80 p-5 rounded-2xl border border-amber-500/30">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-2xl flex-shrink-0">
                  👨‍🏫
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-amber-300">
                    Professor Carvalho pergunta:
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    &quot;Ah, você já conhece o(a) meu(minha) neto(a)... Vocês estudam juntos desde pequenos! Qual era o nome dele(a) mesmo?&quot;
                  </p>
                </div>
              </div>

              {/* Gender Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  Escolha o Gênero do Rival:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      playSound("click");
                      setTempGender("boy");
                      if (tempName === "Leaf" || tempName === "Sofia") setTempName("Gary");
                    }}
                    className={`p-3 rounded-xl border-2 flex items-center justify-center gap-2 font-black text-xs cursor-pointer transition ${
                      tempGender === "boy"
                        ? "bg-blue-600/30 border-blue-400 text-blue-200 shadow-md"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    <span>👦 Menino (Gary / Blue)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playSound("click");
                      setTempGender("girl");
                      if (tempName === "Gary" || tempName === "Blue") setTempName("Leaf");
                    }}
                    className={`p-3 rounded-xl border-2 flex items-center justify-center gap-2 font-black text-xs cursor-pointer transition ${
                      tempGender === "girl"
                        ? "bg-pink-600/30 border-pink-400 text-pink-200 shadow-md"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    <span>👧 Menina (Leaf / Green)</span>
                  </button>
                </div>
              </div>

              {/* Name Input */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Nome do seu Rival:
                </label>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  maxLength={15}
                  placeholder={tempGender === "boy" ? "Ex: Gary" : "Ex: Leaf"}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border-2 border-slate-700 text-white font-bold text-sm focus:border-amber-400 outline-none"
                />

                {/* Preset quick names */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {(tempGender === "boy"
                    ? ["Gary", "Blue", "Paul", "Lucas", "Pedro"]
                    : ["Leaf", "Green", "Sofia", "Luísa", "Beatriz"]
                  ).map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => {
                        playSound("click");
                        setTempName(preset);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-bold border border-slate-700 cursor-pointer"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleSaveConfig}
                className="btn-game w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow cursor-pointer transition"
              >
                Confirmar Rival e Continuar!
              </button>
            </div>
          ) : battlePhase === "intro" ? (
            /* INTRO SCREEN */
            <div className="space-y-4 text-center py-3">
              <div className="flex items-center justify-center gap-4 py-2">
                {/* Player side */}
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-2xl bg-indigo-600/30 border-2 border-indigo-400 p-1 flex items-center justify-center shadow">
                    <img
                      src={playerActivePokemon?.artworkUrl || "/assets/rpg/avatars/cecilia.png"}
                      alt={sisterName}
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <span className="text-xs font-black text-white mt-1.5">{sisterName}</span>
                  <span className="text-[10px] text-indigo-300">
                    {playerActivePokemon?.name || "Treinadora"}
                  </span>
                </div>

                <div className="text-xl font-black text-amber-400 px-3 py-1 bg-amber-400/10 rounded-full border border-amber-400/30 animate-pulse">
                  ⚔️ VS ⚔️
                </div>

                {/* Rival side */}
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-2xl bg-red-600/30 border-2 border-red-400 p-1 flex items-center justify-center shadow">
                    <img
                      src={rivalStarterDef ? getPokemonArtworkUrl(rivalStarterDef.pokedexId) : ""}
                      alt={rivalConfig?.name}
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <span className="text-xs font-black text-white mt-1.5">
                    {rivalConfig?.name || "Gary"}
                  </span>
                  <span className="text-[10px] text-red-300">
                    {rivalStarterDef?.name || "Rival"}
                  </span>
                </div>
              </div>

              {/* Dialogue Box */}
              <div className="p-4 bg-slate-950 border border-amber-400/30 rounded-2xl text-left space-y-2">
                <p className="text-xs font-black text-amber-300 flex items-center gap-1.5">
                  <span>💬 {rivalConfig?.name}:</span>
                </p>
                <p className="text-xs text-slate-200 leading-relaxed italic">
                  &quot;Ora, ora, {sisterName}! Achei que você ainda estivesse na tabuada do 2! Eu já peguei mais Pokémon e sei toda a matéria da escola! Vamos ver quem sabe mais!&quot;
                </p>
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditingConfig(true)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold border border-slate-700 cursor-pointer"
                >
                  ✏️ Mudar Rival
                </button>

                <button
                  type="button"
                  onClick={handleStartBattle}
                  className="btn-game flex-1 py-3 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 rounded-2xl font-black text-sm shadow-xl cursor-pointer transition flex items-center justify-center gap-2"
                >
                  <Swords className="w-4 h-4" />
                  <span>Aceitar Duelo de Sabedoria!</span>
                </button>
              </div>
            </div>
          ) : battlePhase === "question" ? (
            /* QUESTION BATTLE ARENA */
            <div className="space-y-4">
              {/* HP Bars */}
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-950/90 rounded-2xl border border-slate-800">
                {/* Player HP */}
                <div>
                  <div className="flex justify-between text-[11px] font-bold text-indigo-300 mb-1">
                    <span>{sisterName} ({playerActivePokemon?.name})</span>
                    <span>{playerHp} / 100 HP</span>
                  </div>
                  <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-500"
                      style={{ width: `${playerHp}%` }}
                    />
                  </div>
                </div>

                {/* Rival HP */}
                <div>
                  <div className="flex justify-between text-[11px] font-bold text-red-300 mb-1">
                    <span>{rivalConfig?.name} ({rivalStarterDef?.name})</span>
                    <span>{rivalHp} / 100 HP</span>
                  </div>
                  <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                    <div
                      className="h-full bg-red-500 transition-all duration-500"
                      style={{ width: `${rivalHp}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Question Banner */}
              <div className="p-4 bg-gradient-to-br from-indigo-950/80 to-slate-900 border-2 border-indigo-500/50 rounded-2xl text-center space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-300 bg-indigo-950 px-2.5 py-0.5 rounded-full border border-indigo-400/40">
                  Desafio #{currentRound + 1} • {currentYear}º Ano
                </span>
                <h4 className="text-sm sm:text-base font-black text-white leading-snug">
                  {question.question}
                </h4>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {question.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === question.correctIndex;
                  let btnStyle = "bg-slate-800/80 border-slate-700 text-slate-200 hover:border-amber-400";

                  if (selectedOption !== null) {
                    if (isCorrect) {
                      btnStyle = "bg-emerald-600/40 border-emerald-400 text-emerald-200 font-black animate-pulse";
                    } else if (isSelected) {
                      btnStyle = "bg-rose-600/40 border-rose-400 text-rose-200 font-black";
                    } else {
                      btnStyle = "bg-slate-900/50 border-slate-800 text-slate-600 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={opt}
                      type="button"
                      disabled={selectedOption !== null}
                      onClick={() => handleAnswer(idx)}
                      className={`p-3 rounded-xl border-2 text-xs font-bold text-left transition cursor-pointer flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {selectedOption !== null && isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Round Feedback Alert */}
              {feedback && (
                <div className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-200 text-xs font-bold text-center animate-fadeIn">
                  {feedback}
                </div>
              )}
            </div>
          ) : (
            /* RESULT SCREEN */
            <div className="space-y-4 text-center py-4 animate-fadeIn">
              {battleOutcome === "win" ? (
                <>
                  <div className="w-16 h-16 rounded-full bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center text-3xl mx-auto shadow-lg">
                    🏆
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-amber-300">
                    Vitória! Você superou o {rivalConfig?.name}!
                  </h4>
                  <p className="text-xs text-slate-200 max-w-sm mx-auto leading-relaxed">
                    Sua dedicação aos estudos falou mais alto! O Pokémon do {rivalConfig?.name} foi derrotado pela sua sabedoria!
                  </p>

                  <div className="p-3 bg-slate-950 border border-amber-400/30 rounded-2xl text-xs text-amber-200 italic max-w-sm mx-auto">
                    &quot;Grrr! Não acredito que você acertou essas perguntas! Você andou estudando na biblioteca escondida, não é?! Na próxima cidade eu não vou perder!&quot;
                  </div>

                  <div className="flex justify-center gap-4 py-2">
                    <span className="text-xs font-black text-amber-300 bg-amber-950/60 px-3 py-1.5 rounded-xl border border-amber-500/40">
                      +25 Moedas 🪙
                    </span>
                    <span className="text-xs font-black text-indigo-300 bg-indigo-950/60 px-3 py-1.5 rounded-xl border border-indigo-500/40">
                      +120 EXP de Sabedoria 🌟
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    className="btn-game w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 rounded-2xl font-black text-xs shadow-xl cursor-pointer transition"
                  >
                    🎉 Celebrar Vitória e Voltar ao Mapa!
                  </button>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-rose-500/20 border-2 border-rose-400 flex items-center justify-center text-3xl mx-auto">
                    💪
                  </div>
                  <h4 className="text-base font-black text-white">
                    Quase lá! Treine mais um pouco!
                  </h4>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto">
                    O {rivalConfig?.name} levou a melhor dessa vez, mas com mais um pouco de treino e estudo você certamente vai vencê-lo!
                  </p>

                  <button
                    type="button"
                    onClick={handleStartBattle}
                    className="btn-game w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-black text-xs shadow cursor-pointer transition"
                  >
                    Tentar Novamente Agora!
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
