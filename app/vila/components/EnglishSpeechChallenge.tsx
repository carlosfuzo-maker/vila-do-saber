"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  Languages,
  Award,
  ArrowRight,
  Flame,
} from "lucide-react";
import confetti from "canvas-confetti";
import { playSound } from "@/lib/soundEffects";

interface EnglishSpeechChallengeProps {
  currentChapterId: number;
  year?: 2 | 4;
  onAllCompleted: () => void;
}

interface ChallengePhrase {
  id: string;
  english: string;
  portuguese: string;
  hint: string;
}

const PHRASES_YEAR_2: ChallengePhrase[] = [
  {
    id: "en2-1",
    english: "Good morning, how are you?",
    portuguese: "Bom dia, como você está?",
    hint: "Diga bem alegre: 'Gud mornin, rau ar iu?'",
  },
  {
    id: "en2-2",
    english: "Look at the colorful rainbow!",
    portuguese: "Olhe para o arco-íris colorido!",
    hint: "Pronuncie: 'Luk ét di cólorful rêinbou!'",
  },
  {
    id: "en2-3",
    english: "I love cute pets and animals!",
    portuguese: "Eu amo bichinhos fofos e animais!",
    hint: "Pronuncie: 'Ai lóv kiut péts énd énimals!'",
  },
];

const PHRASES_YEAR_4: ChallengePhrase[] = [
  {
    id: "en4-1",
    english: "What are you doing? I am reading a story!",
    portuguese: "O que você está fazendo? Eu estou lendo uma história!",
    hint: "Pronuncie: 'Uót ar iu duin? Ai ém ridin ei stóri!'",
  },
  {
    id: "en4-2",
    english: "My favourite subject at school is Science!",
    portuguese: "Minha matéria favorita na escola é Ciências!",
    hint: "Pronuncie: 'Mai fêivorit sâbject ét scul is Sáiens!'",
  },
  {
    id: "en4-3",
    english: "Can I have some orange juice, please?",
    portuguese: "Pode me dar um pouco de suco de laranja, por favor?",
    hint: "Pronuncie: 'Kén ai rév sâm órendj djús, pliz?'",
  },
];

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?'"“”]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Compute word-level match similarity
function calculateMatch(expected: string, spoken: string): { isMatch: boolean; percentage: number } {
  const expWords = normalize(expected).split(" ").filter(Boolean);
  const spokenWords = normalize(spoken).split(" ").filter(Boolean);

  if (expWords.length === 0 || spokenWords.length === 0) {
    return { isMatch: false, percentage: 0 };
  }

  let matched = 0;
  expWords.forEach((word) => {
    if (spokenWords.includes(word)) {
      matched++;
    } else {
      // Check partial match (like plurals or prefixes)
      const partial = spokenWords.some(
        (sw) => sw.startsWith(word.slice(0, 3)) || word.startsWith(sw.slice(0, 3))
      );
      if (partial) matched += 0.7;
    }
  });

  const percentage = Math.min(100, Math.round((matched / expWords.length) * 100));
  // Consider success if 65% or more words are recognized
  return { isMatch: percentage >= 65, percentage };
}

export function EnglishSpeechChallenge({
  year = 4,
  onAllCompleted,
}: EnglishSpeechChallengeProps) {
  const phrases = year === 2 ? PHRASES_YEAR_2 : PHRASES_YEAR_4;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState("");
  const [matchStatus, setMatchStatus] = useState<"idle" | "success" | "retry">("idle");
  const [matchPercentage, setMatchPercentage] = useState(0);
  const [hasSpeechSupport, setHasSpeechSupport] = useState(true);
  const [isSpeakingAudio, setIsSpeakingAudio] = useState(false);

  const recognitionRef = useRef<any>(null);

  const currentPhrase = phrases[currentIndex] || phrases[0];

  useEffect(() => {
    // Check Speech Recognition support in browser
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (!SpeechRecognition) {
        setHasSpeechSupport(false);
      }
    }
  }, []);

  // Listen to English speech
  const startListening = () => {
    if (typeof window === "undefined") return;

    playSound("click");
    setMatchStatus("idle");
    setSpokenText("");

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setHasSpeechSupport(false);
      return;
    }

    try {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }

      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSpokenText(transcript);

        const { isMatch, percentage } = calculateMatch(currentPhrase.english, transcript);
        setMatchPercentage(percentage);

        if (isMatch) {
          setMatchStatus("success");
          playSound("fanfare");
          try {
            confetti({
              particleCount: 70,
              spread: 60,
              origin: { y: 0.6 },
            });
          } catch {
            // ignore
          }
        } else {
          setMatchStatus("retry");
          playSound("pop");
        }
      };

      recognition.onerror = (err: any) => {
        console.warn("Speech recognition error:", err);
        setIsListening(false);
        if (err.error === "not-allowed") {
          alert("Permissão do microfone foi bloqueada. Por favor, habilite o microfone no navegador.");
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  // Text to Speech: Listen to native voice
  const speakNativePronunciation = () => {
    playSound("click");
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentPhrase.english);
      utterance.lang = "en-US";
      utterance.rate = 0.82; // Slower for elementary students
      utterance.onstart = () => setIsSpeakingAudio(true);
      utterance.onend = () => setIsSpeakingAudio(false);
      utterance.onerror = () => setIsSpeakingAudio(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleNextPhrase = () => {
    playSound("click");
    if (currentIndex + 1 < phrases.length) {
      setCurrentIndex((prev) => prev + 1);
      setMatchStatus("idle");
      setSpokenText("");
    } else {
      // All completed!
      onAllCompleted();
    }
  };

  return (
    <div className="space-y-4 text-left">
      {/* Progress pill */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-black uppercase text-purple-700 bg-purple-100 px-3 py-1 rounded-full flex items-center gap-1.5">
          <Languages className="w-3.5 h-3.5" />
          <span>English Pronunciation Quest</span>
        </span>

        <span className="text-xs font-bold text-slate-500">
          Frase {currentIndex + 1} de {phrases.length}
        </span>
      </div>

      {/* Target Sentence Display Card */}
      <div className="bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 p-5 sm:p-6 rounded-3xl border-3 border-purple-200 text-center space-y-3 relative shadow-inner">
        <span className="text-[11px] font-black uppercase tracking-wider text-purple-600 block">
          Leia em voz alta para o Mascote:
        </span>

        {/* Big English text */}
        <h3 className="text-xl sm:text-2xl font-black text-purple-950 leading-snug drop-shadow-sm">
          &ldquo;{currentPhrase.english}&rdquo;
        </h3>

        {/* Translation & Phonetic Hint */}
        <div className="space-y-1">
          <p className="text-xs sm:text-sm font-semibold text-slate-600">
            Tradução: <span className="text-slate-800 font-bold">{currentPhrase.portuguese}</span>
          </p>
          <p className="text-[11px] text-purple-800 italic bg-white/70 py-1 px-3 rounded-xl inline-block border border-purple-200">
            💡 Dica de Pronúncia: {currentPhrase.hint}
          </p>
        </div>

        {/* Listen Button (Text-to-Speech) */}
        <div className="pt-1">
          <button
            type="button"
            onClick={speakNativePronunciation}
            className={`btn-game inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer shadow-sm ${
              isSpeakingAudio
                ? "bg-purple-600 text-white animate-pulse"
                : "bg-white text-purple-700 border border-purple-300 hover:bg-purple-100"
            }`}
          >
            <Volume2 className="w-4 h-4 text-purple-600" />
            <span>{isSpeakingAudio ? "Ouvindo Pronúncia..." : "🔊 Ouvir Pronúncia Nativa"}</span>
          </button>
        </div>
      </div>

      {/* Microphone Interaction Area */}
      <div className="flex flex-col items-center justify-center space-y-3 py-2">
        {hasSpeechSupport ? (
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={isListening ? stopListening : startListening}
              className={`btn-game w-20 h-20 rounded-full flex flex-col items-center justify-center transition-all shadow-xl cursor-pointer ${
                isListening
                  ? "bg-rose-500 text-white animate-ping ring-8 ring-rose-200 scale-105"
                  : matchStatus === "success"
                  ? "bg-emerald-500 text-white ring-4 ring-emerald-200"
                  : "bg-gradient-to-br from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white ring-4 ring-purple-200 hover:scale-105"
              }`}
            >
              {isListening ? (
                <MicOff className="w-8 h-8" />
              ) : (
                <Mic className="w-8 h-8 animate-pulse" />
              )}
            </button>

            <span className="text-xs font-black text-slate-700 mt-2">
              {isListening
                ? "🎙️ Estou a ouvir! Fale agora..."
                : matchStatus === "success"
                ? "Toque para falar novamente"
                : "Toque no Microfone e Fale em Inglês"}
            </span>
          </div>
        ) : (
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 text-center">
            <span>O seu navegador não suporta a Web Speech API. </span>
            <button
              type="button"
              onClick={() => {
                setSpokenText(currentPhrase.english);
                setMatchStatus("success");
                playSound("fanfare");
              }}
              className="font-bold underline ml-1 cursor-pointer"
            >
              Simular leitura correta
            </button>
          </div>
        )}

        {/* Captured Speech Feedback */}
        {spokenText && (
          <div className="w-full bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-center space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              O Mascote ouviu você dizer:
            </span>
            <p className="text-sm font-black text-slate-800 italic">
              &ldquo;{spokenText}&rdquo;
            </p>
          </div>
        )}

        {/* Mascot Reaction Box */}
        {matchStatus === "success" && (
          <div className="w-full bg-emerald-50 border-2 border-emerald-300 p-4 rounded-2xl text-center space-y-2 animate-bounce-subtle">
            <div className="flex items-center justify-center gap-1.5 text-emerald-800 font-black text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Brilliant! Pronúncia Excelente! ({matchPercentage}% de precisão)</span>
            </div>
            <p className="text-xs text-emerald-700 font-medium">
              O mascote adorou a sua pronúncia em inglês! Você ganhou estrelas de conversação!
            </p>

            <button
              type="button"
              onClick={handleNextPhrase}
              className="btn-game px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-xs rounded-xl shadow-md cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>{currentIndex + 1 < phrases.length ? "Próxima Frase" : "Finalizar Desafio"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {matchStatus === "retry" && (
          <div className="w-full bg-amber-50 border-2 border-amber-300 p-3.5 rounded-2xl text-center space-y-1.5">
            <p className="text-xs font-black text-amber-900">
              Quase lá! Ouvi parte das palavras ({matchPercentage}%).
            </p>
            <p className="text-[11px] text-amber-800 font-medium">
              Dica: Ouça a pronúncia nativa no botão acima e fale um pouquinho mais devagar perto do microfone!
            </p>
            <button
              type="button"
              onClick={startListening}
              className="btn-game px-4 py-1.5 bg-amber-500 text-white font-bold text-xs rounded-xl cursor-pointer inline-flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Tentar Novamente</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
