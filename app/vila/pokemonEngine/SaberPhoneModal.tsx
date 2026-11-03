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
}

export function SaberPhoneModal({
  isOpen,
  onClose,
  currentProfile,
  activeQuest,
  messages,
  onNavigateToQuestCity,
  sisterName,
}: SaberPhoneModalProps) {
  const [activeTab, setActiveTab] = useState<"dad" | "mom" | "all" | "map">("dad");

  if (!isOpen) return null;

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

              {onNavigateToQuestCity && (
                <button
                  type="button"
                  onClick={() => {
                    playSound("open");
                    onNavigateToQuestCity(activeQuest.targetSubjectId);
                    onClose();
                  }}
                  className={`btn-game mt-2 w-full py-2 text-xs font-black rounded-xl shadow-md flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeQuest.sender === "papai"
                      ? "bg-amber-950 hover:bg-black text-yellow-300"
                      : "bg-pink-900 hover:bg-pink-950 text-pink-100"
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>
                    {activeQuest.targetSubjectId === "flores" || activeQuest.targetSubjectId === "pet"
                      ? "Ver no Jardim / Casa da Família 🏡"
                      : `Ir para ${activeQuest.targetCityName} 🚀`}
                  </span>
                </button>
              )}
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
              className={`px-3 py-1.5 rounded-xl text-[11px] font-black flex items-center justify-center gap-1 transition-all cursor-pointer ${
                activeTab === "all"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <span>👭 Recados</span>
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
                    </div>
                  </div>
                ))}
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
