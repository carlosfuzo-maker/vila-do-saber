"use client";

import React, { useState, useEffect } from "react";
import {
  Cloud,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  Database,
  RefreshCw,
  X,
  Lock,
  Eye,
  EyeOff,
  Copy,
  Check,
  Server,
  ShieldCheck,
} from "lucide-react";
import {
  getSupabaseCredentials,
  saveCustomSupabaseConfig,
  testSupabaseConnection,
} from "@/lib/supabaseClient";
import { ProfileId, RpgSaveData } from "../rpgTypes";
import { playSound } from "@/lib/soundEffects";

interface RpgCloudSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeProfile?: RpgSaveData | null;
  onPinUpdated?: (newPin: string) => void;
  onManualSyncTrigger?: () => Promise<void>;
  isSyncing?: boolean;
}

export function RpgCloudSettingsModal({
  isOpen,
  onClose,
  activeProfile,
  onPinUpdated,
  onManualSyncTrigger,
  isSyncing = false,
}: RpgCloudSettingsModalProps) {
  const [activeTab, setActiveTab] = useState<"account" | "cloud" | "sql">("account");

  // Credentials
  const [supabaseUrl, setSupabaseUrl] = useState("");
  const [supabaseAnonKey, setSupabaseAnonKey] = useState("");
  const [testResult, setTestResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  // Change PIN state
  const [currentPinInput, setCurrentPinInput] = useState("");
  const [newPinInput, setNewPinInput] = useState("");
  const [confirmPinInput, setConfirmPinInput] = useState("");
  const [pinFeedback, setPinFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [showPin, setShowPin] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const creds = getSupabaseCredentials();
      setSupabaseUrl(creds.url);
      setSupabaseAnonKey(creds.anonKey);
      setTestResult(null);
      setPinFeedback(null);
      setCurrentPinInput("");
      setNewPinInput("");
      setConfirmPinInput("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      // Temporarily save to test
      saveCustomSupabaseConfig(supabaseUrl, supabaseAnonKey);
      const res = await testSupabaseConnection();
      setTestResult(res);
      if (res.ok) {
        playSound("success");
      } else {
        playSound("pop");
      }
    } finally {
      setIsTesting(false);
    }
  };

  const handleSaveCredentials = () => {
    saveCustomSupabaseConfig(supabaseUrl, supabaseAnonKey);
    playSound("success");
    setTestResult({
      ok: true,
      message: "Configurações salvas no dispositivo! A nuvem será utilizada automaticamente.",
    });
  };

  const handleChangePin = () => {
    if (!activeProfile) {
      setPinFeedback({ success: false, message: "Nenhum perfil ativo selecionado." });
      return;
    }

    if (currentPinInput !== activeProfile.pin) {
      playSound("pop");
      setPinFeedback({ success: false, message: "A senha atual informada está incorreta." });
      return;
    }

    if (newPinInput.length < 4) {
      playSound("pop");
      setPinFeedback({ success: false, message: "A nova senha deve ter no mínimo 4 dígitos ou caracteres." });
      return;
    }

    if (newPinInput !== confirmPinInput) {
      playSound("pop");
      setPinFeedback({ success: false, message: "A confirmação da nova senha não confere." });
      return;
    }

    playSound("fanfare");
    if (onPinUpdated) {
      onPinUpdated(newPinInput);
    }
    setPinFeedback({ success: true, message: "Senha atualizada com sucesso!" });
    setCurrentPinInput("");
    setNewPinInput("");
    setConfirmPinInput("");
  };

  const sqlSample = `-- Tabela Supabase para Vila do Saber (RPG 2D)
CREATE TABLE IF NOT EXISTS public.rpg_profiles (
  id TEXT PRIMARY KEY,
  player_name TEXT NOT NULL,
  year INT NOT NULL,
  pin TEXT NOT NULL DEFAULT '1234',
  x INT NOT NULL DEFAULT 20,
  y INT NOT NULL DEFAULT 29,
  direction TEXT NOT NULL DEFAULT 'up',
  current_zone TEXT NOT NULL DEFAULT 'Vila da Família',
  coins INT NOT NULL DEFAULT 180,
  xp INT NOT NULL DEFAULT 420,
  inventory JSONB NOT NULL DEFAULT '{}'::jsonb,
  pokemon_list JSONB NOT NULL DEFAULT '[]'::jsonb,
  stolen_pokemon_list JSONB NOT NULL DEFAULT '[]'::jsonb,
  unlocked_routes JSONB NOT NULL DEFAULT '{}'::jsonb,
  explorer_skills JSONB NOT NULL DEFAULT '{}'::jsonb,
  gym_badges JSONB NOT NULL DEFAULT '{}'::jsonb,
  customization JSONB NOT NULL DEFAULT '{}'::jsonb,
  unlocked_wardrobe_items JSONB NOT NULL DEFAULT '[]'::jsonb,
  active_quest JSONB DEFAULT NULL,
  phone_messages JSONB NOT NULL DEFAULT '[]'::jsonb,
  rival_config JSONB DEFAULT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.rpg_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Permitir leitura para todos" ON public.rpg_profiles FOR SELECT USING (true);
CREATE POLICY "Permitir gravação para todos" ON public.rpg_profiles FOR ALL USING (true) WITH CHECK (true);`;

  const copySql = () => {
    navigator.clipboard.writeText(sqlSample);
    setCopiedSql(true);
    playSound("click");
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border-2 border-red-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-white backdrop-blur-sm shadow-inner">
              <Cloud className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-wide">
                Configurações de Nuvem & Conta
              </h2>
              <p className="text-xs text-white/80 font-medium">
                Sincronização em nuvem e segurança do save
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              playSound("click");
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex bg-slate-800/80 border-b border-slate-700/60 p-2 gap-2">
          {activeProfile && (
            <button
              onClick={() => setActiveTab("account")}
              className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                activeTab === "account"
                  ? "bg-red-500 text-white shadow-md shadow-red-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-700/40"
              }`}
            >
              <KeyRound className="w-4 h-4" />
              Senha da Jogadora
            </button>
          )}
          <button
            onClick={() => setActiveTab("cloud")}
            className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
              activeTab === "cloud"
                ? "bg-red-500 text-white shadow-md shadow-red-500/20"
                : "text-slate-400 hover:text-white hover:bg-slate-700/40"
            }`}
          >
            <Database className="w-4 h-4" />
            Supabase Nuvem
          </button>
          <button
            onClick={() => setActiveTab("sql")}
            className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
              activeTab === "sql"
                ? "bg-red-500 text-white shadow-md shadow-red-500/20"
                : "text-slate-400 hover:text-white hover:bg-slate-700/40"
            }`}
          >
            <Server className="w-4 h-4" />
            Script SQL
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-200">
          {/* TAB 1: SENHA DO PERFIL */}
          {activeTab === "account" && activeProfile && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center text-2xl font-black text-white shadow-lg">
                  {activeProfile.playerName === "Cecília" ? "⚡" : "🦊"}
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">
                    {activeProfile.playerName} ({activeProfile.year}º Ano)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Último local salvo: <span className="text-emerald-400 font-semibold">{activeProfile.currentZone}</span> (Tile X:{activeProfile.x}, Y:{activeProfile.y})
                  </p>
                </div>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-4 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-400" />
                  Alterar Senha / PIN de Entrada
                </h4>
                <p className="text-xs text-slate-400">
                  Defina um PIN de 4 dígitos ou senha para que apenas você acerte seu progresso.
                </p>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300">Senha Atual:</label>
                  <div className="relative">
                    <input
                      type={showPin ? "text" : "password"}
                      value={currentPinInput}
                      onChange={(e) => setCurrentPinInput(e.target.value)}
                      placeholder="Digite a senha atual (padrão 4444 ou 2222)"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Nova Senha / PIN:</label>
                    <input
                      type={showPin ? "text" : "password"}
                      value={newPinInput}
                      onChange={(e) => setNewPinInput(e.target.value)}
                      placeholder="Mínimo 4 dígitos"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Confirmar Nova Senha:</label>
                    <input
                      type={showPin ? "text" : "password"}
                      value={confirmPinInput}
                      onChange={(e) => setConfirmPinInput(e.target.value)}
                      placeholder="Repita a nova senha"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5"
                  >
                    {showPin ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    {showPin ? "Ocultar Senhas" : "Ver Senhas"}
                  </button>

                  <button
                    type="button"
                    onClick={handleChangePin}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-95 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Salvar Nova Senha
                  </button>
                </div>

                {pinFeedback && (
                  <div
                    className={`p-3 rounded-xl text-xs font-medium flex items-center gap-2 ${
                      pinFeedback.success
                        ? "bg-emerald-950/60 border border-emerald-500/40 text-emerald-300"
                        : "bg-red-950/60 border border-red-500/40 text-red-300"
                    }`}
                  >
                    {pinFeedback.success ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                    )}
                    <span>{pinFeedback.message}</span>
                  </div>
                )}
              </div>

              {/* Manual Cloud Sync Action */}
              {onManualSyncTrigger && (
                <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 flex items-center justify-between">
                  <div>
                    <h5 className="text-sm font-bold text-white">Sincronização Manual</h5>
                    <p className="text-xs text-slate-400">
                      Forçar envio de todo o estado atual para o banco Supabase agora.
                    </p>
                  </div>
                  <button
                    onClick={onManualSyncTrigger}
                    disabled={isSyncing}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin" : ""}`} />
                    {isSyncing ? "Salvando..." : "Sincronizar Nuvem"}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SUPABASE NUVEM */}
          {activeTab === "cloud" && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-500/30 flex items-start gap-3">
                <Database className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-blue-200 leading-relaxed">
                  <strong className="text-white block font-semibold mb-1">
                    Persistência Global em Nuvem com Supabase
                  </strong>
                  Ao conectar o Supabase, o progresso das meninas é gravado online. Elas podem jogar no iPad, no computador ou em qualquer tablet e continuar exatamente do mesmo tile onde pararam.
                </div>
              </div>

              <div className="space-y-3 bg-slate-800/40 border border-slate-700/60 rounded-2xl p-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">
                    Supabase Project URL:
                  </label>
                  <input
                    type="text"
                    value={supabaseUrl}
                    onChange={(e) => setSupabaseUrl(e.target.value)}
                    placeholder="https://xyzcompany.supabase.co"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">
                    Supabase Anon Public API Key:
                  </label>
                  <input
                    type="password"
                    value={supabaseAnonKey}
                    onChange={(e) => setSupabaseAnonKey(e.target.value)}
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={handleTestConnection}
                    disabled={isTesting || !supabaseUrl || !supabaseAnonKey}
                    className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 active:scale-95 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? "animate-spin" : ""}`} />
                    {isTesting ? "Testando..." : "Testar Conexão"}
                  </button>

                  <button
                    onClick={handleSaveCredentials}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 active:scale-95 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Salvar Credenciais
                  </button>
                </div>

                {testResult && (
                  <div
                    className={`p-3 rounded-xl text-xs font-medium flex items-center gap-2 mt-2 ${
                      testResult.ok
                        ? "bg-emerald-950/60 border border-emerald-500/40 text-emerald-300"
                        : "bg-amber-950/60 border border-amber-500/40 text-amber-300"
                    }`}
                  >
                    {testResult.ok ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    )}
                    <span>{testResult.message}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: SCRIPT SQL */}
          {activeTab === "sql" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Script SQL do Supabase</h4>
                  <p className="text-xs text-slate-400">
                    Copie e execute este código no SQL Editor do seu projeto Supabase para criar a tabela.
                  </p>
                </div>
                <button
                  onClick={copySql}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 active:scale-95 text-xs text-white font-semibold flex items-center gap-1.5 transition-all shadow"
                >
                  {copiedSql ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copiar SQL
                    </>
                  )}
                </button>
              </div>

              <div className="relative bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono text-[11px] text-emerald-400 max-h-60 overflow-y-auto leading-relaxed select-all">
                <pre>{sqlSample}</pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-end">
          <button
            onClick={() => {
              playSound("click");
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition-all"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
