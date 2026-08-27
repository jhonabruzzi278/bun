import React, { useState } from 'react';
import { Store, Globe, Phone, Utensils, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCatalogStore } from '@/lib/useCatalogStore';

export default function OnboardingWizardIsland() {
  const { business, updateBusiness, addCategory, addProduct } = useCatalogStore();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form states
  const [bizName, setBizName] = useState(business.name || 'Mi Gran Restaurante');
  const [bizSlug, setBizSlug] = useState(business.slug || 'mi-restaurante');
  const [bizPhone, setBizPhone] = useState(business.phone || '+56912345678');
  const [bizCurrency, setBizCurrency] = useState(business.currency || 'CLP');
  const [bizSymbol, setBizSymbol] = useState(business.currencySymbol || '$');
  const [cuisineType, setCuisineType] = useState('Hamburguesas & Sandwiches');

  // Primer producto
  const [prodCategory, setProdCategory] = useState('Platos Principales');
  const [prodName, setProdName] = useState('Hamburguesa Especial de la Casa');
  const [prodPrice, setProdPrice] = useState('7990');
  const [prodDescription, setProdDescription] = useState('Doble carne 100% Angus smash, queso cheddar fundido y salsa secreta.');

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    updateBusiness({
      name: bizName,
      slug: bizSlug.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
      phone: bizPhone,
    });
    setStep(2);
  };

  const handleNextStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    updateBusiness({
      currency: bizCurrency,
      currencySymbol: bizSymbol,
      description: `Especialistas en ${cuisineType}`,
    });
    setStep(3);
  };

  const handleNextStep3 = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const cat = addCategory({
        name: prodCategory,
        slug: prodCategory.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
        description: `Nuestros mejores ${prodCategory.toLowerCase()}`,
        position: 1,
        isVisible: true,
      });

      addProduct({
        categoryId: cat.id,
        name: prodName,
        price: Number(prodPrice) || 7990,
        description: prodDescription,
        imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
        position: 1,
        isVisible: true,
        isAvailable: true,
        isFeatured: true,
        variants: [
          { id: `v_${Date.now()}_1`, name: 'Simple', priceDelta: 0, isDefault: true },
          { id: `v_${Date.now()}_2`, name: 'Doble', priceDelta: 2000, isDefault: false }
        ],
        modifiers: [
          { id: `m_${Date.now()}_1`, groupName: 'Extras', name: 'Queso Cheddar Extra', price: 1000, maxQuantity: 2 },
          { id: `m_${Date.now()}_2`, groupName: 'Extras', name: 'Tocino Crispy', price: 1200, maxQuantity: 2 }
        ]
      });

      setLoading(false);
      setStep(4);
    }, 600);
  };

  const handleFinishOnboarding = () => {
    window.location.href = '/admin';
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8 pb-12">
      {/* Progress Steps Header */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-[#70645A] dark:text-[#A8988B]">
          <span>Paso {step} de 4</span>
          <span>{step === 1 ? 'Datos del Local' : step === 2 ? 'Cocina & Moneda' : step === 3 ? 'Primer Plato' : '¡Todo Listo!'}</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 rounded-full bg-[#EAE1D6] dark:bg-[#3D2420] overflow-hidden">
          <div
            className="h-full bg-color4 transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* STEP 1: DATOS DEL LOCAL */}
      {step === 1 && (
        <div className="p-8 rounded-3xl bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] shadow-coffee-sm space-y-6 transition-colors">
          <div>
            <h2 className="text-xl font-extrabold text-coffee-950 dark:text-white">Nombre y enlace de tu restaurante</h2>
            <p className="text-xs text-[#70645A] dark:text-[#A8988B] mt-1">
              Personaliza el nombre con el que tus clientes te identificarán.
            </p>
          </div>

          <form onSubmit={handleNextStep1} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-coffee-950 dark:text-[#E8DFD8] mb-1">Nombre del Local</label>
              <div className="relative">
                <Store className="w-4 h-4 text-[#8C7E73] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={bizName}
                  onChange={(e) => setBizName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-coffee-950 dark:text-white text-xs focus:outline-none focus:border-color4"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-coffee-950 dark:text-[#E8DFD8] mb-1">Enlace del Menú Digital</label>
              <div className="flex items-center">
                <span className="px-3 py-2.5 bg-[#FAF7F2] dark:bg-[#180E0C] border border-r-0 border-[#EAE1D6] dark:border-[#3D2420] text-[#70645A] dark:text-[#A8988B] text-xs rounded-l-xl font-mono">
                  /menu/
                </span>
                <input
                  type="text"
                  required
                  value={bizSlug}
                  onChange={(e) => setBizSlug(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-r-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-coffee-950 dark:text-white text-xs font-mono font-bold focus:outline-none focus:border-color4"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-coffee-950 dark:text-[#E8DFD8] mb-1">WhatsApp de Pedidos</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#8C7E73] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={bizPhone}
                  onChange={(e) => setBizPhone(e.target.value)}
                  placeholder="+56912345678"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-coffee-950 dark:text-white text-xs focus:outline-none focus:border-color4"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-color4 hover:bg-[#522B2B] text-white font-bold text-xs shadow-coffee-sm transition"
              >
                <span>Continuar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* STEP 2: MONEDA */}
      {step === 2 && (
        <div className="p-8 rounded-3xl bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] shadow-coffee-sm space-y-6 transition-colors">
          <div>
            <h2 className="text-xl font-extrabold text-coffee-950 dark:text-white">Tipo de cocina y moneda</h2>
            <p className="text-xs text-[#70645A] dark:text-[#A8988B] mt-1">Configura la especialidad gastronómica y precios.</p>
          </div>

          <form onSubmit={handleNextStep2} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-coffee-950 dark:text-[#E8DFD8] mb-1">Especialidad</label>
              <input
                type="text"
                value={cuisineType}
                onChange={(e) => setCuisineType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-coffee-950 dark:text-white text-xs focus:outline-none focus:border-color4"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-coffee-950 dark:text-[#E8DFD8] mb-1">Símbolo de Moneda</label>
                <input
                  type="text"
                  value={bizSymbol}
                  onChange={(e) => setBizSymbol(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-coffee-950 dark:text-white text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-coffee-950 dark:text-[#E8DFD8] mb-1">Código de Moneda</label>
                <input
                  type="text"
                  value={bizCurrency}
                  onChange={(e) => setBizCurrency(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-coffee-950 dark:text-white text-xs font-bold"
                />
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-[#70645A] dark:text-[#A8988B] flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Atrás</span>
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-color4 hover:bg-[#522B2B] text-white font-bold text-xs shadow-coffee-sm transition"
              >
                <span>Continuar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* STEP 3: PRIMER PRODUCTO */}
      {step === 3 && (
        <div className="p-8 rounded-3xl bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] shadow-coffee-sm space-y-6 transition-colors">
          <div>
            <h2 className="text-xl font-extrabold text-coffee-950 dark:text-white">Crea tu primer plato o producto</h2>
            <p className="text-xs text-[#70645A] dark:text-[#A8988B] mt-1">Podrás añadir más categorías y platos desde el panel.</p>
          </div>

          <form onSubmit={handleNextStep3} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-coffee-950 dark:text-[#E8DFD8] mb-1">Categoría</label>
              <input
                type="text"
                required
                value={prodCategory}
                onChange={(e) => setProdCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-coffee-950 dark:text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-coffee-950 dark:text-[#E8DFD8] mb-1">Nombre del Plato</label>
              <input
                type="text"
                required
                value={prodName}
                onChange={(e) => setProdName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-coffee-950 dark:text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-coffee-950 dark:text-[#E8DFD8] mb-1">Precio ({bizSymbol})</label>
              <input
                type="number"
                required
                value={prodPrice}
                onChange={(e) => setProdPrice(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-coffee-950 dark:text-white text-xs font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-coffee-950 dark:text-[#E8DFD8] mb-1">Descripción</label>
              <textarea
                rows={2}
                value={prodDescription}
                onChange={(e) => setProdDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-coffee-950 dark:text-white text-xs"
              />
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-[#70645A] dark:text-[#A8988B] flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Atrás</span>
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-color4 hover:bg-[#522B2B] text-white font-bold text-xs shadow-coffee-sm transition"
              >
                <span>{loading ? 'Guardando catálogo...' : 'Crear y Finalizar'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* STEP 4: FINALIZADO */}
      {step === 4 && (
        <div className="p-8 rounded-3xl bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] shadow-coffee-sm text-center space-y-6 transition-colors">
          <div className="w-16 h-16 rounded-3xl bg-[#E7F3E8] dark:bg-[#1A3320] text-[#2E7D32] dark:text-[#4ADE80] flex items-center justify-center mx-auto text-3xl shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-coffee-950 dark:text-white">¡Tu restaurante está listo para operar!</h2>
            <p className="text-xs text-[#70645A] dark:text-[#A8988B] max-w-md mx-auto">
              Hemos configurado tu menú digital, el punto de venta y el tablero KDS en tiempo real.
            </p>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleFinishOnboarding}
              className="px-8 py-3 rounded-xl bg-color4 hover:bg-[#522B2B] text-white font-bold text-xs shadow-coffee-sm transition"
            >
              Ir al Panel de Control
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
