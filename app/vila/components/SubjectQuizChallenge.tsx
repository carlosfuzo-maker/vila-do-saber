"use client";

import React, { useState } from "react";
import { StudentYear } from "../types";
import {
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Trophy,
  ArrowRight,
  Star,
  RotateCcw,
  Lightbulb,
  Award,
  BookOpen,
} from "lucide-react";
import confetti from "canvas-confetti";
import { playSound } from "@/lib/soundEffects";

import { CHAPTER_QUIZ_BANK } from "../quizBank";

export interface QuizQuestion {
  id: string;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  emoji?: string;
}

interface SubjectQuizChallengeProps {
  subjectId: string;
  subjectName: string;
  year: StudentYear;
  chapterId?: number;
  onAllCompleted: () => void;
  onOpenWriter?: () => void;
}

const QUIZ_DATABASE: Record<string, Record<StudentYear, QuizQuestion[]>> = {
  ciencias: {
    4: [
      {
        id: "cie4-1",
        category: "Microrganismos & Saúde",
        emoji: "🔬",
        question: "Qual é a principal diferença entre bactérias e vírus?",
        options: [
          "Bactérias são células vivas (muitas fazem bem); vírus precisam de células para se multiplicar.",
          "Vírus são usados para fazer queijo e pão na padaria.",
          "Bactérias têm patas e olhos para caçar vírus.",
          "Não há diferença nenhuma, são exatamente a mesma coisa.",
        ],
        correctIndex: 0,
        explanation: "Muitas bactérias como os lactobacilos até ajudam nossa digestão! Já os vírus precisam invadir uma célula hospedeira.",
      },
      {
        id: "cie4-2",
        category: "Vacinas & Imunidade",
        emoji: "💉",
        question: "Para que servem as vacinas no nosso organismo?",
        options: [
          "Servem apenas como vitaminas para abrir o apetite.",
          "Ensinam nosso sistema imunológico a criar defesas antes de termos contato com a doença real.",
          "Servem para nos fazer dormir à noite.",
          "Curam imediatamente machucados no joelho.",
        ],
        correctIndex: 1,
        explanation: "As vacinas estimulam a produção de anticorpos soldados, criando uma memória de defesa no corpo!",
      },
      {
        id: "cie4-3",
        category: "Cadeia Alimentar",
        emoji: "🌿",
        question: "Na cadeia alimentar da floresta, por que as plantas são chamadas de 'Produtores'?",
        options: [
          "Porque compram comida na feira da Vila.",
          "Porque só se alimentam de folhas caídas.",
          "Porque caçam pequenos animais na terra.",
          "Porque produzem o próprio alimento através da fotossíntese usando a luz do Sol.",
        ],
        correctIndex: 3,
        explanation: "Com a luz solar, água e gás carbônico, as plantas produzem glicose pela fotossíntese!",
      },
      {
        id: "cie4-4",
        category: "Ecologia",
        emoji: "🍄",
        question: "Qual destes seres vivos é um importante decompositor que recicla a matéria orgânica na natureza?",
        options: [
          "Fungos e cogumelos da floresta.",
          "O leão da savana.",
          "A águia dourada.",
          "O tubarão dos mares.",
        ],
        correctIndex: 0,
        explanation: "Fungos e bactérias decompõem matéria orgânica morta e a transformam em nutrientes ricos para o solo!",
      },
    ],
    2: [
      {
        id: "cie2-1",
        category: "Animais da Natureza",
        emoji: "🦉",
        question: "Qual destes animaizinhos tem hábitos NOTURNOS (fica acordado de noite)?",
        options: [
          "🐓 Galo cantador",
          "🦉 Coruja atenta",
          "🦋 Borboleta colorida",
          "🐕 Cachorrinho brincalhão",
        ],
        correctIndex: 1,
        explanation: "A coruja tem olhos especiais e ouvidos aguçados para caçar no escuro da noite!",
      },
      {
        id: "cie2-2",
        category: "As Plantas",
        emoji: "🍎",
        question: "De qual parte da macieira nasce a deliciosa maçã vermelhinha?",
        options: [
          "🌸 Da flor que foi polinizada pelas abelhas",
          "🍂 Da ponta da raiz embaixo da terra",
          "🪵 Do meio do tronco de madeira",
          "🍃 Das folhas caídas no chão",
        ],
        correctIndex: 0,
        explanation: "As flores recebem a visita das abelhinhas e depois crescem se transformando em deliciosos frutos!",
      },
      {
        id: "cie2-3",
        category: "Os Cinco Sentidos",
        emoji: "👃",
        question: "Qual sentido nós usamos para sentir o cheirinho de bolo saindo do forno?",
        options: [
          "👀 Visão (pelos olhos)",
          "👂 Audição (pelas orelhas)",
          "👅 Paladar (pela língua)",
          "👃 Olfato (pelo nariz)",
        ],
        correctIndex: 3,
        explanation: "Pelo nariz nós sentimos os cheiros mais gostosos através do nosso olfato!",
      },
      {
        id: "cie2-4",
        category: "Seres Vivos e Não-Vivos",
        emoji: "🪨",
        question: "Qual elemento abaixo é um ser NÃO-VIVO na natureza?",
        options: [
          "🪨 A pedra do riacho",
          "🌻 O girassol do quintal",
          "🐱 O gatinho fofinho",
          "🌳 A árvore da pracinha",
        ],
        correctIndex: 0,
        explanation: "A pedrinha não nasce, não respira e não se alimenta; por isso ela é um ser não-vivo!",
      },
    ],
  },
  historia_geografia: {
    4: [
      {
        id: "hg4-1",
        category: "Regiões do Brasil",
        emoji: "🗺️",
        question: "Quantas e quais são as macrorregiões oficiais do território brasileiro segundo o IBGE?",
        options: [
          "5 regiões: Norte, Nordeste, Centro-Oeste, Sudeste e Sul.",
          "4 regiões: Leste, Oeste, Norte e Litoral.",
          "3 regiões: Amazônia, Sertão e Pampas.",
          "6 regiões: incluindo a Região Polar.",
        ],
        correctIndex: 0,
        explanation: "O Brasil é oficialmente dividido em 5 grandes regiões com grande riqueza cultural e natural!",
      },
      {
        id: "hg4-2",
        category: "Biomas Brasileiros",
        emoji: "🌳",
        question: "Qual é o maior bioma do Brasil, famoso por sua densa floresta e bacia hidrográfica?",
        options: [
          "Cerrado",
          "Floresta Amazônica",
          "Caatinga",
          "Pantanal",
        ],
        correctIndex: 1,
        explanation: "A Amazônia abriga a maior floresta tropical do mundo e a maior reserva de água doce!",
      },
      {
        id: "hg4-3",
        category: "História do Brasil",
        emoji: "🏹",
        question: "Quem já habitava e cuidava das terras brasileiras milhares de anos antes da chegada dos portugueses?",
        options: [
          "Os Vikings do mar do norte.",
          "Os Romanos antigos.",
          "Os Povos Indígenas (originários).",
          "O território era totalmente deserto e sem ninguém.",
        ],
        correctIndex: 2,
        explanation: "Milhões de indígenas de centenas de etnias (Tupi, Guarani, Yanomami, etc.) já viviam aqui!",
      },
      {
        id: "hg4-4",
        category: "Cartografia & Terra",
        emoji: "🌐",
        question: "Qual linha imaginária horizontal divide a Terra em Hemisfério Norte e Hemisfério Sul?",
        options: [
          "Linha do Equador",
          "Trópico de Capricórnio",
          "Meridiano de Greenwich",
          "Círculo Polar Antártico",
        ],
        correctIndex: 0,
        explanation: "A Linha do Equador passa bem ao norte do Brasil, cortando estados como o Amapá e o Pará!",
      },
    ],
    2: [
      {
        id: "hg2-1",
        category: "Nossa Comunidade",
        emoji: "🏡",
        question: "Qual é a melhor atitude para sermos bons vizinhos e cuidar do nosso bairro?",
        options: [
          "Jogar embalagens de lanche no meio da rua.",
          "Jogar o lixo na lixeira, respeitar os vizinhos e cuidar das praças.",
          "Arrancar as plantinhas da calçada.",
          "Gritar bem alto na janela dos outros à noite.",
        ],
        correctIndex: 1,
        explanation: "Cuidar do lixo e respeitar os vizinhos torna o bairro um lugar alegre e seguro para todos!",
      },
      {
        id: "hg2-2",
        category: "Brincadeiras de Antigamente",
        emoji: "🪁",
        question: "Como os nossos avós e bisavós brincavam quando eram crianças e não existia celular ou videogame?",
        options: [
          "Assistiam vídeos no tablet o dia todo.",
          "Eles não sabiam brincar de nada.",
          "Com pipa, pião, amarelinha, pular corda e cantigas de roda.",
          "Jogavam futebol apenas no computador.",
        ],
        correctIndex: 2,
        explanation: "Brincadeiras de rua e cantigas de roda faziam a alegria das crianças do passado!",
      },
      {
        id: "hg2-3",
        category: "Meios de Transporte",
        emoji: "🚌",
        question: "Qual destes é um meio de transporte COLETIVO (que transporta muitas pessoas juntas)?",
        options: [
          "🛹 Skate para uma pessoa",
          "🚲 Bicicleta pequena",
          "🚌 Ônibus escolar ou da cidade",
          "🛴 Patinete infantil",
        ],
        correctIndex: 2,
        explanation: "O ônibus, o trem e o metrô são transportes coletivos porque levam muitos passageiros ao mesmo tempo!",
      },
    ],
  },
  portugues: {
    4: [
      {
        id: "por4-1",
        category: "Gramática & Substantivos",
        emoji: "✍️",
        question: "Na frase 'A Cecília visitou Curitiba', as palavras 'Cecília' e 'Curitiba' são:",
        options: [
          "Substantivos Próprios (identificam pessoa e lugar específicos e usam letra maiúscula).",
          "Verbos de ação no passado.",
          "Adjetivos que qualificam cores.",
          "Sinais de pontuação de diálogo.",
        ],
        correctIndex: 0,
        explanation: "Nomes de pessoas, cidades e países são substantivos próprios e começam com letra maiúscula!",
      },
      {
        id: "por4-2",
        category: "Pontuação",
        emoji: "💬",
        question: "Qual sinal de pontuação indica que um personagem vai começar a falar em uma história?",
        options: [
          "— Travessão",
          "? Ponto de interrogação",
          ", Vírgula",
          "( ) Parênteses",
        ],
        correctIndex: 0,
        explanation: "O travessão (—) é o sinal clássico usado antes da fala dos personagens em contos e fábulas!",
      },
      {
        id: "por4-3",
        category: "Acentuação & Tonicidade",
        emoji: "📖",
        question: "Qual das palavras abaixo é PROPAROXÍTONA (onde a antepenúltima sílaba é a mais forte e sempre tem acento)?",
        options: [
          "🎒 Mo-chi-la",
          "✨ MÁ-GI-CA",
          "☕ Ca-fé",
          "🦁 A-ni-mal",
        ],
        correctIndex: 1,
        explanation: "Em MÁ-GI-CA, a sílaba tônica é MÁ. Toda palavra proparoxítona na língua portuguesa é acentuada!",
      },
      {
        id: "por4-4",
        category: "Classes de Palavras",
        emoji: "🌟",
        question: "Em 'O leão CORAJOSO protegeu a floresta', a palavra 'CORAJOSO' indica uma característica, logo é um:",
        options: [
          "Substantivo comum",
          "Adjetivo",
          "Ponto final",
          "Verbo no infinitivo",
        ],
        correctIndex: 1,
        explanation: "Adjetivos são palavras que dão qualidades ou características aos substantivos!",
      },
    ],
    2: [
      {
        id: "por2-1",
        category: "Rimas Encantadas",
        emoji: "🎈",
        question: "Qual palavra abaixo RIMA com a palavra CORAÇÃO?",
        options: [
          "🪟 Janela",
          "🎈 Balão",
          "⭐ Estrela",
          "🐱 Gatinho",
        ],
        correctIndex: 1,
        explanation: "Coração e Balão terminam com o mesmo sonzinho mágico '-ÃO'!",
      },
      {
        id: "por2-2",
        category: "Separação de Sílabas",
        emoji: "👏",
        question: "Quantas sílabas (palminhas) você bate para falar a palavra BO-NE-CA?",
        options: [
          "1 sílaba",
          "2 sílabas",
          "3 sílabas (Bo - Ne - Ca)",
          "5 sílabas",
        ],
        correctIndex: 2,
        explanation: "Bata palmas devagarzinho: BO (1)... NE (2)... CA (3)! São 3 sílabas!",
      },
      {
        id: "por2-3",
        category: "Completando Palavrinhas",
        emoji: "🦒",
        question: "Qual letrinha mágica completa o nome do animal: GI-___-A-FA?",
        options: [
          "Letra R (Girafa)",
          "Letra L (Gilafa)",
          "Letra S (Gisafa)",
          "Letra M (Gimafa)",
        ],
        correctIndex: 0,
        explanation: "A letrinha R forma o som macio de GI-RA-FA!",
      },
    ],
  },
  te: {
    4: [
      {
        id: "te4-1",
        category: "Pensamento Computacional",
        emoji: "🤖",
        question: "O que é um ALGORITMO no mundo da robótica e programação?",
        options: [
          "Uma sequência de passos lógicos e ordenados para realizar uma tarefa.",
          "Um tipo de parafuso de plástico.",
          "Um jogo que só funciona com pilhas velhas.",
          "Uma foto enviada por mensagem.",
        ],
        correctIndex: 0,
        explanation: "Como uma receita de bolo ou um mapa de passos, o algoritmo diz ao computador o que fazer em ordem!",
      },
      {
        id: "te4-2",
        category: "Informática & Lógica",
        emoji: "🐛",
        question: "O que significa a palavra 'BUG' quando falamos de programas de computador?",
        options: [
          "Um errinho ou falha no código que faz o programa não funcionar como esperado.",
          "Um inseto de verdade que comeu a memória do robô.",
          "O botão vermelho de desligar o aparelho.",
          "Um tipo de som que o computador faz ao ligar.",
        ],
        correctIndex: 0,
        explanation: "Quando encontramos um bug no código, nós fazemos a 'depuração' (debug) para consertar!",
      },
      {
        id: "te4-3",
        category: "Cidadania Digital",
        emoji: "🔐",
        question: "Qual é a melhor regra de segurança para proteger contas de jogos e e-mails?",
        options: [
          "Usar senhas fortes misturando letras, números e símbolos, sem contar para estranhos.",
          "Usar '123456' porque é mais rápido de digitar.",
          "Anotar a senha no quadro da escola.",
          "Usar o próprio primeiro nome como senha de tudo.",
        ],
        correctIndex: 0,
        explanation: "Senhas fortes e segredos mantêm nossas contas e mundos de jogos protegidos!",
      },
      {
        id: "te4-4",
        category: "Labirinto do Robô",
        emoji: "⚡",
        question: "O robô Peninha precisa sair da base e chegar à bateria: se ele der 2 passos para Frente (⬆️⬆️) e virar à Direita (➡️), para onde ele deve andar?",
        options: [
          "Dar ré na direção do lago",
          "Avançar para Frente no novo sentido (⬆️)",
          "Desligar os circuitos",
          "Ficar rodando em círculos",
        ],
        correctIndex: 1,
        explanation: "Após virar à direita, o comando 'Frente' faz o robô seguir em direção ao objetivo!",
      },
    ],
    2: [
      {
        id: "art2-1",
        category: "Mistura Mágica de Cores",
        emoji: "🎨",
        question: "Se a Bianca misturar a tinta Vermelha com a tinta Amarela, qual cor vai nascer?",
        options: [
          "🟩 Cor Verde",
          "🟧 Cor Laranja!",
          "🟪 Cor Roxa",
          "⬛ Cor Preta",
        ],
        correctIndex: 1,
        explanation: "Vermelho + Amarelo formam a linda cor Laranja do pôr do sol!",
      },
      {
        id: "art2-2",
        category: "Mistura Mágica de Cores",
        emoji: "🧪",
        question: "E se você misturar tinta Azul com tinta Amarela, que cor aparece?",
        options: [
          "🟩 Cor Verde das folhinhas!",
          "🟧 Cor Laranja",
          "🟪 Cor Roxa",
          "🟫 Cor Marrom",
        ],
        correctIndex: 0,
        explanation: "Azul + Amarelo formam o Verde vivo da natureza!",
      },
      {
        id: "art2-3",
        category: "Música & Ritmo",
        emoji: "🥁",
        question: "Qual destes é um instrumento musical de PERCUSSÃO (que tocamos batendo com baquetas ou as mãos)?",
        options: [
          "🪈 Flauta de soprar",
          "🎻 Violino de cordas",
          "🥁 Tambor ou Bateria",
          "🎺 Trompete dourado",
        ],
        correctIndex: 2,
        explanation: "O tambor, o chocalho e o pandeiro são instrumentos de percussão!",
      },
    ],
  },
};

export function SubjectQuizChallenge({
  subjectId,
  subjectName,
  year,
  chapterId = 1,
  onAllCompleted,
  onOpenWriter,
}: SubjectQuizChallengeProps) {
  const dbKey = subjectId in CHAPTER_QUIZ_BANK ? subjectId : (subjectId in QUIZ_DATABASE ? subjectId : "ciencias");
  const targetChapter = chapterId || 1;
  const questionsList =
    CHAPTER_QUIZ_BANK[dbKey]?.[year]?.[targetChapter] ||
    CHAPTER_QUIZ_BANK[dbKey]?.[year]?.[1] ||
    QUIZ_DATABASE[dbKey]?.[year] ||
    QUIZ_DATABASE["ciencias"][year];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answeredState, setAnsweredState] = useState<"unanswered" | "correct" | "incorrect">("unanswered");
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questionsList[currentIndex] || questionsList[0];

  const handleSelectOption = (optIndex: number) => {
    if (answeredState !== "unanswered") return;

    setSelectedOption(optIndex);
    const isCorrect = optIndex === currentQuestion.correctIndex;

    if (isCorrect) {
      playSound("star");
      setAnsweredState("correct");
      setCorrectAnswersCount((prev) => prev + 1);
    } else {
      playSound("pop");
      setAnsweredState("incorrect");
    }
  };

  const handleNext = () => {
    playSound("click");
    if (currentIndex + 1 < questionsList.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setAnsweredState("unanswered");
    } else {
      playSound("fanfare");
      setIsFinished(true);
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.5 },
        });
      } catch {
        // ignore
      }
    }
  };

  const handleRestart = () => {
    playSound("click");
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnsweredState("unanswered");
    setCorrectAnswersCount(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="py-6 text-center space-y-5 animate-fadeIn">
        <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-3xl bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 border-4 border-white shadow-xl flex items-center justify-center animate-bounce">
          <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-amber-950" />
        </div>

        <div>
          <span className="text-[11px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full inline-block mb-1">
            Missão Concluída!
          </span>
          <h3 className="text-2xl font-black text-slate-800">
            Show de Conhecimento!
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto mt-1 font-medium">
            Você acertou <strong>{correctAnswersCount} de {questionsList.length}</strong> questões com muita atenção e dedicação!
          </p>
        </div>

        {/* Reward pills */}
        <div className="flex items-center justify-center gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 max-w-xs mx-auto">
          <div className="flex items-center gap-1 text-amber-700 font-black text-xs sm:text-sm">
            <Trophy className="w-4 h-4 text-amber-600" />
            <span>+50 XP</span>
          </div>
          <div className="flex items-center gap-1 text-yellow-600 font-black text-xs sm:text-sm">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-500" />
            <span>+3 Estrelas</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={onAllCompleted}
            className="btn-game w-full sm:flex-1 py-3 px-5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-sm rounded-2xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Gravar Conquista & Fechar</span>
          </button>

          <button
            type="button"
            onClick={handleRestart}
            className="w-full sm:w-auto p-3 text-slate-500 hover:text-slate-700 text-xs font-bold cursor-pointer flex items-center justify-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Jogar de Novo</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 text-left animate-fadeIn">
      {/* Progress & Category Top Bar */}
      <div className="flex items-center justify-between pb-1 border-b border-slate-100">
        <span className="text-[11px] font-black uppercase text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
          <span>{currentQuestion.emoji}</span>
          <span>{currentQuestion.category}</span>
        </span>

        <span className="text-xs font-extrabold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
          Pergunta {currentIndex + 1} de {questionsList.length}
        </span>
      </div>

      {/* Question Prompt */}
      <div className="p-4 bg-gradient-to-r from-sky-50 to-indigo-50/60 rounded-2xl border-2 border-sky-200/80">
        <h4 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
          {currentQuestion.question}
        </h4>
      </div>

      {/* 4 Interactive Option Buttons */}
      <div className="space-y-2.5">
        {currentQuestion.options.map((optionText, optIdx) => {
          const isSelected = selectedOption === optIdx;
          const isCorrect = optIdx === currentQuestion.correctIndex;
          const showAnswer = answeredState !== "unanswered";

          let btnStyle =
            "bg-white hover:bg-sky-50/70 border-slate-200/90 text-slate-700 hover:border-sky-300";

          if (showAnswer) {
            if (isCorrect) {
              btnStyle =
                "bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-300/60 font-black";
            } else if (isSelected && !isCorrect) {
              btnStyle =
                "bg-rose-50 border-rose-400 text-rose-950 opacity-90 line-through";
            } else {
              btnStyle = "bg-slate-50/60 border-slate-200 text-slate-400";
            }
          }

          return (
            <button
              key={optIdx}
              type="button"
              disabled={showAnswer}
              onClick={() => handleSelectOption(optIdx)}
              className={`w-full p-3.5 sm:p-4 rounded-2xl border-2 text-xs sm:text-sm text-left transition-all flex items-center justify-between gap-3 cursor-pointer active:scale-98 shadow-sm ${btnStyle}`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className={`w-6 h-6 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                    showAnswer && isCorrect
                      ? "bg-emerald-500 text-white"
                      : showAnswer && isSelected && !isCorrect
                      ? "bg-rose-500 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {String.fromCharCode(65 + optIdx)}
                </span>
                <span className="font-semibold leading-relaxed">{optionText}</span>
              </div>

              {showAnswer && isCorrect && (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 animate-bounce" />
              )}
            </button>
          );
        })}
      </div>

      {/* Mascot Explanation Card on Answer */}
      {answeredState !== "unanswered" && (
        <div
          className={`p-3.5 rounded-2xl border flex items-start gap-2.5 animate-fadeIn ${
            answeredState === "correct"
              ? "bg-emerald-50/90 border-emerald-200 text-emerald-900"
              : "bg-amber-50/90 border-amber-200 text-amber-950"
          }`}
        >
          <div className="text-xl shrink-0 mt-0.5">
            {answeredState === "correct" ? "🦉" : "💡"}
          </div>
          <div className="text-xs leading-relaxed">
            <strong className="block font-black mb-0.5">
              {answeredState === "correct" ? "Muito bem!" : "Preste atenção na dica:"}
            </strong>
            <p>{currentQuestion.explanation}</p>
          </div>
        </div>
      )}

      {/* Next Question Button */}
      {answeredState !== "unanswered" && (
        <div className="pt-2">
          <button
            type="button"
            onClick={handleNext}
            className="btn-game w-full p-3.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-black text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95"
          >
            <span>
              {currentIndex + 1 < questionsList.length
                ? "Próxima Pergunta"
                : "Ver Resultado da Missão"}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Special button for Portuguese to also open Writer */}
      {subjectId === "portugues" && onOpenWriter && (
        <div className="pt-2 border-t border-slate-100 text-center">
          <button
            type="button"
            onClick={onOpenWriter}
            className="text-xs font-bold text-rose-600 hover:text-rose-800 flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Ou escrever uma história na Oficina do Jovem Autor ✍️</span>
          </button>
        </div>
      )}
    </div>
  );
}
