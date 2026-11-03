"use client";

import React, { useState, useEffect } from "react";
import { CapturedPokemon, SisterSyncState } from "../rpgTypes";
import { getPokemonArtworkUrl } from "../data/kantoPokedex";
import { playSound } from "@/lib/soundEffects";
import confetti from "canvas-confetti";
import {
  X,
  ArrowRightLeft,
  Sparkles,
  Wifi,
  WifiOff,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

interface PokemonTradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  sisterName: "Bianca" | "Cecília";
  pokemonList: CapturedPokemon[];
  otherPlayerSync: SisterSyncState | null;
  onCompleteTrade: (
    sentPokemonId: string,
    receivedPokemon: CapturedPokemon,
    isTradeEvolution: boolean
  ) => void;
}

export function PokemonTradeModal({
  isOpen,
  onClose,
  sisterName,
  pokemonList,
  otherPlayerSync,
  onCompleteTrade,
}: PokemonTradeModalProps) {
  const [selectedMyPokemonId, setSelectedMyPokemonId] = useState<string | null>(null);
  const [isAnimatingTrade, setIsAnimatingTrade] = useState(false);
  const [tradeProgress, setTradeProgress] = useState(0);

  const otherSisterName = sisterName === "Bianca" ? "Cecília" : "Bianca";
  const isSisterOnline = Boolean(otherPlayerSync && Date.now() - otherPlayerSync.lastSeen < 15000);

  const selectedPokemon = pokemonList.find((p) => p.id === selectedMyPokemonId) || null;

  // Check if a pokemon evolves by trade
  const checkTradeEvolution = (pokedexId: number): number | null => {
    if (pokedexId === 64) return 65; // Kadabra -> Alakazam
    if (pokedexId === 67) return 68; // Machoke -> Machamp
    if (pokedexId === 75) return 76; // Graveler -> Golem
    if (pokedexId === 93) return 94; // Haunter -> Gengar
    return null;
  };

  const handleStartTrade = () => {
    if (!selectedPokemon) {
      playSound("pop");
      return;
    }

    playSound("fanfare");
    setIsAnimatingTrade(true);
    setTradeProgress(0);

    // Cable link progress animation
    const interval = setInterval(() => {
      setTradeProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 20;
      });
    }, 400);

    setTimeout(() => {
      clearInterval(interval);
      setIsAnimatingTrade(false);

      // Create sister's gift or trade counter-pokemon
      // If sister is online with offer, use it; otherwise generate a special sister token trade
      const sisterGiftSpecies = sisterName === "Bianca" ? "Pikachu" : "Eevee";
      const sisterGiftId = sisterName === "Bianca" ? 25 : 133;
      const willEvolve = Boolean(checkTradeEvolution(selectedPokemon.pokedexId));

      const received: CapturedPokemon = {
        id: `trade-${Date.now()}`,
        name: `Amigo da ${otherSisterName}`,
        species: sisterGiftSpecies,
        emoji: sisterGiftId === 25 ? "⚡" : "🦊",
        pokedexId: sisterGiftId,
        artworkUrl: getPokemonArtworkUrl(sisterGiftId),
        spriteUrl: getPokemonArtworkUrl(sisterGiftId),
        type: sisterGiftId === 25 ? "Elétrico" : "Normal",
        typeColor: sisterGiftId === 25 ? "#eab308" : "#b45309",
        level: selectedPokemon.level,
        exp: 0,
        maxEnergy: 50,
        energy: 50,
        status: "healthy",
        caughtAt: `Trocado com ${otherSisterName} no Centro Pokémon!`,
        friendship: 100,
        notes: `Presente carinhoso da irmã ${otherSisterName}!`,
      };

      playSound("success");
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });

      onCompleteTrade(selectedPokemon.id, received, willEvolve);
      onClose();
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/90 backdrop-blur-md animate-fadeIn select-none touch-manipulation">
      <div className="relative w-full max-w-xl bg-slate-900 rounded-[32px] overflow-hidden border-4 border-indigo-400 shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header Link Cable */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-indigo-900 via-sky-900 to-indigo-950 text-white flex items-center justify-between border-b border-indigo-400/30">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-lg shadow">
              <ArrowRightLeft className="w-5 h-5 text-indigo-200" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black tracking-wide flex items-center gap-2">
                <span>Centro Pokémon • Cabo Link</span>
                <span className="text-[10px] bg-indigo-500/30 text-indigo-200 px-2 py-0.5 rounded-full border border-indigo-400/40">
                  Troca entre Irmãs
                </span>
              </h3>
              <p className="text-[11px] text-indigo-200">
                Conecte os dois tablets para trocar Pokémon e ativar evoluções especiais!
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

        {/* BODY */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {/* Status Bar */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-indigo-300 font-bold">Você:</span>
              <span className="font-black text-white">👧 {sisterName}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-bold">Irmã ({otherSisterName}):</span>
              {isSisterOnline ? (
                <span className="flex items-center gap-1 font-black text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/40">
                  <Wifi className="w-3 h-3 animate-pulse" />
                  <span>Online no Tablet 🟢</span>
                </span>
              ) : (
                <span className="flex items-center gap-1 font-bold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-500/40">
                  <WifiOff className="w-3 h-3" />
                  <span>Modo Local / Standby 🟡</span>
                </span>
              )}
            </div>
          </div>

          {/* Trade Animation in progress */}
          {isAnimatingTrade ? (
            <div className="py-8 text-center space-y-4">
              <div className="text-amber-300 font-black text-sm animate-pulse">
                ⚡ Transferindo Pokémon pelo Cabo Link... ⚡
              </div>

              {/* Cable visual */}
              <div className="relative w-full max-w-sm mx-auto h-16 bg-slate-950 rounded-2xl border-2 border-indigo-500 flex items-center justify-between px-6 overflow-hidden">
                <div className="w-10 h-10 rounded-full bg-indigo-600 border-2 border-white flex items-center justify-center text-xs font-black text-white">
                  {sisterName[0]}
                </div>

                {/* Flying Pokéball */}
                <div
                  className="absolute top-4 text-2xl transition-all duration-300 filter drop-shadow-[0_0_10px_rgba(56,189,248,0.8)]"
                  style={{ left: `${15 + tradeProgress * 0.65}%` }}
                >
                  🔴
                </div>

                <div className="w-10 h-10 rounded-full bg-pink-600 border-2 border-white flex items-center justify-center text-xs font-black text-white">
                  {otherSisterName[0]}
                </div>
              </div>

              <p className="text-xs text-slate-300">
                Se o Pokémon for Kadabra, Machoke, Graveler ou Haunter, ele evoluirá agora!
              </p>
            </div>
          ) : (
            <>
              {/* Pokémon Selector */}
              <div>
                <h4 className="text-xs font-bold text-slate-300 mb-2 flex items-center justify-between">
                  <span>Escolha qual Pokémon você deseja trocar:</span>
                  <span className="text-[11px] text-amber-300 font-normal">
                    {pokemonList.length} disponíveis
                  </span>
                </h4>

                {pokemonList.length === 0 ? (
                  <div className="p-6 text-center bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-400">
                    Você ainda não tem Pokémon capturados para trocar!
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-56 overflow-y-auto p-1">
                    {pokemonList.map((p) => {
                      const isSelected = p.id === selectedMyPokemonId;
                      const evolvesOnTrade = Boolean(checkTradeEvolution(p.pokedexId));

                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => {
                            playSound("click");
                            setSelectedMyPokemonId(p.id);
                          }}
                          className={`p-2.5 rounded-2xl border-2 flex flex-col items-center text-center transition cursor-pointer relative ${
                            isSelected
                              ? "bg-indigo-600/30 border-amber-400 shadow-md scale-[1.02]"
                              : "bg-slate-800/80 border-slate-700 hover:border-slate-500"
                          }`}
                        >
                          {evolvesOnTrade && (
                            <span className="absolute top-1 right-1 text-[9px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded-full shadow">
                              ✨ Evolui!
                            </span>
                          )}

                          <img
                            src={p.artworkUrl || p.spriteUrl}
                            alt={p.name}
                            className="w-12 h-12 object-contain mb-1"
                          />
                          <span className="text-xs font-black text-white leading-tight">
                            {p.name}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            Nv. {p.level} • {p.type}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Trade evolution helper hint */}
              <div className="p-3 bg-indigo-950/60 border border-indigo-400/30 rounded-2xl text-[11px] text-indigo-200 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Dica de Mestre:</strong> <em>Kadabra</em>, <em>Machoke</em>, <em>Graveler</em> e <em>Haunter</em> evoluem imediatamente para <strong>Alakazam, Machamp, Golem e Gengar</strong> quando são trocados!
                </span>
              </div>

              {/* Confirm Trade Button */}
              <button
                type="button"
                disabled={!selectedPokemon}
                onClick={handleStartTrade}
                className={`btn-game w-full py-3 rounded-2xl font-black text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 transition ${
                  selectedPokemon
                    ? "bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 cursor-pointer"
                    : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
                }`}
              >
                <ArrowRightLeft className="w-4 h-4" />
                <span>
                  {selectedPokemon
                    ? `Confirmar Troca de ${selectedPokemon.name} com ${otherSisterName}!`
                    : "Selecione um Pokémon acima para trocar"}
                </span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
