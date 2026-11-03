"use client";

import React, { useState, useEffect } from "react";
import { SubjectBuilding, StudentYear } from "../types";
import {
  X,
  BookmarkCheck,
  Sparkles,
  Check,
  Layers,
  GraduationCap,
  Lock,
  Unlock,
  KeyRound,
  ShieldAlert,
} from "lucide-react";
import confetti from "canvas-confetti";
import { playSound } from "@/lib/soundEffects";

interface ChapterSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  year: StudentYear;
  subjects: SubjectBuilding[];
  initialSubjectId?: string;
  unlockedChapter?: number;
  onUpdateChapter: (subjectId: string, chapterId: number) => void;
  onOpenTempleOfEnigmas?: () => void;
}

export function ChapterSelectorModal({
  isOpen,
  onClose,
  year,
  subjects,
  initialSubjectId,
  unlockedChapter = 1,
  onUpdateChapter,
  onOpenTempleOfEnigmas,
}: ChapterSelectorModalProps) {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(
    initialSubjectId || subjects[0]?.id || ""
  );
  const [isParentOverride, setIsParentOverride] = useState<boolean>(false);
  const [lockedAlertMessage, setLockedAlertMessage] = useState<string | null>(null);

  useEffect(() => {
    if (initialSubjectId) {
      setSelectedSubjectId(initialSubjectId);
    } else if (subjects.length > 0 && !selectedSubjectId) {
      setSelectedSubjectId(subjects[0].id);
    }
  }, [initialSubjectId, subjects, selectedSubjectId]);

  if (!isOpen) return null;

  const currentSubject = subjects.find((s) => s.id === selectedSubjectId) || subjects[0];

  const handleSelectChapter = (chapterNumber: number, chapterId: number) => {
    const isLocked = chapterNumber > unlockedChapter && !isParentOverride;

    if (isLocked) {
      playSound("pop");
      setLockedAlertMessage(
        `O Capítulo ${chapterNumber} está protegido pelo Conselho da Vila! Conclua o Capítulo ${chapterNumber - 1} em todas as matérias e resolva o Templo dos Enigmas para desbloquear.`
      );
      return;
    }

    setLockedAlertMessage(null);
    onUpdateChapter(selectedSubjectId, chapterId);
    playSound("star");

    try {
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.65 },
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-4 border-sky-300 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500 p-4 sm:p-5 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-2xl backdrop-blur-md">
              <BookmarkCheck className="w-6 h-6 text-sky-100" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-wide flex items-center gap-2">
                <span>Capítulo Atual da Escola</span>
                <Sparkles className="w-4 h-4 text-yellow-200" />
              </h2>
              <p className="text-xs sm:text-sm font-medium text-sky-100">
                Sincronize o que a {year === 2 ? "Bianca" : "Cecília"} está a aprender na sala de aula esta semana!
              </p>
            </div>
          </div>

          {/* Large, comfortable close button for tablets */}
          <button
            onClick={() => {
              playSound("click");
              onClose();
            }}
            className="p-3 bg-white/20 hover:bg-white/30 rounded-2xl transition-transform active:scale-90 cursor-pointer min-w-[46px] min-h-[46px] flex items-center justify-center border border-white/30 shadow-sm"
            aria-label="Fechar modal"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Subjects horizontal selector bar */}
        <div className="p-3 bg-sky-50/70 border-b border-sky-100 flex items-center gap-2 overflow-x-auto">
          {subjects.map((subj) => {
            const isSelected = subj.id === selectedSubjectId;
            const currentChap = subj.chapters.find((c) => c.id === subj.currentChapterId);

            return (
              <button
                key={subj.id}
                onClick={() => {
                  playSound("click");
                  setSelectedSubjectId(subj.id);
                }}
                className={`px-3 py-2 rounded-2xl text-xs font-black shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? "bg-sky-600 text-white shadow-md shadow-sky-600/30 scale-105"
                    : "bg-white text-slate-700 hover:bg-sky-100 border border-sky-200"
                }`}
              >
                <span>{subj.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected ? "bg-white/20 text-white" : "bg-sky-100 text-sky-800"
                  }`}
                >
                  Cap. {currentChap?.number || 1}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content Area: Chapters list */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-800 flex items-center gap-2">
                <span>{currentSubject?.buildingName}</span>
                <span className="text-xs font-bold text-slate-400">
                  ({currentSubject?.name})
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Toque no capítulo que a professora está explicando na escola esta semana:
              </p>
            </div>

            {/* Parent Override Toggle */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  playSound("click");
                  setIsParentOverride(!isParentOverride);
                  setLockedAlertMessage(null);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                  isParentOverride
                    ? "bg-amber-500 text-white border-amber-600 shadow-sm"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-300"
                }`}
                title="Permite selecionar qualquer capítulo para revisar antes de provas"
              >
                {isParentOverride ? (
                  <>
                    <Unlock className="w-3.5 h-3.5 text-yellow-100" />
                    <span>Modo Papai Ativo</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Destravar para Provas</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Locked Alert Message */}
          {lockedAlertMessage && (
            <div className="p-3.5 bg-amber-50 border-2 border-amber-300 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fadeIn">
              <div className="flex items-start gap-2.5">
                <KeyRound className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-950 font-bold leading-relaxed">
                  {lockedAlertMessage}
                </p>
              </div>
              {onOpenTempleOfEnigmas && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenTempleOfEnigmas();
                  }}
                  className="btn-game px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-black text-xs rounded-xl shadow-sm shrink-0 flex items-center gap-1.5 cursor-pointer"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Abrir Templo dos Enigmas</span>
                </button>
              )}
            </div>
          )}

          <div className="space-y-2.5">
            {currentSubject?.chapters.map((chapter) => {
              const isActive = chapter.id === currentSubject.currentChapterId;
              const isLocked = chapter.number > unlockedChapter && !isParentOverride;

              return (
                <div
                  key={chapter.id}
                  onClick={() => handleSelectChapter(chapter.number, chapter.id)}
                  className={`p-4 rounded-2xl border-3 cursor-pointer transition-all flex items-center justify-between gap-3 ${
                    isActive
                      ? "bg-gradient-to-r from-sky-50 to-blue-50 border-sky-500 shadow-md ring-2 ring-sky-300/50"
                      : isLocked
                      ? "bg-slate-100/60 hover:bg-amber-50/50 border-slate-200 hover:border-amber-300 opacity-80"
                      : "bg-slate-50/70 hover:bg-white border-slate-200 hover:border-sky-300"
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    {/* Chapter Number Badge */}
                    <div
                      className={`w-9 h-9 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 shadow-sm ${
                        isActive
                          ? "bg-sky-500 text-white"
                          : isLocked
                          ? "bg-slate-200 text-slate-500 border border-slate-300"
                          : "bg-white text-slate-600 border border-slate-300"
                      }`}
                    >
                      {chapter.number}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className={`text-sm font-black ${isLocked ? "text-slate-600" : "text-slate-800"}`}>
                          {chapter.title}
                        </h4>
                        {isActive && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-black tracking-wide flex items-center gap-1 shadow-sm">
                            <Sparkles className="w-2.5 h-2.5" />
                            EM ESTUDO NA SALA
                          </span>
                        )}
                        {isLocked && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-black tracking-wide flex items-center gap-1">
                            <Lock className="w-2.5 h-2.5 text-amber-700" />
                            REQUER ENIGMA DA VILA
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 font-medium mt-1">
                        {chapter.description}
                      </p>

                      {chapter.tags && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {chapter.tags.map((t) => (
                            <span
                              key={t}
                              className="text-[10px] px-2 py-0.5 rounded-md bg-white text-slate-600 border border-slate-200 font-semibold"
                            >
                              #{t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Radio / Selection Indicator */}
                  <div className="shrink-0 pl-2">
                    <button
                      type="button"
                      className={`btn-game w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isActive
                          ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30 scale-110"
                          : isLocked
                          ? "bg-slate-200 text-slate-400"
                          : "border-2 border-slate-300 hover:border-sky-400 bg-white"
                      }`}
                    >
                      {isActive ? (
                        <Check className="w-4 h-4 stroke-[3]" />
                      ) : isLocked ? (
                        <Lock className="w-3.5 h-3.5 text-slate-400" />
                      ) : (
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <GraduationCap className="w-4 h-4 text-sky-600" />
            <span>As missões da Vila se ajustam instantaneamente ao capítulo selecionado.</span>
          </div>

          <button
            onClick={() => {
              playSound("click");
              onClose();
            }}
            className="btn-game px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer"
          >
            Concluir & Voltar à Vila
          </button>
        </div>
      </div>
    </div>
  );
}
