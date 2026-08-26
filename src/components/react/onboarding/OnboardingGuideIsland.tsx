import React, { useState } from 'react';
import { useCatalogStore } from '@/lib/useCatalogStore';
import {
  Rocket,
  CheckCircle2,
  Circle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
  UserCheck,
  UtensilsCrossed,
  Smartphone,
  Bot,
  Receipt,
  Truck,
  CreditCard,
  Clock,
  MapPin,
  Globe,
  Award,
  Ticket,
  Share2,
  Users,
  ChefHat,
  Wallet,
  Boxes,
  Smile,
  ArrowRight
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  UserCheck,
  UtensilsCrossed,
  Smartphone,
  Bot,
  Receipt,
  Truck,
  CreditCard,
  Clock,
  MapPin,
  Globe,
  Award,
  Ticket,
  Share2,
  Users,
  ChefHat,
  Wallet,
  Boxes,
};

export default function OnboardingGuideIsland() {
  const { business, onboardingStages, toggleOnboardingStep, isLoaded } = useCatalogStore();
  const [expandedStages, setExpandedStages] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true,
  });

  if (!isLoaded) {
    return <div className="p-8 text-slate-400 text-sm">Cargando guía de configuración...</div>;
  }

  // Calculate totals
  const allSteps = onboardingStages.flatMap((s) => s.steps);
  const totalSteps = allSteps.length;
  const completedCount = allSteps.filter((s) => s.completed).length;
  const progressPercent = Math.round((completedCount / totalSteps) * 100);

  const toggleStageExpand = (stageId: number) => {
    setExpandedStages((prev) => ({ ...prev, [stageId]: !prev[stageId] }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Welcome & Intro Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6 sm:p-8 border border-slate-800 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              Guía de Configuración Inicial
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
              Bienvenido, Jonathan guerra <span className="inline-block animate-bounce">👋</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Aquí encontrarás una guía sencilla para configurar tu panel. Sigue estos pasos para personalizar tu experiencia y aprovechar al máximo todas las funcionalidades que ofrecemos. ¡Comencemos!
            </p>
          </div>

          <div className="flex flex-col items-center justify-center p-4 bg-slate-900/80 rounded-2xl border border-slate-800/80 shrink-0 text-center min-w-[170px]">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🚀</span>
              <span className="text-2xl">😎</span>
            </div>
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Pasos completados</span>
            <span className="text-xl font-black text-brand-400 mt-0.5">
              {completedCount} de {totalSteps}
            </span>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-6 pt-6 border-t border-slate-800/80">
          <div className="flex items-center justify-between text-xs font-bold mb-2">
            <span className="text-slate-400">Progreso general de tu restaurante</span>
            <span className="text-brand-400 font-extrabold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-800/80 rounded-full h-3 p-0.5 overflow-hidden border border-slate-700/50">
            <div
              className="bg-gradient-to-r from-brand-500 via-amber-400 to-emerald-400 h-full rounded-full transition-all duration-700 shadow-md shadow-brand-500/30"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Stages List */}
      <div className="space-y-6">
        {onboardingStages.map((stage) => {
          const isExpanded = !!expandedStages[stage.id];
          const stageCompletedCount = stage.steps.filter((s) => s.completed).length;
          const stageTotal = stage.steps.length;
          const isStageAllDone = stageCompletedCount === stageTotal;

          return (
            <div
              key={stage.id}
              className="rounded-2xl bg-slate-950 border border-slate-800/90 overflow-hidden shadow-lg transition-all"
            >
              {/* Stage Header */}
              <button
                type="button"
                onClick={() => toggleStageExpand(stage.id)}
                className="w-full px-6 py-4 flex items-center justify-between bg-slate-900/60 hover:bg-slate-900 transition text-left border-b border-slate-800/60"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                    isStageAllDone
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-brand-500/20 text-brand-400 border border-brand-500/30'
                  }`}>
                    {stage.id}
                  </span>
                  <div>
                    <h2 className="text-base font-bold text-white tracking-tight">
                      {stage.title}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    isStageAllDone
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-300 border border-slate-700'
                  }`}>
                    {stageCompletedCount}/{stageTotal}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </button>

              {/* Stage Steps Container */}
              {isExpanded && (
                <div className="p-4 sm:p-6 divide-y divide-slate-800/50">
                  {stage.steps.map((step) => {
                    const IconComponent = iconMap[step.iconName || ''] || Sparkles;

                    return (
                      <div
                        key={step.id}
                        className={`py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl px-3 transition-colors ${
                          step.completed ? 'bg-slate-900/20' : 'hover:bg-slate-900/40'
                        }`}
                      >
                        <div className="flex items-start gap-3.5 flex-1 min-w-0">
                          {/* Interactive Checkbox */}
                          <button
                            type="button"
                            onClick={() => toggleOnboardingStep(step.id)}
                            className="mt-0.5 shrink-0 focus:outline-none transition group"
                            title={step.completed ? 'Marcar como pendiente' : 'Marcar como completado'}
                          >
                            {step.completed ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition" />
                            ) : (
                              <Circle className="w-5 h-5 text-slate-600 group-hover:text-brand-400 group-hover:scale-110 transition" />
                            )}
                          </button>

                          {/* Icon */}
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                            step.completed
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-slate-800/80 text-brand-400 border border-slate-700/60'
                          }`}>
                            <IconComponent className="w-4 h-4" />
                          </div>

                          {/* Title & Description */}
                          <div className="flex-1 min-w-0">
                            <h3 className={`text-sm font-bold transition ${
                              step.completed ? 'text-slate-300 line-through opacity-80' : 'text-white'
                            }`}>
                              {step.title}
                            </h3>
                            <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>

                        {/* Action Link / Button */}
                        <div className="flex items-center gap-2 sm:self-center pl-12 sm:pl-0">
                          {step.actionUrl && (
                            <a
                              href={step.actionUrl}
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition shadow-sm ${
                                step.completed
                                  ? 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                                  : 'bg-brand-500/10 text-brand-400 border-brand-500/30 hover:bg-brand-500/20 hover:text-white'
                              }`}
                            >
                              <span>{step.actionLabel || 'Ir ahora'}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
