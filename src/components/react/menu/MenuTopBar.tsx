import React, { useState } from 'react';
import { Palette, Check } from 'lucide-react';

export const MENU_THEME_COLORS = [
  { name: 'Café Moca', hex: '#774C3B' },
  { name: 'Naranja Brasa', hex: '#EA580C' },
  { name: 'Esmeralda', hex: '#059669' },
  { name: 'Ámbar Oro', hex: '#D97706' },
  { name: 'Borgoña', hex: '#991B1B' },
  { name: 'Azul Real', hex: '#2563EB' },
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
    <div className="bg-[#241512] border-b border-[#3D2420] px-4 py-2 text-xs flex items-center justify-between z-40 relative">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span className="text-[11px] font-semibold text-[#D4C5B9]">
          {tableNumber ? `Atención en Mesa #${tableNumber}` : 'Menú Digital • Abierto'}
        </span>
      </div>

      {/* Dynamic Theme Color Picker */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowColorPicker(!showColorPicker)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#2F1B17] hover:bg-[#3D2420] border border-[#4D2D26] text-[11px] font-bold text-[#E8DFD8] transition"
        >
          <Palette className="w-3.5 h-3.5" style={{ color: themeColor }} />
          <span>Tema Carta</span>
          <div
            className="w-3 h-3 rounded-full border border-white/20 shadow-sm"
            style={{ backgroundColor: themeColor }}
          />
        </button>

        {showColorPicker && (
          <div className="absolute right-0 mt-2 p-2.5 rounded-2xl bg-[#241512] border border-[#422621] shadow-2xl z-50 flex items-center gap-2">
            {MENU_THEME_COLORS.map((c) => (
              <button
                key={c.hex}
                type="button"
                onClick={() => {
                  onColorChange(c.hex);
                  setShowColorPicker(false);
                }}
                title={c.name}
                className="w-6 h-6 rounded-full border-2 transition flex items-center justify-center hover:scale-110"
                style={{
                  backgroundColor: c.hex,
                  borderColor: themeColor === c.hex ? '#FFFFFF' : 'transparent',
                }}
              >
                {themeColor === c.hex && <Check className="w-3 h-3 text-white" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
