"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Sparkles,
  Lock,
  Unlock,
  Shield,
  KeyRound,
  Cloud,
  ChevronRight,
  Award,
  Coins,
  MapPin,
  RefreshCw,
  Settings,
  AlertCircle,
  CheckCircle2,
  Backpack,
  ArrowRight,
  Database,
} from "lucide-react";
import { ProfileId, RpgSaveData } from "../rpgTypes";
import {
  getSupabaseCredentials,
  loadProfileSave,
  getDefaultProfileSave,
  resetAllProfilesToZero,
} from "@/lib/supabaseClient";
import { playSound } from "@/lib/soundEffects";
import { RpgCloudSettingsModal } from "./RpgCloudSettingsModal";
import { PwaInstallButton } from "@/app/components/PwaManager";

interface RpgLoginScreenProps {
  onLoginSuccess: (saveData: RpgSaveData, fromCloud: boolean) => void;
}

export function RpgLoginScreen({ onLoginSuccess }: RpgLoginScreenProps) {
  // Profiles preview data
  const [ceciliaSave, setCeciliaSave] = useState<RpgSaveData | null>(null);
  const [biancaSave, setBiancaSave] = useState<RpgSaveData | null>(null);
  const [isLoadingPreviews, setIsLoadingPreviews] = useState<boolean>(true);

  // Selected Profile for PIN entry
  const [selectedProfileId, setSelectedProfileId] = useState<ProfileId | null>(null);
  const [pinInput, setPinInput] = useState<string>("");
  const [pinError, setPinError] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  // Cloud status
  const [isCloudConfigured, setIsCloudConfigured] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState<boolean>(false);
  const [isResettingAll, setIsResettingAll] = useState<boolean>(false);
  const [resetSuccessBanner, setResetSuccessBanner] = useState<string | null>(null);

  // Load preview saves for both profiles on mount
  const refreshProfiles = useCallback(async () => {
    setIsLoadingPreviews(true);
    const creds = getSupabaseCredentials();
    setIsCloudConfigured(Boolean(creds.url && creds.anonKey));

    try {
      const [cRes, bRes] = await Promise.all([
        loadProfileSave("cecilia"),
        loadProfileSave("bianca"),
      ]);
      setCeciliaSave(cRes.data);
      setBiancaSave(bRes.data);
    } catch (e) {
      console.warn("Failed to load profiles preview:", e);
      setCeciliaSave(getDefaultProfileSave("cecilia"));
      setBiancaSave(getDefaultProfileSave("bianca"));
    } finally {
      setIsLoadingPreviews(false);
    }
  }, []);

  useEffect(() => {
    refreshProfiles();
  }, [refreshProfiles]);

  // Handle number pad click
  const handleKeypadPress = (val: string) => {
    playSound("click");
    setPinError(null);
    if (val === "backspace") {
      setPinInput((prev) => prev.slice(0, -1));
      return;
    }
    if (val === "clear") {
      setPinInput("");
      return;
    }
    if (pinInput.length < 8) {
      setPinInput((prev) => prev + val);
    }
  };

  // Process login submission
  const handleAttemptLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!selectedProfileId) return;

    const currentSave = selectedProfileId === "cecilia" ? ceciliaSave : biancaSave;
    if (!currentSave) return;

    setIsLoggingIn(true);
    setPinError(null);

    // Fetch freshest save from Supabase/cache to verify PIN
    try {
      const { data: freshSave, fromCloud } = await loadProfileSave(selectedProfileId);
      const expectedPin = freshSave.pin || (selectedProfileId === "cecilia" ? "4444" : "2222");

      if (pinInput === expectedPin || pinInput === "1234") {
        playSound("fanfare");
        onLoginSuccess(freshSave, fromCloud);
      } else {
        playSound("pop");
        setIsShaking(true);
        setPinError(
          `Senha incorreta! Dica: a senha padrão de ${freshSave.playerName} é "${
            selectedProfileId === "cecilia" ? "4444" : "2222"
          }" (ou 1234).`
        );
        setTimeout(() => setIsShaking(false), 600);
      }
    } catch (err: any) {
      setPinError("Erro ao validar login. Tente novamente.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Keyboard navigation for PIN entry
  useEffect(() => {
    if (!selectedProfileId) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") {
        handleKeypadPress(e.key);
      } else if (e.key === "Backspace") {
        handleKeypadPress("backspace");
      } else if (e.key === "Enter") {
        handleAttemptLogin();
      } else if (e.key === "Escape") {
        setSelectedProfileId(null);
        setPinInput("");
        setPinError(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProfileId, pinInput, ceciliaSave, biancaSave]);

  const activeProfileData = selectedProfileId === "cecilia" ? ceciliaSave : biancaSave;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950 overflow-y-auto select-none">
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/40 via-slate-950 to-slate-950 -z-10" />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center my-auto py-1">
        {/* Game Title & Branding Header (Compact for Landscape Tablets) */}
        <div className="text-center mb-3 sm:mb-5 space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/40 text-red-300 text-[11px] sm:text-xs font-bold tracking-widest uppercase shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Vila do Saber • FireRed Edition
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-red-400 tracking-tight drop-shadow-md">
            Mundo RPG Escolar
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto font-medium">
            Toque na sua Treinadora para começar sua jornada no tablet!
          </p>
        </div>

        {resetSuccessBanner && (
          <div className="w-full max-w-3xl mb-3 px-4 py-2.5 rounded-2xl bg-emerald-950/90 border-2 border-emerald-400 text-emerald-200 text-xs font-black flex items-center justify-between shadow-lg">
            <span>{resetSuccessBanner}</span>
            <button
              onClick={() => setResetSuccessBanner(null)}
              className="px-2 py-0.5 rounded bg-emerald-800 text-white text-[11px]"
            >
              OK
            </button>
          </div>
        )}

        {/* Profile Selection Grid (2 columns in Landscape Tablet & Desktop) */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 max-w-3xl mb-4">
          {/* CECÍLIA PROFILE CARD */}
          <div
            onClick={() => {
              playSound("click");
              setSelectedProfileId("cecilia");
              setPinInput("");
              setPinError(null);
            }}
            className={`group relative rounded-3xl p-5 sm:p-6 cursor-pointer transition-all duration-300 border-2 overflow-hidden ${
              selectedProfileId === "cecilia"
                ? "bg-slate-900/95 border-amber-400 shadow-2xl shadow-amber-500/30 scale-[1.02]"
                : "bg-slate-900/80 border-slate-700/70 hover:border-amber-400/80 hover:bg-slate-900 shadow-xl hover:scale-[1.01]"
            }`}
          >
            {/* Top Card Badge */}
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center gap-1.5">
                <span>⚡</span> 4º Ano Fundamental
              </span>
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-amber-400" /> Protegido
              </span>
            </div>

            {/* Profile Avatar & Name */}
            <div className="flex items-center gap-4 mb-5">
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-red-600 flex items-center justify-center text-3xl sm:text-4xl shadow-lg ring-4 ring-amber-400/20">
                  ⚡
                </div>
                <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-slate-950 border-2 border-amber-400 flex items-center justify-center text-xs font-black text-amber-300">
                  4º
                </div>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-amber-300 transition-colors">
                  Cecília
                </h3>
                <p className="text-xs sm:text-sm text-amber-200/80 font-medium">
                  {ceciliaSave?.pokemonList && ceciliaSave.pokemonList.length > 0
                    ? `Treinadora • Parceiro ${ceciliaSave.pokemonList[0].name}`
                    : "Iniciando Jornada • 4º Ano BNCC"}
                </p>
              </div>
            </div>

            {/* Summary Details */}
            {isLoadingPreviews ? (
              <div className="py-4 text-center text-xs text-slate-400 animate-pulse">
                Carregando dados do save...
              </div>
            ) : (
              <div className="space-y-2.5 pt-2 border-t border-slate-800 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-red-400" /> Local:
                  </span>
                  <span className="font-semibold text-white truncate max-w-[170px]">
                    {ceciliaSave?.currentZone || "Casa da Família • Quarto das Meninas"}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Coins className="w-3.5 h-3.5 text-amber-400" /> Recursos:
                  </span>
                  <span className="font-semibold text-amber-300">
                    {ceciliaSave?.coins ?? 50} Moedas • {ceciliaSave?.xp ?? 0} EXP
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Award className="w-3.5 h-3.5 text-emerald-400" /> Equipe:
                  </span>
                  <span className="font-semibold text-emerald-400">
                    {ceciliaSave?.pokemonList && ceciliaSave.pokemonList.length > 0
                      ? `${ceciliaSave.pokemonList.length} Pokémon (${ceciliaSave.pokemonList[0].name} Nv.${ceciliaSave.pokemonList[0].level})`
                      : "Aguardando Escolha com Papai Carlos"}
                  </span>
                </div>
              </div>
            )}

            {/* Action CTA */}
            <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-amber-400 font-bold text-xs group-hover:translate-x-1 transition-transform">
              <span>Digitar Senha para Jogar</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* BIANCA PROFILE CARD */}
          <div
            onClick={() => {
              playSound("click");
              setSelectedProfileId("bianca");
              setPinInput("");
              setPinError(null);
            }}
            className={`group relative rounded-3xl p-5 sm:p-6 cursor-pointer transition-all duration-300 border-2 overflow-hidden ${
              selectedProfileId === "bianca"
                ? "bg-slate-900/95 border-emerald-400 shadow-2xl shadow-emerald-500/30 scale-[1.02]"
                : "bg-slate-900/80 border-slate-700/70 hover:border-emerald-400/80 hover:bg-slate-900 shadow-xl hover:scale-[1.01]"
            }`}
          >
            {/* Top Card Badge */}
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center gap-1.5">
                <span>🦊</span> 2º Ano Fundamental
              </span>
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-emerald-400" /> Protegido
              </span>
            </div>

            {/* Profile Avatar & Name */}
            <div className="flex items-center gap-4 mb-5">
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 flex items-center justify-center text-3xl sm:text-4xl shadow-lg ring-4 ring-emerald-400/20">
                  🦊
                </div>
                <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-slate-950 border-2 border-emerald-400 flex items-center justify-center text-xs font-black text-emerald-300">
                  2º
                </div>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-emerald-300 transition-colors">
                  Bianca
                </h3>
                <p className="text-xs sm:text-sm text-emerald-200/80 font-medium">
                  {biancaSave?.pokemonList && biancaSave.pokemonList.length > 0
                    ? `Treinadora • Parceira ${biancaSave.pokemonList[0].name}`
                    : "Iniciando Jornada • 2º Ano BNCC"}
                </p>
              </div>
            </div>

            {/* Summary Details */}
            {isLoadingPreviews ? (
              <div className="py-4 text-center text-xs text-slate-400 animate-pulse">
                Carregando dados do save...
              </div>
            ) : (
              <div className="space-y-2.5 pt-2 border-t border-slate-800 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-red-400" /> Local:
                  </span>
                  <span className="font-semibold text-white truncate max-w-[170px]">
                    {biancaSave?.currentZone || "Casa da Família • Quarto das Meninas"}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Coins className="w-3.5 h-3.5 text-amber-400" /> Recursos:
                  </span>
                  <span className="font-semibold text-amber-300">
                    {biancaSave?.coins ?? 50} Moedas • {biancaSave?.xp ?? 0} EXP
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Award className="w-3.5 h-3.5 text-emerald-400" /> Equipe:
                  </span>
                  <span className="font-semibold text-emerald-400">
                    {biancaSave?.pokemonList && biancaSave.pokemonList.length > 0
                      ? `${biancaSave.pokemonList.length} Pokémon (${biancaSave.pokemonList[0].name} Nv.${biancaSave.pokemonList[0].level})`
                      : "Aguardando Escolha com Papai Carlos"}
                  </span>
                </div>
              </div>
            )}

            {/* Action CTA */}
            <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-emerald-400 font-bold text-xs group-hover:translate-x-1 transition-transform">
              <span>Digitar Senha para Jogar</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* PIN / PASSWORD ENTRY MODAL (OVERLAY WHEN A PROFILE IS SELECTED) */}
        {selectedProfileId && activeProfileData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
            <div
              className={`relative w-full max-w-md bg-slate-900 border-2 rounded-3xl p-6 shadow-2xl flex flex-col items-center ${
                selectedProfileId === "cecilia"
                  ? "border-amber-400/80 shadow-amber-500/20"
                  : "border-emerald-400/80 shadow-emerald-500/20"
              } ${isShaking ? "animate-bounce" : ""}`}
            >
              {/* Close PIN pad button */}
              <button
                onClick={() => {
                  playSound("click");
                  setSelectedProfileId(null);
                  setPinInput("");
                  setPinError(null);
                }}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>

              {/* Character Avatar in PIN Modal */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 border-2 border-slate-700 flex items-center justify-center text-3xl shadow-inner mb-3">
                {selectedProfileId === "cecilia" ? "⚡" : "🦊"}
              </div>

              <h2 className="text-2xl font-black text-white text-center">
                Entrar como {activeProfileData.playerName}
              </h2>
              <p className="text-xs text-slate-400 text-center mb-5">
                Digite a senha de 4 dígitos para carregar o seu jogo
              </p>

              {/* PIN Display Dots */}
              <div className="flex items-center justify-center gap-3 mb-4">
                {[0, 1, 2, 3].map((idx) => {
                  const hasDigit = pinInput.length > idx;
                  return (
                    <div
                      key={idx}
                      className={`w-12 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold font-mono transition-all duration-200 border-2 ${
                        hasDigit
                          ? selectedProfileId === "cecilia"
                            ? "bg-amber-500/20 border-amber-400 text-amber-300 shadow-md shadow-amber-400/30 scale-105"
                            : "bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-md shadow-emerald-400/30 scale-105"
                          : "bg-slate-950 border-slate-800 text-slate-600"
                      }`}
                    >
                      {hasDigit ? "●" : "·"}
                    </div>
                  );
                })}
              </div>

              {/* Error Message */}
              {pinError && (
                <div className="w-full mb-4 p-3 rounded-xl bg-red-950/70 border border-red-500/50 text-red-300 text-xs text-center flex items-center justify-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
                  <span>{pinError}</span>
                </div>
              )}

              {/* Touch Numeric Keypad */}
              <div className="w-full grid grid-cols-3 gap-2.5 mb-5 max-w-xs">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "clear", "0", "backspace"].map(
                  (key) => {
                    const isClear = key === "clear";
                    const isBack = key === "backspace";
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => handleKeypadPress(key)}
                        className={`h-12 sm:h-14 rounded-2xl font-black text-lg transition-all active:scale-95 flex items-center justify-center shadow-sm select-none ${
                          isClear
                            ? "bg-slate-800/80 hover:bg-slate-700 text-slate-400 text-xs uppercase tracking-wider"
                            : isBack
                            ? "bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-base"
                            : "bg-slate-800 hover:bg-slate-700/80 text-white border border-slate-700/60 hover:border-slate-500 text-xl"
                        }`}
                      >
                        {isClear ? "Limpar" : isBack ? "⌫" : key}
                      </button>
                    );
                  }
                )}
              </div>

              {/* Confirm Login Button */}
              <button
                type="button"
                onClick={() => handleAttemptLogin()}
                disabled={pinInput.length < 4 || isLoggingIn}
                className={`w-full max-w-xs py-3.5 rounded-2xl font-black text-sm tracking-wide uppercase transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95 disabled:opacity-40 disabled:pointer-events-none ${
                  selectedProfileId === "cecilia"
                    ? "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white shadow-amber-500/25"
                    : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-emerald-500/25"
                }`}
              >
                {isLoggingIn ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Carregando Save...
                  </>
                ) : (
                  <>
                    <Unlock className="w-4 h-4" />
                    Entrar no Jogo
                  </>
                )}
              </button>

              <div className="mt-4 text-center">
                <p className="text-[11px] text-slate-500">
                  Senha padrão:{" "}
                  <strong className="text-slate-300">
                    {selectedProfileId === "cecilia" ? "4444" : "2222"}
                  </strong>{" "}
                  • Pode ser alterada nas opções.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Cloud Status Bar + PWA Install + Reset Zero Button */}
        <div className="w-full max-w-3xl flex flex-wrap items-center justify-between gap-2.5 px-4 py-2.5 rounded-2xl bg-slate-900/70 border border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isCloudConfigured ? "bg-emerald-400 shadow-sm shadow-emerald-400/50" : "bg-amber-400"
              }`}
            />
            <span className="text-slate-300 font-medium">
              {isCloudConfigured ? (
                <span className="text-emerald-300 font-semibold flex items-center gap-1.5">
                  <Cloud className="w-3.5 h-3.5" /> Nuvem Supabase Ativa
                </span>
              ) : (
                <span className="text-amber-300 font-semibold flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5" /> Modo Local (Salvo no Tablet)
                </span>
              )}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <PwaInstallButton />

            <button
              type="button"
              onClick={() => {
                playSound("click");
                setIsResetConfirmOpen(true);
              }}
              className="px-3 py-1.5 rounded-xl bg-rose-950/90 hover:bg-rose-900 border border-rose-500/50 text-rose-200 hover:text-white font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
              title="Reiniciar o progresso de Cecília e Bianca do zero"
            >
              <RefreshCw className="w-3.5 h-3.5 text-rose-400" />
              <span>Resetar Jogo do Zero</span>
            </button>

            <button
              onClick={() => {
                playSound("click");
                setIsSettingsOpen(true);
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Nuvem / Supabase</span>
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal to Reset Both Sisters to Zero */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-slate-900 border-2 border-rose-500 rounded-3xl p-6 shadow-2xl text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-500/20 border border-rose-400/50 flex items-center justify-center text-3xl">
              🔄
            </div>
            <h3 className="text-xl font-black text-white">
              Resetar Jogo do Zero (Bianca &amp; Cecília)?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Isso reiniciará o progresso das duas irmãs (<strong>Cecília</strong> e{" "}
              <strong>Bianca</strong>) tanto neste tablet quanto na nuvem Supabase. Ambas começarão do zero no{" "}
              <strong>2º Andar da Casa da Família</strong> para escolher o 1º Pokémon Inicial e fazer a{" "}
              <strong>1ª Missão Obrigatória</strong>!
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsResetConfirmOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={isResettingAll}
                onClick={async () => {
                  setIsResettingAll(true);
                  playSound("fanfare");
                  const res = await resetAllProfilesToZero();
                  await refreshProfiles();
                  setIsResettingAll(false);
                  setIsResetConfirmOpen(false);
                  setResetSuccessBanner(
                    res.cloudReset
                      ? "✅ Jogo resetado do zero para Cecília e Bianca (Tablet + Nuvem Supabase)!"
                      : "✅ Jogo resetado do zero para Cecília e Bianca neste tablet!"
                  );
                }}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-black text-xs shadow-lg cursor-pointer"
              >
                {isResettingAll ? "Resetando..." : "Sim, Resetar Tudo do Zero!"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cloud & PIN Settings Modal */}
      <RpgCloudSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => {
          setIsSettingsOpen(false);
          refreshProfiles();
        }}
      />
    </div>
  );
}
