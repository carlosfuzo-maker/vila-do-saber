"use client";

import React from "react";
import { SubjectBuilding, ExamAlert } from "../types";
import { BuildingArt } from "./BuildingArt";
import {
  CalendarDays,
  Sparkles,
  CheckCircle2,
  Play,
  BookmarkCheck,
  ChevronRight,
  Clock,
  AlarmClockCheck,
  DoorOpen,
} from "lucide-react";
import { playSound } from "@/lib/soundEffects";
import { calculateDaysUntil, formatDateShort } from "@/lib/dateUtils";

interface BuildingCardProps {
  subject: SubjectBuilding;
  exam?: ExamAlert;
  onOpenExamModal: (subjectId: string) => void;
  onOpenChapterModal: (subjectId: string) => void;
  onSelectMission: (subject: SubjectBuilding, missionId: string) => void;
  onOpenLibraryWriter?: () => void;
  onEnterInterior?: (subject: SubjectBuilding) => void;
}

export function BuildingCard({
  subject,
  exam,
  onOpenExamModal,
  onOpenChapterModal,
  onSelectMission,
  onOpenLibraryWriter,
  onEnterInterior,
}: BuildingCardProps) {
  const currentChapter =
    subject.chapters.find((c) => c.id === subject.currentChapterId) ||
    subject.chapters[0];

  // Calculate days until exam if exists
  const examCountdown = exam ? calculateDaysUntil(exam.examDate) : null;

  const completedMissionsCount = subject.missions.filter((m) => m.completed).length;

  return (
    <div
      className={`relative group rounded-3xl bg-white/95 backdrop-blur-md border-4 ${
        exam && examCountdown && examCountdown.days >= 0 && examCountdown.days <= 14
          ? "border-amber-400 ring-4 ring-amber-300/60 shadow-[0_12px_35px_rgba(251,191,36,0.22)]"
          : subject.borderColor
      } shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_18px_35px_rgba(0,0,0,0.14)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col overflow-hidden`}
    >
      {/* Top Banner with Subject Name & Building Art */}
      <div className={`p-4 sm:p-5 ${subject.bgGradient} border-b-2 ${subject.borderColor} relative`}>
        {/* Exam Alert Tag if scheduled */}
        {exam && examCountdown && (
          <div
            onClick={() => {
              playSound("pop");
              onOpenExamModal(subject.id);
            }}
            className={`absolute -top-1 -right-1 cursor-pointer z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-bl-2xl rounded-tr-2xl text-xs font-bold text-white shadow-md transition-transform hover:scale-105 ${
              examCountdown.urgent
                ? "bg-rose-500 animate-pulse border-2 border-white"
                : "bg-amber-500 border-2 border-white"
            }`}
            title="Clique para ver detalhes da prova"
          >
            <AlarmClockCheck className="w-3.5 h-3.5" />
            <span>
              🎯 FOCO DA SEMANA: {formatDateShort(exam.examDate)} ({examCountdown.text})
            </span>
          </div>
        )}

        <div className="flex items-center gap-4">
          {/* Building Artwork */}
          <div className="relative shrink-0 p-2 bg-white/90 rounded-2xl shadow-inner border-2 border-white group-hover:scale-105 transition-transform">
            <BuildingArt type={subject.buildingArtType} className="w-16 h-16 sm:w-20 sm:h-20" />
            <div className="absolute -bottom-1 -right-1 bg-amber-400 text-amber-950 text-[10px] font-black px-1.5 py-0.5 rounded-full border border-amber-600 shadow-sm flex items-center gap-0.5">
              <Sparkles className="w-2.5 h-2.5" />
              Nív. {currentChapter?.number || 1}
            </div>
          </div>

          {/* Titles & Subject Info */}
          <div className="flex-1 min-w-0">
            <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider text-slate-500 bg-white/80 px-2 py-0.5 rounded-full mb-1">
              {subject.name}
            </span>
            <h3 className={`text-lg sm:text-xl font-black ${subject.textColor} truncate leading-tight`}>
              {subject.buildingName}
            </h3>
            <p className="text-xs text-slate-600 font-medium truncate mt-0.5">
              {subject.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Chapter In-School Section (Capítulo Atual da Escola) */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        {/* Quick Chapter Pill */}
        <div className="bg-sky-50/80 rounded-2xl p-3 border-2 border-sky-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-xs font-bold text-sky-700 mb-0.5">
              <BookmarkCheck className="w-3.5 h-3.5 text-sky-600" />
              <span>Capítulo Atual na Escola:</span>
            </div>
            <p className="text-sm font-extrabold text-slate-800 line-clamp-1">
              {currentChapter?.title}
            </p>
            <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
              {currentChapter?.description}
            </p>
          </div>

          <button
            onClick={() => {
              playSound("click");
              onOpenChapterModal(subject.id);
            }}
            className="btn-game shrink-0 self-end sm:self-center px-3 py-1.5 bg-white text-sky-700 hover:bg-sky-100 border border-sky-300 rounded-xl text-xs font-extrabold shadow-sm flex items-center gap-1 cursor-pointer"
          >
            <span>Mudar Cap.</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* If exam scheduled, show dedicated exam chapters reminder box */}
        {exam && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-3 border-2 border-amber-300 text-xs text-amber-950 flex items-start gap-2.5 shadow-sm">
            <div className="p-1.5 bg-amber-500 text-white rounded-xl shrink-0 mt-0.5">
              <CalendarDays className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap mb-1">
                <span className="font-black text-amber-950 text-[10px] bg-amber-200/80 px-2 py-0.2 rounded-md uppercase tracking-wider">
                  🎯 Foco de Estudo da Semana
                </span>
                {examCountdown && (
                  <span className="text-[11px] font-extrabold text-rose-700">
                    {examCountdown.text}
                  </span>
                )}
              </div>
              <p className="font-extrabold text-slate-900">
                Conteúdo da Prova: <span className="font-medium text-slate-800">{exam.chaptersCovered}</span>
              </p>
              <p className="text-[11px] text-amber-900 font-semibold mt-1 bg-white/80 p-1.5 rounded-xl border border-amber-200/80">
                ✨ Faça as missões deste edifício para reforçar a matéria para o dia da avaliação!
              </p>
              {exam.notes && (
                <p className="text-[11px] text-amber-800 italic mt-1">
                  💡 Recadinho do Pai: {exam.notes}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Missions Section for Current Chapter */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <span>Missões da Semana</span>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-full font-bold">
                {completedMissionsCount}/{subject.missions.length}
              </span>
            </span>
            <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              XP Bônus
            </span>
          </div>

          <div className="space-y-1.5">
            {subject.missions.map((mission) => (
              <div
                key={mission.id}
                onClick={() => {
                  playSound("click");
                  onSelectMission(subject, mission.id);
                }}
                className={`flex items-center justify-between p-2 rounded-xl text-xs border cursor-pointer transition-all ${
                  mission.completed
                    ? "bg-emerald-50/60 border-emerald-200 text-emerald-800"
                    : "bg-slate-50 hover:bg-sky-50/60 border-slate-200/80 text-slate-700 hover:border-sky-300"
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  {mission.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    </div>
                  )}
                  <span className={`truncate font-semibold ${mission.completed ? "line-through text-slate-400" : ""}`}>
                    {mission.title}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-100/80 px-1.5 py-0.5 rounded-full">
                    +{mission.xp} XP
                  </span>
                  <div className="text-[10px] text-slate-400 flex items-center gap-0.5">
                    <Clock className="w-3 h-3" />
                    {mission.durationMinutes}m
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card Action Buttons */}
        <div className="pt-2 flex flex-col gap-2">
          {/* Special Feature for Português/Biblioteca: Oficina do Jovem Autor */}
          {subject.id === "portugues" && onOpenLibraryWriter && (
            <button
              onClick={() => {
                playSound("open");
                onOpenLibraryWriter();
              }}
              className="btn-game w-full py-2.5 px-3 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-black text-xs shadow-md shadow-rose-500/20 flex items-center justify-center gap-2 cursor-pointer animate-pulse-glow"
            >
              <span>✍️ Oficina do Jovem Autor (com Peninha)</span>
              <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
            </button>
          )}

          <div className="flex items-center gap-2">
            {/* Enter Interior Room Button if supported */}
            {onEnterInterior && (
              <button
                onClick={() => {
                  playSound("open");
                  onEnterInterior(subject);
                }}
                className={`btn-game flex-1 py-3 px-3 rounded-2xl bg-gradient-to-r ${subject.accentColor} text-white font-black text-xs sm:text-sm shadow-[0_4px_0_rgba(0,0,0,0.15)] flex items-center justify-center gap-1.5 cursor-pointer`}
              >
                <DoorOpen className="w-4 h-4 text-yellow-200" />
                <span>Entrar no Mundo</span>
              </button>
            )}

            {/* Direct Mission Play Button */}
            <button
              onClick={() => {
                if (subject.id === "portugues" && onOpenLibraryWriter) {
                  playSound("open");
                  onOpenLibraryWriter();
                } else {
                  playSound("star");
                  onSelectMission(subject, subject.missions[0]?.id || "m-1");
                }
              }}
              className={`btn-game ${onEnterInterior ? "px-3" : "flex-1"} py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200 font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer shadow-sm`}
            >
              <Play className="w-3.5 h-3.5 fill-slate-700 text-slate-700" />
              <span>{onEnterInterior ? "Missão Rápida" : (subject.id === "portugues" ? "Entrar na Biblioteca" : "Entrar & Jogar")}</span>
            </button>

            {/* Quick Exam Alert Button */}
            <button
              onClick={() => {
                playSound("pop");
                onOpenExamModal(subject.id);
              }}
              title={exam ? "Editar aviso de prova" : "Agendar aviso de prova"}
              className="btn-game px-3.5 py-3 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 border-2 border-amber-300 font-bold text-xs flex items-center justify-center gap-1 cursor-pointer shadow-sm"
            >
              <CalendarDays className="w-4 h-4 text-amber-700" />
              <span className="hidden sm:inline">{exam ? "Ver Prova" : "+ Prova"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
