"use client";

import React, { useState, useEffect, useRef } from "react";
import { CapturedPokemon } from "../rpgTypes";
import {
  KantoPokemonData,
  getPokemonById,
  getPokemonArtworkUrl,
  getPokemonSpriteUrl,
  getPokemonAnimatedUrl,
} from "../data/kantoPokedex";
import { playSound } from "@/lib/soundEffects";
import confetti from "canvas-confetti";
import { Sparkles, ArrowRight, ShieldCheck, Zap, X } from "lucide-react";

interface PokemonEvolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  pokemon: CapturedPokemon | null;
  targetPokedexId: number;
  evolutionMethod: "level" | "stone" | "trade";
  onEvolutionComplete: (updatedPokemon: CapturedPokemon) => void;
}

export function PokemonEvolutionModal({
  isOpen,
  onClose,
  pokemon,
  targetPokedexId,
  evolutionMethod,
  onEvolutionComplete,
}: PokemonEvolutionModalProps) {
  const [phase, setPhase] = useState<"intro" | "evolving" | "completed" | "cancelled">("intro");
  const [showTargetSprite, setShowTargetSprite] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const flashIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const targetData: KantoPokemonData | undefined = getPokemonById(targetPokedexId);

  useEffect(() => {
    if (!isOpen || !pokemon || !targetData) {
      setPhase("intro");
      setShowTargetSprite(false);
      return;
    }

    playSound("fanfare");
    setPhase("evolving");

    // Rapid toggle between original sprite and target sprite to mimic classic GBA silhouette flashing
    flashIntervalRef.current = setInterval(() => {
      setShowTargetSprite((prev) => !prev);
    }, 280);

    // Complete evolution after 5.5 seconds
    timerRef.current = setTimeout(() => {
      if (flashIntervalRef.current) clearInterval(flashIntervalRef.current);
      setShowTargetSprite(true);
      setPhase("completed");
      playSound("success");

      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.55 },
      });
    }, 5500);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (flashIntervalRef.current) clearInterval(flashIntervalRef.current);
    };
  }, [isOpen, pokemon, targetData]);

  if (!isOpen || !pokemon || !targetData) return null;

  const handleCancelEvolution = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (flashIntervalRef.current) clearInterval(flashIntervalRef.current);
    setPhase("cancelled");
    setShowTargetSprite(false);
    playSound("pop");
  };

  const handleFinish = () => {
    const updated: CapturedPokemon = {
      ...pokemon,
      pokedexId: targetData.pokedexId,
      species: targetData.species,
      name: pokemon.name === pokemon.species ? targetData.name : pokemon.name,
      artworkUrl: getPokemonArtworkUrl(targetData.pokedexId),
      spriteUrl: getPokemonSpriteUrl(targetData.pokedexId),
      animatedUrl: getPokemonAnimatedUrl(targetData.pokedexId),
      type: targetData.type,
      typeColor: targetData.typeColor,
      maxEnergy: pokemon.maxEnergy + 10,
      energy: pokemon.maxEnergy + 10,
      level: Math.max(pokemon.level, 16),
      notes: `Evoluiu por ${evolutionMethod === "stone" ? "Pedra Elemental" : evolutionMethod === "trade" ? "Troca com a Irmã" : "Nível de Sabedoria"}!`,
    };

    onEvolutionComplete(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/95 backdrop-blur-lg animate-fadeIn select-none touch-manipulation">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 rounded-[32px] overflow-hidden border-4 border-amber-400 shadow-2xl flex flex-col items-center text-center p-6">
        {/* Retro Header Screen */}
        <div className="w-full flex items-center justify-between border-b border-indigo-500/30 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 animate-ping inline-block" />
            <span className="text-xs font-black tracking-widest text-amber-300 uppercase font-mono">
              ✦ Game Boy Advance Evolution ✦
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

        {/* Dynamic Display Area */}
        {phase === "evolving" && (
          <div className="space-y-4 my-auto w-full">
            <div className="text-amber-300 font-extrabold text-sm sm:text-base tracking-wide animate-pulse">
              ✨ O quê?! O seu <strong className="text-white">{pokemon.name}</strong> está evoluindo! ✨
            </div>

            {/* Glowing Silhouette Platform */}
            <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-amber-500/30 via-indigo-500/20 to-transparent blur-xl animate-pulse" />
              <div className="absolute bottom-2 w-40 h-8 rounded-[100%] bg-indigo-900/60 border border-indigo-400/30 blur-xs" />

              <img
                src={showTargetSprite ? getPokemonArtworkUrl(targetData.pokedexId) : pokemon.artworkUrl || pokemon.spriteUrl}
                alt="Evoluindo"
                className={`w-36 h-36 object-contain filter drop-shadow-[0_0_20px_rgba(251,191,36,0.8)] transition-all duration-300 ${
                  showTargetSprite ? "scale-110 brightness-125" : "scale-95 brightness-90 contrast-150"
                }`}
              />
            </div>

            <p className="text-xs text-indigo-200">
              A força do aprendizado e do estudo está transformando seu companheiro...
            </p>

            {/* Classic Cancel Button (B Button) */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleCancelEvolution}
                className="btn-game px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-black shadow-lg cursor-pointer transition flex items-center justify-center gap-1.5 mx-auto"
              >
                <span>🛑 Pressionar Botão &apos;B&apos; (Cancelar Evolução)</span>
              </button>
            </div>
          </div>
        )}

        {phase === "completed" && (
          <div className="space-y-4 my-auto w-full animate-fadeIn">
            <div className="text-emerald-400 font-black text-base sm:text-lg tracking-wide flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-300 animate-spin" />
              <span>Parabéns! Seu {pokemon.name} evoluiu para {targetData.name}!</span>
            </div>

            {/* Before and After display */}
            <div className="flex items-center justify-center gap-4 py-2">
              <div className="flex flex-col items-center">
                <img
                  src={pokemon.artworkUrl || pokemon.spriteUrl}
                  alt={pokemon.name}
                  className="w-16 h-16 object-contain opacity-70"
                />
                <span className="text-[11px] text-slate-400 font-bold">{pokemon.name}</span>
              </div>

              <div className="w-8 h-8 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center">
                <ArrowRight className="w-5 h-5" />
              </div>

              <div className="flex flex-col items-center p-2 rounded-2xl bg-amber-400/10 border-2 border-amber-400 shadow-xl">
                <img
                  src={getPokemonArtworkUrl(targetData.pokedexId)}
                  alt={targetData.name}
                  className="w-24 h-24 object-contain filter drop-shadow-[0_0_15px_rgba(251,191,36,0.6)] animate-bounce"
                />
                <span className="text-xs text-amber-300 font-black mt-1">{targetData.name}</span>
                <span className="text-[10px] text-indigo-200">{targetData.type}</span>
              </div>
            </div>

            <div className="p-3 bg-indigo-950/70 border border-indigo-400/40 rounded-2xl text-xs text-indigo-100 text-left max-w-sm mx-auto space-y-1">
              <p className="font-bold flex items-center gap-1.5 text-amber-300">
                <Zap className="w-3.5 h-3.5" />
                <span>Novos atributos desbloqueados:</span>
              </p>
              <p className="text-[11px] text-slate-300">
                • Energia Máxima aumentada para <strong>{pokemon.maxEnergy + 10} HP</strong>!
              </p>
              <p className="text-[11px] text-slate-300">
                • {targetData.description}
              </p>
            </div>

            <button
              type="button"
              onClick={handleFinish}
              className="btn-game w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 rounded-2xl font-black text-sm shadow-xl cursor-pointer transition"
            >
              🎉 Continuar Jornada com {targetData.name}!
            </button>
          </div>
        )}

        {phase === "cancelled" && (
          <div className="space-y-4 my-auto w-full animate-fadeIn py-6">
            <div className="text-3xl">🛑</div>
            <h4 className="text-sm sm:text-base font-black text-white">
              A evolução foi interrompida com sucesso!
            </h4>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              Seu <strong>{pokemon.name}</strong> continuará em sua forma atual. Quando quiser evoluí-lo novamente, basta resolver mais missões ou usar os itens da bolsa!
            </p>
            <button
              type="button"
              onClick={onClose}
              className="btn-game px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-black shadow cursor-pointer transition"
            >
              Voltar ao Jogo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
