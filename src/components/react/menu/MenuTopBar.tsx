import React, { useState } from 'react';
import { Palette, Check } from 'lucide-react';

export const MENU_THEME_COLORS = [
  { name: 'Ámbar Oro', hex: '#F59E0B' },
  { name: 'Naranja Brasa', hex: '#EA580C' },
  { name: 'Esmeralda', hex: '#10B981' },
  { name: 'Azul Cupertino', hex: '#0071E3' },
  { name: 'Borgoña Tostado', hex: '#991B1B' },
  { name: 'Moca Craft', hex: '#B45309' },
];

interface MenuTopBarProps {
  tableNumber?: string;
  themeColor: string;
  onColorChange: (colorHex: string) => void;
}

export default function MenuTopBar({
  tableNumber,
  themeColor,
  onColorChange,
}: MenuTopBarProps) {
  const [showColorPicker, setShowColorPicker] = useState(false);

  return (
    <div className="bg-[#0E0E11]/90 backdrop-blur-xl border-b border-white/[0.08] px-4 py-2 text-xs flex items-center justify-between z-40 sticky top-0">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span className="text-[11px] font-semibold text-zinc-300">
          {tableNumber ? `Atención en Mesa #${tableNumber}` : 'Menú Digital • Abierto'}
        </span>
      </div>

      {/* Dynamic Theme Color Picker */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowColorPicker(!showColorPicker)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-[11px] font-bold text-zinc-200 transition-all duration-200 active:scale-95"
        >
          <Palette className="w-3.5 h-3.5" style={{ color: themeColor }} />
          <span>Tema Carta</span>
          <div
            className="w-3 h-3 rounded-full border border-white/30 shadow-sm"
            style={{ backgroundColor: themeColor }}
          />
        </button>

        {showColorPicker && (
          <div className="absolute right-0 mt-2 p-2.5 rounded-2xl bg-[#16161A] border border-white/[0.15] shadow-2xl z-50 flex items-center gap-2 backdrop-blur-2xl">
            {MENU_THEME_COLORS.map((c) => (
              <button
                key={c.hex}
                type="button"
                onClick={() => {
                  onColorChange(c.hex);
                  setShowColorPicker(false);
                }}
                title={c.name}
                className="w-6 h-6 rounded-full border-2 transition flex items-center justify-center hover:scale-110 shadow-sm"
                style={{
                  backgroundColor: c.hex,
                  borderColor: themeColor === c.hex ? '#FFFFFF' : 'transparent',
                }}
              >
                {themeColor === c.hex && <Check className="w-3 h-3 text-white stroke-[3]" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
