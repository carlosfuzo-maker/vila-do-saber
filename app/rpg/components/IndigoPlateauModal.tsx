"use client";

import React, { useState, useMemo } from "react";
import { ExamAlert, StudentYear } from "../../vila/types";
import {
  Trophy,
  X,
  Sparkles,
  Calendar,
  BookOpen,
  Award,
  CheckCircle2,
  AlertCircle,
  Zap,
  ArrowRight,
  RotateCcw,
  Star,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import confetti from "canvas-confetti";
import { playSound } from "@/lib/soundEffects";

export interface PlateauQuestion {
  id: string;
  subjectId: string;
  subjectName: string;
  chapter: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  trainerName: string;
  trainerRole: string;
  trainerEmoji: string;
}

// Tailored curriculum questions for 2º ano (Bianca) & 4º ano (Cecília)
const PLATEAU_QUESTIONS_BANK: Record<StudentYear, PlateauQuestion[]> = {
  // 4º ANO (Cecília)
  4: [
    // Matemática - Capítulos 2 e 3 (Multiplicação com 2 algarismos e Divisão)
    {
      id: "mat4-c2-1",
      subjectId: "matematica",
      subjectName: "Matemática",
      chapter: "Capítulo 2: Multiplicação com 2 algarismos",
      trainerName: "Mestre Bruno",
      trainerRole: "Elite Four de Matemática",
      trainerEmoji: "🥋",
      question: "Mestre Bruno: 'Quanto é 24 × 12 na multiplicação em duas etapas?'",
      options: ["248", "288", "300", "264"],
      correctIndex: 1,
      explanation: "24 × 10 = 240, mais 24 × 2 = 48. Somando 240 + 48 = 288!",
    },
    {
      id: "mat4-c3-2",
      subjectId: "matematica",
      subjectName: "Matemática",
      chapter: "Capítulo 3: Divisão e Resto",
      trainerName: "Mestre Bruno",
      trainerRole: "Elite Four de Matemática",
      trainerEmoji: "🥋",
      question: "Mestre Bruno: 'Na divisão 45 ÷ 6, qual é o quociente e o resto?'",
      options: [
        "Quociente 7 e resto 3",
        "Quociente 6 e resto 5",
        "Quociente 8 e resto 1",
        "Divisão exata sem resto",
      ],
      correctIndex: 0,
      explanation: "6 × 7 = 42. Para chegar a 45 faltam 3! Quociente 7 e resto 3.",
    },
    {
      id: "mat4-c3-3",
      subjectId: "matematica",
      subjectName: "Matemática",
      chapter: "Capítulo 3: Frações e Partes do Todo",
      trainerName: "Mestre Bruno",
      trainerRole: "Elite Four de Matemática",
      trainerEmoji: "🥋",
      question: "Uma torta foi dividida em 8 pedaços iguais. Se foram comidos 3 pedaços, que fração sobrou?",
      options: ["3/8", "5/8", "8/5", "1/2"],
      correctIndex: 1,
      explanation: "O total é 8/8. Se comeram 3/8, sobram 5/8 da torta!",
    },
    // Ciências - Capítulo 2: Microrganismos, Vacinas e Prevenção
    {
      id: "cie4-c2-1",
      subjectId: "ciencias",
      subjectName: "Ciências",
      chapter: "Capítulo 2: Microrganismos e Vacinas",
      trainerName: "Dra. Agatha",
      trainerRole: "Elite Four de Ciências",
      trainerEmoji: "🧪",
      question: "Dra. Agatha: 'Qual é o principal papel das vacinas em nosso organismo?'",
      options: [
        "Estimular o corpo a produzir anticorpos de defesa",
        "Substituir a água e os alimentos",
        "Fazer os dentes crescerem mais rápido",
        "Curar machucados em 1 segundo",
      ],
      correctIndex: 0,
      explanation: "As vacinas estimulam o sistema imunológico a gerar anticorpos e memória de defesa!",
    },
    {
      id: "cie4-c2-2",
      subjectId: "ciencias",
      subjectName: "Ciências",
      chapter: "Capítulo 2: Microrganismos Úteis",
      trainerName: "Dra. Agatha",
      trainerRole: "Elite Four de Ciências",
      trainerEmoji: "🧪",
      question: "Qual microrganismo (fungo microscópico) faz a massa do pão caseiro crescer e ficar fofa?",
      options: ["Levedura (fermento biológico)", "Vírus da gripe", "Bactéria do gelo", "Alga marinha"],
      correctIndex: 0,
      explanation: "As leveduras são fungos vivos que realizam fermentação e liberam bolhas de CO2 na massa!",
    },
    {
      id: "cie4-c1-3",
      subjectId: "ciencias",
      subjectName: "Ciências",
      chapter: "Capítulo 1: Cadeia Alimentar e Produtores",
      trainerName: "Dra. Agatha",
      trainerRole: "Elite Four de Ciências",
      trainerEmoji: "🧪",
      question: "Por que as plantas verdes são classificadas como PRODUTORES nos ecossistemas?",
      options: [
        "Porque produzem o próprio alimento através da fotossíntese",
        "Porque caçam pequenos animais na terra",
        "Porque compram nutrientes no mercado",
        "Porque só crescem em noites sem lua",
      ],
      correctIndex: 0,
      explanation: "As plantas utilizam luz solar, água e gás carbônico para produzir seu próprio alimento orgânico!",
    },
    // Português - Classes de Palavras & Interpretação
    {
      id: "por4-c2-1",
      subjectId: "portugues",
      subjectName: "Português",
      chapter: "Capítulo 2: Substantivos e Adjetivos",
      trainerName: "Mestra Lorelei",
      trainerRole: "Elite Four de Português",
      trainerEmoji: "📖",
      question: "Na frase 'A menina veloz venceu a corrida do Platô', qual palavra é um adjetivo?",
      options: ["menina", "veloz", "venceu", "corrida"],
      correctIndex: 1,
      explanation: "'Veloz' indica uma característica e qualidade da menina, portanto é um adjetivo!",
    },
    // Inglês - Gramática & Vocabulário
    {
      id: "ing4-c2-1",
      subjectId: "ingles",
      subjectName: "Inglês",
      chapter: "Capítulo 2: Adjectives & Word Order",
      trainerName: "Champion Lance",
      trainerRole: "Campeão Global do Saber",
      trainerEmoji: "🐉",
      question: "Champion Lance: 'In English, como dizemos 'cachorro azul veloz' respeitando a ordem dos adjetivos?'",
      options: ["Fast blue dog", "Dog blue fast", "Blue dog fast", "Fast dog blue"],
      correctIndex: 0,
      explanation: "Em inglês, os adjetivos de velocidade e cor antecedem o substantivo: 'Fast blue dog'!",
    },
  ],

  // 2º ANO (Bianca)
  2: [
    // Matemática - Capítulo 1 e 2: Dezenas e Continhas de Adição
    {
      id: "mat2-c1-1",
      subjectId: "matematica",
      subjectName: "Matemática",
      chapter: "Capítulo 1 e 2: Dezenas e Adição",
      trainerName: "Mestre Bruno",
      trainerRole: "Elite Four de Matemática",
      trainerEmoji: "🥋",
      question: "Mestre Bruno: 'Se 1 dezena são 10 moedas, quantas moedas são 3 dezenas?'",
      options: ["13 moedas", "20 moedas", "30 moedas", "40 moedas"],
      correctIndex: 2,
      explanation: "10 + 10 + 10 = 30 moedas! Três dezenas completas!",
    },
    {
      id: "mat2-c2-2",
      subjectId: "matematica",
      subjectName: "Matemática",
      chapter: "Capítulo 2: Continhas de Adição",
      trainerName: "Mestre Bruno",
      trainerRole: "Elite Four de Matemática",
      trainerEmoji: "🥋",
      question: "A Bianca tinha 15 estrelinhas mágicas e ganhou mais 7 de sua irmã. Com quantas ficou?",
      options: ["20", "21", "22", "23"],
      correctIndex: 2,
      explanation: "15 + 7 = 22 estrelinhas brilhantes!",
    },
    {
      id: "mat2-c2-3",
      subjectId: "matematica",
      subjectName: "Matemática",
      chapter: "Capítulo 2: Subtração e Diferença",
      trainerName: "Mestre Bruno",
      trainerRole: "Elite Four de Matemática",
      trainerEmoji: "🥋",
      question: "No jardim tinham 18 borboletas. 6 delas voaram para a árvore. Quantas continuaram no jardim?",
      options: ["10", "11", "12", "14"],
      correctIndex: 2,
      explanation: "18 - 6 = 12 borboletas!",
    },
    // Ciências - Seres Vivos, Plantas e Saúde
    {
      id: "cie2-c1-1",
      subjectId: "ciencias",
      subjectName: "Ciências",
      chapter: "Capítulo 1: Partes das Plantas",
      trainerName: "Dra. Agatha",
      trainerRole: "Elite Four de Ciências",
      trainerEmoji: "🧪",
      question: "Dra. Agatha: 'Qual parte da plantinha fica debaixo da terra e absorve água com carinho?'",
      options: ["A flor", "A folha", "A raiz", "O fruto"],
      correctIndex: 2,
      explanation: "A raiz absorve água e sais minerais da terra úmida para toda a planta crescer viçosa!",
    },
    {
      id: "cie2-c2-2",
      subjectId: "ciencias",
      subjectName: "Ciências",
      chapter: "Capítulo 2: Hábitos Saudáveis e Sentidos",
      trainerName: "Dra. Agatha",
      trainerRole: "Elite Four de Ciências",
      trainerEmoji: "🧪",
      question: "Qual dos cinco sentidos nós usamos com os ouvidos para escutar a voz dos pais?",
      options: ["Visão", "Audição", "Olfato", "Paladar"],
      correctIndex: 1,
      explanation: "Com a audição nós ouvimos as histórias, cantigas e conselhos com amor!",
    },
    // Português - Sílabas e Rimas
    {
      id: "por2-c1-1",
      subjectId: "portugues",
      subjectName: "Português",
      chapter: "Capítulo 1: Separação de Sílabas",
      trainerName: "Mestra Lorelei",
      trainerRole: "Elite Four de Português",
      trainerEmoji: "📖",
      question: "Quantas sílabas tem a palavra 'ES-CO-LA'?",
      options: ["2 sílabas", "3 sílabas", "4 sílabas"],
      correctIndex: 1,
      explanation: "Es-co-la tem 3 pedacinhos sonoros (sílabas)!",
    },
    // Inglês - Cores e Animais
    {
      id: "ing2-c1-1",
      subjectId: "ingles",
      subjectName: "Inglês",
      chapter: "Capítulo 1: Colors & Animals",
      trainerName: "Champion Lance",
      trainerRole: "Campeão Global do Saber",
      trainerEmoji: "🐉",
      question: "Champion Lance: 'Qual animal é conhecido em inglês como 'DOG'?'",
      options: ["Gato", "Cachorro", "Pássaro", "Peixe"],
      correctIndex: 1,
      explanation: "'Dog' é Cachorro! Como o nosso pet carinhoso da família!",
    },
  ],
};

interface IndigoPlateauModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  currentYear: StudentYear;
  exams: ExamAlert[];
  pokemonTeamCount: number;
  onOpenExamCalendar: () => void;
  onCompleteSimulado: (awardedCoins: number, doubledExp: number, isDoubled: boolean) => void;
}

export const IndigoPlateauModal: React.FC<IndigoPlateauModalProps> = ({
  isOpen,
  onClose,
  studentName,
  currentYear,
  exams,
  pokemonTeamCount,
  onOpenExamCalendar,
  onCompleteSimulado,
}) => {
  // Find active exams for this student
  const studentExams = useMemo(() => {
    return exams.filter((e) => e.year === currentYear);
  }, [exams, currentYear]);

  const isExamWeekMode = studentExams.length > 0;
  const targetExam = studentExams[0];

  // Tailored question list: prioritize subject matching target exam if active
  const questionsList = useMemo(() => {
    const fullBank = PLATEAU_QUESTIONS_BANK[currentYear] || PLATEAU_QUESTIONS_BANK[4];
    if (isExamWeekMode && targetExam) {
      const matching = fullBank.filter((q) => q.subjectId === targetExam.subjectId);
      const nonMatching = fullBank.filter((q) => q.subjectId !== targetExam.subjectId);
      // Top 3 matching + 2 other review questions for balanced mock exam
      const selected = [...matching, ...nonMatching].slice(0, 5);
      return selected.length > 0 ? selected : fullBank.slice(0, 5);
    }
    return fullBank.slice(0, 5);
  }, [currentYear, isExamWeekMode, targetExam]);

  // Quiz state
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentQ = questionsList[currentStep] || questionsList[0];
  const totalQuestions = questionsList.length;

  const handleSelectOption = (idx: number) => {
    if (hasAnswered) return;
    setSelectedAnswer(idx);
    setHasAnswered(true);

    const isCorrect = idx === currentQ.correctIndex;
    if (isCorrect) {
      playSound("star");
      setScore((s) => s + 1);
    } else {
      playSound("pop");
    }
  };

  const handleNextQuestion = () => {
    playSound("click");
    if (currentStep + 1 < totalQuestions) {
      setCurrentStep((prev) => prev + 1);
      setSelectedAnswer(null);
      setHasAnswered(false);
    } else {
      // Completed Simulado!
      setIsFinished(true);
      playSound("fanfare");
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 },
      });

      // Calculate rewards: base EXP doubled!
      // Base: 160 EXP * 2 = 320 EXP, Coins: 120
      const baseExp = 160;
      const doubledExp = baseExp * 2;
      const coinsReward = 45;
      onCompleteSimulado(coinsReward, doubledExp, true);
    }
  };

  const handleRestart = () => {
    playSound("click");
    setCurrentStep(0);
    setSelectedAnswer(null);
    setHasAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-fadeIn select-none touch-manipulation">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 rounded-[32px] overflow-hidden border-4 border-indigo-400/90 shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header: Indigo Plateau Grand Shield */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-indigo-950 via-purple-950 to-slate-950 text-white flex items-center justify-between border-b border-indigo-500/40 relative">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-2xl shadow-lg border border-indigo-300">
              🏔️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-300 bg-indigo-900/60 px-2.5 py-0.5 rounded-full border border-indigo-400/40">
                  Cúpula dos Campeões
                </span>
                <span className="text-[10px] font-black uppercase text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-500/40 flex items-center gap-1">
                  <Zap className="w-3 h-3 fill-amber-300 text-amber-300 animate-pulse" />
                  <span>EXP em Dobro (2x)</span>
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white tracking-wide mt-0.5">
                Indigo Plateau • Simulado Escolar
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              playSound("pop");
              onClose();
            }}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition active:scale-95 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* SEMANA DE PROVAS & REVISÃO GERAL BANNER */}
          {isExamWeekMode && targetExam ? (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-indigo-900/40 to-purple-900/40 border-2 border-amber-400/80 shadow-lg space-y-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-xl bg-amber-500 text-slate-950 text-[11px] font-black uppercase tracking-wide flex items-center gap-1 shadow">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Modo Ativo: Semana de Provas & Revisão Geral</span>
                  </span>
                  <span className="text-xs font-bold text-amber-300">
                    {studentName} ({currentYear}º Ano)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    playSound("open");
                    onOpenExamCalendar();
                  }}
                  className="text-[11px] font-black text-indigo-300 hover:text-white flex items-center gap-1 bg-indigo-950/70 px-2.5 py-1 rounded-xl border border-indigo-400/30 cursor-pointer active:scale-95 transition"
                >
                  <Calendar className="w-3 h-3 text-indigo-300" />
                  <span>Ver Calendário de Provas</span>
                </button>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-white">
                    📘 Prova de {targetExam.subjectName}
                  </span>
                  <span className="text-xs text-amber-300 font-bold bg-amber-950/60 px-2 py-0.5 rounded-lg border border-amber-500/30">
                    Data: {targetExam.examDate}
                  </span>
                </div>
                <p className="text-xs text-indigo-200 leading-relaxed">
                  <strong className="text-white">Capítulos em Avaliação:</strong> {targetExam.chaptersCovered}
                </p>
                {targetExam.notes && (
                  <p className="text-[11px] text-amber-200/90 italic">
                    💡 Dica de Estudo: &ldquo;{targetExam.notes}&rdquo;
                  </p>
                )}
              </div>

              <div className="pt-2 border-t border-indigo-400/20 flex items-center justify-between text-[11px] text-indigo-300">
                <span>⚡ O Simulado adaptou as perguntas para os tópicos exatos desta avaliação!</span>
                <span className="font-black text-amber-300">Bônus: 2x EXP Pokémon 🐾</span>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/60 to-slate-900 border border-indigo-400/30 flex items-center justify-between flex-wrap gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase text-indigo-300 bg-indigo-900/60 px-2.5 py-0.5 rounded-full border border-indigo-500/30">
                    Simulado dos Campeões
                  </span>
                  <span className="text-xs text-slate-300">
                    Revisão Geral • {studentName} ({currentYear}º Ano)
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  Nenhuma prova escolar agendada para hoje. Você pode treinar todas as matérias com bônus de 2x EXP!
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  playSound("open");
                  onOpenExamCalendar();
                }}
                className="btn-game px-3.5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-black shadow-md border border-indigo-300 flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Agendar Prova Escolar 📅</span>
              </button>
            </div>
          )}

          {/* SIMULADO PROGRESSION OR RESULTS */}
          {!isFinished ? (
            <div className="space-y-4">
              {/* Question Header & Trainer Badge */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-indigo-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{currentQ.trainerEmoji}</span>
                    <div>
                      <h4 className="text-xs font-black text-white">{currentQ.trainerName}</h4>
                      <p className="text-[10px] text-indigo-300 font-bold">{currentQ.trainerRole}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-black text-amber-300 bg-slate-950/80 px-2.5 py-1 rounded-xl border border-indigo-500/30">
                    <Trophy className="w-3.5 h-3.5 text-amber-400" />
                    <span>
                      Questão {currentStep + 1} de {totalQuestions}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-indigo-400/20">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / totalQuestions) * 100}%` }}
                  />
                </div>

                {/* Subject & Chapter Badge */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-black uppercase bg-indigo-950 text-indigo-200 px-2 py-0.5 rounded-md border border-indigo-500/40">
                    {currentQ.subjectName}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-300">
                    {currentQ.chapter}
                  </span>
                </div>

                {/* Question Text */}
                <p className="text-sm sm:text-base font-black text-white leading-snug">
                  {currentQ.question}
                </p>
              </div>

              {/* Options List */}
              <div className="space-y-2.5">
                {currentQ.options.map((option, idx) => {
                  const isSelected = selectedAnswer === idx;
                  const isCorrect = idx === currentQ.correctIndex;

                  let buttonStyle =
                    "bg-slate-900/80 hover:bg-slate-800 text-slate-100 border-indigo-500/30";
                  if (hasAnswered) {
                    if (isCorrect) {
                      buttonStyle =
                        "bg-emerald-950/90 text-emerald-200 border-emerald-400 shadow-md shadow-emerald-900/40";
                    } else if (isSelected && !isCorrect) {
                      buttonStyle =
                        "bg-rose-950/90 text-rose-200 border-rose-500";
                    } else {
                      buttonStyle = "bg-slate-900/40 text-slate-500 border-transparent opacity-60";
                    }
                  } else if (isSelected) {
                    buttonStyle = "bg-indigo-600 text-white border-white";
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectOption(idx)}
                      disabled={hasAnswered}
                      className={`w-full p-3.5 sm:p-4 rounded-2xl border-2 text-left text-xs sm:text-sm font-black transition-all flex items-center justify-between gap-3 cursor-pointer min-h-[52px] active:scale-[0.99] ${buttonStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[11px] font-black shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{option}</span>
                      </div>
                      {hasAnswered && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Answer Explanation & Next Button */}
              {hasAnswered && (
                <div className="p-4 rounded-2xl bg-indigo-950/80 border border-indigo-400/50 space-y-3 animate-fadeIn">
                  <div className="flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-indigo-100 leading-relaxed">
                      <strong className="text-white">Explicação da Cúpula:</strong>{" "}
                      {currentQ.explanation}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="btn-game w-full py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition"
                  >
                    <span>
                      {currentStep + 1 < totalQuestions ? "Próximo Desafio" : "Ver Resultado dos Campeões"}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* FINISHED / RESULTS SCREEN WITH 2X EXP CELEBRATION */
            <div className="p-6 rounded-3xl bg-gradient-to-b from-indigo-950/90 via-slate-900 to-indigo-950/90 border-2 border-indigo-400 text-center space-y-5 animate-scaleUp">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-amber-400 via-yellow-400 to-orange-500 flex items-center justify-center text-4xl shadow-xl border-2 border-white animate-bounce-subtle">
                🏆
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-black uppercase tracking-widest text-amber-300 bg-amber-950 px-3 py-1 rounded-full border border-amber-500/40">
                  Simulado Concluído com Honras!
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Parabéns, Campeã {studentName}!
                </h3>
                <p className="text-xs sm:text-sm text-indigo-200">
                  Você acertou <strong className="text-white">{score}</strong> de{" "}
                  <strong className="text-white">{totalQuestions}</strong> questões da Elite dos Saberes!
                </p>
              </div>

              {/* 2X EXP AWARD BADGE */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-indigo-600/30 to-purple-600/20 border-2 border-amber-400 shadow-inner space-y-2">
                <div className="flex items-center justify-center gap-2 text-amber-300 font-black text-sm">
                  <Zap className="w-4 h-4 fill-amber-300" />
                  <span>BÔNUS EXCLUSIVO: EXP EM DOBRO ATIVADO!</span>
                </div>
                <p className="text-xs text-white leading-relaxed">
                  Todos os <strong className="text-amber-300">{pokemonTeamCount} Pokémon</strong> da sua equipe receberam{" "}
                  <strong className="text-amber-300">+320 EXP</strong> (em dobro) e você faturou{" "}
                  <strong className="text-amber-300">+45 Moedas 🪙</strong>!
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleRestart}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Refazer Simulado</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playSound("open");
                    onClose();
                  }}
                  className="btn-game px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm shadow-md cursor-pointer active:scale-95 transition"
                >
                  Continuar Jornada no Mapa 🗺️
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-950/80 border-t border-indigo-400/20 text-center text-[10px] text-slate-400 font-semibold flex items-center justify-between px-6">
          <span>🏔️ Indigo Plateau • Liga dos Saberes</span>
          <span>Revisão Ativa BNCC • 2º e 4º Anos</span>
        </div>
      </div>
    </div>
  );
};
