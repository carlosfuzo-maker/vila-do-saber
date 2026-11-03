"use client";

import React from "react";
import { ExamAlert } from "../types";
import { AlarmClock, Calendar, Sparkles, ChevronRight } from "lucide-react";
import { playSound } from "@/lib/soundEffects";
import { calculateDaysUntil, formatDateShort } from "@/lib/dateUtils";

interface ExamBannerProps {
  exams: ExamAlert[];
  onOpenExamDetails: (subjectId: string) => void;
}

export function ExamBanner({ exams, onOpenExamDetails }: ExamBannerProps) {
  if (exams.length === 0) return null;

  // Sort by closest date
  const sorted = [...exams].sort(
    (a, b) => new Date(a.examDate).getTime() - new Date(b.examDate).getTime()
  );
  const nextExam = sorted[0];

  const countdown = calculateDaysUntil(nextExam.examDate);

  return (
    <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white shadow-md border-b-2 border-amber-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2 bg-white/20 rounded-xl shrink-0 backdrop-blur-md animate-bounce">
            <AlarmClock className="w-5 h-5 text-yellow-200" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-white text-amber-900 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                Aviso Importante de Prova
              </span>
              <span className="text-xs font-black bg-rose-600/90 px-2 py-0.5 rounded-full border border-rose-300">
                {countdown.text}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-bold truncate mt-0.5">
              <span>{nextExam.subjectName}: </span>
              <span className="font-medium text-amber-100">
                {nextExam.chaptersCovered}
              </span>
              <span className="text-yellow-200 ml-1">
                ({formatDateShort(nextExam.examDate)})
              </span>
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            playSound("click");
            onOpenExamDetails(nextExam.subjectId);
          }}
          className="btn-game px-3.5 py-1.5 bg-white text-amber-900 hover:bg-amber-100 rounded-xl text-xs font-black shadow-sm flex items-center gap-1 cursor-pointer shrink-0"
        >
          <span>Ver Orientações</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
