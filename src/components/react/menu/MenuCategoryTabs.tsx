import React from 'react';
import type { Category } from '@/lib/types';
import { Search } from 'lucide-react';

interface MenuCategoryTabsProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  hasFeaturedProducts: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  themeColor: string;
}

export default function MenuCategoryTabs({
  categories,
  selectedCategory,
  onSelectCategory,
  hasFeaturedProducts,
  searchQuery,
  onSearchChange,
  themeColor,
}: MenuCategoryTabsProps) {
  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
        <input
          type="text"
          placeholder="Buscar plato, bebida, postre..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-zinc-900/80 border border-white/[0.08] text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-amber-500/50 backdrop-blur-md transition-all"
        />
      </div>

      {/* Sticky Categories Selector */}
      <div className="sticky top-11 z-20 bg-[#09090B]/90 backdrop-blur-xl py-3 -mx-4 px-4 flex items-center gap-2 overflow-x-auto scrollbar-none border-b border-white/[0.08]">
        <button
          type="button"
          onClick={() => onSelectCategory('ALL')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 active:scale-95 ${
            selectedCategory === 'ALL'
              ? 'bg-white text-black font-black shadow-sm'
              : 'bg-white/[0.05] text-zinc-400 hover:text-white border border-white/[0.08]'
          }`}
        >
          Todos
        </button>

        {hasFeaturedProducts && (
          <button
            type="button"
            onClick={() => onSelectCategory('FEATURED')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 active:scale-95 ${
              selectedCategory === 'FEATURED'
                ? 'bg-amber-500 text-black font-black shadow-sm'
                : 'bg-white/[0.05] text-zinc-400 hover:text-white border border-white/[0.08]'
            }`}
          >
            ⭐ Destacados
          </button>
        )}

        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 active:scale-95 ${
                isSelected
                  ? 'bg-white text-black font-black shadow-sm'
                  : 'bg-white/[0.05] text-zinc-400 hover:text-white border border-white/[0.08]'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
