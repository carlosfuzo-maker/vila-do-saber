import React, { Suspense } from "react";
import { VilaMapa } from "./VilaMapa";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "Mapa da Vila - Vila do Saber",
  description: "Mapa da Vila com as matérias escolares de Bianca (2º ano) e Cecília (4º ano)",
};

function VilaLoading() {
  return (
    <div className="min-h-screen bg-sky-100 flex flex-col items-center justify-center p-6 space-y-4">
      <div className="w-16 h-16 rounded-3xl bg-amber-400 animate-bounce flex items-center justify-center text-white shadow-lg">
        <Sparkles className="w-8 h-8" />
      </div>
      <h2 className="text-xl font-black text-slate-800">
        Carregando o Mapa da Vila do Saber...
      </h2>
      <p className="text-xs text-slate-500 font-bold">
        Preparando os edifícios e missões mágicas
      </p>
    </div>
  );
}

export default function VilaPage() {
  return (
    <Suspense fallback={<VilaLoading />}>
      <VilaMapa />
    </Suspense>
  );
}
