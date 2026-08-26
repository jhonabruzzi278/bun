import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function LandingFAQ() {
  const faqs = [
    {
      q: '¿Cómo funciona la recepción de pedidos por WhatsApp?',
      a: 'Tus clientes entran a tu enlace o escanean el QR, seleccionan sus productos y al hacer clic en "Pedir", se abre WhatsApp con el mensaje completamente formateado con el desglose del pedido, total, nombre y dirección del cliente.',
    },
    {
      q: '¿Cobran comisiones o porcentajes por cada venta?',
      a: 'No. En BUN creemos en el crecimiento de tu restaurante. No cobramos comisiones por pedido ni por volumen de ventas.',
    },
    {
      q: '¿Qué es el Tablero de Cocina KDS y qué equipo necesito?',
      a: 'El KDS (Kitchen Display System) es una pantalla web que reemplaza las comandas de papel. Funciona en cualquier tablet (iPad o Android), televisor Smart TV o computador con navegador web.',
    },
    {
      q: '¿Puedo conectar mi propio dominio (.cl, .com, .mx)?',
      a: 'Sí. A partir del Plan Pro puedes vincular tu propio dominio personalizado (ej. tudominio.com) para que tus clientes naveguen directamente en tu marca.',
    },
    {
      q: '¿Cuánto tiempo toma tener el menú listo?',
      a: 'Menos de 5 minutos. Solo ingresas el nombre de tu local, creas tus categorías, cargas tus productos con foto y precio, y tu menú estará en línea de inmediato.',
    },
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 md:py-32 bg-slate-950/40 border-t border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20">
            Resuelve tus dudas
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Preguntas Frecuentes
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-bold text-white hover:text-brand-400 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-brand-400' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
