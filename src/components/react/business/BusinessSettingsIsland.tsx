import React, { useState } from 'react';
import { useCatalogStore } from '@/lib/useCatalogStore';
import { Store, Save, Phone, MapPin, DollarSign, Palette, CheckCircle2, RotateCcw } from 'lucide-react';

export default function BusinessSettingsIsland() {
  const { business, updateBusiness, resetToDemo, isLoaded } = useCatalogStore();
  const [formData, setFormData] = useState(business);
  const [savedMessage, setSavedMessage] = useState(false);

  React.useEffect(() => {
    if (isLoaded) {
      setFormData(business);
    }
  }, [isLoaded, business]);

  if (!isLoaded) return <div className="text-slate-400 text-sm">Cargando datos...</div>;

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
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Configuración del Negocio</h1>
          <p className="text-sm text-slate-400">Personaliza la identidad, colores y datos de contacto de tu local.</p>
        </div>

        <button
          type="button"
          onClick={resetToDemo}
          className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-lg border border-slate-700 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Restablecer a Demo
        </button>
      </div>

      {savedMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4" />
          ¡Configuración guardada correctamente! Los cambios ya se reflejan en el menú público.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Identidad del Negocio */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Store className="w-4 h-4 text-brand-400" />
            Identidad General
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Nombre del Local / Restaurante</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Slug URL (Subdominio / Enlace)</label>
              <div className="flex items-center">
                <span className="px-3 py-2.5 bg-slate-900 border border-r-0 border-slate-700 text-slate-400 text-xs rounded-l-xl">/menu/</span>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2.5 rounded-r-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-500 font-mono"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Descripción / Eslogan</label>
              <textarea
                name="description"
                rows={2}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>
        </div>

        {/* Imágenes y Personalización Visual */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-6">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Palette className="w-4 h-4 text-brand-400" />
            Logo, Portada & Color de Marca
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Logo Upload & Preview */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-300">Logo del Restaurante</label>
              
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-slate-900 border-2 border-dashed border-slate-700 overflow-hidden flex items-center justify-center shrink-0 relative group">
                  {formData.logoUrl ? (
                    <img src={formData.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl">🍔</span>
                  )}
                </div>

                <div className="space-y-2 flex-1">
                  <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold cursor-pointer transition shadow-md shadow-brand-500/20 active:scale-95">
                    <span>Subir Logo desde el PC</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setFormData((prev) => ({ ...prev, logoUrl: reader.result as string }));
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>

                  <input
                    type="url"
                    name="logoUrl"
                    value={formData.logoUrl || ''}
                    onChange={handleChange}
                    placeholder="O pega una URL: https://..."
                    className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-[11px] placeholder:text-slate-600 focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>
            </div>

            {/* Banner / Portada Upload & Preview */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-300">Imagen de Portada / Banner</label>
              
              <div className="space-y-2">
                <div className="h-20 w-full rounded-2xl bg-slate-900 border-2 border-dashed border-slate-700 overflow-hidden flex items-center justify-center relative">
                  {formData.bannerUrl ? (
                    <img src={formData.bannerUrl} alt="Banner" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs text-slate-500 font-semibold">Sin imagen de portada</span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <label className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold cursor-pointer transition whitespace-nowrap border border-slate-700">
                    <span>Subir Portada</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setFormData((prev) => ({ ...prev, bannerUrl: reader.result as string }));
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>

                  <input
                    type="url"
                    name="bannerUrl"
                    value={formData.bannerUrl || ''}
                    onChange={handleChange}
                    placeholder="O pega una URL: https://..."
                    className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-[11px] placeholder:text-slate-600 focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>
            </div>

            {/* Color de Marca */}
            <div className="md:col-span-2 pt-2 border-t border-slate-800 flex items-center justify-between">
              <div>
                <label className="block text-xs font-bold text-slate-300">Color Primario de tu Menú</label>
                <span className="text-[10px] text-slate-500">Se aplicará a botones, destacados y acentos visuales.</span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  name="primaryColor"
                  value={formData.primaryColor || '#0074FF'}
                  onChange={handleChange}
                  className="w-10 h-10 rounded-xl border-0 bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  name="primaryColor"
                  value={formData.primaryColor || '#0074FF'}
                  onChange={handleChange}
                  className="w-28 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono text-center font-bold"
                />
              </div>
            </div>

          </div>
        </div>


        {/* Contacto & Pedidos */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Phone className="w-4 h-4 text-brand-400" />
            Contacto & Pedidos por WhatsApp
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Número de WhatsApp (con código de país)</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+56912345678"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Dirección Física</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Av. Providencia 1240..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-500"
              />
            </div>

            <div className="flex items-center gap-2 pt-2 md:col-span-2">
              <input
                type="checkbox"
                id="whatsappOrders"
                name="whatsappOrders"
                checked={formData.whatsappOrders}
                onChange={handleChange}
                className="w-4 h-4 text-brand-500 rounded border-slate-700 bg-slate-900 focus:ring-brand-500"
              />
              <label htmlFor="whatsappOrders" className="text-xs font-medium text-slate-300 cursor-pointer">
                Habilitar recepción de pedidos directamente por WhatsApp
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-lg shadow-brand-500/25 transition"
          >
            <Save className="w-4 h-4" />
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
}
