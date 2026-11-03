"use client";

import React, { useState } from "react";
import { SubjectBuilding, Mission } from "../types";
import {
  X,
  Sparkles,
  Trophy,
  CheckCircle2,
  Clock,
  ArrowRight,
  Flame,
  Award,
} from "lucide-react";
import confetti from "canvas-confetti";
import { playSound } from "@/lib/soundEffects";
import { BuildingArt } from "./BuildingArt";
import { EnglishSpeechChallenge } from "./EnglishSpeechChallenge";
import { MathCalculationChallenge } from "./MathCalculationChallenge";
import { SubjectQuizChallenge } from "./SubjectQuizChallenge";
import { StudentYear } from "../types";

interface MissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  subject: SubjectBuilding | null;
  missionId: string | null;
  onCompleteMission: (subjectId: string, missionId: string) => void;
  year?: StudentYear;
  onOpenLibraryWriter?: () => void;
}

export function MissionModal({
  isOpen,
  onClose,
  subject,
  missionId,
  onCompleteMission,
  year = 4,
  onOpenLibraryWriter,
}: MissionModalProps) {
  const [isCompletedState, setIsCompletedState] = useState(false);

  if (!isOpen || !subject) return null;

  const mission: Mission =
    subject.missions.find((m) => m.id === missionId) ||
    subject.missions[0] || {
      id: "demo",
      title: "Explorando a Vila",
      xp: 50,
      stars: 3,
      type: "quiz",
      durationMinutes: 5,
      completed: false,
    };

  const handleComplete = () => {
    setIsCompletedState(true);
    playSound("fanfare");
    onCompleteMission(subject.id, mission.id);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.5 },
      });
    } catch {
      // ignore
    }

    setTimeout(() => {
      setIsCompletedState(false);
      onClose();
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/65 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border-4 border-amber-300 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header with building banner */}
        <div className={`p-4 sm:p-5 ${subject.bgGradient} border-b-2 ${subject.borderColor} flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-2xl shadow-sm border border-slate-200">
              <BuildingArt type={subject.buildingArtType} className="w-12 h-12" />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase text-slate-500 bg-white/80 px-2 py-0.5 rounded-full">
                {subject.name}
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                {subject.buildingName}
              </h3>
            </div>
          </div>

          {/* Large, comfortable close button for tablets */}
          <button
            onClick={() => {
              playSound("click");
              onClose();
            }}
            className="p-3 bg-white/90 hover:bg-white rounded-2xl transition-transform active:scale-90 cursor-pointer shadow-md min-w-[46px] min-h-[46px] flex items-center justify-center border border-slate-200"
            aria-label="Fechar janela"
          >
            <X className="w-6 h-6 text-slate-800" />
          </button>
        </div>

        {/* Mission Body */}
        <div className="p-5 sm:p-6 space-y-5 text-center overflow-y-auto">
          {subject.id === "matematica" ? (
            /* Interactive Math Calculation Challenge */
            <div className="space-y-4">
              <MathCalculationChallenge
                year={year}
                chapterId={subject.currentChapterId}
                onAllCompleted={handleComplete}
              />

              {isCompletedState && (
                <div className="py-4 bg-emerald-500 text-white rounded-2xl font-black text-base flex items-center justify-center gap-2 animate-bounce">
                  <CheckCircle2 className="w-6 h-6" />
                  <span>Desafio de Matemática Concluído! +{mission.xp} XP!</span>
                </div>
              )}
            </div>
          ) : subject.id === "ingles" ? (
            /* Interactive English Speech Recognition Challenge */
            <div className="space-y-4">
              <EnglishSpeechChallenge
                currentChapterId={subject.currentChapterId}
                year={year}
                onAllCompleted={handleComplete}
              />

              {isCompletedState && (
                <div className="py-4 bg-emerald-500 text-white rounded-2xl font-black text-base flex items-center justify-center gap-2 animate-bounce">
                  <CheckCircle2 className="w-6 h-6" />
                  <span>Desafio de Inglês Cumprido! +{mission.xp} XP!</span>
                </div>
              )}
            </div>
          ) : (
            /* Interactive Subject Quiz Challenge for Ciências, História/Geografia, Português, T.E. e Artes */
            <div className="space-y-4">
              <SubjectQuizChallenge
                subjectId={subject.id}
                subjectName={subject.name}
                year={year}
                chapterId={subject.currentChapterId}
                onAllCompleted={handleComplete}
                onOpenWriter={
                  onOpenLibraryWriter
                    ? () => {
                        onClose();
                        onOpenLibraryWriter();
                      }
                    : undefined
                }
              />

              {isCompletedState && (
                <div className="py-4 bg-emerald-500 text-white rounded-2xl font-black text-base flex items-center justify-center gap-2 animate-bounce">
                  <CheckCircle2 className="w-6 h-6" />
                  <span>Missão Concluída com Sucesso! +{mission.xp} XP!</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
