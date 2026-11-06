"use client";

import React, { useState } from "react";
import { StudentYear } from "../rpgTypes";
import { SchoolChapterLesson } from "../data/citySchoolData";
import { AcademicSubject } from "../data/academicQuestions";
import { playSound } from "@/lib/soundEffects";
import confetti from "canvas-confetti";
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  GraduationCap,
  X,
  HelpCircle,
} from "lucide-react";

interface CitySchoolModalProps {
  isOpen: boolean;
  onClose: () => void;
  lesson: SchoolChapterLesson;
  studentYear?: StudentYear;
  playerName?: string;
  studentName?: string;
  isAlreadyCompleted: boolean;
  onCompleteLesson: (
    chapterId: string,
    coinsEarned: number,
    xpEarned: number,
    huntQuotaBonus: number
  ) => void;
  onStartSubjectExam?: (subject: AcademicSubject) => void;
}

export function CitySchoolModal({
  isOpen,
  onClose,
  lesson,
  studentYear = 2,
  playerName,
  studentName,
  isAlreadyCompleted,
  onCompleteLesson,
  onStartSubjectExam,
}: CitySchoolModalProps) {
  const displayPlayerName = playerName || studentName || "Estudante";
  const slides = lesson.slidesByYear[studentYear] || lesson.slidesByYear[2];
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [slideVerified, setSlideVerified] = useState<boolean>(isAlreadyCompleted);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentSlide = slides[currentSlideIdx] || slides[0];
  const isLastSlide = currentSlideIdx >= slides.length - 1;

  const handleSelectOption = (idx: number) => {
    setSelectedOption(idx);
    if (idx === currentSlide.interactivePrompt.correctIndex) {
      playSound("star");
      setSlideVerified(true);
      setFeedbackMsg(`✨ ${currentSlide.interactivePrompt.explanation}`);
    } else {
      playSound("pop");
      setSlideVerified(false);
      setFeedbackMsg("Quase lá! Leia os cartões ilustrados acima e tente outra opção! 💡");
    }
  };

  const handleNextSlide = () => {
    if (!slideVerified && !isAlreadyCompleted) {
      playSound("pop");
      setFeedbackMsg("Responda ao desafio interativo do quadro antes de avançar! 👆");
      return;
    }

    if (!isLastSlide) {
      playSound("click");
      setCurrentSlideIdx((prev) => prev + 1);
      setSelectedOption(null);
      setSlideVerified(isAlreadyCompleted);
      setFeedbackMsg(null);
    } else {
      playSound("fanfare");
      confetti({
        particleCount: 70,
        spread: 65,
        origin: { y: 0.6 },
      });
      onCompleteLesson(lesson.chapterId, 8, 25, 4);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlideIdx > 0) {
      playSound("click");
      setCurrentSlideIdx((prev) => prev - 1);
      setSelectedOption(null);
      setSlideVerified(true);
      setFeedbackMsg(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-fadeIn select-none">
      <div className="relative w-full max-w-2xl bg-slate-900 rounded-[28px] overflow-hidden border-4 border-amber-400 shadow-2xl flex flex-col max-h-[92vh]">
        {/* Top School Banner */}
        <div
          className="px-4 py-3 text-white flex items-center justify-between border-b-2 border-white/20"
          style={{ backgroundColor: lesson.themeColor }}
        >
          <div className="flex items-center gap-2.5">
            <span className="text-2xl bg-white/20 p-1.5 rounded-xl">{lesson.teacherEmoji}</span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-black tracking-wide">
                  {lesson.schoolTitle}
                </h2>
                <span className="text-[10px] font-black bg-amber-300 text-slate-950 px-2 py-0.5 rounded-full">
                  {studentYear}º Ano • {displayPlayerName}
                </span>
              </div>
              <p className="text-[11px] text-white/90 font-bold">
                {lesson.teacherName} • Cidade de {lesson.cityName}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-black/25 hover:bg-black/40 text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Main Interactive Blackboard Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white">
          {/* Slide Header & Progress */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-xs font-black px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              <BookOpen className="w-3.5 h-3.5" />
              {currentSlide.badgeText}
            </span>
            <span className="text-xs font-black text-amber-300">
              Lousa {currentSlideIdx + 1} de {slides.length}
            </span>
          </div>

          {/* Chalkboard Card */}
          <div className="p-4 rounded-2xl bg-emerald-950/90 border-4 border-amber-600/80 shadow-inner space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{currentSlide.emoji}</span>
              <h3 className="text-base sm:text-lg font-black text-amber-200">
                {currentSlide.title}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-emerald-50 font-semibold leading-relaxed">
              {currentSlide.storyText}
            </p>

            {/* Visual Flashcards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              {currentSlide.visualCards.map((card, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-xl bg-slate-900/80 border border-emerald-400/30 flex flex-col gap-1"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">{card.icon}</span>
                    <span className="text-xs font-black text-amber-300">{card.label}</span>
                  </div>
                  <p className="text-[11px] text-slate-200 font-medium leading-snug">
                    {card.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Mini-Check */}
          <div className="p-3.5 rounded-2xl bg-slate-800/90 border-2 border-indigo-400/40 space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-black text-indigo-300 uppercase tracking-wider">
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span>Interação na Lousa (Desbloqueia a Prova e a Grama Alta!)</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-white">
              {currentSlide.interactivePrompt.question}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {currentSlide.interactivePrompt.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentSlide.interactivePrompt.correctIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    className={`p-2.5 rounded-xl text-xs font-black border-2 transition text-left cursor-pointer ${
                      isSelected
                        ? isCorrect
                          ? "bg-emerald-600 border-emerald-300 text-white shadow-md"
                          : "bg-rose-600 border-rose-300 text-white"
                        : "bg-slate-900 hover:bg-slate-700 border-slate-600 text-slate-100"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {feedbackMsg && (
              <p
                className={`text-xs font-extrabold pt-1 ${
                  slideVerified ? "text-emerald-300" : "text-amber-300"
                }`}
              >
                {feedbackMsg}
              </p>
            )}
          </div>
        </div>

        {/* Footer Controls */}
        <div className="px-4 py-3 bg-slate-950 border-t-2 border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {currentSlideIdx > 0 && (
              <button
                type="button"
                onClick={handlePrevSlide}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Anterior</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {isAlreadyCompleted && onStartSubjectExam && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onStartSubjectExam(lesson.academicSubject);
                }}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black flex items-center gap-1.5 shadow-lg cursor-pointer"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Realizar Teste da Matéria Agora! 📝</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleNextSlide}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black flex items-center gap-1.5 shadow-lg transition cursor-pointer ${
                slideVerified || isAlreadyCompleted
                  ? "bg-emerald-500 hover:bg-emerald-400 text-slate-950"
                  : "bg-amber-500/80 hover:bg-amber-500 text-slate-950"
              }`}
            >
              {isLastSlide ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Concluir Aula & Liberar Testes! 🎓</span>
                </>
              ) : (
                <>
                  <span>Próxima Lousa</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

