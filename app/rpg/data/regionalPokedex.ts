import {
  KANTO_POKEDEX_151,
  KantoPokemonData,
  RarityTier,
  getPokemonArtworkUrl,
  getPokemonSpriteUrl,
  getPokemonAnimatedUrl,
  getPokemonSpawnCategory,
  rollOfficialSpawnCategory,
  OFFICIAL_SPAWN_RATES,
  getSpawnRateMeta,
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
 * - Respeita a Geração da Região (Kanto, Johto, Hoenn, Sinnoh, Unova, Modernas)
 * - Respeita se é terra seca ("T") ou água/surf ("W" / "U")
 * - Segue rigorosamente as Novas Taxas Oficiais de Spawn:
 *    - Comuns (common): 55% de chance
 *    - Incomuns (uncommon): 20% de chance
 *    - Difíceis (hard): 8% de chance
 *    - Raros (rare, ex: Dratini): 5% de chance
 *    - Épicos / Fósseis (epic): 1,5% de chance (obtidos via laboratório/eventos)
 *    - Lendários (legendary): 0,5% de chance (exclusivos de desafios finais e provas de maestria)
 */
export function getRegionalWeightedEncounter(
  generation: RpgGeneration,
  isWater: boolean,
  options?: { allowLegendary?: boolean; allowEpic?: boolean }
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

  const targetCategory = rollOfficialSpawnCategory(options);
  let categoryPool = pool.filter((p) => getPokemonSpawnCategory(p) === targetCategory);

  // Ensure Dratini (#147) is always part of the 5% Rare pool in Kanto/Gen 1
  if (targetCategory === "rare" && generation === 1) {
    const dratini = KANTO_POKEDEX_151.find((p) => p.pokedexId === 147);
    if (dratini && !categoryPool.some((p) => p.pokedexId === 147)) {
      categoryPool = [...categoryPool, dratini];
    }
  }

  // If the specific water/land subset has no Pokémon for that tier (e.g. water legendaries), search across the generation
  if (categoryPool.length === 0) {
    const fullGenPool =
      generation === 6
        ? MODERN_POKEDEX_376
        : generation === 5
        ? UNOVA_POKEDEX_156
        : generation === 4
        ? SINNOH_POKEDEX_107
        : generation === 3
        ? HOENN_POKEDEX_135
        : generation === 2
        ? JOHTO_POKEDEX_100
        : KANTO_POKEDEX_151;
    categoryPool = fullGenPool.filter((p) => getPokemonSpawnCategory(p) === targetCategory);
  }

  if (categoryPool.length === 0) {
    categoryPool = pool;
  }

  const chosen = categoryPool[Math.floor(Math.random() * categoryPool.length)] || pool[0];
  return chosen;
}

export {
  getPokemonArtworkUrl,
  getPokemonSpriteUrl,
  getPokemonAnimatedUrl,
  getPokemonSpawnCategory,
  rollOfficialSpawnCategory,
  OFFICIAL_SPAWN_RATES,
  getSpawnRateMeta,
};
