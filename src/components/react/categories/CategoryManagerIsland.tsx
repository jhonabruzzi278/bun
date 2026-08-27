import React, { useState } from 'react';
import { useCatalogStore } from '@/lib/useCatalogStore';
import type { Category } from '@/lib/types';
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  FolderKanban,
  GripVertical,
  X,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

export default function CategoryManagerIsland() {
  const { categories, products, addCategory, updateCategory, deleteCategory, reorderCategories, isLoaded } = useCatalogStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    imageUrl: '',
    isVisible: true,
  });

  if (!isLoaded) return <div className="text-[#8C7E73] dark:text-[#A8988B] text-sm">Cargando categorías...</div>;

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

  // Reordering functions
  const handleMove = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= categories.length) return;

    const updated = [...categories];
    const [moved] = updated.splice(index, 1);
    updated.splice(newIndex, 0, moved);
    reorderCategories(updated);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = (index: number) => {
    if (draggedIndex === null || draggedIndex === index) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const updated = [...categories];
    const [moved] = updated.splice(draggedIndex, 1);
    updated.splice(index, 0, moved);
    reorderCategories(updated);

    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-coffee-950 dark:text-white">
            Categorías del Menú
          </h1>
          <p className="text-xs sm:text-sm text-[#70645A] dark:text-[#A8988B] mt-0.5">
            Organiza el orden de aparición de los platos en tu carta digital arrastrando o usando las flechas.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-color4 hover:bg-[#522B2B] dark:bg-color3 dark:hover:bg-color4 text-white font-bold text-xs shadow-coffee-sm transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Categoría</span>
        </button>
      </div>

      {/* Categories List */}
      <div className="bg-white dark:bg-[#241512] rounded-2xl border border-[#EAE1D6] dark:border-[#3D2420] shadow-coffee-sm divide-y divide-[#F4EFEA] dark:divide-[#331C18] overflow-hidden transition-colors">
        {categories.length === 0 ? (
          <div className="p-12 text-center text-[#8C7E73] dark:text-[#A8988B] space-y-3">
            <FolderKanban className="w-10 h-10 mx-auto text-[#D7C7B5]" />
            <p className="text-sm">No has creado categorías todavía.</p>
            <button
              type="button"
              onClick={handleOpenCreate}
              className="text-xs text-color3 font-bold hover:underline"
            >
              Crear tu primera categoría
            </button>
          </div>
        ) : (
          categories.map((cat, index) => {
            const productCount = products.filter((p) => p.categoryId === cat.id).length;
            const isDragging = draggedIndex === index;
            const isTarget = dragOverIndex === index && draggedIndex !== index;

            return (
              <div
                key={cat.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragLeave={() => setDragOverIndex(null)}
                onDrop={() => handleDrop(index)}
                className={`p-4 sm:px-6 flex items-center justify-between transition-all group ${
                  isDragging ? 'opacity-40 bg-[#FAF7F2] dark:bg-[#180E0C]' : ''
                } ${isTarget ? 'border-t-2 border-color4 bg-color4/5' : 'hover:bg-[#FAF7F2] dark:hover:bg-[#2F1B17]'}`}
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  {/* Grip & Reorder Buttons */}
                  <div className="flex items-center gap-1">
                    <div
                      title="Arrastrar para ordenar"
                      className="text-[#8C7E73] dark:text-[#A8988B] cursor-grab active:cursor-grabbing p-1 rounded hover:bg-[#EAE1D6] dark:hover:bg-[#3D2420] transition"
                    >
                      <GripVertical className="w-4 h-4" />
                    </div>

                    <div className="flex flex-col">
                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={() => handleMove(index, 'up')}
                        title="Subir posición"
                        className="text-[#8C7E73] hover:text-coffee-950 dark:hover:text-white disabled:opacity-20 p-0.5 transition"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={index === categories.length - 1}
                        onClick={() => handleMove(index, 'down')}
                        title="Bajar posición"
                        className="text-[#8C7E73] hover:text-coffee-950 dark:hover:text-white disabled:opacity-20 p-0.5 transition"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Category Image */}
                  {cat.imageUrl ? (
                    <img
                      src={cat.imageUrl}
                      alt={cat.name}
                      className="w-12 h-12 rounded-xl object-cover border border-[#EAE1D6] dark:border-[#3D2420] shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] dark:bg-[#2F1B17] border border-[#EAE1D6] dark:border-[#3D2420] flex items-center justify-center text-lg shrink-0 text-[#8C7E73]">
                      📁
                    </div>
                  )}

                  {/* Category Info */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#FAF7F2] dark:bg-[#180E0C] text-[#8C7E73]">
                        #{index + 1}
                      </span>
                      <h3 className="font-bold text-coffee-950 dark:text-white text-sm truncate">{cat.name}</h3>
                      {!cat.isVisible && (
                        <span className="text-[10px] bg-[#FEF8E3] dark:bg-[#33220E] text-[#A0740E] dark:text-[#FBBF24] border border-[#FDECB8] dark:border-[#593E1A] px-1.5 py-0.5 rounded font-medium">
                          Oculta
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#70645A] dark:text-[#A8988B] truncate max-w-md mt-0.5">
                      {cat.description || 'Sin descripción'}
                    </p>
                    <span className="text-[11px] text-[#8C7E73] dark:text-[#A8988B] mt-1 block font-medium">
                      {productCount} {productCount === 1 ? 'producto' : 'productos'} vinculados
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => updateCategory(cat.id, { isVisible: !cat.isVisible })}
                    title={cat.isVisible ? 'Ocultar categoría' : 'Mostrar categoría'}
                    className="p-2 rounded-lg text-[#8C7E73] dark:text-[#A8988B] hover:text-coffee-950 dark:hover:text-white hover:bg-[#FAF7F2] dark:hover:bg-[#38201C] transition"
                  >
                    {cat.isVisible ? <Eye className="w-4 h-4 text-[#2E7D32]" /> : <EyeOff className="w-4 h-4 text-[#8C7E73]" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenEdit(cat)}
                    title="Editar categoría"
                    className="p-2 rounded-lg text-[#8C7E73] dark:text-[#A8988B] hover:text-coffee-950 dark:hover:text-white hover:bg-[#FAF7F2] dark:hover:bg-[#38201C] transition"
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
                    className="p-2 rounded-lg text-[#8C7E73] hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition"
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
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 transition-colors">
            <div className="flex items-center justify-between pb-3 border-b border-[#EAE1D6] dark:border-[#3D2420]">
              <h3 className="font-bold text-coffee-950 dark:text-white text-base">
                {editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-[#8C7E73] hover:text-coffee-950 dark:hover:text-white p-1 rounded-lg hover:bg-[#FAF7F2] dark:hover:bg-[#38201C]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-coffee-950 dark:text-[#E8DFD8] mb-1">Nombre de la Categoría</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="ej. Hamburguesas Smash"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-coffee-950 dark:text-white text-xs focus:outline-none focus:border-color4"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-coffee-950 dark:text-[#E8DFD8] mb-1">Slug URL</label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="hamburguesas-smash"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-coffee-950 dark:text-white text-xs font-mono focus:outline-none focus:border-color4"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-coffee-950 dark:text-[#E8DFD8] mb-1">Descripción</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="ej. Nuestras famosas hamburguesas dobles y triples con papas..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-coffee-950 dark:text-white text-xs focus:outline-none focus:border-color4"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-coffee-950 dark:text-[#E8DFD8] mb-1">URL de la Imagen / Ícono</label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-coffee-950 dark:text-white text-xs focus:outline-none focus:border-color4"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isVisible}
                    onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
                    className="w-4 h-4 text-color4 rounded border-[#EAE1D6] bg-white focus:ring-color4"
                  />
                  <span className="text-xs text-coffee-950 dark:text-[#E8DFD8] font-medium">Visible en Carta Digital</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#EAE1D6] dark:border-[#3D2420]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#FAF7F2] dark:bg-[#2F1B17] text-coffee-800 dark:text-[#E8DFD8] text-xs font-semibold hover:bg-[#F3EDE3] transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-color4 hover:bg-[#522B2B] dark:bg-color3 dark:hover:bg-color4 text-white text-xs font-bold shadow-md transition"
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
