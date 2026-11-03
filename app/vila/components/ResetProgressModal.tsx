"use client";

import React, { useState, useRef } from "react";
import {
  X,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Trash2,
  Download,
  Upload,
  HardDrive,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { playSound } from "@/lib/soundEffects";

interface ResetProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  onResetDailyMissions: () => void;
  onResetAllData: () => void;
  onExportBackup?: () => void;
  onImportBackup?: (jsonData: string) => boolean;
}

export function ResetProgressModal({
  isOpen,
  onClose,
  studentName,
  onResetDailyMissions,
  onResetAllData,
  onExportBackup,
  onImportBackup,
}: ResetProgressModalProps) {
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [errorToast, setErrorToast] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleResetDaily = () => {
    playSound("star");
    onResetDailyMissions();
    setSuccessToast("Missões diárias reiniciadas! Todas prontas para praticar de novo!");
    setTimeout(() => {
      setSuccessToast(null);
      onClose();
    }, 1500);
  };

  const handleResetEverything = () => {
    if (confirm("Tem certeza que deseja zerar todo o progresso (nível, estrelas, moedas e missões)?")) {
      playSound("pop");
      onResetAllData();
      setSuccessToast("Progresso zerado com sucesso para um recomeço fresco!");
      setTimeout(() => {
        setSuccessToast(null);
        onClose();
      }, 1500);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (onImportBackup) {
        const ok = onImportBackup(content);
        if (ok) {
          playSound("fanfare");
          setSuccessToast("Backup restaurado com sucesso! Recarregando a Vila...");
          setTimeout(() => {
            window.location.reload();
          }, 1200);
        } else {
          playSound("pop");
          setErrorToast("Arquivo de backup inválido ou corrompido.");
          setTimeout(() => setErrorToast(null), 3000);
        }
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/65 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border-4 border-slate-300 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-4 sm:p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/15 rounded-2xl">
              <HardDrive className="w-5 h-5 text-slate-200" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-wide">
                Progresso & Configurações
              </h3>
              <p className="text-xs text-slate-300 font-medium">
                Aluna: {studentName}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playSound("click");
              onClose();
            }}
            className="p-3 bg-white/20 hover:bg-white/30 rounded-2xl transition-transform active:scale-90 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center border border-white/20"
            aria-label="Fechar modal"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4 text-left overflow-y-auto">
          {successToast ? (
            <div className="py-6 text-center space-y-2 animate-fadeIn">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
              <p className="text-sm font-black text-slate-800">{successToast}</p>
            </div>
          ) : (
            <>
              {errorToast && (
                <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl text-rose-700 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorToast}</span>
                </div>
              )}

              {/* Automatic Persistence Status Card */}
              <div className="bg-emerald-50 p-4 rounded-2xl border-2 border-emerald-200 text-xs text-slate-700 space-y-2">
                <span className="font-extrabold text-emerald-900 flex items-center gap-1.5 text-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Salvamento Automático Ativo</span>
                </span>
                <p className="text-slate-600">
                  Todo o progresso (missões feitas, estrelas, moedas, níveis, capítulos e livrinhos) é <strong>salvo automaticamente no navegador</strong> a cada clique.
                </p>
                <p className="text-[11px] text-emerald-800 font-semibold">
                  ✓ Pode fechar o navegador ou o tablet e continuar em qualquer outro dia!
                </p>
              </div>

              {/* Backup & Restore section */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5">
                <span className="text-[11px] font-black uppercase text-slate-500 tracking-wider">
                  Cópia de Segurança (Backup)
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      playSound("click");
                      onExportBackup?.();
                    }}
                    className="p-2.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-95 transition-all"
                  >
                    <Download className="w-3.5 h-3.5 text-sky-600" />
                    <span>Baixar Backup</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-95 transition-all"
                  >
                    <Upload className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Restaurar</span>
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              {/* Action 1: Reset Daily Missions (Safe & Recommended) */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-black uppercase text-slate-500 tracking-wider">
                  Treino Diário
                </span>
                <button
                  type="button"
                  onClick={handleResetDaily}
                  className="btn-game w-full p-3.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-black text-xs sm:text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reiniciar Missões de Hoje (Praticar de Novo)</span>
                </button>
              </div>

              {/* Action 2: Reset All Data (Discreet & Careful) */}
              <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleResetEverything}
                  className="btn-game w-full py-2.5 px-3 bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-700 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Zerar Tudo e Recomeçar Nível do Zero</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playSound("click");
                    onClose();
                  }}
                  className="w-full py-2 text-xs text-slate-400 hover:text-slate-600 font-bold cursor-pointer"
                >
                  Fechar
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
