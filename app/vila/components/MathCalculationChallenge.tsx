"use client";

import React, { useState } from "react";
import {
  Sparkles,
  CheckCircle2,
  Calculator,
  ArrowRight,
  HelpCircle,
  Trophy,
  RotateCcw,
  Star,
} from "lucide-react";
import confetti from "canvas-confetti";
import { playSound } from "@/lib/soundEffects";

interface MathCalculationChallengeProps {
  year?: 2 | 4;
  chapterId?: number;
  onAllCompleted: () => void;
}

interface MathQuestion {
  id: string;
  question: string;
  operationLabel: string;
  options: number[];
  answer: number;
  visualHint?: string;
  strategyTip: string;
}

const CHAPTER_MATH_YEAR_4: Record<number, MathQuestion[]> = {
  1: [
    {
      id: "m4-c1-1",
      question: "Qual número representa 4 Unidades de Milhar, 3 Centenas, 2 Dezenas e 5 Unidades?",
      operationLabel: "Composição de Números até 10.000",
      options: [4325, 4235, 4523, 4352],
      answer: 4325,
      strategyTip: "Dica: 4.000 + 300 + 20 + 5 = 4.325!",
    },
    {
      id: "m4-c1-2",
      question: "No número 8.752, qual é o valor posicional do algarismo 7?",
      operationLabel: "Valor Posicional",
      options: [7, 70, 700, 7000],
      answer: 700,
      strategyTip: "Dica: O 7 está na ordem das centenas, logo vale 7 centenas = 700!",
    },
    {
      id: "m4-c1-3",
      question: "Qual é o antecessor imediato do número 5.000?",
      operationLabel: "Antecessor e Sucessor",
      options: [4990, 4999, 4900, 5001],
      answer: 4999,
      strategyTip: "Dica: Tirando 1 unidade de 5.000, chegamos em 4.999!",
    },
  ],
  2: [
    {
      id: "m4-c2-1",
      question: "348 + 265 = ?",
      operationLabel: "Adição com Reagrupamento",
      options: [603, 613, 623, 513],
      answer: 613,
      strategyTip: "Dica: 8+5=13 (sobe 1). 1+4+6=11 (sobe 1). 1+3+2=6. Total = 613!",
    },
    {
      id: "m4-c2-2",
      question: "1.000 - 370 = ?",
      operationLabel: "Subtração com Dezenas",
      options: [630, 670, 730, 530],
      answer: 630,
      strategyTip: "Dica mental: 1.000 tira 300 fica 700. 700 tira 70 fica 630!",
    },
    {
      id: "m4-c2-3",
      question: "520 + 480 = ?",
      operationLabel: "Cálculo Mental Rápido",
      options: [900, 950, 1000, 1100],
      answer: 1000,
      strategyTip: "Dica: 500 + 400 = 900. E 20 + 80 = 100. 900 + 100 = 1.000!",
    },
  ],
  3: [
    {
      id: "m4-c3-1",
      question: "25 × 12 = ?",
      operationLabel: "Multiplicação com 2 Algarismos",
      options: [250, 280, 300, 320],
      answer: 300,
      strategyTip: "Dica: 25 × 10 = 250. 25 × 2 = 50. Somando 250 + 50 = 300!",
    },
    {
      id: "m4-c3-2",
      question: "47 ÷ 5 tem resultado igual a 9 e RESTO igual a:",
      operationLabel: "Divisão com Resto",
      options: [1, 2, 3, 4],
      answer: 2,
      strategyTip: "Dica: 5 × 9 = 45. Para chegar em 47, faltam 2 (resto 2)!",
    },
    {
      id: "m4-c3-3",
      question: "15 × 8 = ?",
      operationLabel: "Multiplicação Rápida",
      options: [100, 110, 120, 130],
      answer: 120,
      strategyTip: "Dica: 10 × 8 = 80 e 5 × 8 = 40. 80 + 40 = 120!",
    },
  ],
  4: [
    {
      id: "m4-c4-1",
      question: "Quanto é 1/2 (metade) de 60 moedas de ouro?",
      operationLabel: "Frações de Quantidade",
      options: [20, 25, 30, 40],
      answer: 30,
      strategyTip: "Dica: Para achar a metade (1/2), divida 60 por 2 = 30!",
    },
    {
      id: "m4-c4-2",
      question: "Quanto é 1/4 (um quarto) de 100 diamantes?",
      operationLabel: "Quarta Parte (1/4)",
      options: [20, 25, 30, 50],
      answer: 25,
      strategyTip: "Dica: 100 dividido por 4 partes iguais = 25!",
    },
  ],
  5: [
    {
      id: "m4-c5-1",
      question: "Um campo de futebol retangular tem 10m de largura e 20m de comprimento. Qual é o seu PERÍMETRO (soma de todos os 4 lados)?",
      operationLabel: "Cálculo de Perímetro",
      options: [40, 50, 60, 200],
      answer: 60,
      strategyTip: "Dica: Perímetro = 20 + 20 + 10 + 10 = 60 metros!",
    },
    {
      id: "m4-c5-2",
      question: "Quantos lados e vértices possui uma figura geométrica chamada HEXÁGONO?",
      operationLabel: "Geometria Plana (Hexágono)",
      options: [5, 6, 7, 8],
      answer: 6,
      strategyTip: "Dica: Hexágono vem do grego 'hexa' que significa 6!",
    },
  ],
  6: [
    {
      id: "m4-c6-1",
      question: "Quantos minutos há em um filme que dura exatamente 2 HORAS E MEIA?",
      operationLabel: "Medidas de Tempo (Horas para Minutos)",
      options: [120, 130, 150, 180],
      answer: 150,
      strategyTip: "Dica: 1 hora = 60 min. 2 horas = 120 min. Mais meia hora (30 min) = 150 min!",
    },
    {
      id: "m4-c6-2",
      question: "Quantos gramas (g) equivalem a 3 quilogramas (kg) de farinha?",
      operationLabel: "Medidas de Massa",
      options: [300, 3000, 30000, 30],
      answer: 3000,
      strategyTip: "Dica: Cada 1 kg tem 1.000 gramas. Então 3 kg = 3.000 gramas!",
    },
  ],
};

const CHAPTER_MATH_YEAR_2: Record<number, MathQuestion[]> = {
  1: [
    {
      id: "m2-c1-1",
      question: "7 + 5 = ?",
      operationLabel: "Adição Simples",
      options: [11, 12, 13, 14],
      answer: 12,
      strategyTip: "Dica: Guarde 7 na cabeça e conte mais 5 nos dedinhos: 8, 9, 10, 11, 12!",
    },
    {
      id: "m2-c1-2",
      question: "10 + 8 = ?",
      operationLabel: "Dezena + Unidade",
      options: [16, 17, 18, 19],
      answer: 18,
      strategyTip: "Dica: 1 dezena (10) mais 8 unidades soltas = 18!",
    },
  ],
  2: [
    {
      id: "m2-c2-1",
      question: "Quanto é o DOBRO de 6 maçãs?",
      operationLabel: "Dobro (2 vezes)",
      options: [10, 11, 12, 14],
      answer: 12,
      strategyTip: "Dica: Dobro é 6 + 6 = 12!",
    },
    {
      id: "m2-c2-2",
      question: "14 - 6 = ?",
      operationLabel: "Subtração Divertida",
      options: [7, 8, 9, 10],
      answer: 8,
      strategyTip: "Dica: 14 tira 4 fica 10, tira mais 2 fica 8!",
    },
  ],
  3: [
    {
      id: "m2-c3-1",
      question: "20 - 5 = ?",
      operationLabel: "Continha da Feira",
      options: [14, 15, 16, 17],
      answer: 15,
      strategyTip: "Dica: Contando de 5 em 5 para trás: 20 menos 5 = 15!",
    },
  ],
  4: [
    {
      id: "m2-c4-1",
      question: "Quantos lados retos tem um TRIÂNGULO?",
      options: [2, 3, 4, 5],
      answer: 3,
      operationLabel: "Figuras Geométricas",
      strategyTip: "Dica: Triângulo começa com 'Tri' que significa 3 lados!",
    },
  ],
};

export function MathCalculationChallenge({
  year = 4,
  chapterId = 1,
  onAllCompleted,
}: MathCalculationChallengeProps) {
  const targetChapter = chapterId || 1;
  const questionsBank = year === 2 ? CHAPTER_MATH_YEAR_2 : CHAPTER_MATH_YEAR_4;
  const questions = questionsBank[targetChapter] || questionsBank[1];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedbackStatus, setFeedbackStatus] = useState<"idle" | "correct" | "retry">("idle");
  const [showTip, setShowTip] = useState(false);

  const currentQ = questions[currentIndex] || questions[0];

  const handleSelectOption = (num: number) => {
    playSound("click");
    setSelectedOption(num);

    if (num === currentQ.answer) {
      setFeedbackStatus("correct");
      playSound("star");
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.65 },
        });
      } catch {
        // ignore
      }
    } else {
      setFeedbackStatus("retry");
      playSound("pop");
    }
  };

  const handleNextQuestion = () => {
    playSound("click");
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setFeedbackStatus("idle");
      setShowTip(false);
    } else {
      playSound("fanfare");
      onAllCompleted();
    }
  };

  return (
    <div className="space-y-4 text-center">
      {/* Category / Operation Header with Chapter Badge */}
      <div className="flex items-center justify-between px-2 text-xs font-bold text-slate-500">
        <span className="bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full flex items-center gap-1 font-black">
          <Calculator className="w-3.5 h-3.5 text-amber-700" />
          <span>Cap. {targetChapter} • {currentQ.operationLabel}</span>
        </span>
        <span>
          {currentIndex + 1} de {questions.length}
        </span>
      </div>

      {/* Question Card */}
      <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl border-3 border-amber-300 shadow-inner flex flex-col items-center justify-center min-h-[140px]">
        <span className="text-3xl sm:text-4xl font-black text-amber-950 font-mono tracking-wider drop-shadow-sm">
          {currentQ.question}
        </span>

        {currentQ.visualHint && (
          <span className="text-sm font-semibold text-slate-600 mt-2">
            {currentQ.visualHint}
          </span>
        )}
      </div>

      {/* 4 Interactive Option Buttons */}
      <div className="grid grid-cols-2 gap-3">
        {currentQ.options.map((option) => {
          const isSelected = selectedOption === option;
          const isCorrect = option === currentQ.answer;

          let btnColor = "bg-white hover:bg-amber-50 border-amber-200 text-slate-800";

          if (feedbackStatus !== "idle" && isSelected) {
            btnColor = isCorrect
              ? "bg-emerald-500 text-white border-emerald-600 shadow-md ring-4 ring-emerald-300 animate-bounce"
              : "bg-rose-500 text-white border-rose-600 shadow-md";
          }

          return (
            <button
              key={option}
              type="button"
              disabled={feedbackStatus === "correct"}
              onClick={() => handleSelectOption(option)}
              className={`p-4 rounded-2xl border-3 font-black text-xl sm:text-2xl transition-all shadow-sm cursor-pointer active:scale-95 flex items-center justify-center ${btnColor}`}
            >
              <span>{option}</span>
            </button>
          );
        })}
      </div>

      {/* Feedback Messages */}
      {feedbackStatus === "correct" && (
        <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-2xl text-emerald-900 font-black text-sm flex items-center justify-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Resposta Exata! Excelente raciocínio! ⭐</span>
        </div>
      )}

      {feedbackStatus === "retry" && (
        <div className="p-3 bg-rose-100 border border-rose-300 rounded-2xl text-rose-900 font-bold text-xs flex items-center justify-between gap-2 animate-shake">
          <span>Quase lá! Tente de novo ou veja a dica abaixo.</span>
          <button
            type="button"
            onClick={() => setShowTip(true)}
            className="text-xs underline text-rose-700 font-black cursor-pointer"
          >
            Ver Dica 💡
          </button>
        </div>
      )}

      {/* Tip Drawer */}
      {showTip && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-2xl text-yellow-900 text-xs font-medium text-left flex items-start gap-2">
          <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>{currentQ.strategyTip}</span>
        </div>
      )}

      {/* Next Button */}
      {feedbackStatus === "correct" && (
        <button
          type="button"
          onClick={handleNextQuestion}
          className="btn-game w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95"
        >
          <span>
            {currentIndex + 1 < questions.length ? "Próxima Questão" : "Concluir Desafio"}
          </span>
          <ArrowRight className="w-4 h-4 stroke-[3]" />
        </button>
      )}
    </div>
  );
}
