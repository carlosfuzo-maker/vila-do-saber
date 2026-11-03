// Authentic Pokémon FireRed - Mt. Moon / Cavern Interior (48x40 GBA Grid)
// Official GBA Dimensions: 768px x 640px = 48 x 40 tiles (16px)

export const CAVE_COLS = 48;
export const CAVE_ROWS = 40;

export interface CaveInteractable {
  x: number;
  y: number;
  name: string;
  type: "exit" | "rock" | "fossil" | "crystal" | "npc_geologist" | "spring";
  id?: string;
}

export const INITIAL_CAVE_INTERACTABLES: CaveInteractable[] = [
  // Cave Exit (Ladder of light at bottom center-left: 17..19, 38..39)
  { x: 17, y: 38, name: "Escada de Saída para o Exterior", type: "exit" },
  { x: 18, y: 38, name: "Escada de Saída para o Exterior", type: "exit" },
  { x: 19, y: 38, name: "Escada de Saída para o Exterior", type: "exit" },

  // Smashable Cave Boulders (Rock Smash "R")
  { x: 18, y: 25, name: "Rocha Rachada Subterrânea", type: "rock", id: "rock_1" },
  { x: 28, y: 28, name: "Rocha de Quartzo Antiga", type: "rock", id: "rock_2" },
  { x: 15, y: 18, name: "Rocha Sedimentar Fraturada", type: "rock", id: "rock_3" },
  { x: 32, y: 16, name: "Muralha de Rocha Rachada", type: "rock", id: "rock_4" },

  // Prehistoric Wall Fossil
  { x: 24, y: 8, name: "Fóssil Ancestral de Kabutops Incrustado", type: "fossil" },
  { x: 25, y: 8, name: "Fóssil Ancestral de Omanyte", type: "fossil" },

  // Glowing Phosphorescent Crystals & Moon Stones
  { x: 10, y: 12, name: "Cristal Brilhante de Quartzo Ciano", type: "crystal" },
  { x: 38, y: 14, name: "Geodo de Ametista Iluminado", type: "crystal" },
  { x: 8, y: 32, name: "Pedra da Lua Brilhante de Mt. Moon", type: "crystal" },
  { x: 36, y: 32, name: "Cristal de Pirita Dourada", type: "crystal" },

  // Subterranean Natural Spring
  { x: 12, y: 22, name: "Nascente de Água Pura Subterrânea", type: "spring" },

  // Geologist / Archaeologist Researcher
  { x: 22, y: 30, name: "Dr. Rocha (Geólogo da Liga)", type: "npc_geologist" },
];

/**
 * Rigid Walkability collision logic for Cavern (48 cols x 40 rows)
 */
export function isCaveTileWalkable(
  x: number,
  y: number,
  brokenRocks: Record<string, boolean> = {}
): boolean {
  // Exit ladder opening
  if (x >= 17 && x <= 19 && y >= 38) return true;

  // Cave Boundary Walls
  if (x < 4 || x > 44 || y < 4 || y > 38) {
    return false;
  }

  // Giant Fossil wall at top
  if (y <= 8 && (x >= 23 && x <= 26)) return false;

  // Natural cave rock pillar clusters
  if (x >= 20 && x <= 26 && y >= 14 && y <= 20) return false;
  if (x >= 8 && x <= 14 && y >= 8 && y <= 12) return false;
  if (x >= 32 && x <= 38 && y >= 20 && y <= 26) return false;
  if (x >= 28 && x <= 36 && y >= 6 && y <= 10) return false;
  if (x >= 8 && x <= 13 && y >= 26 && y <= 30) return false;

  // Natural underground pool (x: 11..13, y: 21..23)
  if (x >= 11 && x <= 13 && y >= 21 && y <= 23) return false;

  // Smashable Rocks
  if (x === 18 && y === 25 && !brokenRocks["rock_1"]) return false;
  if (x === 28 && y === 28 && !brokenRocks["rock_2"]) return false;
  if (x === 15 && y === 18 && !brokenRocks["rock_3"]) return false;
  if (x === 32 && y === 16 && !brokenRocks["rock_4"]) return false;

  // Geologist Dr. Rocha (x: 22, y: 30)
  if (x === 22 && y === 30) return false;

  return true;
}

// Module-level image cache for authentic Cavern Map
let cachedCaveMap: HTMLImageElement | null = null;

export function getCaveMapImage(): HTMLImageElement | null {
  if (typeof window === "undefined") return null;
  if (!cachedCaveMap) {
    cachedCaveMap = new Image();
    cachedCaveMap.src = "/assets/rpg/cave_map.png";
  }
  return cachedCaveMap;
}

if (typeof window !== "undefined") {
  getCaveMapImage();
}

/**
 * Finds an interactable object inside the Cavern
 */
export function getCaveInteractable(x: number, y: number): CaveInteractable | null {
  return INITIAL_CAVE_INTERACTABLES.find((item) => item.x === x && item.y === y) || null;
}

/**
 * Renders the authentic FireRed GBA Cavern Interior
 */
export function drawCaveInterior(
  ctx: CanvasRenderingContext2D,
  tileSize: number,
  viewWidth: number,
  viewHeight: number,
  brokenRocks: Record<string, boolean> = {},
  animTick: number = 0,
  caveBgImg?: HTMLImageElement | null,
  outdoorTiles?: HTMLImageElement | null,
  characters?: Record<string, HTMLImageElement>
) {
  // 1. Dark surrounding void
  ctx.fillStyle = "#050811";
  ctx.fillRect(-tileSize * 15, -tileSize * 15, (CAVE_COLS + 30) * tileSize, (CAVE_ROWS + 30) * tileSize);

  // 2. Check if authentic FireRed GBA Cavern Map is available
  const bg = caveBgImg || getCaveMapImage();
  if (bg && bg.complete && bg.naturalWidth > 0) {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(bg, 0, 0, CAVE_COLS * tileSize, CAVE_ROWS * tileSize);

    // Dynamic overlays on top of authentic Cavern map
    // A. Smashable Rocks (Rock Smash)
    [
      { x: 18, y: 25, id: "rock_1" },
      { x: 28, y: 28, id: "rock_2" },
      { x: 15, y: 18, id: "rock_3" },
      { x: 32, y: 16, id: "rock_4" },
    ].forEach((rock) => {
      const rx = rock.x * tileSize;
      const ry = rock.y * tileSize;
      if (!brokenRocks[rock.id]) {
        if (outdoorTiles && outdoorTiles.complete && outdoorTiles.naturalWidth > 0) {
          ctx.drawImage(outdoorTiles, 224, 96, 32, 32, rx, ry, tileSize, tileSize);
        }
      }
    });

    // B. Geologist Dr. Rocha at (22, 30)
    if (characters) {
      const profImg = characters["prof"] || characters["villager"];
      if (profImg && profImg.complete && profImg.naturalWidth > 0) {
        ctx.drawImage(profImg, 0, 0, 32, 32, 22 * tileSize + 4, 30 * tileSize + 2, tileSize - 8, tileSize - 4);
      }
    }

    return;
  }
}

/**
 * Renders the rocky cliff face & cave entrance opening on the Overworld
 */
export function drawCaveOverworldEntrance(
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  tileSize: number,
  doorX: number = 35,
  doorY: number = 5,
  outdoorTiles?: HTMLImageElement | null
) {
  const hasOutdoor = outdoorTiles && outdoorTiles.complete && outdoorTiles.naturalWidth > 0;

  // 1. Rocky mountain cliff face
  for (let c = startX; c <= endX; c++) {
    for (let r = startY; r <= endY; r++) {
      if (c === doorX && r === doorY) continue; // Cave Entrance Hole
      const tx = c * tileSize;
      const ty = r * tileSize;
      if (hasOutdoor) {
        ctx.drawImage(outdoorTiles, 224, 96, 32, 32, tx, ty, tileSize, tileSize);
      }
    }
  }

  // 2. Cave Entrance Portal Hole
  const holeX = doorX * tileSize + 2;
  const holeY = doorY * tileSize;
  const holeW = tileSize - 4;
  const holeH = tileSize;

  ctx.fillStyle = "#020617";
  ctx.fillRect(holeX, holeY, holeW, holeH);
}
