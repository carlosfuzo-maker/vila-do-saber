"use client";

import React, { useEffect, useState } from "react";
import { Download, Smartphone, Share, PlusSquare, CheckCircle2, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

let deferredInstallPrompt: BeforeInstallPromptEvent | null = null;
const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((fn) => fn());
}

export function PwaServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Register Service Worker for PWA installability
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .catch((err) => console.warn("[PWA] Service worker registration warning:", err));
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      deferredInstallPrompt = e as BeforeInstallPromptEvent;
      notifyListeners();
    };

    const handleAppInstalled = () => {
      deferredInstallPrompt = null;
      notifyListeners();
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  return null;
}

export function PwaInstallButton({ compact = false }: { compact?: boolean }) {
  const [hasNativePrompt, setHasNativePrompt] = useState<boolean>(Boolean(deferredInstallPrompt));
  const [isStandalone, setIsStandalone] = useState<boolean>(false);
  const [showGuideModal, setShowGuideModal] = useState<boolean>(false);
  const [isIos, setIsIos] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;
    setIsStandalone(standalone);

    const ua = window.navigator.userAgent.toLowerCase();
    const iosDetected =
      /iphone|ipad|ipod/.test(ua) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    setIsIos(iosDetected);

    const update = () => setHasNativePrompt(Boolean(deferredInstallPrompt));
    listeners.add(update);
    return () => {
      listeners.delete(update);
    };
  }, []);

  if (isStandalone) {
    return null;
  }

  const handleInstallClick = async () => {
    if (deferredInstallPrompt) {
      try {
        await deferredInstallPrompt.prompt();
        const choice = await deferredInstallPrompt.userChoice;
        if (choice.outcome === "accepted") {
          deferredInstallPrompt = null;
          setHasNativePrompt(false);
        }
        return;
      } catch (err) {
        console.warn("[PWA] Prompt error:", err);
      }
    }
    setShowGuideModal(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleInstallClick}
        className={
          compact
            ? "flex items-center gap-1 px-2.5 py-1 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 border border-emerald-400/60 text-white text-[11px] font-black shadow transition active:scale-95 cursor-pointer"
            : "flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 border border-emerald-400/70 text-white text-xs font-black shadow-md transition active:scale-95 cursor-pointer"
        }
        title="Adicionar Jogo à Tela Inicial do Tablet (PWA)"
      >
        <Download className="w-3.5 h-3.5" />
        <span>{hasNativePrompt ? "📲 Instalar App" : "📲 Tela Inicial"}</span>
      </button>

      {showGuideModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-slate-900 border-2 border-emerald-400 rounded-3xl p-5 shadow-2xl text-slate-100">
            <button
              type="button"
              onClick={() => setShowGuideModal(false)}
              className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-2xl">
                📲
              </div>
              <div>
                <h3 className="text-lg font-black text-white">
                  Colocar na Tela Inicial do Tablet
                </h3>
                <p className="text-xs text-emerald-300 font-semibold">
                  Jogue em tela cheia sem barra de navegador!
                </p>
              </div>
            </div>

            {isIos ? (
              <div className="space-y-3 bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-xs">
                <p className="font-bold text-amber-300 flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4" /> No iPad ou iPhone (Safari):
                </p>
                <ol className="space-y-2.5 text-slate-200 list-decimal list-inside font-medium">
                  <li className="flex items-center gap-2">
                    <span>1. Toque no botão</span>
                    <span className="inline-flex items-center gap-1 bg-sky-600/30 border border-sky-400/50 px-2 py-0.5 rounded-lg text-sky-200 font-bold">
                      <Share className="w-3.5 h-3.5" /> Compartilhar
                    </span>
                    <span>na barra do Safari.</span>
                  </li>
                  <li className="flex items-center gap-2 flex-wrap">
                    <span>2. Role o menu e toque em</span>
                    <span className="inline-flex items-center gap-1 bg-emerald-600/30 border border-emerald-400/50 px-2 py-0.5 rounded-lg text-emerald-200 font-bold">
                      <PlusSquare className="w-3.5 h-3.5" /> Adicionar à Tela de Início
                    </span>
                  </li>
                  <li>
                    3. Confirme em <strong>Adicionar</strong> no canto superior direito!
                  </li>
                </ol>
              </div>
            ) : (
              <div className="space-y-3 bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-xs">
                <p className="font-bold text-amber-300 flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4" /> No Tablet Android (Chrome / Samsung):
                </p>
                <ol className="space-y-2.5 text-slate-200 list-decimal list-inside font-medium">
                  <li>
                    Toque no menu de <strong>3 pontinhos (⋮)</strong> no canto superior direito do navegador.
                  </li>
                  <li>
                    Toque em <strong>&quot;Instalar aplicativo&quot;</strong> ou{" "}
                    <strong>&quot;Adicionar à tela inicial&quot;</strong>.
                  </li>
                  <li>
                    Confirme em <strong>Instalar</strong> — o ícone da Pokébola da{" "}
                    <strong>Vila do Saber</strong> aparecerá na tela inicial!
                  </li>
                </ol>
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowGuideModal(false)}
              className="mt-4 w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" /> Entendi!
            </button>
          </div>
        </div>
      )}
    </>
  );
}

