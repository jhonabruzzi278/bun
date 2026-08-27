import React, { useState } from 'react';
import { useCatalogStore } from '@/lib/useCatalogStore';
import { Bot, Award, Sparkles, TrendingUp } from 'lucide-react';

import AiHeroMascotBanner from './AiHeroMascotBanner';
import AiChatSection from './AiChatSection';
import AiMenuEngineeringMatrix from './AiMenuEngineeringMatrix';
import AiCopywritingGenerator from './AiCopywritingGenerator';
import AiDemandForecast from './AiDemandForecast';

export default function AiCopilotPanelIsland() {
  const { business, products } = useCatalogStore();
  const [activeTab, setActiveTab] = useState<'chat' | 'menu_engineering' | 'generator' | 'forecast'>('chat');

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* 1. Hero Mascot Banner */}
      <AiHeroMascotBanner businessName={business.name} />

      {/* 2. Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#EAE1D6] dark:border-[#3D2420] pb-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('chat')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'chat'
              ? 'bg-color4 text-white shadow-coffee-sm'
              : 'text-[#70645A] dark:text-[#A8988B] hover:bg-[#FAF7F2] dark:hover:bg-[#241512]'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>Chat con Chef Bunito</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('menu_engineering')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'menu_engineering'
              ? 'bg-color4 text-white shadow-coffee-sm'
              : 'text-[#70645A] dark:text-[#A8988B] hover:bg-[#FAF7F2] dark:hover:bg-[#241512]'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Ingeniería de Menú (Estrellas & Rentabilidad)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('generator')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'generator'
              ? 'bg-color4 text-white shadow-coffee-sm'
              : 'text-[#70645A] dark:text-[#A8988B] hover:bg-[#FAF7F2] dark:hover:bg-[#241512]'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Generador de Textos & Copy</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('forecast')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'forecast'
              ? 'bg-color4 text-white shadow-coffee-sm'
              : 'text-[#70645A] dark:text-[#A8988B] hover:bg-[#FAF7F2] dark:hover:bg-[#241512]'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Previsión de Demanda</span>
        </button>
      </div>

      {/* 3. Tab Sub-Sections */}
      {activeTab === 'chat' && <AiChatSection businessName={business.name} />}
      {activeTab === 'menu_engineering' && <AiMenuEngineeringMatrix />}
      {activeTab === 'generator' && <AiCopywritingGenerator products={products} />}
      {activeTab === 'forecast' && <AiDemandForecast />}
    </div>
  );
}
