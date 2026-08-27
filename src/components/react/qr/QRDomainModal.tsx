import React, { useState } from 'react';
import { X, Globe, AlertTriangle } from 'lucide-react';

interface QRDomainModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QRDomainModal({ isOpen, onClose }: QRDomainModalProps) {
  const [customDomain, setCustomDomain] = useState('');

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Dominio configurado: ${customDomain}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 transition-colors">
        <div className="flex items-center justify-between pb-3 border-b border-[#EAE1D6] dark:border-[#3D2420]">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-color4 dark:text-color2" />
            <h3 className="font-bold text-coffee-950 dark:text-white text-base">
              Conectar Dominio Propio
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#8C7E73] hover:text-coffee-950 dark:hover:text-white p-1 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-[#70645A] dark:text-[#A8988B] leading-relaxed">
          Ingresa el dominio que compraste (ej. <strong>menu.turestaurante.cl</strong>). Luego apunta un registro CNAME en tu proveedor DNS a <code className="px-1.5 py-0.5 rounded bg-[#FAF7F2] dark:bg-[#180E0C] text-color4 font-mono font-bold">domains.bun.app</code>.
        </p>

        <form onSubmit={handleSave} className="space-y-4 pt-1">
          <div>
            <label className="block text-xs font-semibold text-coffee-950 dark:text-[#E8DFD8] mb-1">Tu Dominio</label>
            <input
              type="text"
              required
              value={customDomain}
              onChange={(e) => setCustomDomain(e.target.value)}
              placeholder="menu.mirestaurante.cl"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-coffee-950 dark:text-white text-xs font-mono focus:outline-none"
            />
          </div>

          <div className="p-3 rounded-xl bg-[#FEF8E3] dark:bg-[#33220E] border border-[#FDECB8] dark:border-[#593E1A] flex items-start gap-2.5 text-xs text-[#B1813B] dark:text-[#FBBF24]">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="text-[11px] leading-relaxed">
              El certificado SSL HTTPS se generará y renovará de forma 100% automática una vez apuntado el registro.
            </span>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-[#70645A] dark:text-[#A8988B]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-color4 hover:bg-[#522B2B] text-white font-bold text-xs shadow-coffee-sm transition"
            >
              Guardar Dominio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
