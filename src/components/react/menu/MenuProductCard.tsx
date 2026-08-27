import React from 'react';
import type { Product } from '@/lib/types';
import { Plus } from 'lucide-react';

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
      className="p-3.5 rounded-2xl bg-[#241512] border border-[#3D2420] hover:border-[#522B2B] flex gap-3.5 cursor-pointer group transition-all"
    >
      {/* Product Image */}
      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-[#180E0C] overflow-hidden shrink-0 relative">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl">☕</div>
        )}
        {product.isFeatured && (
          <span
            className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[9px] font-black text-white shadow-sm"
            style={{ backgroundColor: themeColor }}
          >
            TOP
          </span>
        )}
      </div>

      {/* Info & Price */}
      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div className="space-y-1">
          <h3 className="font-extrabold text-sm text-white group-hover:underline truncate">
            {product.name}
          </h3>
          <p className="text-[11px] text-[#A8988B] line-clamp-2 leading-relaxed">
            {product.description || 'Preparado con ingredientes seleccionados de primera calidad.'}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-sm font-black text-white font-mono" style={{ color: themeColor }}>
            {currencySymbol}{product.price.toLocaleString('es-CL')}
          </span>
          {!isReadOnly && (
            <button
              type="button"
              className="px-2.5 py-1 rounded-xl text-white text-xs font-bold transition flex items-center gap-1 shadow-sm"
              style={{ backgroundColor: themeColor }}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Pedir</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
