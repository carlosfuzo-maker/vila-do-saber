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
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .catch((err) => console.warn("[PWA] Service worker registration warning:", err));
      });
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

export function PwaInstallButton({
  compact = false,
  className = "",
}: {
  compact?: boolean;
  className?: string;
}) {
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

  const defaultClasses = compact
    ? "flex items-center gap-1 px-2.5 py-1 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 border border-emerald-400/60 text-white text-[11px] font-black shadow transition active:scale-95 cursor-pointer"
    : "flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 border border-emerald-400/70 text-white text-xs font-black shadow-md transition active:scale-95 cursor-pointer";

  return (
    <>
      <button
        type="button"
        onClick={handleInstallClick}
        className={className || defaultClasses}
        title="Adicionar Jogo à Tela Inicial do Tablet (PWA)"
      >
        <Download className="w-3.5 h-3.5 text-emerald-200" />
        <span>{hasNativePrompt ? "Instalar App" : "Tela Inicial"}</span>
      </button>

      {showGuideModal && (
        <PwaGuideModal isIos={isIos} onClose={() => setShowGuideModal(false)} />
      )}
    </>
  );
}

export function PwaInstallBanner() {
  const [isStandalone, setIsStandalone] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);
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

    const dismissed = sessionStorage.getItem("pwa_banner_dismissed") === "true";
    setIsDismissed(dismissed);
  }, []);

  if (isStandalone || isDismissed) {
    return null;
  }

  const handleInstall = async () => {
    if (deferredInstallPrompt) {
      try {
        await deferredInstallPrompt.prompt();
        const choice = await deferredInstallPrompt.userChoice;
        if (choice.outcome === "accepted") {
          deferredInstallPrompt = null;
          setIsDismissed(true);
        }
        return;
      } catch (err) {
        console.warn("[PWA] Prompt error:", err);
      }
    }
    setShowGuideModal(true);
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("pwa_banner_dismissed", "true");
    }
  };

  return (
    <>
      <div className="fixed top-2.5 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-lg bg-slate-900/95 backdrop-blur-md border-2 border-emerald-400 rounded-2xl p-2.5 shadow-2xl animate-in slide-in-from-top-4 duration-300 pointer-events-auto">
        <div className="flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-xl shrink-0">
              📲
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-black text-white truncate flex items-center gap-1.5">
                <span>Instalar Vila do Saber no Tablet</span>
                <span className="text-[9px] bg-emerald-500 text-slate-950 px-1 py-0.2 rounded font-bold uppercase">
                  PWA
                </span>
              </h4>
              <p className="text-[10px] text-slate-300 font-medium truncate">
                Jogue em tela cheia (100% horizontal) sem barras de navegador!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleInstall}
              className="px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs rounded-xl shadow-lg active:scale-95 transition cursor-pointer flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Instalar</span>
            </button>
            <button
              onClick={handleDismiss}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              title="Fechar aviso"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {showGuideModal && (
        <PwaGuideModal isIos={isIos} onClose={() => setShowGuideModal(false)} />
      )}
    </>
  );
}

function PwaGuideModal({ isIos, onClose }: { isIos: boolean; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900 border-2 border-emerald-400 rounded-3xl p-5 shadow-2xl text-slate-100">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-2xl shadow-inner">
            📲
          </div>
          <div>
            <h3 className="text-base font-black text-white">
              Como Colocar o App na Tela Inicial
            </h3>
            <p className="text-xs text-emerald-300 font-semibold">
              O jogo rodará como um app nativo em tela cheia!
            </p>
          </div>
        </div>

        {isIos ? (
          <div className="space-y-3 bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-xs">
            <p className="font-bold text-amber-300 flex items-center gap-1.5">
              <Smartphone className="w-4 h-4" /> No iPad ou iPhone (Safari):
            </p>
            <ol className="space-y-2.5 text-slate-200 list-decimal list-inside font-medium">
              <li className="flex items-center gap-1.5 flex-wrap">
                <span>1. Toque no botão</span>
                <span className="inline-flex items-center gap-1 bg-sky-600/30 border border-sky-400/50 px-2 py-0.5 rounded-lg text-sky-200 font-bold">
                  <Share className="w-3.5 h-3.5" /> Compartilhar
                </span>
                <span>(no topo ou rodapé do Safari).</span>
              </li>
              <li className="flex items-center gap-1.5 flex-wrap">
                <span>2. Role o menu para baixo e toque em</span>
                <span className="inline-flex items-center gap-1 bg-emerald-600/30 border border-emerald-400/50 px-2 py-0.5 rounded-lg text-emerald-200 font-bold">
                  <PlusSquare className="w-3.5 h-3.5" /> Adicionar à Tela de Início
                </span>
              </li>
              <li>
                3. Toque em <strong>Adicionar</strong> no canto superior direito para confirmar!
              </li>
            </ol>
          </div>
        ) : (
          <div className="space-y-3 bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-xs">
            <p className="font-bold text-amber-300 flex items-center gap-1.5">
              <Smartphone className="w-4 h-4" /> No Tablet Android (Google Chrome):
            </p>
            <ol className="space-y-2.5 text-slate-200 list-decimal list-inside font-medium">
              <li>
                1. Toque nos <strong>3 pontinhos (⋮)</strong> no canto superior direito do Chrome.
              </li>
              <li>
                2. Toque em <strong>&quot;Instalar aplicativo&quot;</strong> ou{" "}
                <strong>&quot;Adicionar à tela inicial&quot;</strong>.
              </li>
              <li>
                3. Confirme em <strong>Instalar</strong>. O ícone oficial da{" "}
                <strong>Vila do Saber</strong> aparecerá na tela do tablet!
              </li>
            </ol>
          </div>
        )}

        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg active:scale-95 transition cursor-pointer"
        >
          <CheckCircle2 className="w-4 h-4" /> Entendido, vamos lá!
        </button>
      </div>
    </div>
  );
}
