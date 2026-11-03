export type EvolutionStoneType =
  | "fire"
  | "water"
  | "thunder"
  | "leaf"
  | "moon"
  | "sun"
  | "shiny"
  | "dusk"
  | "dawn"
  | "ice";

export interface EvolutionData {
  toId: number;
  method: "level" | "stone" | "trade";
  level?: number;
  stone?: EvolutionStoneType;
}

export type RarityTier = "basic" | "evolved" | "rare";

export interface KantoPokemonData {
  pokedexId: number;
  species: string;
  name: string;
  emoji: string;
  type: string;
  typeColor: string;
  secondaryType?: string;
  baseCatchRate: number;
  habitat: "grass" | "water" | "forest" | "cave" | "urban" | "rare";
  isWaterType: boolean;
  description: string;
  stage: 1 | 2 | 3;
  rarityTier: RarityTier;
  evolutions?: EvolutionData[];
}

export function getPokemonArtworkUrl(pokedexId: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokedexId}.png`;
}

export function getPokemonSpriteUrl(pokedexId: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/${pokedexId}.png`;
}

export function getPokemonAnimatedUrl(pokedexId: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokedexId}.gif`;
}

export const KANTO_POKEDEX_151: KantoPokemonData[] = [
  // 1-3 Bulbasaur line
  { pokedexId: 1, species: "Bulbasaur", name: "Bulbasaur", emoji: "🍃", type: "Planta", typeColor: "#16a34a", secondaryType: "Veneno", baseCatchRate: 0.8, habitat: "grass", isWaterType: false, stage: 1, rarityTier: "basic", description: "Carrega uma semente nas costas que cresce absorvendo a luz do sol.", evolutions: [{ toId: 2, method: "level", level: 16 }] },
  { pokedexId: 2, species: "Ivysaur", name: "Ivysaur", emoji: "🌺", type: "Planta", typeColor: "#16a34a", secondaryType: "Veneno", baseCatchRate: 0.65, habitat: "grass", isWaterType: false, stage: 2, rarityTier: "evolved", description: "Quando o botão em suas costas começa a florescer, exala um aroma suave.", evolutions: [{ toId: 3, method: "level", level: 32 }] },
  { pokedexId: 3, species: "Venusaur", name: "Venusaur", emoji: "🌸", type: "Planta", typeColor: "#16a34a", secondaryType: "Veneno", baseCatchRate: 0.45, habitat: "rare", isWaterType: false, stage: 3, rarityTier: "rare", description: "A enorme flor em suas costas absorve energia solar para energizar seus poderes." },

  // 4-6 Charmander line
  { pokedexId: 4, species: "Charmander", name: "Charmander", emoji: "🔥", type: "Fogo", typeColor: "#ea580c", baseCatchRate: 0.8, habitat: "urban", isWaterType: false, stage: 1, rarityTier: "basic", description: "A chama na ponta de sua cauda reflete sua saúde e determinação.", evolutions: [{ toId: 5, method: "level", level: 16 }] },
  { pokedexId: 5, species: "Charmeleon", name: "Charmeleon", emoji: "🔥", type: "Fogo", typeColor: "#ea580c", baseCatchRate: 0.65, habitat: "cave", isWaterType: false, stage: 2, rarityTier: "evolved", description: "Adora batalhas intensas e ataca agitando sua cauda incandescente.", evolutions: [{ toId: 6, method: "level", level: 36 }] },
  { pokedexId: 6, species: "Charizard", name: "Charizard", emoji: "🐉", type: "Fogo", typeColor: "#ea580c", secondaryType: "Voador", baseCatchRate: 0.45, habitat: "rare", isWaterType: false, stage: 3, rarityTier: "rare", description: "Voa pelos céus em busca de oponentes valorosos, soltando labaredas quentes." },

  // 7-9 Squirtle line
  { pokedexId: 7, species: "Squirtle", name: "Squirtle", emoji: "💧", type: "Água", typeColor: "#0284c7", baseCatchRate: 0.8, habitat: "water", isWaterType: true, stage: 1, rarityTier: "basic", description: "Dispara jatos de água com incrível precisão direto de sua concha.", evolutions: [{ toId: 8, method: "level", level: 16 }] },
  { pokedexId: 8, species: "Wartortle", name: "Wartortle", emoji: "🌊", type: "Água", typeColor: "#0284c7", baseCatchRate: 0.65, habitat: "water", isWaterType: true, stage: 2, rarityTier: "evolved", description: "Suas orelhas e cauda peluda ajudam a manter o equilíbrio em correntezas.", evolutions: [{ toId: 9, method: "level", level: 36 }] },
  { pokedexId: 9, species: "Blastoise", name: "Blastoise", emoji: "🛡️", type: "Água", typeColor: "#0284c7", baseCatchRate: 0.45, habitat: "water", isWaterType: true, stage: 3, rarityTier: "rare", description: "Possui canhões de água de alta pressão retráteis em sua couraça de aço." },

  // 10-12 Caterpie line
  { pokedexId: 10, species: "Caterpie", name: "Caterpie", emoji: "🐛", type: "Inseto", typeColor: "#65a30d", baseCatchRate: 0.95, habitat: "forest", isWaterType: false, stage: 1, rarityTier: "basic", description: "Libera um odor característico de suas antenas para afastar predadores.", evolutions: [{ toId: 11, method: "level", level: 7 }] },
  { pokedexId: 11, species: "Metapod", name: "Metapod", emoji: "🦗", type: "Inseto", typeColor: "#65a30d", baseCatchRate: 0.85, habitat: "forest", isWaterType: false, stage: 2, rarityTier: "evolved", description: "Prepara seu corpo para a metamorfose endurecendo sua casca protetora.", evolutions: [{ toId: 12, method: "level", level: 10 }] },
  { pokedexId: 12, species: "Butterfree", name: "Butterfree", emoji: "🦋", type: "Inseto", typeColor: "#65a30d", secondaryType: "Voador", baseCatchRate: 0.7, habitat: "forest", isWaterType: false, stage: 3, rarityTier: "rare", description: "Bate as asas espalhando pós mágicos capazes de acalmar adversários." },

  // 13-15 Weedle line
  { pokedexId: 13, species: "Weedle", name: "Weedle", emoji: "🐛", type: "Inseto", typeColor: "#65a30d", secondaryType: "Veneno", baseCatchRate: 0.95, habitat: "forest", isWaterType: false, stage: 1, rarityTier: "basic", description: "Tem um pequeno ferrão no topo da cabeça que secreta toxinas leves.", evolutions: [{ toId: 14, method: "level", level: 7 }] },
  { pokedexId: 14, species: "Kakuna", name: "Kakuna", emoji: "🐝", type: "Inseto", typeColor: "#65a30d", secondaryType: "Veneno", baseCatchRate: 0.85, habitat: "forest", isWaterType: false, stage: 2, rarityTier: "evolved", description: "Fica imóvel grudado em troncos enquanto evolui seu ferrão venenoso.", evolutions: [{ toId: 15, method: "level", level: 10 }] },
  { pokedexId: 15, species: "Beedrill", name: "Beedrill", emoji: "🐝", type: "Inseto", typeColor: "#65a30d", secondaryType: "Veneno", baseCatchRate: 0.65, habitat: "forest", isWaterType: false, stage: 3, rarityTier: "rare", description: "Defende sua colméia com três ferrões pontiagudos em alta velocidade." },

  // 16-18 Pidgey line
  { pokedexId: 16, species: "Pidgey", name: "Pidgey", emoji: "🐦", type: "Normal", typeColor: "#78716c", secondaryType: "Voador", baseCatchRate: 0.95, habitat: "grass", isWaterType: false, stage: 1, rarityTier: "basic", description: "Um pássaro dócil que bate as asas para levantar pequenas nuvens de areia.", evolutions: [{ toId: 17, method: "level", level: 18 }] },
  { pokedexId: 17, species: "Pidgeotto", name: "Pidgeotto", emoji: "🦅", type: "Normal", typeColor: "#78716c", secondaryType: "Voador", baseCatchRate: 0.75, habitat: "grass", isWaterType: false, stage: 2, rarityTier: "evolved", description: "Patrulha seu território com olhos aguçados capazes de ver presas distantes.", evolutions: [{ toId: 18, method: "level", level: 36 }] },
  { pokedexId: 18, species: "Pidgeot", name: "Pidgeot", emoji: "🦅", type: "Normal", typeColor: "#78716c", secondaryType: "Voador", baseCatchRate: 0.5, habitat: "rare", isWaterType: false, stage: 3, rarityTier: "rare", description: "Voa na velocidade Mach 2 com suas magníficas penas coloridas da cabeça." },

  // 19-20 Rattata line
  { pokedexId: 19, species: "Rattata", name: "Rattata", emoji: "🐀", type: "Normal", typeColor: "#78716c", baseCatchRate: 0.95, habitat: "grass", isWaterType: false, stage: 1, rarityTier: "basic", description: "Seus dentes afiados crescem sem parar, por isso rói tudo o que encontra.", evolutions: [{ toId: 20, method: "level", level: 20 }] },
  { pokedexId: 20, species: "Raticate", name: "Raticate", emoji: "🦫", type: "Normal", typeColor: "#78716c", baseCatchRate: 0.7, habitat: "grass", isWaterType: false, stage: 2, rarityTier: "evolved", description: "Usa patas traseiras com pequenas membranas para atravessar rios com agilidade." },

  // 21-22 Spearow line
  { pokedexId: 21, species: "Spearow", name: "Spearow", emoji: "🐤", type: "Normal", typeColor: "#78716c", secondaryType: "Voador", baseCatchRate: 0.9, habitat: "grass", isWaterType: false, stage: 1, rarityTier: "basic", description: "Emite um grito agudo para avisar outros membros de seu bando sobre perigos.", evolutions: [{ toId: 22, method: "level", level: 20 }] },
  { pokedexId: 22, species: "Fearow", name: "Fearow", emoji: "🦅", type: "Normal", typeColor: "#78716c", secondaryType: "Voador", baseCatchRate: 0.65, habitat: "rare", isWaterType: false, stage: 2, rarityTier: "evolved", description: "Seu bico longo e afiado permite pescar e capturar alimentos do alto." },

  // 23-24 Ekans line
  { pokedexId: 23, species: "Ekans", name: "Ekans", emoji: "🐍", type: "Veneno", typeColor: "#9333ea", baseCatchRate: 0.85, habitat: "grass", isWaterType: false, stage: 1, rarityTier: "basic", description: "Rasteja silenciosamente pela grama alta farejando com a ponta da língua.", evolutions: [{ toId: 24, method: "level", level: 22 }] },
  { pokedexId: 24, species: "Arbok", name: "Arbok", emoji: "🐍", type: "Veneno", typeColor: "#9333ea", baseCatchRate: 0.6, habitat: "cave", isWaterType: false, stage: 2, rarityTier: "evolved", description: "O desenho assustador em seu peito intimida qualquer adversário distraído." },

  // 25-26 Pikachu line
  { pokedexId: 25, species: "Pikachu", name: "Pikachu", emoji: "⚡", type: "Elétrico", typeColor: "#eab308", baseCatchRate: 0.85, habitat: "forest", isWaterType: false, stage: 1, rarityTier: "basic", description: "Armazena eletricidade em suas bochechas vermelhas para liberar choques do bem.", evolutions: [{ toId: 26, method: "stone", stone: "thunder" }] },
  { pokedexId: 26, species: "Raichu", name: "Raichu", emoji: "⚡", type: "Elétrico", typeColor: "#eab308", baseCatchRate: 0.55, habitat: "urban", isWaterType: false, stage: 2, rarityTier: "evolved", description: "Quando suas bochechas estão cheias de energia, sua cauda brilha no escuro." },

  // 27-28 Sandshrew line
  { pokedexId: 27, species: "Sandshrew", name: "Sandshrew", emoji: "🦔", type: "Terra", typeColor: "#ca8a04", baseCatchRate: 0.85, habitat: "cave", isWaterType: false, stage: 1, rarityTier: "basic", description: "Enrola-se como uma bola de couro rígido para se defender de ataques.", evolutions: [{ toId: 28, method: "level", level: 22 }] },
  { pokedexId: 28, species: "Sandslash", name: "Sandslash", emoji: "🦔", type: "Terra", typeColor: "#ca8a04", baseCatchRate: 0.6, habitat: "cave", isWaterType: false, stage: 2, rarityTier: "evolved", description: "Possui garras afiadas com as quais escava túneis e ataca em redemoinho." },

  // 29-31 Nidoran F line
  { pokedexId: 29, species: "Nidoran♀", name: "Nidoran♀", emoji: "🐰", type: "Veneno", typeColor: "#9333ea", baseCatchRate: 0.85, habitat: "grass", isWaterType: false, stage: 1, rarityTier: "basic", description: "Pequena e dócil, mas seus espinhos soltam toxinas se for assustada.", evolutions: [{ toId: 30, method: "level", level: 16 }] },
  { pokedexId: 30, species: "Nidorina", name: "Nidorina", emoji: "🦏", type: "Veneno", typeColor: "#9333ea", baseCatchRate: 0.65, habitat: "grass", isWaterType: false, stage: 2, rarityTier: "evolved", description: "Gosta de descansar perto da família em tocas quentinhas e protegidas.", evolutions: [{ toId: 31, method: "stone", stone: "moon" }] },
  { pokedexId: 31, species: "Nidoqueen", name: "Nidoqueen", emoji: "👑", type: "Veneno", typeColor: "#9333ea", secondaryType: "Terra", baseCatchRate: 0.45, habitat: "rare", isWaterType: false, stage: 3, rarityTier: "rare", description: "Seu corpo blindado protege os filhotes de qualquer ameaça na natureza." },

  // 32-34 Nidoran M line
  { pokedexId: 32, species: "Nidoran♂", name: "Nidoran♂", emoji: "🐰", type: "Veneno", typeColor: "#9333ea", baseCatchRate: 0.85, habitat: "grass", isWaterType: false, stage: 1, rarityTier: "basic", description: "Move suas grandes orelhas para escutar o menor ruído nas redondezas.", evolutions: [{ toId: 33, method: "level", level: 16 }] },
  { pokedexId: 33, species: "Nidorino", name: "Nidorino", emoji: "🦏", type: "Veneno", typeColor: "#9333ea", baseCatchRate: 0.65, habitat: "grass", isWaterType: false, stage: 2, rarityTier: "evolved", description: "Tem um chifre mais duro que diamante com o qual quebra rochas no caminho.", evolutions: [{ toId: 34, method: "stone", stone: "moon" }] },
  { pokedexId: 34, species: "Nidoking", name: "Nidoking", emoji: "👑", type: "Veneno", typeColor: "#9333ea", secondaryType: "Terra", baseCatchRate: 0.45, habitat: "rare", isWaterType: false, stage: 3, rarityTier: "rare", description: "Um golpe de sua poderosa cauda de aço pode partir troncos de árvores inteiras." },

  // 35-36 Clefairy line
  { pokedexId: 35, species: "Clefairy", name: "Clefairy", emoji: "⭐", type: "Fada", typeColor: "#ec4899", baseCatchRate: 0.7, habitat: "cave", isWaterType: false, stage: 1, rarityTier: "basic", description: "Dizem que desceu da lua cheia e dança em círculos nas noites estreladas.", evolutions: [{ toId: 36, method: "stone", stone: "moon" }] },
  { pokedexId: 36, species: "Clefable", name: "Clefable", emoji: "✨", type: "Fada", typeColor: "#ec4899", baseCatchRate: 0.5, habitat: "rare", isWaterType: false, stage: 2, rarityTier: "evolved", description: "Tem uma audição tão sensível que consegue ouvir uma agulha caindo a quilômetros." },

  // 37-38 Vulpix line
  { pokedexId: 37, species: "Vulpix", name: "Vulpix", emoji: "🦊", type: "Fogo", typeColor: "#ea580c", baseCatchRate: 0.8, habitat: "grass", isWaterType: false, stage: 1, rarityTier: "basic", description: "Ao nascer possui apenas uma cauda branca, que se divide em seis caudas douradas.", evolutions: [{ toId: 38, method: "stone", stone: "fire" }] },
  { pokedexId: 38, species: "Ninetales", name: "Ninetales", emoji: "🦊", type: "Fogo", typeColor: "#ea580c", baseCatchRate: 0.5, habitat: "rare", isWaterType: false, stage: 2, rarityTier: "evolved", description: "Dizem que cada uma de suas nove caudas guarda um poder místico milenar." },

  // 39-40 Jigglypuff line
  { pokedexId: 39, species: "Jigglypuff", name: "Jigglypuff", emoji: "🎤", type: "Normal", typeColor: "#78716c", secondaryType: "Fada", baseCatchRate: 0.85, habitat: "grass", isWaterType: false, stage: 1, rarityTier: "basic", description: "Canta uma canção de ninar hipnótica com seus grandes olhos brilhantes.", evolutions: [{ toId: 40, method: "stone", stone: "moon" }] },
  { pokedexId: 40, species: "Wigglytuff", name: "Wigglytuff", emoji: "🎈", type: "Normal", typeColor: "#78716c", secondaryType: "Fada", baseCatchRate: 0.55, habitat: "rare", isWaterType: false, stage: 2, rarityTier: "evolved", description: "Seu pelo fofo e elástico infla até ficar gigantesco como um balão fofinho." },

  // 41-42 Zubat line
  { pokedexId: 41, species: "Zubat", name: "Zubat", emoji: "🦇", type: "Veneno", typeColor: "#9333ea", secondaryType: "Voador", baseCatchRate: 0.95, habitat: "cave", isWaterType: false, stage: 1, rarityTier: "basic", description: "Habita cavernas escuras e usa ondas ultrassônicas para desviar de paredes.", evolutions: [{ toId: 42, method: "level", level: 22 }] },
  { pokedexId: 42, species: "Golbat", name: "Golbat", emoji: "🦇", type: "Veneno", typeColor: "#9333ea", secondaryType: "Voador", baseCatchRate: 0.65, habitat: "cave", isWaterType: false, stage: 2, rarityTier: "evolved", description: "Abre sua imensa boca para planar silenciosamente na escuridão." },

  // 43-45 Oddish line
  { pokedexId: 43, species: "Oddish", name: "Oddish", emoji: "🌱", type: "Planta", typeColor: "#16a34a", secondaryType: "Veneno", baseCatchRate: 0.9, habitat: "grass", isWaterType: false, stage: 1, rarityTier: "basic", description: "Fica enterrado de dia parecendo uma planta comum; à noite passeia sob a lua.", evolutions: [{ toId: 44, method: "level", level: 21 }] },
  { pokedexId: 44, species: "Gloom", name: "Gloom", emoji: "🥀", type: "Planta", typeColor: "#16a34a", secondaryType: "Veneno", baseCatchRate: 0.7, habitat: "grass", isWaterType: false, stage: 2, rarityTier: "evolved", description: "O néctar que escorre de sua flor tem um aroma muito peculiar.", evolutions: [{ toId: 45, method: "stone", stone: "leaf" }] },
  { pokedexId: 45, species: "Vileplume", name: "Vileplume", emoji: "🌺", type: "Planta", typeColor: "#16a34a", secondaryType: "Veneno", baseCatchRate: 0.5, habitat: "rare", isWaterType: false, stage: 3, rarityTier: "rare", description: "Possui as maiores pétalas do mundo Pokémon, espalhando pólen colorido." },

  // 46-47 Paras line
  { pokedexId: 46, species: "Paras", name: "Paras", emoji: "🍄", type: "Inseto", typeColor: "#65a30d", secondaryType: "Planta", baseCatchRate: 0.85, habitat: "forest", isWaterType: false, stage: 1, rarityTier: "basic", description: "Nasce com esporos de cogumelo nas costas que crescem junto com seu corpo.", evolutions: [{ toId: 47, method: "level", level: 24 }] },
  { pokedexId: 47, species: "Parasect", name: "Parasect", emoji: "🍄", type: "Inseto", typeColor: "#65a30d", secondaryType: "Planta", baseCatchRate: 0.6, habitat: "forest", isWaterType: false, stage: 2, rarityTier: "evolved", description: "O grande cogumelo em suas costas libera esporos curativos na floresta." },

  // 48-49 Venonat line
  { pokedexId: 48, species: "Venonat", name: "Venonat", emoji: "🟣", type: "Inseto", typeColor: "#65a30d", secondaryType: "Veneno", baseCatchRate: 0.85, habitat: "forest", isWaterType: false, stage: 1, rarityTier: "basic", description: "Seus grandes olhos vermelhos funcionam como radares na escuridão da mata.", evolutions: [{ toId: 49, method: "level", level: 31 }] },
  { pokedexId: 49, species: "Venomoth", name: "Venomoth", emoji: "🦋", type: "Inseto", typeColor: "#65a30d", secondaryType: "Veneno", baseCatchRate: 0.6, habitat: "forest", isWaterType: false, stage: 2, rarityTier: "evolved", description: "Suas asas soltam pós coloridos que brilham suavemente no céu noturno." },

  // 50-51 Diglett line
  { pokedexId: 50, species: "Diglett", name: "Diglett", emoji: "🕳️", type: "Terra", typeColor: "#ca8a04", baseCatchRate: 0.9, habitat: "cave", isWaterType: false, stage: 1, rarityTier: "basic", description: "Mora debaixo da terra cavando túneis e arando o solo fértil das plantações.", evolutions: [{ toId: 51, method: "level", level: 26 }] },
  { pokedexId: 51, species: "Dugtrio", name: "Dugtrio", emoji: "⛰️", type: "Terra", typeColor: "#ca8a04", baseCatchRate: 0.6, habitat: "cave", isWaterType: false, stage: 2, rarityTier: "evolved", description: "Três Digletts que trabalham juntos para escavar cavernas quilométricas." },

  // 52-53 Meowth line
  { pokedexId: 52, species: "Meowth", name: "Meowth", emoji: "🐱", type: "Normal", typeColor: "#78716c", baseCatchRate: 0.85, habitat: "urban", isWaterType: false, stage: 1, rarityTier: "basic", description: "Adora objetos brilhantes e moedas redondas, guardando tudo em seu esconderijo.", evolutions: [{ toId: 53, method: "level", level: 28 }] },
  { pokedexId: 53, species: "Persian", name: "Persian", emoji: "🐆", type: "Normal", typeColor: "#78716c", baseCatchRate: 0.6, habitat: "urban", isWaterType: false, stage: 2, rarityTier: "evolved", description: "Um felino elegante e veloz com uma joia vermelha cintilante na fronte." },

  // 54-55 Psyduck line
  { pokedexId: 54, species: "Psyduck", name: "Psyduck", emoji: "🦆", type: "Água", typeColor: "#0284c7", baseCatchRate: 0.85, habitat: "water", isWaterType: true, stage: 1, rarityTier: "basic", description: "Vive com dor de cabeça; quando a dor aumenta, libera poderes psíquicos surpresa!", evolutions: [{ toId: 55, method: "level", level: 33 }] },
  { pokedexId: 55, species: "Golduck", name: "Golduck", emoji: "🦆", type: "Água", typeColor: "#0284c7", baseCatchRate: 0.6, habitat: "water", isWaterType: true, stage: 2, rarityTier: "evolved", description: "Um nadador gracioso que alcança velocidades incríveis em rios e lagos." },

  // 56-57 Mankey line
  { pokedexId: 56, species: "Mankey", name: "Mankey", emoji: "🐒", type: "Lutador", typeColor: "#b91c1c", baseCatchRate: 0.85, habitat: "grass", isWaterType: false, stage: 1, rarityTier: "basic", description: "Cheio de energia para gastar, salta pelas árvores treinando golpes rápidos.", evolutions: [{ toId: 57, method: "level", level: 28 }] },
  { pokedexId: 57, species: "Primeape", name: "Primeape", emoji: "🦍", type: "Lutador", typeColor: "#b91c1c", baseCatchRate: 0.6, habitat: "grass", isWaterType: false, stage: 2, rarityTier: "evolved", description: "Fica animado durante qualquer desafio e nunca desiste de uma disputa saudável." },

  // 58-59 Growlithe line
  { pokedexId: 58, species: "Growlithe", name: "Growlithe", emoji: "🐕", type: "Fogo", typeColor: "#ea580c", baseCatchRate: 0.8, habitat: "urban", isWaterType: false, stage: 1, rarityTier: "basic", description: "Um cãozinho leal e corajoso que protege seus amigos com entusiasmo caloroso.", evolutions: [{ toId: 59, method: "stone", stone: "fire" }] },
  { pokedexId: 59, species: "Arcanine", name: "Arcanine", emoji: "🦁", type: "Fogo", typeColor: "#ea580c", baseCatchRate: 0.5, habitat: "rare", isWaterType: false, stage: 2, rarityTier: "evolved", description: "Um Pokémon lendário pela sua velocidade e majestade ao galopar sobre as colinas." },

  // 60-62 Poliwag line
  { pokedexId: 60, species: "Poliwag", name: "Poliwag", emoji: "🌀", type: "Água", typeColor: "#0284c7", baseCatchRate: 0.9, habitat: "water", isWaterType: true, stage: 1, rarityTier: "basic", description: "A espiral em sua barriga transparente gira ritmicamente conforme seu coração.", evolutions: [{ toId: 61, method: "level", level: 25 }] },
  { pokedexId: 61, species: "Poliwhirl", name: "Poliwhirl", emoji: "🐸", type: "Água", typeColor: "#0284c7", baseCatchRate: 0.65, habitat: "water", isWaterType: true, stage: 2, rarityTier: "evolved", description: "Capaz de viver tanto na terra quanto na água, tem mãos com pele emborrachada.", evolutions: [{ toId: 62, method: "stone", stone: "water" }] },
  { pokedexId: 62, species: "Poliwrath", name: "Poliwrath", emoji: "🥊", type: "Água", typeColor: "#0284c7", secondaryType: "Lutador", baseCatchRate: 0.45, habitat: "water", isWaterType: true, stage: 3, rarityTier: "rare", description: "Um atleta dos mares cujos músculos firmes o permitem cruzar oceanos a nado." },

  // 63-65 Abra line
  { pokedexId: 63, species: "Abra", name: "Abra", emoji: "🔮", type: "Psíquico", typeColor: "#d946ef", baseCatchRate: 0.7, habitat: "urban", isWaterType: false, stage: 1, rarityTier: "basic", description: "Dorme 18 horas por dia; ao sentir o menor perigo, teletransporta-se em segurança.", evolutions: [{ toId: 64, method: "level", level: 16 }] },
  { pokedexId: 64, species: "Kadabra", name: "Kadabra", emoji: "🥄", type: "Psíquico", typeColor: "#d946ef", baseCatchRate: 0.55, habitat: "urban", isWaterType: false, stage: 2, rarityTier: "evolved", description: "Segura uma colher de prata para concentrar suas ondas mentais e telecinéticas.", evolutions: [{ toId: 65, method: "trade" }] },
  { pokedexId: 65, species: "Alakazam", name: "Alakazam", emoji: "🧠", type: "Psíquico", typeColor: "#d946ef", baseCatchRate: 0.4, habitat: "rare", isWaterType: false, stage: 3, rarityTier: "rare", description: "Seu cérebro acumula todo o conhecimento do universo com QI superior a 5.000." },

  // 66-68 Machop line
  { pokedexId: 66, species: "Machop", name: "Machop", emoji: "💪", type: "Lutador", typeColor: "#b91c1c", baseCatchRate: 0.85, habitat: "cave", isWaterType: false, stage: 1, rarityTier: "basic", description: "Treina erguendo pedras pesadas na montanha para desenvolver sua força natural.", evolutions: [{ toId: 67, method: "level", level: 28 }] },
  { pokedexId: 67, species: "Machoke", name: "Machoke", emoji: "🏋️", type: "Lutador", typeColor: "#b91c1c", baseCatchRate: 0.6, habitat: "cave", isWaterType: false, stage: 2, rarityTier: "evolved", description: "Usa um cinto especial dourado para controlar sua enorme potência muscular.", evolutions: [{ toId: 68, method: "trade" }] },
  { pokedexId: 68, species: "Machamp", name: "Machamp", emoji: "🦾", type: "Lutador", typeColor: "#b91c1c", baseCatchRate: 0.45, habitat: "rare", isWaterType: false, stage: 3, rarityTier: "rare", description: "Com quatro braços velozes, consegue realizar mil socos em apenas dois segundos." },

  // 69-71 Bellsprout line
  { pokedexId: 69, species: "Bellsprout", name: "Bellsprout", emoji: "🌱", type: "Planta", typeColor: "#16a34a", secondaryType: "Veneno", baseCatchRate: 0.9, habitat: "grass", isWaterType: false, stage: 1, rarityTier: "basic", description: "Planta suas raízes no solo úmido para absorver água rica em minerais.", evolutions: [{ toId: 70, method: "level", level: 21 }] },
  { pokedexId: 71, species: "Victreebel", name: "Victreebel", emoji: "🏺", type: "Planta", typeColor: "#16a34a", secondaryType: "Veneno", baseCatchRate: 0.45, habitat: "rare", isWaterType: false, stage: 3, rarityTier: "rare", description: "Exala um doce néctar perfumado com aroma de mel de sua folha superior." },
  { pokedexId: 70, species: "Weepinbell", name: "Weepinbell", emoji: "🪴", type: "Planta", typeColor: "#16a34a", secondaryType: "Veneno", baseCatchRate: 0.65, habitat: "grass", isWaterType: false, stage: 2, rarityTier: "evolved", description: "Pendura-se em galhos altos parecendo uma folha para descansar à sombra.", evolutions: [{ toId: 71, method: "stone", stone: "leaf" }] },

  // 72-73 Tentacool line
  { pokedexId: 72, species: "Tentacool", name: "Tentacool", emoji: "🦑", type: "Água", typeColor: "#0284c7", secondaryType: "Veneno", baseCatchRate: 0.9, habitat: "water", isWaterType: true, stage: 1, rarityTier: "basic", description: "Flutua nas ondas do mar quase 99% composto por pura água límpida.", evolutions: [{ toId: 73, method: "level", level: 30 }] },
  { pokedexId: 73, species: "Tentacruel", name: "Tentacruel", emoji: "🐙", type: "Água", typeColor: "#0284c7", secondaryType: "Veneno", baseCatchRate: 0.55, habitat: "water", isWaterType: true, stage: 2, rarityTier: "evolved", description: "Estende seus 80 tentáculos para navegar no fundo do oceano profundo." },

  // 74-76 Geodude line
  { pokedexId: 74, species: "Geodude", name: "Geodude", emoji: "🪨", type: "Rocha", typeColor: "#78716c", secondaryType: "Terra", baseCatchRate: 0.9, habitat: "cave", isWaterType: false, stage: 1, rarityTier: "basic", description: "Parece uma pedra comum nas trilhas de montanha; adora tomar sol nas pedreiras.", evolutions: [{ toId: 75, method: "level", level: 25 }] },
  { pokedexId: 75, species: "Graveler", name: "Graveler", emoji: "🪨", type: "Rocha", typeColor: "#78716c", secondaryType: "Terra", baseCatchRate: 0.65, habitat: "cave", isWaterType: false, stage: 2, rarityTier: "evolved", description: "Rola ladeira abaixo nas montanhas sem se importar com nenhum obstáculo.", evolutions: [{ toId: 76, method: "trade" }] },
  { pokedexId: 76, species: "Golem", name: "Golem", emoji: "🪨", type: "Rocha", typeColor: "#78716c", secondaryType: "Terra", baseCatchRate: 0.45, habitat: "rare", isWaterType: false, stage: 3, rarityTier: "rare", description: "Sua couraça rochosa é tão resistente que nem mesmo dinamite pode rachá-la." },

  // 77-78 Ponyta line
  { pokedexId: 77, species: "Ponyta", name: "Ponyta", emoji: "🐴", type: "Fogo", typeColor: "#ea580c", baseCatchRate: 0.8, habitat: "grass", isWaterType: false, stage: 1, rarityTier: "basic", description: "Um potrinho gracioso com crina de fogo; salta sobre cercas com extrema leveza.", evolutions: [{ toId: 78, method: "level", level: 40 }] },
  { pokedexId: 78, species: "Rapidash", name: "Rapidash", emoji: "🦄", type: "Fogo", typeColor: "#ea580c", baseCatchRate: 0.55, habitat: "rare", isWaterType: false, stage: 2, rarityTier: "evolved", description: "Galopa a mais de 240 km/h com um chifre flamejante brilhando no horizonte." },

  // 79-80 Slowpoke line
  { pokedexId: 79, species: "Slowpoke", name: "Slowpoke", emoji: "🦥", type: "Água", typeColor: "#0284c7", secondaryType: "Psíquico", baseCatchRate: 0.85, habitat: "water", isWaterType: true, stage: 1, rarityTier: "basic", description: "Fica pescando no lago com a cauda; demora vários minutos para perceber cócegas.", evolutions: [{ toId: 80, method: "level", level: 37 }] },
  { pokedexId: 80, species: "Slowbro", name: "Slowbro", emoji: "🐚", type: "Água", typeColor: "#0284c7", secondaryType: "Psíquico", baseCatchRate: 0.6, habitat: "water", isWaterType: true, stage: 2, rarityTier: "evolved", description: "Quando um Shellder mordeu sua cauda, ganhou inspiração para grandes ideias." },

  // 81-82 Magnemite line
  { pokedexId: 81, species: "Magnemite", name: "Magnemite", emoji: "🧲", type: "Elétrico", typeColor: "#eab308", secondaryType: "Aço", baseCatchRate: 0.85, habitat: "urban", isWaterType: false, stage: 1, rarityTier: "basic", description: "Flutua usando campos magnéticos e recarrega-se perto de postes elétricos.", evolutions: [{ toId: 82, method: "level", level: 30 }] },
  { pokedexId: 82, species: "Magneton", name: "Magneton", emoji: "🧲", type: "Elétrico", typeColor: "#eab308", secondaryType: "Aço", baseCatchRate: 0.6, habitat: "urban", isWaterType: false, stage: 2, rarityTier: "evolved", description: "Três Magnemites unidos geram uma onda de rádio potente que zune pelo ar." },

  // 83 Farfetch'd
  { pokedexId: 83, species: "Farfetch'd", name: "Farfetch'd", emoji: "🦆", type: "Normal", typeColor: "#78716c", secondaryType: "Voador", baseCatchRate: 0.7, habitat: "grass", isWaterType: false, stage: 1, rarityTier: "basic", description: "Carrega sempre um talo de alho-poró como espada de samurai e ferramenta." },

  // 84-85 Doduo line
  { pokedexId: 84, species: "Doduo", name: "Doduo", emoji: "🦤", type: "Normal", typeColor: "#78716c", secondaryType: "Voador", baseCatchRate: 0.85, habitat: "grass", isWaterType: false, stage: 1, rarityTier: "basic", description: "Pássaro de duas cabeças que corre tão rápido quanto o vento pelas planícies.", evolutions: [{ toId: 85, method: "level", level: 31 }] },
  { pokedexId: 85, species: "Dodrio", name: "Dodrio", emoji: "🦤", type: "Normal", typeColor: "#78716c", secondaryType: "Voador", baseCatchRate: 0.6, habitat: "grass", isWaterType: false, stage: 2, rarityTier: "evolved", description: "Três cabeças expressando alegria, tristeza e coragem ao mesmo tempo." },

  // 86-87 Seel line
  { pokedexId: 86, species: "Seel", name: "Seel", emoji: "🦭", type: "Água", typeColor: "#0284c7", baseCatchRate: 0.85, habitat: "water", isWaterType: true, stage: 1, rarityTier: "basic", description: "Adora águas gélidas e icebergs; sua camada de gordura o mantém quentinho.", evolutions: [{ toId: 87, method: "level", level: 34 }] },
  { pokedexId: 87, species: "Dewgong", name: "Dewgong", emoji: "🦭", type: "Água", typeColor: "#0284c7", secondaryType: "Gelo", baseCatchRate: 0.55, habitat: "water", isWaterType: true, stage: 2, rarityTier: "evolved", description: "Desliza gracioso pelas águas polares como uma sereia branca da neve." },

  // 88-89 Grimer line
  { pokedexId: 88, species: "Grimer", name: "Grimer", emoji: "🧪", type: "Veneno", typeColor: "#9333ea", baseCatchRate: 0.85, habitat: "urban", isWaterType: false, stage: 1, rarityTier: "basic", description: "Gosta de reciclar resíduos urbanos e adora ambientes onde há fábricas antigas.", evolutions: [{ toId: 89, method: "level", level: 38 }] },
  { pokedexId: 89, species: "Muk", name: "Muk", emoji: "🧪", type: "Veneno", typeColor: "#9333ea", baseCatchRate: 0.6, habitat: "urban", isWaterType: false, stage: 2, rarityTier: "evolved", description: "Companheiro muito apegado que gosta de dar abraços calorosos em seu treinador." },

  // 90-91 Shellder line
  { pokedexId: 90, species: "Shellder", name: "Shellder", emoji: "🐚", type: "Água", typeColor: "#0284c7", baseCatchRate: 0.85, habitat: "water", isWaterType: true, stage: 1, rarityTier: "basic", description: "Sua concha rígida fecha com força para se proteger; põe a língua para fora.", evolutions: [{ toId: 91, method: "stone", stone: "water" }] },
  { pokedexId: 91, species: "Cloyster", name: "Cloyster", emoji: "🐚", type: "Água", typeColor: "#0284c7", secondaryType: "Gelo", baseCatchRate: 0.5, habitat: "water", isWaterType: true, stage: 2, rarityTier: "evolved", description: "Sua casca é mais dura que o leito rochoso do fundo dos oceanos." },

  // 92-94 Gastly line
  { pokedexId: 92, species: "Gastly", name: "Gastly", emoji: "👻", type: "Fantasma", typeColor: "#6b21a8", secondaryType: "Veneno", baseCatchRate: 0.85, habitat: "cave", isWaterType: false, stage: 1, rarityTier: "basic", description: "Formado por névoa arroxeada misteriosa, adora dar sustos bem-humorados.", evolutions: [{ toId: 93, method: "level", level: 25 }] },
  { pokedexId: 93, species: "Haunter", name: "Haunter", emoji: "👻", type: "Fantasma", typeColor: "#6b21a8", secondaryType: "Veneno", baseCatchRate: 0.65, habitat: "cave", isWaterType: false, stage: 2, rarityTier: "evolved", description: "Esconde-se nas sombras das paredes sorrindo com suas mãos flutuantes.", evolutions: [{ toId: 94, method: "trade" }] },
  { pokedexId: 94, species: "Gengar", name: "Gengar", emoji: "😈", type: "Fantasma", typeColor: "#6b21a8", secondaryType: "Veneno", baseCatchRate: 0.45, habitat: "rare", isWaterType: false, stage: 3, rarityTier: "rare", description: "Nas noites de lua, finge ser a sombra de viajantes para brincar de pega-pega." },

  // 95 Onix
  { pokedexId: 95, species: "Onix", name: "Onix", emoji: "🐍", type: "Rocha", typeColor: "#78716c", secondaryType: "Terra", baseCatchRate: 0.65, habitat: "cave", isWaterType: false, stage: 1, rarityTier: "rare", description: "Uma imensa serpente de rochas maciças que escava túneis a 80 km/h." },

  // 96-97 Drowzee line
  { pokedexId: 96, species: "Drowzee", name: "Drowzee", emoji: "💤", type: "Psíquico", typeColor: "#d946ef", baseCatchRate: 0.85, habitat: "urban", isWaterType: false, stage: 1, rarityTier: "basic", description: "Adora cheirar e comer sonhos divertidos; se sonhar com coisas boas, ele esteve por perto.", evolutions: [{ toId: 97, method: "level", level: 26 }] },
  { pokedexId: 97, species: "Hypno", name: "Hypno", emoji: "🌀", type: "Psíquico", typeColor: "#d946ef", baseCatchRate: 0.6, habitat: "urban", isWaterType: false, stage: 2, rarityTier: "evolved", description: "Balança seu pêndulo brilhante para ajudar crianças e Pokémon a dormirem em paz." },

  // 98-99 Krabby line
  { pokedexId: 98, species: "Krabby", name: "Krabby", emoji: "🦀", type: "Água", typeColor: "#0284c7", baseCatchRate: 0.9, habitat: "water", isWaterType: true, stage: 1, rarityTier: "basic", description: "Vive nas praias de areia; suas pinças são ótimas para quebrar cocos e conchinhas.", evolutions: [{ toId: 99, method: "level", level: 28 }] },
  { pokedexId: 99, species: "Kingler", name: "Kingler", emoji: "🦀", type: "Água", typeColor: "#0284c7", baseCatchRate: 0.6, habitat: "water", isWaterType: true, stage: 2, rarityTier: "evolved", description: "Sua pinça esquerda gigantesca tem a força de 10.000 cavalos de potência." },

  // 100-101 Voltorb line
  { pokedexId: 100, species: "Voltorb", name: "Voltorb", emoji: "⚡", type: "Elétrico", typeColor: "#eab308", baseCatchRate: 0.85, habitat: "urban", isWaterType: false, stage: 1, rarityTier: "basic", description: "Parece muito com uma Pokébola; quando se assusta solta pequenas faíscas azuis.", evolutions: [{ toId: 101, method: "level", level: 30 }] },
  { pokedexId: 101, species: "Electrode", name: "Electrode", emoji: "⚡", type: "Elétrico", typeColor: "#eab308", baseCatchRate: 0.6, habitat: "urban", isWaterType: false, stage: 2, rarityTier: "evolved", description: "Armazena tanta energia elétrica dentro de si que rola a velocidades extremas." },

  // 102-103 Exeggcute line
  { pokedexId: 102, species: "Exeggcute", name: "Exeggcute", emoji: "🥚", type: "Planta", typeColor: "#16a34a", secondaryType: "Psíquico", baseCatchRate: 0.85, habitat: "forest", isWaterType: false, stage: 1, rarityTier: "basic", description: "Um grupo de seis ovos mágicos conectados telepaticamente entre si.", evolutions: [{ toId: 103, method: "stone", stone: "leaf" }] },
  { pokedexId: 103, species: "Exeggutor", name: "Exeggutor", emoji: "🌴", type: "Planta", typeColor: "#16a34a", secondaryType: "Psíquico", baseCatchRate: 0.55, habitat: "rare", isWaterType: false, stage: 2, rarityTier: "evolved", description: "Uma palmeira ambulante com três cabeças sorridentes que cantam em harmonia." },

  // 104-105 Cubone line
  { pokedexId: 104, species: "Cubone", name: "Cubone", emoji: "🦴", type: "Terra", typeColor: "#ca8a04", baseCatchRate: 0.8, habitat: "cave", isWaterType: false, stage: 1, rarityTier: "basic", description: "Usa um capacete de osso e segura um bastão com o qual se defende valorosamente.", evolutions: [{ toId: 105, method: "level", level: 28 }] },
  { pokedexId: 105, species: "Marowak", name: "Marowak", emoji: "🦴", type: "Terra", typeColor: "#ca8a04", baseCatchRate: 0.6, habitat: "cave", isWaterType: false, stage: 2, rarityTier: "evolved", description: "Mestre no lançamento de ossos como bumerangues precisos e acrobáticos." },

  // 106-107 Hitmonlee & Hitmonchan
  { pokedexId: 106, species: "Hitmonlee", name: "Hitmonlee", emoji: "🥋", type: "Lutador", typeColor: "#b91c1c", baseCatchRate: 0.6, habitat: "urban", isWaterType: false, stage: 1, rarityTier: "rare", description: "Mestre dos chutes elásticos; suas pernas esticam com molas impressionantes." },
  { pokedexId: 107, species: "Hitmonchan", name: "Hitmonchan", emoji: "🥊", type: "Lutador", typeColor: "#b91c1c", baseCatchRate: 0.6, habitat: "urban", isWaterType: false, stage: 1, rarityTier: "rare", description: "Mestre do boxe com punhos flamejantes, elétricos e congelantes." },

  // 108 Lickitung
  { pokedexId: 108, species: "Lickitung", name: "Lickitung", emoji: "👅", type: "Normal", typeColor: "#78716c", baseCatchRate: 0.75, habitat: "grass", isWaterType: false, stage: 1, rarityTier: "basic", description: "Sua língua tem mais de dois metros de comprimento e é super limpa e flexível." },

  // 109-110 Koffing line
  { pokedexId: 109, species: "Koffing", name: "Koffing", emoji: "💨", type: "Veneno", typeColor: "#9333ea", baseCatchRate: 0.85, habitat: "urban", isWaterType: false, stage: 1, rarityTier: "basic", description: "Flutua no ar como um balão inflável liberando fumaça cinzenta inofensiva.", evolutions: [{ toId: 110, method: "level", level: 35 }] },
  { pokedexId: 110, species: "Weezing", name: "Weezing", emoji: "💨", type: "Veneno", typeColor: "#9333ea", baseCatchRate: 0.6, habitat: "urban", isWaterType: false, stage: 2, rarityTier: "evolved", description: "Duas esferas unidas que filtram e limpam gases tóxicos no ambiente." },

  // 111-112 Rhyhorn line
  { pokedexId: 111, species: "Rhyhorn", name: "Rhyhorn", emoji: "🦏", type: "Terra", typeColor: "#ca8a04", secondaryType: "Rocha", baseCatchRate: 0.75, habitat: "cave", isWaterType: false, stage: 1, rarityTier: "basic", description: "Seu corpo forte como pedra corre em linha reta quebrando blocos de concreto.", evolutions: [{ toId: 112, method: "level", level: 42 }] },
  { pokedexId: 112, species: "Rhydon", name: "Rhydon", emoji: "🦏", type: "Terra", typeColor: "#ca8a04", secondaryType: "Rocha", baseCatchRate: 0.55, habitat: "rare", isWaterType: false, stage: 2, rarityTier: "evolved", description: "Fica de pé em duas patas e usa seu chifre broca para perfurar túneis na montanha." },

  // 113 Chansey
  { pokedexId: 113, species: "Chansey", name: "Chansey", emoji: "🥚", type: "Normal", typeColor: "#78716c", baseCatchRate: 0.5, habitat: "rare", isWaterType: false, stage: 1, rarityTier: "rare", description: "Um Pokémon generoso que compartilha ovos nutritivos para curar doentes e feridos." },

  // 114 Tangela
  { pokedexId: 114, species: "Tangela", name: "Tangela", emoji: "🧶", type: "Planta", typeColor: "#16a34a", baseCatchRate: 0.75, habitat: "grass", isWaterType: false, stage: 1, rarityTier: "basic", description: "Envolto por cipós azuis flexíveis que balançam alegremente enquanto caminha." },

  // 115 Kangaskhan
  { pokedexId: 115, species: "Kangaskhan", name: "Kangaskhan", emoji: "🦘", type: "Normal", typeColor: "#78716c", baseCatchRate: 0.5, habitat: "rare", isWaterType: false, stage: 1, rarityTier: "rare", description: "Carrega seu filhote carinhosamente na bolsa abdominal com instinto protetor." },

  // 116-117 Horsea line
  { pokedexId: 116, species: "Horsea", name: "Horsea", emoji: "🌊", type: "Água", typeColor: "#0284c7", baseCatchRate: 0.85, habitat: "water", isWaterType: true, stage: 1, rarityTier: "basic", description: "Um gracioso cavalo-marinho que nada de costas disparando jatos de tinta preta.", evolutions: [{ toId: 117, method: "level", level: 32 }] },
  { pokedexId: 117, species: "Seadra", name: "Seadra", emoji: "🌊", type: "Água", typeColor: "#0284c7", baseCatchRate: 0.65, habitat: "water", isWaterType: true, stage: 2, rarityTier: "evolved", description: "Cria redemoinhos no mar girando seu corpo espinhoso com precisão náutica." },

  // 118-119 Goldeen line
  { pokedexId: 118, species: "Goldeen", name: "Goldeen", emoji: "🐠", type: "Água", typeColor: "#0284c7", baseCatchRate: 0.85, habitat: "water", isWaterType: true, stage: 1, rarityTier: "basic", description: "Nada graciosamente como uma bailarina do oceano com barbatanas ondulantes.", evolutions: [{ toId: 119, method: "level", level: 33 }] },
  { pokedexId: 119, species: "Seaking", name: "Seaking", emoji: "🐟", type: "Água", typeColor: "#0284c7", baseCatchRate: 0.6, habitat: "water", isWaterType: true, stage: 2, rarityTier: "evolved", description: "Com seu chifre afiado, escava ninhos em leitos de rios para proteger ovos." },

  // 120-121 Staryu line
  { pokedexId: 120, species: "Staryu", name: "Staryu", emoji: "⭐", type: "Água", typeColor: "#0284c7", baseCatchRate: 0.85, habitat: "water", isWaterType: true, stage: 1, rarityTier: "basic", description: "Uma estrela-do-mar mágica cujo núcleo vermelho pulsa no ritmo das marés.", evolutions: [{ toId: 121, method: "stone", stone: "water" }] },
  { pokedexId: 121, species: "Starmie", name: "Starmie", emoji: "🌟", type: "Água", typeColor: "#0284c7", secondaryType: "Psíquico", baseCatchRate: 0.55, habitat: "water", isWaterType: true, stage: 2, rarityTier: "evolved", description: "Seu núcleo precioso brilha com todas as sete cores do arco-íris nas noites claras." },

  // 122 Mr. Mime
  { pokedexId: 122, species: "Mr. Mime", name: "Mr. Mime", emoji: "🤡", type: "Psíquico", typeColor: "#d946ef", secondaryType: "Fada", baseCatchRate: 0.65, habitat: "urban", isWaterType: false, stage: 1, rarityTier: "basic", description: "Mestre da mímica; cria paredes invisíveis de ar que se tornam sólidas como vidro." },

  // 123 Scyther
  { pokedexId: 123, species: "Scyther", name: "Scyther", emoji: "🦗", type: "Inseto", typeColor: "#65a30d", secondaryType: "Voador", baseCatchRate: 0.6, habitat: "forest", isWaterType: false, stage: 1, rarityTier: "rare", description: "Corta troncos grossos com suas lâminas verdes mais afiadas que espadas ninjas." },

  // 124 Jynx
  { pokedexId: 124, species: "Jynx", name: "Jynx", emoji: "💃", type: "Gelo", typeColor: "#06b6d4", secondaryType: "Psíquico", baseCatchRate: 0.6, habitat: "urban", isWaterType: false, stage: 1, rarityTier: "basic", description: "Dança com passos ritmados contagiantes que fazem qualquer um querer dançar junto." },

  // 125 Electabuzz
  { pokedexId: 125, species: "Electabuzz", name: "Electabuzz", emoji: "⚡", type: "Elétrico", typeColor: "#eab308", baseCatchRate: 0.6, habitat: "urban", isWaterType: false, stage: 1, rarityTier: "rare", description: "Gira os braços como moinhos para gerar eletricidade estática reluzente." },

  // 126 Magmar
  { pokedexId: 126, species: "Magmar", name: "Magmar", emoji: "🔥", type: "Fogo", typeColor: "#ea580c", baseCatchRate: 0.6, habitat: "cave", isWaterType: false, stage: 1, rarityTier: "rare", description: "Nasce perto de crateras de vulcões; cura suas energias mergulhando em magma." },

  // 127 Pinsir
  { pokedexId: 127, species: "Pinsir", name: "Pinsir", emoji: "🪲", type: "Inseto", typeColor: "#65a30d", baseCatchRate: 0.6, habitat: "forest", isWaterType: false, stage: 1, rarityTier: "rare", description: "Com seus poderosos chifres com espinhos, agarra galhos e ergue peso dobro de seu corpo." },

  // 128 Tauros
  { pokedexId: 128, species: "Tauros", name: "Tauros", emoji: "🐂", type: "Normal", typeColor: "#78716c", baseCatchRate: 0.6, habitat: "grass", isWaterType: false, stage: 1, rarityTier: "rare", description: "Um touro valente com três caudas chicoteantes que corre em manadas pelas planícies." },

  // 129-130 Magikarp line
  { pokedexId: 129, species: "Magikarp", name: "Magikarp", emoji: "🐟", type: "Água", typeColor: "#0284c7", baseCatchRate: 0.98, habitat: "water", isWaterType: true, stage: 1, rarityTier: "basic", description: "O peixe mais famoso do mundo! Salta fora d'água alegremente aguardando evoluir.", evolutions: [{ toId: 130, method: "level", level: 20 }] },
  { pokedexId: 130, species: "Gyarados", name: "Gyarados", emoji: "🐉", type: "Água", typeColor: "#0284c7", secondaryType: "Voador", baseCatchRate: 0.45, habitat: "water", isWaterType: true, stage: 2, rarityTier: "rare", description: "Um dragão colossal das águas que ruge bravamente pelos mares agitados." },

  // 131 Lapras
  { pokedexId: 131, species: "Lapras", name: "Lapras", emoji: "🦕", type: "Água", typeColor: "#0284c7", secondaryType: "Gelo", baseCatchRate: 0.6, habitat: "water", isWaterType: true, stage: 1, rarityTier: "rare", description: "Gentil e carinhoso, adora carregar pessoas e amigos Pokémon em seu casco pelos mares." },

  // 132 Ditto
  { pokedexId: 132, species: "Ditto", name: "Ditto", emoji: "🟣", type: "Normal", typeColor: "#78716c", baseCatchRate: 0.75, habitat: "urban", isWaterType: false, stage: 1, rarityTier: "basic", description: "Pode reorganizar suas células para se transformar em qualquer outro Pokémon perfeitamente!" },

  // 133-136 Eevee line
  { pokedexId: 133, species: "Eevee", name: "Eevee", emoji: "🦊", type: "Normal", typeColor: "#b45309", baseCatchRate: 0.9, habitat: "grass", isWaterType: false, stage: 1, rarityTier: "basic", description: "Tem um código genético único que permite evoluir para várias formas incríveis.", evolutions: [
    { toId: 134, method: "stone", stone: "water" },
    { toId: 135, method: "stone", stone: "thunder" },
    { toId: 136, method: "stone", stone: "fire" },
  ] },
  { pokedexId: 134, species: "Vaporeon", name: "Vaporeon", emoji: "🧜", type: "Água", typeColor: "#0284c7", baseCatchRate: 0.55, habitat: "water", isWaterType: true, stage: 2, rarityTier: "evolved", description: "Sua estrutura molecular se funde com a água, tornando-o completamente invisível ao nadar." },
  { pokedexId: 135, species: "Jolteon", name: "Jolteon", emoji: "⚡", type: "Elétrico", typeColor: "#eab308", baseCatchRate: 0.55, habitat: "urban", isWaterType: false, stage: 2, rarityTier: "evolved", description: "Seu pelo se eriça como agulhas elétricas capazes de descarregar 10.000 volts." },
  { pokedexId: 136, species: "Flareon", name: "Flareon", emoji: "🔥", type: "Fogo", typeColor: "#ea580c", baseCatchRate: 0.55, habitat: "cave", isWaterType: false, stage: 2, rarityTier: "evolved", description: "Seu corpo fofinho armazena calor térmico que alcança 900 graus Celsius." },

  // 137 Porygon
  { pokedexId: 137, species: "Porygon", name: "Porygon", emoji: "🤖", type: "Normal", typeColor: "#78716c", baseCatchRate: 0.65, habitat: "urban", isWaterType: false, stage: 1, rarityTier: "basic", description: "O primeiro Pokémon criado inteiramente por código de computação científica." },

  // 138-139 Omanyte line
  { pokedexId: 138, species: "Omanyte", name: "Omanyte", emoji: "🐚", type: "Rocha", typeColor: "#78716c", secondaryType: "Água", baseCatchRate: 0.65, habitat: "water", isWaterType: true, stage: 1, rarityTier: "basic", description: "Um Pokémon fóssil ancestral ressuscitado que nada girando seus tentáculos suaves.", evolutions: [{ toId: 139, method: "level", level: 40 }] },
  { pokedexId: 139, species: "Omastar", name: "Omastar", emoji: "🐚", type: "Rocha", typeColor: "#78716c", secondaryType: "Água", baseCatchRate: 0.5, habitat: "water", isWaterType: true, stage: 2, rarityTier: "evolved", description: "Seus tentáculos fortes quebram conchas marinhas antigas nas profundezas." },

  // 140-141 Kabuto line
  { pokedexId: 140, species: "Kabuto", name: "Kabuto", emoji: "🪨", type: "Rocha", typeColor: "#78716c", secondaryType: "Água", baseCatchRate: 0.65, habitat: "water", isWaterType: true, stage: 1, rarityTier: "basic", description: "Protegido por uma carapaça rígida e brilhante que resistiu por milhões de anos.", evolutions: [{ toId: 141, method: "level", level: 40 }] },
  { pokedexId: 141, species: "Kabutops", name: "Kabutops", emoji: "🤺", type: "Rocha", typeColor: "#78716c", secondaryType: "Água", baseCatchRate: 0.5, habitat: "water", isWaterType: true, stage: 2, rarityTier: "evolved", description: "Navega como um torpedo na água e usa foices afiadas para caçar peixes." },

  // 142 Aerodactyl
  { pokedexId: 142, species: "Aerodactyl", name: "Aerodactyl", emoji: "🦅", type: "Rocha", typeColor: "#78716c", secondaryType: "Voador", baseCatchRate: 0.45, habitat: "rare", isWaterType: false, stage: 1, rarityTier: "rare", description: "Um imponente réptil voador do tempo dos dinossauros que dominava os céus de Kanto." },

  // 143 Snorlax
  { pokedexId: 143, species: "Snorlax", name: "Snorlax", emoji: "💤", type: "Normal", typeColor: "#78716c", baseCatchRate: 0.5, habitat: "grass", isWaterType: false, stage: 1, rarityTier: "rare", description: "Dorme tranquilamente no meio da rota; seu ronco acalma todas as criaturas ao redor." },

  // 144-146 Legendary Birds
  { pokedexId: 144, species: "Articuno", name: "Articuno", emoji: "❄️", type: "Gelo", typeColor: "#06b6d4", secondaryType: "Voador", baseCatchRate: 0.25, habitat: "rare", isWaterType: false, stage: 1, rarityTier: "rare", description: "Pássaro lendário do gelo que resfria o ar criando nevascas cintilantes." },
  { pokedexId: 145, species: "Zapdos", name: "Zapdos", emoji: "⚡", type: "Elétrico", typeColor: "#eab308", secondaryType: "Voador", baseCatchRate: 0.25, habitat: "rare", isWaterType: false, stage: 1, rarityTier: "rare", description: "Pássaro lendário dos trovões que surge entre nuvens carregadas de tempestade." },
  { pokedexId: 146, species: "Moltres", name: "Moltres", emoji: "🔥", type: "Fogo", typeColor: "#ea580c", secondaryType: "Voador", baseCatchRate: 0.25, habitat: "rare", isWaterType: false, stage: 1, rarityTier: "rare", description: "Pássaro lendário do fogo cuja presença anuncia a chegada precoce da primavera." },

  // 147-149 Dratini line
  { pokedexId: 147, species: "Dratini", name: "Dratini", emoji: "🐉", type: "Dragão", typeColor: "#6366f1", baseCatchRate: 0.65, habitat: "water", isWaterType: true, stage: 1, rarityTier: "basic", description: "Vive escondido sob cachoeiras cristalinas crescendo e mudando de pele com graça.", evolutions: [{ toId: 148, method: "level", level: 30 }] },
  { pokedexId: 148, species: "Dragonair", name: "Dragonair", emoji: "🐉", type: "Dragão", typeColor: "#6366f1", baseCatchRate: 0.45, habitat: "water", isWaterType: true, stage: 2, rarityTier: "evolved", description: "Possui esferas azuis místicas que conseguem alterar o clima e afastar tempestades.", evolutions: [{ toId: 149, method: "level", level: 55 }] },
  { pokedexId: 149, species: "Dragonite", name: "Dragonite", emoji: "🧡", type: "Dragão", typeColor: "#6366f1", secondaryType: "Voador", baseCatchRate: 0.35, habitat: "rare", isWaterType: false, stage: 3, rarityTier: "rare", description: "Dá a volta ao mundo em 16 horas e resgata marinheiros perdidos em alto-mar." },

  // 150-151 Mewtwo & Mew
  { pokedexId: 150, species: "Mewtwo", name: "Mewtwo", emoji: "🔮", type: "Psíquico", typeColor: "#d946ef", baseCatchRate: 0.2, habitat: "rare", isWaterType: false, stage: 1, rarityTier: "rare", description: "Criado em laboratório com poderes psíquicos incomparáveis e busca por sabedoria." },
  { pokedexId: 151, species: "Mew", name: "Mew", emoji: "🌸", type: "Psíquico", typeColor: "#d946ef", baseCatchRate: 0.2, habitat: "rare", isWaterType: false, stage: 1, rarityTier: "rare", description: "O mítico ancestral de todos os Pokémon, brincalhão e puro de coração." }
];

export function getWaterPokemonPool(): KantoPokemonData[] {
  return KANTO_POKEDEX_151.filter((p) => p.isWaterType);
}

export function getLandPokemonPool(): KantoPokemonData[] {
  return KANTO_POKEDEX_151.filter((p) => !p.isWaterType);
}

export function getPokemonById(id: number): KantoPokemonData | undefined {
  const kanto = KANTO_POKEDEX_151.find((p) => p.pokedexId === id);
  if (kanto) return kanto;
  try {
    const { JOHTO_POKEDEX_100 } = require("./johtoPokedex");
    const johto = JOHTO_POKEDEX_100.find((p: KantoPokemonData) => p.pokedexId === id);
    if (johto) return johto as KantoPokemonData;
  } catch {}
  try {
    const { HOENN_POKEDEX_135 } = require("./hoennPokedex");
    const hoenn = HOENN_POKEDEX_135.find((p: any) => p.pokedexId === id);
    if (hoenn) return hoenn as KantoPokemonData;
  } catch {}
  try {
    const { SINNOH_POKEDEX_107 } = require("./sinnohPokedex");
    const sinnoh = SINNOH_POKEDEX_107.find((p: any) => p.pokedexId === id);
    if (sinnoh) return sinnoh as KantoPokemonData;
  } catch {}
  try {
    const { UNOVA_POKEDEX_156 } = require("./unovaPokedex");
    const unova = UNOVA_POKEDEX_156.find((p: any) => p.pokedexId === id);
    if (unova) return unova as KantoPokemonData;
  } catch {}
  try {
    const { MODERN_POKEDEX_376 } = require("./modernPokedex");
    const modern = MODERN_POKEDEX_376.find((p: any) => p.pokedexId === id);
    if (modern) return modern as KantoPokemonData;
  } catch {}
  return undefined;
}

/**
 * Weighted wild encounter generator:
 * - Pokémons Básicos (stage 1 / basic): Chance ALTA (peso 100)
 * - Pokémons com Evolução (stage 2 / evolved): MUITO DIFÍCEIS (peso 14)
 * - Pokémons Raros / Lendários / Stage 3: CHANCE BEM BAIXA (peso 2)
 */
export function getWeightedEncounter(isWater: boolean): KantoPokemonData {
  const pool = isWater ? getWaterPokemonPool() : getLandPokemonPool();
  
  const weights: Record<RarityTier, number> = {
    basic: 100,
    evolved: 14,
    rare: 2,
  };

  const totalWeight = pool.reduce((acc, p) => acc + (weights[p.rarityTier] || 10), 0);
  let random = Math.random() * totalWeight;

  for (const pokemon of pool) {
    const w = weights[pokemon.rarityTier] || 10;
    if (random < w) {
      return pokemon;
    }
    random -= w;
  }

  return pool[0];
}
