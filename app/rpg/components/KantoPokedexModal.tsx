"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  getPokemonArtworkUrl,
  getPokemonSpriteUrl,
  getPokemonAnimatedUrl,
} from "../data/kantoPokedex";
import {
  ALL_REGIONAL_POKEMON,
  AnyRegionalPokemon,
} from "../data/regionalPokedex";
import { CapturedPokemon } from "../rpgTypes";
import { playSound } from "@/lib/soundEffects";
import {
  X,
  Search,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Droplets,
  Flame,
  Leaf,
  Zap,
  Globe,
  Filter,
  Volume2,
} from "lucide-react";

interface KantoPokedexModalProps {
  isOpen: boolean;
  onClose: () => void;
  capturedList: CapturedPokemon[];
}

export const KantoPokedexModal: React.FC<KantoPokedexModalProps> = ({
  isOpen,
  onClose,
  capturedList,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [selectedGen, setSelectedGen] = useState<number | "all">("all");
  const [selectedPokemon, setSelectedPokemon] = useState<AnyRegionalPokemon>(
    ALL_REGIONAL_POKEMON[0]
  );

  if (!isOpen) return null;

  const capturedIds = new Set(capturedList.map((p) => p.pokedexId));

  const filteredPokemon = ALL_REGIONAL_POKEMON.filter((p) => {
    // Generation filter
    if (selectedGen === 1 && (p.pokedexId < 1 || p.pokedexId > 151)) return false;
    if (selectedGen === 2 && (p.pokedexId < 152 || p.pokedexId > 251)) return false;
    if (selectedGen === 3 && (p.pokedexId < 252 || p.pokedexId > 386)) return false;
    if (selectedGen === 4 && (p.pokedexId < 387 || p.pokedexId > 493)) return false;
    if (selectedGen === 5 && (p.pokedexId < 494 || p.pokedexId > 649)) return false;
    if (selectedGen === 6 && (p.pokedexId < 650 || p.pokedexId > 1025)) return false;

    // Search filter
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(p.pokedexId).padStart(3, "0").includes(searchTerm);

    if (!matchesSearch) return false;

    // Category filter
    if (selectedFilter === "all") return true;
    if (selectedFilter === "captured") return capturedIds.has(p.pokedexId);
    if (selectedFilter === "water") return p.isWaterType;
    if (selectedFilter === "fire") return p.type === "Fogo";
    if (selectedFilter === "grass") return p.type === "Planta";
    if (selectedFilter === "electric") return p.type === "Elétrico";
    if (selectedFilter === "rare") return p.habitat === "rare";

    return true;
  });

  const isSelectedCaptured = capturedIds.has(selectedPokemon.pokedexId);

  // Determine current region title
  const getHeaderRegionTitle = () => {
    switch (selectedGen) {
      case 1:
        return { title: "Pokédex de Kanto", sub: "1ª Geração Clássica • 151 Espécies (#001 a #151)" };
      case 2:
        return { title: "Pokédex de Johto", sub: "2ª Geração • 100 Espécies (#152 a #251)" };
      case 3:
        return { title: "Pokédex de Hoenn", sub: "3ª Geração • 135 Espécies (#252 a #386)" };
      case 4:
        return { title: "Pokédex de Sinnoh", sub: "4ª Geração • 107 Espécies (#387 a #493)" };
      case 5:
        return { title: "Pokédex de Unova", sub: "5ª Geração • 156 Espécies (#494 a #649)" };
      case 6:
        return { title: "Pokédex de Gerações Modernas", sub: "Gerações 6 a 9: Kalos, Alola, Galar e Paldea • 376 Espécies (#650 a #1025)" };
      default:
        return { title: "Pokédex Nacional do Saber", sub: "Gerações 1 a 9 • 1.025 Espécies Registradas" };
    }
  };

  const headerInfo = getHeaderRegionTitle();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in select-none">
      {/* Pokédex Retro Hardware Shell (Red GBA FireRed Case) */}
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#dc2626] border-4 border-[#991b1b] rounded-3xl shadow-2xl overflow-hidden flex flex-col text-slate-100">
        {/* Top Hardware Bezel with Sensor Lights */}
        <div className="bg-[#b91c1c] px-4 py-2.5 border-b-4 border-red-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Big Blue Power Lens with specular reflection */}
            <div className="relative w-8 h-8 rounded-full bg-sky-400 border-2 border-white shadow-[0_0_12px_rgba(56,189,248,0.8)] flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-white/70 absolute top-1.5 left-1.5" />
            </div>

            {/* Tri-color indicator LED bulbs */}
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-rose-400 border border-rose-200 shadow-sm" />
              <div className="w-3.5 h-3.5 rounded-full bg-amber-400 border border-amber-200 shadow-sm" />
              <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 border border-emerald-200 shadow-sm animate-pulse" />
            </div>

            <div className="hidden sm:block ml-2">
              <h2 className="text-sm font-black uppercase tracking-wider text-white drop-shadow">
                {headerInfo.title}
              </h2>
              <p className="text-[10px] text-red-200 font-bold">
                {headerInfo.sub}
              </p>
            </div>
          </div>

          {/* Captured Progress Counter & Close Button */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-900/80 border border-red-300/40 px-3 py-1 rounded-xl text-xs font-black text-amber-300 flex items-center gap-1.5">
              <span>🎒</span>
              <span>
                {capturedIds.size} / 1.025{" "}
                <span className="text-[10px] text-slate-400">Capturados</span>
              </span>
            </div>

            <button
              onClick={() => {
                onClose();
                try {
                  playSound("click");
                } catch {}
              }}
              className="p-1.5 bg-red-800 hover:bg-red-700 text-white rounded-xl border border-red-300/50 transition cursor-pointer active:scale-95"
              title="Fechar Pokédex"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Regional Generation Tabs Bar */}
        <div className="bg-[#881337] px-4 py-1.5 border-b border-red-950 flex items-center gap-1.5 overflow-x-auto text-[11px] font-black">
          <span className="text-red-200 text-[10px] uppercase tracking-wider mr-1 hidden sm:inline">Região:</span>
          <button
            onClick={() => setSelectedGen("all")}
            className={`px-2.5 py-0.5 rounded-lg transition cursor-pointer shrink-0 ${
              selectedGen === "all"
                ? "bg-amber-400 text-slate-950 shadow-sm"
                : "bg-slate-900/50 text-slate-200 hover:bg-slate-800"
            }`}
          >
            Nacional (1.025)
          </button>
          <button
            onClick={() => setSelectedGen(1)}
            className={`px-2.5 py-0.5 rounded-lg transition cursor-pointer shrink-0 ${
              selectedGen === 1
                ? "bg-amber-400 text-slate-950 shadow-sm"
                : "bg-slate-900/50 text-slate-200 hover:bg-slate-800"
            }`}
          >
            Kanto (G1 • 151)
          </button>
          <button
            onClick={() => setSelectedGen(2)}
            className={`px-2.5 py-0.5 rounded-lg transition cursor-pointer shrink-0 ${
              selectedGen === 2
                ? "bg-amber-400 text-slate-950 shadow-sm"
                : "bg-slate-900/50 text-slate-200 hover:bg-slate-800"
            }`}
          >
            Johto (G2 • 100)
          </button>
          <button
            onClick={() => setSelectedGen(3)}
            className={`px-2.5 py-0.5 rounded-lg transition cursor-pointer shrink-0 ${
              selectedGen === 3
                ? "bg-amber-400 text-slate-950 shadow-sm"
                : "bg-slate-900/50 text-slate-200 hover:bg-slate-800"
            }`}
          >
            Hoenn (G3 • 135)
          </button>
          <button
            onClick={() => setSelectedGen(4)}
            className={`px-2.5 py-0.5 rounded-lg transition cursor-pointer shrink-0 ${
              selectedGen === 4
                ? "bg-amber-400 text-slate-950 shadow-sm"
                : "bg-slate-900/50 text-slate-200 hover:bg-slate-800"
            }`}
          >
            Sinnoh (G4 • 107)
          </button>
          <button
            onClick={() => setSelectedGen(5)}
            className={`px-2.5 py-0.5 rounded-lg transition cursor-pointer shrink-0 ${
              selectedGen === 5
                ? "bg-amber-400 text-slate-950 shadow-sm"
                : "bg-slate-900/50 text-slate-200 hover:bg-slate-800"
            }`}
          >
            Unova (G5 • 156)
          </button>
          <button
            onClick={() => setSelectedGen(6)}
            className={`px-2.5 py-0.5 rounded-lg transition cursor-pointer shrink-0 ${
              selectedGen === 6
                ? "bg-amber-400 text-slate-950 shadow-sm"
                : "bg-slate-900/50 text-slate-200 hover:bg-slate-800"
            }`}
          >
            Modernas (G6-G9 • 376)
          </button>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="bg-[#991b1b] px-4 py-2 border-b-2 border-red-950 flex flex-wrap items-center justify-between gap-2">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nome, número (#252) ou espécie..."
              className="w-full bg-slate-950/80 border border-red-400/50 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          {/* Quick Filter Pills */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 text-[11px] font-black">
            <button
              onClick={() => setSelectedFilter("all")}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                selectedFilter === "all"
                  ? "bg-amber-400 text-slate-950"
                  : "bg-slate-900/60 text-slate-200 hover:bg-slate-800"
              }`}
            >
              Todos ({filteredPokemon.length})
            </button>
            <button
              onClick={() => setSelectedFilter("captured")}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                selectedFilter === "captured"
                  ? "bg-amber-400 text-slate-950"
                  : "bg-slate-900/60 text-slate-200 hover:bg-slate-800"
              }`}
            >
              <span>🎒</span>
              <span>Capturados</span>
            </button>
            <button
              onClick={() => setSelectedFilter("water")}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                selectedFilter === "water"
                  ? "bg-sky-500 text-white"
                  : "bg-slate-900/60 text-sky-200 hover:bg-slate-800"
              }`}
            >
              <Droplets className="w-3 h-3" />
              <span>Água</span>
            </button>
            <button
              onClick={() => setSelectedFilter("fire")}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                selectedFilter === "fire"
                  ? "bg-orange-500 text-white"
                  : "bg-slate-900/60 text-orange-200 hover:bg-slate-800"
              }`}
            >
              <Flame className="w-3 h-3" />
              <span>Fogo</span>
            </button>
            <button
              onClick={() => setSelectedFilter("grass")}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                selectedFilter === "grass"
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-900/60 text-emerald-200 hover:bg-slate-800"
              }`}
            >
              <Leaf className="w-3 h-3" />
              <span>Planta</span>
            </button>
            <button
              onClick={() => setSelectedFilter("electric")}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                selectedFilter === "electric"
                  ? "bg-yellow-400 text-slate-950"
                  : "bg-slate-900/60 text-yellow-200 hover:bg-slate-800"
              }`}
            >
              <Zap className="w-3 h-3" />
              <span>Elétrico</span>
            </button>
          </div>
        </div>

        {/* Dual Screen Pokédex Main Body */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-3 p-3 overflow-hidden bg-[#b91c1c]">
          {/* Left Screen: Pokemon Details Panel (Greenish LCD CRT Terminal style) */}
          <div className="md:col-span-5 bg-slate-950 border-4 border-slate-700 rounded-2xl p-3 flex flex-col justify-between shadow-inner relative overflow-hidden">
            {/* LCD Screen Glow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-emerald-500/5 pointer-events-none" />

            {/* Header info */}
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                <span className="text-xs font-mono font-black text-emerald-400">
                  № {String(selectedPokemon.pokedexId).padStart(3, "0")}
                </span>
                <span className="text-sm font-black text-white">
                  {selectedPokemon.name}
                </span>
                {isSelectedCaptured ? (
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Capturado
                  </span>
                ) : (
                  <span className="bg-slate-800 text-slate-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Ainda Não Capturado
                  </span>
                )}
              </div>

              {/* Artwork / Sprite Center Stage */}
              <div className="relative w-full aspect-square max-h-[190px] mx-auto bg-slate-900 border-2 border-slate-800 rounded-xl flex items-center justify-center p-2 mb-3 shadow-inner">
                {/* Background Pedestal Glow */}
                <div
                  className="absolute inset-4 rounded-full blur-xl opacity-25"
                  style={{ backgroundColor: selectedPokemon.typeColor }}
                />

                <img
                  src={getPokemonArtworkUrl(selectedPokemon.pokedexId)}
                  alt={selectedPokemon.name}
                  className="relative z-10 max-h-[160px] max-w-[160px] object-contain drop-shadow-xl animate-in zoom-in-95 duration-200"
                />

                {/* Gen 3/4 FireRed style Sprite in corner */}
                <div className="absolute bottom-1 right-1 bg-slate-950/80 border border-slate-700 rounded-lg p-0.5">
                  <img
                    src={getPokemonSpriteUrl(selectedPokemon.pokedexId)}
                    alt={`${selectedPokemon.name} sprite`}
                    className="w-9 h-9 object-contain pixelated"
                    style={{ imageRendering: "pixelated" }}
                  />
                </div>

                {/* Water Pokemon Indicator Badge */}
                {selectedPokemon.isWaterType && (
                  <div className="absolute top-2 left-2 bg-sky-600/90 text-white text-[10px] font-black px-2 py-0.5 rounded-md flex items-center gap-1 shadow-md">
                    <Droplets className="w-3 h-3" />
                    <span>Vive na Água</span>
                  </div>
                )}
              </div>

              {/* Type Badges */}
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="px-2.5 py-0.5 rounded-lg text-xs font-black text-white shadow-sm"
                  style={{ backgroundColor: selectedPokemon.typeColor }}
                >
                  {selectedPokemon.type}
                </span>
                {selectedPokemon.secondaryType && (
                  <span className="px-2.5 py-0.5 rounded-lg text-xs font-black text-white bg-slate-700 shadow-sm">
                    {selectedPokemon.secondaryType}
                  </span>
                )}
                <span className="text-[11px] font-bold text-slate-400 ml-auto">
                  Taxa: {Math.round(selectedPokemon.baseCatchRate * 100)}%
                </span>
              </div>

              {/* Habitat & Description */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-300 leading-relaxed font-sans mb-2">
                <p className="font-semibold text-slate-200 mb-1">
                  {selectedPokemon.description}
                </p>
                <div className="flex items-center gap-1.5 text-[10px] text-amber-300/90 border-t border-slate-800 pt-1 mt-1 font-bold">
                  <span>📍 Habitat:</span>
                  <span>
                    {selectedPokemon.isWaterType
                      ? "Rios, lagos e oceanos (requer Surf / Nadar)"
                      : selectedPokemon.habitat === "forest"
                      ? "Bosques e matas densas"
                      : selectedPokemon.habitat === "cave"
                      ? "Cavernas e picos montanhosos"
                      : selectedPokemon.habitat === "urban"
                      ? "Vilas e centros de tecnologia"
                      : "Grama alta e planícies regionais"}
                  </span>
                </div>
              </div>
            </div>

            {/* Hint */}
            <p className="text-[10px] text-center text-slate-400 font-medium">
              💡 Use Pokébolas compradas no Market para capturá-lo nas rotas!
            </p>
          </div>

          {/* Right Screen: Scrollable Grid of Pokemon */}
          <div className="md:col-span-7 bg-slate-950 border-4 border-slate-700 rounded-2xl p-2 flex flex-col shadow-inner overflow-hidden">
            <div className="flex items-center justify-between px-2 py-1 text-xs font-black text-slate-300 border-b border-slate-800 mb-2">
              <span>LISTAGEM DE ESPÉCIES ({filteredPokemon.length})</span>
              <span className="text-[10px] text-slate-400 font-mono">
                Pressione para ver detalhes
              </span>
            </div>

            {/* Scrollable Grid */}
            <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[50vh] md:max-h-[58vh]">
              {filteredPokemon.map((pkmn) => {
                const isCaptured = capturedIds.has(pkmn.pokedexId);
                const isSelected = selectedPokemon.pokedexId === pkmn.pokedexId;

                return (
                  <button
                    key={pkmn.pokedexId}
                    onClick={() => {
                      setSelectedPokemon(pkmn);
                      try {
                        playSound("click");
                      } catch {}
                    }}
                    className={`relative p-2 rounded-xl border text-left transition cursor-pointer flex items-center gap-2 ${
                      isSelected
                        ? "bg-slate-800 border-amber-400 ring-2 ring-amber-400/60"
                        : "bg-slate-900/80 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700"
                    }`}
                  >
                    {/* FireRed 16-bit Sprite */}
                    <div className="relative w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center flex-shrink-0">
                      <img
                        src={getPokemonSpriteUrl(pkmn.pokedexId)}
                        alt={pkmn.name}
                        className="w-8 h-8 object-contain pixelated"
                        style={{ imageRendering: "pixelated" }}
                      />
                      {isCaptured && (
                        <span className="absolute -top-1 -right-1 text-xs">
                          🔴
                        </span>
                      )}
                    </div>

                    {/* Details */}
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-mono font-bold text-slate-400">
                        #{String(pkmn.pokedexId).padStart(3, "0")}
                      </p>
                      <p className="text-xs font-extrabold text-white truncate">
                        {pkmn.name}
                      </p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span
                          className="text-[9px] font-black px-1.5 py-0.2 rounded text-white"
                          style={{ backgroundColor: pkmn.typeColor }}
                        >
                          {pkmn.type}
                        </span>
                        {pkmn.isWaterType && (
                          <span className="text-[9px]" title="Água">
                            💧
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
