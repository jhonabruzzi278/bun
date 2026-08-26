import React from 'react';
import { ArrowRight, CheckCircle2, Star, Sparkles, Smartphone, ChefHat, Zap, ShieldCheck } from 'lucide-react';

export default function LandingHero() {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
      {/* Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/15 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-brand-500/30 text-brand-400 text-xs font-bold shadow-lg shadow-brand-500/10 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>El Software Gastronómico #1 Sin Comisiones por Pedido</span>
          </div>
        </div>

        {/* Main Title & Subtitle */}
        <div className="text-center mt-6 max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1]">
            Digitaliza tu Restaurante con <span className="bg-gradient-to-r from-brand-400 via-amber-400 to-brand-500 bg-clip-text text-transparent">Menú QR, WhatsApp y KDS</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Permite que tus clientes pidan desde la mesa o delivery directo a tu WhatsApp. Gestiona tu cocina con comandas en tiempo real y aumenta tus ventas hasta un <strong>35%</strong>.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="/admin"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-500 via-brand-600 to-amber-500 hover:from-brand-600 hover:to-amber-600 text-white font-extrabold text-base shadow-2xl shadow-brand-500/30 hover:scale-[1.02] transition active:scale-[0.98]"
            >
              <span>Comenzar Gratis en 2 Minutos</span>
              <ArrowRight className="w-5 h-5" />
            </a>

            <a
              href="/menu/burger-craft"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-bold text-base border border-slate-700 hover:border-slate-600 transition"
            >
              <Smartphone className="w-5 h-5 text-brand-400" />
              <span>Ver Demo Cliente</span>
            </a>
          </div>

          {/* Bullet Proof Points */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-semibold text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>0% Comisión por ventas</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>No requiere tarjeta de crédito</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Listo para usar en celular y PC</span>
            </div>
          </div>
        </div>

        {/* Hero Showcase Mockup (Split Mobile + KDS) */}
        <div className="mt-16 relative max-w-5xl mx-auto">
          <div className="relative rounded-3xl bg-slate-950/90 border border-slate-800 p-4 sm:p-8 shadow-2xl shadow-black/80 overflow-hidden">
            
            {/* Top Mockup Header Bar */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="text-xs text-slate-500 font-mono ml-2">bun-platform.app/admin</span>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Sistema KDS & Menú Digital Activos</span>
              </div>
            </div>

            {/* Mockup Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 items-center">
              
              {/* Left Side: KDS Preview Card */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ChefHat className="w-5 h-5 text-brand-400" />
                    <h3 className="text-sm font-extrabold text-white">Comandas de Cocina en Tiempo Real</h3>
                  </div>
                  <span className="text-[10px] font-mono bg-brand-500/20 text-brand-300 px-2 py-0.5 rounded font-bold">
                    Parrilla & Frituras
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Card 1 */}
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-brand-500/40 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-black text-white">#102 • Mesa 4</span>
                      <span className="text-[10px] font-mono bg-brand-500 text-white font-bold px-1.5 py-0.5 rounded">
                        04:12 min
                      </span>
                    </div>
                    <div className="space-y-1 text-xs">
                      <p className="font-bold text-slate-100">2x Double Bacon Smash</p>
                      <p className="text-[10px] text-emerald-400">└ + Queso Cheddar Extra</p>
                      <p className="font-bold text-slate-100">1x Papas Rústicas</p>
                    </div>
                    <button className="w-full py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-[11px]">
                      ✓ MARCAR LISTO
                    </button>
                  </div>

                  {/* Card 2 */}
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-black text-white">#103 • Delivery</span>
                      <span className="text-[10px] font-mono bg-slate-800 text-slate-300 font-bold px-1.5 py-0.5 rounded">
                        01:25 min
                      </span>
                    </div>
                    <div className="space-y-1 text-xs">
                      <p className="font-bold text-slate-100">1x Truffle Burger</p>
                      <p className="font-bold text-slate-100">2x Limonada Menta</p>
                    </div>
                    <button className="w-full py-1.5 rounded-lg bg-brand-500 text-white font-bold text-[11px]">
                      ▶ COMENZAR
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Side: Phone Mini Simulator */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-[260px] bg-black rounded-[36px] p-2.5 shadow-2xl border-2 border-slate-800">
                  <div className="w-full bg-slate-950 rounded-[28px] p-3 space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center text-sm">🍔</div>
                      <div>
                        <p className="text-[11px] font-bold text-white leading-none">Burger Craft</p>
                        <p className="text-[9px] text-emerald-400 font-semibold">● Abierto ahora</p>
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex gap-2 items-center">
                      <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-lg">🍔</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold text-white truncate">Double Bacon</p>
                        <p className="text-[10px] font-extrabold text-brand-400">$7.990</p>
                      </div>
                      <span className="text-xs bg-brand-500 text-white font-bold px-2 py-0.5 rounded-lg">+</span>
                    </div>

                    <div className="w-full py-2 rounded-xl bg-emerald-600 text-white text-[11px] font-bold text-center">
                      Pedir por WhatsApp 💬
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
