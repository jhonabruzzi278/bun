import React from 'react';
import { useCatalogStore } from '@/lib/useCatalogStore';
import {
  Store,
  UtensilsCrossed,
  FolderKanban,
  Share2,
  Sparkles,
  Receipt
} from 'lucide-react';
import OrdersWithAiInsightsIsland from '../orders/OrdersWithAiInsightsIsland';

export default function DashboardIsland() {
  const { business, categories, products, isLoaded } = useCatalogStore();

  if (!isLoaded) {
    return <div className="p-8 text-[#8C7E73] dark:text-[#A8988B] text-sm">Cargando panel de control...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Top Banner / Welcome Card */}
      <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] p-6 md:p-8 shadow-coffee-sm transition-colors">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F2] dark:bg-[#2F1B17] border border-[#EAE1D6] dark:border-[#4D2D26] text-color4 dark:text-color2 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-color3 dark:text-color2" />
              Maestro Cervecero • Plataforma Gastronómica
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-coffee-950 dark:text-white tracking-tight">
              Bienvenido, Maestro Cervecero 👋
            </h1>
            <p className="text-[#70645A] dark:text-[#D4C5B9] text-xs md:text-sm max-w-xl leading-relaxed">
              Monitorea tus órdenes en vivo, gestiona mesas con QR, pantalla de cocina y activa sugerencias con Inteligencia Artificial.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/admin/pos"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-color4 hover:bg-[#522B2B] dark:bg-color3 dark:hover:bg-color4 text-white text-xs font-bold shadow-coffee-sm transition"
            >
              <Receipt className="w-4 h-4" />
              Abrir POS / Caja
            </a>
            <a
              href={`/menu/${business.slug}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#2F1B17] hover:bg-[#F3EDE3] dark:hover:bg-[#38201C] text-coffee-950 dark:text-[#F4EFEA] text-xs font-semibold border border-[#EAE1D6] dark:border-[#4D2D26] transition"
            >
              <Share2 className="w-4 h-4 text-color3 dark:text-color2" />
              Ver Menú Público
            </a>
          </div>
        </div>
      </div>

      {/* Metric Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] shadow-coffee-sm transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#8C7E73] dark:text-[#A8988B]">Categorías Activas</span>
            <div className="w-7 h-7 rounded-lg bg-[#FAF7F2] dark:bg-[#2F1B17] flex items-center justify-center border border-[#EAE1D6] dark:border-[#4D2D26]">
              <FolderKanban className="w-4 h-4 text-color3 dark:text-color2" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-coffee-950 dark:text-white mt-2">{categories.length}</p>
          <p className="text-[11px] text-[#8C7E73] dark:text-[#A8988B] mt-1">Organización de la carta</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] shadow-coffee-sm transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#8C7E73] dark:text-[#A8988B]">Total Productos</span>
            <div className="w-7 h-7 rounded-lg bg-[#FAF7F2] dark:bg-[#2F1B17] flex items-center justify-center border border-[#EAE1D6] dark:border-[#4D2D26]">
              <UtensilsCrossed className="w-4 h-4 text-color4 dark:text-color2" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-coffee-950 dark:text-white mt-2">{products.length}</p>
          <p className="text-[11px] text-[#8C7E73] dark:text-[#A8988B] mt-1">{products.filter(p => p.isFeatured).length} destacados en mesa</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] shadow-coffee-sm transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#8C7E73] dark:text-[#A8988B]">Pedidos Hoy</span>
            <div className="w-7 h-7 rounded-lg bg-[#E7F3E8] dark:bg-[#1A3320] flex items-center justify-center border border-[#D0EBD2] dark:border-[#2C5935]">
              <Store className="w-4 h-4 text-[#2E7D32] dark:text-[#4ADE80]" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-coffee-950 dark:text-white mt-2">18</p>
          <p className="text-[11px] font-semibold text-[#2E7D32] dark:text-[#4ADE80] mt-1">+18% vs ayer</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] shadow-coffee-sm transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#8C7E73] dark:text-[#A8988B]">Ventas Estimadas</span>
            <div className="w-7 h-7 rounded-lg bg-[#FEF8E3] dark:bg-[#33220E] flex items-center justify-center border border-[#FDECB8] dark:border-[#593E1A]">
              <span className="text-xs font-bold text-color3 dark:text-color2">{business.currencySymbol}</span>
            </div>
          </div>
          <p className="text-2xl font-extrabold text-coffee-950 dark:text-white mt-2">{business.currencySymbol} 184.500</p>
          <p className="text-[11px] text-[#8C7E73] dark:text-[#A8988B] mt-1">Moneda: {business.currency}</p>
        </div>
      </div>

      {/* Main Realtime Table + AI Copilot Section */}
      <OrdersWithAiInsightsIsland />
    </div>
  );
}
