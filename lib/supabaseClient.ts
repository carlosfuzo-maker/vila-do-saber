import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { ProfileId, RpgSaveData, StudentYear } from "@/app/rpg/rpgTypes";
import { getPokemonArtworkUrl, getPokemonSpriteUrl, getPokemonAnimatedUrl } from "@/app/rpg/data/kantoPokedex";

// Storage keys
export const SUPABASE_URL_KEY = "vila_supabase_url";
export const SUPABASE_ANON_KEY = "vila_supabase_anon_key";
export const ACTIVE_PROFILE_KEY = "vila_rpg_active_profile";
export const MASTER_RESET_KEY = "vila_master_reset_v3_nov2026";

/**
 * Returns Supabase credentials from environment variables or client-side custom config.
 */
export function getSupabaseCredentials(): { url: string; anonKey: string; isCustom: boolean } {
  let url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  let anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  let isCustom = false;

  if (typeof window !== "undefined") {
    const customUrl = localStorage.getItem(SUPABASE_URL_KEY);
    const customKey = localStorage.getItem(SUPABASE_ANON_KEY);
    if (customUrl && customKey) {
      url = customUrl.trim();
      anonKey = customKey.trim();
      isCustom = true;
    }
  }

  if (url) {
    url = url.trim().replace(/\/rest\/v1\/?.*$/i, "").replace(/\/+$/, "");
  }

  return { url, anonKey, isCustom };
}

let cachedClient: SupabaseClient | null = null;
let lastUsedUrl = "";
let lastUsedKey = "";

/**
 * Get or create the Supabase client instance.
 */
export function getSupabaseClient(): SupabaseClient | null {
  const { url, anonKey } = getSupabaseCredentials();

  if (!url || !anonKey || url.includes("your-project-id") || !url.startsWith("http")) {
    return null;
  }

  if (cachedClient && lastUsedUrl === url && lastUsedKey === anonKey) {
    return cachedClient;
  }

  try {
    cachedClient = createClient(url, anonKey, {
      auth: { persistSession: false },
    });
    lastUsedUrl = url;
    lastUsedKey = anonKey;
    return cachedClient;
  } catch (err) {
    console.error("Failed to initialize Supabase client:", err);
    return null;
  }
}

/**
 * Save custom Supabase credentials directly in localStorage.
 */
export function saveCustomSupabaseConfig(url: string, anonKey: string) {
  if (typeof window === "undefined") return;
  if (!url || !anonKey) {
    localStorage.removeItem(SUPABASE_URL_KEY);
    localStorage.removeItem(SUPABASE_ANON_KEY);
  } else {
    localStorage.setItem(SUPABASE_URL_KEY, url.trim());
    localStorage.setItem(SUPABASE_ANON_KEY, anonKey.trim());
  }
  cachedClient = null;
  lastUsedUrl = "";
  lastUsedKey = "";
}

/**
 * Test connectivity with Supabase.
 */
export async function testSupabaseConnection(): Promise<{ ok: boolean; message: string }> {
  const client = getSupabaseClient();
  if (!client) {
    return {
      ok: false,
      message: "Credenciais do Supabase não configuradas no sistema.",
    };
  }

  try {
    const { error } = await client.from("rpg_profiles").select("id").limit(1);
    if (error) {
      // If table doesn't exist yet, connection is still valid, but table is missing
      if (error.code === "42P01" || error.message?.includes("relation \"rpg_profiles\" does not exist")) {
        return {
          ok: false,
          message: "Conexão OK, mas a tabela 'rpg_profiles' ainda não foi criada no Supabase. Execute o script SQL no painel.",
        };
      }
      return { ok: false, message: `Erro do Supabase: ${error.message}` };
    }
    return { ok: true, message: "Conexão com Supabase estabelecida com sucesso!" };
  } catch (err: any) {
    return { ok: false, message: `Falha de rede: ${err?.message || "Não foi possível conectar"}` };
  }
}

/**
 * Default game state for a new sister profile.
 * Starts directly on the 2nd Floor of Casa da Família (Pallet Town),
 * with clean initial coins, 0 inventory, empty Pokémon list, and empty question history,
 * awaiting the opening narrative with Papai Carlos.
 */
export function getDefaultProfileSave(profileId: ProfileId): RpgSaveData {
  const isCecilia = profileId === "cecilia";
  const year: StudentYear = isCecilia ? 4 : 2;

  return {
    id: profileId,
    playerName: isCecilia ? "Cecília" : "Bianca",
    year,
    pin: isCecilia ? "4444" : "2222",
    x: 2,
    y: isCecilia ? 6 : 5,
    direction: "down",
    currentZone: "Casa da Família • Quarto das Meninas",
    coins: 20,
    xp: 0,
    inventory: {
      pokeballs: 0,
      potions: 0,
      antidotes: 0,
      berries: 0,
      thunderStones: 0,
      waterStones: 0,
      fireStones: 0,
      leafStones: 0,
      moonStones: 0,
    },
    pokemonList: [],
    stolenPokemonList: [],
    unlockedRoutes: {
      matematica: false,
      ciencias: false,
      portugues: false,
      ingles: false,
    },
    explorerSkills: {
      surf: false,
      cut: false,
      flash: false,
      smash: false,
    },
    gymBadges: {
      math_boulder: false,
      science_cascade: false,
      portuguese_rainbow: false,
      english_thunder: false,
    },
    customization: {
      hairStyle: isCecilia ? "ponytail" : "straight",
      hairColor: isCecilia ? "#4a2e18" : "#eab308",
      skinTone: "#fed7aa",
      eyeColor: isCecilia ? "#451a03" : "#0284c7",
      outfitId: "firered_classic",
      hatId: "red_cap",
      accessoryId: "explorer_backpack",
    },
    unlockedWardrobeItems: ["firered_classic", "red_cap", "explorer_backpack"],
    activeQuest: null,
    phoneMessages: [],
    rivalConfig: {
      name: "Gary",
      gender: "boy",
      starterPokedexId: isCecilia ? 4 : 1,
      defeatedEncounters: [],
    },
    answeredQuestionIds: [],
    completedSchoolChapters: [],
    wildHuntQuota: 0,
    tutorialStep: 1,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Resets BOTH sisters' profiles (Cecília & Bianca) completely to zero
 * in localStorage AND in Supabase cloud (if configured), plus clears live sync.
 */
export async function resetAllProfilesToZero(): Promise<{
  success: boolean;
  cloudReset: boolean;
}> {
  const ceciliaFresh = getDefaultProfileSave("cecilia");
  const biancaFresh = getDefaultProfileSave("bianca");

  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem("vila_rpg_save_cecilia");
      localStorage.removeItem("vila_rpg_save_bianca");
      localStorage.removeItem("vila_exams");
      localStorage.removeItem(ACTIVE_PROFILE_KEY);
      localStorage.removeItem("rpg_active_profile");
      localStorage.setItem("vila_rpg_save_cecilia", JSON.stringify(ceciliaFresh));
      localStorage.setItem("vila_rpg_save_bianca", JSON.stringify(biancaFresh));
      localStorage.setItem(MASTER_RESET_KEY, "done");
    } catch (e) {
      console.warn("Error resetting local storage:", e);
    }

    // Clear server in-memory multiplayer state
    fetch("/api/rpg/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resetAll: true }),
    }).catch(() => {});
  }

  const client = getSupabaseClient();
  if (!client) {
    return { success: true, cloudReset: false };
  }

  try {
    const [resC, resB] = await Promise.all([
      saveProfileSave(ceciliaFresh),
      saveProfileSave(biancaFresh),
    ]);
    return {
      success: true,
      cloudReset: Boolean(resC.cloudSaved && resB.cloudSaved),
    };
  } catch (err) {
    console.warn("Failed to reset profiles in Supabase:", err);
    return { success: true, cloudReset: false };
  }
}

/**
 * Loads a profile from Supabase (with fallback to localStorage cache).
 */
export async function loadProfileSave(profileId: ProfileId): Promise<{
  data: RpgSaveData;
  fromCloud: boolean;
}> {
  // Execute one-time master reset (local + Supabase cloud) so both sisters start from zero
  if (typeof window !== "undefined") {
    try {
      if (localStorage.getItem(MASTER_RESET_KEY) !== "done") {
        await resetAllProfilesToZero();
        const freshDefault = getDefaultProfileSave(profileId);
        return { data: freshDefault, fromCloud: false };
      }
    } catch (e) {
      console.warn("Master reset migration error:", e);
    }
  }

  const localKey = `vila_rpg_save_${profileId}`;
  let localData: RpgSaveData | null = null;

  if (typeof window !== "undefined") {
    try {
      const cached = localStorage.getItem(localKey);
      if (cached) {
        localData = JSON.parse(cached);
      }
    } catch (e) {
      console.warn("Failed to read local cache:", e);
    }
  }

  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from("rpg_profiles")
        .select("*")
        .eq("id", profileId)
        .single();

      if (!error && data) {
        // Map database row to RpgSaveData
        const cloudData: RpgSaveData = {
          id: data.id as ProfileId,
          playerName: data.player_name,
          year: Number(data.year) as StudentYear,
          pin: data.pin || (profileId === "cecilia" ? "4444" : "2222"),
          x: typeof data.x === "number" ? data.x : 20,
          y: typeof data.y === "number" ? data.y : 29,
          direction: data.direction || "up",
          currentZone: data.current_zone || "Vila da Família",
          coins: typeof data.coins === "number" ? data.coins : 20,
          xp: typeof data.xp === "number" ? data.xp : 0,
          inventory: data.inventory || {},
          pokemonList: Array.isArray(data.pokemon_list) ? data.pokemon_list : [],
          stolenPokemonList: Array.isArray(data.stolen_pokemon_list) ? data.stolen_pokemon_list : [],
          unlockedRoutes: data.unlocked_routes || {},
          explorerSkills: data.explorer_skills || { surf: false, cut: false, flash: false, smash: false },
          gymBadges: data.gym_badges || { math_boulder: false, science_cascade: false, portuguese_rainbow: false, english_thunder: false },
          customization: data.customization || {},
          unlockedWardrobeItems: Array.isArray(data.unlocked_wardrobe_items) ? data.unlocked_wardrobe_items : [],
          activeQuest: data.active_quest || null,
          phoneMessages: Array.isArray(data.phone_messages) ? data.phone_messages : [],
          rivalConfig: data.rival_config || null,
          answeredQuestionIds: Array.isArray(data.answered_question_ids) ? data.answered_question_ids : [],
          completedSchoolChapters: localData?.completedSchoolChapters || [],
          wildHuntQuota: typeof localData?.wildHuntQuota === "number" ? localData.wildHuntQuota : 0,
          updatedAt: data.updated_at || new Date().toISOString(),
        };

        // Cache in localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem(localKey, JSON.stringify(cloudData));
        }

        return { data: cloudData, fromCloud: true };
      }
    } catch (err) {
      console.warn("Supabase fetch failed, falling back to local storage:", err);
    }
  }

  if (localData) {
    return { data: localData, fromCloud: false };
  }

  // First time starting: return default
  const defaultData = getDefaultProfileSave(profileId);
  if (typeof window !== "undefined") {
    localStorage.setItem(localKey, JSON.stringify(defaultData));
  }
  return { data: defaultData, fromCloud: false };
}

/**
 * Saves profile data to localStorage and asynchronously to Supabase.
 */
export async function saveProfileSave(saveData: RpgSaveData): Promise<{
  success: boolean;
  cloudSaved: boolean;
  error?: string;
}> {
  const localKey = `vila_rpg_save_${saveData.id}`;

  // 1. Always save locally immediately
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(localKey, JSON.stringify(saveData));
    } catch (e) {
      console.warn("Local storage write failed:", e);
    }
  }

  // 2. Sync to Supabase
  const client = getSupabaseClient();
  if (!client) {
    return {
      success: true,
      cloudSaved: false,
      error: "Supabase não conectado. Progresso salvo localmente com segurança no dispositivo.",
    };
  }

  try {
    const dbPayload = {
      id: saveData.id,
      player_name: saveData.playerName,
      year: saveData.year,
      pin: saveData.pin,
      x: saveData.x,
      y: saveData.y,
      direction: saveData.direction,
      current_zone: saveData.currentZone,
      coins: saveData.coins,
      xp: saveData.xp,
      inventory: saveData.inventory,
      pokemon_list: saveData.pokemonList,
      stolen_pokemon_list: saveData.stolenPokemonList,
      unlocked_routes: saveData.unlockedRoutes,
      explorer_skills: saveData.explorerSkills,
      gym_badges: saveData.gymBadges,
      customization: saveData.customization,
      unlocked_wardrobe_items: saveData.unlockedWardrobeItems,
      active_quest: saveData.activeQuest,
      phone_messages: saveData.phoneMessages,
      rival_config: saveData.rivalConfig,
      answered_question_ids: saveData.answeredQuestionIds || [],
      updated_at: new Date().toISOString(),
    };

    const { error } = await client.from("rpg_profiles").upsert(dbPayload, {
      onConflict: "id",
    });

    if (error) {
      console.warn("Supabase upsert error:", error);
      return {
        success: true,
        cloudSaved: false,
        error: error.message,
      };
    }

    return {
      success: true,
      cloudSaved: true,
    };
  } catch (err: any) {
    console.warn("Supabase network error:", err);
    return {
      success: true,
      cloudSaved: false,
      error: err?.message || "Erro de rede ao salvar na nuvem.",
    };
  }
}
