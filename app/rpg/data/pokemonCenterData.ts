// Authentic Pokémon FireRed - Pokémon Center Interior (15x10 GBA Grid)
// Official GBA Dimensions: 240px x 160px = 15 x 10 tiles (16px)

export const POKEMON_CENTER_COLS = 15;
export const POKEMON_CENTER_ROWS = 10;

export interface CenterInteractable {
  x: number;
  y: number;
  name: string;
  type: "joy" | "machine" | "pc" | "sofa" | "map" | "sign" | "plant" | "exit";
}

// Module-level image cache for authentic Pokémon Center
let cachedCenterInside: HTMLImageElement | null = null;

export function getCenterInsideImage(): HTMLImageElement | null {
  if (typeof window === "undefined") return null;
  if (!cachedCenterInside) {
    cachedCenterInside = new Image();
    cachedCenterInside.src = "/assets/rpg/center_inside.png";
  }
  return cachedCenterInside;
}

if (typeof window !== "undefined") {
  getCenterInsideImage();
}

export const CENTER_INTERACTABLES: CenterInteractable[] = [
  // Nurse Joy & Healing Machine at the Counter
  { x: 7, y: 2, name: "Enfermeira Joy", type: "joy" },
  { x: 8, y: 2, name: "Máquina de Cura de Pokébolas", type: "machine" },
  { x: 7, y: 3, name: "Balcão de Atendimento", type: "joy" },
  { x: 8, y: 3, name: "Balcão da Máquina de Cura", type: "machine" },

  // PC de Treinadores at top right
  { x: 12, y: 2, name: "Poké-PC do Centro Pokémon", type: "pc" },
  { x: 13, y: 2, name: "Poké-PC do Centro Pokémon", type: "pc" },

  // Map & Info
  { x: 3, y: 1, name: "Mapa Oficial de Kanto & Johto", type: "map" },
  { x: 11, y: 1, name: "Painel de Dicas da Liga", type: "sign" },

  // Resting area sofas on left
  { x: 1, y: 5, name: "Sofá Macio de Descanso", type: "sofa" },
  { x: 1, y: 6, name: "Sofá Macio de Descanso", type: "sofa" },
  { x: 2, y: 5, name: "Mesa de Café da Liga", type: "sofa" },

  // Potted plants
  { x: 1, y: 2, name: "Vaso de Planta do Centro", type: "plant" },
  { x: 13, y: 6, name: "Planta Decorativa", type: "plant" },

  // Exit threshold (Exclusively on bottom red doormat: x: 7, y: 8..9)
  { x: 7, y: 8, name: "Porta de Saída", type: "exit" },
  { x: 7, y: 9, name: "Porta de Saída", type: "exit" },
];

/**
 * Checks if a tile is walkable inside the Pokémon Center (15x10 GBA Grid)
 */
export function isPokemonCenterWalkable(x: number, y: number): boolean {
  // Exit doorway at bottom red mat (x: 7, y: 8..9)
  if (x === 7 && (y === 8 || y === 9)) return true;

  // Boundary walls
  if (x < 1 || x > 13 || y < 2 || y > 8) {
    return false;
  }

  // Top wall / counter furniture
  if (y === 2) return false;

  // Central Reception Counter desk front (cols: 4..10, row: 3)
  if (y === 3 && (x >= 4 && x <= 10)) return false;

  // Resting table on left
  if (x === 1 && (y === 5 || y === 6)) return false;

  return true;
}

/**
 * Finds an interactable object at the given position or in front of the player
 */
export function getPokemonCenterInteractable(x: number, y: number): CenterInteractable | null {
  return CENTER_INTERACTABLES.find((item) => item.x === x && item.y === y) || null;
}

/**
 * Renders the authentic FireRed GBA Pokémon Center Interior (15x10 tiles)
 */
export function drawPokemonCenterInterior(
  ctx: CanvasRenderingContext2D,
  tileSize: number,
  viewWidth: number,
  viewHeight: number,
  healingProgress: number = 0, // 0 to 6 representing lit Pokeballs during heal
  nurseSprite?: HTMLImageElement | null,
  centerBgImg?: HTMLImageElement | null
) {
  // 1. Dark surrounding void
  ctx.fillStyle = "#090d16";
  ctx.fillRect(-tileSize * 15, -tileSize * 15, (POKEMON_CENTER_COLS + 30) * tileSize, (POKEMON_CENTER_ROWS + 30) * tileSize);

  // 2. Authentic FireRed GBA Pokémon Center Interior Map
  const bg = centerBgImg || getCenterInsideImage();
  ctx.imageSmoothingEnabled = false;

  if (bg && bg.complete && bg.naturalWidth > 0) {
    ctx.drawImage(bg, 0, 0, POKEMON_CENTER_COLS * tileSize, POKEMON_CENTER_ROWS * tileSize);
  }

  // 3. Nurse Joy behind the Counter (x: 7, y: 2)
  const joyX = 7 * tileSize + 4;
  const joyY = 2 * tileSize + 2;
  if (nurseSprite && nurseSprite.complete && nurseSprite.naturalWidth > 0) {
    ctx.drawImage(nurseSprite, 0, 0, 32, 32, joyX, joyY, tileSize - 8, tileSize);
  }

  // 4. Healing Pokéballs Machine Animation on Counter (x: 8, y: 2)
  if (healingProgress > 0) {
    const machX = 8 * tileSize;
    const machY = 2 * tileSize;
    const slots = [
      { dx: 4, dy: 4 },
      { dx: 14, dy: 4 },
      { dx: 4, dy: 12 },
      { dx: 14, dy: 12 },
      { dx: 4, dy: 20 },
      { dx: 14, dy: 20 },
    ];
    for (let i = 0; i < Math.min(6, healingProgress); i++) {
      const s = slots[i];
      // Glowing green / yellow restoration light
      ctx.fillStyle = "rgba(74, 222, 128, 0.85)";
      ctx.beginPath();
      ctx.arc(machX + s.dx + 4, machY + s.dy + 4, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(machX + s.dx + 4, machY + s.dy + 4, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
