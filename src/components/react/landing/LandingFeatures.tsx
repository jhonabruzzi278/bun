import React from 'react';
import {
  IconQrcode,
  IconBrandWhatsapp,
  IconChefHat,
  IconCash,
  IconSparkles,
  IconDatabase,
  IconArrowUpRight
} from '@tabler/icons-react';

export default function LandingFeatures() {
  const modules = [
    {
      id: 'menu',
      name: 'Menú Digital QR',
      description: 'Carta web responsive con carga instantánea, selector de variantes, notas y extras con cobro dinámico.',
      icon: IconQrcode,
      href: '/menu/burger-craft',
      tags: ['CLIENTE', 'QR INTERACTIVO'],
      featured: true,
    },
    {
      id: 'whatsapp',
      name: 'Pedidos por WhatsApp',
      description: 'Envío de comanda estructurada con resumen, notas especiales y total calculado directo al chat del local.',
      icon: IconBrandWhatsapp,
      href: '/menu/burger-craft',
      tags: ['VENTA DIRECTA', '0% COMISIÓN'],
      featured: false,
    },
    {
      id: 'kds',
      name: 'Cocina KDS en Tiempo Real',
      description: 'Tablero de comandas con cronómetro en vivo, semáforo de demoras y filtrado por estaciones de preparación.',
      icon: IconChefHat,
      href: '/admin/kitchen',
      tags: ['COCINA', 'POLLING CLOUD'],
      featured: true,
    },
    {
      id: 'pos',
      name: 'Punto de Venta (POS)',
      description: 'Caja rápida para atención en mostrador y comandas de mesas con arqueo en vivo y control de turno.',
      icon: IconCash,
      href: '/admin/pos',
      tags: ['CAJA', 'MOSTRADOR'],
      featured: false,
    },
    {
      id: 'ai',
      name: 'Copiloto Brew IA',
      description: 'Asesoría con la lechuza Brew: diagnóstico de rotación, sugerencia de maridajes y matriz de rentabilidad.',
      icon: IconSparkles,
      href: '/admin/ai',
      tags: ['LECHUZA BREW', 'ANALÍTICA'],
      featured: true,
    },
    {
      id: 'turso',
      name: 'Base de Datos libSQL Turso',
      description: 'Almacenamiento en edge ultrarrápido con SQLite serverless sincronizado entre clientes y barra sin fricción.',
      icon: IconDatabase,
      href: '/admin',
      tags: ['EDGE COMPUTING', '5MS LATENCIA'],
      featured: false,
    },
  ];

  return (
    <section id="modulos" className="py-20 md:py-28 border-t border-white/[0.08] font-mono">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Kicker & Header */}
        <p className="text-xs uppercase tracking-widest text-amber-400/90 mb-4">
          // MODULOS_OPERATIVOS_02
        </p>

        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-normal text-white mb-3 tracking-tight">
            Ecosistema modular de brew.cl
          </h2>
          <p className="text-sm text-zinc-400 max-w-lg">
            Componentes desacoplados construidos para operar a alta velocidad tanto en sala como en cocina y delivery.
          </p>
        </div>

        {/* The Signature ToolDev Border Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/[0.08]">
          {modules.map((m) => {
            const Icon = m.icon;

            return (
              <a
                key={m.id}
                href={m.href}
                className="group relative block border-r border-b border-white/[0.08] p-7 hover:bg-white/[0.02] transition-colors"
              >
                {/* Minimalist Top Corner Sparkle */}
                {m.featured && (
                  <span className="absolute top-4 right-4 text-amber-400 text-sm" aria-hidden="true">
                    ✦
                  </span>
                )}

                {/* Header: Icon + Title + Diagonal Arrow */}
                <div className="flex items-center gap-2.5 mb-3">
                  <Icon className="w-4 h-4 text-amber-400 shrink-0" />
                  <h3 className="text-sm font-semibold text-white truncate tracking-tight">
                    {m.name}
                  </h3>
                  <IconArrowUpRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-amber-400 transition-colors shrink-0 ml-auto" />
                </div>

                {/* Description */}
                <p className="text-xs text-zinc-400 leading-relaxed mb-6 line-clamp-3 font-sans">
                  {m.description}
                </p>

                {/* Minimalist Micro-tags */}
                <div className="flex items-center gap-2 flex-wrap">
                  {m.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-[2px] border border-white/[0.08] text-zinc-400 bg-white/[0.02]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
