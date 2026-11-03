import { StudentYear } from "./types";

export interface QuizQuestion {
  id: string;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  emoji?: string;
}

export type QuizBank = Record<string, Record<StudentYear, Record<number, QuizQuestion[]>>>;

export const CHAPTER_QUIZ_BANK: QuizBank = {
  // ==========================================
  // CIÊNCIAS
  // ==========================================
  ciencias: {
    4: {
      1: [
        {
          id: "cie4-c1-1",
          category: "Microrganismos",
          emoji: "🔬",
          question: "Qual é a principal diferença entre bactérias e vírus?",
          options: [
            "Bactérias são células vivas autônomas; vírus precisam de uma célula hospedeira para se multiplicar.",
            "Vírus têm patas para andar e bactérias têm asas para voar.",
            "Bactérias só vivem no congelador e vírus no fogo.",
            "Não há diferença, são exatamente o mesmo organismo.",
          ],
          correctIndex: 0,
          explanation: "Bactérias são seres vivos celulares (muitas são boas, como as do iogurte), enquanto vírus dependem de células para se replicar.",
        },
        {
          id: "cie4-c1-2",
          category: "Microrganismos Úteis",
          emoji: "🍞",
          question: "Qual microrganismo (fungo unicelular) é usado na padaria para fazer a massa do pão crescer fofinha?",
          options: [
            "Lactobacilos do queijo",
            "Levedura (fermento biológico)",
            "Algas marinhas verdes",
            "Vírus da gripe",
          ],
          correctIndex: 1,
          explanation: "As leveduras realizam fermentação, liberando gás carbônico que cria as bolhinhas de ar na massa do pão!",
        },
        {
          id: "cie4-c1-3",
          category: "Saúde & Prevenção",
          emoji: "🧼",
          question: "Por que lavar as mãos com água e sabão por 20 segundos é tão eficiente contra vírus e bactérias?",
          options: [
            "Porque o sabão dissolve a cápsula protetora de gordura dos microrganismos, destruindo-os.",
            "Porque o sabão congela os microrganismos instantaneamente.",
            "Porque o cheiro do sabão faz os microrganismos fugirem correndo.",
            "Porque a água pura já destrói todos os micróbios sem precisar de sabão.",
          ],
          correctIndex: 0,
          explanation: "As moléculas de sabão quebram a membrana de lipídios (gordura) que envolve os vírus e bactérias!",
        },
        {
          id: "cie4-c1-4",
          category: "Vacinas & Imunidade",
          emoji: "💉",
          question: "Como as vacinas protegem nosso organismo antes de ficarmos doentes?",
          options: [
            "Matam bactérias como um remédio antibiótico imediato.",
            "Apresentam fragmentos inofensivos do vírus para nosso corpo produzir anticorpos de memória.",
            "Servem apenas como vitaminas para o crescimento dos ossos.",
            "Criam uma camada de plástico invisível sobre a pele.",
          ],
          correctIndex: 1,
          explanation: "A vacina ensina o sistema imunológico a reconhecer o invasor, criando células de memória e anticorpos protetores!",
        },
      ],
      2: [
        {
          id: "cie4-c2-1",
          category: "Cadeia Alimentar",
          emoji: "🌿",
          question: "Em uma cadeia alimentar, por que as plantas são classificadas como 'Produtores'?",
          options: [
            "Porque produzem seu próprio alimento através da fotossíntese com luz solar.",
            "Porque compram nutrientes na mercearia da floresta.",
            "Porque caçam pequenos insetos à noite para comer.",
            "Porque se alimentam de animais decompositores.",
          ],
          correctIndex: 0,
          explanation: "As plantas utilizam luz solar, água e gás carbônico para produzir glicose e oxigênio na fotossíntese!",
        },
        {
          id: "cie4-c2-2",
          category: "Níveis Tróficos",
          emoji: "🐇",
          question: "Um coelhinho que se alimenta exclusivamente de cenouras e capim é um consumidor:",
          options: [
            "Primário (Herbívoro)",
            "Secundário (Carnívoro)",
            "Terciário (Predador de topo)",
            "Decompositor",
          ],
          correctIndex: 0,
          explanation: "Animais que comem produtores (plantas) são chamados de consumidores primários ou herbívoros.",
        },
        {
          id: "cie4-c2-3",
          category: "Decompositores",
          emoji: "🍄",
          question: "Qual é o papel fundamental dos fungos e bactérias decompositoras no ecossistema?",
          options: [
            "Polinizar as flores na primavera.",
            "Reciclar a matéria orgânica morta, devolvendo nutrientes vitais ao solo.",
            "Impedir que as árvores cresçam muito altas.",
            "Comer os predadores da floresta.",
          ],
          correctIndex: 1,
          explanation: "Sem os decompositores, a matéria orgânica não se reciclaria e o solo perderia os nutrientes para novas plantas!",
        },
        {
          id: "cie4-c2-4",
          category: "Equilíbrio Ecológico",
          emoji: "🦉",
          question: "O que acontece na floresta se todos os predadores (como gaviões e cobras) desaparecerem de repente?",
          options: [
            "A população de roedores herbívoros cresce sem controle, esgotando a vegetação.",
            "As plantas passam a crescer o dobro da velocidade sem parar.",
            "Todos os outros animais se tornam carnívoros.",
            "Nada muda, tudo permanece exatamente idêntico.",
          ],
          correctIndex: 0,
          explanation: "Os predadores regulam a quantidade de herbívoros, mantendo o equilíbrio ecológico de todo o bioma.",
        },
      ],
      3: [
        {
          id: "cie4-c3-1",
          category: "Estados Físicos da Água",
          emoji: "🧊",
          question: "Quando tiramos uma forminha de gelo do congelador e ela vira água líquida, que mudança de estado ocorreu?",
          options: ["Fusão", "Vaporização", "Solidificação", "Condensação"],
          correctIndex: 0,
          explanation: "A fusão é a passagem do estado sólido para o líquido com o aumento de temperatura!",
        },
        {
          id: "cie4-c3-2",
          category: "Ciclo da Água",
          emoji: "☁️",
          question: "Como se formam as nuvens no céu durante o ciclo da água?",
          options: [
            "A fumaça das fogueiras se junta no alto das montanhas.",
            "O vapor de água invisível sobe, esfria nas altitudes e se condensa em gotículas minúsculas.",
            "São pedaços de algodão que flutuam na atmosfera.",
            "A água da chuva evapora já em forma de gelo sólido.",
          ],
          correctIndex: 1,
          explanation: "A evaporação dos rios e oceanos sobe e, ao encontrar o ar frio, passa pela condensação formando as nuvens!",
        },
        {
          id: "cie4-c3-3",
          category: "Transformações da Matéria",
          emoji: "🔥",
          question: "Qual das opções abaixo representa uma transformação QUÍMICA (irreversível, com nova substância)?",
          options: [
            "Rasgar uma folha de papel em pedacinhos.",
            "Derreter uma barra de chocolate no micro-ondas.",
            "Queimar uma folha de papel até virar cinzas.",
            "Quebrar um copo de vidro no chão.",
          ],
          correctIndex: 2,
          explanation: "Queimar o papel produz cinzas, fumaça e gases, alterando a composição química da matéria!",
        },
        {
          id: "cie4-c3-4",
          category: "Transpiração",
          emoji: "🌳",
          question: "As florestas como a Amazônia produzem 'rios voadores' de vapor de água através da:",
          options: [
            "Evapotranspiração das árvores e folhas",
            "Solidificação das raízes",
            "Fusão do solo",
            "Combustão natural",
          ],
          correctIndex: 0,
          explanation: "As árvores puxam água do solo e transpiram vapor pelos estômatos das folhas, gerando chuvas para todo o continente!",
        },
      ],
      4: [
        {
          id: "cie4-c4-1",
          category: "Sistema Solar",
          emoji: "🌍",
          question: "Qual movimento a Terra realiza ao girar em torno do seu próprio eixo, dando origem aos DIAS e NOITES?",
          options: ["Rotação (24 horas)", "Translação (365 dias)", "Eclipse Solar", "Órbita Lunar"],
          correctIndex: 0,
          explanation: "A rotação da Terra dura aproximadamente 24 horas, fazendo com que uma face receba a luz do Sol (dia) enquanto a outra fica no escuro (noite).",
        },
        {
          id: "cie4-c4-2",
          category: "Estações do Ano",
          emoji: "🌞",
          question: "O movimento de TRANSLAÇÃO da Terra em torno do Sol (cerca de 365 dias e 6 horas) é responsável por:",
          options: [
            "As fases da Lua a cada semana.",
            "As quatro estações do ano (Primavera, Verão, Outono, Inverno).",
            "As marés subirem e descerem duas vezes ao dia.",
            "O vento soprar para o norte.",
          ],
          correctIndex: 1,
          explanation: "A translação combinada com a inclinação do eixo terrestre distribui o calor solar de forma diferente ao longo do ano!",
        },
        {
          id: "cie4-c4-3",
          category: "Fases da Lua",
          emoji: "🌕",
          question: "Quando vemos a face inteira da Lua completamente iluminada pelo Sol à noite, ela está na fase:",
          options: ["Lua Cheia", "Lua Nova", "Quarto Minguante", "Lua Invisível"],
          correctIndex: 0,
          explanation: "Na Lua Cheia, a Terra está posicionada entre o Sol e a Lua, permitindo ver toda a face iluminada!",
        },
        {
          id: "cie4-c4-4",
          category: "Pontos Cardeais",
          emoji: "🧭",
          question: "Se você estender o braço direito na direção em que o Sol nasce pela manhã (Leste), sua frente estará apontada para o:",
          options: ["Norte", "Sul", "Oeste", "Sudeste"],
          correctIndex: 0,
          explanation: "Braço direito no Leste (nascente), braço esquerdo no Oeste (poente), frente para o Norte e costas para o Sul!",
        },
      ],
      5: [
        {
          id: "cie4-c5-1",
          category: "Misturas",
          emoji: "🧪",
          question: "Água completamente misturada com uma colher pequena de sal forma uma mistura:",
          options: [
            "Homogênea (apresenta uma única fase visual uniforme)",
            "Heterogênea (com várias fases separadas visíveis)",
            "Metálica radioativa",
            "Gaseosa explosiva",
          ],
          correctIndex: 0,
          explanation: "Misturas homogêneas são soluções onde as partículas se dissolvem e não vemos separação a olho nu.",
        },
        {
          id: "cie4-c5-2",
          category: "Separação de Misturas",
          emoji: "☕",
          question: "Qual método usamos na cozinha para separar o pó de café da água quente usando um coador?",
          options: ["Filtração", "Decantação", "Magnetismo", "Destilação"],
          correctIndex: 0,
          explanation: "O filtro de papel ou pano retém as partículas sólidas do pó e deixa o líquido filtrado passar!",
        },
        {
          id: "cie4-c5-3",
          category: "Separação Magnética",
          emoji: "🧲",
          question: "Se alfinetes de ferro caírem acidentalmente dentro de uma tigela de farinha de trigo, qual o jeito mais rápido de separá-los?",
          options: [
            "Usar um ímã forte (separação magnética)",
            "Ferver a farinha com água",
            "Esperar os alfinetes evaporarem",
            "Assar um pão com os alfinetes",
          ],
          correctIndex: 0,
          explanation: "O ferro é um metal ferromagnético atraído instantaneamente pelo ímã, deixando a farinha intacta!",
        },
      ],
      6: [
        {
          id: "cie4-c6-1",
          category: "Saneamento Básico",
          emoji: "🚰",
          question: "Por que o tratamento de água e esgoto é essencial para a saúde pública de uma cidade?",
          options: [
            "Para evitar a contaminação por cólera, verminoses e bactérias transmitidas pela água suja.",
            "Apenas para a água ficar cheirando a perfume.",
            "Para que os peixes possam nadar nas torneiras.",
            "Para esfriar o clima da cidade nos dias de calor.",
          ],
          correctIndex: 0,
          explanation: "O saneamento básico é a medida preventiva mais importante para erradicar epidemias e mortalidade infantil!",
        },
        {
          id: "cie4-c6-2",
          category: "Dengue & Arboviroses",
          emoji: "🦟",
          question: "Qual é a principal atitude que todos nós devemos tomar no quintal para combater o mosquito Aedes aegypti?",
          options: [
            "Não deixar água limpa parada em pneus, vasos de plantas e garrafas.",
            "Pintar o muro de verde.",
            "Plantar apenas grama sintética.",
            "Cobrir os vasos com açúcar.",
          ],
          correctIndex: 0,
          explanation: "A fêmea do mosquito deposita ovos em água limpa e parada. Eliminar esses focos impede a proliferação!",
        },
      ],
    },
    2: {
      1: [
        {
          id: "cie2-c1-1",
          category: "Animais da Vila",
          emoji: "🦉",
          question: "Qual destes animaizinhos tem hábitos NOTURNOS (fica bem acordado e caça de noite)?",
          options: ["🦉 Coruja atenta", "🐓 Galo cantador", "🦋 Borboleta colorida", "🐕 Cachorrinho"],
          correctIndex: 0,
          explanation: "A coruja tem olhos grandes e ouvidos afiados especiais para enxergar e caçar no escuro!",
        },
        {
          id: "cie2-c1-2",
          category: "Cobertura do Corpo",
          emoji: "🐟",
          question: "Os peixinhos que nadam no riacho da Vila têm o corpinho coberto por:",
          options: ["Escamas brilhantes", "Penas macias", "Pelos quentinhos", "Casca de madeira"],
          correctIndex: 0,
          explanation: "As escamas protegem a pele dos peixes e facilitam o deslize na água!",
        },
      ],
      2: [
        {
          id: "cie2-c2-1",
          category: "Partes da Planta",
          emoji: "🌱",
          question: "Qual parte da plantinha fica embaixo da terra, sugando água e segurando ela firme?",
          options: ["A Raiz", "A Flor", "A Folha", "O Fruto"],
          correctIndex: 0,
          explanation: "A raiz fixa a planta no solo e absorve água e sais minerais da terra!",
        },
        {
          id: "cie2-c2-2",
          category: "As Folhas",
          emoji: "🍃",
          question: "As folhas das plantas são verdes e muito importantes porque ajudam a plantinha a:",
          options: ["Respirar e produzir alimento com a luz do Sol", "Caminhar pelo jardim", "Dormir no inverno", "Fazer barulho"],
          correctIndex: 0,
          explanation: "As folhas contêm clorofila, que captura a luz do Sol para a fotossíntese!",
        },
      ],
      3: [
        {
          id: "cie2-c3-1",
          category: "Cinco Sentidos",
          emoji: "👂",
          question: "Para escutar a cantiga dos passarinhos e a voz dos nossos amigos, nós usamos a:",
          options: ["Audição (Ouvidos)", "Visão (Olhos)", "Gustação (Língua)", "Olfato (Nariz)"],
          correctIndex: 0,
          explanation: "Nossos ouvidos captam as ondas sonoras e o cérebro transforma em música e palavras!",
        },
      ],
      4: [
        {
          id: "cie2-c4-1",
          category: "Materiais",
          emoji: "🪟",
          question: "Por que as janelas das casas são feitas de VIDRO transparente?",
          options: [
            "Porque o vidro deixa a luz do Sol entrar na casa e nos permite olhar lá fora.",
            "Porque o vidro é feito de algodão macio.",
            "Porque o vidro é o único material que não quebra nunca.",
            "Porque o vidro flutua no ar.",
          ],
          correctIndex: 0,
          explanation: "O vidro é transparente, permitindo que a luz natural ilumine o quarto!",
        },
      ],
    },
  },

  // ==========================================
  // PORTUGUÊS
  // ==========================================
  portugues: {
    4: {
      1: [
        {
          id: "por4-c1-1",
          category: "Substantivos Próprios e Comuns",
          emoji: "✍️",
          question: "Na frase: 'A menina Cecília adotou um gatinho na Vila.', quais são os substantivos PRÓPRIOS?",
          options: ["Cecília e Vila", "menina e gatinho", "adotou e na", "A e um"],
          correctIndex: 0,
          explanation: "Substantivos próprios nomeiam seres ou lugares específicos e são sempre escritos com letra maiúscula!",
        },
        {
          id: "por4-c1-2",
          category: "Substantivos Coletivos",
          emoji: "🐺",
          question: "Qual é o substantivo coletivo correto para um grupo de muitos lobos reunidos?",
          options: ["Alcateia", "Enxame", "Cardume", "Constelação"],
          correctIndex: 0,
          explanation: "Alcateia de lobos, enxame de abelhas, cardume de peixes e constelação de estrelas!",
        },
        {
          id: "por4-c1-3",
          category: "Plural dos Substantivos",
          emoji: "📚",
          question: "Qual é a forma correta no plural das palavras 'coração', 'pastel' e 'alemão'?",
          options: [
            "Corações, pastéis e alemães",
            "Coraçãos, pastels e alemãos",
            "Corações, pasteis e alemãos",
            "Coraçõis, pastelis e alemanzes",
          ],
          correctIndex: 0,
          explanation: "Coração -> corações (com -ões), pastel -> pastéis (com acento agudo) e alemão -> alemães!",
        },
      ],
      2: [
        {
          id: "por4-c2-1",
          category: "Adjetivos & Concordância",
          emoji: "🌟",
          question: "Na frase: 'As flores do jardim estavam perfumadas e coloridas.', as palavras destacadas são:",
          options: [
            "Adjetivos que caracterizam o substantivo 'flores'",
            "Verbos de ação no pretérito",
            "Pronomes possessivos de família",
            "Substantivos próprios",
          ],
          correctIndex: 0,
          explanation: "Perfumadas e coloridas são adjetivos que concordam em gênero (feminino) e número (plural) com 'flores'.",
        },
        {
          id: "por4-c2-2",
          category: "Sinônimos e Antônimos",
          emoji: "📖",
          question: "Assinale a opção que contém, respectivamente, um SINÔNIMO de 'alegre' e um ANTÔNIMO de 'corajoso':",
          options: [
            "Contente / Covarde",
            "Triste / Valente",
            "Bravo / Rápido",
            "Calmo / Forte",
          ],
          correctIndex: 0,
          explanation: "Sinônimo tem significado semelhante (alegre = contente); antônimo tem sentido oposto (corajoso <-> covarde)!",
        },
      ],
      3: [
        {
          id: "por4-c3-1",
          category: "Tempos Verbais",
          emoji: "⏳",
          question: "Em qual das frases o verbo está conjugado no tempo FUTURO do presente?",
          options: [
            "Amanhã nós estudaremos para o grande teste na biblioteca.",
            "Ontem nós estudamos bastante com nossos livros.",
            "Agora nós estudamos com muita alegria.",
            "Nós tínhamos estudado antes do almoço.",
          ],
          correctIndex: 0,
          explanation: "'Estudaremos' indica uma ação que ainda vai acontecer com certeza no futuro!",
        },
        {
          id: "por4-c3-2",
          category: "Pronomes Pessoais",
          emoji: "👥",
          question: "Para evitar a repetição na frase: 'Carlos e Pedro foram à feira. Carlos e Pedro compraram maçãs.', qual pronome substitui os nomes?",
          options: ["Eles", "Nós", "Vós", "Ela"],
          correctIndex: 0,
          explanation: "O pronome pessoal 'Eles' (3ª pessoa do plural) substitui adequadamente 'Carlos e Pedro'!",
        },
      ],
      4: [
        {
          id: "por4-c4-1",
          category: "Pontuação Expressiva",
          emoji: "🗣️",
          question: "Em um diálogo numa história em quadrinhos ou conto, qual sinal de pontuação inicia a fala direta de um personagem?",
          options: ["O Travessão (—)", "O Ponto e Vírgula (;)", "O Ponto de Interrogação (?)", "Os Parênteses ()"],
          correctIndex: 0,
          explanation: "O travessão indica a fala direta do personagem ou a mudança de interlocutor no diálogo!",
        },
        {
          id: "por4-c4-2",
          category: "Uso da Vírgula",
          emoji: "📝",
          question: "Em qual das frases a vírgula está separando corretamente um VOCATIVO (chamamento)?",
          options: [
            "Bianca, venha tomar o café da tarde que a mamãe preparou!",
            "Bianca venha, tomar o café da tarde que a mamãe preparou!",
            "Bianca venha tomar, o café da tarde!",
            "Bianca venha tomar o café, da tarde!",
          ],
          correctIndex: 0,
          explanation: "O vocativo é o termo usado para chamar ou interpelar alguém, e deve ser sempre isolado por vírgula!",
        },
      ],
      5: [
        {
          id: "por4-c5-1",
          category: "Gêneros Textuais: Fábulas",
          emoji: "🦊",
          question: "Qual é a principal característica que define uma FÁBULA tradicional?",
          options: [
            "Animais que agem e falam como humanos, trazendo no final um ensinamento ou 'moral da história'.",
            "Uma lista de ingredientes de culinária com modo de preparo.",
            "Um mapa geográfico com escalas e coordenadas.",
            "Uma notícia jornalística sobre futebol.",
          ],
          correctIndex: 0,
          explanation: "Fábulas (como as de Esopo e La Fontaine) personificam animais para transmitir reflexões éticas e morais!",
        },
      ],
      6: [
        {
          id: "por4-c6-1",
          category: "Ortografia: Mal ou Mau",
          emoji: "🐺",
          question: "Complete corretamente as lacunas: 'O lobo ___ agiu ___ com os carneirinhos.'",
          options: [
            "mau / mal (opostos de bom e bem)",
            "mal / mau",
            "mau / mau",
            "mal / mal",
          ],
          correctIndex: 0,
          explanation: "Dica de ouro: 'Mau' é o oposto de 'bom' (lobo mau = lobo bom); 'mal' é o oposto de 'bem' (agiu mal = agiu bem)!",
        },
        {
          id: "por4-c6-2",
          category: "Ortografia: Por que / Porque",
          emoji: "❓",
          question: "Em uma pergunta direta como: '___ você não foi à padaria hoje?', usamos:",
          options: [
            "Por que (separado e sem acento)",
            "Porque (junto de resposta)",
            "Por quê (no final de frase)",
            "Porquê (substantivo com artigo)",
          ],
          correctIndex: 0,
          explanation: "'Por que' separado usa-se no início e meio de frases interrogativas!",
        },
      ],
    },
    2: {
      1: [
        {
          id: "por2-c1-1",
          category: "Vogais e Consoantes",
          emoji: "🔤",
          question: "Quais são as cinco VOGAIS que formam os sons de todas as palavras da nossa língua?",
          options: ["A, E, I, O, U", "B, C, D, F, G", "P, M, T, S, R", "L, N, V, Z, X"],
          correctIndex: 0,
          explanation: "As cinco vogais dão voz a todas as sílabas da nossa linda língua portuguesa!",
        },
      ],
      2: [
        {
          id: "por2-c2-1",
          category: "Separação de Sílabas",
          emoji: "👏",
          question: "Batendo palminhas para contar os pedacinhos, quantas sílabas tem a palavra BO-NE-CA?",
          options: ["3 sílabas", "2 sílabas", "4 sílabas", "1 sílaba"],
          correctIndex: 0,
          explanation: "Bo (1) - ne (2) - ca (3): são 3 sílabas!",
        },
      ],
      3: [
        {
          id: "por2-c3-1",
          category: "Rimas",
          emoji: "🎵",
          question: "Qual destas palavras rima perfeitamente com 'CORAÇÃO'?",
          options: ["Balão", "Janela", "Sapato", "Menina"],
          correctIndex: 0,
          explanation: "Coração e Balão terminam com o mesmo som: -ÃO!",
        },
      ],
      4: [
        {
          id: "por2-c4-1",
          category: "Cantigas & Parlendas",
          emoji: "🐸",
          question: "Na cantiga popular: 'O sapo não lava o pé, não lava porque não quer...', onde mora o sapinho?",
          options: ["Na lagoa", "No castelo", "No telhado", "No fogão"],
          correctIndex: 0,
          explanation: "'Ele mora lá na lagoa, não lava o pé porque não quer!'",
        },
      ],
    },
  },

  // ==========================================
  // HISTÓRIA & GEOGRAFIA
  // ==========================================
  historia_geografia: {
    4: {
      1: [
        {
          id: "hg4-c1-1",
          category: "Formação das Cidades",
          emoji: "🏛️",
          question: "Por que as primeiras cidades e povoados da história foram construídos perto de grandes rios?",
          options: [
            "Porque os rios forneciam água para beber, irrigar plantações e serviam como via de transporte em canoas.",
            "Porque as pessoas antigas queriam apenas pescar tubarões.",
            "Porque era proibido construir casas na terra firme.",
            "Porque os rios impediam qualquer contato com outros povos.",
          ],
          correctIndex: 0,
          explanation: "A água doce é fonte de vida para a agricultura, hidratação e locomoção de mercadorias!",
        },
        {
          id: "hg4-c1-2",
          category: "As Feiras Medievais",
          emoji: "⛺",
          question: "O que originou muitas cidades importantes durante a Idade Média?",
          options: [
            "As feiras de comércio de produtos e artesanato que aconteciam no cruzamento de rotas de viajantes.",
            "Nuvens mágicas que caíam no chão.",
            "Cemitérios de dinossauros.",
            "Navios que naufragavam nas florestas.",
          ],
          correctIndex: 0,
          explanation: "Os mercadores montavam acampamentos temporários que viravam burgos e vilas permanentes!",
        },
      ],
      2: [
        {
          id: "hg4-c2-1",
          category: "Povos Indígenas",
          emoji: "🏹",
          question: "Quando os navegadores portugueses chegaram ao Brasil em 1500, o território já era habitado por:",
          options: [
            "Milhões de indígenas pertencentes a centenas de etnias e línguas diferentes.",
            "Ninguém, as terras eram totalmente desertas.",
            "Apenas piratas franceses e ingleses.",
            "Poucos romanos antigos.",
          ],
          correctIndex: 0,
          explanation: "Havia uma riquíssima diversidade cultural de povos como Tupis, Guaranis, Yanomamis e muitos outros!",
        },
        {
          id: "hg4-c2-2",
          category: "Comunidades Quilombolas",
          emoji: "✊",
          question: "O que eram os 'Quilombos' fundados durante o período da escravidão no Brasil?",
          options: [
            "Comunidades livres de resistência formadas por negros escravizados que fugiam do cativeiro.",
            "Lojas de sapatos da corte imperial.",
            "Escolas náuticas da marinha portuguesa.",
            "Fábricas de tecidos inglesas.",
          ],
          correctIndex: 0,
          explanation: "Quilombos, como o Quilombo dos Palmares, eram símbolos históricos de coragem, liberdade e solidariedade!",
        },
      ],
      3: [
        {
          id: "hg4-c3-1",
          category: "Paisagens Naturais e Antrópicas",
          emoji: "🏞️",
          question: "Qual é a diferença entre uma paisagem NATURAL e uma paisagem ANTRÓPICA (cultural)?",
          options: [
            "A natural não sofreu modificação do ser humano; a antrópica foi modificada com construções, pontes e estradas.",
            "A natural é pintada com tinta azul; a antrópica é cinza.",
            "A natural só existe de noite; a antrópica só de dia.",
            "Não há nenhuma diferença.",
          ],
          correctIndex: 0,
          explanation: "Paisagens antrópicas resultam do trabalho e transformação humana sobre a natureza.",
        },
      ],
      4: [
        {
          id: "hg4-c4-1",
          category: "Campo e Cidade",
          emoji: "🚜",
          question: "Como o campo (zona rural) e a cidade (zona urbana) dependem um do outro diariamente?",
          options: [
            "O campo produz os alimentos (grãos, leite, frutas) e a cidade fornece serviços, hospitais e produtos industrializados.",
            "O campo não precisa de nada da cidade e a cidade não consome nada do campo.",
            "A cidade planta arroz nas calçadas e o campo fabrica automóveis.",
            "Eles são rivais e não trocam produtos.",
          ],
          correctIndex: 0,
          explanation: "Existe uma interdependência socioeconômica vital entre o campo e a cidade!",
        },
      ],
      5: [
        {
          id: "hg4-c5-1",
          category: "Meios de Transporte",
          emoji: "🚂",
          question: "Qual meio de transporte revolucionou o escoamento do café brasileiro no século XIX?",
          options: ["As ferrovias (trens a vapor)", "Os jatos supersônicos", "Os navios espaciais", "Os helicópteros"],
          correctIndex: 0,
          explanation: "As ferrovias ligaram as fazendas do interior de São Paulo e Minas Gerais até o Porto de Santos!",
        },
      ],
      6: [
        {
          id: "hg4-c6-1",
          category: "Patrimônio Cultural",
          emoji: "🎭",
          question: "Qual das opções abaixo é um exemplo de PATRIMÔNIO CULTURAL IMATERIAL do povo brasileiro?",
          options: [
            "O Frevo e o Samba de Roda (músicas, danças e tradições)",
            "O Cristo Redentor no Rio de Janeiro",
            "O Museu do Ipiranga",
            "As pontes metálicas de ferro",
          ],
          correctIndex: 0,
          explanation: "Patrimônio imaterial abrange saberes, festas, danças e celebrações transmitidas entre gerações!",
        },
      ],
    },
    2: {
      1: [
        {
          id: "hg2-c1-1",
          category: "Minha Família",
          emoji: "👨‍👩‍👧",
          question: "As histórias da nossa família e as fotos antigas nos ajudam a entender:",
          options: [
            "Como nossos avós e pais viviam e a nossa própria história",
            "O preço do combustível no futuro",
            "A previsão do tempo para daqui a cem anos",
            "A velocidade dos foguetes espaciais",
          ],
          correctIndex: 0,
          explanation: "A memória familiar é nossa primeira conexão com a história viva!",
        },
      ],
      2: [
        {
          id: "hg2-c2-1",
          category: "Espaços da Escola",
          emoji: "🏫",
          question: "Na escola, qual é o espaço destinado ao silêncio, pesquisa e leitura de livros mágicos?",
          options: ["A Biblioteca", "A Quadra de Futebol", "O Refeitório", "O Estacionamento"],
          correctIndex: 0,
          explanation: "Na biblioteca encontramos sossego e aventuras nas páginas dos livros!",
        },
      ],
    },
  },

  // ==========================================
  // TECNOLOGIA & ROBÓTICA (Ano 4)
  // ==========================================
  te: {
    4: {
      1: [
        {
          id: "te4-c1-1",
          category: "Pensamento Computacional",
          emoji: "🤖",
          question: "O que é um ALGORITMO na programação de robôs e computadores?",
          options: [
            "Uma sequência passo a passo de instruções claras e lógicas para resolver um problema.",
            "Um vírus perigoso que come cabos de computador.",
            "O nome da tela de vidro do celular.",
            "Um botão de ligar e desligar a tomada.",
          ],
          correctIndex: 0,
          explanation: "Uma receita de bolo ou um passo a passo para escovar os dentes também são algoritmos da vida real!",
        },
        {
          id: "te4-c1-2",
          category: "Depuração de Código",
          emoji: "🐛",
          question: "Quando um programa de computador tem uma falha ou erro, dizemos que encontramos um:",
          options: ["Bug (ou erro de código)", "Robô invisível", "Pedaço de pilha", "Fio solto"],
          correctIndex: 0,
          explanation: "'Bug' significa inseto em inglês — o termo ficou famoso quando uma mariposa causou uma pane num computador antigo em 1947!",
        },
      ],
      2: [
        {
          id: "te4-c2-1",
          category: "Sensores em Robôs",
          emoji: "📡",
          question: "Para um aspirador de pó robô não bater com força na parede da sala, ele usa um sensor de:",
          options: ["Proximidade ou ultrassônico", "Sabor doce", "Peso pesado", "Cheiro de flores"],
          correctIndex: 0,
          explanation: "Sensores ultrassônicos ou infravermelhos medem a distância até os obstáculos, evitando colisões!",
        },
      ],
      3: [
        {
          id: "te4-c3-1",
          category: "Segurança Digital",
          emoji: "🔒",
          question: "Qual destas senhas é a mais SEGURA para proteger seus dados na internet?",
          options: [
            "Estrela#Vila2026! (mistura letras maiúsculas, minúsculas, números e símbolos)",
            "123456",
            "meunome",
            "data de nascimento",
          ],
          correctIndex: 0,
          explanation: "Senhas longas com símbolos especiais impedem que programas maliciosos adivinhem sua conta!",
        },
      ],
    },
    2: {},
  },

  // ==========================================
  // ARTES (Ano 2)
  // ==========================================
  artes: {
    2: {
      1: [
        {
          id: "art2-c1-1",
          category: "Cores Primárias",
          emoji: "🎨",
          question: "Quais são as três CORES PRIMÁRIAS puras que dão origem a todas as outras cores?",
          options: [
            "Azul, Amarelo e Vermelho",
            "Verde, Roxo e Laranja",
            "Preto, Branco e Cinza",
            "Rosa, Dourado e Marrom",
          ],
          correctIndex: 0,
          explanation: "Misturando azul com amarelo temos verde; misturando vermelho com amarelo temos laranja!",
        },
        {
          id: "art2-c1-2",
          category: "Mistura Mágica",
          emoji: "🧪",
          question: "Se você misturar tinta AZUL com tinta AMARELA na paleta, qual cor mágica vai surgir?",
          options: ["Verde", "Roxo", "Laranja", "Preto"],
          correctIndex: 0,
          explanation: "Azul + Amarelo = Verde!",
        },
      ],
      2: [
        {
          id: "art2-c2-1",
          category: "Formas e Linhas",
          emoji: "✏️",
          question: "As linhas onduladas e curvas em um desenho transmitem a sensação de:",
          options: ["Movimento suave e ondas do mar", "Parede dura de pedra", "Vidro quebrado", "Raio de tempestade"],
          correctIndex: 0,
          explanation: "Linhas curvas trazem leveza, ritmo e dinamismo à obra de arte!",
        },
      ],
    },
    4: {},
  },
};
