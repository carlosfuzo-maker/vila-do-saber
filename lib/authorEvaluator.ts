import { AuthorFeedback, StudentYear } from "@/app/vila/types";

// Markers for Beginning, Middle, and End
const BEGINNING_MARKERS = [
  "era uma vez",
  "certo dia",
  "num belo dia",
  "havia",
  "em uma linda",
  "em um lindo",
  "naquela vila",
  "tudo começou",
  "quando eu",
  "no reino",
  "em uma floresta",
  "era um dia",
  "em um dia",
  "numa bela manhã",
  "há muito tempo",
  "no início",
  "conheci um",
  "existia",
  "num lugar",
];

const MIDDLE_MARKERS = [
  "então",
  "de repente",
  "mas",
  "porém",
  "contudo",
  "logo depois",
  "em seguida",
  "enquanto isso",
  "no entanto",
  "quando viu",
  "decidiu",
  "aconteceu",
  "procurou",
  "percebeu",
  "tentou",
  "ouviu um barulho",
  "descobriu",
  "quando de repente",
  "depois",
  "mais tarde",
];

const ENDING_MARKERS = [
  "por fim",
  "finalmente",
  "no final",
  "e assim",
  "todos ficaram",
  "viveram felizes",
  "aprendeu que",
  "depois de tudo",
  "conseguiu",
  "terminou",
  "moral da história",
  "desde esse dia",
  "nunca mais",
  "para sempre",
  "voltou para casa",
  "fim",
  "todos comemoraram",
  "e foi assim",
];

export function evaluateStudentStory(
  title: string,
  content: string,
  year: StudentYear,
  authorName: string
): AuthorFeedback {
  const cleanContent = content.trim();
  const lower = cleanContent.toLowerCase();

  // Words count
  const words = cleanContent.length > 0 ? cleanContent.split(/\s+/).filter(Boolean) : [];
  const wordCount = words.length;

  // Sentences count
  const sentences = cleanContent
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  // Check Beginning
  const hasBeginningMarker = BEGINNING_MARKERS.some((marker) => lower.includes(marker));
  // A first sentence with at least 4 words establishing context also counts
  const hasBeginning = hasBeginningMarker || (sentences.length >= 1 && words.length >= 6);

  // Check Middle
  const hasMiddleMarker = MIDDLE_MARKERS.some((marker) => lower.includes(marker));
  const hasMiddle = hasMiddleMarker || (sentences.length >= 2 && words.length >= (year === 2 ? 14 : 24));

  // Check Ending
  const hasEndingMarker = ENDING_MARKERS.some((marker) => lower.includes(marker));
  const hasEnding = hasEndingMarker || (sentences.length >= 3 && cleanContent.endsWith("."));

  // Word count expectation per grade
  const minWordsForFullScore = year === 2 ? 22 : 45;
  const wordCountRatio = Math.min(1, wordCount / minWordsForFullScore);

  // Logical checks
  let structurePoints = 0;
  if (hasBeginning) structurePoints += 1.5;
  if (hasMiddle) structurePoints += 1.5;
  if (hasEnding) structurePoints += 1.5;
  if (title.trim().length > 3) structurePoints += 0.5;

  const structureScore = Math.max(1, Math.min(5, Math.round(structurePoints * wordCountRatio + (wordCount > 10 ? 1 : 0))));

  // Mascot Badges
  const badges: string[] = ["🦉 Selo Coruja Sabida"];
  if (hasBeginning) badges.push("✨ Começo Encantador");
  if (hasMiddle) badges.push("⚡ Aventura no Meio");
  if (hasEnding) badges.push("🏆 Grande Desfecho");
  if (wordCount >= (year === 2 ? 30 : 60)) badges.push("🌟 Best-seller da Vila");
  if (title.trim().length >= 5) badges.push("🎨 Título Criativo");

  // Praise and Tips generation
  let mascotReaction: "magnificent" | "great" | "good_start" = "good_start";
  let praiseComment = "";
  let tipsComment = "";

  if (structureScore >= 4) {
    mascotReaction = "magnificent";
    praiseComment =
      year === 2
        ? `Uau, ${authorName}! O Peninha ficou de asas abertas com a sua história "${title}"! Você organizou direitinho o início, a surpresa no meio e o final feliz. Que imaginação brilhante!`
        : `Magnífico, ${authorName}! O Mestre Coruja da Biblioteca leu a sua obra com muito orgulho! Sua narrativa tem ritmo, coesão entre parágrafos e uma conclusão muito expressiva. Verdadeira jovem autora!`;

    tipsComment = "Dica de Mestre: Que tal ler sua história em voz alta para o papai ou criar uma ilustração de capa para a estante?";
  } else if (structureScore >= 3) {
    mascotReaction = "great";
    praiseComment =
      year === 2
        ? `Muito legal, ${authorName}! Adorei ler sobre "${title}". A sua história já tem personagens muito legais e deu para sentir a magia acontecendo!`
        : `Muito bom trabalho, ${authorName}! Sua história tem ótimas ideias e já apresenta os elementos principais de um conto bem construído.`;

    if (!hasBeginning) {
      tipsComment = 'Dica da Corujinha: Experimente começar com palavras mágicas como "Certo dia na Vila..." para situar quem está a ler!';
    } else if (!hasMiddle) {
      tipsComment = 'Dica da Corujinha: Coloque uma surpresa no meio usando "De repente..." ou "Então aconteceu algo incrível!"';
    } else if (!hasEnding) {
      tipsComment = 'Dica da Corujinha: Dê um desfecho claro para os personagens, contando como tudo terminou ou o que eles aprenderam!';
    } else {
      tipsComment = "Dica da Corujinha: Escreva mais alguns detalhes sobre os cenários para enriquecer ainda mais o seu livrinho!";
    }
  } else {
    mascotReaction = "good_start";
    praiseComment = `Parabéns pela coragem de começar a escrever, ${authorName}! Toda grande escritora começa com as primeiras letrinhas e ideias.`;
    tipsComment =
      'Para ganhar 5 estrelas: Lembre-se da receita mágica da biblioteca: 1) Quem são os personagens no início? 2) O que aconteceu de emocionante no meio? 3) Como a aventura acabou?';
  }

  return {
    hasBeginning,
    hasMiddle,
    hasEnding,
    wordCount,
    structureScore,
    mascotReaction,
    title: title.trim() || "Minha História Encantada",
    praiseComment,
    tipsComment,
    badges,
  };
}

// Sample theme prompts based on grade and current chapter
export const LIBRARY_PROMPTS_YEAR_4 = [
  {
    theme: "Fábulas & Lições da Natureza",
    prompt:
      "Escreva uma fábula moderna onde dois animais da Vila do Saber (ex: a raposa e o castor) precisam resolver um mistério juntos e aprendem uma lição no final.",
    suggestionTitle: "O Castor Inventor e a Raposa Curiosa",
  },
  {
    theme: "Aventura no Passado Histórico",
    prompt:
      "Imagine que você encontrou um mapa secreto na Biblioteca da Vila que leva a um túnel subterrâneo dos primeiros exploradores do Brasil.",
    suggestionTitle: "O Segredo do Mapa Dourado",
  },
  {
    theme: "Diário de uma Pequena Cientista",
    prompt:
      "Você criou uma poção mágica que faz as plantas falarem no jardim da escola! O que elas contaram?",
    suggestionTitle: "O Dia em que o Girassol Falou",
  },
];

export const LIBRARY_PROMPTS_YEAR_2 = [
  {
    theme: "O Piquenique Mágico dos Bichinhos",
    prompt:
      "Conte como foi o dia em que os coelhinhos e passarinhos fizeram um piquenique de maçãs e doces na floresta da Vila.",
    suggestionTitle: "O Piquenique do Coelho Saltitante",
  },
  {
    theme: "A Minha Varinha dos Desejos",
    prompt:
      "Você achou uma varinha de brinquedo que realizou um pedido muito fofo na sua escolinha. O que aconteceu?",
    suggestionTitle: "A Varinha de Estrelinhas da Bianca",
  },
  {
    theme: "O Dragãozinho que Adorava Ler",
    prompt:
      "Existia um dragãozinho bebê que não cuspia fogo, cuspia bolinhas de sabão e adorava ouvir historinhas antes de dormir.",
    suggestionTitle: "Pipoca, o Dragão das Bolhas de Sabão",
  },
];
