import React, { useState } from 'react';
import { useCatalogStore } from '@/lib/useCatalogStore';
import type { Category } from '@/lib/types';
import { Plus, Edit2, Trash2, Eye, EyeOff, FolderKanban, GripVertical, Check, X } from 'lucide-react';

export default function CategoryManagerIsland() {
  const { categories, products, addCategory, updateCategory, deleteCategory, isLoaded } = useCatalogStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    imageUrl: '',
    isVisible: true,
  });

  if (!isLoaded) return <div className="text-slate-400 text-sm">Cargando categorías...</div>;

  const handleOpenCreate = () => {
    setEditingCategory(null);
    setFormData({ name: '', slug: '', description: '', imageUrl: '', isVisible: true });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat: Category) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      description: cat.description || '',
      imageUrl: cat.imageUrl || '',
      isVisible: cat.isVisible,
    });
    setIsModalOpen(true);
  };

  const handleNameChange = (name: string) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setFormData((prev) => ({ ...prev, name, slug: editingCategory ? prev.slug : slug }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory) {
      updateCategory(editingCategory.id, formData);
    } else {
      addCategory({
        ...formData,
        position: categories.length + 1,
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Categorías del Menú</h1>
          <p className="text-sm text-slate-400">Organiza los platos y productos de tu carta digital.</p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-lg shadow-brand-500/25 transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Nueva Categoría
        </button>
      </div>

      {/* Categories List */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 divide-y divide-slate-800/80 overflow-hidden">
        {categories.length === 0 ? (
          <div className="p-12 text-center text-slate-500 space-y-3">
            <FolderKanban className="w-10 h-10 mx-auto text-slate-600" />
            <p className="text-sm">No has creado categorías todavía.</p>
            <button
              onClick={handleOpenCreate}
              className="text-xs text-brand-400 hover:underline font-semibold"
            >
              Crear tu primera categoría
            </button>
          </div>
        ) : (
          categories.map((cat, index) => {
            const productCount = products.filter((p) => p.categoryId === cat.id).length;
            return (
              <div
                key={cat.id}
                className="p-4 sm:px-6 flex items-center justify-between hover:bg-slate-900/50 transition group"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="text-slate-600 group-hover:text-slate-400 cursor-grab hidden sm:block">
                    <GripVertical className="w-4 h-4" />
                  </div>

                  {cat.imageUrl ? (
                    <img
                      src={cat.imageUrl}
                      alt={cat.name}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-800 shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-lg shrink-0 text-slate-400">
                      📁
                    </div>
                  )}

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white text-sm truncate">{cat.name}</h3>
                      {!cat.isVisible && (
                        <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30 px-1.5 py-0.5 rounded font-medium">
                          Oculta
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 truncate max-w-md mt-0.5">
                      {cat.description || 'Sin descripción'}
                    </p>
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      {productCount} {productCount === 1 ? 'producto' : 'productos'} vinculados
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => updateCategory(cat.id, { isVisible: !cat.isVisible })}
                    title={cat.isVisible ? 'Ocultar categoría' : 'Mostrar categoría'}
                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                  >
                    {cat.isVisible ? <Eye className="w-4 h-4 text-emerald-400" /> : <EyeOff className="w-4 h-4 text-slate-500" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenEdit(cat)}
                    title="Editar categoría"
                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`¿Eliminar la categoría "${cat.name}"?`)) {
                        deleteCategory(cat.id);
                      }
                    }}
                    title="Eliminar categoría"
                    className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal Crear / Editar Categoría */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-base">
                {editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nombre de la Categoría</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="ej. Hamburguesas Smash"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Slug URL</label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="hamburguesas-smash"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Descripción corta</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="ej. Carne 100% Angus smash, pan brioche tostado..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">URL de Imagen (Opcional)</label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="catVisible"
                  checked={formData.isVisible}
                  onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
                  className="w-4 h-4 text-brand-500 rounded border-slate-700 bg-slate-950 focus:ring-brand-500"
                />
                <label htmlFor="catVisible" className="text-xs font-medium text-slate-300 cursor-pointer">
                  Visible en el menú público
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold shadow-md shadow-brand-500/20 transition"
                >
                  {editingCategory ? 'Guardar Cambios' : 'Crear Categoría'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
