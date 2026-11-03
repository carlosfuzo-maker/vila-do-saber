"use client";

import React from "react";
import { StudentProfile, ActiveStoryQuest } from "../types";
import {
  MapPin,
  Lock,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Compass,
  CheckCircle2,
  X,
} from "lucide-react";
import { playSound } from "@/lib/soundEffects";

export interface RegionCity {
  id: string;
  name: string;
  subjectId: string;
  title: string;
  gymLeader: string;
  badgeName: string;
  badgeEmoji: string;
  accentColor: string;
  bgGradient: string;
  borderStyle: string;
  coords: { x: number; y: number };
  routeRequired: string;
}

export const REGION_CITIES: RegionCity[] = [
  {
    id: "home_village",
    name: "Vila Inicial da Família",
    subjectId: "home",
    title: "Casinha da Família, Casa da Amiga & Market",
    gymLeader: "Papai Carlos & Mamãe Renata",
    badgeName: "Insígnia do Começo",
    badgeEmoji: "🏡",
    accentColor: "bg-emerald-500",
    bgGradient: "from-emerald-400 to-green-600",
    borderStyle: "border-emerald-300",
    coords: { x: 20, y: 75 },
    routeRequired: "Rota 1",
  },
  {
    id: "matematica",
    name: "Metrópole da Matemática",
    subjectId: "matematica",
    title: "Castelo dos Cálculos e Tabuadas",
    gymLeader: "Mestre Pitágoras",
    badgeName: "Insígnia dos Números",
    badgeEmoji: "📐",
    accentColor: "bg-amber-500",
    bgGradient: "from-amber-400 to-yellow-600",
    borderStyle: "border-amber-300",
    coords: { x: 20, y: 35 },
    routeRequired: "Rota 1",
  },
  {
    id: "ciencias",
    name: "Vale da Ciência & Cosmos",
    subjectId: "ciencias",
    title: "Laboratório de Biologia e Espaço",
    gymLeader: "Dra. Clara",
    badgeName: "Insígnia da Descoberta",
    badgeEmoji: "🔬",
    accentColor: "bg-teal-500",
    bgGradient: "from-teal-400 to-emerald-600",
    borderStyle: "border-teal-300",
    coords: { x: 50, y: 22 },
    routeRequired: "Rota 2",
  },
  {
    id: "portugues",
    name: "Cidadela das Letras & Biblioteca",
    subjectId: "portugues",
    title: "Santuário dos Contos e Poemas",
    gymLeader: "Professora Sofia & Peninha",
    badgeName: "Insígnia da Leitura",
    badgeEmoji: "📚",
    accentColor: "bg-rose-500",
    bgGradient: "from-rose-400 to-pink-600",
    borderStyle: "border-rose-300",
    coords: { x: 80, y: 30 },
    routeRequired: "Rota 3",
  },
  {
    id: "historia_geografia",
    name: "Vila Histórica & Mirante",
    subjectId: "historia_geografia",
    title: "Caminhos dos Biomas e Povos Originários",
    gymLeader: "Explorador Cabral",
    badgeName: "Insígnia das Terras",
    badgeEmoji: "🗺️",
    accentColor: "bg-orange-500",
    bgGradient: "from-orange-400 to-amber-600",
    borderStyle: "border-orange-300",
    coords: { x: 80, y: 65 },
    routeRequired: "Rota 4",
  },
  {
    id: "ingles",
    name: "Distrito Global de Inglês",
    subjectId: "ingles",
    title: "English Cafe & Roda de Conversas",
    gymLeader: "Teacher Emily",
    badgeName: "Insígnia do Mundo",
    badgeEmoji: "🇬🇧",
    accentColor: "bg-indigo-500",
    bgGradient: "from-indigo-400 to-blue-600",
    borderStyle: "border-indigo-300",
    coords: { x: 52, y: 78 },
    routeRequired: "Rota 5",
  },
];

interface RegionWorldMapProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: StudentProfile;
  activeQuest: ActiveStoryQuest | null;
  onSelectCity: (city: RegionCity) => void;
  onTriggerRocketBattle?: (subjectId: string, subjectName: string) => void;
}

export function RegionWorldMap({
  isOpen,
  onClose,
  currentProfile,
  activeQuest,
  onSelectCity,
  onTriggerRocketBattle,
}: RegionWorldMapProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-fadeIn select-none touch-manipulation">
      <div className="relative w-full max-w-4xl bg-slate-900 rounded-[36px] overflow-hidden border-4 border-amber-400 shadow-2xl flex flex-col max-h-[92vh]">
        {/* Map Header */}
        <div className="p-4 bg-slate-950 text-white flex items-center justify-between border-b-2 border-amber-400/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-xl shadow-md">
              🗺️
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-amber-200 flex items-center gap-2">
                <span>Mapa da Região do Saber</span>
                <span className="text-[10px] font-extrabold bg-sky-500 text-white px-2 py-0.5 rounded-full uppercase">
                  Estilo Kanto
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Toque na cidade para viajar pelas Rotas do Conhecimento
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              playSound("pop");
              onClose();
            }}
            className="p-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dad's Active Order Banner */}
        {activeQuest && (
          <div className="mx-4 mt-3 p-3 bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-400 rounded-2xl text-amber-950 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">📱</span>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider bg-amber-950 text-yellow-300 px-2 py-0.2 rounded-full">
                  Missão do Papai Carlos
                </span>
                <p className="text-xs font-black mt-0.5">
                  Vá até a {activeQuest.targetCityName}! Outras rotas estão temporariamente bloqueadas.
                </p>
              </div>
            </div>
            <div className="text-xs font-black bg-white/80 px-2.5 py-1 rounded-xl">
              +{activeQuest.rewardCoins} Moedas 🪙
            </div>
          </div>
        )}

        {/* Interactive Stylized Kanto-Like Regional Map Board */}
        <div className="relative flex-1 m-4 rounded-3xl bg-[#48BB78] bg-[radial-gradient(#38A169_2px,transparent_2px)] [background-size:24px_24px] border-4 border-emerald-800 shadow-inner overflow-hidden p-4 min-h-[360px] sm:min-h-[420px]">
          {/* Water Ocean Edge at bottom-left */}
          <div className="absolute -bottom-8 -left-8 w-64 h-64 rounded-full bg-sky-400 border-8 border-sky-500/80 shadow-inner pointer-events-none" />

          {/* Connected White Road Routes (like Kanto Map routes) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {/* Route 1: Home (20%, 75%) to Math (20%, 35%) */}
            <line x1="20%" y1="75%" x2="20%" y2="35%" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="round" opacity="0.9" />
            <line x1="20%" y1="75%" x2="20%" y2="35%" stroke="#E2E8F0" strokeWidth="6" strokeLinecap="round" />

            {/* Route 2: Math (20%, 35%) to Science (50%, 22%) */}
            <line x1="20%" y1="35%" x2="50%" y2="22%" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="round" opacity="0.9" />
            <line x1="20%" y1="35%" x2="50%" y2="22%" stroke="#E2E8F0" strokeWidth="6" strokeLinecap="round" />

            {/* Route 3: Science (50%, 22%) to Portuguese (80%, 30%) */}
            <line x1="50%" y1="22%" x2="80%" y2="30%" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="round" opacity="0.9" />
            <line x1="50%" y1="22%" x2="80%" y2="30%" stroke="#E2E8F0" strokeWidth="6" strokeLinecap="round" />

            {/* Route 4: Portuguese (80%, 30%) to History (80%, 65%) */}
            <line x1="80%" y1="30%" x2="80%" y2="65%" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="round" opacity="0.9" />
            <line x1="80%" y1="30%" x2="80%" y2="65%" stroke="#E2E8F0" strokeWidth="6" strokeLinecap="round" />

            {/* Route 5: History (80%, 65%) to English (52%, 78%) */}
            <line x1="80%" y1="65%" x2="52%" y2="78%" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="round" opacity="0.9" />
            <line x1="80%" y1="65%" x2="52%" y2="78%" stroke="#E2E8F0" strokeWidth="6" strokeLinecap="round" />

            {/* Route 6: English (52%, 78%) to Home (20%, 75%) */}
            <line x1="52%" y1="78%" x2="20%" y2="75%" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="round" opacity="0.9" />
            <line x1="52%" y1="78%" x2="20%" y2="75%" stroke="#E2E8F0" strokeWidth="6" strokeLinecap="round" />
          </svg>

          {/* Surprise Team Rocket Ambush Encounter on Route 1 */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              playSound("pop");
              if (onTriggerRocketBattle) {
                onTriggerRocketBattle("matematica", "Matemática da Rota 1");
              }
            }}
            className="absolute z-20 top-[55%] left-[17%] -translate-x-1/2 -translate-y-1/2 p-2 bg-slate-950 text-white rounded-2xl border-2 border-rose-500 shadow-xl flex items-center gap-1.5 cursor-pointer hover:scale-110 active:scale-95 animate-bounce"
            title="Emboscada da Equipe Rocket!"
          >
            <span className="text-xl">🦹‍♂️</span>
            <span className="text-[10px] font-black text-rose-300">Equipe Rocket!</span>
          </div>

          {/* Cities Pins (Kanto Cities) */}
          {REGION_CITIES.map((city) => {
            // Is this city locked by Papai Carlos's active order?
            const isTargetQuestCity = activeQuest && activeQuest.targetSubjectId === city.subjectId;
            const isHome = city.id === "home_village";
            const isLocked = activeQuest && !isTargetQuestCity && !isHome;

            return (
              <div
                key={city.id}
                onClick={(e) => {
                  e.stopPropagation();
                  if (isLocked) {
                    playSound("click");
                    alert(`Papai Carlos: "Filha, primeiro finalize o pedido que te mandei no SaberPhone na ${activeQuest.targetCityName}!"`);
                    return;
                  }
                  playSound("open");
                  onSelectCity(city);
                  onClose();
                }}
                className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95 ${
                  isLocked ? "opacity-75" : ""
                }`}
                style={{ left: `${city.coords.x}%`, top: `${city.coords.y}%` }}
              >
                {/* City Icon Badge */}
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-3xl p-2 shadow-2xl flex items-center justify-center border-4 ${city.borderStyle} ${
                    isLocked
                      ? "bg-slate-700 text-slate-300"
                      : isTargetQuestCity
                      ? "bg-gradient-to-br from-yellow-300 via-amber-400 to-orange-500 ring-4 ring-yellow-400 animate-pulse text-amber-950"
                      : "bg-white text-slate-800"
                  }`}
                >
                  <span className="text-2xl sm:text-3xl">{city.badgeEmoji}</span>
                </div>

                {/* City Name Tag */}
                <div className="mt-1.5 text-center flex flex-col items-center whitespace-nowrap">
                  <div
                    className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-black shadow-md flex items-center gap-1 ${
                      isLocked
                        ? "bg-slate-800 text-slate-400 border border-slate-600"
                        : "bg-white text-slate-900 border-2 border-slate-300"
                    }`}
                  >
                    {isLocked && <Lock className="w-3 h-3 text-rose-500" />}
                    <span>{city.name}</span>
                  </div>

                  <span className="text-[9px] font-bold text-emerald-950 bg-emerald-100/90 px-1.5 rounded-md mt-0.5">
                    {city.gymLeader}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 text-center text-xs text-slate-400 font-bold">
          Dica do Papai Carlos: &ldquo;Conquiste as Insígnias do Saber em cada cidade para se tornar a Maior Mestre da Região!&rdquo;
        </div>
      </div>
    </div>
  );
}
