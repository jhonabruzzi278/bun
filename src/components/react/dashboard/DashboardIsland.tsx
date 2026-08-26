import React from 'react';
import { useCatalogStore } from '@/lib/useCatalogStore';
import { CheckCircle2, Circle, ArrowRight, Store, UtensilsCrossed, FolderKanban, Smartphone, Share2, Sparkles } from 'lucide-react';

export default function DashboardIsland() {
  const { business, categories, products, isLoaded } = useCatalogStore();

  if (!isLoaded) {
    return <div className="p-8 text-slate-400 text-sm">Cargando panel de control...</div>;
  }

  const steps = [
    { label: 'Información y branding del negocio configurados', completed: !!business.name && !!business.phone, href: '/admin/business' },
    { label: 'Logo y portada agregados', completed: !!business.logoUrl, href: '/admin/business' },
    { label: 'Al menos una categoría creada', completed: categories.length > 0, href: '/admin/categories' },
    { label: 'Al menos un producto cargado con precio', completed: products.length > 0, href: '/admin/products' },
    { label: 'Producto marcado como destacado para portada', completed: products.some(p => p.isFeatured), href: '/admin/products' },
    { label: 'Variantes o modificadores configurados (ej. extras)', completed: products.some(p => (p.variants && p.variants.length > 0) || (p.modifiers && p.modifiers.length > 0)), href: '/admin/products' },
    { label: 'Revisar vista previa móvil interactiva', completed: true, href: '/admin/preview' },
    { label: 'Compartir enlace público con tus clientes', completed: true, href: `/menu/${business.slug}` },
  ];

  const completedCount = steps.filter((s) => s.completed).length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  return (
    <div className="space-y-8">
      <!-- Hero Welcome -->
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 md:p-8 border border-slate-800 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              SaaS Multi-tenant v0.1 • Estilo OlaClick
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Bienvenido, {business.name}
            </h1>
            <p className="text-slate-400 text-sm max-w-xl">
              Tu menú digital está activo y listo para recibir clientes. Administra tus productos, categorías y pedidos desde aquí.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/admin/preview"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium border border-slate-700 transition"
            >
              <Smartphone className="w-4 h-4 text-brand-400" />
              Vista Previa
            </a>
            <a
              href={`/menu/${business.slug}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold shadow-lg shadow-brand-500/25 transition"
            >
              <Share2 className="w-4 h-4" />
              Ver Menú Público
            </a>
          </div>
        </div>
      </div>

      <!-- Stats Grid -->
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

      <!-- Onboarding Checklist (OlaClick inspired) -->
      <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Guía de Configuración Inicial (Onboarding)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Completa estos pasos para tener tu catálogo y tienda al 100%.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-brand-400">{completedCount} de {steps.length} completados</span>
            <div className="w-32 bg-slate-800 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-brand-500 to-amber-400 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="divide-y divide-slate-800/60 mt-2">
          {steps.map((step, idx) => (
            <a
              key={idx}
              href={step.href}
              className="py-3.5 px-2 flex items-center justify-between hover:bg-slate-900/60 rounded-xl transition group"
            >
              <div className="flex items-center gap-3.5">
                {step.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-600 shrink-0" />
                )}
                <span className={`text-sm font-medium ${step.completed ? 'text-slate-200 line-through opacity-80' : 'text-slate-100 font-semibold'}`}>
                  {step.label}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-brand-400 group-hover:translate-x-1 transition" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
