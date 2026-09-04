import React from 'react';
import type { Category, Product } from '@/lib/types';
import { Plus, Star } from 'lucide-react';
import { Button, Badge } from '@/components/ui';

interface ProductFilterTabsProps {
  categories: Category[];
  products: Product[];
  selectedCategoryFilter: string;
  onSelectCategoryFilter: (catId: string) => void;
  onOpenCreateModal: () => void;
}

export default function ProductFilterTabs({
  categories,
  products,
  selectedCategoryFilter,
  onSelectCategoryFilter,
  onOpenCreateModal,
}: ProductFilterTabsProps) {
  const featuredCount = products.filter((p) => p.isFeatured).length;

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-coffee-950 dark:text-white tracking-tight">
              Catálogo de Productos
            </h1>
            <Badge variant="amber" dot>
              {products.length} platos
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-[#70645A] dark:text-[#A8988B] mt-1">
            Gestiona precios, fotos, variantes y modificadores de tus platos y bebidas en brew.cl.
          </p>
        </div>

        <Button
          variant="primary"
          size="default"
          onClick={onOpenCreateModal}
          className="self-start sm:self-auto shadow-lg shadow-amber-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Producto</span>
        </Button>
      </div>

      {/* Apple-style Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        <button
          type="button"
          onClick={() => onSelectCategoryFilter('ALL')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 active:scale-95 ${
            selectedCategoryFilter === 'ALL'
              ? 'bg-white text-black dark:bg-white dark:text-black shadow-sm font-black'
              : 'bg-white/70 dark:bg-white/[0.05] text-[#70645A] dark:text-[#A8988B] hover:text-black dark:hover:text-white border border-neutral-200 dark:border-white/[0.08] backdrop-blur-md'
          }`}
        >
          Todos ({products.length})
        </button>

        <button
          type="button"
          onClick={() => onSelectCategoryFilter('FEATURED')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 active:scale-95 flex items-center gap-1.5 ${
            selectedCategoryFilter === 'FEATURED'
              ? 'bg-amber-500 text-black shadow-sm font-black'
              : 'bg-white/70 dark:bg-white/[0.05] text-[#70645A] dark:text-[#A8988B] hover:text-black dark:hover:text-white border border-neutral-200 dark:border-white/[0.08] backdrop-blur-md'
          }`}
        >
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>Destacados ({featuredCount})</span>
        </button>

        {categories.map((cat) => {
          const count = products.filter((p) => p.categoryId === cat.id).length;
          const isSelected = selectedCategoryFilter === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategoryFilter(cat.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 active:scale-95 ${
                isSelected
                  ? 'bg-white text-black dark:bg-white dark:text-black shadow-sm font-black'
                  : 'bg-white/70 dark:bg-white/[0.05] text-[#70645A] dark:text-[#A8988B] hover:text-black dark:hover:text-white border border-neutral-200 dark:border-white/[0.08] backdrop-blur-md'
              }`}
            >
              {cat.name} ({count})
            </button>
          );
        })}
      </div>
    </div>
  );
}
