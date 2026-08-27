import React, { useState } from 'react';
import { useCatalogStore } from '@/lib/useCatalogStore';
import type { Product } from '@/lib/types';

import ProductFilterTabs from './ProductFilterTabs';
import ProductAdminCard from './ProductAdminCard';
import ProductFormModal from './ProductFormModal';

export default function ProductManagerIsland() {
  const { products, categories, business, addProduct, updateProduct, deleteProduct, isLoaded } = useCatalogStore();
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  if (!isLoaded) {
    return <div className="text-[#8C7E73] dark:text-[#A8988B] text-sm p-4">Cargando catálogo de productos...</div>;
  }

  const filteredProducts = products.filter((p) => {
    if (selectedCategoryFilter === 'ALL') return true;
    if (selectedCategoryFilter === 'FEATURED') return p.isFeatured;
    return p.categoryId === selectedCategoryFilter;
  });

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (formData: any) => {
    if (!formData.categoryId && categories.length > 0) {
      formData.categoryId = categories[0].id;
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, formData);
    } else {
      addProduct({
        ...formData,
        position: products.length + 1,
      });
    }
    setIsModalOpen(false);
  };

  const handleDeleteProduct = (productId: string, productName: string) => {
    if (confirm(`¿Eliminar producto "${productName}"?`)) {
      deleteProduct(productId);
    }
  };

  const handleToggleFeatured = (productId: string, currentFeatured: boolean) => {
    updateProduct(productId, { isFeatured: !currentFeatured });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* 1. Header and Category Filter Tabs */}
      <ProductFilterTabs
        categories={categories}
        products={products}
        selectedCategoryFilter={selectedCategoryFilter}
        onSelectCategoryFilter={setSelectedCategoryFilter}
        onOpenCreateModal={handleOpenCreate}
      />

      {/* 2. Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full p-12 text-center text-[#8C7E73] dark:text-[#A8988B] bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] rounded-2xl space-y-3">
            <p className="text-sm">No se encontraron productos en esta sección.</p>
            <button type="button" onClick={handleOpenCreate} className="text-xs text-color3 font-bold hover:underline">
              Agregar un producto ahora
            </button>
          </div>
        ) : (
          filteredProducts.map((product) => {
            const category = categories.find((c) => c.id === product.categoryId);
            return (
              <ProductAdminCard
                key={product.id}
                product={product}
                category={category}
                currencySymbol={business.currencySymbol || '$'}
                onToggleFeatured={handleToggleFeatured}
                onEdit={handleOpenEdit}
                onDelete={handleDeleteProduct}
              />
            );
          })
        )}
      </div>

      {/* 3. Product Create / Edit Modal */}
      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        categories={categories}
        currencySymbol={business.currencySymbol || '$'}
        editingProduct={editingProduct}
        onSave={handleSaveProduct}
      />
    </div>
  );
}
