// ========================================================
// ACADEMIC QUESTIONS REPOSITORY & INTELLIGENT QUIZ ENGINE
// Official BNCC Curriculum Aligned for 2º Ano (Bianca) & 4º Ano (Cecília)
// Complete Chapter Expansion: Exactly 15 Questions per Chapter
// 50 Chapters × 15 Questions = 750 Academic Questions Total!
// Covers: Matemática, Português, Ciências, Inglês, Biologia & Ecologia, e Química & Paleontologia
// Anti-Repetition Tracking with Permanent Profile Persistence
// ========================================================

import { StudentYear } from "../rpgTypes";

export type AcademicSubject =
  | "matematica"
  | "ciencias"
  | "portugues"
  | "ingles"
  | "biologia"
  | "quimica";

export interface AcademicQuestion {
  id: string;
  subject: AcademicSubject;
  year: StudentYear; // 2 | 4
  chapter?: number;
  chapterTitle?: string;
  topic?: string;
  question: string;
  options: (string | number)[];
  correctIndex: number;
  explanation: string;
}

// --------------------------------------------------------
// VAST ACADEMIC QUESTION BANK (750 HIGH-QUALITY QUESTIONS)
// --------------------------------------------------------
export const ACADEMIC_QUESTIONS_BANK: AcademicQuestion[] = [
  {
    "id": "mat_2_c1_01",
    "subject": "matematica",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Números até 100 e Contagem de 2 em 2",
    "topic": "Sequência Numérica",
    "question": "Contando de 2 em 2 a partir do número 10, qual é o próximo número da sequência: 10, 12, 14, ...?",
    "options": [
      "15",
      "16",
      "17",
      "18"
    ],
    "correctIndex": 1,
    "explanation": "14 + 2 = 16! Na contagem de 2 em 2, pulamos sempre de dois em dois números!"
  },
  {
    "id": "mat_2_c1_02",
    "subject": "matematica",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Números até 100 e Contagem de 2 em 2",
    "topic": "Sucessor",
    "question": "Qual é o número que vem imediatamente DEPOIS do 49?",
    "options": [
      "48",
      "50",
      "51",
      "60"
    ],
    "correctIndex": 1,
    "explanation": "O sucessor imediato de 49 é o 50 (cinco dezenas completas)!"
  },
  {
    "id": "mat_2_c1_03",
    "subject": "matematica",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Números até 100 e Contagem de 2 em 2",
    "topic": "Antecessor",
    "question": "Qual é o número que vem imediatamente ANTES do 30?",
    "options": [
      "28",
      "29",
      "31",
      "39"
    ],
    "correctIndex": 1,
    "explanation": "O antecessor de 30 é o 29!"
  },
  {
    "id": "mat_2_c1_04",
    "subject": "matematica",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Números até 100 e Contagem de 2 em 2",
    "topic": "Dezenas e Unidades",
    "question": "O número 37 é formado por quantas dezenas e quantas unidades?",
    "options": [
      "3 dezenas e 7 unidades",
      "7 dezenas e 3 unidades",
      "30 dezenas e 7 unidades",
      "3 dezenas apenas"
    ],
    "correctIndex": 0,
    "explanation": "37 = 30 + 7, ou seja, 3 dezenas e 7 unidades!"
  },
  {
    "id": "mat_2_c1_05",
    "subject": "matematica",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Números até 100 e Contagem de 2 em 2",
    "topic": "Dezena Completa",
    "question": "Quantas unidades formam exatamente UMA DEZENA?",
    "options": [
      "5 unidades",
      "10 unidades",
      "12 unidades",
      "100 unidades"
    ],
    "correctIndex": 1,
    "explanation": "1 dezena é formada exatamente por 10 unidades!"
  },
  {
    "id": "mat_2_c1_06",
    "subject": "matematica",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Números até 100 e Contagem de 2 em 2",
    "topic": "Dúzia",
    "question": "Mamãe Renata comprou 1 dúzia de ovos na feira. Quantos ovos ela comprou?",
    "options": [
      "6 ovos",
      "10 ovos",
      "12 ovos",
      "24 ovos"
    ],
    "correctIndex": 2,
    "explanation": "1 dúzia é igual a 12 unidades! Meia dúzia seria 6!"
  },
  {
    "id": "mat_2_c1_07",
    "subject": "matematica",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Números até 100 e Contagem de 2 em 2",
    "topic": "Contagem de 5 em 5",
    "question": "Na sequência de 5 em 5: 5, 10, 15, 20... qual é o número que vem a seguir?",
    "options": [
      "22",
      "25",
      "30",
      "35"
    ],
    "correctIndex": 1,
    "explanation": "20 + 5 = 25! Avançando de 5 em 5 chegamos a 25!"
  },
  {
    "id": "mat_2_c1_08",
    "subject": "matematica",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Números até 100 e Contagem de 2 em 2",
    "topic": "Comparação de Quantidades",
    "question": "Qual destes números é o MAIOR de todos?",
    "options": [
      "64",
      "46",
      "81",
      "79"
    ],
    "correctIndex": 2,
    "explanation": "81 tem 8 dezenas, sendo maior que 79, 64 e 46!"
  },
  {
    "id": "mat_2_c1_09",
    "subject": "matematica",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Números até 100 e Contagem de 2 em 2",
    "topic": "Ordem Crescente",
    "question": "Colocando os números 15, 8 e 23 em ordem crescente (do menor para o maior), temos:",
    "options": [
      "8, 15, 23",
      "23, 15, 8",
      "15, 8, 23",
      "8, 23, 15"
    ],
    "correctIndex": 0,
    "explanation": "Ordem crescente começa no menor e sobe: 8, depois 15 e por fim 23!"
  },
  {
    "id": "mat_2_c1_10",
    "subject": "matematica",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Números até 100 e Contagem de 2 em 2",
    "topic": "Números Pares",
    "question": "Qual dos números abaixo é um número PAR?",
    "options": [
      "13",
      "17",
      "24",
      "31"
    ],
    "correctIndex": 2,
    "explanation": "Números terminados em 0, 2, 4, 6 e 8 são pares! 24 termina em 4!"
  },
  {
    "id": "mat_2_c1_11",
    "subject": "matematica",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Números até 100 e Contagem de 2 em 2",
    "topic": "Números Ímpares",
    "question": "Qual dos números abaixo é um número ÍMPAR?",
    "options": [
      "12",
      "18",
      "25",
      "40"
    ],
    "correctIndex": 2,
    "explanation": "Números terminados em 1, 3, 5, 7 e 9 são ímpares! 25 termina em 5!"
  },
  {
    "id": "mat_2_c1_12",
    "subject": "matematica",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Números até 100 e Contagem de 2 em 2",
    "topic": "Centena",
    "question": "10 dezenas juntas formam qual número especial?",
    "options": [
      "20",
      "50",
      "100 (uma centena)",
      "1.000"
    ],
    "correctIndex": 2,
    "explanation": "10 grupos de 10 formam 100, ou seja, uma centena!"
  },
  {
    "id": "mat_2_c1_13",
    "subject": "matematica",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Números até 100 e Contagem de 2 em 2",
    "topic": "Contagem de 10 em 10",
    "question": "Qual número completa a sequência: 10, 20, 30, 40, ___?",
    "options": [
      "45",
      "50",
      "60",
      "100"
    ],
    "correctIndex": 1,
    "explanation": "40 + 10 = 50! A sequência de dezenas segue com 50!"
  },
  {
    "id": "mat_2_c1_14",
    "subject": "matematica",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Números até 100 e Contagem de 2 em 2",
    "topic": "Valor Posicional",
    "question": "No número 62, o algarismo 6 vale quanto?",
    "options": [
      "6 unidades",
      "60 unidades",
      "600 unidades",
      "2 unidades"
    ],
    "correctIndex": 1,
    "explanation": "O 6 está na casa das dezenas, por isso seu valor posicional é 60!"
  },
  {
    "id": "mat_2_c1_15",
    "subject": "matematica",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Números até 100 e Contagem de 2 em 2",
    "topic": "Reta Numérica",
    "question": "Na reta numérica, qual número está exatamente no meio entre 20 e 22?",
    "options": [
      "19",
      "21",
      "23",
      "25"
    ],
    "correctIndex": 1,
    "explanation": "O número que fica entre 20 e 22 é o 21!"
  },
  {
    "id": "mat_2_c2_01",
    "subject": "matematica",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Adição Simples e Raciocínio com Conjuntos",
    "topic": "Adição Básica",
    "question": "Quanto é 15 + 15?",
    "options": [
      "25",
      "30",
      "35",
      "40"
    ],
    "correctIndex": 1,
    "explanation": "15 + 15 = 30! Duas dezenas e dez unidades somam 30!"
  },
  {
    "id": "mat_2_c2_02",
    "subject": "matematica",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Adição Simples e Raciocínio com Conjuntos",
    "topic": "Soma com Dezenas",
    "question": "Quanto é 20 + 30?",
    "options": [
      "40",
      "50",
      "60",
      "70"
    ],
    "correctIndex": 1,
    "explanation": "2 dezenas + 3 dezenas = 5 dezenas (50)!"
  },
  {
    "id": "mat_2_c2_03",
    "subject": "matematica",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Adição Simples e Raciocínio com Conjuntos",
    "topic": "Dobro",
    "question": "Bianca tem 8 figurinhas e Cecília tem o dobro. Quantas figurinhas Cecília tem?",
    "options": [
      "10",
      "14",
      "16",
      "18"
    ],
    "correctIndex": 2,
    "explanation": "O dobro de 8 é 8 + 8 = 16 figurinhas!"
  },
  {
    "id": "mat_2_c2_04",
    "subject": "matematica",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Adição Simples e Raciocínio com Conjuntos",
    "topic": "Problema do Cotidiano",
    "question": "Papai Carlos deu 12 moedas para Bianca e Mamãe Renata deu mais 8 moedas. Quantas moedas Bianca tem ao todo?",
    "options": [
      "18 moedas",
      "20 moedas",
      "22 moedas",
      "25 moedas"
    ],
    "correctIndex": 1,
    "explanation": "12 + 8 = 20 moedas no total!"
  },
  {
    "id": "mat_2_c2_05",
    "subject": "matematica",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Adição Simples e Raciocínio com Conjuntos",
    "topic": "Completar a Dezena",
    "question": "Se você já tem 7 maçãs, quantas faltam para completar 10 maçãs?",
    "options": [
      "2 maçãs",
      "3 maçãs",
      "4 maçãs",
      "5 maçãs"
    ],
    "correctIndex": 1,
    "explanation": "7 + 3 = 10! Faltam 3 maçãs para formar 10!"
  },
  {
    "id": "mat_2_c2_06",
    "subject": "matematica",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Adição Simples e Raciocínio com Conjuntos",
    "topic": "Cálculo Mental",
    "question": "Quanto é 9 + 6?",
    "options": [
      "13",
      "14",
      "15",
      "16"
    ],
    "correctIndex": 2,
    "explanation": "9 + 6 = 15! Uma estratégia rápida: 9 + 1 = 10, mais 5 = 15!"
  },
  {
    "id": "mat_2_c2_07",
    "subject": "matematica",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Adição Simples e Raciocínio com Conjuntos",
    "topic": "Soma de Três Parcelas",
    "question": "Quanto é 4 + 4 + 4?",
    "options": [
      "10",
      "12",
      "14",
      "16"
    ],
    "correctIndex": 1,
    "explanation": "4 + 4 = 8, e 8 + 4 = 12!"
  },
  {
    "id": "mat_2_c2_08",
    "subject": "matematica",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Adição Simples e Raciocínio com Conjuntos",
    "topic": "Propriedade Comutativa",
    "question": "Sabendo que 7 + 5 = 12, quanto é 5 + 7?",
    "options": [
      "10",
      "11",
      "12",
      "13"
    ],
    "correctIndex": 2,
    "explanation": "A ordem das parcelas não altera a soma: 7 + 5 = 5 + 7 = 12!"
  },
  {
    "id": "mat_2_c2_09",
    "subject": "matematica",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Adição Simples e Raciocínio com Conjuntos",
    "topic": "Soma com Unidades",
    "question": "Quanto é 32 + 5?",
    "options": [
      "35",
      "37",
      "38",
      "40"
    ],
    "correctIndex": 1,
    "explanation": "32 + 5 = 37 (somamos 2 + 5 = 7 nas unidades)!"
  },
  {
    "id": "mat_2_c2_10",
    "subject": "matematica",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Adição Simples e Raciocínio com Conjuntos",
    "topic": "Adição com Elemento Neutro",
    "question": "Quanto é 45 + 0?",
    "options": [
      "0",
      "45",
      "50",
      "450"
    ],
    "correctIndex": 1,
    "explanation": "Qualquer número somado com zero permanece igual a ele mesmo: 45 + 0 = 45!"
  },
  {
    "id": "mat_2_c2_11",
    "subject": "matematica",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Adição Simples e Raciocínio com Conjuntos",
    "topic": "Problema com Coleções",
    "question": "Em uma caixa há 14 lápis de cor azuis e 11 lápis de cor vermelhos. Quantos lápis há na caixa?",
    "options": [
      "23 lápis",
      "24 lápis",
      "25 lápis",
      "26 lápis"
    ],
    "correctIndex": 2,
    "explanation": "14 + 11 = 25 lápis no total!"
  },
  {
    "id": "mat_2_c2_12",
    "subject": "matematica",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Adição Simples e Raciocínio com Conjuntos",
    "topic": "Dinheiro R$",
    "question": "Se você tem uma nota de R$ 10 e ganha uma nota de R$ 5, com quanto fica?",
    "options": [
      "R$ 12",
      "R$ 15",
      "R$ 20",
      "R$ 50"
    ],
    "correctIndex": 1,
    "explanation": "10 + 5 = R$ 15!"
  },
  {
    "id": "mat_2_c2_13",
    "subject": "matematica",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Adição Simples e Raciocínio com Conjuntos",
    "topic": "Dobro com Dezenas",
    "question": "Qual é o dobro de 20?",
    "options": [
      "30",
      "40",
      "50",
      "60"
    ],
    "correctIndex": 1,
    "explanation": "20 + 20 = 40! O dobro de 20 é 40!"
  },
  {
    "id": "mat_2_c2_14",
    "subject": "matematica",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Adição Simples e Raciocínio com Conjuntos",
    "topic": "Cálculo com Conjuntos",
    "question": "Um galinheiro tem 6 pintinhos amarelos, 4 pretos e 3 brancos. Quantos pintinhos há ao todo?",
    "options": [
      "11 pintinhos",
      "12 pintinhos",
      "13 pintinhos",
      "14 pintinhos"
    ],
    "correctIndex": 2,
    "explanation": "6 + 4 = 10, e 10 + 3 = 13 pintinhos!"
  },
  {
    "id": "mat_2_c2_15",
    "subject": "matematica",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Adição Simples e Raciocínio com Conjuntos",
    "topic": "Soma até 50",
    "question": "Quanto é 25 + 25?",
    "options": [
      "40",
      "45",
      "50",
      "55"
    ],
    "correctIndex": 2,
    "explanation": "25 + 25 = 50!"
  },
  {
    "id": "mat_2_c3_01",
    "subject": "matematica",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Subtração Divertida e Contagem Regressiva",
    "topic": "Subtração Básica",
    "question": "Você tinha 20 Pokébolas e usou 6 para capturar monstrinhos. Com quantas ficou?",
    "options": [
      "12",
      "13",
      "14",
      "15"
    ],
    "correctIndex": 2,
    "explanation": "20 - 6 = 14! Sobraram 14 Pokébolas na sua mochila!"
  },
  {
    "id": "mat_2_c3_02",
    "subject": "matematica",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Subtração Divertida e Contagem Regressiva",
    "topic": "Subtração Simples",
    "question": "Quanto é 15 - 8?",
    "options": [
      "6",
      "7",
      "8",
      "9"
    ],
    "correctIndex": 1,
    "explanation": "15 - 8 = 7!"
  },
  {
    "id": "mat_2_c3_03",
    "subject": "matematica",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Subtração Divertida e Contagem Regressiva",
    "topic": "Subtração de Dezenas",
    "question": "Quanto é 50 - 20?",
    "options": [
      "20",
      "25",
      "30",
      "35"
    ],
    "correctIndex": 2,
    "explanation": "5 dezenas menos 2 dezenas = 3 dezenas (30)!"
  },
  {
    "id": "mat_2_c3_04",
    "subject": "matematica",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Subtração Divertida e Contagem Regressiva",
    "topic": "Metade",
    "question": "Cecília tinha 18 balas e deu a metade para Bianca. Quantas balas Bianca recebeu?",
    "options": [
      "8 balas",
      "9 balas",
      "10 balas",
      "11 balas"
    ],
    "correctIndex": 1,
    "explanation": "A metade de 18 é 9 (pois 9 + 9 = 18)!"
  },
  {
    "id": "mat_2_c3_05",
    "subject": "matematica",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Subtração Divertida e Contagem Regressiva",
    "topic": "Troco",
    "question": "Você comprou um suco que custa R$ 6 e pagou com uma nota de R$ 10. Quanto deve receber de troco?",
    "options": [
      "R$ 3",
      "R$ 4",
      "R$ 5",
      "R$ 6"
    ],
    "correctIndex": 1,
    "explanation": "10 - 6 = R$ 4 de troco!"
  },
  {
    "id": "mat_2_c3_06",
    "subject": "matematica",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Subtração Divertida e Contagem Regressiva",
    "topic": "Subtração por Comparação",
    "question": "Bianca tem 12 anos de brinquedos e sua prima tem 7. Quantos brinquedos Bianca tem a mais?",
    "options": [
      "4",
      "5",
      "6",
      "7"
    ],
    "correctIndex": 1,
    "explanation": "12 - 7 = 5 brinquedos a mais!"
  },
  {
    "id": "mat_2_c3_07",
    "subject": "matematica",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Subtração Divertida e Contagem Regressiva",
    "topic": "Contagem Regressiva",
    "question": "Na contagem regressiva: 10, 9, 8, 7, ___... qual é o próximo número?",
    "options": [
      "5",
      "6",
      "8",
      "9"
    ],
    "correctIndex": 1,
    "explanation": "Diminuindo 1 a cada passo, depois do 7 vem o 6!"
  },
  {
    "id": "mat_2_c3_08",
    "subject": "matematica",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Subtração Divertida e Contagem Regressiva",
    "topic": "Subtração de Si Mesmo",
    "question": "Quanto é 29 - 29?",
    "options": [
      "0",
      "1",
      "29",
      "58"
    ],
    "correctIndex": 0,
    "explanation": "Qualquer número subtraído por ele mesmo resulta em 0!"
  },
  {
    "id": "mat_2_c3_09",
    "subject": "matematica",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Subtração Divertida e Contagem Regressiva",
    "topic": "Problema com Livros",
    "question": "Um livro tem 30 páginas e Bianca já leu 12 páginas. Quantas páginas faltam para ela terminar?",
    "options": [
      "16 páginas",
      "18 páginas",
      "20 páginas",
      "22 páginas"
    ],
    "correctIndex": 1,
    "explanation": "30 - 12 = 18 páginas restantes!"
  },
  {
    "id": "mat_2_c3_10",
    "subject": "matematica",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Subtração Divertida e Contagem Regressiva",
    "topic": "Subtração com Zero",
    "question": "Quanto é 38 - 0?",
    "options": [
      "0",
      "38",
      "30",
      "8"
    ],
    "correctIndex": 1,
    "explanation": "Tirar zero não altera o valor: 38 - 0 = 38!"
  },
  {
    "id": "mat_2_c3_11",
    "subject": "matematica",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Subtração Divertida e Contagem Regressiva",
    "topic": "Subtração de Unidades",
    "question": "Quanto é 47 - 5?",
    "options": [
      "41",
      "42",
      "43",
      "44"
    ],
    "correctIndex": 1,
    "explanation": "47 - 5 = 42 (subtraímos 7 - 5 = 2 nas unidades)!"
  },
  {
    "id": "mat_2_c3_12",
    "subject": "matematica",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Subtração Divertida e Contagem Regressiva",
    "topic": "Metade de uma Dezena",
    "question": "Qual é a metade de 10?",
    "options": [
      "2",
      "4",
      "5",
      "6"
    ],
    "correctIndex": 2,
    "explanation": "A metade de 10 é 5 (pois 5 + 5 = 10)!"
  },
  {
    "id": "mat_2_c3_13",
    "subject": "matematica",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Subtração Divertida e Contagem Regressiva",
    "topic": "Problema com Pássaros",
    "question": "Havia 16 passarinhos na árvore e 7 voaram para o céu. Quantos passarinhos continuam na árvore?",
    "options": [
      "8",
      "9",
      "10",
      "11"
    ],
    "correctIndex": 1,
    "explanation": "16 - 7 = 9 passarinhos!"
  },
  {
    "id": "mat_2_c3_14",
    "subject": "matematica",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Subtração Divertida e Contagem Regressiva",
    "topic": "Subtração até 100",
    "question": "Quanto é 100 - 10?",
    "options": [
      "80",
      "85",
      "90",
      "95"
    ],
    "correctIndex": 2,
    "explanation": "10 dezenas menos 1 dezena = 9 dezenas (90)!"
  },
  {
    "id": "mat_2_c3_15",
    "subject": "matematica",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Subtração Divertida e Contagem Regressiva",
    "topic": "Prova Real Simples",
    "question": "Se 14 - 5 = 9, então 9 + 5 é igual a quanto?",
    "options": [
      "12",
      "13",
      "14",
      "15"
    ],
    "correctIndex": 2,
    "explanation": "A adição é a operação inversa da subtração: 9 + 5 = 14!"
  },
  {
    "id": "mat_2_c4_01",
    "subject": "matematica",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Figuras Geométricas Planas e Espaciais",
    "topic": "Lados do Triângulo",
    "question": "Quantos lados retos tem um TRIÂNGULO?",
    "options": [
      "2 lados",
      "3 lados",
      "4 lados",
      "5 lados"
    ],
    "correctIndex": 1,
    "explanation": "O triângulo possui exatamente 3 lados e 3 vértices!"
  },
  {
    "id": "mat_2_c4_02",
    "subject": "matematica",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Figuras Geométricas Planas e Espaciais",
    "topic": "Quadrado",
    "question": "Qual figura geométrica plana tem 4 lados exatamente do mesmo tamanho?",
    "options": [
      "Círculo",
      "Quadrado",
      "Triângulo",
      "Trapézio"
    ],
    "correctIndex": 1,
    "explanation": "O quadrado possui 4 lados de medidas exatamente iguais!"
  },
  {
    "id": "mat_2_c4_03",
    "subject": "matematica",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Figuras Geométricas Planas e Espaciais",
    "topic": "Círculo",
    "question": "Uma bola de futebol ou uma moeda lembra qual formato geométrico?",
    "options": [
      "Círculo / Esfera",
      "Quadrado",
      "Triângulo",
      "Pirâmide"
    ],
    "correctIndex": 0,
    "explanation": "A bola e a moeda têm contornos redondos: o círculo e a esfera!"
  },
  {
    "id": "mat_2_c4_04",
    "subject": "matematica",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Figuras Geométricas Planas e Espaciais",
    "topic": "Sólidos Geométricos: Cubo",
    "question": "Um dado de jogo de tabuleiro lembra qual sólido geométrico espacial?",
    "options": [
      "Cubo",
      "Esfera",
      "Cone",
      "Cilindro"
    ],
    "correctIndex": 0,
    "explanation": "O dado tem 6 faces quadradas idênticas, formando um cubo!"
  },
  {
    "id": "mat_2_c4_05",
    "subject": "matematica",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Figuras Geométricas Planas e Espaciais",
    "topic": "Sólidos: Cilindro",
    "question": "Uma latinha de suco ou refrigerante tem o formato de:",
    "options": [
      "Cilindro",
      "Pirâmide",
      "Cubo",
      "Triângulo"
    ],
    "correctIndex": 0,
    "explanation": "A latinha é arredondada com duas bases circulares: um cilindro!"
  },
  {
    "id": "mat_2_c4_06",
    "subject": "matematica",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Figuras Geométricas Planas e Espaciais",
    "topic": "Retângulo",
    "question": "A tela de um smartphone ou a porta de uma sala lembra qual figura geométrica?",
    "options": [
      "Retângulo",
      "Círculo",
      "Triângulo",
      "Pentágono"
    ],
    "correctIndex": 0,
    "explanation": "Portas e telas têm 4 lados com pares paralelos iguais: formato retangular!"
  },
  {
    "id": "mat_2_c4_07",
    "subject": "matematica",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Figuras Geométricas Planas e Espaciais",
    "topic": "Medida de Tempo: Dias da Semana",
    "question": "Quantos dias tem uma semana completa (de domingo a sábado)?",
    "options": [
      "5 dias",
      "6 dias",
      "7 dias",
      "10 dias"
    ],
    "correctIndex": 2,
    "explanation": "Uma semana completa tem 7 dias!"
  },
  {
    "id": "mat_2_c4_08",
    "subject": "matematica",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Figuras Geométricas Planas e Espaciais",
    "topic": "Primeiro Dia da Semana",
    "question": "Qual é o PRIMEIRO dia da semana no calendário?",
    "options": [
      "Segunda-feira",
      "Sábado",
      "Domingo",
      "Quarta-feira"
    ],
    "correctIndex": 2,
    "explanation": "O primeiro dia da semana é o Domingo; a Segunda-feira é o segundo!"
  },
  {
    "id": "mat_2_c4_09",
    "subject": "matematica",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Figuras Geométricas Planas e Espaciais",
    "topic": "Meses do Ano",
    "question": "Quantos meses tem um ano inteiro (de janeiro a dezembro)?",
    "options": [
      "10 meses",
      "12 meses",
      "15 meses",
      "24 meses"
    ],
    "correctIndex": 1,
    "explanation": "Um ano possui 12 meses!"
  },
  {
    "id": "mat_2_c4_10",
    "subject": "matematica",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Figuras Geométricas Planas e Espaciais",
    "topic": "Medida de Massa: Peso",
    "question": "Qual instrumento usamos na padaria ou no consultório médico para medir a nossa massa (peso)?",
    "options": [
      "Régua escolar",
      "Balança",
      "Termômetro",
      "Relógio"
    ],
    "correctIndex": 1,
    "explanation": "A balança é o instrumento que mede a massa em quilogramas (kg) ou gramas (g)!"
  },
  {
    "id": "mat_2_c4_11",
    "subject": "matematica",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Figuras Geométricas Planas e Espaciais",
    "topic": "Medida de Capacidade: Líquidos",
    "question": "Para medir a quantidade de leite ou água de uma garrafa, usamos qual unidade de medida?",
    "options": [
      "Litro (L)",
      "Metro (m)",
      "Quilograma (kg)",
      "Hora (h)"
    ],
    "correctIndex": 0,
    "explanation": "Líquidos são medidos em litros (L) e mililitros (ml)!"
  },
  {
    "id": "mat_2_c4_12",
    "subject": "matematica",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Figuras Geométricas Planas e Espaciais",
    "topic": "Medida de Comprimento",
    "question": "Qual objeto escolar usamos no caderno para traçar retas e medir centímetros com precisão?",
    "options": [
      "Régua",
      "Borracha",
      "Apontador",
      "Cola"
    ],
    "correctIndex": 0,
    "explanation": "A régua possui marcações em centímetros (cm) e milímetros (mm)!"
  },
  {
    "id": "mat_2_c4_13",
    "subject": "matematica",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Figuras Geométricas Planas e Espaciais",
    "topic": "Relógio de Ponteiros",
    "question": "Em um relógio de ponteiros, o ponteiro MENOR marca o quê?",
    "options": [
      "Os minutos",
      "As horas",
      "Os segundos",
      "Os dias"
    ],
    "correctIndex": 1,
    "explanation": "O ponteiro pequeno marca as horas e o ponteiro grande marca os minutos!"
  },
  {
    "id": "mat_2_c4_14",
    "subject": "matematica",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Figuras Geométricas Planas e Espaciais",
    "topic": "Horas do Dia",
    "question": "Quantas horas tem um dia completo (manhã, tarde e noite)?",
    "options": [
      "12 horas",
      "24 horas",
      "30 horas",
      "60 horas"
    ],
    "correctIndex": 1,
    "explanation": "Um dia completo tem 24 horas!"
  },
  {
    "id": "mat_2_c4_15",
    "subject": "matematica",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Figuras Geométricas Planas e Espaciais",
    "topic": "Figuras que Rolam",
    "question": "Qual destes objetos rola com facilidade pelo chão quando empurrado?",
    "options": [
      "Uma caixa de sapatos",
      "Uma bola de gude redonda",
      "Um livro fechado",
      "Uma borracha quadrada"
    ],
    "correctIndex": 1,
    "explanation": "A esfera (bola de gude) possui superfície curva e rola livremente!"
  },
  {
    "id": "mat_4_c1_01",
    "subject": "matematica",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Sistema de Numeração Decimal até 10.000",
    "topic": "Ordens e Classes",
    "question": "No número 4.872, qual algarismo ocupa a ordem das CENTENAS simples?",
    "options": [
      "2",
      "7",
      "8",
      "4"
    ],
    "correctIndex": 2,
    "explanation": "2 é unidade, 7 é dezena, 8 é centena (vale 800) e 4 é unidade de milhar!"
  },
  {
    "id": "mat_4_c1_02",
    "subject": "matematica",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Sistema de Numeração Decimal até 10.000",
    "topic": "Valor Relativo / Posicional",
    "question": "No número 7.530, quanto vale o algarismo 7?",
    "options": [
      "70",
      "700",
      "7.000",
      "70.000"
    ],
    "correctIndex": 2,
    "explanation": "O 7 está na 4ª ordem (unidades de milhar), portanto vale 7.000!"
  },
  {
    "id": "mat_4_c1_03",
    "subject": "matematica",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Sistema de Numeração Decimal até 10.000",
    "topic": "Decomposição Numérica",
    "question": "A decomposição 5.000 + 300 + 40 + 9 representa qual número?",
    "options": [
      "5.349",
      "5.439",
      "5.394",
      "53.049"
    ],
    "correctIndex": 0,
    "explanation": "5.000 + 300 + 40 + 9 = 5.349!"
  },
  {
    "id": "mat_4_c1_04",
    "subject": "matematica",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Sistema de Numeração Decimal até 10.000",
    "topic": "Unidade de Milhar",
    "question": "Quantas centenas completas são necessárias para formar 1 UNIDADE DE MILHAR (1.000)?",
    "options": [
      "10 centenas",
      "100 centenas",
      "50 centenas",
      "5 centenas"
    ],
    "correctIndex": 0,
    "explanation": "10 centenas × 100 = 1.000 unidades de milhar!"
  },
  {
    "id": "mat_4_c1_05",
    "subject": "matematica",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Sistema de Numeração Decimal até 10.000",
    "topic": "Sucessor e Antecessor de 4 Dígitos",
    "question": "Qual é o sucessor imediato de 3.999?",
    "options": [
      "3.998",
      "4.000",
      "4.001",
      "4.010"
    ],
    "correctIndex": 1,
    "explanation": "3.999 + 1 = 4.000!"
  },
  {
    "id": "mat_4_c1_06",
    "subject": "matematica",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Sistema de Numeração Decimal até 10.000",
    "topic": "Escrita por Extenso",
    "question": "Como se escreve corretamente o número 2.508 por extenso?",
    "options": [
      "Dois mil e cinquenta e oito",
      "Dois mil, quinhentos e oito",
      "Vinte e cinco mil e oito",
      "Dois mil, quinhentos e oitenta"
    ],
    "correctIndex": 1,
    "explanation": "2.000 (dois mil) + 500 (quinhentos) + 8 (e oito) = Dois mil, quinhentos e oito!"
  },
  {
    "id": "mat_4_c1_07",
    "subject": "matematica",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Sistema de Numeração Decimal até 10.000",
    "topic": "Comparação de Grandes Números",
    "question": "Qual dos seguintes números é MAIOR que 6.450 e MENOR que 6.500?",
    "options": [
      "6.420",
      "6.485",
      "6.520",
      "6.400"
    ],
    "correctIndex": 1,
    "explanation": "6.485 está no intervalo entre 6.450 e 6.500!"
  },
  {
    "id": "mat_4_c1_08",
    "subject": "matematica",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Sistema de Numeração Decimal até 10.000",
    "topic": "Arredondamento para a Centena Mais Próxima",
    "question": "Arredondando o número 1.382 para a centena mais próxima, obtemos:",
    "options": [
      "1.300",
      "1.380",
      "1.400",
      "1.500"
    ],
    "correctIndex": 2,
    "explanation": "Como a dezena é 8 (maior ou igual a 5), arredonda-se para cima: 1.400!"
  },
  {
    "id": "mat_4_c1_09",
    "subject": "matematica",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Sistema de Numeração Decimal até 10.000",
    "topic": "Composição com Fichas",
    "question": "Se você tem 8 fichas de 1.000, 4 fichas de 100 e 5 fichas de 1, qual número formou?",
    "options": [
      "8.450",
      "8.405",
      "8.045",
      "8.455"
    ],
    "correctIndex": 1,
    "explanation": "8.000 + 400 + 0 + 5 = 8.405!"
  },
  {
    "id": "mat_4_c1_10",
    "subject": "matematica",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Sistema de Numeração Decimal até 10.000",
    "topic": "Sequência de 100 em 100",
    "question": "Qual número completa a sequência: 1.700, 1.800, 1.900, _____?",
    "options": [
      "1.910",
      "1.990",
      "2.000",
      "2.100"
    ],
    "correctIndex": 2,
    "explanation": "1.900 + 100 = 2.000!"
  },
  {
    "id": "mat_4_c1_11",
    "subject": "matematica",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Sistema de Numeração Decimal até 10.000",
    "topic": "Diferença entre Ordens",
    "question": "Quantas ordens possui o número 9.421?",
    "options": [
      "2 ordens",
      "3 ordens",
      "4 ordens (unidade, dezena, centena e milhar)",
      "5 ordens"
    ],
    "correctIndex": 2,
    "explanation": "Cada algarismo representa uma ordem; logo, 9.421 possui 4 ordens e pertence à 2ª classe!"
  },
  {
    "id": "mat_4_c1_12",
    "subject": "matematica",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Sistema de Numeração Decimal até 10.000",
    "topic": "Números Pares de 4 Dígitos",
    "question": "Qual destes números de 4 algarismos é PAR?",
    "options": [
      "4.531",
      "7.893",
      "9.006",
      "3.215"
    ],
    "correctIndex": 2,
    "explanation": "O número 9.006 termina em 6, portanto é par!"
  },
  {
    "id": "mat_4_c1_13",
    "subject": "matematica",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Sistema de Numeração Decimal até 10.000",
    "topic": "Ábaco",
    "question": "No ábaco, cada continha na haste da Unidade de Milhar (UM) vale quanto?",
    "options": [
      "10",
      "100",
      "1.000",
      "10.000"
    ],
    "correctIndex": 2,
    "explanation": "A haste UM representa unidades de milhar, valendo 1.000 cada continha!"
  },
  {
    "id": "mat_4_c1_14",
    "subject": "matematica",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Sistema de Numeração Decimal até 10.000",
    "topic": "Menor Número de 4 Algarismos Distintos",
    "question": "Usando os algarismos 1, 0, 4 e 7 sem repetir, qual é o MENOR número que podemos formar?",
    "options": [
      "0.147",
      "1.047",
      "1.407",
      "1.074"
    ],
    "correctIndex": 1,
    "explanation": "Não podemos começar com zero para 4 dígitos; o menor início é 1, seguido de 0, 4 e 7: 1.047!"
  },
  {
    "id": "mat_4_c1_15",
    "subject": "matematica",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Sistema de Numeração Decimal até 10.000",
    "topic": "Maior Número de 4 Algarismos",
    "question": "Qual é o MAIOR número que podemos escrever com 4 algarismos?",
    "options": [
      "9.000",
      "9.900",
      "9.990",
      "9.999"
    ],
    "correctIndex": 3,
    "explanation": "O maior número de 4 ordens é o 9.999 (o próximo já é 10.000, com 5 ordens)!"
  },
  {
    "id": "mat_4_c2_01",
    "subject": "matematica",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Adição e Subtração com Reagrupamento",
    "topic": "Adição com Reserva",
    "question": "Quanto é 1.250 + 1.750?",
    "options": [
      "2.900",
      "3.000",
      "3.100",
      "3.200"
    ],
    "correctIndex": 1,
    "explanation": "1.250 + 1.750 = 3.000! 250 + 750 forma exatamente 1.000!"
  },
  {
    "id": "mat_4_c2_02",
    "subject": "matematica",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Adição e Subtração com Reagrupamento",
    "topic": "Subtração com Reagrupamento",
    "question": "Quanto é 1.000 - 345?",
    "options": [
      "645",
      "655",
      "755",
      "765"
    ],
    "correctIndex": 1,
    "explanation": "1.000 - 345 = 655 (reagrupando as dezenas e centenas)!"
  },
  {
    "id": "mat_4_c2_03",
    "subject": "matematica",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Adição e Subtração com Reagrupamento",
    "topic": "Problema com Distâncias",
    "question": "Uma viagem de Kanto a Johto tem 2.400 km. O trem já percorreu 1.850 km. Quantos quilômetros faltam?",
    "options": [
      "450 km",
      "550 km",
      "650 km",
      "750 km"
    ],
    "correctIndex": 1,
    "explanation": "2.400 - 1.850 = 550 km restantes!"
  },
  {
    "id": "mat_4_c2_04",
    "subject": "matematica",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Adição e Subtração com Reagrupamento",
    "topic": "Cálculo Mental com Milhar",
    "question": "Quanto é 4.500 + 2.500?",
    "options": [
      "6.000",
      "6.500",
      "7.000",
      "7.500"
    ],
    "correctIndex": 2,
    "explanation": "4.500 + 2.500 = 7.000!"
  },
  {
    "id": "mat_4_c2_05",
    "subject": "matematica",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Adição e Subtração com Reagrupamento",
    "topic": "Problema de Estoque da Vila",
    "question": "A biblioteca tinha 3.240 livros. Chegaram duas caixas com 480 livros e 320 livros. Quantos livros há agora?",
    "options": [
      "3.940 livros",
      "4.040 livros",
      "4.140 livros",
      "4.240 livros"
    ],
    "correctIndex": 1,
    "explanation": "480 + 320 = 800 novos livros; 3.240 + 800 = 4.040 livros ao todo!"
  },
  {
    "id": "mat_4_c2_06",
    "subject": "matematica",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Adição e Subtração com Reagrupamento",
    "topic": "Subtração com Reagrupamento Duplo",
    "question": "Quanto é 5.004 - 1.250?",
    "options": [
      "3.754",
      "3.854",
      "3.654",
      "3.744"
    ],
    "correctIndex": 0,
    "explanation": "5.004 - 1.250 = 3.754!"
  },
  {
    "id": "mat_4_c2_07",
    "subject": "matematica",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Adição e Subtração com Reagrupamento",
    "topic": "Estimativa de Adição",
    "question": "Qual é a melhor estimativa aproximada para a soma de 2.980 + 4.020?",
    "options": [
      "6.000",
      "7.000",
      "8.000",
      "9.000"
    ],
    "correctIndex": 1,
    "explanation": "2.980 é aproximadamente 3.000, e 4.020 é aproximadamente 4.000; 3.000 + 4.000 = 7.000!"
  },
  {
    "id": "mat_4_c2_08",
    "subject": "matematica",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Adição e Subtração com Reagrupamento",
    "topic": "Termos da Adição",
    "question": "Em uma conta de adição, como são chamados os números que estamos somando?",
    "options": [
      "Parcelas",
      "Minuendo e subtraendo",
      "Fatores",
      "Divisores"
    ],
    "correctIndex": 0,
    "explanation": "Na adição, os números que se somam são as parcelas e o resultado é a soma ou total!"
  },
  {
    "id": "mat_4_c2_09",
    "subject": "matematica",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Adição e Subtração com Reagrupamento",
    "topic": "Termos da Subtração",
    "question": "Na operação 850 - 300 = 550, o número 850 é chamado de:",
    "options": [
      "Minuendo",
      "Subtraendo",
      "Resto ou diferença",
      "Parcela"
    ],
    "correctIndex": 0,
    "explanation": "O número de onde tiramos algo é o minuendo; o que tiramos é o subtraendo!"
  },
  {
    "id": "mat_4_c2_10",
    "subject": "matematica",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Adição e Subtração com Reagrupamento",
    "topic": "Prova Real",
    "question": "Para verificar se a subtração 1.500 - 850 = 650 está certa (prova real), qual conta fazemos?",
    "options": [
      "650 + 850",
      "1.500 + 650",
      "850 - 650",
      "1.500 × 2"
    ],
    "correctIndex": 0,
    "explanation": "Somamos a diferença com o subtraendo: 650 + 850 = 1.500!"
  },
  {
    "id": "mat_4_c2_11",
    "subject": "matematica",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Adição e Subtração com Reagrupamento",
    "topic": "Problema com População",
    "question": "A cidade de Celadon tem 8.500 habitantes e Cerulean tem 6.200. Quantos habitantes Celadon tem a mais?",
    "options": [
      "2.100",
      "2.200",
      "2.300",
      "2.400"
    ],
    "correctIndex": 2,
    "explanation": "8.500 - 6.200 = 2.300 habitantes a mais!"
  },
  {
    "id": "mat_4_c2_12",
    "subject": "matematica",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Adição e Subtração com Reagrupamento",
    "topic": "Soma de 3 Números",
    "question": "Quanto é 350 + 450 + 200?",
    "options": [
      "900",
      "1.000",
      "1.100",
      "1.200"
    ],
    "correctIndex": 1,
    "explanation": "350 + 450 = 800, e 800 + 200 = 1.000!"
  },
  {
    "id": "mat_4_c2_13",
    "subject": "matematica",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Adição e Subtração com Reagrupamento",
    "topic": "Cálculo com Dinheiro",
    "question": "Cecília tinha R$ 150, ganhou R$ 85 de aniversário e gastou R$ 40 em um livro. Com quanto ficou?",
    "options": [
      "R$ 185",
      "R$ 195",
      "R$ 205",
      "R$ 215"
    ],
    "correctIndex": 1,
    "explanation": "150 + 85 = 235; 235 - 40 = R$ 195!"
  },
  {
    "id": "mat_4_c2_14",
    "subject": "matematica",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Adição e Subtração com Reagrupamento",
    "topic": "Subtração com Milhares Cheios",
    "question": "Quanto é 8.000 - 2.500?",
    "options": [
      "5.000",
      "5.500",
      "6.000",
      "6.500"
    ],
    "correctIndex": 1,
    "explanation": "8.000 - 2.500 = 5.500!"
  },
  {
    "id": "mat_4_c2_15",
    "subject": "matematica",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Adição e Subtração com Reagrupamento",
    "topic": "Valor Desconhecido",
    "question": "Qual número somado com 620 resulta em 1.000?",
    "options": [
      "360",
      "380",
      "400",
      "420"
    ],
    "correctIndex": 1,
    "explanation": "1.000 - 620 = 380!"
  },
  {
    "id": "mat_4_c3_01",
    "subject": "matematica",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Multiplicação com 2 Algarismos e Divisão",
    "topic": "Multiplicação por 10 e 100",
    "question": "Quanto é 48 × 100?",
    "options": [
      "480",
      "4.800",
      "48.000",
      "480.000"
    ],
    "correctIndex": 1,
    "explanation": "Multiplicar por 100 acrescenta dois zeros à direita: 48 × 100 = 4.800!"
  },
  {
    "id": "mat_4_c3_02",
    "subject": "matematica",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Multiplicação com 2 Algarismos e Divisão",
    "topic": "Divisão Exata",
    "question": "Dividindo 144 cartas de Pokémon igualmente entre 12 amigas, quantas cartas cada uma receberá?",
    "options": [
      "10",
      "11",
      "12",
      "14"
    ],
    "correctIndex": 2,
    "explanation": "144 ÷ 12 = 12 (pois 12 × 12 = 144)!"
  },
  {
    "id": "mat_4_c3_03",
    "subject": "matematica",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Multiplicação com 2 Algarismos e Divisão",
    "topic": "Divisão com Resto",
    "question": "Ao dividir 25 moedas igualmente entre 4 crianças, qual é o RESTO que sobra?",
    "options": [
      "Sobram 0 moedas",
      "Sobra 1 moeda",
      "Sobram 2 moedas",
      "Sobram 3 moedas"
    ],
    "correctIndex": 1,
    "explanation": "25 ÷ 4 = 6 com resto 1 (pois 4 × 6 = 24, e 25 - 24 = 1)!"
  },
  {
    "id": "mat_4_c3_04",
    "subject": "matematica",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Multiplicação com 2 Algarismos e Divisão",
    "topic": "Multiplicação com 2 Dígitos",
    "question": "Quanto é 25 × 14?",
    "options": [
      "300",
      "325",
      "350",
      "375"
    ],
    "correctIndex": 2,
    "explanation": "25 × 14 = (25 × 10) + (25 × 4) = 250 + 100 = 350!"
  },
  {
    "id": "mat_4_c3_05",
    "subject": "matematica",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Multiplicação com 2 Algarismos e Divisão",
    "topic": "Tabuada do 7 e 8",
    "question": "Quanto é 7 × 8?",
    "options": [
      "54",
      "56",
      "58",
      "64"
    ],
    "correctIndex": 1,
    "explanation": "7 × 8 = 56!"
  },
  {
    "id": "mat_4_c3_06",
    "subject": "matematica",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Multiplicação com 2 Algarismos e Divisão",
    "topic": "Tabuada do 9",
    "question": "Quanto é 9 × 9?",
    "options": [
      "72",
      "81",
      "89",
      "90"
    ],
    "correctIndex": 1,
    "explanation": "9 × 9 = 81!"
  },
  {
    "id": "mat_4_c3_07",
    "subject": "matematica",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Multiplicação com 2 Algarismos e Divisão",
    "topic": "Multiplicação por 0",
    "question": "Quanto é 854 × 0?",
    "options": [
      "0",
      "1",
      "854",
      "8.540"
    ],
    "correctIndex": 0,
    "explanation": "Qualquer número multiplicado por zero é sempre zero!"
  },
  {
    "id": "mat_4_c3_08",
    "subject": "matematica",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Multiplicação com 2 Algarismos e Divisão",
    "topic": "Termos da Multiplicação",
    "question": "Na multiplicação 15 × 4 = 60, o número 60 é chamado de:",
    "options": [
      "Produto",
      "Fator",
      "Quociente",
      "Resto"
    ],
    "correctIndex": 0,
    "explanation": "Os números multiplicados são fatores e o resultado final é o produto!"
  },
  {
    "id": "mat_4_c3_09",
    "subject": "matematica",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Multiplicação com 2 Algarismos e Divisão",
    "topic": "Termos da Divisão",
    "question": "Na operação 50 ÷ 5 = 10, o resultado '10' é chamado de:",
    "options": [
      "Quociente",
      "Dividendo",
      "Divisor",
      "Resto"
    ],
    "correctIndex": 0,
    "explanation": "Na divisão: Dividendo ÷ Divisor = Quociente!"
  },
  {
    "id": "mat_4_c3_10",
    "subject": "matematica",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Multiplicação com 2 Algarismos e Divisão",
    "topic": "Problema com Embalagens",
    "question": "Uma fábrica embala chocolates em caixas de 6 unidades. Quantas caixas completas serão feitas com 75 chocolates?",
    "options": [
      "11 caixas",
      "12 caixas (sobrando 3 chocolates)",
      "13 caixas",
      "14 caixas"
    ],
    "correctIndex": 1,
    "explanation": "75 ÷ 6 = 12 caixas completas com resto 3 (12 × 6 = 72, 75 - 72 = 3)!"
  },
  {
    "id": "mat_4_c3_11",
    "subject": "matematica",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Multiplicação com 2 Algarismos e Divisão",
    "topic": "Divisão por 10",
    "question": "Quanto é 3.200 ÷ 10?",
    "options": [
      "32",
      "320",
      "3.020",
      "32.000"
    ],
    "correctIndex": 1,
    "explanation": "Dividir por 10 retira um zero do final: 3.200 ÷ 10 = 320!"
  },
  {
    "id": "mat_4_c3_12",
    "subject": "matematica",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Multiplicação com 2 Algarismos e Divisão",
    "topic": "Dobro e Triplo",
    "question": "Qual é o TRIPLO de 45?",
    "options": [
      "90",
      "125",
      "135",
      "145"
    ],
    "correctIndex": 2,
    "explanation": "Triplo é multiplicar por 3: 45 × 3 = 135!"
  },
  {
    "id": "mat_4_c3_13",
    "subject": "matematica",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Multiplicação com 2 Algarismos e Divisão",
    "topic": "Problema de Disposição Retangular",
    "question": "Um auditório da escola tem 15 fileiras com 12 cadeiras em cada uma. Quantas cadeiras há no auditório?",
    "options": [
      "160 cadeiras",
      "170 cadeiras",
      "180 cadeiras",
      "190 cadeiras"
    ],
    "correctIndex": 2,
    "explanation": "15 × 12 = 180 cadeiras!"
  },
  {
    "id": "mat_4_c3_14",
    "subject": "matematica",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Multiplicação com 2 Algarismos e Divisão",
    "topic": "Metade de Centena",
    "question": "Quanto é a metade de 500?",
    "options": [
      "200",
      "225",
      "250",
      "300"
    ],
    "correctIndex": 2,
    "explanation": "500 ÷ 2 = 250!"
  },
  {
    "id": "mat_4_c3_15",
    "subject": "matematica",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Multiplicação com 2 Algarismos e Divisão",
    "topic": "Prova Real da Divisão",
    "question": "Se 80 ÷ 4 = 20, como comprovamos a operação?",
    "options": [
      "20 × 4 = 80",
      "80 + 20 = 100",
      "80 - 4 = 76",
      "20 ÷ 4 = 5"
    ],
    "correctIndex": 0,
    "explanation": "Multiplicando o quociente pelo divisor: 20 × 4 = 80!"
  },
  {
    "id": "mat_4_c4_01",
    "subject": "matematica",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Introdução às Frações e Números Decimais",
    "topic": "Fração Básica",
    "question": "Uma pizza foi dividida em 8 fatias iguais e Cecília comeu 3 fatias. Qual fração representa o que ela comeu?",
    "options": [
      "3/8",
      "8/3",
      "3/5",
      "5/8"
    ],
    "correctIndex": 0,
    "explanation": "O numerador é a parte comida (3) e o denominador é o total de fatias (8): fração 3/8!"
  },
  {
    "id": "mat_4_c4_02",
    "subject": "matematica",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Introdução às Frações e Números Decimais",
    "topic": "Frações Equivalentes",
    "question": "Qual fração abaixo é EQUIVALENTE a 1/2 (metade)?",
    "options": [
      "2/4",
      "1/3",
      "2/5",
      "3/8"
    ],
    "correctIndex": 0,
    "explanation": "2/4 é equivalente a 1/2 (dividindo numerador e denominador por 2 chegamos a 1/2)!"
  },
  {
    "id": "mat_4_c4_03",
    "subject": "matematica",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Introdução às Frações e Números Decimais",
    "topic": "Fração de uma Quantidade",
    "question": "Quanto é 1/4 (um quarto) de 20 Pokébolas?",
    "options": [
      "4",
      "5",
      "6",
      "10"
    ],
    "correctIndex": 1,
    "explanation": "20 ÷ 4 = 5 Pokébolas!"
  },
  {
    "id": "mat_4_c4_04",
    "subject": "matematica",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Introdução às Frações e Números Decimais",
    "topic": "Numerador e Denominador",
    "question": "Na fração 5/6, o número 6 representa o quê?",
    "options": [
      "O denominador (o número total de partes em que o inteiro foi dividido)",
      "O numerador (as partes que foram tomadas)",
      "O resto da divisão",
      "O número de fatias que sobraram"
    ],
    "correctIndex": 0,
    "explanation": "O número de baixo é o DENOMINADOR, indicando o total de partes iguais da unidade!"
  },
  {
    "id": "mat_4_c4_05",
    "subject": "matematica",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Introdução às Frações e Números Decimais",
    "topic": "Número Decimal: Décimos",
    "question": "A fração 1/10 (um décimo) escrita na forma de número decimal é:",
    "options": [
      "0,01",
      "0,1",
      "1,0",
      "0,001"
    ],
    "correctIndex": 1,
    "explanation": "1 dividido por 10 é igual a 0,1 (um décimo)!"
  },
  {
    "id": "mat_4_c4_06",
    "subject": "matematica",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Introdução às Frações e Números Decimais",
    "topic": "Número Decimal: Centésimos",
    "question": "A fração 25/100 (vinte e cinco centésimos) corresponde a qual número decimal?",
    "options": [
      "2,5",
      "0,25",
      "0,025",
      "25,0"
    ],
    "correctIndex": 1,
    "explanation": "25/100 = 0,25 (duas casas decimais)!"
  },
  {
    "id": "mat_4_c4_07",
    "subject": "matematica",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Introdução às Frações e Números Decimais",
    "topic": "Comparação de Decimais",
    "question": "Qual destes números decimais é o MAIOR?",
    "options": [
      "0,5",
      "0,35",
      "0,09",
      "0,48"
    ],
    "correctIndex": 0,
    "explanation": "0,5 = 0,50, que é maior que 0,48, 0,35 e 0,09!"
  },
  {
    "id": "mat_4_c4_08",
    "subject": "matematica",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Introdução às Frações e Números Decimais",
    "topic": "Fração que Representa o Inteiro",
    "question": "Qual das frações abaixo representa UM INTEIRO COMPLETO (igual a 1)?",
    "options": [
      "4/4",
      "3/4",
      "1/4",
      "5/4"
    ],
    "correctIndex": 0,
    "explanation": "Quando o numerador é igual ao denominador (4/4), a fração representa o inteiro!"
  },
  {
    "id": "mat_4_c4_09",
    "subject": "matematica",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Introdução às Frações e Números Decimais",
    "topic": "Adição de Frações de Mesmo Denominador",
    "question": "Quanto é 2/7 + 3/7?",
    "options": [
      "5/14",
      "5/7",
      "6/7",
      "1/7"
    ],
    "correctIndex": 1,
    "explanation": "Mantemos o denominador igual (7) e somamos os numeradores (2 + 3 = 5): 5/7!"
  },
  {
    "id": "mat_4_c4_10",
    "subject": "matematica",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Introdução às Frações e Números Decimais",
    "topic": "Subtração de Frações",
    "question": "Quanto é 7/10 - 4/10?",
    "options": [
      "3/10",
      "3/0",
      "3/20",
      "11/10"
    ],
    "correctIndex": 0,
    "explanation": "7 - 4 = 3, mantendo o denominador 10: 3/10!"
  },
  {
    "id": "mat_4_c4_11",
    "subject": "matematica",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Introdução às Frações e Números Decimais",
    "topic": "Soma de Decimais com Dinheiro",
    "question": "Quanto é R$ 2,50 + R$ 1,75?",
    "options": [
      "R$ 3,75",
      "R$ 4,15",
      "R$ 4,25",
      "R$ 4,50"
    ],
    "correctIndex": 2,
    "explanation": "2,50 + 1,75 = R$ 4,25!"
  },
  {
    "id": "mat_4_c4_12",
    "subject": "matematica",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Introdução às Frações e Números Decimais",
    "topic": "Comparação de Frações com Mesmo Denominador",
    "question": "Qual fração é maior: 5/9 ou 2/9?",
    "options": [
      "5/9",
      "2/9",
      "São iguais",
      "Não dá para saber"
    ],
    "correctIndex": 0,
    "explanation": "Com o mesmo denominador, a fração com maior numerador é a maior: 5/9 > 2/9!"
  },
  {
    "id": "mat_4_c4_13",
    "subject": "matematica",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Introdução às Frações e Números Decimais",
    "topic": "Fração de Horas",
    "question": "Quanto tempo dura 1/2 hora (meia hora) em minutos?",
    "options": [
      "15 minutos",
      "20 minutos",
      "30 minutos",
      "45 minutos"
    ],
    "correctIndex": 2,
    "explanation": "1 hora tem 60 minutos; metade de 60 é 30 minutos!"
  },
  {
    "id": "mat_4_c4_14",
    "subject": "matematica",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Introdução às Frações e Números Decimais",
    "topic": "Fração de Três Quartos",
    "question": "Quanto é 3/4 de hora em minutos?",
    "options": [
      "30 minutos",
      "40 minutos",
      "45 minutos",
      "50 minutos"
    ],
    "correctIndex": 2,
    "explanation": "60 ÷ 4 = 15; 15 × 3 = 45 minutos!"
  },
  {
    "id": "mat_4_c4_15",
    "subject": "matematica",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Introdução às Frações e Números Decimais",
    "topic": "Decimal na Régua",
    "question": "Na régua, a marcação exatamente na metade entre 3 cm e 4 cm representa:",
    "options": [
      "3,2 cm",
      "3,5 cm",
      "3,8 cm",
      "4,5 cm"
    ],
    "correctIndex": 1,
    "explanation": "A metade entre 3 e 4 é 3,5 cm (3 centímetros e 5 milímetros)!"
  },
  {
    "id": "mat_4_c5_01",
    "subject": "matematica",
    "year": 4,
    "chapter": 5,
    "chapterTitle": "Geometria, Polígonos e Perímetro",
    "topic": "Definição de Perímetro",
    "question": "O que é o PERÍMETRO de uma figura geométrica plana?",
    "options": [
      "A soma das medidas de todos os seus lados (o contorno)",
      "O espaço interno preenchido pela figura (sua área)",
      "O número de cores que ela tem",
      "O peso da figura no papel"
    ],
    "correctIndex": 0,
    "explanation": "Perímetro é o comprimento da linha de contorno, obtido somando todos os lados!"
  },
  {
    "id": "mat_4_c5_02",
    "subject": "matematica",
    "year": 4,
    "chapter": 5,
    "chapterTitle": "Geometria, Polígonos e Perímetro",
    "topic": "Cálculo do Perímetro do Quadrado",
    "question": "Um terreno quadrado tem cada lado medindo 6 metros. Qual é o seu perímetro?",
    "options": [
      "12 metros",
      "18 metros",
      "24 metros",
      "36 metros"
    ],
    "correctIndex": 2,
    "explanation": "Perímetro do quadrado = 4 × lado = 4 × 6 = 24 metros!"
  },
  {
    "id": "mat_4_c5_03",
    "subject": "matematica",
    "year": 4,
    "chapter": 5,
    "chapterTitle": "Geometria, Polígonos e Perímetro",
    "topic": "Cálculo do Perímetro do Retângulo",
    "question": "Uma piscina retangular tem 10 metros de comprimento e 4 metros de largura. Qual é o seu perímetro?",
    "options": [
      "14 metros",
      "28 metros",
      "40 metros",
      "50 metros"
    ],
    "correctIndex": 1,
    "explanation": "Perímetro = 10 + 10 + 4 + 4 = 28 metros!"
  },
  {
    "id": "mat_4_c5_04",
    "subject": "matematica",
    "year": 4,
    "chapter": 5,
    "chapterTitle": "Geometria, Polígonos e Perímetro",
    "topic": "Polígonos: Pentágono",
    "question": "Quantos lados tem um PENTÁGONO?",
    "options": [
      "4 lados",
      "5 lados",
      "6 lados",
      "8 lados"
    ],
    "correctIndex": 1,
    "explanation": "Pentágono possui 5 lados e 5 vértices!"
  },
  {
    "id": "mat_4_c5_05",
    "subject": "matematica",
    "year": 4,
    "chapter": 5,
    "chapterTitle": "Geometria, Polígonos e Perímetro",
    "topic": "Polígonos: Hexágono",
    "question": "A célula de um favo de mel de abelha tem 6 lados retos. Essa forma é um:",
    "options": [
      "Hexágono",
      "Octógono",
      "Pentágono",
      "Quadrado"
    ],
    "correctIndex": 0,
    "explanation": "Hexágono é o polígono de 6 lados!"
  },
  {
    "id": "mat_4_c5_06",
    "subject": "matematica",
    "year": 4,
    "chapter": 5,
    "chapterTitle": "Geometria, Polígonos e Perímetro",
    "topic": "Ângulo Reto",
    "question": "O ângulo formado pelo canto de uma folha de papel sulfite ou pelas paredes de uma sala é chamado de:",
    "options": [
      "Ângulo reto (mede 90°)",
      "Ângulo raso",
      "Ângulo obtuso",
      "Ângulo agudo"
    ],
    "correctIndex": 0,
    "explanation": "O canto reto em formato de 'L' mede 90 graus e é chamado de ângulo reto!"
  },
  {
    "id": "mat_4_c5_07",
    "subject": "matematica",
    "year": 4,
    "chapter": 5,
    "chapterTitle": "Geometria, Polígonos e Perímetro",
    "topic": "Vértices",
    "question": "Em uma figura geométrica, o ponto de encontro de dois lados retos é chamado de:",
    "options": [
      "Vértice",
      "Aresta",
      "Superfície",
      "Diagonal"
    ],
    "correctIndex": 0,
    "explanation": "O 'biquinho' ou ponta onde os lados se encontram é o vértice!"
  },
  {
    "id": "mat_4_c5_08",
    "subject": "matematica",
    "year": 4,
    "chapter": 5,
    "chapterTitle": "Geometria, Polígonos e Perímetro",
    "topic": "Sólidos: Vértices do Cubo",
    "question": "Quantos VÉRTICES (pontas) tem um CUBO?",
    "options": [
      "4 vértices",
      "6 vértices",
      "8 vértices",
      "12 vértices"
    ],
    "correctIndex": 2,
    "explanation": "O cubo tem 6 faces, 12 arestas e 8 vértices!"
  },
  {
    "id": "mat_4_c5_09",
    "subject": "matematica",
    "year": 4,
    "chapter": 5,
    "chapterTitle": "Geometria, Polígonos e Perímetro",
    "topic": "Sólidos: Arestas do Cubo",
    "question": "Quantas ARESTAS (linhas que unem os vértices) tem um cubo?",
    "options": [
      "6 arestas",
      "8 arestas",
      "10 arestas",
      "12 arestas"
    ],
    "correctIndex": 3,
    "explanation": "O cubo possui 12 arestas!"
  },
  {
    "id": "mat_4_c5_10",
    "subject": "matematica",
    "year": 4,
    "chapter": 5,
    "chapterTitle": "Geometria, Polígonos e Perímetro",
    "topic": "Simetria",
    "question": "Quando dobramos uma figura ao meio e as duas metades se encaixam com perfeição, dizemos que a figura tem:",
    "options": [
      "Eixo de simetria",
      "Perímetro falso",
      "Ângulo nulo",
      "Raio curvo"
    ],
    "correctIndex": 0,
    "explanation": "A linha imaginária que divide a figura em duas partes espelhadas idênticas é o eixo de simetria!"
  },
  {
    "id": "mat_4_c5_11",
    "subject": "matematica",
    "year": 4,
    "chapter": 5,
    "chapterTitle": "Geometria, Polígonos e Perímetro",
    "topic": "Classificação de Triângulos",
    "question": "Um triângulo que possui todos os 3 lados com medidas rigorosamente IGUAIS é chamado de:",
    "options": [
      "Equilátero",
      "Isósceles",
      "Escaleno",
      "Retângulo"
    ],
    "correctIndex": 0,
    "explanation": "Equilátero tem 3 lados iguais; isósceles tem 2 lados iguais; escaleno tem todos diferentes!"
  },
  {
    "id": "mat_4_c5_12",
    "subject": "matematica",
    "year": 4,
    "chapter": 5,
    "chapterTitle": "Geometria, Polígonos e Perímetro",
    "topic": "Polígonos: Quadriláteros",
    "question": "Qual das figuras abaixo é classificada como um QUADRILÁTERO?",
    "options": [
      "Trapézio",
      "Triângulo",
      "Pentágono",
      "Círculo"
    ],
    "correctIndex": 0,
    "explanation": "Trapézio tem 4 lados, logo é um quadrilátero!"
  },
  {
    "id": "mat_4_c5_13",
    "subject": "matematica",
    "year": 4,
    "chapter": 5,
    "chapterTitle": "Geometria, Polígonos e Perímetro",
    "topic": "Cálculo de Perímetro do Triângulo",
    "question": "Um triângulo tem lados medindo 5 cm, 7 cm e 8 cm. Qual é o seu perímetro?",
    "options": [
      "18 cm",
      "20 cm",
      "22 cm",
      "25 cm"
    ],
    "correctIndex": 1,
    "explanation": "5 + 7 + 8 = 20 cm!"
  },
  {
    "id": "mat_4_c5_14",
    "subject": "matematica",
    "year": 4,
    "chapter": 5,
    "chapterTitle": "Geometria, Polígonos e Perímetro",
    "topic": "Área em Malha Quadriculada",
    "question": "Em uma malha quadriculada onde cada quadradinho vale 1 cm², um retângulo ocupa 4 quadradinhos de largura por 3 de altura. Qual é sua área?",
    "options": [
      "7 cm²",
      "12 cm²",
      "14 cm²",
      "16 cm²"
    ],
    "correctIndex": 1,
    "explanation": "Área = base × altura = 4 × 3 = 12 cm²!"
  },
  {
    "id": "mat_4_c5_15",
    "subject": "matematica",
    "year": 4,
    "chapter": 5,
    "chapterTitle": "Geometria, Polígonos e Perímetro",
    "topic": "Polígonos: Octógono",
    "question": "A placa de trânsito de 'PARE' possui 8 lados retos. Qual é o nome desse polígono?",
    "options": [
      "Octógono",
      "Hexágono",
      "Decágono",
      "Pentágono"
    ],
    "correctIndex": 0,
    "explanation": "Polígono de 8 lados e 8 vértices é o octógono!"
  },
  {
    "id": "mat_4_c6_01",
    "subject": "matematica",
    "year": 4,
    "chapter": 6,
    "chapterTitle": "Medidas de Tempo, Massa e Capacidade",
    "topic": "Conversão de Tempo",
    "question": "Quantos segundos tem 1 minuto completo?",
    "options": [
      "30 segundos",
      "60 segundos",
      "100 segundos",
      "120 segundos"
    ],
    "correctIndex": 1,
    "explanation": "1 minuto tem exatamente 60 segundos!"
  },
  {
    "id": "mat_4_c6_02",
    "subject": "matematica",
    "year": 4,
    "chapter": 6,
    "chapterTitle": "Medidas de Tempo, Massa e Capacidade",
    "topic": "Conversão de Quilograma em Gramas",
    "question": "1 quilograma (1 kg) é igual a quantas gramas?",
    "options": [
      "100 gramas",
      "500 gramas",
      "1.000 gramas",
      "10.000 gramas"
    ],
    "correctIndex": 2,
    "explanation": "O prefixo 'quilo' significa 1.000; logo, 1 kg = 1.000 g!"
  },
  {
    "id": "mat_4_c6_03",
    "subject": "matematica",
    "year": 4,
    "chapter": 6,
    "chapterTitle": "Medidas de Tempo, Massa e Capacidade",
    "topic": "Conversão de Litro em Mililitros",
    "question": "1 litro de água (1 L) equivale a quantos mililitros (ml)?",
    "options": [
      "100 ml",
      "500 ml",
      "1.000 ml",
      "2.000 ml"
    ],
    "correctIndex": 2,
    "explanation": "1 L = 1.000 ml! Meio litro equivale a 500 ml!"
  },
  {
    "id": "mat_4_c6_04",
    "subject": "matematica",
    "year": 4,
    "chapter": 6,
    "chapterTitle": "Medidas de Tempo, Massa e Capacidade",
    "topic": "Conversão de Metro em Centímetros",
    "question": "Quantos centímetros tem 1 metro?",
    "options": [
      "10 cm",
      "50 cm",
      "100 cm",
      "1.000 cm"
    ],
    "correctIndex": 2,
    "explanation": "1 metro é composto por 100 centímetros!"
  },
  {
    "id": "mat_4_c6_05",
    "subject": "matematica",
    "year": 4,
    "chapter": 6,
    "chapterTitle": "Medidas de Tempo, Massa e Capacidade",
    "topic": "Conversão de Quilômetro em Metros",
    "question": "Quantos metros tem 1 quilômetro (1 km)?",
    "options": [
      "100 metros",
      "500 metros",
      "1.000 metros",
      "10.000 metros"
    ],
    "correctIndex": 2,
    "explanation": "1 km = 1.000 metros!"
  },
  {
    "id": "mat_4_c6_06",
    "subject": "matematica",
    "year": 4,
    "chapter": 6,
    "chapterTitle": "Medidas de Tempo, Massa e Capacidade",
    "topic": "Problema com Horários",
    "question": "O filme começou às 14h15 e durou 1 hora e 30 minutos. A que horas o filme terminou?",
    "options": [
      "15h15",
      "15h30",
      "15h45",
      "16h00"
    ],
    "correctIndex": 2,
    "explanation": "14h15 + 1h = 15h15; 15h15 + 30 min = 15h45!"
  },
  {
    "id": "mat_4_c6_07",
    "subject": "matematica",
    "year": 4,
    "chapter": 6,
    "chapterTitle": "Medidas de Tempo, Massa e Capacidade",
    "topic": "Meio Quilo",
    "question": "Meio quilograma (1/2 kg) de queijo equivale a quantas gramas?",
    "options": [
      "250 g",
      "500 g",
      "750 g",
      "1.000 g"
    ],
    "correctIndex": 1,
    "explanation": "A metade de 1.000 g é 500 g!"
  },
  {
    "id": "mat_4_c6_08",
    "subject": "matematica",
    "year": 4,
    "chapter": 6,
    "chapterTitle": "Medidas de Tempo, Massa e Capacidade",
    "topic": "Embalagens de 250 ml",
    "question": "Quantos copos de 250 ml podemos encher completamente com 1 litro de suco?",
    "options": [
      "2 copos",
      "3 copos",
      "4 copos",
      "5 copos"
    ],
    "correctIndex": 2,
    "explanation": "1.000 ml ÷ 250 ml = 4 copos!"
  },
  {
    "id": "mat_4_c6_09",
    "subject": "matematica",
    "year": 4,
    "chapter": 6,
    "chapterTitle": "Medidas de Tempo, Massa e Capacidade",
    "topic": "Medida de Tempo: Século e Década",
    "question": "Uma DÉCADA corresponde a quantos anos?",
    "options": [
      "5 anos",
      "10 anos",
      "50 anos",
      "100 anos"
    ],
    "correctIndex": 1,
    "explanation": "1 década tem 10 anos! 1 século tem 100 anos!"
  },
  {
    "id": "mat_4_c6_10",
    "subject": "matematica",
    "year": 4,
    "chapter": 6,
    "chapterTitle": "Medidas de Tempo, Massa e Capacidade",
    "topic": "Século",
    "question": "Um SÉCULO é composto por quantos anos?",
    "options": [
      "10 anos",
      "50 anos",
      "100 anos",
      "1.000 anos"
    ],
    "correctIndex": 2,
    "explanation": "1 século = 100 anos!"
  },
  {
    "id": "mat_4_c6_11",
    "subject": "matematica",
    "year": 4,
    "chapter": 6,
    "chapterTitle": "Medidas de Tempo, Massa e Capacidade",
    "topic": "Bimestre",
    "question": "Na escola, um BIMESTRE corresponde ao período de quantos meses?",
    "options": [
      "2 meses",
      "3 meses",
      "4 meses",
      "6 meses"
    ],
    "correctIndex": 0,
    "explanation": "Bimestre = 2 meses (o ano letivo tem 4 bimestres)!"
  },
  {
    "id": "mat_4_c6_12",
    "subject": "matematica",
    "year": 4,
    "chapter": 6,
    "chapterTitle": "Medidas de Tempo, Massa e Capacidade",
    "topic": "Trimestre",
    "question": "Um TRIMESTRE é um período de quantos meses?",
    "options": [
      "2 meses",
      "3 meses",
      "4 meses",
      "6 meses"
    ],
    "correctIndex": 1,
    "explanation": "Trimestre = 3 meses!"
  },
  {
    "id": "mat_4_c6_13",
    "subject": "matematica",
    "year": 4,
    "chapter": 6,
    "chapterTitle": "Medidas de Tempo, Massa e Capacidade",
    "topic": "Semestre",
    "question": "Um SEMESTRE tem a duração de quantos meses?",
    "options": [
      "4 meses",
      "5 meses",
      "6 meses",
      "8 meses"
    ],
    "correctIndex": 2,
    "explanation": "Semestre = 6 meses (metade do ano)!"
  },
  {
    "id": "mat_4_c6_14",
    "subject": "matematica",
    "year": 4,
    "chapter": 6,
    "chapterTitle": "Medidas de Tempo, Massa e Capacidade",
    "topic": "Problema com Compras de Peso",
    "question": "Mamãe comprou 4 pacotes de arroz de 5 kg cada. Quantos quilogramas de arroz ela comprou ao todo?",
    "options": [
      "15 kg",
      "20 kg",
      "25 kg",
      "30 kg"
    ],
    "correctIndex": 1,
    "explanation": "4 × 5 = 20 kg de arroz!"
  },
  {
    "id": "mat_4_c6_15",
    "subject": "matematica",
    "year": 4,
    "chapter": 6,
    "chapterTitle": "Medidas de Tempo, Massa e Capacidade",
    "topic": "Milímetro",
    "question": "Em uma régua, quantos milímetros (mm) há dentro de 1 centímetro (cm)?",
    "options": [
      "5 mm",
      "10 mm",
      "100 mm",
      "1.000 mm"
    ],
    "correctIndex": 1,
    "explanation": "1 centímetro possui exatamente 10 milímetros!"
  },
  {
    "id": "por_2_c1_01",
    "subject": "portugues",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Alfabeto, Vogais e Consoantes",
    "topic": "Vogais",
    "question": "Quais são as 5 vogais do nosso alfabeto?",
    "options": [
      "A, B, C, D, E",
      "A, E, I, O, U",
      "B, C, D, F, G",
      "U, V, X, Y, Z"
    ],
    "correctIndex": 1,
    "explanation": "As cinco vogais são A, E, I, O, U! Todas as outras letras são consoantes!"
  },
  {
    "id": "por_2_c1_02",
    "subject": "portugues",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Alfabeto, Vogais e Consoantes",
    "topic": "Total de Letras do Alfabeto",
    "question": "Quantas letras tem o alfabeto oficial da língua portuguesa?",
    "options": [
      "20 letras",
      "23 letras",
      "26 letras",
      "30 letras"
    ],
    "correctIndex": 2,
    "explanation": "O alfabeto possui 26 letras (incluindo K, W e Y)!"
  },
  {
    "id": "por_2_c1_03",
    "subject": "portugues",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Alfabeto, Vogais e Consoantes",
    "topic": "Ordem Alfabética",
    "question": "Qual letra vem imediatamente DEPOIS da letra 'M' no alfabeto?",
    "options": [
      "L",
      "N",
      "O",
      "P"
    ],
    "correctIndex": 1,
    "explanation": "...L, M, N, O, P! Depois do M vem o N!"
  },
  {
    "id": "por_2_c1_04",
    "subject": "portugues",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Alfabeto, Vogais e Consoantes",
    "topic": "Letra Inicial Maiúscula",
    "question": "Em qual destas palavras a primeira letra DEVE ser maiúscula?",
    "options": [
      "bianca (nome de pessoa)",
      "bola",
      "gato",
      "mesa"
    ],
    "correctIndex": 0,
    "explanation": "Nomes próprios de pessoas, cidades e início de frases sempre levam letra maiúscula: Bianca!"
  },
  {
    "id": "por_2_c1_05",
    "subject": "portugues",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Alfabeto, Vogais e Consoantes",
    "topic": "Letra que Antecede",
    "question": "Qual letra vem imediatamente ANTES da letra 'G'?",
    "options": [
      "E",
      "F",
      "H",
      "I"
    ],
    "correctIndex": 1,
    "explanation": "A sequência é E, F, G! Antes do G vem o F!"
  },
  {
    "id": "por_2_c1_06",
    "subject": "portugues",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Alfabeto, Vogais e Consoantes",
    "topic": "Organizar em Ordem Alfabética",
    "question": "Colocando as palavras 'Amora', 'Banana' e 'Abacaxi' na ordem do dicionário, qual é a PRIMEIRA?",
    "options": [
      "Abacaxi",
      "Amora",
      "Banana",
      "Todas juntas"
    ],
    "correctIndex": 0,
    "explanation": "Abacaxi e Amora começam com A, mas 'b' de Abacaxi vem antes de 'm' de Amora!"
  },
  {
    "id": "por_2_c1_07",
    "subject": "portugues",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Alfabeto, Vogais e Consoantes",
    "topic": "Consoantes",
    "question": "Na palavra 'BONECA', quantas consoantes existem?",
    "options": [
      "2 consoantes",
      "3 consoantes (B, N, C)",
      "4 consoantes",
      "5 consoantes"
    ],
    "correctIndex": 1,
    "explanation": "B, N e C são consoantes (3 no total). O, E e A são vogais!"
  },
  {
    "id": "por_2_c1_08",
    "subject": "portugues",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Alfabeto, Vogais e Consoantes",
    "topic": "Letras Especiais K, W, Y",
    "question": "As letras K, W e Y fazem parte do alfabeto da língua portuguesa?",
    "options": [
      "Sim, fazem parte do alfabeto oficial",
      "Não, foram proibidas",
      "Apenas o K existe",
      "Só valem em outros países"
    ],
    "correctIndex": 0,
    "explanation": "K, W e Y são letras oficiais usadas em nomes próprios, unidades de medida e palavras estrangeiras!"
  },
  {
    "id": "por_2_c1_09",
    "subject": "portugues",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Alfabeto, Vogais e Consoantes",
    "topic": "Som da Letra C",
    "question": "Na palavra 'CASA', a letra C tem som parecido com qual letra?",
    "options": [
      "Som de K",
      "Som de S",
      "Som de M",
      "Som de L"
    ],
    "correctIndex": 0,
    "explanation": "Antes de A, O e U, o C tem som de K: c-a-s-a!"
  },
  {
    "id": "por_2_c1_10",
    "subject": "portugues",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Alfabeto, Vogais e Consoantes",
    "topic": "Som do C com Cedilha",
    "question": "O que a cedilha (ç) faz com a letra C em palavras como 'CORAÇÃO' e 'PALHAÇO'?",
    "options": [
      "Dá à letra C o som de S",
      "Faz a letra ficar muda",
      "Dá som de R",
      "Faz virar vogal"
    ],
    "correctIndex": 0,
    "explanation": "O Ç dá o som suave de S antes de A, O e U!"
  },
  {
    "id": "por_2_c1_11",
    "subject": "portugues",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Alfabeto, Vogais e Consoantes",
    "topic": "Uso do Ç no Início de Palavras",
    "question": "Existe alguma palavra na língua portuguesa que COMEÇA com Ç (C cedilha)?",
    "options": [
      "Não, nenhuma palavra começa com Ç",
      "Sim, muitas palavras",
      "Apenas nomes de animais",
      "Apenas palavras em inglês"
    ],
    "correctIndex": 0,
    "explanation": "Regra fundamental: nenhuma palavra em português jamais começa com Ç!"
  },
  {
    "id": "por_2_c1_12",
    "subject": "portugues",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Alfabeto, Vogais e Consoantes",
    "topic": "Letra H no Início",
    "question": "Na palavra 'HORA' ou 'HOJE', a letra H inicial tem qual som?",
    "options": [
      "É muda (não emite som próprio)",
      "Tem som de R",
      "Tem som de F",
      "Tem som de J"
    ],
    "correctIndex": 0,
    "explanation": "O H no início de palavras em português é mudo, pronunciando-se a vogal seguinte!"
  },
  {
    "id": "por_2_c1_13",
    "subject": "portugues",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Alfabeto, Vogais e Consoantes",
    "topic": "Ordem Alfabética na Sala",
    "question": "Em uma lista de chamada com Ana, Carlos e Bianca, quem fica no topo por vir primeiro?",
    "options": [
      "Ana (começa com A)",
      "Bianca",
      "Carlos",
      "Todos na mesma linha"
    ],
    "correctIndex": 0,
    "explanation": "A letra A é a primeira letra do alfabeto, logo Ana lidera a lista!"
  },
  {
    "id": "por_2_c1_14",
    "subject": "portugues",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Alfabeto, Vogais e Consoantes",
    "topic": "Última Letra do Alfabeto",
    "question": "Qual é a 26ª e última letra do alfabeto?",
    "options": [
      "X",
      "Y",
      "Z",
      "W"
    ],
    "correctIndex": 2,
    "explanation": "O Z é a última letra do nosso alfabeto!"
  },
  {
    "id": "por_2_c1_15",
    "subject": "portugues",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Alfabeto, Vogais e Consoantes",
    "topic": "Vogal Inicial",
    "question": "Qual das palavras abaixo começa com a vogal 'E'?",
    "options": [
      "Estrela",
      "Árvore",
      "Igreja",
      "Ovo"
    ],
    "correctIndex": 0,
    "explanation": "'Estrela' começa com a vogal E!"
  },
  {
    "id": "por_2_c2_01",
    "subject": "portugues",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Sílabas Simples e Formação de Palavras",
    "topic": "Contagem de Sílabas",
    "question": "Quantas sílabas tem a palavra 'BORBOLETA' quando batemos palmas falando devagar?",
    "options": [
      "3 sílabas",
      "4 sílabas (bor-bo-le-ta)",
      "5 sílabas",
      "6 sílabas"
    ],
    "correctIndex": 1,
    "explanation": "Bor-bo-le-ta tem 4 sílabas (palavra polissílaba)!"
  },
  {
    "id": "por_2_c2_02",
    "subject": "portugues",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Sílabas Simples e Formação de Palavras",
    "topic": "Separação Silábica",
    "question": "Qual é a separação correta de sílabas da palavra 'PIPOCA'?",
    "options": [
      "pi-po-ca",
      "pip-oca",
      "p-i-p-o-c-a",
      "pipo-ca"
    ],
    "correctIndex": 0,
    "explanation": "Pi-po-ca tem 3 sílabas separadas perfeitamente!"
  },
  {
    "id": "por_2_c2_03",
    "subject": "portugues",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Sílabas Simples e Formação de Palavras",
    "topic": "Monossílabas",
    "question": "Uma palavra que possui apenas UMA sílaba (como 'SOL', 'PÉ' ou 'MÃO') é chamada de:",
    "options": [
      "Monossílaba",
      "Dissílaba",
      "Trissílaba",
      "Polissílaba"
    ],
    "correctIndex": 0,
    "explanation": "Palavras com 1 sílaba são monossílabas!"
  },
  {
    "id": "por_2_c2_04",
    "subject": "portugues",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Sílabas Simples e Formação de Palavras",
    "topic": "Dissílabas",
    "question": "Qual das palavras abaixo é DISSÍLABA (tem exatamente 2 sílabas)?",
    "options": [
      "Gato (ga-to)",
      "Sol",
      "Banana",
      "Tartaruga"
    ],
    "correctIndex": 0,
    "explanation": "Ga-to tem 2 sílabas, sendo classificada como dissílaba!"
  },
  {
    "id": "por_2_c2_05",
    "subject": "portugues",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Sílabas Simples e Formação de Palavras",
    "topic": "Trissílabas",
    "question": "Qual das palavras abaixo é TRISSÍLABA (tem 3 sílabas)?",
    "options": [
      "Caderno (ca-der-no)",
      "Pé",
      "Mesa",
      "Bicicleta"
    ],
    "correctIndex": 0,
    "explanation": "Ca-der-no tem 3 pedacinhos falados: trissílaba!"
  },
  {
    "id": "por_2_c2_06",
    "subject": "portugues",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Sílabas Simples e Formação de Palavras",
    "topic": "Dígrafo RR na Separação",
    "question": "Como separamos as sílabas da palavra 'CARRO'?",
    "options": [
      "car-ro (os dois R se separam)",
      "ca-rro",
      "carr-o",
      "c-a-r-r-o"
    ],
    "correctIndex": 0,
    "explanation": "Regra de ouro: no dígrafo RR, um R fica na sílaba anterior e o outro vai para a próxima (car-ro)!"
  },
  {
    "id": "por_2_c2_07",
    "subject": "portugues",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Sílabas Simples e Formação de Palavras",
    "topic": "Dígrafo SS na Separação",
    "question": "Como separamos as sílabas da palavra 'PÁSSARO'?",
    "options": [
      "pás-sa-ro",
      "pá-ssa-ro",
      "páss-a-ro",
      "p-á-s-s-a-r-o"
    ],
    "correctIndex": 0,
    "explanation": "Assim como o RR, as letras SS sempre se separam: pás-sa-ro!"
  },
  {
    "id": "por_2_c2_08",
    "subject": "portugues",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Sílabas Simples e Formação de Palavras",
    "topic": "Sílaba com NH",
    "question": "Na palavra 'GALINHA', as letras NH se separam na divisão de sílabas?",
    "options": [
      "Não, ficam juntas na mesma sílaba: ga-li-nha",
      "Sim, ficam separadas",
      "O H desaparece",
      "Não existe regra"
    ],
    "correctIndex": 0,
    "explanation": "Os dígrafos NH, LH e CH nunca se separam: ga-li-nha!"
  },
  {
    "id": "por_2_c2_09",
    "subject": "portugues",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Sílabas Simples e Formação de Palavras",
    "topic": "Sílaba Inicial",
    "question": "Qual é a sílaba INICIAL da palavra 'MACACONAUTA'?",
    "options": [
      "MA",
      "CA",
      "CO",
      "NAUTA"
    ],
    "correctIndex": 0,
    "explanation": "A primeira sílaba de ma-ca-co-nau-ta é MA!"
  },
  {
    "id": "por_2_c2_10",
    "subject": "portugues",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Sílabas Simples e Formação de Palavras",
    "topic": "Sílaba Final",
    "question": "Qual é a sílaba FINAL da palavra 'CHOCOLATE'?",
    "options": [
      "TE",
      "CHO",
      "CO",
      "LA"
    ],
    "correctIndex": 0,
    "explanation": "Cho-co-la-TE termina na sílaba TE!"
  },
  {
    "id": "por_2_c2_11",
    "subject": "portugues",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Sílabas Simples e Formação de Palavras",
    "topic": "Encontro Consonantal BL, CL, FL",
    "question": "Na palavra 'FLOR', as letras FL formam um:",
    "options": [
      "Encontro consonantal",
      "Dígrafo mudo",
      "Vogal dupla",
      "Ponto final"
    ],
    "correctIndex": 0,
    "explanation": "Duas consoantes pronunciadas juntas na mesma sílaba formam um encontro consonantal!"
  },
  {
    "id": "por_2_c2_12",
    "subject": "portugues",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Sílabas Simples e Formação de Palavras",
    "topic": "Formação de Palavras",
    "question": "Juntando as sílabas BO + NE + CA, qual palavra formamos?",
    "options": [
      "Boneca",
      "Boné",
      "Boca",
      "Bolo"
    ],
    "correctIndex": 0,
    "explanation": "BO + NE + CA = Boneca!"
  },
  {
    "id": "por_2_c2_13",
    "subject": "portugues",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Sílabas Simples e Formação de Palavras",
    "topic": "Troca de Letras",
    "question": "Se trocarmos a primeira letra da palavra 'GATO' pela letra P, qual palavra formamos?",
    "options": [
      "PATO",
      "RATO",
      "MATO",
      "TATO"
    ],
    "correctIndex": 0,
    "explanation": "Trocando G por P: P-A-T-O = Pato!"
  },
  {
    "id": "por_2_c2_14",
    "subject": "portugues",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Sílabas Simples e Formação de Palavras",
    "topic": "Palavra Polissílaba",
    "question": "Qual das palavras abaixo é POLISSÍLABA (tem 4 ou mais sílabas)?",
    "options": [
      "Paralelepípedo (pa-ra-le-le-pí-pe-do)",
      "Sol",
      "Casa",
      "Sapato"
    ],
    "correctIndex": 0,
    "explanation": "Paralelepípedo tem 7 sílabas, sendo uma polissílaba!"
  },
  {
    "id": "por_2_c2_15",
    "subject": "portugues",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Sílabas Simples e Formação de Palavras",
    "topic": "Sílaba com R Final",
    "question": "Na palavra 'CANTAR', qual é a última sílaba?",
    "options": [
      "TAR",
      "CAN",
      "AR",
      "R"
    ],
    "correctIndex": 0,
    "explanation": "Can-TAR: a última sílaba é TAR!"
  },
  {
    "id": "por_2_c3_01",
    "subject": "portugues",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Rimas, Cantigas e Poesias Infantis",
    "topic": "Rima com Coração",
    "question": "Qual palavra rima perfeitamente com 'CORAÇÃO'?",
    "options": [
      "Balão",
      "Caneta",
      "Janela",
      "Caderno"
    ],
    "correctIndex": 0,
    "explanation": "Coração e Balão terminam com o mesmo som: -ÃO!"
  },
  {
    "id": "por_2_c3_02",
    "subject": "portugues",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Rimas, Cantigas e Poesias Infantis",
    "topic": "Rima com Gato",
    "question": "Qual destas palavras rima com 'GATO'?",
    "options": [
      "Pato",
      "Cão",
      "Peixe",
      "Vaca"
    ],
    "correctIndex": 0,
    "explanation": "Gato e Pato terminam com o som -ATO!"
  },
  {
    "id": "por_2_c3_03",
    "subject": "portugues",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Rimas, Cantigas e Poesias Infantis",
    "topic": "Parlendas",
    "question": "Complete a parlenda clássica: 'Batatinha quando nasce, espalha a rama pelo...'",
    "options": [
      "Chão",
      "Céu",
      "Ar",
      "Telhado"
    ],
    "correctIndex": 0,
    "explanation": "'Batatinha quando nasce, espalha a rama pelo chão!'"
  },
  {
    "id": "por_2_c3_04",
    "subject": "portugues",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Rimas, Cantigas e Poesias Infantis",
    "topic": "Cantigas de Roda",
    "question": "Na cantiga 'Ciranda, cirandinha, vamos todos...', o que vamos fazer?",
    "options": [
      "Cirandar",
      "Dormir",
      "Comer",
      "Correr"
    ],
    "correctIndex": 0,
    "explanation": "'Ciranda, cirandinha, vamos todos cirandar!'"
  },
  {
    "id": "por_2_c3_05",
    "subject": "portugues",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Rimas, Cantigas e Poesias Infantis",
    "topic": "Identificar o que é Rima",
    "question": "O que é uma RIMA em um poema ou canção?",
    "options": [
      "Palavras que terminam com sons iguais ou muito parecidos",
      "Palavras escritas com a mesma caneta",
      "Palavras que têm o mesmo número de letras",
      "Palavras difíceis de pronunciar"
    ],
    "correctIndex": 0,
    "explanation": "Rima é a semelhança de sons finais entre palavras, criando musicalidade!"
  },
  {
    "id": "por_2_c3_06",
    "subject": "portugues",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Rimas, Cantigas e Poesias Infantis",
    "topic": "Rima com Flor",
    "question": "Qual palavra rima com 'FLOR'?",
    "options": [
      "Amor",
      "Casa",
      "Lápis",
      "Água"
    ],
    "correctIndex": 0,
    "explanation": "Flor e Amor rimam com a terminação -OR!"
  },
  {
    "id": "por_2_c3_07",
    "subject": "portugues",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Rimas, Cantigas e Poesias Infantis",
    "topic": "Verso na Poesia",
    "question": "Em uma poesia infantil, cada LINHA do poema é chamada de:",
    "options": [
      "Verso",
      "Estrofe",
      "Título",
      "Capítulo"
    ],
    "correctIndex": 0,
    "explanation": "Cada linha individual de um poema chama-se verso!"
  },
  {
    "id": "por_2_c3_08",
    "subject": "portugues",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Rimas, Cantigas e Poesias Infantis",
    "topic": "Estrofe",
    "question": "O conjunto de versos agrupados em um poema chama-se:",
    "options": [
      "Estrofe",
      "Frase",
      "Página",
      "Alfabeto"
    ],
    "correctIndex": 0,
    "explanation": "A estrofe é o bloquinho ou conjunto de versos do poema!"
  },
  {
    "id": "por_2_c3_09",
    "subject": "portugues",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Rimas, Cantigas e Poesias Infantis",
    "topic": "Trava-Línguas",
    "question": "No trava-línguas: 'O rato roeu a roupa do rei de...', quem era o rei?",
    "options": [
      "Roma",
      "Paris",
      "Kanto",
      "Londres"
    ],
    "correctIndex": 0,
    "explanation": "'O rato roeu a roupa do rei de Roma!'"
  },
  {
    "id": "por_2_c3_10",
    "subject": "portugues",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Rimas, Cantigas e Poesias Infantis",
    "topic": "Rima com Menina",
    "question": "Qual palavra abaixo rima com 'MENINA'?",
    "options": [
      "Bailarina",
      "Garoto",
      "Boneco",
      "Caminho"
    ],
    "correctIndex": 0,
    "explanation": "Menina e Bailarina rimam em -INA!"
  },
  {
    "id": "por_2_c3_11",
    "subject": "portugues",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Rimas, Cantigas e Poesias Infantis",
    "topic": "Cantiga do Cravo e a Rosa",
    "question": "Na cantiga popular, quem 'brigou debaixo de uma sacada'?",
    "options": [
      "O Cravo e a Rosa",
      "O Cão e o Gato",
      "O Sol e a Lua",
      "O Leão e o Macaco"
    ],
    "correctIndex": 0,
    "explanation": "'O Cravo brigou com a Rosa debaixo de uma sacada!'"
  },
  {
    "id": "por_2_c3_12",
    "subject": "portugues",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Rimas, Cantigas e Poesias Infantis",
    "topic": "Rima com Sabão",
    "question": "Qual palavra rima com 'SABÃO'?",
    "options": [
      "Limão",
      "Sabonete",
      "Banho",
      "Água"
    ],
    "correctIndex": 0,
    "explanation": "Sabão e Limão terminam com o som -ÃO!"
  },
  {
    "id": "por_2_c3_13",
    "subject": "portugues",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Rimas, Cantigas e Poesias Infantis",
    "topic": "Rima com Janela",
    "question": "Qual palavra rima com 'JANELA'?",
    "options": [
      "Panela",
      "Porta",
      "Telha",
      "Muro"
    ],
    "correctIndex": 0,
    "explanation": "Janela e Panela rimam com a terminação -ELA!"
  },
  {
    "id": "por_2_c3_14",
    "subject": "portugues",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Rimas, Cantigas e Poesias Infantis",
    "topic": "Quem NÃO Rima",
    "question": "Qual palavra NÃO rima com 'BOLA'?",
    "options": [
      "Cadeira",
      "Mola",
      "Cola",
      "Sacola"
    ],
    "correctIndex": 0,
    "explanation": "Mola, cola e sacola rimam com bola; 'cadeira' termina com som diferente!"
  },
  {
    "id": "por_2_c3_15",
    "subject": "portugues",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Rimas, Cantigas e Poesias Infantis",
    "topic": "Poesia e Sentimento",
    "question": "Poesias e cantigas servem principalmente para quê?",
    "options": [
      "Expressar sentimentos, emoções e encantar com o ritmo das palavras",
      "Ensinar a consertar carros",
      "Contar dinheiro do banco",
      "Calcular a velocidade da luz"
    ],
    "correctIndex": 0,
    "explanation": "Textos poéticos brincam com os sons para emocionar, divertir e encantar!"
  },
  {
    "id": "por_2_c4_01",
    "subject": "portugues",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Letras Maiúsculas e Pontuação Final",
    "topic": "Ponto Final",
    "question": "Qual sinal de pontuação usamos no final de uma frase declarativa comum que terminou?",
    "options": [
      "Ponto final (.)",
      "Ponto de interrogação (?)",
      "Vírgula (,)",
      "Dois pontos (:)"
    ],
    "correctIndex": 0,
    "explanation": "O ponto final (.) indica que a frase terminou de forma afirmativa ou negativa!"
  },
  {
    "id": "por_2_c4_02",
    "subject": "portugues",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Letras Maiúsculas e Pontuação Final",
    "topic": "Ponto de Interrogação",
    "question": "Quando fazemos uma PERGUNTA, qual sinal devemos colocar no final da frase?",
    "options": [
      "Ponto de interrogação (?)",
      "Ponto final (.)",
      "Ponto de exclamação (!)",
      "Reticências (...)"
    ],
    "correctIndex": 0,
    "explanation": "O ponto de interrogação (?) é usado exclusivamente para fazer perguntas!"
  },
  {
    "id": "por_2_c4_03",
    "subject": "portugues",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Letras Maiúsculas e Pontuação Final",
    "topic": "Ponto de Exclamação",
    "question": "Na frase 'Que Pikachu fofinho!', qual sinal expressa entusiasmo e alegria?",
    "options": [
      "Ponto de exclamação (!)",
      "Ponto final (.)",
      "Ponto de interrogação (?)",
      "Vírgula (,)"
    ],
    "correctIndex": 0,
    "explanation": "O ponto de exclamação (!) demonstra sentimentos de admiração, susto, alegria ou surpresa!"
  },
  {
    "id": "por_2_c4_04",
    "subject": "portugues",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Letras Maiúsculas e Pontuação Final",
    "topic": "Maiúscula em Nomes de Cidades",
    "question": "Qual palavra deve ser escrita com a letra inicial maiúscula?",
    "options": [
      "Brasil (nome de país)",
      "árvore",
      "mesa",
      "cachorro"
    ],
    "correctIndex": 0,
    "explanation": "Nomes próprios de países, estados e cidades sempre começam com maiúscula: Brasil!"
  },
  {
    "id": "por_2_c4_05",
    "subject": "portugues",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Letras Maiúsculas e Pontuação Final",
    "topic": "Início de Frase",
    "question": "Ao começar a escrever uma frase nova no caderno, qual regra devemos sempre seguir?",
    "options": [
      "Começar sempre com letra inicial maiúscula",
      "Começar com desenho",
      "Usar apenas letras minúsculas",
      "Começar com ponto final"
    ],
    "correctIndex": 0,
    "explanation": "Toda frase começa obrigatoriamente com letra maiúscula!"
  },
  {
    "id": "por_2_c4_06",
    "subject": "portugues",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Letras Maiúsculas e Pontuação Final",
    "topic": "Uso da Vírgula em Enumerações",
    "question": "Na frase 'Bianca comprou maçã, uva e banana', para que serviu a vírgula?",
    "options": [
      "Para separar os itens de uma lista",
      "Para fazer uma pergunta",
      "Para encerrar a história",
      "Para gritar"
    ],
    "correctIndex": 0,
    "explanation": "A vírgula separa elementos de uma lista ou enumeração!"
  },
  {
    "id": "por_2_c4_07",
    "subject": "portugues",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Letras Maiúsculas e Pontuação Final",
    "topic": "Frase Interrogativa",
    "question": "Qual das frases abaixo é uma PERGUNTA?",
    "options": [
      "Você quer brincar comigo?",
      "Eu vou brincar lá fora.",
      "Que brincadeira legal!",
      "Nós não vamos brincar."
    ],
    "correctIndex": 0,
    "explanation": "'Você quer brincar comigo?' termina com ponto de interrogação e faz uma pergunta!"
  },
  {
    "id": "por_2_c4_08",
    "subject": "portugues",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Letras Maiúsculas e Pontuação Final",
    "topic": "Frase Exclamativa",
    "question": "Qual das frases abaixo é EXCLAMATIVA?",
    "options": [
      "Cuidado com o buraco!",
      "Onde está o livro?",
      "Eu gosto de suco.",
      "Hoje é segunda-feira."
    ],
    "correctIndex": 0,
    "explanation": "'Cuidado com o buraco!' expressa alerta e termina com ponto de exclamação!"
  },
  {
    "id": "por_2_c4_09",
    "subject": "portugues",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Letras Maiúsculas e Pontuação Final",
    "topic": "Nome de Animais de Estimação",
    "question": "O cachorrinho da família chama-se 'Tobby'. Por que 'Tobby' começa com T maiúsculo?",
    "options": [
      "Porque é o nome próprio dado àquele animal",
      "Porque cachorros são grandes",
      "Porque é uma palavra em inglês",
      "Foi um erro de escrita"
    ],
    "correctIndex": 0,
    "explanation": "Nomes próprios de animais de estimação também são substantivos próprios e levam inicial maiúscula!"
  },
  {
    "id": "por_2_c4_10",
    "subject": "portugues",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Letras Maiúsculas e Pontuação Final",
    "topic": "Espaço do Parágrafo",
    "question": "Aquele pequeno recuo de espaço que deixamos antes de começar o primeiro texto chama-se:",
    "options": [
      "Parágrafo",
      "Ponto final",
      "Rima",
      "Vogal"
    ],
    "correctIndex": 0,
    "explanation": "O parágrafo organiza o início das ideias com um recuo na margem!"
  },
  {
    "id": "por_2_c4_11",
    "subject": "portugues",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Letras Maiúsculas e Pontuação Final",
    "topic": "Reticências",
    "question": "Os três pontinhos seguidos (...) no final de uma frase são chamados de:",
    "options": [
      "Reticências",
      "Três pontos finais",
      "Vírgulas",
      "Aspas"
    ],
    "correctIndex": 0,
    "explanation": "Reticências (...) indicam suspense, interrupção de pensamento ou continuidade!"
  },
  {
    "id": "por_2_c4_12",
    "subject": "portugues",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Letras Maiúsculas e Pontuação Final",
    "topic": "Travessão na Fala",
    "question": "O traço longo (—) usado no início de uma frase em histórias infantis indica:",
    "options": [
      "A fala de um personagem",
      "Que a frase está errada",
      "Um número de matemática",
      "Que o livro acabou"
    ],
    "correctIndex": 0,
    "explanation": "O travessão (—) indica a fala direta de um personagem no diálogo!"
  },
  {
    "id": "por_2_c4_13",
    "subject": "portugues",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Letras Maiúsculas e Pontuação Final",
    "topic": "Dois Pontos",
    "question": "Antes de um personagem falar ou de começar uma lista, usamos qual sinal?",
    "options": [
      "Dois pontos (:)",
      "Ponto e vírgula",
      "Ponto final",
      "Interrogação"
    ],
    "correctIndex": 0,
    "explanation": "Os dois pontos (:) anunciam que alguém vai falar ou introduzem uma explicação/lista!"
  },
  {
    "id": "por_2_c4_14",
    "subject": "portugues",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Letras Maiúsculas e Pontuação Final",
    "topic": "Frase Negativa",
    "question": "Na frase 'Bianca não gosta de acordar cedo', qual palavra transforma a frase em negativa?",
    "options": [
      "Não",
      "Bianca",
      "Gosta",
      "Cedo"
    ],
    "correctIndex": 0,
    "explanation": "A palavra 'não' nega a afirmação, tornando a frase negativa!"
  },
  {
    "id": "por_2_c4_15",
    "subject": "portugues",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Letras Maiúsculas e Pontuação Final",
    "topic": "Pontuação Correta",
    "question": "Qual pontuação completa perfeitamente: 'Que dia lindo está fazendo hoje___'",
    "options": [
      "!",
      "?",
      ",",
      ":"
    ],
    "correctIndex": 0,
    "explanation": "Expressando entusiasmo com o belo dia, usamos o ponto de exclamação (!)"
  },
  {
    "id": "por_4_c1_01",
    "subject": "portugues",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Interpretação de Texto e Gênero Fábulas",
    "topic": "Moral da Fábula",
    "question": "O que é a MORAL DE UMA HISTÓRIA encontrada no final das fábulas?",
    "options": [
      "Um ensinamento ou lição de vida que o leitor aprende com a história",
      "O nome do autor do livro",
      "O desenho da capa",
      "O preço do exemplar na livraria"
    ],
    "correctIndex": 0,
    "explanation": "Fábulas trazem personagens animais com comportamentos humanos para transmitir uma lição ética ou moral!"
  },
  {
    "id": "por_4_c1_02",
    "subject": "portugues",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Interpretação de Texto e Gênero Fábulas",
    "topic": "A Lebre e a Tartaruga",
    "question": "Na famosa fábula 'A Lebre e a Tartaruga', por que a tartaruga venceu a corrida?",
    "options": [
      "Porque foi constante e persistente, enquanto a lebre presunçosa dormiu no caminho",
      "Porque a tartaruga usou um patinete elétrico",
      "Porque a lebre errou o caminho da floresta",
      "Porque a corrida foi cancelada"
    ],
    "correctIndex": 0,
    "explanation": "A persistência, dedicação e humildade superam a pressa descuidada!"
  },
  {
    "id": "por_4_c1_03",
    "subject": "portugues",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Interpretação de Texto e Gênero Fábulas",
    "topic": "A Cigarra e a Formiga",
    "question": "Na fábula 'A Cigarra e a Formiga', o que a formiga fez durante todo o verão enquanto a cigarra cantava?",
    "options": [
      "Trabalhou arduamente armazenando comida no formigueiro para o inverno",
      "Viajou para a praia",
      "Ficou dormindo na sombra",
      "Aprendeu a tocar violão"
    ],
    "correctIndex": 0,
    "explanation": "A formiga planejou o futuro e guardou provisões para sobreviver ao frio do inverno!"
  },
  {
    "id": "por_4_c1_04",
    "subject": "portugues",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Interpretação de Texto e Gênero Fábulas",
    "topic": "Narrador em 1ª Pessoa",
    "question": "Quando o narrador participa da história como personagem e diz 'Eu vi o monstro', ele é um:",
    "options": [
      "Narrador-personagem (1ª pessoa)",
      "Narrador-observador (3ª pessoa)",
      "Leitor",
      "Ilustrador"
    ],
    "correctIndex": 0,
    "explanation": "Quando usa 'eu' e participa dos acontecimentos, é um narrador-personagem!"
  },
  {
    "id": "por_4_c1_05",
    "subject": "portugues",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Interpretação de Texto e Gênero Fábulas",
    "topic": "Personificação",
    "question": "Dar sentimentos, fala e ações humanas a animais e objetos inanimados em uma fábula é uma figura chamada:",
    "options": [
      "Personificação ou Prosopopeia",
      "Rima externa",
      "Parágrafo inverso",
      "Aliteração"
    ],
    "correctIndex": 0,
    "explanation": "A personificação atribui características humanas a animais ou seres inanimados!"
  },
  {
    "id": "por_4_c1_06",
    "subject": "portugues",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Interpretação de Texto e Gênero Fábulas",
    "topic": "Ideia Principal do Texto",
    "question": "Para descobrir a IDEIA PRINCIPAL de um texto, qual pergunta devemos fazer?",
    "options": [
      "Qual é a mensagem ou assunto central que o autor quer comunicar?",
      "Quantas palavras o texto tem?",
      "Qual é a cor da tinta usada na impressão?",
      "Quantas letras 'a' aparecem na página?"
    ],
    "correctIndex": 0,
    "explanation": "A ideia principal é o núcleo em torno do qual todas as outras informações do texto giram!"
  },
  {
    "id": "por_4_c1_07",
    "subject": "portugues",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Interpretação de Texto e Gênero Fábulas",
    "topic": "O Leão e o Ratinho",
    "question": "Na fábula 'O Leão e o Ratinho', como um pequeno rato conseguiu salvar o poderoso rei dos animais?",
    "options": [
      "Roendo com os dentes as cordas da rede dos caçadores",
      "Lutando com espadas",
      "Chamando a polícia da floresta",
      "Trazendo um machado de ferro"
    ],
    "correctIndex": 0,
    "explanation": "'Nenhum ato de gentileza é vão': o ratinho salvou o leão roendo as malhas da rede!"
  },
  {
    "id": "por_4_c1_08",
    "subject": "portugues",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Interpretação de Texto e Gênero Fábulas",
    "topic": "Sinônimos no Texto",
    "question": "No trecho 'O castelo era ENORME', qual palavra poderia substituir 'ENORME' sem mudar o sentido?",
    "options": [
      "Gigantesco",
      "Minúsculo",
      "Estreito",
      "Escuro"
    ],
    "correctIndex": 0,
    "explanation": "Enorme e gigantesco são sinônimos com o mesmo significado de grande porte!"
  },
  {
    "id": "por_4_c1_09",
    "subject": "portugues",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Interpretação de Texto e Gênero Fábulas",
    "topic": "Antônimos no Texto",
    "question": "Qual é o antônimo (oposto) da palavra 'CORAJOSO'?",
    "options": [
      "Covarde / Medroso",
      "Valente",
      "Forte",
      "Herói"
    ],
    "correctIndex": 0,
    "explanation": "Covarde ou medroso é o contrário exato de corajoso!"
  },
  {
    "id": "por_4_c1_10",
    "subject": "portugues",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Interpretação de Texto e Gênero Fábulas",
    "topic": "Sentido Próprio vs Figurado",
    "question": "Na frase 'Aquela menina tem um coração de ouro', a expressão 'coração de ouro' está em:",
    "options": [
      "Sentido figurado (significa que ela é muito bondosa e generosa)",
      "Sentido literal (o coração é feito de metal ouro)",
      "Erro gramatical",
      "Língua estrangeira"
    ],
    "correctIndex": 0,
    "explanation": "No sentido figurado (conotativo), 'coração de ouro' é uma metáfora para extrema bondade!"
  },
  {
    "id": "por_4_c1_11",
    "subject": "portugues",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Interpretação de Texto e Gênero Fábulas",
    "topic": "Fábulas de Esopo e La Fontaine",
    "question": "Esopo e Jean de La Fontaine ficaram mundialmente famosos na literatura por escreverem:",
    "options": [
      "Fábulas clássicas inesquecíveis",
      "Manuais de videogame",
      "Mapas de geografia",
      "Livros de culinária"
    ],
    "correctIndex": 0,
    "explanation": "Esopo (na Grécia Antiga) e La Fontaine (na França) são os maiores mestres das fábulas!"
  },
  {
    "id": "por_4_c1_12",
    "subject": "portugues",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Interpretação de Texto e Gênero Fábulas",
    "topic": "Inferência Textual",
    "question": "Se o texto diz: 'Ao sair de casa, Cecília abriu o guarda-chuva e calçou botas de borracha', podemos inferir que:",
    "options": [
      "Estava chovendo lá fora",
      "Fazia um calor de 40 graus",
      "Ela ia à praia tomar sol",
      "Era dia de neve"
    ],
    "correctIndex": 0,
    "explanation": "Fazer inferência é deduzir informações não ditas explicitamente através de pistas textuais!"
  },
  {
    "id": "por_4_c1_13",
    "subject": "portugues",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Interpretação de Texto e Gênero Fábulas",
    "topic": "Clímax da Narrativa",
    "question": "Em uma história de aventura, o CLÍMAX é:",
    "options": [
      "O momento de maior emoção, tensão e suspense da história",
      "O título do livro",
      "O sumário com os números das páginas",
      "O ponto final na última linha"
    ],
    "correctIndex": 0,
    "explanation": "O clímax é o ápice dramático onde o conflito principal atinge seu ponto mais emocionante!"
  },
  {
    "id": "por_4_c1_14",
    "subject": "portugues",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Interpretação de Texto e Gênero Fábulas",
    "topic": "Desfecho",
    "question": "Como se chama a parte final de uma narrativa, onde os conflitos são solucionados?",
    "options": [
      "Desfecho / Conclusão",
      "Introdução",
      "Clímax",
      "Epígrafe"
    ],
    "correctIndex": 0,
    "explanation": "O desfecho conclui a história e mostra o destino final dos personagens!"
  },
  {
    "id": "por_4_c1_15",
    "subject": "portugues",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Interpretação de Texto e Gênero Fábulas",
    "topic": "A Raposa e as Uvas",
    "question": "Na fábula 'A Raposa e as Uvas', a raposa não consegue alcançar as uvas maduras e diz 'estão verdes'. O que essa atitude reflete?",
    "options": [
      "Desprezar aquilo que não se consegue alcançar por orgulho ferido",
      "Que as uvas realmente estavam estragadas",
      "Que a raposa era vegetariana",
      "Que a videira era de plástico"
    ],
    "correctIndex": 0,
    "explanation": "A moral mostra que muitas pessoas fingem desprezar o que não conseguem conquistar!"
  },
  {
    "id": "por_4_c2_01",
    "subject": "portugues",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Verbos: Presente, Passado e Futuro",
    "topic": "O que é Verbo",
    "question": "Qual das palavras abaixo representa uma AÇÃO (um verbo)?",
    "options": [
      "Correr",
      "Mesa",
      "Bonito",
      "Azul"
    ],
    "correctIndex": 0,
    "explanation": "'Correr' é um verbo que expressa ação! Mesa é substantivo e bonito/azul são adjetivos!"
  },
  {
    "id": "por_4_c2_02",
    "subject": "portugues",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Verbos: Presente, Passado e Futuro",
    "topic": "Pretérito Perfeito",
    "question": "Em 'Ontem nós ESTUDAMOS muito para a prova', o verbo está em qual tempo verbal?",
    "options": [
      "Pretérito (Passado)",
      "Presente",
      "Futuro",
      "Infinitivo"
    ],
    "correctIndex": 0,
    "explanation": "A ação já foi concluída no passado ('ontem'), caracterizando o pretérito perfeito!"
  },
  {
    "id": "por_4_c2_03",
    "subject": "portugues",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Verbos: Presente, Passado e Futuro",
    "topic": "Tempo Futuro",
    "question": "Como fica o verbo 'VIAJAR' no FUTURO com o pronome 'Nós'?",
    "options": [
      "Nós viajaremos",
      "Nós viajamos ontem",
      "Nós viajava",
      "Nós viajem"
    ],
    "correctIndex": 0,
    "explanation": "Ação que ainda acontecerá no futuro: 'Nós viajaremos amanhã'!"
  },
  {
    "id": "por_4_c2_04",
    "subject": "portugues",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Verbos: Presente, Passado e Futuro",
    "topic": "Tempo Presente",
    "question": "Qual frase está no tempo PRESENTE (acontecendo agora)?",
    "options": [
      "Cecília lê um livro fascinante",
      "Cecília leu o livro ontem",
      "Cecília lerá o livro amanhã",
      "Cecília lera tudo"
    ],
    "correctIndex": 0,
    "explanation": "'Lê' indica ação que ocorre no momento presente!"
  },
  {
    "id": "por_4_c2_05",
    "subject": "portugues",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Verbos: Presente, Passado e Futuro",
    "topic": "Verbos de Fenômeno da Natureza",
    "question": "Qual dos verbos abaixo expressa um FENÔMENO DA NATUREZA?",
    "options": [
      "Chover",
      "Escrever",
      "Pular",
      "Cozinhar"
    ],
    "correctIndex": 0,
    "explanation": "Verbos como chover, nevar, ventar e relampejar indicam fenômenos climáticos e naturais!"
  },
  {
    "id": "por_4_c2_06",
    "subject": "portugues",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Verbos: Presente, Passado e Futuro",
    "topic": "Verbos de Estado",
    "question": "Na frase 'As irmãs ESTAVAM felizes', o verbo 'estavam' expressa:",
    "options": [
      "Um estado / condição dos sujeitos",
      "Uma ação física de corrida",
      "Um fenômeno do tempo",
      "Um som"
    ],
    "correctIndex": 0,
    "explanation": "Verbos como ser, estar, parecer, ficar e permanecer indicam estado do sujeito!"
  },
  {
    "id": "por_4_c2_07",
    "subject": "portugues",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Verbos: Presente, Passado e Futuro",
    "topic": "Conjugação: 1ª, 2ª e 3ª",
    "question": "O verbo 'CANTAR' pertence a qual conjugação verbal?",
    "options": [
      "1ª conjugação (terminados em -AR)",
      "2ª conjugação (em -ER)",
      "3ª conjugação (em -IR)",
      "4ª conjugação"
    ],
    "correctIndex": 0,
    "explanation": "Verbos terminados em -AR pertencem à 1ª conjugação (cantar, dançar, amar)!"
  },
  {
    "id": "por_4_c2_08",
    "subject": "portugues",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Verbos: Presente, Passado e Futuro",
    "topic": "2ª Conjugação",
    "question": "Qual dos verbos abaixo pertence à 2ª CONJUGAÇÃO (terminados em -ER)?",
    "options": [
      "Comer",
      "Falar",
      "Partir",
      "Brincar"
    ],
    "correctIndex": 0,
    "explanation": "Comer, beber e correr terminam em -ER e fazem parte da 2ª conjugação!"
  },
  {
    "id": "por_4_c2_09",
    "subject": "portugues",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Verbos: Presente, Passado e Futuro",
    "topic": "3ª Conjugação",
    "question": "Qual verbo pertence à 3ª CONJUGAÇÃO (terminados em -IR)?",
    "options": [
      "Sorrir",
      "Cantar",
      "Vender",
      "Pintar"
    ],
    "correctIndex": 0,
    "explanation": "Sorrir, abrir e partir terminam em -IR (3ª conjugação)!"
  },
  {
    "id": "por_4_c2_10",
    "subject": "portugues",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Verbos: Presente, Passado e Futuro",
    "topic": "Infinitivo",
    "question": "Quando o verbo está em sua forma natural no dicionário (sem conjugar, terminando em R), dizemos que está no:",
    "options": [
      "Infinitivo",
      "Gerúndio",
      "Particípio",
      "Subjuntivo"
    ],
    "correctIndex": 0,
    "explanation": "O infinitivo é o nome do verbo: brincar, correr, dormir!"
  },
  {
    "id": "por_4_c2_11",
    "subject": "portugues",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Verbos: Presente, Passado e Futuro",
    "topic": "Diferença: -AM (passado) vs -ÃO (futuro)",
    "question": "Complete corretamente: 'Ontem eles cant____ muito bem; amanhã eles cantar____ no palco.'",
    "options": [
      "cantaram (passado) / cantarão (futuro)",
      "cantarão / cantaram",
      "cantam / cantem",
      "cantando / cantado"
    ],
    "correctIndex": 0,
    "explanation": "Passado termina em -AM (eles cantaram ontem); futuro com som forte em -ÃO (eles cantarão amanhã)!"
  },
  {
    "id": "por_4_c2_12",
    "subject": "portugues",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Verbos: Presente, Passado e Futuro",
    "topic": "Pessoas Gramaticais",
    "question": "O pronome 'EU' corresponde a qual pessoa gramatical do discurso?",
    "options": [
      "1ª pessoa do singular",
      "2ª pessoa do singular",
      "3ª pessoa do singular",
      "1ª pessoa do plural"
    ],
    "correctIndex": 0,
    "explanation": "1ª pessoa (quem fala): Eu (singular) e Nós (plural)!"
  },
  {
    "id": "por_4_c2_13",
    "subject": "portugues",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Verbos: Presente, Passado e Futuro",
    "topic": "Pretérito Imperfeito",
    "question": "Em 'Antigamente, vovó COSTURAVA vestidos de boneca todos os dias', o verbo indica:",
    "options": [
      "Uma ação habitual e contínua no passado (pretérito imperfeito)",
      "Uma ação que só durou 1 segundo",
      "Uma ação do futuro",
      "Uma ordem militar"
    ],
    "correctIndex": 0,
    "explanation": "A desinência -AVA / -IA indica ações repetidas ou contínuas no passado (pretérito imperfeito)!"
  },
  {
    "id": "por_4_c2_14",
    "subject": "portugues",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Verbos: Presente, Passado e Futuro",
    "topic": "Modo Imperativo (Ordens e Instruções)",
    "question": "Em 'Feche a porta com cuidado!', o verbo está no modo:",
    "options": [
      "Imperativo (expressa ordem, pedido ou conselho)",
      "Indicativo",
      "Subjuntivo",
      "Infinitivo"
    ],
    "correctIndex": 0,
    "explanation": "O imperativo é usado para dar instruções, conselhos, pedidos ou ordens!"
  },
  {
    "id": "por_4_c2_15",
    "subject": "portugues",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Verbos: Presente, Passado e Futuro",
    "topic": "Conjugação do Verbo Estudar",
    "question": "Como conjugamos 'estudar' na 3ª pessoa do plural do presente ('Eles...')?",
    "options": [
      "Eles estudam",
      "Eles estuda",
      "Eles estudarei",
      "Eles estudavas"
    ],
    "correctIndex": 0,
    "explanation": "Eles estudam com dedicação todos os dias!"
  },
  {
    "id": "por_4_c3_01",
    "subject": "portugues",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Concordância Verbal e Nominal",
    "topic": "Concordância Verbal com Sujeito Plural",
    "question": "Complete corretamente: 'As alunas da escola _______ o projeto de ciências.'",
    "options": [
      "apresentaram",
      "apresentou",
      "apresentava",
      "apresentando"
    ],
    "correctIndex": 0,
    "explanation": "Sujeito no plural ('As alunas') exige o verbo flexionado no plural ('apresentaram')!"
  },
  {
    "id": "por_4_c3_02",
    "subject": "portugues",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Concordância Verbal e Nominal",
    "topic": "Concordância Nominal em Gênero e Número",
    "question": "Complete: 'Cecília comprou duas mochilas _______ para as aulas.'",
    "options": [
      "novas",
      "novo",
      "nova",
      "novos"
    ],
    "correctIndex": 0,
    "explanation": "Mochilas é feminino e plural, logo o adjetivo deve concordar em feminino e plural: novas!"
  },
  {
    "id": "por_4_c3_03",
    "subject": "portugues",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Concordância Verbal e Nominal",
    "topic": "Substantivo Coletivo e Verbo",
    "question": "Na frase 'A matilha de lobos _______ pela floresta', como fica o verbo?",
    "options": [
      "correu (no singular, concordando com o coletivo 'A matilha')",
      "correram",
      "corriam todos",
      "correndo"
    ],
    "correctIndex": 0,
    "explanation": "O núcleo do sujeito é o coletivo no singular 'A matilha', portanto o verbo fica no singular: correu!"
  },
  {
    "id": "por_4_c3_04",
    "subject": "portugues",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Concordância Verbal e Nominal",
    "topic": "Substantivo Coletivo: Peixes",
    "question": "Qual é o substantivo coletivo que representa um conjunto de muitos peixes juntos?",
    "options": [
      "Cardume",
      "Enxame",
      "Alcateia",
      "Manada"
    ],
    "correctIndex": 0,
    "explanation": "Cardume de peixes, enxame de abelhas, alcateia de lobos e manada de elefantes!"
  },
  {
    "id": "por_4_c3_05",
    "subject": "portugues",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Concordância Verbal e Nominal",
    "topic": "Coletivo de Livros",
    "question": "O substantivo coletivo de muitos livros organizados em prateleiras é:",
    "options": [
      "Biblioteca",
      "Pinacoteca",
      "Discoteca",
      "Hemeroteca"
    ],
    "correctIndex": 0,
    "explanation": "Biblioteca é o coletivo oficial de livros!"
  },
  {
    "id": "por_4_c3_06",
    "subject": "portugues",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Concordância Verbal e Nominal",
    "topic": "Sujeito Composto",
    "question": "Complete: 'Papai Carlos e Bianca _______ passear na praça da Vila.'",
    "options": [
      "foram",
      "foi",
      "ia",
      "indo"
    ],
    "correctIndex": 0,
    "explanation": "Sujeito composto ('Papai Carlos e Bianca' = Eles) exige o verbo no plural: foram!"
  },
  {
    "id": "por_4_c3_07",
    "subject": "portugues",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Concordância Verbal e Nominal",
    "topic": "Concordância com Pronome Nós",
    "question": "Qual frase está gramaticalmente CORRETA de acordo com a norma-padrão?",
    "options": [
      "Nós fomos ao parque zoológico",
      "Nós foi ao parque",
      "A gente fomos ao parque",
      "Nós vai ao parque"
    ],
    "correctIndex": 0,
    "explanation": "O pronome 'Nós' concorda com a 1ª pessoa do plural: 'Nós fomos'!"
  },
  {
    "id": "por_4_c3_08",
    "subject": "portugues",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Concordância Verbal e Nominal",
    "topic": "Gênero de Substantivos e Adjetivos",
    "question": "Em 'O dia e a noite estavam _______', o adjetivo concorda no masculino plural:",
    "options": [
      "frios",
      "frias",
      "fria",
      "frio"
    ],
    "correctIndex": 0,
    "explanation": "Quando há substantivos de gêneros diferentes (o dia = masc., a noite = fem.), o adjetivo vai para o masculino plural: frios!"
  },
  {
    "id": "por_4_c3_09",
    "subject": "portugues",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Concordância Verbal e Nominal",
    "topic": "Pronomes Possessivos",
    "question": "Na frase 'Cecília arrumou _______ quarto', qual pronome possessivo completa corretamente?",
    "options": [
      "seu",
      "nossos",
      "minhas",
      "suas"
    ],
    "correctIndex": 0,
    "explanation": "Quarto é masculino singular: 'seu quarto'!"
  },
  {
    "id": "por_4_c3_10",
    "subject": "portugues",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Concordância Verbal e Nominal",
    "topic": "Uso de 'Haver' no sentido de existir",
    "question": "Na frase '_______ muitos Pokémon raros na floresta', o verbo haver no presente fica:",
    "options": [
      "Há (no singular)",
      "Houveram",
      "Hão",
      "Havia-se"
    ],
    "correctIndex": 0,
    "explanation": "O verbo 'haver' no sentido de existir é impessoal e fica sempre no singular: Há muitos Pokémon!"
  },
  {
    "id": "por_4_c3_11",
    "subject": "portugues",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Concordância Verbal e Nominal",
    "topic": "Concordância com Bastante / Bastantes",
    "question": "Complete corretamente: 'As meninas comeram _______ frutas frescas.'",
    "options": [
      "bastantes (pois equivale a 'muitas')",
      "bastante apenas",
      "bastantíssima",
      "nenhuma"
    ],
    "correctIndex": 0,
    "explanation": "Quando 'bastante' funciona como adjetivo equivalendo a 'muitas', ele vai para o plural: bastantes frutas!"
  },
  {
    "id": "por_4_c3_12",
    "subject": "portugues",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Concordância Verbal e Nominal",
    "topic": "Substantivo Próprio e Comum",
    "question": "Em 'O professor Carvalho vive em Pallet', quais palavras são substantivos próprios?",
    "options": [
      "Carvalho e Pallet",
      "Professor e vive",
      "O e em",
      "Professor e Carvalho"
    ],
    "correctIndex": 0,
    "explanation": "Carvalho (nome de pessoa) e Pallet (nome de cidade) são nomes próprios particulares!"
  },
  {
    "id": "por_4_c3_13",
    "subject": "portugues",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Concordância Verbal e Nominal",
    "topic": "Concordância de Numeral com Substantivo",
    "question": "Como dizemos corretamente quando nos referimos a 200 folhas de papel (palavra feminina)?",
    "options": [
      "Duzentas folhas",
      "Duzentos folhas",
      "Dois centos folhas",
      "Dois centas"
    ],
    "correctIndex": 0,
    "explanation": "O numeral concorda em gênero com o substantivo feminino: duzentas folhas, trezentas páginas!"
  },
  {
    "id": "por_4_c3_14",
    "subject": "portugues",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Concordância Verbal e Nominal",
    "topic": "Grau do Substantivo: Aumentativo",
    "question": "Qual é o aumentativo correto de 'CASA'?",
    "options": [
      "Casarão",
      "Casinha",
      "Casarola",
      "Casebre"
    ],
    "correctIndex": 0,
    "explanation": "Casarão é o aumentativo regular de casa!"
  },
  {
    "id": "por_4_c3_15",
    "subject": "portugues",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Concordância Verbal e Nominal",
    "topic": "Concordância Verbal Perfeita",
    "question": "Qual frase respeita com perfeição a regra de concordância verbal?",
    "options": [
      "Os cientistas de Kanto descobriram novos fósseis",
      "Os cientistas de Kanto descobriu novos fósseis",
      "Os cientista de Kanto descobriram novos fósseis",
      "Os cientistas descobriu"
    ],
    "correctIndex": 0,
    "explanation": "O sujeito 'Os cientistas' concorda no plural com o verbo 'descobriram'!"
  },
  {
    "id": "por_4_c4_01",
    "subject": "portugues",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Acentuação: Oxítonas, Paroxítonas e Proparoxítonas",
    "topic": "Sílaba Tônica",
    "question": "O que é a SÍLABA TÔNICA de uma palavra?",
    "options": [
      "A sílaba pronunciada com mais força e intensidade na palavra",
      "A primeira sílaba de qualquer palavra",
      "A sílaba mais fraca que quase não ouvimos",
      "Uma sílaba que tem apenas consoantes"
    ],
    "correctIndex": 0,
    "explanation": "A sílaba tônica é pronunciada com maior ênfase sonora!"
  },
  {
    "id": "por_4_c4_02",
    "subject": "portugues",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Acentuação: Oxítonas, Paroxítonas e Proparoxítonas",
    "topic": "Oxítona",
    "question": "Uma palavra é OXÍTONA quando sua sílaba tônica (mais forte) é:",
    "options": [
      "A última sílaba (ex: café, jacaré, cipó)",
      "A penúltima sílaba",
      "A antepenúltima sílaba",
      "A primeira sílaba"
    ],
    "correctIndex": 0,
    "explanation": "Oxítonas têm o som mais forte na última sílaba: ca-FÉ, pa-RÁ!"
  },
  {
    "id": "por_4_c4_03",
    "subject": "portugues",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Acentuação: Oxítonas, Paroxítonas e Proparoxítonas",
    "topic": "Paroxítona",
    "question": "A palavra 'ÁRVORE' não é, mas 'MENINO' e 'LÁPIS' são PAROXÍTONAS porque a sílaba mais forte é:",
    "options": [
      "A penúltima sílaba",
      "A última sílaba",
      "A antepenúltima sílaba",
      "Todas as sílabas"
    ],
    "correctIndex": 0,
    "explanation": "Paroxítonas têm a sílaba forte na penúltima posição: me-NI-no, LÁ-pis!"
  },
  {
    "id": "por_4_c4_04",
    "subject": "portugues",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Acentuação: Oxítonas, Paroxítonas e Proparoxítonas",
    "topic": "Regra das Proparoxítonas",
    "question": "Qual é a regra geral e absoluta de acentuação para TODAS as palavras PROPAROXÍTONAS?",
    "options": [
      "Todas as proparoxítonas são obrigatoriamente acentuadas (ex: mágico, pássaro, lâmpada)",
      "Nenhuma proparoxítona pode ter acento",
      "Apenas as que terminam com a letra O",
      "Apenas se tiverem mais de 10 letras"
    ],
    "correctIndex": 0,
    "explanation": "Regra de ouro: toda e qualquer palavra proparoxítona na língua portuguesa é acentuada!"
  },
  {
    "id": "por_4_c4_05",
    "subject": "portugues",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Acentuação: Oxítonas, Paroxítonas e Proparoxítonas",
    "topic": "Identificação de Proparoxítona",
    "question": "Qual das seguintes palavras é classificada como PROPAROXÍTONA?",
    "options": [
      "MÁ-GI-CA",
      "CA-FÉ",
      "CADERNO",
      "JACARÉ"
    ],
    "correctIndex": 0,
    "explanation": "Em MÁ-gi-ca, a sílaba tônica é a antepenúltima (MÁ), logo é proparoxítona!"
  },
  {
    "id": "por_4_c4_06",
    "subject": "portugues",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Acentuação: Oxítonas, Paroxítonas e Proparoxítonas",
    "topic": "Acento Agudo vs Circunflexo",
    "question": "Qual a diferença de som entre o ACENTO AGUDO (´) e o ACENTO CIRCUNFLEXO (^)?",
    "options": [
      "O agudo indica som aberto (ex: avó, pé) e o circunflexo indica som fechado (ex: avô, você)",
      "Não há diferença de som",
      "O circunflexo só serve para consoantes",
      "O agudo é apenas para números"
    ],
    "correctIndex": 0,
    "explanation": "Acento agudo abre o timbre vocal (pé, cipó); circunflexo fecha o timbre (você, vovô)!"
  },
  {
    "id": "por_4_c4_07",
    "subject": "portugues",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Acentuação: Oxítonas, Paroxítonas e Proparoxítonas",
    "topic": "O Til (~)",
    "question": "O sinal de TIL (~) sobre as vogais A e O em palavras como 'MAÇÃ' e 'BALÃO' indica:",
    "options": [
      "Um som nasal pronunciado com ajuda do nariz",
      "Um som mudo",
      "Que a palavra está no plural",
      "Um acento de pontuação"
    ],
    "correctIndex": 0,
    "explanation": "O til não é acento de intensidade, mas um sinal de nasalidade da vogal!"
  },
  {
    "id": "por_4_c4_08",
    "subject": "portugues",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Acentuação: Oxítonas, Paroxítonas e Proparoxítonas",
    "topic": "Acentuação de Oxítonas em A, E, O",
    "question": "Por que as palavras 'SABERÁ', 'CAFÉ' e 'CIPÓ' levam acento gráfico?",
    "options": [
      "São oxítonas terminadas nas vogais A, E e O",
      "Porque são nomes de bichos",
      "Porque têm duas sílabas",
      "Porque começam com consoante"
    ],
    "correctIndex": 0,
    "explanation": "Oxítonas terminadas em A, E, O (seguidas ou não de S), e em -EM / -ENS são acentuadas!"
  },
  {
    "id": "por_4_c4_09",
    "subject": "portugues",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Acentuação: Oxítonas, Paroxítonas e Proparoxítonas",
    "topic": "Paroxítona Terminada em L, R, X, N",
    "question": "A palavra 'FÁCIL' é acentuada porque é uma paroxítona terminada em:",
    "options": [
      "L",
      "A",
      "O",
      "S"
    ],
    "correctIndex": 0,
    "explanation": "Paroxítonas terminadas em R, X, N, L (lembre da palavra RUXINOL) são acentuadas!"
  },
  {
    "id": "por_4_c4_10",
    "subject": "portugues",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Acentuação: Oxítonas, Paroxítonas e Proparoxítonas",
    "topic": "Monossílabo Tônico",
    "question": "Qual dos monossílabos abaixo deve receber acento agudo obrigatoriamente?",
    "options": [
      "PÉ",
      "De",
      "No",
      "Em"
    ],
    "correctIndex": 0,
    "explanation": "Monossílabos tônicos terminados em A, E, O recebem acento: pá, pé, pó!"
  },
  {
    "id": "por_4_c4_11",
    "subject": "portugues",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Acentuação: Oxítonas, Paroxítonas e Proparoxítonas",
    "topic": "Classificação da Palavra 'Médico'",
    "question": "A palavra 'MÉ-DI-CO' tem a sílaba tônica em MÉ. Ela é classificada como:",
    "options": [
      "Proparoxítona",
      "Paroxítona",
      "Oxítona",
      "Monossílaba"
    ],
    "correctIndex": 0,
    "explanation": "A antepenúltima sílaba é a mais forte: mé-di-co é proparoxítona!"
  },
  {
    "id": "por_4_c4_12",
    "subject": "portugues",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Acentuação: Oxítonas, Paroxítonas e Proparoxítonas",
    "topic": "Classificação da Palavra 'Amor'",
    "question": "Na palavra 'A-MOR', a sílaba mais forte é MOR. Ela é uma palavra:",
    "options": [
      "Oxítona (sem acento)",
      "Paroxítona",
      "Proparoxítona",
      "Tissílaba"
    ],
    "correctIndex": 0,
    "explanation": "Como a última sílaba é a tônica, é oxítona (oxítonas terminadas em R não levam acento)!"
  },
  {
    "id": "por_4_c4_13",
    "subject": "portugues",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Acentuação: Oxítonas, Paroxítonas e Proparoxítonas",
    "topic": "Palavra 'Relâmpago'",
    "question": "A palavra 'RE-LÂM-PA-GO' recebe acento circunflexo porque é:",
    "options": [
      "Uma proparoxítona com som fechado na antepenúltima sílaba",
      "Uma oxítona que rima com lago",
      "Uma palavra de origem indígena",
      "Um monossílabo"
    ],
    "correctIndex": 0,
    "explanation": "Re-LÂM-pa-go tem a antepenúltima sílaba tônica fechada, logo é proparoxítona!"
  },
  {
    "id": "por_4_c4_14",
    "subject": "portugues",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Acentuação: Oxítonas, Paroxítonas e Proparoxítonas",
    "topic": "Paroxítona em Ditongo",
    "question": "Palavras como 'HISTÓRIA' e 'MISTÉRIO' recebem acento porque são:",
    "options": [
      "Paroxítonas terminadas em ditongo crescente (-ia, -io)",
      "Oxítonas",
      "Proparoxítonas",
      "Monossílabas"
    ],
    "correctIndex": 0,
    "explanation": "Paroxítonas terminadas em ditongo oral são acentuadas: his-tó-ria, mis-té-rio!"
  },
  {
    "id": "por_4_c4_15",
    "subject": "portugues",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Acentuação: Oxítonas, Paroxítonas e Proparoxítonas",
    "topic": "Diferença de Sentido por Acento",
    "question": "Qual a diferença entre 'SABIA' (verbo saber), 'SABIÁ' (pássaro) e 'SÁBIA' (pessoa inteligente)?",
    "options": [
      "A posição da sílaba tônica muda completamente o significado da palavra",
      "Não há nenhuma diferença, significam a mesma coisa",
      "São formas erradas da mesma palavra",
      "Apenas o sabiá existe no dicionário"
    ],
    "correctIndex": 0,
    "explanation": "A tonicidade altera o sentido: sa-BI-a (paroxítona), sa-bi-Á (oxítona) e SÁ-bi-a (proparoxítona)!"
  },
  {
    "id": "cie_2_c1_01",
    "subject": "ciencias",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "As Partes do Corpo Humano e os 5 Sentidos",
    "topic": "Os 5 Sentidos: Visão",
    "question": "Qual órgão do corpo humano usamos para enxergar as cores brilhantes dos Pokémon?",
    "options": [
      "Olhos (visão)",
      "Ouvidos",
      "Nariz",
      "Língua"
    ],
    "correctIndex": 0,
    "explanation": "Os olhos são os órgãos responsáveis pelo sentido da visão!"
  },
  {
    "id": "cie_2_c1_02",
    "subject": "ciencias",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "As Partes do Corpo Humano e os 5 Sentidos",
    "topic": "Audição",
    "question": "Com qual órgão escutamos a música do jogo e a voz do Papai e da Mamãe?",
    "options": [
      "Orelhas / Ouvidos (audição)",
      "Olhos",
      "Pele",
      "Mãos"
    ],
    "correctIndex": 0,
    "explanation": "As orelhas captam as ondas sonoras através do sentido da audição!"
  },
  {
    "id": "cie_2_c1_03",
    "subject": "ciencias",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "As Partes do Corpo Humano e os 5 Sentidos",
    "topic": "Olfato",
    "question": "Qual órgão nos permite sentir o cheirinho gostoso de um bolo assando no forno?",
    "options": [
      "Nariz (olfato)",
      "Boca",
      "Dentes",
      "Unhas"
    ],
    "correctIndex": 0,
    "explanation": "O nariz é o órgão responsável pelo olfato!"
  },
  {
    "id": "cie_2_c1_04",
    "subject": "ciencias",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "As Partes do Corpo Humano e os 5 Sentidos",
    "topic": "Paladar / Gustação",
    "question": "Qual parte do corpo identifica se uma fruta é doce, azeda ou amarga?",
    "options": [
      "Língua (paladar)",
      "Bochechas",
      "Testa",
      "Cabelo"
    ],
    "correctIndex": 0,
    "explanation": "As papilas gustativas da língua sentem os sabores dos alimentos!"
  },
  {
    "id": "cie_2_c1_05",
    "subject": "ciencias",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "As Partes do Corpo Humano e os 5 Sentidos",
    "topic": "Tato",
    "question": "Através de qual parte que recobre todo o nosso corpo sentimos se algo é macio, áspero, quente ou frio?",
    "options": [
      "Pele (tato)",
      "Unhas",
      "Esqueleto",
      "Ossos"
    ],
    "correctIndex": 0,
    "explanation": "A pele é o maior órgão do corpo e nos permite sentir o tato!"
  },
  {
    "id": "cie_2_c1_06",
    "subject": "ciencias",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "As Partes do Corpo Humano e os 5 Sentidos",
    "topic": "Divisão do Corpo Humano",
    "question": "O corpo humano é dividido basicamente em três grandes partes principais:",
    "options": [
      "Cabeça, tronco e membros (braços e pernas)",
      "Cabelo, dentes e unhas",
      "Apenas ossos e sangue",
      "Olhos, nariz e boca"
    ],
    "correctIndex": 0,
    "explanation": "O corpo humano se organiza em cabeça, tronco e membros superiores e inferiores!"
  },
  {
    "id": "cie_2_c1_07",
    "subject": "ciencias",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "As Partes do Corpo Humano e os 5 Sentidos",
    "topic": "O Esqueleto",
    "question": "Qual é a função do conjunto de ossos (o esqueleto) dentro do nosso corpo?",
    "options": [
      "Sustentar nosso corpo e proteger órgãos internos importantes",
      "Fazer o corpo voar",
      "Guardar comida",
      "Iluminar o caminho"
    ],
    "correctIndex": 0,
    "explanation": "O esqueleto sustenta nossos músculos e protege o cérebro, coração e pulmões!"
  },
  {
    "id": "cie_2_c1_08",
    "subject": "ciencias",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "As Partes do Corpo Humano e os 5 Sentidos",
    "topic": "O Coração",
    "question": "O coração bate sem parar no peito para realizar qual função vital?",
    "options": [
      "Bombear o sangue para todas as partes do corpo",
      "Dormir à noite",
      "Produzir lágrimas",
      "Sentir o vento"
    ],
    "correctIndex": 0,
    "explanation": "O coração é um músculo forte que bombeia oxigênio e nutrientes no sangue!"
  },
  {
    "id": "cie_2_c1_09",
    "subject": "ciencias",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "As Partes do Corpo Humano e os 5 Sentidos",
    "topic": "Pulmões e Respiração",
    "question": "Quando puxamos o ar pelo nariz (inspiramos), para onde ele vai dentro do peito?",
    "options": [
      "Para os pulmões",
      "Para o estômago",
      "Para as pernas",
      "Para os olhos"
    ],
    "correctIndex": 0,
    "explanation": "Os pulmões absorvem o gás oxigênio do ar que respiramos!"
  },
  {
    "id": "cie_2_c1_10",
    "subject": "ciencias",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "As Partes do Corpo Humano e os 5 Sentidos",
    "topic": "Articulações / Dobradiças",
    "question": "Qual parte do corpo dobra o braço para que possamos levar o copo à boca?",
    "options": [
      "Cotovelo (articulação)",
      "Queixo",
      "Orelha",
      "Costela"
    ],
    "correctIndex": 0,
    "explanation": "As articulações como cotovelos e joelhos permitem que os ossos se dobrem!"
  },
  {
    "id": "cie_2_c1_11",
    "subject": "ciencias",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "As Partes do Corpo Humano e os 5 Sentidos",
    "topic": "Proteção dos Olhos",
    "question": "Qual parte do rosto ajuda a proteger os olhos contra poeira e suor?",
    "options": [
      "Pálpebras, cílios e sobrancelhas",
      "O queixo",
      "As bochechas",
      "O nariz"
    ],
    "correctIndex": 0,
    "explanation": "Cílios e pálpebras funcionam como escudos naturais que protegem os olhos!"
  },
  {
    "id": "cie_2_c1_12",
    "subject": "ciencias",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "As Partes do Corpo Humano e os 5 Sentidos",
    "topic": "Cuidado com o Sol",
    "question": "O que devemos passar na pele antes de brincar no sol para protegê-la de queimaduras?",
    "options": [
      "Protetor solar",
      "Tinta guache",
      "Açúcar",
      "Sabão em pó"
    ],
    "correctIndex": 0,
    "explanation": "O protetor solar protege a pele dos raios ultravioleta nocivos do sol!"
  },
  {
    "id": "cie_2_c1_13",
    "subject": "ciencias",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "As Partes do Corpo Humano e os 5 Sentidos",
    "topic": "Cuidado com os Ouvidos",
    "question": "Qual cuidado é essencial para proteger a nossa audição?",
    "options": [
      "Evitar ouvir fones de ouvido em volume muito alto",
      "Gritar no ouvido dos amigos",
      "Colocar pequenos objetos dentro do ouvido",
      "Não lavar as orelhas"
    ],
    "correctIndex": 0,
    "explanation": "Sons muito altos podem danificar o tímpano e prejudicar a audição para sempre!"
  },
  {
    "id": "cie_2_c1_14",
    "subject": "ciencias",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "As Partes do Corpo Humano e os 5 Sentidos",
    "topic": "Movimento dos Músculos",
    "question": "Para correr, pular e dançar, quais estruturas trabalham juntas com os ossos?",
    "options": [
      "Os músculos",
      "Apenas os cabelos",
      "Os sapatos",
      "O ar"
    ],
    "correctIndex": 0,
    "explanation": "Os músculos se contraem e puxam os ossos, permitindo todos os movimentos!"
  },
  {
    "id": "cie_2_c1_15",
    "subject": "ciencias",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "As Partes do Corpo Humano e os 5 Sentidos",
    "topic": "O Cérebro",
    "question": "Qual órgão protegido pelo crânio comanda todos os pensamentos, memórias e movimentos do corpo?",
    "options": [
      "Cérebro",
      "Fígado",
      "Pâncreas",
      "Dente"
    ],
    "correctIndex": 0,
    "explanation": "O cérebro é a central de comando de todo o nosso corpo!"
  },
  {
    "id": "cie_2_c2_01",
    "subject": "ciencias",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Hábitos de Higiene e Alimentação Saudável",
    "topic": "Lavar as Mãos",
    "question": "Por que devemos lavar as mãos com água e sabonete antes das refeições?",
    "options": [
      "Para remover germes e bactérias invisíveis",
      "Para a mão ficar cheirando a morango",
      "Para trocar a cor da pele",
      "Para não precisar comer salada"
    ],
    "correctIndex": 0,
    "explanation": "Lavar as mãos elimina vírus e bactérias que podem nos causar dor de barriga e doenças!"
  },
  {
    "id": "cie_2_c2_02",
    "subject": "ciencias",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Hábitos de Higiene e Alimentação Saudável",
    "topic": "Saúde Bucal",
    "question": "Quantas vezes ao dia, no mínimo, devemos escovar os dentes para evitar cáries?",
    "options": [
      "Pelo menos 3 vezes (após as refeições e antes de dormir)",
      "Uma vez por semana",
      "Apenas no dia do aniversário",
      "Nunca"
    ],
    "correctIndex": 0,
    "explanation": "A escovação regular após café, almoço e jantar previne tártaro e cáries dolorosas!"
  },
  {
    "id": "cie_2_c2_03",
    "subject": "ciencias",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Hábitos de Higiene e Alimentação Saudável",
    "topic": "Fio Dental",
    "question": "Por que usamos o fio dental além da escova de dentes?",
    "options": [
      "Para limpar a sujeirinha que fica presa no meio dos dentes onde a escova não alcança",
      "Para brincar de amarrar os dentes",
      "Para deixar o dente colorido",
      "Não serve para nada"
    ],
    "correctIndex": 0,
    "explanation": "O fio dental alcança os espaços estreitos entre os dentes, removendo restos de comida!"
  },
  {
    "id": "cie_2_c2_04",
    "subject": "ciencias",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Hábitos de Higiene e Alimentação Saudável",
    "topic": "Água Potável",
    "question": "Qual tipo de água é segura para beber e manter nosso corpo saudável?",
    "options": [
      "Água potável (filtrada ou fervida)",
      "Água barrenta da rua",
      "Água do mar salgada",
      "Água de poça de chuva"
    ],
    "correctIndex": 0,
    "explanation": "Água potável é limpa, tratada e livre de microrganismos prejudiciais à saúde!"
  },
  {
    "id": "cie_2_c2_05",
    "subject": "ciencias",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Hábitos de Higiene e Alimentação Saudável",
    "topic": "Prato Saudável e Colorido",
    "question": "Por que um prato de almoço saudável deve ser colorido com legumes e verduras?",
    "options": [
      "Porque cores diferentes fornecem vitaminas e minerais variados e necessários",
      "Para tirar fotos bonitas",
      "Porque prato branco dá azar",
      "Para parecer um doce"
    ],
    "correctIndex": 0,
    "explanation": "Cores diferentes (verde do brócolis, laranja da cenoura, vermelho do tomate) indicam vitaminas distintas!"
  },
  {
    "id": "cie_2_c2_06",
    "subject": "ciencias",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Hábitos de Higiene e Alimentação Saudável",
    "topic": "Origem do Leite",
    "question": "O leite gostoso que bebemos vem originalmente de qual animal mamífero da fazenda?",
    "options": [
      "Vaca",
      "Pato",
      "Galinha",
      "Peixe"
    ],
    "correctIndex": 0,
    "explanation": "As vacas são mamíferos que produzem leite rico em cálcio para os ossos!"
  },
  {
    "id": "cie_2_c2_07",
    "subject": "ciencias",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Hábitos de Higiene e Alimentação Saudável",
    "topic": "Importância do Sono",
    "question": "Por que dormir bem cerca de 8 a 10 horas por noite é fundamental para as crianças?",
    "options": [
      "Porque o corpo descansa e libera o hormônio do crescimento",
      "Para não precisar ir à escola",
      "Para sonhar com videogames o dia todo",
      "Dormir não faz diferença"
    ],
    "correctIndex": 0,
    "explanation": "Durante o sono profundo o corpo cresce, a memória se organiza e a energia se renova!"
  },
  {
    "id": "cie_2_c2_08",
    "subject": "ciencias",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Hábitos de Higiene e Alimentação Saudável",
    "topic": "Alimentos Ultraprocessados",
    "question": "Qual destes alimentos devemos consumir apenas de vez em quando por ter muito açúcar e gordura?",
    "options": [
      "Refrigerantes e salgadinhos de pacote",
      "Maçã fresca",
      "Arroz com feijão",
      "Suco natural de laranja"
    ],
    "correctIndex": 0,
    "explanation": "Ultraprocessados têm excesso de açúcar, corantes e sódio, devendo ser evitados no dia a dia!"
  },
  {
    "id": "cie_2_c2_09",
    "subject": "ciencias",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Hábitos de Higiene e Alimentação Saudável",
    "topic": "Lavar Frutas",
    "question": "O que devemos fazer com maçãs, uvas e morangos antes de comê-los?",
    "options": [
      "Lavar bem com água limpa corrente",
      "Comer direto da sacola com terra",
      "Passar sabão em pó",
      "Deixar no chão"
    ],
    "correctIndex": 0,
    "explanation": "Lavar as frutas remove poeira, sujeira e resíduos de defensivos agrícolas!"
  },
  {
    "id": "cie_2_c2_10",
    "subject": "ciencias",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Hábitos de Higiene e Alimentação Saudável",
    "topic": "Higiene das Unhas",
    "question": "Por que devemos manter as unhas cortadas e limpas?",
    "options": [
      "Para evitar o acúmulo de sujeira e germes embaixo das unhas",
      "Para não rasgar o cobertor",
      "Para correr mais rápido",
      "Apenas por vaidade"
    ],
    "correctIndex": 0,
    "explanation": "Unhas compridas acumulam micróbios que podem ser levados à boca e aos olhos!"
  },
  {
    "id": "cie_2_c2_11",
    "subject": "ciencias",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Hábitos de Higiene e Alimentação Saudável",
    "topic": "Importância da Água",
    "question": "O que devemos beber ao longo de todo o dia para manter o corpo hidratado e saudável?",
    "options": [
      "Bastante água limpa",
      "Apenas refrigerante doce",
      "Café quente",
      "Óleo de cozinha"
    ],
    "correctIndex": 0,
    "explanation": "Nosso corpo é formado em sua maior parte por água; beber água é essencial para todos os órgãos!"
  },
  {
    "id": "cie_2_c2_12",
    "subject": "ciencias",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Hábitos de Higiene e Alimentação Saudável",
    "topic": "Hábito do Banho",
    "question": "Qual é o principal benefício de tomar banho diariamente?",
    "options": [
      "Limpar a pele, retirar o suor e as impurezas do dia",
      "Gastar água da banheira",
      "Mudar o tamanho do corpo",
      "Não precisar pentear o cabelo"
    ],
    "correctIndex": 0,
    "explanation": "O banho higieniza a pele, renova as energias e previne infecções dermatológicas!"
  },
  {
    "id": "cie_2_c2_13",
    "subject": "ciencias",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Hábitos de Higiene e Alimentação Saudável",
    "topic": "Alimentos de Origem Vegetal",
    "question": "Qual alimento abaixo tem ORIGEM VEGETAL (vem de plantas)?",
    "options": [
      "Banana",
      "Queijo de vaca",
      "Ovo de galinha",
      "Bife de carne"
    ],
    "correctIndex": 0,
    "explanation": "Frutas, verduras, grãos e legumes são alimentos de origem vegetal!"
  },
  {
    "id": "cie_2_c2_14",
    "subject": "ciencias",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Hábitos de Higiene e Alimentação Saudável",
    "topic": "Atividade Física",
    "question": "Brincar ao ar livre, correr e andar de bicicleta ajudam nosso corpo a quê?",
    "options": [
      "Fortalecer os ossos, o coração e manter a saúde alegre",
      "Ficar com preguiça",
      "Enfraquecer as pernas",
      "Dormir durante o dia inteiro"
    ],
    "correctIndex": 0,
    "explanation": "Praticar exercícios físicos faz bem para o coração, pulmões, músculos e para o bom humor!"
  },
  {
    "id": "cie_2_c2_15",
    "subject": "ciencias",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Hábitos de Higiene e Alimentação Saudável",
    "topic": "Cuidado ao Tossir e Espirrar",
    "question": "Ao tossir ou espirrar perto de outras pessoas, qual atitude correta devemos ter?",
    "options": [
      "Cobrir o nariz e a boca com a parte interna do cotovelo ou lenço descartável",
      "Espirrar bem na direção do rosto do amigo",
      "Gritar bem alto",
      "Não fazer nada"
    ],
    "correctIndex": 0,
    "explanation": "Cobrir com o antebraço evita espalhar gotículas de saliva no ar e protege as pessoas!"
  },
  {
    "id": "cie_2_c3_01",
    "subject": "ciencias",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "As Plantas e seu Ciclo de Vida",
    "topic": "Partes da Planta: Raiz",
    "question": "Qual parte da planta fica embaixo da terra, absorvendo água e sais minerais do solo?",
    "options": [
      "Raiz",
      "Flor",
      "Fruto",
      "Folha"
    ],
    "correctIndex": 0,
    "explanation": "A raiz fixa a planta no solo e absorve água e nutrientes!"
  },
  {
    "id": "cie_2_c3_02",
    "subject": "ciencias",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "As Plantas e seu Ciclo de Vida",
    "topic": "Caule / Tronco",
    "question": "Qual parte da planta sustenta as folhas e os galhos e transporta a seiva?",
    "options": [
      "Caule ou tronco",
      "Semente",
      "Raiz",
      "Pétala"
    ],
    "correctIndex": 0,
    "explanation": "O caule sustenta a copa e conduz água da raiz até as folhas!"
  },
  {
    "id": "cie_2_c3_03",
    "subject": "ciencias",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "As Plantas e seu Ciclo de Vida",
    "topic": "Folhas e Respiração",
    "question": "Em qual parte da planta ocorre a produção do seu próprio alimento com ajuda da luz do sol?",
    "options": [
      "Folhas (fotossíntese)",
      "Raízes",
      "Casca",
      "Espinhos"
    ],
    "correctIndex": 0,
    "explanation": "As folhas contêm clorofila e realizam fotossíntese para alimentar o vegetal!"
  },
  {
    "id": "cie_2_c3_04",
    "subject": "ciencias",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "As Plantas e seu Ciclo de Vida",
    "topic": "Germinação",
    "question": "Do que uma sementinha precisa para germinar e crescer saudável em um vasinho?",
    "options": [
      "Água, terra fértil e luz do sol",
      "Refrigerante e sal",
      "Ficar trancada no armário escuro",
      "Tinta colorida"
    ],
    "correctIndex": 0,
    "explanation": "As sementes precisam de umidade, oxigênio, nutrientes e luz solar para brotar!"
  },
  {
    "id": "cie_2_c3_05",
    "subject": "ciencias",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "As Plantas e seu Ciclo de Vida",
    "topic": "As Flores",
    "question": "Qual é a função das flores coloridas na maioria das plantas?",
    "options": [
      "Reprodução e formação de frutos e sementes",
      "Apenas enfeitar o jardim",
      "Fazer sombra para as formigas",
      "Não têm função"
    ],
    "correctIndex": 0,
    "explanation": "As flores atraem polinizadores e dão origem aos frutos com sementes!"
  },
  {
    "id": "cie_2_c3_06",
    "subject": "ciencias",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "As Plantas e seu Ciclo de Vida",
    "topic": "Os Frutos",
    "question": "O fruto de uma árvore serve para proteger o quê em seu interior?",
    "options": [
      "As sementes",
      "As raízes",
      "As folhas",
      "A água da chuva"
    ],
    "correctIndex": 0,
    "explanation": "O fruto protege as sementes e atrai animais para espalhá-las na natureza!"
  },
  {
    "id": "cie_2_c3_07",
    "subject": "ciencias",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "As Plantas e seu Ciclo de Vida",
    "topic": "Polinização",
    "question": "Qual inseto listrado viaja de flor em flor recolhendo néctar e espalhando pólen?",
    "options": [
      "Abelha",
      "Mosquito",
      "Grilo",
      "Barata"
    ],
    "correctIndex": 0,
    "explanation": "As abelhas realizam a polinização indispensável para a agricultura e flora!"
  },
  {
    "id": "cie_2_c3_08",
    "subject": "ciencias",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "As Plantas e seu Ciclo de Vida",
    "topic": "Plantas que comemos: Raízes",
    "question": "Qual destes alimentos que comemos é uma RAIZ vegetal nutritiva?",
    "options": [
      "Cenoura",
      "Maçã",
      "Tomate",
      "Alface"
    ],
    "correctIndex": 0,
    "explanation": "Cenoura, beterraba e mandioca são raízes que acumulam nutrientes!"
  },
  {
    "id": "cie_2_c3_09",
    "subject": "ciencias",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "As Plantas e seu Ciclo de Vida",
    "topic": "Plantas que comemos: Folhas",
    "question": "Qual destes vegetais comemos as FOLHAS verdes na salada?",
    "options": [
      "Alface",
      "Batata",
      "Cenoura",
      "Laranja"
    ],
    "correctIndex": 0,
    "explanation": "Alface, espinafre, rúcula e couve são folhas comestíveis!"
  },
  {
    "id": "cie_2_c3_10",
    "subject": "ciencias",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "As Plantas e seu Ciclo de Vida",
    "topic": "Plantas Aquáticas",
    "question": "A Vitória-Régia é uma planta famosa por viver em qual ambiente?",
    "options": [
      "Na água de rios e lagos (planta aquática)",
      "No topo de montanhas de gelo",
      "No deserto seco",
      "Dentro de cavernas escuras"
    ],
    "correctIndex": 0,
    "explanation": "A Vitória-Régia flutua nas águas tranquilas dos rios da Amazônia!"
  },
  {
    "id": "cie_2_c3_11",
    "subject": "ciencias",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "As Plantas e seu Ciclo de Vida",
    "topic": "Cactos e o Deserto",
    "question": "Como o cacto consegue viver em locais muito secos onde quase não chove?",
    "options": [
      "Armazena água em seu caule gordinho e tem espinhos para não perder umidade",
      "Toma refrigerante à noite",
      "Vai nadar no rio",
      "Ele não precisa de água nenhuma"
    ],
    "correctIndex": 0,
    "explanation": "O cacto é adaptado à aridez: guarda água e transforma folhas em espinhos protetores!"
  },
  {
    "id": "cie_2_c3_12",
    "subject": "ciencias",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "As Plantas e seu Ciclo de Vida",
    "topic": "Plantas e Oxigênio",
    "question": "O que as árvores e plantas produzem e liberam no ar durante o dia, ajudando a nossa respiração?",
    "options": [
      "Gás Oxigênio puro",
      "Fumaça preta",
      "Poeira",
      "Vapor de plástico"
    ],
    "correctIndex": 0,
    "explanation": "Durante a fotossíntese, as plantas liberam oxigênio essencial para todos os seres vivos!"
  },
  {
    "id": "cie_2_c3_13",
    "subject": "ciencias",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "As Plantas e seu Ciclo de Vida",
    "topic": "Ciclo de Vida",
    "question": "Qual é a ordem correta das fases da vida de uma plantinha?",
    "options": [
      "Nasce (germina), cresce, reproduz-se (dá flores/frutos) e morre",
      "Morre primeiro, depois nasce",
      "Nunca cresce nem muda",
      "Vira pedra"
    ],
    "correctIndex": 0,
    "explanation": "As plantas são seres vivos: nascem, crescem, reproduzem-se e completam seu ciclo natural!"
  },
  {
    "id": "cie_2_c3_14",
    "subject": "ciencias",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "As Plantas e seu Ciclo de Vida",
    "topic": "Dispersão das Sementes",
    "question": "Como as sementes do dente-de-leão viajam para longe para nascer em novos lugares?",
    "options": [
      "Voando levadas pelo vento",
      "Comprando passagem de trem",
      "Navegando em barcos",
      "Ficam sempre no mesmo chão"
    ],
    "correctIndex": 0,
    "explanation": "O vento sopra as sementinhas leves com penugem e espalha a planta pelo campo!"
  },
  {
    "id": "cie_2_c3_15",
    "subject": "ciencias",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "As Plantas e seu Ciclo de Vida",
    "topic": "Cuidado com as Plantas da Casa",
    "question": "O que Bianca deve fazer para que a plantinha do seu vasinho continue verde e bonita?",
    "options": [
      "Regar com água na quantidade certa e colocá-la em local iluminado",
      "Trancá-la em uma gaveta sem luz",
      "Colocar sal de cozinha na terra",
      "Arrancar todas as folhas"
    ],
    "correctIndex": 0,
    "explanation": "Plantas precisam de rega moderada, luz do sol e terra com nutrientes para viver bem!"
  },
  {
    "id": "cie_2_c4_01",
    "subject": "ciencias",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Animais de Estimação e Animais Silvestres",
    "topic": "Animais Domésticos",
    "question": "Qual destes animais é DOMÉSTICO e convive com carinho com as pessoas em casa?",
    "options": [
      "Cachorro",
      "Onça-pintada",
      "Jacaré",
      "Leão"
    ],
    "correctIndex": 0,
    "explanation": "Cachorros e gatos foram domesticados e vivem em harmonia com as famílias humanas!"
  },
  {
    "id": "cie_2_c4_02",
    "subject": "ciencias",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Animais de Estimação e Animais Silvestres",
    "topic": "Animais Silvestres",
    "question": "O que é um ANIMAL SILVESTRE?",
    "options": [
      "Um animal que vive livremente na natureza em seu habitat e não deve ser engaiolado",
      "Um animal de pelúcia",
      "Um robô de brinquedo",
      "Um animal que usa coleira no shopping"
    ],
    "correctIndex": 0,
    "explanation": "Animais silvestres pertencem à natureza (como araras, macacos e lobos) e não devem ser tirados da mata!"
  },
  {
    "id": "cie_2_c4_03",
    "subject": "ciencias",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Animais de Estimação e Animais Silvestres",
    "topic": "Cobertura do Corpo: Penas",
    "question": "Qual classe de animais possui o corpo coberto de PENAS e bico?",
    "options": [
      "Aves",
      "Mamíferos",
      "Peixes",
      "Répteis"
    ],
    "correctIndex": 0,
    "explanation": "As aves possuem penas que ajudam no voo e mantêm a temperatura do corpo!"
  },
  {
    "id": "cie_2_c4_04",
    "subject": "ciencias",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Animais de Estimação e Animais Silvestres",
    "topic": "Cobertura do Corpo: Pelos",
    "question": "Cães, gatos e ursos têm o corpo coberto por quê?",
    "options": [
      "Pelos",
      "Escamas",
      "Penas",
      "Casca dura"
    ],
    "correctIndex": 0,
    "explanation": "Mamíferos têm pelos que protegem a pele contra o frio e arranhões!"
  },
  {
    "id": "cie_2_c4_05",
    "subject": "ciencias",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Animais de Estimação e Animais Silvestres",
    "topic": "Cobertura do Corpo: Escamas",
    "question": "Os peixes e as serpentes possuem o corpo coberto por:",
    "options": [
      "Escamas",
      "Lã",
      "Penas macias",
      "Tecido"
    ],
    "correctIndex": 0,
    "explanation": "Escamas protegem a pele dos peixes na água e dos répteis na terra!"
  },
  {
    "id": "cie_2_c4_06",
    "subject": "ciencias",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Animais de Estimação e Animais Silvestres",
    "topic": "Mamíferos e Amamentação",
    "question": "Como os filhotes de mamíferos se alimentam logo depois que nascem?",
    "options": [
      "Mamam o leite produzido pela mãe",
      "Comem pedras",
      "Bebem água com sal",
      "Comem folhas secas"
    ],
    "correctIndex": 0,
    "explanation": "Mamíferos são chamados assim porque as mães produzem leite em suas glândulas mamárias!"
  },
  {
    "id": "cie_2_c4_07",
    "subject": "ciencias",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Animais de Estimação e Animais Silvestres",
    "topic": "Animais Ovíparos",
    "question": "Animais que colocam OVOS para que seus filhotes nasçam são chamados de:",
    "options": [
      "Ovíparos",
      "Vivíparos",
      "Herbívoros",
      "Aquáticos"
    ],
    "correctIndex": 0,
    "explanation": "Galinhas, tartarugas, jacarés e pássaros são animais ovíparos!"
  },
  {
    "id": "cie_2_c4_08",
    "subject": "ciencias",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Animais de Estimação e Animais Silvestres",
    "topic": "Animais Vivíparos",
    "question": "Animais cujos filhotes se desenvolvem DENTRO da barriga da mãe são chamados de:",
    "options": [
      "Vivíparos",
      "Ovíparos",
      "Invertebrados",
      "Fósseis"
    ],
    "correctIndex": 0,
    "explanation": "Seres humanos, cachorros, gatos e cavalos são vivíparos!"
  },
  {
    "id": "cie_2_c4_09",
    "subject": "ciencias",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Animais de Estimação e Animais Silvestres",
    "topic": "Alimentação: Herbívoro",
    "question": "Um coelhinho que se alimenta de cenoura, folhas e verduras é chamado de:",
    "options": [
      "Herbívoro",
      "Carnívoro",
      "Insetívoro",
      "Piscívoro"
    ],
    "correctIndex": 0,
    "explanation": "Animais que comem vegetais e plantas são herbívoros!"
  },
  {
    "id": "cie_2_c4_10",
    "subject": "ciencias",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Animais de Estimação e Animais Silvestres",
    "topic": "Alimentação: Carnívoro",
    "question": "Um leão ou tubarão que caça e se alimenta da carne de outros animais é:",
    "options": [
      "Carnívoro",
      "Herbívoro",
      "Frutífero",
      "Vegetal"
    ],
    "correctIndex": 0,
    "explanation": "Animais que se alimentam de outros animais são carnívoros!"
  },
  {
    "id": "cie_2_c4_11",
    "subject": "ciencias",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Animais de Estimação e Animais Silvestres",
    "topic": "Alimentação: Onívoro",
    "question": "Animais que comem tanto vegetais quanto carnes (como nós, seres humanos) são chamados de:",
    "options": [
      "Onívoros",
      "Herbívoros apenas",
      "Detritívoros",
      "Minerais"
    ],
    "correctIndex": 0,
    "explanation": "Seres humanos, porcos e ursos são onívoros porque comem plantas e carnes!"
  },
  {
    "id": "cie_2_c4_12",
    "subject": "ciencias",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Animais de Estimação e Animais Silvestres",
    "topic": "Locomoção dos Animais",
    "question": "Qual animal abaixo NÃO tem patas e se locomove rastejando pelo chão?",
    "options": [
      "Serpente / Cobra",
      "Cachorro",
      "Cavalo",
      "Pato"
    ],
    "correctIndex": 0,
    "explanation": "As serpentes rastejam utilizando os músculos do corpo e as escamas ventrais!"
  },
  {
    "id": "cie_2_c4_13",
    "subject": "ciencias",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Animais de Estimação e Animais Silvestres",
    "topic": "Ambiente Aquático vs Terrestre",
    "question": "O golfinho é um animal que vive no mar. Ele é um animal:",
    "options": [
      "Aquático",
      "Terrestre",
      "Aéreo de penas",
      "Subterrâneo seco"
    ],
    "correctIndex": 0,
    "explanation": "Animais que vivem na água de rios ou mares são animais aquáticos!"
  },
  {
    "id": "cie_2_c4_14",
    "subject": "ciencias",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Animais de Estimação e Animais Silvestres",
    "topic": "Vacinação dos Pets",
    "question": "Por que devemos levar o cãozinho e o gatinho ao veterinário para tomar vacinas?",
    "options": [
      "Para protegê-los de doenças perigosas como a raiva e manter a família saudável",
      "Para eles mudarem de cor",
      "Para aprenderem a falar",
      "Apenas para passear de carro"
    ],
    "correctIndex": 0,
    "explanation": "Vacinar os animais de estimação previne doenças e protege toda a família!"
  },
  {
    "id": "cie_2_c4_15",
    "subject": "ciencias",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Animais de Estimação e Animais Silvestres",
    "topic": "Respeito e Proteção Animal",
    "question": "O que NUNCA devemos fazer com animais de estimação ou animais da natureza?",
    "options": [
      "Maltratar, bater, abandonar ou mantê-los presos sem água e comida",
      "Dar carinho e alimentos saudáveis",
      "Levar para passear com coleira",
      "Cuidar quando estão doentes"
    ],
    "correctIndex": 0,
    "explanation": "Maus-tratos a animais é crime; devemos sempre tratar todos os seres vivos com respeito e amor!"
  },
  {
    "id": "cie_4_c1_01",
    "subject": "ciencias",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Microrganismos: Vírus, Bactérias e Fungos",
    "topic": "Diferença entre Bactérias e Vírus",
    "question": "Qual é a diferença biológica fundamental entre bactérias e vírus?",
    "options": [
      "Bactérias são células vivas autônomas; vírus são acelulares e precisam invadir uma célula hospedeira para se multiplicar",
      "Vírus são maiores que elefantes",
      "Bactérias só vivem no congelador",
      "Não há nenhuma diferença, são idênticos"
    ],
    "correctIndex": 0,
    "explanation": "Bactérias têm metabolismo próprio e estrutura celular; vírus dependem obrigatoriamente da maquinaria celular de um hospedeiro!"
  },
  {
    "id": "cie_4_c1_02",
    "subject": "ciencias",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Microrganismos: Vírus, Bactérias e Fungos",
    "topic": "Fungos e Leveduras",
    "question": "Qual microrganismo (fungo unicelular) é usado na culinária para fazer a massa do pão crescer e ficar fofa?",
    "options": [
      "Levedura (fermento biológico)",
      "Bactéria do tétano",
      "Vírus da gripe",
      "Protozoário de lago"
    ],
    "correctIndex": 0,
    "explanation": "A levedura fermenta os açúcares da farinha, liberando gás carbônico que expande a massa do pão!"
  },
  {
    "id": "cie_4_c1_03",
    "subject": "ciencias",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Microrganismos: Vírus, Bactérias e Fungos",
    "topic": "Bactérias Benéficas",
    "question": "Onde encontramos bactérias benéficas que ajudam na digestão dos alimentos em nosso corpo?",
    "options": [
      "Na microbiota do intestino",
      "Nos dentes cariados",
      "No cabelo",
      "Nas unhas"
    ],
    "correctIndex": 0,
    "explanation": "A flora intestinal é composta por trilhões de bactérias úteis que auxiliam na digestão e produzem vitaminas!"
  },
  {
    "id": "cie_4_c1_04",
    "subject": "ciencias",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Microrganismos: Vírus, Bactérias e Fungos",
    "topic": "Produção de Iogurte e Queijo",
    "question": "Quais microrganismos transformam o leite fresco em iogurte e queijo pela fermentação láctica?",
    "options": [
      "Lactobacilos (bactérias lácticas)",
      "Vírus da dengue",
      "Mofo verde",
      "Algas vermelhas"
    ],
    "correctIndex": 0,
    "explanation": "Os lactobacilos fermentam a lactose do leite, produzindo ácido láctico que coagula o iogurte!"
  },
  {
    "id": "cie_4_c1_05",
    "subject": "ciencias",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Microrganismos: Vírus, Bactérias e Fungos",
    "topic": "Visualização com Microscópio",
    "question": "Qual instrumento óptico com lentes de aumento de alta precisão é necessário para enxergar microrganismos?",
    "options": [
      "Microscópio",
      "Telescópio",
      "Lupa de mão comum",
      "Binóculo"
    ],
    "correctIndex": 0,
    "explanation": "O microscópio amplia a imagem centenas ou milhares de vezes, permitindo ver bactérias e células!"
  },
  {
    "id": "cie_4_c1_06",
    "subject": "ciencias",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Microrganismos: Vírus, Bactérias e Fungos",
    "topic": "Bolor e Mofo",
    "question": "Aquele pó esverdeado ou esbranquiçado que aparece em um pão velho deixado no armário úmido é:",
    "options": [
      "Um fungo pluricelular (bolor ou mofo)",
      "Poeira de giz",
      "Açúcar cristalizado",
      "Tinta de parede"
    ],
    "correctIndex": 0,
    "explanation": "O bolor é uma colônia de fungos filamentosos que se alimentam da matéria orgânica em decomposição!"
  },
  {
    "id": "cie_4_c1_07",
    "subject": "ciencias",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Microrganismos: Vírus, Bactérias e Fungos",
    "topic": "Penicilina (O Primeiro Antibiótico)",
    "question": "O primeiro antibiótico que salvou milhões de vidas humanas foi descoberto a partir de qual microrganismo?",
    "options": [
      "O fungo Penicillium",
      "Uma bactéria marinha",
      "Um vírus vegetal",
      "Uma alga de rio"
    ],
    "correctIndex": 0,
    "explanation": "Alexander Fleming descobriu a penicilina observando que o fungo Penicillium impedia o crescimento de bactérias!"
  },
  {
    "id": "cie_4_c1_08",
    "subject": "ciencias",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Microrganismos: Vírus, Bactérias e Fungos",
    "topic": "Protozoários",
    "question": "Protozoários como a ameba e o paramécio são seres que vivem principalmente em qual ambiente?",
    "options": [
      "Ambientes aquáticos ou úmidos",
      "No vácuo do espaço",
      "Dentro de pedras de gelo seco",
      "No fogo"
    ],
    "correctIndex": 0,
    "explanation": "Protozoários são eucariontes unicelulares encontrados em poças, lagos, mares e solo úmido!"
  },
  {
    "id": "cie_4_c1_09",
    "subject": "ciencias",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Microrganismos: Vírus, Bactérias e Fungos",
    "topic": "Cogumelos",
    "question": "Os cogumelos que brotam no solo da floresta pertencem a qual reino de seres vivos?",
    "options": [
      "Reino Fungi (Fungos)",
      "Reino Vegetal (Plantas)",
      "Reino Animal",
      "Reino Mineral"
    ],
    "correctIndex": 0,
    "explanation": "Cogumelos não são plantas (não fazem fotossíntese); são corpos de frutificação de fungos!"
  },
  {
    "id": "cie_4_c1_10",
    "subject": "ciencias",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Microrganismos: Vírus, Bactérias e Fungos",
    "topic": "Decomposição Natural",
    "question": "O que aconteceria com as folhas secas e galhos caídos na floresta se não existissem fungos e bactérias?",
    "options": [
      "Acumulariam-se para sempre sem apodrecer, esgotando os nutrientes do solo",
      "As folhas virariam água doce",
      "As árvores cresceriam mais rápido",
      "Não faria diferença"
    ],
    "correctIndex": 0,
    "explanation": "Sem decompositores, os nutrientes ficariam presos nos restos mortos e a vida na Terra cessaria!"
  },
  {
    "id": "cie_4_c1_11",
    "subject": "ciencias",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Microrganismos: Vírus, Bactérias e Fungos",
    "topic": "Antibióticos",
    "question": "Os remédios chamados ANTIBIÓTICOS servem para combater infecções causadas por:",
    "options": [
      "Bactérias",
      "Vírus da gripe",
      "Falta de sono",
      "Picada de abelha"
    ],
    "correctIndex": 0,
    "explanation": "Antibióticos atacam apenas bactérias; eles não têm nenhum efeito contra vírus como gripe ou resfriado!"
  },
  {
    "id": "cie_4_c1_12",
    "subject": "ciencias",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Microrganismos: Vírus, Bactérias e Fungos",
    "topic": "Vírus da Dengue",
    "question": "Qual mosquito transmite o vírus da dengue quando pica uma pessoa?",
    "options": [
      "Aedes aegypti",
      "Mosca doméstica",
      "Besouro rola-bosta",
      "Joaninha"
    ],
    "correctIndex": 0,
    "explanation": "A fêmea do mosquito Aedes aegypti transmite os vírus da dengue, zika e chikungunya!"
  },
  {
    "id": "cie_4_c1_13",
    "subject": "ciencias",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Microrganismos: Vírus, Bactérias e Fungos",
    "topic": "Pasteurização",
    "question": "O processo de aquecer o leite a alta temperatura e depois resfriá-lo rapidamente para matar micróbios chama-se:",
    "options": [
      "Pasteurização (criada por Louis Pasteur)",
      "Congelamento",
      "Fermentação",
      "Filtração simples"
    ],
    "correctIndex": 0,
    "explanation": "A pasteurização elimina bactérias patogênicas sem alterar o sabor e valor nutritivo dos alimentos!"
  },
  {
    "id": "cie_4_c1_14",
    "subject": "ciencias",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Microrganismos: Vírus, Bactérias e Fungos",
    "topic": "Alimentos Fermentados",
    "question": "Qual dos alimentos abaixo é produzido pela ação de microrganismos fermentadores?",
    "options": [
      "Queijo e pão",
      "Água mineral",
      "Sal de cozinha",
      "Açúcar refinado"
    ],
    "correctIndex": 0,
    "explanation": "Queijos, iogurtes, pães, vinagres e conservas dependem da fermentação por bactérias ou fungos!"
  },
  {
    "id": "cie_4_c1_15",
    "subject": "ciencias",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Microrganismos: Vírus, Bactérias e Fungos",
    "topic": "Formas das Bactérias",
    "question": "As bactérias em formato arredondado de bolinha são chamadas pela ciência de:",
    "options": [
      "Cocos",
      "Bastonetes ou bacilos",
      "Espirilos",
      "Vírus"
    ],
    "correctIndex": 0,
    "explanation": "Bactérias esféricas são cocos; as em forma de bastão são bacilos; e as onduladas são espirilos!"
  },
  {
    "id": "cie_4_c2_01",
    "subject": "ciencias",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Vacinas, Saúde e Medidas Preventivas",
    "topic": "Mecanismo das Vacinas",
    "question": "Como as vacinas protegem nosso organismo contra doenças antes de ficarmos doentes?",
    "options": [
      "Apresentam fragmentos inofensivos do micróbio para o sistema imune produzir anticorpos de memória",
      "Matam germes com choque elétrico",
      "Fazem o sangue virar remédio líquido",
      "Servem apenas como analgésico para dor de cabeça"
    ],
    "correctIndex": 0,
    "explanation": "Vacinas treinam nossos glóbulos brancos para criar anticorpos que combatem o vírus caso ele tente invadir o corpo!"
  },
  {
    "id": "cie_4_c2_02",
    "subject": "ciencias",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Vacinas, Saúde e Medidas Preventivas",
    "topic": "Anticorpos",
    "question": "O que são ANTICORPOS produzidos pelos glóbulos brancos do nosso sangue?",
    "options": [
      "Proteínas de defesa especializadas em neutralizar agentes invasores específicos",
      "Células que transportam oxigênio",
      "Pedaços de ossos",
      "Gotas de suor"
    ],
    "correctIndex": 0,
    "explanation": "Anticorpos são os soldados químicos de defesa produzidos pelo sistema imunológico!"
  },
  {
    "id": "cie_4_c2_03",
    "subject": "ciencias",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Vacinas, Saúde e Medidas Preventivas",
    "topic": "Imunidade Coletiva / Rebanho",
    "question": "Por que quando a maioria das crianças de uma escola se vacina, até quem não pôde tomar fica protegido?",
    "options": [
      "Porque o vírus não encontra hospedeiros para circular e transmitir (imunidade de rebanho)",
      "Porque o ar da escola fica desinfetado com laser",
      "Porque a vacina passa pelo ar",
      "Não faz diferença coletiva"
    ],
    "correctIndex": 0,
    "explanation": "A alta taxa de vacinação bloqueia a circulação comunitária de vírus e bactérias!"
  },
  {
    "id": "cie_4_c2_04",
    "subject": "ciencias",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Vacinas, Saúde e Medidas Preventivas",
    "topic": "Saneamento Básico",
    "question": "Qual conjunto de serviços públicos é fundamental para evitar cólera, leptospirose e verminoses na cidade?",
    "options": [
      "Saneamento básico (água tratada, coleta de esgoto e lixo)",
      "Lojas de brinquedos",
      "Cinemas e teatros",
      "Postos de gasolina"
    ],
    "correctIndex": 0,
    "explanation": "Água tratada e rede de esgoto evitam que fezes e bactérias contaminem os mananciais e a população!"
  },
  {
    "id": "cie_4_c2_05",
    "subject": "ciencias",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Vacinas, Saúde e Medidas Preventivas",
    "topic": "Prevenção da Dengue",
    "question": "Qual medida prática em casa impede a reprodução do mosquito da dengue?",
    "options": [
      "Eliminar pratinhos de plantas com água parada e cobrir caixas-d'água",
      "Deixar baldes de água aberta no quintal",
      "Jogar pneus velhos na chuva",
      "Não fechar as janelas"
    ],
    "correctIndex": 0,
    "explanation": "O mosquito deposita ovos em água limpa e parada; eliminar criadouros interrompe o ciclo do inseto!"
  },
  {
    "id": "cie_4_c2_06",
    "subject": "ciencias",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Vacinas, Saúde e Medidas Preventivas",
    "topic": "Soro vs Vacina",
    "question": "Se alguém for picado por uma cobra venenosa, qual substância médica de ação imediata com anticorpos prontos deve receber?",
    "options": [
      "Soro antiofídico",
      "Vacina contra gripe",
      "Comprimido de vitamina C",
      "Água com açúcar"
    ],
    "correctIndex": 0,
    "explanation": "Soros contêm anticorpos prontos para ação emergencial imediata contra toxinas e venenos!"
  },
  {
    "id": "cie_4_c2_07",
    "subject": "ciencias",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Vacinas, Saúde e Medidas Preventivas",
    "topic": "Erradicação da Varíola",
    "question": "Graças à vacinação global promovida pela medicina, qual doença gravíssima foi 100% erradicada do planeta?",
    "options": [
      "Varíola humana",
      "Gripe comum",
      "Dor de dente",
      "Dor de barriga"
    ],
    "correctIndex": 0,
    "explanation": "A varíola foi completamente eliminada da humanidade na década de 1970 através de campanhas mundiais de vacina!"
  },
  {
    "id": "cie_4_c2_08",
    "subject": "ciencias",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Vacinas, Saúde e Medidas Preventivas",
    "topic": "Caderneta de Vacinação",
    "question": "Por que as famílias devem guardar e manter em dia a Caderneta de Vacinação dos filhos?",
    "options": [
      "Para acompanhar o calendário de doses e reforços que garantem imunidade ao longo da vida",
      "Apenas para poder viajar de avião",
      "Para trocar por brindes na farmácia",
      "Não é um documento importante"
    ],
    "correctIndex": 0,
    "explanation": "A caderneta registra as imunizações e orienta sobre as doses de reforço para manter os anticorpos ativos!"
  },
  {
    "id": "cie_4_c2_09",
    "subject": "ciencias",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Vacinas, Saúde e Medidas Preventivas",
    "topic": "Glóbulos Brancos",
    "question": "Como são chamadas as células do sangue responsáveis por caçar e combater infecções no corpo?",
    "options": [
      "Glóbulos brancos (leucócitos)",
      "Glóbulos vermelhos (hemácias)",
      "Plaquetas de coagulação",
      "Fibras de colágeno"
    ],
    "correctIndex": 0,
    "explanation": "Os leucócitos são as células de defesa do sistema imunitário que combatem germes e produzem anticorpos!"
  },
  {
    "id": "cie_4_c2_10",
    "subject": "ciencias",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Vacinas, Saúde e Medidas Preventivas",
    "topic": "Tratamento de Esgoto",
    "question": "Por que o esgoto das casas não pode ser jogado diretamente nos rios e mares sem tratamento?",
    "options": [
      "Porque contamina a água com bactérias e vírus perigosos, mata os peixes e causa doenças",
      "Porque o esgoto seca o rio",
      "Porque a água fica azul demais",
      "Não causa problemas ambientais"
    ],
    "correctIndex": 0,
    "explanation": "Esgoto não tratado polui a água, dissemina bactérias fecais e destrói o ecossistema aquático!"
  },
  {
    "id": "cie_4_c2_11",
    "subject": "ciencias",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Vacinas, Saúde e Medidas Preventivas",
    "topic": "Febre",
    "question": "A febre (aumento da temperatura corporal) é um sinal de que:",
    "options": [
      "O sistema imunológico está reagindo ativamente para combater uma infecção",
      "O corpo está virando fogo",
      "A pessoa está com frio demais",
      "O cérebro parou de funcionar"
    ],
    "correctIndex": 0,
    "explanation": "A febre é uma resposta de defesa do organismo para dificultar a multiplicação de vírus e bactérias!"
  },
  {
    "id": "cie_4_c2_12",
    "subject": "ciencias",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Vacinas, Saúde e Medidas Preventivas",
    "topic": "Primeira Vacina da História",
    "question": "Edward Jenner criou a primeira vacina da história médica contra a varíola observando qual animal?",
    "options": [
      "Vacas (daí o nome 'vacina')",
      "Cavalos",
      "Galinhas",
      "Cães"
    ],
    "correctIndex": 0,
    "explanation": "Jenner usou a varíola bovina (das vacas) para imunizar humanos contra a varíola humana letal!"
  },
  {
    "id": "cie_4_c2_13",
    "subject": "ciencias",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Vacinas, Saúde e Medidas Preventivas",
    "topic": "Álcool 70%",
    "question": "Por que o álcool a 70% é mais eficiente para desinfetar as mãos do que o álcool 100% puro?",
    "options": [
      "A presença de 30% de água ajuda o álcool a penetrar na membrana do micróbio antes de evaporar",
      "Porque é mais barato",
      "Porque tem cheiro de perfume",
      "Porque não queima"
    ],
    "correctIndex": 0,
    "explanation": "A água retarda a evaporação e permite que o álcool destrua as proteínas e lipídios dos micróbios!"
  },
  {
    "id": "cie_4_c2_14",
    "subject": "ciencias",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Vacinas, Saúde e Medidas Preventivas",
    "topic": "Poliomielite",
    "question": "A campanha da 'gotinha' do Zé Gotinha no Brasil protegeu milhões de crianças contra qual doença que causa paralisia infantil?",
    "options": [
      "Poliomielite",
      "Gripe",
      "Dor de cabeça",
      "Miopia"
    ],
    "correctIndex": 0,
    "explanation": "A vacina oral Sabin erradicou a paralisia infantil (poliomielite) no território brasileiro!"
  },
  {
    "id": "cie_4_c2_15",
    "subject": "ciencias",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Vacinas, Saúde e Medidas Preventivas",
    "topic": "Saúde Mental e Bem-Estar",
    "question": "Além dos cuidados físicos, brincar, ler bons livros e conviver com amigos e família contribuem para:",
    "options": [
      "A saúde mental e o bem-estar emocional",
      "Ganhar peso apenas",
      "Ficar sem sono",
      "Perder memória"
    ],
    "correctIndex": 0,
    "explanation": "A saúde integral compreende o equilíbrio entre bem-estar físico, psicológico e social!"
  },
  {
    "id": "cie_4_c3_01",
    "subject": "ciencias",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Cadeias e Teias Alimentares",
    "topic": "Produtores Autótrofos",
    "question": "Na base de toda cadeia alimentar terrestre estão os PRODUTORES. Quem são eles?",
    "options": [
      "As plantas e algas (produzem seu próprio alimento pela fotossíntese)",
      "Os leões e tubarões",
      "Os fungos e bactérias",
      "As pedras e minerais"
    ],
    "correctIndex": 0,
    "explanation": "Plantas e algas são autótrofas e iniciam o fluxo de matéria e energia no ecossistema!"
  },
  {
    "id": "cie_4_c3_02",
    "subject": "ciencias",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Cadeias e Teias Alimentares",
    "topic": "Consumidores Primários",
    "question": "Em uma cadeia alimentar: Capim -> Gafanhoto -> Sapo -> Serpente, o GAFANHOTO é classificado como:",
    "options": [
      "Consumidor primário (herbívoro)",
      "Produtor",
      "Consumidor terciário",
      "Decompositor"
    ],
    "correctIndex": 0,
    "explanation": "O animal que se alimenta diretamente dos produtores vegetais é o consumidor primário!"
  },
  {
    "id": "cie_4_c3_03",
    "subject": "ciencias",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Cadeias e Teias Alimentares",
    "topic": "Consumidores Secundários",
    "question": "Na mesma cadeia (Capim -> Gafanhoto -> Sapo), o SAPO que come o gafanhoto é um:",
    "options": [
      "Consumidor secundário (carnívoro)",
      "Produtor primário",
      "Decompositor vegetal",
      "Autótrofo"
    ],
    "correctIndex": 0,
    "explanation": "O animal que se alimenta do consumidor primário é o consumidor secundário!"
  },
  {
    "id": "cie_4_c3_04",
    "subject": "ciencias",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Cadeias e Teias Alimentares",
    "topic": "Papel dos Decompositores",
    "question": "Qual é o papel fundamental dos fungos e bactérias decompositores na teia alimentar?",
    "options": [
      "Decompor a matéria orgânica morta e reciclar nutrientes para o solo",
      "Caçar animais vivos velozes",
      "Produzir sombra para as árvores",
      "Fazer fotossíntese à noite"
    ],
    "correctIndex": 0,
    "explanation": "Decompositores fecham o ciclo da matéria, transformando matéria orgânica em nutrientes minerais!"
  },
  {
    "id": "cie_4_c3_05",
    "subject": "ciencias",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Cadeias e Teias Alimentares",
    "topic": "Fluxo de Energia",
    "question": "Ao longo dos níveis tróficos de uma cadeia alimentar, a quantidade de energia:",
    "options": [
      "Diminui a cada nível trófico, pois parte da energia é gasta no metabolismo e calor",
      "Aumenta infinitamente",
      "Permanece exatamente 100% igual",
      "Desaparece na primeira planta"
    ],
    "correctIndex": 0,
    "explanation": "O fluxo de energia é unidirecional e decresce em cada nível trófico da cadeia alimentar!"
  },
  {
    "id": "cie_4_c3_06",
    "subject": "ciencias",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Cadeias e Teias Alimentares",
    "topic": "Fonte Primária de Energia",
    "question": "Qual é a fonte primária de energia para praticamente todas as cadeias ecológicas da Terra?",
    "options": [
      "O Sol (energia solar)",
      "A Lua",
      "O vento dos polos",
      "O fogo do vulcão"
    ],
    "correctIndex": 0,
    "explanation": "O Sol emite a luz que as plantas captam para transformar em energia química nos alimentos!"
  },
  {
    "id": "cie_4_c3_07",
    "subject": "ciencias",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Cadeias e Teias Alimentares",
    "topic": "Diferença entre Cadeia e Teia",
    "question": "Qual a diferença entre uma CADEIA ALIMENTAR e uma TEIA ECOLÓGICA?",
    "options": [
      "A cadeia é uma sequência simples linear; a teia é o conjunto de várias cadeias interligadas na natureza",
      "A teia só existe no mar",
      "A cadeia é feita de metal",
      "Não há diferença"
    ],
    "correctIndex": 0,
    "explanation": "Na natureza, os animais comem alimentos variados, formando uma rede ou teia alimentar interconectada!"
  },
  {
    "id": "cie_4_c3_08",
    "subject": "ciencias",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Cadeias e Teias Alimentares",
    "topic": "Predador de Topo",
    "question": "O que é um 'PREDADOR DE TOPO' de cadeia alimentar (como a onça-pintada ou a águia)?",
    "options": [
      "Um carnívoro adulto que não possui predadores naturais que o cacem em seu habitat",
      "Um animal que só come frutas",
      "Uma planta carnívora gigante",
      "Um micróbio decompositor"
    ],
    "correctIndex": 0,
    "explanation": "Predadores de topo ocupam o nível mais alto da teia e regulam as populações de presas do ecossistema!"
  },
  {
    "id": "cie_4_c3_09",
    "subject": "ciencias",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Cadeias e Teias Alimentares",
    "topic": "Desequilíbrio Ecológico",
    "question": "Se todos os sapos de uma região forem eliminados pelo uso de venenos, o que acontecerá?",
    "options": [
      "Haverá uma superpopulação de insetos que antes eram comidos pelos sapos, gerando pragas",
      "Os insetos vão sumir também",
      "As cobras vão comer flores",
      "O rio vai secar instantaneamente"
    ],
    "correctIndex": 0,
    "explanation": "A retirada de uma espécie quebra o equilíbrio ecológico e gera superpopulação descontrolada de presas!"
  },
  {
    "id": "cie_4_c3_10",
    "subject": "ciencias",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Cadeias e Teias Alimentares",
    "topic": "Teia Alimentar Marinha",
    "question": "No oceano, quem são os microscópicos seres fotossintetizantes que produzem a maior parte do alimento marinho?",
    "options": [
      "Fitoplâncton",
      "Baleias-azuis",
      "Tubarões-brancos",
      "Corais de rocha"
    ],
    "correctIndex": 0,
    "explanation": "O fitoplâncton flutua na água e é a base microscópica produtora de toda a vida nos oceanos!"
  },
  {
    "id": "cie_4_c3_11",
    "subject": "ciencias",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Cadeias e Teias Alimentares",
    "topic": "Seres Heterótrofos",
    "question": "Os animais não produzem seu próprio alimento e precisam comer outros seres. Por isso são chamados de:",
    "options": [
      "Heterótrofos",
      "Autótrofos",
      "Inorgânicos",
      "Fotossintetizantes"
    ],
    "correctIndex": 0,
    "explanation": "Heterótrofos são organismos incapazes de sintetizar seu próprio alimento, nutrindo-se de outros seres!"
  },
  {
    "id": "cie_4_c3_12",
    "subject": "ciencias",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Cadeias e Teias Alimentares",
    "topic": "Sentido das Setas na Cadeia",
    "question": "Em um esquema de cadeia alimentar, para onde apontam as setas (ex: Planta -> Gafanhoto)?",
    "options": [
      "Apontam na direção de quem recebe a energia e a matéria ('serve de alimento para')",
      "Apontam para quem é mais forte",
      "Apontam aleatoriamente",
      "Apontam sempre para o chão"
    ],
    "correctIndex": 0,
    "explanation": "A seta significa 'é consumido por / transfere energia para'!"
  },
  {
    "id": "cie_4_c3_13",
    "subject": "ciencias",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Cadeias e Teias Alimentares",
    "topic": "Nível Trófico dos Herbívoros",
    "question": "Os animais herbívoros ocupam qual nível trófico em qualquer cadeia alimentar?",
    "options": [
      "2º nível trófico (consumidores primários)",
      "1º nível trófico",
      "4º nível trófico",
      "Nenhum nível"
    ],
    "correctIndex": 0,
    "explanation": "O 1º nível são os produtores vegetais; os herbívoros que os comem são o 2º nível trófico!"
  },
  {
    "id": "cie_4_c3_14",
    "subject": "ciencias",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Cadeias e Teias Alimentares",
    "topic": "Bioacumulação de Toxinas",
    "question": "Se um rio for poluído com mercúrio, qual animal acumulará a MAIOR concentração de veneno no corpo?",
    "options": [
      "O predador de topo (os peixes grandes que comeram dezenas de peixes menores contaminados)",
      "As algas do fundo",
      "O inseto aquático",
      "Todos terão exatamente a mesma quantidade"
    ],
    "correctIndex": 0,
    "explanation": "Na bioacumulação, poluentes não degradáveis concentram-se cada vez mais nos níveis mais altos da cadeia alimentar!"
  },
  {
    "id": "cie_4_c3_15",
    "subject": "ciencias",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Cadeias e Teias Alimentares",
    "topic": "Cadeia do Cerrado",
    "question": "Na cadeia alimentar do Cerrado: Gramíneas -> Cupins -> Tamanduá-bandeira, quem é o consumidor secundário?",
    "options": [
      "O Tamanduá-bandeira",
      "O cupim",
      "A gramínea",
      "O fungo"
    ],
    "correctIndex": 0,
    "explanation": "Gramíneas (produtor) -> Cupim (consumidor primário) -> Tamanduá (consumidor secundário)!"
  },
  {
    "id": "cie_4_c4_01",
    "subject": "ciencias",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "A Matéria e seus Estados Físicos",
    "topic": "Mudança: Fusão",
    "question": "A passagem da água do estado SÓLIDO (gelo) para o estado LÍQUIDO ao ser aquecida chama-se:",
    "options": [
      "Fusão",
      "Solidificação",
      "Vaporização",
      "Condensação"
    ],
    "correctIndex": 0,
    "explanation": "Fusão é a transformação do sólido em líquido através do fornecimento de calor!"
  },
  {
    "id": "cie_4_c4_02",
    "subject": "ciencias",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "A Matéria e seus Estados Físicos",
    "topic": "Mudança: Solidificação",
    "question": "Quando colocamos água líquida na forma de gelo do congelador e ela vira gelo rígido, ocorreu a:",
    "options": [
      "Solidificação",
      "Fusão",
      "Sublimação",
      "Ebulição"
    ],
    "correctIndex": 0,
    "explanation": "Solidificação é a mudança do estado líquido para o sólido devido à perda de calor!"
  },
  {
    "id": "cie_4_c4_03",
    "subject": "ciencias",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "A Matéria e seus Estados Físicos",
    "topic": "Mudança: Vaporização / Evaporação",
    "question": "Quando uma poça de água na calçada seca aos poucos sob a luz do sol quente, ocorreu a:",
    "options": [
      "Evaporação (vaporização lenta)",
      "Fusão",
      "Condensação",
      "Solidificação"
    ],
    "correctIndex": 0,
    "explanation": "Na evaporação, as moléculas superficiais do líquido passam para o estado gasoso!"
  },
  {
    "id": "cie_4_c4_04",
    "subject": "ciencias",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "A Matéria e seus Estados Físicos",
    "topic": "Mudança: Condensação",
    "question": "Quando o vapor de água quente do chuveiro bate no espelho frio do banheiro e forma gotículas líquidas, ocorreu a:",
    "options": [
      "Condensação ou Liquefação",
      "Fusão",
      "Solidificação",
      "Sublimação"
    ],
    "correctIndex": 0,
    "explanation": "Condensação é o vapor de gás resfriando e voltando a ser líquido!"
  },
  {
    "id": "cie_4_c4_05",
    "subject": "ciencias",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "A Matéria e seus Estados Físicos",
    "topic": "Ponto de Ebulição da Água",
    "question": "Ao nível do mar, a água ferve (ebulição) e borbulha fortemente a qual temperatura?",
    "options": [
      "100 graus Celsius (100°C)",
      "0°C",
      "50°C",
      "200°C"
    ],
    "correctIndex": 0,
    "explanation": "A água atinge o ponto de ebulição a 100°C ao nível do mar!"
  },
  {
    "id": "cie_4_c4_06",
    "subject": "ciencias",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "A Matéria e seus Estados Físicos",
    "topic": "Ponto de Fusão / Congelamento",
    "question": "A água pura congela e o gelo derrete a qual temperatura exata ao nível do mar?",
    "options": [
      "0 graus Celsius (0°C)",
      "10°C",
      "-50°C",
      "100°C"
    ],
    "correctIndex": 0,
    "explanation": "A 0°C a água líquida se solidifica ou o gelo funde!"
  },
  {
    "id": "cie_4_c4_07",
    "subject": "ciencias",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "A Matéria e seus Estados Físicos",
    "topic": "Características do Estado Sólido",
    "question": "No estado SÓLIDO (como uma pedra ou cubo de gelo), como é a forma e o volume da matéria?",
    "options": [
      "Tem forma fixa e volume constante definido",
      "Muda de forma conforme o copo e se espalha",
      "Não ocupa espaço nenhum",
      "É invisível"
    ],
    "correctIndex": 0,
    "explanation": "Sólidos têm moléculas fortemente unidas, mantendo forma rígida e volume próprio!"
  },
  {
    "id": "cie_4_c4_08",
    "subject": "ciencias",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "A Matéria e seus Estados Físicos",
    "topic": "Características do Estado Líquido",
    "question": "No estado LÍQUIDO, a água adquire qual forma?",
    "options": [
      "Adquire a forma do recipiente em que é colocada, mas mantém seu volume",
      "Fica sempre quadrada",
      "Vira uma bola rígida",
      "Desaparece no ar"
    ],
    "correctIndex": 0,
    "explanation": "Líquidos têm volume fixo, mas fluem e assumem o formato do copo ou garrafa!"
  },
  {
    "id": "cie_4_c4_09",
    "subject": "ciencias",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "A Matéria e seus Estados Físicos",
    "topic": "Características do Estado Gasoso",
    "question": "No estado GASOSO (como o ar ou vapor), as moléculas:",
    "options": [
      "Ficam muito afastadas e livres, ocupando todo o espaço disponível",
      "Ficam grudadas feito pedra",
      "São pesadas e caem no chão",
      "Têm formato de triângulo fixo"
    ],
    "correctIndex": 0,
    "explanation": "Gases não têm forma nem volume fixo; expandem-se e preenchem todo o recipiente!"
  },
  {
    "id": "cie_4_c4_10",
    "subject": "ciencias",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "A Matéria e seus Estados Físicos",
    "topic": "Ciclo Hidrológico (Ciclo da Água)",
    "question": "No ciclo natural da água, como as nuvens de chuva se formam no céu?",
    "options": [
      "O calor evapora a água dos rios e mares, o vapor sobe e se condensa em gotículas nas nuvens",
      "O vento pinta o céu de branco",
      "Aviões soltam fumaça de chuva",
      "A lua joga gelo na atmosfera"
    ],
    "correctIndex": 0,
    "explanation": "A água evapora, sobe para camadas frias da atmosfera, condensa-se formando nuvens e precipita como chuva!"
  },
  {
    "id": "cie_4_c4_11",
    "subject": "ciencias",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "A Matéria e seus Estados Físicos",
    "topic": "Precipitação",
    "question": "Quando as gotículas de água nas nuvens se juntam e caem em direção à terra, temos a:",
    "options": [
      "Precipitação (chuva)",
      "Evaporação",
      "Sublimação",
      "Transpiração"
    ],
    "correctIndex": 0,
    "explanation": "Precipitação é a queda da água atmosférica em forma de chuva, garoa, neve ou granizo!"
  },
  {
    "id": "cie_4_c4_12",
    "subject": "ciencias",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "A Matéria e seus Estados Físicos",
    "topic": "O que é Matéria",
    "question": "Em Ciências, a definição de MATÉRIA é:",
    "options": [
      "Tudo aquilo que tem massa e ocupa lugar no espaço",
      "Apenas as coisas que podemos comer",
      "Apenas o que brilha no escuro",
      "Uma disciplina da escola"
    ],
    "correctIndex": 0,
    "explanation": "Matéria é qualquer substância física que possui massa mensurável e volume espacial!"
  },
  {
    "id": "cie_4_c4_13",
    "subject": "ciencias",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "A Matéria e seus Estados Físicos",
    "topic": "Condutividade Térmica",
    "question": "Por que as colheres de metal esquentam muito rápido quando mexemos uma sopa quente na panela?",
    "options": [
      "O metal é um excelente condutor térmico",
      "O metal é um isolante que bloqueia calor",
      "A sopa é mágica",
      "O metal derrete na sopa"
    ],
    "correctIndex": 0,
    "explanation": "Metais conduzem energia térmica com altíssima rapidez através de seus elétrons livres!"
  },
  {
    "id": "cie_4_c4_14",
    "subject": "ciencias",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "A Matéria e seus Estados Físicos",
    "topic": "Isolante Térmico",
    "question": "Qual dos seguintes materiais é um ISOLANTE TÉRMICO que protege do calor e do frio?",
    "options": [
      "Isopor ou cortiça",
      "Alumínio",
      "Cobre",
      "Prata"
    ],
    "correctIndex": 0,
    "explanation": "Isopor, cortiça, madeira e plástico conduzem mal o calor e funcionam como isolantes térmicos!"
  },
  {
    "id": "cie_4_c4_15",
    "subject": "ciencias",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "A Matéria e seus Estados Físicos",
    "topic": "Sublimação",
    "question": "A naftalina ou o gelo seco passam diretamente do estado SÓLIDO para o estado GASOSO sem virar líquido. Esse fenômeno é:",
    "options": [
      "Sublimação",
      "Fusão",
      "Liquefação",
      "Solidificação"
    ],
    "correctIndex": 0,
    "explanation": "A sublimação é a transição direta entre sólido e gás sem passar pelo estado líquido intermediário!"
  },
  {
    "id": "ing_2_c1_01",
    "subject": "ingles",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Colors & The Magic Rainbow",
    "topic": "Colors: Red",
    "question": "Como se diz a cor 'Vermelho' em inglês?",
    "options": [
      "Red",
      "Blue",
      "Green",
      "Yellow"
    ],
    "correctIndex": 0,
    "explanation": "'Red' significa vermelho em inglês! Como uma maçã ou o Charmander!"
  },
  {
    "id": "ing_2_c1_02",
    "subject": "ingles",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Colors & The Magic Rainbow",
    "topic": "Colors: Blue",
    "question": "Qual cor em inglês representa o céu limpo e o oceano: 'Blue'?",
    "options": [
      "Azul",
      "Amarelo",
      "Rosa",
      "Preto"
    ],
    "correctIndex": 0,
    "explanation": "'Blue' significa azul em inglês!"
  },
  {
    "id": "ing_2_c1_03",
    "subject": "ingles",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Colors & The Magic Rainbow",
    "topic": "Colors: Yellow",
    "question": "O sol brilhante e o Pikachu são de que cor em inglês?",
    "options": [
      "Yellow",
      "Purple",
      "Brown",
      "Orange"
    ],
    "correctIndex": 0,
    "explanation": "'Yellow' significa amarelo!"
  },
  {
    "id": "ing_2_c1_04",
    "subject": "ingles",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Colors & The Magic Rainbow",
    "topic": "Colors: Green",
    "question": "As folhas das árvores e o Bulbasaur são verdes. Como se diz 'Verde' em inglês?",
    "options": [
      "Green",
      "White",
      "Pink",
      "Red"
    ],
    "correctIndex": 0,
    "explanation": "'Green' é verde em inglês!"
  },
  {
    "id": "ing_2_c1_05",
    "subject": "ingles",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Colors & The Magic Rainbow",
    "topic": "Colors: Pink",
    "question": "Como dizemos a cor 'Rosa' em inglês, igual à cor do Jigglypuff?",
    "options": [
      "Pink",
      "Gray",
      "Black",
      "Blue"
    ],
    "correctIndex": 0,
    "explanation": "'Pink' significa rosa em inglês!"
  },
  {
    "id": "ing_2_c1_06",
    "subject": "ingles",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Colors & The Magic Rainbow",
    "topic": "Colors: Orange",
    "question": "A fruta laranja e a cor laranja têm a mesma palavra em inglês. Qual é?",
    "options": [
      "Orange",
      "Apple",
      "Grape",
      "Banana"
    ],
    "correctIndex": 0,
    "explanation": "'Orange' serve tanto para a cor laranja quanto para a fruta laranja!"
  },
  {
    "id": "ing_2_c1_07",
    "subject": "ingles",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Colors & The Magic Rainbow",
    "topic": "Colors: Purple",
    "question": "Qual é o significado da cor 'Purple' em português?",
    "options": [
      "Roxo",
      "Marrom",
      "Azul",
      "Cinza"
    ],
    "correctIndex": 0,
    "explanation": "'Purple' significa roxo ou púrpura!"
  },
  {
    "id": "ing_2_c1_08",
    "subject": "ingles",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Colors & The Magic Rainbow",
    "topic": "Colors: Black and White",
    "question": "Um cachorrinho dálmata tem manchas pretas e pelo branco. Como se diz 'Preto' e 'Branco' em inglês?",
    "options": [
      "Black and White",
      "Red and Blue",
      "Green and Yellow",
      "Pink and Brown"
    ],
    "correctIndex": 0,
    "explanation": "'Black' é preto e 'White' é branco!"
  },
  {
    "id": "ing_2_c1_09",
    "subject": "ingles",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Colors & The Magic Rainbow",
    "topic": "Colors: Brown",
    "question": "Como se diz a cor 'Marrom' em inglês, igual à casca de uma árvore?",
    "options": [
      "Brown",
      "Yellow",
      "Orange",
      "Purple"
    ],
    "correctIndex": 0,
    "explanation": "'Brown' significa marrom!"
  },
  {
    "id": "ing_2_c1_10",
    "subject": "ingles",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Colors & The Magic Rainbow",
    "topic": "Colors: Gray",
    "question": "As pedras e nuvens de chuva costumam ser cinzas. Como se escreve 'Cinza' em inglês?",
    "options": [
      "Gray (ou Grey)",
      "Gold",
      "Silver",
      "Red"
    ],
    "correctIndex": 0,
    "explanation": "'Gray' (ou Grey) significa cinza em inglês!"
  },
  {
    "id": "ing_2_c1_11",
    "subject": "ingles",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Colors & The Magic Rainbow",
    "topic": "Rainbow",
    "question": "Como se chama o lindo 'Arco-íris' em inglês?",
    "options": [
      "Rainbow",
      "Raincoat",
      "Raindrop",
      "Rainforest"
    ],
    "correctIndex": 0,
    "explanation": "'Rainbow' significa arco-íris (rain = chuva + bow = arco)!"
  },
  {
    "id": "ing_2_c1_12",
    "subject": "ingles",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Colors & The Magic Rainbow",
    "topic": "Mixing Colors: Red + Yellow",
    "question": "If you mix Red and Yellow, what color do you get?",
    "options": [
      "Orange",
      "Blue",
      "Green",
      "Black"
    ],
    "correctIndex": 0,
    "explanation": "Misturando Red (vermelho) + Yellow (amarelo), obtemos Orange (laranja)!"
  },
  {
    "id": "ing_2_c1_13",
    "subject": "ingles",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Colors & The Magic Rainbow",
    "topic": "Mixing Colors: Blue + Yellow",
    "question": "If you mix Blue and Yellow, what color do you get?",
    "options": [
      "Green",
      "Purple",
      "Pink",
      "White"
    ],
    "correctIndex": 0,
    "explanation": "Misturando Blue (azul) + Yellow (amarelo), obtemos Green (verde)!"
  },
  {
    "id": "ing_2_c1_14",
    "subject": "ingles",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Colors & The Magic Rainbow",
    "topic": "Favorite Color Expression",
    "question": "Como você responde à pergunta: 'What is your favorite color?'",
    "options": [
      "My favorite color is blue",
      "I have ten pencils",
      "I am 7 years old",
      "Yes, please"
    ],
    "correctIndex": 0,
    "explanation": "'My favorite color is...' é a forma de dizer 'Minha cor favorita é...'!"
  },
  {
    "id": "ing_2_c1_15",
    "subject": "ingles",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Colors & The Magic Rainbow",
    "topic": "Colors: Gold & Silver",
    "question": "As medalhas dos campeões são de 'Gold' e 'Silver'. Quais são essas cores?",
    "options": [
      "Ouro (dourado) e Prata (prateado)",
      "Azul e Verde",
      "Preto e Vermelho",
      "Amarelo e Roxo"
    ],
    "correctIndex": 0,
    "explanation": "'Gold' é dourado/ouro e 'Silver' é prateado/prata!"
  },
  {
    "id": "ing_2_c2_01",
    "subject": "ingles",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Numbers from 1 to 20",
    "topic": "Numbers 1, 2, 3",
    "question": "Como se escreve em inglês os números 1, 2 e 3?",
    "options": [
      "One, Two, Three",
      "Four, Five, Six",
      "Seven, Eight, Nine",
      "Ten, Eleven, Twelve"
    ],
    "correctIndex": 0,
    "explanation": "1 = One, 2 = Two, 3 = Three!"
  },
  {
    "id": "ing_2_c2_02",
    "subject": "ingles",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Numbers from 1 to 20",
    "topic": "Numbers: Five",
    "question": "Temos 5 dedos em cada mão. Como se escreve o número 5 em inglês?",
    "options": [
      "Five",
      "Four",
      "Fine",
      "Fire"
    ],
    "correctIndex": 0,
    "explanation": "5 em inglês é 'Five'!"
  },
  {
    "id": "ing_2_c2_03",
    "subject": "ingles",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Numbers from 1 to 20",
    "topic": "Numbers: Seven and Eight",
    "question": "Quais números representam as palavras 'Seven' e 'Eight'?",
    "options": [
      "7 e 8",
      "5 e 6",
      "9 e 10",
      "3 e 4"
    ],
    "correctIndex": 0,
    "explanation": "Seven = 7 e Eight = 8!"
  },
  {
    "id": "ing_2_c2_04",
    "subject": "ingles",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Numbers from 1 to 20",
    "topic": "Numbers: Ten",
    "question": "Uma dezena completa equivale a qual número em inglês?",
    "options": [
      "Ten (10)",
      "Two (2)",
      "Twenty (20)",
      "Twelve (12)"
    ],
    "correctIndex": 0,
    "explanation": "'Ten' é o número 10!"
  },
  {
    "id": "ing_2_c2_05",
    "subject": "ingles",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Numbers from 1 to 20",
    "topic": "Numbers: Eleven and Twelve",
    "question": "Quais números vêm logo depois do 10 em inglês: 'Eleven' e 'Twelve'?",
    "options": [
      "11 e 12",
      "13 e 14",
      "20 e 21",
      "9 e 8"
    ],
    "correctIndex": 0,
    "explanation": "Eleven = 11 e Twelve = 12!"
  },
  {
    "id": "ing_2_c2_06",
    "subject": "ingles",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Numbers from 1 to 20",
    "topic": "Numbers: Thirteen",
    "question": "O número 13 em inglês termina com '-teen'. Como se escreve?",
    "options": [
      "Thirteen",
      "Thirty",
      "Three",
      "Third"
    ],
    "correctIndex": 0,
    "explanation": "13 se escreve 'Thirteen'!"
  },
  {
    "id": "ing_2_c2_07",
    "subject": "ingles",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Numbers from 1 to 20",
    "topic": "Numbers: Fifteen",
    "question": "Como se escreve o número 15 em inglês?",
    "options": [
      "Fifteen",
      "Fiveteen",
      "Fifty",
      "Five"
    ],
    "correctIndex": 0,
    "explanation": "O número 15 é 'Fifteen'!"
  },
  {
    "id": "ing_2_c2_08",
    "subject": "ingles",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Numbers from 1 to 20",
    "topic": "Numbers: Twenty",
    "question": "Qual número em inglês é 'Twenty'?",
    "options": [
      "20",
      "12",
      "2",
      "200"
    ],
    "correctIndex": 0,
    "explanation": "'Twenty' significa 20!"
  },
  {
    "id": "ing_2_c2_09",
    "subject": "ingles",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Numbers from 1 to 20",
    "topic": "Simple Math in English",
    "question": "How much is 'Two + Three'?",
    "options": [
      "Five (5)",
      "Four (4)",
      "Six (6)",
      "Seven (7)"
    ],
    "correctIndex": 0,
    "explanation": "Two (2) + Three (3) = Five (5)!"
  },
  {
    "id": "ing_2_c2_10",
    "subject": "ingles",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Numbers from 1 to 20",
    "topic": "Counting Sequence",
    "question": "Qual número completa a sequência: Eight, Nine, _____?",
    "options": [
      "Ten",
      "Six",
      "Seven",
      "Eleven"
    ],
    "correctIndex": 0,
    "explanation": "8 (Eight), 9 (Nine), 10 (Ten)!"
  },
  {
    "id": "ing_2_c2_11",
    "subject": "ingles",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Numbers from 1 to 20",
    "topic": "Age Question",
    "question": "Quando alguém pergunta 'How old are you?', o que essa pessoa quer saber?",
    "options": [
      "Quantos anos você tem",
      "Qual é o seu nome",
      "De onde você é",
      "Qual sua cor favorita"
    ],
    "correctIndex": 0,
    "explanation": "'How old are you?' significa 'Quantos anos você tem?'!"
  },
  {
    "id": "ing_2_c2_12",
    "subject": "ingles",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Numbers from 1 to 20",
    "topic": "Numbers: Fourteen and Sixteen",
    "question": "Quais números são 'Fourteen' e 'Sixteen'?",
    "options": [
      "14 e 16",
      "4 e 6",
      "40 e 60",
      "15 e 17"
    ],
    "correctIndex": 0,
    "explanation": "Fourteen = 14 e Sixteen = 16!"
  },
  {
    "id": "ing_2_c2_13",
    "subject": "ingles",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Numbers from 1 to 20",
    "topic": "Numbers: Seventeen and Nineteen",
    "question": "Quais números são 'Seventeen' e 'Nineteen'?",
    "options": [
      "17 e 19",
      "7 e 9",
      "70 e 90",
      "16 e 18"
    ],
    "correctIndex": 0,
    "explanation": "Seventeen = 17 e Nineteen = 19!"
  },
  {
    "id": "ing_2_c2_14",
    "subject": "ingles",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Numbers from 1 to 20",
    "topic": "Number Zero",
    "question": "Como se diz o número 0 em inglês?",
    "options": [
      "Zero",
      "Hero",
      "Zebra",
      "One"
    ],
    "correctIndex": 0,
    "explanation": "0 em inglês é 'Zero'!"
  },
  {
    "id": "ing_2_c2_15",
    "subject": "ingles",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Numbers from 1 to 20",
    "topic": "Count Objects",
    "question": "Se temos 'Ten Pokéballs' e ganhamos mais 'Two', quantas temos ao todo?",
    "options": [
      "Twelve (12)",
      "Eleven (11)",
      "Thirteen (13)",
      "Twenty (20)"
    ],
    "correctIndex": 0,
    "explanation": "10 (Ten) + 2 (Two) = 12 (Twelve)!"
  },
  {
    "id": "ing_2_c3_01",
    "subject": "ingles",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Friendly Animals & Pets",
    "topic": "Pets: Dog and Cat",
    "question": "Quais animais são 'Dog' e 'Cat'?",
    "options": [
      "Cachorro e Gato",
      "Pássaro e Peixe",
      "Cavalo e Vaca",
      "Leão e Macaco"
    ],
    "correctIndex": 0,
    "explanation": "'Dog' é cachorro e 'Cat' é gato!"
  },
  {
    "id": "ing_2_c3_02",
    "subject": "ingles",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Friendly Animals & Pets",
    "topic": "Animals: Bird",
    "question": "Qual animal tem asas, canta e se chama 'Bird' em inglês?",
    "options": [
      "Pássaro / Ave",
      "Peixe",
      "Sapo",
      "Coelho"
    ],
    "correctIndex": 0,
    "explanation": "'Bird' significa pássaro ou ave!"
  },
  {
    "id": "ing_2_c3_03",
    "subject": "ingles",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Friendly Animals & Pets",
    "topic": "Animals: Fish",
    "question": "O Magikarp nada na água e é um 'Fish'. O que é 'Fish'?",
    "options": [
      "Peixe",
      "Tartaruga",
      "Tubarão",
      "Baleia"
    ],
    "correctIndex": 0,
    "explanation": "'Fish' significa peixe em inglês!"
  },
  {
    "id": "ing_2_c3_04",
    "subject": "ingles",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Friendly Animals & Pets",
    "topic": "Animals: Rabbit",
    "question": "O animal que adora cenouras, pula bastante e tem orelhas compridas se chama 'Rabbit'. O que é?",
    "options": [
      "Coelho",
      "Cachorro",
      "Rato",
      "Esquilo"
    ],
    "correctIndex": 0,
    "explanation": "'Rabbit' significa coelho!"
  },
  {
    "id": "ing_2_c3_05",
    "subject": "ingles",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Friendly Animals & Pets",
    "topic": "Animals: Frog",
    "question": "Qual animal verde pula na lagoa e se chama 'Frog'?",
    "options": [
      "Sapo",
      "Pato",
      "Peixe",
      "Jacaré"
    ],
    "correctIndex": 0,
    "explanation": "'Frog' significa sapo em inglês!"
  },
  {
    "id": "ing_2_c3_06",
    "subject": "ingles",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Friendly Animals & Pets",
    "topic": "Animals: Horse",
    "question": "O Ponyta corre velozmente como um 'Horse'. O que é 'Horse'?",
    "options": [
      "Cavalo",
      "Vaca",
      "Ovelha",
      "Porco"
    ],
    "correctIndex": 0,
    "explanation": "'Horse' é cavalo em inglês!"
  },
  {
    "id": "ing_2_c3_07",
    "subject": "ingles",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Friendly Animals & Pets",
    "topic": "Animals: Cow",
    "question": "O animal da fazenda que faz 'muuu' e nos dá leite se chama 'Cow'. O que é?",
    "options": [
      "Vaca",
      "Cabra",
      "Galinha",
      "Pata"
    ],
    "correctIndex": 0,
    "explanation": "'Cow' significa vaca em inglês!"
  },
  {
    "id": "ing_2_c3_08",
    "subject": "ingles",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Friendly Animals & Pets",
    "topic": "Animals: Duck",
    "question": "O Psyduck é inspirado em qual ave aquática que em inglês se chama 'Duck'?",
    "options": [
      "Pato",
      "Ganso",
      "Cisne",
      "Papagaio"
    ],
    "correctIndex": 0,
    "explanation": "'Duck' significa pato!"
  },
  {
    "id": "ing_2_c3_09",
    "subject": "ingles",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Friendly Animals & Pets",
    "topic": "Animals: Lion",
    "question": "O rei da selva com uma grande juba se chama 'Lion'. Quem é ele?",
    "options": [
      "Leão",
      "Tigre",
      "Onça",
      "Lobo"
    ],
    "correctIndex": 0,
    "explanation": "'Lion' é leão em inglês!"
  },
  {
    "id": "ing_2_c3_10",
    "subject": "ingles",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Friendly Animals & Pets",
    "topic": "Animals: Elephant",
    "question": "O maior mamífero terrestre com tromba comprida se chama 'Elephant'. Qual é esse animal?",
    "options": [
      "Elefante",
      "Rinoceronte",
      "Hipopótamo",
      "Girafa"
    ],
    "correctIndex": 0,
    "explanation": "'Elephant' significa elefante!"
  },
  {
    "id": "ing_2_c3_11",
    "subject": "ingles",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Friendly Animals & Pets",
    "topic": "Animals: Monkey",
    "question": "O animal brincalhão que adora pular de galho em galho se chama 'Monkey'. O que é?",
    "options": [
      "Macaco",
      "Esquilo",
      "Urso",
      "Canguru"
    ],
    "correctIndex": 0,
    "explanation": "'Monkey' é macaco em inglês!"
  },
  {
    "id": "ing_2_c3_12",
    "subject": "ingles",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Friendly Animals & Pets",
    "topic": "Animals: Bear",
    "question": "Como se chama o 'Urso' em inglês?",
    "options": [
      "Bear",
      "Beer",
      "Beard",
      "Bird"
    ],
    "correctIndex": 0,
    "explanation": "'Bear' significa urso!"
  },
  {
    "id": "ing_2_c3_13",
    "subject": "ingles",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Friendly Animals & Pets",
    "topic": "Animals: Bee",
    "question": "O inseto que produz mel e voa de flor em flor se chama 'Bee'. O que é?",
    "options": [
      "Abelha",
      "Formiga",
      "Besouro",
      "Mosquito"
    ],
    "correctIndex": 0,
    "explanation": "'Bee' significa abelha em inglês!"
  },
  {
    "id": "ing_2_c3_14",
    "subject": "ingles",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Friendly Animals & Pets",
    "topic": "Animals: Butterfly",
    "question": "O Butterfree é baseado em qual lindo inseto colorido com asas chamado 'Butterfly'?",
    "options": [
      "Borboleta",
      "Libélula",
      "Joaninha",
      "Mariposa"
    ],
    "correctIndex": 0,
    "explanation": "'Butterfly' significa borboleta!"
  },
  {
    "id": "ing_2_c3_15",
    "subject": "ingles",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Friendly Animals & Pets",
    "topic": "Pet Love Expression",
    "question": "Como você diz em inglês: 'Eu amo meu cachorro'?",
    "options": [
      "I love my dog",
      "I have a cat",
      "My dog is red",
      "This is a bird"
    ],
    "correctIndex": 0,
    "explanation": "'I love my dog' significa 'Eu amo meu cachorro'!"
  },
  {
    "id": "ing_2_c4_01",
    "subject": "ingles",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Family, Greetings & Tech Devices",
    "topic": "Greetings: Hello & Goodbye",
    "question": "Como dizemos 'Olá' e 'Tchau' ao encontrar e se despedir de um amigo em inglês?",
    "options": [
      "Hello and Goodbye",
      "Yes and No",
      "Please and Thanks",
      "Good night and Day"
    ],
    "correctIndex": 0,
    "explanation": "'Hello' (ou 'Hi') é olá, e 'Goodbye' (ou 'Bye') é adeus/tchau!"
  },
  {
    "id": "ing_2_c4_02",
    "subject": "ingles",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Family, Greetings & Tech Devices",
    "topic": "Politeness: Please & Thank You",
    "question": "Como dizemos educadamente 'Por favor' e 'Obrigado' em inglês?",
    "options": [
      "Please and Thank you",
      "Excuse me and Sorry",
      "Welcome and Bye",
      "Good and Bad"
    ],
    "correctIndex": 0,
    "explanation": "'Please' é por favor e 'Thank you' é obrigado(a)!"
  },
  {
    "id": "ing_2_c4_03",
    "subject": "ingles",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Family, Greetings & Tech Devices",
    "topic": "Morning Greeting",
    "question": "Ao acordar pela manhã, como desejamos 'Bom dia' em inglês?",
    "options": [
      "Good morning",
      "Good afternoon",
      "Good evening",
      "Good night"
    ],
    "correctIndex": 0,
    "explanation": "'Good morning' significa bom dia!"
  },
  {
    "id": "ing_2_c4_04",
    "subject": "ingles",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Family, Greetings & Tech Devices",
    "topic": "Family: Father / Dad",
    "question": "Como se chama carinhosamente o 'Papai' em inglês?",
    "options": [
      "Father / Dad",
      "Mother / Mom",
      "Brother",
      "Sister"
    ],
    "correctIndex": 0,
    "explanation": "'Father' ou 'Dad' significa pai / papai!"
  },
  {
    "id": "ing_2_c4_05",
    "subject": "ingles",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Family, Greetings & Tech Devices",
    "topic": "Family: Mother / Mom",
    "question": "Como se chama carinhosamente a 'Mamãe' em inglês?",
    "options": [
      "Mother / Mom",
      "Father / Dad",
      "Grandpa",
      "Uncle"
    ],
    "correctIndex": 0,
    "explanation": "'Mother' ou 'Mom' significa mãe / mamãe!"
  },
  {
    "id": "ing_2_c4_06",
    "subject": "ingles",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Family, Greetings & Tech Devices",
    "topic": "Family: Sister & Brother",
    "question": "Cecília e Bianca são irmãs. Como se diz 'Irmã' e 'Irmão' em inglês?",
    "options": [
      "Sister and Brother",
      "Mother and Father",
      "Aunt and Uncle",
      "Girl and Boy"
    ],
    "correctIndex": 0,
    "explanation": "'Sister' é irmã e 'Brother' é irmão!"
  },
  {
    "id": "ing_2_c4_07",
    "subject": "ingles",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Family, Greetings & Tech Devices",
    "topic": "Family: Grandfather & Grandmother",
    "question": "Como chamamos carinhosamente o 'Vovô' e a 'Vovó' em inglês?",
    "options": [
      "Grandpa and Grandma",
      "Dad and Mom",
      "Uncle and Aunt",
      "Son and Daughter"
    ],
    "correctIndex": 0,
    "explanation": "'Grandpa' é vovô e 'Grandma' é vovó!"
  },
  {
    "id": "ing_2_c4_08",
    "subject": "ingles",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Family, Greetings & Tech Devices",
    "topic": "Tech Devices: Computer",
    "question": "O aparelho que usamos para estudar, jogar e programar se chama 'Computer'. O que é?",
    "options": [
      "Computador",
      "Televisão",
      "Geladeira",
      "Relógio"
    ],
    "correctIndex": 0,
    "explanation": "'Computer' significa computador!"
  },
  {
    "id": "ing_2_c4_09",
    "subject": "ingles",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Family, Greetings & Tech Devices",
    "topic": "Tech Devices: Mouse",
    "question": "No computador, o acessório que movemos na mesa com a mão para clicar na tela é chamado de:",
    "options": [
      "Mouse",
      "Screen",
      "Cable",
      "Speaker"
    ],
    "correctIndex": 0,
    "explanation": "'Mouse' (que também significa camundongo) é o periférico apontador do computador!"
  },
  {
    "id": "ing_2_c4_10",
    "subject": "ingles",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Family, Greetings & Tech Devices",
    "topic": "Tech Devices: Keyboard",
    "question": "A peça do computador cheia de letrinhas e números que usamos para digitar se chama:",
    "options": [
      "Keyboard (teclado)",
      "Monitor (tela)",
      "Mouse",
      "Printer (impressora)"
    ],
    "correctIndex": 0,
    "explanation": "'Keyboard' significa teclado em inglês (key = tecla + board = prancha)!"
  },
  {
    "id": "ing_2_c4_11",
    "subject": "ingles",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Family, Greetings & Tech Devices",
    "topic": "Tech Devices: Screen",
    "question": "A parte onde enxergamos as imagens no tablet ou computador se chama 'Screen'. O que é?",
    "options": [
      "Tela / Monitor",
      "Bateria",
      "Fone de ouvido",
      "Botão"
    ],
    "correctIndex": 0,
    "explanation": "'Screen' significa tela!"
  },
  {
    "id": "ing_2_c4_12",
    "subject": "ingles",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Family, Greetings & Tech Devices",
    "topic": "Tech: Robot",
    "question": "Uma máquina inteligente programada por nós para realizar tarefas incríveis se chama:",
    "options": [
      "Robot (robô)",
      "Radio",
      "Rocket",
      "Remote"
    ],
    "correctIndex": 0,
    "explanation": "'Robot' significa robô!"
  },
  {
    "id": "ing_2_c4_13",
    "subject": "ingles",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Family, Greetings & Tech Devices",
    "topic": "Tech: Video Game",
    "question": "O Pokémon FireRed que estamos jogando é um 'Video Game'. O que é 'Game'?",
    "options": [
      "Jogo",
      "Filme",
      "Livro",
      "Música"
    ],
    "correctIndex": 0,
    "explanation": "'Game' significa jogo em inglês!"
  },
  {
    "id": "ing_2_c4_14",
    "subject": "ingles",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Family, Greetings & Tech Devices",
    "topic": "Greetings: Good Night",
    "question": "Antes de ir para a cama dormir à noite, o que dizemos aos nossos pais em inglês?",
    "options": [
      "Good night",
      "Good morning",
      "Good afternoon",
      "See you at noon"
    ],
    "correctIndex": 0,
    "explanation": "'Good night' é a despedida usada antes de ir dormir ou ao fim da noite!"
  },
  {
    "id": "ing_2_c4_15",
    "subject": "ingles",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Family, Greetings & Tech Devices",
    "topic": "Name Introduction",
    "question": "Como você diz em inglês: 'Meu nome é Bianca'?",
    "options": [
      "My name is Bianca",
      "I am a girl",
      "This is Bianca",
      "Bianca is here"
    ],
    "correctIndex": 0,
    "explanation": "'My name is...' é a forma de se apresentar dizendo seu nome!"
  },
  {
    "id": "ing_4_c1_01",
    "subject": "ingles",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Daily Routine, Time & Action Verbs",
    "topic": "Action Verbs: Wake up",
    "question": "Qual expressão em inglês significa 'acordar' pela manhã?",
    "options": [
      "Wake up",
      "Go to sleep",
      "Have dinner",
      "Take a bath"
    ],
    "correctIndex": 0,
    "explanation": "'Wake up' significa acordar!"
  },
  {
    "id": "ing_4_c1_02",
    "subject": "ingles",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Daily Routine, Time & Action Verbs",
    "topic": "Daily Routine: Meals",
    "question": "Qual refeição matinal se chama 'Breakfast' em inglês?",
    "options": [
      "Café da manhã",
      "Almoço (Lunch)",
      "Jantar (Dinner)",
      "Lanche da tarde (Snack)"
    ],
    "correctIndex": 0,
    "explanation": "'Breakfast' é o café da manhã (quebrar o jejum)!"
  },
  {
    "id": "ing_4_c1_03",
    "subject": "ingles",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Daily Routine, Time & Action Verbs",
    "topic": "Daily Routine: Brush teeth",
    "question": "O que significa a ação de higiene 'Brush your teeth'?",
    "options": [
      "Escovar os dentes",
      "Pentear o cabelo",
      "Lavar as mãos",
      "Tomar banho"
    ],
    "correctIndex": 0,
    "explanation": "'Brush your teeth' significa escovar os dentes!"
  },
  {
    "id": "ing_4_c1_04",
    "subject": "ingles",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Daily Routine, Time & Action Verbs",
    "topic": "Daily Routine: Homework",
    "question": "Qual é o significado de 'Do homework'?",
    "options": [
      "Fazer a lição de casa / tarefa escolar",
      "Arrumar a cama",
      "Lavar a louça",
      "Assistir desenho"
    ],
    "correctIndex": 0,
    "explanation": "'Do homework' significa fazer a lição de casa escolar!"
  },
  {
    "id": "ing_4_c1_05",
    "subject": "ingles",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Daily Routine, Time & Action Verbs",
    "topic": "Telling Time: O'clock",
    "question": "Se o relógio marca exatamente 8:00 horas em ponto, como dizemos em inglês?",
    "options": [
      "It is eight o'clock",
      "It is eight half",
      "It is eight quarter",
      "It is eight minutes"
    ],
    "correctIndex": 0,
    "explanation": "Para horas exatas cheias, usamos 'o'clock': 'It is eight o'clock'!"
  },
  {
    "id": "ing_4_c1_06",
    "subject": "ingles",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Daily Routine, Time & Action Verbs",
    "topic": "Telling Time: Half past",
    "question": "A expressão 'Half past seven' (7:30) significa que horas?",
    "options": [
      "Sete e meia (7:30)",
      "Sete e quinze (7:15)",
      "Sete horas em ponto (7:00)",
      "Quinze para as sete (6:45)"
    ],
    "correctIndex": 0,
    "explanation": "'Half past' significa metade de hora passada (30 minutos): 7:30!"
  },
  {
    "id": "ing_4_c1_07",
    "subject": "ingles",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Daily Routine, Time & Action Verbs",
    "topic": "Frequency Adverbs: Always & Never",
    "question": "O que significam os advérbios de frequência 'Always' e 'Never'?",
    "options": [
      "Sempre e Nunca",
      "Às vezes e Frequentemente",
      "Hoje e Amanhã",
      "Cedo e Tarde"
    ],
    "correctIndex": 0,
    "explanation": "'Always' significa sempre (100%) e 'Never' significa nunca (0%)!"
  },
  {
    "id": "ing_4_c1_08",
    "subject": "ingles",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Daily Routine, Time & Action Verbs",
    "topic": "Frequency Adverbs: Sometimes",
    "question": "Qual advérbio significa 'Às vezes' em inglês?",
    "options": [
      "Sometimes",
      "Always",
      "Never",
      "Rarely"
    ],
    "correctIndex": 0,
    "explanation": "'Sometimes' significa às vezes!"
  },
  {
    "id": "ing_4_c1_09",
    "subject": "ingles",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Daily Routine, Time & Action Verbs",
    "topic": "Present Continuous: Studying",
    "question": "Na frase 'Cecília is studying English now', o que Cecília está fazendo?",
    "options": [
      "Estudando inglês agora",
      "Jogando bola",
      "Dormindo",
      "Comendo almoço"
    ],
    "correctIndex": 0,
    "explanation": "'Is studying' é o presente contínuo: está estudando!"
  },
  {
    "id": "ing_4_c1_10",
    "subject": "ingles",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Daily Routine, Time & Action Verbs",
    "topic": "Action Verbs: Read & Write",
    "question": "Quais ações são 'Read' e 'Write'?",
    "options": [
      "Ler e Escrever",
      "Ouvir e Falar",
      "Correr e Pular",
      "Comer e Beber"
    ],
    "correctIndex": 0,
    "explanation": "'Read' é ler e 'Write' é escrever!"
  },
  {
    "id": "ing_4_c1_11",
    "subject": "ingles",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Daily Routine, Time & Action Verbs",
    "topic": "Action Verbs: Listen & Speak",
    "question": "Quais ações são 'Listen to music' e 'Speak English'?",
    "options": [
      "Ouvir música e Falar inglês",
      "Dançar música e Cantar em inglês",
      "Tocar piano e Desenhar",
      "Ler livro e Dormir"
    ],
    "correctIndex": 0,
    "explanation": "'Listen' é escutar/ouvir e 'Speak' é falar!"
  },
  {
    "id": "ing_4_c1_12",
    "subject": "ingles",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Daily Routine, Time & Action Verbs",
    "topic": "Telling Time: A.M. and P.M.",
    "question": "Em inglês, o que indicam as siglas 'a.m.' e 'p.m.' no horário?",
    "options": [
      "a.m. antes do meio-dia (manhã) e p.m. após o meio-dia (tarde/noite)",
      "a.m. noite e p.m. manhã",
      "a.m. dias da semana e p.m. finais de semana",
      "a.m. minutos e p.m. segundos"
    ],
    "correctIndex": 0,
    "explanation": "a.m. (ante meridiem) = antes do meio-dia; p.m. (post meridiem) = depois do meio-dia!"
  },
  {
    "id": "ing_4_c1_13",
    "subject": "ingles",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Daily Routine, Time & Action Verbs",
    "topic": "Routine Sentence Formation",
    "question": "Como se traduz: 'I go to school in the morning'?",
    "options": [
      "Eu vou para a escola de manhã",
      "Eu volto da escola à noite",
      "Eu brinco na escola à tarde",
      "Minha escola fica perto"
    ],
    "correctIndex": 0,
    "explanation": "'I go to school in the morning' = Eu vou para a escola de manhã!"
  },
  {
    "id": "ing_4_c1_14",
    "subject": "ingles",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Daily Routine, Time & Action Verbs",
    "topic": "Days of the Week: Monday to Friday",
    "question": "Quais são os dias 'Monday, Wednesday, Friday' em português?",
    "options": [
      "Segunda-feira, Quarta-feira, Sexta-feira",
      "Terça-feira, Quinta-feira, Sábado",
      "Domingo, Segunda, Terça",
      "Quinta, Sexta, Sábado"
    ],
    "correctIndex": 0,
    "explanation": "Monday = Segunda, Wednesday = Quarta, Friday = Sexta!"
  },
  {
    "id": "ing_4_c1_15",
    "subject": "ingles",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Daily Routine, Time & Action Verbs",
    "topic": "Weekend Days",
    "question": "Quais são os dois dias do fim de semana ('Weekend') em inglês?",
    "options": [
      "Saturday and Sunday",
      "Tuesday and Thursday",
      "Monday and Friday",
      "Wednesday and Saturday"
    ],
    "correctIndex": 0,
    "explanation": "Saturday (Sábado) e Sunday (Domingo) compõem o Weekend!"
  },
  {
    "id": "ing_4_c2_01",
    "subject": "ingles",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Describing People, Adjectives & Feelings",
    "topic": "Physical Appearance: Tall and Short",
    "question": "Quais adjetivos descrevem uma pessoa 'alta' e uma pessoa 'baixa' em inglês?",
    "options": [
      "Tall and Short",
      "Fat and Slim",
      "Old and Young",
      "Big and Little"
    ],
    "correctIndex": 0,
    "explanation": "'Tall' significa alto e 'Short' significa baixo!"
  },
  {
    "id": "ing_4_c2_02",
    "subject": "ingles",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Describing People, Adjectives & Feelings",
    "topic": "Feelings: Happy and Sad",
    "question": "Como dizemos em inglês quando estamos 'felizes' ou 'tristes'?",
    "options": [
      "Happy and Sad",
      "Angry and Calm",
      "Tired and Energetic",
      "Hungry and Full"
    ],
    "correctIndex": 0,
    "explanation": "'Happy' é feliz e 'Sad' é triste!"
  },
  {
    "id": "ing_4_c2_03",
    "subject": "ingles",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Describing People, Adjectives & Feelings",
    "topic": "Needs: Hungry and Thirsty",
    "question": "Depois de correr na rota de Kanto, você sente vontade de comer e beber. Em inglês, como se diz 'faminto' e 'com sede'?",
    "options": [
      "Hungry and Thirsty",
      "Sleepy and Tired",
      "Hot and Cold",
      "Fast and Slow"
    ],
    "correctIndex": 0,
    "explanation": "'Hungry' significa com fome e 'Thirsty' significa com sede!"
  },
  {
    "id": "ing_4_c2_04",
    "subject": "ingles",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Describing People, Adjectives & Feelings",
    "topic": "Qualities: Smart and Brave",
    "question": "Uma treinadora muito 'inteligente' e 'corajosa' é descrita como:",
    "options": [
      "Smart and Brave",
      "Lazy and Weak",
      "Noisy and Quiet",
      "Slow and Soft"
    ],
    "correctIndex": 0,
    "explanation": "'Smart' significa inteligente / esperta e 'Brave' significa corajosa!"
  },
  {
    "id": "ing_4_c2_05",
    "subject": "ingles",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Describing People, Adjectives & Feelings",
    "topic": "Feelings: Excited",
    "question": "Quando você ganha uma insígnia de ginásio e fica muito empolgada/animada, qual é o adjetivo em inglês?",
    "options": [
      "Excited",
      "Bored",
      "Angry",
      "Afraid"
    ],
    "correctIndex": 0,
    "explanation": "'Excited' significa animada, entusiasmada, empolgada!"
  },
  {
    "id": "ing_4_c2_06",
    "subject": "ingles",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Describing People, Adjectives & Feelings",
    "topic": "Feelings: Tired and Sleepy",
    "question": "Após um longo dia de estudos, você se sente 'cansada' e 'com sono'. Quais são as palavras?",
    "options": [
      "Tired and Sleepy",
      "Active and Fresh",
      "Happy and Smiling",
      "Cold and Wet"
    ],
    "correctIndex": 0,
    "explanation": "'Tired' significa cansada e 'Sleepy' com sono!"
  },
  {
    "id": "ing_4_c2_07",
    "subject": "ingles",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Describing People, Adjectives & Feelings",
    "topic": "Hair Description: Long, Short, Curly, Straight",
    "question": "Como descrever um cabelo 'longo e cacheado' em inglês?",
    "options": [
      "Long and curly hair",
      "Short and straight hair",
      "Dark and bald",
      "Blonde and straight"
    ],
    "correctIndex": 0,
    "explanation": "'Long' é comprido e 'Curly' é cacheado/encaracolado!"
  },
  {
    "id": "ing_4_c2_08",
    "subject": "ingles",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Describing People, Adjectives & Feelings",
    "topic": "Eye Colors",
    "question": "Como se traduz 'olhos castanhos' e 'olhos azuis' em inglês?",
    "options": [
      "Brown eyes and Blue eyes",
      "Black eyes and Red eyes",
      "Green eyes and Gray eyes",
      "Yellow eyes and Pink eyes"
    ],
    "correctIndex": 0,
    "explanation": "'Brown eyes' = olhos castanhos e 'Blue eyes' = olhos azuis!"
  },
  {
    "id": "ing_4_c2_09",
    "subject": "ingles",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Describing People, Adjectives & Feelings",
    "topic": "Personality: Friendly and Kind",
    "question": "Uma pessoa amigável e gentil com todos os amigos é descrita como:",
    "options": [
      "Friendly and Kind",
      "Rude and Mean",
      "Scary and Angry",
      "Selfish and Jealous"
    ],
    "correctIndex": 0,
    "explanation": "'Friendly' é amigável e 'Kind' é bondosa/gentil!"
  },
  {
    "id": "ing_4_c2_10",
    "subject": "ingles",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Describing People, Adjectives & Feelings",
    "topic": "Comparatives: Faster than",
    "question": "Para dizer que o Pikachu é mais veloz que o Snorlax em inglês, usamos:",
    "options": [
      "Pikachu is faster than Snorlax",
      "Pikachu is more fast Snorlax",
      "Pikachu is fastest",
      "Pikachu as fast Snorlax"
    ],
    "correctIndex": 0,
    "explanation": "Em adjetivos curtos, acrescentamos '-er than': 'faster than' (mais rápido que)!"
  },
  {
    "id": "ing_4_c2_11",
    "subject": "ingles",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Describing People, Adjectives & Feelings",
    "topic": "Comparatives: Bigger than",
    "question": "Como dizemos: 'O elefante é maior do que o rato'?",
    "options": [
      "The elephant is bigger than the mouse",
      "The elephant is big than the mouse",
      "The elephant is more big",
      "The elephant is small than"
    ],
    "correctIndex": 0,
    "explanation": "'Bigger than' significa maior do que (dobra a consoante 'g')!"
  },
  {
    "id": "ing_4_c2_12",
    "subject": "ingles",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Describing People, Adjectives & Feelings",
    "topic": "Age Comparison: Older and Younger",
    "question": "Cecília tem 9 anos e Bianca tem 7 anos. Portanto, Cecília é 'Older' e Bianca é 'Younger'. O que significa?",
    "options": [
      "Mais velha e Mais nova",
      "Mais alta e Mais baixa",
      "Mais rápida e Mais lenta",
      "Mais forte e Mais fraca"
    ],
    "correctIndex": 0,
    "explanation": "'Older' significa mais velha e 'Younger' significa mais nova/jovem!"
  },
  {
    "id": "ing_4_c2_13",
    "subject": "ingles",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Describing People, Adjectives & Feelings",
    "topic": "Opposites: Strong and Weak",
    "question": "Quais são os adjetivos opostos para 'Forte' e 'Fraco' em inglês?",
    "options": [
      "Strong and Weak",
      "Heavy and Light",
      "Hard and Easy",
      "Hot and Cold"
    ],
    "correctIndex": 0,
    "explanation": "'Strong' é forte e 'Weak' é fraco!"
  },
  {
    "id": "ing_4_c2_14",
    "subject": "ingles",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Describing People, Adjectives & Feelings",
    "topic": "Feelings: Proud",
    "question": "Quando você tira nota 10 na prova e seus pais ficam 'Proud', como eles se sentem?",
    "options": [
      "Orgulhosos",
      "Preocupados",
      "Surpresos",
      "Tristes"
    ],
    "correctIndex": 0,
    "explanation": "'Proud' significa orgulhoso(a)!"
  },
  {
    "id": "ing_4_c2_15",
    "subject": "ingles",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Describing People, Adjectives & Feelings",
    "topic": "Verb to be with Feelings",
    "question": "Qual frase está gramaticalmente correta em inglês para dizer 'Nós estamos felizes'?",
    "options": [
      "We are happy",
      "We is happy",
      "We am happy",
      "We be happy"
    ],
    "correctIndex": 0,
    "explanation": "Com o pronome 'We', usamos o verbo 'are': 'We are happy'!"
  },
  {
    "id": "ing_4_c3_01",
    "subject": "ingles",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Places in the City, Directions & School Subjects",
    "topic": "Places: School and Library",
    "question": "Quais lugares da cidade são 'School' e 'Library'?",
    "options": [
      "Escola e Biblioteca",
      "Hospital e Farmácia",
      "Mercado e Padaria",
      "Parque e Cinema"
    ],
    "correctIndex": 0,
    "explanation": "'School' é escola e 'Library' é biblioteca!"
  },
  {
    "id": "ing_4_c3_02",
    "subject": "ingles",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Places in the City, Directions & School Subjects",
    "topic": "Places: Hospital and Police Station",
    "question": "Onde os médicos cuidam dos doentes e onde os policiais trabalham em inglês?",
    "options": [
      "Hospital and Police Station",
      "Bakery and Supermarket",
      "Museum and Theater",
      "Hotel and Airport"
    ],
    "correctIndex": 0,
    "explanation": "'Hospital' é hospital e 'Police Station' é delegacia de polícia!"
  },
  {
    "id": "ing_4_c3_03",
    "subject": "ingles",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Places in the City, Directions & School Subjects",
    "topic": "Places: Supermarket and Bakery",
    "question": "Onde compramos mantimentos para a casa e pão quentinho em inglês?",
    "options": [
      "Supermarket and Bakery",
      "Bookstore and Toy Store",
      "Park and Zoo",
      "Bank and Post Office"
    ],
    "correctIndex": 0,
    "explanation": "'Supermarket' é supermercado e 'Bakery' é padaria!"
  },
  {
    "id": "ing_4_c3_04",
    "subject": "ingles",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Places in the City, Directions & School Subjects",
    "topic": "Places: Park and Zoo",
    "question": "Qual lugar tem árvores e gramados para brincar ('Park') e onde podemos ver animais protegidos ('Zoo')?",
    "options": [
      "Parque e Zoológico",
      "Praia e Montanha",
      "Aeroporto e Estação",
      "Clube e Estádio"
    ],
    "correctIndex": 0,
    "explanation": "'Park' é parque e 'Zoo' é jardim zoológico!"
  },
  {
    "id": "ing_4_c3_05",
    "subject": "ingles",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Places in the City, Directions & School Subjects",
    "topic": "Directions: Turn Left & Turn Right",
    "question": "Ao navegar pelo mapa de Kanto, você precisa virar à esquerda e virar à direita. Como se diz isso?",
    "options": [
      "Turn left and Turn right",
      "Go straight and Stop",
      "Turn back and Jump",
      "Walk and Run"
    ],
    "correctIndex": 0,
    "explanation": "'Turn left' é vire à esquerda e 'Turn right' é vire à direita!"
  },
  {
    "id": "ing_4_c3_06",
    "subject": "ingles",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Places in the City, Directions & School Subjects",
    "topic": "Directions: Go straight ahead",
    "question": "Qual instrução de direção significa 'Siga em frente / Vá direto'?",
    "options": [
      "Go straight ahead",
      "Turn around",
      "Cross the bridge",
      "Look behind"
    ],
    "correctIndex": 0,
    "explanation": "'Go straight ahead' significa seguir reto / em frente!"
  },
  {
    "id": "ing_4_c3_07",
    "subject": "ingles",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Places in the City, Directions & School Subjects",
    "topic": "Prepositions of Place: Next to & Between",
    "question": "O que significam as preposições de lugar 'Next to' e 'Between'?",
    "options": [
      "Ao lado de e Entre dois lugares",
      "Em cima e Embaixo",
      "Dentro e Fora",
      "Atrás e Na frente"
    ],
    "correctIndex": 0,
    "explanation": "'Next to' = ao lado de; 'Between' = entre duas coisas ou lugares!"
  },
  {
    "id": "ing_4_c3_08",
    "subject": "ingles",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Places in the City, Directions & School Subjects",
    "topic": "Prepositions: In front of & Behind",
    "question": "Se a estátua do Pokémon está na frente do ginásio, dizemos que ela está:",
    "options": [
      "In front of the gym",
      "Behind the gym",
      "Under the gym",
      "Inside the gym"
    ],
    "correctIndex": 0,
    "explanation": "'In front of' significa em frente a / na frente de!"
  },
  {
    "id": "ing_4_c3_09",
    "subject": "ingles",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Places in the City, Directions & School Subjects",
    "topic": "School Subjects: Math and Science",
    "question": "Quais matérias escolares são 'Math' e 'Science' em português?",
    "options": [
      "Matemática e Ciências",
      "História e Geografia",
      "Inglês e Artes",
      "Educação Física e Música"
    ],
    "correctIndex": 0,
    "explanation": "'Math' é Matemática e 'Science' é Ciências!"
  },
  {
    "id": "ing_4_c3_10",
    "subject": "ingles",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Places in the City, Directions & School Subjects",
    "topic": "School Subjects: History and Geography",
    "question": "A matéria que estuda o passado da humanidade e a que estuda mapas e relevo são:",
    "options": [
      "History and Geography",
      "Physical Education and Art",
      "Math and Portuguese",
      "Music and Drama"
    ],
    "correctIndex": 0,
    "explanation": "'History' é História e 'Geography' é Geografia!"
  },
  {
    "id": "ing_4_c3_11",
    "subject": "ingles",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Places in the City, Directions & School Subjects",
    "topic": "School Subjects: Physical Education (P.E.)",
    "question": "Qual disciplina escolar é conhecida pela sigla 'P.E.' onde praticamos esportes?",
    "options": [
      "Physical Education (Educação Física)",
      "Primary English",
      "Physics Experiment",
      "Public Economy"
    ],
    "correctIndex": 0,
    "explanation": "P.E. é a sigla para 'Physical Education' (Educação Física)!"
  },
  {
    "id": "ing_4_c3_12",
    "subject": "ingles",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Places in the City, Directions & School Subjects",
    "topic": "School Subjects: Art & Music",
    "question": "As aulas onde pintamos quadros, desenhamos e tocamos instrumentos musicais são:",
    "options": [
      "Art and Music",
      "Math and Science",
      "History and P.E.",
      "Geography and Coding"
    ],
    "correctIndex": 0,
    "explanation": "'Art' é Artes e 'Music' é Música!"
  },
  {
    "id": "ing_4_c3_13",
    "subject": "ingles",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Places in the City, Directions & School Subjects",
    "topic": "Asking for Directions",
    "question": "Como se pergunta educadamente na rua: 'Onde fica a biblioteca?'",
    "options": [
      "Where is the library, please?",
      "What time is the library?",
      "Who is the library?",
      "Why the library?"
    ],
    "correctIndex": 0,
    "explanation": "'Where is...?' é a pergunta para saber a localização de um lugar!"
  },
  {
    "id": "ing_4_c3_14",
    "subject": "ingles",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Places in the City, Directions & School Subjects",
    "topic": "Places: Bookstore and Toy Store",
    "question": "Onde compramos livros incríveis e onde compramos brinquedos divertidos?",
    "options": [
      "Bookstore and Toy store",
      "Pet shop and Bakery",
      "Pharmacy and Bank",
      "Cinema and Museum"
    ],
    "correctIndex": 0,
    "explanation": "'Bookstore' é livraria e 'Toy store' é loja de brinquedos!"
  },
  {
    "id": "ing_4_c3_15",
    "subject": "ingles",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Places in the City, Directions & School Subjects",
    "topic": "Transportation: Bus and Bicycle",
    "question": "Como se chamam os meios de transporte 'Ônibus' e 'Bicicleta' em inglês?",
    "options": [
      "Bus and Bicycle (or Bike)",
      "Train and Airplane",
      "Car and Boat",
      "Subway and Truck"
    ],
    "correctIndex": 0,
    "explanation": "'Bus' é ônibus e 'Bicycle' (ou 'Bike') é bicicleta!"
  },
  {
    "id": "ing_4_c4_01",
    "subject": "ingles",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Computer Science, Internet Safety & Coding Logic",
    "topic": "Algorithm",
    "question": "Em Ciência da Computação e Programação, o que é um 'Algoritmo' (Algorithm)?",
    "options": [
      "Uma sequência passo a passo de instruções lógicas para resolver um problema",
      "Um vírus perigoso de computador",
      "Um tipo de teclado gamer colorido",
      "O nome da tela do monitor"
    ],
    "correctIndex": 0,
    "explanation": "Um algoritmo é uma sequência ordenada e finita de passos para executar uma tarefa!"
  },
  {
    "id": "ing_4_c4_02",
    "subject": "ingles",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Computer Science, Internet Safety & Coding Logic",
    "topic": "Coding: Bug and Debug",
    "question": "Quando um programa tem um erro no código e o programador vai consertá-lo, como chamamos o erro e o conserto?",
    "options": [
      "Bug (o erro) e Debug / Debugging (o conserto)",
      "Virus e Antivirus",
      "File e Folder",
      "Click e Double-click"
    ],
    "correctIndex": 0,
    "explanation": "'Bug' é o erro ou falha no código e 'Debug' é o processo de encontrar e corrigir essa falha!"
  },
  {
    "id": "ing_4_c4_03",
    "subject": "ingles",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Computer Science, Internet Safety & Coding Logic",
    "topic": "Coding: Loop",
    "question": "Na programação, o que faz um comando de 'Loop' (repetição, como 'for' ou 'while')?",
    "options": [
      "Repete uma sequência de instruções várias vezes automaticamente",
      "Desliga o computador na hora",
      "Apaga todos os arquivos do disco",
      "Muda a cor do monitor para preto"
    ],
    "correctIndex": 0,
    "explanation": "O 'Loop' executa um bloco de código repetidas vezes enquanto uma condição for verdadeira!"
  },
  {
    "id": "ing_4_c4_04",
    "subject": "ingles",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Computer Science, Internet Safety & Coding Logic",
    "topic": "Coding: Variable",
    "question": "O que é uma 'Variável' (Variable) em um jogo ou programa?",
    "options": [
      "Um espaço na memória que guarda um valor que pode mudar (ex: pontos, vidas, nome)",
      "Um botão físico que quebra facilmente",
      "A tomada de energia elétrica",
      "O mousepad que usamos na mesa"
    ],
    "correctIndex": 0,
    "explanation": "Uma variável armazena dados que podem ser lidos e alterados durante a execução do programa!"
  },
  {
    "id": "ing_4_c4_05",
    "subject": "ingles",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Computer Science, Internet Safety & Coding Logic",
    "topic": "Conditional: IF / ELSE",
    "question": "Em lógica de programação, o que significa a estrutura condicional 'IF / ELSE'?",
    "options": [
      "'SE uma condição acontecer, faça A; SENÃO, faça B'",
      "'SEMPRE desligue o programa'",
      "'REPITA mil vezes'",
      "'ENVIE um e-mail para todos'"
    ],
    "correctIndex": 0,
    "explanation": "'IF / ELSE' (Se / Senão) toma decisões baseadas em condições verdadeiras ou falsas!"
  },
  {
    "id": "ing_4_c4_06",
    "subject": "ingles",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Computer Science, Internet Safety & Coding Logic",
    "topic": "Hardware vs Software",
    "question": "Qual é a diferença fundamental entre 'Hardware' e 'Software'?",
    "options": [
      "Hardware são as peças físicas que podemos tocar (teclado, chip); Software são os programas e códigos",
      "Hardware são os jogos e Software são as tomadas",
      "Hardware é a internet e Software é o monitor",
      "Não há diferença nenhuma"
    ],
    "correctIndex": 0,
    "explanation": "Hardware é a parte física (chips, placa, tela) e Software são os dados e programas lógicos!"
  },
  {
    "id": "ing_4_c4_07",
    "subject": "ingles",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Computer Science, Internet Safety & Coding Logic",
    "topic": "Internet Safety: Strong Password",
    "question": "Para manter nossas contas e jogos seguros na internet, o que é uma 'Strong Password' (senha forte)?",
    "options": [
      "Uma senha longa combinando letras maiúsculas, minúsculas, números e símbolos secretos",
      "Usar apenas '123456' ou a data de nascimento",
      "Usar o próprio primeiro nome repetido",
      "Contar a senha para todos os colegas da classe"
    ],
    "correctIndex": 0,
    "explanation": "Senhas fortes misturam letras, números e símbolos e nunca devem ser compartilhadas com estranhos!"
  },
  {
    "id": "ing_4_c4_08",
    "subject": "ingles",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Computer Science, Internet Safety & Coding Logic",
    "topic": "Internet Safety: Personal Data",
    "question": "O que NUNCA devemos compartilhar na internet com desconhecidos em salas de jogos online?",
    "options": [
      "Nosso endereço de casa, telefone, escola e fotos pessoais",
      "O nome do nosso Pokémon favorito",
      "A cor preferida da nossa roupa no jogo",
      "Nossa pontuação máxima no jogo"
    ],
    "correctIndex": 0,
    "explanation": "Dados pessoais privados devem sempre ser protegidos para garantir a segurança da criança!"
  },
  {
    "id": "ing_4_c4_09",
    "subject": "ingles",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Computer Science, Internet Safety & Coding Logic",
    "topic": "Digital Citizenship: Respect online",
    "question": "O que é 'Cidadania Digital' (Digital Citizenship)?",
    "options": [
      "Tratar todas as pessoas na internet com educação, respeito e empatia, sem praticar bullying",
      "Ficar jogando 24 horas sem dormir",
      "Mandar mensagens ofensivas escondido",
      "Baixar jogos piratas que quebram o computador"
    ],
    "correctIndex": 0,
    "explanation": "Cidadania digital envolve agir com ética, segurança e gentileza no mundo virtual!"
  },
  {
    "id": "ing_4_c4_10",
    "subject": "ingles",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Computer Science, Internet Safety & Coding Logic",
    "topic": "Web Browser",
    "question": "O que é um 'Web Browser' (Navegador da Web, como Chrome ou Edge)?",
    "options": [
      "O programa que usamos para acessar sites e páginas na Internet",
      "A tomada que liga a caixa de som",
      "O botão de ligar o mouse",
      "Um joguinho de corrida"
    ],
    "correctIndex": 0,
    "explanation": "O navegador web interpreta páginas HTML e dados da internet para que possamos navegar!"
  },
  {
    "id": "ing_4_c4_11",
    "subject": "ingles",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Computer Science, Internet Safety & Coding Logic",
    "topic": "Input and Output",
    "question": "Na computação, o teclado é um dispositivo de 'Input' (Entrada) e a impressora é de 'Output' (Saída). O que isso significa?",
    "options": [
      "Input envia dados para dentro do computador; Output entrega o resultado pronto para fora",
      "Input desliga e Output liga",
      "Input guarda água e Output esquenta",
      "Ambos fazem a mesma coisa"
    ],
    "correctIndex": 0,
    "explanation": "Input = entrada de informações; Output = saída/exibição de resultados!"
  },
  {
    "id": "ing_4_c4_12",
    "subject": "ingles",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Computer Science, Internet Safety & Coding Logic",
    "topic": "Artificial Intelligence (AI)",
    "question": "O que é Inteligência Artificial (AI / IA)?",
    "options": [
      "Sistemas de computador treinados com dados capazes de aprender, reconhecer padrões e ajudar a criar soluções",
      "Um robô de metal com sentimentos humanos mágicos",
      "Um vírus de computador",
      "Uma bateria recarregável"
    ],
    "correctIndex": 0,
    "explanation": "IA é o ramo da tecnologia que desenvolve programas inteligentes capazes de raciocínio e aprendizado!"
  },
  {
    "id": "ing_4_c4_13",
    "subject": "ingles",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Computer Science, Internet Safety & Coding Logic",
    "topic": "Binary Code: 0 and 1",
    "question": "No nível mais básico dos chips, os computadores processam informações usando qual código formado apenas por 0 e 1?",
    "options": [
      "Código Binário (Binary Code)",
      "Alfabeto Grego",
      "Código Morse",
      "Números Romanos"
    ],
    "correctIndex": 0,
    "explanation": "O código binário usa bits (0 e 1) representando os estados ligado/desligado de energia!"
  },
  {
    "id": "ing_4_c4_14",
    "subject": "ingles",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Computer Science, Internet Safety & Coding Logic",
    "topic": "Cloud Computing: The Cloud",
    "question": "Quando salvamos o progresso do nosso jogo na 'Nuvem' (Cloud Storage), onde o arquivo fica guardado?",
    "options": [
      "Em servidores seguros conectados à internet, podendo ser acessado de qualquer aparelho",
      "Em uma nuvem real de chuva no céu",
      "Apenas na tomada de casa",
      "No chip da televisão desligada"
    ],
    "correctIndex": 0,
    "explanation": "Armazenamento em nuvem guarda dados em servidores seguros via internet (como no Supabase)!"
  },
  {
    "id": "ing_4_c4_15",
    "subject": "ingles",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Computer Science, Internet Safety & Coding Logic",
    "topic": "Coding Languages",
    "question": "TypeScript, JavaScript e Python são exemplos de quê no mundo dos desenvolvedores?",
    "options": [
      "Linguagens de Programação (Programming Languages)",
      "Marcas de computadores portáteis",
      "Tipos de mouses gamers",
      "Modelos de roteadores Wi-Fi"
    ],
    "correctIndex": 0,
    "explanation": "São linguagens de programação usadas para escrever códigos, criar sites, jogos e aplicativos!"
  },
  {
    "id": "bio_2_c1_01",
    "subject": "biologia",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Animais e Metamorfose",
    "topic": "Metamorfose da Borboleta: Fases",
    "question": "Qual é a ordem correta das 4 fases da metamorfose de uma borboleta (como o Caterpie virando Butterfree)?",
    "options": [
      "Ovo -> Lagarta -> Casulo (Crisálida) -> Borboleta adulta",
      "Borboleta -> Ovo -> Casulo -> Lagarta",
      "Lagarta -> Peixe -> Pássaro -> Borboleta",
      "Ovo -> Borboleta -> Lagarta -> Casulo"
    ],
    "correctIndex": 0,
    "explanation": "A borboleta nasce do ovo como lagarta, entra no casulo/crisálida e se transforma em uma linda borboleta!"
  },
  {
    "id": "bio_2_c1_02",
    "subject": "biologia",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Animais e Metamorfose",
    "topic": "Metamorfose do Sapo",
    "question": "Quando o filhote do sapo nasce do ovo na água, ele nada como um peixinho com cauda. Como ele se chama?",
    "options": [
      "Girino",
      "Lagarta",
      "Pintinho",
      "Alevino"
    ],
    "correctIndex": 0,
    "explanation": "O filhotinho aquático do sapo se chama girino antes de perder a cauda e criar perninhas!"
  },
  {
    "id": "bio_2_c1_03",
    "subject": "biologia",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Animais e Metamorfose",
    "topic": "Respiração dos Girinos e Sapos",
    "question": "Onde o girino respira e como o sapo adulto respira?",
    "options": [
      "O girino respira na água por brânquias e o sapo adulto respira por pulmões e pela pele úmida",
      "Ambos respiram apenas por nadadeiras",
      "O girino voa e o sapo nada",
      "O sapo não precisa respirar"
    ],
    "correctIndex": 0,
    "explanation": "Girinos têm brânquias na água; sapos adultos usam pulmões e a própria pele fininha para respirar!"
  },
  {
    "id": "bio_2_c1_04",
    "subject": "biologia",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Animais e Metamorfose",
    "topic": "Animais Ovíparos",
    "question": "O que são animais 'Ovíparos'?",
    "options": [
      "Animais que nascem de ovos colocados pela mãe (como galinha, tartaruga e pássaros)",
      "Animais que mamam leite da mãe",
      "Animais que só comem capim",
      "Animais que vivem na neve"
    ],
    "correctIndex": 0,
    "explanation": "Ovíparos são os animais cujos filhotes se desenvolvem e nascem a partir de ovos!"
  },
  {
    "id": "bio_2_c1_05",
    "subject": "biologia",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Animais e Metamorfose",
    "topic": "Animais Vivíparos / Mamíferos",
    "question": "Os cachorrinhos, gatinhos e seres humanos se desenvolvem na barriga da mãe e mamam quando bebês. Eles são chamados de:",
    "options": [
      "Mamíferos (vivíparos)",
      "Aves",
      "Répteis",
      "Insetos"
    ],
    "correctIndex": 0,
    "explanation": "Os mamíferos nascem da barriga da mãe e se alimentam de leite materno!"
  },
  {
    "id": "bio_2_c1_06",
    "subject": "biologia",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Animais e Metamorfose",
    "topic": "Revestimento do Corpo: Aves",
    "question": "O corpo dos passarinhos e das galinhas é coberto de quê para aquecer e ajudar no voo?",
    "options": [
      "Penas",
      "Escamas duras",
      "Pelos compridos",
      "Casco de pedra"
    ],
    "correctIndex": 0,
    "explanation": "Todas as aves têm o corpo coberto por penas leves e quentinhas!"
  },
  {
    "id": "bio_2_c1_07",
    "subject": "biologia",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Animais e Metamorfose",
    "topic": "Revestimento do Corpo: Peixes e Répteis",
    "question": "Os peixes que nadam no rio e as cobras têm o corpo coberto por:",
    "options": [
      "Escamas",
      "Penas",
      "Lã macia",
      "Folhas secas"
    ],
    "correctIndex": 0,
    "explanation": "Peixes e répteis possuem escamas que protegem o corpo!"
  },
  {
    "id": "bio_2_c1_08",
    "subject": "biologia",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Animais e Metamorfose",
    "topic": "Revestimento do Corpo: Mamíferos",
    "question": "O cãozinho, o gatinho e o urso têm o corpo coberto de quê para se aquecer?",
    "options": [
      "Pelos",
      "Escamas",
      "Espinhos de ferro",
      "Penas coloridas"
    ],
    "correctIndex": 0,
    "explanation": "Os mamíferos possuem pelos que mantêm o calor do corpo!"
  },
  {
    "id": "bio_2_c1_09",
    "subject": "biologia",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Animais e Metamorfose",
    "topic": "Casulo do Metapod",
    "question": "Na natureza e no jogo, o que o casulo (pupa) protege enquanto a lagarta se transforma?",
    "options": [
      "Protege o corpinho em transformação até ele virar uma borboleta com asas fortes",
      "Guarda pedrinhas preciosas",
      "Serve apenas para dormir no inverno",
      "Não tem utilidade nenhuma"
    ],
    "correctIndex": 0,
    "explanation": "O casulo é um abrigo seguro e resistente onde ocorre a transformação mágica da metamorfose!"
  },
  {
    "id": "bio_2_c1_10",
    "subject": "biologia",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Animais e Metamorfose",
    "topic": "Habitat dos Animais",
    "question": "Onde vivem os animais aquáticos e os animais terrestres?",
    "options": [
      "Animais aquáticos vivem na água (rios e mares) e terrestres vivem na terra firme",
      "Aquáticos voam no ar e terrestres moram no espaço",
      "Ambos vivem apenas dentro de casas",
      "Nenhum animal vive na terra"
    ],
    "correctIndex": 0,
    "explanation": "Aquáticos habitam a água (peixes, baleias) e terrestres habitam a terra (cães, cavalos)!"
  },
  {
    "id": "bio_2_c1_11",
    "subject": "biologia",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Animais e Metamorfose",
    "topic": "Animais com Asas",
    "question": "Além das aves, qual grupo muito famoso de pequenos animais possui asas e consegue voar na natureza?",
    "options": [
      "Muitos insetos (como abelhas, besouros e libélulas)",
      "Peixes de rio",
      "Tartarugas marinhas",
      "Cobras"
    ],
    "correctIndex": 0,
    "explanation": "Muitos insetos possuem asas e são excelentes voadores!"
  },
  {
    "id": "bio_2_c1_12",
    "subject": "biologia",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Animais e Metamorfose",
    "topic": "O Pintinho e o Ovo",
    "question": "A galinha choca seus ovos no ninho mantendo-os quentinhos. O que nasce de dentro do ovo?",
    "options": [
      "O pintinho",
      "Um gatinho",
      "Um peixinho",
      "Uma lagarta"
    ],
    "correctIndex": 0,
    "explanation": "Do ovo da galinha nasce o pintinho após o período de choco!"
  },
  {
    "id": "bio_2_c1_13",
    "subject": "biologia",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Animais e Metamorfose",
    "topic": "Canguru e Bolsa Marsupial",
    "question": "O filhote do canguru nasce bem pequenininho e termina de crescer dentro de qual parte especial da mamãe?",
    "options": [
      "Na bolsa marsupial na barriga da mamãe",
      "Em um ninho no topo da árvore",
      "Em uma concha no mar",
      "Embaixo da terra"
    ],
    "correctIndex": 0,
    "explanation": "A mamãe canguru tem uma bolsa especial chamada marsúpio onde o filhote mama e cresce protegido!"
  },
  {
    "id": "bio_2_c1_14",
    "subject": "biologia",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Animais e Metamorfose",
    "topic": "Tartarugas Marinhas",
    "question": "Onde as mamães tartarugas marinhas sobem para botar e enterrar seus ovos na areia quentinha?",
    "options": [
      "Na praia / areia do litoral",
      "No topo da montanha",
      "Nas copas das árvores",
      "Dentro de cavernas de gelo"
    ],
    "correctIndex": 0,
    "explanation": "As tartarugas marinhas sobem na praia para fazer seus ninhos na areia quentinha!"
  },
  {
    "id": "bio_2_c1_15",
    "subject": "biologia",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Animais e Metamorfose",
    "topic": "Respeito ao Ciclo da Vida",
    "question": "Ao encontrar uma lagarta ou casulo no jardim, qual é a atitude correta e protetora?",
    "options": [
      "Observar com carinho sem machucar ou mexer, deixando a natureza fazer sua metamorfose",
      "Pisar na lagarta",
      "Arrancar o casulo e jogar na lixeira",
      "Levar para dentro de uma garrafa fechada sem ar"
    ],
    "correctIndex": 0,
    "explanation": "Devemos admirar e respeitar o ciclo da vida sem machucar os pequenos animais!"
  },
  {
    "id": "bio_2_c2_01",
    "subject": "biologia",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Alimentação: Herbívoros, Carnívoros e Onívoros",
    "topic": "Herbívoros",
    "question": "O que come um animal 'Herbívoro'?",
    "options": [
      "Apenas plantas, folhas, sementes e frutas da natureza",
      "Apenas a carne de outros animais",
      "Peixes e insetos venenosos",
      "Plásticos e metais"
    ],
    "correctIndex": 0,
    "explanation": "Herbívoros se alimentam exclusivamente de vegetais (plantas, grama, frutos)!"
  },
  {
    "id": "bio_2_c2_02",
    "subject": "biologia",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Alimentação: Herbívoros, Carnívoros e Onívoros",
    "topic": "Carnívoros",
    "question": "O leão, o tigre e o tubarão são animais 'Carnívoros'. O que eles comem?",
    "options": [
      "Carne de outros animais",
      "Apenas alface e cenoura",
      "Frutas doces como melancia",
      "Pão e queijo"
    ],
    "correctIndex": 0,
    "explanation": "Carnívoros caçam e se alimentam da carne de outros animais!"
  },
  {
    "id": "bio_2_c2_03",
    "subject": "biologia",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Alimentação: Herbívoros, Carnívoros e Onívoros",
    "topic": "Onívoros",
    "question": "Como chamamos os seres vivos que comem tanto vegetais quanto carnes (como o ser humano e o urso)?",
    "options": [
      "Onívoros",
      "Herbívoros",
      "Insetívoros",
      "Aquáticos"
    ],
    "correctIndex": 0,
    "explanation": "Onívoros comem de tudo: tanto vegetais (frutas, grãos) quanto carnes!"
  },
  {
    "id": "bio_2_c2_04",
    "subject": "biologia",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Alimentação: Herbívoros, Carnívoros e Onívoros",
    "topic": "Exemplo de Herbívoro: O Coelho",
    "question": "O coelhinho adora roer cenouras, folhas verdes e graminha fresca. Ele é um animal:",
    "options": [
      "Herbívoro",
      "Carnívoro",
      "Feroz caçador",
      "Tubarão"
    ],
    "correctIndex": 0,
    "explanation": "O coelho se alimenta de vegetais, por isso é herbívoro!"
  },
  {
    "id": "bio_2_c2_05",
    "subject": "biologia",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Alimentação: Herbívoros, Carnívoros e Onívoros",
    "topic": "Exemplo de Herbívoro Gigante: A Girafa e a Vaca",
    "question": "A vaca come capim no pasto e a girafa come folhas no topo das árvores altas. Ambas são:",
    "options": [
      "Herbívoras",
      "Carnívoras",
      "Aves aquáticas",
      "Predadoras de leões"
    ],
    "correctIndex": 0,
    "explanation": "Vacas e girafas alimentam-se unicamente de vegetais, sendo grandes herbívoros!"
  },
  {
    "id": "bio_2_c2_06",
    "subject": "biologia",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Alimentação: Herbívoros, Carnívoros e Onívoros",
    "topic": "Dentes dos Carnívoros",
    "question": "Os dentes caninos afiados e pontudos dos carnívoros servem para:",
    "options": [
      "Rasgar a carne do alimento",
      "Mastigar grama fininha",
      "Chupar suco de flores",
      "Pintar desenhos"
    ],
    "correctIndex": 0,
    "explanation": "Dentes caninos pontiagudos são adaptados para rasgar carne com facilidade!"
  },
  {
    "id": "bio_2_c2_07",
    "subject": "biologia",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Alimentação: Herbívoros, Carnívoros e Onívoros",
    "topic": "Dentes dos Herbívoros",
    "question": "Os dentes molares planos e largos do cavalo e do boi servem para:",
    "options": [
      "Triturar e amassar folhas duras e capim fibroso",
      "Morder pedras de ferro",
      "Picar gelo congelado",
      "Cantar músicas"
    ],
    "correctIndex": 0,
    "explanation": "Herbívoros têm dentes planos perfeitos para moer e triturar plantas!"
  },
  {
    "id": "bio_2_c2_08",
    "subject": "biologia",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Alimentação: Herbívoros, Carnívoros e Onívoros",
    "topic": "Frugívoros: Frutas",
    "question": "O tucano e o morcego-das-frutas comem deliciosas frutinhas da mata. Animais que comem frutas são chamados de:",
    "options": [
      "Frugívoros",
      "Carnívoros marinhos",
      "Vampiros",
      "Roedores de metal"
    ],
    "correctIndex": 0,
    "explanation": "Frugívoros são animais cuja dieta é baseada em frutas frescas!"
  },
  {
    "id": "bio_2_c2_09",
    "subject": "biologia",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Alimentação: Herbívoros, Carnívoros e Onívoros",
    "topic": "Insetívoros: Sapos e Tamanduás",
    "question": "O sapinho com sua língua elástica e o tamanduá com seu focinho comprido adoram comer formigas e mosquitos. Eles são:",
    "options": [
      "Insetívoros",
      "Herbívoros",
      "Peixes voadores",
      "Tubos de ensaio"
    ],
    "correctIndex": 0,
    "explanation": "Insetívoros alimentam-se principalmente de insetos!"
  },
  {
    "id": "bio_2_c2_10",
    "subject": "biologia",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Alimentação: Herbívoros, Carnívoros e Onívoros",
    "topic": "Néctar e Polinização: Abelhas e Beija-flores",
    "question": "O beija-flor e a abelhinha visitam as flores para beber o néctar docinho. Ao fazer isso, o que eles espalham?",
    "options": [
      "O pólen, ajudando as flores a nascerem e darem novos frutos (polinização)",
      "Lixo e sujeira",
      "Água da torneira",
      "Fumaça de queimada"
    ],
    "correctIndex": 0,
    "explanation": "Ao se alimentar de néctar, transportam os grãos de pólen, polinizando a natureza!"
  },
  {
    "id": "bio_2_c2_11",
    "subject": "biologia",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Alimentação: Herbívoros, Carnívoros e Onívoros",
    "topic": "O Ser Humano: Dieta Equilibrada",
    "question": "Como seres onívoros, qual prato de comida é o mais saudável para crianças fortes e felizes?",
    "options": [
      "Prato colorido com arroz, feijão, legumes, salada e uma proteína (frango, ovo ou peixe)",
      "Apenas batata frita e refrigerante todos os dias",
      "Apenas doces e pirulitos no almoço",
      "Nenhum vegetal"
    ],
    "correctIndex": 0,
    "explanation": "Uma refeição colorida e variada fornece todos os nutrientes que o corpo precisa!"
  },
  {
    "id": "bio_2_c2_12",
    "subject": "biologia",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Alimentação: Herbívoros, Carnívoros e Onívoros",
    "topic": "O Panda e o Bambu",
    "question": "O urso panda gigante passa o dia todo mastigando qual planta que ele adora?",
    "options": [
      "Bambu",
      "Cacto",
      "Laranja",
      "Pinho"
    ],
    "correctIndex": 0,
    "explanation": "A alimentação do urso panda é quase 99% composta por folhas e brotos de bambu!"
  },
  {
    "id": "bio_2_c2_13",
    "subject": "biologia",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Alimentação: Herbívoros, Carnívoros e Onívoros",
    "topic": "O Gavião e a Coruja: Caçadores da Noite",
    "question": "O gavião e a coruja usam visão afiada e garras fortes para caçar pequenos roedores. Eles são:",
    "options": [
      "Carnívoros de rapina",
      "Herbívoros da floresta",
      "Insetos da terra",
      "Peixes marinhos"
    ],
    "correctIndex": 0,
    "explanation": "São aves de rapina carnívoras equipadas com bico curvo e garras afiadas para caça!"
  },
  {
    "id": "bio_2_c2_14",
    "subject": "biologia",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Alimentação: Herbívoros, Carnívoros e Onívoros",
    "topic": "Cadeia Simples de Alimento",
    "question": "Em uma floresta: a grama alimenta o grilo, o grilo alimenta o sapo, e o sapo alimenta a cobra. Isso representa:",
    "options": [
      "Uma cadeia alimentar da natureza",
      "Um brinquedo quebrado",
      "Um videogame estragado",
      "Uma tempestade de areia"
    ],
    "correctIndex": 0,
    "explanation": "A cadeia alimentar mostra a sequência natural de quem se alimenta de quem na natureza!"
  },
  {
    "id": "bio_2_c2_15",
    "subject": "biologia",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Alimentação: Herbívoros, Carnívoros e Onívoros",
    "topic": "Importância de Cada Animal",
    "question": "O que acontece se todos os sapos de um jardim sumirem?",
    "options": [
      "O número de mosquitos e insetos vai aumentar muito, gerando desequilíbrio",
      "As árvores vão virar ouro",
      "Vai chover refrigerante",
      "Nada muda"
    ],
    "correctIndex": 0,
    "explanation": "Cada animal tem um papel essencial no equilíbrio do ecossistema!"
  },
  {
    "id": "bio_2_c3_01",
    "subject": "biologia",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Coleta Seletiva, Reciclagem e os 3 R's",
    "topic": "Lixeira Azul",
    "question": "Na coleta seletiva de lixo, qual material descartamos na lixeira AZUL?",
    "options": [
      "Papel e Papelão",
      "Plástico",
      "Vidro",
      "Restos de Comida"
    ],
    "correctIndex": 0,
    "explanation": "A lixeira Azul é destinada para Papel e papelão limpos!"
  },
  {
    "id": "bio_2_c3_02",
    "subject": "biologia",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Coleta Seletiva, Reciclagem e os 3 R's",
    "topic": "Lixeira Vermelha",
    "question": "Qual material descartamos na lixeira VERMELHA (como garrafas PET e potes)?",
    "options": [
      "Plástico",
      "Metal",
      "Vidro",
      "Madeira"
    ],
    "correctIndex": 0,
    "explanation": "A lixeira Vermelha é usada para descartar Plásticos!"
  },
  {
    "id": "bio_2_c3_03",
    "subject": "biologia",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Coleta Seletiva, Reciclagem e os 3 R's",
    "topic": "Lixeira Amarela",
    "question": "Latas de suco e tampinhas de alumínio devem ser jogadas na lixeira:",
    "options": [
      "Amarela (Metal)",
      "Azul (Papel)",
      "Verde (Vidro)",
      "Preta (Madeira)"
    ],
    "correctIndex": 0,
    "explanation": "A lixeira Amarela recebe materiais de Metal!"
  },
  {
    "id": "bio_2_c3_04",
    "subject": "biologia",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Coleta Seletiva, Reciclagem e os 3 R's",
    "topic": "Lixeira Verde",
    "question": "Copos e potes de vidro quebrados ou vazios pertencem à lixeira:",
    "options": [
      "Verde (Vidro)",
      "Vermelha (Plástico)",
      "Marrom (Orgânico)",
      "Cinza"
    ],
    "correctIndex": 0,
    "explanation": "A lixeira Verde é a cor padrão da coleta seletiva para Vidro!"
  },
  {
    "id": "bio_2_c3_05",
    "subject": "biologia",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Coleta Seletiva, Reciclagem e os 3 R's",
    "topic": "Lixeira Marrom",
    "question": "Cascas de banana, restos de maçã e folhas secas vão na lixeira MARROM. Esse lixo se chama:",
    "options": [
      "Lixo Orgânico",
      "Lixo Perigoso",
      "Lixo Eletrônico",
      "Lixo Hospitalar"
    ],
    "correctIndex": 0,
    "explanation": "A lixeira Marrom é para resíduos orgânicos (restos de alimentos da natureza)!"
  },
  {
    "id": "bio_2_c3_06",
    "subject": "biologia",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Coleta Seletiva, Reciclagem e os 3 R's",
    "topic": "Os 3 R's da Sustentabilidade",
    "question": "Quais são as três palavras mágicas dos '3 R's' para salvar o planeta?",
    "options": [
      "Reduzir, Reutilizar e Reciclar",
      "Rasgar, Ralar e Rir",
      "Remover, Reter e Recusar",
      "Rolar, Pular e Correr"
    ],
    "correctIndex": 0,
    "explanation": "Os 3 R's são: Reduzir o lixo, Reutilizar materiais e Reciclar os resíduos!"
  },
  {
    "id": "bio_2_c3_07",
    "subject": "biologia",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Coleta Seletiva, Reciclagem e os 3 R's",
    "topic": "O 1º R: Reduzir",
    "question": "O que significa a ação de 'Reduzir' no nosso dia a dia?",
    "options": [
      "Evitar o desperdício e diminuir o consumo exagerado de embalagens plásticas descartáveis",
      "Comprar 10 brinquedos iguais de uma vez",
      "Jogar comida boa fora",
      "Gastar papel sem necessidade"
    ],
    "correctIndex": 0,
    "explanation": "Reduzir significa consumir de forma consciente para produzir menos lixo!"
  },
  {
    "id": "bio_2_c3_08",
    "subject": "biologia",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Coleta Seletiva, Reciclagem e os 3 R's",
    "topic": "O 2º R: Reutilizar",
    "question": "Quando usamos um pote de sorvete para guardar botões ou lápis de cor, estamos praticando qual R?",
    "options": [
      "Reutilizar",
      "Queimar",
      "Poluir",
      "Enterrar"
    ],
    "correctIndex": 0,
    "explanation": "Reutilizar é dar um novo uso útil a um objeto antes de jogá-lo fora!"
  },
  {
    "id": "bio_2_c3_09",
    "subject": "biologia",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Coleta Seletiva, Reciclagem e os 3 R's",
    "topic": "O 3º R: Reciclar",
    "question": "O que acontece no processo de 'Reciclar'?",
    "options": [
      "O material descartado (como plástico ou latinha) é triturado e derretido na fábrica para virar um produto novinho",
      "O material é jogado no mar",
      "O material fica para sempre no chão da praça",
      "O material desaparece por mágica"
    ],
    "correctIndex": 0,
    "explanation": "A reciclagem transforma materiais usados em novos produtos, economizando recursos da Terra!"
  },
  {
    "id": "bio_2_c3_10",
    "subject": "biologia",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Coleta Seletiva, Reciclagem e os 3 R's",
    "topic": "Tempo de Decomposição do Plástico",
    "question": "Uma garrafa plástica jogada no chão da natureza demora quanto tempo para sumir?",
    "options": [
      "Mais de 400 anos!",
      "Apenas 2 dias",
      "1 semana",
      "1 mês"
    ],
    "correctIndex": 0,
    "explanation": "O plástico é muito resistente e pode levar centenas de anos para se decompor na natureza!"
  },
  {
    "id": "bio_2_c3_11",
    "subject": "biologia",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Coleta Seletiva, Reciclagem e os 3 R's",
    "topic": "Compostagem Caseira",
    "question": "Quando colocamos cascas de frutas e legumes em uma composteira na terra, o que elas viram?",
    "options": [
      "Um adubo orgânico excelente para as plantas crescerem fortes",
      "Gelo congelado",
      "Fumaça venenosa",
      "Pedras de concreto"
    ],
    "correctIndex": 0,
    "explanation": "A compostagem decompõe a matéria orgânica transformando-a em adubo rico para as plantas!"
  },
  {
    "id": "bio_2_c3_12",
    "subject": "biologia",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Coleta Seletiva, Reciclagem e os 3 R's",
    "topic": "Sacolas Ecológicas (Ecobags)",
    "question": "Ao fazer compras no mercado com a mamãe, por que é melhor usar sacolas de tecido (ecobags) do que sacolinhas plásticas?",
    "options": [
      "Porque sacolas de pano duram anos e não poluem a natureza com centenas de plásticos descartáveis",
      "Porque o plástico é muito caro",
      "Porque plástico derrete no vento",
      "Não faz diferença"
    ],
    "correctIndex": 0,
    "explanation": "Ecobags evitam o descarte desenfreado de sacolinhas plásticas no meio ambiente!"
  },
  {
    "id": "bio_2_c3_13",
    "subject": "biologia",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Coleta Seletiva, Reciclagem e os 3 R's",
    "topic": "Pilhas e Baterias Usadas",
    "question": "Onde devemos descartar pilhas usadas do controle do videogame e baterias de celular?",
    "options": [
      "Em postos de coleta especiais para lixo eletrônico, nunca no lixo comum ou no chão",
      "Na privada do banheiro",
      "No jardim perto das flores",
      "No rio da cidade"
    ],
    "correctIndex": 0,
    "explanation": "Pilhas têm metais pesados tóxicos e exigem pontos de descarte especializados!"
  },
  {
    "id": "bio_2_c3_14",
    "subject": "biologia",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Coleta Seletiva, Reciclagem e os 3 R's",
    "topic": "Perigo aos Animais Marinhos",
    "question": "Por que canudos plásticos e sacolas jogadas na praia são perigosos para as tartarugas marinhas?",
    "options": [
      "Elas podem confundir sacola com água-viva, engolir e ficar sufocadas e doentes",
      "Porque tartarugas usam plástico como chapéu",
      "Porque o plástico afunda a praia",
      "Tartarugas não comem"
    ],
    "correctIndex": 0,
    "explanation": "Tartarugas marinhas confundem plástico flutuante com alimento, causando acidentes graves!"
  },
  {
    "id": "bio_2_c3_15",
    "subject": "biologia",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Coleta Seletiva, Reciclagem e os 3 R's",
    "topic": "Amigo do Meio Ambiente",
    "question": "Se você estiver na rua e comer uma bala, onde deve guardar o papelzinho até achar uma lixeira?",
    "options": [
      "No bolso ou na mochila até encontrar uma lixeira apropriada",
      "Jogar no meio da calçada",
      "Esconder no bueiro",
      "Jogar pela janela do carro"
    ],
    "correctIndex": 0,
    "explanation": "Um verdadeiro guardião da natureza nunca joga lixo no chão!"
  },
  {
    "id": "bio_2_c4_01",
    "subject": "biologia",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Preservação da Água, Florestas e Natureza",
    "topic": "Economia de Água: Escovar Dentes",
    "question": "Ao escovar os dentes ou ensaboar as mãos, qual é a atitude sustentável com a torneira?",
    "options": [
      "Fechar a torneira enquanto escova e só abrir para enxaguar a boca",
      "Deixar a água escorrendo no máximo o tempo todo",
      "Ligar a mangueira do jardim",
      "Jogar sabonete no ralo"
    ],
    "correctIndex": 0,
    "explanation": "Fechar a torneira enquanto escovamos economiza até 12 litros de água limpa por escovação!"
  },
  {
    "id": "bio_2_c4_02",
    "subject": "biologia",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Preservação da Água, Florestas e Natureza",
    "topic": "Banho Consciente",
    "question": "Para cuidar das reservas de água doce do nosso planeta, como deve ser o nosso banho?",
    "options": [
      "Rápido e consciente, fechando o chuveiro enquanto se ensaboa",
      "Um banho de 45 minutos cantando com o chuveiro no máximo",
      "Deixar o chuveiro ligado a tarde inteira",
      "Nunca tomar banho"
    ],
    "correctIndex": 0,
    "explanation": "Banhos rápidos de 5 a 10 minutos economizam centenas de litros de água tratada!"
  },
  {
    "id": "bio_2_c4_03",
    "subject": "biologia",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Preservação da Água, Florestas e Natureza",
    "topic": "A Água Doce do Planeta",
    "question": "A maior parte da água do planeta Terra está nos oceanos e é salgada. A água doce que bebemos é:",
    "options": [
      "Um recurso precioso e limitado que devemos proteger com carinho",
      "Infinita e pode ser jogada fora sem problemas",
      "Feita de refrigerante",
      "Totalmente salgada também"
    ],
    "correctIndex": 0,
    "explanation": "Menos de 3% da água da Terra é doce e acessível para o consumo de todos os seres vivos!"
  },
  {
    "id": "bio_2_c4_04",
    "subject": "biologia",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Preservação da Água, Florestas e Natureza",
    "topic": "Importância das Árvores: Ar Puro",
    "question": "As árvores da floresta realizam fotossíntese e nos ajudam fornecendo:",
    "options": [
      "Oxigênio limpinho para respirarmos, sombra fresca e frutos gostosos",
      "Fumaça cinza",
      "Gás venenoso",
      "Plásticos coloridos"
    ],
    "correctIndex": 0,
    "explanation": "As árvores purificam o ar absorvendo gás carbônico e liberando oxigênio puro!"
  },
  {
    "id": "bio_2_c4_05",
    "subject": "biologia",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Preservação da Água, Florestas e Natureza",
    "topic": "Plantar Árvores",
    "question": "Quando plantamos uma muda de árvore no quintal ou na escola, o que estamos fazendo pelo futuro?",
    "options": [
      "Ajudando a preservar o clima, atrair passarinhos e embelezar o planeta",
      "Atrapalhando o trânsito da cidade",
      "Gastando terra à toa",
      "Nada de importante"
    ],
    "correctIndex": 0,
    "explanation": "Plantar árvores combate o calor, preserva o solo e fornece abrigo para pássaros e insetos!"
  },
  {
    "id": "bio_2_c4_06",
    "subject": "biologia",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Preservação da Água, Florestas e Natureza",
    "topic": "Lavar Calçadas sem Mangueira",
    "question": "Qual instrumento devemos usar para limpar as folhas caídas da calçada sem gastar água limpa?",
    "options": [
      "Vassoura e pá",
      "Mangueira ligada no máximo por horas",
      "Chuveiro portátil",
      "Torneira aberta"
    ],
    "correctIndex": 0,
    "explanation": "Varrer a calçada com vassoura limpa perfeitamente sem desperdiçar água potável!"
  },
  {
    "id": "bio_2_c4_07",
    "subject": "biologia",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Preservação da Água, Florestas e Natureza",
    "topic": "Água da Chuva",
    "question": "A água da chuva pode ser recolhida em baldes seguros com tampa para qual uso útil?",
    "options": [
      "Regar as plantas e lavar o quintal",
      "Beber sem ferver",
      "Jogar no sofá de casa",
      "Estragar os livros"
    ],
    "correctIndex": 0,
    "explanation": "Aproveitar a água da chuva para regar jardins é uma atitude ecológica inteligente!"
  },
  {
    "id": "bio_2_c4_08",
    "subject": "biologia",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Preservação da Água, Florestas e Natureza",
    "topic": "Rios e Nascentes",
    "question": "O que é a 'Nascente' de um rio?",
    "options": [
      "O lugar mágico onde a água brota limpinha do chão e começa o rio",
      "Onde o rio deságua no mar",
      "Um cano de esgoto",
      "Uma cachoeira de plástico"
    ],
    "correctIndex": 0,
    "explanation": "A nascente (ou olho-d'água) é onde a água do lençol freático surge na superfície formando o rio!"
  },
  {
    "id": "bio_2_c4_09",
    "subject": "biologia",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Preservação da Água, Florestas e Natureza",
    "topic": "Mata Ciliar",
    "question": "Por que as árvores na beira dos rios (chamadas de Mata Ciliar) são tão importantes?",
    "options": [
      "Suas raízes seguram a terra da margem, evitando que o rio seja soterrado de lama (assoreamento)",
      "Elas servem apenas para pintar",
      "Elas bebem toda a água do rio até secar",
      "Não têm utilidade"
    ],
    "correctIndex": 0,
    "explanation": "A mata ciliar funciona como os 'cílios' dos olhos, protegendo o leito dos rios!"
  },
  {
    "id": "bio_2_c4_10",
    "subject": "biologia",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Preservação da Água, Florestas e Natureza",
    "topic": "Incêndios Florestais",
    "question": "Soltar balões ou acender fogueiras perto de matas secas pode provocar:",
    "options": [
      "Queimadas graves e destruição da casa dos bichinhos da floresta",
      "Chuva de doces",
      "Florescimento de rosas",
      "Neve no verão"
    ],
    "correctIndex": 0,
    "explanation": "Soltar balões é crime ambiental gravíssimo e pode causar tragédias nas florestas!"
  },
  {
    "id": "bio_2_c4_11",
    "subject": "biologia",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Preservação da Água, Florestas e Natureza",
    "topic": "Animais Livres na Natureza",
    "question": "Animais silvestres (como papagaios, araras e micos) vivem mais felizes:",
    "options": [
      "Livres na natureza em seu habitat natural com sua família de animais",
      "Presos em gaiolas minúsculas o dia inteiro",
      "Amarrados por correntes",
      "Dentro de uma caixa de papelão"
    ],
    "correctIndex": 0,
    "explanation": "Animais silvestres pertencem à natureza livre, onde cumprem seu papel ecológico!"
  },
  {
    "id": "bio_2_c4_12",
    "subject": "biologia",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Preservação da Água, Florestas e Natureza",
    "topic": "Cuidado com o Óleo de Cozinha Usado",
    "question": "Depois de fritar batatinhas, a mamãe nunca deve jogar o óleo usado na pia porque:",
    "options": [
      "1 litro de óleo jogado no ralo pode poluir até 25 mil litros de água de rios!",
      "O óleo deixa a água saborosa",
      "A pia gosta de óleo",
      "O óleo vira peixe"
    ],
    "correctIndex": 0,
    "explanation": "O óleo forma uma película que impede o oxigênio na água, matando peixes; deve ser guardado em garrafas para reciclagem!"
  },
  {
    "id": "bio_2_c4_13",
    "subject": "biologia",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Preservação da Água, Florestas e Natureza",
    "topic": "Energia Solar Limpa",
    "question": "Painéis solares nos telhados captam qual fonte de luz natural para produzir eletricidade limpinha?",
    "options": [
      "A luz do Sol",
      "O vento da noite",
      "A água da pia",
      "O fogo do fósforo"
    ],
    "correctIndex": 0,
    "explanation": "A energia solar transforma os raios do Sol em eletricidade sem queimar combustíveis nem poluir!"
  },
  {
    "id": "bio_2_c4_14",
    "subject": "biologia",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Preservação da Água, Florestas e Natureza",
    "topic": "Dia Mundial do Meio Ambiente",
    "question": "No dia 5 de junho celebramos o Dia Mundial do Meio Ambiente. Qual é o melhor presente para a Terra?",
    "options": [
      "Cuidar da natureza todos os dias com atitudes sustentáveis e carinho",
      "Jogar lixo na praia",
      "Quebrar galhos de árvores",
      "Desperdiçar energia elétrica"
    ],
    "correctIndex": 0,
    "explanation": "O planeta precisa de cuidado e responsabilidade constante de cada um de nós!"
  },
  {
    "id": "bio_2_c4_15",
    "subject": "biologia",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Preservação da Água, Florestas e Natureza",
    "topic": "Amor pela Vila do Saber",
    "question": "Em nossa Vila do Saber e no mundo real, quem tem o poder de transformar o mundo em um lugar mais verde e sustentável?",
    "options": [
      "Todas as crianças e suas famílias, através de pequenos atos diários de bondade e preservação",
      "Apenas os robôs de ferro",
      "Ninguém pode fazer nada",
      "Apenas os extraterrestres"
    ],
    "correctIndex": 0,
    "explanation": "Cada pequena atitude sua faz uma enorme diferença para a saúde de todo o planeta!"
  },
  {
    "id": "bio_4_c1_01",
    "subject": "biologia",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Os 6 Biomas Brasileiros e Biodiversidade",
    "topic": "Bioma Amazônia: Características",
    "question": "Qual bioma brasileiro abriga a maior bacia hidrográfica e a maior floresta tropical do planeta?",
    "options": [
      "Amazônia",
      "Caatinga",
      "Pampa",
      "Cerrado"
    ],
    "correctIndex": 0,
    "explanation": "A Amazônia é a maior floresta tropical do mundo, detendo a maior biodiversidade e volume de água doce!"
  },
  {
    "id": "bio_4_c1_02",
    "subject": "biologia",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Os 6 Biomas Brasileiros e Biodiversidade",
    "topic": "Bioma Cerrado: Berço das Águas",
    "question": "Conhecido como a 'savana brasileira', com árvores de troncos retorcidos, cascas grossas e raízes muito profundas, este bioma é o:",
    "options": [
      "Cerrado",
      "Mata Atlântica",
      "Pantanal",
      "Pampa"
    ],
    "correctIndex": 0,
    "explanation": "O Cerrado é a savana mais rica do mundo em biodiversidade e abastece grandes bacias hídricas brasileiras!"
  },
  {
    "id": "bio_4_c1_03",
    "subject": "biologia",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Os 6 Biomas Brasileiros e Biodiversidade",
    "topic": "Bioma Caatinga: Semiárido Exclusivo",
    "question": "Qual bioma é 100% exclusivamente brasileiro, com clima semiárido e plantas xerófilas adaptadas à seca como o mandacaru?",
    "options": [
      "Caatinga",
      "Amazônia",
      "Pantanal",
      "Mata de Araucárias"
    ],
    "correctIndex": 0,
    "explanation": "A Caatinga é um bioma genuinamente brasileiro ('mata branca' em tupi), com espécies altamente adaptadas ao semiárido!"
  },
  {
    "id": "bio_4_c1_04",
    "subject": "biologia",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Os 6 Biomas Brasileiros e Biodiversidade",
    "topic": "Bioma Mata Atlântica: Litoral e Ameaça",
    "question": "Qual bioma cobria toda a faixa litorânea do Brasil e hoje abriga o mico-leão-dourado em áreas de preservação?",
    "options": [
      "Mata Atlântica",
      "Caatinga",
      "Pampa",
      "Cerrado"
    ],
    "correctIndex": 0,
    "explanation": "A Mata Atlântica é um hotspot global de altíssima biodiversidade que sofreu intensa ocupação histórica!"
  },
  {
    "id": "bio_4_c1_05",
    "subject": "biologia",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Os 6 Biomas Brasileiros e Biodiversidade",
    "topic": "Bioma Pantanal: Maior Planície Inundável",
    "question": "Qual bioma é considerado a maior planície de inundação contínua do planeta, famoso pelo tuiuiú e pelo jacaré-do-pantanal?",
    "options": [
      "Pantanal",
      "Pampa",
      "Cerrado",
      "Amazônia"
    ],
    "correctIndex": 0,
    "explanation": "O Pantanal passa por ciclos sazonais de cheia e seca que sustentam uma rica vida aquática e silvestre!"
  },
  {
    "id": "bio_4_c1_06",
    "subject": "biologia",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Os 6 Biomas Brasileiros e Biodiversidade",
    "topic": "Bioma Pampa: Campos do Sul",
    "question": "Localizado no extremo sul do Brasil (Rio Grande do Sul), com relevo plano e vegetação de gramíneas, encontramos o bioma:",
    "options": [
      "Pampa (ou Campos Sulinos)",
      "Caatinga",
      "Floresta Equatorial",
      "Manguezal"
    ],
    "correctIndex": 0,
    "explanation": "O Pampa se caracteriza pela predominância de vegetação rasteira herbácea e gramíneas propícias para pastagens!"
  },
  {
    "id": "bio_4_c1_07",
    "subject": "biologia",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Os 6 Biomas Brasileiros e Biodiversidade",
    "topic": "Adaptação dos Cactos na Caatinga",
    "question": "Por que os cactos da Caatinga (como o xiquexique e mandacaru) têm folhas transformadas em espinhos?",
    "options": [
      "Para evitar a perda de água por transpiração e proteger o caule suculento de predadores",
      "Para absorver calor e queimar o solo",
      "Para atrair pássaros de gelo",
      "Para ficar bonitos para turistas"
    ],
    "correctIndex": 0,
    "explanation": "Os espinhos reduzem a área de transpiração foliar e acumulam água no interior suculento do caule!"
  },
  {
    "id": "bio_4_c1_08",
    "subject": "biologia",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Os 6 Biomas Brasileiros e Biodiversidade",
    "topic": "Biodiversidade: Conceito",
    "question": "O que a palavra 'Biodiversidade' significa na Biologia?",
    "options": [
      "A imensa variedade de todas as formas de vida (animais, plantas, fungos e microrganismos) em um ecossistema",
      "Apenas o número de pedras em uma montanha",
      "A velocidade da correnteza de um rio",
      "A quantidade de carros fabricados em um país"
    ],
    "correctIndex": 0,
    "explanation": "Biodiversidade (diversidade biológica) refere-se à variedade genética e de espécies em todos os biomas!"
  },
  {
    "id": "bio_4_c1_09",
    "subject": "biologia",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Os 6 Biomas Brasileiros e Biodiversidade",
    "topic": "Mata das Araucárias: Sub-bioma Sulista",
    "question": "No Sul do Brasil, qual árvore imponente com folhas pontiagudas e sementes chamadas pinhões se destaca na paisagem?",
    "options": [
      "Pinheiro-do-paraná (Araucária)",
      "Cacaueiro",
      "Seringueira",
      "Açaizeiro"
    ],
    "correctIndex": 0,
    "explanation": "A Araucaria angustifolia é o pinheiro típico do clima subtropical do Sul brasileiro!"
  },
  {
    "id": "bio_4_c1_10",
    "subject": "biologia",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Os 6 Biomas Brasileiros e Biodiversidade",
    "topic": "Manguezais: Berçários da Vida Marinha",
    "question": "Qual ecossistema costeiro de transição entre a terra e o mar possui solo lodoso com raízes aéreas que servem de berçário para peixes e caranguejos?",
    "options": [
      "Manguezal",
      "Dunas de deserto",
      "Geleira antártica",
      "Cerradão seco"
    ],
    "correctIndex": 0,
    "explanation": "Os manguezais são berçários essenciais para a reprodução de peixes, crustáceos e moluscos marinhos!"
  },
  {
    "id": "bio_4_c1_11",
    "subject": "biologia",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Os 6 Biomas Brasileiros e Biodiversidade",
    "topic": "Animais Endêmicos",
    "question": "O que é uma espécie 'endêmica'?",
    "options": [
      "Uma espécie que só existe naturalmente em uma região geográfica específica e em nenhum outro lugar do planeta",
      "Um animal que vive em todos os continentes do mundo",
      "Um ser vivo criado em laboratório",
      "Uma planta que não precisa de luz solar"
    ],
    "correctIndex": 0,
    "explanation": "Espécies endêmicas são exclusivas de uma determinada localidade ou bioma restrito!"
  },
  {
    "id": "bio_4_c1_12",
    "subject": "biologia",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Os 6 Biomas Brasileiros e Biodiversidade",
    "topic": "Rios Voadores da Amazônia",
    "question": "O que são os famosos 'Rios Voadores' produzidos pela Floresta Amazônica?",
    "options": [
      "Grandes massas de vapor de água transpiradas pelas árvores que viajam pela atmosfera levando chuvas para o Centro-Oeste e Sudeste",
      "Pássaros que migram em círculos",
      "Aviões carregados de água mineral",
      "Nuvens que viram gelo no espaço"
    ],
    "correctIndex": 0,
    "explanation": "As árvores da Amazônia bombeiam trilhões de litros de vapor d'água na atmosfera, gerando chuvas vitais para o país!"
  },
  {
    "id": "bio_4_c1_13",
    "subject": "biologia",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Os 6 Biomas Brasileiros e Biodiversidade",
    "topic": "Ave Símbolo do Pantanal",
    "question": "Qual ave de pernas compridas, bico preto e pescoço vermelho é a ave símbolo oficial do Pantanal?",
    "options": [
      "Tuiuiú (Jabiru)",
      "Canário-da-terra",
      "Urubu-rei",
      "Tucano-toco"
    ],
    "correctIndex": 0,
    "explanation": "O Tuiuiú é a imensa ave pernalta majestosa considerada o símbolo pantaneiro!"
  },
  {
    "id": "bio_4_c1_14",
    "subject": "biologia",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Os 6 Biomas Brasileiros e Biodiversidade",
    "topic": "Espécies Exóticas Invasoras",
    "question": "Por que a introdução de uma espécie exótica (como o javali ou mexilhão-dourado) pode prejudicar um bioma nativo?",
    "options": [
      "Porque ela não tem predadores naturais locais, multiplica-se sem controle e compete pelo alimento das espécies nativas",
      "Porque ela ajuda os animais locais a fazerem amizades",
      "Porque ela limpa todo o solo instantaneamente",
      "Não causa nenhum efeito negativo"
    ],
    "correctIndex": 0,
    "explanation": "Espécies invasoras desequilibram a teia ecológica original competindo deslealmente com a fauna nativa!"
  },
  {
    "id": "bio_4_c1_15",
    "subject": "biologia",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Os 6 Biomas Brasileiros e Biodiversidade",
    "topic": "Proteção dos Biomas",
    "question": "Qual é o instrumento legal mais eficiente criado no Brasil para proteger trechos intocados de nossos biomas?",
    "options": [
      "Unidades de Conservação (Parques Nacionais e Reservas Biológicas)",
      "Transformar toda a mata em estacionamento",
      "Cortar árvores centenárias",
      "Construir shopping centers dentro de florestas"
    ],
    "correctIndex": 0,
    "explanation": "As Unidades de Conservação garantem a preservação integral da fauna, flora e recursos hídricos!"
  },
  {
    "id": "bio_4_c2_01",
    "subject": "biologia",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Botânica Avançada, Fotossíntese, Clorofila e Respiração",
    "topic": "A Equação da Fotossíntese",
    "question": "O que a planta utiliza na fotossíntese para produzir glicose (seu alimento) e oxigênio?",
    "options": [
      "Água, Gás Carbônico (CO2) e Luz Solar",
      "Apenas terra e açúcar",
      "Oxigênio e carne",
      "Fogo e fumaça"
    ],
    "correctIndex": 0,
    "explanation": "Na presença da luz solar, água e gás carbônico reagem produzindo glicose e gás oxigênio!"
  },
  {
    "id": "bio_4_c2_02",
    "subject": "biologia",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Botânica Avançada, Fotossíntese, Clorofila e Respiração",
    "topic": "Clorofila e Cloroplastos",
    "question": "Qual pigmento verde presente nos cloroplastos é o responsável por capturar a energia luminosa do Sol?",
    "options": [
      "Clorofila",
      "Melanina",
      "Hemoglobina",
      "Caroteno"
    ],
    "correctIndex": 0,
    "explanation": "A clorofila é o pigmento vegetal essencial para a absorção da luz solar durante a fotossíntese!"
  },
  {
    "id": "bio_4_c2_03",
    "subject": "biologia",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Botânica Avançada, Fotossíntese, Clorofila e Respiração",
    "topic": "Estômatos nas Folhas",
    "question": "Quais estruturas microscópicas presentes na superfície das folhas se abrem e fecham para permitir a entrada de CO2 e saída de oxigênio e vapor d'água?",
    "options": [
      "Estômatos",
      "Vasos linfáticos",
      "Cílios celulares",
      "Raízes secundárias"
    ],
    "correctIndex": 0,
    "explanation": "Os estômatos realizam as trocas gasosas e a transpiração regulada das folhas!"
  },
  {
    "id": "bio_4_c2_04",
    "subject": "biologia",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Botânica Avançada, Fotossíntese, Clorofila e Respiração",
    "topic": "Xilema: Condução da Seiva Bruta",
    "question": "Qual tecido condutor transporta água e sais minerais (seiva bruta) das raízes até as folhas?",
    "options": [
      "Xilema (ou vasos lenhosos)",
      "Floema",
      "Casca externa",
      "Espinho"
    ],
    "correctIndex": 0,
    "explanation": "O xilema conduz a seiva bruta de baixo para cima, da raiz até a copa da planta!"
  },
  {
    "id": "bio_4_c2_05",
    "subject": "biologia",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Botânica Avançada, Fotossíntese, Clorofila e Respiração",
    "topic": "Floema: Condução da Seiva Elaborada",
    "question": "Qual tecido condutor distribui os açúcares produzidos na folha (seiva elaborada) para todas as outras partes da planta?",
    "options": [
      "Floema (ou vasos liberianos)",
      "Xilema",
      "Clorofila",
      "Cutícula"
    ],
    "correctIndex": 0,
    "explanation": "O floema distribui a seiva elaborada rica em glicose para nutrir raízes, flores e frutos!"
  },
  {
    "id": "bio_4_c2_06",
    "subject": "biologia",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Botânica Avançada, Fotossíntese, Clorofila e Respiração",
    "topic": "Respiração Celular Vegetal",
    "question": "As plantas também respiram oxigênio para obter energia de suas células? Quando isso ocorre?",
    "options": [
      "Sim, as plantas respiram continuamente, tanto de dia quanto à noite",
      "Não, plantas nunca respiram",
      "Apenas quando estão sem folhas",
      "Somente no fundo do mar"
    ],
    "correctIndex": 0,
    "explanation": "A respiração celular nas mitocôndrias das plantas ocorre 24 horas por dia para mantê-las vivas!"
  },
  {
    "id": "bio_4_c2_07",
    "subject": "biologia",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Botânica Avançada, Fotossíntese, Clorofila e Respiração",
    "topic": "Transpiração Vegetal",
    "question": "O que acontece na transpiração vegetal?",
    "options": [
      "A planta elimina excesso de água em forma de vapor pelos estômatos, ajudando a puxar mais água do solo",
      "A planta congela o caule",
      "A planta perde suas raízes",
      "A folha muda para a cor roxa"
    ],
    "correctIndex": 0,
    "explanation": "A transpiração cria uma pressão negativa que suga água e minerais da raiz até o topo!"
  },
  {
    "id": "bio_4_c2_08",
    "subject": "biologia",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Botânica Avançada, Fotossíntese, Clorofila e Respiração",
    "topic": "Angiospermas vs Gimnospermas",
    "question": "Qual é a grande novidade evolutiva das Angiospermas em comparação aos pinheiros (Gimnospermas)?",
    "options": [
      "Possuem flores verdadeiras e sementes protegidas dentro de frutos",
      "Não possuem raízes",
      "Não fazem fotossíntese",
      "Possuem espinhos no lugar do tronco"
    ],
    "correctIndex": 0,
    "explanation": "Angiospermas têm flores atrativas e frutos que protegem e dispersam as sementes!"
  },
  {
    "id": "bio_4_c2_09",
    "subject": "biologia",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Botânica Avançada, Fotossíntese, Clorofila e Respiração",
    "topic": "Partes da Flor: Gineceu e Androceu",
    "question": "Em uma flor completa, quais são as partes reprodutoras feminina e masculina?",
    "options": [
      "Pistilo / Gineceu (feminino) e Estames / Androceu (masculino que produz pólen)",
      "Pétala e Raiz",
      "Caule e Espinho",
      "Casca e Folha"
    ],
    "correctIndex": 0,
    "explanation": "O pistilo (órgão feminino) recebe o grão de pólen vindo dos estames (órgão masculino)!"
  },
  {
    "id": "bio_4_c2_10",
    "subject": "biologia",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Botânica Avançada, Fotossíntese, Clorofila e Respiração",
    "topic": "Germinação da Semente",
    "question": "Para uma semente germinar na terra, quais fatores ambientais são indispensáveis?",
    "options": [
      "Umidade adequada (água), oxigênio e temperatura favorável",
      "Luz intensa de lanterna e sal marinho",
      "Gelo congelado e escuridão total",
      "Apenas adubo químico sem água"
    ],
    "correctIndex": 0,
    "explanation": "A hidratação da semente desencadeia a divisão celular e o despertar do embrião!"
  },
  {
    "id": "bio_4_c2_11",
    "subject": "biologia",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Botânica Avançada, Fotossíntese, Clorofila e Respiração",
    "topic": "Fototropismo",
    "question": "Quando uma plantinha perto da janela curva seu caule em direção ao raio de luz, chamamos isso de:",
    "options": [
      "Fototropismo",
      "Hidrotropismo",
      "Geotropismo",
      "Metamorfose"
    ],
    "correctIndex": 0,
    "explanation": "Fototropismo é o crescimento orientado em resposta ao estímulo luminoso!"
  },
  {
    "id": "bio_4_c2_12",
    "subject": "biologia",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Botânica Avançada, Fotossíntese, Clorofila e Respiração",
    "topic": "Raízes Tuberosas e Reserva de Amido",
    "question": "A mandioca, a batata-doce e a cenoura são raízes ou tubérculos que acumulam qual substância energética de reserva?",
    "options": [
      "Amido",
      "Sal mineral puro",
      "Óleo diesel",
      "Vitamina C congelada"
    ],
    "correctIndex": 0,
    "explanation": "As plantas armazenam energia excedente da fotossíntese na forma de amido em órgãos subterrâneos!"
  },
  {
    "id": "bio_4_c2_13",
    "subject": "biologia",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Botânica Avançada, Fotossíntese, Clorofila e Respiração",
    "topic": "Plantas Epífitas: Orquídeas e Bromélias",
    "question": "Orquídeas e bromélias vivem sobre os galhos de grandes árvores para alcançar mais luz sem sugar a seiva da árvore hospedeira. Elas são plantas:",
    "options": [
      "Epífitas",
      "Parasitas carnívoras",
      "Fungos venenosos",
      "Algas lodosas"
    ],
    "correctIndex": 0,
    "explanation": "Epífitas usam a árvore apenas como suporte físico (inquilinismo botânico) sem prejudicá-la!"
  },
  {
    "id": "bio_4_c2_14",
    "subject": "biologia",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Botânica Avançada, Fotossíntese, Clorofila e Respiração",
    "topic": "Plantas Carnívoras",
    "question": "Por que as plantas carnívoras (como a Dionaea) capturam pequenos insetos se também fazem fotossíntese?",
    "options": [
      "Para obter nitrogênio e fósforo que faltam nos solos pobres e encharcados onde vivem",
      "Porque sentem ódio de moscas",
      "Porque não têm raízes",
      "Para se transformarem em animais"
    ],
    "correctIndex": 0,
    "explanation": "A digestão de insetos supre a carência de nutrientes minerais de solos ácidos e pantanosos!"
  },
  {
    "id": "bio_4_c2_15",
    "subject": "biologia",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Botânica Avançada, Fotossíntese, Clorofila e Respiração",
    "topic": "Briófitas: Musgos",
    "question": "Os musgos são plantas pequenas e aveludadas que não têm vasos condutores verdadeiros. Elas pertencem ao grupo das:",
    "options": [
      "Briófitas",
      "Pteridófitas",
      "Gimnospermas",
      "Angiospermas"
    ],
    "correctIndex": 0,
    "explanation": "Briófitas são plantas avasculares de pequeno porte que absorvem água célula a célula por difusão!"
  },
  {
    "id": "bio_4_c3_01",
    "subject": "biologia",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Relações Ecológicas, Simbiose, Predatismo e Teias",
    "topic": "Relações Harmônicas vs Desarmônicas",
    "question": "O que diferencia uma relação ecológica harmônica de uma desarmônica?",
    "options": [
      "Na harmônica, nenhum participante é prejudicado; na desarmônica, pelo menos um é prejudicado",
      "Na harmônica todos os animais morrem",
      "Na desarmônica ninguém come nada",
      "Não há diferença entre elas"
    ],
    "correctIndex": 0,
    "explanation": "Relações harmônicas trazem benefício ou neutralidade mútua; desarmônicas causam prejuízo a um indivíduo!"
  },
  {
    "id": "bio_4_c3_02",
    "subject": "biologia",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Relações Ecológicas, Simbiose, Predatismo e Teias",
    "topic": "Mutualismo",
    "question": "Quando dois seres vivos vivem juntos e ambos se beneficiam de forma obrigatória (como algas e fungos nos líquens), temos:",
    "options": [
      "Mutualismo",
      "Parasitismo",
      "Competição",
      "Predatismo"
    ],
    "correctIndex": 0,
    "explanation": "No mutualismo, a cooperação mútua traz vantagens de sobrevivência para ambas as espécies!"
  },
  {
    "id": "bio_4_c3_03",
    "subject": "biologia",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Relações Ecológicas, Simbiose, Predatismo e Teias",
    "topic": "Comensalismo",
    "question": "O peixe-rêmora nada preso ao tubarão comendo restos da refeição dele sem prejudicá-lo nem ajudá-lo. Isso é:",
    "options": [
      "Comensalismo",
      "Canibalismo",
      "Parasitismo",
      "Predação"
    ],
    "correctIndex": 0,
    "explanation": "No comensalismo, uma espécie se beneficia (geralmente com alimento) sem causar dano à outra!"
  },
  {
    "id": "bio_4_c3_04",
    "subject": "biologia",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Relações Ecológicas, Simbiose, Predatismo e Teias",
    "topic": "Parasitismo",
    "question": "O carrapato suga o sangue do cachorro, causando coceira e transmitindo doenças ao cão hospedeiro. Essa relação desarmônica é:",
    "options": [
      "Parasitismo",
      "Mutualismo",
      "Sociedade",
      "Inquilinismo"
    ],
    "correctIndex": 0,
    "explanation": "No parasitismo, o parasita vive à custa do hospedeiro, causando-lhe danos e enfraquecimento!"
  },
  {
    "id": "bio_4_c3_05",
    "subject": "biologia",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Relações Ecológicas, Simbiose, Predatismo e Teias",
    "topic": "Predatismo",
    "question": "Quando a onça-pintada caça e abate uma capivara para se alimentar, temos uma relação de:",
    "options": [
      "Predatismo (Predação)",
      "Comensalismo",
      "Sociedade",
      "Amensalismo"
    ],
    "correctIndex": 0,
    "explanation": "No predatismo, o predador mata a presa para obter alimento e manter o equilíbrio populacional!"
  },
  {
    "id": "bio_4_c3_06",
    "subject": "biologia",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Relações Ecológicas, Simbiose, Predatismo e Teias",
    "topic": "Competição Intraespecífica e Interespecífica",
    "question": "Dois animais que disputam a mesma fêmea, a mesma comida ou o mesmo território praticam:",
    "options": [
      "Competição",
      "Mutualismo",
      "Cooperação",
      "Mutualismo facultativo"
    ],
    "correctIndex": 0,
    "explanation": "A competição ocorre quando recursos limitados são disputados entre indivíduos da mesma ou de espécies diferentes!"
  },
  {
    "id": "bio_4_c3_07",
    "subject": "biologia",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Relações Ecológicas, Simbiose, Predatismo e Teias",
    "topic": "Sociedade Biológica: Abelhas e Formigas",
    "question": "As abelhas em uma colmeia e as formigas em um formigueiro cooperam dividindo tarefas (rainha, operárias, soldados) sem estarem grudadas pelo corpo. Isso é uma:",
    "options": [
      "Sociedade",
      "Colônia ligada",
      "Predação",
      "Invasão"
    ],
    "correctIndex": 0,
    "explanation": "Em uma sociedade ecológica, indivíduos da mesma espécie mantêm cooperação e divisão organizada de trabalho!"
  },
  {
    "id": "bio_4_c3_08",
    "subject": "biologia",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Relações Ecológicas, Simbiose, Predatismo e Teias",
    "topic": "Produtores Autótrofos na Cadeia",
    "question": "Por que as plantas e algas ocupam a base de qualquer cadeia alimentar como 'Produtores'?",
    "options": [
      "Porque são seres autótrofos capazes de fabricar seu próprio alimento através da fotossíntese",
      "Porque comem todos os animais da floresta",
      "Porque são carnívoros",
      "Porque compram sementes no mercado"
    ],
    "correctIndex": 0,
    "explanation": "Produtores convertem energia solar em biomassa, fornecendo o sustento de todos os níveis tróficos!"
  },
  {
    "id": "bio_4_c3_09",
    "subject": "biologia",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Relações Ecológicas, Simbiose, Predatismo e Teias",
    "topic": "Níveis Tróficos: Consumidores",
    "question": "Na sequência: Capim -> Gafanhoto -> Pássaro -> Gavião, o gafanhoto é qual tipo de consumidor?",
    "options": [
      "Consumidor Primário (herbívoro)",
      "Consumidor Secundário",
      "Consumidor Terciário",
      "Decompositor"
    ],
    "correctIndex": 0,
    "explanation": "Quem se alimenta diretamente do produtor é sempre o Consumidor Primário!"
  },
  {
    "id": "bio_4_c3_10",
    "subject": "biologia",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Relações Ecológicas, Simbiose, Predatismo e Teias",
    "topic": "Decompositores: Fungos e Bactérias",
    "question": "Qual é o papel ecológico insubstituível dos fungos e bactérias na reciclagem da matéria orgânica?",
    "options": [
      "Decompor restos de seres mortos e devolver nutrientes minerais ao solo fértil",
      "Capturar a luz da lua",
      "Construir ninhos de aves",
      "Congelar as folhas no outono"
    ],
    "correctIndex": 0,
    "explanation": "Decompositores fecham o ciclo da matéria transformando corpos mortos em nutrientes minerais solúveis!"
  },
  {
    "id": "bio_4_c3_11",
    "subject": "biologia",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Relações Ecológicas, Simbiose, Predatismo e Teias",
    "topic": "Cadeia vs Teia Alimentar",
    "question": "Qual é a diferença entre uma 'Cadeia Alimentar' e uma 'Teia Alimentar'?",
    "options": [
      "A cadeia é uma linha única direta, enquanto a teia é uma rede complexa e realista de várias cadeias interligadas",
      "Cadeia só tem peixes e teia só tem aranhas",
      "Não existe diferença",
      "Teia só tem animais de zoológico"
    ],
    "correctIndex": 0,
    "explanation": "Na natureza, os animais têm dietas variadas formando uma teia complexa de interações alimentares!"
  },
  {
    "id": "bio_4_c3_12",
    "subject": "biologia",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Relações Ecológicas, Simbiose, Predatismo e Teias",
    "topic": "Fluxo Unidirecional de Energia",
    "question": "Conforme a energia dos alimentos passa de um nível trófico para o seguinte (do produtor até o consumidor final), ela:",
    "options": [
      "Diminui gradativamente, pois parte se perde em calor e atividade metabólica",
      "Aumenta infinitamente",
      "Permanece exatamente 100% igual",
      "Vira luz ultravioleta"
    ],
    "correctIndex": 0,
    "explanation": "O fluxo de energia é unidirecional e decrescente a cada salto trófico da cadeia alimentar!"
  },
  {
    "id": "bio_4_c3_13",
    "subject": "biologia",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Relações Ecológicas, Simbiose, Predatismo e Teias",
    "topic": "Camuflagem e Mimetismo",
    "question": "O bicho-pau parece um galho seco de árvore e uma mariposa inofensiva imita as cores de uma vespa venenosa. Isso é:",
    "options": [
      "Camuflagem (disfarce no meio) e Mimetismo (imitação de outra espécie)",
      "Parasitismo mútuo",
      "Metamorfose incompleta",
      "Polinização direta"
    ],
    "correctIndex": 0,
    "explanation": "Camuflagem e mimetismo são adaptações evolutivas brilhantes para sobrevivência e defesa contra predadores!"
  },
  {
    "id": "bio_4_c3_14",
    "subject": "biologia",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Relações Ecológicas, Simbiose, Predatismo e Teias",
    "topic": "Bioacumulação Trófica",
    "question": "Quando poluentes tóxicos (como mercúrio em rios) entram na cadeia alimentar, qual animal sofre a maior concentração desse veneno?",
    "options": [
      "O predador de topo da teia alimentar (ex: peixes carnívoros grandes e aves de rapina)",
      "Apenas as algas microscópicas",
      "Nenhum animal é afetado",
      "Os decompositores do fundo"
    ],
    "correctIndex": 0,
    "explanation": "Pela magnificação trófica, as toxinas que não são eliminadas se concentram cada vez mais no topo da teia alimentar!"
  },
  {
    "id": "bio_4_c3_15",
    "subject": "biologia",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Relações Ecológicas, Simbiose, Predatismo e Teias",
    "topic": "Equilíbrio Dinâmico do Ecossistema",
    "question": "O que acontece se caçadores eliminarem todos os lobos ou onças de uma floresta?",
    "options": [
      "A população de herbívoros explode, consumindo toda a vegetação até causar degradação ambiental e fome",
      "A floresta fica eternamente pacífica e segura",
      "Nascem mais árvores automaticamente",
      "A água do rio dobra de volume"
    ],
    "correctIndex": 0,
    "explanation": "Predadores de topo controlam o número de herbívoros, preservando a integridade da vegetação florestal!"
  },
  {
    "id": "bio_4_c4_01",
    "subject": "biologia",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Impacto Humano, Efeito Estufa, Espécies Ameaçadas e Conservação",
    "topic": "O Efeito Estufa Natural",
    "question": "O Efeito Estufa Natural é essencial para a vida na Terra porque:",
    "options": [
      "Retém calor na atmosfera impedindo que o planeta congele com temperaturas abaixo de zero",
      "Cria geladeiras gigantes nos polos",
      "Apaga as estrelas à noite",
      "Transforma o oxigênio em ouro"
    ],
    "correctIndex": 0,
    "explanation": "Sem o efeito estufa natural benéfico, a temperatura média da Terra seria de cerca de -18°C!"
  },
  {
    "id": "bio_4_c4_02",
    "subject": "biologia",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Impacto Humano, Efeito Estufa, Espécies Ameaçadas e Conservação",
    "topic": "Aquecimento Global Acelerado",
    "question": "Qual atividade humana intensifica perigosamente o aquecimento global liberando excesso de gases estufa (CO2 e Metano)?",
    "options": [
      "A queima de combustíveis fósseis (gasolina, carvão, diesel) e o desmatamento com queimadas",
      "Plantar árvores e flores no jardim",
      "Andar a pé e de bicicleta",
      "Utilizar painéis de energia solar"
    ],
    "correctIndex": 0,
    "explanation": "A queima em massa de carvão e petróleo aliada ao desmatamento desequilibra o balanço de calor da atmosfera!"
  },
  {
    "id": "bio_4_c4_03",
    "subject": "biologia",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Impacto Humano, Efeito Estufa, Espécies Ameaçadas e Conservação",
    "topic": "Consequências das Mudanças Climáticas",
    "question": "Quais são algumas das consequências visíveis das mudanças climáticas globais?",
    "options": [
      "Derretimento de geleiras polares, elevação do nível dos mares e eventos climáticos extremos frequentes",
      "Os oceanos vão virar lagos de água doce",
      "O Sol vai diminuir de tamanho",
      "As noites vão durar 50 horas"
    ],
    "correctIndex": 0,
    "explanation": "Geleiras recuam, o nível do mar sobe e tempestades e secas severas tornam-se mais destrutivas!"
  },
  {
    "id": "bio_4_c4_04",
    "subject": "biologia",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Impacto Humano, Efeito Estufa, Espécies Ameaçadas e Conservação",
    "topic": "Desmatamento e Perda de Habitat",
    "question": "Qual é a principal causa da perda de biodiversidade e do perigo de extinção de animais no Brasil?",
    "options": [
      "A destruição e fragmentação de seus habitats naturais por desmatamento e queimadas ilegais",
      "O canto dos pássaros na primavera",
      "A chuva excessiva de verão",
      "O crescimento de musgos em troncos"
    ],
    "correctIndex": 0,
    "explanation": "Sem floresta intacta, as espécies perdem abrigo, locais de procriação e rotas de alimentação!"
  },
  {
    "id": "bio_4_c4_05",
    "subject": "biologia",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Impacto Humano, Efeito Estufa, Espécies Ameaçadas e Conservação",
    "topic": "Animais Ameaçados no Brasil: Ararinha-Azul",
    "question": "Qual linda ave da Caatinga que quase desapareceu na natureza mobilizou projetos de reintrodução bem-sucedidos?",
    "options": [
      "Ararinha-azul (Cyanopsitta spixii)",
      "Pomba comum",
      "Galinha-d'angola",
      "Pinguim-imperador"
    ],
    "correctIndex": 0,
    "explanation": "A ararinha-azul foi vítima do tráfico e da perda de habitat, mas esforços científicos a trouxeram de volta à natureza!"
  },
  {
    "id": "bio_4_c4_06",
    "subject": "biologia",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Impacto Humano, Efeito Estufa, Espécies Ameaçadas e Conservação",
    "topic": "Animais Ameaçados: Mico-Leão-Dourado",
    "question": "O mico-leão-dourado vive em qual bioma brasileiro onde foram construídos corredores ecológicos para conectá-lo?",
    "options": [
      "Mata Atlântica",
      "Pampa",
      "Caatinga",
      "Pantanal"
    ],
    "correctIndex": 0,
    "explanation": "O mico-leão-dourado é endêmico das matas litorâneas do Rio de Janeiro na Mata Atlântica!"
  },
  {
    "id": "bio_4_c4_07",
    "subject": "biologia",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Impacto Humano, Efeito Estufa, Espécies Ameaçadas e Conservação",
    "topic": "Corredores Ecológicos",
    "question": "O que são 'Corredores Ecológicos' entre fragmentos de floresta?",
    "options": [
      "Faixas contínuas de vegetação nativa que conectam áreas isoladas de mata, permitindo a circulação segura dos animais",
      "Estradas asfaltadas para caminhões",
      "Túneis de trem bala",
      "Cercas de arame farpado eletrificadas"
    ],
    "correctIndex": 0,
    "explanation": "Corredores ecológicos reúnem populações separadas, reduzindo o risco de endogamia e atropelamentos!"
  },
  {
    "id": "bio_4_c4_08",
    "subject": "biologia",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Impacto Humano, Efeito Estufa, Espécies Ameaçadas e Conservação",
    "topic": "Pegada Ecológica",
    "question": "O conceito de 'Pegada Ecológica' calcula:",
    "options": [
      "A quantidade de recursos naturais que consumimos e a área de terra necessária para regenerá-los",
      "O tamanho do tênis que você calça",
      "Quantos passos você dá no videogame",
      "A profundidade da pegada do dinossauro na argila"
    ],
    "correctIndex": 0,
    "explanation": "A pegada ecológica mede a demanda humana sobre os ecossistemas do planeta!"
  },
  {
    "id": "bio_4_c4_09",
    "subject": "biologia",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Impacto Humano, Efeito Estufa, Espécies Ameaçadas e Conservação",
    "topic": "Fontes de Energia Renováveis",
    "question": "Quais são duas fontes de energia 100% renováveis e limpas que não emitem fumaça de carbono?",
    "options": [
      "Energia Solar (Sol) e Energia Eólica (Ventos)",
      "Carvão mineral e Gasolina",
      "Diesel e Óleo combustível",
      "Queima de pneus e lenha verde"
    ],
    "correctIndex": 0,
    "explanation": "A luz do sol e o vento geram eletricidade renovável abundante sem emissões poluentes de carbono!"
  },
  {
    "id": "bio_4_c4_10",
    "subject": "biologia",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Impacto Humano, Efeito Estufa, Espécies Ameaçadas e Conservação",
    "topic": "Poluição dos Oceanos por Microplásticos",
    "question": "Com o passar do tempo, as embalagens plásticas nos mares se quebram sob o sol em partículas minúsculas chamadas:",
    "options": [
      "Microplásticos",
      "Plâncton natural",
      "Grãos de ouro",
      "Sal do mar"
    ],
    "correctIndex": 0,
    "explanation": "Microplásticos são engolidos por peixes e aves marinhas, entrando na cadeia alimentar humana!"
  },
  {
    "id": "bio_4_c4_11",
    "subject": "biologia",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Impacto Humano, Efeito Estufa, Espécies Ameaçadas e Conservação",
    "topic": "Camada de Ozônio e Protocolo de Montreal",
    "question": "A camada de ozônio (O3) na alta atmosfera protege a vida na Terra contra qual perigo invisível?",
    "options": [
      "A radiação ultravioleta (UV) nociva emitida pelo Sol",
      "Meteoros de ferro",
      "O vento noturno frio",
      "O gás carbônico das plantas"
    ],
    "correctIndex": 0,
    "explanation": "O ozônio estratosférico absorve radiação ultravioleta perigosa prevenindo mutações e câncer de pele!"
  },
  {
    "id": "bio_4_c4_12",
    "subject": "biologia",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Impacto Humano, Efeito Estufa, Espécies Ameaçadas e Conservação",
    "topic": "Reflorestamento e Créditos de Carbono",
    "question": "O plantio maciço de árvores nativas em áreas degradadas (reflorestamento) ajuda o clima por quê?",
    "options": [
      "Porque as árvores em crescimento absorvem e retiram carbono da atmosfera fixando-o em seus troncos e raízes",
      "Porque as árvores cobrem o chão de asfalto",
      "Porque elas não precisam de água",
      "Porque elas aquecem a temperatura do ar"
    ],
    "correctIndex": 0,
    "explanation": "Florestas funcionam como sumidouros naturais gigantes de carbono!"
  },
  {
    "id": "bio_4_c4_13",
    "subject": "biologia",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Impacto Humano, Efeito Estufa, Espécies Ameaçadas e Conservação",
    "topic": "Tráfico de Animais Silvestres",
    "question": "Comprar animais silvestres retirados ilegalmente da mata alimenta um crime perigoso chamado:",
    "options": [
      "Tráfico de animais silvestres",
      "Comércio solidário",
      "Adoção responsável de pets",
      "Criação ecológica"
    ],
    "correctIndex": 0,
    "explanation": "O tráfico silvestre é crime hediondo que causa a morte de 9 em cada 10 animais capturados ilegalmente!"
  },
  {
    "id": "bio_4_c4_14",
    "subject": "biologia",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Impacto Humano, Efeito Estufa, Espécies Ameaçadas e Conservação",
    "topic": "Desenvolvimento Sustentável",
    "question": "O que prega a meta do 'Desenvolvimento Sustentável'?",
    "options": [
      "Atender às necessidades da geração atual sem comprometer a capacidade das futuras gerações suprirem as suas",
      "Gastar todos os recursos naturais em apenas 5 anos",
      "Destruir florestas para gerar riqueza rápida",
      "Parar completamente de comer alimentos"
    ],
    "correctIndex": 0,
    "explanation": "Desenvolvimento sustentável equilibra economia, bem-estar social e preservação ecológica duradoura!"
  },
  {
    "id": "bio_4_c4_15",
    "subject": "biologia",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Impacto Humano, Efeito Estufa, Espécies Ameaçadas e Conservação",
    "topic": "Atitude Protetora e Amor à Terra",
    "question": "Qual é o lema de um jovem guardião ambiental da Vila do Saber?",
    "options": [
      "'Conhecer para amar, amar para respeitar, e agir para preservar a vida em nosso planeta!'",
      "'Gaste o máximo de energia possível'",
      "'O lixo no chão não é problema meu'",
      "'Não se importe com os animais'"
    ],
    "correctIndex": 0,
    "explanation": "O conhecimento científico e a consciência ambiental geram as atitudes que salvam o futuro do nosso planeta!"
  },
  {
    "id": "qui_2_c1_01",
    "subject": "quimica",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Os 3 Estados da Água e o Gelo",
    "topic": "Os 3 Estados da Matéria",
    "question": "Em quais três estados físicos podemos encontrar a água na natureza?",
    "options": [
      "Sólido (gelo), Líquido (água no copo) e Gasoso (vapor invisível)",
      "Quente, Morno e Doce",
      "Azul, Vermelho e Amarelo",
      "Liso, Áspero e Macio"
    ],
    "correctIndex": 0,
    "explanation": "A água se transforma em gelo (sólido), água líquida e vapor de água (gasoso)!"
  },
  {
    "id": "qui_2_c1_02",
    "subject": "quimica",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Os 3 Estados da Água e o Gelo",
    "topic": "Estado Líquido",
    "question": "A água que bebemos no copo e que corre no rio está em qual estado?",
    "options": [
      "Estado Líquido",
      "Estado Sólido",
      "Estado de Fogo",
      "Estado Gasoso"
    ],
    "correctIndex": 0,
    "explanation": "A água que flui livremente e assume a forma do copo está no estado líquido!"
  },
  {
    "id": "qui_2_c1_03",
    "subject": "quimica",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Os 3 Estados da Água e o Gelo",
    "topic": "Estado Sólido: Cubo de Gelo",
    "question": "Um cubo de gelo durinho que colocamos no suco está em qual estado?",
    "options": [
      "Estado Sólido",
      "Estado Gasoso",
      "Estado de Fumaça",
      "Estado Líquido"
    ],
    "correctIndex": 0,
    "explanation": "O gelo tem forma firme e definida, estando no estado sólido!"
  },
  {
    "id": "qui_2_c1_04",
    "subject": "quimica",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Os 3 Estados da Água e o Gelo",
    "topic": "Estado Gasoso: Vapor",
    "question": "Quando a água ferve na chaleira quente e sobe aquela fumaçinha no ar, ela está virando:",
    "options": [
      "Vapor de água (estado gasoso)",
      "Pedaços de ferro",
      "Gelo congelado",
      "Pedras sólidas"
    ],
    "correctIndex": 0,
    "explanation": "O calor faz a água evaporar, passando para o estado gasoso (vapor d'água)!"
  },
  {
    "id": "qui_2_c1_05",
    "subject": "quimica",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Os 3 Estados da Água e o Gelo",
    "topic": "Gelo Flutua na Água",
    "question": "Quando colocamos uma pedrinha de gelo no copo com água, o que acontece?",
    "options": [
      "O gelo flutua no topo da água porque é menos denso",
      "O gelo afunda imediatamente como chumbo",
      "O gelo explode",
      "O gelo fica invisível no mesmo segundo"
    ],
    "correctIndex": 0,
    "explanation": "O gelo é mais leve (menos denso) que a água líquida, por isso ele flutua!"
  },
  {
    "id": "qui_2_c1_06",
    "subject": "quimica",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Os 3 Estados da Água e o Gelo",
    "topic": "Gotas na Tampa da Panela",
    "question": "Quando a mamãe tira a tampa da panela de arroz bem quente, vemos muitas gotinhas de água líquida na tampa. Por que isso acontece?",
    "options": [
      "O vapor quente tocou a tampa mais fria e voltou a virar água líquida (condensação)",
      "Alguém espirrou água com mangueira",
      "A tampa suou de cansaço",
      "O arroz jogou água na tampa"
    ],
    "correctIndex": 0,
    "explanation": "O vapor de água condensa em gotículas líquidas ao encontrar a superfície fria da tampa!"
  },
  {
    "id": "qui_2_c1_07",
    "subject": "quimica",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Os 3 Estados da Água e o Gelo",
    "topic": "Do que são feitas as nuvens?",
    "question": "As nuvens fofinhas lá no alto do céu são formadas de quê?",
    "options": [
      "Milhões de minúsculas gotículas de água e cristais de gelo condensados no ar",
      "Algodão-doce açucarado",
      "Fumaça de carvão",
      "Plásticos brancos"
    ],
    "correctIndex": 0,
    "explanation": "Nuvens são formadas por vapor de água que subiu e se condensou em pequeninas gotículas líquidas!"
  },
  {
    "id": "qui_2_c1_08",
    "subject": "quimica",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Os 3 Estados da Água e o Gelo",
    "topic": "A Chuva que Cai",
    "question": "Quando as gotículas de água nas nuvens ficam muito pesadas e cheias, o que acontece?",
    "options": [
      "Elas caem em forma de chuva líquida de volta para a terra",
      "A nuvem quebra e cai no chão inteira",
      "O céu fica amarelo",
      "As nuvens viram balões"
    ],
    "correctIndex": 0,
    "explanation": "A chuva é a precipitação da água das nuvens de volta à superfície terrestre!"
  },
  {
    "id": "qui_2_c1_09",
    "subject": "quimica",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Os 3 Estados da Água e o Gelo",
    "topic": "Neve e Granizo",
    "question": "Em locais muito frios ou durante fortes tempestades, a água cai do céu em forma sólida como flocos brancos ou pedrinhas de gelo. São:",
    "options": [
      "Neve e Granizo",
      "Lava vulcânica",
      "Areia e poeira",
      "Folhas secas"
    ],
    "correctIndex": 0,
    "explanation": "A neve e o granizo são a água em estado sólido caindo das nuvens gélidas!"
  },
  {
    "id": "qui_2_c1_10",
    "subject": "quimica",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Os 3 Estados da Água e o Gelo",
    "topic": "Fumacinha da Boca no Frio",
    "question": "Em um dia muito frio de inverno, quando você respira sai uma fumacinha da sua boca. O que é aquilo?",
    "options": [
      "O vapor de água quente que sai do seu corpo e se condensa no ar frio lá fora",
      "Fogo que você comeu",
      "Poeira da sua garganta",
      "Gelo seco caindo"
    ],
    "correctIndex": 0,
    "explanation": "Nossa respiração contém vapor quente que vira pequenas gotículas no ar gelado!"
  },
  {
    "id": "qui_2_c1_11",
    "subject": "quimica",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Os 3 Estados da Água e o Gelo",
    "topic": "Roupas no Varal",
    "question": "Por que a roupa molhada pendurada no varal sob o sol fica sequinha depois de algumas horas?",
    "options": [
      "A água líquida da roupa evaporou no calor e foi para o ar como vapor",
      "Os passarinhos beberam a água da roupa",
      "O vento comeu a água",
      "A água entrou dentro do tecido e sumiu"
    ],
    "correctIndex": 0,
    "explanation": "A água líquida evapora gradualmente com o calor do sol e o sopro do vento!"
  },
  {
    "id": "qui_2_c1_12",
    "subject": "quimica",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Os 3 Estados da Água e o Gelo",
    "topic": "Forma dos Líquidos",
    "question": "Se colocarmos a mesma quantidade de água em um copo redondo ou em uma tigela quadrada, o que muda na água?",
    "options": [
      "Apenas a sua forma, pois o líquido se molda ao formato do recipiente",
      "A quantidade de água diminui",
      "A água vira suco de uva",
      "A água fica sólida"
    ],
    "correctIndex": 0,
    "explanation": "Líquidos não possuem formato fixo: eles tomam a forma do recipiente onde são colocados!"
  },
  {
    "id": "qui_2_c1_13",
    "subject": "quimica",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Os 3 Estados da Água e o Gelo",
    "topic": "Orvalho da Manhã",
    "question": "Ao acordar bem cedinho, vemos gotinhas brilhantes na grama do jardim sem ter chovido. Esse fenômeno é o:",
    "options": [
      "Orvalho",
      "Neve",
      "Lava",
      "Chuva ácida"
    ],
    "correctIndex": 0,
    "explanation": "O orvalho é o vapor d'água da atmosfera que se condensa sobre folhas e grama na noite fria!"
  },
  {
    "id": "qui_2_c1_14",
    "subject": "quimica",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Os 3 Estados da Água e o Gelo",
    "topic": "Água Pura: Incolor, Inodora e Insípida",
    "question": "Como é a água potável pura e limpa para beber?",
    "options": [
      "Sem cor (incolor), sem cheiro (inodora) e sem sabor (insípida)",
      "Verde, com cheiro de fruta e salgada",
      "Preta e com cheiro de queimado",
      "Amarela e gasosa"
    ],
    "correctIndex": 0,
    "explanation": "Água potável limpa é transparente, não tem odor e sacia nossa sede com pureza!"
  },
  {
    "id": "qui_2_c1_15",
    "subject": "quimica",
    "year": 2,
    "chapter": 1,
    "chapterTitle": "Os 3 Estados da Água e o Gelo",
    "topic": "Ciclo Mágico da Água",
    "question": "A água evapora dos rios, sobe para as nuvens, vira chuva e volta para a terra. Esse ciclo se chama:",
    "options": [
      "Ciclo da Água (ou Ciclo Hidrológico)",
      "Ciclo da Lua",
      "Ciclo da Bicicleta",
      "Ciclo do Vento"
    ],
    "correctIndex": 0,
    "explanation": "O ciclo da água renova constantemente a água doce necessária para a vida na Terra!"
  },
  {
    "id": "qui_2_c2_01",
    "subject": "quimica",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Calor, Fusão, Frio e Congelamento",
    "topic": "Derretimento do Picolé: Fusão",
    "question": "Quando você toma um picolé no sol da praia e ele começa a pingar e amolecer, que mudança está acontecendo?",
    "options": [
      "Fusão (derretimento do estado sólido para o líquido)",
      "Solidificação (virando pedra)",
      "Explosão",
      "Congelamento instantâneo"
    ],
    "correctIndex": 0,
    "explanation": "O calor do ambiente faz o gelo sólido derreter, passando ao estado líquido!"
  },
  {
    "id": "qui_2_c2_02",
    "subject": "quimica",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Calor, Fusão, Frio e Congelamento",
    "topic": "Congelamento da Água: Solidificação",
    "question": "Quando a mamãe enche a forminha de água líquida e coloca no congelador da geladeira, ela se transforma em cubos de gelo durinhos. Esse processo é o:",
    "options": [
      "Congelamento / Solidificação (do líquido para o sólido)",
      "Derretimento",
      "Vaporização",
      "Fervura"
    ],
    "correctIndex": 0,
    "explanation": "O frio do congelador retira o calor da água, fazendo-a solidificar em gelo!"
  },
  {
    "id": "qui_2_c2_03",
    "subject": "quimica",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Calor, Fusão, Frio e Congelamento",
    "topic": "Chocolate Derretendo na Mão",
    "question": "Por que um pedacinho de chocolate começa a amolecer e derreter quando seguramos na mão por algum tempo?",
    "options": [
      "Porque a temperatura da nossa mão é quentinha (cerca de 36°C) e transfere calor para o chocolate",
      "Porque o chocolate tem medo das nossas mãos",
      "Porque a mão gela o chocolate",
      "Porque o chocolate é feito de água salgada"
    ],
    "correctIndex": 0,
    "explanation": "O calor do nosso corpo aquece a manteiga de cacau do chocolate, derretendo-o!"
  },
  {
    "id": "qui_2_c2_04",
    "subject": "quimica",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Calor, Fusão, Frio e Congelamento",
    "topic": "Vela e Cera Derretida",
    "question": "A chama da vela acesa produz calor. O que acontece com a cera dura perto do pavio aceso?",
    "options": [
      "A cera derrete e vira um líquido quente, e depois endurece novamente quando esfria",
      "A cera vira água com gás",
      "A cera vira gelo",
      "A cera vira metal de ferro"
    ],
    "correctIndex": 0,
    "explanation": "A cera sofre fusão com o calor da chama e solidifica-se de novo ao esfriar!"
  },
  {
    "id": "qui_2_c2_05",
    "subject": "quimica",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Calor, Fusão, Frio e Congelamento",
    "topic": "Manteiga na Frigideira",
    "question": "Ao colocar um pedaço de manteiga dura na frigideira no fogão aceso, o que acontece quase imediatamente?",
    "options": [
      "A manteiga derrete rapidamente e se espalha como líquido dourado",
      "A manteiga fica mais dura ainda",
      "A manteiga voa para o teto",
      "A manteiga vira cascalho"
    ],
    "correctIndex": 0,
    "explanation": "O calor intenso da frigideira derrete rapidamente a gordura da manteiga!"
  },
  {
    "id": "qui_2_c2_06",
    "subject": "quimica",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Calor, Fusão, Frio e Congelamento",
    "topic": "Segurança na Cozinha: Panelas Quentes",
    "question": "Por que as crianças NUNCA devem mexer em panelas no fogão aceso ou segurar cabos quentes?",
    "options": [
      "Porque o calor forte pode causar queimaduras dolorosas e acidentes graves na pele",
      "Porque a comida não gosta de crianças",
      "Porque o fogo é gelado",
      "Porque o chão vai quebrar"
    ],
    "correctIndex": 0,
    "explanation": "Segurança em primeiro lugar: objetos quentes no fogão devem ser manuseados apenas por adultos!"
  },
  {
    "id": "qui_2_c2_07",
    "subject": "quimica",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Calor, Fusão, Frio e Congelamento",
    "topic": "Termômetro Clínico",
    "question": "Qual instrumento o papai e a mamãe usam para medir se a nossa temperatura está quentinha demais com febre?",
    "options": [
      "Termômetro",
      "Régua de medir",
      "Balança de peso",
      "Relógio de parede"
    ],
    "correctIndex": 0,
    "explanation": "O termômetro é o instrumento médico usado para medir a temperatura do nosso corpo!"
  },
  {
    "id": "qui_2_c2_08",
    "subject": "quimica",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Calor, Fusão, Frio e Congelamento",
    "topic": "O Fogo e o Calor",
    "question": "O fogo produz luz e calor. Qual destes cuidados é indispensável para prevenir acidentes?",
    "options": [
      "Nunca brincar com fósforos, isqueiros ou álcool líquido",
      "Deixar fósforos espalhados na cama",
      "Acender fogo perto de cortinas de pano",
      "Assoprar fogueiras sem avisar ninguém"
    ],
    "correctIndex": 0,
    "explanation": "Fósforos e isqueiros nunca são brinquedos e devem ser mantidos longe do alcance de crianças!"
  },
  {
    "id": "qui_2_c2_09",
    "subject": "quimica",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Calor, Fusão, Frio e Congelamento",
    "topic": "Luvas Térmicas de Forno",
    "question": "Por que a mamãe usa uma luva grossa acolchoada para tirar uma assadeira de bolo quente do forno?",
    "options": [
      "A luva é um isolante térmico que impede o calor forte de queimar as mãos dela",
      "Para não sujar o bolo de farinha",
      "Para fazer cócegas no bolo",
      "Porque é bonita para fotos"
    ],
    "correctIndex": 0,
    "explanation": "Materiais isolantes térmicos como tecido grosso protegem a pele do calor excessivo!"
  },
  {
    "id": "qui_2_c2_10",
    "subject": "quimica",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Calor, Fusão, Frio e Congelamento",
    "topic": "Areia Quente na Praia",
    "question": "Em um dia ensolarado de verão, por que a areia da praia fica tão quente ao meio-dia?",
    "options": [
      "Porque a areia absorve a energia e o calor dos raios do Sol a manhã inteira",
      "Porque há carvão aceso embaixo da praia",
      "Porque a água do mar ferve",
      "Por causa dos caranguejos"
    ],
    "correctIndex": 0,
    "explanation": "O Sol emite radiação térmica que esquenta rapidamente os grãos de areia!"
  },
  {
    "id": "qui_2_c2_11",
    "subject": "quimica",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Calor, Fusão, Frio e Congelamento",
    "topic": "Garrafa Térmica",
    "question": "Para que serve a garrafa térmica onde guardamos chocolate quente ou água geladinha?",
    "options": [
      "Manter o líquido quente por mais tempo ou manter o gelado bem fresquinho, evitando trocas de calor",
      "Fazer o líquido mudar de cor",
      "Adicionar açúcar sozinha",
      "Tocar música quando abrimos"
    ],
    "correctIndex": 0,
    "explanation": "Garrafas térmicas possuem paredes duplas isolantes que conservam a temperatura interna!"
  },
  {
    "id": "qui_2_c2_12",
    "subject": "quimica",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Calor, Fusão, Frio e Congelamento",
    "topic": "Boneco de Neve no Sol",
    "question": "Se construirmos um boneco de neve e o Sol forte brilhar a tarde toda, o que vai acontecer com ele?",
    "options": [
      "Ele vai derreter todinho e virar uma poça de água líquida",
      "Ele vai virar um robô de ferro",
      "Ele vai crescer e ficar gigante",
      "Ele vai pular no lago congelado"
    ],
    "correctIndex": 0,
    "explanation": "A neve é água congelada que sofre fusão sob o calor do Sol!"
  },
  {
    "id": "qui_2_c2_13",
    "subject": "quimica",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Calor, Fusão, Frio e Congelamento",
    "topic": "Gelatina que Endurece na Geladeira",
    "question": "A mamãe prepara a gelatina com água quente líquida. Ao colocar na geladeira, a gelatina fica durinha e firme. O que o frio fez?",
    "options": [
      "O resfriamento permitiu que as moléculas se unissem firmemente, dando consistência sólida à gelatina",
      "O frio colocou pedras dentro dela",
      "A gelatina virou sorvete de massa",
      "Nada mudou"
    ],
    "correctIndex": 0,
    "explanation": "O resfriamento permite que as proteínas de colágeno formem uma rede firme e elástica!"
  },
  {
    "id": "qui_2_c2_14",
    "subject": "quimica",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Calor, Fusão, Frio e Congelamento",
    "topic": "Casaco de Lã no Frio",
    "question": "Quando você veste um casaco quentinho de lã no inverno, por que ele te protege do frio?",
    "options": [
      "O casaco retém o calor natural que o seu próprio corpinho produz, evitando que ele escape para o ar frio",
      "O casaco tem pilhas elétricas dentro dele",
      "O casaco sopra fogo",
      "Porque o casaco é muito pesado"
    ],
    "correctIndex": 0,
    "explanation": "A lã funciona como isolante térmico que retém a camada de ar aquecida pelo seu corpo!"
  },
  {
    "id": "qui_2_c2_15",
    "subject": "quimica",
    "year": 2,
    "chapter": 2,
    "chapterTitle": "Calor, Fusão, Frio e Congelamento",
    "topic": "Cuidado com o Sol Forte",
    "question": "Para nos proteger do excesso de calor e dos raios fortes do Sol nos dias quentes, devemos:",
    "options": [
      "Usar protetor solar, boné, beber bastante água e ficar na sombra nas horas mais quentes",
      "Ficar horas no sol sem beber água",
      "Usar casaco preto de lã ao meio-dia",
      "Olhar diretamente para o sol"
    ],
    "correctIndex": 0,
    "explanation": "Hidratação e proteção solar evitam insolação e queimaduras na pele!"
  },
  {
    "id": "qui_2_c3_01",
    "subject": "quimica",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Misturas do Dia a Dia e Dissolução Simples",
    "topic": "Achocolatado no Leite",
    "question": "Quando colocamos uma colher de achocolatado em pó no copo de leite e mexemos bem, o que acontece?",
    "options": [
      "O pó se mistura e se dissolve no leite, deixando-o marronzinho e saboroso",
      "O leite vira água transparente",
      "O leite congela em gelo duro",
      "O pó some e o leite continua branco"
    ],
    "correctIndex": 0,
    "explanation": "O achocolatado se dissolve e se dispersa no leite formando uma mistura deliciosa!"
  },
  {
    "id": "qui_2_c3_02",
    "subject": "quimica",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Misturas do Dia a Dia e Dissolução Simples",
    "topic": "Água e Açúcar: Dissolução",
    "question": "Ao colocar uma colher de açúcar na água e mexer com a colher, o açúcar parece desaparecer aos olhos. Dizemos que o açúcar:",
    "options": [
      "Se dissolveu na água (ficou solúvel)",
      "Evaporou para o teto",
      "Quebrou o copo",
      "Virou salgado"
    ],
    "correctIndex": 0,
    "explanation": "O açúcar se dissolve perfeitamente na água, formando uma solução líquida límpida!"
  },
  {
    "id": "qui_2_c3_03",
    "subject": "quimica",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Misturas do Dia a Dia e Dissolução Simples",
    "topic": "Água e Óleo não se Misturam",
    "question": "Se colocarmos água e óleo de cozinha no mesmo copo transparente, o que acontece com eles?",
    "options": [
      "Eles NÃO se misturam; o óleo fica em cima e a água fica embaixo",
      "Eles se misturam perfeitamente e viram leite",
      "O óleo afunda para o fundo do copo",
      "O copo quebra sozinho"
    ],
    "correctIndex": 0,
    "explanation": "Água e óleo são imiscíveis; como o óleo é menos denso, ele fica na camada de cima!"
  },
  {
    "id": "qui_2_c3_04",
    "subject": "quimica",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Misturas do Dia a Dia e Dissolução Simples",
    "topic": "Areia e Água",
    "question": "Se colocarmos areia em um copo com água e mexermos bastante, a areia vai se dissolver como o açúcar?",
    "options": [
      "Não, a areia é insolúvel e vai se assentar no fundo do copo",
      "Sim, a areia desaparece todinha",
      "A areia vira açúcar doce",
      "A água vira fumaça"
    ],
    "correctIndex": 0,
    "explanation": "A areia não se dissolve na água e decanta no fundo por ser mais pesada!"
  },
  {
    "id": "qui_2_c3_05",
    "subject": "quimica",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Misturas do Dia a Dia e Dissolução Simples",
    "topic": "Salada de Frutas: Mistura Heterogênea",
    "question": "Em uma tigela com salada de frutas com morango, banana, maçã e uva, conseguimos enxergar e separar cada pedacinho?",
    "options": [
      "Sim, enxergamos facilmente cada pedaço de fruta diferente",
      "Não, tudo fica transparente como água",
      "As frutas somem",
      "Vira uma barra de ferro"
    ],
    "correctIndex": 0,
    "explanation": "A salada de frutas é uma mistura onde vemos cada componente claramente a olho nu!"
  },
  {
    "id": "qui_2_c3_06",
    "subject": "quimica",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Misturas do Dia a Dia e Dissolução Simples",
    "topic": "Bolo de Cenoura: Ingredientes Misturados",
    "question": "Para fazer um bolo fofinho, a mamãe mistura farinha, ovos, açúcar e cenoura batida. O que acontece depois de assar?",
    "options": [
      "Os ingredientes se uniram pelo calor do forno e viraram um bolo delicioso",
      "O bolo volta a ser farinha em pó",
      "O bolo vira gelo duro",
      "Nada acontece"
    ],
    "correctIndex": 0,
    "explanation": "O calor do forno cozinha a mistura, transformando os ingredientes em um bolo fofinho!"
  },
  {
    "id": "qui_2_c3_07",
    "subject": "quimica",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Misturas do Dia a Dia e Dissolução Simples",
    "topic": "Filtro de Papel para Café",
    "question": "Quando o papai passa café usando um filtro de papel, para que serve o coador?",
    "options": [
      "Segurar o pó de café usado enquanto a água quente passa com o sabor do cafezinho",
      "Esquentar o leite",
      "Moer a xícara",
      "Congelar o café"
    ],
    "correctIndex": 0,
    "explanation": "A filtração separa a parte sólida (borra de pó) da parte líquida (bebida pronta)!"
  },
  {
    "id": "qui_2_c3_08",
    "subject": "quimica",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Misturas do Dia a Dia e Dissolução Simples",
    "topic": "Peneira de Areia na Praia",
    "question": "Ao brincar na praia com uma peneirinha plástica, colocamos areia com pedrinhas e conchas. O que passa pelos buraquinhos?",
    "options": [
      "A areia fininha passa e as pedrinhas e conchas maiores ficam presas na peneira",
      "Nada passa",
      "As pedras passam e a areia fica",
      "A peneira derrete"
    ],
    "correctIndex": 0,
    "explanation": "A peneiração separa os pedacinhos menores dos maiores pelo tamanho dos furos!"
  },
  {
    "id": "qui_2_c3_09",
    "subject": "quimica",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Misturas do Dia a Dia e Dissolução Simples",
    "topic": "Água Salgada do Mar",
    "question": "A água do mar tem muito sal dissolvido que não conseguimos enxergar com os olhos. Se a água do mar evaporar no sol forte, o que fica no chão?",
    "options": [
      "O sal branquinho cristalizado",
      "Ouro puro",
      "Açúcar doce",
      "Nada"
    ],
    "correctIndex": 0,
    "explanation": "A água evapora com o calor e deixa para trás os cristais de sal marinho!"
  },
  {
    "id": "qui_2_c3_10",
    "subject": "quimica",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Misturas do Dia a Dia e Dissolução Simples",
    "topic": "Gás no Refrigerante",
    "question": "Ao abrir uma garrafinha de água com gás ou refrigerante, ouvimos um 'tsss' e vemos bolhinhas subindo. O que são aquelas bolhas?",
    "options": [
      "Bolhas de gás carbônico que estavam misturadas no líquido sob pressão",
      "Pedaços de plástico",
      "Poeira que caiu dentro",
      "Vapor de fogueira"
    ],
    "correctIndex": 0,
    "explanation": "É o gás dissolvido que escapa em forma de bolhinhas quando aliviamos a pressão da tampa!"
  },
  {
    "id": "qui_2_c3_11",
    "subject": "quimica",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Misturas do Dia a Dia e Dissolução Simples",
    "topic": "Tinta Guache Colorida",
    "question": "Se misturarmos guache amarelo com guache azul no pratinho de pintura, qual nova cor mágica nós criamos?",
    "options": [
      "Verde",
      "Preto",
      "Branco",
      "Rosa"
    ],
    "correctIndex": 0,
    "explanation": "A mistura das tintas amarela e azul resulta na cor verde!"
  },
  {
    "id": "qui_2_c3_12",
    "subject": "quimica",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Misturas do Dia a Dia e Dissolução Simples",
    "topic": "Bolhas de Sabão",
    "question": "Para fazer lindas bolhas de sabão que voam no vento, o que misturamos na água?",
    "options": [
      "Sabonete líquido ou detergente",
      "Sal grosso",
      "Farinha de trigo",
      "Pedras"
    ],
    "correctIndex": 0,
    "explanation": "O sabão reduz a tensão superficial da água, permitindo formar películas elásticas que viram bolhas!"
  },
  {
    "id": "qui_2_c3_13",
    "subject": "quimica",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Misturas do Dia a Dia e Dissolução Simples",
    "topic": "Suco de Laranja Natural",
    "question": "Ao espremer laranjas na jarra, temos o suco com pequenos gomos e sementes. Para tirar as sementes, usamos:",
    "options": [
      "Uma peneira / coador",
      "Um ferro de passar",
      "Um garfo quente",
      "Um lápis"
    ],
    "correctIndex": 0,
    "explanation": "A peneira retém as sementes sólidas deixando passar apenas o líquido gostoso!"
  },
  {
    "id": "qui_2_c3_14",
    "subject": "quimica",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Misturas do Dia a Dia e Dissolução Simples",
    "topic": "Massinha de Modelar Caseira",
    "question": "Quando misturamos farinha de trigo, água, sal e corante alimentício, nós criamos qual brinquedo divertido?",
    "options": [
      "Massinha de modelar macia",
      "Um carrinho de madeira",
      "Um balão de gás",
      "Um sapato"
    ],
    "correctIndex": 0,
    "explanation": "Essa mistura simples e segura vira uma massinha de modelar macia para brincar!"
  },
  {
    "id": "qui_2_c3_15",
    "subject": "quimica",
    "year": 2,
    "chapter": 3,
    "chapterTitle": "Misturas do Dia a Dia e Dissolução Simples",
    "topic": "Curiosidade Científica",
    "question": "O que os pequenos cientistas fazem quando querem descobrir novas misturas no laboratório da escola?",
    "options": [
      "Observam com atenção, fazem experimentos com cuidado e sempre com a ajuda de um professor",
      "Bebem líquidos desconhecidos sem perguntar",
      "Jogam tudo no chão",
      "Fecham os olhos"
    ],
    "correctIndex": 0,
    "explanation": "A ciência se faz com curiosidade, atenção e segurança acompanhada por adultos!"
  },
  {
    "id": "qui_2_c4_01",
    "subject": "quimica",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Fósseis, Rochas e o Mundo dos Dinossauros",
    "topic": "O que é um Fóssil?",
    "question": "O que é um 'Fóssil' encontrado na terra ou nas pedras?",
    "options": [
      "O resto ou a marca petrificada de animais e plantas que viveram há milhões de anos na Terra",
      "Um brinquedo de plástico novo",
      "Um pedaço de papel rasgado ontem",
      "Uma pedra que caiu da lua hoje cedo"
    ],
    "correctIndex": 0,
    "explanation": "Fósseis são ossos, dentes, conchas ou pegadas antigas preservadas em rochas!"
  },
  {
    "id": "qui_2_c4_02",
    "subject": "quimica",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Fósseis, Rochas e o Mundo dos Dinossauros",
    "topic": "O Cientista: Paleontólogo",
    "question": "Como se chama o cientista que estuda fósseis e descobre ossos de dinossauros com pincéis e pás especiais?",
    "options": [
      "Paleontólogo",
      "Astronauta",
      "Mecânico",
      "Piloto de avião"
    ],
    "correctIndex": 0,
    "explanation": "Paleontólogo é o cientista que estuda as formas de vida do passado através dos fósseis!"
  },
  {
    "id": "qui_2_c4_03",
    "subject": "quimica",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Fósseis, Rochas e o Mundo dos Dinossauros",
    "topic": "O Tiranossauro Rex",
    "question": "O famoso dinossauro carnívoro com dentes gigantes e bracinhos curtos se chama:",
    "options": [
      "Tiranossauro Rex (T-Rex)",
      "Triceratops",
      "Estegossauro",
      "Braquiossauro"
    ],
    "correctIndex": 0,
    "explanation": "O Tiranossauro Rex é um dos mais temíveis e famosos dinossauros carnívoros da história!"
  },
  {
    "id": "qui_2_c4_04",
    "subject": "quimica",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Fósseis, Rochas e o Mundo dos Dinossauros",
    "topic": "Dinossauro de Pescoço Longo",
    "question": "O Braquiossauro tinha um pescoço gigantesco e comia folhas no topo das árvores altas. Ele era um:",
    "options": [
      "Herbívoro gigante",
      "Carnívoro feroz",
      "Peixe marinho",
      "Inseto com asas"
    ],
    "correctIndex": 0,
    "explanation": "O Braquiossauro era um imenso dinossauro herbívoro que usava o longo pescoço para comer plantas altas!"
  },
  {
    "id": "qui_2_c4_05",
    "subject": "quimica",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Fósseis, Rochas e o Mundo dos Dinossauros",
    "topic": "Pegadas Fóssil",
    "question": "Quando um dinossauro pisou na lama úmida há milhões de anos e essa lama virou pedra dura, nós encontramos:",
    "options": [
      "Uma pegada fóssil petrificada",
      "Um sapato velho",
      "Uma poça de água",
      "Um ovo quebrado"
    ],
    "correctIndex": 0,
    "explanation": "Pegadas preservadas em rochas mostram aos cientistas como os dinossauros andavam e corriam!"
  },
  {
    "id": "qui_2_c4_06",
    "subject": "quimica",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Fósseis, Rochas e o Mundo dos Dinossauros",
    "topic": "Fóssil em Âmbar Dourado",
    "question": "Pequenos mosquitos e formigas do passado ficaram preservados inteirinhos dentro de qual resina dourada de árvore que endureceu como pedra?",
    "options": [
      "Âmbar",
      "Gelo derretido",
      "Vidro de janela",
      "Cera de ouvido"
    ],
    "correctIndex": 0,
    "explanation": "O âmbar é a resina vegetal fossilizada que preserva insetos pré-históricos em detalhes perfeitos!"
  },
  {
    "id": "qui_2_c4_07",
    "subject": "quimica",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Fósseis, Rochas e o Mundo dos Dinossauros",
    "topic": "Rochas da Terra",
    "question": "As pedras duras que formam montanhas e o chão da Terra são chamadas na ciência de:",
    "options": [
      "Rochas",
      "Borrachas",
      "Plásticos",
      "Esponjas"
    ],
    "correctIndex": 0,
    "explanation": "Rochas são agregações naturais e sólidas de minerais que formam a crosta do planeta!"
  },
  {
    "id": "qui_2_c4_08",
    "subject": "quimica",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Fósseis, Rochas e o Mundo dos Dinossauros",
    "topic": "Vulcão e Lava",
    "question": "O que sai de dentro de um vulcão em erupção muito quente?",
    "options": [
      "Lava (rocha derretida em altíssima temperatura) e cinzas",
      "Sorvete de morango",
      "Gelo congelado",
      "Água com açúcar"
    ],
    "correctIndex": 0,
    "explanation": "A lava vulcânica é rocha líquida incandescente vinda do interior quente da Terra!"
  },
  {
    "id": "qui_2_c4_09",
    "subject": "quimica",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Fósseis, Rochas e o Mundo dos Dinossauros",
    "topic": "Resfriamento da Lava: Pedra-pomes e Basalto",
    "question": "Quando a lava quente sai do vulcão e esfria no ar ou na água, o que ela vira?",
    "options": [
      "Rocha sólida dura (rocha vulcânica)",
      "Água de rio",
      "Nuvem de algodão",
      "Madeira seca"
    ],
    "correctIndex": 0,
    "explanation": "Ao resfriar e endurecer, o magma vira rocha ígnea/vulcânica como o basalto!"
  },
  {
    "id": "qui_2_c4_10",
    "subject": "quimica",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Fósseis, Rochas e o Mundo dos Dinossauros",
    "topic": "Conchas Marinhas no Alto de Montanhas",
    "question": "Por que cientistas já encontraram fósseis de conchinhas marinhas no alto de altas montanhas?",
    "options": [
      "Porque há milhões de anos aquela montanha já esteve no fundo de um mar antigo antes da terra se elevar",
      "Porque passarinhos levaram todas as conchas para lá ontem",
      "Porque as conchas aprenderam a escalar árvores",
      "Foi coincidência"
    ],
    "correctIndex": 0,
    "explanation": "O relevo da Terra se movimenta ao longo de eras: fundos oceânicos antigos foram erguidos em cordilheiras!"
  },
  {
    "id": "qui_2_c4_11",
    "subject": "quimica",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Fósseis, Rochas e o Mundo dos Dinossauros",
    "topic": "Pokémon Fósseis: Omanyte e Kabuto",
    "question": "No Pokémon FireRed, na Caverna dos Fósseis de Kanto, você revivemonstrinhos pré-históricos como Omanyte e Kabuto. Em que eles são inspirados?",
    "options": [
      "Em fósseis reais de amonitas e trilobitas que viveram nos oceanos primitivos",
      "Em robôs modernos",
      "Em aviões de carga",
      "Em frutas tropicais"
    ],
    "correctIndex": 0,
    "explanation": "Omanyte foi inspirado nas amonitas e Kabuto nos trilobitas, fósseis marinhos célebres!"
  },
  {
    "id": "qui_2_c4_12",
    "subject": "quimica",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Fósseis, Rochas e o Mundo dos Dinossauros",
    "topic": "Aerodactyl e os Pterossauros",
    "question": "O Pokémon Aerodactyl voa nos céus com asas e bico com dentes pontudos. Qual réptil voador antigo ele representa?",
    "options": [
      "Pterossauro",
      "Galinha comum",
      "Morcego atual",
      "Beija-flor"
    ],
    "correctIndex": 0,
    "explanation": "Aerodactyl é inspirado nos répteis fósseis voadores conhecidos como pterossauros!"
  },
  {
    "id": "qui_2_c4_13",
    "subject": "quimica",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Fósseis, Rochas e o Mundo dos Dinossauros",
    "topic": "Museu de História Natural",
    "question": "Em qual lugar especial podemos visitar esqueletos montados de dinossauros e aprender sobre o passado da Terra?",
    "options": [
      "No Museu de Ciências e História Natural",
      "No posto de gasolina",
      "Na padaria da esquina",
      "No cinema escuro"
    ],
    "correctIndex": 0,
    "explanation": "Os museus conservam e exibem acervos de fósseis para a educação e encantamento de todos!"
  },
  {
    "id": "qui_2_c4_14",
    "subject": "quimica",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Fósseis, Rochas e o Mundo dos Dinossauros",
    "topic": "Ovo de Dinossauro Fossilizado",
    "question": "Os dinossauros colocavam ovos com casca dura. Já foram encontrados ninhos com ovos petrificados inteiros?",
    "options": [
      "Sim, paleontólogos descobriram ninhos fósseis com ovos petrificados e até embriões dentro!",
      "Não, ovos nunca viram pedra",
      "Dinossauros não botavam ovos",
      "Os ovos viraram ouro"
    ],
    "correctIndex": 0,
    "explanation": "Ninhos e ovos fossilizados revelam detalhes incríveis sobre o nascimento dos pequenos dinossauros!"
  },
  {
    "id": "qui_2_c4_15",
    "subject": "quimica",
    "year": 2,
    "chapter": 4,
    "chapterTitle": "Fósseis, Rochas e o Mundo dos Dinossauros",
    "topic": "Cuidado e Respeito aos Fósseis",
    "question": "Quando um paleontólogo encontra um fóssil raro na terra, por que ele usa pincéis macios em vez de marretas pesadas?",
    "options": [
      "Para limpar a rocha delicadamente sem quebrar o fóssil milenar tão precioso",
      "Para fazer carinho na terra",
      "Para pintar o fóssil de azul",
      "Porque marretas não existem"
    ],
    "correctIndex": 0,
    "explanation": "A escavação paleontológica é um trabalho de enorme paciência e delicadeza para preservar a história!"
  },
  {
    "id": "qui_4_c1_01",
    "subject": "quimica",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Mudanças de Estado Físico da Matéria",
    "topic": "Fusão: Sólido para Líquido",
    "question": "Como se chama a passagem do estado sólido para o estado líquido quando fornecemos calor (ex: gelo virando água)?",
    "options": [
      "Fusão",
      "Solidificação",
      "Condensação",
      "Sublimação"
    ],
    "correctIndex": 0,
    "explanation": "Fusão é a mudança de estado físico do sólido para o líquido provocada pelo ganho de calor!"
  },
  {
    "id": "qui_4_c1_02",
    "subject": "quimica",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Mudanças de Estado Físico da Matéria",
    "topic": "Solidificação: Líquido para Sólido",
    "question": "Qual é o nome da mudança física quando um líquido perde calor e se transforma em sólido (ex: água virando gelo no congelador)?",
    "options": [
      "Solidificação",
      "Vaporização",
      "Ebulição",
      "Fusão"
    ],
    "correctIndex": 0,
    "explanation": "Solidificação é a passagem do estado líquido para o sólido decorrente da perda de energia térmica!"
  },
  {
    "id": "qui_4_c1_03",
    "subject": "quimica",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Mudanças de Estado Físico da Matéria",
    "topic": "Vaporização: Evaporação vs Ebulição",
    "question": "A vaporização pode acontecer lentamente à temperatura ambiente (roupa no varal) ou rapidamente e com bolhas no fogão. Como se chamam esses dois tipos?",
    "options": [
      "Evaporação (lenta e espontânea) e Ebulição (rápida e turbulenta com bolhas)",
      "Fusão e Solidificação",
      "Condensação e Chuva",
      "Sublimação e Degradação"
    ],
    "correctIndex": 0,
    "explanation": "Evaporação ocorre na superfície sem fervura; ebulição ocorre em toda a massa líquida a 100°C!"
  },
  {
    "id": "qui_4_c1_04",
    "subject": "quimica",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Mudanças de Estado Físico da Matéria",
    "topic": "Condensação ou Liquefação",
    "question": "A passagem do estado gasoso (vapor) para o estado líquido ao entrar em contato com uma superfície fria chama-se:",
    "options": [
      "Condensação (ou Liquefação)",
      "Fusão",
      "Calefação",
      "Solidificação"
    ],
    "correctIndex": 0,
    "explanation": "A condensação ocorre quando o vapor perde calor e retorna ao estado líquido (como gotas no espelho do banheiro)!"
  },
  {
    "id": "qui_4_c1_05",
    "subject": "quimica",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Mudanças de Estado Físico da Matéria",
    "topic": "Sublimação Direta",
    "question": "Quando uma substância passa diretamente do estado SÓLIDO para o GASOSO sem passar pelo líquido (como o gelo seco e a naftalina), ocorre a:",
    "options": [
      "Sublimação",
      "Fusão fracionada",
      "Evaporação forçada",
      "Decantação"
    ],
    "correctIndex": 0,
    "explanation": "Sublimação é a transição direta do estado sólido para o gasoso sob pressão normal!"
  },
  {
    "id": "qui_4_c1_06",
    "subject": "quimica",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Mudanças de Estado Físico da Matéria",
    "topic": "Pontos de Fusão e Ebulição da Água",
    "question": "Ao nível do mar, qual é a temperatura do Ponto de Fusão (gelo derrete) e do Ponto de Ebulição (água ferve) da água pura?",
    "options": [
      "0 °C (Fusão) e 100 °C (Ebulição)",
      "10 °C e 50 °C",
      "0 °C e 500 °C",
      "-10 °C e 0 °C"
    ],
    "correctIndex": 0,
    "explanation": "Ao nível do mar (1 atm), a água pura funde a 0°C e entra em ebulição a exatamente 100°C!"
  },
  {
    "id": "qui_4_c1_07",
    "subject": "quimica",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Mudanças de Estado Físico da Matéria",
    "topic": "Organização Molecular dos Estados",
    "question": "Como estão organizadas as moléculas no estado sólido, líquido e gasoso?",
    "options": [
      "No sólido estão muito unidas e fixas; no líquido deslizam umas sobre as outras; no gasoso estão totalmente livres e afastadas",
      "No sólido estão voando e no gás estão presas",
      "Todos os estados têm moléculas paradas",
      "Não existem moléculas na água"
    ],
    "correctIndex": 0,
    "explanation": "O estado de agregação depende da agitação térmica e das forças de atração molecular!"
  },
  {
    "id": "qui_4_c1_08",
    "subject": "quimica",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Mudanças de Estado Físico da Matéria",
    "topic": "Anomalia da Água e Densidade do Gelo",
    "question": "Por que os lagos congelam apenas na superfície no inverno rigoroso, permitindo que os peixes continuem vivos no fundo líquido?",
    "options": [
      "Porque o gelo é menos denso que a água líquida a 4°C e flutua formando uma camada protetora isolante",
      "Porque os peixes comem o gelo do fundo",
      "Porque o fundo do lago tem fogo aceso",
      "Porque a água salgada é venenosa"
    ],
    "correctIndex": 0,
    "explanation": "A água atinge densidade máxima a 4°C, afundando; o gelo flutua isolando a vida aquática abaixo!"
  },
  {
    "id": "qui_4_c1_09",
    "subject": "quimica",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Mudanças de Estado Físico da Matéria",
    "topic": "Gelo Seco: CO2 Sólido",
    "question": "O chamado 'Gelo Seco', muito usado em palcos de shows para fazer efeitos de fumaça densa no chão, é formado por qual gás congelado?",
    "options": [
      "Dióxido de Carbono (Gás Carbônico - CO2)",
      "Oxigênio puro",
      "Hélio dos balões",
      "Nitrogênio líquido"
    ],
    "correctIndex": 0,
    "explanation": "O gelo seco é CO2 sólido a -78,5°C que sublima gerando névoa fria!"
  },
  {
    "id": "qui_4_c1_10",
    "subject": "quimica",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Mudanças de Estado Físico da Matéria",
    "topic": "Panela de Pressão e Ebulição",
    "question": "Por que a panela de pressão cozinha os alimentos muito mais rápido do que uma panela comum aberta?",
    "options": [
      "A alta pressão interna faz a água ferver a uma temperatura superior a 100°C (cerca de 120°C)",
      "A panela espreme os grãos com pinças",
      "O fogo entra dentro da panela",
      "O ar frio congela o feijão"
    ],
    "correctIndex": 0,
    "explanation": "Sob maior pressão, o ponto de ebulição da água sobe para ~120°C, cozinhando os alimentos velozmente!"
  },
  {
    "id": "qui_4_c1_11",
    "subject": "quimica",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Mudanças de Estado Físico da Matéria",
    "topic": "Calefação: Mudança Instantânea",
    "question": "Quando uma gota d'água cai sobre uma chapa de ferro em brasa e chia vaporizando em frações de segundo, ocorre a:",
    "options": [
      "Calefação",
      "Evaporação lenta",
      "Solidificação forçada",
      "Sublimação reversa"
    ],
    "correctIndex": 0,
    "explanation": "Calefação é a vaporização ultrarrápida que ocorre quando o líquido atinge uma superfície com temperatura muito acima de seu ponto de ebulição!"
  },
  {
    "id": "qui_4_c1_12",
    "subject": "quimica",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Mudanças de Estado Físico da Matéria",
    "topic": "Pressão Atmosférica e Altitude",
    "question": "No topo do Monte Everest (onde o ar é rarefeito e a pressão é menor), a água entra em ebulição a uma temperatura:",
    "options": [
      "Menor que 100 °C (cerca de 72 °C)",
      "Maior que 200 °C",
      "Exatamente 100 °C igual à praia",
      "A água nunca ferve nas montanhas"
    ],
    "correctIndex": 0,
    "explanation": "Menor pressão atmosférica facilita o escape das moléculas gasosas, baixando o ponto de ebulição!"
  },
  {
    "id": "qui_4_c1_13",
    "subject": "quimica",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Mudanças de Estado Físico da Matéria",
    "topic": "Transmissão de Calor: Condução, Convecção e Irradiação",
    "question": "Quais são as três formas pelas quais a energia térmica (calor) se propaga no universo?",
    "options": [
      "Condução (em sólidos), Convecção (em fluidos) e Irradiação (por ondas eletromagnéticas)",
      "Empurrão, Pulo e Queda",
      "Fogo, Água e Vento",
      "Adição, Subtração e Divisão"
    ],
    "correctIndex": 0,
    "explanation": "Calor se transfere por condução (contato), convecção (correntes de fluidos) e radiação térmica!"
  },
  {
    "id": "qui_4_c1_14",
    "subject": "quimica",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Mudanças de Estado Físico da Matéria",
    "topic": "Condutores e Isolantes Térmicos",
    "question": "Por que as panelas são feitas de metais (como alumínio e ferro) e seus cabos são de baquelite, madeira ou silicone?",
    "options": [
      "Os metais são bons condutores que aquecem a comida rápido, e os cabos são isolantes para não queimar a mão do cozinheiro",
      "Para a panela ficar mais pesada",
      "Porque o metal derrete na madeira",
      "Não há nenhum motivo"
    ],
    "correctIndex": 0,
    "explanation": "Metais conduzem calor com eficiência, enquanto polímeros e madeiras atuam como isolantes térmicos protetores!"
  },
  {
    "id": "qui_4_c1_15",
    "subject": "quimica",
    "year": 4,
    "chapter": 1,
    "chapterTitle": "Mudanças de Estado Físico da Matéria",
    "topic": "Conservação da Massa nas Mudanças Físicas",
    "question": "Se derretermos 500 gramas de cubos de gelo dentro de um pote hermeticamente fechado, qual será a massa da água líquida obtida?",
    "options": [
      "Exatamente os mesmos 500 gramas (a massa se conserva)",
      "250 gramas (metade sumiu)",
      "1.000 gramas (duplicou)",
      "Zero gramas"
    ],
    "correctIndex": 0,
    "explanation": "Mudanças físicas não criam nem destroem matéria: a massa total se conserva inalterada!"
  },
  {
    "id": "qui_4_c2_01",
    "subject": "quimica",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Substâncias Puras, Misturas e Métodos de Separação",
    "topic": "Misturas Homogêneas vs Heterogêneas",
    "question": "Qual é a diferença entre uma mistura 'Homogênea' e uma 'Heterogênea'?",
    "options": [
      "A homogênea apresenta apenas 1 única fase uniforme (como água e sal dissolvido); a heterogênea apresenta 2 ou mais fases visíveis (como água e óleo)",
      "A homogênea só tem sólidos e a heterogênea só gases",
      "A heterogênea é sempre doce",
      "Não existe diferença"
    ],
    "correctIndex": 0,
    "explanation": "Homogêneas são monofásicas (soluções); heterogêneas possuem duas ou mais fases distintas!"
  },
  {
    "id": "qui_4_c2_02",
    "subject": "quimica",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Substâncias Puras, Misturas e Métodos de Separação",
    "topic": "Componentes de uma Solução: Soluto e Solvente",
    "question": "Em um copo de água com açúcar totalmente dissolvido, quem é o 'Soluto' e quem é o 'Solvente'?",
    "options": [
      "O açúcar é o soluto (substância dissolvida) e a água é o solvente (líquido que dissolve)",
      "A água é o soluto e o açúcar o solvente",
      "Ambos são solutos",
      "A colher é o solvente"
    ],
    "correctIndex": 0,
    "explanation": "Soluto é a substância que é dissolvida e solvente é o meio dispersor que dissolve (água = solvente universal)!"
  },
  {
    "id": "qui_4_c2_03",
    "subject": "quimica",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Substâncias Puras, Misturas e Métodos de Separação",
    "topic": "Filtração",
    "question": "Qual método mecânico de separação é utilizado para separar um sólido insolúvel misturado em um líquido (como pó de café na água)?",
    "options": [
      "Filtração",
      "Destilação",
      "Centrifugação térmica",
      "Sublimação"
    ],
    "correctIndex": 0,
    "explanation": "A filtração retém partículas sólidas em uma malha porosa enquanto o filtrado líquido passa livremente!"
  },
  {
    "id": "qui_4_c2_04",
    "subject": "quimica",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Substâncias Puras, Misturas e Métodos de Separação",
    "topic": "Decantação",
    "question": "Deixar uma mistura de água barrenta em repouso até que a terra pesada assente no fundo do recipiente para verter a água limpa é o método da:",
    "options": [
      "Decantação (ou Sedimentação)",
      "Evaporação forçada",
      "Catação manual",
      "Levigação"
    ],
    "correctIndex": 0,
    "explanation": "Na decantação, a gravidade faz com que o sólido mais denso sedimente no fundo do frasco!"
  },
  {
    "id": "qui_4_c2_05",
    "subject": "quimica",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Substâncias Puras, Misturas e Métodos de Separação",
    "topic": "Evaporação em Salinas",
    "question": "Como o sal de cozinha é extraído da água do mar nas salinas litorâneas?",
    "options": [
      "A água do mar é retida em tanques rasos sob o sol e o vento até evaporar completamente, restando o sal cristalizado",
      "O sal é pescado com redes de arrasto",
      "Com filtros de pano minúsculos",
      "Com ímãs potentes"
    ],
    "correctIndex": 0,
    "explanation": "A evaporação da água solarizada nas salinas concentra e precipita cristais puros de cloreto de sódio!"
  },
  {
    "id": "qui_4_c2_06",
    "subject": "quimica",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Substâncias Puras, Misturas e Métodos de Separação",
    "topic": "Separação Magnética (Imantação)",
    "question": "Se derrubarmos alfinetes de ferro dentro de uma tigela cheia de farinha, qual é o método mais rápido e eficiente para separá-los?",
    "options": [
      "Separação Magnética com um ímã",
      "Peneirar com água quente",
      "Lavar na torneira",
      "Catar um a um com pinça"
    ],
    "correctIndex": 0,
    "explanation": "O ímã atrai seletivamente os materiais ferromagnéticos (como o ferro) sem tocar na farinha!"
  },
  {
    "id": "qui_4_c2_07",
    "subject": "quimica",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Substâncias Puras, Misturas e Métodos de Separação",
    "topic": "Catação",
    "question": "Quando a mamãe escolhe grãos de feijão na mesa, retirando pedrinhas e grãos estragados com as mãos, ela está realizando:",
    "options": [
      "Catação",
      "Filtração",
      "Destilação",
      "Decantação"
    ],
    "correctIndex": 0,
    "explanation": "Catação é a separação manual visual de sólidos baseada no aspecto, tamanho ou cor!"
  },
  {
    "id": "qui_4_c2_08",
    "subject": "quimica",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Substâncias Puras, Misturas e Métodos de Separação",
    "topic": "Peneiração (Tamisação)",
    "question": "Na construção civil, pedreiros passam a areia por uma grande tela de arame para separar o cascalho grosso. Esse método chama-se:",
    "options": [
      "Peneiração (ou Tamisação)",
      "Filtração a vácuo",
      "Centrifugação",
      "Sublimação"
    ],
    "correctIndex": 0,
    "explanation": "A peneiração separa frações sólidas de diferentes granulometrias usando malhas com aberturas calibradas!"
  },
  {
    "id": "qui_4_c2_09",
    "subject": "quimica",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Substâncias Puras, Misturas e Métodos de Separação",
    "topic": "Destilação Simples",
    "question": "Para obter água pura potável a partir de água com sal recuperando tanto o sal quanto a água líquida, usamos:",
    "options": [
      "Destilação Simples",
      "Peneiração fina",
      "Filtro de carvão comum",
      "Catação com pinça"
    ],
    "correctIndex": 0,
    "explanation": "A destilação simples ferve a água, recolhe seu vapor no condensador resfriado e preserva os sais na caldeira!"
  },
  {
    "id": "qui_4_c2_10",
    "subject": "quimica",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Substâncias Puras, Misturas e Métodos de Separação",
    "topic": "Destilação Fracionada: Petróleo",
    "question": "Como o petróleo bruto é separado em derivados úteis (gasolina, querosene, diesel, gás de cozinha) nas refinarias?",
    "options": [
      "Por Destilação Fracionada, aproveitando os diferentes pontos de ebulição de cada fração líquida",
      "Com grandes ímãs",
      "Passando o petróleo em papel toalha",
      "Mexendo com colheres gigantes"
    ],
    "correctIndex": 0,
    "explanation": "Torres de destilação fracionada separam hidrocarbonetos em diferentes bandejas térmicas de condensação!"
  },
  {
    "id": "qui_4_c2_11",
    "subject": "quimica",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Substâncias Puras, Misturas e Métodos de Separação",
    "topic": "Centrifugação: Exames de Sangue e Máquina de Lavar",
    "question": "Qual método utiliza a rotação ultrarrápida para acelerar a sedimentação de partículas sólidas (como no exame de sangue ou ao secar roupas)?",
    "options": [
      "Centrifugação",
      "Evaporação",
      "Imantação",
      "Sublimação"
    ],
    "correctIndex": 0,
    "explanation": "A força centrífuga empurra as partículas mais densas para a extremidade, separando o plasma dos glóbulos!"
  },
  {
    "id": "qui_4_c2_12",
    "subject": "quimica",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Substâncias Puras, Misturas e Métodos de Separação",
    "topic": "O Ar Atmosférico: Mistura Homogênea de Gases",
    "question": "O ar limpo que respiramos é uma mistura homogênea gasosa. Qual gás está presente em maior quantidade no ar?",
    "options": [
      "Gás Nitrogênio (N2 - cerca de 78%)",
      "Gás Oxigênio (cerca de 21%)",
      "Gás Carbônico (menos de 1%)",
      "Gás Hélio"
    ],
    "correctIndex": 0,
    "explanation": "O ar é composto por cerca de 78% de Nitrogênio, 21% de Oxigênio e 1% de outros gases nobres e CO2!"
  },
  {
    "id": "qui_4_c2_13",
    "subject": "quimica",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Substâncias Puras, Misturas e Métodos de Separação",
    "topic": "Ligas Metálicas: Soluções Sólidas",
    "question": "O bronze (cobre + estanho) e o aço (ferro + carbono) são exemplos de soluções sólidas chamadas de:",
    "options": [
      "Ligas Metálicas",
      "Minerais brutos",
      "Rochas sedimentares",
      "Fósseis sintéticos"
    ],
    "correctIndex": 0,
    "explanation": "Ligas metálicas são misturas homogêneas de dois ou mais metais com propriedades mecânicas melhoradas!"
  },
  {
    "id": "qui_4_c2_14",
    "subject": "quimica",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Substâncias Puras, Misturas e Métodos de Separação",
    "topic": "Tratamento de Água (ETA): Floculação e Decantação",
    "question": "Nas Estações de Tratamento de Água (ETA), qual etapa adiciona sulfato de alumínio para agrupar as sujeiras em flocos pesados?",
    "options": [
      "Floculação",
      "Cloração final",
      "Fervura total",
      "Sublimação"
    ],
    "correctIndex": 0,
    "explanation": "Na floculação, a sujeira microscópica se une em flocos densos para decantar facilmente nos tanques!"
  },
  {
    "id": "qui_4_c2_15",
    "subject": "quimica",
    "year": 4,
    "chapter": 2,
    "chapterTitle": "Substâncias Puras, Misturas e Métodos de Separação",
    "topic": "Levigação: Garimpo",
    "question": "No garimpo de ouro, os garimpeiros usam a bateia com água corrente para arrastar a areia mais leve e deixar as pepitas de ouro pesadas no fundo. Esse método é a:",
    "options": [
      "Levigação",
      "Destilação",
      "Centrifugação",
      "Filtração"
    ],
    "correctIndex": 0,
    "explanation": "Levigação é a separação de sólidos de densidades diferentes através de uma corrente de água!"
  },
  {
    "id": "qui_4_c3_01",
    "subject": "quimica",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Reações e Transformações Químicas",
    "topic": "Transformação Física vs Transformação Química",
    "question": "Qual é a diferença fundamental entre uma transformação física e uma química?",
    "options": [
      "Na física, a substância muda de forma ou estado mas continua sendo ela mesma; na química, novas substâncias são formadas",
      "Na física sempre explode e na química nada acontece",
      "São exatamente a mesma coisa",
      "A física só acontece na água"
    ],
    "correctIndex": 0,
    "explanation": "Transformações químicas alteram as ligações atômicas criando produtos com propriedades inéditas!"
  },
  {
    "id": "qui_4_c3_02",
    "subject": "quimica",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Reações e Transformações Químicas",
    "topic": "Exemplo de Transformação Física",
    "question": "Qual dos seguintes acontecimentos é uma transformação puramente FÍSICA?",
    "options": [
      "Rasgar uma folha de papel ou derreter um cubo de gelo",
      "Queimar papel e produzir cinzas",
      "O enferrujamento de um prego de ferro",
      "O cozimento de um ovo cru"
    ],
    "correctIndex": 0,
    "explanation": "Rasgar papel ou fundir gelo não altera a composição química das moléculas envolvidas!"
  },
  {
    "id": "qui_4_c3_03",
    "subject": "quimica",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Reações e Transformações Químicas",
    "topic": "Exemplo de Transformação Química",
    "question": "Qual das seguintes alternativas representa uma TRANSFORMAÇÃO QUÍMICA?",
    "options": [
      "Um prego de ferro que se cobre de ferrugem avermelhada com o tempo",
      "Quebrar um copo de vidro em cacos",
      "Dissolver açúcar na água",
      "Cortar uma maçã ao meio"
    ],
    "correctIndex": 0,
    "explanation": "A ferrugem é óxido de ferro resultante da reação química do ferro com oxigênio e umidade!"
  },
  {
    "id": "qui_4_c3_04",
    "subject": "quimica",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Reações e Transformações Químicas",
    "topic": "Evidências de Reação Química",
    "question": "Quais são sinais visíveis de que uma reação química acabou de acontecer?",
    "options": [
      "Liberação de gás (efervescência), mudança de cor, produção de luz/chama ou liberação de calor",
      "O objeto apenas mudar de lugar na mesa",
      "Aumentar o volume do som",
      "Ficar no escuro"
    ],
    "correctIndex": 0,
    "explanation": "Efervescência, alteração de coloração, luminescência e variação térmica são fortes indícios reacionais!"
  },
  {
    "id": "qui_4_c3_05",
    "subject": "quimica",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Reações e Transformações Químicas",
    "topic": "A Reação de Combustão",
    "question": "Para que ocorra uma reação de combustão (queima/fogo), quais três elementos do 'Triângulo do Fogo' são necessários?",
    "options": [
      "Combustível (madeira, gás), Comburente (Oxigênio) e Calor de ignição",
      "Água, Gelo e Terra",
      "Nitrogênio, Areia e Vento",
      "Sal, Açúcar e Farinha"
    ],
    "correctIndex": 0,
    "explanation": "A combustão é uma oxidação rápida que exige combustível, gás oxigênio e energia de ativação!"
  },
  {
    "id": "qui_4_c3_06",
    "subject": "quimica",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Reações e Transformações Químicas",
    "topic": "Extintor e Combate ao Fogo",
    "question": "Ao cobrir uma vela acesa com um copo de vidro invertido, por que a chama se apaga depois de alguns segundos?",
    "options": [
      "Porque o oxigênio dentro do copo foi todo consumido pela queima",
      "Porque o copo é frio demais",
      "Porque a cera explodiu",
      "Porque a luz sumiu"
    ],
    "correctIndex": 0,
    "explanation": "Sem comburente (oxigênio), a reação química de combustão é interrompida imediatamente!"
  },
  {
    "id": "qui_4_c3_07",
    "subject": "quimica",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Reações e Transformações Químicas",
    "topic": "Oxidação: Ferrugem no Ferro",
    "question": "Por que pintar portões e bicicletas de ferro protege o metal contra a ferrugem?",
    "options": [
      "A tinta forma uma barreira protetora que impede o oxigênio e a água do ar de tocar o ferro",
      "A tinta esfria o ferro até 0°C",
      "A tinta transforma o ferro em ouro",
      "Apenas para mudar a cor"
    ],
    "correctIndex": 0,
    "explanation": "A película de esmalte sintético isola o metal do contato com os agentes oxidantes atmosféricos!"
  },
  {
    "id": "qui_4_c3_08",
    "subject": "quimica",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Reações e Transformações Químicas",
    "topic": "Fotossíntese como Reação Química",
    "question": "Na fotossíntese, as plantas combinam água e gás carbônico na presença de luz solar. Quais são os PRODUTOS formados nessa reação?",
    "options": [
      "Glicose (açúcar energético) e Gás Oxigênio (O2)",
      "Carvão e fumaça",
      "Gelo e sal mineral",
      "Vinagre e ferro"
    ],
    "correctIndex": 0,
    "explanation": "6 CO2 + 6 H2O + Luz -> C6H12O6 (glicose) + 6 O2 (oxigênio)!"
  },
  {
    "id": "qui_4_c3_09",
    "subject": "quimica",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Reações e Transformações Químicas",
    "topic": "Bicarbonato de Sódio e Vinagre: Vulcão Caseiro",
    "question": "Ao misturar bicarbonato de sódio com vinagre em um vulcão de feira de ciências, ocorre uma efervescência violenta. Qual gás é liberado?",
    "options": [
      "Gás Carbônico (Dióxido de Carbono - CO2)",
      "Gás Hélio",
      "Fumaça de pólvora",
      "Gás Metano puro"
    ],
    "correctIndex": 0,
    "explanation": "A reação ácido-base entre ácido acético e bicarbonato produz gás carbônico pressurizado!"
  },
  {
    "id": "qui_4_c3_10",
    "subject": "quimica",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Reações e Transformações Químicas",
    "topic": "Fermentação Biológica do Pão",
    "question": "O fermento biológico colocado na massa do pão contém leveduras vivas que produzem bolhas de gás na massa, fazendo-a crescer fofinha. Essa reação chama-se:",
    "options": [
      "Fermentação",
      "Combustão",
      "Oxidação metálica",
      "Filtração"
    ],
    "correctIndex": 0,
    "explanation": "As leveduras realizam fermentação alcoólica consumindo glicose e liberando CO2 que estufa a massa!"
  },
  {
    "id": "qui_4_c3_11",
    "subject": "quimica",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Reações e Transformações Químicas",
    "topic": "Reações Reversíveis vs Irreversíveis",
    "question": "Derreter gelo e congelar água é uma mudança reversível. Cozinhar um ovo na água quente é reversível ou irreversível?",
    "options": [
      "Irreversível, pois o calor desnaturou as proteínas da clara e da gema de forma permanente",
      "Reversível, basta colocar no congelador que o ovo volta a ser cru",
      "O ovo não muda nada",
      "O ovo vira pintinho no mesmo segundo"
    ],
    "correctIndex": 0,
    "explanation": "A desnaturação e coagulação térmica das proteínas do ovo é uma transformação química irreversível!"
  },
  {
    "id": "qui_4_c3_12",
    "subject": "quimica",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Reações e Transformações Químicas",
    "topic": "Lei de Lavoisier: Conservação das Massas",
    "question": "O famoso químico francês Lavoisier formulou qual princípio essencial da ciência em recipientes fechados?",
    "options": [
      "'Na natureza nada se cria, nada se perde, tudo se transforma' (a massa total dos reagentes é igual à massa dos produtos)",
      "'Tudo o que queima vira ouro'",
      "'O calor desaparece no espaço'",
      "'Toda reação perde metade do peso'"
    ],
    "correctIndex": 0,
    "explanation": "A Lei de Conservação da Massa demonstra que a quantidade total de matéria é invariável em sistemas fechados!"
  },
  {
    "id": "qui_4_c3_13",
    "subject": "quimica",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Reações e Transformações Químicas",
    "topic": "Reações Endotérmicas e Exotérmicas",
    "question": "Uma reação que LIBERA calor para o ambiente (como a fogueira queimando) chama-se:",
    "options": [
      "Reação Exotérmica",
      "Reação Endotérmica",
      "Fusão estática",
      "Sublimação neutra"
    ],
    "correctIndex": 0,
    "explanation": "Reações exotérmicas liberam energia térmica (calor para fora); endotérmicas absorvem calor!"
  },
  {
    "id": "qui_4_c3_14",
    "subject": "quimica",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Reações e Transformações Químicas",
    "topic": "Escurecimento da Maçã Cortada",
    "question": "Por que uma fatia de maçã deixada sobre a mesa fica com uma cor escura amarronzada depois de alguns minutos?",
    "options": [
      "Por oxidação celular das substâncias da maçã em contato com o oxigênio do ar",
      "Porque a maçã congela",
      "Porque o açúcar se transformou em chocolate",
      "Por causa da poeira da mesa"
    ],
    "correctIndex": 0,
    "explanation": "Enzimas polifenoloxidases reagem com o oxigênio atmosférico, oxidando e escurecendo os tecidos vegetais!"
  },
  {
    "id": "qui_4_c3_15",
    "subject": "quimica",
    "year": 4,
    "chapter": 3,
    "chapterTitle": "Reações e Transformações Químicas",
    "topic": "Comprimido Efervescente na Água",
    "question": "Ao jogar uma pastilha efervescente de vitamina C em um copo de água, por que surgem milhares de bolhinhas intensas?",
    "options": [
      "Os ácidos e sais da pastilha reagem quimicamente com a água, liberando borbulhas de gás carbônico",
      "A água começou a ferver a 100°C",
      "O copo está vazando ar pelo fundo",
      "São peixinhos respirando"
    ],
    "correctIndex": 0,
    "explanation": "A dissolução ativa a reação entre ácido cítrico e bicarbonato presente no comprimido!"
  },
  {
    "id": "qui_4_c4_01",
    "subject": "quimica",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Fossilização, Mineralogia e Escala de Mohs",
    "topic": "Processos de Fossilização: Mineralização",
    "question": "O que acontece no processo de 'Permineralização' (mineralização) de um osso de dinossauro enterrado?",
    "options": [
      "Minerais dissolvidos na água subterrânea preenchem os poros microscópicos do osso, transformando-o lentamente em rocha sólida",
      "O osso é comido por bactérias até sumir",
      "O osso vira pó de vidro",
      "O osso derrete em fogo"
    ],
    "correctIndex": 0,
    "explanation": "A sílica e o carbonato de cálcio substituem a matéria orgânica original preservando a anatomia!"
  },
  {
    "id": "qui_4_c4_02",
    "subject": "quimica",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Fossilização, Mineralogia e Escala de Mohs",
    "topic": "Moldagem e Contramoldagem",
    "question": "Quando uma concha é coberta de sedimentos e se dissolve deixando apenas sua 'impressão em relevo' na rocha, temos um fóssil de:",
    "options": [
      "Molde (ou Moldagem)",
      "Mumificação",
      "Inclusão em âmbar",
      "Permineralização atômica"
    ],
    "correctIndex": 0,
    "explanation": "Fósseis de moldagem preservam a réplica geométrica externa ou interna sem a matéria original!"
  },
  {
    "id": "qui_4_c4_03",
    "subject": "quimica",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Fossilização, Mineralogia e Escala de Mohs",
    "topic": "Preservação em Permafrost: Mamutes",
    "question": "Mamutes lanosos inteiros, com pele, carne e pelos intactos, foram resgatados na Sibéria preservados em qual meio gélido?",
    "options": [
      "No solo permanentemente congelado (Permafrost)",
      "Em vulcões ativos de magma",
      "No deserto sob a areia quente",
      "No fundo de tanques de óleo"
    ],
    "correctIndex": 0,
    "explanation": "O congelamento profundo no permafrost siberiano suspendeu a decomposição por dezenas de milhares de anos!"
  },
  {
    "id": "qui_4_c4_04",
    "subject": "quimica",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Fossilização, Mineralogia e Escala de Mohs",
    "topic": "Princípio da Superposição das Camadas",
    "question": "Em uma sequência de rochas sedimentares não perturbadas, onde estão localizados os fósseis mais antigos?",
    "options": [
      "Nas camadas mais profundas (inferiores) da rocha",
      "Nas camadas da superfície (superiores)",
      "Apenas na beira da água",
      "A idade é sempre idêntica em todas as camadas"
    ],
    "correctIndex": 0,
    "explanation": "Pelo Princípio da Superposição Estratigráfica de Steno, as camadas inferiores se depositaram primeiro!"
  },
  {
    "id": "qui_4_c4_05",
    "subject": "quimica",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Fossilização, Mineralogia e Escala de Mohs",
    "topic": "Eras Geológicas: A Era Mesozoica",
    "question": "Em qual Era Geológica viveram os grandes dinossauros que dominaram a Terra por mais de 160 milhões de anos?",
    "options": [
      "Era Mesozoica",
      "Era Cenozoica",
      "Era Paleozoica",
      "Era Pré-Cambriana"
    ],
    "correctIndex": 0,
    "explanation": "A Era Mesozoica (dividida em Triássico, Jurássico e Cretáceo) é conhecida como a Era dos Dinossauros!"
  },
  {
    "id": "qui_4_c4_06",
    "subject": "quimica",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Fossilização, Mineralogia e Escala de Mohs",
    "topic": "Extinção no Fim do Cretáceo",
    "question": "Qual evento catastrófico ocorrido há cerca de 66 milhões de anos causou a grande extinção dos dinossauros não-avianos?",
    "options": [
      "O impacto de um asteroide gigante na península de Yucatán (cratera de Chicxulub) e alterações climáticas globais",
      "Um inverno que durou apenas um dia",
      "O oceano secou completamente",
      "Eles pegaram um foguete para a lua"
    ],
    "correctIndex": 0,
    "explanation": "O impacto em Chicxulub gerou tsunamis, incêndios massivos e bloqueio prolongado da luz solar por poeira!"
  },
  {
    "id": "qui_4_c4_07",
    "subject": "quimica",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Fossilização, Mineralogia e Escala de Mohs",
    "topic": "Tipos de Rochas: Magmáticas, Sedimentares e Metamórficas",
    "question": "Quais são os três grandes grupos de rochas que compõem a litosfera terrestre?",
    "options": [
      "Magmáticas (ou Ígneas), Sedimentares e Metamórficas",
      "Doces, Salgadas e Azedas",
      "Leves, Médias e Pesadas",
      "Verdes, Amarelas e Azuis"
    ],
    "correctIndex": 0,
    "explanation": "O ciclo das rochas classifica-as em magmáticas (magma), sedimentares (sedimentos) e metamórficas (pressão/calor)!"
  },
  {
    "id": "qui_4_c4_08",
    "subject": "quimica",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Fossilização, Mineralogia e Escala de Mohs",
    "topic": "Rochas Sedimentares: O Lar dos Fósseis",
    "question": "Em qual dos três grupos de rochas os fósseis são quase que exclusivamente encontrados preservados?",
    "options": [
      "Rochas Sedimentares (como arenito e calcário)",
      "Rochas Magmáticas vulcânicas em brasa",
      "Lava líquida fervente",
      "Diamantes lapidados"
    ],
    "correctIndex": 0,
    "explanation": "Fósseis se preservam pela deposição suave de sedimentos; o calor magmático destruiria qualquer vestígio biológico!"
  },
  {
    "id": "qui_4_c4_09",
    "subject": "quimica",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Fossilização, Mineralogia e Escala de Mohs",
    "topic": "Mineral vs Rocha",
    "question": "Qual é a diferença entre um 'Mineral' e uma 'Rocha'?",
    "options": [
      "O mineral é uma substância natural sólida homogênea e cristalina; a rocha é um agregado natural formado por vários minerais",
      "O mineral é líquido e a rocha é gasosa",
      "Não há diferença entre eles",
      "Rochas são feitas apenas por humanos"
    ],
    "correctIndex": 0,
    "explanation": "Exemplo: O granito é uma rocha formada pela união dos minerais quartzo, feldspato e mica!"
  },
  {
    "id": "qui_4_c4_10",
    "subject": "quimica",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Fossilização, Mineralogia e Escala de Mohs",
    "topic": "A Escala de Mohs de Dureza",
    "question": "O que a Escala de Mohs (criada pelo mineralogista Friedrich Mohs) mede nos minerais?",
    "options": [
      "A resistência de um mineral ao ser riscado por outro mineral",
      "O peso do mineral na balança",
      "A cor do brilho no escuro",
      "A idade do mineral em anos"
    ],
    "correctIndex": 0,
    "explanation": "A dureza na Escala de Mohs (de 1 a 10) mede a capacidade de uma superfície mineral resistir ao risco mecânico!"
  },
  {
    "id": "qui_4_c4_11",
    "subject": "quimica",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Fossilização, Mineralogia e Escala de Mohs",
    "topic": "O Mineral mais Macio: Talco (Dureza 1)",
    "question": "Na Escala de Mohs, qual é o mineral de referência mais macio (grau 1), que pode ser riscado facilmente até com a unha?",
    "options": [
      "Talco",
      "Quartzo",
      "Topázio",
      "Diamante"
    ],
    "correctIndex": 0,
    "explanation": "O talco é o mineral padrão de dureza 1 na Escala de Mohs, sendo o mais macio conhecido!"
  },
  {
    "id": "qui_4_c4_12",
    "subject": "quimica",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Fossilização, Mineralogia e Escala de Mohs",
    "topic": "O Mineral mais Duro: Diamante (Dureza 10)",
    "question": "Qual é a substância natural mais dura do planeta Terra, ocupando o topo absoluto (grau 10) da Escala de Mohs?",
    "options": [
      "Diamante",
      "Ouro",
      "Ferro",
      "Quartzo"
    ],
    "correctIndex": 0,
    "explanation": "O diamante (carbono puro sob altíssima pressão) possui dureza 10 e só pode ser riscado por outro diamante!"
  },
  {
    "id": "qui_4_c4_13",
    "subject": "quimica",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Fossilização, Mineralogia e Escala de Mohs",
    "topic": "O Quartzo na Escala de Mohs",
    "question": "O quartzo (muito comum em areias e cristais) tem dureza 7 na escala de Mohs. Ele consegue riscar o vidro comum (dureza ~5,5)?",
    "options": [
      "Sim, porque minerais de maior dureza conseguem riscar os de menor dureza",
      "Não, o vidro quebra o quartzo",
      "Nenhum mineral risca vidro",
      "Apenas a água risca vidro"
    ],
    "correctIndex": 0,
    "explanation": "Como 7 > 5,5, o quartzo risca facilmente o vidro e a lâmina de aço comum!"
  },
  {
    "id": "qui_4_c4_14",
    "subject": "quimica",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Fossilização, Mineralogia e Escala de Mohs",
    "topic": "Fóssil Vivo: Celacanto",
    "question": "O Celacanto é um peixe de nadadeiras lobadas que se acreditava extinto há 66 milhões de anos até ser encontrado vivo nas profundezas do oceano. Ele é chamado de:",
    "options": [
      "Fóssil Vivo",
      "Réptil alienígena",
      "Dinossauro cibernético",
      "Monstro inventado"
    ],
    "correctIndex": 0,
    "explanation": "Espécies que mantêm morfologia arcaica quase idêntica a fósseis ancestrais são chamadas de 'fósseis vivos'!"
  },
  {
    "id": "qui_4_c4_15",
    "subject": "quimica",
    "year": 4,
    "chapter": 4,
    "chapterTitle": "Fossilização, Mineralogia e Escala de Mohs",
    "topic": "A Arqueopteryx: Elo de Ligação",
    "question": "O fóssil da Archaeopteryx é um dos mais fascinantes da paleontologia porque possui dentes e cauda de réptil, mas asas com penas de ave. Ele comprova que:",
    "options": [
      "As aves modernas evoluíram a partir de um grupo de dinossauros terópodes carnívoros",
      "Os dinossauros eram robôs mecânicos",
      "As aves vieram de plantas marinhas",
      "Os répteis não existiram"
    ],
    "correctIndex": 0,
    "explanation": "Archaeopteryx é um fóssil de transição extraordinário que evidencia a descendência direta das aves a partir dos dinossauros!"
  }
];

// ========================================================
// INTELLIGENT ANTI-REPETITION ENGINE
// ========================================================

/**
 * Filter questions for a specific subject, school year, and optional chapter
 */
export function getSubjectQuestions(
  subject: AcademicSubject,
  year: StudentYear,
  chapter?: number
): AcademicQuestion[] {
  return ACADEMIC_QUESTIONS_BANK.filter(
    (q) => q.subject === subject && q.year === year && (chapter === undefined || q.chapter === chapter)
  );
}

/**
 * Get only uncompleted questions for a given player profile
 */
export function getAvailableQuestions(
  subject: AcademicSubject,
  year: StudentYear,
  answeredQuestionIds: string[] = [],
  chapter?: number
): AcademicQuestion[] {
  const answeredSet = new Set(answeredQuestionIds);
  const subjectPool = getSubjectQuestions(subject, year, chapter);
  return subjectPool.filter((q) => !answeredSet.has(q.id));
}

/**
 * Draw a random question guaranteed without repetition.
 * If all questions of this subject/year/chapter have been answered,
 * the pool recycles seamlessly to maintain continuous game progression!
 */
export function getRandomAcademicQuestion(
  subject: AcademicSubject,
  year: StudentYear,
  answeredQuestionIds: string[] = [],
  chapter?: number
): {
  question: AcademicQuestion;
  wasPoolReset: boolean;
  remainingInPool: number;
  totalInSubject: number;
} {
  const totalPool = getSubjectQuestions(subject, year, chapter);
  if (totalPool.length === 0) {
    // Fallback to any question of this subject/year or subject
    const fallback =
      ACADEMIC_QUESTIONS_BANK.find((q) => q.subject === subject && q.year === year) ||
      ACADEMIC_QUESTIONS_BANK.find((q) => q.subject === subject) ||
      ACADEMIC_QUESTIONS_BANK[0];
    return {
      question: fallback,
      wasPoolReset: false,
      remainingInPool: 1,
      totalInSubject: 1,
    };
  }

  let available = getAvailableQuestions(subject, year, answeredQuestionIds, chapter);
  let wasPoolReset = false;

  // Anti-repetition cycle exhausted -> recycle pool
  if (available.length === 0) {
    available = [...totalPool];
    wasPoolReset = true;
  }

  const randomIndex = Math.floor(Math.random() * available.length);
  const chosen = available[randomIndex];

  return {
    question: chosen,
    wasPoolReset,
    remainingInPool: available.length - 1,
    totalInSubject: totalPool.length,
  };
}

/**
 * Calculate player's subject mastery progress
 */
export function getSubjectMasteryStats(
  subject: AcademicSubject,
  year: StudentYear,
  answeredQuestionIds: string[] = [],
  chapter?: number
): {
  answeredCount: number;
  totalQuestions: number;
  percentage: number;
  isSubjectMastered: boolean;
} {
  const total = getSubjectQuestions(subject, year, chapter);
  const answeredSet = new Set(answeredQuestionIds);
  const answeredCount = total.filter((q) => answeredSet.has(q.id)).length;
  const percentage = total.length > 0 ? Math.round((answeredCount / total.length) * 100) : 0;

  return {
    answeredCount,
    totalQuestions: total.length,
    percentage,
    isSubjectMastered: total.length > 0 && answeredCount >= total.length,
  };
}
