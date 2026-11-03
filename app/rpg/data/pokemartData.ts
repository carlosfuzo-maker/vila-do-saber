export const POKEMART_COLS = 11;
export const POKEMART_ROWS = 9;

export interface MartInteractable {
  x: number;
  y: number;
  name: string;
  type: "clerk" | "shelf_pokeballs" | "shelf_potions" | "shelf_stones" | "promo" | "plant" | "exit";
}

// Module-level image cache for authentic PokéMart
let cachedMartInside: HTMLImageElement | null = null;

export function getMartInsideImage(): HTMLImageElement | null {
  if (typeof window === "undefined") return null;
  if (!cachedMartInside) {
    cachedMartInside = new Image();
    cachedMartInside.src = "/assets/rpg/mart_inside.png";
  }
  return cachedMartInside;
}

if (typeof window !== "undefined") {
  getMartInsideImage();
}

export const MART_INTERACTABLES: MartInteractable[] = [
  // Mart Clerk behind the counter (x: 2..3, y: 2..4)
  { x: 2, y: 2, name: "Atendente do PokéMart", type: "clerk" },
  { x: 2, y: 3, name: "Atendente do PokéMart", type: "clerk" },
  { x: 3, y: 2, name: "Balcão de Compras", type: "clerk" },
  { x: 3, y: 3, name: "Balcão de Compras", type: "clerk" },
  { x: 3, y: 4, name: "Balcão de Compras", type: "clerk" },

  // Gôndola 1: Pokébolas & Poções (x: 6..7, y: 3..6)
  { x: 6, y: 3, name: "Prateleira de Pokébolas", type: "shelf_pokeballs" },
  { x: 7, y: 3, name: "Prateleira de Pokébolas", type: "shelf_pokeballs" },
  { x: 6, y: 4, name: "Prateleira de Poções & Cura", type: "shelf_potions" },
  { x: 7, y: 4, name: "Prateleira de Poções & Cura", type: "shelf_potions" },

  // Gôndola 2: Pedras Evolutivas & Frutas (x: 9..10, y: 3..6)
  { x: 9, y: 3, name: "Prateleira de Pedras Elementais", type: "shelf_stones" },
  { x: 10, y: 3, name: "Prateleira de Pedras Elementais", type: "shelf_stones" },
  { x: 9, y: 4, name: "Prateleira de Frutas Silvestres", type: "shelf_stones" },
  { x: 10, y: 4, name: "Prateleira de Frutas Silvestres", type: "shelf_stones" },

  // Cesto Promocional & Mural
  { x: 8, y: 1, name: "Mural de Ofertas Especiais", type: "promo" },

  // Decorative plant (x: 1, y: 2)
  { x: 1, y: 2, name: "Planta Decorativa do Mart", type: "plant" },

  // Exit threshold (Exclusively on bottom red doormat: x: 4..5, y: 8)
  { x: 4, y: 8, name: "Porta de Saída do PokéMart", type: "exit" },
  { x: 5, y: 8, name: "Porta de Saída do PokéMart", type: "exit" },
];

/**
 * Checks if a tile is walkable inside the PokéMart
 */
export function isPokemartWalkable(x: number, y: number): boolean {
  // Boundary walls
  if (x < 1 || x > 9 || y < 1 || y > 7) {
    if ((x === 4 || x === 5) && y === 8) return true; // Exit door mat
    return false;
  }

  // Top wall
  if (y === 1) return false;

  // Clerk Counter (x: 1..3, y: 2..4)
  if (x >= 1 && x <= 3 && y >= 2 && y <= 4) return false;

  // Shelf aisle 1 (x: 6..7, y: 3..5)
  if ((x === 6 || x === 7) && (y >= 3 && y <= 5)) return false;

  // Shelf aisle 2 (x: 9..10, y: 3..5)
  if ((x === 9 || x === 10) && (y >= 3 && y <= 5)) return false;

  return true;
}

/**
 * Finds an interactable object at the given position or in front of the player
 */
export function getPokemartInteractable(x: number, y: number): MartInteractable | null {
  return MART_INTERACTABLES.find((item) => item.x === x && item.y === y) || null;
}

/**
 * Renders the authentic FireRed GBA PokéMart Interior
 */
export function drawPokemartInterior(
  ctx: CanvasRenderingContext2D,
  tileSize: number,
  viewWidth: number,
  viewHeight: number,
  clerkSprite?: HTMLImageElement | null,
  pokeBallImg?: HTMLImageElement | null,
  potionImg?: HTMLImageElement | null,
  martBgImg?: HTMLImageElement | null
) {
  // 1. Dark surrounding void
  ctx.fillStyle = "#090d16";
  ctx.fillRect(-tileSize * 15, -tileSize * 15, (POKEMART_COLS + 30) * tileSize, (POKEMART_ROWS + 30) * tileSize);

  // 2. Authentic FireRed GBA PokéMart Interior Map
  const bg = martBgImg || getMartInsideImage();
  ctx.imageSmoothingEnabled = false;

  if (bg && bg.complete && bg.naturalWidth > 0) {
    ctx.drawImage(bg, 0, 0, POKEMART_COLS * tileSize, POKEMART_ROWS * tileSize);
  }

  // 3. Clerk NPC behind the counter (x: 2, y: 2.5)
  const clerkX = 2 * tileSize + 4;
  const clerkY = 2 * tileSize + 2;
  if (clerkSprite && clerkSprite.complete && clerkSprite.naturalWidth > 0) {
    ctx.drawImage(clerkSprite, 0, 0, 32, 32, clerkX, clerkY, tileSize - 8, tileSize);
  }
}
