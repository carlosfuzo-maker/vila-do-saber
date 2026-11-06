import { Direction } from "../page";
import { CapturedPokemon, StudentYear } from "../rpgTypes";

export const HOUSE_COLS = 12;
export const HOUSE_ROWS = 9;

export interface HouseInteractable {
  x: number;
  y: number;
  name: string;
  type: "stairs_up" | "stairs_down" | "bed" | "pc" | "fridge" | "tv" | "mamae" | "papai" | "bookshelf" | "console" | "plant" | "exit";
  floor: 1 | 2;
  actionText?: string;
}

// Module-level image cache for authentic FireRed rooms
let cachedFloor1: HTMLImageElement | null = null;
let cachedFloor2: HTMLImageElement | null = null;

export function getHouseFloor1(): HTMLImageElement | null {
  if (typeof window === "undefined") return null;
  if (!cachedFloor1) {
    cachedFloor1 = new Image();
    cachedFloor1.src = "/assets/rpg/house_floor1.png";
  }
  return cachedFloor1;
}

export function getHouseFloor2(): HTMLImageElement | null {
  if (typeof window === "undefined") return null;
  if (!cachedFloor2) {
    cachedFloor2 = new Image();
    cachedFloor2.src = "/assets/rpg/house_floor2.png";
  }
  return cachedFloor2;
}

// Eager preload in browser
if (typeof window !== "undefined") {
  getHouseFloor1();
  getHouseFloor2();
}

// Interactable objects in Floor 1 (Térreo: Sala, Cozinha e Pais)
// Aligned to authentic FireRed 12x9 living room pixel-art map
export const FLOOR_1_INTERACTABLES: HouseInteractable[] = [
  // Stairs Up to Floor 2 (Staircase at top right: x: 8..10, y: 1..2)
  { x: 8, y: 1, name: "Escada para o 2º Andar", type: "stairs_up", floor: 1 },
  { x: 9, y: 1, name: "Escada para o 2º Andar", type: "stairs_up", floor: 1 },
  { x: 10, y: 1, name: "Escada para o 2º Andar", type: "stairs_up", floor: 1 },

  // Door Exit Threshold (Bottom red doormat: x: 2..5, y: 8)
  { x: 2, y: 8, name: "Porta de Saída", type: "exit", floor: 1 },
  { x: 3, y: 8, name: "Porta de Saída", type: "exit", floor: 1 },
  { x: 4, y: 8, name: "Porta de Saída", type: "exit", floor: 1 },
  { x: 5, y: 8, name: "Porta de Saída", type: "exit", floor: 1 },

  // Kitchen Area (Top Left: Sink at x: 1, Cupboard at x: 2, Fridge/Trash at x: 3)
  { x: 1, y: 1, name: "Pia da Cozinha", type: "plant", floor: 1 },
  { x: 2, y: 1, name: "Bancada da Cozinha", type: "plant", floor: 1 },
  { x: 3, y: 1, name: "Geladeira da Família", type: "fridge", floor: 1 },

  // Wall TV (Center Top: x: 4, y: 1)
  { x: 4, y: 1, name: "Televisão da Sala", type: "tv", floor: 1 },

  // Parents at the Dining Table (Table: x: 4..6, y: 3..5)
  // Papai Carlos in Left Chair at (x: 3, y: 4)
  { x: 3, y: 4, name: "Papai Carlos", type: "papai", floor: 1 },
  // Mamãe Renata in Right Chair at (x: 7, y: 4)
  { x: 7, y: 4, name: "Mamãe Renata", type: "mamae", floor: 1 },

  // Corner Potted Plants
  { x: 0, y: 7, name: "Vaso de Flores", type: "plant", floor: 1 },
  { x: 11, y: 7, name: "Planta Decorativa", type: "plant", floor: 1 },
  { x: 1, y: 6, name: "Vaso de Flores", type: "plant", floor: 1 },
  { x: 10, y: 6, name: "Planta Decorativa", type: "plant", floor: 1 },
];

// Interactable objects in Floor 2 (Quarto das Meninas: Camas e Poké-PC)
// Aligned to authentic FireRed 11x9 bedroom pixel-art map
export const FLOOR_2_INTERACTABLES: HouseInteractable[] = [
  // Stairs Down to Floor 1 (x: 7..9, y: 1..2 - full staircase & landing mat)
  { x: 7, y: 1, name: "Escada para o Térreo", type: "stairs_down", floor: 2 },
  { x: 8, y: 1, name: "Escada para o Térreo", type: "stairs_down", floor: 2 },
  { x: 9, y: 1, name: "Escada para o Térreo", type: "stairs_down", floor: 2 },
  { x: 7, y: 2, name: "Escada para o Térreo", type: "stairs_down", floor: 2 },
  { x: 8, y: 2, name: "Escada para o Térreo", type: "stairs_down", floor: 2 },
  { x: 9, y: 2, name: "Escada para o Térreo", type: "stairs_down", floor: 2 },

  // Study Desk & Poké-PC (Top Left: x: 0..1, y: 1)
  { x: 0, y: 1, name: "Poké-PC de Estudos", type: "pc", floor: 2 },
  { x: 1, y: 1, name: "Escrivaninha de Lição de Casa", type: "pc", floor: 2 },

  // Bookshelves & Drawers (Top Center: x: 2..4, y: 1)
  { x: 2, y: 1, name: "Gaveteiro Escolar", type: "bookshelf", floor: 2 },
  { x: 3, y: 1, name: "Estante de Livros Escolares", type: "bookshelf", floor: 2 },
  { x: 4, y: 1, name: "Armário de Brinquedos", type: "bookshelf", floor: 2 },

  // Video Game Console on Center Rug (x: 4..5, y: 4)
  { x: 4, y: 4, name: "Videogame 16-bits & TV", type: "console", floor: 2 },
  { x: 5, y: 4, name: "Videogame 16-bits & TV", type: "console", floor: 2 },

  // Girls' Cozy Beds (Left: x: 1, y: 4..6)
  { x: 1, y: 4, name: "Caminha da Bianca", type: "bed", floor: 2 },
  { x: 1, y: 5, name: "Caminha da Bianca", type: "bed", floor: 2 },
  { x: 1, y: 6, name: "Caminha da Cecília", type: "bed", floor: 2 },
];

/**
 * Checks if a tile is walkable inside the Family House
 */
export function isHouseTileWalkable(x: number, y: number, floor: 1 | 2): boolean {
  if (floor === 1) {
    // Room boundary walls (Cols: 0..11, Rows: 0..8)
    if (x < 1 || x > 10 || y < 1 || y > 7) {
      // Exit door mat at bottom center (x: 2..5, y: 8) is walkable to leave
      if (x >= 2 && x <= 5 && y === 8) return true;
      return false;
    }

    // Top wall furniture
    if (y === 1) {
      // Stairs up at x: 8..10 are walkable to trigger stairs
      if (x >= 8 && x <= 10) return true;
      return false; // Kitchen counters, sink, TV
    }

    // Dining table & chairs
    if (x >= 4 && x <= 6 && y >= 3 && y <= 5) return false; // Table
    if (x === 3 && y === 4) return false; // Chair occupied by Papai Carlos
    if (x === 7 && y === 4) return false; // Chair occupied by Mamãe Renata

    // Corner decorative potted plants
    if ((x === 1 || x === 10) && y === 6) return false;

    return true;
  } else {
    // Floor 2 (Quarto das Meninas - 11x9 grid)
    if (x < 1 || x > 10 || y < 1 || y > 7) {
      return false;
    }

    // Top wall furniture
    if (y === 1) {
      // Stairs down & landing mat at x: 6..9 are walkable to approach and trigger stairs freely
      if (x >= 6 && x <= 9) return true;
      return false; // Desk, PC, bookshelf (x: 1..5)
    }

    // Bed on the left
    if (x === 1 && y >= 4 && y <= 6) return false;

    // Console TV on rug (only row y === 4 blocks so row y === 5 is a clear corridor from the bed!)
    if ((x === 4 || x === 5) && y === 4) return false;

    return true;
  }
}

/**
 * Finds an interactable object at the given position or in front of the player
 */
export function getHouseInteractable(x: number, y: number, floor: 1 | 2): HouseInteractable | null {
  const list = floor === 1 ? FLOOR_1_INTERACTABLES : FLOOR_2_INTERACTABLES;
  return list.find((item) => item.x === x && item.y === y) || null;
}

/**
 * Renders the authentic FireRed GBA interior room for Casa da Família
 * Uses pixel-perfect GBA FireRed room backgrounds and character sprites.
 */
export function drawFamilyHouseInterior(
  ctx: CanvasRenderingContext2D,
  floor: 1 | 2,
  tileSize: number,
  viewWidth: number,
  viewHeight: number,
  parentSprite?: HTMLImageElement | null,
  floor1Img?: HTMLImageElement | null,
  floor2Img?: HTMLImageElement | null
) {
  // 1. Dark surrounding void (outside the house room walls)
  ctx.fillStyle = "#090d16";
  ctx.fillRect(-tileSize * 15, -tileSize * 15, (HOUSE_COLS + 30) * tileSize, (HOUSE_ROWS + 30) * tileSize);

  // 2. Resolve authentic FireRed GBA pixel-art room background
  const activeBg = floor === 1 ? (floor1Img || getHouseFloor1()) : (floor2Img || getHouseFloor2());
  const cols = floor === 1 ? 12 : 11;
  const rows = 9;

  ctx.imageSmoothingEnabled = false;

  if (activeBg && activeBg.complete && activeBg.naturalWidth > 0) {
    ctx.drawImage(activeBg, 0, 0, cols * tileSize, rows * tileSize);
  }

  // 3. Dynamic characters and interactive overlays (Authentic GBA style)
  if (floor === 1) {
    // Parents sitting at the dining table
    if (parentSprite && parentSprite.complete && parentSprite.naturalWidth > 0) {
      // Papai Carlos sitting at table left chair (x: 3, y: 4)
      ctx.drawImage(parentSprite, 0, 0, 32, 32, 3 * tileSize + 4, 4 * tileSize, tileSize - 8, tileSize);
      // Mamãe Renata sitting at table right chair (x: 7, y: 4)
      ctx.drawImage(parentSprite, 32, 0, 32, 32, 7 * tileSize + 4, 4 * tileSize, tileSize - 8, tileSize);
    }
  }
}
