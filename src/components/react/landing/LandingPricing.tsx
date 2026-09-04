import React from 'react';
import { IconCheck, IconArrowUpRight } from '@tabler/icons-react';

export default function LandingPricing() {
  const plans = [
    {
      name: 'Starter',
      price: '$0',
      period: 'Gratis permanente',
      description: 'Para bares emergentes y cervecerías artesanales en fase inicial.',
      badge: null,
      features: [
        'Menú digital QR interactivo móvil',
        'Pedidos directos por WhatsApp',
        'Hasta 50 platos o cervezas',
        '0% comisión sobre ventas',
        'Subdominio brew.cl incluido',
      ],
      cta: 'Comenzar Gratis',
      href: '/sign-in',
      isPrimary: false,
    },
    {
      name: 'Pro Cervecero',
      price: '$19.990',
      period: '/ mes',
      description: 'Para locales activos que requieren pantalla de cocina KDS y copiloto IA.',
      badge: 'RECOMENDADO',
      features: [
        'Todo lo incluido en Starter',
        'Cocina KDS en tiempo real con alertas sonoras',
        'Copiloto Brew IA con recomendaciones nocturnas',
        'Dominio propio personalizado (.cl o .com)',
        'Catálogo, variantes y extras ilimitados',
        'Soporte prioritario para barra y cocina',
      ],
      cta: 'Probar Plan Pro',
      href: '/sign-in',
      isPrimary: true,
    },
    {
      name: 'Empresas & Cadenas',
      price: 'A Medida',
      period: 'Facturación anual',
      description: 'Para franquicias, múltiples locales o grupos gastronómicos.',
      badge: 'ENTERPRISE',
      features: [
        'Multi-sucursales centralizadas',
        'Base de datos libSQL dedicada',
        'Marca blanca total y personalización a medida',
        'SLA 99.9% de alta disponibilidad',
        'Integración con cajas físicas y sistemas POS',
      ],
      cta: 'Contactar Asesor',
      href: 'mailto:ventas@brew.cl',
      isPrimary: false,
    },
  ];

  return (
    <section id="planes" className="py-20 md:py-28 border-t border-white/[0.08] font-mono">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="text-xs uppercase tracking-widest text-amber-400/90 mb-4">
          // PLANES_TRANSPARENTES_03
        </p>

        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-normal text-white mb-3 tracking-tight">
            Tarifas simples y sin comisiones ocultas
          </h2>
          <p className="text-sm text-zinc-400 max-w-lg">
            Mantén el 100% del valor de tus ventas. Sin porcentajes por pedido ni retenciones.
          </p>
        </div>

        {/* Minimalist Border Grid for Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-white/[0.08]">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative border-r border-b border-white/[0.08] p-8 flex flex-col justify-between transition-colors ${
                plan.isPrimary ? 'bg-white/[0.02]' : 'hover:bg-white/[0.01]'
              }`}
            >
              <div>
                {/* Header with Plan Name & Badge */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm uppercase tracking-wider font-semibold text-white">
                    {plan.name}
                  </h3>
                  {plan.badge && (
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-[2px] border border-amber-500/40 bg-amber-500/10 text-amber-400">
                      {plan.badge}
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="mb-4">
                  <div className="text-3xl font-bold text-white tracking-tight">
                    {plan.price}
                  </div>
                  <div className="text-[11px] text-zinc-500 mt-0.5 font-normal">
                    {plan.period}
                  </div>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed mb-6 font-sans">
                  {plan.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2.5 mb-8 border-t border-white/[0.06] pt-6 font-sans">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-xs text-zinc-300">
                      <IconCheck className="w-3.5 h-3.5 text-amber-400 shrink-0 stroke-[2.5]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <a
                href={plan.href}
                className={`w-full py-2.5 rounded-[4px] text-xs font-mono uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-1.5 ${
                  plan.isPrimary
                    ? 'bg-white text-black font-semibold hover:bg-zinc-200'
                    : 'border border-white/[0.12] text-zinc-300 hover:text-white hover:border-white/30 hover:bg-white/[0.03]'
                }`}
              >
                <span>{plan.cta}</span>
                <IconArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
