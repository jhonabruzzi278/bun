import React, { useState } from 'react';
import PublicMenuIsland from '../menu/PublicMenuIsland';
import { Smartphone, RefreshCw, ExternalLink } from 'lucide-react';
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
          <h1 className="text-2xl font-extrabold text-white">Simulador Móvil en Vivo</h1>
          <p className="text-sm text-slate-400">
            Comprueba en tiempo real cómo verán tus clientes el menú desde sus teléfonos.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Recargar Vista
          </button>
          <a
            href={`/menu/${business.slug}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-brand-500 hover:bg-brand-600 rounded-xl shadow-md shadow-brand-500/20 transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Abrir en Pestaña Nueva
          </a>
        </div>
      </div>

      {/* Phone Frame Wrapper */}
      <div className="flex justify-center py-6">
        <div className="relative w-full max-w-[390px] h-[780px] bg-black rounded-[48px] p-3.5 shadow-2xl shadow-black/80 ring-1 ring-slate-800 border-4 border-slate-800 flex flex-col">
          
          {/* Dynamic Island / Speaker Notch */}
          <div className="absolute top-6 inset-x-0 mx-auto w-28 h-5 bg-black rounded-full z-50 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-slate-900 mr-2"></div>
            <div className="w-2 h-2 rounded-full bg-slate-800"></div>
          </div>

          {/* Screen Container with Scroll */}
          <div key={key} className="w-full h-full bg-slate-950 rounded-[38px] overflow-y-auto relative scrollbar-none pt-4">
            <PublicMenuIsland />
          </div>

          {/* Home Indicator Bar */}
          <div className="absolute bottom-2 inset-x-0 mx-auto w-32 h-1 bg-slate-700 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
