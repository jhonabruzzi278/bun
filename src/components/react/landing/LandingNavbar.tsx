import React, { useState } from 'react';
import { Menu, X, ArrowRight, Sparkles, ChefHat, Smartphone, Store, ShieldCheck } from 'lucide-react';

export default function LandingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 via-brand-500 to-amber-400 flex items-center justify-center text-xl shadow-lg shadow-brand-500/25 group-hover:scale-105 transition">
            🍔
          </div>
          <div>
            <span className="text-2xl font-black tracking-tight text-white">BUN</span>
            <span className="text-[10px] uppercase font-bold tracking-widest bg-brand-500/20 text-brand-400 px-1.5 py-0.5 rounded ml-1.5 border border-brand-500/30">
              OlaClick style
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-semibold text-slate-300 hover:text-brand-400 transition">
            Funcionalidades
          </a>
          <a href="#kds" className="text-sm font-semibold text-slate-300 hover:text-brand-400 transition flex items-center gap-1.5">
            <ChefHat className="w-4 h-4 text-brand-400" />
            Cocina KDS
          </a>
          <a href="#pricing" className="text-sm font-semibold text-slate-300 hover:text-brand-400 transition">
            Planes & Precios
          </a>
          <a href="#faq" className="text-sm font-semibold text-slate-300 hover:text-brand-400 transition">
            Preguntas
          </a>
          <a href="/menu/burger-craft" target="_blank" className="text-sm font-semibold text-slate-300 hover:text-white transition flex items-center gap-1">
            <span>Demo Menú</span>
            <span className="text-xs">↗</span>
          </a>
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/admin"
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 transition"
          >
            Iniciar Sesión
          </a>
          <a
            href="/admin"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-amber-500 hover:from-brand-600 hover:to-amber-600 text-white font-extrabold text-xs shadow-lg shadow-brand-500/25 transition group"
          >
            <span>Crear Menú Gratis</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-200"
          >
            Funcionalidades
          </a>
          <a
            href="#kds"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-200"
          >
            Cocina KDS en Vivo
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-200"
          >
            Planes & Precios
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-200"
          >
            Preguntas Frecuentes
          </a>
          <a
            href="/menu/burger-craft"
            target="_blank"
            className="block py-2 text-sm font-semibold text-brand-400"
          >
            Ver Menú Público Demo ↗
          </a>
          <div className="pt-3 flex flex-col gap-2">
            <a
              href="/admin"
              className="w-full py-3 rounded-xl bg-brand-500 text-white text-center font-bold text-sm shadow-md"
            >
              Crear Menú Gratis 🚀
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
