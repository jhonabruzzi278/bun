import React, { useState } from 'react';
import { useCatalogStore } from '@/lib/useCatalogStore';
import { Store, Save, Phone, Palette, CheckCircle2, RotateCcw } from 'lucide-react';

export default function BusinessSettingsIsland() {
  const { business, updateBusiness, resetToDemo, isLoaded } = useCatalogStore();
  const [formData, setFormData] = useState(business);
  const [savedMessage, setSavedMessage] = useState(false);

  React.useEffect(() => {
    if (isLoaded) {
      setFormData(business);
    }
  }, [isLoaded, business]);

  if (!isLoaded) return <div className="text-[#8C7E73] dark:text-[#A8988B] text-sm">Cargando datos...</div>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBusiness(formData);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-coffee-950 dark:text-white">Configuración del Negocio</h1>
          <p className="text-xs sm:text-sm text-[#70645A] dark:text-[#A8988B] mt-0.5">Personaliza la identidad, colores y datos de contacto de tu local.</p>
        </div>

        <button
          type="button"
          onClick={resetToDemo}
          className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-coffee-800 dark:text-[#E8DFD8] bg-white dark:bg-[#241512] hover:bg-[#FAF7F2] rounded-xl border border-[#EAE1D6] dark:border-[#3D2420] transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Restablecer a Demo
        </button>
      </div>

      {savedMessage && (
        <div className="p-4 rounded-xl bg-[#E7F3E8] dark:bg-[#1A3320] border border-[#D0EBD2] dark:border-[#2C5935] text-[#2E7D32] dark:text-[#4ADE80] text-sm flex items-center gap-2 animate-fade-in shadow-sm font-semibold">
          <CheckCircle2 className="w-4 h-4" />
          ¡Configuración guardada correctamente! Los cambios ya se reflejan en la carta digital.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Identidad del Negocio */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] shadow-coffee-sm space-y-4 transition-colors">
          <h2 className="text-base font-bold text-coffee-950 dark:text-white flex items-center gap-2">
            <Store className="w-4 h-4 text-color4 dark:text-color2" />
            Identidad General
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-coffee-950 dark:text-[#E8DFD8] mb-1">Nombre del Local / Restaurante</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-coffee-950 dark:text-white text-xs focus:outline-none focus:border-color4"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-coffee-950 dark:text-[#E8DFD8] mb-1">Slug URL (Enlace del Menú)</label>
              <div className="flex items-center">
                <span className="px-3 py-2.5 bg-[#FAF7F2] dark:bg-[#180E0C] border border-r-0 border-[#EAE1D6] dark:border-[#3D2420] text-[#70645A] dark:text-[#A8988B] text-xs rounded-l-xl">/menu/</span>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2.5 rounded-r-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-coffee-950 dark:text-white text-xs focus:outline-none focus:border-color4 font-mono font-bold"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-coffee-950 dark:text-[#E8DFD8] mb-1">Descripción / Eslogan</label>
              <textarea
                name="description"
                rows={2}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-coffee-950 dark:text-white text-xs focus:outline-none focus:border-color4"
              />
            </div>
          </div>
        </div>

        {/* Imágenes y Color */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] shadow-coffee-sm space-y-6 transition-colors">
          <h2 className="text-base font-bold text-coffee-950 dark:text-white flex items-center gap-2">
            <Palette className="w-4 h-4 text-color4 dark:text-color2" />
            Logo & Portada
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Logo */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-coffee-950 dark:text-[#E8DFD8]">Logo del Restaurante</label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#FAF7F2] dark:bg-[#180E0C] border-2 border-dashed border-[#EAE1D6] dark:border-[#3D2420] overflow-hidden flex items-center justify-center shrink-0">
                  {formData.logoUrl ? (
                    <img src={formData.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl">🍔</span>
                  )}
                </div>

                <input
                  type="url"
                  name="logoUrl"
                  value={formData.logoUrl || ''}
                  onChange={handleChange}
                  placeholder="URL del logo: https://..."
                  className="flex-1 px-3 py-2 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-coffee-950 dark:text-white text-xs focus:outline-none focus:border-color4"
                />
              </div>
            </div>

            {/* Banner */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-coffee-950 dark:text-[#E8DFD8]">Banner de Portada</label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#FAF7F2] dark:bg-[#180E0C] border-2 border-dashed border-[#EAE1D6] dark:border-[#3D2420] overflow-hidden flex items-center justify-center shrink-0">
                  {formData.bannerUrl ? (
                    <img src={formData.bannerUrl} alt="Banner" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs text-[#8C7E73]">Foto</span>
                  )}
                </div>

                <input
                  type="url"
                  name="bannerUrl"
                  value={formData.bannerUrl || ''}
                  onChange={handleChange}
                  placeholder="URL del banner: https://..."
                  className="flex-1 px-3 py-2 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-coffee-950 dark:text-white text-xs focus:outline-none focus:border-color4"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contacto */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] shadow-coffee-sm space-y-4 transition-colors">
          <h2 className="text-base font-bold text-coffee-950 dark:text-white flex items-center gap-2">
            <Phone className="w-4 h-4 text-color4 dark:text-color2" />
            Contacto & Pedidos por WhatsApp
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-coffee-950 dark:text-[#E8DFD8] mb-1">WhatsApp (+56...)</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+56912345678"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-coffee-950 dark:text-white text-xs focus:outline-none focus:border-color4"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-coffee-950 dark:text-[#E8DFD8] mb-1">Dirección Física</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Av. Providencia 1240..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-coffee-950 dark:text-white text-xs focus:outline-none focus:border-color4"
              />
            </div>

            <div className="flex items-center gap-2 pt-2 md:col-span-2">
              <input
                type="checkbox"
                id="whatsappOrders"
                name="whatsappOrders"
                checked={formData.whatsappOrders}
                onChange={handleChange}
                className="w-4 h-4 text-color4 rounded border-[#EAE1D6] bg-[#FAF7F2] focus:ring-color4"
              />
              <label htmlFor="whatsappOrders" className="text-xs font-medium text-coffee-950 dark:text-[#D4C5B9] cursor-pointer">
                Habilitar recepción de pedidos directamente por WhatsApp
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-color4 hover:bg-[#522B2B] dark:bg-color3 dark:hover:bg-color4 text-white font-bold text-xs shadow-coffee-sm transition"
          >
            <Save className="w-4 h-4" />
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
}
