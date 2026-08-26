import React, { useState } from 'react';
import { useCatalogStore } from '@/lib/useCatalogStore';
import {
  Calendar,
  ChevronDown,
  TrendingUp,
  ShoppingBag,
  Clock,
  CreditCard,
  Building2,
  HelpCircle,
  BarChart2,
  DollarSign,
  Layers,
  Sparkles,
  ArrowUpRight,
  Filter
} from 'lucide-react';

export default function ReportsIsland() {
  const { business, isLoaded } = useCatalogStore();
  const [dateRange, setDateRange] = useState('LAST_7_DAYS');
  const [creationFilter, setCreationFilter] = useState('ALL_DAY');

  if (!isLoaded) return <div className="text-slate-400 text-sm">Cargando reportes...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Pedidos</h1>
            <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700">
              dashboard-orders
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Analiza el rendimiento de tus pedidos, canales de venta y métricas clave.
          </p>
        </div>

        {/* Date Selector and Filters Bar (OlaClick replica) */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-200">
            <Calendar className="w-4 h-4 text-brand-400" />
            <span>Últimos 7 días</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400 font-normal">20 ago 2026 - 26 ago 2026</span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-200">
            <span>Creación: Día entero</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>
      </div>

      {/* KPI Cards: Cantidad de pedidos, Ventas totales, Ticket promedio */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 sm:p-6 rounded-3xl bg-slate-950 border border-slate-800 shadow-lg space-y-2">
          <span className="text-xs font-bold text-slate-400 block">Cantidad de pedidos</span>
          <div className="flex items-baseline justify-between">
            <h3 className="text-3xl font-black text-white font-mono">0</h3>
            <span className="text-xs font-bold text-slate-500 font-mono">--%</span>
          </div>
          <p className="text-[11px] text-slate-500">Sin variación en el período</p>
        </div>

        <div className="p-5 sm:p-6 rounded-3xl bg-slate-950 border border-slate-800 shadow-lg space-y-2">
          <span className="text-xs font-bold text-slate-400 block">Ventas totales</span>
          <div className="flex items-baseline justify-between">
            <h3 className="text-3xl font-black text-white font-mono">{business.currencySymbol} 0</h3>
            <span className="text-xs font-bold text-slate-500 font-mono">--%</span>
          </div>
          <p className="text-[11px] text-slate-500">Ingresos netos por pedidos</p>
        </div>

        <div className="p-5 sm:p-6 rounded-3xl bg-slate-950 border border-slate-800 shadow-lg space-y-2">
          <span className="text-xs font-bold text-slate-400 block">Ticket promedio</span>
          <div className="flex items-baseline justify-between">
            <h3 className="text-3xl font-black text-white font-mono">{business.currencySymbol} 0</h3>
            <span className="text-xs font-bold text-slate-500 font-mono">--%</span>
          </div>
          <p className="text-[11px] text-slate-500">Valor medio por transacción</p>
        </div>
      </div>

      {/* SECTION: Análisis de pedidos (En mesa, En el local, Para llevar, A domicilio) */}
      <div className="p-6 sm:p-7 rounded-3xl bg-slate-950 border border-slate-800 shadow-xl space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Análisis de pedidos</h3>
            <p className="text-xs text-slate-400 mt-0.5">Desglose por tipo de servicio</p>
          </div>
          <span className="text-xs font-bold text-slate-400">Cantidad de pedidos</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* En mesa */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">En mesa</span>
              <span className="text-[10px] font-mono font-bold text-slate-500">--%</span>
            </div>
            <div>
              <span className="text-2xl font-black text-white font-mono">0</span>
              <div className="text-[11px] text-slate-400 font-mono mt-1 space-y-0.5">
                <div className="flex justify-between">
                  <span>Ventas:</span>
                  <span className="text-white font-bold">{business.currencySymbol} 0.00</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Ticket prom:</span>
                  <span>{business.currencySymbol} 0.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* En el local */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">En el local</span>
              <span className="text-[10px] font-mono font-bold text-slate-500">--%</span>
            </div>
            <div>
              <span className="text-2xl font-black text-white font-mono">0</span>
              <div className="text-[11px] text-slate-400 font-mono mt-1 space-y-0.5">
                <div className="flex justify-between">
                  <span>Ventas:</span>
                  <span className="text-white font-bold">{business.currencySymbol} 0.00</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Ticket prom:</span>
                  <span>{business.currencySymbol} 0.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Para llevar */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Para llevar</span>
              <span className="text-[10px] font-mono font-bold text-slate-500">--%</span>
            </div>
            <div>
              <span className="text-2xl font-black text-white font-mono">0</span>
              <div className="text-[11px] text-slate-400 font-mono mt-1 space-y-0.5">
                <div className="flex justify-between">
                  <span>Ventas:</span>
                  <span className="text-white font-bold">{business.currencySymbol} 0.00</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Ticket prom:</span>
                  <span>{business.currencySymbol} 0.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* A domicilio */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">A domicilio</span>
              <span className="text-[10px] font-mono font-bold text-slate-500">--%</span>
            </div>
            <div>
              <span className="text-2xl font-black text-white font-mono">0</span>
              <div className="text-[11px] text-slate-400 font-mono mt-1 space-y-0.5">
                <div className="flex justify-between">
                  <span>Ventas:</span>
                  <span className="text-white font-bold">{business.currencySymbol} 0.00</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Ticket prom:</span>
                  <span>{business.currencySymbol} 0.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION: Progreso de pedidos (Comparativa 7 días) */}
      <div className="p-6 sm:p-7 rounded-3xl bg-slate-950 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white tracking-tight">Progreso de pedidos</h3>
          <div className="flex items-center gap-4 text-xs font-bold">
            <span className="flex items-center gap-1.5 text-blue-400">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              Últimos 7 días
            </span>
            <span className="flex items-center gap-1.5 text-slate-500">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
              7 días anteriores
            </span>
          </div>
        </div>

        <div className="h-44 rounded-2xl bg-slate-900/40 border border-slate-800/80 flex items-center justify-center text-slate-500 text-xs">
          Sin datos en el período seleccionado
        </div>
      </div>

      {/* GRID: Por origen del pedido & Entregado por */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Por origen del pedido */}
        <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white">Por origen del pedido</h3>
          <p className="text-xs text-slate-400">Canales y aplicaciones conectadas</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              'WEB',
              'PDV',
              'TOTEM',
              'CHATBOT',
              'QR',
              'API',
              'RAPPI',
              'RAPPI TURBO',
              'DIDI',
              'UBER EATS',
              'PEDIDOSYA',
            ].map((origin) => (
              <div
                key={origin}
                className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between text-xs"
              >
                <span className="font-bold text-slate-300 text-[11px]">{origin}</span>
                <span className="text-slate-500 font-mono text-[11px]">0</span>
              </div>
            ))}
          </div>
        </div>

        {/* Entregado por */}
        <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white">Entregado por</h3>
          <p className="text-xs text-slate-400">Reparto del negocio vs apps externas</p>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
              <span className="font-bold text-white">Negocio (Repartidores propios)</span>
              <span className="font-mono text-slate-400">0 pedidos (0%)</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
              <span className="font-bold text-white">Aplicaciones de terceros</span>
              <span className="font-mono text-slate-400">0 pedidos (0%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* GRID: Horas con más ventas, Días con más ventas, Métodos de pago */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Horas con más ventas */}
        <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Horas con más ventas</h3>
            <Clock className="w-4 h-4 text-brand-400" />
          </div>
          <span className="text-xs text-slate-400 block font-semibold">Mejor horario:</span>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-500 text-center">
            Sin datos en el período seleccionado
          </div>
        </div>

        {/* Días con más ventas */}
        <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Días con más ventas</h3>
            <Calendar className="w-4 h-4 text-brand-400" />
          </div>
          <span className="text-xs text-slate-400 block font-semibold">Mejor día:</span>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-500 text-center">
            Sin datos en el período seleccionado
          </div>
        </div>

        {/* Métodos de pago */}
        <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Métodos de pago</h3>
            <CreditCard className="w-4 h-4 text-brand-400" />
          </div>
          <span className="text-xs text-slate-400 block font-semibold">Distribución de cobro:</span>
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Efectivo</span>
              <span className="text-white font-mono">$ 0 (0%)</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Transferencia</span>
              <span className="text-white font-mono">$ 0 (0%)</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Tarjeta / Link</span>
              <span className="text-white font-mono">$ 0 (0%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
