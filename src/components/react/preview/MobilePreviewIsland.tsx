import React, { useState } from 'react';
import PublicMenuIsland from '../menu/PublicMenuIsland';
import { RefreshCw, ExternalLink } from 'lucide-react';
import { useCatalogStore } from '@/lib/useCatalogStore';

export default function MobilePreviewIsland() {
  const { business } = useCatalogStore();
  const [key, setKey] = useState(0);

  const handleRefresh = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-coffee-950 dark:text-white">
            Simulador Móvil en Vivo
          </h1>
          <p className="text-xs sm:text-sm text-[#70645A] dark:text-[#A8988B] mt-0.5">
            Comprueba en tiempo real cómo verán tus comensales la carta digital desde sus teléfonos.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleRefresh}
            className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-coffee-800 dark:text-[#E8DFD8] bg-white dark:bg-[#241512] hover:bg-[#FAF7F2] dark:hover:bg-[#2F1B17] rounded-xl border border-[#EAE1D6] dark:border-[#3D2420] shadow-coffee-sm transition"
          >
            <RefreshCw className="w-3.5 h-3.5 text-color3" />
            Recargar Vista
          </button>
          <a
            href={`/menu/${business.slug}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-color4 hover:bg-[#522B2B] dark:bg-color3 dark:hover:bg-color4 rounded-xl shadow-coffee-sm transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Abrir en Pestaña Nueva
          </a>
        </div>
      </div>

      {/* Phone Frame Wrapper with Warm Coffee Chassis */}
      <div className="flex justify-center py-4">
        <div className="relative w-full max-w-[390px] h-[780px] bg-[#241512] dark:bg-[#1A0E0C] rounded-[48px] p-3.5 shadow-2xl ring-1 ring-[#4D2D26] border-4 border-[#3D2420] flex flex-col">
          
          {/* Dynamic Island / Notch */}
          <div className="absolute top-6 inset-x-0 mx-auto w-28 h-5 bg-[#170D0B] rounded-full z-50 flex items-center justify-center border border-[#3D2420]/50">
            <div className="w-2.5 h-2.5 rounded-full bg-[#2F1B17] mr-2"></div>
            <div className="w-2 h-2 rounded-full bg-[#4D2D26]"></div>
          </div>

          {/* Screen Container */}
          <div key={key} className="w-full h-full bg-[#180E0C] rounded-[38px] overflow-y-auto relative scrollbar-none pt-4">
            <PublicMenuIsland />
          </div>

          {/* Home Indicator Bar */}
          <div className="absolute bottom-2 inset-x-0 mx-auto w-32 h-1 bg-[#4D2D26] rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
