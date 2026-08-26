import React from 'react';
import { useCatalogStore } from '@/lib/useCatalogStore';
import {
  CheckCircle2,
  Circle,
  ArrowRight,
  Store,
  UtensilsCrossed,
  FolderKanban,
  Smartphone,
  Share2,
  Sparkles,
  Rocket
} from 'lucide-react';

export default function DashboardIsland() {
  const { business, categories, products, onboardingStages, toggleOnboardingStep, isLoaded } = useCatalogStore();

  if (!isLoaded) {
    return <div className="p-8 text-slate-400 text-sm">Cargando panel de control...</div>;
  }

  const allSteps = onboardingStages.flatMap((s) => s.steps);
  const completedCount = allSteps.filter((s) => s.completed).length;
  const totalSteps = allSteps.length || 17;
  const progressPercent = Math.round((completedCount / totalSteps) * 100);

  return (
    <div className="space-y-8">
      {/* Hero Welcome */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 md:p-8 border border-slate-800 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              SaaS Multi-tenant v0.1 • Estilo OlaClick
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Bienvenido, Jonathan guerra 👋
            </h1>
            <p className="text-slate-300 text-sm max-w-xl">
              Aquí encontrarás una guía sencilla para configurar tu panel. Sigue estos pasos para personalizar tu experiencia y aprovechar al máximo todas las funcionalidades.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/admin/onboarding"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-amber-500 hover:from-brand-600 hover:to-amber-600 text-white text-sm font-bold shadow-lg shadow-brand-500/25 transition"
            >
              <Rocket className="w-4 h-4" />
              Ver Guía 4 Etapas ({completedCount}/{totalSteps})
            </a>
            <a
              href={`/menu/${business.slug}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium border border-slate-700 transition"
            >
              <Share2 className="w-4 h-4 text-brand-400" />
              Ver Menú Público
            </a>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Categorías Activas</span>
            <FolderKanban className="w-5 h-5 text-brand-400" />
          </div>
          <p className="text-2xl font-bold text-white mt-2">{categories.length}</p>
          <p className="text-xs text-slate-500 mt-1">Organización del menú</p>
        </div>

        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Total Productos</span>
            <UtensilsCrossed className="w-5 h-5 text-brand-400" />
          </div>
          <p className="text-2xl font-bold text-white mt-2">{products.length}</p>
          <p className="text-xs text-slate-500 mt-1">{products.filter(p => p.isFeatured).length} destacados</p>
        </div>

        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Pedidos Hoy</span>
            <Store className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-white mt-2">12</p>
          <p className="text-xs text-emerald-400 mt-1">+18% vs ayer</p>
        </div>

        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Ventas Estimadas</span>
            <span className="text-xs font-bold text-brand-400">{business.currencySymbol}</span>
          </div>
          <p className="text-2xl font-bold text-white mt-2">{business.currencySymbol}89.400</p>
          <p className="text-xs text-slate-500 mt-1">Moneda: {business.currency}</p>
        </div>
      </div>

      {/* Onboarding Checklist Summary */}
      <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🚀</span>
              <span className="text-xl">😎</span>
              <h2 className="text-lg font-bold text-white">
                Pasos completados: {completedCount} de {totalSteps}
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Guía de configuración en 4 etapas para poner en marcha tu restaurante.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-32 bg-slate-800 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-brand-500 via-amber-400 to-emerald-400 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <a
              href="/admin/onboarding"
              className="text-xs font-bold text-brand-400 hover:text-brand-300 transition flex items-center gap-1 shrink-0"
            >
              <span>Ver todas las etapas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 4 Stages Mini Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-5">
          {onboardingStages.map((stage) => {
            const stageDone = stage.steps.filter((s) => s.completed).length;
            const isAll = stageDone === stage.steps.length;

            return (
              <a
                key={stage.id}
                href="/admin/onboarding"
                className="p-4 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-brand-500/30 transition group block"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-extrabold px-2 py-0.5 rounded-md ${
                    isAll
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-brand-500/20 text-brand-400'
                  }`}>
                    Etapa {stage.id}
                  </span>
                  <span className="text-xs font-bold text-slate-400 group-hover:text-slate-200">
                    {stageDone}/{stage.steps.length}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white group-hover:text-brand-300 transition line-clamp-1">
                  {stage.title.replace(`Etapa ${stage.id}: `, '')}
                </h4>
                <div className="w-full bg-slate-800 rounded-full h-1 mt-2.5 overflow-hidden">
                  <div
                    className="bg-brand-500 h-full rounded-full transition-all"
                    style={{ width: `${(stageDone / stage.steps.length) * 100}%` }}
                  ></div>
                </div>
              </a>
            );
          })}
        </div>

        {/* First pending steps */}
        <div className="divide-y divide-slate-800/60 mt-5 pt-4 border-t border-slate-800/60">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Próximas acciones prioritarias:
          </div>
          {allSteps.slice(0, 5).map((step) => (
            <div
              key={step.id}
              className="py-3 px-2 flex items-center justify-between hover:bg-slate-900/60 rounded-xl transition"
            >
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => toggleOnboardingStep(step.id)}
                  className="focus:outline-none"
                >
                  {step.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-600 shrink-0 hover:text-brand-400" />
                  )}
                </button>
                <span className={`text-xs font-medium ${step.completed ? 'text-slate-400 line-through' : 'text-slate-200'}`}>
                  {step.title}
                </span>
              </div>
              {step.actionUrl && (
                <a
                  href={step.actionUrl}
                  className="text-xs font-semibold text-brand-400 hover:text-brand-300 flex items-center gap-1 transition"
                >
                  <span>{step.actionLabel || 'Ir'}</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
