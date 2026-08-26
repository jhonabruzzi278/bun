import React, { useState } from 'react';
import { useCatalogStore } from '@/lib/useCatalogStore';
import type { Product, ProductVariant, ProductModifier, CartItem } from '@/lib/types';
import { Search, ShoppingBag, Star, Plus, Minus, X, ChevronRight, CheckCircle2, Store, Phone, MapPin } from 'lucide-react';

export default function PublicMenuIsland() {
  const { business, categories, products, isLoaded } = useCatalogStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  
  // Product Detail Selection State
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedModifiers, setSelectedModifiers] = useState<Record<string, number>>({});
  const [quantity, setQuantity] = useState(1);
  const [itemNotes, setItemNotes] = useState('');

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [tableNumber, setTableNumber] = useState<string>('');
  const [orderType, setOrderType] = useState<'delivery' | 'takeaway' | 'dine_in'>('delivery');

  // Detect query params (e.g. ?mesa=4)
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const mesa = params.get('mesa');
      const tipo = params.get('tipo');
      if (mesa) {
        setTableNumber(mesa);
        setOrderType('dine_in');
      } else if (tipo === 'delivery') {
        setOrderType('delivery');
      }
    }
  }, []);


  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="animate-spin text-3xl">🍔</div>
      </div>
    );
  }

  const featuredProducts = products.filter((p) => p.isFeatured && p.isVisible);

  const displayedProducts = products.filter((p) => {
    if (!p.isVisible) return false;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
    if (!matchesSearch) return false;
    if (selectedCategory === 'ALL') return true;
    if (selectedCategory === 'FEATURED') return p.isFeatured;
    return p.categoryId === selectedCategory;
  });

  const openProductDetail = (p: Product) => {
    setActiveProductModal(p);
    setQuantity(1);
    setItemNotes('');
    setSelectedModifiers({});
    if (p.variants && p.variants.length > 0) {
      setSelectedVariant(p.variants.find((v) => v.isDefault) || p.variants[0]);
    } else {
      setSelectedVariant(null);
    }
  };

  const calculateModalPrice = () => {
    if (!activeProductModal) return 0;
    let base = activeProductModal.price;
    if (selectedVariant) base += selectedVariant.priceDelta;
    if (activeProductModal.modifiers) {
      for (const mod of activeProductModal.modifiers) {
        const qty = selectedModifiers[mod.id] || 0;
        base += mod.price * qty;
      }
    }
    return base * quantity;
  };

  const handleAddToCart = () => {
    if (!activeProductModal) return;
    const modDetails = (activeProductModal.modifiers || [])
      .filter((m) => selectedModifiers[m.id] > 0)
      .map((m) => ({ modifier: m, quantity: selectedModifiers[m.id] }));

    const newItem: CartItem = {
      id: `cart_${Date.now()}_${Math.random()}`,
      productId: activeProductModal.id,
      name: activeProductModal.name,
      price: activeProductModal.price,
      quantity,
      imageUrl: activeProductModal.imageUrl,
      selectedVariant: selectedVariant || undefined,
      selectedModifiers: modDetails,
      itemTotal: calculateModalPrice(),
      notes: itemNotes.trim() || undefined,
    };

    setCart((prev) => [...prev, newItem]);
    setActiveProductModal(null);
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.itemTotal, 0);
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleSendWhatsAppOrder = () => {
    if (!customerName.trim()) {
      alert('Por favor indica tu nombre');
      return;
    }

    let message = `¡Hola *${business.name}*! 👋 Quiero hacer el siguiente pedido:%0A%0A`;
    message += `📋 *DETALLE DEL PEDIDO:*%0A`;
    
    cart.forEach((item, idx) => {
      message += `${idx + 1}. *${item.quantity}x ${item.name}*`;
      if (item.selectedVariant) message += ` (${item.selectedVariant.name})`;
      message += ` - ${business.currencySymbol}${item.itemTotal.toLocaleString('es-CL')}%0A`;

      if (item.selectedModifiers && item.selectedModifiers.length > 0) {
        item.selectedModifiers.forEach((m) => {
          message += `   └ + ${m.quantity}x ${m.modifier.name}%0A`;
        });
      }
      if (item.notes) {
        message += `   └ 📝 Nota: _${item.notes}_%0A`;
      }
    });

    message += `%0A💰 *TOTAL: ${business.currencySymbol}${cartTotal.toLocaleString('es-CL')}* %0A%0A`;
    message += `📍 *DATOS DE ENTREGA:*%0A`;
    message += `👤 *Cliente:* ${customerName}%0A`;
    message += `🛵 *Tipo:* ${
      orderType === 'dine_in'
        ? `🍽️ Consumo en Salón (Mesa #${tableNumber || 'Sin número'})`
        : orderType === 'takeaway'
        ? '🛍️ Retiro en Local'
        : '🛵 Delivery a Domicilio'
    }%0A`;
    if (orderType === 'delivery' && customerAddress) {
      message += `🏠 *Dirección:* ${customerAddress}%0A`;
    }


    const cleanPhone = business.phone.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanPhone}?text=${message}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-28">
      {/* Business Cover Banner & Logo */}
      <div className="relative">
        <div className="h-44 md:h-64 w-full bg-slate-900 overflow-hidden relative">
          {business.bannerUrl && (
            <img src={business.bannerUrl} alt={business.name} className="w-full h-full object-cover opacity-60" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
        </div>

        <div className="max-w-3xl mx-auto px-4 -mt-16 relative z-10">
          <div className="flex items-end gap-4">
            <div className="w-24 h-24 rounded-2xl bg-slate-900 border-4 border-slate-950 shadow-2xl overflow-hidden shrink-0">
              {business.logoUrl ? (
                <img src={business.logoUrl} alt={business.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl">🍔</div>
              )}
            </div>

            <div className="pb-1 min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-black text-white truncate">{business.name}</h1>
              </div>
              <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Abierto ahora • Menú Digital
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-400 mt-3 line-clamp-2">{business.description}</p>
          
          <div className="flex items-center gap-4 text-[11px] text-slate-400 mt-2">
            {business.address && (
              <span className="flex items-center gap-1 truncate">
                <MapPin className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                {business.address}
              </span>
            )}
            {business.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                {business.phone}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 mt-6 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Buscar hamburguesa, bebida, acompañamiento..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-brand-500 shadow-inner"
          />
        </div>

        {/* Sticky Categories Bar */}
        <div className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur py-2 -mx-4 px-4 flex items-center gap-2 overflow-x-auto scrollbar-none border-b border-slate-900">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
              selectedCategory === 'ALL'
                ? 'bg-brand-500 text-white shadow-md shadow-brand-500/30'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Todos
          </button>

          {featuredProducts.length > 0 && (
            <button
              onClick={() => setSelectedCategory('FEATURED')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition flex items-center gap-1 ${
                selectedCategory === 'FEATURED'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                  : 'bg-slate-900 text-amber-400 border border-slate-800'
              }`}
            >
              <Star className="w-3 h-3 fill-current" />
              Destacados
            </button>
          )}

          {categories.filter((c) => c.isVisible).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat.id
                  ? 'bg-brand-500 text-white shadow-md shadow-brand-500/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products List */}
        <div className="space-y-3">
          {displayedProducts.map((p) => (
            <div
              key={p.id}
              onClick={() => openProductDetail(p)}
              className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition cursor-pointer flex gap-3.5 items-center justify-between group active:scale-[0.99]"
            >
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white text-sm truncate group-hover:text-brand-400 transition">
                    {p.name}
                  </h3>
                  {p.isFeatured && (
                    <span className="text-[9px] bg-amber-500/20 text-amber-300 font-extrabold px-1.5 py-0.5 rounded">
                      TOP
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 line-clamp-2">{p.description}</p>
                <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-sm font-extrabold text-white">
                    {business.currencySymbol}{p.price.toLocaleString('es-CL')}
                  </span>
                  {p.compareAtPrice && p.compareAtPrice > p.price && (
                    <span className="text-xs text-slate-500 line-through">
                      {business.currencySymbol}{p.compareAtPrice.toLocaleString('es-CL')}
                    </span>
                  )}
                </div>
              </div>

              {p.imageUrl ? (
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-950 shrink-0 border border-slate-800 relative">
                  <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                  <button
                    className="absolute bottom-1 right-1 w-6 h-6 rounded-lg bg-brand-500 text-white flex items-center justify-center font-bold text-xs shadow"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button className="w-8 h-8 rounded-xl bg-slate-800 group-hover:bg-brand-500 text-slate-300 group-hover:text-white flex items-center justify-center font-bold text-sm shrink-0 transition">
                  +
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 inset-x-4 max-w-md mx-auto z-40">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-brand-500 to-brand-600 text-white font-bold text-sm shadow-xl shadow-brand-500/30 flex items-center justify-between animate-bounce-subtle"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-white/20 text-xs flex items-center justify-center font-black">
                {totalItemsCount}
              </span>
              <span>Ver Carrito</span>
            </div>
            <span>{business.currencySymbol}{cartTotal.toLocaleString('es-CL')} ↗</span>
          </button>
        </div>
      )}

      {/* Modal Detalle de Producto & Modificadores */}
      {activeProductModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-slide-up">
            {/* Header Image */}
            <div className="relative h-48 sm:h-56 bg-slate-950 shrink-0">
              {activeProductModal.imageUrl ? (
                <img
                  src={activeProductModal.imageUrl}
                  alt={activeProductModal.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-5xl">🍔</div>
              )}
              <button
                onClick={() => setActiveProductModal(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-950/70 backdrop-blur text-white flex items-center justify-center hover:bg-slate-950"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 overflow-y-auto space-y-5 flex-1">
              <div>
                <h3 className="text-lg font-black text-white">{activeProductModal.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{activeProductModal.description}</p>
                <span className="text-base font-extrabold text-brand-400 mt-2 block">
                  {business.currencySymbol}{activeProductModal.price.toLocaleString('es-CL')}
                </span>
              </div>

              {/* Variantes */}
              {activeProductModal.variants && activeProductModal.variants.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300">Selecciona una opción</label>
                  <div className="space-y-1.5">
                    {activeProductModal.variants.map((v) => (
                      <label
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition ${
                          selectedVariant?.id === v.id
                            ? 'bg-brand-500/10 border-brand-500 text-white font-bold'
                            : 'bg-slate-950 border-slate-800 text-slate-300'
                        }`}
                      >
                        <span>{v.name}</span>
                        <span className="font-mono text-brand-400">
                          {v.priceDelta > 0 ? `+${business.currencySymbol}${v.priceDelta}` : v.priceDelta < 0 ? `-${business.currencySymbol}${Math.abs(v.priceDelta)}` : 'Incluido'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Modificadores */}
              {activeProductModal.modifiers && activeProductModal.modifiers.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300">¿Deseas agregar extras?</label>
                  <div className="space-y-1.5">
                    {activeProductModal.modifiers.map((m) => {
                      const qty = selectedModifiers[m.id] || 0;
                      return (
                        <div
                          key={m.id}
                          className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs"
                        >
                          <div>
                            <span className="font-semibold text-slate-200">{m.name}</span>
                            <span className="text-[11px] text-emerald-400 block font-mono">
                              +{business.currencySymbol}{m.price.toLocaleString('es-CL')}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            {qty > 0 && (
                              <>
                                <button
                                  type="button"
                                  onClick={() => setSelectedModifiers((prev) => ({ ...prev, [m.id]: Math.max(0, qty - 1) }))}
                                  className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-white"
                                >
                                  -
                                </button>
                                <span className="font-bold text-white text-xs">{qty}</span>
                              </>
                            )}
                            <button
                              type="button"
                              onClick={() => setSelectedModifiers((prev) => ({ ...prev, [m.id]: Math.min(m.maxQuantity, qty + 1) }))}
                              className="w-6 h-6 rounded-lg bg-brand-500 text-white flex items-center justify-center font-bold"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Notes */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Instrucciones especiales</label>
                <input
                  type="text"
                  placeholder="ej. Sin cebolla, aderezo aparte..."
                  value={itemNotes}
                  onChange={(e) => setItemNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-600"
                />
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center gap-3">
              <div className="flex items-center bg-slate-900 rounded-xl border border-slate-800 p-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white hover:bg-slate-800"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center font-bold text-sm text-white">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white hover:bg-slate-800"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 py-3 px-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-brand-500/25 flex items-center justify-between"
              >
                <span>Agregar al Carrito</span>
                <span>{business.currencySymbol}{calculateModalPrice().toLocaleString('es-CL')}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Drawer Carrito & Pedido */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex justify-end">
          <div className="bg-slate-900 border-l border-slate-800 w-full max-w-md h-full flex flex-col justify-between shadow-2xl animate-slide-left">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brand-400" />
                <h3 className="font-bold text-white text-base">Mi Carrito de Pedido</h3>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="p-5 overflow-y-auto flex-1 space-y-3">
              {cart.map((item, index) => (
                <div key={item.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-bold text-white text-xs">
                        {item.quantity}x {item.name}
                      </span>
                      {item.selectedVariant && (
                        <span className="text-[11px] text-slate-400 block font-medium">
                          ({item.selectedVariant.name})
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-white">
                        {business.currencySymbol}{item.itemTotal.toLocaleString('es-CL')}
                      </span>
                      <button
                        onClick={() => setCart((prev) => prev.filter((_, i) => i !== index))}
                        className="text-slate-600 hover:text-rose-400"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {item.selectedModifiers && item.selectedModifiers.length > 0 && (
                    <div className="text-[10px] text-slate-500 space-y-0.5 pl-2 border-l border-slate-800">
                      {item.selectedModifiers.map((m, mi) => (
                        <div key={mi}>+ {m.quantity}x {m.modifier.name}</div>
                      ))}
                    </div>
                  )}

                  {item.notes && (
                    <div className="text-[10px] text-amber-400/80 italic">
                      Nota: {item.notes}
                    </div>
                  )}
                </div>
              ))}

              {/* Customer Details Form */}
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-slate-200">Datos para la entrega</h4>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`py-2 text-xs font-bold rounded-xl border transition ${
                      orderType === 'delivery'
                        ? 'bg-brand-500 text-white border-brand-500'
                        : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    🛵 Delivery
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('takeaway')}
                    className={`py-2 text-xs font-bold rounded-xl border transition ${
                      orderType === 'takeaway'
                        ? 'bg-brand-500 text-white border-brand-500'
                        : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    🛍️ Retiro en Local
                  </button>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Tu Nombre</label>
                  <input
                    type="text"
                    required
                    placeholder="ej. Juan Pérez"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>

                {orderType === 'delivery' && (
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">Dirección de Envío</label>
                    <input
                      type="text"
                      placeholder="ej. Av. Providencia 1240, Depto 402"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-5 border-t border-slate-800 bg-slate-950 space-y-3">
              <div className="flex items-center justify-between text-sm font-black text-white">
                <span>Total a Pagar</span>
                <span className="text-brand-400">{business.currencySymbol}{cartTotal.toLocaleString('es-CL')}</span>
              </div>

              <button
                type="button"
                onClick={handleSendWhatsAppOrder}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition"
              >
                <span>Enviar Pedido por WhatsApp</span>
                <span>💬</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
