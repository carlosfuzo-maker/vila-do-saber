"use client";

import React, { useState } from "react";
import {
  PlayerCustomization,
  HairStyleId,
  WardrobeItem,
} from "../rpgTypes";
import { playSound } from "@/lib/soundEffects";
import {
  X,
  Sparkles,
  ShoppingBag,
  Check,
  Coins,
  Palette,
  Scissors,
  Smile,
  Shirt,
  Glasses,
  Award,
} from "lucide-react";

export const WARDROBE_CATALOG: WardrobeItem[] = [
  // Outfits
  {
    id: "firered_classic",
    category: "outfit",
    name: "Jaqueta FireRed Clássica",
    description: "O traje icônico dos campeões de Kanto!",
    emoji: "🎒",
    price: 0,
    unlockedByDefault: true,
  },
  {
    id: "floral_dress",
    category: "outfit",
    name: "Vestido Floral da Primavera",
    description: "Leve e colorido com estampas de flores campestres.",
    emoji: "👗",
    price: 45,
  },
  {
    id: "pikachu_hoodie",
    category: "outfit",
    name: "Moletom Pikachu Quentinho",
    description: "Com orelhinhas elétricas e cauda de raio nas costas!",
    emoji: "⚡",
    price: 80,
  },
  {
    id: "school_uniform",
    category: "outfit",
    name: "Uniforme da Vila do Saber",
    description: "O elegante terno escolar da academia.",
    emoji: "🏫",
    price: 35,
  },
  {
    id: "swimmer_gear",
    category: "outfit",
    name: "Traje Náutico de Natação",
    description: "Roupa aquática aerodinâmica para quem adora nadar!",
    emoji: "🏊",
    price: 60,
  },

  // Hats
  {
    id: "red_cap",
    category: "hat",
    name: "Boné Vermelho Clássico",
    description: "O clássico boné de treinador de Pokémon.",
    emoji: "🧢",
    price: 0,
    unlockedByDefault: true,
  },
  {
    id: "pink_bow",
    category: "hat",
    name: "Laço de Fita Delicado",
    description: "Um charmoso laço rosa pastel para os cabelos.",
    emoji: "🎀",
    price: 25,
  },
  {
    id: "trainer_band",
    category: "hat",
    name: "Faixa de Treinadora Ninja",
    description: "Para manter o foco total durante os estudos!",
    emoji: "🥋",
    price: 35,
  },
  {
    id: "straw_hat",
    category: "hat",
    name: "Chapéu de Palha de Verão",
    description: "Protege do sol forte na beira dos rios e praias.",
    emoji: "👒",
    price: 40,
  },

  // Accessories
  {
    id: "explorer_backpack",
    category: "accessory",
    name: "Mochila de Explorador",
    description: "Espaçosa para carregar cadernos, livros e Pokébolas.",
    emoji: "🎒",
    price: 0,
    unlockedByDefault: true,
  },
  {
    id: "stylish_glasses",
    category: "accessory",
    name: "Óculos de Cientista Mirim",
    description: "Dá um ar inteligente e aumenta o foco na leitura.",
    emoji: "👓",
    price: 30,
  },
  {
    id: "headphones",
    category: "accessory",
    name: "Fones de Ouvido Gamer",
    description: "Para ouvir as melhores músicas de 8-bits e 16-bits!",
    emoji: "🎧",
    price: 50,
  },
  {
    id: "butterfly_wings",
    category: "accessory",
    name: "Asas Mágicas de Butterfree",
    description: "Brilham suavemente ao andar pelo mapa.",
    emoji: "🦋",
    price: 70,
  },
];

interface CharacterCustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  customization: PlayerCustomization;
  onSaveCustomization: (updated: PlayerCustomization) => void;
  coins: number;
  onSpendCoins: (amount: number) => boolean;
  unlockedItemIds: string[];
  onUnlockItem: (itemId: string) => void;
  studentName: string;
}

export const CharacterCustomizationModal: React.FC<
  CharacterCustomizationModalProps
> = ({
  isOpen,
  onClose,
  customization,
  onSaveCustomization,
  coins,
  onSpendCoins,
  unlockedItemIds,
  onUnlockItem,
  studentName,
}) => {
  const [activeTab, setActiveTab] = useState<
    "hair" | "face" | "outfits" | "hats" | "accessories"
  >("hair");

  // Local draft state for real-time preview
  const [draft, setDraft] = useState<PlayerCustomization>(customization);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const hairColors = [
    { name: "Castanho", hex: "#4a2e18" },
    { name: "Loiro Ouro", hex: "#eab308" },
    { name: "Preto", hex: "#1e293b" },
    { name: "Ruivo Fogo", hex: "#ea580c" },
    { name: "Rosa Doce", hex: "#f43f5e" },
    { name: "Azul Céu", hex: "#0284c7" },
    { name: "Roxo Místico", hex: "#9333ea" },
  ];

  const skinTones = [
    { name: "Pele Clara", hex: "#fde047" },
    { name: "Pele Morena Clara", hex: "#fed7aa" },
    { name: "Pele Dourada / Bronze", hex: "#f59e0b" },
    { name: "Pele Negra", hex: "#78350f" },
  ];

  const eyeColors = [
    { name: "Castanhos", hex: "#451a03" },
    { name: "Azuis", hex: "#0284c7" },
    { name: "Verdes", hex: "#16a34a" },
    { name: "Âmbar", hex: "#d97706" },
    { name: "Violeta", hex: "#7c3aed" },
  ];

  const hairStyles: { id: HairStyleId; name: string; emoji: string }[] = [
    { id: "straight", name: "Liso Longo", emoji: "💁‍♀️" },
    { id: "ponytail", name: "Rabo de Cavalo", emoji: "👱‍♀️" },
    { id: "braids", name: "Tranças Duplas", emoji: "👧" },
    { id: "bob_bangs", name: "Curto com Franja", emoji: "💇‍♀️" },
    { id: "double_buns", name: "Coque Duplo", emoji: "👸" },
  ];

  const handleBuyOrEquip = (item: WardrobeItem) => {
    const isUnlocked =
      item.unlockedByDefault || unlockedItemIds.includes(item.id);

    if (isUnlocked) {
      // Equip directly
      if (item.category === "outfit") {
        setDraft({ ...draft, outfitId: item.id });
      } else if (item.category === "hat") {
        setDraft({
          ...draft,
          hatId: draft.hatId === item.id ? null : item.id,
        });
      } else if (item.category === "accessory") {
        setDraft({
          ...draft,
          accessoryId: draft.accessoryId === item.id ? null : item.id,
        });
      }
      try {
        playSound("pop");
      } catch {}
      setFeedbackMsg(`Equipado: ${item.name}!`);
      setTimeout(() => setFeedbackMsg(null), 2500);
    } else {
      // Need to purchase
      if (coins < item.price) {
        setFeedbackMsg("Moedas insuficientes! Resolva tarefas para ganhar.");
        try {
          playSound("pop");
        } catch {}
        setTimeout(() => setFeedbackMsg(null), 3000);
        return;
      }

      const success = onSpendCoins(item.price);
      if (success) {
        onUnlockItem(item.id);
        if (item.category === "outfit") {
          setDraft({ ...draft, outfitId: item.id });
        } else if (item.category === "hat") {
          setDraft({ ...draft, hatId: item.id });
        } else if (item.category === "accessory") {
          setDraft({ ...draft, accessoryId: item.id });
        }
        try {
          playSound("fanfare");
        } catch {}
        setFeedbackMsg(`Comprou e equipou: ${item.name}! 🎉`);
        setTimeout(() => setFeedbackMsg(null), 3000);
      }
    }
  };

  const handleSaveAndClose = () => {
    onSaveCustomization(draft);
    try {
      playSound("success");
    } catch {}
    onClose();
  };

  const currentOutfit = WARDROBE_CATALOG.find((i) => i.id === draft.outfitId);
  const currentHat = WARDROBE_CATALOG.find((i) => i.id === draft.hatId);
  const currentAcc = WARDROBE_CATALOG.find((i) => i.id === draft.accessoryId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in select-none">
      <div className="relative w-full max-w-3xl bg-slate-900 border-4 border-indigo-600 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-slate-100 max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 p-4 border-b-2 border-indigo-400 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-2xl shadow-md">
              ✨
            </div>
            <div>
              <h2 className="text-base font-black text-white flex items-center gap-2">
                Boutique & Guarda-Roupa de {studentName}
              </h2>
              <p className="text-xs text-indigo-100 font-semibold">
                Personalize cabelo, rosto, roupas e acessórios
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Coins display */}
            <div className="flex items-center gap-1.5 bg-amber-500/20 border border-amber-400/50 px-3 py-1 rounded-xl text-amber-300 font-black text-xs">
              <Coins className="w-4 h-4 text-amber-400" />
              <span>{coins} moedas</span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 bg-white/10 hover:bg-white/20 rounded-xl transition cursor-pointer text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Feedback message banner */}
        {feedbackMsg && (
          <div className="bg-emerald-600 text-white text-xs font-black px-4 py-1.5 text-center animate-in fade-in slide-in-from-top-1">
            {feedbackMsg}
          </div>
        )}

        {/* Main Body */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 p-4 overflow-hidden">
          {/* Left: Avatar Dressing Room / Mirror Preview */}
          <div className="md:col-span-5 bg-slate-950 border-2 border-indigo-900/60 rounded-2xl p-4 flex flex-col items-center justify-between shadow-inner">
            <span className="text-[11px] font-black uppercase tracking-wider text-indigo-300 mb-2">
              🪞 Espelho do Provador
            </span>

            {/* Stylized Avatar Figure Box */}
            <div className="relative w-44 h-56 bg-gradient-to-b from-indigo-950/60 to-purple-950/60 border-2 border-indigo-500/40 rounded-2xl flex flex-col items-center justify-center shadow-lg p-3">
              {/* Floating sparkles background */}
              <div className="absolute top-2 right-2 text-amber-300 animate-pulse text-sm">
                ✦
              </div>
              <div className="absolute bottom-2 left-2 text-pink-400 animate-pulse text-xs">
                ★
              </div>

              {/* Head & Hair Composition */}
              <div className="relative mb-2 flex flex-col items-center">
                {/* Hair back / buns */}
                {draft.hairStyle === "double_buns" && (
                  <div className="absolute -top-3 flex justify-between w-24 px-1 z-0">
                    <div
                      className="w-6 h-6 rounded-full shadow-md"
                      style={{ backgroundColor: draft.hairColor }}
                    />
                    <div
                      className="w-6 h-6 rounded-full shadow-md"
                      style={{ backgroundColor: draft.hairColor }}
                    />
                  </div>
                )}
                {draft.hairStyle === "ponytail" && (
                  <div
                    className="absolute -top-3 -right-3 w-8 h-10 rounded-full shadow-md transform rotate-12 z-0"
                    style={{ backgroundColor: draft.hairColor }}
                  />
                )}

                {/* Hat if equipped */}
                {currentHat && (
                  <div className="absolute -top-5 z-20 text-2xl animate-bounce">
                    {currentHat.emoji}
                  </div>
                )}

                {/* Hair Top / Bangs */}
                <div
                  className="w-20 h-10 rounded-t-full shadow-md relative z-10"
                  style={{ backgroundColor: draft.hairColor }}
                />

                {/* Face */}
                <div
                  className="w-16 h-14 rounded-b-3xl relative z-10 flex flex-col items-center justify-center shadow-sm"
                  style={{ backgroundColor: draft.skinTone }}
                >
                  {/* Eyes with chosen eye color */}
                  <div className="flex items-center justify-between w-10 px-1 mb-1">
                    <div
                      className="w-2.5 h-2.5 rounded-full border border-black/40 shadow-inner flex items-center justify-center"
                      style={{ backgroundColor: draft.eyeColor }}
                    >
                      <div className="w-1 h-1 rounded-full bg-white ml-0.5 -mt-0.5" />
                    </div>
                    <div
                      className="w-2.5 h-2.5 rounded-full border border-black/40 shadow-inner flex items-center justify-center"
                      style={{ backgroundColor: draft.eyeColor }}
                    >
                      <div className="w-1 h-1 rounded-full bg-white ml-0.5 -mt-0.5" />
                    </div>
                  </div>

                  {/* Blush & Smile */}
                  <div className="flex items-center justify-between w-12 px-1">
                    <div className="w-2 h-1 bg-rose-400/50 rounded-full" />
                    <div className="text-[10px] text-rose-950 font-bold">‿</div>
                    <div className="w-2 h-1 bg-rose-400/50 rounded-full" />
                  </div>

                  {/* Glasses accessory if equipped */}
                  {draft.accessoryId === "stylish_glasses" && (
                    <div className="absolute top-2 w-12 text-center text-xs font-black text-slate-800">
                      👓
                    </div>
                  )}
                </div>

                {/* Hair Braids hanging down */}
                {draft.hairStyle === "braids" && (
                  <div className="absolute top-8 flex justify-between w-22 px-1 z-0">
                    <div
                      className="w-3 h-14 rounded-full shadow-sm"
                      style={{ backgroundColor: draft.hairColor }}
                    />
                    <div
                      className="w-3 h-14 rounded-full shadow-sm"
                      style={{ backgroundColor: draft.hairColor }}
                    />
                  </div>
                )}
              </div>

              {/* Body & Clothes */}
              <div className="relative flex flex-col items-center">
                {/* Outfit icon / indicator */}
                <div className="w-14 h-12 bg-indigo-600 rounded-t-xl border border-white/20 flex items-center justify-center text-xl shadow-md">
                  {currentOutfit?.emoji || "👕"}
                </div>
                {/* Legs */}
                <div className="flex gap-2">
                  <div className="w-3.5 h-6 bg-slate-800 rounded-b-md" />
                  <div className="w-3.5 h-6 bg-slate-800 rounded-b-md" />
                </div>

                {/* Backpack or Wings if equipped */}
                {draft.accessoryId === "explorer_backpack" && (
                  <div className="absolute -left-4 top-1 text-sm">🎒</div>
                )}
                {draft.accessoryId === "butterfly_wings" && (
                  <div className="absolute -top-3 text-lg animate-pulse">🦋</div>
                )}
                {draft.accessoryId === "headphones" && (
                  <div className="absolute -top-12 text-lg">🎧</div>
                )}
              </div>
            </div>

            {/* Current Summary */}
            <div className="w-full mt-3 bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-300">
              <div className="flex justify-between items-center mb-1">
                <span className="text-slate-400 text-[10px]">Traje:</span>
                <span className="font-bold text-white text-[11px]">
                  {currentOutfit?.name}
                </span>
              </div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-slate-400 text-[10px]">Chapéu:</span>
                <span className="font-bold text-amber-300 text-[11px]">
                  {currentHat?.name || "Nenhum"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-[10px]">Acessório:</span>
                <span className="font-bold text-pink-300 text-[11px]">
                  {currentAcc?.name || "Nenhum"}
                </span>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSaveAndClose}
              className="w-full mt-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black py-2.5 rounded-xl shadow-lg cursor-pointer transition active:scale-95 flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
            >
              <Check className="w-4 h-4" />
              <span>Salvar Novo Visual</span>
            </button>
          </div>

          {/* Right: Customization Controls & Boutique Store */}
          <div className="md:col-span-7 bg-slate-950 border-2 border-indigo-900/60 rounded-2xl p-3 flex flex-col shadow-inner overflow-hidden">
            {/* Tabs */}
            <div className="flex items-center gap-1 border-b border-slate-800 pb-2 mb-3 overflow-x-auto text-xs font-black">
              <button
                onClick={() => setActiveTab("hair")}
                className={`px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "hair"
                    ? "bg-indigo-600 text-white shadow"
                    : "bg-slate-900 text-slate-400 hover:text-white"
                }`}
              >
                <Scissors className="w-3.5 h-3.5" />
                <span>Cabelos</span>
              </button>
              <button
                onClick={() => setActiveTab("face")}
                className={`px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "face"
                    ? "bg-indigo-600 text-white shadow"
                    : "bg-slate-900 text-slate-400 hover:text-white"
                }`}
              >
                <Smile className="w-3.5 h-3.5" />
                <span>Rosto & Pele</span>
              </button>
              <button
                onClick={() => setActiveTab("outfits")}
                className={`px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "outfits"
                    ? "bg-indigo-600 text-white shadow"
                    : "bg-slate-900 text-slate-400 hover:text-white"
                }`}
              >
                <Shirt className="w-3.5 h-3.5" />
                <span>Roupas</span>
              </button>
              <button
                onClick={() => setActiveTab("hats")}
                className={`px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "hats"
                    ? "bg-indigo-600 text-white shadow"
                    : "bg-slate-900 text-slate-400 hover:text-white"
                }`}
              >
                <span>🧢</span>
                <span>Bonés</span>
              </button>
              <button
                onClick={() => setActiveTab("accessories")}
                className={`px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "accessories"
                    ? "bg-indigo-600 text-white shadow"
                    : "bg-slate-900 text-slate-400 hover:text-white"
                }`}
              >
                <Glasses className="w-3.5 h-3.5" />
                <span>Acessórios</span>
              </button>
            </div>

            {/* Tab 1: Hair Styles & Colors */}
            {activeTab === "hair" && (
              <div className="flex-1 overflow-y-auto pr-1 space-y-4">
                <div>
                  <h4 className="text-xs font-black uppercase text-indigo-300 mb-2">
                    Estilo de Penteado
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {hairStyles.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => {
                          setDraft({ ...draft, hairStyle: style.id });
                          try {
                            playSound("pop");
                          } catch {}
                        }}
                        className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition cursor-pointer ${
                          draft.hairStyle === style.id
                            ? "bg-indigo-600/30 border-indigo-400 ring-2 ring-indigo-400/50"
                            : "bg-slate-900 border-slate-800 hover:bg-slate-850"
                        }`}
                      >
                        <span className="text-2xl">{style.emoji}</span>
                        <span className="text-xs font-bold text-white">
                          {style.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-black uppercase text-indigo-300 mb-2">
                    Cor dos Cabelos
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {hairColors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => {
                          setDraft({ ...draft, hairColor: color.hex });
                          try {
                            playSound("pop");
                          } catch {}
                        }}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition cursor-pointer ${
                          draft.hairColor === color.hex
                            ? "border-white bg-slate-800 ring-2 ring-indigo-400"
                            : "border-slate-800 bg-slate-900 hover:bg-slate-800"
                        }`}
                      >
                        <div
                          className="w-4 h-4 rounded-full border border-white/50 shadow-sm"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="text-xs font-bold text-slate-200">
                          {color.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Face & Skin */}
            {activeTab === "face" && (
              <div className="flex-1 overflow-y-auto pr-1 space-y-4">
                <div>
                  <h4 className="text-xs font-black uppercase text-indigo-300 mb-2">
                    Tom da Pele
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {skinTones.map((skin) => (
                      <button
                        key={skin.name}
                        onClick={() => {
                          setDraft({ ...draft, skinTone: skin.hex });
                          try {
                            playSound("pop");
                          } catch {}
                        }}
                        className={`p-2.5 rounded-xl border flex items-center gap-2.5 transition cursor-pointer ${
                          draft.skinTone === skin.hex
                            ? "bg-indigo-600/30 border-indigo-400 ring-2 ring-indigo-400/50"
                            : "bg-slate-900 border-slate-800 hover:bg-slate-800"
                        }`}
                      >
                        <div
                          className="w-6 h-6 rounded-full border border-white/50 shadow-md"
                          style={{ backgroundColor: skin.hex }}
                        />
                        <span className="text-xs font-bold text-white">
                          {skin.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-black uppercase text-indigo-300 mb-2">
                    Cor dos Olhos
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {eyeColors.map((eye) => (
                      <button
                        key={eye.name}
                        onClick={() => {
                          setDraft({ ...draft, eyeColor: eye.hex });
                          try {
                            playSound("pop");
                          } catch {}
                        }}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition cursor-pointer ${
                          draft.eyeColor === eye.hex
                            ? "border-white bg-slate-800 ring-2 ring-indigo-400"
                            : "border-slate-800 bg-slate-900 hover:bg-slate-800"
                        }`}
                      >
                        <div
                          className="w-4 h-4 rounded-full border border-white/50 shadow-sm"
                          style={{ backgroundColor: eye.hex }}
                        />
                        <span className="text-xs font-bold text-slate-200">
                          {eye.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3, 4, 5: Wardrobe Items (Outfits, Hats, Accessories) */}
            {(activeTab === "outfits" ||
              activeTab === "hats" ||
              activeTab === "accessories") && (
              <div className="flex-1 overflow-y-auto pr-1 space-y-2 max-h-[50vh]">
                {WARDROBE_CATALOG.filter(
                  (item) =>
                    (activeTab === "outfits" && item.category === "outfit") ||
                    (activeTab === "hats" && item.category === "hat") ||
                    (activeTab === "accessories" &&
                      item.category === "accessory")
                ).map((item) => {
                  const isUnlocked =
                    item.unlockedByDefault || unlockedItemIds.includes(item.id);
                  const isEquipped =
                    draft.outfitId === item.id ||
                    draft.hatId === item.id ||
                    draft.accessoryId === item.id;

                  return (
                    <div
                      key={item.id}
                      className={`p-3 rounded-2xl border flex items-center justify-between gap-3 transition ${
                        isEquipped
                          ? "bg-indigo-950/70 border-indigo-400 ring-1 ring-indigo-400/50"
                          : "bg-slate-900 border-slate-800"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-2xl shadow-inner">
                          {item.emoji}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="text-xs font-black text-white">
                              {item.name}
                            </h5>
                            {isEquipped && (
                              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 text-[10px] font-black px-1.5 py-0.2 rounded">
                                Equipado
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <div>
                        {isUnlocked ? (
                          <button
                            onClick={() => handleBuyOrEquip(item)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                              isEquipped
                                ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                                : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md active:scale-95"
                            }`}
                          >
                            {isEquipped ? "Desequipar" : "Equipar"}
                          </button>
                        ) : (
                          <button
                            onClick={() => handleBuyOrEquip(item)}
                            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-slate-950 px-3 py-1.5 rounded-xl text-xs font-black shadow-md cursor-pointer active:scale-95 transition"
                          >
                            <Coins className="w-3.5 h-3.5" />
                            <span>Comprar {item.price}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
