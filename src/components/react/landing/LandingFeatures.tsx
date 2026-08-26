import React from 'react';
import { Smartphone, QrCode, MessageSquare, ChefHat, BarChart3, Zap, Shield, Sparkles, Layers, Sliders, Bell } from 'lucide-react';

export default function LandingFeatures() {
  const features = [
    {
      icon: <QrCode className="w-6 h-6 text-brand-400" />,
      badge: 'Menú Digital',
      title: 'Catálogo QR y Móvil Ultrarrápido',
      description: 'Menú interactivo con fotos en alta definición, selección de variantes (tamaños) y extras con cobro adicional.',
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-emerald-400" />,
      badge: 'WhatsApp Orders',
      title: 'Pedidos Directos a WhatsApp',
      description: 'El cliente arma su pedido en el carrito web y se envía con el detalle formateado directamente al chat de tu negocio.',
    },
    {
      icon: <ChefHat className="w-6 h-6 text-amber-400" />,
      badge: 'Cocina KDS',
      title: 'Pantalla de Cocina en Tiempo Real',
      description: 'Organiza comandas en tarjetas con estados (Pendiente, Preparando, Listo), cronómetros automáticos y semáforo de demoras.',
    },
    {
      icon: <Layers className="w-6 h-6 text-cyan-400" />,
      badge: 'Estaciones de Cocina',
      title: 'División por Estaciones',
      description: 'Separa automáticamente pedidos hacia Parrilla, Frituras o Bar para que cada área trabaje coordinada.',
    },
    {
      icon: <Bell className="w-6 h-6 text-purple-400" />,
      badge: 'Alertas Sonoras',
      title: 'Avisos Acústicos sin Retraso',
      description: 'Sonidos de nueva comanda y alerta de plato demorado sin necesidad de instalar apps pesadas.',
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-rose-400" />,
      badge: 'Multi-tenant SaaS',
      title: 'Arquitectura Escalable & Marca Propia',
      description: 'Diseñado desde la base para soportar subdominios, dominios propios (.cl, .com) y múltiples sucursales.',
    },
  ];

  return (
    <section id="features" className="py-20 md:py-32 bg-slate-950/60 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20">
            Todo lo que tu negocio necesita
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Herramientas Modernas para Vender Más y Despachar Más Rápido
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Inspirado en la simplicidad de OlaClick, pero potenciado con una arquitectura multi-tenant de alto rendimiento.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition hover:-translate-y-1 group space-y-4 flex flex-col justify-between shadow-xl"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center group-hover:scale-110 transition shadow-md">
                  {f.icon}
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 font-mono">
                    {f.badge}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1 group-hover:text-brand-400 transition">
                    {f.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Showcase Banner KDS */}
        <div id="kds" className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-8 md:p-12 border border-slate-800 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                ● Enfoque en Cocina (KDS)
              </span>
              <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Dile adiós al desorden de comandas en papel
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Tus cocineros tendrán una pantalla clara con los pedidos ordenados por tiempo de espera. Sabrán exactamente qué preparar, con qué ingredientes extra y notas especiales.
              </p>
              <div className="pt-2">
                <a
                  href="/admin/kitchen"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-lg shadow-brand-500/25 transition"
                >
                  <ChefHat className="w-4 h-4" />
                  Abrir Tablero de Cocina KDS
                </a>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs shadow-2xl">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="font-bold text-white">PEDIDO #104 (Mesa 2)</span>
                <span className="text-emerald-400 font-bold">PREPARANDO (03:45)</span>
              </div>
              <div className="space-y-1 text-slate-300">
                <p className="font-bold text-white">1x Doble Smash Burger</p>
                <p className="text-[11px] text-amber-400 pl-4">└ Tocino Extra Crispy</p>
                <p className="text-[11px] text-amber-400 pl-4">└ Queso Cheddar Fundido</p>
                <p className="font-bold text-white">1x Papas Rústicas</p>
              </div>
              <div className="pt-2 flex gap-2">
                <button className="flex-1 py-1.5 bg-emerald-600 text-white font-bold rounded-lg text-center">
                  LISTO PARA SERVIR ✓
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
