import React, { useState } from 'react';
import { IconChevronDown } from '@tabler/icons-react';

export default function LandingFAQ() {
  const faqs = [
    {
      q: '¿Cómo funciona la recepción de pedidos por WhatsApp?',
      a: 'Tus clientes escanean el código QR en mesa o abren el enlace en redes sociales, eligen sus productos y al presionar "Pedir", WhatsApp se abre automáticamente con la comanda perfectamente estructurada con subtotales, notas y dirección.',
    },
    {
      q: '¿Cobran comisiones por cada pedido o venta realizada?',
      a: 'Cero comisiones. En brew.cl el 100% de lo que vendes es para tu negocio. Solo pagas la suscripción fija mensual si decides activar el plan Pro.',
    },
    {
      q: '¿Qué es el Tablero de Cocina KDS y qué pantalla necesito?',
      a: 'El KDS (Kitchen Display System) reemplaza las comandas impresas en papel térmico. Funciona en cualquier navegador: tablets (iPad, Android), pantallas táctiles o monitores en cocina y barra.',
    },
    {
      q: '¿Puedo conectar mi propio dominio (.cl, .com)?',
      a: 'Sí. A partir del Plan Pro puedes configurar tu dominio personalizado para que tus clientes naveguen bajo tu marca propia.',
    },
    {
      q: '¿Quién es Brew y qué funciones realiza el copiloto IA?',
      a: 'Brew es una lechuza barista y cervecera 🦉. Es nuestro motor analítico que evalúa las comandas nocturnas, calcula los platos con mayor margen y te propone combinaciones para aumentar el ticket promedio.',
    },
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 md:py-28 border-t border-white/[0.08] font-mono">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <p className="text-xs uppercase tracking-widest text-amber-400/90 mb-4">
          // PREGUNTAS_FRECUENTES_04
        </p>

        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-normal text-white mb-3 tracking-tight">
            Dudas comunes sobre la plataforma
          </h2>
          <p className="text-sm text-zinc-400">
            Todo lo que necesitas saber antes de implementar brew.cl en tu negocio.
          </p>
        </div>

        <div className="border-t border-white/[0.08] divide-y divide-white/[0.08]">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="py-5">
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left flex items-center justify-between gap-4 text-sm font-semibold text-white hover:text-amber-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <IconChevronDown
                    className={`w-4 h-4 text-zinc-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-amber-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <p className="text-xs text-zinc-400 leading-relaxed mt-3 pr-8 font-sans">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
