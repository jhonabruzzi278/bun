import React from 'react';
import type { Product } from '@/lib/types';
import { Plus } from 'lucide-react';
import { Badge } from '@/components/ui';

interface MenuProductCardProps {
  product: Product;
  currencySymbol: string;
  themeColor: string;
  isReadOnly?: boolean;
  onSelect: (product: Product) => void;
}

export default function MenuProductCard({
  product,
  currencySymbol,
  themeColor,
  isReadOnly = false,
  onSelect,
}: MenuProductCardProps) {
  return (
    <div
      onClick={() => !isReadOnly && onSelect(product)}
      className="p-4 rounded-3xl bg-[#1C1C1E]/80 backdrop-blur-xl border border-white/[0.08] hover:border-amber-500/40 flex gap-4 cursor-pointer group transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
    >
      {/* Product Image */}
      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-black/40 overflow-hidden shrink-0 relative border border-white/[0.06]">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl">☕</div>
        )}
        {product.isFeatured && (
          <div className="absolute top-2 left-2">
            <Badge variant="amber" dot className="px-2 py-0.5 shadow-md">
              TOP
            </Badge>
          </div>
        )}
      </div>

      {/* Info & Price */}
      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div className="space-y-1.5">
          <h3 className="font-black text-sm sm:text-base text-white group-hover:text-amber-400 transition-colors truncate tracking-tight">
            {product.name}
          </h3>
          <p className="text-xs text-[#A8988B] line-clamp-2 leading-relaxed">
            {product.description || 'Elaborado artesanalmente con ingredientes seleccionados de primera calidad.'}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-sm sm:text-base font-black text-amber-400 font-mono tracking-tight">
            {currencySymbol}{product.price.toLocaleString('es-CL')}
          </span>

          {!isReadOnly && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(product);
              }}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold text-black bg-white hover:bg-amber-400 flex items-center gap-1.5 shadow-sm transition-all duration-200 active:scale-95 group-hover:bg-amber-400"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Pedir</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
