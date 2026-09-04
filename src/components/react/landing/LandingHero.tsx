import React from 'react';
import {
  IconArrowUpRight,
  IconArrowRight,
  IconDeviceMobile,
  IconSparkles,
  IconCheck
} from '@tabler/icons-react';

export default function LandingHero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 font-mono">
      {/* Subtle tech background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Section Kicker */}
        <p className="text-xs uppercase tracking-widest text-amber-400/90 mb-4">
          // ARQUITECTURA_GASTRONOMICA_01
        </p>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight mb-6 leading-[1.05] max-w-4xl text-white">
          Plataforma cervecera & gastronómica <br />
          <span className="text-amber-400">diseñada con extrema simpleza.</span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-base md:text-lg text-zinc-400 max-w-xl mb-10 leading-relaxed font-normal">
          Menú digital QR instantáneo, pedidos directos por WhatsApp, pantalla de cocina KDS en tiempo real sincronizada en libSQL y asesoría táctica con la lechuza Brew.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="/menu/burger-craft"
            target="_blank"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-[4px] bg-white text-black hover:bg-zinc-200 text-xs uppercase tracking-wider font-semibold transition-colors"
          >
            <span>Ver Carta Demo</span>
            <IconArrowUpRight className="w-4 h-4" />
          </a>

          <a
            href="/admin"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-[4px] border border-white/[0.12] hover:border-white/25 text-zinc-300 hover:text-white text-xs uppercase tracking-wider transition-colors hover:bg-white/[0.03]"
          >
            <span>Panel de Control</span>
            <span className="text-amber-400">✦</span>
          </a>
        </div>

        {/* Metric Counters (ToolDev Minimalist Grid Row) */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 border-t border-white/[0.08] pt-8 max-w-3xl">
          <div>
            <div className="text-2xl md:text-3xl text-white font-mono font-bold tracking-tight">
              0%
            </div>
            <div className="text-[10px] uppercase tracking-widest text-zinc-500 mt-1">
              COMISIÓN POR VENTA
            </div>
          </div>

          <div>
            <div className="text-2xl md:text-3xl text-white font-mono font-bold tracking-tight">
              &lt; 5ms
            </div>
            <div className="text-[10px] uppercase tracking-widest text-zinc-500 mt-1">
              LATENCIA TURSO EDGE
            </div>
          </div>

          <div>
            <div className="text-2xl md:text-3xl text-white font-mono font-bold tracking-tight">
              100%
            </div>
            <div className="text-[10px] uppercase tracking-widest text-zinc-500 mt-1">
              PEDIDOS SIN INTERMEDIARIOS
            </div>
          </div>

          <div>
            <div className="text-2xl md:text-3xl text-amber-400 font-mono font-bold tracking-tight">
              24/7
            </div>
            <div className="text-[10px] uppercase tracking-widest text-zinc-500 mt-1">
              COPILOTO BREW ACTIVO
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
