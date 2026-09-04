import React from 'react';
import { useCatalogStore } from '@/lib/useCatalogStore';
import {
  Store,
  UtensilsCrossed,
  FolderKanban,
  Share2,
  Sparkles,
  Receipt,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import { Button, Badge, Card } from '@/components/ui';
import OrdersWithAiInsightsIsland from '../orders/OrdersWithAiInsightsIsland';
import { getUpcomingChileanHolidays, type ChileanHoliday } from '@/lib/chileanHolidays';

export default function DashboardIsland() {
  const { business, categories, products, isLoaded } = useCatalogStore();
  const [holidays, setHolidays] = React.useState<ChileanHoliday[]>([]);

  React.useEffect(() => {
    getUpcomingChileanHolidays().then((data) => setHolidays(data.slice(0, 3)));
  }, []);

  if (!isLoaded) {
    return (
      <div className="p-12 text-[#8C7E73] dark:text-[#A8988B] text-sm flex items-center justify-center gap-3">
        <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        <span>Cargando panel de control brew.cl...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Apple Bento Hero / Welcome Card */}
      <Card glass className="relative overflow-hidden p-6 md:p-8 rounded-[32px] border-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.3)]">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-1/3 w-80 h-80 bg-amber-500/[0.06] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-60 h-60 bg-orange-500/[0.04] rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="amber" dot>
                Maestro Cervecero • Plataforma brew.cl
              </Badge>
              <Badge variant="secondary">
                Brew la Lechuza Activa 🦉
              </Badge>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-black text-coffee-950 dark:text-white tracking-tight">
              Bienvenido, Maestro Cervecero 👋
            </h1>
            
            <p className="text-[#70645A] dark:text-[#D4C5B9] text-xs md:text-sm max-w-xl leading-relaxed">
              Monitorea tus órdenes en vivo, gestiona mesas con QR, pantalla de cocina y activa sugerencias con Inteligencia Artificial.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a href="/admin/pos">
              <Button variant="primary" size="default" className="shadow-lg shadow-amber-500/20">
                <Receipt className="w-4 h-4" />
                <span>Abrir POS / Caja</span>
              </Button>
            </a>
            
            <a href={`/menu/${business.slug}`} target="_blank" rel="noreferrer">
              <Button variant="secondary" size="default">
                <Share2 className="w-4 h-4 text-amber-400" />
                <span>Ver Menú Público</span>
              </Button>
            </a>
          </div>
        </div>
      </Card>

      {/* Metric Quick Stats - Apple Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card glass className="p-5 rounded-3xl border-white/[0.08] hover:-translate-y-0.5 transition-transform duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#8C7E73] dark:text-[#A8988B]">Categorías Activas</span>
            <div className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
              <FolderKanban className="w-4 h-4 text-amber-400" />
            </div>
          </div>
          <p className="text-2xl font-black text-coffee-950 dark:text-white mt-3 font-mono">{categories.length}</p>
          <p className="text-[11px] text-[#8C7E73] dark:text-[#A8988B] mt-1">Organización de la carta</p>
        </Card>

        <Card glass className="p-5 rounded-3xl border-white/[0.08] hover:-translate-y-0.5 transition-transform duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#8C7E73] dark:text-[#A8988B]">Total Productos</span>
            <div className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
              <UtensilsCrossed className="w-4 h-4 text-amber-400" />
            </div>
          </div>
          <p className="text-2xl font-black text-coffee-950 dark:text-white mt-3 font-mono">{products.length}</p>
          <p className="text-[11px] text-[#8C7E73] dark:text-[#A8988B] mt-1">{products.filter(p => p.isFeatured).length} destacados en mesa</p>
        </Card>

        <Card glass className="p-5 rounded-3xl border-white/[0.08] hover:-translate-y-0.5 transition-transform duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#8C7E73] dark:text-[#A8988B]">Pedidos Hoy</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
              <Store className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <p className="text-2xl font-black text-coffee-950 dark:text-white mt-3 font-mono">18</p>
          <div className="mt-1">
            <Badge variant="success" dot className="px-2 py-0">
              +18% vs ayer
            </Badge>
          </div>
        </Card>

        <Card glass className="p-5 rounded-3xl border-white/[0.08] hover:-translate-y-0.5 transition-transform duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#8C7E73] dark:text-[#A8988B]">Ventas Estimadas</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-amber-400" />
            </div>
          </div>
          <p className="text-2xl font-black text-coffee-950 dark:text-white mt-3 font-mono">{business.currencySymbol || '$'} 184.500</p>
          <p className="text-[11px] text-[#8C7E73] dark:text-[#A8988B] mt-1">Moneda: {business.currency || 'CLP'}</p>
        </Card>
      </div>

      {/* Chilean Gastronomic Demand Predictor (External API) */}
      {holidays.length > 0 && (
        <Card glass className="p-4 md:p-5 rounded-3xl border-amber-500/25 bg-amber-500/[0.04]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xl shrink-0">
                🇨🇱
              </div>
              <div>
                <h4 className="text-xs font-black text-white flex items-center gap-2">
                  Pronóstico Gastronómico: Próximos Feriados en Chile
                  <span className="text-[9px] font-mono bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-bold border border-amber-500/30">
                    API Gob.cl
                  </span>
                </h4>
                <p className="text-[11px] text-[#A8988B]">
                  Anticípate con compras de barriles, carne smash y refuerzo de personal para fechas de alto consumo.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 overflow-x-auto pb-1 lg:pb-0">
              {holidays.map((h, i) => (
                <div key={i} className="px-3 py-2 rounded-2xl bg-black/40 border border-white/[0.08] text-xs space-y-0.5 shrink-0 min-w-[140px]">
                  <span className="font-bold text-white block text-[11px] truncate max-w-[170px]" title={h.nombre}>
                    {h.nombre}
                  </span>
                  <span className="text-[10px] text-amber-400 font-mono font-bold block">
                    {h.diasRestantes === 0 ? '¡HOY!' : `en ${h.diasRestantes} días`} ({h.fecha})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Main Realtime Table + AI Copilot Section */}
      <OrdersWithAiInsightsIsland />
    </div>
  );
}
