import React, { useState, useEffect } from 'react';
import { Rocket, CheckCircle2, ChevronRight } from 'lucide-react';
import { useCatalogStore } from '@/lib/useCatalogStore';

export default function SidebarProgressRocket({ activePath }: { activePath?: string }) {
  const { onboardingStages, isLoaded } = useCatalogStore();
  const [dataUpdated, setDataUpdated] = useState(0);

  useEffect(() => {
    const handleUpdate = () => setDataUpdated((prev) => prev + 1);
    window.addEventListener('bun:data_updated', handleUpdate);
    return () => window.removeEventListener('bun:data_updated', handleUpdate);
  }, []);

  const allSteps = onboardingStages.flatMap((s) => s.steps);
  const total = allSteps.length || 17;
  const completed = allSteps.filter((s) => s.completed).length;
  const percent = Math.round((completed / total) * 100);
  const isComplete = completed === total;
  const isActive = activePath === '/admin/onboarding';

  return (
    <a
      href="/admin/onboarding"
      className={`relative group overflow-hidden block mx-3 my-2 p-3 rounded-2xl border transition-all duration-300 ${
        isActive
          ? 'bg-gradient-to-r from-brand-950/80 to-slate-900 border-brand-500/50 shadow-lg shadow-brand-500/20'
          : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800 hover:border-brand-500/40'
      }`}
    >
      {/* Background glow effect */}
      <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-brand-500/10 rounded-full blur-xl group-hover:bg-brand-500/20 transition-all pointer-events-none"></div>

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-brand-500 to-amber-400 flex items-center justify-center text-sm shadow-md shadow-brand-500/30 group-hover:scale-110 transition-transform">
            <Rocket className="w-4 h-4 text-white animate-pulse" />
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-1">
              Completar
              <span className="text-[10px] text-brand-400 font-bold">🚀</span>
            </span>
          </div>
        </div>

        <span className="text-[11px] font-extrabold text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded-full border border-brand-500/20">
          {completed}/{total}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1 mt-2.5">
        <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
          <span>Configuración</span>
          <span className="font-bold text-slate-200">{percent}%</span>
        </div>
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand-500 via-amber-400 to-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${percent}%` }}
          ></div>
        </div>
      </div>

      <div className="mt-2.5 flex items-center justify-between text-[10px] font-semibold text-slate-400 group-hover:text-brand-300 transition">
        <span>{isComplete ? '¡Panel al 100%!' : 'Ver 4 etapas y checklist'}</span>
        <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition" />
      </div>
    </a>
  );
}
