"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { StudentProfile, StudentYear, ExamAlert } from "../types";
import {
  Sparkles,
  Flame,
  Star,
  Coins,
  AlertTriangle,
  BookmarkCheck,
  Volume2,
  VolumeX,
  Repeat,
  RotateCcw,
  Gamepad2,
} from "lucide-react";
import { playSound } from "@/lib/soundEffects";

interface TopNavBarProps {
  currentProfile: StudentProfile;
  currentYear: StudentYear;
  onSwitchYear: (year: StudentYear) => void;
  exams: ExamAlert[];
  onOpenExamModal: () => void;
  onOpenChapterModal: () => void;
  onOpenResetModal?: () => void;
  onOpenCustomizer?: () => void;
  onOpenShop?: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export function TopNavBar({
  currentProfile,
  currentYear,
  onSwitchYear,
  exams,
  onOpenExamModal,
  onOpenChapterModal,
  onOpenResetModal,
  onOpenCustomizer,
  onOpenShop,
  isMuted,
  onToggleMute,
}: TopNavBarProps) {
  const currentGradeExams = exams.filter((e) => e.year === currentYear);
  const xpPercentage = Math.min(
    100,
    Math.round((currentProfile.currentXp / currentProfile.targetXp) * 100)
  );

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b-4 border-sky-200 shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Avatar Profile & XP */}
        <div className="flex items-center gap-3">
          {/* Avatar Picture with Level Badge (Click to customize avatar) */}
          <div
            className="relative group cursor-pointer"
            onClick={() => {
              if (onOpenCustomizer) {
                playSound("open");
                onOpenCustomizer();
              }
            }}
            title="Toque para personalizar cabelo, pele e roupas!"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden border-3 border-amber-400 shadow-md bg-amber-50 group-hover:scale-105 transition-transform">
              <Image
                src={currentProfile.avatarUrl}
                alt={currentProfile.name}
                width={56}
                height={56}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-black px-1.5 py-0.2 rounded-full border-2 border-white shadow-sm">
              Nv.{currentProfile.level}
            </div>
          </div>

          {/* Name, Grade & XP Bar */}
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black text-slate-800 leading-none">
                {currentProfile.name}
              </h1>
              <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
                {currentProfile.gradeLabel}
              </span>
            </div>

            {/* XP progress bar */}
            <div className="flex items-center gap-2 mt-1">
              <div className="w-28 sm:w-36 h-3 bg-slate-200 rounded-full overflow-hidden p-0.5 border border-slate-300">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${xpPercentage}%` }}
                />
              </div>
              <span className="text-[10px] font-extrabold text-slate-500">
                {currentProfile.currentXp}/{currentProfile.targetXp} XP
              </span>
            </div>
          </div>
        </div>

        {/* Center / Switcher between Bianca (2º Ano) and Cecília (4º Ano) */}
        <div className="flex items-center bg-sky-100/80 p-1 rounded-2xl border-2 border-sky-300 shadow-inner">
          <button
            onClick={() => {
              playSound("pop");
              onSwitchYear(2);
            }}
            className={`btn-game px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 cursor-pointer ${
              currentYear === 2
                ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-500/30 scale-105"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span>👧 Bianca (2º Ano)</span>
          </button>

          <button
            onClick={() => {
              playSound("pop");
              onSwitchYear(4);
            }}
            className={`btn-game px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 cursor-pointer ${
              currentYear === 4
                ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md shadow-purple-500/30 scale-105"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span>✨ Cecília (4º Ano)</span>
          </button>
        </div>

        {/* Right: Gamification Badges & Main Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap sm:flex-nowrap">
          {/* Streak Days */}
          <div
            className="flex items-center gap-1 px-2.5 py-1 bg-amber-50 rounded-xl border border-amber-300 text-amber-900 text-xs font-black shadow-sm"
            title="Sequência de dias estudando"
          >
            <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
            <span>{currentProfile.streakDays}d</span>
          </div>

          {/* Stars */}
          <div
            className="flex items-center gap-1 px-2.5 py-1 bg-yellow-50 rounded-xl border border-yellow-300 text-yellow-900 text-xs font-black shadow-sm"
            title="Estrelas conquistadas"
          >
            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
            <span>{currentProfile.stars}</span>
          </div>

          {/* Coins (Clickable to open shop) */}
          <button
            type="button"
            onClick={() => {
              if (onOpenShop) {
                playSound("open");
                onOpenShop();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 rounded-xl border border-amber-500 text-amber-950 text-xs font-black shadow-sm cursor-pointer transition-transform active:scale-95"
            title="Moedas da Vila • Toque para abrir a Loja e comprar roupas, móveis e pets!"
          >
            <Coins className="w-4 h-4 text-amber-800 fill-amber-700" />
            <span>{currentProfile.coins}</span>
            <span className="hidden sm:inline text-[10px] bg-amber-950/20 px-1.5 py-0.2 rounded-md">
              Loja 🛍️
            </span>
          </button>

          {/* Button: Modo RPG 2D (Pokémon FireRed) */}
          <Link
            href={`/rpg`}
            onClick={() => playSound("fanfare")}
            className="btn-game px-3 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-xl text-xs font-black shadow-md shadow-red-600/30 flex items-center gap-1.5 cursor-pointer border border-red-400"
            title="Entrar no novo modo RPG 2D estilo Pokémon FireRed!"
          >
            <Gamepad2 className="w-4 h-4 text-amber-300" />
            <span className="hidden sm:inline">RPG 2D (FireRed)</span>
            <span className="sm:hidden">RPG 2D</span>
          </Link>

          {/* Button: Capítulo Atual da Escola */}
          <button
            onClick={() => {
              playSound("click");
              onOpenChapterModal();
            }}
            className="btn-game px-3 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-xl text-xs font-black shadow-sm flex items-center gap-1.5 cursor-pointer"
            title="Definir capítulos atuais da semana na escola"
          >
            <BookmarkCheck className="w-4 h-4" />
            <span className="hidden sm:inline">Capítulos da Escola</span>
            <span className="sm:hidden">Capítulos</span>
          </button>

          {/* Button: Aviso de Prova */}
          <button
            onClick={() => {
              playSound("pop");
              onOpenExamModal();
            }}
            className={`btn-game relative px-3 py-2 rounded-xl text-xs font-black shadow-sm flex items-center gap-1.5 cursor-pointer transition-all ${
              currentGradeExams.length > 0
                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white animate-pulse"
                : "bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300"
            }`}
            title="Gerenciar e avisar datas de provas escolares"
          >
            <AlertTriangle className="w-4 h-4 text-white" />
            <span>Aviso de Prova</span>
            {currentGradeExams.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] font-black flex items-center justify-center border-2 border-white shadow-sm">
                {currentGradeExams.length}
              </span>
            )}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleMute}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer transition-colors"
            title={isMuted ? "Ativar Sons" : "Mutar Sons"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Discrete Reset / Daily Practice Restart Button */}
          {onOpenResetModal && (
            <button
              onClick={() => {
                playSound("click");
                onOpenResetModal();
              }}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 cursor-pointer transition-colors"
              title="Configurações / Reiniciar Treino do Dia"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
