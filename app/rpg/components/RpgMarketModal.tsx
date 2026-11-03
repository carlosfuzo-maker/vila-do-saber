"use client";

import React, { useState } from "react";
import { RpgInventory } from "../rpgTypes";
import { playSound } from "@/lib/soundEffects";
import {
  X,
  ShoppingBag,
  Coins,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Plus,
} from "lucide-react";

interface RpgMarketModalProps {
  isOpen: boolean;
  onClose: () => void;
  coins: number;
  inventory: RpgInventory;
  onBuyItem: (item: keyof RpgInventory, cost: number, quantity?: number) => void;
}

export function RpgMarketModal({
  isOpen,
  onClose,
  coins,
  inventory,
  onBuyItem,
}: RpgMarketModalProps) {
  const [activeCategory, setActiveCategory] = useState<"supplies" | "stones">("supplies");
  const [feedback, setFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const suppliesList: Array<{
    key: keyof RpgInventory;
    name: string;
    emoji: string;
    image?: string;
    price: number;
    description: string;
    benefit: string;
  }> = [
    {
      key: "pokeballs",
      name: "Pokébola Tradicional",
      emoji: "🔴",
      image: "/assets/rpg/items/poke-ball.png",
      price: 10,
      description: "Dispositivo esférico para capturar Pokémon na grama alta.",
      benefit: "Permite fazer novas amizades na natureza",
    },
    {
      key: "potions",
      name: "Poção do Cuidado",
      emoji: "🧪",
      image: "/assets/rpg/items/potion.png",
      price: 8,
      description: "Medicina líquida que restaura 100% da energia e cura o cansaço.",
      benefit: "Renova o vigor dos seus companheiros",
    },
    {
      key: "antidotes",
      name: "Antídoto Eficaz",
      emoji: "💊",
      image: "/assets/rpg/items/antidote.png",
      price: 8,
      description: "Cura indisposição, picadas de insetos e envenenamento.",
      benefit: "Mantém a saúde do seu Pokémon perfeita",
    },
    {
      key: "berries",
      name: "Fruta Baga Suave",
      emoji: "🍓",
      price: 5,
      description: "Frutinha doce que acalma o Pokémon selvagem durante o encontro.",
      benefit: "Garante 100% de chance na captura!",
    },
  ];

  const stonesList: Array<{
    key: keyof RpgInventory;
    name: string;
    emoji: string;
    image?: string;
    price: number;
    description: string;
    benefit: string;
  }> = [
    {
      key: "thunderStones",
      name: "Pedra do Trovão",
      emoji: "⚡",
      price: 30,
      description: "Mineral energizado com pura eletricidade estática reluzente.",
      benefit: "Evolui Pikachu para Raichu e Eevee para Jolteon!",
    },
    {
      key: "waterStones",
      name: "Pedra da Água",
      emoji: "💧",
      price: 30,
      description: "Cristal azul límpido que evoca a pureza dos rios e oceanos.",
      benefit: "Evolui Poliwhirl, Shellder, Staryu e Eevee (Vaporeon)!",
    },
    {
      key: "fireStones",
      name: "Pedra do Fogo",
      emoji: "🔥",
      price: 30,
      description: "Rocha ígnea aquecida que pulsa como brasas douradas.",
      benefit: "Evolui Vulpix, Growlithe e Eevee (Flareon)!",
    },
    {
      key: "leafStones",
      name: "Pedra da Folha",
      emoji: "🍃",
      price: 30,
      description: "Gema verde com desenho de folha que ressoa com a natureza.",
      benefit: "Evolui Gloom, Weepinbell e Exeggcute!",
    },
    {
      key: "moonStones",
      name: "Pedra da Lua",
      emoji: "🌙",
      price: 30,
      description: "Fragmento lunar misterioso que brilha nas noites estreladas.",
      benefit: "Evolui Nidorina, Nidorino, Clefairy e Jigglypuff!",
    },
  ];

  const handlePurchase = (itemKey: keyof RpgInventory, price: number, name: string) => {
    if (coins < price) {
      playSound("pop");
      setFeedback(`Você precisa de ${price} moedas! Resolva mais missões escolares para ganhar!`);
      setTimeout(() => setFeedback(null), 3000);
      return;
    }

    playSound("star");
    onBuyItem(itemKey, price, 1);
    setFeedback(`Comprou 1x ${name} com sucesso! (-${price} Moedas 🪙)`);
    setTimeout(() => setFeedback(null), 2500);
  };

  const displayedList = activeCategory === "supplies" ? suppliesList : stonesList;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-fadeIn select-none touch-manipulation">
      <div className="relative w-full max-w-xl bg-slate-900 rounded-[32px] overflow-hidden border-4 border-blue-400 shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header Market */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-blue-900 via-sky-900 to-blue-950 text-white flex items-center justify-between border-b border-blue-400/30">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-2xl shadow">
              🏪
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black tracking-wide flex items-center gap-2">
                <span>PokéMarket da Vila do Saber</span>
              </h3>
              <p className="text-[11px] text-sky-200">
                Seu Saldo: <strong className="text-amber-300 font-extrabold">{coins} Moedas 🪙</strong>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Categories Tab */}
        <div className="px-4 py-2 bg-slate-950 flex gap-2 border-b border-slate-800">
          <button
            type="button"
            onClick={() => {
              playSound("click");
              setActiveCategory("supplies");
            }}
            className={`flex-1 py-1.5 rounded-xl text-xs font-black transition cursor-pointer flex items-center justify-center gap-1.5 ${
              activeCategory === "supplies"
                ? "bg-blue-600 text-white shadow"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            <span>🎒 Suprimentos de Treinador</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playSound("click");
              setActiveCategory("stones");
            }}
            className={`flex-1 py-1.5 rounded-xl text-xs font-black transition cursor-pointer flex items-center justify-center gap-1.5 ${
              activeCategory === "stones"
                ? "bg-amber-600 text-white shadow"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            <span>💎 Pedras de Evolução</span>
          </button>
        </div>

        {/* Feedback alert */}
        {feedback && (
          <div className="bg-amber-500/20 border-b border-amber-500/40 text-amber-200 px-4 py-2 text-xs font-bold flex items-center justify-center gap-2 animate-fadeIn">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{feedback}</span>
          </div>
        )}

        {/* Items Grid */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {displayedList.map((item) => {
            const currentStock = inventory[item.key] || 0;
            const canAfford = coins >= item.price;

            return (
              <div
                key={item.key}
                className="p-3.5 bg-slate-800/90 rounded-2xl border-2 border-slate-700 hover:border-sky-400/60 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center p-2 border border-white/20 shrink-0">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-8 h-8 object-contain" />
                    ) : (
                      <span className="text-3xl">{item.emoji}</span>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-black text-white">{item.name}</h4>
                      <span className="text-[10px] bg-slate-900 text-slate-300 px-2 py-0.5 rounded-md font-bold">
                        Bolsa: {currentStock} un
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-snug mt-0.5">{item.description}</p>
                    <p className="text-[10px] text-sky-400 font-extrabold mt-0.5">✨ {item.benefit}</p>
                  </div>
                </div>

                <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-700/60">
                  <div className="text-right">
                    <span className="text-sm font-black text-amber-400 flex items-center gap-1">
                      <span>{item.price}</span>
                      <span className="text-xs">🪙</span>
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handlePurchase(item.key, item.price, item.name)}
                    disabled={!canAfford}
                    className={`btn-game px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 shadow transition cursor-pointer ${
                      canAfford
                        ? "bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black shadow-md shadow-emerald-500/20"
                        : "bg-slate-700 text-slate-400 cursor-not-allowed opacity-50"
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                    <span>Comprar</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
