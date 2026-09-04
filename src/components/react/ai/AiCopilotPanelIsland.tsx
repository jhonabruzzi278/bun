import React from 'react';
import { useCatalogStore } from '@/lib/useCatalogStore';
import { Bot, Award, Sparkles, TrendingUp } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui';

import AiHeroMascotBanner from './AiHeroMascotBanner';
import AiChatSection from './AiChatSection';
import AiMenuEngineeringMatrix from './AiMenuEngineeringMatrix';
import AiCopywritingGenerator from './AiCopywritingGenerator';
import AiDemandForecast from './AiDemandForecast';

export default function AiCopilotPanelIsland() {
  const { business, products } = useCatalogStore();

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* 1. Hero Mascot Banner */}
      <AiHeroMascotBanner businessName={business.name} />

      {/* 2. Apple Segmented Control Tabs */}
      <Tabs defaultValue="chat" className="w-full space-y-6">
        <div className="overflow-x-auto pb-1">
          <TabsList className="bg-black/30 dark:bg-white/[0.04] border border-white/[0.08] p-1.5 rounded-2xl h-auto inline-flex gap-1 backdrop-blur-xl">
            <TabsTrigger
              value="chat"
              className="flex items-center gap-2 rounded-xl text-xs py-2 px-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-amber-600 data-[state=active]:text-black font-bold transition-all duration-200"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Chat con Brew</span>
            </TabsTrigger>

            <TabsTrigger
              value="menu_engineering"
              className="flex items-center gap-2 rounded-xl text-xs py-2 px-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-amber-600 data-[state=active]:text-black font-bold transition-all duration-200"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Ingeniería de Menú</span>
            </TabsTrigger>

            <TabsTrigger
              value="generator"
              className="flex items-center gap-2 rounded-xl text-xs py-2 px-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-amber-600 data-[state=active]:text-black font-bold transition-all duration-200"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Generador de Copy</span>
            </TabsTrigger>

            <TabsTrigger
              value="forecast"
              className="flex items-center gap-2 rounded-xl text-xs py-2 px-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-amber-600 data-[state=active]:text-black font-bold transition-all duration-200"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Previsión de Demanda</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* 3. Tab Sub-Sections */}
        <TabsContent value="chat" className="mt-0">
          <AiChatSection businessName={business.name} />
        </TabsContent>

        <TabsContent value="menu_engineering" className="mt-0">
          <AiMenuEngineeringMatrix />
        </TabsContent>

        <TabsContent value="generator" className="mt-0">
          <AiCopywritingGenerator products={products} />
        </TabsContent>

        <TabsContent value="forecast" className="mt-0">
          <AiDemandForecast />
        </TabsContent>
      </Tabs>
    </div>
  );
}
