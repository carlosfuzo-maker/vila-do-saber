import {
  KANTO_POKEDEX_151,
  KantoPokemonData,
  RarityTier,
  getPokemonArtworkUrl,
  getPokemonSpriteUrl,
  getPokemonAnimatedUrl,
} from "./kantoPokedex";
import { JOHTO_POKEDEX_100, JohtoPokemonData } from "./johtoPokedex";
import { HOENN_POKEDEX_135, HoennPokemonData } from "./hoennPokedex";
import { SINNOH_POKEDEX_107, SinnohPokemonData } from "./sinnohPokedex";
import { UNOVA_POKEDEX_156, UnovaPokemonData } from "./unovaPokedex";
import { MODERN_POKEDEX_376, ModernPokemonData } from "./modernPokedex";

export type RpgGeneration = 1 | 2 | 3 | 4 | 5 | 6;
export type RpgRegionId =
  | "kanto"
  | "johto"
  | "hoenn"
  | "sinnoh"
  | "unova"
  | "modern"
  | "portuguese"
  | "english"
  | "neutral";

export type AnyRegionalPokemon =
  | KantoPokemonData
  | JohtoPokemonData
  | HoennPokemonData
  | SinnohPokemonData
  | UnovaPokemonData
  | ModernPokemonData;

// Get complete list of all implemented Pokémon across all generations (#1 to #1025)
export const ALL_REGIONAL_POKEMON: AnyRegionalPokemon[] = [
  ...KANTO_POKEDEX_151,
  ...JOHTO_POKEDEX_100,
  ...HOENN_POKEDEX_135,
  ...SINNOH_POKEDEX_107,
  ...UNOVA_POKEDEX_156,
  ...MODERN_POKEDEX_376,
];

// Look up any Pokémon by its universal Pokédex ID (1 to 1025)
export function getRegionalPokemonById(pokedexId: number): AnyRegionalPokemon | undefined {
  return ALL_REGIONAL_POKEMON.find((p) => p.pokedexId === pokedexId);
}

// Pools for Kanto (Gen 1: #1 to #151)
export function getKantoLandPool(): KantoPokemonData[] {
  return KANTO_POKEDEX_151.filter((p) => !p.isWaterType);
}

export function getKantoWaterPool(): KantoPokemonData[] {
  return KANTO_POKEDEX_151.filter((p) => p.isWaterType);
}

// Pools for Johto (Gen 2: #152 to #251)
export function getJohtoLandPool(): JohtoPokemonData[] {
  return JOHTO_POKEDEX_100.filter((p) => !p.isWaterType);
}

export function getJohtoWaterPool(): JohtoPokemonData[] {
  return JOHTO_POKEDEX_100.filter((p) => p.isWaterType);
}

// Pools for Hoenn (Gen 3: #252 to #386)
export function getHoennLandPool(): HoennPokemonData[] {
  return HOENN_POKEDEX_135.filter((p) => !p.isWaterType);
}

export function getHoennWaterPool(): HoennPokemonData[] {
  return HOENN_POKEDEX_135.filter((p) => p.isWaterType);
}

// Pools for Sinnoh (Gen 4: #387 to #493)
export function getSinnohLandPool(): SinnohPokemonData[] {
  return SINNOH_POKEDEX_107.filter((p) => !p.isWaterType);
}

export function getSinnohWaterPool(): SinnohPokemonData[] {
  return SINNOH_POKEDEX_107.filter((p) => p.isWaterType);
}

// Pools for Unova (Gen 5: #494 to #649)
export function getUnovaLandPool(): UnovaPokemonData[] {
  return UNOVA_POKEDEX_156.filter((p) => !p.isWaterType);
}

export function getUnovaWaterPool(): UnovaPokemonData[] {
  return UNOVA_POKEDEX_156.filter((p) => p.isWaterType);
}

// Pools for Modern Generations (Gens 6 to 9: #650 to #1025)
export function getModernLandPool(): ModernPokemonData[] {
  return MODERN_POKEDEX_376.filter((p) => !p.isWaterType);
}

export function getModernWaterPool(): ModernPokemonData[] {
  return MODERN_POKEDEX_376.filter((p) => p.isWaterType);
}

/**
 * Weighted regional wild encounter generator:
 * - Respeita a Geração da Região:
 *    - Geração 1: Kanto (Vila da Família e Cidade dos Números)
 *    - Geração 2: Johto (Laboratório de Ciências)
 *    - Geração 3: Hoenn (Grande Biblioteca Encantada)
 *    - Geração 4: Sinnoh (Porto Global & English Hub)
 *    - Geração 5: Unova (Bosque Ecológico & Reserva dos Pets)
 *    - Geração 6: Modernas (Aeroporto & Agência Fuzo Viagens - Kalos, Alola, Galar, Paldea)
 * - Respeita se é terra seca ("T") ou água/surf ("W" / "U")
 * - Pesos por raridade:
 *    - Básicos (stage 1 / basic): Peso 100 (~88%)
 *    - Evoluídos (stage 2 / evolved): Peso 14 (~10%)
 *    - Raros / Lendários (stage 3 / rare): Peso 2 (~2%)
 */
export function getRegionalWeightedEncounter(
  generation: RpgGeneration,
  isWater: boolean
): AnyRegionalPokemon {
  let pool: AnyRegionalPokemon[];

  if (generation === 6) {
    pool = isWater ? getModernWaterPool() : getModernLandPool();
    if (!pool || pool.length === 0) pool = getModernLandPool();
  } else if (generation === 5) {
    pool = isWater ? getUnovaWaterPool() : getUnovaLandPool();
    if (!pool || pool.length === 0) pool = getUnovaLandPool();
  } else if (generation === 4) {
    pool = isWater ? getSinnohWaterPool() : getSinnohLandPool();
    if (!pool || pool.length === 0) pool = getSinnohLandPool();
  } else if (generation === 3) {
    pool = isWater ? getHoennWaterPool() : getHoennLandPool();
    if (!pool || pool.length === 0) pool = getHoennLandPool();
  } else if (generation === 2) {
    pool = isWater ? getJohtoWaterPool() : getJohtoLandPool();
    if (!pool || pool.length === 0) pool = getJohtoLandPool();
  } else {
    pool = isWater ? getKantoWaterPool() : getKantoLandPool();
    if (!pool || pool.length === 0) pool = getKantoLandPool();
  }

  const weights: Record<RarityTier, number> = {
    basic: 100,
    evolved: 14,
    rare: 2,
  };

  const totalWeight = pool.reduce((acc, p) => acc + (weights[p.rarityTier] || 10), 0);
  let random = Math.random() * totalWeight;

  for (const pokemon of pool) {
    const w = weights[pokemon.rarityTier] || 10;
    if (random < w) {
      return pokemon;
    }
    random -= w;
  }

  return pool[0];
}

export {
  getPokemonArtworkUrl,
  getPokemonSpriteUrl,
  getPokemonAnimatedUrl,
};
