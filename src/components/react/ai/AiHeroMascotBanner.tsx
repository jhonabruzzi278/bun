import React from 'react';
import { Sparkles } from 'lucide-react';

interface AiHeroMascotBannerProps {
  businessName: string;
}

export default function AiHeroMascotBanner({ businessName }: AiHeroMascotBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-white via-[#FAF7F2] to-white dark:from-[#241512] dark:via-[#1F1210] dark:to-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] p-6 md:p-8 shadow-coffee-sm transition-colors">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-5">
          {/* Mascot Avatar */}
          <div className="relative">
            <div className="w-20 h-20 rounded-3xl bg-color4 dark:bg-color3 text-white flex items-center justify-center text-4xl shadow-lg shadow-color4/20 animate-pulse-gentle">
              🐻‍🍳
            </div>
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#241512] flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
            </span>
          </div>

          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#EFE8DF] dark:bg-[#38201C] text-color4 dark:text-color2 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              Mascota Inteligente • Chef Bunito AI
            </div>
            <h1 className="text-2xl font-black text-coffee-950 dark:text-white tracking-tight">
              Centro de Inteligencia & Copiloto Gastronómico
            </h1>
            <p className="text-xs text-[#70645A] dark:text-[#D4C5B9] max-w-xl">
              Monitoreo algorítmico de márgenes, creación de textos para tu carta, ingeniería de menú y recomendaciones tácticas en tiempo real para {businessName}.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-stretch md:self-auto justify-end">
          <div className="px-4 py-2 rounded-2xl bg-white dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-center">
            <span className="block text-[10px] text-[#8C7E73] dark:text-[#A8988B] uppercase font-bold">Estado IA</span>
            <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 justify-center mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Operativo 100%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
