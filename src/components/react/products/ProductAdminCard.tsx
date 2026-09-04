import React from 'react';
import type { Product, Category } from '@/lib/types';
import { Star, Edit2, Trash2, Layers, Tag } from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui';

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
    <Card glass className="rounded-3xl border-white/[0.08] overflow-hidden flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
      <div>
        {/* Image Header */}
        <div className="relative h-44 bg-black/40 overflow-hidden">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl text-[#8C7E73]">
              ☕
            </div>
          )}

          {/* Apple Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {product.isFeatured && (
              <Badge variant="amber" dot className="shadow-md backdrop-blur-md">
                DESTACADO
              </Badge>
            )}
            {!product.isAvailable && (
              <Badge variant="destructive" className="shadow-md backdrop-blur-md">
                AGOTADO
              </Badge>
            )}
          </div>

          <div className="absolute top-3 right-3 flex gap-1">
            <button
              type="button"
              onClick={() => onToggleFeatured(product.id, product.isFeatured)}
              title={product.isFeatured ? 'Quitar de destacados' : 'Marcar como destacado'}
              className={`p-2 rounded-xl backdrop-blur-xl transition active:scale-90 ${
                product.isFeatured
                  ? 'bg-amber-500 text-black shadow-md'
                  : 'bg-black/60 text-white/70 hover:text-white hover:bg-black/80'
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-current" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-black text-sm sm:text-base text-coffee-950 dark:text-white tracking-tight truncate">
                {product.name}
              </h3>
              {category && (
                <span className="text-[11px] text-[#A8988B] flex items-center gap-1 mt-0.5 font-medium">
                  <Tag className="w-3 h-3 text-amber-400" />
                  {category.name}
                </span>
              )}
            </div>

            <span className="font-mono font-black text-base text-amber-500 dark:text-amber-400">
              {currencySymbol}{product.price.toLocaleString('es-CL')}
            </span>
          </div>

          <p className="text-xs text-[#8C7E73] dark:text-[#A8988B] line-clamp-2 leading-relaxed">
            {product.description || 'Sin descripción ingresada.'}
          </p>

          {/* Variants & Modifiers Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {product.variants && product.variants.length > 0 && (
              <Badge variant="secondary" className="text-[10px]">
                <Layers className="w-3 h-3 mr-1 text-amber-400" />
                {product.variants.length} variantes
              </Badge>
            )}
            {product.modifiers && product.modifiers.length > 0 && (
              <Badge variant="secondary" className="text-[10px]">
                {product.modifiers.length} extras
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-neutral-100 dark:border-white/[0.06] bg-neutral-50/50 dark:bg-black/20 flex items-center justify-end gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(product.id, product.name)}
          className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8 px-2.5"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Eliminar</span>
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => onEdit(product)}
          className="h-8 px-3 text-xs"
        >
          <Edit2 className="w-3 h-3" />
          <span>Editar</span>
        </Button>
      </div>
    </Card>
  );
}
