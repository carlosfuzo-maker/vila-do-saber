"use client";

import React, { useState } from "react";
import { CapturedPokemon, RpgInventory } from "../rpgTypes";
import { getPokemonById } from "../data/kantoPokedex";
import { playSound } from "@/lib/soundEffects";
import {
  X,
  Sparkles,
  Heart,
  ShoppingBag,
  CheckCircle2,
  AlertTriangle,
  Zap,
} from "lucide-react";

interface RpgBagModalProps {
  isOpen: boolean;
  onClose: () => void;
  pokemonList: CapturedPokemon[];
  stolenList: CapturedPokemon[];
  inventory: RpgInventory;
  coins: number;
  onUsePotion: (pokemonId: string) => void;
  onUseAntidote: (pokemonId: string) => void;
  onPetPokemon: (pokemonId: string) => void;
  onOpenMarket: () => void;
  onOpenRocketRescue: () => void;
  onTriggerEvolution?: (
    pokemon: CapturedPokemon,
    targetPokedexId: number,
    method: "level" | "stone" | "trade"
  ) => void;
}

export function RpgBagModal({
  isOpen,
  onClose,
  pokemonList,
  stolenList,
  inventory,
  coins,
  onUsePotion,
  onUseAntidote,
  onPetPokemon,
  onOpenMarket,
  onOpenRocketRescue,
  onTriggerEvolution,
}: RpgBagModalProps) {
  const [activeTab, setActiveTab] = useState<"pokemon" | "items" | "stolen">("pokemon");
  const [feedback, setFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const showToast = (text: string) => {
    setFeedback(text);
    setTimeout(() => {
      setFeedback(null);
    }, 3000);
  };

  const totalSupplies =
    (inventory.pokeballs || 0) +
    (inventory.potions || 0) +
    (inventory.antidotes || 0) +
    (inventory.berries || 0) +
    (inventory.thunderStones || 0) +
    (inventory.waterStones || 0) +
    (inventory.fireStones || 0) +
    (inventory.leafStones || 0) +
    (inventory.moonStones || 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-fadeIn select-none touch-manipulation">
      <div className="relative w-full max-w-2xl bg-slate-900 rounded-[32px] overflow-hidden border-4 border-indigo-400 shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white flex items-center justify-between border-b border-indigo-500/30">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-xl shadow">
              🎒
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black tracking-wide flex items-center gap-2">
                <span>Bolsa & Equipe Pokémon</span>
                <span className="text-[10px] bg-indigo-500/30 text-indigo-200 px-2 py-0.5 rounded-full border border-indigo-400/40">
                  {pokemonList.length} Pokémon
                </span>
              </h3>
              <p className="text-[11px] text-indigo-200">
                Moedas disponíveis: <strong className="text-amber-300 font-extrabold">{coins} 🪙</strong>
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

        {/* Navigation Tabs */}
        <div className="px-4 pt-2 pb-2 bg-slate-950 flex gap-2 border-b border-slate-800">
          <button
            type="button"
            onClick={() => {
              playSound("click");
              setActiveTab("pokemon");
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === "pokemon"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200"
            }`}
          >
            <span>🐾 Meus Pokémon</span>
            <span className="text-[10px] opacity-80">({pokemonList.length})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playSound("click");
              setActiveTab("items");
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === "items"
                ? "bg-amber-600 text-white shadow-md shadow-amber-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200"
            }`}
          >
            <span>🎒 Suprimentos & Pedras</span>
            <span className="text-[10px] opacity-80">({totalSupplies})</span>
          </button>

          {stolenList.length > 0 && (
            <button
              type="button"
              onClick={() => {
                playSound("pop");
                setActiveTab("stolen");
              }}
              className={`py-2 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 cursor-pointer animate-pulse ${
                activeTab === "stolen"
                  ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
                  : "bg-rose-950/80 text-rose-300 border border-rose-500/50"
              }`}
            >
              <span>🚀 Resgate Rocket</span>
              <span className="text-[10px] bg-rose-900 px-1.5 rounded-full font-bold">
                {stolenList.length}
              </span>
            </button>
          )}
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div className="bg-amber-500/20 border-b border-amber-500/40 text-amber-200 px-4 py-2 text-xs font-bold flex items-center justify-center gap-2 animate-fadeIn">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{feedback}</span>
          </div>
        )}

        {/* Tab Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {/* TAB 1: POKEMON LIST & CARE */}
          {activeTab === "pokemon" && (
            <div>
              {pokemonList.length === 0 ? (
                <div className="p-8 text-center bg-slate-950/60 rounded-2xl border border-slate-800 space-y-3">
                  <div className="text-4xl">🌿</div>
                  <h4 className="text-sm font-black text-slate-300">
                    Você ainda não capturou nenhum Pokémon!
                  </h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                    Caminhe pela grama alta nas rotas e cidades para encontrar monstrinhos selvagens. Use suas Pokébolas para capturá-los!
                  </p>
                  <button
                    onClick={onOpenMarket}
                    className="btn-game px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-black shadow inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Comprar Pokébolas no Market</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pokemonList.map((p) => {
                    const isTired = p.status === "tired";
                    const isPoisoned = p.status === "poisoned";
                    const kantoDef = getPokemonById(p.pokedexId);

                    // Check for available stone evolution
                    const stoneEvolutions = kantoDef?.evolutions?.filter((e) => e.method === "stone") || [];
                    const availableStoneEvolution = stoneEvolutions.find((e) => {
                      if (e.stone === "thunder" && (inventory.thunderStones || 0) > 0) return true;
                      if (e.stone === "water" && (inventory.waterStones || 0) > 0) return true;
                      if (e.stone === "fire" && (inventory.fireStones || 0) > 0) return true;
                      if (e.stone === "leaf" && (inventory.leafStones || 0) > 0) return true;
                      if (e.stone === "moon" && (inventory.moonStones || 0) > 0) return true;
                      return false;
                    });

                    return (
                      <div
                        key={p.id}
                        className={`p-3.5 rounded-2xl border-2 transition shadow-md flex flex-col justify-between gap-3 ${
                          isPoisoned
                            ? "bg-purple-950/40 border-purple-500/50"
                            : isTired
                            ? "bg-amber-950/40 border-amber-500/50"
                            : "bg-slate-800/80 border-slate-700"
                        }`}
                      >
                        {/* Top: Avatar, Name & Status */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-14 h-14 rounded-2xl bg-white/10 p-1 flex items-center justify-center border border-white/20 shadow-inner overflow-hidden flex-shrink-0">
                              {p.artworkUrl || p.spriteUrl ? (
                                <img
                                  src={p.artworkUrl || p.spriteUrl}
                                  alt={p.name}
                                  className="w-full h-full object-contain filter drop-shadow-sm"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = p.spriteUrl || "";
                                  }}
                                />
                              ) : (
                                <span className="text-3xl">{p.emoji}</span>
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <h4 className="text-sm font-black text-white">{p.name}</h4>
                                <span
                                  className="text-[9px] font-black text-white px-1.5 py-0.2 rounded-md"
                                  style={{ backgroundColor: p.typeColor }}
                                >
                                  {p.type}
                                </span>
                              </div>
                              <p className="text-[10px] text-slate-400 font-bold">
                                Nível {p.level || 5} • EXP: {p.exp || 0}
                              </p>
                              <p className="text-[10px] text-pink-300 font-medium">
                                Amizade: {p.friendship || 50}%
                              </p>
                            </div>
                          </div>

                          {/* Health Status Badge */}
                          <div className="text-right">
                            {isPoisoned ? (
                              <span className="bg-purple-900/80 text-purple-200 border border-purple-400/50 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                                <span>🤢 Indisposto</span>
                              </span>
                            ) : isTired ? (
                              <span className="bg-amber-900/80 text-amber-200 border border-amber-400/50 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                                <span>😴 Cansado</span>
                              </span>
                            ) : (
                              <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/50 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                <span>Saudável</span>
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Energy Bar */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] font-extrabold text-slate-400">
                            <span>Energia & Vigor</span>
                            <span>{p.energy}/{p.maxEnergy}</span>
                          </div>
                          <div className="h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-700">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                isPoisoned
                                  ? "bg-purple-500"
                                  : isTired
                                  ? "bg-amber-500"
                                  : "bg-emerald-400"
                              }`}
                              style={{ width: `${(p.energy / p.maxEnergy) * 100}%` }}
                            />
                          </div>
                        </div>

                        {/* Stone Evolution Button if ready */}
                        {availableStoneEvolution && onTriggerEvolution && (
                          <button
                            type="button"
                            onClick={() => {
                              playSound("star");
                              onTriggerEvolution(p, availableStoneEvolution.toId, "stone");
                              onClose();
                            }}
                            className="btn-game w-full py-1.5 px-3 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 animate-pulse cursor-pointer"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>✨ Usar Pedra para Evoluir!</span>
                          </button>
                        )}

                        {/* Interactive Care Actions */}
                        <div className="flex items-center gap-1.5 pt-1 border-t border-white/10">
                          {/* Use Potion */}
                          <button
                            type="button"
                            onClick={() => {
                              if ((inventory.potions || 0) <= 0) {
                                playSound("pop");
                                showToast("Você não tem Poções! Compre no Market!");
                                return;
                              }
                              onUsePotion(p.id);
                              playSound("star");
                              showToast(`Você usou uma Poção! ${p.name} recuperou todas as energias! 🧪`);
                            }}
                            className={`btn-game flex-1 py-1.5 rounded-xl text-[10px] font-black flex items-center justify-center gap-1.5 cursor-pointer transition ${
                              (inventory.potions || 0) > 0 && p.energy < p.maxEnergy
                                ? "bg-amber-600 hover:bg-amber-500 text-white shadow-sm"
                                : "bg-slate-900 text-slate-500 border border-slate-800"
                            }`}
                            title="Usar Poção para recuperar energia"
                          >
                            <img src="/assets/rpg/items/potion.png" alt="Poção" className="w-3.5 h-3.5 object-contain inline" />
                            <span>Poção ({inventory.potions || 0})</span>
                          </button>

                          {/* Use Antidote */}
                          <button
                            type="button"
                            onClick={() => {
                              if ((inventory.antidotes || 0) <= 0) {
                                playSound("pop");
                                showToast("Você não tem Antídotos! Compre no Market!");
                                return;
                              }
                              if (!isPoisoned) {
                                playSound("pop");
                                showToast(`${p.name} não está indisposto!`);
                                return;
                              }
                              onUseAntidote(p.id);
                              playSound("star");
                              showToast(`Antídoto aplicado! ${p.name} está curado! 💊`);
                            }}
                            className={`btn-game flex-1 py-1.5 rounded-xl text-[10px] font-black flex items-center justify-center gap-1.5 cursor-pointer transition ${
                              (inventory.antidotes || 0) > 0 && isPoisoned
                                ? "bg-purple-600 hover:bg-purple-500 text-white shadow-sm animate-pulse"
                                : "bg-slate-900 text-slate-500 border border-slate-800"
                            }`}
                            title="Usar Antídoto para curar indisposição"
                          >
                            <img src="/assets/rpg/items/antidote.png" alt="Antídoto" className="w-3.5 h-3.5 object-contain inline" />
                            <span>Antídoto ({inventory.antidotes || 0})</span>
                          </button>

                          {/* Pet / Care */}
                          <button
                            type="button"
                            onClick={() => {
                              onPetPokemon(p.id);
                              playSound("pop");
                              showToast(`Você fez carinho no ${p.name}! Ele ficou radiante de felicidade! 💖`);
                            }}
                            className="btn-game px-3 py-1.5 bg-pink-600/80 hover:bg-pink-500 text-white rounded-xl text-[10px] font-black flex items-center justify-center gap-1 cursor-pointer shadow-sm"
                            title="Fazer carinho no Pokémon"
                          >
                            <Heart className="w-3 h-3 fill-current text-pink-200" />
                            <span>Carinho</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: INVENTORY & STONES */}
          {activeTab === "items" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* Pokeballs */}
                <div className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center p-2 mb-2">
                    <img src="/assets/rpg/items/poke-ball.png" alt="Pokébola" className="w-8 h-8 object-contain" />
                  </div>
                  <h4 className="text-xs font-black text-white">Pokébolas</h4>
                  <p className="text-[10px] text-slate-400">Captura na grama</p>
                  <span className="mt-2 text-base font-black text-amber-300">
                    {inventory.pokeballs || 0} un
                  </span>
                </div>

                {/* Potions */}
                <div className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center p-2 mb-2">
                    <img src="/assets/rpg/items/potion.png" alt="Poção" className="w-8 h-8 object-contain" />
                  </div>
                  <h4 className="text-xs font-black text-white">Poções</h4>
                  <p className="text-[10px] text-slate-400">Cura cansaço</p>
                  <span className="mt-2 text-base font-black text-amber-300">
                    {inventory.potions || 0} un
                  </span>
                </div>

                {/* Antidotes */}
                <div className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center p-2 mb-2">
                    <img src="/assets/rpg/items/antidote.png" alt="Antídoto" className="w-8 h-8 object-contain" />
                  </div>
                  <h4 className="text-xs font-black text-white">Antídotos</h4>
                  <p className="text-[10px] text-slate-400">Cura indisposição</p>
                  <span className="mt-2 text-base font-black text-amber-300">
                    {inventory.antidotes || 0} un
                  </span>
                </div>

                {/* Berries */}
                <div className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-2xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-2xl mb-2">
                    🍓
                  </div>
                  <h4 className="text-xs font-black text-white">Frutas Bagas</h4>
                  <p className="text-[10px] text-slate-400">Acalma na captura</p>
                  <span className="mt-2 text-base font-black text-amber-300">
                    {inventory.berries || 0} un
                  </span>
                </div>
              </div>

              {/* Elemental Stones Showcase */}
              <div className="p-3.5 bg-slate-950/70 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="text-xs font-black text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Pedras de Evolução (Compradas no PokéMarket)</span>
                </h4>
                <div className="grid grid-cols-5 gap-2 text-center">
                  <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-lg">⚡</span>
                    <p className="text-[10px] font-bold text-white mt-1">Trovão</p>
                    <span className="text-xs font-black text-amber-300">{inventory.thunderStones || 0}</span>
                  </div>
                  <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-lg">💧</span>
                    <p className="text-[10px] font-bold text-white mt-1">Água</p>
                    <span className="text-xs font-black text-sky-300">{inventory.waterStones || 0}</span>
                  </div>
                  <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-lg">🔥</span>
                    <p className="text-[10px] font-bold text-white mt-1">Fogo</p>
                    <span className="text-xs font-black text-orange-300">{inventory.fireStones || 0}</span>
                  </div>
                  <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-lg">🍃</span>
                    <p className="text-[10px] font-bold text-white mt-1">Folha</p>
                    <span className="text-xs font-black text-emerald-300">{inventory.leafStones || 0}</span>
                  </div>
                  <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-lg">🌙</span>
                    <p className="text-[10px] font-bold text-white mt-1">Lua</p>
                    <span className="text-xs font-black text-pink-300">{inventory.moonStones || 0}</span>
                  </div>
                </div>
              </div>

              {/* Market Call to Action */}
              <div className="p-4 bg-gradient-to-r from-amber-950/60 to-yellow-950/40 border-2 border-amber-500/50 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center text-2xl font-black shrink-0 shadow">
                    🛍️
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-amber-300">PokéMarket da Vila do Saber</h4>
                    <p className="text-xs text-slate-300">
                      Use as moedas conquistadas nas missões escolares para comprar Pokébolas, Poções e Pedras de Evolução!
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onOpenMarket();
                  }}
                  className="btn-game px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-black shadow inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Ir às Compras</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: STOLEN POKEMON RESCUE */}
          {activeTab === "stolen" && (
            <div className="space-y-3">
              <div className="p-3 bg-rose-950/40 border border-rose-500/40 rounded-2xl text-xs text-rose-200">
                A Equipe Rocket capturou estes Pokémon! Desafie os capangas para resgatá-los!
              </div>

              <div className="space-y-2">
                {stolenList.map((stolen) => (
                  <div
                    key={stolen.id}
                    className="p-3 bg-slate-800/80 border border-rose-500/30 rounded-2xl flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center p-1 border border-white/20">
                        <img
                          src={stolen.artworkUrl || stolen.spriteUrl}
                          alt={stolen.name}
                          className="w-10 h-10 object-contain grayscale opacity-60"
                        />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-white">{stolen.name}</h4>
                        <p className="text-[10px] text-rose-300">Em cativeiro no Esconderijo Rocket</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenRocketRescue();
                      }}
                      className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-black cursor-pointer shadow"
                    >
                      Resgatar Agora
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
