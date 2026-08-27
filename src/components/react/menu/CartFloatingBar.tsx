import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';

interface CartFloatingBarProps {
  totalItemsCount: number;
  cartTotal: number;
  currencySymbol: string;
  themeColor: string;
  onOpenCart: () => void;
}

export default function CartFloatingBar({
  totalItemsCount,
  cartTotal,
  currencySymbol,
  themeColor,
  onOpenCart,
}: CartFloatingBarProps) {
  if (totalItemsCount === 0) return null;

  return (
    <div className="fixed bottom-6 inset-x-4 max-w-md mx-auto z-40 animate-bounce-slight">
      <button
        type="button"
        onClick={onOpenCart}
        className="w-full p-4 rounded-2xl text-white font-extrabold shadow-2xl flex items-center justify-between transition-transform active:scale-[0.98] border border-white/20"
        style={{ backgroundColor: themeColor }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-black/20 flex items-center justify-center font-black text-xs">
            {totalItemsCount}
          </div>
          <div className="text-left">
            <span className="text-xs block text-white/80 uppercase tracking-wider font-semibold">
              Tu Comanda
            </span>
            <span className="text-sm font-black font-mono">
              {currencySymbol}{cartTotal.toLocaleString('es-CL')}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs font-bold bg-black/20 px-3 py-1.5 rounded-xl">
          <span>Ver pedido</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </button>
    </div>
  );
}
