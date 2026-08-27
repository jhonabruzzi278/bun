import React, { useState } from 'react';
import type { Product } from '@/lib/types';
import { Sparkles, Copy, CheckCircle2 } from 'lucide-react';

interface AiCopywritingGeneratorProps {
  products: Product[];
}

export default function AiCopywritingGenerator({ products }: AiCopywritingGeneratorProps) {
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || '');
  const [tone, setTone] = useState<'gourmet' | 'casual' | 'urgency'>('gourmet');
  const [generatedCopy, setGeneratedCopy] = useState<string | null>(null);
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  const handleGenerateCopy = () => {
    const prod = products.find((p) => p.id === selectedProductId) || products[0];
    if (!prod) return;

    if (tone === 'gourmet') {
      setGeneratedCopy(`✨ Exclusivo ${prod.name}: Elaborado artesanalmente con ingredientes nobles seleccionados, cocción precisa y texturas crocantes que despiertan los sentidos. Una experiencia sublime en cada bocado.`);
    } else if (tone === 'casual') {
      setGeneratedCopy(`🔥 ¿Antojo de algo brutal? Nuestro ${prod.name} viene cargado con todo el sabor, queso extra fundido y el toque crujiente perfecto. ¡Pídelo ya antes de que se agote!`);
    } else {
      setGeneratedCopy(`⚡ ¡Solo por hoy! Disfruta de ${prod.name} recién salido de cocina. Unidades limitadas disponibles en nuestro menú digital. ¡Pide el tuyo ahora!`);
    }
  };

  const handleCopyText = () => {
    if (generatedCopy) {
      navigator.clipboard.writeText(generatedCopy);
      setCopiedSuccess(true);
      setTimeout(() => setCopiedSuccess(false), 2000);
    }
  };

  return (
    <div className="p-8 rounded-3xl bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] shadow-coffee-sm space-y-6">
      <div>
        <h2 className="text-lg font-extrabold text-coffee-950 dark:text-white">Generador de Copywriting Gastronómico</h2>
        <p className="text-xs text-[#70645A] dark:text-[#A8988B] mt-1">Crea descripciones irresistibles para tus platos en 1 clic.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-coffee-950 dark:text-[#E8DFD8] mb-1.5">Selecciona el Plato</label>
          <select
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-xs text-coffee-950 dark:text-white"
          >
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} (${p.price.toLocaleString('es-CL')})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-coffee-950 dark:text-[#E8DFD8] mb-1.5">Tono del Mensaje</label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setTone('gourmet')}
              className={`py-2 rounded-xl text-xs font-bold border transition ${
                tone === 'gourmet' ? 'bg-color4 text-white border-transparent' : 'bg-[#FAF7F2] dark:bg-[#180E0C] text-[#70645A] border-[#EAE1D6] dark:border-[#3D2420]'
              }`}
            >
              🍷 Gourmet
            </button>
            <button
              type="button"
              onClick={() => setTone('casual')}
              className={`py-2 rounded-xl text-xs font-bold border transition ${
                tone === 'casual' ? 'bg-color4 text-white border-transparent' : 'bg-[#FAF7F2] dark:bg-[#180E0C] text-[#70645A] border-[#EAE1D6] dark:border-[#3D2420]'
              }`}
            >
              🍔 Sabor Intenso
            </button>
            <button
              type="button"
              onClick={() => setTone('urgency')}
              className={`py-2 rounded-xl text-xs font-bold border transition ${
                tone === 'urgency' ? 'bg-color4 text-white border-transparent' : 'bg-[#FAF7F2] dark:bg-[#180E0C] text-[#70645A] border-[#EAE1D6] dark:border-[#3D2420]'
              }`}
            >
              ⚡ Promoción
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleGenerateCopy}
          className="px-6 py-2.5 rounded-xl bg-color4 hover:bg-[#522B2B] text-white font-bold text-xs flex items-center gap-2 shadow-coffee-sm transition"
        >
          <Sparkles className="w-4 h-4" />
          <span>Generar Texto con IA</span>
        </button>
      </div>

      {generatedCopy && (
        <div className="p-5 rounded-2xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] space-y-3 animate-fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-color4 dark:text-color2">Texto Generado:</span>
            <button
              type="button"
              onClick={handleCopyText}
              className="flex items-center gap-1 text-xs font-bold text-coffee-950 dark:text-white hover:text-color4"
            >
              {copiedSuccess ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500">Copiado al portapapeles</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar</span>
                </>
              )}
            </button>
          </div>
          <p className="text-xs text-coffee-950 dark:text-[#E8DFD8] leading-relaxed italic">
            "{generatedCopy}"
          </p>
        </div>
      )}
    </div>
  );
}
