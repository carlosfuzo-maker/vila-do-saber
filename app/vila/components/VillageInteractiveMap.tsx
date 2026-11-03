"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { SubjectBuilding, ExamAlert, StudentProfile } from "../types";
import { BuildingArt } from "./BuildingArt";
import { GameAvatar } from "./GameAvatar";
import { ArticulatedNpc, NpcConfig } from "./ArticulatedNpc";
import confetti from "canvas-confetti";
import {
  Sparkles,
  BookmarkCheck,
  Palette,
  DoorOpen,
} from "lucide-react";
import { playSound } from "@/lib/soundEffects";

interface VillageInteractiveMapProps {
  subjects: SubjectBuilding[];
  exams: ExamAlert[];
  currentProfile: StudentProfile;
  initialPosition?: { x: number; y: number };
  onAvatarMoved?: (pos: { x: number; y: number }) => void;
  onSelectBuilding: (subject: SubjectBuilding) => void;
  onOpenExamModal: (subjectId: string) => void;
  onOpenChapterModal: (subjectId: string) => void;
  onOpenLibraryWriter?: () => void;
  onEnterBuildingInterior: (
    buildingId: string,
    buildingName: string,
    subject?: SubjectBuilding
  ) => void;
  onOpenHouse: () => void;
  onOpenShop: () => void;
  onOpenCustomizer: () => void;
}

// Map positions calibrated to the Avatar World generated landscape
const PIN_POSITIONS_YEAR_4: Record<string, { top: string; left: string }> = {
  matematica: { top: "28%", left: "18%" }, // Top left hill castle
  portugues: { top: "18%", left: "48%" }, // Center top windmill / library
  ciencias: { top: "25%", left: "78%" }, // School / Observatory top right
  historia_geografia: { top: "54%", left: "28%" }, // Center-left houses by the road
  ingles: { top: "48%", left: "64%" }, // Village square / market stalls
  te: { top: "72%", left: "82%" }, // Tech cottage across the wooden bridge
};

const PIN_POSITIONS_YEAR_2: Record<string, { top: string; left: string }> = {
  matematica: { top: "28%", left: "18%" },
  portugues: { top: "18%", left: "48%" },
  ciencias: { top: "52%", left: "16%" }, // Garden pond
  historia_geografia: { top: "54%", left: "45%" },
  ingles: { top: "48%", left: "68%" },
  artes: { top: "72%", left: "82%" },
};

export function VillageInteractiveMap({
  subjects,
  exams,
  currentProfile,
  initialPosition,
  onAvatarMoved,
  onOpenExamModal,
  onEnterBuildingInterior,
  onOpenHouse,
  onOpenShop,
  onOpenCustomizer,
}: VillageInteractiveMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Avatar position on the village map (synced with initialPosition if provided)
  const [avatarPos, setAvatarPos] = useState<{ x: number; y: number }>(
    initialPosition || { x: 48, y: 65 }
  );

  React.useEffect(() => {
    if (initialPosition) {
      setAvatarPos(initialPosition);
    }
  }, [initialPosition]);

  const [isWalking, setIsWalking] = useState(false);
  const [avatarDirection, setAvatarDirection] = useState<"left" | "right">("right");

  // Destination sparkle marker when player taps anywhere on map
  const [tapTarget, setTapTarget] = useState<{ x: number; y: number } | null>(null);

  // Dynamic Sister Rule for outdoor village:
  // When Cecília (4º Ano) plays -> Sister NPC Bianca plays in the front yard
  // When Bianca (2º Ano) plays -> Sister NPC Cecília reads in the village square
  const isPlayerCecilia = currentProfile.year === 4 || currentProfile.name.toLowerCase().includes("cecília");
  const sisterName = isPlayerCecilia ? "Bianca" : "Cecília";
  const sisterNpcId = isPlayerCecilia ? "bianca_npc" : "cecilia_npc";
  const [sisterSpeech, setSisterSpeech] = useState<string | null>(null);

  const outdoorSisterNpc: NpcConfig = {
    id: sisterNpcId,
    name: `Irmã ${sisterName}`,
    role: isPlayerCecilia ? "Brincando no Jardim" : "Lendo na Pracinha",
    emoji: isPlayerCecilia ? "🧸" : "📚",
    speechText: isPlayerCecilia
      ? "Oi Ceci! O Papai Carlos disse que você vai arrasar nas missões da Metrópole! Boa sorte, maninha!"
      : "Oi Bibi! O dia está lindo para aprender coisas novas na Vila do Saber! Vai com tudo!",
    badgeColor: isPlayerCecilia ? "bg-rose-500 text-white" : "bg-indigo-600 text-white",
    waypointA: { x: 34, y: 84 },
    waypointB: { x: 44, y: 86 },
  };

  // Core walk logic: moves avatar to coordinates smoothly
  const walkTo = (targetX: number, targetY: number, onArrival?: () => void) => {
    const clampedX = Math.max(8, Math.min(92, targetX));
    const clampedY = Math.max(22, Math.min(88, targetY));

    setAvatarDirection(clampedX < avatarPos.x ? "left" : "right");
    setIsWalking(true);
    setTapTarget({ x: clampedX, y: clampedY });
    playSound("pop");
    setAvatarPos({ x: clampedX, y: clampedY });

    if (onAvatarMoved) {
      onAvatarMoved({ x: clampedX, y: clampedY });
    }

    setTimeout(() => {
      setIsWalking(false);
      setTapTarget(null);
      if (onArrival) {
        onArrival();
      }
    }, 550);
  };

  // Pointer event on map ground (supports Mouse click + Tablet touch seamlessly)
  const handleMapPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // If the click is on an interactive element, button, or landmark pin, let it handle directly
    const target = e.target as HTMLElement;
    if (target.closest(".interactive-landmark") || target.closest("button")) {
      return;
    }

    if (!mapContainerRef.current) return;
    const rect = mapContainerRef.current.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    walkTo(clickX, clickY);
  };

  // Walk to building and enter
  const handleEnterBuilding = (
    subject: SubjectBuilding,
    pinLeft: number,
    pinTop: number
  ) => {
    playSound("open");
    walkTo(pinLeft, Math.min(88, pinTop + 8), () => {
      onEnterBuildingInterior(subject.id, subject.buildingName, subject);
    });
  };

  const isYear2 = currentProfile.year === 2;
  const pinPositions = isYear2 ? PIN_POSITIONS_YEAR_2 : PIN_POSITIONS_YEAR_4;

  return (
    <div
      ref={mapContainerRef}
      onPointerDown={handleMapPointerDown}
      className="relative w-full rounded-3xl overflow-hidden border-4 border-sky-300 shadow-2xl bg-sky-200 aspect-[16/9] min-h-[420px] sm:min-h-[480px] md:min-h-[550px] cursor-pointer select-none touch-manipulation"
      title="Toque em qualquer lugar do mapa para caminhar!"
    >
      {/* Background Village Image */}
      <Image
        src="/images/avatar_village_map.jpg"
        alt="Mapa da Vila do Saber"
        fill
        className="object-cover object-center select-none pointer-events-none"
        priority
      />

      {/* Floating Animated Clouds & Mascot Greeting */}
      <div className="absolute top-4 left-6 animate-cloud-drift opacity-90 pointer-events-none hidden sm:block z-10">
        <div className="bg-white/90 px-4 py-1.5 rounded-full shadow-md text-xs font-black text-sky-800 flex items-center gap-2 border border-sky-200">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Vila do Saber • Toque para a {currentProfile.name} andar!</span>
        </div>
      </div>

      {/* Quick Avatar Mirror Customizer Shortcut Button on Map */}
      <div className="absolute top-4 right-4 z-20">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            playSound("open");
            onOpenCustomizer();
          }}
          className="btn-game px-3.5 py-2 bg-white/95 hover:bg-white text-slate-800 rounded-2xl shadow-lg border-2 border-pink-300 flex items-center gap-1.5 text-xs font-black cursor-pointer active:scale-95"
          title="Personalizar Cabelo, Pele e Roupas"
        >
          <Palette className="w-4 h-4 text-pink-500" />
          <span className="hidden sm:inline">Mudar Visual</span>
          <span className="sm:hidden">Visual</span>
        </button>
      </div>

      {/* Tap Destination Feedback Ripple (Shows exactly where user clicked/tapped) */}
      {tapTarget && (
        <div
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ left: `${tapTarget.x}%`, top: `${tapTarget.y}%` }}
        >
          <div className="w-8 h-8 rounded-full border-4 border-amber-400 bg-amber-300/40 animate-ping" />
        </div>
      )}

      {/* SPECIAL LANDMARK 1: Minha Casinha (Casa da Aluna) */}
      <div
        style={{ top: "80%", left: "18%" }}
        className="interactive-landmark absolute -translate-x-1/2 -translate-y-1/2 group z-20"
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            playSound("open");
            walkTo(20, 84, () => onOpenHouse());
          }}
          className="relative cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95 flex flex-col items-center"
        >
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-amber-100 to-orange-100 p-2 shadow-2xl border-4 border-amber-400 flex flex-col items-center justify-center">
            <span className="text-3xl sm:text-4xl">🏡</span>
            <div className="absolute -bottom-2 bg-amber-500 text-amber-950 font-black text-[9px] sm:text-[10px] px-2 py-0.2 rounded-full border border-amber-600 shadow-sm whitespace-nowrap">
              Minha Casinha
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              playSound("open");
              onOpenHouse();
            }}
            className="btn-game mt-2.5 px-2.5 py-0.5 bg-amber-500 hover:bg-amber-600 text-amber-950 font-black text-[10px] sm:text-xs rounded-xl shadow-md border border-amber-600 flex items-center gap-1 cursor-pointer"
          >
            <DoorOpen className="w-3 h-3 text-amber-950" />
            <span>Entrar</span>
          </button>
        </div>
      </div>

      {/* SPECIAL LANDMARK 2: Vila Shopping & Pet Shop */}
      <div
        style={{ top: "82%", left: "50%" }}
        className="interactive-landmark absolute -translate-x-1/2 -translate-y-1/2 group z-20"
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            playSound("open");
            walkTo(50, 85, () => onOpenShop());
          }}
          className="relative cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95 flex flex-col items-center"
        >
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-purple-100 to-pink-100 p-2 shadow-2xl border-4 border-purple-400 flex flex-col items-center justify-center">
            <span className="text-3xl sm:text-4xl">🛍️</span>
            <div className="absolute -bottom-2 bg-purple-500 text-white font-black text-[9px] sm:text-[10px] px-2 py-0.2 rounded-full border border-purple-600 shadow-sm whitespace-nowrap">
              Vila Shopping
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              playSound("open");
              onOpenShop();
            }}
            className="btn-game mt-2.5 px-2.5 py-0.5 bg-purple-500 hover:bg-purple-600 text-white font-black text-[10px] sm:text-xs rounded-xl shadow-md border border-purple-600 flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-yellow-200" />
            <span>Loja & Pets</span>
          </button>
        </div>
      </div>

      {/* SPECIAL SISTER NPC (BIANCA QUANDO CECÍLIA JOGA, OU CECÍLIA QUANDO BIANCA JOGA) */}
      <ArticulatedNpc
        npc={outdoorSisterNpc}
        speechBalloon={sisterSpeech}
        onInteract={() => {
          playSound("open");
          setSisterSpeech(outdoorSisterNpc.speechText);
        }}
        customActionLabel={
          isPlayerCecilia
            ? "Brincar com a Bianca (+10 Moedas) 🧸"
            : "Conversar com a Cecília (+10 Moedas) 📚"
        }
        onCustomAction={() => {
          playSound("fanfare");
          try {
            confetti({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.7 },
            });
          } catch {}
          setSisterSpeech(
            isPlayerCecilia
              ? "Ceci, você é a melhor irmã do mundo! Ganhou +10 moedas! 💖"
              : "Bibi, continue se dedicando! Ganhou +10 moedas! 💖"
          );
        }}
      />

      {/* SPECIAL COMMUNITY LANDMARK 5: Casa da Amiga Lívia */}
      <div
        style={{ top: "45%", left: "11%" }}
        className="interactive-landmark absolute -translate-x-1/2 -translate-y-1/2 group z-20"
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            playSound("open");
            const friend = currentProfile.friendName || "Lívia";
            walkTo(14, 52, () => onEnterBuildingInterior("casa_amiga", `Casa da Amiga ${friend}`));
          }}
          className="relative cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95 flex flex-col items-center"
        >
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-gradient-to-br from-pink-100 to-purple-200 p-1.5 shadow-2xl border-4 border-purple-400 flex flex-col items-center justify-center">
            <span className="text-3xl sm:text-4xl">👭</span>
            <div className="absolute -bottom-2 bg-purple-600 text-white font-black text-[9px] sm:text-[10px] px-2 py-0.2 rounded-full border border-purple-800 shadow-sm whitespace-nowrap">
              Amiga {currentProfile.friendName || "Lívia"}
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              playSound("open");
              const friend = currentProfile.friendName || "Lívia";
              onEnterBuildingInterior("casa_amiga", `Casa da Amiga ${friend}`);
            }}
            className="btn-game mt-2.5 px-2 py-0.5 bg-purple-600 hover:bg-purple-700 text-white font-black text-[10px] sm:text-xs rounded-xl shadow-md border border-purple-800 flex items-center gap-1 cursor-pointer"
          >
            <DoorOpen className="w-3 h-3 text-yellow-200" />
            <span>Entrar</span>
          </button>
        </div>
      </div>

      {/* Interactive Subject Buildings */}
      {subjects.map((subject) => {
        const exam = exams.find((e) => e.subjectId === subject.id);
        const pinPos = pinPositions[subject.id] || {
          top: `${subject.position.y}%`,
          left: `${subject.position.x}%`,
        };

        const pinLeftNum = parseFloat(pinPos.left);
        const pinTopNum = parseFloat(pinPos.top);

        const currentChapter =
          subject.chapters.find((c) => c.id === subject.currentChapterId) ||
          subject.chapters[0];

        const buildingUpgrade = currentProfile.buildingUpgrades?.[subject.id] || 1;

        return (
          <div
            key={subject.id}
            style={{ top: pinPos.top, left: pinPos.left }}
            className="interactive-landmark absolute -translate-x-1/2 -translate-y-1/2 group z-20"
          >
            {/* Interactive Pin / Avatar World Building Marker */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                handleEnterBuilding(subject, pinLeftNum, pinTopNum);
              }}
              className="relative cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95 flex flex-col items-center"
            >
              {/* Exam Pulsing Warning Flag / Foco de Estudo */}
              {exam && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    playSound("click");
                    onOpenExamModal(subject.id);
                  }}
                  className="absolute -top-7 left-1/2 -translate-x-1/2 z-30 bg-gradient-to-r from-amber-500 to-rose-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full border-2 border-white shadow-lg animate-bounce flex items-center gap-1 whitespace-nowrap"
                  title="Foco de Estudo da Semana: Prova Marcada!"
                >
                  <span>🎯 Foco da Semana</span>
                </div>
              )}

              {/* Building Art Avatar Circle */}
              <div
                className={`relative w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-3xl bg-white/95 p-1.5 shadow-[0_8px_20px_rgba(0,0,0,0.22)] border-3 sm:border-4 ${
                  exam
                    ? "border-amber-400 ring-4 ring-amber-300/70 shadow-amber-200"
                    : subject.borderColor
                } flex items-center justify-center group-hover:rotate-3 transition-transform`}
              >
                <BuildingArt
                  type={subject.buildingArtType}
                  className="w-full h-full object-contain drop-shadow"
                />

                {/* Level Tag & Upgrades */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-950 font-black text-[9px] sm:text-[10px] px-2 py-0.2 rounded-full border border-amber-600 shadow-sm shrink-0 whitespace-nowrap flex items-center gap-0.5">
                  <span>Cap. {currentChapter?.number || 1}</span>
                  {buildingUpgrade > 1 && (
                    <span className="text-amber-800">★{buildingUpgrade}</span>
                  )}
                </div>
              </div>

              {/* Instant Enter Button below Pin */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  playSound("open");
                  onEnterBuildingInterior(subject.id, subject.buildingName, subject);
                }}
                className="btn-game mt-2.5 px-2.5 py-0.5 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-black text-[10px] sm:text-xs rounded-xl shadow-md border border-white/60 flex items-center gap-1 cursor-pointer whitespace-nowrap"
              >
                <DoorOpen className="w-3 h-3 text-yellow-200" />
                <span>Entrar</span>
              </button>

              {/* Hover Tooltip / Information Cloud */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center pointer-events-auto z-40 transition-all">
                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-2xl border-2 border-sky-300 min-w-[190px] text-center space-y-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                    {subject.name}
                  </span>
                  <h4 className="text-xs sm:text-sm font-black text-slate-800 leading-tight">
                    {subject.buildingName}
                  </h4>
                  <div className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-lg flex items-center justify-center gap-1">
                    <BookmarkCheck className="w-3 h-3 text-sky-600" />
                    <span>
                      Cap. {currentChapter?.number}:{" "}
                      {currentChapter?.title.split(":")[1] || currentChapter?.title}
                    </span>
                  </div>
                </div>
                {/* Tooltip beak */}
                <div className="w-3 h-3 bg-white rotate-45 border-r-2 border-b-2 border-sky-300 -mt-1.5" />
              </div>
            </div>
          </div>
        );
      })}

      {/* The Walking Avatar on the Map Ground with ALWAYS-ACTIVE smooth transition */}
      <div
        className="absolute z-30 pointer-events-none select-none"
        style={{
          left: `${avatarPos.x}%`,
          top: `${avatarPos.y}%`,
          transform: "translate(-50%, -100%)",
          transition: "left 0.65s cubic-bezier(0.25, 1, 0.5, 1), top 0.65s cubic-bezier(0.25, 1, 0.5, 1)",
          willChange: "left, top",
        }}
      >
        <GameAvatar
          customization={currentProfile.avatar}
          studentName={currentProfile.name}
          level={currentProfile.level}
          isWalking={isWalking}
          direction={avatarDirection}
          scale={1.1}
        />
      </div>

      {/* iPad Virtual Touch D-Pad Controls */}
      <div className="absolute bottom-3 left-3 z-30 select-none pointer-events-auto touch-manipulation">
        <div className="relative w-28 h-28 bg-slate-900/75 backdrop-blur-md rounded-full border-2 border-white/30 p-1 flex items-center justify-center shadow-2xl">
          {/* UP */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              walkTo(avatarPos.x, avatarPos.y - 7);
            }}
            className="dpad-btn absolute top-1.5 w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-black cursor-pointer active:scale-95"
            aria-label="Cima"
          >
            ▲
          </button>
          {/* DOWN */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              walkTo(avatarPos.x, avatarPos.y + 7);
            }}
            className="dpad-btn absolute bottom-1.5 w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-black cursor-pointer active:scale-95"
            aria-label="Baixo"
          >
            ▼
          </button>
          {/* LEFT */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              walkTo(avatarPos.x - 7, avatarPos.y);
            }}
            className="dpad-btn absolute left-1.5 w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-black cursor-pointer active:scale-95"
            aria-label="Esquerda"
          >
            ◀
          </button>
          {/* RIGHT */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              walkTo(avatarPos.x + 7, avatarPos.y);
            }}
            className="dpad-btn absolute right-1.5 w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-black cursor-pointer active:scale-95"
            aria-label="Direita"
          >
            ▶
          </button>
          {/* Center Touch Hub */}
          <div className="w-5 h-5 rounded-full bg-slate-700/90 border border-slate-500 shadow-inner flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-amber-400" />
          </div>
        </div>
        <div className="text-[9px] font-black text-white/90 text-center mt-1 bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-sm shadow-sm">
          🎮 iPad Touch D-Pad
        </div>
      </div>

      {/* Map Footer helper badge */}
      <div className="absolute bottom-3 right-3 z-20 flex items-center justify-end gap-2 pointer-events-none">
        <div className="bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl shadow-lg border-2 border-white/80 text-[11px] font-black text-slate-700 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Toque no chão ou use o D-Pad para andar!</span>
        </div>
      </div>
    </div>
  );
}
