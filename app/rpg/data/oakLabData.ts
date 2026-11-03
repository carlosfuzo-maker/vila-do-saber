// Authentic Pokémon FireRed - Professor Oak's Laboratory Interior (13x14 GBA Grid)
// Official GBA Dimensions: 208px x 224px = 13 x 14 tiles (16px)

export const OAK_LAB_COLS = 13;
export const OAK_LAB_ROWS = 14;

export interface OakLabInteractable {
  x: number;
  y: number;
  name: string;
  type: "oak" | "starter_bulbasaur" | "starter_charmander" | "starter_squirtle" | "pc" | "scientist" | "bookshelf" | "blackboard" | "exit";
  dialogText?: string;
}

let cachedLabInside: HTMLImageElement | null = null;

export function getOakLabInsideImage(): HTMLImageElement | null {
  if (typeof window === "undefined") return null;
  if (!cachedLabInside) {
    cachedLabInside = new Image();
    cachedLabInside.src = "/assets/rpg/lab_inside.png";
  }
  return cachedLabInside;
}

if (typeof window !== "undefined") {
  getOakLabInsideImage();
}

export const OAK_LAB_INTERACTABLES: OakLabInteractable[] = [
  // Professor Oak at his research desk
  {
    x: 6,
    y: 3,
    name: "Professor Carvalho 🔬",
    type: "oak",
    dialogText: "Olá Bianca! O mundo dos Pokémon é vasto e repleto de ciências, matemática e descobertas! Continue estudando com dedicação para se tornar uma Mestra Pokémon completa!",
  },

  // 3 Starter Pokéballs on the right research table
  {
    x: 8,
    y: 4,
    name: "Pokébola: Bulbasaur 🍃",
    type: "starter_bulbasaur",
    dialogText: "Uma Pokébola contendo o Bulbasaur! Pokémon do tipo Planta/Veneno, conhecido por sua paciência, determinação e fotossíntese!",
  },
  {
    x: 9,
    y: 4,
    name: "Pokébola: Charmander 🔥",
    type: "starter_charmander",
    dialogText: "Uma Pokébola contendo o Charmander! Pokémon do tipo Fogo, com uma chama viva na cauda que reflete sua coragem e entusiasmo!",
  },
  {
    x: 10,
    y: 4,
    name: "Pokébola: Squirtle 💧",
    type: "starter_squirtle",
    dialogText: "Uma Pokébola contendo o Squirtle! Pokémon do tipo Água, cuja carapaça resistente ensina sobre hidrodinâmica e proteção!",
  },

  // Research PC at top left
  {
    x: 1,
    y: 4,
    name: "Poké-PC de Pesquisa do Laboratório 💻",
    type: "pc",
    dialogText: "Conexão com a Rede Pokémon & Nuvem da Vila do Saber! Todos os dados de sua aventura e lições foram sincronizados com sucesso!",
  },

  // Research Aides / Assistants
  {
    x: 3,
    y: 10,
    name: "Cientista Assistente 🥼",
    type: "scientist",
    dialogText: "Estudo a biologia e as evoluções dos Pokémon! Sabia que responder perguntas na Vila do Saber dá pontos de Experiência essenciais para seus Pokémon evoluírem?",
  },
  {
    x: 10,
    y: 10,
    name: "Pesquisador da Pokédex 📖",
    type: "scientist",
    dialogText: "O Professor Carvalho dedicou toda a vida à Pokédex. Cada nova criatura registrada é um passo gigante para a ciência de Kanto!",
  },

  // Bookshelves and Encyclopedias
  {
    x: 2,
    y: 8,
    name: "Enciclopédia de Ciências e Natureza 📚",
    type: "bookshelf",
    dialogText: "Tomos grossos sobre botânica, zoologia e física elemental: 'A energia solar potencializa os movimentos do tipo Planta!'",
  },
  {
    x: 3,
    y: 8,
    name: "Enciclopédia de Matemática e Geometria 📐",
    type: "bookshelf",
    dialogText: "Pesquisas sobre trajetórias, cálculos de estatísticas e probabilidades em batalhas de conhecimento!",
  },
  {
    x: 9,
    y: 8,
    name: "Dicionário e Gramática Kanto 📖",
    type: "bookshelf",
    dialogText: "Comunicação clara e vocabulário rico são as ferramentas fundamentais de qualquer grande líder de ginásio!",
  },

  // Blackboard
  {
    x: 5,
    y: 1,
    name: "Quadro de Anotações do Professor 📝",
    type: "blackboard",
    dialogText: "Anotações do Prof. Carvalho: 'Metas para jovens estudantes: 1. Praticar lições diárias; 2. Cuidar com carinho da equipe; 3. Vencer os desafios das matérias!'",
  },

  // Exit Door Threshold at bottom red doormat
  {
    x: 6,
    y: 12,
    name: "Porta de Saída do Laboratório",
    type: "exit",
  },
];

/**
 * Collision logic for Oak's Lab (13 cols x 14 rows)
 */
export function isOakLabWalkable(x: number, y: number): boolean {
  // Outer boundary walls
  if (x < 1 || x > 11 || y < 2 || y > 12) {
    // Exit doormat
    if (x === 6 && y === 12) return true;
    return false;
  }

  // Top blackboard & Oak's desk line
  if (y <= 2) return false;

  // Oak himself at (6, 3)
  if (x === 6 && y === 3) return false;

  // Starter Pokeballs table (cols 8..10, rows 4..5)
  if (x >= 8 && x <= 10 && (y === 4 || y === 5)) return false;

  // Left research computer & table (cols 1..2, rows 4..5)
  if (x >= 1 && x <= 2 && (y === 4 || y === 5)) return false;

  // Central-lower bookshelves (left side: cols 1..4, rows 8..9)
  if (x >= 1 && x <= 4 && (y === 8 || y === 9)) return false;

  // Central-lower bookshelves (right side: cols 8..11, rows 8..9)
  if (x >= 8 && x <= 11 && (y === 8 || y === 9)) return false;

  // Scientists
  if (x === 3 && y === 10) return false;
  if (x === 10 && y === 10) return false;

  // Side walls / lower trash bin
  if (x === 0 || x === 12) return false;

  return true;
}

export function getOakLabInteractable(x: number, y: number): OakLabInteractable | null {
  return OAK_LAB_INTERACTABLES.find((item) => item.x === x && item.y === y) || null;
}

/**
 * Draws the authentic GBA FireRed Oak Lab Interior
 */
export function drawOakLabInterior(
  ctx: CanvasRenderingContext2D,
  tileSize: number,
  viewWidth: number,
  viewHeight: number,
  oakSprite?: HTMLImageElement | null,
  scientistSprite?: HTMLImageElement | null,
  bgImg?: HTMLImageElement | null
) {
  // 1. Dark surrounding void
  ctx.fillStyle = "#090d16";
  ctx.fillRect(-tileSize * 15, -tileSize * 15, (OAK_LAB_COLS + 30) * tileSize, (OAK_LAB_ROWS + 30) * tileSize);

  // 2. Authentic FireRed GBA Oak Lab
  const bg = bgImg || getOakLabInsideImage();
  ctx.imageSmoothingEnabled = false;

  if (bg && bg.complete && bg.naturalWidth > 0) {
    ctx.drawImage(bg, 0, 0, OAK_LAB_COLS * tileSize, OAK_LAB_ROWS * tileSize);
  }

  // 3. Professor Oak at (6, 3)
  const oakX = 6 * tileSize;
  const oakY = 3 * tileSize - 4;
  if (oakSprite && oakSprite.complete && oakSprite.naturalWidth > 0) {
    // 32x32 frame
    ctx.drawImage(oakSprite, 0, 0, 32, 32, oakX, oakY, tileSize, tileSize);
  }

  // 4. Scientist Aides at (3, 10) and (10, 10)
  if (scientistSprite && scientistSprite.complete && scientistSprite.naturalWidth > 0) {
    ctx.drawImage(scientistSprite, 0, 0, 32, 32, 3 * tileSize, 10 * tileSize - 4, tileSize, tileSize);
    ctx.drawImage(scientistSprite, 0, 0, 32, 32, 10 * tileSize, 10 * tileSize - 4, tileSize, tileSize);
  }
}
