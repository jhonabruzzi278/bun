import React from 'react';
import { ArrowRight, Heart } from 'lucide-react';

export default function LandingFooter() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Pre-footer Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-brand-600 via-brand-500 to-amber-500 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-brand-500/20">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">¿Listo para transformar tu restaurante?</h3>
            <p className="text-white/90 text-sm max-w-lg">
              Crea tu menú digital hoy mismo. No pedimos tarjeta de crédito ni cobramos comisiones.
            </p>
          </div>

          <a
            href="/admin"
            className="px-8 py-4 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white font-extrabold text-sm shadow-xl transition hover:scale-105 active:scale-95 whitespace-nowrap flex items-center gap-2"
          >
            <span>Crear Menú Gratis</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs text-slate-400">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-brand-500 flex items-center justify-center text-xs">🍔</div>
              <span className="font-extrabold text-white text-sm">BUN</span>
            </div>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              Plataforma integral de gestión gastronómica, menú digital y cocina KDS.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Plataforma</h4>
            <ul className="space-y-1.5">
              <li><a href="/admin" className="hover:text-brand-400">Panel de Control</a></li>
              <li><a href="/admin/kitchen" className="hover:text-brand-400">Cocina KDS</a></li>
              <li><a href="/menu/burger-craft" className="hover:text-brand-400">Demo Menú QR</a></li>
              <li><a href="#pricing" className="hover:text-brand-400">Planes Comerciales</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Recursos</h4>
            <ul className="space-y-1.5">
              <li><a href="#faq" className="hover:text-brand-400">Preguntas Frecuentes</a></li>
              <li><a href="/admin/preview" className="hover:text-brand-400">Simulador Móvil</a></li>
              <li><a href="#features" className="hover:text-brand-400">Guía de Integración</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Legal & Soporte</h4>
            <ul className="space-y-1.5">
              <li><a href="#" className="hover:text-brand-400">Términos de Servicio</a></li>
              <li><a href="#" className="hover:text-brand-400">Política de Privacidad</a></li>
              <li><a href="https://wa.me/56912345678" target="_blank" className="hover:text-brand-400">Soporte WhatsApp</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} BUN Platform. Inspirado en OlaClick. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            Hecho con <Heart className="w-3 h-3 text-rose-500 fill-current" /> para restaurantes de LATAM.
          </p>
        </div>

      </div>
    </footer>
  );
}
