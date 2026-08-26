import React, { useState } from 'react';
import { Store, Globe, Phone, DollarSign, Utensils, CheckCircle2, ArrowRight, ArrowLeft, QrCode, Sparkles, Image as ImageIcon } from 'lucide-react';
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
  const [prodPrice, setProdPrice] = useState('6990');
  const [prodDescription, setProdDescription] = useState('Doble carne 100% vacuno, queso fundido y salsa secreta.');

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
      // 1. Crear categoría
      const cat = addCategory({
        name: prodCategory,
        slug: prodCategory.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
        description: `Nuestros mejores ${prodCategory.toLowerCase()}`,
        position: 1,
        isVisible: true,
      });

      // 2. Crear producto
      addProduct({
        categoryId: cat.id,
        name: prodName,
        price: Number(prodPrice) || 5000,
        description: prodDescription,
        imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
        position: 1,
        isVisible: true,
        isAvailable: true,
        isFeatured: true,
        variants: [
          { id: `v_${Date.now()}_1`, name: 'Simple', priceDelta: 0, isDefault: true },
          { id: `v_${Date.now()}_2`, name: 'Doble (+carne)', priceDelta: 2000, isDefault: false }
        ],
        modifiers: [
          { id: `m_${Date.now()}_1`, groupName: 'Extras', name: 'Queso Extra', price: 1000, maxQuantity: 2 },
          { id: `m_${Date.now()}_2`, groupName: 'Extras', name: 'Bacon Crispy', price: 1200, maxQuantity: 2 }
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
    <div className="w-full max-w-2xl mx-auto space-y-8">
      {/* Progress Steps Header */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400">
          <span>Paso {step} de 4</span>
          <span>{step === 1 ? 'Datos del Local' : step === 2 ? 'Cocina & Moneda' : step === 3 ? 'Primer Producto' : '¡Todo Listo!'}</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand-500 via-amber-400 to-emerald-400 transition-all duration-500"
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Main Wizard Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-950/90 border border-slate-800 shadow-2xl space-y-6">
        
        {/* STEP 1: Datos del Negocio */}
        {step === 1 && (
          <form onSubmit={handleNextStep1} className="space-y-5">
            <div className="space-y-1">
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                <Store className="w-5 h-5 text-brand-400" />
                ¿Cómo se llama tu restaurante?
              </h2>
              <p className="text-xs text-slate-400">
                Esta información se mostrará en el encabezado de tu menú digital y tickets.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Nombre del Restaurante / Local</label>
                <input
                  type="text"
                  required
                  value={bizName}
                  onChange={(e) => {
                    setBizName(e.target.value);
                    setBizSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-'));
                  }}
                  placeholder="Ej. Burger Craft / Pizzería Roma"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-brand-500 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Enlace / URL de tu Menú</label>
                <div className="flex items-center rounded-xl bg-slate-900 border border-slate-800 px-3 py-1">
                  <span className="text-xs text-slate-500 font-mono">bun-platform.app/menu/</span>
                  <input
                    type="text"
                    required
                    value={bizSlug}
                    onChange={(e) => setBizSlug(e.target.value)}
                    className="flex-1 px-2 py-2 bg-transparent text-brand-400 font-mono font-bold text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Número de WhatsApp para Pedidos</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={bizPhone}
                    onChange={(e) => setBizPhone(e.target.value)}
                    placeholder="+56912345678"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono"
                  />
                </div>
                <span className="text-[10px] text-slate-500 mt-1 block">Aquí recibirás los pedidos armados de los clientes.</span>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-500 to-amber-500 text-white font-extrabold text-xs shadow-lg shadow-brand-500/25 flex items-center gap-2 hover:scale-[1.02] transition"
              >
                <span>Siguiente: Tipo & Moneda</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: Tipo de Cocina & Moneda */}
        {step === 2 && (
          <form onSubmit={handleNextStep2} className="space-y-5">
            <div className="space-y-1">
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                <Utensils className="w-5 h-5 text-amber-400" />
                Configuración gastronómica
              </h2>
              <p className="text-xs text-slate-400">
                Selecciona tu tipo de comida y la moneda con la que cobran en tu país.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Especialidad del Restaurante</label>
                <select
                  value={cuisineType}
                  onChange={(e) => setCuisineType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-semibold"
                >
                  <option value="Hamburguesas & Sandwiches">🍔 Hamburguesas & Sandwiches</option>
                  <option value="Pizzas & Pastas">🍕 Pizzas & Pastas</option>
                  <option value="Sushi & Comida Asiática">🍣 Sushi & Comida Asiática</option>
                  <option value="Cafetería, Postres & Brunch">☕ Cafetería, Postres & Brunch</option>
                  <option value="Tacos & Comida Mexicana">🌮 Tacos & Comida Mexicana</option>
                  <option value="Pollo Frito & Fast Food">🍗 Pollo Frito & Fast Food</option>
                  <option value="Bar & Coctelería">🍹 Bar & Coctelería</option>
                  <option value="Comida Casera / Almuerzos">🍲 Comida Casera / Almuerzos</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Moneda</label>
                  <select
                    value={bizCurrency}
                    onChange={(e) => {
                      setBizCurrency(e.target.value);
                      if (e.target.value === 'USD') setBizSymbol('$');
                      else if (e.target.value === 'EUR') setBizSymbol('€');
                      else if (e.target.value === 'CLP' || e.target.value === 'COP' || e.target.value === 'MXN') setBizSymbol('$');
                      else if (e.target.value === 'PEN') setBizSymbol('S/');
                      else if (e.target.value === 'BRL') setBizSymbol('R$');
                    }}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono font-bold"
                  >
                    <option value="CLP">CLP (Peso Chileno)</option>
                    <option value="USD">USD (Dólar)</option>
                    <option value="MXN">MXN (Peso Mexicano)</option>
                    <option value="COP">COP (Peso Colombiano)</option>
                    <option value="PEN">PEN (Sol Peruano)</option>
                    <option value="BRL">BRL (Real Brasileño)</option>
                    <option value="EUR">EUR (Euro)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Símbolo</label>
                  <input
                    type="text"
                    value={bizSymbol}
                    onChange={(e) => setBizSymbol(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono font-bold text-center"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white text-xs font-bold flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Atrás
              </button>

              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-500 to-amber-500 text-white font-extrabold text-xs shadow-lg shadow-brand-500/25 flex items-center gap-2 hover:scale-[1.02] transition"
              >
                <span>Siguiente: Primer Plato</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Primer Producto Estrella */}
        {step === 3 && (
          <form onSubmit={handleNextStep3} className="space-y-5">
            <div className="space-y-1">
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-400" />
                Crea tu primer plato o producto
              </h2>
              <p className="text-xs text-slate-400">
                Puedes agregar más platos, variantes y modificadores en cualquier momento desde el catálogo.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Categoría</label>
                  <input
                    type="text"
                    required
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value)}
                    placeholder="Ej. Hamburguesas / Pizzas"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Precio ({bizSymbol})</label>
                  <input
                    type="number"
                    required
                    value={prodPrice}
                    onChange={(e) => setProdPrice(e.target.value)}
                    placeholder="6990"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Nombre del Plato</label>
                <input
                  type="text"
                  required
                  value={prodName}
                  onChange={(e) => setProdName(e.target.value)}
                  placeholder="Ej. Hamburguesa Doble Cheddar Bacon"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Descripción de Ingredientes</label>
                <textarea
                  rows={2}
                  value={prodDescription}
                  onChange={(e) => setProdDescription(e.target.value)}
                  placeholder="Describe los ingredientes que cautivarán a tus clientes..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                ></textarea>
              </div>
            </div>

            <div className="pt-4 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white text-xs font-bold flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Atrás
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-brand-500 to-amber-500 text-white font-extrabold text-xs shadow-lg shadow-brand-500/25 flex items-center gap-2 hover:scale-[1.02] transition"
              >
                <span>{loading ? 'Creando tu menú...' : '¡Guardar y Ver mi Menú! 🚀'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: Celebración & Acceso */}
        {step === 4 && (
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-3xl mx-auto shadow-xl">
              🎉
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-white">¡Felicitaciones, tu menú está en línea!</h2>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Tu restaurante <strong>{bizName}</strong> ya tiene su menú digital QR y sistema de cocina KDS listo para operar.
              </p>
            </div>

            {/* Quick Link Card */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3 text-left">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tu Enlace Público</p>
                <p className="text-xs font-mono font-bold text-brand-400 truncate">
                  bun-platform.app/menu/{bizSlug}
                </p>
              </div>

              <a
                href={`/menu/${bizSlug}`}
                target="_blank"
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs whitespace-nowrap transition"
              >
                Abrir Menú ↗
              </a>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleFinishOnboarding}
                className="flex-1 py-4 px-6 rounded-xl bg-gradient-to-r from-brand-500 to-amber-500 hover:from-brand-600 hover:to-amber-600 text-white font-extrabold text-xs shadow-xl shadow-brand-500/25 transition active:scale-[0.98]"
              >
                Ir a mi Panel de Control (Dashboard) 🚀
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
