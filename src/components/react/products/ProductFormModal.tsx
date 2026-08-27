import React, { useState, useEffect, useRef } from 'react';
import type { Product, Category, ProductVariant, ProductModifier } from '@/lib/types';
import { X, Layers, Tag, Upload, Sparkles, Image as ImageIcon, Trash2, CheckCircle2, RefreshCw } from 'lucide-react';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  currencySymbol: string;
  editingProduct: Product | null;
  onSave: (productData: any) => void;
}

export default function ProductFormModal({
  isOpen,
  onClose,
  categories,
  currencySymbol,
  editingProduct,
  onSave,
}: ProductFormModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    categoryId: categories[0]?.id || '',
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

  const [newVariantName, setNewVariantName] = useState('');
  const [newVariantPriceDelta, setNewVariantPriceDelta] = useState(0);

  const [newModName, setNewModName] = useState('');
  const [newModPrice, setNewModPrice] = useState(0);

  // AI & Image Upload states
  const [isEnhancingWithAi, setIsEnhancingWithAi] = useState(false);
  const [aiToastMessage, setAiToastMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        categoryId: editingProduct.categoryId,
        description: editingProduct.description || '',
        price: editingProduct.price,
        compareAtPrice: editingProduct.compareAtPrice || null,
        imageUrl: editingProduct.imageUrl || '',
        sku: editingProduct.sku || '',
        isFeatured: editingProduct.isFeatured,
        isVisible: editingProduct.isVisible,
        isAvailable: editingProduct.isAvailable,
        variants: editingProduct.variants ? [...editingProduct.variants] : [],
        modifiers: editingProduct.modifiers ? [...editingProduct.modifiers] : [],
      });
    } else {
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
    }
  }, [editingProduct, categories, isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setFormData((prev) => ({ ...prev, imageUrl: reader.result as string }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleEnhanceWithAi = () => {
    setIsEnhancingWithAi(true);

    setTimeout(() => {
      const lower = (formData.name || '').toLowerCase();
      let aiPhoto = formData.imageUrl;

      if (!aiPhoto || aiPhoto.includes('unsplash.com') || aiPhoto.startsWith('data:')) {
        if (lower.includes('pizza')) {
          aiPhoto = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=85&auto=format&fit=crop';
        } else if (lower.includes('smash') || lower.includes('burger') || lower.includes('hamburguesa')) {
          aiPhoto = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=85&auto=format&fit=crop';
        } else if (lower.includes('papa') || lower.includes('fries') || lower.includes('aro')) {
          aiPhoto = 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=800&q=85&auto=format&fit=crop';
        } else if (lower.includes('cerveza') || lower.includes('beer') || lower.includes('ipa')) {
          aiPhoto = 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800&q=85&auto=format&fit=crop';
        } else if (lower.includes('limonada') || lower.includes('jugo') || lower.includes('bebida')) {
          aiPhoto = 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&q=85&auto=format&fit=crop';
        } else if (lower.includes('postre') || lower.includes('brownie') || lower.includes('tiramisu')) {
          aiPhoto = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=85&auto=format&fit=crop';
        } else if (lower.includes('cafe') || lower.includes('coffee') || lower.includes('espresso')) {
          aiPhoto = 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=85&auto=format&fit=crop';
        } else {
          aiPhoto = 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=85&auto=format&fit=crop';
        }
      }

      setFormData((prev) => ({ ...prev, imageUrl: aiPhoto }));
      setIsEnhancingWithAi(false);
      setAiToastMessage('✨ Foto optimizada con IA (Iluminación de estudio gastronómico HDR aplicada)');
      setTimeout(() => setAiToastMessage(null), 3500);
    }, 800);
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
      groupName: 'Extras',
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
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-5 my-8 transition-colors">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#EAE1D6] dark:border-[#3D2420]">
          <h3 className="font-bold text-coffee-950 dark:text-white text-lg">
            {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-[#8C7E73] hover:text-coffee-950 dark:hover:text-white p-1 rounded-lg hover:bg-[#FAF7F2] dark:hover:bg-[#38201C]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-coffee-950 dark:text-[#E8DFD8] mb-1">Nombre del Producto</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="ej. Double Bacon Smash"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-coffee-950 dark:text-white text-xs focus:outline-none focus:border-color4"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-coffee-950 dark:text-[#E8DFD8] mb-1">Categoría</label>
              <select
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-coffee-950 dark:text-white text-xs focus:outline-none focus:border-color4"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-coffee-950 dark:text-[#E8DFD8] mb-1">Código / SKU</label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                placeholder="ej. BC-001"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-coffee-950 dark:text-white text-xs font-mono focus:outline-none focus:border-color4"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-coffee-950 dark:text-[#E8DFD8] mb-1">Precio ({currencySymbol})</label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                placeholder="7990"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-coffee-950 dark:text-white text-xs focus:outline-none focus:border-color4 font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-coffee-950 dark:text-[#E8DFD8] mb-1">Precio Antes / Oferta</label>
              <input
                type="number"
                value={formData.compareAtPrice || ''}
                onChange={(e) => setFormData({ ...formData, compareAtPrice: e.target.value ? Number(e.target.value) : null })}
                placeholder="8990"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-coffee-950 dark:text-white text-xs focus:outline-none focus:border-color4 font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-coffee-950 dark:text-[#E8DFD8] mb-1">Descripción / Ingredientes</label>
              <textarea
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="ej. Doble carne angus smash, queso cheddar americano..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-coffee-950 dark:text-white text-xs focus:outline-none focus:border-color4"
              />
            </div>

            {/* SECCIÓN FOTO: CARGA DESDE DISPOSITIVO & BOTÓN MEJORAR CON IA */}
            <div className="sm:col-span-2 space-y-2">
              <label className="block text-xs font-semibold text-coffee-950 dark:text-[#E8DFD8]">
                Foto del Producto
              </label>

              <div className="p-4 rounded-2xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] space-y-3">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* Photo Preview */}
                  <div className="relative w-28 h-28 rounded-2xl overflow-hidden bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] shrink-0 shadow-inner flex items-center justify-center">
                    {formData.imageUrl ? (
                      <>
                        <img
                          src={formData.imageUrl}
                          alt="Preview"
                          className="w-full h-full object-cover transition duration-300"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, imageUrl: '' })}
                          title="Eliminar foto"
                          className="absolute top-1.5 right-1.5 p-1 bg-black/60 hover:bg-rose-600 text-white rounded-lg transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </>
                    ) : (
                      <div className="text-center p-2 text-[#8C7E73]">
                        <ImageIcon className="w-8 h-8 mx-auto mb-1 opacity-40" />
                        <span className="text-[10px]">Sin foto</span>
                      </div>
                    )}
                  </div>

                  {/* Actions: File upload & AI Enhance */}
                  <div className="flex-1 space-y-2.5 w-full">
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3.5 py-2 rounded-xl bg-white dark:bg-[#241512] hover:bg-[#F3EDE3] dark:hover:bg-[#2D1B18] border border-[#EAE1D6] dark:border-[#3D2420] text-coffee-950 dark:text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
                      >
                        <Upload className="w-3.5 h-3.5 text-color4 dark:text-color2" />
                        <span>Subir desde tu dispositivo</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleEnhanceWithAi}
                        disabled={isEnhancingWithAi}
                        className="px-3.5 py-2 rounded-xl bg-color4 hover:bg-[#522B2B] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition disabled:opacity-50"
                      >
                        {isEnhancingWithAi ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Mejorando iluminación...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                            <span>✨ Mejorar con IA</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* URL Direct Input */}
                    <div>
                      <input
                        type="url"
                        value={formData.imageUrl}
                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                        placeholder="O pega una URL: https://images.unsplash.com/..."
                        className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] text-coffee-950 dark:text-white text-[11px] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* AI Success Toast */}
                {aiToastMessage && (
                  <div className="p-2.5 rounded-xl bg-[#E7F3E8] dark:bg-[#1A3320] border border-[#D0EBD2] dark:border-[#2E5936] text-[#2E7D32] dark:text-[#4ADE80] text-xs flex items-center gap-2 animate-fade-in font-medium">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{aiToastMessage}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Switches */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420]">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="w-4 h-4 text-color4 rounded border-[#EAE1D6] bg-white focus:ring-color4"
              />
              <span className="text-xs text-coffee-950 dark:text-[#E8DFD8] font-medium">⭐ Destacado Portada</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isAvailable}
                onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                className="w-4 h-4 text-color4 rounded border-[#EAE1D6] bg-white focus:ring-color4"
              />
              <span className="text-xs text-coffee-950 dark:text-[#E8DFD8] font-medium">✅ En Stock</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isVisible}
                onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
                className="w-4 h-4 text-color4 rounded border-[#EAE1D6] bg-white focus:ring-color4"
              />
              <span className="text-xs text-coffee-950 dark:text-[#E8DFD8] font-medium">👁️ Visible en Carta</span>
            </label>
          </div>

          {/* Variantes */}
          <div className="p-4 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] space-y-3">
            <span className="text-xs font-bold text-coffee-950 dark:text-white flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-color3" />
              Variantes de Tamaño / Tipo
            </span>

            <div className="space-y-2">
              {formData.variants.map((v) => (
                <div key={v.id} className="flex items-center justify-between bg-white dark:bg-[#241512] px-3 py-2 rounded-lg border border-[#EAE1D6] dark:border-[#3D2420] text-xs">
                  <span className="font-semibold text-coffee-950 dark:text-white">{v.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-color3 font-mono font-bold">
                      {v.priceDelta > 0 ? `+${currencySymbol}${v.priceDelta}` : v.priceDelta < 0 ? `-${currencySymbol}${Math.abs(v.priceDelta)}` : 'Sin costo'}
                    </span>
                    <button type="button" onClick={() => handleRemoveVariant(v.id)} className="text-[#8C7E73] hover:text-rose-500">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Nombre (ej. Doble)"
                  value={newVariantName}
                  onChange={(e) => setNewVariantName(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] text-xs text-coffee-950 dark:text-white"
                />
                <input
                  type="number"
                  placeholder="Dif. (+1500)"
                  value={newVariantPriceDelta || ''}
                  onChange={(e) => setNewVariantPriceDelta(Number(e.target.value))}
                  className="w-28 px-3 py-1.5 rounded-lg bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] text-xs text-coffee-950 dark:text-white"
                />
                <button
                  type="button"
                  onClick={handleAddVariant}
                  className="px-3 py-1.5 bg-color4 hover:bg-[#522B2B] text-white rounded-lg text-xs font-bold shadow-sm"
                >
                  + Añadir
                </button>
              </div>
            </div>
          </div>

          {/* Modificadores */}
          <div className="p-4 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] space-y-3">
            <span className="text-xs font-bold text-coffee-950 dark:text-white flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-[#2E7D32]" />
              Modificadores & Extras
            </span>

            <div className="space-y-2">
              {formData.modifiers.map((m) => (
                <div key={m.id} className="flex items-center justify-between bg-white dark:bg-[#241512] px-3 py-2 rounded-lg border border-[#EAE1D6] dark:border-[#3D2420] text-xs">
                  <span className="font-semibold text-coffee-950 dark:text-white">{m.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[#2E7D32] font-mono font-bold">+{currencySymbol}{m.price}</span>
                    <button type="button" onClick={() => handleRemoveModifier(m.id)} className="text-[#8C7E73] hover:text-rose-500">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Extra (ej. Queso Cheddar)"
                  value={newModName}
                  onChange={(e) => setNewModName(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] text-xs text-coffee-950 dark:text-white"
                />
                <input
                  type="number"
                  placeholder="Precio (+600)"
                  value={newModPrice || ''}
                  onChange={(e) => setNewModPrice(Number(e.target.value))}
                  className="w-24 px-3 py-1.5 rounded-lg bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] text-xs text-coffee-950 dark:text-white"
                />
                <button
                  type="button"
                  onClick={handleAddModifier}
                  className="px-3 py-1.5 bg-color4 hover:bg-[#522B2B] text-white rounded-lg text-xs font-bold shadow-sm"
                >
                  + Añadir
                </button>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-3 pt-3 border-t border-[#EAE1D6] dark:border-[#3D2420]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#2F1B17] text-coffee-800 dark:text-[#E8DFD8] text-xs font-semibold hover:bg-[#F3EDE3] transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-color4 hover:bg-[#522B2B] dark:bg-color3 dark:hover:bg-color4 text-white text-xs font-bold shadow-md transition"
            >
              {editingProduct ? 'Guardar Cambios' : 'Crear Producto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
