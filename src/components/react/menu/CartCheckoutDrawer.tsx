import React from 'react';
import type { CartItem, Business } from '@/lib/types';
import { ShoppingBag, X } from 'lucide-react';

interface CartCheckoutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  cartTotal: number;
  business: Business;
  themeColor: string;
  customerName: string;
  setCustomerName: (name: string) => void;
  customerPhone: string;
  setCustomerPhone: (phone: string) => void;
  customerAddress: string;
  setCustomerAddress: (address: string) => void;
  tableNumber: string;
  setTableNumber: (table: string) => void;
  orderType: 'delivery' | 'takeaway' | 'dine_in';
  setOrderType: (type: 'delivery' | 'takeaway' | 'dine_in') => void;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  onRemoveItem: (index: number) => void;
  onSubmitWhatsApp: () => void;
}

export default function CartCheckoutDrawer({
  isOpen,
  onClose,
  cart,
  cartTotal,
  business,
  themeColor,
  customerName,
  setCustomerName,
  customerPhone,
  setCustomerPhone,
  customerAddress,
  setCustomerAddress,
  tableNumber,
  setTableNumber,
  orderType,
  setOrderType,
  paymentMethod,
  setPaymentMethod,
  onRemoveItem,
  onSubmitWhatsApp,
}: CartCheckoutDrawerProps) {
  if (!isOpen) return null;

  const deliveryCost = orderType === 'delivery' ? (business.serviceSettings?.delivery?.serviceFee || 2000) : 0;
  const grandTotal = cartTotal + deliveryCost;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
      <div className="bg-[#241512] border-l border-[#3D2420] w-full max-w-md h-full flex flex-col justify-between shadow-2xl animate-slide-left">
        {/* Header */}
        <div className="p-5 border-b border-[#3D2420] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" style={{ color: themeColor }} />
            <h3 className="font-bold text-white text-base">Comanda de Pedido</h3>
          </div>
          <button onClick={onClose} className="text-[#A8988B] hover:text-white p-1 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Items & Customer Form */}
        <div className="p-5 overflow-y-auto flex-1 space-y-3">
          {cart.map((item, index) => (
            <div key={item.id} className="p-3.5 rounded-xl bg-[#180E0C] border border-[#3D2420] space-y-1.5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="font-bold text-white text-xs">
                    {item.quantity}x {item.name}
                  </span>
                  {item.selectedVariant && (
                    <span className="text-[11px] text-[#A8988B] block font-medium">
                      ({item.selectedVariant.name})
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-white">
                    {business.currencySymbol || '$'}{item.itemTotal.toLocaleString('es-CL')}
                  </span>
                  <button
                    type="button"
                    onClick={() => onRemoveItem(index)}
                    className="text-[#70645A] hover:text-rose-400 p-0.5 transition"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {item.selectedModifiers && item.selectedModifiers.length > 0 && (
                <div className="text-[10px] text-[#8C7E73] space-y-0.5 pl-2 border-l border-[#3D2420]">
                  {item.selectedModifiers.map((m, mi) => (
                    <div key={mi}>+ {m.quantity}x {m.modifier.name}</div>
                  ))}
                </div>
              )}

              {item.notes && (
                <div className="text-[10px] text-amber-400/90 italic">
                  Nota: {item.notes}
                </div>
              )}
            </div>
          ))}

          {/* Customer & Order Form */}
          <div className="pt-4 border-t border-[#3D2420] space-y-3">
            <h4 className="text-xs font-bold text-white">Datos de atención</h4>

            {/* Service Type Selector */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setOrderType('delivery')}
                className={`py-2 text-xs font-bold rounded-xl border transition ${
                  orderType === 'delivery'
                    ? 'text-white border-transparent'
                    : 'bg-[#180E0C] text-[#A8988B] border-[#3D2420]'
                }`}
                style={{
                  backgroundColor: orderType === 'delivery' ? themeColor : undefined,
                }}
              >
                🛵 Delivery
              </button>
              <button
                type="button"
                onClick={() => setOrderType('dine_in')}
                className={`py-2 text-xs font-bold rounded-xl border transition ${
                  orderType === 'dine_in'
                    ? 'text-white border-transparent'
                    : 'bg-[#180E0C] text-[#A8988B] border-[#3D2420]'
                }`}
                style={{
                  backgroundColor: orderType === 'dine_in' ? themeColor : undefined,
                }}
              >
                🍽️ En Mesa
              </button>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#A8988B] mb-1">Nombre del Cliente</label>
              <input
                type="text"
                required
                placeholder="ej. Jonathan Guerra"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#180E0C] border border-[#3D2420] text-xs text-white placeholder-[#70645A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#A8988B] mb-1">Teléfono WhatsApp</label>
              <input
                type="tel"
                placeholder="+56 938980598"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#180E0C] border border-[#3D2420] text-xs text-white placeholder-[#70645A] focus:outline-none"
              />
            </div>

            {orderType === 'dine_in' && (
              <div>
                <label className="block text-[11px] font-semibold text-[#A8988B] mb-1">Número de Mesa</label>
                <input
                  type="text"
                  placeholder="ej. 4"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#180E0C] border border-[#3D2420] text-xs text-white placeholder-[#70645A] focus:outline-none"
                />
              </div>
            )}

            {orderType === 'delivery' && (
              <div>
                <label className="block text-[11px] font-semibold text-[#A8988B] mb-1">Dirección de Entrega</label>
                <input
                  type="text"
                  placeholder="ej. Merced 865, Santiago"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#180E0C] border border-[#3D2420] text-xs text-white placeholder-[#70645A] focus:outline-none"
                />
              </div>
            )}

            <div>
              <label className="block text-[11px] font-semibold text-[#A8988B] mb-1">Medio de Pago</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#180E0C] border border-[#3D2420] text-xs text-white focus:outline-none"
              >
                <option value="Efectivo al recibir">Efectivo al recibir</option>
                <option value="Transferencia Bancaria">Transferencia Bancaria</option>
                <option value="Tarjeta Débito / Crédito (POS)">Tarjeta Débito / Crédito (POS)</option>
                <option value="EDENRED / SODEXO / AMIPASS">EDENRED / SODEXO / AMIPASS</option>
              </select>
            </div>
          </div>
        </div>

        {/* Total & Submit Button */}
        <div className="p-5 border-t border-[#3D2420] bg-[#180E0C] space-y-3">
          <div className="space-y-1">
            {orderType === 'delivery' && (
              <div className="flex items-center justify-between text-xs text-[#A8988B]">
                <span>Envío</span>
                <span className="font-mono">{business.currencySymbol || '$'}{deliveryCost.toLocaleString('es-CL')}</span>
              </div>
            )}
            <div className="flex items-center justify-between text-sm font-black text-white">
              <span>Total</span>
              <span style={{ color: themeColor }}>{business.currencySymbol || '$'}{grandTotal.toLocaleString('es-CL')}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onSubmitWhatsApp}
            className="w-full py-3.5 rounded-xl text-white font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 transition active:scale-[0.99]"
            style={{ backgroundColor: '#25D366' }}
          >
            <span>Confirmar Pedido por WhatsApp</span>
            <span>💬</span>
          </button>
        </div>
      </div>
    </div>
  );
}
