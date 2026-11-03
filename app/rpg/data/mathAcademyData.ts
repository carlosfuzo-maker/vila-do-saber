// Authentic Pokémon FireRed - Pewter City Gym / Math Academy Interior (12x15 GBA Grid)
// Official GBA Dimensions: 192px x 240px (+4px border) = 12 x 15 tiles (16px)

export const MATH_ACADEMY_COLS = 12;
export const MATH_ACADEMY_ROWS = 15;

export interface MathAcademyInteractable {
  x: number;
  y: number;
  name: string;
  type: "exit" | "leader_pythagoras" | "npc_student" | "statue" | "blackboard" | "pedestal";
  id?: string;
}

export const INITIAL_MATH_INTERACTABLES: MathAcademyInteractable[] = [
  // Exit mat at bottom center (x: 5..6, y: 14)
  { x: 5, y: 14, name: "Porta de Saída para Pewter City", type: "exit" },
  { x: 6, y: 14, name: "Porta de Saída para Pewter City", type: "exit" },

  // Gym Statues at entrance
  { x: 2, y: 13, name: "Estátua do Ginásio de Pedra & Matemática", type: "statue" },
  { x: 9, y: 13, name: "Estátua do Ginásio de Pedra & Matemática", type: "statue" },

  // Blackboard with math formulas along top wall
  { x: 5, y: 2, name: "Quadro Negro de Cálculos e Geometria", type: "blackboard" },
  { x: 6, y: 2, name: "Quadro Negro de Cálculos e Geometria", type: "blackboard" },

  // Gym Leader Mestre Pitágoras on the elevated arena platform
  { x: 5, y: 3, name: "Mestre Pitágoras (Líder do Ginásio de Matemática)", type: "leader_pythagoras" },
  { x: 6, y: 3, name: "Mestre Pitágoras (Líder do Ginásio de Matemática)", type: "leader_pythagoras" },

  // Student Tales on the floor
  { x: 4, y: 7, name: "Tales (Estudante de Geometria)", type: "npc_student" },

  // Enigma Pedestal with Math Coins
  { x: 7, y: 7, name: "Pedestal do Enigma da Tabuada", type: "pedestal", id: "math_pedestal_1" },
];

/**
 * Rigid Walkability collision logic for Math Academy (12 cols x 15 rows)
 */
export function isMathAcademyWalkable(x: number, y: number): boolean {
  // Exit door mat at bottom center (x: 5..6, y: 14)
  if ((x === 5 || x === 6) && y === 14) return true;

  // Outer boundary walls
  if (x < 1 || x > 10 || y < 2 || y > 13) {
    return false;
  }

  // Top blackboard & arena backdrop
  if (y <= 2) return false;

  // Gym Statues at entrance (x: 2, 9, y: 13)
  if ((x === 2 || x === 9) && y === 13) return false;

  // Pythagoras at elevated platform (x: 5..6, y: 3)
  if ((x === 5 || x === 6) && y === 3) return false;

  // Student Tales at (4, 7)
  if (x === 4 && y === 7) return false;

  // Enigma Pedestal at (7, 7)
  if (x === 7 && y === 7) return false;

  // Arena Corner Rock Pillars (left: cols 2..3, rows 6..8; right: cols 8..9, rows 6..8)
  if ((x === 2 || x === 3) && (y >= 6 && y <= 8)) return false;
  if ((x === 8 || x === 9) && (y >= 6 && y <= 8)) return false;

  // Elevated platform side railings (cols 3, 8 along rows 3..5)
  if ((x === 3 || x === 8) && (y >= 3 && y <= 5)) return false;

  return true;
}

export function getMathAcademyInteractable(x: number, y: number): MathAcademyInteractable | null {
  return INITIAL_MATH_INTERACTABLES.find((item) => item.x === x && item.y === y) || null;
}

let cachedPewterGym: HTMLImageElement | null = null;
export function getPewterGymImage(): HTMLImageElement | null {
  if (typeof window === "undefined") return null;
  if (!cachedPewterGym) {
    cachedPewterGym = new Image();
    cachedPewterGym.src = "/assets/rpg/gym_pewter.png";
  }
  return cachedPewterGym;
}

if (typeof window !== "undefined") {
  getPewterGymImage();
}

/**
 * Renders the Pewter City Rock / Math Academy Gym interior using 100% authentic FireRed pixel art
 */
export function drawMathAcademyInterior(
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
  ctx.fillStyle = "#0c0a09";
  ctx.fillRect(-tileSize * 15, -tileSize * 15, (MATH_ACADEMY_COLS + 30) * tileSize, (MATH_ACADEMY_ROWS + 30) * tileSize);

  // 2. Authentic FireRed Pewter Gym Background
  const bg = gymBgImg || getPewterGymImage();
  if (bg && bg.complete && bg.naturalWidth > 0) {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(bg, 0, 0, MATH_ACADEMY_COLS * tileSize, MATH_ACADEMY_ROWS * tileSize);
  }

  // 3. Characters inside the Gym
  if (characters) {
    // Leader Pythagoras at (5, 3)
    const leaderImg = characters["parent"] || characters["villager"];
    if (leaderImg && leaderImg.complete && leaderImg.naturalWidth > 0) {
      ctx.drawImage(leaderImg, 0, 0, 32, 32, 5 * tileSize + 4, 3 * tileSize - 2, tileSize - 8, tileSize);
    }

    // Student Tales at (4, 7)
    const studentImg = characters["boy"] || characters["villager2"];
    if (studentImg && studentImg.complete && studentImg.naturalWidth > 0) {
      ctx.drawImage(studentImg, 0, 0, 32, 32, 4 * tileSize + 4, 7 * tileSize, tileSize - 8, tileSize);
    }
  }

  // 4. Enigma Pedestal at (7, 7)
  const isOpened = openedPedestals["math_pedestal_1"];
  const pedX = 7 * tileSize;
  const pedY = 7 * tileSize;
  if (!isOpened) {
    const pulse = Math.sin(animTick * 4) * 0.2 + 0.8;
    ctx.fillStyle = `rgba(234, 179, 8, ${pulse})`;
    ctx.beginPath();
    ctx.arc(pedX + tileSize / 2, pedY + tileSize / 2, 8, 0, Math.PI * 2);
    ctx.fill();
  }
}
