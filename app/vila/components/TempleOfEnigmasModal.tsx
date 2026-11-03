"use client";

import React, { useState } from "react";
import { PuzzleEnigma, StudentYear } from "../types";
import {
  X,
  Sparkles,
  KeyRound,
  Lock,
  Unlock,
  HelpCircle,
  ChevronUp,
  ChevronDown,
  Trophy,
  Coins,
  Star,
  CheckCircle2,
  Compass,
  ArrowRight,
  Lightbulb,
} from "lucide-react";
import confetti from "canvas-confetti";
import { playSound } from "@/lib/soundEffects";

interface TempleOfEnigmasModalProps {
  isOpen: boolean;
  onClose: () => void;
  year: StudentYear;
  studentName: string;
  enigma: PuzzleEnigma;
  onSolveEnigma: (enigma: PuzzleEnigma) => void;
}

export function TempleOfEnigmasModal({
  isOpen,
  onClose,
  year,
  studentName,
  enigma,
  onSolveEnigma,
}: TempleOfEnigmasModalProps) {
  // 3 tumbler values (0 to 9)
  const [dials, setDials] = useState<[number, number, number]>([0, 0, 0]);
  const [showHintIndex, setShowHintIndex] = useState<number | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [attemptError, setAttemptError] = useState(false);

  if (!isOpen || !enigma) return null;

  const changeDial = (index: 0 | 1 | 2, delta: number) => {
    playSound("click");
    setAttemptError(false);
    setDials((prev) => {
      const next = [...prev] as [number, number, number];
      next[index] = (next[index] + delta + 10) % 10;
      return next;
    });
  };

  const handleTestCombination = () => {
    const isCorrect =
      dials[0] === enigma.vaultCode[0] &&
      dials[1] === enigma.vaultCode[1] &&
      dials[2] === enigma.vaultCode[2];

    if (isCorrect) {
      playSound("fanfare");
      setIsUnlocked(true);
      setAttemptError(false);

      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 },
        });
      } catch {
        // ignore
      }

      onSolveEnigma(enigma);
    } else {
      playSound("pop");
      setAttemptError(true);
      setTimeout(() => setAttemptError(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-amber-50 via-white to-amber-50/80 rounded-3xl shadow-2xl border-4 border-amber-400 overflow-hidden flex flex-col max-h-[94vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 p-4 sm:p-5 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-2xl backdrop-blur-md border border-white/30 shadow-inner">
              <KeyRound className="w-6 h-6 text-amber-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black tracking-wider uppercase bg-amber-900/40 text-amber-100 px-2.5 py-0.5 rounded-full">
                  Templo dos Enigmas da Vila
                </span>
                <Sparkles className="w-4 h-4 text-yellow-200 animate-spin" />
              </div>
              <h2 className="text-lg sm:text-xl font-black tracking-wide text-white drop-shadow-sm">
                {enigma.title}
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              playSound("click");
              onClose();
            }}
            className="p-3 bg-white/20 hover:bg-white/30 rounded-2xl transition-transform active:scale-90 cursor-pointer min-w-[46px] min-h-[46px] flex items-center justify-center border border-white/30"
            aria-label="Fechar"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {isUnlocked ? (
            /* Celebration State */
            <div className="py-8 text-center space-y-5 animate-fadeIn">
              <div className="relative inline-block">
                <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-3xl bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500 border-4 border-white shadow-2xl flex items-center justify-center animate-bounce">
                  <Unlock className="w-12 h-12 text-amber-950" />
                </div>
                <div className="absolute -top-2 -right-2 p-2 bg-emerald-500 text-white rounded-full shadow-lg">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              </div>

              <div>
                <span className="inline-block px-3 py-1 bg-amber-100 text-amber-900 font-black text-xs rounded-full uppercase tracking-wider mb-2">
                  Segredo Revelado!
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                  Parabéns, {studentName}!
                </h3>
                <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto mt-1 font-medium">
                  Você desvendou as 3 pistas mágicas! Os portões do{" "}
                  <strong className="text-amber-700">Capítulo {enigma.unlocksChapter}</strong>{" "}
                  foram liberados em todas as matérias da Vila do Saber!
                </p>
              </div>

              {/* Rewards Box */}
              <div className="flex items-center justify-center gap-4 bg-amber-100/60 p-4 rounded-2xl border-2 border-amber-300 max-w-md mx-auto">
                <div className="flex items-center gap-1.5 text-amber-900 font-black text-sm">
                  <Trophy className="w-5 h-5 text-amber-600" />
                  <span>+{enigma.rewardXp} XP</span>
                </div>
                <div className="flex items-center gap-1.5 text-yellow-900 font-black text-sm">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-500" />
                  <span>+{enigma.rewardStars} Estrelas</span>
                </div>
                <div className="flex items-center gap-1.5 text-amber-800 font-black text-sm">
                  <Coins className="w-5 h-5 text-amber-600" />
                  <span>+{enigma.rewardCoins} Moedas</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  playSound("click");
                  onClose();
                }}
                className="btn-game px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-base rounded-2xl shadow-lg flex items-center justify-center gap-2 mx-auto cursor-pointer"
              >
                <span>Explorar o Capítulo {enigma.unlocksChapter}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <>
              {/* Enigma Story / Introduction */}
              <div className="bg-amber-100/70 p-4 rounded-2xl border-2 border-amber-200/80 text-xs sm:text-sm text-amber-950 font-medium flex items-start gap-3">
                <Compass className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">{enigma.story}</p>
                  <p className="text-[11px] text-amber-800/80 mt-1">
                    Gire cada anel numérico usando as respostas das charadas escolares abaixo:
                  </p>
                </div>
              </div>

              {/* Rotary Vault Dials (Avatar World 3D Lock Style) */}
              <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-5 rounded-3xl border-4 border-amber-400 shadow-xl text-center">
                <div className="flex items-center justify-center gap-2 text-amber-300 text-xs font-black uppercase tracking-wider mb-4">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>Cofre dos 3 Segredos</span>
                </div>

                <div className="flex items-center justify-center gap-3 sm:gap-6">
                  {([0, 1, 2] as const).map((idx) => {
                    const clue = enigma.digitClues[idx];
                    return (
                      <div
                        key={idx}
                        className="flex flex-col items-center bg-slate-950/80 p-3 rounded-2xl border-2 border-amber-500/60 shadow-inner"
                      >
                        <span className="text-[10px] font-black text-amber-300/80 uppercase mb-2">
                          Dígito {idx + 1}
                        </span>

                        {/* Dial Up Button */}
                        <button
                          type="button"
                          onClick={() => changeDial(idx, 1)}
                          className="w-12 h-10 sm:w-14 sm:h-11 bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 rounded-xl flex items-center justify-center transition-transform active:scale-90 cursor-pointer border border-amber-400/40"
                          aria-label={`Aumentar dígito ${idx + 1}`}
                        >
                          <ChevronUp className="w-6 h-6" />
                        </button>

                        {/* Tumbler Window */}
                        <div className="w-14 h-16 sm:w-16 sm:h-20 my-2 bg-gradient-to-b from-slate-900 via-black to-slate-900 rounded-xl border-2 border-amber-300 flex items-center justify-center shadow-inner">
                          <span className="text-3xl sm:text-4xl font-black text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)] font-mono">
                            {dials[idx]}
                          </span>
                        </div>

                        {/* Dial Down Button */}
                        <button
                          type="button"
                          onClick={() => changeDial(idx, -1)}
                          className="w-12 h-10 sm:w-14 sm:h-11 bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 rounded-xl flex items-center justify-center transition-transform active:scale-90 cursor-pointer border border-amber-400/40"
                          aria-label={`Diminuir dígito ${idx + 1}`}
                        >
                          <ChevronDown className="w-6 h-6" />
                        </button>

                        <span className="text-[9px] text-slate-400 mt-2 font-bold truncate max-w-[80px]">
                          {clue.subject.split(" ")[0]}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {attemptError && (
                  <div className="mt-4 p-2.5 bg-rose-500/20 border border-rose-500/50 rounded-xl text-rose-300 text-xs font-bold animate-shake">
                    🔒 Os anéis não se alinharam! Verifique as respostas das pistas abaixo e tente novamente!
                  </div>
                )}
              </div>

              {/* Clues Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    <span>Pistas Curriculares da Vila</span>
                  </h4>
                  <span className="text-[11px] text-slate-500 font-bold">
                    Resolva cada uma para encontrar o código
                  </span>
                </div>

                <div className="space-y-2.5">
                  {enigma.digitClues.map((clue, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-white rounded-2xl border-2 border-amber-200/90 shadow-sm space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                          Dígito {idx + 1} • {clue.subject}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            setShowHintIndex(showHintIndex === idx ? null : idx)
                          }
                          className="text-[11px] font-bold text-sky-600 hover:text-sky-800 flex items-center gap-1 cursor-pointer"
                        >
                          <HelpCircle className="w-3.5 h-3.5" />
                          <span>{showHintIndex === idx ? "Ocultar Dica" : "Ver Dica"}</span>
                        </button>
                      </div>

                      <p className="text-xs sm:text-sm font-black text-slate-800 leading-snug">
                        {clue.question}
                      </p>

                      {showHintIndex === idx && (
                        <div className="p-2.5 bg-sky-50 rounded-xl border border-sky-200 text-xs text-sky-900 font-medium animate-fadeIn flex items-start gap-2">
                          <span className="text-sm">🦉</span>
                          <div>
                            <strong>Dica da Peninha:</strong> {clue.hint}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Unlock Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleTestCombination}
                  className="btn-game w-full p-4 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white font-black text-base rounded-2xl shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                >
                  <Unlock className="w-5 h-5 text-yellow-200" />
                  <span>Testar Combinação e Abrir o Cofre</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
