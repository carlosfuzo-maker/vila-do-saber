// ========================================================
// KANTO WORLD DATA (OFFICIAL POKÉMON FIRE RED EDITION)
// Full Interconnected Map Network (10 Cities & All Routes)
// 16x16 Pixel Art Grid Scale • Strict Y-Sorting Depth Architecture
// ========================================================

export const MAP_COLS = 160;
export const MAP_ROWS = 180;
export const TILE_SIZE = 40;

export interface KantoZoneInfo {
  name: string;
  subtitle: string;
  icon: string;
  region: "kanto" | "johto" | "hoenn" | "sinnoh" | "unova";
  generation: 1 | 2 | 3 | 4 | 5;
}

export interface KantoBuildingDef {
  id: string;
  type: "house" | "center" | "mart";
  city: string;
  name: string;
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  doorX: number;
  doorY: number;
  returnX: number;
  returnY: number;
}

export interface ProtectedDoor {
  id: string;
  doorX: number;
  doorY: number;
  returnX: number;
  returnY: number;
}

export interface SignpostDef {
  x: number;
  y: number;
  title: string;
  lines: string[];
  isQuestEvent?: boolean;
  forceBlock?: boolean;
}

// ========================================================
// 1. ALL BUILDINGS ACROSS KANTO (10 CITIES & LANDMARKS)
// ========================================================
export const KANTO_BUILDINGS: KantoBuildingDef[] = [
  // 1. PALLET TOWN (Vila da Família)
  { id: "family_house", type: "house", city: "Pallet Town", name: "Casa da Família (Ash & Red)", x0: 30, y0: 150, x1: 34, y1: 153, doorX: 32, doorY: 153, returnX: 32, returnY: 154 },
  { id: "rival_house", type: "house", city: "Pallet Town", name: "Casa do Rival (Gary & Daisy)", x0: 40, y0: 150, x1: 44, y1: 153, doorX: 42, doorY: 153, returnX: 42, returnY: 154 },
  { id: "oak_lab", type: "center", city: "Pallet Town", name: "Laboratório do Prof. Carvalho", x0: 38, y0: 157, x1: 44, y1: 160, doorX: 41, doorY: 160, returnX: 41, returnY: 161 },

  // 2. VIRIDIAN CITY (Metrópole do Saber)
  { id: "science_lab", type: "center", city: "Viridian City", name: "Centro Pokémon de Viridian", x0: 25, y0: 111, x1: 29, y1: 114, doorX: 27, doorY: 114, returnX: 27, returnY: 115 },
  { id: "pokemart", type: "mart", city: "Viridian City", name: "PokéMart de Viridian", x0: 39, y0: 111, x1: 43, y1: 114, doorX: 41, doorY: 114, returnX: 41, returnY: 115 },
  { id: "math_academy", type: "center", city: "Viridian City", name: "Escola de Treinadores • Matemática", x0: 24, y0: 101, x1: 29, y1: 104, doorX: 26, doorY: 104, returnX: 26, returnY: 105 },
  { id: "english_tower", type: "house", city: "Viridian City", name: "Ginásio de Viridian • English Hub", x0: 38, y0: 101, x1: 43, y1: 104, doorX: 40, doorY: 104, returnX: 40, returnY: 105 },
  { id: "portuguese_lib", type: "house", city: "Viridian City", name: "Grande Biblioteca Encantada", x0: 21, y0: 115, x1: 25, y1: 118, doorX: 23, doorY: 118, returnX: 23, returnY: 119 },
  { id: "insect_forest", type: "house", city: "Viridian City", name: "Portão da Floresta dos Insetos", x0: 32, y0: 90, x1: 36, y1: 92, doorX: 34, doorY: 92, returnX: 34, returnY: 93 },

  // 3. PEWTER CITY (Cidade das Rochas & Museu de Ciências)
  { id: "pewter_museum", type: "center", city: "Pewter City", name: "Museu de Ciências & Fósseis de Pewter", x0: 30, y0: 38, x1: 37, y1: 41, doorX: 34, doorY: 41, returnX: 34, returnY: 42 },
  { id: "pewter_gym", type: "center", city: "Pewter City", name: "Ginásio de Rocha de Pewter (Brock)", x0: 24, y0: 46, x1: 29, y1: 49, doorX: 27, doorY: 49, returnX: 27, returnY: 50 },
  { id: "pewter_center", type: "center", city: "Pewter City", name: "Centro Pokémon de Pewter", x0: 38, y0: 46, x1: 42, y1: 49, doorX: 40, doorY: 49, returnX: 40, returnY: 50 },
  { id: "pewter_mart", type: "mart", city: "Pewter City", name: "PokéMart de Pewter", x0: 44, y0: 46, x1: 48, y1: 49, doorX: 46, doorY: 49, returnX: 46, returnY: 50 },

  // 4. MT. MOON & ROUTE 4 (Caverna dos Fósseis)
  { id: "fossil_cave", type: "house", city: "Mt. Moon", name: "Entrada do Monte da Lua • Fósseis", x0: 80, y0: 40, x1: 86, y1: 43, doorX: 83, doorY: 43, returnX: 83, returnY: 44 },
  { id: "mt_moon_center", type: "center", city: "Mt. Moon", name: "Centro Pokémon do Mt. Moon", x0: 74, y0: 42, x1: 78, y1: 45, doorX: 76, doorY: 45, returnX: 76, returnY: 46 },

  // 5. CERULEAN CITY (Cidade Aquática & Bicicletas)
  { id: "cerulean_gym", type: "center", city: "Cerulean City", name: "Ginásio Aquático de Cerulean (Misty)", x0: 104, y0: 46, x1: 109, y1: 49, doorX: 106, doorY: 49, returnX: 106, returnY: 50 },
  { id: "bike_shop", type: "mart", city: "Cerulean City", name: "Loja Oficial de Bicicletas (Bike Shop)", x0: 112, y0: 46, x1: 116, y1: 49, doorX: 114, doorY: 49, returnX: 114, returnY: 50 },
  { id: "cerulean_center", type: "center", city: "Cerulean City", name: "Centro Pokémon de Cerulean", x0: 100, y0: 40, x1: 104, y1: 43, doorX: 102, doorY: 43, returnX: 102, returnY: 44 },
  { id: "cerulean_mart", type: "mart", city: "Cerulean City", name: "PokéMart de Cerulean", x0: 118, y0: 40, x1: 122, y1: 43, doorX: 120, doorY: 43, returnX: 120, returnY: 44 },
  { id: "bill_cottage", type: "house", city: "Route 25", name: "Casa do Bill (Pesquisa Genética & Eevee)", x0: 126, y0: 14, x1: 131, y1: 17, doorX: 128, doorY: 17, returnX: 128, returnY: 18 },

  // 6. CELADON CITY (Grande Shopping & Botânica)
  { id: "celadon_dept_store", type: "mart", city: "Celadon City", name: "Grande Shopping de Celadon (5 Andares)", x0: 58, y0: 78, x1: 66, y1: 82, doorX: 62, doorY: 82, returnX: 62, returnY: 83 },
  { id: "celadon_gym", type: "center", city: "Celadon City", name: "Ginásio de Planta de Celadon (Erika)", x0: 62, y0: 88, x1: 67, y1: 91, doorX: 64, doorY: 91, returnX: 64, returnY: 92 },
  { id: "celadon_mansion", type: "house", city: "Celadon City", name: "Mansão de Celadon (Game Freak)", x0: 72, y0: 78, x1: 77, y1: 81, doorX: 74, doorY: 81, returnX: 74, returnY: 82 },
  { id: "celadon_center", type: "center", city: "Celadon City", name: "Centro Pokémon de Celadon", x0: 80, y0: 84, x1: 84, y1: 87, doorX: 82, doorY: 87, returnX: 82, returnY: 88 },

  // 7. SAFFRON CITY (Metrópole Central & Silph Co.)
  { id: "silph_co", type: "center", city: "Saffron City", name: "Edifício Corporativo Silph Co.", x0: 110, y0: 80, x1: 118, y1: 85, doorX: 114, doorY: 85, returnX: 114, returnY: 86 },
  { id: "saffron_gym", type: "center", city: "Saffron City", name: "Ginásio Psíquico de Saffron (Sabrina)", x0: 121, y0: 78, x1: 126, y1: 81, doorX: 123, doorY: 81, returnX: 123, returnY: 82 },
  { id: "fighting_dojo", type: "house", city: "Saffron City", name: "Dojo de Artes Marciais de Saffron", x0: 115, y0: 78, x1: 119, y1: 81, doorX: 117, doorY: 81, returnX: 117, returnY: 82 },
  { id: "saffron_center", type: "center", city: "Saffron City", name: "Centro Pokémon de Saffron", x0: 103, y0: 86, x1: 107, y1: 89, doorX: 105, doorY: 89, returnX: 105, returnY: 90 },
  { id: "saffron_mart", type: "mart", city: "Saffron City", name: "PokéMart de Saffron", x0: 121, y0: 86, x1: 125, y1: 89, doorX: 123, doorY: 89, returnX: 123, returnY: 90 },

  // 8. VERMILION CITY (Cidade Portuária & Navio S.S. Anne)
  { id: "vermilion_gym", type: "center", city: "Vermilion City", name: "Ginásio Elétrico de Vermilion (Lt. Surge)", x0: 104, y0: 122, x1: 109, y1: 125, doorX: 106, doorY: 125, returnX: 106, returnY: 126 },
  { id: "pokemon_fan_club", type: "house", city: "Vermilion City", name: "Clube dos Fãs de Pokémon", x0: 112, y0: 122, x1: 116, y1: 125, doorX: 114, doorY: 125, returnX: 114, returnY: 126 },
  { id: "vermilion_center", type: "center", city: "Vermilion City", name: "Centro Pokémon de Vermilion", x0: 103, y0: 117, x1: 107, y1: 120, doorX: 105, doorY: 120, returnX: 105, returnY: 121 },
  { id: "vermilion_mart", type: "mart", city: "Vermilion City", name: "PokéMart de Vermilion", x0: 119, y0: 117, x1: 123, y1: 120, doorX: 121, doorY: 120, returnX: 121, returnY: 121 },
  { id: "ss_anne_dock", type: "house", city: "Vermilion City", name: "Cais do Porto • Navio Transatlântico S.S. Anne", x0: 110, y0: 131, x1: 116, y1: 134, doorX: 113, doorY: 134, returnX: 113, returnY: 135 },

  // 9. FUCHSIA CITY (Safari Zone / Biologia & Zoo)
  { id: "safari_zone_gate", type: "center", city: "Fuchsia City", name: "Safari Zone • Centro de Preservação & Biologia", x0: 108, y0: 138, x1: 115, y1: 141, doorX: 111, doorY: 141, returnX: 111, returnY: 142 },
  { id: "fuchsia_gym", type: "center", city: "Fuchsia City", name: "Ginásio de Veneno de Fuchsia (Koga)", x0: 98, y0: 147, x1: 103, y1: 150, doorX: 100, doorY: 150, returnX: 100, returnY: 151 },
  { id: "fuchsia_center", type: "center", city: "Fuchsia City", name: "Centro Pokémon de Fuchsia", x0: 106, y0: 147, x1: 110, y1: 150, doorX: 108, doorY: 150, returnX: 108, returnY: 151 },
  { id: "fuchsia_mart", type: "mart", city: "Fuchsia City", name: "PokéMart de Fuchsia", x0: 113, y0: 147, x1: 117, y1: 150, doorX: 115, doorY: 150, returnX: 115, returnY: 151 },

  // 10. CINNABAR ISLAND (Ilha dos Fósseis & Vulcão)
  { id: "fossil_lab", type: "center", city: "Cinnabar Island", name: "Laboratório de Fósseis & Química de Cinnabar", x0: 24, y0: 167, x1: 30, y1: 170, doorX: 27, doorY: 170, returnX: 27, returnY: 171 },
  { id: "cinnabar_gym", type: "center", city: "Cinnabar Island", name: "Ginásio Vulcânico de Cinnabar (Blaine)", x0: 35, y0: 167, x1: 40, y1: 170, doorX: 37, doorY: 170, returnX: 37, returnY: 171 },
  { id: "cinnabar_center", type: "center", city: "Cinnabar Island", name: "Centro Pokémon de Cinnabar", x0: 25, y0: 173, x1: 29, y1: 176, doorX: 27, doorY: 176, returnX: 27, returnY: 177 },
  { id: "cinnabar_mart", type: "mart", city: "Cinnabar Island", name: "PokéMart de Cinnabar", x0: 32, y0: 173, x1: 36, y1: 176, doorX: 34, doorY: 176, returnX: 34, returnY: 177 },

  // 11. INDIGO PLATEAU (Cúpula dos Campeões / Provas Finais)
  { id: "indigo_plateau", type: "center", city: "Indigo Plateau", name: "Indigo Plateau • Palácio da Liga Pokémon", x0: 16, y0: 13, x1: 24, y1: 18, doorX: 20, doorY: 18, returnX: 20, returnY: 19 },
];

// ========================================================
// 2. ANTI-BLOCK SAFETY GUARD: PROTECTED DOORS
// ========================================================
export const PROTECTED_BUILDING_DOORS: ProtectedDoor[] = KANTO_BUILDINGS.map((b) => ({
  id: b.id,
  doorX: b.doorX,
  doorY: b.doorY,
  returnX: b.returnX,
  returnY: b.returnY,
}));

export function isProtectedDoorZone(x: number, y: number): boolean {
  return PROTECTED_BUILDING_DOORS.some(
    (b) =>
      (x === b.doorX && y === b.doorY) ||
      (x === b.doorX && y === b.doorY + 1) ||
      (x === b.returnX && y === b.returnY)
  );
}

// ========================================================
// 3. COMPLETE SIGNPOSTS ACROSS ALL CITIES & ROUTES
// ========================================================
export const KANTO_SIGNPOSTS: SignpostDef[] = [
  // Pallet Town
  {
    x: 35,
    y: 155,
    title: "🏡 Vila da Família • Pallet Town",
    lines: [
      "Lar de Papai Carlos, Mamãe Renata, Cecília e Bianca.",
      "Um recanto de paz, carinho e amor onde toda jornada começa!",
    ],
  },
  {
    x: 43,
    y: 162,
    title: "🔬 Laboratório do Prof. Carvalho",
    lines: [
      "Pesquisas biológicas, catalogação de Pokémon e entrega da Pokédex oficial.",
    ],
  },

  // Route 1
  {
    x: 35,
    y: 142,
    title: "▲ Rota 1 (Estrada de Pallet para Viridian)",
    lines: [
      "Trilha sinuosa com degraus de salto e grama alta cheia de Pidgey e Rattata.",
    ],
  },

  // Viridian City
  {
    x: 34,
    y: 115,
    title: "🏛️ Cidade de Viridian • A Metrópole do Saber",
    lines: [
      "A primeira grande cidade de Kanto: Centro, PokéMart, Biblioteca e Academias.",
      "Acesso ao Norte pela Floresta de Viridian e ao Oeste pela Rota 22.",
    ],
  },
  {
    x: 34,
    y: 94,
    title: "🌲 Portão Norte: Floresta de Viridian",
    lines: [
      "Acesso ao labirinto dos insetos (Viridian Forest) e atalho para Pewter City.",
    ],
  },

  // Pewter City
  {
    x: 34,
    y: 43,
    title: "🏛️ Museu de Ciências & Fósseis de Pewter",
    lines: [
      "História natural da Terra, fósseis de Kabuto e pedras lunares do espaço!",
    ],
  },
  {
    x: 27,
    y: 51,
    title: "🪨 Ginásio de Rocha de Pewter • Líder Brock",
    lines: [
      "Geologia, minerais, ciências da Terra e a Insígnia da Rocha!",
    ],
  },

  // Mt. Moon / Route 3 & 4
  {
    x: 83,
    y: 45,
    title: "⛏️ Monte da Lua • Caverna dos Fósseis",
    lines: [
      "Misteriosa caverna rica em cristais subterrâneos, Clefairy e fósseis ancestrais.",
    ],
  },

  // Cerulean City
  {
    x: 106,
    y: 51,
    title: "💧 Ginásio Aquático de Cerulean • Líder Misty",
    lines: [
      "Ecossistemas aquáticos, hidrologia, física dos fluidos e a Insígnia da Cascata!",
    ],
  },
  {
    x: 114,
    y: 51,
    title: "🚲 Loja Oficial de Bicicletas de Kanto",
    lines: [
      "Pedale em alta velocidade pelas rotas e pela famosa Cycling Road!",
    ],
  },
  {
    x: 111,
    y: 28,
    title: "🌉 Rota 24 • A Famosa Ponte Pepita",
    lines: [
      "Supere os 5 treinadores sobre a ponte dourada para alcançar a Casa do Bill!",
    ],
  },

  // Celadon City
  {
    x: 62,
    y: 84,
    title: "🏬 Grande Shopping de Celadon (Department Store)",
    lines: [
      "5 andares repletos de itens de evolução, Poções, Pedras e acessórios raros!",
    ],
  },
  {
    x: 64,
    y: 93,
    title: "🌿 Ginásio de Planta de Celadon • Líder Erika",
    lines: [
      "Botânica, fotossíntese, preservação da flora e a Insígnia do Arco-Íris!",
    ],
  },

  // Saffron City
  {
    x: 114,
    y: 87,
    title: "🏢 Edifício Corporativo Silph Co. (Saffron)",
    lines: [
      "Maior empresa de alta tecnologia de Kanto: criadores da Master Ball e do Silph Scope!",
    ],
  },
  {
    x: 123,
    y: 83,
    title: "🔮 Ginásio Psíquico de Saffron • Líder Sabrina",
    lines: [
      "Neurociência, raciocínio lógico, foco mental e a Insígnia do Pântano!",
    ],
  },

  // Vermilion City
  {
    x: 106,
    y: 127,
    title: "⚡ Ginásio Elétrico de Vermilion • Líder Lt. Surge",
    lines: [
      "Eletromagnetismo, circuitos em série e a Insígnia do Trovão!",
    ],
  },
  {
    x: 113,
    y: 136,
    title: "🚢 Cais do Porto de Vermilion • Navio S.S. Anne",
    lines: [
      "Transatlântico de luxo que atraca uma vez ao ano trazendo treinadores do mundo todo!",
    ],
  },

  // Fuchsia City
  {
    x: 111,
    y: 143,
    title: "🦏 Safari Zone de Fuchsia • Reserva Ecológica",
    lines: [
      "Biologia comparada, conservação de espécies em extinção e capturas sem batalha!",
    ],
  },
  {
    x: 100,
    y: 152,
    title: "☠️ Ginásio Venenoso de Fuchsia • Líder Koga",
    lines: [
      "Toxicologia, defesas imunológicas na natureza e a Insígnia da Alma!",
    ],
  },

  // Cinnabar Island
  {
    x: 27,
    y: 172,
    title: "🌋 Laboratório de Fósseis & Química de Cinnabar",
    lines: [
      "Ressurreição de DNA ancestral de Omanyte e Aerodactyl a partir de fósseis!",
    ],
  },
  {
    x: 37,
    y: 172,
    title: "🔥 Ginásio Vulcânico de Cinnabar • Líder Blaine",
    lines: [
      "Termodinâmica, geotermia, vulcões ativos e a Insígnia do Vulcão!",
    ],
  },

  // Indigo Plateau
  {
    x: 20,
    y: 20,
    title: "👑 Indigo Plateau • Cúpula dos Campeões",
    lines: [
      "A grande Liga Pokémon de Kanto! Simulado geral das avaliações escolares (EXP em dobro)!",
    ],
  },
];

// ========================================================
// 4. COORDINATE TO ZONE RESOLUTION (FLUID BORDERS)
// ========================================================
export function getKantoZone(x: number, y: number): KantoZoneInfo {
  // 1. INDIGO PLATEAU (North-West Summit)
  if (x >= 8 && x <= 32 && y <= 30) {
    return {
      name: "Indigo Plateau • Cúpula dos Campeões",
      subtitle: "Semana de Provas Finais • Palácio da Liga Pokémon (EXP em Dobro!)",
      icon: "👑",
      region: "kanto",
      generation: 1,
    };
  }

  // 2. ROUTE 22 & 23 (Victory Road)
  if (x >= 8 && x <= 26 && y > 30 && y <= 110) {
    return {
      name: "▲ Rota 22 & 23 • Estrada da Vitória",
      subtitle: "Trilha rochosa e portões das 8 insígnias rumo à Liga Pokémon",
      icon: "🏔️",
      region: "kanto",
      generation: 1,
    };
  }

  // 3. PEWTER CITY (North-West)
  if (x >= 18 && x <= 50 && y >= 32 && y <= 58) {
    return {
      name: "Cidade de Pewter • Terra das Rochas",
      subtitle: "Museu de Fósseis & Ciências, Ginásio de Rocha do Brock",
      icon: "🪨",
      region: "kanto",
      generation: 1,
    };
  }

  // 4. ROUTE 3 & 4 / MT. MOON (North-Central Foothills)
  if (x > 50 && x <= 95 && y >= 35 && y <= 55) {
    return {
      name: "▲ Rota 3 & 4 • Monte da Lua",
      subtitle: "Caverna dos Fósseis, cristais subterrâneos e pedras lunares",
      icon: "⛏️",
      region: "kanto",
      generation: 1,
    };
  }

  // 5. CERULEAN CITY (North-East)
  if (x >= 96 && x <= 130 && y >= 35 && y <= 58) {
    return {
      name: "Cidade de Cerulean • Capital das Águas",
      subtitle: "Ginásio Aquático da Misty, Loja de Bicicletas e canais cristalinos",
      icon: "💧",
      region: "kanto",
      generation: 1,
    };
  }

  // 6. ROUTE 24 & 25 (Ponte Pepita ao Norte de Cerulean)
  if (x >= 100 && x <= 140 && y < 35) {
    return {
      name: "▲ Rota 24 & 25 • Ponte Pepita",
      subtitle: "Ponte dourada sobre o rio e Casa do Geneticista Bill",
      icon: "🌉",
      region: "kanto",
      generation: 1,
    };
  }

  // 7. ROUTE 2 & VIRIDIAN FOREST (Connecting Viridian to Pewter)
  if (x >= 24 && x <= 48 && y > 58 && y <= 94) {
    return {
      name: "▲ Rota 2 & Floresta de Viridian",
      subtitle: "Bosques nativos densos, insetos raros e atalho verde",
      icon: "🌲",
      region: "kanto",
      generation: 1,
    };
  }

  // 8. CELADON CITY (Central-West)
  if (x >= 52 && x <= 88 && y >= 72 && y <= 95) {
    return {
      name: "Cidade de Celadon • Jardim da Cidade Grande",
      subtitle: "Grande Shopping (Department Store), Ginásio de Planta da Erika e Mansão",
      icon: "🏬",
      region: "kanto",
      generation: 1,
    };
  }

  // 9. SAFFRON CITY (Central Metropolis)
  if (x >= 98 && x <= 132 && y >= 72 && y <= 95) {
    return {
      name: "Cidade de Saffron • Metrópole Dourada",
      subtitle: "Silph Co. Mega-Hub, Ginásio Psíquico da Sabrina e Dojo de Luta",
      icon: "🏢",
      region: "kanto",
      generation: 1,
    };
  }

  // 10. ROUTE 5 & 6 (Corredores Verticais de Saffron)
  if (x >= 102 && x <= 126 && y > 58 && y < 72) {
    return {
      name: "▲ Rota 5 • Estrada Norte de Saffron",
      subtitle: "Passarela florida com casa de repouso e degraus de salto",
      icon: "🛤️",
      region: "kanto",
      generation: 1,
    };
  }
  if (x >= 102 && x <= 126 && y > 95 && y < 115) {
    return {
      name: "▲ Rota 6 • Estrada Sul de Saffron",
      subtitle: "Caminho ribeirinho com lagoas de água doce para Vermilion",
      icon: "🛤️",
      region: "kanto",
      generation: 1,
    };
  }

  // 11. VIRIDIAN CITY (South-West)
  if (x >= 18 && x <= 50 && y >= 95 && y <= 120) {
    return {
      name: "Cidade de Viridian • Metrópole do Saber",
      subtitle: "Centro Pokémon, PokéMart, Escola de Matemática e Grande Biblioteca",
      icon: "🏛️",
      region: "kanto",
      generation: 1,
    };
  }

  // 12. VERMILION CITY (South-Central Port)
  if (x >= 98 && x <= 132 && y >= 115 && y <= 135) {
    return {
      name: "Cidade de Vermilion • Porto do Sol Poente",
      subtitle: "Ginásio Elétrico do Lt. Surge, Cais do Porto e Navio S.S. Anne",
      icon: "🚢",
      region: "kanto",
      generation: 1,
    };
  }

  // 13. CYCLING ROAD (Routes 16, 17, 18)
  if (x >= 55 && x <= 80 && y > 95 && y <= 145) {
    return {
      name: "▲ Rota 17 • Cycling Road (Trilha dos Ciclistas)",
      subtitle: "Autoestrada pavimentada com declive veloz ligando Celadon a Fuchsia",
      icon: "🚲",
      region: "kanto",
      generation: 1,
    };
  }

  // 14. ROUTE 1 (Pallet to Viridian)
  if (x >= 26 && x <= 46 && y > 120 && y <= 145) {
    return {
      name: "▲ Rota 1 • Estrada de Pallet a Viridian",
      subtitle: "Trilha clássica com degraus de salto, grama alta e Pidgey",
      icon: "🛤️",
      region: "kanto",
      generation: 1,
    };
  }

  // 15. PALLET TOWN (Vila da Família)
  if (x >= 22 && x <= 50 && y > 145 && y <= 165) {
    return {
      name: "Vila da Família • Pallet Town",
      subtitle: "Lar do Papai Carlos, Mamãe Renata e as filhas (Casas Ash & Rival)",
      icon: "🏡",
      region: "kanto",
      generation: 1,
    };
  }

  // 16. COASTAL ROUTES 11, 12, 13, 14, 15
  if (x > 126 && y >= 115 && y <= 158) {
    return {
      name: "▲ Rotas Costeiras 12 a 15 • Trilhas do Pescador",
      subtitle: "Passarelas de madeira sobre o oceano e travessia com grama densa",
      icon: "🎣",
      region: "kanto",
      generation: 1,
    };
  }

  // 17. FUCHSIA CITY (South-East)
  if (x >= 88 && x <= 130 && y > 135 && y <= 162) {
    return {
      name: "Cidade de Fuchsia • Reino dos Safaris",
      subtitle: "Safari Zone (Biologia & Preservação), Zoológico e Ginásio Veneno do Koga",
      icon: "🦏",
      region: "kanto",
      generation: 1,
    };
  }

  // 18. CINNABAR ISLAND (Far South-West)
  if (x >= 18 && x <= 48 && y > 163) {
    return {
      name: "Ilha de Cinnabar • Ilha Vulcânica dos Fósseis",
      subtitle: "Laboratório de Fósseis & Química, Mansão Queimada e Ginásio de Fogo",
      icon: "🌋",
      region: "kanto",
      generation: 1,
    };
  }

  // 19. ROUTE 21 (Ocean Highway Cinnabar to Pallet)
  if (x >= 28 && x <= 42 && y > 155 && y <= 165) {
    return {
      name: "▲ Rota 21 • Canal de Navegação Marítima",
      subtitle: "Águas cristalinas navegáveis que unem Pallet Town à Ilha de Cinnabar",
      icon: "🌊",
      region: "kanto",
      generation: 1,
    };
  }

  // 20. SOUTHERN OCEAN & SEAFOAM ISLANDS (Routes 19 & 20)
  if (y > 162) {
    return {
      name: "▲ Rotas Marítimas 19 & 20 • Ilhas Seafoam",
      subtitle: "Oceano azul com cavernas glaciais subterrâneas e correntes marinhas",
      icon: "🌊",
      region: "kanto",
      generation: 1,
    };
  }

  // Default Regional Route
  return {
    name: "Caminhos Regionais de Kanto",
    subtitle: "Planícies verdes e trilhas entre as metrópoles",
    icon: "🗺️",
    region: "kanto",
    generation: 1,
  };
}

// ========================================================
// 5. PROCEDURAL KANTO WORLD GRID BUILDER (100% GBA TILES)
// ========================================================
export function generateKantoWorldGrid(): string[][] {
  const grid: string[][] = [];

  for (let y = 0; y < MAP_ROWS; y++) {
    const row: string[] = [];
    for (let x = 0; x < MAP_COLS; x++) {
      // 0. Dense Outer World Perimeter Trees
      if (x === 0 || y === 0 || x === MAP_COLS - 1 || y === MAP_ROWS - 1) {
        row.push("X");
        continue;
      }

      // 1. Southern Sea (Routes 19, 20 & 21 Ocean)
      if (y >= 165) {
        // Cinnabar Island landmass (x: 22..46, y: 165..177)
        if (x >= 22 && x <= 46 && y <= 177) {
          // Roads and town floor of Cinnabar
          if (y === 171 || y === 172 || x === 31 || x === 32) {
            row.push("P");
          } else {
            row.push("G");
          }
          continue;
        }

        // Seafoam Islands rock outcroppings in middle of ocean (x: 72..84, y: 168..174)
        if (x >= 72 && x <= 84 && y >= 168 && y <= 174) {
          if (x === 78 && y === 172) {
            row.push("D"); // Seafoam cave entrance
          } else if (x === 72 || x === 84 || y === 168 || y === 174) {
            row.push("R"); // Rocky reef border
          } else {
            row.push("P"); // Rocky island path
          }
          continue;
        }

        // Ocean Water
        row.push("W");
        continue;
      }

      // 2. Coastal Boardwalk Routes 11, 12, 13, 14, 15 (East Ocean Pier)
      if (x >= 135 && y >= 120 && y <= 155) {
        // Wooden Fishing Boardwalk
        if ((x === 140 || x === 141) || (y === 135 && x >= 135 && x <= 148)) {
          row.push("B"); // Wooden pier
        } else if (x >= 144) {
          row.push("W"); // Coastal ocean
        } else {
          row.push("T"); // Coastal tall grass
        }
        continue;
      }

      // 3. Cycling Road (Routes 16, 17, 18)
      if (x >= 64 && x <= 72 && y >= 96 && y <= 145) {
        // Paved downhill highway
        if (x >= 66 && x <= 70) {
          row.push("P");
        } else {
          row.push("#"); // Guardrail fence
        }
        continue;
      }

      // 4. Default: Lush Ground Grass
      row.push("G");
    }
    grid.push(row);
  }

  // Stamp Building Solid Structures & Doors
  KANTO_BUILDINGS.forEach((b) => {
    for (let by = b.y0; by <= b.y1; by++) {
      for (let bx = b.x0; bx <= b.x1; bx++) {
        if (grid[by]) {
          if (bx === b.doorX && by === b.doorY) {
            grid[by][bx] = "D"; // Functional door threshold
          } else {
            grid[by][bx] = "H"; // Solid building walls/roof
          }
        }
      }
    }
  });

  // Stamp Official Roads & Pathways Connecting All Cities ('P')
  // Route 1: Pallet -> Viridian
  for (let py = 120; py <= 154; py++) {
    for (let px = 34; px <= 36; px++) {
      if (grid[py]) grid[py][px] = "P";
    }
  }

  // Route 2: Viridian -> Pewter
  for (let py = 59; py <= 95; py++) {
    for (let px = 33; px <= 35; px++) {
      if (grid[py]) grid[py][px] = "P";
    }
  }

  // Route 3: Pewter -> Mt. Moon
  for (let px = 48; px <= 80; px++) {
    if (grid[45]) grid[45][px] = "P";
  }

  // Route 4: Mt. Moon -> Cerulean
  for (let px = 84; px <= 104; px++) {
    if (grid[45]) grid[45][px] = "P";
  }

  // Route 24 (Ponte Pepita): Cerulean -> Bill's Cottage
  for (let py = 17; py <= 40; py++) {
    if (grid[py]) {
      grid[py][110] = "B"; // Bridge pier
      grid[py][111] = "B";
    }
  }
  for (let px = 111; px <= 128; px++) {
    if (grid[17]) grid[17][px] = "P";
  }

  // Route 5: Cerulean -> Saffron
  for (let py = 50; py <= 78; py++) {
    for (let px = 113; px <= 115; px++) {
      if (grid[py]) grid[py][px] = "P";
    }
  }

  // Route 6: Saffron -> Vermilion
  for (let py = 90; py <= 117; py++) {
    for (let px = 113; px <= 115; px++) {
      if (grid[py]) grid[py][px] = "P";
    }
  }

  // Route 7: Celadon <-> Saffron
  for (let px = 82; px <= 103; px++) {
    if (grid[85]) grid[85][px] = "P";
  }

  // Route 8: Saffron <-> East
  for (let px = 125; px <= 140; px++) {
    if (grid[85]) grid[85][px] = "P";
  }

  // Route 22 & 23: Viridian -> Indigo Plateau
  for (let px = 18; px <= 27; px++) {
    if (grid[108]) grid[108][px] = "P";
  }
  for (let py = 18; py <= 108; py++) {
    for (let px = 19; px <= 21; px++) {
      if (grid[py]) grid[py][px] = "P";
    }
  }

  // Town Squares & Avenues:
  // Pallet Plaza
  for (let px = 30; px <= 44; px++) {
    if (grid[154]) grid[154][px] = "P";
  }
  // Viridian Avenues
  for (let px = 22; px <= 46; px++) {
    if (grid[105]) grid[105][px] = "P";
    if (grid[115]) grid[115][px] = "P";
  }
  // Pewter Avenues
  for (let px = 24; px <= 48; px++) {
    if (grid[42]) grid[42][px] = "P";
    if (grid[50]) grid[50][px] = "P";
  }
  // Cerulean Avenues
  for (let px = 100; px <= 122; px++) {
    if (grid[44]) grid[44][px] = "P";
    if (grid[50]) grid[50][px] = "P";
  }
  // Celadon Avenues
  for (let px = 58; px <= 86; px++) {
    if (grid[83]) grid[83][px] = "P";
    if (grid[92]) grid[92][px] = "P";
  }
  // Saffron Grand Plaza
  for (let px = 103; px <= 125; px++) {
    if (grid[82]) grid[82][px] = "P";
    if (grid[90]) grid[90][px] = "P";
  }
  // Vermilion Avenues & Pier
  for (let px = 103; px <= 125; px++) {
    if (grid[121]) grid[121][px] = "P";
    if (grid[126]) grid[126][px] = "P";
  }
  for (let py = 127; py <= 135; py++) {
    for (let px = 112; px <= 114; px++) {
      if (grid[py]) grid[py][px] = "B"; // Wooden dock
    }
  }
  // Fuchsia Avenues
  for (let px = 98; px <= 120; px++) {
    if (grid[142]) grid[142][px] = "P";
    if (grid[151]) grid[151][px] = "P";
  }
  // Indigo Plateau Summit Courtyard
  for (let px = 16; px <= 24; px++) {
    if (grid[19]) grid[19][px] = "P";
    if (grid[20]) grid[20][px] = "P";
  }

  // Stamp Patches of Tall Grass ('T') along wild routes
  const grassPatches = [
    // Route 1
    { x0: 29, x1: 33, y0: 124, y1: 130 },
    { x0: 37, x1: 42, y0: 132, y1: 138 },
    { x0: 29, x1: 33, y0: 136, y1: 142 },
    // Route 2
    { x0: 28, x1: 32, y0: 68, y1: 76 },
    { x0: 36, x1: 42, y0: 80, y1: 88 },
    // Route 3
    { x0: 54, x1: 62, y0: 42, y1: 44 },
    { x0: 66, x1: 74, y0: 46, y1: 48 },
    // Route 5
    { x0: 108, x1: 112, y0: 64, y1: 70 },
    // Route 6
    { x0: 116, x1: 120, y0: 102, y1: 108 },
    // Route 7
    { x0: 88, x1: 94, y0: 82, y1: 84 },
    // Route 8
    { x0: 132, x1: 138, y0: 82, y1: 84 },
    // Route 24/25
    { x0: 114, x1: 122, y0: 20, y1: 26 },
    // Route 18 (Fuchsia West)
    { x0: 80, x1: 88, y0: 146, y1: 150 },
    // Route 15 (Fuchsia East)
    { x0: 122, x1: 128, y0: 146, y1: 150 },
  ];
  grassPatches.forEach((gp) => {
    for (let gy = gp.y0; gy <= gp.y1; gy++) {
      for (let gx = gp.x0; gx <= gp.x1; gx++) {
        if (grid[gy] && grid[gy][gx] === "G") {
          grid[gy][gx] = "T";
        }
      }
    }
  });

  // Stamp Ledges ('L') on Routes 1, 3, 4
  const ledges = [
    { y: 126, x0: 29, x1: 33 },
    { y: 134, x0: 37, x1: 42 },
    { y: 142, x0: 29, x1: 33 },
    { y: 44, x0: 54, x1: 62 },
    { y: 47, x0: 66, x1: 74 },
    { y: 46, x0: 88, x1: 94 },
  ];
  ledges.forEach((l) => {
    for (let lx = l.x0; lx <= l.x1; lx++) {
      if (grid[l.y] && grid[l.y][lx] === "G") {
        grid[l.y][lx] = "L";
      }
    }
  });

  // Stamp Signposts ('S')
  KANTO_SIGNPOSTS.forEach((s) => {
    if (!isProtectedDoorZone(s.x, s.y) && grid[s.y]) {
      grid[s.y][s.x] = "S";
    }
  });

  // Safety Anti-Block Guard: Guarantee 100% of doors and return tiles are clear and free of obstacles
  PROTECTED_BUILDING_DOORS.forEach((b) => {
    if (grid[b.doorY]) {
      grid[b.doorY][b.doorX] = "D"; // Functional door threshold
    }
    if (grid[b.returnY]) {
      const cur = grid[b.returnY][b.returnX];
      if (cur === "X" || cur === "H" || cur === "#" || cur === "S" || cur === "R" || cur === "C") {
        grid[b.returnY][b.returnX] = "P"; // Force walkable pathway
      }
    }
    if (grid[b.doorY + 1]) {
      const exitStep = grid[b.doorY + 1][b.doorX];
      if (exitStep === "X" || exitStep === "H" || exitStep === "#" || exitStep === "S" || exitStep === "R" || exitStep === "C") {
        grid[b.doorY + 1][b.doorX] = "P"; // Clear step outside door
      }
    }
  });

  return grid;
}
