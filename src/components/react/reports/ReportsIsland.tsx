import React, { useState } from 'react';
import { useCatalogStore } from '@/lib/useCatalogStore';
import {
  Calendar,
  ChevronDown,
  TrendingUp,
  ShoppingBag,
  Sparkles
} from 'lucide-react';

export default function ReportsIsland() {
  const { business, isLoaded } = useCatalogStore();

  if (!isLoaded) return <div className="text-[#8C7E73] dark:text-[#A8988B] text-sm">Cargando reportes...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-coffee-950 dark:text-white tracking-tight">
              Reportes & Métricas
            </h1>
            <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-[#FAF7F2] dark:bg-[#180E0C] text-coffee-800 dark:text-white border border-[#EAE1D6] dark:border-[#3D2420]">
              ventas
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#70645A] dark:text-[#A8988B] mt-1">
            Analiza el rendimiento de tus pedidos, canales de venta y métricas clave.
          </p>
        </div>

        {/* Date Selector */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] text-xs font-bold text-coffee-950 dark:text-white shadow-coffee-sm">
            <Calendar className="w-4 h-4 text-color3" />
            <span>Últimos 7 días</span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] shadow-coffee-sm space-y-2 transition-colors">
          <span className="text-xs font-bold text-[#70645A] dark:text-[#A8988B] block">Cantidad de pedidos</span>
          <div className="flex items-baseline justify-between">
            <h3 className="text-3xl font-black text-coffee-950 dark:text-white font-mono">148</h3>
            <span className="text-xs font-bold text-[#2E7D32] dark:text-[#4ADE80] font-mono">+18%</span>
          </div>
          <p className="text-[11px] text-[#70645A] dark:text-[#A8988B]">En los últimos 7 días</p>
        </div>

        <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] shadow-coffee-sm space-y-2 transition-colors">
          <span className="text-xs font-bold text-[#70645A] dark:text-[#A8988B] block">Ventas totales</span>
          <div className="flex items-baseline justify-between">
            <h3 className="text-3xl font-black text-coffee-950 dark:text-white font-mono">{business.currencySymbol} 2.300.000</h3>
            <span className="text-xs font-bold text-[#2E7D32] dark:text-[#4ADE80] font-mono">+12%</span>
          </div>
          <p className="text-[11px] text-[#70645A] dark:text-[#A8988B]">Ingresos brutos por pedidos</p>
        </div>

        <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] shadow-coffee-sm space-y-2 transition-colors">
          <span className="text-xs font-bold text-[#70645A] dark:text-[#A8988B] block">Ticket promedio</span>
          <div className="flex items-baseline justify-between">
            <h3 className="text-3xl font-black text-coffee-950 dark:text-white font-mono">{business.currencySymbol} 15.540</h3>
            <span className="text-xs font-bold text-[#2E7D32] dark:text-[#4ADE80] font-mono">+5%</span>
          </div>
          <p className="text-[11px] text-[#70645A] dark:text-[#A8988B]">Valor medio por comanda</p>
        </div>
      </div>

      {/* Breakdown Cards */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] shadow-coffee-sm space-y-5 transition-colors">
        <div className="flex items-center justify-between pb-2 border-b border-[#F4EFEA] dark:border-[#331C18]">
          <h3 className="text-base font-bold text-coffee-950 dark:text-white">Desglose por canal de atención</h3>
          <span className="text-xs text-[#70645A] dark:text-[#A8988B]">Semana en curso</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420]">
            <span className="text-xs text-[#70645A] dark:text-[#A8988B] block">🍽️ Salón / Mesas</span>
            <span className="text-xl font-bold text-coffee-950 dark:text-white font-mono mt-1 block">82 pedidos</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420]">
            <span className="text-xs text-[#70645A] dark:text-[#A8988B] block">🛵 Delivery</span>
            <span className="text-xl font-bold text-coffee-950 dark:text-white font-mono mt-1 block">44 pedidos</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420]">
            <span className="text-xs text-[#70645A] dark:text-[#A8988B] block">🛍️ Retiro en Local</span>
            <span className="text-xl font-bold text-coffee-950 dark:text-white font-mono mt-1 block">22 pedidos</span>
          </div>
        </div>
      </div>
    </div>
  );
}
