import React, { useState } from 'react';
import {
  IconMenu2,
  IconX,
  IconArrowUpRight,
  IconSparkles,
  IconChefHat,
  IconDeviceMobile,
  IconBrandWhatsapp,
  IconLogin,
  IconBeer
} from '@tabler/icons-react';

export default function LandingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#09090B]/85 backdrop-blur-xl font-mono">
      <div className="max-w-6xl mx-auto flex h-14 md:h-16 items-center justify-between px-4 sm:px-6">
        {/* Brand: Minimalist Prompt Style */}
        <a href="/" className="flex items-center gap-2 group text-sm tracking-tight text-white">
          <span className="text-amber-400 font-bold">&gt;</span>
          <span className="font-bold tracking-tight">brew.cl</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-[2px] border border-amber-500/30 bg-amber-500/10 text-amber-400 font-normal ml-1">
            v2.0
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#modulos"
            className="text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
          >
            Módulos
          </a>
          <a
            href="/admin/kitchen"
            className="text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <IconChefHat className="w-3.5 h-3.5 text-amber-400" />
            <span>KDS Cocina</span>
          </a>
          <a
            href="#planes"
            className="text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
          >
            Planes
          </a>
          <a
            href="/menu/burger-craft"
            target="_blank"
            className="text-xs uppercase tracking-widest text-zinc-400 hover:text-amber-400 transition-colors flex items-center gap-1 group"
          >
            <span>Demo Carta</span>
            <IconArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/sign-in"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[4px] border border-white/[0.08] text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-white hover:border-white/20 transition-colors"
          >
            <IconLogin className="w-3.5 h-3.5" />
            <span>Acceso</span>
          </a>
          <a
            href="/admin"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-[4px] bg-white text-black hover:bg-zinc-200 text-xs font-mono uppercase tracking-wider font-semibold transition-colors"
          >
            <span>Panel Control</span>
            <span className="text-amber-600">✦</span>
          </a>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-[4px] border border-white/[0.08] text-zinc-400 hover:text-white"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <IconX className="w-5 h-5" /> : <IconMenu2 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-[#09090B] px-6 py-6 space-y-4 font-mono">
          <nav className="flex flex-col space-y-3">
            <a
              href="#modulos"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs uppercase tracking-widest text-zinc-400 hover:text-white"
            >
              // 01 Módulos
            </a>
            <a
              href="/admin/kitchen"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs uppercase tracking-widest text-zinc-400 hover:text-white"
            >
              // 02 KDS Cocina
            </a>
            <a
              href="#planes"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs uppercase tracking-widest text-zinc-400 hover:text-white"
            >
              // 03 Planes
            </a>
            <a
              href="/menu/burger-craft"
              target="_blank"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs uppercase tracking-widest text-amber-400 hover:text-amber-300"
            >
              // 04 Demo Carta ↗
            </a>
          </nav>
          <div className="pt-4 border-t border-white/[0.08] flex flex-col gap-2">
            <a
              href="/sign-in"
              className="w-full text-center py-2 rounded-[4px] border border-white/[0.08] text-xs uppercase tracking-wider text-zinc-300"
            >
              Iniciar Sesión
            </a>
            <a
              href="/admin"
              className="w-full text-center py-2 rounded-[4px] bg-white text-black font-semibold text-xs uppercase tracking-wider"
            >
              Entrar al Panel
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
