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
        <Search className="w-4 h-4 text-[#8C7E73] absolute left-3.5 top-3.5" />
        <input
          type="text"
          placeholder="Buscar plato, bebida, postre..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#241512] border border-[#3D2420] text-white text-xs placeholder-[#8C7E73] focus:outline-none shadow-inner"
          style={{ borderColor: searchQuery ? themeColor : undefined }}
        />
      </div>

      {/* Sticky Categories Selector */}
      <div className="sticky top-0 z-20 bg-[#180E0C]/95 backdrop-blur py-2.5 -mx-4 px-4 flex items-center gap-2 overflow-x-auto scrollbar-none border-b border-[#2D1B18]">
        <button
          type="button"
          onClick={() => onSelectCategory('ALL')}
          className="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition"
          style={{
            backgroundColor: selectedCategory === 'ALL' ? themeColor : '#241512',
            color: selectedCategory === 'ALL' ? '#FFFFFF' : '#A8988B',
            borderColor: selectedCategory === 'ALL' ? themeColor : '#3D2420',
            borderWidth: 1,
          }}
        >
          Todos
        </button>

        {hasFeaturedProducts && (
          <button
            type="button"
            onClick={() => onSelectCategory('FEATURED')}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition"
            style={{
              backgroundColor: selectedCategory === 'FEATURED' ? themeColor : '#241512',
              color: selectedCategory === 'FEATURED' ? '#FFFFFF' : '#A8988B',
              borderColor: selectedCategory === 'FEATURED' ? themeColor : '#3D2420',
              borderWidth: 1,
            }}
          >
            ⭐ Destacados
          </button>
        )}

        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition"
            style={{
              backgroundColor: selectedCategory === cat.id ? themeColor : '#241512',
              color: selectedCategory === cat.id ? '#FFFFFF' : '#A8988B',
              borderColor: selectedCategory === cat.id ? themeColor : '#3D2420',
              borderWidth: 1,
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
