import React from 'react';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

export default function LandingPricing() {
  const plans = [
    {
      name: 'Starter',
      price: '$0',
      period: 'Gratis para siempre',
      description: 'Ideal para negocios pequeños y emprendedores que inician.',
      badge: null,
      features: [
        'Menú digital interactivo móvil',
        'Códigos QR ilimitados para mesas',
        'Pedidos directos por WhatsApp',
        'Hasta 50 productos en catálogo',
        'Subdominio gratuito del sistema',
        '0% comisiones por venta',
      ],
      cta: 'Empezar Gratis',
      href: '/admin',
      isPrimary: false,
    },
    {
      name: 'Pro',
      price: '$19',
      period: '/ mes',
      description: 'Para restaurantes que quieren potenciar su marca y velocidad de cocina.',
      badge: 'MÁS POPULAR',
      features: [
        'Todo lo del plan Starter',
        'Dominio propio personalizado (.cl, .com)',
        'Tablero de Cocina KDS en Tiempo Real',
        'Control de semáforo de demoras & tiempos',
        'Variantes, modificadores y extras ilimitados',
        'Personalización total de colores y logo',
        'Soporte prioritario por WhatsApp',
      ],
      cta: 'Probar Plan Pro',
      href: '/admin',
      isPrimary: true,
    },
    {
      name: 'Dedicated / White Label',
      price: 'A Medida',
      period: 'Solución empresarial',
      description: 'Para cadenas gastronómicas, franquicias o agencias.',
      badge: 'EMPRESAS',
      features: [
        'Infraestructura dedicada en AWS',
        'Múltiples sucursales y franquicias',
        'Marca blanca total (White Label)',
        'Integraciones POS / Facturación electrónica',
        'Base de datos y almacenamiento dedicado',
        'SLA 99.9% y soporte 24/7',
      ],
      cta: 'Contactar Asesor',
      href: 'https://wa.me/56912345678?text=Hola,%20me%20interesa%20el%20plan%20Dedicated%20de%20BUN',
      isPrimary: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 md:py-32 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20">
            Precios Transparentes
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Planes Diseñados para Crecer Contigo
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Sin cargos ocultos ni comisiones abusivas por cada hamburguesa vendida.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((p, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                p.isPrimary
                  ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-brand-500 shadow-2xl shadow-brand-500/20 lg:-translate-y-2'
                  : 'bg-slate-950 border border-slate-800 shadow-xl'
              }`}
            >
              {p.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-brand-500 to-amber-500 text-white text-[10px] font-black uppercase tracking-wider shadow-lg">
                  {p.badge}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white">{p.name}</h3>
                  <p className="text-xs text-slate-400 mt-1 min-h-[32px]">{p.description}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-black text-white">{p.price}</span>
                  <span className="text-xs text-slate-400 font-semibold">{p.period}</span>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-800/80">
                  <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">Incluye:</p>
                  <ul className="space-y-2.5">
                    {p.features.map((f, fi) => (
                      <li key={fi} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8">
                <a
                  href={p.href}
                  className={`w-full py-3.5 px-4 rounded-xl text-center font-extrabold text-xs shadow-md transition flex items-center justify-center gap-2 ${
                    p.isPrimary
                      ? 'bg-brand-500 hover:bg-brand-600 text-white shadow-brand-500/25'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700'
                  }`}
                >
                  <span>{p.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
