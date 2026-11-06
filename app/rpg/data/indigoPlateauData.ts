// Authentic Pokémon FireRed - Indigo Plateau Champion Room Interior (13x20 GBA Grid)
// Official GBA Dimensions: 208px x 320px = 13 x 20 tiles (16px)

export const INDIGO_PLATEAU_COLS = 13;
export const INDIGO_PLATEAU_ROWS = 20;

export interface IndigoPlateauInteractable {
  x: number;
  y: number;
  name: string;
  type: "champion" | "statue" | "pc" | "healing_station" | "exit";
  dialogText?: string;
}

let cachedPlateauInside: HTMLImageElement | null = null;

export function getIndigoPlateauImage(): HTMLImageElement | null {
  if (typeof window === "undefined") return null;
  if (!cachedPlateauInside) {
    cachedPlateauInside = new Image();
    cachedPlateauInside.src = "/assets/rpg/plateau_inside.png";
  }
  return cachedPlateauInside;
}

if (typeof window !== "undefined") {
  getIndigoPlateauImage();
}

export const INDIGO_PLATEAU_INTERACTABLES: IndigoPlateauInteractable[] = [
  // Champion Master on the majestic throne podium
  {
    x: 6,
    y: 4,
    name: "Mestre da Liga Pokémon 👑",
    type: "champion",
    dialogText: "Bem-vinda ao cume da Liga Pokémon, Campeã! Somente treinadoras que dominaram a Matemática, a Língua Portuguesa, as Ciências e o Inglês conseguem subir estes degraus! Você está pronta para o Desafio Supremo dos Campeões?",
  },

  // League Poké-PC at the side
  {
    x: 2,
    y: 4,
    name: "Terminal de Dados da Liga Pokémon 💻",
    type: "pc",
    dialogText: "Terminal Oficial da Liga Pokémon! Todos os seus recordes, insígnias conquistadas e dados de salvamento foram sincronizados na nuvem!",
  },

  // Elite Healing Station at right
  {
    x: 10,
    y: 4,
    name: "Estação de Cura dos Campeões 💖",
    type: "healing_station",
    dialogText: "A máquina de regeneração da Liga reenergizou completamente todos os seus Pokémon com 100% de Vida e Vitalidade!",
  },

  // Statues of the Elite Hall
  {
    x: 3,
    y: 7,
    name: "Estátua do Mestre de Pedra 🗿",
    type: "statue",
    dialogText: "Inscrição na base: 'A solidez da geometria e o rigor matemático constroem as defesas mais resistentes.'",
  },
  {
    x: 9,
    y: 7,
    name: "Estátua da Mestra da Floresta 🗿",
    type: "statue",
    dialogText: "Inscrição na base: 'A sabedoria das palavras e a literatura florescem como as árvores de Celadon.'",
  },
  {
    x: 3,
    y: 11,
    name: "Estátua do Mestre do Trovão 🗿",
    type: "statue",
    dialogText: "Inscrição na base: 'A rapidez da comunicação e a tecnologia conectam o mundo em uma só voz.'",
  },
  {
    x: 9,
    y: 11,
    name: "Estátua do Mestre Psíquico 🗿",
    type: "statue",
    dialogText: "Inscrição na base: 'O conhecimento profundo e a curiosidade científica desvendam todos os mistérios da natureza.'",
  },

  // Exit threshold at bottom corridor
  {
    x: 6,
    y: 19,
    name: "Porta de Saída do Indigo Plateau",
    type: "exit",
  },
];

/**
 * Walkability collision logic for Indigo Plateau (13 cols x 20 rows)
 */
export function isIndigoPlateauWalkable(x: number, y: number): boolean {
  // Exit doorway at bottom (col 6, row 19)
  if (x === 6 && y === 19) return true;

  // Lower grand corridor (rows 14..18): only central column 6 and adjacent 5, 7 are walkable
  if (y >= 14 && y <= 18) {
    return x >= 5 && x <= 7;
  }

  // Row 19 is bottom wall except col 6
  if (y === 19) {
    return x === 6;
  }

  // Outside bounds
  if (x < 1 || x > 11 || y < 4 || y > 19) {
    return false;
  }

  // Top throne background / upper wall
  if (y < 4) return false;

  // Champion at (6, 4)
  if (x === 6 && y === 4) return false;

  // Hall statues
  if (x === 3 && (y === 7 || y === 11)) return false;
  if (x === 9 && (y === 7 || y === 11)) return false;

  // PC and Healing Station tables
  if (x === 2 && y === 4) return false;
  if (x === 10 && y === 4) return false;

  // Side decorative pillars / walls on main hall
  if (x === 1 || x === 11) return false;

  return true;
}

export function getIndigoPlateauInteractable(x: number, y: number): IndigoPlateauInteractable | null {
  return INDIGO_PLATEAU_INTERACTABLES.find((item) => item.x === x && item.y === y) || null;
}

/**
 * Draws the authentic GBA FireRed Indigo Plateau Champion Room Interior
 */
export function drawIndigoPlateauInterior(
  ctx: CanvasRenderingContext2D,
  tileSize: number,
  viewWidth: number,
  viewHeight: number,
  championSprite?: HTMLImageElement | null,
  bgImg?: HTMLImageElement | null
) {
  // 1. Majestic surrounding void
  ctx.fillStyle = "#05070d";
  ctx.fillRect(-tileSize * 15, -tileSize * 15, (INDIGO_PLATEAU_COLS + 30) * tileSize, (INDIGO_PLATEAU_ROWS + 30) * tileSize);

  // 2. Authentic FireRed GBA Champion Room Map
  const bg = bgImg || getIndigoPlateauImage();
  ctx.imageSmoothingEnabled = false;

  if (bg && bg.complete && bg.naturalWidth > 0) {
    ctx.drawImage(bg, 0, 0, INDIGO_PLATEAU_COLS * tileSize, INDIGO_PLATEAU_ROWS * tileSize);
  }

  // 3. Champion Master at the top podium (x: 6, y: 4)
  const champX = 6 * tileSize;
  const champY = 4 * tileSize - 4;
  if (championSprite && championSprite.complete && championSprite.naturalWidth > 0) {
    ctx.drawImage(championSprite, 0, 0, 32, 32, champX, champY, tileSize, tileSize);
  }
}
