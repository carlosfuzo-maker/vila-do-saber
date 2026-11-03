// Authentic Pokémon FireRed - Vermilion Gym / English Tech Hub Interior (11x20 GBA Grid)
// Official GBA Dimensions: 176px x 320px (+4px border) = 11 x 20 tiles (16px)

export const ENGLISH_TOWER_COLS = 11;
export const ENGLISH_TOWER_ROWS = 20;

export interface EnglishTowerInteractable {
  x: number;
  y: number;
  name: string;
  type: "exit" | "leader_oliver" | "npc_student" | "server_rack" | "pedestal" | "computer_desk";
  id?: string;
}

export const INITIAL_ENGLISH_INTERACTABLES: EnglishTowerInteractable[] = [
  // Exit mat at bottom center (x: 5, y: 19)
  { x: 5, y: 19, name: "Porta de Saída para Vermilion City", type: "exit" },

  // Entrance Gym Statues (x: 2, y: 18 and x: 8, y: 18)
  { x: 2, y: 18, name: "Estátua do Ginásio Tecnológico de Vermilion", type: "computer_desk" },
  { x: 8, y: 18, name: "Estátua do Ginásio Tecnológico de Vermilion", type: "computer_desk" },

  // Professor Oliver at the Leader Command Platform (x: 5, y: 3)
  { x: 5, y: 3, name: "Professor Oliver (Líder do Ginásio de Inglês)", type: "leader_oliver" },

  // Student Alex (Bilingual Learner) at (x: 2, y: 10)
  { x: 2, y: 10, name: "Alex (Estudante Bilíngue)", type: "npc_student" },

  // Interactive Supercomputer Translation Terminal at (x: 8, y: 10)
  { x: 8, y: 10, name: "Supercomputador Tradutor Global", type: "pedestal", id: "english_pedestal_1" },

  // 15 Server Pods / Terminals (3x5 grid at cols 3, 5, 7 and rows 7, 9, 11, 13, 15)
  { x: 3, y: 7, name: "Terminal Servidor Alpha (Vocabulário)", type: "server_rack" },
  { x: 5, y: 7, name: "Terminal Servidor Beta (Gramática)", type: "server_rack" },
  { x: 7, y: 7, name: "Terminal Servidor Gamma (Conversação)", type: "server_rack" },

  { x: 3, y: 9, name: "Banco de Dados de Idiomas Kanto-Galar", type: "server_rack" },
  { x: 5, y: 9, name: "Roteador Satelital Quântico", type: "server_rack" },
  { x: 7, y: 9, name: "Módulo de Pronúncia Fonética", type: "server_rack" },

  { x: 3, y: 11, name: "Estação de Escuta e Fones de Ouvido", type: "computer_desk" },
  { x: 5, y: 11, name: "Unidade Central de Processamento de Texto", type: "server_rack" },
  { x: 7, y: 11, name: "Estação de Jogos e Quizzes de Inglês", type: "computer_desk" },

  { x: 3, y: 13, name: "Servidor de Dicionários Globais", type: "server_rack" },
  { x: 5, y: 13, name: "Receptor de Frequências Internacionais", type: "server_rack" },
  { x: 7, y: 13, name: "Subestação Elétrica de Alta Precisão", type: "server_rack" },

  { x: 3, y: 15, name: "Terminal de Teste de Proficiência", type: "server_rack" },
  { x: 5, y: 15, name: "Interruptor Elétrico do Painel Alpha", type: "server_rack" },
  { x: 7, y: 15, name: "Interruptor Elétrico do Painel Beta", type: "server_rack" },
];

/**
 * Rigid Walkability collision logic for English Tech Hub (11 cols x 20 rows)
 */
export function isEnglishTowerWalkable(x: number, y: number): boolean {
  // Exit door mat at bottom center (x: 5, y: 19)
  if (x === 5 && y === 19) return true;

  // Outer boundary walls (cols 1..9, rows 3..18)
  if (x < 1 || x > 9 || y < 3 || y > 18) {
    return false;
  }

  // Oliver at leader command console (x: 5, y: 3)
  if (x === 5 && y === 3) return false;

  // Statues at entrance (x: 2, 8, y: 18)
  if ((x === 2 || x === 8) && y === 18) return false;

  // Student Alex at (2, 10)
  if (x === 2 && y === 10) return false;

  // Supercomputer at (8, 10)
  if (x === 8 && y === 10) return false;

  // 15 Server Pods / Trash Cans (cols 3, 5, 7 at rows 7, 9, 11, 13, 15)
  if ((x === 3 || x === 5 || x === 7) && (y === 7 || y === 9 || y === 11 || y === 13 || y === 15)) {
    return false;
  }

  return true;
}

/**
 * Finds an interactable object inside English Tower
 */
export function getEnglishTowerInteractable(x: number, y: number): EnglishTowerInteractable | null {
  return INITIAL_ENGLISH_INTERACTABLES.find((item) => item.x === x && item.y === y) || null;
}

/**
 * Renders the High-Tech English & Global Hub of Vermilion City
 */
let cachedVermilionGym: HTMLImageElement | null = null;
function getVermilionGymImage(): HTMLImageElement | null {
  if (typeof window === "undefined") return null;
  if (!cachedVermilionGym) {
    cachedVermilionGym = new Image();
    cachedVermilionGym.src = "/assets/rpg/gym_vermilion.png";
  }
  return cachedVermilionGym;
}

if (typeof window !== "undefined") {
  getVermilionGymImage();
}

/**
 * Renders the High-Tech Vermilion Gym / English Tower interior using 100% authentic FireRed pixel art
 */
export function drawEnglishTowerInterior(
  ctx: CanvasRenderingContext2D,
  tileSize: number,
  viewWidth: number,
  viewHeight: number,
  openedPedestals: Record<string, boolean> = {},
  animTick: number = 0,
  characters?: Record<string, HTMLImageElement>,
  gymBgImg?: HTMLImageElement | null
) {
  // 1. Dark surrounding void
  ctx.fillStyle = "#020617";
  ctx.fillRect(-tileSize * 15, -tileSize * 15, (ENGLISH_TOWER_COLS + 30) * tileSize, (ENGLISH_TOWER_ROWS + 30) * tileSize);

  // 2. Authentic FireRed GBA Vermilion Gym Map
  const bg = gymBgImg || getVermilionGymImage();
  if (bg && bg.complete && bg.naturalWidth > 0) {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(bg, 0, 0, ENGLISH_TOWER_COLS * tileSize, ENGLISH_TOWER_ROWS * tileSize);
  }

  // 3. Characters & Dynamic Sprites
  if (characters) {
    // Professor Oliver (Líder do Ginásio de Inglês) at (5, 3)
    const oliverImg = characters["rival"] || characters["scout"] || characters["villager"];
    if (oliverImg && oliverImg.complete && oliverImg.naturalWidth > 0) {
      ctx.drawImage(oliverImg, 0, 0, 32, 32, 5 * tileSize + 4, 3 * tileSize + 2, tileSize - 8, tileSize - 4);
    }
    // Alex (Estudante Bilíngue) at (2, 10)
    const alexImg = characters["player"] || characters["scout"];
    if (alexImg && alexImg.complete && alexImg.naturalWidth > 0) {
      ctx.drawImage(alexImg, 0, 0, 32, 32, 2 * tileSize + 4, 10 * tileSize + 2, tileSize - 8, tileSize - 4);
    }
  }
}
