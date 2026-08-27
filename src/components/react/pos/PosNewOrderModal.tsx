import React, { useState } from 'react';
import type { Product } from '@/lib/types';
import { X, Plus, Minus, Search } from 'lucide-react';

interface PosNewOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  currencySymbol: string;
  onCreateOrder: (orderPayload: {
    serviceType: 'TAKEAWAY' | 'DINE_IN' | 'DELIVERY' | 'TABLE';
    tableNumber?: number;
    customerName: string;
    customerPhone?: string;
    cartItems: { product: Product; quantity: number }[];
  }) => void;
}

export default function PosNewOrderModal({
  isOpen,
  onClose,
  products,
  currencySymbol,
  onCreateOrder,
}: PosNewOrderModalProps) {
  const [serviceType, setServiceType] = useState<'TAKEAWAY' | 'DINE_IN' | 'DELIVERY' | 'TABLE'>('TAKEAWAY');
  const [tableNumber, setTableNumber] = useState<number>(1);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [cartItems, setCartItems] = useState<{ product: Product; quantity: number }[]>([]);

  if (!isOpen) return null;

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const handleAddItem = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const orderTotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert('Agrega al menos un producto al pedido');
      return;
    }

    onCreateOrder({
      serviceType,
      tableNumber: serviceType === 'TABLE' ? tableNumber : undefined,
      customerName: customerName.trim() || (serviceType === 'TABLE' ? `Mesa ${tableNumber}` : 'Cliente Mostrador'),
      customerPhone: customerPhone.trim() || undefined,
      cartItems,
    });

    setCartItems([]);
    setCustomerName('');
    setCustomerPhone('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] rounded-3xl max-w-3xl w-full p-6 shadow-2xl space-y-5 my-8 transition-colors">
        <div className="flex items-center justify-between pb-3 border-b border-[#EAE1D6] dark:border-[#3D2420]">
          <h3 className="font-bold text-coffee-950 dark:text-white text-lg">
            Crear Nuevo Pedido POS
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
          {/* Service Type */}
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setServiceType('TAKEAWAY')}
              className={`py-2 rounded-xl text-xs font-bold border transition ${
                serviceType === 'TAKEAWAY'
                  ? 'bg-color4 text-white border-transparent'
                  : 'bg-[#FAF7F2] dark:bg-[#180E0C] text-[#70645A] border-[#EAE1D6] dark:border-[#3D2420]'
              }`}
            >
              🛍️ Para Llevar
            </button>
            <button
              type="button"
              onClick={() => setServiceType('TABLE')}
              className={`py-2 rounded-xl text-xs font-bold border transition ${
                serviceType === 'TABLE'
                  ? 'bg-color4 text-white border-transparent'
                  : 'bg-[#FAF7F2] dark:bg-[#180E0C] text-[#70645A] border-[#EAE1D6] dark:border-[#3D2420]'
              }`}
            >
              🍽️ En Mesa
            </button>
            <button
              type="button"
              onClick={() => setServiceType('DELIVERY')}
              className={`py-2 rounded-xl text-xs font-bold border transition ${
                serviceType === 'DELIVERY'
                  ? 'bg-color4 text-white border-transparent'
                  : 'bg-[#FAF7F2] dark:bg-[#180E0C] text-[#70645A] border-[#EAE1D6] dark:border-[#3D2420]'
              }`}
            >
              🛵 Delivery
            </button>
          </div>

          {/* Customer & Table */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-coffee-950 dark:text-[#E8DFD8] mb-1">Nombre del Cliente</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="ej. Jonathan Guerra"
                className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-coffee-950 dark:text-white text-xs focus:outline-none"
              />
            </div>

            {serviceType === 'TABLE' ? (
              <div>
                <label className="block text-xs font-semibold text-coffee-950 dark:text-[#E8DFD8] mb-1">Número de Mesa</label>
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={tableNumber}
                  onChange={(e) => setTableNumber(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-coffee-950 dark:text-white text-xs font-bold focus:outline-none"
                />
              </div>
            ) : (
              <div>
                <label className="block text-xs font-semibold text-coffee-950 dark:text-[#E8DFD8] mb-1">Teléfono</label>
                <input
                  type="text"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+56 9..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-coffee-950 dark:text-white text-xs focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Product Quick Picker */}
          <div className="space-y-2 pt-2 border-t border-[#EAE1D6] dark:border-[#3D2420]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-coffee-950 dark:text-white">Selecciona Productos:</span>
              <div className="relative w-48">
                <Search className="w-3.5 h-3.5 text-[#8C7E73] absolute left-2.5 top-2" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-8 pr-3 py-1 rounded-lg bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-[11px] text-coffee-950 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-1">
              {filteredProducts.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleAddItem(p)}
                  className="p-2 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] hover:bg-[#F3EDE3] dark:hover:bg-[#2D1B18] border border-[#EAE1D6] dark:border-[#3D2420] text-left transition flex flex-col justify-between"
                >
                  <span className="text-xs font-bold text-coffee-950 dark:text-white line-clamp-1">{p.name}</span>
                  <span className="text-[11px] font-mono font-bold text-color4 dark:text-color2 mt-1">
                    {currencySymbol}{p.price.toLocaleString('es-CL')}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Cart Summary */}
          {cartItems.length > 0 && (
            <div className="p-3 rounded-2xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] space-y-2">
              <span className="text-xs font-bold text-coffee-950 dark:text-white block">Ítems Seleccionados:</span>
              <div className="space-y-1.5 max-h-32 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex items-center justify-between text-xs bg-white dark:bg-[#241512] p-2 rounded-xl border border-[#EAE1D6] dark:border-[#3D2420]">
                    <span className="font-semibold text-coffee-950 dark:text-white">{item.product.name}</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleUpdateQuantity(item.product.id, -1)}
                        className="w-5 h-5 rounded bg-[#FAF7F2] dark:bg-[#180E0C] flex items-center justify-center text-xs"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-bold text-xs">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => handleUpdateQuantity(item.product.id, 1)}
                        className="w-5 h-5 rounded bg-[#FAF7F2] dark:bg-[#180E0C] flex items-center justify-center text-xs"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <span className="font-mono font-bold text-xs ml-2">
                        {currencySymbol}{(item.product.price * item.quantity).toLocaleString('es-CL')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer Submit */}
          <div className="flex items-center justify-between pt-3 border-t border-[#EAE1D6] dark:border-[#3D2420]">
            <div>
              <span className="text-[10px] uppercase text-[#8C7E73] dark:text-[#A8988B] block">Total Pedido</span>
              <span className="text-lg font-black font-mono text-coffee-950 dark:text-white">
                {currencySymbol}{orderTotal.toLocaleString('es-CL')}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-bold text-[#70645A] dark:text-[#A8988B]"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-color4 hover:bg-[#522B2B] text-white font-bold text-xs shadow-coffee-sm transition"
              >
                Crear Comanda
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
