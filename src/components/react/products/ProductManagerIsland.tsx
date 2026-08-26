import React, { useState } from 'react';
import { useCatalogStore } from '@/lib/useCatalogStore';
import type { Product, ProductVariant, ProductModifier } from '@/lib/types';
import { Plus, Edit2, Trash2, Star, Eye, EyeOff, Check, X, Tag, Layers, Sparkles, AlertCircle } from 'lucide-react';

export default function ProductManagerIsland() {
  const { products, categories, business, addProduct, updateProduct, deleteProduct, isLoaded } = useCatalogStore();
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    description: '',
    price: 0,
    compareAtPrice: 0 as number | null,
    imageUrl: '',
    sku: '',
    isFeatured: false,
    isVisible: true,
    isAvailable: true,
    variants: [] as ProductVariant[],
    modifiers: [] as ProductModifier[],
  });

  // Variant helper state
  const [newVariantName, setNewVariantName] = useState('');
  const [newVariantPriceDelta, setNewVariantPriceDelta] = useState(0);

  // Modifier helper state
  const [newModGroup, setNewModGroup] = useState('Extras');
  const [newModName, setNewModName] = useState('');
  const [newModPrice, setNewModPrice] = useState(0);

  if (!isLoaded) return <div className="text-slate-400 text-sm">Cargando catálogo de productos...</div>;

  const filteredProducts = products.filter((p) => {
    if (selectedCategoryFilter === 'ALL') return true;
    if (selectedCategoryFilter === 'FEATURED') return p.isFeatured;
    return p.categoryId === selectedCategoryFilter;
  });

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      categoryId: categories[0]?.id || '',
      description: '',
      price: 0,
      compareAtPrice: null,
      imageUrl: '',
      sku: '',
      isFeatured: false,
      isVisible: true,
      isAvailable: true,
      variants: [],
      modifiers: [],
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      categoryId: p.categoryId,
      description: p.description || '',
      price: p.price,
      compareAtPrice: p.compareAtPrice || null,
      imageUrl: p.imageUrl || '',
      sku: p.sku || '',
      isFeatured: p.isFeatured,
      isVisible: p.isVisible,
      isAvailable: p.isAvailable,
      variants: p.variants ? [...p.variants] : [],
      modifiers: p.modifiers ? [...p.modifiers] : [],
    });
    setIsModalOpen(true);
  };

  const handleAddVariant = () => {
    if (!newVariantName.trim()) return;
    const newVariant: ProductVariant = {
      id: `v_${Date.now()}`,
      name: newVariantName.trim(),
      priceDelta: Number(newVariantPriceDelta) || 0,
    };
    setFormData((prev) => ({ ...prev, variants: [...prev.variants, newVariant] }));
    setNewVariantName('');
    setNewVariantPriceDelta(0);
  };

  const handleRemoveVariant = (id: string) => {
    setFormData((prev) => ({ ...prev, variants: prev.variants.filter((v) => v.id !== id) }));
  };

  const handleAddModifier = () => {
    if (!newModName.trim()) return;
    const newMod: ProductModifier = {
      id: `m_${Date.now()}`,
      groupName: newModGroup.trim() || 'Extras',
      name: newModName.trim(),
      price: Number(newModPrice) || 0,
      maxQuantity: 1,
    };
    setFormData((prev) => ({ ...prev, modifiers: [...prev.modifiers, newMod] }));
    setNewModName('');
    setNewModPrice(0);
  };

  const handleRemoveModifier = (id: string) => {
    setFormData((prev) => ({ ...prev, modifiers: prev.modifiers.filter((m) => m.id !== id) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Catálogo de Productos</h1>
          <p className="text-sm text-slate-400">Gestiona precios, fotos, variantes y modificadores de tus platos.</p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-lg shadow-brand-500/25 transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Nuevo Producto
        </button>
      </div>

      {/* Categories Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedCategoryFilter('ALL')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
            selectedCategoryFilter === 'ALL'
              ? 'bg-brand-500 text-white'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Todos ({products.length})
        </button>

        <button
          onClick={() => setSelectedCategoryFilter('FEATURED')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
            selectedCategoryFilter === 'FEATURED'
              ? 'bg-amber-500 text-slate-950 font-bold'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Star className="w-3.5 h-3.5 fill-current" />
          Destacados ({products.filter((p) => p.isFeatured).length})
        </button>

        {categories.map((c) => {
          const count = products.filter((p) => p.categoryId === c.id).length;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedCategoryFilter(c.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                selectedCategoryFilter === c.id
                  ? 'bg-brand-500 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {c.name} ({count})
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full p-12 text-center text-slate-500 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
            <p className="text-sm">No se encontraron productos en esta sección.</p>
            <button onClick={handleOpenCreate} className="text-xs text-brand-400 font-semibold hover:underline">
              Agregar un producto ahora
            </button>
          </div>
        ) : (
          filteredProducts.map((p) => {
            const category = categories.find((c) => c.id === p.categoryId);
            return (
              <div
                key={p.id}
                className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition flex flex-col justify-between"
              >
                <div>
                  {/* Image Header */}
                  <div className="relative h-44 bg-slate-900 overflow-hidden">
                    {p.imageUrl ? (
                      <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl text-slate-700">
                        🍔
                      </div>
                    )}

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {p.isFeatured && (
                        <span className="px-2 py-1 bg-amber-500/90 text-slate-950 text-[10px] font-extrabold rounded-md shadow flex items-center gap-1 backdrop-blur-sm">
                          <Star className="w-3 h-3 fill-current" />
                          DESTACADO
                        </span>
                      )}
                      {!p.isAvailable && (
                        <span className="px-2 py-1 bg-rose-600/90 text-white text-[10px] font-bold rounded-md shadow backdrop-blur-sm">
                          AGOTADO
                        </span>
                      )}
                    </div>

                    <div className="absolute top-3 right-3 flex gap-1">
                      <button
                        onClick={() => updateProduct(p.id, { isFeatured: !p.isFeatured })}
                        title={p.isFeatured ? 'Quitar de destacados' : 'Marcar como destacado'}
                        className={`p-1.5 rounded-lg backdrop-blur-md transition ${
                          p.isFeatured
                            ? 'bg-amber-500 text-slate-950'
                            : 'bg-slate-900/80 text-slate-400 hover:text-white'
                        }`}
                      >
                        <Star className={`w-4 h-4 ${p.isFeatured ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-semibold text-brand-400 uppercase tracking-wider">
                        {category?.name || 'Sin Categoría'}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">{p.sku || ''}</span>
                    </div>

                    <h3 className="font-bold text-white text-base line-clamp-1">{p.name}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2">{p.description || 'Sin descripción'}</p>

                    {/* Variants & Modifiers Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {p.variants && p.variants.length > 0 && (
                        <span className="text-[10px] bg-slate-900 border border-slate-800 text-slate-300 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <Layers className="w-3 h-3 text-brand-400" />
                          {p.variants.length} variantes
                        </span>
                      )}
                      {p.modifiers && p.modifiers.length > 0 && (
                        <span className="text-[10px] bg-slate-900 border border-slate-800 text-slate-300 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <Tag className="w-3 h-3 text-emerald-400" />
                          {p.modifiers.length} extras
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer & Actions */}
                <div className="p-4 pt-0 border-t border-slate-900 mt-2 flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-extrabold text-white">
                        {business.currencySymbol}{p.price.toLocaleString('es-CL')}
                      </span>
                      {p.compareAtPrice && p.compareAtPrice > p.price && (
                        <span className="text-xs text-slate-500 line-through">
                          {business.currencySymbol}{p.compareAtPrice.toLocaleString('es-CL')}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(p)}
                      className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition"
                      title="Editar producto"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`¿Eliminar producto "${p.name}"?`)) {
                          deleteProduct(p.id);
                        }
                      }}
                      className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
                      title="Eliminar producto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal Crear / Editar Producto con Variantes y Modificadores */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-lg">
                {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Nombre del Producto</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="ej. Doble Cheddar Bacon Smash"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Categoría</label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-500"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Código / SKU</label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    placeholder="ej. BURG-001"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Precio ({business.currencySymbol})</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    placeholder="7990"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Precio Antes / Oferta (Opcional)</label>
                  <input
                    type="number"
                    value={formData.compareAtPrice || ''}
                    onChange={(e) => setFormData({ ...formData, compareAtPrice: e.target.value ? Number(e.target.value) : null })}
                    placeholder="8990"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Descripción de Ingredientes / Preparación</label>
                  <textarea
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="ej. Dos hamburguesas de 90g con cheddar derretido, tocino crujiente..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">URL de la Foto</label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              {/* Switches Destacado / Disponible */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 text-brand-500 rounded border-slate-700 bg-slate-900"
                  />
                  <span className="text-xs text-slate-200 font-medium">⭐ Destacado Portada</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isAvailable}
                    onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                    className="w-4 h-4 text-brand-500 rounded border-slate-700 bg-slate-900"
                  />
                  <span className="text-xs text-slate-200 font-medium">✅ En Stock / Disponible</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isVisible}
                    onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
                    className="w-4 h-4 text-brand-500 rounded border-slate-700 bg-slate-900"
                  />
                  <span className="text-xs text-slate-200 font-medium">👁️ Visible en Carta</span>
                </label>
              </div>

              {/* Variantes (Ej. Tamaños) */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-brand-400" />
                    Variantes de Tamaño / Tipo (Opcional)
                  </span>
                </div>

                <div className="space-y-2">
                  {formData.variants.map((v) => (
                    <div key={v.id} className="flex items-center justify-between bg-slate-900 px-3 py-2 rounded-lg border border-slate-800 text-xs">
                      <span className="font-semibold text-slate-200">{v.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-brand-400 font-mono">
                          {v.priceDelta > 0 ? `+${business.currencySymbol}${v.priceDelta}` : v.priceDelta < 0 ? `-${business.currencySymbol}${Math.abs(v.priceDelta)}` : 'Sin costo adicional'}
                        </span>
                        <button type="button" onClick={() => handleRemoveVariant(v.id)} className="text-slate-500 hover:text-rose-400">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      placeholder="Nombre (ej. Triple Smash)"
                      value={newVariantName}
                      onChange={(e) => setNewVariantName(e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                    <input
                      type="number"
                      placeholder="Dif. Precio (+2000)"
                      value={newVariantPriceDelta || ''}
                      onChange={(e) => setNewVariantPriceDelta(Number(e.target.value))}
                      className="w-32 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                    <button
                      type="button"
                      onClick={handleAddVariant}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold"
                    >
                      + Añadir
                    </button>
                  </div>
                </div>
              </div>

              {/* Modificadores / Extras */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Tag className="w-4 h-4 text-emerald-400" />
                    Modificadores & Extras (Opcional)
                  </span>
                </div>

                <div className="space-y-2">
                  {formData.modifiers.map((m) => (
                    <div key={m.id} className="flex items-center justify-between bg-slate-900 px-3 py-2 rounded-lg border border-slate-800 text-xs">
                      <span className="font-semibold text-slate-200">{m.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-emerald-400 font-mono">+{business.currencySymbol}{m.price}</span>
                        <button type="button" onClick={() => handleRemoveModifier(m.id)} className="text-slate-500 hover:text-rose-400">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      placeholder="Extra (ej. Queso Cheddar Extra)"
                      value={newModName}
                      onChange={(e) => setNewModName(e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                    <input
                      type="number"
                      placeholder="Precio (+600)"
                      value={newModPrice || ''}
                      onChange={(e) => setNewModPrice(Number(e.target.value))}
                      className="w-28 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                    <button
                      type="button"
                      onClick={handleAddModifier}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold"
                    >
                      + Añadir
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold shadow-md shadow-brand-500/20 transition"
                >
                  {editingProduct ? 'Guardar Cambios' : 'Crear Producto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

