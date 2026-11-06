"use client";

import React, { useState } from "react";
import { StudentProfile, PhoneMessage, ActiveStoryQuest } from "../types";
import {
  Smartphone,
  X,
  MessageSquare,
  CheckCircle2,
  Clock,
  Sparkles,
  Heart,
  Compass,
  AlertCircle,
  MapPin,
  Lock,
} from "lucide-react";
import { playSound } from "@/lib/soundEffects";

interface SaberPhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: StudentProfile;
  activeQuest: ActiveStoryQuest | null;
  messages: PhoneMessage[];
  onNavigateToQuestCity?: (citySubjectId: string) => void;
  sisterName: string;
  currentZoneName?: string;
  completedSchoolChapters?: string[];
  wildHuntQuota?: number;
  initialTab?: "dad" | "mom" | "all" | "map";
  onMapOpened?: () => void;
}

const KANTO_TRAVEL_GUIDE = [
  {
    id: "pallet",
    name: "1. Pallet Town (Vila da Família)",
    coords: "Sul • (X:34, Y:154)",
    icon: "🏡",
    subject: "Início da Jornada & Laboratório Oak",
    chapterKey: "portuguese_ch1",
    connections: "⬆️ Siga ao NORTE pela Rota 1 para chegar a Viridian City. ⬇️ Ao SUL (Surf) fica a Rota 21 para Cinnabar.",
    targetNavId: "vila",
  },
  {
    id: "viridian",
    name: "2. Viridian City (Metrópole do Saber)",
    coords: "Sudoeste • (X:34, Y:115)",
    icon: "🏛️",
    subject: "Escola da Cidade • Matemática & Biblioteca",
    chapterKey: "math_ch1",
    connections: "⬆️ NORTE: Rota 2 e Floresta de Viridian (rumo a Pewter) | ⬅️ OESTE: Rota 22 (rumo ao Indigo Plateau) | ⬇️ SUL: Rota 1 (Pallet).",
    targetNavId: "matematica",
  },
  {
    id: "pewter",
    name: "3. Pewter City (Terra das Rochas)",
    coords: "Noroeste • (X:34, Y:48)",
    icon: "🪨",
    subject: "Escola de Matemática, Museu & Ginásio Brock",
    chapterKey: "math_ch1",
    connections: "➡️ LESTE: Rota 3 e Monte da Lua (rumo a Cerulean) | ⬇️ SUL: Rota 2 e Floresta (rumo a Viridian).",
    targetNavId: "matematica",
  },
  {
    id: "cerulean",
    name: "4. Cerulean City (Capital das Águas)",
    coords: "Nordeste • (X:108, Y:44)",
    icon: "💧",
    subject: "Escola de Ciências & Ginásio Aquático Misty",
    chapterKey: "science_ch1",
    connections: "⬆️ NORTE: Ponte Pepita (Rota 24/25 e Casa do Bill) | ⬇️ SUL: Rota 5 (rumo a Saffron) | ⬅️ OESTE: Rota 4 e Mt. Moon.",
    targetNavId: "ciencias",
  },
  {
    id: "celadon",
    name: "5. Celadon City (Grande Shopping)",
    coords: "Centro-Oeste • (X:70, Y:85)",
    icon: "🏬",
    subject: "Escola de Português, Shopping & Ginásio Erika",
    chapterKey: "portuguese_ch1",
    connections: "➡️ LESTE: Rota 7 (rumo a Saffron) | ⬇️ SUL: Rota 17 Cycling Road (rumo a Fuchsia).",
    targetNavId: "portugues",
  },
  {
    id: "saffron",
    name: "6. Saffron City (Coração de Kanto)",
    coords: "Centro • (X:114, Y:85)",
    icon: "🏢",
    subject: "Escola de Geografia, Silph Co. & Ginásio Sabrina",
    chapterKey: "geography_ch1",
    connections: "⬆️ NORTE: Rota 5 (Cerulean) | ⬇️ SUL: Rota 6 (Vermilion) | ⬅️ OESTE: Rota 7 (Celadon) | ➡️ LESTE: Rota 8.",
    targetNavId: "geografia",
  },
  {
    id: "vermilion",
    name: "7. Vermilion City (Porto Marítimo)",
    coords: "Centro-Sul • (X:113, Y:124)",
    icon: "🚢",
    subject: "Escola de Inglês, Porto S.S. Anne & Ginásio Surge",
    chapterKey: "english_ch1",
    connections: "⬆️ NORTE: Rota 6 (Saffron) | ➡️ LESTE/SUL: Rotas Costeiras 11 a 15 (rumo a Fuchsia).",
    targetNavId: "ingles",
  },
  {
    id: "fuchsia",
    name: "8. Fuchsia City (Safari & Biologia)",
    coords: "Sudeste • (X:108, Y:145)",
    icon: "🦏",
    subject: "Escola de Inglês, Safari Zone & Ginásio Koga",
    chapterKey: "english_ch1",
    connections: "⬅️ OESTE/NORTE: Cycling Road (Celadon) | ➡️ LESTE: Rotas Costeiras (Vermilion) | ⬇️ SUL: Rotas Marítimas 19/20.",
    targetNavId: "ingles",
  },
  {
    id: "cinnabar",
    name: "9. Cinnabar Island (Ilha dos Fósseis)",
    coords: "Extremo Sul • (X:32, Y:172)",
    icon: "🌋",
    subject: "Escola de Ciências, Lab. de Fósseis & Ginásio Blaine",
    chapterKey: "science_ch1",
    connections: "⬆️ NORTE (Surf): Rota 21 (direto para Pallet Town) | ➡️ LESTE (Surf): Ilhas Seafoam e Fuchsia.",
    targetNavId: "ciencias",
  },
  {
    id: "indigo",
    name: "10. Indigo Plateau (Liga Pokémon)",
    coords: "Cume Noroeste • (X:20, Y:19)",
    icon: "👑",
    subject: "Provas Finais de Maestria & Elite dos Campeões",
    chapterKey: "math_ch1",
    connections: "⬇️ SUL: Estrada da Vitória (Rota 23 & 22 até Viridian City).",
    targetNavId: "matematica",
  },
];

export function SaberPhoneModal({
  isOpen,
  onClose,
  currentProfile,
  activeQuest,
  messages,
  onNavigateToQuestCity,
  sisterName,
  currentZoneName,
  completedSchoolChapters = [],
  wildHuntQuota = 0,
  initialTab,
  onMapOpened,
}: SaberPhoneModalProps) {
  const [activeTab, setActiveTab] = useState<"dad" | "mom" | "all" | "map">(initialTab || "dad");
  const [plottedTargetSubject, setPlottedTargetSubject] = useState<string | null>(
    activeQuest?.targetSubjectId || null
  );

  React.useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab);
      if (initialTab === "map") {
        onMapOpened?.();
      }
    }
  }, [isOpen, initialTab, onMapOpened]);

  React.useEffect(() => {
    if (activeQuest?.targetSubjectId && !plottedTargetSubject) {
      setPlottedTargetSubject(activeQuest.targetSubjectId);
    }
  }, [activeQuest, plottedTargetSubject]);

  if (!isOpen) return null;

  // Map zone string to city ID
  const resolveOriginCityId = (zone?: string): string => {
    const z = (zone || "").toLowerCase();
    if (z.includes("viridian") || z.includes("matemática") || z.includes("escola")) return "viridian";
    if (z.includes("pewter") || z.includes("rocha")) return "pewter";
    if (z.includes("cerulean") || z.includes("ciência") || z.includes("água")) return "cerulean";
    if (z.includes("celadon") || z.includes("português") || z.includes("shopping")) return "celadon";
    if (z.includes("saffron") || z.includes("geografia")) return "saffron";
    if (z.includes("vermilion") || z.includes("porto") || z.includes("inglês")) return "vermilion";
    if (z.includes("fuchsia") || z.includes("safari") || z.includes("biologia")) return "fuchsia";
    if (z.includes("cinnabar") || z.includes("fóssil") || z.includes("química")) return "cinnabar";
    if (z.includes("indigo") || z.includes("liga")) return "indigo";
    return "pallet";
  };

  // Map quest/message targetSubjectId or text to destination city ID
  const resolveDestinationCityId = (targetSubjectId?: string, text?: string): string => {
    const t = (targetSubjectId || "").toLowerCase();
    const msg = (text || "").toLowerCase();
    if (t === "flores" || t === "pet" || msg.includes("pipoca") || msg.includes("flores") || msg.includes("quintal")) {
      return "pallet";
    }
    if (msg.includes("indigo") || msg.includes("simulado") || msg.includes("campeões")) {
      return "indigo";
    }
    if (t === "matematica" || msg.includes("matemática") || msg.includes("viridian") || msg.includes("pitágoras")) {
      return "viridian";
    }
    if (t === "ciencias" || msg.includes("ciências") || msg.includes("cerulean") || msg.includes("flora")) {
      return "cerulean";
    }
    if (t === "portugues" || msg.includes("português") || msg.includes("celadon") || msg.includes("biblioteca")) {
      return "celadon";
    }
    if (t === "ingles" || msg.includes("inglês") || msg.includes("vermilion")) {
      return "vermilion";
    }
    if (t === "biologia" || msg.includes("safari") || msg.includes("fuchsia")) {
      return "fuchsia";
    }
    if (t === "quimica" || msg.includes("cinnabar") || msg.includes("fósseis")) {
      return "cinnabar";
    }
    return "viridian";
  };

  // Build step-by-step route between origin city and destination city
  const buildStepByStepRoute = (fromId: string, toId: string): { pathIds: string[]; stepsText: string[] } => {
    if (fromId === toId) {
      const city = KANTO_TRAVEL_GUIDE.find((c) => c.id === toId);
      return {
        pathIds: [toId],
        stepsText: [`📍 Você já está em ${city?.name || "seu destino"}! Procure o objetivo arredor!`],
      };
    }
    const routeGraph: Record<string, { next: string; label: string }[]> = {
      pallet: [
        { next: "viridian", label: "⬆️ Suba ao NORTE pela Rota 1 até Viridian City" },
        { next: "cinnabar", label: "⬇️ Nade ao SUL (Surf) pela Rota 21 até Cinnabar Island" },
      ],
      viridian: [
        { next: "pallet", label: "⬇️ Desça ao SUL pela Rota 1 até Pallet Town" },
        { next: "pewter", label: "⬆️ Suba ao NORTE pela Rota 2 e Floresta de Viridian até Pewter City" },
        { next: "indigo", label: "⬅️ Siga a OESTE pela Rota 22 e suba a Rota 23 até o Indigo Plateau" },
      ],
      pewter: [
        { next: "viridian", label: "⬇️ Desça ao SUL pela Rota 2 até Viridian City" },
        { next: "cerulean", label: "➡️ Siga a LESTE pela Rota 3 e Monte da Lua até Cerulean City" },
      ],
      cerulean: [
        { next: "pewter", label: "⬅️ Siga a OESTE pela Rota 4 até Pewter City" },
        { next: "saffron", label: "⬇️ Desça ao SUL pela Rota 5 até Saffron City" },
      ],
      saffron: [
        { next: "cerulean", label: "⬆️ Suba ao NORTE pela Rota 5 até Cerulean City" },
        { next: "celadon", label: "⬅️ Siga a OESTE pela Rota 7 até Celadon City" },
        { next: "vermilion", label: "⬇️ Desça ao SUL pela Rota 6 até Vermilion City" },
      ],
      celadon: [
        { next: "saffron", label: "➡️ Siga a LESTE pela Rota 7 até Saffron City" },
        { next: "fuchsia", label: "⬇️ Desça ao SUL pela Ciclovia (Rota 16/17) até Fuchsia City" },
      ],
      vermilion: [
        { next: "saffron", label: "⬆️ Suba ao NORTE pela Rota 6 até Saffron City" },
        { next: "fuchsia", label: "➡️ Siga pelas Rotas Costeiras (11 a 15) até Fuchsia City" },
      ],
      fuchsia: [
        { next: "celadon", label: "⬆️ Suba pela Ciclovia (Rota 17) até Celadon City" },
        { next: "vermilion", label: "⬅️ Siga pelas Rotas Costeiras até Vermilion City" },
        { next: "cinnabar", label: "⬇️ Nade pelas Rotas Marítimas (19/20) até Cinnabar Island" },
      ],
      cinnabar: [
        { next: "pallet", label: "⬆️ Suba nadando pela Rota 21 até Pallet Town" },
        { next: "fuchsia", label: "➡️ Nade pelas Rotas 20/19 até Fuchsia City" },
      ],
      indigo: [
        { next: "viridian", label: "⬇️ Desça pela Rota 23 e Rota 22 até Viridian City" },
      ],
    };

    // BFS shortest path
    const queue: { id: string; path: string[]; steps: string[] }[] = [
      { id: fromId, path: [fromId], steps: [] },
    ];
    const visited = new Set<string>([fromId]);

    while (queue.length > 0) {
      const curr = queue.shift()!;
      if (curr.id === toId) {
        return { pathIds: curr.path, stepsText: curr.steps };
      }
      for (const edge of routeGraph[curr.id] || []) {
        if (!visited.has(edge.next)) {
          visited.add(edge.next);
          queue.push({
            id: edge.next,
            path: [...curr.path, edge.next],
            steps: [...curr.steps, edge.label],
          });
        }
      }
    }

    return {
      pathIds: [fromId, toId],
      stepsText: ["🧭 Siga pela estrada principal de Kanto até o destino marcado!"],
    };
  };

  const originCityId = resolveOriginCityId(currentZoneName);
  const destCityId = resolveDestinationCityId(plottedTargetSubject || activeQuest?.targetSubjectId);
  const activeRoutePlan = buildStepByStepRoute(originCityId, destCityId);
  const originCityObj = KANTO_TRAVEL_GUIDE.find((c) => c.id === originCityId) || KANTO_TRAVEL_GUIDE[0];
  const destCityObj = KANTO_TRAVEL_GUIDE.find((c) => c.id === destCityId) || KANTO_TRAVEL_GUIDE[1];

  const handlePlotRouteInMap = (subjectOrKey: string) => {
    playSound("open");
    setPlottedTargetSubject(subjectOrKey);
    setActiveTab("map");
    onMapOpened?.();
    onNavigateToQuestCity?.(subjectOrKey);
  };

  const dadMessages = messages.filter((m) => m.sender === "papai");
  const momMessages = messages.filter((m) => m.sender === "mamae");
  const otherMessages = messages.filter((m) => m.sender !== "papai" && m.sender !== "mamae");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn select-none touch-manipulation">
      {/* Smartphone Case Frame */}
      <div className="relative w-full max-w-sm sm:max-w-md bg-slate-900 rounded-[44px] p-3 sm:p-4 shadow-2xl border-4 border-slate-700 ring-8 ring-slate-950 flex flex-col max-h-[92vh]">
        {/* Top Speaker & Camera Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-950 rounded-full flex items-center justify-center gap-2 z-20">
          <div className="w-10 h-1.5 bg-slate-800 rounded-full" />
          <div className="w-2.5 h-2.5 bg-slate-800 rounded-full border border-slate-700" />
        </div>

        {/* Screen Bezel */}
        <div className="relative flex-1 bg-gradient-to-b from-sky-50 via-white to-purple-50 rounded-[34px] overflow-hidden flex flex-col border border-slate-200">
          {/* Status Bar */}
          <div className="pt-4 px-5 pb-2 flex items-center justify-between text-[11px] font-black text-slate-600 bg-white/70 backdrop-blur-sm border-b border-slate-200/60">
            <span>SaberPhone 5G</span>
            <div className="flex items-center gap-2">
              <span className="text-emerald-600 font-extrabold">100% 🔋</span>
              <span>📶</span>
            </div>
          </div>

          {/* App Header */}
          <div className="p-3 bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 text-white flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl shadow-inner">
                📱
              </div>
              <div>
                <h3 className="text-sm font-black tracking-wide flex items-center gap-1.5">
                  <span>Mensagens da Família</span>
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                </h3>
                <p className="text-[10px] text-sky-100 font-bold">
                  Celular da {currentProfile.name}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                playSound("pop");
                onClose();
              }}
              className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white cursor-pointer active:scale-95"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Active Mission Alert from Papai Carlos or Mamãe Renata */}
          {activeQuest && (
            <div
              className={`m-3 p-3.5 rounded-2xl border-2 shadow-md space-y-1.5 animate-bounce-subtle ${
                activeQuest.sender === "papai"
                  ? "bg-gradient-to-br from-amber-400 via-yellow-400 to-orange-400 border-amber-600 text-amber-950"
                  : "bg-gradient-to-br from-pink-300 via-rose-200 to-amber-200 border-pink-500 text-pink-950"
              }`}
            >
              <div className="flex items-center justify-between gap-1 flex-wrap">
                <span
                  className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full flex items-center gap-1 ${
                    activeQuest.sender === "papai"
                      ? "bg-amber-950 text-yellow-300"
                      : "bg-pink-900 text-pink-200"
                  }`}
                >
                  <span>
                    {activeQuest.sender === "papai"
                      ? "👨‍👧 Missão Urgente do Papai Carlos"
                      : "🌸 Pedido Carinhoso da Mamãe Renata"}
                  </span>
                </span>
                <div className="flex items-center gap-1 text-[11px] font-black">
                  <span className="bg-white/90 px-2 py-0.5 rounded-full text-amber-900 shadow-xs">
                    +{activeQuest.rewardCoins} 🪙
                  </span>
                  {activeQuest.rewardPotions && activeQuest.rewardPotions > 0 && (
                    <span className="bg-white/90 px-2 py-0.5 rounded-full text-indigo-900 shadow-xs">
                      +{activeQuest.rewardPotions} Poções 🧪
                    </span>
                  )}
                </div>
              </div>

              <h4 className="text-xs font-black leading-tight flex items-center gap-1">
                <span>{activeQuest.title}</span>
              </h4>
              <p className="text-[11px] font-medium leading-relaxed opacity-95">
                {activeQuest.description}
              </p>

              {/* Strict route block reminder for Dad's quest */}
              {activeQuest.sender === "papai" && !activeQuest.isCompleted && (
                <div className="p-2 bg-amber-950/15 rounded-xl border border-amber-900/30 text-[10px] font-extrabold flex items-center gap-1 text-amber-950">
                  <Lock className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                  <span>Bloqueio de rotas ativo: &ldquo;Volte aqui após finalizar o pedido de seu pai.&rdquo;</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-2">
                <button
                  type="button"
                  onClick={() => handlePlotRouteInMap(activeQuest.targetSubjectId)}
                  className="btn-game py-2 px-3 text-xs font-black rounded-xl shadow-md flex items-center justify-center gap-1.5 cursor-pointer bg-emerald-700 hover:bg-emerald-800 text-white"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>🗺️ Criar Rota no Mapa</span>
                </button>

                {onNavigateToQuestCity && (
                  <button
                    type="button"
                    onClick={() => {
                      playSound("open");
                      onNavigateToQuestCity(activeQuest.targetSubjectId);
                      onClose();
                    }}
                    className={`btn-game py-2 px-3 text-xs font-black rounded-xl shadow-md flex items-center justify-center gap-1.5 cursor-pointer ${
                      activeQuest.sender === "papai"
                        ? "bg-amber-950 hover:bg-black text-yellow-300"
                        : "bg-pink-900 hover:bg-pink-950 text-pink-100"
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>
                      {activeQuest.targetSubjectId === "flores" || activeQuest.targetSubjectId === "pet"
                        ? "Ativar GPS p/ Jardim 🏡"
                        : `Ativar Seta GPS 🚀`}
                    </span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Quick Filter Tabs */}
          <div className="px-3 pt-1 pb-2 flex gap-1.5 border-b border-slate-200 bg-white/50">
            <button
              type="button"
              onClick={() => {
                playSound("click");
                setActiveTab("dad");
              }}
              className={`flex-1 py-1.5 rounded-xl text-[11px] font-black flex items-center justify-center gap-1 transition-all cursor-pointer ${
                activeTab === "dad"
                  ? "bg-sky-500 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <span>👨‍👧 Papai Carlos</span>
              {dadMessages.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-white text-sky-600 text-[9px] flex items-center justify-center">
                  {dadMessages.length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                playSound("click");
                setActiveTab("mom");
              }}
              className={`flex-1 py-1.5 rounded-xl text-[11px] font-black flex items-center justify-center gap-1 transition-all cursor-pointer ${
                activeTab === "mom"
                  ? "bg-pink-500 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <span>👩‍👧 Mamãe Renata</span>
              {momMessages.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-white text-pink-600 text-[9px] flex items-center justify-center">
                  {momMessages.length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                playSound("click");
                setActiveTab("all");
              }}
              className={`px-2.5 py-1.5 rounded-xl text-[11px] font-black flex items-center justify-center gap-1 transition-all cursor-pointer ${
                activeTab === "all"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <span>👭 {sisterName}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                playSound("click");
                setActiveTab("map");
                onMapOpened?.();
              }}
              className={`px-2.5 py-1.5 rounded-xl text-[11px] font-black flex items-center justify-center gap-1 transition-all cursor-pointer ${
                activeTab === "map"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100"
              }`}
            >
              <span>🗺️ Mapa</span>
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2.5">
            {activeTab === "dad" && (
              <div className="space-y-2">
                <div className="p-3 bg-sky-50 rounded-2xl border border-sky-200 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-sky-500 text-white flex items-center justify-center text-xl shrink-0 shadow-md">
                    👨‍👧
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-sky-950">
                        Papai Carlos
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold">
                        Agora
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 font-medium mt-1 leading-relaxed">
                      &ldquo;Minha querida {currentProfile.name}, muito orgulho de você! Cumpra a missão que enviei e lembre-se: o conhecimento é o seu maior superpoder! Depois venha pegar sua mesada comigo na sala!&rdquo;
                    </p>
                    <div className="mt-2 text-[10px] font-black text-sky-700 bg-sky-100/80 px-2 py-0.5 rounded-md inline-block">
                      💡 Dica do Pai: Não pule matérias!
                    </div>
                  </div>
                </div>

                {dadMessages.map((m) => (
                  <div
                    key={m.id}
                    className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-start gap-2.5"
                  >
                    <span className="text-2xl">{m.avatarEmoji}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-800">
                          {m.senderName}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold">
                          {m.timeAgo}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium mt-0.5">
                        {m.text}
                      </p>
                      {m.rewardCoins && (
                        <div className="mt-1.5 flex items-center gap-1 text-[10px] font-black text-amber-700">
                          <span>Recompensa: +{m.rewardCoins} Moedas 🪙</span>
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          handlePlotRouteInMap(
                            m.targetSubjectId || resolveDestinationCityId(undefined, m.text)
                          )
                        }
                        className="mt-2 px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-[10px] font-black inline-flex items-center gap-1 shadow-xs cursor-pointer"
                      >
                        <Compass className="w-3 h-3" />
                        <span>🗺️ Criar Rota no Mapa</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "mom" && (
              <div className="space-y-2">
                <div className="p-3 bg-pink-50 rounded-2xl border border-pink-200 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-pink-500 text-white flex items-center justify-center text-xl shrink-0 shadow-md">
                    👩‍👧
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-pink-950">
                        Mamãe Renata
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold">
                        Hoje
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 font-medium mt-1 leading-relaxed">
                      &ldquo;Oi meu amor! Não se esqueça de arrumar sua caminha, regar as violetas da varanda e dar carinho no seu pet antes de ir para as outras cidades! Te amo muito! ❤️&rdquo;
                    </p>
                  </div>
                </div>

                {momMessages.map((m) => (
                  <div
                    key={m.id}
                    className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-start gap-2.5"
                  >
                    <span className="text-2xl">{m.avatarEmoji}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-800">
                          {m.senderName}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold">
                          {m.timeAgo}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium mt-0.5">
                        {m.text}
                      </p>
                      {(m.rewardCoins || m.rewardPotions) && (
                        <div className="mt-1.5 flex items-center gap-1.5 text-[10px] font-black">
                          {m.rewardCoins && (
                            <span className="text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                              +{m.rewardCoins} Moedas 🪙
                            </span>
                          )}
                          {m.rewardPotions && (
                            <span className="text-pink-700 bg-pink-50 px-1.5 py-0.5 rounded border border-pink-200">
                              +{m.rewardPotions} Poções 🧪
                            </span>
                          )}
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          handlePlotRouteInMap(
                            m.targetSubjectId || resolveDestinationCityId("flores", m.text)
                          )
                        }
                        className="mt-2 px-3 py-1.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-[10px] font-black inline-flex items-center gap-1 shadow-xs cursor-pointer"
                      >
                        <Compass className="w-3 h-3" />
                        <span>🗺️ Criar Rota no Mapa</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "all" && (
              <div className="space-y-2">
                <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-purple-500 text-white flex items-center justify-center text-xl shrink-0 shadow-md">
                    👭
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-purple-950">
                        Irmã {sisterName}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold">
                        Agora
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 font-medium mt-1 leading-relaxed">
                      &ldquo;O Papai Carlos me disse que você está arrasando nas missões! Depois me ajuda a fazer lição juntas? Boa sorte na Rota!&rdquo;
                    </p>
                  </div>
                </div>

                {otherMessages.map((m) => (
                  <div
                    key={m.id}
                    className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-start gap-2.5"
                  >
                    <span className="text-2xl">{m.avatarEmoji}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-800">
                          {m.senderName}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold">
                          {m.timeAgo}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium mt-0.5">
                        {m.text}
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          handlePlotRouteInMap(
                            m.targetSubjectId || resolveDestinationCityId(undefined, m.text)
                          )
                        }
                        className="mt-2 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-[10px] font-black inline-flex items-center gap-1 shadow-xs cursor-pointer"
                      >
                        <Compass className="w-3 h-3" />
                        <span>🗺️ Criar Rota no Mapa</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "map" && (
              <div className="space-y-3">
                {/* Active Plotted GPS Route Card (From Current Location -> Mission Destination) */}
                <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-emerald-950 text-white border-2 border-amber-400 shadow-lg space-y-2">
                  <div className="flex items-center justify-between gap-1 flex-wrap">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Compass className="w-3 h-3" />
                      <span>🧭 Rota GPS Traçada no Mapa</span>
                    </span>
                    <span className="text-[10px] font-black bg-emerald-500/30 border border-emerald-400/50 text-emerald-200 px-2 py-0.5 rounded-full">
                      Caçadas: {wildHuntQuota} 🌿
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-1.5 bg-black/35 p-2.5 rounded-xl border border-white/10 text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 rounded bg-emerald-600 text-[9px] font-black">
                        ORIGEM
                      </span>
                      <span className="font-bold text-emerald-300 truncate">
                        {originCityObj.icon} {originCityObj.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 text-[9px] font-black">
                        DESTINO
                      </span>
                      <span className="font-bold text-amber-300 truncate">
                        {destCityObj.icon} {destCityObj.name}
                      </span>
                    </div>
                  </div>

                  {/* Step-by-step directions */}
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-sky-300 uppercase">
                      Passo a Passo da Rota:
                    </p>
                    {activeRoutePlan.stepsText.map((step, i) => (
                      <div
                        key={i}
                        className="text-[11px] font-bold text-white bg-white/10 px-2.5 py-1.5 rounded-lg border border-white/15 flex items-center gap-1.5"
                      >
                        <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 text-[9px] font-black flex items-center justify-center shrink-0">
                          {i + 1}
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>

                  {onNavigateToQuestCity && (
                    <button
                      type="button"
                      onClick={() => {
                        playSound("open");
                        onNavigateToQuestCity(plottedTargetSubject || destCityObj.targetNavId);
                        onClose();
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>🚀 Ativar Setas Douradas no Chão do Jogo!</span>
                    </button>
                  )}
                </div>

                {/* Visual Network Diagram of Kanto with Live Route Highlighting */}
                <div className="p-3 rounded-2xl bg-slate-900 text-white border-2 border-slate-700 space-y-2">
                  <div className="text-[10px] font-black uppercase tracking-wider text-amber-300 flex items-center justify-between">
                    <span>🗺️ Mapa de Conexões (Toque para Traçar Rota)</span>
                    <span>🟢 Você • 🎯 Destino</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 text-[10px] font-black text-center">
                    {[
                      { id: "indigo", label: "👑 Indigo Plateau", sub: "↓ Rota 23", nav: "indigo" },
                      { id: "pewter", label: "🪨 Pewter City", sub: "↔ Mt. Moon", nav: "matematica" },
                      { id: "cerulean", label: "💧 Cerulean", sub: "↓ Rota 5", nav: "ciencias" },
                      { id: "viridian", label: "🏛️ Viridian", sub: "↕ Rota 1 e 2", nav: "matematica" },
                      { id: "celadon", label: "🏬 Celadon", sub: "↔ Rota 7", nav: "portugues" },
                      { id: "saffron", label: "🏢 Saffron", sub: "↕ Rota 5 e 6", nav: "geografia" },
                      { id: "pallet", label: "🏡 Pallet Town", sub: "↕ Rota 1 / 21", nav: "flores" },
                      { id: "fuchsia", label: "🦏 Fuchsia", sub: "↑ Ciclovia", nav: "biologia" },
                      { id: "vermilion", label: "🚢 Vermilion", sub: "↔ Rota 11-15", nav: "ingles" },
                    ].map((node) => {
                      const isOrigin = originCityId === node.id;
                      const isDest = destCityId === node.id;
                      const isInPath = activeRoutePlan.pathIds.includes(node.id);
                      return (
                        <button
                          key={node.id}
                          type="button"
                          onClick={() => handlePlotRouteInMap(node.id)}
                          className={`p-1.5 rounded-lg border text-center transition cursor-pointer relative ${
                            isDest
                              ? "bg-amber-500/35 border-amber-300 text-amber-100 ring-2 ring-amber-400 animate-pulse"
                              : isOrigin
                              ? "bg-emerald-500/35 border-emerald-300 text-emerald-100 ring-2 ring-emerald-400"
                              : isInPath
                              ? "bg-sky-500/30 border-sky-300 text-sky-100"
                              : "bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800"
                          }`}
                        >
                          <div>{node.label}</div>
                          <div className="text-[8px] opacity-85">
                            {isOrigin ? "📍 VOCÊ ESTÁ AQUI" : isDest ? "🎯 SEU DESTINO" : isInPath ? "➡️ NA SUA ROTA" : node.sub}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Official Spawn Rates Reference Card */}
                <div className="p-2.5 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                  <div className="text-[10px] font-black text-amber-900 uppercase">
                    🌿 Taxas Oficiais de Encontro na Grama Alta
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-[10px] font-bold text-slate-700">
                    <span>• Comuns: <b>55%</b></span>
                    <span>• Incomuns: <b>20%</b></span>
                    <span>• Difíceis: <b>8%</b></span>
                    <span>• Raros (Dratini): <b>5%</b></span>
                    <span>• Épicos/Fósseis: <b>1,5%</b></span>
                    <span>• Lendários: <b>0,5%</b></span>
                  </div>
                </div>

                {/* Detailed City & Route Cards */}
                <div className="space-y-2">
                  {KANTO_TRAVEL_GUIDE.map((city) => {
                    const isStudied = completedSchoolChapters.includes(city.chapterKey);
                    return (
                      <div
                        key={city.id}
                        className="p-2.5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1"
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-black text-slate-800 flex items-center gap-1">
                            <span>{city.icon}</span>
                            <span>{city.name}</span>
                          </span>
                          <span
                            className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
                              isStudied
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {isStudied ? "✅ Aula Vista" : "🏫 Visite a Escola"}
                          </span>
                        </div>
                        <p className="text-[10px] font-bold text-indigo-700">
                          {city.subject} • <span className="text-slate-500">{city.coords}</span>
                        </p>
                        <p className="text-[10px] text-slate-600 font-medium leading-snug">
                          {city.connections}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Home Indicator Bar */}
          <div className="p-2 bg-white/70 backdrop-blur-sm border-t border-slate-200 flex justify-center">
            <button
              type="button"
              onClick={() => {
                playSound("pop");
                onClose();
              }}
              className="w-32 h-1 bg-slate-400 hover:bg-slate-600 rounded-full cursor-pointer transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
