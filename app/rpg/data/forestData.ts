// Authentic Pokémon FireRed - Viridian Forest Interior (54x69 GBA Grid)
// Official GBA Dimensions: 864px x 1104px = 54 x 69 tiles (16px)

export const FOREST_COLS = 54;
export const FOREST_ROWS = 69;

export interface ForestInteractable {
  x: number;
  y: number;
  name: string;
  type:
    | "exit"
    | "cut_bush"
    | "stump"
    | "chest"
    | "item_ball"
    | "npc_biologist"
    | "npc_bugcatcher"
    | "npc_ranger"
    | "cabin_door"
    | "flower_patch"
    | "stream";
  id?: string;
}

export const INITIAL_FOREST_INTERACTABLES: ForestInteractable[] = [
  // 1. Forest South Exit (Gatehouse archway at bottom center: cols 28..30, rows 67..68)
  { x: 28, y: 68, name: "Portão de Saída para a Vila do Saber", type: "exit" },
  { x: 29, y: 68, name: "Portão de Saída para a Vila do Saber", type: "exit" },
  { x: 30, y: 68, name: "Portão de Saída para a Vila do Saber", type: "exit" },

  // 2. Ranger Robson (Rest area & ecology mentor)
  { x: 25, y: 58, name: "Robson (Guarda-Parque & Ecologista)", type: "npc_ranger" },

  // 3. Bióloga Bia (Metamorphosis & Lifecycle Quiz)
  { x: 32, y: 50, name: "Bia (Bióloga & Entomologista)", type: "npc_biologist" },

  // 4. Samuca Caçador de Insetos (Bug Catcher with Net)
  { x: 20, y: 38, name: "Samuca (Caçador de Insetos)", type: "npc_bugcatcher" },

  // 5. Hollow Tree Stump with Forest Berries
  { x: 26, y: 48, name: "Tronco Oco com Frutas Silvestres", type: "stump" },

  // 6. Secret Cut Bush (Guarding Hidden Leaf Stone Chest)
  { x: 22, y: 44, name: "Arbusto de Espinhos da Floresta", type: "cut_bush", id: "forest_bush_1" },

  // 7. Hidden Golden Treasure Chest behind the Cut Bush
  { x: 22, y: 43, name: "Baú Dourado Secreto da Floresta", type: "chest", id: "forest_chest_1" },

  // 8. Fallen Item Balls (Pokébolas perdidas na grama)
  { x: 38, y: 54, name: "Pokébola Perdida no Bosque", type: "item_ball", id: "forest_ball_1" },
  { x: 12, y: 30, name: "Super Bola Brilhante", type: "item_ball", id: "forest_ball_2" },
  { x: 42, y: 22, name: "Ultra Bola Rara", type: "item_ball", id: "forest_ball_3" },

  // 9. Rare Glowing Flower Patches
  { x: 24, y: 62, name: "Canteiro de Orquídeas Raras de Kanto", type: "flower_patch" },
  { x: 34, y: 46, name: "Flores Polinizadas por Butterfree", type: "flower_patch" },
];

/**
 * Checks if a tile is tall grass (only tiles that trigger wild battles)
 */
export function isForestTallGrass(x: number, y: number): boolean {
  // Patch 1: South-West Grove (cols 10..16, rows 48..56)
  if (x >= 10 && x <= 16 && y >= 48 && y <= 56) return true;
  // Patch 2: Central Path Grove (cols 20..26, rows 32..40)
  if (x >= 20 && x <= 26 && y >= 32 && y <= 40) return true;
  // Patch 3: South-East Meadow (cols 34..40, rows 44..52)
  if (x >= 34 && x <= 40 && y >= 44 && y <= 52) return true;
  // Patch 4: North Deep Maze (cols 18..30, rows 16..24)
  if (x >= 18 && x <= 30 && y >= 16 && y <= 24) return true;

  return false;
}

/**
 * Rigid Walkability collision logic for Viridian Forest (54 cols x 69 rows)
 */
export function isForestTileWalkable(
  x: number,
  y: number,
  cutBushes: Record<string, boolean> = {}
): boolean {
  // South Exit gatehouse opening
  if ((x >= 28 && x <= 30) && y >= 68) return true;

  // Outer dense boundary tree walls
  if (x < 4 || x > 49 || y < 4 || y > 67) {
    return false;
  }

  // Inner dense tree clusters & fences of Viridian Forest
  if ((x >= 12 && x <= 16) && (y >= 40 && y <= 44)) return false;
  if ((x >= 32 && x <= 36) && (y >= 34 && y <= 38)) return false;
  if ((x >= 14 && x <= 18) && (y >= 26 && y <= 30)) return false;
  if ((x >= 36 && x <= 42) && (y >= 18 && y <= 22)) return false;
  if ((x >= 24 && x <= 28) && (y >= 10 && y <= 14)) return false;

  // Hollow Tree Stump at (x: 26, y: 48)
  if (x === 26 && y === 48) return false;

  // Cut Bush at (x: 22, y: 44)
  if (x === 22 && y === 44 && !cutBushes["forest_bush_1"]) return false;

  // Secret Chest at (x: 22, y: 43)
  if (x === 22 && y === 43) return false;

  // NPCs (Rigid obstacles to bump into for dialog)
  if (x === 25 && y === 58) return false; // Robson
  if (x === 32 && y === 50) return false; // Bia
  if (x === 20 && y === 38) return false; // Samuca

  return true;
}

/**
 * Finds an interactable object inside the Forest
 */
export function getForestInteractable(x: number, y: number): ForestInteractable | null {
  return INITIAL_FOREST_INTERACTABLES.find((item) => item.x === x && item.y === y) || null;
}

// Module-level image cache for authentic Viridian Forest Map
let cachedForestMap: HTMLImageElement | null = null;

export function getForestMapImage(): HTMLImageElement | null {
  if (typeof window === "undefined") return null;
  if (!cachedForestMap) {
    cachedForestMap = new Image();
    cachedForestMap.src = "/assets/rpg/forest_map.png";
  }
  return cachedForestMap;
}

if (typeof window !== "undefined") {
  getForestMapImage();
}

/**
 * Renders the authentic FireRed GBA Viridian Forest Interior (54x69 GBA Grid)
 */
export function drawForestInterior(
  ctx: CanvasRenderingContext2D,
  tileSize: number,
  viewWidth: number,
  viewHeight: number,
  cutBushes: Record<string, boolean> = {},
  openedChests: Record<string, boolean> = {},
  animTick: number = 0,
  forestBgImg?: HTMLImageElement | null,
  outdoorTiles?: HTMLImageElement | null,
  characters?: Record<string, HTMLImageElement>,
  itemSprites?: Record<string, HTMLImageElement>
) {
  // 1. Deep Forest Void Background
  ctx.fillStyle = "#052212";
  ctx.fillRect(-tileSize * 15, -tileSize * 15, (FOREST_COLS + 30) * tileSize, (FOREST_ROWS + 30) * tileSize);

  // 2. Check if authentic FireRed GBA Viridian Forest Map is available
  const bg = forestBgImg || getForestMapImage();
  if (bg && bg.complete && bg.naturalWidth > 0) {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(bg, 0, 0, FOREST_COLS * tileSize, FOREST_ROWS * tileSize);

    // Dynamic overlays on top of authentic Forest map
    // A. Cut Bush at (22, 44)
    const bushX = 22 * tileSize;
    const bushY = 44 * tileSize;
    if (!cutBushes["forest_bush_1"]) {
      if (outdoorTiles && outdoorTiles.complete && outdoorTiles.naturalWidth > 0) {
        ctx.drawImage(outdoorTiles, 32, 32, 32, 32, bushX, bushY, tileSize, tileSize);
      }
    }

    // B. Secret Item at (22, 43)
    const chestX = 22 * tileSize;
    const chestY = 43 * tileSize;
    const isChestOpened = openedChests["forest_chest_1"];
    const pokeBallImg = itemSprites?.["items_pokeball"];
    if (!isChestOpened && pokeBallImg && pokeBallImg.complete && pokeBallImg.naturalWidth > 0) {
      ctx.drawImage(pokeBallImg, chestX + 8, chestY + 8, 24, 24);
    }

    // C. Fallen Item Pokéballs
    [
      { x: 38, y: 54, id: "forest_ball_1" },
      { x: 12, y: 30, id: "forest_ball_2" },
      { x: 42, y: 22, id: "forest_ball_3" },
    ].forEach((item) => {
      if (!openedChests[item.id]) {
        const bx = item.x * tileSize;
        const by = item.y * tileSize;
        if (pokeBallImg && pokeBallImg.complete && pokeBallImg.naturalWidth > 0) {
          ctx.drawImage(pokeBallImg, bx + 8, by + 8, 24, 24);
        }
      }
    });

    // D. NPCs with authentic FireRed character charsets
    if (characters) {
      // Robson (Forest Ranger) at (25, 58)
      const scoutImg = characters["scout"] || characters["villager"];
      if (scoutImg && scoutImg.complete && scoutImg.naturalWidth > 0) {
        ctx.drawImage(scoutImg, 0, 0, 32, 32, 25 * tileSize + 4, 58 * tileSize + 2, tileSize - 8, tileSize - 4);
      }
      // Biologist Bia at (32, 50)
      const picnicImg = characters["picnic"] || characters["villager2"];
      if (picnicImg && picnicImg.complete && picnicImg.naturalWidth > 0) {
        ctx.drawImage(picnicImg, 0, 0, 32, 32, 32 * tileSize + 4, 50 * tileSize + 2, tileSize - 8, tileSize - 4);
      }
      // Bug Catcher Samuca at (20, 38)
      if (scoutImg && scoutImg.complete && scoutImg.naturalWidth > 0) {
        ctx.drawImage(scoutImg, 32, 0, 32, 32, 20 * tileSize + 4, 38 * tileSize + 2, tileSize - 8, tileSize - 4);
      }
    }

    return;
  }
}

/**
 * Draws the authentic Viridian Forest Overworld Gatehouse Archway (Route 2 -> Forest)
 */
export function drawForestOverworldGate(
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  tileSize: number,
  doorX: number = 17,
  doorY: number = 4,
  outdoorTiles?: HTMLImageElement | null
) {
  const hasOutdoor = outdoorTiles && outdoorTiles.complete && outdoorTiles.naturalWidth > 0;

  // 1. Forest boundary trees flanking the gatehouse
  for (let c = startX; c <= endX; c++) {
    for (let r = startY; r <= endY; r++) {
      if (c === doorX && r === doorY) continue; // Door threshold
      const tx = c * tileSize;
      const ty = r * tileSize;
      if (hasOutdoor) {
        ctx.drawImage(outdoorTiles, 0, 0, 32, 32, tx, ty, tileSize, tileSize);
        ctx.drawImage(outdoorTiles, 192, 32, 32, 64, tx, ty - tileSize, tileSize, tileSize * 2);
      }
    }
  }

  // 2. Gatehouse Archway timber posts and dark entrance opening
  const gateX = doorX * tileSize;
  const gateY = doorY * tileSize;

  if (hasOutdoor) {
    ctx.drawImage(outdoorTiles, 32, 768, 32, 32, gateX - tileSize, gateY, tileSize, tileSize);
    ctx.drawImage(outdoorTiles, 32, 768, 32, 32, gateX + tileSize, gateY, tileSize, tileSize);
  }

  ctx.fillStyle = "#022c22";
  ctx.fillRect(gateX + 2, gateY, tileSize - 4, tileSize);
}
