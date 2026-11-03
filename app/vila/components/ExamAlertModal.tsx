"use client";

import React, { useState, useEffect } from "react";
import { ExamAlert, SubjectBuilding, StudentYear } from "../types";
import {
  X,
  Calendar,
  AlertTriangle,
  BookOpen,
  Trash2,
  CheckCircle,
  Plus,
  Sparkles,
  PartyPopper,
} from "lucide-react";
import confetti from "canvas-confetti";
import { playSound } from "@/lib/soundEffects";
import { formatDateFull } from "@/lib/dateUtils";

interface ExamAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  year: StudentYear;
  subjects: SubjectBuilding[];
  initialSubjectId?: string;
  exams: ExamAlert[];
  onSaveExam: (exam: ExamAlert) => void;
  onDeleteExam: (examId: string) => void;
}

export function ExamAlertModal({
  isOpen,
  onClose,
  year,
  subjects,
  initialSubjectId,
  exams,
  onSaveExam,
  onDeleteExam,
}: ExamAlertModalProps) {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(
    initialSubjectId || subjects[0]?.id || ""
  );
  const [examDate, setExamDate] = useState<string>("");
  const [selectedChapters, setSelectedChapters] = useState<string[]>([]);
  const [customChaptersNote, setCustomChaptersNote] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [tab, setTab] = useState<"new" | "list">("new");

  useEffect(() => {
    if (initialSubjectId) {
      setSelectedSubjectId(initialSubjectId);
    } else if (subjects.length > 0 && !selectedSubjectId) {
      setSelectedSubjectId(subjects[0].id);
    }
  }, [initialSubjectId, subjects, selectedSubjectId]);

  if (!isOpen) return null;

  const currentSubject = subjects.find((s) => s.id === selectedSubjectId) || subjects[0];
  const currentGradeExams = exams.filter((e) => e.year === year);

  // Quick date helper
  const handleSetQuickDate = (daysFromNow: number) => {
    const d = new Date();
    d.setDate(d.getDate() + daysFromNow);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    setExamDate(`${yyyy}-${mm}-${dd}`);
    playSound("click");
  };

  const toggleChapter = (chapterTitle: string) => {
    playSound("click");
    setSelectedChapters((prev) =>
      prev.includes(chapterTitle)
        ? prev.filter((c) => c !== chapterTitle)
        : [...prev, chapterTitle]
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubjectId || !examDate) {
      alert("Por favor, selecione a matéria e a data da prova!");
      return;
    }

    const chaptersFinal = [
      ...selectedChapters,
      ...(customChaptersNote.trim() ? [customChaptersNote.trim()] : []),
    ].join(", ") || "Capítulo Atual e Revisão";

    const newExam: ExamAlert = {
      id: `exam-${Date.now()}`,
      year,
      subjectId: selectedSubjectId,
      subjectName: currentSubject?.name || "Matéria",
      examDate,
      chaptersCovered: chaptersFinal,
      notes: notes.trim(),
      createdAt: new Date().toISOString(),
    };

    onSaveExam(newExam);
    playSound("fanfare");

    // Confetti celebration
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    // Reset and switch to list
    setExamDate("");
    setSelectedChapters([]);
    setCustomChaptersNote("");
    setNotes("");
    setTab("list");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-4 border-amber-300 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 p-4 sm:p-5 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-2xl backdrop-blur-md">
              <AlertTriangle className="w-6 h-6 text-yellow-100" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-wide flex items-center gap-2">
                <span>Aviso de Prova Escolar</span>
                <Sparkles className="w-4 h-4 text-yellow-200" />
              </h2>
              <p className="text-xs sm:text-sm font-medium text-amber-100">
                Organize as avaliações da {year === 2 ? "Bianca (2º Ano)" : "Cecília (4º Ano)"} e ajuste as missões da Vila!
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

        {/* Navigation Tabs */}
        <div className="flex border-b-2 border-slate-100 bg-amber-50/50 p-2 gap-2">
          <button
            onClick={() => {
              playSound("click");
              setTab("new");
            }}
            className={`flex-1 py-2 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              tab === "new"
                ? "bg-white text-amber-700 shadow-sm border border-amber-200"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Agendar Nova Prova</span>
          </button>

          <button
            onClick={() => {
              playSound("click");
              setTab("list");
            }}
            className={`flex-1 py-2 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              tab === "list"
                ? "bg-white text-amber-700 shadow-sm border border-amber-200"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Provas Marcadas ({currentGradeExams.length})</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
          {tab === "new" ? (
            <form onSubmit={handleSave} className="space-y-5">
              {/* 1. Escolha a Matéria */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-2">
                  1. Selecione a Matéria:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {subjects.map((subj) => (
                    <button
                      key={subj.id}
                      type="button"
                      onClick={() => {
                        playSound("click");
                        setSelectedSubjectId(subj.id);
                        setSelectedChapters([]);
                      }}
                      className={`p-3 rounded-2xl border-2 text-left font-bold text-xs transition-all flex items-center gap-2 cursor-pointer ${
                        selectedSubjectId === subj.id
                          ? `bg-amber-100/70 border-amber-500 text-amber-950 shadow-sm scale-[1.02]`
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <div
                        className={`w-3 h-3 rounded-full bg-gradient-to-r ${subj.accentColor} shrink-0`}
                      />
                      <span className="truncate">{subj.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Data da Prova */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-600">
                    2. Data da Prova:
                  </label>
                  <span className="text-[11px] text-slate-500">
                    Atalhos rápidos:
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => handleSetQuickDate(3)}
                    className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 rounded-xl font-semibold border border-slate-200 cursor-pointer"
                  >
                    Em 3 dias
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSetQuickDate(5)}
                    className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 rounded-xl font-semibold border border-slate-200 cursor-pointer"
                  >
                    Em 5 dias
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSetQuickDate(7)}
                    className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 rounded-xl font-semibold border border-slate-200 cursor-pointer"
                  >
                    Próxima Semana (7 dias)
                  </button>
                </div>

                <div className="relative">
                  <input
                    type="date"
                    required
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-amber-400 focus:outline-none font-bold text-slate-800 text-sm bg-slate-50"
                  />
                </div>
              </div>

              {/* 3. Capítulos que vão cair */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-2">
                  3. Capítulos que vão cair na prova:
                </label>
                <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                  {currentSubject?.chapters.map((chap) => {
                    const isSelected = selectedChapters.includes(chap.title);
                    return (
                      <div
                        key={chap.id}
                        onClick={() => toggleChapter(chap.title)}
                        className={`p-2.5 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between text-xs font-semibold ${
                          isSelected
                            ? "bg-amber-50 border-amber-400 text-amber-900"
                            : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                              isSelected
                                ? "bg-amber-500 border-amber-600 text-white"
                                : "border-slate-300 bg-white"
                            }`}
                          >
                            {isSelected && <CheckCircle className="w-3.5 h-3.5" />}
                          </div>
                          <span>{chap.title}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-normal truncate max-w-[150px]">
                          {chap.tags?.join(", ")}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Additional freeform input for pages/specific topics */}
                <input
                  type="text"
                  placeholder="Ou digite capítulos extras / páginas (ex: Cap. 4 págs 30 a 45)"
                  value={customChaptersNote}
                  onChange={(e) => setCustomChaptersNote(e.target.value)}
                  className="mt-2 w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-amber-400 bg-slate-50"
                />
              </div>

              {/* 4. Notas do Pai / Dicas da Professora */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5">
                  4. Recadinho ou Dica de Estudo (Opcional):
                </label>
                <input
                  type="text"
                  placeholder="Ex: Treinar a tabuada do 6 e do 7; Levar régua e lápis de cor"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-amber-400 bg-slate-50"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-game w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-sm rounded-2xl shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <PartyPopper className="w-4 h-4" />
                <span>Salvar Aviso de Prova e Ativar Missões da Vila</span>
              </button>
            </form>
          ) : (
            /* Lista de Provas Agendadas */
            <div className="space-y-3">
              {currentGradeExams.length === 0 ? (
                <div className="text-center py-10 space-y-3">
                  <div className="w-16 h-16 mx-auto bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <h4 className="text-base font-extrabold text-slate-800">
                    Nenhuma prova marcada no momento!
                  </h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Que bom! Mas quando a professora avisar a data da avaliação, cadastre aqui para a Vila focar nos capítulos certos.
                  </p>
                  <button
                    onClick={() => setTab("new")}
                    className="btn-game px-4 py-2 bg-amber-500 text-white font-bold text-xs rounded-xl cursor-pointer"
                  >
                    + Cadastrar Primeira Prova
                  </button>
                </div>
              ) : (
                currentGradeExams.map((exam) => (
                  <div
                    key={exam.id}
                    className="p-4 rounded-2xl border-2 border-amber-200 bg-amber-50/60 flex items-start justify-between gap-3 shadow-sm"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[11px] font-extrabold">
                          {exam.subjectName}
                        </span>
                        <span className="text-xs font-bold text-amber-900 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-amber-600" />
                          Data: {formatDateFull(exam.examDate)}
                        </span>
                      </div>
                      <p className="text-xs font-extrabold text-slate-800">
                        Capítulos: <span className="font-medium text-slate-700">{exam.chaptersCovered}</span>
                      </p>
                      {exam.notes && (
                        <p className="text-[11px] text-amber-800 italic">
                          💡 Dica: {exam.notes}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        playSound("pop");
                        onDeleteExam(exam.id);
                      }}
                      className="p-2 text-rose-500 hover:bg-rose-100 rounded-xl transition-all cursor-pointer"
                      title="Excluir prova"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
