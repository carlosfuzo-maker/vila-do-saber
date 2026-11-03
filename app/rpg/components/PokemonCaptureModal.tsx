"use client";

import React, { useState } from "react";
import { WildPokemonDef, CapturedPokemon, RpgInventory } from "../rpgTypes";
import { playSound } from "@/lib/soundEffects";
import confetti from "canvas-confetti";
import {
  Sparkles,
  Heart,
  X,
  ShoppingBag,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  RefreshCw,
} from "lucide-react";

interface PokemonCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  wildPokemon: WildPokemonDef;
  inventory: RpgInventory;
  onConsumeItem: (item: keyof RpgInventory) => void;
  onCaptureSuccess: (pokemon: CapturedPokemon) => void;
  onOpenMarket: () => void;
}

export function PokemonCaptureModal({
  isOpen,
  onClose,
  wildPokemon,
  inventory,
  onConsumeItem,
  onCaptureSuccess,
  onOpenMarket,
}: PokemonCaptureModalProps) {
  const [phase, setPhase] = useState<"encounter" | "throwing" | "wobble" | "caught" | "escaped">("encounter");
  const [wobbleCount, setWobbleCount] = useState<number>(0);
  const isCave =
    wildPokemon.habitat.toLowerCase().includes("caverna") ||
    wildPokemon.habitat.toLowerCase().includes("subterrâneo") ||
    wildPokemon.habitat.toLowerCase().includes("monte") ||
    wildPokemon.habitat.toLowerCase().includes("fóssil") ||
    wildPokemon.habitat.toLowerCase().includes("rochos") ||
    [
      "omanyte",
      "omastar",
      "kabuto",
      "kabutops",
      "aerodactyl",
      "geodude",
      "graveler",
      "golem",
      "onix",
      "zubat",
      "golbat",
    ].includes(wildPokemon.species?.toLowerCase() || wildPokemon.name.toLowerCase());
  const isWater =
    !isCave &&
    (wildPokemon.habitat.toLowerCase().includes("aquático") ||
      wildPokemon.habitat.toLowerCase().includes("rio") ||
      wildPokemon.habitat.toLowerCase().includes("mar") ||
      wildPokemon.habitat.toLowerCase().includes("lago") ||
      wildPokemon.type.toLowerCase() === "água");

  const [dialogue, setDialogue] = useState<string>(() => {
    if (isCave) return `Um ${wildPokemon.name} selvagem surgiu entre as rochas da caverna!`;
    if (isWater) return `Um ${wildPokemon.name} selvagem surgiu nadando nas águas cristalinas!`;
    return `Um ${wildPokemon.name} selvagem apareceu saltitando na grama alta!`;
  });
  const [berryBonus, setBerryBonus] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleThrowPokeball = () => {
    if (inventory.pokeballs <= 0) {
      playSound("pop");
      setFeedback("Você não tem nenhuma Pokébola! Compre mais no PokéMarket da Cidade!");
      return;
    }

    onConsumeItem("pokeballs");
    playSound("open");
    setPhase("throwing");
    setDialogue(`Você arremessou uma Pokébola em direção ao ${wildPokemon.name}!`);

    setTimeout(() => {
      setPhase("wobble");
      setWobbleCount(1);
      playSound("click");

      setTimeout(() => {
        setWobbleCount(2);
        playSound("click");

        setTimeout(() => {
          setWobbleCount(3);
          playSound("click");

          // Determine catch success (bonus if fed berry or base catch rate is high)
          const roll = Math.random();
          const catchChance = berryBonus ? 1.0 : Math.max(0.75, wildPokemon.baseCatchRate);

          if (roll <= catchChance) {
            // SUCCESS!
            setTimeout(() => {
              playSound("fanfare");
              confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.6 },
              });
              setPhase("caught");
              setDialogue(`Gotcha! O ${wildPokemon.name} foi capturado com sucesso! 🎉`);

              const newCaptured: CapturedPokemon = {
                id: `pkmn-${Date.now()}`,
                name: wildPokemon.name,
                species: wildPokemon.species,
                emoji: wildPokemon.emoji,
                pokedexId: wildPokemon.pokedexId,
                artworkUrl: wildPokemon.artworkUrl,
                spriteUrl: wildPokemon.spriteUrl,
                animatedUrl: wildPokemon.animatedUrl,
                type: wildPokemon.type,
                typeColor: wildPokemon.typeColor,
                level: Math.floor(Math.random() * 3) + 3,
                exp: 0,
                maxEnergy: 100,
                energy: 100,
                status: "healthy",
                caughtAt: isCave ? "Caverna dos Fósseis" : isWater ? "Águas de Kanto" : "Grama Alta da Vila",
                friendship: 60,
              };

              onCaptureSuccess(newCaptured);
            }, 600);
          } else {
            // Escaped from ball
            setTimeout(() => {
              playSound("pop");
              setPhase("escaped");
              setDialogue(`Oh não! O ${wildPokemon.name} escapou da Pokébola, mas ainda está curioso!`);
            }, 600);
          }
        }, 600);
      }, 600);
    }, 700);
  };

  const handleFeedBerry = () => {
    if (inventory.berries <= 0) {
      playSound("pop");
      setFeedback("Você não tem nenhuma Fruta Baga!");
      return;
    }

    onConsumeItem("berries");
    playSound("star");
    setBerryBonus(true);
    setDialogue(`Você ofereceu uma Fruta Baga doce! O ${wildPokemon.name} adorou e agora confia em você! 💕`);
    setFeedback("Taxa de captura aumentada para 100%!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-fadeIn select-none touch-manipulation">
      <div className="relative w-full max-w-xl bg-slate-900 rounded-[32px] overflow-hidden border-4 border-amber-400 shadow-2xl flex flex-col">
        {/* Top Header */}
        <div className="px-4 py-2.5 bg-slate-950 text-white flex items-center justify-between border-b border-amber-400/40">
          <div className="flex items-center gap-2">
            <span className="text-xl">{isCave ? "⛰️" : isWater ? "🌊" : "🌿"}</span>
            <span className="text-xs font-black uppercase tracking-wider text-amber-300">
              Encontro Selvagem • Sem Dano
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 2D Encounter Arena */}
        <div
          className={`relative h-68 sm:h-76 overflow-hidden flex flex-col items-center justify-between p-4 ${
            isCave
              ? "bg-gradient-to-b from-slate-900 via-stone-900 to-slate-950"
              : isWater
              ? "bg-gradient-to-b from-sky-400 via-cyan-100 to-blue-400"
              : "bg-gradient-to-b from-emerald-200 via-green-100 to-emerald-300"
          }`}
        >
          {/* Decorative environment particles */}
          {isCave ? (
            <>
              <div className="absolute top-4 left-6 text-xl opacity-60">💎</div>
              <div className="absolute bottom-6 right-8 text-2xl opacity-60">⛏️</div>
              <div className="absolute top-8 right-12 text-sm opacity-50">✨</div>
            </>
          ) : isWater ? (
            <>
              <div className="absolute top-4 left-6 text-xl opacity-60">🫧</div>
              <div className="absolute bottom-6 right-8 text-2xl opacity-60">🌊</div>
              <div className="absolute top-8 right-12 text-sm opacity-50">☀️</div>
            </>
          ) : (
            <>
              <div className="absolute top-4 left-6 text-xl opacity-60">🦋</div>
              <div className="absolute bottom-6 right-8 text-2xl opacity-60">🌾</div>
              <div className="absolute top-8 right-12 text-sm opacity-50">☀️</div>
            </>
          )}

          {/* Authentic Battle Base Ground Platform - Strictly at the bottom background (z-0) */}
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-0 flex items-center justify-center">
            {isCave ? (
              /* Rocky Subterranean Cave Base (Mt. Moon / Caverna dos Fósseis) - No green grass in caves */
              <div className="w-64 sm:w-80 h-14 sm:h-18 rounded-[100%] border-2 border-stone-600/80 shadow-2xl overflow-hidden relative flex items-center justify-center bg-gradient-to-b from-stone-700 via-stone-800 to-stone-950">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-400/25 via-transparent to-black/60" />
                <div className="w-3/4 h-2 rounded-full bg-stone-900/60 blur-[1px] mt-1" />
              </div>
            ) : isWater ? (
              /* Aquatic Crystal Ripples Platform */
              <div className="w-64 sm:w-80 h-14 sm:h-18 rounded-[100%] border-2 border-cyan-300/80 shadow-xl overflow-hidden relative flex items-center justify-center bg-gradient-to-b from-cyan-400 via-blue-600 to-sky-900">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-200/50 via-transparent to-black/30" />
                <div className="w-2/3 h-2 rounded-full bg-white/40 blur-[1px] mt-1 animate-pulse" />
              </div>
            ) : (
              /* Official GBA Route / Meadow Grass Base (Strictly in background behind/under Pokémon) */
              <div className="w-64 sm:w-80 h-14 sm:h-18 rounded-[100%] border-2 border-emerald-400/80 shadow-xl overflow-hidden relative flex items-center justify-center bg-emerald-700">
                <img
                  src="/assets/rpg/battle/back_grass.png"
                  alt="Gramado de Batalha"
                  className="w-full h-full object-cover pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 via-transparent to-white/20 pointer-events-none" />
              </div>
            )}
          </div>

          {/* Top Status Card - Strictly on layer z-30 */}
          <div className="relative z-30 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-2 shadow-lg border-2 border-slate-700 flex items-center gap-3">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-black text-slate-900">{wildPokemon.name}</span>
                <span
                  className="text-[10px] font-black text-white px-2 py-0.2 rounded-full shadow-xs"
                  style={{ backgroundColor: wildPokemon.typeColor }}
                >
                  {wildPokemon.type}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-bold">{wildPokemon.habitat}</p>
            </div>

            {berryBonus && (
              <div className="flex items-center gap-1 bg-pink-100 border border-pink-300 text-pink-700 px-2 py-0.5 rounded-full text-[10px] font-black animate-pulse">
                <Heart className="w-3 h-3 fill-pink-500 text-pink-500" />
                <span>Amigável</span>
              </div>
            )}
          </div>

          {/* Pokemon Figure or Wobbling Pokeball - Strictly on layer z-20 (above ground platform) */}
          <div className="relative z-20 flex flex-col items-center justify-center my-auto">
            {phase === "encounter" || phase === "escaped" ? (
              <div className="relative flex flex-col items-center justify-center animate-bounce-subtle">
                {/* Pokemon Sprite / Full Artwork (100% whole, clean, unobstructed) */}
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
                  {wildPokemon.artworkUrl ? (
                    <img
                      src={wildPokemon.artworkUrl}
                      alt={wildPokemon.name}
                      className="max-w-full max-h-full object-contain filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.45)] select-none transform transition duration-300 hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = wildPokemon.spriteUrl;
                      }}
                    />
                  ) : (
                    <span className="text-7xl">{wildPokemon.emoji}</span>
                  )}
                </div>

                {/* Contact Shadow right under the Pokémon's base */}
                <div className="w-24 sm:w-32 h-3.5 sm:h-4 rounded-[100%] bg-black/35 blur-[2px] -mt-2 z-10 pointer-events-none" />
              </div>
            ) : phase === "throwing" ? (
              <div className="w-24 h-24 flex items-center justify-center animate-spin text-5xl">
                <span>🔴</span>
              </div>
            ) : phase === "wobble" ? (
              <div
                className={`w-24 h-24 flex items-center justify-center text-5xl transition-transform ${
                  wobbleCount === 1 ? "-rotate-20" : wobbleCount === 2 ? "rotate-20" : "-rotate-10"
                }`}
              >
                <span>🔴</span>
              </div>
            ) : (
              <div className="flex flex-col items-center animate-bounce">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-amber-300 to-amber-500 border-4 border-white shadow-2xl flex items-center justify-center p-2 relative">
                  {wildPokemon.artworkUrl ? (
                    <img
                      src={wildPokemon.artworkUrl}
                      alt={wildPokemon.name}
                      className="w-full h-full object-contain drop-shadow-md"
                    />
                  ) : (
                    <span className="text-5xl">⭐</span>
                  )}
                  <span className="absolute -top-2 -right-2 text-2xl">✨</span>
                </div>
                <span className="mt-2 bg-emerald-600 text-white font-black text-xs px-4 py-1.5 rounded-full shadow-lg border border-emerald-300">
                  🎉 {wildPokemon.name} Capturado!
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Action & Dialogue Box */}
        <div className="p-4 bg-slate-950 text-white flex flex-col gap-3 border-t-4 border-slate-800">
          {/* Dialogue Banner */}
          <div className="p-3 bg-slate-900 rounded-2xl border-2 border-slate-700 text-xs sm:text-sm font-bold leading-relaxed text-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <span>{dialogue}</span>
            {feedback && <span className="text-xs text-yellow-300 font-extrabold animate-pulse">{feedback}</span>}
          </div>

          {/* Action Buttons */}
          {phase === "caught" ? (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="btn-game px-6 py-3 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white rounded-2xl text-xs sm:text-sm font-black shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Guardar na Bolsa e Continuar! 🎒</span>
              </button>
            </div>
          ) : phase === "wobble" || phase === "throwing" ? (
            <div className="py-3 text-center text-xs font-black text-slate-400 animate-pulse">
              <span>A Pokébola está balançando... 🔴</span>
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-between gap-2.5">
              {/* Items Inventory Status */}
              <div className="flex items-center gap-2 text-xs font-black bg-slate-900 px-3 py-2 rounded-xl border border-slate-800">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <img src="/assets/rpg/items/poke-ball.png" alt="Pokébola" className="w-4 h-4 object-contain inline" /> {inventory.pokeballs}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-300 flex items-center gap-1">
                  <span>🍓</span> {inventory.berries}
                </span>

                {inventory.pokeballs === 0 && (
                  <button
                    onClick={onOpenMarket}
                    className="ml-2 text-[10px] text-amber-400 underline hover:text-amber-300 font-extrabold"
                  >
                    + Comprar
                  </button>
                )}
              </div>

              {/* Main Action Buttons */}
              <div className="flex items-center gap-2">
                {/* Offer Berry */}
                <button
                  type="button"
                  disabled={inventory.berries <= 0 || berryBonus}
                  onClick={handleFeedBerry}
                  className={`btn-game px-3.5 py-2.5 rounded-xl text-xs font-black border transition flex items-center gap-1.5 cursor-pointer ${
                    inventory.berries > 0 && !berryBonus
                      ? "bg-pink-600 hover:bg-pink-500 text-white border-pink-400 shadow-md"
                      : "bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed"
                  }`}
                  title="Oferecer fruta para acalmar o Pokémon e garantir a captura"
                >
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span>Baga ({inventory.berries})</span>
                </button>

                {/* Throw Pokeball */}
                <button
                  type="button"
                  onClick={handleThrowPokeball}
                  className="btn-game px-5 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-xl text-xs sm:text-sm font-black border-2 border-red-400 shadow-lg flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <img src="/assets/rpg/items/poke-ball.png" alt="Pokébola" className="w-5 h-5 object-contain inline" />
                  <span>Jogar Pokébola!</span>
                </button>

                {/* Flee peacefully */}
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-game px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold border border-slate-700 cursor-pointer"
                >
                  Fugir
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
