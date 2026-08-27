import React from 'react';
import type { Product, Category } from '@/lib/types';
import { Star, Edit2, Trash2, Layers, Tag } from 'lucide-react';

interface ProductAdminCardProps {
  product: Product;
  category?: Category;
  currencySymbol: string;
  onToggleFeatured: (productId: string, currentFeatured: boolean) => void;
  onEdit: (product: Product) => void;
  onDelete: (productId: string, productName: string) => void;
}

export default function ProductAdminCard({
  product,
  category,
  currencySymbol,
  onToggleFeatured,
  onEdit,
  onDelete,
}: ProductAdminCardProps) {
  return (
    <div className="bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] shadow-coffee-sm rounded-2xl overflow-hidden hover:border-[#D7C7B5] dark:hover:border-[#4D2D26] transition flex flex-col justify-between">
      <div>
        {/* Image Header */}
        <div className="relative h-44 bg-[#FAF7F2] dark:bg-[#180E0C] overflow-hidden">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl text-[#8C7E73]">
              ☕
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {product.isFeatured && (
              <span className="px-2 py-1 bg-color2 text-coffee-950 text-[10px] font-extrabold rounded-md shadow flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" />
                DESTACADO
              </span>
            )}
            {!product.isAvailable && (
              <span className="px-2 py-1 bg-rose-600 text-white text-[10px] font-bold rounded-md shadow">
                AGOTADO
              </span>
            )}
          </div>

          <div className="absolute top-3 right-3 flex gap-1">
            <button
              type="button"
              onClick={() => onToggleFeatured(product.id, product.isFeatured)}
              title={product.isFeatured ? 'Quitar de destacados' : 'Marcar como destacado'}
              className={`p-1.5 rounded-lg backdrop-blur-md transition ${
                product.isFeatured
                  ? 'bg-color2 text-coffee-950'
                  : 'bg-white/80 dark:bg-black/60 text-[#8C7E73] hover:text-coffee-950 dark:hover:text-white'
              }`}
            >
              <Star className={`w-4 h-4 ${product.isFeatured ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Details */}
        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold text-color4 dark:text-color2 uppercase tracking-wider">
              {category?.name || 'Sin Categoría'}
            </span>
            <span className="text-[11px] font-mono text-[#8C7E73] dark:text-[#A8988B]">
              {product.sku || ''}
            </span>
          </div>

          <h3 className="font-bold text-coffee-950 dark:text-white text-base line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-[#70645A] dark:text-[#A8988B] line-clamp-2">
            {product.description || 'Sin descripción'}
          </p>

          {/* Variants & Modifiers Chips */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {product.variants && product.variants.length > 0 && (
              <span className="text-[10px] bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-coffee-800 dark:text-[#E8DFD8] px-2 py-0.5 rounded-md flex items-center gap-1">
                <Layers className="w-3 h-3 text-color3" />
                {product.variants.length} variantes
              </span>
            )}
            {product.modifiers && product.modifiers.length > 0 && (
              <span className="text-[10px] bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-coffee-800 dark:text-[#E8DFD8] px-2 py-0.5 rounded-md flex items-center gap-1">
                <Tag className="w-3 h-3 text-[#2E7D32]" />
                {product.modifiers.length} extras
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer & Actions */}
      <div className="p-4 pt-0 border-t border-[#F4EFEA] dark:border-[#331C18] mt-2 flex items-center justify-between">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-extrabold text-coffee-950 dark:text-white font-mono">
              {currencySymbol}{product.price.toLocaleString('es-CL')}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-xs text-[#8C7E73] line-through font-mono">
                {currencySymbol}{product.compareAtPrice.toLocaleString('es-CL')}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onEdit(product)}
            className="p-2 rounded-lg text-[#8C7E73] dark:text-[#A8988B] hover:text-coffee-950 dark:hover:text-white hover:bg-[#FAF7F2] dark:hover:bg-[#2F1B17] transition"
            title="Editar producto"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(product.id, product.name)}
            className="p-2 rounded-lg text-[#8C7E73] hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition"
            title="Eliminar producto"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
