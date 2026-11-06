import { StudentYear } from "../rpgTypes";
import { AcademicSubject } from "./academicQuestions";

export const SCHOOL_COLS = 14;
export const SCHOOL_ROWS = 10;

export type SchoolSubjectKey = "math" | "science" | "portuguese" | "english" | "geography";

export interface SchoolInteractable {
  x: number;
  y: number;
  name: string;
  type: "smartboard" | "teacher" | "exam_desk" | "bookshelf" | "globe" | "exit";
  actionText?: string;
}

export const SCHOOL_INTERACTABLES: SchoolInteractable[] = [
  // Interactive Smartboard at top center (x: 5..8, y: 1)
  { x: 5, y: 1, name: "Quadro Mágico Interativo (Aula do Capítulo)", type: "smartboard" },
  { x: 6, y: 1, name: "Quadro Mágico Interativo (Aula do Capítulo)", type: "smartboard" },
  { x: 7, y: 1, name: "Quadro Mágico Interativo (Aula do Capítulo)", type: "smartboard" },
  { x: 8, y: 1, name: "Quadro Mágico Interativo (Aula do Capítulo)", type: "smartboard" },

  // Teacher at front of classroom (x: 7, y: 2)
  { x: 7, y: 2, name: "Professora da Escola da Cidade", type: "teacher" },

  // Bookshelves (top left & top right)
  { x: 1, y: 1, name: "Estante de Apostilas Ilustradas", type: "bookshelf", actionText: "Apostilas ilustradas com resumos coloridos para revisar antes das provas!" },
  { x: 2, y: 1, name: "Estante de Apostilas Ilustradas", type: "bookshelf", actionText: "Apostilas ilustradas com resumos coloridos para revisar antes das provas!" },
  { x: 11, y: 1, name: "Enciclopédia Pokémon & Ciências", type: "bookshelf", actionText: "Enciclopédias da Escola da Cidade conectando o mundo Pokémon às matérias da escola!" },
  { x: 12, y: 1, name: "Enciclopédia Pokémon & Ciências", type: "bookshelf", actionText: "Enciclopédias da Escola da Cidade conectando o mundo Pokémon às matérias da escola!" },

  // Student Exam Desks (center rows)
  { x: 3, y: 5, name: "Carteira de Provas e Simulados", type: "exam_desk" },
  { x: 4, y: 5, name: "Carteira de Provas e Simulados", type: "exam_desk" },
  { x: 6, y: 5, name: "Carteira Principal de Simulados", type: "exam_desk" },
  { x: 7, y: 5, name: "Carteira Principal de Simulados", type: "exam_desk" },
  { x: 9, y: 5, name: "Carteira de Provas e Simulados", type: "exam_desk" },
  { x: 10, y: 5, name: "Carteira de Provas e Simulados", type: "exam_desk" },

  // Globe / Science station
  { x: 12, y: 4, name: "Globo Terrestre & Mapas", type: "globe", actionText: "Um Globo Terrestre mostrando os oceanos, continentes e as rotas de Kanto!" },

  // Exit doormat at bottom center (x: 6..7, y: 9)
  { x: 6, y: 9, name: "Porta de Saída da Escola", type: "exit" },
  { x: 7, y: 9, name: "Porta de Saída da Escola", type: "exit" },
];

export function isSchoolTileWalkable(x: number, y: number): boolean {
  if (x < 1 || x > 12 || y < 1 || y > 8) {
    if ((x === 6 || x === 7) && y === 9) return true;
    return false;
  }
  // Top wall (smartboard & bookshelves)
  if (y === 1) return false;
  // Teacher position
  if (x === 7 && y === 2) return false;
  // Desks at y === 5
  if (y === 5 && (x === 3 || x === 4 || x === 6 || x === 7 || x === 9 || x === 10)) return false;
  // Globe
  if (x === 12 && y === 4) return false;
  return true;
}

export function getSchoolInteractable(x: number, y: number): SchoolInteractable | null {
  return SCHOOL_INTERACTABLES.find((i) => i.x === x && i.y === y) || null;
}

export interface LessonSlide {
  title: string;
  emoji: string;
  badgeText: string;
  storyText: string;
  visualCards: { icon: string; label: string; detail: string }[];
  interactivePrompt: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface SchoolChapterLesson {
  chapterKey: string;
  chapterId: string;
  subject: SchoolSubjectKey;
  academicSubject: AcademicSubject;
  subjectName: string;
  chapterTitle: string;
  chapterNumber: number;
  cityName: string;
  schoolTitle: string;
  teacherName: string;
  teacherEmoji: string;
  themeColor: string;
  subjectColor: string;
  slidesByYear: Record<StudentYear, LessonSlide[]>;
}

export const CITY_SCHOOL_LESSONS: SchoolChapterLesson[] = [
  // 1. MATEMÁTICA (Viridian / Pewter)
  {
    chapterKey: "math_ch1",
    chapterId: "math_ch1",
    subject: "math",
    academicSubject: "matematica",
    subjectName: "Matemática & Lógica",
    chapterTitle: "Capítulo 1 • Operações, Dezenas e Raciocínio",
    chapterNumber: 1,
    cityName: "Pewter & Viridian",
    schoolTitle: "Escola da Cidade • Matemática & Lógica",
    teacherName: "Profª. Íris Pitágoras",
    teacherEmoji: "📐",
    themeColor: "#2563eb",
    subjectColor: "#2563eb",
    slidesByYear: {
      2: [
        {
          title: "Capítulo 1: Somando e Subtraindo com Pokébolas!",
          emoji: "🔢",
          badgeText: "2º Ano • Adição e Subtração",
          storyText:
            "Bem-vinda à Escola da Cidade! Quando juntamos Pokébolas na mochila, usamos a ADIÇÃO (+). Quando usamos Pokébolas na grama alta, fazemos uma SUBTRAÇÃO (-)! Também podemos contar de 2 em 2 ou de 5 em 5 para ir super rápido!",
          visualCards: [
            { icon: "🔴 + 🔴", label: "Dezena = 10", detail: "10 unidades formam 1 Dezena inteira!" },
            { icon: "⚡ 2, 4, 6, 8", label: "Pares e Dobro", detail: "O dobro é somar o número com ele mesmo: 6 + 6 = 12!" },
            { icon: "📏 100 cm", label: "Medidas", detail: "1 metro tem exatamente 100 centímetros!" },
          ],
          interactivePrompt: {
            question: "Vamos testar na lousa! Se você tem 1 dezena (10) de Pokébolas e ganha mais 5, com quantas fica?",
            options: ["12 Pokébolas", "15 Pokébolas", "20 Pokébolas"],
            correctIndex: 1,
            explanation: "Isso mesmo! 1 dezena vale 10, e 10 + 5 = 15 Pokébolas!",
          },
        },
        {
          title: "Formas Geométricas e o Relógio da Aventura!",
          emoji: "⏰",
          badgeText: "2º Ano • Geometria e Tempo",
          storyText:
            "Olhe ao redor da cidade: as placas têm formas geométricas! O quadrado tem 4 lados iguais, o triângulo tem 3 pontas e o cubo parece um dado de 6 faces!",
          visualCards: [
            { icon: "🎲 Cubo", label: "6 Faces Quadradas", detail: "Como uma caixa mágica ou dado de jogo!" },
            { icon: "🔺 Triângulo", label: "3 Lados e 3 Pontas", detail: "Igual ao telhado das casinhas da Vila!" },
            { icon: "🪙 Moedas", label: "Troco Esperto", detail: "Se você tem 20 moedas e gasta 8, sobram 12!" },
          ],
          interactivePrompt: {
            question: "Qual destas formas geométricas tem exatamente 3 lados?",
            options: ["Quadrado", "Círculo", "Triângulo"],
            correctIndex: 2,
            explanation: "Perfeito! O Triângulo tem 3 lados e 3 vértices (pontas)!",
          },
        },
      ],
      4: [
        {
          title: "Capítulo 1: Multiplicação, Divisão e Frações Pokémon!",
          emoji: "✖️",
          badgeText: "4º Ano • Operações e Frações",
          storyText:
            "Bem-vinda à Escola da Cidade! No 4º Ano, usamos a multiplicação para somar fileiras rápidas (como 7 × 8 = 56) e a divisão para repartir poções igualmente entre a equipe!",
          visualCards: [
            { icon: "🍕 1/2 e 1/4", label: "Frações na Prática", detail: "Metade de 100 é 50; um quarto (÷4) de 100 é 25!" },
            { icon: "📐 Perímetro", label: "Soma dos Lados", detail: "Quadrado de lado 6m tem perímetro 6+6+6+6 = 24m!" },
            { icon: "⚖️ 1 km e 1 kg", label: "Milhares (1.000)", detail: "1 km = 1.000 metros e 1 kg = 1.000 gramas!" },
          ],
          interactivePrompt: {
            question: "Se uma arena quadrada de batalha tem 5 metros em cada um dos seus 4 lados, qual é o seu perímetro total?",
            options: ["15 metros", "20 metros", "25 metros"],
            correctIndex: 1,
            explanation: "Excelente! O perímetro é a soma dos 4 lados: 5 × 4 = 20 metros!",
          },
        },
        {
          title: "Valor Posicional, Ângulos e Problemas Estratégicos!",
          emoji: "🧭",
          badgeText: "4º Ano • Sistema Decimal & Geometria",
          storyText:
            "Em números grandes como 4.582, cada posição tem um valor: Milhar (4.000), Centena (500), Dezena (80) e Unidade (2). E nos cantos das quadras vemos o famoso Ângulo Reto de 90°!",
          visualCards: [
            { icon: "🔢 4.582", label: "Centenas e Milhares", detail: "O 5 na casa das centenas vale 500 unidades!" },
            { icon: "📐 90°", label: "Ângulo Reto", detail: "Forma um canto perfeitamente quadrado em 'L'!" },
            { icon: "➗ Resto Zero", label: "Divisão Exata", detail: "45 dividido por 5 dá 9 exato, pois 9 × 5 = 45!" },
          ],
          interactivePrompt: {
            question: "No número 3.740, quanto vale o algarismo 7?",
            options: ["70 unidades", "700 unidades", "7.000 unidades"],
            correctIndex: 1,
            explanation: "Show! O 7 ocupa a casa das centenas, valendo 700 unidades!",
          },
        },
      ],
    },
  },

  // 2. CIÊNCIAS (Cerulean / Cinnabar)
  {
    chapterKey: "science_ch1",
    chapterId: "science_ch1",
    subject: "science",
    academicSubject: "ciencias",
    subjectName: "Ciências da Natureza",
    chapterTitle: "Capítulo 1 • Seres Vivos, Fotossíntese e Planeta Terra",
    chapterNumber: 1,
    cityName: "Cerulean & Cinnabar",
    schoolTitle: "Escola da Cidade • Ciências da Natureza",
    teacherName: "Prof. Carvalho Júnior",
    teacherEmoji: "🔬",
    themeColor: "#059669",
    subjectColor: "#059669",
    slidesByYear: {
      2: [
        {
          title: "Capítulo 1: As Plantas, a Água e os Seres Vivos!",
          emoji: "🌱",
          badgeText: "2º Ano • Vida e Natureza",
          storyText:
            "Assim como o Bulbasaur precisa de sol e água, as plantas têm partes incríveis: a RAIZ absorve água da terra, o CAULE sustenta, as FOLHAS respiram e fazem fotossíntese, e a FLOR guarda as sementes!",
          visualCards: [
            { icon: "🌱 Raiz", label: "Absorve Água", detail: "Fica debaixo da terra nutrindo toda a plantinha!" },
            { icon: "☀️ Luz Solar", label: "Energia Vital", detail: "Sem água e luz do Sol, a semente não germina!" },
            { icon: "🦷 Higiene", label: "Saúde do Corpo", detail: "Escovar os dentes e lavar as mãos afasta micróbios!" },
          ],
          interactivePrompt: {
            question: "Qual parte da planta fica debaixo da terra e absorve água e sais minerais?",
            options: ["A pétala da flor", "A raiz", "A folha verde"],
            correctIndex: 1,
            explanation: "Muito bem! A raiz fixa a planta no solo e suga a água fresquinha!",
          },
        },
        {
          title: "Os Cinco Sentidos e os Animais da Floresta!",
          emoji: "🦋",
          badgeText: "2º Ano • Corpo Humano e Animais",
          storyText:
            "Percebemos o mundo com 5 sentidos: Visão (olhos), Audição (ouvidos), Olfato (nariz), Paladar (língua) e Tato (pele)! E na natureza existem animais vertebrados (com ossos) e invertebrados (como a lagarta Caterpie)!",
          visualCards: [
            { icon: "👀 👂 👃", label: "5 Sentidos", detail: "O olfato sente perfumes; a audição ouve músicas!" },
            { icon: "🐟 Peixes", label: "Vida Aquática", detail: "Vivem na água e nadam com nadadeiras (como Magikarp)!" },
            { icon: "🌙 Dia e Noite", label: "Giro da Terra", detail: "Quando o Sol ilumina nosso lado da Terra, é dia!" },
          ],
          interactivePrompt: {
            question: "Com qual sentido conseguimos sentir o cheiro perfumado de uma flor?",
            options: ["Olfato (nariz)", "Tato (mãos)", "Audição (ouvidos)"],
            correctIndex: 0,
            explanation: "Acertou! O olfato, através do nariz, percebe os aromas e cheiros!",
          },
        },
      ],
      4: [
        {
          title: "Capítulo 1: Fotossíntese, Cadeia Alimentar e Ecossistemas!",
          emoji: "🌿",
          badgeText: "4º Ano • Ecologia e Energia",
          storyText:
            "Na natureza, as plantas são PRODUTORAS porque fabricam seu alimento na fotossíntese usando luz solar, água e gás carbônico, liberando OXIGÊNIO! Já os fungos e bactérias são DECOMPOSITORES que reciclam nutrientes!",
          visualCards: [
            { icon: "☀️ Fotossíntese", label: "Libera Oxigênio", detail: "As folhas usam luz solar + CO₂ + água!" },
            { icon: "🌱 → 🐰 → 🦅", label: "Cadeia Alimentar", detail: "Produtores (plantas), Consumidores e Decompositores!" },
            { icon: "🦴 Esqueleto", label: "Sustentação", detail: "Sustenta o corpo e protege órgãos vitais!" },
          ],
          interactivePrompt: {
            question: "Qual gás essencial para a nossa respiração as plantas liberam durante a fotossíntese?",
            options: ["Gás Oxigênio", "Fumaça cinza", "Vapor de rocha"],
            correctIndex: 0,
            explanation: "Perfeito! As plantas produzem e liberam o Oxigênio que respiramos!",
          },
        },
        {
          title: "Estados da Água e Movimentos do Planeta Terra!",
          emoji: "🌍",
          badgeText: "4º Ano • Matéria e Astronomia",
          storyText:
            "A água muda de estado físico: Gelo (sólido) derretendo vira líquido (FUSÃO), e água líquida aquecida pelo Sol vira vapor (EVAPORAÇÃO). Enquanto isso, a Terra faz ROTAÇÃO (24h = dia e noite) e TRANSLAÇÃO (365 dias = 1 ano)!",
          visualCards: [
            { icon: "🧊 → 💧 → ☁️", label: "Ciclo da Água", detail: "Fusão (gelo→água), Evaporação (água→vapor)!" },
            { icon: "🌍 Rotação", label: "Dura 24 Horas", detail: "Giro da Terra em torno de si mesma (Dia e Noite)!" },
            { icon: "☀️ Translação", label: "Dura 365 Dias", detail: "Volta completa da Terra ao redor do Sol (Estaçoes)!" },
          ],
          interactivePrompt: {
            question: "Como se chama o movimento da Terra girando em torno de seu próprio eixo, que dura 24 horas?",
            options: ["Rotação", "Fusão", "Fotossíntese"],
            correctIndex: 0,
            explanation: "Exato! A Rotação dura 24 horas e cria a sucessão dos dias e das noites!",
          },
        },
      ],
    },
  },

  // 3. PORTUGUÊS (Celadon / Pallet)
  {
    chapterKey: "portuguese_ch1",
    chapterId: "portuguese_ch1",
    subject: "portuguese",
    academicSubject: "portugues",
    subjectName: "Língua Portuguesa",
    chapterTitle: "Capítulo 1 • Sílabas, Gramática e Acentuação",
    chapterNumber: 1,
    cityName: "Celadon & Pallet",
    schoolTitle: "Escola da Cidade • Língua Portuguesa & Leitura",
    teacherName: "Profª. Helena Clarice",
    teacherEmoji: "📚",
    themeColor: "#9333ea",
    subjectColor: "#9333ea",
    slidesByYear: {
      2: [
        {
          title: "Capítulo 1: Vogais, Sílabas e Rimas Encantadas!",
          emoji: "🔤",
          badgeText: "2º Ano • Fonologia e Palavras",
          storyText:
            "As palavras são formadas por pedacinhos de som chamados SÍLABAS! As 5 vogais (A, E, I, O, U) dão voz às sílabas. E quando duas palavras terminam com o mesmo som — como GATO e SAPATO — temos uma RIMA!",
          visualCards: [
            { icon: "👏 BO-NE-CA", label: "3 Sílabas", detail: "Bata palmas para contar cada pedacinho da palavra!" },
            { icon: "🐱 Gato / Sapato", label: "Rima Perfeita", detail: "Terminam com o mesmo som '-ATO'!" },
            { icon: "🅱️ Bianca", label: "Letra Maiúscula", detail: "Nomes de pessoas e cidades sempre começam com Maiúscula!" },
          ],
          interactivePrompt: {
            question: "Quantas sílabas (pedacinhos de som) tem a palavra CA-VA-LO?",
            options: ["2 sílabas", "3 sílabas", "5 sílabas"],
            correctIndex: 1,
            explanation: "Muito bem! CA - VA - LO tem 3 sílabas!",
          },
        },
        {
          title: "Antônimos, Sinônimos e Sinais de Pontuação!",
          emoji: "❓",
          badgeText: "2º Ano • Sentido e Frases",
          storyText:
            "Palavras de sentido CONTRÁRIO são chamadas de Antônimos (Feliz ↔ Triste, Alto ↔ Baixo). E no final da frase, usamos ? para fazer uma pergunta e ! para mostrar admiração ou alegria!",
          visualCards: [
            { icon: "☀️ Dia ↔ Noite 🌙", label: "Contrário (Antônimo)", detail: "Quente ↔ Frio, Grande ↔ Pequeno!" },
            { icon: "❓ Pergunta", label: "Ponto de Interrogação", detail: "Usado em: 'Qual é o seu Pokémon favorito?'" },
            { icon: "🎉 Alegria!", label: "Ponto de Exclamação", detail: "Usado em: 'Que captura incrível!'" },
          ],
          interactivePrompt: {
            question: "Qual sinal de pontuação usamos no final de uma pergunta?",
            options: ["Ponto de interrogação (?)", "Vírgula (,)", "Dois-pontos (:)"],
            correctIndex: 0,
            explanation: "Perfeito! O ponto de interrogação (?) indica uma pergunta!",
          },
        },
      ],
      4: [
        {
          title: "Capítulo 1: Substantivos, Adjetivos, Verbos e Pronomes!",
          emoji: "✍️",
          badgeText: "4º Ano • Classes Gramaticais",
          storyText:
            "Na gramática do 4º Ano, cada palavra tem uma missão: o SUBSTANTIVO dá nome aos seres; o ADJETIVO dá uma qualidade (ex: corajosa, brilhante); o VERBO indica ação ou tempo (correu, estudará); e o PRONOME substitui o nome (Ela, Nós)!",
          visualCards: [
            { icon: "🌟 Adjetivo", label: "Dá Qualidade", detail: "'Menina estudiosa' -> estudiosa é adjetivo!" },
            { icon: "🏃‍♀️ Verbo", label: "Ação e Tempo", detail: "Passado (fez), Presente (faz), Futuro (fará)!" },
            { icon: "👩‍👧‍👧 Pronome", label: "Evita Repetição", detail: "'Bianca e Cecília saíram' -> 'Elas saíram'!" },
          ],
          interactivePrompt: {
            question: "Na frase 'O Pikachu veloz venceu o torneio', qual palavra é um ADJETIVO (qualidade)?",
            options: ["Pikachu", "veloz", "venceu"],
            correctIndex: 1,
            explanation: "Isso mesmo! 'Veloz' é a qualidade (adjetivo) do Pikachu!",
          },
        },
        {
          title: "Acentuação: Oxítonas, Paroxítonas e Proparoxítonas!",
          emoji: "🎯",
          badgeText: "4º Ano • Sílaba Tônica e Ortografia",
          storyText:
            "A sílaba pronunciada com mais força é a SÍLABA TÔNICA! Se for a última (ca-FÉ), é Oxítona. Se for a penúltima (CA-sa), é Paroxítona. E se for a antepenúltima (LÂM-pa-da, MÉ-di-co), é Proparoxítona — e todas as proparoxítonas têm acento!",
          visualCards: [
            { icon: "💡 LÂM-pa-da", label: "Proparoxítona", detail: "Antepenúltima forte — todas são acentuadas!" },
            { icon: "☕ ca-FÉ", label: "Oxítona", detail: "A última sílaba é a mais forte!" },
            { icon: "🔍 Mal vs Mau", label: "Dica de Ouro", detail: "MAU é o contrário de BOM; MAL é o contrário de BEM!" },
          ],
          interactivePrompt: {
            question: "As palavras MÉ-DI-CO e MÚ-SI-CA têm a antepenúltima sílaba mais forte. Elas são:",
            options: ["Oxítonas", "Proparoxítonas", "Monossílabas"],
            correctIndex: 1,
            explanation: "Brilhante! Quando a antepenúltima sílaba é a tônica, a palavra é Proparoxítona!",
          },
        },
      ],
    },
  },

  // 4. INGLÊS (Vermilion / Fuchsia)
  {
    chapterKey: "english_ch1",
    chapterId: "english_ch1",
    subject: "english",
    academicSubject: "ingles",
    subjectName: "Inglês (English Academy)",
    chapterTitle: "Chapter 1 • Vocabulary, Greetings & Grammar",
    chapterNumber: 1,
    cityName: "Vermilion & Fuchsia",
    schoolTitle: "Escola da Cidade • English Academy",
    teacherName: "Teacher Mary Joy",
    teacherEmoji: "🌍",
    themeColor: "#d97706",
    subjectColor: "#d97706",
    slidesByYear: {
      2: [
        {
          title: "Chapter 1: Colors, Animals & Friendly Greetings!",
          emoji: "🌈",
          badgeText: "2º Ano • English Vocabulary",
          storyText:
            "Welcome to the English School! Em inglês, cumprimentamos pela manhã dizendo 'Good morning!' e à noite 'Good night!'. Também aprendemos as cores e os animais que vivem ao nosso redor!",
          visualCards: [
            { icon: "🌅 Good Morning", label: "Bom Dia!", detail: "Thank you = Obrigado(a) | Please = Por favor!" },
            { icon: "🎨 Red, Blue, Yellow", label: "Primary Colors", detail: "Red (Vermelho), Blue (Azul), Green (Verde)!" },
            { icon: "🐶 Dog & 🐱 Cat", label: "Pets & Animals", detail: "Bird (Pássaro), Fish (Peixe), Apple (Maçã)!" },
          ],
          interactivePrompt: {
            question: "Como dizemos 'Bom dia' em inglês quando acordamos?",
            options: ["Good night", "Good morning", "Goodbye"],
            correctIndex: 1,
            explanation: "Great job! 'Good morning' significa 'Bom dia'!",
          },
        },
        {
          title: "Numbers, Family & School Objects!",
          emoji: "🎒",
          badgeText: "2º Ano • Numbers & Family",
          storyText:
            "Na nossa mochila escolar levamos 'Book' (livro) e 'Pencil' (lápis). E na nossa família temos 'Mother' (mãe), 'Father' (pai) e 'Sister' (irmã)!",
          visualCards: [
            { icon: "👩‍👧‍👧 Sister", label: "Irmã", detail: "Mother (Mãe), Father (Pai), Brother (Irmão)!" },
            { icon: "📖 Book & ✏️ Pencil", label: "School Bag", detail: "Book = Livro | Pencil = Lápis | Teacher = Professora!" },
            { icon: "✋ Five (5) & Ten (10)", label: "Counting 1 to 10", detail: "One, Two, Three, Four, Five... Ten!" },
          ],
          interactivePrompt: {
            question: "O que significa a palavra 'Sister' em inglês?",
            options: ["Irmã", "Escola", "Estrela"],
            correctIndex: 0,
            explanation: "Awesome! 'Sister' significa 'Irmã'!",
          },
        },
      ],
      4: [
        {
          title: "Chapter 1: Daily Routine, Verbs & Question Words!",
          emoji: "🗽",
          badgeText: "4º Ano • Grammar & Conversation",
          storyText:
            "Welcome aboard! No 4º Ano montamos frases completas em inglês! Usamos 'Where' (Onde), 'When' (Quando), 'Why' (Por que) e o verbo 'Can' para habilidades ('She can swim very well!').",
          visualCards: [
            { icon: "❓ Where / When / Who", label: "Question Words", detail: "Where = Onde | When = Quando | Who = Quem!" },
            { icon: "🏊‍♀️ She CAN swim", label: "Modal Verb CAN", detail: "Indica habilidade: 'Ela sabe/consegue nadar'!" },
            { icon: "📚 Reading Now (-ING)", label: "Present Continuous", detail: "'She is reading a book' = Ela está lendo agora!" },
          ],
          interactivePrompt: {
            question: "Qual palavra usamos em inglês para perguntar 'ONDE' fica um lugar (ex: ___ is the school?)?",
            options: ["Where", "Who", "How many"],
            correctIndex: 0,
            explanation: "Perfect! 'Where' significa 'Onde'!",
          },
        },
        {
          title: "Prepositions, Numbers to 100 & Plurals!",
          emoji: "🧭",
          badgeText: "4º Ano • Prepositions & Plurals",
          storyText:
            "Para indicar onde um objeto está, usamos: IN (dentro), ON (em cima) e UNDER (embaixo)! E atenção aos plurais especiais: 'One child' (1 criança) vira 'Two CHILDREN' (2 crianças)!",
          visualCards: [
            { icon: "📦 In / On / Under", label: "Prepositions of Place", detail: "On the table (em cima), Under the bed (embaixo)!" },
            { icon: "👧🧒 Children", label: "Irregular Plural", detail: "Child → Children | Tooth → Teeth | Foot → Feet!" },
            { icon: "🔢 Twenty to Hundred", label: "Big Numbers", detail: "20 = Twenty, 50 = Fifty, 100 = One hundred!" },
          ],
          interactivePrompt: {
            question: "Se a Pokébola está EMBAIXO da cadeira, dizemos que ela está:",
            options: ["Under the chair", "On the chair", "Behind the sky"],
            correctIndex: 0,
            explanation: "Spot on! 'Under' significa 'embaixo de'!",
          },
        },
      ],
    },
  },

  // 5. GEOGRAFIA & HISTÓRIA (Saffron / Lavender)
  {
    chapterKey: "geography_ch1",
    chapterId: "geography_ch1",
    subject: "geography",
    academicSubject: "ciencias",
    subjectName: "Geografia & Mapas",
    chapterTitle: "Capítulo 1 • Rosa dos Ventos, Mapas e Biomas",
    chapterNumber: 1,
    cityName: "Saffron & Lavender",
    schoolTitle: "Escola da Cidade • Geografia, Mapas & Mundo",
    teacherName: "Prof. Atlas Navegador",
    teacherEmoji: "🗺️",
    themeColor: "#0284c7",
    subjectColor: "#0284c7",
    slidesByYear: {
      2: [
        {
          title: "Capítulo 1: O Sol Nascente, Bairros e Sinais de Trânsito!",
          emoji: "🧭",
          badgeText: "2º Ano • Espaço e Convivência",
          storyText:
            "Todo bom explorador sabe se orientar! O Sol nasce todas as manhãs no lado LESTE e se põe no OESTE. E nas ruas da cidade, a faixa de pedestres e o semáforo garantem a segurança de todos!",
          visualCards: [
            { icon: "🌅 Nascente = Leste", label: "Pontos Cardeais", detail: "O Sol nasce no Leste e se esconde no Oeste!" },
            { icon: "🚦 Semáforo", label: "Vermelho, Amarelo, Verde", detail: "Vermelho = Pare | Verde = Siga com cuidado!" },
            { icon: "🌾 Campo e Cidade 🏙️", label: "Zona Rural e Urbana", detail: "O campo produz alimentos; a cidade tem comércios!" },
          ],
          interactivePrompt: {
            question: "Em qual direção o Sol nasce todas as manhãs?",
            options: ["No Leste (Nascente)", "No fundo do mar", "Apenas no Sul"],
            correctIndex: 0,
            explanation: "Muito bem! O Sol nasce sempre no Leste (Nascente)!",
          },
        },
      ],
      4: [
        {
          title: "Capítulo 1: Rosa dos Ventos, Mapas, Relevo e Biomas do Brasil!",
          emoji: "🌎",
          badgeText: "4º Ano • Cartografia e Geografia do Brasil",
          storyText:
            "Na Geografia do 4º Ano, usamos a Rosa dos Ventos (Norte, Sul, Leste, Oeste), o Globo Terrestre e os mapas da IBGE! O nosso país é o Brasil (capital Brasília), banhado a leste pelo Oceano Atlântico e rico em biomas como Amazônia, Cerrado e Caatinga!",
          visualCards: [
            { icon: "🧭 Rosa dos Ventos", label: "N, S, L, O + Colaterais", detail: "Nordeste (NE) fica entre o Norte e o Leste!" },
            { icon: "🇧🇷 Brasília (DF)", label: "Capital Federal", detail: "O Brasil tem 5 grandes regiões e 26 estados + DF!" },
            { icon: "🌳 Amazônia & Cerrado", label: "Biomas Brasileiros", detail: "Caatinga (semiárido), Pantanal (planície alagável)!" },
          ],
          interactivePrompt: {
            question: "Qual oceano banha todo o litoral leste do Brasil?",
            options: ["Oceano Atlântico", "Oceano Glacial Ártico", "Oceano Índico"],
            correctIndex: 0,
            explanation: "Excelente! O litoral brasileiro é banhado pelo Oceano Atlântico!",
          },
        },
      ],
    },
  },
];

export function getSchoolSubjectByBuildingId(buildingId: string): SchoolSubjectKey {
  const normalized = buildingId.toLowerCase();
  if (normalized.includes("science") || normalized.includes("cerulean") || normalized.includes("cinnabar")) {
    return "science";
  }
  if (normalized.includes("portuguese") || normalized.includes("library") || normalized.includes("lib") || normalized.includes("celadon") || normalized.includes("pallet")) {
    return "portuguese";
  }
  if (normalized.includes("english") || normalized.includes("vermilion") || normalized.includes("fuchsia")) {
    return "english";
  }
  if (normalized.includes("geography") || normalized.includes("saffron") || normalized.includes("lavender")) {
    return "geography";
  }
  return "math";
}

export function getSchoolLesson(subjectKey: SchoolSubjectKey, _year?: StudentYear): SchoolChapterLesson {
  return (
    CITY_SCHOOL_LESSONS.find((l) => l.subject === subjectKey) ||
    CITY_SCHOOL_LESSONS[0]
  );
}

export function getSchoolLessonByBuildingId(buildingId: string): SchoolChapterLesson {
  const subjectKey = getSchoolSubjectByBuildingId(buildingId);
  return getSchoolLesson(subjectKey);
}

export function getSchoolLessonBySubject(subject: SchoolSubjectKey | AcademicSubject): SchoolChapterLesson {
  return (
    CITY_SCHOOL_LESSONS.find((l) => l.subject === subject || l.academicSubject === subject) ||
    CITY_SCHOOL_LESSONS[0]
  );
}

/**
 * Renders the walkable GBA-style Classroom Interior for Escola da Cidade
 */
export function drawCitySchoolInterior(
  ctx: CanvasRenderingContext2D,
  tileSize: number,
  lessonOrTitle: SchoolChapterLesson | string,
  colorOrStudied: string | boolean,
  isChapterStudiedArg?: boolean,
  _waterTick?: number,
  teacherSpriteArg?: HTMLImageElement | null
) {
  const isLessonObj = typeof lessonOrTitle === "object" && lessonOrTitle !== null;
  const lesson = isLessonObj ? lessonOrTitle : CITY_SCHOOL_LESSONS[0];
  const isChapterStudied = isLessonObj ? Boolean(colorOrStudied) : Boolean(isChapterStudiedArg);
  const teacherSprite = teacherSpriteArg;

  ctx.fillStyle = "#090d16";
  ctx.fillRect(-tileSize * 15, -tileSize * 15, (SCHOOL_COLS + 30) * tileSize, (SCHOOL_ROWS + 30) * tileSize);

  // 1. Classroom Floor (Warm school wood & cream tiles)
  for (let y = 0; y < SCHOOL_ROWS; y++) {
    for (let x = 0; x < SCHOOL_COLS; x++) {
      if (y === 0 || y === SCHOOL_ROWS - 1 || x === 0 || x === SCHOOL_COLS - 1) {
        ctx.fillStyle = "#1e293b";
        ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        continue;
      }
      const isAlt = (x + y) % 2 === 0;
      ctx.fillStyle = y <= 2 ? (isAlt ? "#e2e8f0" : "#cbd5e1") : isAlt ? "#fde68a" : "#fcd34d";
      ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
      ctx.strokeStyle = "rgba(180, 83, 9, 0.14)";
      ctx.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
    }
  }

  // 2. Top Wall Header
  ctx.fillStyle = "#334155";
  ctx.fillRect(tileSize, 0, (SCHOOL_COLS - 2) * tileSize, tileSize * 1.3);

  // 3. Interactive Smartboard / Chalkboard (x: 5..8, y: 0.3..1.7)
  ctx.fillStyle = "#064e3b";
  ctx.strokeStyle = "#d97706";
  ctx.lineWidth = 4;
  ctx.fillRect(5 * tileSize, tileSize * 0.25, 4 * tileSize, tileSize * 1.45);
  ctx.strokeRect(5 * tileSize, tileSize * 0.25, 4 * tileSize, tileSize * 1.45);

  ctx.fillStyle = "#a7f3d0";
  ctx.font = `bold ${Math.max(10, Math.floor(tileSize * 0.26))}px monospace`;
  ctx.textAlign = "center";
  ctx.fillText(
    `${lesson.teacherEmoji} AULA CAP. ${lesson.chapterNumber}`,
    7 * tileSize,
    tileSize * 0.85
  );
  ctx.fillStyle = isChapterStudied ? "#fde047" : "#ffffff";
  ctx.font = `bold ${Math.max(9, Math.floor(tileSize * 0.22))}px sans-serif`;
  ctx.fillText(
    isChapterStudied ? "✅ Conteúdo Visto!" : "👆 Toque p/ Assistir!",
    7 * tileSize,
    tileSize * 1.35
  );

  // 4. Bookshelves (x: 1..2, y: 1 and x: 11..12, y: 1)
  const drawShelf = (sx: number) => {
    ctx.fillStyle = "#78350f";
    ctx.fillRect(sx * tileSize + 2, tileSize * 0.3, tileSize * 2 - 4, tileSize * 1.5);
    ctx.fillStyle = "#ef4444";
    ctx.fillRect(sx * tileSize + 6, tileSize * 0.55, tileSize * 0.4, tileSize * 0.4);
    ctx.fillStyle = "#3b82f6";
    ctx.fillRect(sx * tileSize + 6 + tileSize * 0.5, tileSize * 0.55, tileSize * 0.4, tileSize * 0.4);
    ctx.fillStyle = "#10b981";
    ctx.fillRect(sx * tileSize + 6 + tileSize * 1.0, tileSize * 0.55, tileSize * 0.4, tileSize * 0.4);
  };
  drawShelf(1);
  drawShelf(11);

  // 5. Teacher at (x: 7, y: 2)
  if (teacherSprite && teacherSprite.complete && teacherSprite.naturalWidth > 0) {
    ctx.drawImage(teacherSprite, 0, 0, 32, 32, 7 * tileSize + 4, 2 * tileSize, tileSize - 8, tileSize);
  } else {
    ctx.font = `${Math.floor(tileSize * 0.7)}px serif`;
    ctx.textAlign = "center";
    ctx.fillText("👩‍🏫", 7.5 * tileSize, 2.75 * tileSize);
  }

  // Floating badge over Teacher
  ctx.fillStyle = isChapterStudied ? "rgba(16, 185, 129, 0.92)" : "rgba(245, 158, 11, 0.95)";
  ctx.fillRect(5.6 * tileSize, 1.75 * tileSize, 2.8 * tileSize, tileSize * 0.42);
  ctx.fillStyle = "#ffffff";
  ctx.font = `bold ${Math.max(9, Math.floor(tileSize * 0.21))}px sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText(
    isChapterStudied ? "1º Aula Concluída ✓" : "1º Passo: Ver Aula!",
    7 * tileSize,
    2.03 * tileSize
  );

  // 6. Student Desks for Exams (x: 3..4, 6..7, 9..10 at y: 5)
  const deskPairs = [3, 6, 9];
  for (const dx of deskPairs) {
    ctx.fillStyle = "#92400e";
    ctx.fillRect(dx * tileSize + 4, 5 * tileSize + 4, tileSize * 2 - 8, tileSize - 6);
    ctx.strokeStyle = "#451a03";
    ctx.lineWidth = 2;
    ctx.strokeRect(dx * tileSize + 4, 5 * tileSize + 4, tileSize * 2 - 8, tileSize - 6);
    // Notebook icon on desk
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(dx * tileSize + tileSize * 0.65, 5 * tileSize + 8, tileSize * 0.7, tileSize * 0.45);
  }

  // Floating badge over Center Exam Desk
  ctx.fillStyle = isChapterStudied ? "rgba(37, 99, 235, 0.95)" : "rgba(71, 85, 105, 0.9)";
  ctx.fillRect(5.3 * tileSize, 4.45 * tileSize, 3.4 * tileSize, tileSize * 0.44);
  ctx.fillStyle = "#ffffff";
  ctx.font = `bold ${Math.max(9, Math.floor(tileSize * 0.21))}px sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText(
    isChapterStudied ? "2º Passo: Fazer Prova 📝" : "🔒 Veja a Aula Primeiro",
    7 * tileSize,
    4.75 * tileSize
  );

  // 7. Globe at (x: 12, y: 4)
  ctx.font = `${Math.floor(tileSize * 0.65)}px serif`;
  ctx.textAlign = "center";
  ctx.fillText("🌍", 12.5 * tileSize, 4.75 * tileSize);

  // 8. Exit Red Doormat at (x: 6..7, y: 9)
  ctx.fillStyle = "#dc2626";
  ctx.fillRect(6 * tileSize + 2, 8.8 * tileSize, tileSize * 2 - 4, tileSize * 0.9);
  ctx.fillStyle = "#ffffff";
  ctx.font = `bold ${Math.max(9, Math.floor(tileSize * 0.22))}px sans-serif`;
  ctx.fillText("SAÍDA 🚪", 7 * tileSize, 9.35 * tileSize);
}
