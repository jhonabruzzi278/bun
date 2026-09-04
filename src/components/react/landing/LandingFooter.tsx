import React from 'react';
import { IconArrowUpRight, IconHeart } from '@tabler/icons-react';

export default function LandingFooter() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#09090B] py-16 md:py-24 font-mono">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Pre-footer Callout: Minimalist Banner */}
        <div className="p-8 sm:p-12 border border-white/[0.08] rounded-[4px] bg-white/[0.01] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-widest text-amber-400">
              // IMPLEMENTACION_INMEDIATA
            </p>
            <h3 className="text-2xl sm:text-3xl font-normal text-white tracking-tight">
              Activa brew.cl en tu negocio hoy mismo
            </h3>
            <p className="text-xs text-zinc-400 max-w-lg font-sans">
              Sin tarjeta de crédito requerida, sin contratos forzosos y 0% comisiones por ventas.
            </p>
          </div>

          <a
            href="/sign-in"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-[4px] bg-white text-black hover:bg-zinc-200 text-xs uppercase tracking-wider font-semibold transition-colors shrink-0"
          >
            <span>Comenzar Ahora</span>
            <IconArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs text-zinc-400">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold">
              <span className="text-amber-400">&gt;</span>
              <span>brew.cl</span>
            </div>
            <p className="text-zinc-500 text-[11px] leading-relaxed font-sans">
              Plataforma de gestión cervecera y gastronómica de alta velocidad con sincronización libSQL en edge.
            </p>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Plataforma
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="/admin" className="hover:text-amber-400 transition-colors">
                  Panel de Control
                </a>
              </li>
              <li>
                <a href="/admin/kitchen" className="hover:text-amber-400 transition-colors">
                  Cocina KDS
                </a>
              </li>
              <li>
                <a href="/menu/burger-craft" target="_blank" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <span>Demo Carta QR</span>
                  <IconArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="/admin/ai" className="hover:text-amber-400 transition-colors">
                  Copiloto Brew IA
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Recursos
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#planes" className="hover:text-amber-400 transition-colors">
                  Tarifas y Planes
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-amber-400 transition-colors">
                  Preguntas Frecuentes
                </a>
              </li>
              <li>
                <a href="/admin/qr" className="hover:text-amber-400 transition-colors">
                  Generador QR
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Mascota & Identidad
            </h4>
            <div className="flex items-center gap-2 p-2.5 rounded-[4px] border border-white/[0.08] bg-white/[0.02]">
              <img
                src="/images/brew-mascot.jpg"
                alt="Brew la Lechuza"
                className="w-8 h-8 rounded-full object-cover border border-amber-500/30"
              />
              <div>
                <span className="block text-xs font-bold text-white">Brew la Lechuza</span>
                <span className="text-[10px] text-zinc-500">Mascota Oficial</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>
            &copy; {new Date().getFullYear()} brew.cl &bull; Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-1">
            <span>Construido para gastronomía y cerveza artesanal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
