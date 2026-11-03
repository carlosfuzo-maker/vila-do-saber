"use client";

import React, { useState } from "react";
import { StudentProfile } from "../types";
import { Sparkles, Trophy, Zap, AlertTriangle, ShieldCheck } from "lucide-react";
import { playSound } from "@/lib/soundEffects";
import confetti from "canvas-confetti";

interface QuestionData {
  question: string;
  options: (string | number)[];
  correctIndex: number;
  explanation: string;
}

interface KnowledgeBattleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVictory: (coins: number, xp: number) => void;
  onDefeat?: () => void;
  currentProfile: StudentProfile;
  subjectName: string;
  subjectId: string;
  questionData?: QuestionData;
}

export function KnowledgeBattleModal({
  isOpen,
  onClose,
  onVictory,
  onDefeat,
  currentProfile,
  subjectName,
  subjectId,
  questionData,
}: KnowledgeBattleModalProps) {
  const activeQuestion: QuestionData = questionData || {
    question: `Desafio surpresa da Equipe Rocket de ${subjectName}! Quanto é 8 × 7?`,
    options: ["54", "56", "62", "48"],
    correctIndex: 1,
    explanation: "8 vezes 7 é igual a 56!",
  };

  const [enemyHp, setEnemyHp] = useState(100);
  const [playerHp, setPlayerHp] = useState(100);
  const [battleState, setBattleState] = useState<"intro" | "question" | "attacking" | "victory" | "defeat">("intro");
  const [dialogue, setDialogue] = useState<string>(
    "A Equipe Rocket apareceu na Rota tentando bloquear o caminho para a escola!"
  );
  const [feedback, setFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelectAnswer = (index: number) => {
    if (battleState !== "question") return;

    if (index === activeQuestion.correctIndex) {
      // Correct! Player attacks!
      playSound("pop");
      setBattleState("attacking");
      setDialogue(`${currentProfile.name} usou o Raio do Conhecimento de ${subjectName}! Acerto Crítico!`);

      setTimeout(() => {
        playSound("fanfare");
        setEnemyHp(0);
        setBattleState("victory");
        setDialogue("Equipe Rocket: 'Não pode ser! Como você é tão inteligente?! Estamos decolando de novo! 🚀'");

        try {
          confetti({
            particleCount: 90,
            spread: 70,
            origin: { y: 0.5 },
          });
        } catch {}
      }, 1200);
    } else {
      playSound("click");
      if (onDefeat) {
        // Rocket steals a Pokemon!
        setPlayerHp(0);
        setBattleState("defeat");
        setDialogue("Equipe Rocket: 'Haha! Resposta errada! O golpe tecnológico funcionou: roubamos um dos seus Pokémon!' 🚀");
        try {
          onDefeat();
        } catch {}
      } else {
        // Wrong answer: gentle friendly hint
        setFeedback("Equipe Rocket: 'Haha! Quase lá! Tente mais uma vez com mais atenção!'");
        setTimeout(() => {
          setFeedback(null);
        }, 2500);
      }
    }
  };

  const handleFinishVictory = () => {
    playSound("fanfare");
    onVictory(50, 40);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/90 backdrop-blur-md animate-fadeIn select-none touch-manipulation">
      {/* Game Boy Advance Style Battle Frame */}
      <div className="relative w-full max-w-2xl bg-slate-900 rounded-[32px] overflow-hidden border-4 border-amber-400 shadow-2xl flex flex-col">
        {/* Top Battle Header */}
        <div className="px-4 py-2.5 bg-slate-950 text-white flex items-center justify-between border-b border-amber-400/40">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚡</span>
            <span className="text-xs font-black uppercase tracking-wider text-amber-300">
              Batalha do Saber • {subjectName}
            </span>
          </div>
          <div className="text-[11px] font-black text-rose-400 bg-rose-950/80 px-2.5 py-0.5 rounded-full border border-rose-500/50 animate-pulse">
            ⚔️ Duelo Educativo
          </div>
        </div>

        {/* 2D Battle Arena Stage */}
        <div className="relative h-64 sm:h-72 bg-gradient-to-b from-sky-300 via-sky-100 to-emerald-200 overflow-hidden flex flex-col justify-between p-4">
          {/* Background decorative clouds */}
          <div className="absolute top-4 left-8 text-2xl opacity-60">☁️</div>
          <div className="absolute top-8 right-16 text-3xl opacity-60">☁️</div>

          {/* ENEMY PLATFORM (Top-Right): Equipe Rocket */}
          <div className="relative self-end flex flex-col items-end mr-4 sm:mr-8 z-10">
            {/* Enemy Status HUD */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-lg border-2 border-slate-700 w-44 sm:w-52 mb-1">
              <div className="flex items-center justify-between text-xs font-black text-slate-800">
                <span className="text-rose-600 flex items-center gap-1">
                  <span>🚀 Equipe Rocket</span>
                </span>
                <span className="text-[10px] text-slate-500">Nv. {currentProfile.level}</span>
              </div>
              {/* HP Bar */}
              <div className="mt-1 flex items-center gap-1.5">
                <span className="text-[9px] font-black text-amber-800">HP</span>
                <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden border border-slate-400">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 to-emerald-500 transition-all duration-700 rounded-full"
                    style={{ width: `${enemyHp}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Enemy Sprite Figure */}
            <div
              className={`relative transition-all duration-500 ${
                battleState === "victory"
                  ? "animate-spin scale-50 opacity-0 translate-y-[-100px]"
                  : battleState === "attacking"
                  ? "animate-wiggle"
                  : "animate-breathe"
              }`}
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-slate-900 border-4 border-rose-500 shadow-xl flex flex-col items-center justify-center text-4xl">
                <span>🦹‍♂️</span>
              </div>
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-rose-600 text-white text-[9px] font-black px-2 rounded-full whitespace-nowrap">
                Vilões da Rota
              </span>
            </div>
            {/* Platform Shadow */}
            <div className="w-28 h-5 bg-emerald-700/30 rounded-full blur-xs mt-[-10px]" />
          </div>

          {/* PLAYER PLATFORM (Bottom-Left): Cecília / Bianca Back Sprite */}
          <div className="relative self-start flex flex-col items-start ml-4 sm:ml-8 z-10">
            {/* Player Sprite Back */}
            <div className={`relative ${battleState === "attacking" ? "animate-bounce" : ""}`}>
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white border-4 border-sky-500 shadow-xl flex flex-col items-center justify-center text-4xl">
                <span>👧</span>
              </div>
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-sky-600 text-white text-[9px] font-black px-2 rounded-full whitespace-nowrap">
                {currentProfile.name}
              </span>
            </div>
            {/* Platform Shadow */}
            <div className="w-28 h-5 bg-emerald-700/30 rounded-full blur-xs mt-[-10px] mb-1" />

            {/* Player Status HUD */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-lg border-2 border-sky-600 w-44 sm:w-52">
              <div className="flex items-center justify-between text-xs font-black text-slate-800">
                <span className="text-sky-700">{currentProfile.name}</span>
                <span className="text-[10px] text-amber-700 font-extrabold">Nv. {currentProfile.level} ⭐</span>
              </div>
              {/* HP Bar */}
              <div className="mt-1 flex items-center gap-1.5">
                <span className="text-[9px] font-black text-amber-800">HP</span>
                <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden border border-slate-400">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full"
                    style={{ width: `${playerHp}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Dialogue Box & Action Controls */}
        <div className="p-4 bg-slate-950 text-white flex flex-col gap-3 border-t-4 border-slate-800 min-h-[180px]">
          {/* Dialogue Banner */}
          <div className="p-3 bg-slate-900 rounded-2xl border-2 border-slate-700 text-xs sm:text-sm font-bold leading-relaxed text-amber-200 flex items-center justify-between">
            <span>{dialogue}</span>
            {feedback && (
              <span className="text-xs text-yellow-300 font-extrabold animate-pulse">
                {feedback}
              </span>
            )}
          </div>

          {/* Action Step: Intro / Ready to Battle */}
          {battleState === "intro" && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  playSound("pop");
                  setBattleState("question");
                  setDialogue(`Pergunta da Batalha: ${activeQuestion.question}`);
                }}
                className="btn-game px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-amber-950 rounded-2xl text-xs sm:text-sm font-black shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Iniciar Batalha do Saber! ⚡</span>
              </button>
            </div>
          )}

          {/* Action Step: Question Answers Grid (iPad friendly touch buttons) */}
          {battleState === "question" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {activeQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectAnswer(idx)}
                  className="btn-game p-3 bg-slate-800 hover:bg-slate-750 active:bg-sky-600 border-2 border-slate-600 hover:border-amber-400 rounded-2xl text-xs sm:text-sm font-black text-white text-left shadow-md flex items-center justify-between cursor-pointer active:scale-98"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-white/10 text-amber-300 flex items-center justify-center text-xs">
                      {["A", "B", "C", "D"][idx]}
                    </span>
                    <span>{option}</span>
                  </div>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 opacity-60" />
                </button>
              ))}
            </div>
          )}

          {/* Action Step: Attacking Visual Feedback */}
          {battleState === "attacking" && (
            <div className="py-4 text-center text-sm font-black text-yellow-300 animate-pulse flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-300 animate-spin" />
              <span>Lançando ataque do Saber... Acertou! 🌟</span>
            </div>
          )}

          {/* Action Step: Victory Screen */}
          {battleState === "victory" && (
            <div className="flex items-center justify-between p-2 bg-emerald-950/80 rounded-2xl border-2 border-emerald-400">
              <div className="flex items-center gap-2 text-xs font-black text-emerald-300">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span>Vitória! A Rota está livre! (+50 Moedas 🪙 / +40 XP ⭐)</span>
              </div>

              <button
                type="button"
                onClick={handleFinishVictory}
                className="btn-game px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-black shadow-md cursor-pointer"
              >
                Continuar a Jornada 🚀
              </button>
            </div>
          )}

          {/* Action Step: Defeat Screen (Rocket Theft) */}
          {battleState === "defeat" && (
            <div className="flex items-center justify-between p-2 bg-rose-950/90 rounded-2xl border-2 border-rose-500 animate-pulse">
              <div className="flex items-center gap-2 text-xs font-black text-rose-300">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
                <span>A Equipe Rocket roubou um Pokémon seu! Vá ao Esconderijo resgatá-lo!</span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="btn-game px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-black shadow-md cursor-pointer whitespace-nowrap"
              >
                Ir Atrás! 🏃‍♀️
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
