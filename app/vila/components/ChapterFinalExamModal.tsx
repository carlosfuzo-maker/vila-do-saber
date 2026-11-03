"use client";

import React, { useState } from "react";
import { StudentYear, SubjectBuilding } from "../types";
import {
  X,
  Trophy,
  Sparkles,
  CheckCircle2,
  Award,
  ArrowRight,
  RotateCcw,
  Star,
  Coins,
  GraduationCap,
} from "lucide-react";
import confetti from "canvas-confetti";
import { playSound } from "@/lib/soundEffects";

interface ChapterFinalExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  subject: SubjectBuilding;
  studentName: string;
  year: StudentYear;
  onPassExam: (subjectId: string, nextChapterId: number) => void;
}

interface ExamQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const EXAM_QUESTIONS: Record<string, Record<StudentYear, ExamQuestion[]>> = {
  matematica: {
    4: [
      {
        id: "ex-mat4-1",
        question: "Quanto é 24 × 12?",
        options: ["248", "288", "300", "264"],
        correctIndex: 1,
        explanation: "24 × 10 = 240, mais 24 × 2 = 48. 240 + 48 = 288!",
      },
      {
        id: "ex-mat4-2",
        question: "Na divisão 45 ÷ 6, qual é o quociente e o resto?",
        options: ["Quociente 7 e resto 3", "Quociente 6 e resto 5", "Quociente 8 e resto 1", "Divisão exata sem resto"],
        correctIndex: 0,
        explanation: "6 × 7 = 42. Para chegar a 45 faltam 3! Quociente 7 e resto 3.",
      },
      {
        id: "ex-mat4-3",
        question: "Uma pizza foi cortada em 8 fatias iguais. Se você comeu 3 fatias, qual fração representa o que sobrou?",
        options: ["3/8", "5/8", "8/5", "1/2"],
        correctIndex: 1,
        explanation: "Se você comeu 3 de 8, restaram 5 de 8 fatias (5/8)!",
      },
      {
        id: "ex-mat4-4",
        question: "Qual figura geométrica plana possui 4 lados de mesma medida e 4 ângulos retos?",
        options: ["Triângulo", "Quadrado", "Trapézio", "Pentágono"],
        correctIndex: 1,
        explanation: "O quadrado possui 4 lados exatamente iguais e ângulos retos de 90 graus!",
      },
      {
        id: "ex-mat4-5",
        question: "Quanto é 1 quilo em gramas (1 kg = ? g)?",
        options: ["100 g", "500 g", "1.000 g", "10.000 g"],
        correctIndex: 2,
        explanation: "O prefixo 'quilo' significa mil. Portanto, 1 kg = 1.000 gramas!",
      },
    ],
    2: [
      {
        id: "ex-mat2-1",
        question: "Quanto é 15 + 7?",
        options: ["21", "22", "23", "20"],
        correctIndex: 1,
        explanation: "15 + 5 = 20, mais 2 = 22!",
      },
      {
        id: "ex-mat2-2",
        question: "Se uma dezena são 10 maçãs, quantas maçãs são 3 dezenas?",
        options: ["13", "20", "30", "300"],
        correctIndex: 2,
        explanation: "10 + 10 + 10 = 30 maçãs!",
      },
      {
        id: "ex-mat2-3",
        question: "A Bianca tinha 18 balinhas e deu 6 para o papai. Com quantas balinhas ela ficou?",
        options: ["10", "11", "12", "14"],
        correctIndex: 2,
        explanation: "18 tira 6 fica 12 balinhas!",
      },
      {
        id: "ex-mat2-4",
        question: "Qual forma geométrica parece com a roda de uma bicicleta?",
        options: ["Quadrado", "Triângulo", "Círculo", "Retângulo"],
        correctIndex: 2,
        explanation: "A roda é redondinha, um círculo perfeito!",
      },
      {
        id: "ex-mat2-5",
        question: "Se você juntar uma nota de R$ 5 com uma nota de R$ 10, quanto dinheiro você terá?",
        options: ["R$ 12", "R$ 15", "R$ 20", "R$ 50"],
        correctIndex: 1,
        explanation: "10 + 5 = 15 reais!",
      },
    ],
  },
  ciencias: {
    4: [
      {
        id: "ex-cie4-1",
        question: "Qual o papel fundamental das vacinas?",
        options: ["Fazer crescer o cabelo", "Estimular o corpo a criar anticorpos de defesa", "Substituir a alimentação", "Curar resfriado instantaneamente"],
        correctIndex: 1,
        explanation: "Vacinas treinam nossos glóbulos brancos para nos proteger de vírus e bactérias!",
      },
      {
        id: "ex-cie4-2",
        question: "O que é um ser produtor na cadeia alimentar?",
        options: ["Quem come outros animais", "As plantas que produzem o próprio alimento pelo Sol", "Os fungos que decompõem", "As bactérias da água"],
        correctIndex: 1,
        explanation: "As plantas verdes produzem energia usando a luz do Sol!",
      },
      {
        id: "ex-cie4-3",
        question: "Qual movimento da Terra em torno de si mesma gera o dia e a noite?",
        options: ["Rotação", "Translação", "Eclipse", "Gravidade"],
        correctIndex: 0,
        explanation: "A rotação demora 24 horas e alterna o dia e a noite!",
      },
      {
        id: "ex-cie4-4",
        question: "O fermento biológico que faz a massa do pão crescer é formado por:",
        options: ["Pequenos cristais de açúcar", "Fungos microscópicos vivos (leveduras)", "Gotas de água pura", "Folhas secas trituradas"],
        correctIndex: 1,
        explanation: "As leveduras são fungos vivos que liberam gás, fazendo o pão ficar fofinho!",
      },
      {
        id: "ex-cie4-5",
        question: "Qual mistura é heterogênea (onde conseguimos ver as fases separadas)?",
        options: ["Água e sal totalmente dissolvido", "Água e óleo", "Suco bem misturado", "Ar puro"],
        correctIndex: 1,
        explanation: "O óleo não se mistura com a água e fica boiando por cima!",
      },
    ],
    2: [
      {
        id: "ex-cie2-1",
        question: "Qual destes é um ser vivo que precisa de água e luz para viver?",
        options: ["A pedra do jardim", "O girassol amarelo", "O brinquedo de plástico", "O carrinho de metal"],
        correctIndex: 1,
        explanation: "O girassol é uma planta viva que cresce e precisa de água!",
      },
      {
        id: "ex-cie2-2",
        question: "Qual dos 5 sentidos nós usamos para ouvir cantigas de ninar?",
        options: ["Visão", "Audição (ouvidos)", "Olfato", "Tato"],
        correctIndex: 1,
        explanation: "Nós escutamos os sons pelo ouvido através da audição!",
      },
      {
        id: "ex-cie2-3",
        question: "De onde vêm as frutas da nossa alimentação?",
        options: ["Nascem em fábricas", "Das plantas e árvores frutíferas", "Vêm de dentro das pedras", "Caem das nuvens de chuva"],
        correctIndex: 1,
        explanation: "As maçãs, bananas e laranjas nascem em árvores cuidadas na terra!",
      },
      {
        id: "ex-cie2-4",
        question: "Qual animalzinho nasce de ovinhos e sabe voar?",
        options: ["Cachorro", "Passarinho", "Gato", "Cavalo"],
        correctIndex: 1,
        explanation: "Os passarinhos põem ovos no ninho e aprendem a voar!",
      },
      {
        id: "ex-cie2-5",
        question: "O que devemos fazer antes de comer qualquer refeição?",
        options: ["Lavar bem as mãozinhas com água e sabão", "Correr na terra", "Dormir", "Jogar bola"],
        correctIndex: 0,
        explanation: "Lavar as mãos elimina germes e protege nossa saúde!",
      },
    ],
  },
};

export function ChapterFinalExamModal({
  isOpen,
  onClose,
  subject,
  studentName,
  year,
  onPassExam,
}: ChapterFinalExamModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const questions =
    EXAM_QUESTIONS[subject.id]?.[year] ||
    EXAM_QUESTIONS["matematica"][year];

  const currentQ = questions[currentIndex] || questions[0];

  const handleSelectOption = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);

    const isCorrect = index === currentQ.correctIndex;
    if (isCorrect) {
      playSound("star");
      setScore((prev) => prev + 1);
    } else {
      playSound("pop");
    }
  };

  const handleNext = () => {
    playSound("click");
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      playSound("fanfare");
      setIsCompleted(true);
      try {
        confetti({
          particleCount: 130,
          spread: 90,
          origin: { y: 0.5 },
        });
      } catch {
        // ignore
      }
    }
  };

  const handleFinishAndUpgrade = () => {
    const nextChapterId = (subject.currentChapterId || 1) + 1;
    onPassExam(subject.id, nextChapterId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border-4 border-amber-400 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 p-4 sm:p-5 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-2xl backdrop-blur-md">
              <GraduationCap className="w-6 h-6 text-yellow-200" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-amber-900/40 text-yellow-200 px-2.5 py-0.5 rounded-full">
                Grande Teste Final do Capítulo
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white">
                Prova de Maestria: {subject.buildingName}
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              playSound("click");
              onClose();
            }}
            className="p-3 bg-white/20 hover:bg-white/30 rounded-2xl transition-transform active:scale-90 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center border border-white/30"
            aria-label="Fechar"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {isCompleted ? (
            /* Celebration & Upgrade State */
            <div className="text-center py-6 space-y-5 animate-fadeIn">
              <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500 border-4 border-white shadow-2xl flex items-center justify-center animate-bounce">
                <Trophy className="w-12 h-12 text-amber-950" />
              </div>

              <div>
                <span className="text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full inline-block mb-1">
                  ⭐ APROVADA COM LOUVOR!
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                  Parabéns, {studentName}!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto mt-1 font-medium">
                  Você acertou <strong>{score} de {questions.length}</strong> questões no Teste Final! O <strong>{subject.buildingName}</strong> ganhou um Upgrade Mágico de Nível e o próximo capítulo foi liberado!
                </p>
              </div>

              {/* Rewards Box */}
              <div className="flex items-center justify-center gap-4 bg-amber-50 p-4 rounded-2xl border-2 border-amber-300 max-w-sm mx-auto">
                <div className="flex items-center gap-1.5 text-amber-900 font-black text-xs sm:text-sm">
                  <Trophy className="w-4 h-4 text-amber-600" />
                  <span>+100 XP</span>
                </div>
                <div className="flex items-center gap-1.5 text-yellow-800 font-black text-xs sm:text-sm">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-500" />
                  <span>+5 Estrelas</span>
                </div>
                <div className="flex items-center gap-1.5 text-amber-800 font-black text-xs sm:text-sm">
                  <Coins className="w-4 h-4 text-amber-500 fill-amber-400" />
                  <span>+50 Moedas</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleFinishAndUpgrade}
                className="btn-game px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-sm sm:text-base rounded-2xl shadow-xl flex items-center justify-center gap-2 mx-auto cursor-pointer transition-transform active:scale-95"
              >
                <span>Evoluir Mundo & Desbloquear Próximo Capítulo</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <>
              {/* Question progress */}
              <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-100">
                <span className="font-extrabold text-slate-500">
                  Questão {currentIndex + 1} de {questions.length}
                </span>
                <span className="font-black text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  Acertos: {score}
                </span>
              </div>

              {/* Question Title */}
              <div className="p-4 bg-amber-50/70 border-2 border-amber-200 rounded-2xl">
                <h4 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
                  {currentQ.question}
                </h4>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentQ.correctIndex;
                  const showResult = selectedOption !== null;

                  let style = "bg-white hover:bg-amber-50 border-slate-200 text-slate-700";
                  if (showResult) {
                    if (isCorrect) {
                      style = "bg-emerald-50 border-emerald-500 text-emerald-950 font-black ring-2 ring-emerald-300";
                    } else if (isSelected && !isCorrect) {
                      style = "bg-rose-50 border-rose-400 text-rose-950 line-through opacity-80";
                    } else {
                      style = "bg-slate-50 border-slate-200 text-slate-400";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={showResult}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full p-3.5 rounded-2xl border-2 text-xs sm:text-sm text-left font-medium transition-all flex items-center justify-between gap-3 cursor-pointer shadow-sm ${style}`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center font-black text-xs shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {showResult && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation on answer */}
              {selectedOption !== null && (
                <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl text-xs text-sky-950 font-medium animate-fadeIn flex items-start gap-2">
                  <span>🦉</span>
                  <p>{currentQ.explanation}</p>
                </div>
              )}

              {/* Advance Button */}
              {selectedOption !== null && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="btn-game w-full p-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95"
                  >
                    <span>
                      {currentIndex + 1 < questions.length
                        ? "Próxima Questão"
                        : "Ver Resultado & Upgrade do Mundo"}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
