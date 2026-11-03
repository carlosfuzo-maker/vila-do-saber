"use client";

import React, { useState } from "react";
import { AvatarCustomization, StudentYear } from "../types";
import { GameAvatar } from "./GameAvatar";
import {
  X,
  Sparkles,
  Check,
  Palette,
  Scissors,
  Eye,
  Shirt,
  Smile,
  Crown,
  Heart,
  User,
} from "lucide-react";
import confetti from "canvas-confetti";
import { playSound } from "@/lib/soundEffects";

interface AvatarCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  level: number;
  currentCustomization: AvatarCustomization;
  availableOutfits: string[];
  availableAccessories: string[];
  onSaveCustomization: (newCustomization: AvatarCustomization) => void;
  onOpenShop?: () => void;
}

const SKIN_TONES = [
  { id: "#FDDFB8", name: "Clara 1" },
  { id: "#FCD3B0", name: "Clara 2" },
  { id: "#F1B789", name: "Morena Clara" },
  { id: "#D79965", name: "Morena Média" },
  { id: "#965938", name: "Negra 1" },
  { id: "#63381E", name: "Negra 2" },
];

const HAIR_STYLES: Array<{ id: AvatarCustomization["hairStyle"]; label: string; icon: string }> = [
  { id: "pigtails", label: "Chiquinhas", icon: "👧" },
  { id: "long", label: "Longo", icon: "👩" },
  { id: "curly", label: "Cacheado", icon: "🦱" },
  { id: "bob", label: "Chanel", icon: "💇" },
  { id: "short", label: "Curto", icon: "👦" },
  { id: "afro", label: "Black Power", icon: "🧑‍🦱" },
  { id: "ponytail", label: "Rabo de Cavalo", icon: "👱‍♀️" },
];

const HAIR_COLORS = [
  { hex: "#262626", name: "Preto Ébano" },
  { hex: "#451A03", name: "Castanho Escuro" },
  { hex: "#78350F", name: "Castanho Claro" },
  { hex: "#F59E0B", name: "Loiro Dourado" },
  { hex: "#EA580C", name: "Ruivo Fogo" },
  { hex: "#EC4899", name: "Rosa Fantasia" },
  { hex: "#06B6D4", name: "Azul Cristal" },
];

const EYE_COLORS = [
  { hex: "#451A03", name: "Castanho" },
  { hex: "#1E3A8A", name: "Azul" },
  { hex: "#065F46", name: "Verde" },
  { hex: "#B45309", name: "Mel" },
];

const OUTFITS_META: Record<string, { name: string; emoji: string }> = {
  starter: { name: "Aventureiro da Vila", emoji: "🎒" },
  scientist: { name: "Jaleco de Cientista", emoji: "🥼" },
  princess: { name: "Vestido das Estrelas", emoji: "👗" },
  explorer: { name: "Traje de Safari", emoji: "🧗" },
  artist: { name: "Macacão de Pintor", emoji: "🎨" },
  wizard: { name: "Capa de Mago", emoji: "🧙" },
};

const ACCESSORIES_META: Record<string, { name: string; emoji: string }> = {
  none: { name: "Nenhum", emoji: "❌" },
  glasses: { name: "Óculos de Leitura", emoji: "👓" },
  ribbon: { name: "Laço Encantado", emoji: "🎀" },
  cap: { name: "Boné Aventureiro", emoji: "🧢" },
  crown: { name: "Coroa de Ouro", emoji: "👑" },
  headphones: { name: "Fones Gamers", emoji: "🎧" },
};

export function AvatarCustomizerModal({
  isOpen,
  onClose,
  studentName,
  level,
  currentCustomization,
  availableOutfits,
  availableAccessories,
  onSaveCustomization,
  onOpenShop,
}: AvatarCustomizerModalProps) {
  const [customization, setCustomization] = useState<AvatarCustomization>(
    currentCustomization || {
      gender: "girl",
      skinTone: "#FCD3B0",
      hairStyle: "pigtails",
      hairColor: "#78350F",
      eyeColor: "#451A03",
      outfitId: "starter",
      accessoryId: "ribbon",
      petId: null,
      blushStyle: "none",
    }
  );

  const [activeTab, setActiveTab] = useState<
    "gender" | "skin" | "face" | "hair" | "eyes" | "outfits" | "accessories"
  >("hair");

  if (!isOpen) return null;

  const handleSave = () => {
    playSound("fanfare");
    onSaveCustomization(customization);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-4 border-pink-300 overflow-hidden flex flex-col max-h-[94vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 p-4 sm:p-5 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-2xl backdrop-blur-md">
              <Sparkles className="w-6 h-6 text-yellow-200" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-wide flex items-center gap-2">
                <span>Espelho Mágico da {studentName}</span>
              </h2>
              <p className="text-xs sm:text-sm text-pink-100 font-medium">
                Personalize o cabelo, tom de pele, olhos e roupas do seu personagem!
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playSound("click");
              onClose();
            }}
            className="p-3 bg-white/20 hover:bg-white/30 rounded-2xl transition-transform active:scale-90 cursor-pointer min-w-[46px] min-h-[46px] flex items-center justify-center border border-white/30"
            aria-label="Fechar"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left: Avatar Dressing Mirror Preview */}
          <div className="p-6 bg-gradient-to-b from-sky-100 via-pink-50 to-amber-50 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-200 shrink-0 md:w-64">
            <div className="relative p-6 rounded-3xl bg-white/80 border-4 border-amber-300 shadow-xl flex flex-col items-center justify-center">
              <div className="absolute -top-3 px-3 py-0.5 bg-amber-400 text-amber-950 rounded-full font-black text-[10px] uppercase shadow-sm">
                Seu Visual
              </div>
              <GameAvatar
                customization={customization}
                studentName={studentName}
                level={level}
                scale={1.4}
                className="my-3"
              />
            </div>

            <p className="text-[11px] text-slate-500 font-bold mt-4 text-center">
              ✨ As alterações aparecem em tempo real no mapa e nos edifícios!
            </p>
          </div>

          {/* Right: Customization Controls & Tabs */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Tabs Bar */}
            <div className="flex items-center gap-1 p-2 bg-slate-50 border-b border-slate-200 overflow-x-auto">
              <button
                type="button"
                onClick={() => {
                  playSound("click");
                  setActiveTab("gender");
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer shrink-0 ${
                  activeTab === "gender"
                    ? "bg-rose-500 text-white shadow-sm"
                    : "bg-white text-slate-600 hover:bg-slate-100"
                }`}
              >
                Gênero
              </button>

              <button
                type="button"
                onClick={() => {
                  playSound("click");
                  setActiveTab("skin");
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer shrink-0 ${
                  activeTab === "skin"
                    ? "bg-rose-500 text-white shadow-sm"
                    : "bg-white text-slate-600 hover:bg-slate-100"
                }`}
              >
                Pele
              </button>

              <button
                type="button"
                onClick={() => {
                  playSound("click");
                  setActiveTab("face");
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer shrink-0 ${
                  activeTab === "face"
                    ? "bg-rose-500 text-white shadow-sm"
                    : "bg-white text-slate-600 hover:bg-slate-100"
                }`}
              >
                Rosto & Sardas
              </button>

              <button
                type="button"
                onClick={() => {
                  playSound("click");
                  setActiveTab("hair");
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer shrink-0 ${
                  activeTab === "hair"
                    ? "bg-rose-500 text-white shadow-sm"
                    : "bg-white text-slate-600 hover:bg-slate-100"
                }`}
              >
                Cabelo
              </button>

              <button
                type="button"
                onClick={() => {
                  playSound("click");
                  setActiveTab("eyes");
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer shrink-0 ${
                  activeTab === "eyes"
                    ? "bg-rose-500 text-white shadow-sm"
                    : "bg-white text-slate-600 hover:bg-slate-100"
                }`}
              >
                Olhos
              </button>

              <button
                type="button"
                onClick={() => {
                  playSound("click");
                  setActiveTab("outfits");
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer shrink-0 ${
                  activeTab === "outfits"
                    ? "bg-rose-500 text-white shadow-sm"
                    : "bg-white text-slate-600 hover:bg-slate-100"
                }`}
              >
                Roupas
              </button>

              <button
                type="button"
                onClick={() => {
                  playSound("click");
                  setActiveTab("accessories");
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer shrink-0 ${
                  activeTab === "accessories"
                    ? "bg-rose-500 text-white shadow-sm"
                    : "bg-white text-slate-600 hover:bg-slate-100"
                }`}
              >
                Acessórios
              </button>
            </div>

            {/* Tab Panels */}
            <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4">
              {/* Tab 1: Gender */}
              {activeTab === "gender" && (
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase text-slate-500">
                    Escolha o Estilo do Personagem
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        playSound("click");
                        setCustomization((prev) => ({ ...prev, gender: "girl" }));
                      }}
                      className={`p-4 rounded-2xl border-3 flex flex-col items-center gap-2 cursor-pointer transition-all ${
                        customization.gender === "girl"
                          ? "bg-pink-50 border-pink-500 text-pink-900 shadow-md ring-2 ring-pink-300"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-white"
                      }`}
                    >
                      <span className="text-3xl">👧</span>
                      <span className="text-sm font-black">Menina</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        playSound("click");
                        setCustomization((prev) => ({ ...prev, gender: "boy" }));
                      }}
                      className={`p-4 rounded-2xl border-3 flex flex-col items-center gap-2 cursor-pointer transition-all ${
                        customization.gender === "boy"
                          ? "bg-sky-50 border-sky-500 text-sky-900 shadow-md ring-2 ring-sky-300"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-white"
                      }`}
                    >
                      <span className="text-3xl">👦</span>
                      <span className="text-sm font-black">Menino</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 2: Skin Tone */}
              {activeTab === "skin" && (
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase text-slate-500">
                    Escolha o Tom de Pele
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    {SKIN_TONES.map((tone) => (
                      <button
                        key={tone.id}
                        type="button"
                        onClick={() => {
                          playSound("click");
                          setCustomization((prev) => ({ ...prev, skinTone: tone.id }));
                        }}
                        className={`p-3 rounded-2xl border-3 flex items-center gap-2.5 cursor-pointer transition-all ${
                          customization.skinTone === tone.id
                            ? "border-pink-500 bg-pink-50 shadow-md"
                            : "border-slate-200 bg-white hover:bg-slate-50"
                        }`}
                      >
                        <div
                          className="w-7 h-7 rounded-full border border-slate-300 shrink-0 shadow-inner"
                          style={{ backgroundColor: tone.id }}
                        />
                        <span className="text-xs font-bold text-slate-800">
                          {tone.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab: Face & Freckles / Bochechas */}
              {activeTab === "face" && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-black uppercase text-slate-500 mb-1">
                      Detalhes do Rosto & Sardas
                    </h4>
                    <p className="text-xs text-slate-500 font-medium mb-3">
                      Escolha se deseja uma pele 100% limpinha ou adicionar bochechas rosadinhas e sardinhas:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          playSound("click");
                          setCustomization((prev) => ({ ...prev, blushStyle: "none" }));
                        }}
                        className={`p-3.5 rounded-2xl border-2 flex flex-col items-center gap-2 cursor-pointer transition-all ${
                          (customization.blushStyle || "none") === "none"
                            ? "bg-pink-50 border-pink-500 text-pink-900 shadow-md ring-2 ring-pink-300 font-black"
                            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span className="text-2xl">✨</span>
                        <span className="text-xs font-black text-center">Pele Limpa</span>
                        <span className="text-[10px] text-slate-500 text-center font-normal">
                          Sem sardas nem marcas
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          playSound("click");
                          setCustomization((prev) => ({ ...prev, blushStyle: "soft" }));
                        }}
                        className={`p-3.5 rounded-2xl border-2 flex flex-col items-center gap-2 cursor-pointer transition-all ${
                          customization.blushStyle === "soft"
                            ? "bg-pink-50 border-pink-500 text-pink-900 shadow-md ring-2 ring-pink-300 font-black"
                            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span className="text-2xl">🌸</span>
                        <span className="text-xs font-black text-center">Bochechas Rosadinhas</span>
                        <span className="text-[10px] text-slate-500 text-center font-normal">
                          Brilho suave e fofinho
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          playSound("click");
                          setCustomization((prev) => ({ ...prev, blushStyle: "freckles" }));
                        }}
                        className={`p-3.5 rounded-2xl border-2 flex flex-col items-center gap-2 cursor-pointer transition-all ${
                          customization.blushStyle === "freckles"
                            ? "bg-pink-50 border-pink-500 text-pink-900 shadow-md ring-2 ring-pink-300 font-black"
                            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span className="text-2xl">🍓</span>
                        <span className="text-xs font-black text-center">Sardinhas Fofas</span>
                        <span className="text-[10px] text-slate-500 text-center font-normal">
                          Pequenas pintinhas
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Hair Style & Color */}
              {activeTab === "hair" && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-black uppercase text-slate-500 mb-2">
                      1. Penteado
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {HAIR_STYLES.map((style) => (
                        <button
                          key={style.id}
                          type="button"
                          onClick={() => {
                            playSound("click");
                            setCustomization((prev) => ({ ...prev, hairStyle: style.id }));
                          }}
                          className={`p-2.5 rounded-xl border-2 flex items-center gap-2 cursor-pointer transition-all ${
                            customization.hairStyle === style.id
                              ? "bg-pink-50 border-pink-500 text-pink-900 font-black shadow-sm"
                              : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <span className="text-lg">{style.icon}</span>
                          <span className="text-xs">{style.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-black uppercase text-slate-500 mb-2">
                      2. Cor do Cabelo
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {HAIR_COLORS.map((c) => (
                        <button
                          key={c.hex}
                          type="button"
                          onClick={() => {
                            playSound("click");
                            setCustomization((prev) => ({ ...prev, hairColor: c.hex }));
                          }}
                          className={`p-2 rounded-xl border-2 flex items-center gap-2 cursor-pointer transition-all ${
                            customization.hairColor === c.hex
                              ? "border-pink-500 bg-pink-50 ring-2 ring-pink-300"
                              : "border-slate-200 bg-white"
                          }`}
                        >
                          <div
                            className="w-5 h-5 rounded-full border border-slate-300 shadow-inner"
                            style={{ backgroundColor: c.hex }}
                          />
                          <span className="text-xs font-bold text-slate-800">{c.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: Eye Color */}
              {activeTab === "eyes" && (
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase text-slate-500">
                    Cor dos Olhos
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {EYE_COLORS.map((eye) => (
                      <button
                        key={eye.hex}
                        type="button"
                        onClick={() => {
                          playSound("click");
                          setCustomization((prev) => ({ ...prev, eyeColor: eye.hex }));
                        }}
                        className={`p-3 rounded-2xl border-2 flex items-center gap-3 cursor-pointer transition-all ${
                          customization.eyeColor === eye.hex
                            ? "bg-pink-50 border-pink-500 shadow-md ring-2 ring-pink-300"
                            : "bg-white border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        <div
                          className="w-6 h-6 rounded-full border-2 border-slate-300 shadow-inner"
                          style={{ backgroundColor: eye.hex }}
                        />
                        <span className="text-xs font-bold text-slate-800">{eye.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 5: Outfits in Inventory */}
              {activeTab === "outfits" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black uppercase text-slate-500">
                      Roupas no Guarda-Roupa
                    </h4>
                    {onOpenShop && (
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenShop();
                        }}
                        className="text-xs font-bold text-purple-600 hover:text-purple-800 flex items-center gap-1 cursor-pointer"
                      >
                        <span>Comprar Mais no Shopping 🛍️</span>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    {availableOutfits.map((outfitId) => {
                      const meta = OUTFITS_META[outfitId] || { name: outfitId, emoji: "👕" };
                      const isEquipped = customization.outfitId === outfitId;

                      return (
                        <button
                          key={outfitId}
                          type="button"
                          onClick={() => {
                            playSound("click");
                            setCustomization((prev) => ({ ...prev, outfitId }));
                          }}
                          className={`p-3 rounded-2xl border-2 flex items-center justify-between gap-2 cursor-pointer transition-all ${
                            isEquipped
                              ? "bg-pink-50 border-pink-500 text-pink-900 shadow-md ring-2 ring-pink-300 font-black"
                              : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{meta.emoji}</span>
                            <span className="text-xs text-left">{meta.name}</span>
                          </div>
                          {isEquipped && <Check className="w-4 h-4 text-pink-600 stroke-[3]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tab 6: Accessories in Inventory */}
              {activeTab === "accessories" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black uppercase text-slate-500">
                      Acessórios Disponíveis
                    </h4>
                    {onOpenShop && (
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenShop();
                        }}
                        className="text-xs font-bold text-purple-600 hover:text-purple-800 flex items-center gap-1 cursor-pointer"
                      >
                        <span>Ver Loja de Acessórios 🛍️</span>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    {["none", ...availableAccessories.filter((a) => a !== "none")].map((accId) => {
                      const meta = ACCESSORIES_META[accId] || { name: accId, emoji: "✨" };
                      const isEquipped = customization.accessoryId === accId;

                      return (
                        <button
                          key={accId}
                          type="button"
                          onClick={() => {
                            playSound("click");
                            setCustomization((prev) => ({ ...prev, accessoryId: accId }));
                          }}
                          className={`p-3 rounded-2xl border-2 flex items-center justify-between gap-2 cursor-pointer transition-all ${
                            isEquipped
                              ? "bg-purple-50 border-purple-500 text-purple-900 shadow-md ring-2 ring-purple-300 font-black"
                              : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{meta.emoji}</span>
                            <span className="text-xs text-left">{meta.name}</span>
                          </div>
                          {isEquipped && <Check className="w-4 h-4 text-purple-600 stroke-[3]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Footer with Save Action */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                Ficou maravilhoso!
              </span>

              <button
                type="button"
                onClick={handleSave}
                className="btn-game px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-md flex items-center gap-2 cursor-pointer transition-transform active:scale-95"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Salvar Visual no Jogo</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
