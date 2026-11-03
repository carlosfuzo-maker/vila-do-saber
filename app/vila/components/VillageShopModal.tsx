"use client";

import React, { useState } from "react";
import { ShopItem, StudentProfile } from "../types";
import { SHOP_ITEMS } from "../data";
import {
  X,
  Coins,
  Sparkles,
  ShoppingBag,
  Check,
  Shirt,
  Bed,
  Heart,
  Smile,
  ArrowRight,
  Trophy,
} from "lucide-react";
import confetti from "canvas-confetti";
import { playSound } from "@/lib/soundEffects";

interface VillageShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: StudentProfile;
  onBuyItem: (item: ShopItem) => void;
  onEquipItem?: (item: ShopItem) => void;
}

export function VillageShopModal({
  isOpen,
  onClose,
  currentProfile,
  onBuyItem,
  onEquipItem,
}: VillageShopModalProps) {
  const [activeCategory, setActiveCategory] = useState<
    "outfit" | "furniture" | "pet" | "accessory"
  >("outfit");

  const [purchasedToast, setPurchasedToast] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentCoins = currentProfile.coins;
  const inventory = currentProfile.inventory || {
    outfits: ["starter"],
    furniture: ["bed_basic"],
    pets: [],
    accessories: [],
  };

  const isItemOwned = (item: ShopItem): boolean => {
    switch (item.category) {
      case "outfit":
        return inventory.outfits?.includes(item.id) ?? false;
      case "furniture":
        return inventory.furniture?.includes(item.id) ?? false;
      case "pet":
        return inventory.pets?.includes(item.id) ?? false;
      case "accessory":
        return inventory.accessories?.includes(item.id) ?? false;
      default:
        return false;
    }
  };

  const handlePurchase = (item: ShopItem) => {
    if (currentCoins < item.price) {
      playSound("pop");
      return;
    }

    playSound("fanfare");
    onBuyItem(item);

    setPurchasedToast(`Parabéns! Você adquiriu: ${item.name}!`);
    setTimeout(() => setPurchasedToast(null), 2500);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }
  };

  const filteredItems = SHOP_ITEMS.filter((i) => i.category === activeCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-4 border-amber-300 overflow-hidden flex flex-col max-h-[94vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-4 sm:p-5 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-2xl backdrop-blur-md">
              <ShoppingBag className="w-6 h-6 text-yellow-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-amber-900/40 text-yellow-200 px-2 py-0.2 rounded-full">
                  Shopping & Pet Shop da Vila
                </span>
                <Sparkles className="w-3.5 h-3.5 text-yellow-200 animate-spin" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-wide text-white">
                Boutique Encantada
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Coins Balance Indicator */}
            <div className="flex items-center gap-1.5 bg-amber-950/40 px-3.5 py-1.5 rounded-2xl border border-amber-300/40 shadow-inner">
              <Coins className="w-5 h-5 text-yellow-300 fill-yellow-400" />
              <span className="font-black text-sm text-yellow-200">
                {currentCoins}
              </span>
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
        </div>

        {/* Categories Bar */}
        <div className="grid grid-cols-4 p-2 bg-amber-50 border-b border-amber-100 gap-1.5">
          <button
            type="button"
            onClick={() => {
              playSound("click");
              setActiveCategory("outfit");
            }}
            className={`py-2 px-1 rounded-xl text-xs font-black transition-all flex flex-col sm:flex-row items-center justify-center gap-1 cursor-pointer ${
              activeCategory === "outfit"
                ? "bg-amber-500 text-white shadow-md shadow-amber-500/30"
                : "bg-white text-slate-700 hover:bg-amber-100/60"
            }`}
          >
            <span>👗</span>
            <span>Roupas</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playSound("click");
              setActiveCategory("furniture");
            }}
            className={`py-2 px-1 rounded-xl text-xs font-black transition-all flex flex-col sm:flex-row items-center justify-center gap-1 cursor-pointer ${
              activeCategory === "furniture"
                ? "bg-amber-500 text-white shadow-md shadow-amber-500/30"
                : "bg-white text-slate-700 hover:bg-amber-100/60"
            }`}
          >
            <span>🪑</span>
            <span>Móveis da Casa</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playSound("click");
              setActiveCategory("pet");
            }}
            className={`py-2 px-1 rounded-xl text-xs font-black transition-all flex flex-col sm:flex-row items-center justify-center gap-1 cursor-pointer ${
              activeCategory === "pet"
                ? "bg-amber-500 text-white shadow-md shadow-amber-500/30"
                : "bg-white text-slate-700 hover:bg-amber-100/60"
            }`}
          >
            <span>🐾</span>
            <span>Mascotes (Pets)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playSound("click");
              setActiveCategory("accessory");
            }}
            className={`py-2 px-1 rounded-xl text-xs font-black transition-all flex flex-col sm:flex-row items-center justify-center gap-1 cursor-pointer ${
              activeCategory === "accessory"
                ? "bg-amber-500 text-white shadow-md shadow-amber-500/30"
                : "bg-white text-slate-700 hover:bg-amber-100/60"
            }`}
          >
            <span>🎀</span>
            <span>Acessórios</span>
          </button>
        </div>

        {/* Items Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {purchasedToast && (
            <div className="p-3 bg-emerald-500 text-white font-black text-xs sm:text-sm rounded-2xl shadow-lg flex items-center justify-center gap-2 animate-bounce">
              <Check className="w-5 h-5 stroke-[3]" />
              <span>{purchasedToast}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {filteredItems.map((item) => {
              const owned = isItemOwned(item);
              const canAfford = currentCoins >= item.price;

              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-3xl border-2 transition-all flex flex-col justify-between gap-3 ${
                    owned
                      ? "bg-slate-50 border-slate-200"
                      : "bg-white border-amber-200 hover:border-amber-400 shadow-sm"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 border border-amber-300 flex items-center justify-center text-3xl shrink-0 shadow-inner">
                      {item.emoji}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className="text-sm font-black text-slate-900 leading-tight">
                          {item.name}
                        </h4>
                        {owned && (
                          <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.2 rounded-full">
                            Adquirido ✓
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Price & Action Button */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1 text-xs font-black text-amber-900">
                      <Coins className="w-4 h-4 text-amber-500 fill-amber-400" />
                      <span>{item.price === 0 ? "Grátis" : `${item.price} Moedas`}</span>
                    </div>

                    {owned ? (
                      <button
                        type="button"
                        onClick={() => onEquipItem?.(item)}
                        className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black rounded-xl cursor-pointer"
                      >
                        {item.category === "furniture" ? "Na Casinha ✓" : "Equipar"}
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled={!canAfford}
                        onClick={() => handlePurchase(item)}
                        className={`btn-game px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all ${
                          canAfford
                            ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md cursor-pointer active:scale-95"
                            : "bg-slate-200 text-slate-400 cursor-not-allowed"
                        }`}
                      >
                        {canAfford ? (
                          <>
                            <span>Comprar</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        ) : (
                          <span>Faltam {item.price - currentCoins} 🪙</span>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-600" />
            <span>Faça missões nos edifícios escolares para ganhar mais moedas!</span>
          </div>

          <button
            type="button"
            onClick={() => {
              playSound("click");
              onClose();
            }}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl cursor-pointer"
          >
            Voltar à Vila
          </button>
        </div>
      </div>
    </div>
  );
}
