// Authentic Pokémon FireRed - Celadon Gym / Portuguese Library Interior (13x19 GBA Grid)
// Official GBA Dimensions: 208px x 304px (+4px border) = 13 x 19 tiles (16px)

export const PORTUGUESE_LIB_COLS = 13;
export const PORTUGUESE_LIB_ROWS = 19;

export interface PortugueseLibInteractable {
  x: number;
  y: number;
  name: string;
  type: "exit" | "leader_sofia" | "npc_student" | "bookshelf" | "pedestal" | "reading_desk";
  id?: string;
}

export const INITIAL_PORTUGUESE_INTERACTABLES: PortugueseLibInteractable[] = [
  // Exit mat at bottom center (x: 6, y: 18)
  { x: 6, y: 18, name: "Porta de Saída para Celadon City", type: "exit" },

  // Entrance Flower Planters
  { x: 3, y: 17, name: "Jardineira Florida de Celadon", type: "reading_desk" },
  { x: 9, y: 17, name: "Jardineira Florida de Celadon", type: "reading_desk" },

  // Bookshelves along top wall
  { x: 3, y: 2, name: "Estante de Literatura Clássica e Contos", type: "bookshelf" },
  { x: 4, y: 2, name: "Estante de Gramática e Ortografia", type: "bookshelf" },
  { x: 8, y: 2, name: "Estante de Poesias e Rimas de Kanto", type: "bookshelf" },
  { x: 9, y: 2, name: "Enciclopédia de Língua Portuguesa", type: "bookshelf" },

  // Professora Sofia at the Grand Lectern
  { x: 6, y: 3, name: "Professora Sofia (Líder do Ginásio de Português)", type: "leader_sofia" },

  // Student Clara
  { x: 4, y: 11, name: "Clara (Estudante de Letras)", type: "npc_student" },

  // Dicionário Encantado Pedestal
  { x: 8, y: 11, name: "Dicionário Encantado Dourado", type: "pedestal", id: "lib_pedestal_1" },
];

/**
 * Rigid Walkability collision logic for Portuguese Library (13 cols x 19 rows)
 */
export function isPortugueseLibWalkable(x: number, y: number): boolean {
  // Exit door mat at bottom center (x: 6, y: 18)
  if (x === 6 && y === 18) return true;

  // Outer boundary walls
  if (x < 1 || x > 11 || y < 3 || y > 17) {
    return false;
  }

  // Top lectern & bookshelves
  if (y <= 2) return false;

  // Sofia at lectern (x: 6, y: 3)
  if (x === 6 && y === 3) return false;

  // Entrance planters (x: 3, 9, y: 17)
  if ((x === 3 || x === 9) && y === 17) return false;

  // Student Clara at (4, 11)
  if (x === 4 && y === 11) return false;

  // Dicionário Pedestal at (8, 11)
  if (x === 8 && y === 11) return false;

  // Authentic Celadon Flower Hedge Mazes
  // Hedge Line 1 at row 5
  if (y === 5 && ((x >= 2 && x <= 4) || (x >= 8 && x <= 10))) return false;

  // Hedge Line 2 at row 9
  if (y === 9 && ((x >= 3 && x <= 5) || (x >= 7 && x <= 9))) return false;

  // Hedge Line 3 at row 13
  if (y === 13 && ((x >= 2 && x <= 4) || (x >= 8 && x <= 10))) return false;

  return true;
}

export function getPortugueseLibInteractable(x: number, y: number): PortugueseLibInteractable | null {
  return INITIAL_PORTUGUESE_INTERACTABLES.find((item) => item.x === x && item.y === y) || null;
}

let cachedCeladonGym: HTMLImageElement | null = null;
export function getCeladonGymImage(): HTMLImageElement | null {
  if (typeof window === "undefined") return null;
  if (!cachedCeladonGym) {
    cachedCeladonGym = new Image();
    cachedCeladonGym.src = "/assets/rpg/gym_celadon.png";
  }
  return cachedCeladonGym;
}

if (typeof window !== "undefined") {
  getCeladonGymImage();
}

/**
 * Renders the Celadon City / Portuguese Library Gym interior using 100% authentic FireRed pixel art
 */
export function drawPortugueseLibInterior(
  ctx: CanvasRenderingContext2D,
  tileSize: number,
  viewWidth: number,
  viewHeight: number,
  openedPedestals: Record<string, boolean> = {},
  animTick: number = 0,
  characters?: Record<string, HTMLImageElement>,
  gymBgImg?: HTMLImageElement | null
) {
  // 1. Dark Void Background
  ctx.fillStyle = "#022c22";
  ctx.fillRect(-tileSize * 15, -tileSize * 15, (PORTUGUESE_LIB_COLS + 30) * tileSize, (PORTUGUESE_LIB_ROWS + 30) * tileSize);

  // 2. Authentic FireRed Celadon Gym Background
  const bg = gymBgImg || getCeladonGymImage();
  if (bg && bg.complete && bg.naturalWidth > 0) {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(bg, 0, 0, PORTUGUESE_LIB_COLS * tileSize, PORTUGUESE_LIB_ROWS * tileSize);
  }

  // 3. Characters inside the Gym
  if (characters) {
    // Leader Sofia at (6, 3)
    const leaderImg = characters["picnic"] || characters["villager2"];
    if (leaderImg && leaderImg.complete && leaderImg.naturalWidth > 0) {
      ctx.drawImage(leaderImg, 0, 0, 32, 32, 6 * tileSize + 4, 3 * tileSize - 2, tileSize - 8, tileSize);
    }

    // Student Clara at (4, 11)
    const studentImg = characters["girl"] || characters["villager"];
    if (studentImg && studentImg.complete && studentImg.naturalWidth > 0) {
      ctx.drawImage(studentImg, 0, 0, 32, 32, 4 * tileSize + 4, 11 * tileSize, tileSize - 8, tileSize);
    }
  }

  // 4. Dicionário Pedestal at (8, 11)
  const isOpened = openedPedestals["lib_pedestal_1"];
  const pedX = 8 * tileSize;
  const pedY = 11 * tileSize;
  if (!isOpened) {
    const pulse = Math.sin(animTick * 4) * 0.2 + 0.8;
    ctx.fillStyle = `rgba(52, 211, 153, ${pulse})`;
    ctx.beginPath();
    ctx.arc(pedX + tileSize / 2, pedY + tileSize / 2, 8, 0, Math.PI * 2);
    ctx.fill();
  }
}
