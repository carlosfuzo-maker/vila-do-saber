"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  StudentYear,
  SubjectBuilding,
  WrittenBook,
  AuthorFeedback,
} from "../types";
import {
  LIBRARY_PROMPTS_YEAR_2,
  LIBRARY_PROMPTS_YEAR_4,
  evaluateStudentStory,
} from "@/lib/authorEvaluator";
import {
  X,
  Feather,
  Sparkles,
  BookOpen,
  Award,
  Star,
  Coins,
  Send,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  Library,
  BookMarked,
  Trash2,
  RotateCcw,
} from "lucide-react";
import confetti from "canvas-confetti";
import { playSound } from "@/lib/soundEffects";
import { formatDateFull } from "@/lib/dateUtils";

interface LibraryWriterModalProps {
  isOpen: boolean;
  onClose: () => void;
  year: StudentYear;
  authorName: string;
  portugueseSubject: SubjectBuilding;
  onRewardStudent: (xp: number, stars: number, coins: number) => void;
}

const COVER_COLORS = [
  "from-pink-400 to-rose-500",
  "from-purple-400 to-indigo-500",
  "from-sky-400 to-blue-500",
  "from-emerald-400 to-teal-500",
  "from-amber-400 to-orange-500",
];

export function LibraryWriterModal({
  isOpen,
  onClose,
  year,
  authorName,
  portugueseSubject,
  onRewardStudent,
}: LibraryWriterModalProps) {
  const currentChapter =
    portugueseSubject.chapters.find((c) => c.id === portugueseSubject.currentChapterId) ||
    portugueseSubject.chapters[0];

  const prompts = year === 2 ? LIBRARY_PROMPTS_YEAR_2 : LIBRARY_PROMPTS_YEAR_4;
  const [selectedPromptIndex, setSelectedPromptIndex] = useState(0);

  // Form states
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCoverColor, setSelectedCoverColor] = useState(COVER_COLORS[0]);

  // Modal views: 'write' | 'feedback' | 'bookshelf' | 'read'
  const [viewMode, setViewMode] = useState<"write" | "feedback" | "bookshelf" | "read">("write");

  // Current feedback
  const [currentFeedback, setCurrentFeedback] = useState<AuthorFeedback | null>(null);

  // Bookshelf saved in localStorage
  const [savedBooks, setSavedBooks] = useState<WrittenBook[]>([]);
  const [readingBook, setReadingBook] = useState<WrittenBook | null>(null);

  // Load books from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("vila_estante_livros");
      if (stored) {
        setSavedBooks(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  if (!isOpen) return null;

  const activePrompt = prompts[selectedPromptIndex] || prompts[0];

  // Helper inserts
  const handleInsertHelper = (phrase: string) => {
    playSound("click");
    setContent((prev) => {
      const trimmed = prev.trim();
      if (!trimmed) return phrase + " ";
      return trimmed + "\n\n" + phrase + " ";
    });
  };

  // Submit to Mascot Corrector
  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || content.trim().length < 15) {
      alert("Escreva pelo menos algumas frases para a Corujinha Peninha poder ler a sua história!");
      return;
    }

    const finalTitle = title.trim() || activePrompt.suggestionTitle || "Minha História Encantada";
    const feedback = evaluateStudentStory(finalTitle, content, year, authorName);
    setCurrentFeedback(feedback);

    // Calculate rewards
    const starsReward = feedback.structureScore >= 4 ? 4 : feedback.structureScore >= 3 ? 3 : 2;
    const coinsReward = feedback.structureScore >= 4 ? 40 : 25;
    const xpReward = feedback.structureScore >= 4 ? 75 : 50;

    // Create book
    const newBook: WrittenBook = {
      id: `book-${Date.now()}`,
      year,
      authorName,
      title: finalTitle,
      content: content.trim(),
      chapterTitle: currentChapter.title,
      themePrompt: activePrompt.theme,
      coverColor: selectedCoverColor,
      starsAwarded: starsReward,
      coinsAwarded: coinsReward,
      xpAwarded: xpReward,
      createdAt: new Date().toISOString(),
      feedback,
    };

    // Save to bookshelf & localStorage
    const updatedBooks = [newBook, ...savedBooks];
    setSavedBooks(updatedBooks);
    try {
      localStorage.setItem("vila_estante_livros", JSON.stringify(updatedBooks));
    } catch {
      // ignore
    }

    // Award profile
    onRewardStudent(xpReward, starsReward, coinsReward);
    playSound("fanfare");

    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.55 },
      });
    } catch {
      // ignore
    }

    setViewMode("feedback");
  };

  const handleDeleteBook = (id: string) => {
    playSound("pop");
    const updated = savedBooks.filter((b) => b.id !== id);
    setSavedBooks(updated);
    try {
      localStorage.setItem("vila_estante_livros", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // Filter books for this student
  const studentBooks = savedBooks.filter((b) => b.year === year);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/65 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border-4 border-rose-300 overflow-hidden flex flex-col max-h-[94vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 p-4 sm:p-5 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-white/20 p-1 border-2 border-white/60 shadow-inner shrink-0">
              <Image
                src="/images/mascot_peninha.jpg"
                alt="Coruja Peninha"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black tracking-wide">
                  Oficina do Jovem Autor
                </h2>
                <span className="text-[10px] bg-white/25 px-2 py-0.5 rounded-full font-black uppercase">
                  {authorName}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-rose-100 flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" />
                <span>
                  Capítulo Atual: {currentChapter.title.split(":")[0]} • {portugueseSubject.buildingName}
                </span>
              </p>
            </div>
          </div>

          {/* Large, comfortable close button for tablets */}
          <button
            onClick={() => {
              playSound("click");
              onClose();
            }}
            className="p-3 bg-white/20 hover:bg-white/30 rounded-2xl transition-transform active:scale-90 cursor-pointer min-w-[46px] min-h-[46px] flex items-center justify-center border border-white/30 shadow-sm"
            aria-label="Fechar modal"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b-2 border-slate-100 bg-rose-50/50 p-2 gap-2">
          <button
            onClick={() => {
              playSound("click");
              setViewMode("write");
            }}
            className={`flex-1 py-2 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              viewMode === "write"
                ? "bg-white text-rose-700 shadow-sm border border-rose-200"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Feather className="w-4 h-4" />
            <span>✍️ Escrever Nova História</span>
          </button>

          <button
            onClick={() => {
              playSound("click");
              setViewMode("bookshelf");
            }}
            className={`flex-1 py-2 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              viewMode === "bookshelf"
                ? "bg-white text-rose-700 shadow-sm border border-rose-200"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Library className="w-4 h-4" />
            <span>📚 Estante Virtual ({studentBooks.length})</span>
          </button>
        </div>

        {/* Main Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {/* VIEW: WRITE */}
          {viewMode === "write" && (
            <form onSubmit={handleEvaluate} className="space-y-4">
              {/* Inspiration theme box */}
              <div className="bg-gradient-to-r from-amber-50 to-rose-50 p-3.5 sm:p-4 rounded-2xl border-2 border-rose-200">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-black text-rose-900">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Ideia de História para esta Semana ({currentChapter.title.split(":")[1] || currentChapter.title}):</span>
                  </div>

                  <div className="flex gap-1">
                    {prompts.map((p, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          playSound("click");
                          setSelectedPromptIndex(idx);
                        }}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-lg transition-all ${
                          selectedPromptIndex === idx
                            ? "bg-rose-500 text-white"
                            : "bg-white text-slate-600 hover:bg-rose-100"
                        }`}
                      >
                        Tema {idx + 1}
                      </button>
                    ))}
                  </div>
                </div>

                <p className="text-xs sm:text-sm font-bold text-slate-800">
                  {activePrompt.prompt}
                </p>
              </div>

              {/* Title & Cover Color */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-black uppercase text-slate-600 mb-1">
                    Título do seu Livro:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={`Ex: ${activePrompt.suggestionTitle}`}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-rose-400 focus:outline-none font-bold text-slate-800 text-sm bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-slate-600 mb-1">
                    Cor da Capa:
                  </label>
                  <div className="flex items-center gap-2 py-1">
                    {COVER_COLORS.map((col, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedCoverColor(col)}
                        className={`w-7 h-7 rounded-xl bg-gradient-to-br ${col} shadow-sm transition-transform cursor-pointer ${
                          selectedCoverColor === col ? "scale-125 ring-2 ring-slate-800" : "hover:scale-110"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Story Editor Workspace */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-black uppercase text-slate-600 flex items-center gap-1.5">
                    <span>Área de Escrita Criativa</span>
                    <span className="text-[11px] font-normal text-slate-400">
                      (Começo, Meio e Fim)
                    </span>
                  </label>

                  <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                    {content.trim().split(/\s+/).filter(Boolean).length} palavras
                  </span>
                </div>

                {/* Quick Helper Word Pills */}
                <div className="flex flex-wrap items-center gap-1.5 mb-2">
                  <span className="text-[10px] font-black uppercase text-slate-400 mr-1">
                    Ideias para Inserir:
                  </span>
                  <button
                    type="button"
                    onClick={() => handleInsertHelper("Era uma vez")}
                    className="px-2.5 py-1 text-xs bg-pink-100 hover:bg-pink-200 text-pink-900 rounded-xl font-bold cursor-pointer"
                  >
                    ✨ Era uma vez...
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertHelper("Certo dia na Vila do Saber")}
                    className="px-2.5 py-1 text-xs bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl font-bold cursor-pointer"
                  >
                    🏰 Certo dia...
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertHelper("De repente, algo inesperado aconteceu:")}
                    className="px-2.5 py-1 text-xs bg-sky-100 hover:bg-sky-200 text-sky-900 rounded-xl font-bold cursor-pointer"
                  >
                    ⚡ De repente...
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertHelper("E assim, todos aprenderam uma grande lição:")}
                    className="px-2.5 py-1 text-xs bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-xl font-bold cursor-pointer"
                  >
                    🎉 E assim...
                  </button>
                </div>

                <textarea
                  required
                  rows={7}
                  placeholder={
                    year === 2
                      ? "Escreva aqui a historinha da Bianca! Conte quem são os amigos, o que aconteceu e como terminou feliz..."
                      : "Desenvolva sua narrativa aqui, Cecília! Apresente o cenário, o conflito que os personagens enfrentam e o desfecho marcante..."
                  }
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-rose-200 focus:border-rose-400 focus:outline-none font-medium text-slate-800 text-sm bg-amber-50/30 leading-relaxed shadow-inner resize-y min-h-[160px]"
                />
              </div>

              {/* Submit to Mascot Button */}
              <button
                type="submit"
                className="btn-game w-full py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-black text-sm sm:text-base rounded-2xl shadow-lg shadow-rose-500/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-5 h-5" />
                <span>Enviar para o Mascote Corretor (Peninha) 🦉</span>
              </button>
            </form>
          )}

          {/* VIEW: FEEDBACK FROM MASCOT */}
          {viewMode === "feedback" && currentFeedback && (
            <div className="space-y-6 text-center animate-fadeIn py-2">
              {/* Mascot Bubble */}
              <div className="flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-purple-50 via-rose-50 to-amber-50 p-5 rounded-3xl border-3 border-purple-200 text-left shadow-md">
                <div className="relative w-24 h-24 rounded-3xl overflow-hidden shadow-lg border-3 border-purple-300 shrink-0 bg-white">
                  <Image
                    src="/images/mascot_peninha.jpg"
                    alt="Mascote Peninha"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-600 text-white text-xs font-black">
                      🦉 Peninha da Biblioteca diz:
                    </span>
                    <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                      Nota de Estrutura: {currentFeedback.structureScore}/5
                    </span>
                  </div>

                  <p className="text-sm font-extrabold text-slate-800 leading-snug">
                    {currentFeedback.praiseComment}
                  </p>

                  <p className="text-xs text-purple-900 font-medium italic">
                    💡 {currentFeedback.tipsComment}
                  </p>
                </div>
              </div>

              {/* Story Structure Checklist (Começo, Meio e Fim) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div
                  className={`p-3.5 rounded-2xl border-2 flex items-center gap-2.5 text-left ${
                    currentFeedback.hasBeginning
                      ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                      : "bg-slate-50 border-slate-200 text-slate-600"
                  }`}
                >
                  <CheckCircle2
                    className={`w-6 h-6 shrink-0 ${
                      currentFeedback.hasBeginning ? "text-emerald-500" : "text-slate-300"
                    }`}
                  />
                  <div>
                    <span className="text-xs font-black block">1. Começo da História</span>
                    <span className="text-[10px] text-slate-500">
                      {currentFeedback.hasBeginning ? "Personagens e lugar apresentados!" : "Poderia situar melhor o início."}
                    </span>
                  </div>
                </div>

                <div
                  className={`p-3.5 rounded-2xl border-2 flex items-center gap-2.5 text-left ${
                    currentFeedback.hasMiddle
                      ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                      : "bg-slate-50 border-slate-200 text-slate-600"
                  }`}
                >
                  <CheckCircle2
                    className={`w-6 h-6 shrink-0 ${
                      currentFeedback.hasMiddle ? "text-emerald-500" : "text-slate-300"
                    }`}
                  />
                  <div>
                    <span className="text-xs font-black block">2. Meio & Acontecimento</span>
                    <span className="text-[10px] text-slate-500">
                      {currentFeedback.hasMiddle ? "Desenvolveu o conflito e ação!" : "Adicione mais suspense ou eventos."}
                    </span>
                  </div>
                </div>

                <div
                  className={`p-3.5 rounded-2xl border-2 flex items-center gap-2.5 text-left ${
                    currentFeedback.hasEnding
                      ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                      : "bg-slate-50 border-slate-200 text-slate-600"
                  }`}
                >
                  <CheckCircle2
                    className={`w-6 h-6 shrink-0 ${
                      currentFeedback.hasEnding ? "text-emerald-500" : "text-slate-300"
                    }`}
                  />
                  <div>
                    <span className="text-xs font-black block">3. Final & Desfecho</span>
                    <span className="text-[10px] text-slate-500">
                      {currentFeedback.hasEnding ? "Conclusão com chave de ouro!" : "Como a aventura terminou?"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Earned Badges & Rewards */}
              <div className="bg-amber-50 p-4 rounded-3xl border-2 border-amber-200 flex flex-wrap items-center justify-around gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center font-black">
                    <Star className="w-5 h-5 fill-amber-950" />
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-black text-amber-950">
                      +{currentFeedback.structureScore >= 4 ? 4 : 3} Estrelas
                    </span>
                    <span className="text-[10px] text-amber-700 block font-bold">Troféu da Vila</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black">
                    <Coins className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-black text-emerald-950">
                      +{currentFeedback.structureScore >= 4 ? 40 : 25} Moedas
                    </span>
                    <span className="text-[10px] text-emerald-700 block font-bold">Bolsa do Autor</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-black">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-black text-purple-950">
                      +{currentFeedback.structureScore >= 4 ? 75 : 50} XP
                    </span>
                    <span className="text-[10px] text-purple-700 block font-bold">Subindo de Nível</span>
                  </div>
                </div>
              </div>

              {/* Badges list */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                {currentFeedback.badges.map((b) => (
                  <span
                    key={b}
                    className="px-3 py-1 rounded-full bg-rose-100 text-rose-900 border border-rose-300 font-extrabold text-xs shadow-sm"
                  >
                    {b}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    playSound("click");
                    setViewMode("bookshelf");
                  }}
                  className="btn-game flex-1 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <BookMarked className="w-4 h-4" />
                  <span>Ver Livro na Estante Virtual</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playSound("click");
                    setTitle("");
                    setContent("");
                    setViewMode("write");
                  }}
                  className="btn-game px-5 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl cursor-pointer"
                >
                  Escrever Outro
                </button>
              </div>
            </div>
          )}

          {/* VIEW: BOOKSHELF (Estante Virtual) */}
          {viewMode === "bookshelf" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-800 flex items-center gap-2">
                    <Library className="w-5 h-5 text-rose-600" />
                    <span>Estante Virtual da {authorName}</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Todos os livrinhos escritos e avaliados pelo Peninha ficam guardados aqui!
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    playSound("click");
                    setTitle("");
                    setContent("");
                    setViewMode("write");
                  }}
                  className="btn-game px-3.5 py-1.5 bg-rose-500 text-white text-xs font-black rounded-xl cursor-pointer flex items-center gap-1 shadow-sm"
                >
                  <Feather className="w-3.5 h-3.5" />
                  <span>+ Novo Livro</span>
                </button>
              </div>

              {studentBooks.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <div className="w-16 h-16 mx-auto bg-rose-100 rounded-full flex items-center justify-center text-rose-500">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <h4 className="text-base font-black text-slate-800">
                    A sua estante ainda está vazia!
                  </h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Escreva o seu primeiro livrinho hoje e receba a avaliação do Peninha, estrelas e moedas para a vila.
                  </p>
                  <button
                    type="button"
                    onClick={() => setViewMode("write")}
                    className="btn-game px-4 py-2 bg-rose-500 text-white font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Começar a Escrever Agora
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {studentBooks.map((book) => (
                    <div
                      key={book.id}
                      className="group relative rounded-2xl border-2 border-slate-200 bg-white shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden"
                    >
                      {/* Book Cover simulation */}
                      <div
                        className={`h-28 bg-gradient-to-br ${book.coverColor} p-3 text-white flex flex-col justify-between relative`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase tracking-wider bg-black/25 px-2 py-0.5 rounded-full">
                            {book.authorName}
                          </span>
                          <span className="flex items-center gap-0.5 text-xs font-black bg-yellow-400 text-yellow-950 px-1.5 py-0.2 rounded-full shadow-sm">
                            <Star className="w-3 h-3 fill-yellow-950" />
                            {book.starsAwarded}
                          </span>
                        </div>

                        <h4 className="text-sm font-black leading-tight line-clamp-2 drop-shadow">
                          {book.title}
                        </h4>
                      </div>

                      {/* Book Info */}
                      <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                        <p className="text-xs text-slate-600 line-clamp-2 italic">
                          &ldquo;{book.content}&rdquo;
                        </p>

                        <div className="pt-1 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-[10px] text-slate-400">
                            {formatDateFull(book.createdAt)}
                          </span>

                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => {
                                playSound("open");
                                setReadingBook(book);
                                setViewMode("read");
                              }}
                              className="btn-game px-2.5 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-black rounded-lg cursor-pointer"
                            >
                              Ler Livro
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDeleteBook(book.id)}
                              className="p-1 text-slate-400 hover:text-rose-500 rounded-lg cursor-pointer transition-colors"
                              title="Remover da estante"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* VIEW: READ (Modo Leitura de Livro) */}
          {viewMode === "read" && readingBook && (
            <div className="space-y-4 animate-fadeIn">
              <button
                type="button"
                onClick={() => {
                  playSound("click");
                  setViewMode("bookshelf");
                }}
                className="btn-game px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer inline-flex items-center gap-1"
              >
                &larr; Voltar para a Estante
              </button>

              <div className="bg-amber-50/70 p-6 sm:p-8 rounded-3xl border-3 border-amber-200 shadow-inner max-w-xl mx-auto space-y-4">
                <div className="text-center border-b-2 border-amber-200/80 pb-4">
                  <span className="text-[11px] font-black uppercase text-amber-700 bg-amber-100 px-3 py-0.5 rounded-full">
                    Livro Publicado na Vila do Saber
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 mt-2">
                    {readingBook.title}
                  </h2>
                  <p className="text-xs text-slate-600 font-bold mt-1">
                    Por: {readingBook.authorName} ({readingBook.year}º Ano) • {readingBook.chapterTitle}
                  </p>
                </div>

                <div className="text-sm text-slate-800 leading-relaxed font-medium whitespace-pre-wrap py-2">
                  {readingBook.content}
                </div>

                {/* Feedback recap */}
                <div className="bg-white/80 p-3 rounded-2xl border border-amber-200 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-purple-300">
                    <Image
                      src="/images/mascot_peninha.jpg"
                      alt="Peninha"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="text-xs">
                    <span className="font-black text-purple-900 block">Selo do Peninha:</span>
                    <span className="text-slate-600 italic">
                      {readingBook.feedback.praiseComment}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
