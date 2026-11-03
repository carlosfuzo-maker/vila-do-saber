"use client";

import React, { useState } from "react";
import { CapturedPokemon, StudentYear } from "../rpgTypes";
import { playSound } from "@/lib/soundEffects";
import confetti from "canvas-confetti";
import {
  X,
  Swords,
  Trophy,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  Lock,
  Unlock,
  CheckCircle2,
} from "lucide-react";

interface RocketRescueModalProps {
  isOpen: boolean;
  onClose: () => void;
  stolenPokemon: CapturedPokemon[];
  year: StudentYear;
  studentName: string;
  onRescueSuccess: (pokemonId: string) => void;
}

// 2-Question Rescue Bank tailored for each student year
const RESCUE_QUESTIONS: Record<
  StudentYear,
  Array<{
    q1: { question: string; options: string[]; correctIndex: number; explanation: string };
    q2: { question: string; options: string[]; correctIndex: number; explanation: string };
  }>
> = {
  4: [
    {
      q1: {
        question: "Desafio 1/2: Quanto é 8 × 9?",
        options: ["64", "72", "81", "56"],
        correctIndex: 1,
        explanation: "8 × 9 = 72! Primeira trava digital do esconderijo foi desativada!",
      },
      q2: {
        question: "Desafio 2/2: Qual microrganismo produz o gás que faz a massa do pão crescer?",
        options: ["Levedura (fungo unicelular)", "Alga verde", "Vírus da gripe", "Bactéria do gelo"],
        correctIndex: 0,
        explanation: "As leveduras realizam a fermentação biológica! Segunda trava aberta!",
      },
    },
    {
      q1: {
        question: "Desafio 1/2: Na frase 'O gato ágil saltou o muro', a palavra 'ágil' é um:",
        options: ["Substantivo", "Adjetivo", "Verbo", "Artigo"],
        correctIndex: 1,
        explanation: "'Ágil' indica uma característica do gato, logo é um adjetivo!",
      },
      q2: {
        question: "Desafio 2/2: Quanto é 100 menos 37?",
        options: ["53", "63", "73", "67"],
        correctIndex: 1,
        explanation: "100 - 37 = 63! Raciocínio matemático brilhante!",
      },
    },
  ],
  2: [
    {
      q1: {
        question: "Desafio 1/2: Quanto é 30 + 20?",
        options: ["40", "50", "60", "70"],
        correctIndex: 1,
        explanation: "30 + 20 = 50! A primeira trava da jaula estalou!",
      },
      q2: {
        question: "Desafio 2/2: Quantas sílabas tem a palavra 'CA-CHO-RRO'?",
        options: ["2 sílabas", "3 sílabas", "4 sílabas", "5 sílabas"],
        correctIndex: 1,
        explanation: "Ca-cho-rro tem 3 sílabas! O cadeado se abriu!",
      },
    },
    {
      q1: {
        question: "Desafio 1/2: Qual parte da plantinha suga água da terra?",
        options: ["A flor", "A folha", "A raiz", "O galho"],
        correctIndex: 2,
        explanation: "A raiz absorve água e nutrientes! Primeira trava liberada!",
      },
      q2: {
        question: "Desafio 2/2: Qual cor é 'RED' em português?",
        options: ["Azul", "Vermelho", "Verde", "Amarelo"],
        correctIndex: 1,
        explanation: "'Red' é Vermelho! A jaula se rompeu!",
      },
    },
  ],
};

export default function RocketRescueModal({
  isOpen,
  onClose,
  stolenPokemon,
  year,
  studentName,
  onRescueSuccess,
}: RocketRescueModalProps) {
  const [selectedPkmnIndex, setSelectedPkmnIndex] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1); // 1 = Question 1, 2 = Question 2, 3 = Rescued!
  const [dialogue, setDialogue] = useState<string>(
    "A Equipe Rocket prendeu seu amigo em uma jaula tecnológica! Acerte o Desafio em Dobro do Saber para libertá-lo!"
  );
  const [feedback, setFeedback] = useState<string | null>(null);

  if (!isOpen || stolenPokemon.length === 0) return null;

  const targetPkmn = stolenPokemon[selectedPkmnIndex] || stolenPokemon[0];
  const questionPair = RESCUE_QUESTIONS[year][0];
  const activeQuestion = currentStep === 1 ? questionPair.q1 : questionPair.q2;

  const handleSelectAnswer = (idx: number) => {
    if (idx === activeQuestion.correctIndex) {
      playSound("star");

      if (currentStep === 1) {
        setCurrentStep(2);
        setDialogue(`Ótimo! ${activeQuestion.explanation} Agora responda ao segundo desafio para abrir a jaula!`);
        setFeedback("1ª Trava Rompida! Falta 1 pergunta!");
      } else if (currentStep === 2) {
        setCurrentStep(3);
        playSound("fanfare");
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
        });
        setDialogue(
          `SUCESSO TOTAL! A jaula foi destruída! O seu ${targetPkmn.name} correu feliz para os seus braços! A Equipe Rocket está decolando de novo! 🚀`
        );
        setFeedback("Pokémon Resgatado com Honra!");
      }
    } else {
      playSound("pop");
      setFeedback("Resposta incorreta! Tente com mais atenção, seu Pokémon conta com você!");
    }
  };

  const handleFinishRescue = () => {
    onRescueSuccess(targetPkmn.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/90 backdrop-blur-md animate-fadeIn select-none touch-manipulation">
      <div className="relative w-full max-w-xl bg-slate-900 rounded-[32px] overflow-hidden border-4 border-rose-500 shadow-2xl flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-rose-950 via-slate-900 to-rose-950 text-white flex items-center justify-between border-b border-rose-500/40">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center text-xl shadow">
              🚀
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black tracking-wide flex items-center gap-2">
                <span>Esconderijo Rocket • Operação Resgate</span>
              </h3>
              <p className="text-[11px] text-rose-300">
                Resgatando: <strong className="text-white">{targetPkmn.name}</strong>
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

        {/* Stage: Cage animation */}
        <div className="relative h-60 sm:h-64 bg-gradient-to-b from-slate-900 via-rose-950/70 to-slate-900 overflow-hidden flex flex-col items-center justify-center p-4 border-b border-slate-800">
          <div className="relative flex flex-col items-center z-10">
            {/* The Stolen Pokemon in / out of Cage */}
            <div className="relative">
              <div
                className={`w-28 h-28 rounded-3xl bg-slate-950/90 border-4 border-rose-500 shadow-2xl flex items-center justify-center p-2 text-6xl ${
                  currentStep === 3 ? "animate-bounce" : "animate-pulse"
                }`}
              >
                {targetPkmn.artworkUrl || targetPkmn.spriteUrl ? (
                  <img
                    src={targetPkmn.artworkUrl || targetPkmn.spriteUrl}
                    alt={targetPkmn.name}
                    className="w-full h-full object-contain filter drop-shadow-md"
                  />
                ) : (
                  <span>{targetPkmn.emoji}</span>
                )}
              </div>

              {/* Cage overlay bars */}
              {currentStep !== 3 ? (
                <div className="absolute inset-0 bg-slate-950/40 rounded-3xl flex items-center justify-around px-2 border-2 border-rose-400">
                  <div className="w-1.5 h-full bg-rose-500 shadow" />
                  <div className="w-1.5 h-full bg-rose-500 shadow" />
                  <div className="w-1.5 h-full bg-rose-500 shadow" />
                  <div className="absolute -bottom-2 bg-rose-700 text-white font-black text-[9px] px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    <span>Jaula Trancada</span>
                  </div>
                </div>
              ) : (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-emerald-600 text-white font-black text-[10px] px-3 py-0.5 rounded-full flex items-center gap-1 shadow">
                  <Unlock className="w-3 h-3" />
                  <span>Jaula Quebrada!</span>
                </div>
              )}
            </div>

            {/* Steps Indicator */}
            <div className="mt-4 flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black border-2 ${
                  currentStep >= 2
                    ? "bg-emerald-600 border-emerald-400 text-white"
                    : "bg-rose-900 border-rose-500 text-rose-200"
                }`}
              >
                {currentStep >= 2 ? "✓" : "1"}
              </div>
              <div className="w-10 h-1 bg-slate-700 rounded-full" />
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black border-2 ${
                  currentStep === 3
                    ? "bg-emerald-600 border-emerald-400 text-white"
                    : "bg-slate-800 border-slate-600 text-slate-400"
                }`}
              >
                {currentStep === 3 ? "✓" : "2"}
              </div>
            </div>
          </div>
        </div>

        {/* Dialogue & Question Box */}
        <div className="p-4 bg-slate-950 text-white flex flex-col gap-3">
          <div className="p-3 bg-slate-900 rounded-2xl border-2 border-slate-700 text-xs sm:text-sm font-bold text-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <span>{dialogue}</span>
            {feedback && <span className="text-xs text-yellow-300 font-extrabold animate-pulse">{feedback}</span>}
          </div>

          {currentStep === 3 ? (
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={handleFinishRescue}
                className="btn-game px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl text-xs sm:text-sm font-black shadow-lg flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Receber {targetPkmn.name} de Volta! 💖</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-xs font-black text-rose-300">{activeQuestion.question}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeQuestion.options.map((opt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectAnswer(idx)}
                    className="btn-game p-2.5 bg-slate-800 hover:bg-slate-700 active:bg-rose-600 border-2 border-slate-600 hover:border-amber-400 rounded-xl text-xs font-black text-white text-left shadow flex items-center gap-2 cursor-pointer transition active:scale-98"
                  >
                    <span className="w-5 h-5 rounded-md bg-white/10 text-amber-300 flex items-center justify-center text-[10px]">
                      {["A", "B", "C", "D"][idx]}
                    </span>
                    <span>{opt}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export { RocketRescueModal };
