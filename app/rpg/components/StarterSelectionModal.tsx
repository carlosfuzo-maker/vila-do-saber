"use client";

import React, { useState } from "react";
import { Sparkles, Heart, Zap, Shield, Flame, Leaf, Droplets, CheckCircle2 } from "lucide-react";
import { StudentYear } from "../rpgTypes";
import { playSound } from "@/lib/soundEffects";
import { getPokemonAnimatedUrl, getPokemonArtworkUrl } from "../data/kantoPokedex";

export interface StarterChoiceOption {
  species: string;
  name: string;
  pokedexId: number;
  type: string;
  typeColor: string;
  emoji: string;
  badgeBg: string;
  badgeBorder: string;
  title: string;
  description: string;
  statHighlights: string;
  moves: string[];
}

export const STARTER_OPTIONS: StarterChoiceOption[] = [
  {
    species: "Charmander",
    name: "Charmander",
    pokedexId: 4,
    type: "Fogo",
    typeColor: "#ea580c",
    emoji: "🔥",
    badgeBg: "from-orange-600/30 via-red-600/20 to-amber-600/10",
    badgeBorder: "border-orange-500/50 hover:border-orange-400",
    title: "O Lagarto de Fogo",
    description: "A chama na ponta de sua cauda queima intensamente demonstrando sua coragem, bravura e entusiasmo para desbravar Kanto!",
    statHighlights: "Alto Ataque & Velocidade",
    moves: ["Brasa (Fogo)", "Arranhão (Normal)", "Rosnado"],
  },
  {
    species: "Bulbasaur",
    name: "Bulbasaur",
    pokedexId: 1,
    type: "Planta",
    typeColor: "#16a34a",
    emoji: "🍃",
    badgeBg: "from-emerald-600/30 via-green-600/20 to-teal-600/10",
    badgeBorder: "border-emerald-500/50 hover:border-emerald-400",
    title: "A Semente da Floresta",
    description: "Carrega uma semente vegetal nas costas que faz fotossíntese com a luz do sol. É sábio, paciente e apaixonado pela biologia e ecologia!",
    statHighlights: "Equilíbrio Total & Defesa Especial",
    moves: ["Folha Navalha (Planta)", "Investida (Normal)", "Fotossíntese"],
  },
  {
    species: "Squirtle",
    name: "Squirtle",
    pokedexId: 7,
    type: "Água",
    typeColor: "#0284c7",
    emoji: "💧",
    badgeBg: "from-sky-600/30 via-blue-600/20 to-cyan-600/10",
    badgeBorder: "border-sky-500/50 hover:border-sky-400",
    title: "A Tartaruga Hidrodinâmica",
    description: "Sua carapaça arredondada e lisa reduz o atrito com a água. Especialista em hidrodinâmica, perseverança inabalável e calma!",
    statHighlights: "Altíssima Defesa & Resistência",
    moves: ["Jato d'Água (Água)", "Bolhas (Água)", "Retirada"],
  },
  {
    species: "Pikachu",
    name: "Pikachu",
    pokedexId: 25,
    type: "Elétrico",
    typeColor: "#eab308",
    emoji: "⚡",
    badgeBg: "from-yellow-600/30 via-amber-600/20 to-orange-600/10",
    badgeBorder: "border-yellow-500/50 hover:border-yellow-400",
    title: "O Ratinho Elétrico",
    description: "Armazena eletricidade estática nas bochechas vermelhas. Leal companheiro de infância, ágil, enérgico e com coração de ouro!",
    statHighlights: "Velocidade Extrema & Ataque Rápido",
    moves: ["Choque do Trovão (Elétrico)", "Ataque Rápido (Normal)", "Onda Trovão"],
  },
];

interface StarterSelectionModalProps {
  isOpen: boolean;
  playerName: string;
  year: StudentYear;
  onSelectStarter: (starter: StarterChoiceOption) => void;
}

export function StarterSelectionModal({
  isOpen,
  playerName,
  year,
  onSelectStarter,
}: StarterSelectionModalProps) {
  const [selectedStarter, setSelectedStarter] = useState<StarterChoiceOption | null>(null);
  const [isConfirming, setIsConfirming] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleCardClick = (option: StarterChoiceOption) => {
    playSound("click");
    setSelectedStarter(option);
    setIsConfirming(false);
  };

  const handleConfirmChoice = () => {
    if (!selectedStarter) return;
    playSound("fanfare");
    onSelectStarter(selectedStarter);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="bg-slate-900 border-2 border-amber-500/70 rounded-3xl max-w-4xl w-full p-4 sm:p-6 shadow-2xl flex flex-col gap-4 max-h-[92vh] overflow-y-auto">
        
        {/* Header: Papai Carlos Dialog & Narrative */}
        <div className="flex items-start gap-3 sm:gap-4 bg-slate-950/80 border border-amber-500/40 p-4 rounded-2xl shadow-inner">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-3xl sm:text-4xl shadow-md shrink-0">
            👨‍👧
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="bg-amber-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                Papai Carlos
              </span>
              <span className="text-slate-400 text-xs font-semibold">
                Sala de Estar • Casa da Família
              </span>
            </div>
            <h3 className="text-amber-300 font-black text-sm sm:text-base mt-1">
              &quot;Bom dia, {playerName}! Chegou o momento mais esperado da sua infância!&quot;
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed">
              Como seu pai e grande incentivador dos seus estudos, eu trouxe <strong className="text-amber-400">4 parceiros especiais</strong> diretamente para você! 
              Escolha quem será o seu primeiro Pokémon companheiro para desbravar Kanto, vencer os Ginásios e se tornar uma verdadeira Mestra do Saber:
            </p>
          </div>
        </div>

        {/* 4 Starters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {STARTER_OPTIONS.map((starter) => {
            const isSelected = selectedStarter?.pokedexId === starter.pokedexId;
            return (
              <div
                key={starter.pokedexId}
                onClick={() => handleCardClick(starter)}
                className={`relative group cursor-pointer rounded-2xl p-4 transition-all duration-200 border-2 flex flex-col items-center text-center bg-gradient-to-b ${
                  starter.badgeBg
                } ${
                  isSelected
                    ? "border-amber-400 ring-4 ring-amber-400/30 scale-105 bg-slate-800 shadow-xl"
                    : `${starter.badgeBorder} bg-slate-950/70 hover:scale-[1.02] hover:bg-slate-900`
                }`}
              >
                {/* Selection Check Badge */}
                {isSelected && (
                  <div className="absolute top-2 right-2 bg-amber-400 text-slate-950 rounded-full p-1 shadow-lg animate-bounce">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                )}

                {/* Type Badge */}
                <span
                  style={{ backgroundColor: starter.typeColor }}
                  className="text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider shadow mb-2"
                >
                  {starter.emoji} {starter.type}
                </span>

                {/* Animated Pokemon Sprite */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center relative my-1">
                  <div
                    style={{ backgroundColor: `${starter.typeColor}20` }}
                    className="absolute inset-2 rounded-full blur-xl group-hover:blur-2xl transition-all"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getPokemonAnimatedUrl(starter.pokedexId)}
                    alt={starter.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-contain pixelated z-10 drop-shadow-md group-hover:scale-110 transition-transform duration-200"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = getPokemonArtworkUrl(starter.pokedexId);
                    }}
                  />
                </div>

                {/* Pokemon Name & Title */}
                <h4 className="text-white font-black text-base sm:text-lg tracking-wide">
                  {starter.name}
                </h4>
                <p className="text-amber-300 text-[11px] font-bold">
                  {starter.title}
                </p>

                {/* Description */}
                <p className="text-slate-300 text-xs mt-2 leading-relaxed text-left sm:text-center">
                  {starter.description}
                </p>

                {/* Stat Highlight */}
                <div className="w-full mt-3 pt-2 border-t border-slate-700/60 flex flex-col gap-1 text-[11px]">
                  <span className="text-amber-400 font-bold flex items-center justify-center gap-1">
                    <Zap className="w-3 h-3" /> {starter.statHighlights}
                  </span>
                  <div className="flex flex-wrap items-center justify-center gap-1 mt-1">
                    {starter.moves.map((move, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-900/90 text-slate-300 border border-slate-700 px-1.5 py-0.5 rounded text-[10px]"
                      >
                        {move}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Select Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(starter);
                    setIsConfirming(true);
                  }}
                  className={`mt-4 w-full py-2 rounded-xl font-black text-xs transition-all shadow-md flex items-center justify-center gap-1.5 ${
                    isSelected
                      ? "bg-amber-400 hover:bg-amber-300 text-slate-950 scale-100"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isSelected ? "Selecionado!" : "Escolher"}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Confirmation Action Footer */}
        {selectedStarter && (
          <div className="bg-slate-950 border border-amber-500/50 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200 shadow-xl">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getPokemonAnimatedUrl(selectedStarter.pokedexId)}
                alt={selectedStarter.name}
                className="w-12 h-12 object-contain pixelated"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = getPokemonArtworkUrl(selectedStarter.pokedexId);
                }}
              />
              <div>
                <p className="text-slate-200 text-xs sm:text-sm">
                  Você escolheu <strong className="text-amber-300 font-black">{selectedStarter.name}</strong> ({selectedStarter.type}) como seu primeiro parceiro!
                </p>
                <p className="text-slate-400 text-xs">
                  O Papai Carlos também vai te entregar o 📱 <strong className="text-slate-200">PokéCelular</strong> e 5 Pokébolas de presente!
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleConfirmChoice}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:brightness-110 active:scale-95 text-slate-950 font-black text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 border border-amber-300 animate-pulse"
            >
              <Heart className="w-4 h-4 fill-current text-red-600" />
              <span>CONFIRMAR {selectedStarter.name.toUpperCase()} E INICIAR!</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
