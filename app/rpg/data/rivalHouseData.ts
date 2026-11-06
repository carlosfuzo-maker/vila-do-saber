// Authentic Pokémon FireRed - Rival & Daisy Oak's House Interior (12x9 GBA Grid)
// Official GBA Dimensions: 192px x 144px = 12 x 9 tiles (16px)

export const RIVAL_HOUSE_COLS = 12;
export const RIVAL_HOUSE_ROWS = 9;

export interface RivalHouseInteractable {
  x: number;
  y: number;
  name: string;
  type: "daisy" | "bed" | "pc" | "town_map" | "tea" | "bookshelf" | "tv" | "exit";
  dialogText?: string;
}

let cachedRivalHouse: HTMLImageElement | null = null;

export function getRivalHouseImage(): HTMLImageElement | null {
  if (typeof window === "undefined") return null;
  if (!cachedRivalHouse) {
    cachedRivalHouse = new Image();
    cachedRivalHouse.src = "/assets/rpg/house_floor1.png";
  }
  return cachedRivalHouse;
}

if (typeof window !== "undefined") {
  getRivalHouseImage();
}

export const RIVAL_HOUSE_INTERACTABLES: RivalHouseInteractable[] = [
  // Daisy Oak at the dining table
  {
    x: 4,
    y: 4,
    name: "Daisy Carvalho ☕",
    type: "daisy",
    dialogText: "Oi querida! Que bom te ver! Meu irmão saiu correndo dizendo que vai ser o maior campeão... Mas você sabe que a verdadeira força vem do estudo e da bondade com os Pokémon! Tome uma xícara de chá quentinho que preparei para você e sua equipe!",
  },

  // Dining table tea set
  {
    x: 5,
    y: 4,
    name: "Bule de Chá de Ervas Aromáticas 🍵",
    type: "tea",
    dialogText: "Um bule fumegante de chá de ervas medicinais preparado por Daisy. O aroma relaxante acalma e restaura a vitalidade de qualquer Pokémon!",
  },

  // Town Map on the wall
  {
    x: 4,
    y: 1,
    name: "Grande Mapa da Região de Kanto 🗺️",
    type: "town_map",
    dialogText: "O Mapa de Kanto detalha toda a rota: de Pallet Town a Viridian, passando pela Floresta dos Insetos, Monte da Lua e Indigo Plateau!",
  },

  // Study Desk / PC in the living room
  {
    x: 9,
    y: 1,
    name: "Poké-PC de Conexão da Casa 💻",
    type: "pc",
    dialogText: "Poké-PC conectado à nuvem da Vila do Saber! Seu progresso na jornada e suas lições foram salvos com segurança!",
  },

  // Cozy Rest Sofa / Bed
  {
    x: 1,
    y: 5,
    name: "Sofá Aconchegante de Descanso 🛏️",
    type: "bed",
    dialogText: "Você relaxou no sofá macio e aconchegante! Toda a sua equipe Pokémon descansou e recuperou 100% de energia!",
  },
  {
    x: 1,
    y: 6,
    name: "Sofá Aconchegante de Descanso 🛏️",
    type: "bed",
    dialogText: "Você relaxou no sofá macio e aconchegante! Toda a sua equipe Pokémon descansou e recuperou 100% de energia!",
  },

  // Bookshelf with rival's battle journals and study books
  {
    x: 2,
    y: 1,
    name: "Estante de Guias de Treinamento 📚",
    type: "bookshelf",
    dialogText: "Cadernos de anotações do Rival: 'Vantagens elementais são matemáticas: Água apaga Fogo, Fogo queima Planta, Planta absorve Água!'",
  },

  // TV
  {
    x: 3,
    y: 1,
    name: "Televisão da Casa 📺",
    type: "tv",
    dialogText: "A transmissão mostra a Liga Pokémon: 'Destaque de hoje: Estudantes dedicadas da Vila do Saber estão conquistando insígnias com brilhantismo!'",
  },

  // Exit threshold on bottom red doormat
  {
    x: 3,
    y: 8,
    name: "Porta de Saída da Casa",
    type: "exit",
  },
  {
    x: 4,
    y: 8,
    name: "Porta de Saída da Casa",
    type: "exit",
  },
];

/**
 * Walkability collision logic for Rival's House (12 cols x 9 rows)
 */
export function isRivalHouseWalkable(x: number, y: number): boolean {
  // Boundary walls
  if (x < 1 || x > 10 || y < 1 || y > 7) {
    // Red doormat at (3..4, 8) is walkable to exit
    if ((x === 3 || x === 4) && y === 8) return true;
    return false;
  }

  // Top furniture / walls
  if (y === 1) return false;

  // Center dining table (cols 4..6, rows 3..5)
  if (x >= 4 && x <= 6 && y >= 3 && y <= 5) return false;

  // Left sofa (col 1, rows 5..6)
  if (x === 1 && (y === 5 || y === 6)) return false;

  return true;
}

export function getRivalHouseInteractable(x: number, y: number): RivalHouseInteractable | null {
  return RIVAL_HOUSE_INTERACTABLES.find((item) => item.x === x && item.y === y) || null;
}

/**
 * Draws the authentic GBA FireRed Rival House Interior
 */
export function drawRivalHouseInterior(
  ctx: CanvasRenderingContext2D,
  tileSize: number,
  viewWidth: number,
  viewHeight: number,
  daisySprite?: HTMLImageElement | null,
  bgImg?: HTMLImageElement | null
) {
  // 1. Dark surrounding void
  ctx.fillStyle = "#090d16";
  ctx.fillRect(-tileSize * 15, -tileSize * 15, (RIVAL_HOUSE_COLS + 30) * tileSize, (RIVAL_HOUSE_ROWS + 30) * tileSize);

  // 2. Authentic FireRed GBA House Map
  const bg = bgImg || getRivalHouseImage();
  ctx.imageSmoothingEnabled = false;

  if (bg && bg.complete && bg.naturalWidth > 0) {
    ctx.drawImage(bg, 0, 0, RIVAL_HOUSE_COLS * tileSize, RIVAL_HOUSE_ROWS * tileSize);
  }

  // 3. Daisy Oak sitting at the dining table chair (x: 4, y: 4)
  const daisyX = 4 * tileSize;
  const daisyY = 4 * tileSize - 2;
  if (daisySprite && daisySprite.complete && daisySprite.naturalWidth > 0) {
    ctx.drawImage(daisySprite, 0, 0, 32, 32, daisyX, daisyY, tileSize, tileSize);
  }
}
