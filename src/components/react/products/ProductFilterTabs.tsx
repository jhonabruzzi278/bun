import React from 'react';
import type { Category, Product } from '@/lib/types';
import { Plus, Star } from 'lucide-react';

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
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-coffee-950 dark:text-white">
            Catálogo de Productos
          </h1>
          <p className="text-xs sm:text-sm text-[#70645A] dark:text-[#A8988B] mt-0.5">
            Gestiona precios, fotos, variantes y modificadores de tus platos y bebidas.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-color4 hover:bg-[#522B2B] dark:bg-color3 dark:hover:bg-color4 text-white font-bold text-xs shadow-coffee-sm transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Producto</span>
        </button>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          type="button"
          onClick={() => onSelectCategoryFilter('ALL')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
            selectedCategoryFilter === 'ALL'
              ? 'bg-color4 dark:bg-color3 text-white shadow-sm'
              : 'bg-white dark:bg-[#241512] text-[#70645A] dark:text-[#A8988B] hover:text-coffee-950 dark:hover:text-white border border-[#EAE1D6] dark:border-[#3D2420]'
          }`}
        >
          Todos ({products.length})
        </button>

        <button
          type="button"
          onClick={() => onSelectCategoryFilter('FEATURED')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
            selectedCategoryFilter === 'FEATURED'
              ? 'bg-color2 text-coffee-950 font-bold shadow-sm'
              : 'bg-white dark:bg-[#241512] text-[#70645A] dark:text-[#A8988B] hover:text-coffee-950 dark:hover:text-white border border-[#EAE1D6] dark:border-[#3D2420]'
          }`}
        >
          <Star className="w-3.5 h-3.5 fill-current" />
          Destacados ({featuredCount})
        </button>

        {categories.map((c) => {
          const count = products.filter((p) => p.categoryId === c.id).length;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => onSelectCategoryFilter(c.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                selectedCategoryFilter === c.id
                  ? 'bg-color4 dark:bg-color3 text-white shadow-sm'
                  : 'bg-white dark:bg-[#241512] text-[#70645A] dark:text-[#A8988B] hover:text-coffee-950 dark:hover:text-white border border-[#EAE1D6] dark:border-[#3D2420]'
              }`}
            >
              {c.name} ({count})
            </button>
          );
        })}
      </div>
    </div>
  );
}
