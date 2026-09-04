import React from 'react';
import type { CartItem, Business } from '@/lib/types';
import {
  Trash2 as IconTrash,
  MessageCircle as IconBrandWhatsapp,
  Armchair as IconArmchair,
  Store as IconBuildingStore,
  Truck as IconTruckDelivery,
  CreditCard as IconCreditCard,
  Banknote as IconCash,
  ShoppingBag as IconShoppingBag,
  X as IconX
} from 'lucide-react';
import { Input, Badge } from '@/components/ui';

interface CartCheckoutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  cartTotal: number;
  business: Business;
  themeColor?: string;
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
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex justify-end">
      <div className="bg-[#121215]/95 border-l border-white/[0.1] w-full max-w-md h-full flex flex-col justify-between shadow-2xl animate-slide-left backdrop-blur-2xl text-white">
        {/* Header */}
        <div className="p-5 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
              <IconShoppingBag className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base leading-tight">Comanda de Pedido</h3>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">brew.cl checkout</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1.5 rounded-full hover:bg-white/[0.1] transition"
          >
            <IconX className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Items & Customer Form */}
        <div className="p-5 overflow-y-auto flex-1 space-y-3">
          {cart.map((item, index) => (
            <div key={item.id} className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] space-y-1.5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="font-bold text-white text-xs">
                    {item.quantity}x {item.name}
                  </span>
                  {item.selectedVariant && (
                    <span className="text-[11px] text-zinc-400 block font-medium">
                      ({item.selectedVariant.name})
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-amber-400">
                    {business.currencySymbol || '$'}{item.itemTotal.toLocaleString('es-CL')}
                  </span>
                  <button
                    type="button"
                    onClick={() => onRemoveItem(index)}
                    className="text-zinc-500 hover:text-rose-400 p-0.5 transition"
                    title="Eliminar plato"
                  >
                    <IconTrash className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {item.selectedModifiers && item.selectedModifiers.length > 0 && (
                <div className="text-[10px] text-zinc-400 space-y-0.5 pl-2 border-l border-white/[0.1]">
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
          <div className="pt-4 border-t border-white/[0.08] space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Datos de atención</h4>

            {/* Service Type Selector */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setOrderType('dine_in')}
                className={`p-2.5 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1 transition-all duration-200 active:scale-95 ${
                  orderType === 'dine_in'
                    ? 'bg-amber-500/20 text-white border-amber-500/50 shadow-sm'
                    : 'bg-white/[0.04] text-zinc-400 border-white/[0.08] hover:text-white'
                }`}
              >
                <IconArmchair className="w-4 h-4" />
                <span className="text-[11px]">En Mesa</span>
              </button>

              <button
                type="button"
                onClick={() => setOrderType('takeaway')}
                className={`p-2.5 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1 transition-all duration-200 active:scale-95 ${
                  orderType === 'takeaway'
                    ? 'bg-amber-500/20 text-white border-amber-500/50 shadow-sm'
                    : 'bg-white/[0.04] text-zinc-400 border-white/[0.08] hover:text-white'
                }`}
              >
                <IconBuildingStore className="w-4 h-4" />
                <span className="text-[11px]">Retiro</span>
              </button>

              <button
                type="button"
                onClick={() => setOrderType('delivery')}
                className={`p-2.5 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1 transition-all duration-200 active:scale-95 ${
                  orderType === 'delivery'
                    ? 'bg-amber-500/20 text-white border-amber-500/50 shadow-sm'
                    : 'bg-white/[0.04] text-zinc-400 border-white/[0.08] hover:text-white'
                }`}
              >
                <IconTruckDelivery className="w-4 h-4" />
                <span className="text-[11px]">Delivery</span>
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-3.5 pt-2">
              <div>
                <label htmlFor="checkout-customer-name" className="text-xs font-black text-white flex items-center justify-between mb-1.5">
                  <span className="flex items-center gap-1.5">
                    Tu Nombre y Apellido <span className="text-amber-400 font-bold">*</span>
                  </span>
                  <span className="text-[10px] text-amber-400/90 font-mono bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">
                    ⚡ Autocompletar
                  </span>
                </label>
                <Input
                  id="checkout-customer-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  inputMode="text"
                  enterKeyHint="next"
                  placeholder="ej. Daniel Valenzuela"
                  value={customerName}
                  onChange={(e) => {
                    setCustomerName(e.target.value);
                    try { localStorage.setItem('brew_customer_name', e.target.value); } catch {}
                  }}
                  className="bg-[#18181C] border-zinc-700 text-white placeholder:text-zinc-400 font-medium focus-visible:border-amber-400 focus-visible:ring-amber-400/30"
                />
              </div>

              <div>
                <label htmlFor="checkout-customer-phone" className="text-xs font-black text-white flex items-center justify-between mb-1.5">
                  <span className="flex items-center gap-1.5">
                    Teléfono Móvil / WhatsApp <span className="text-amber-400 font-bold">*</span>
                  </span>
                  <span className="text-[10px] text-zinc-400 font-mono">
                    Chile (+56 9)
                  </span>
                </label>
                <Input
                  id="checkout-customer-phone"
                  name="tel"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  enterKeyHint="next"
                  placeholder="+56 9 3898 0598"
                  value={customerPhone}
                  onChange={(e) => {
                    setCustomerPhone(e.target.value);
                    try { localStorage.setItem('brew_customer_phone', e.target.value); } catch {}
                  }}
                  className="bg-[#18181C] border-zinc-700 text-white placeholder:text-zinc-400 font-medium focus-visible:border-amber-400 focus-visible:ring-amber-400/30"
                />
              </div>

              {orderType === 'dine_in' && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="checkout-table-number" className="text-xs font-black text-white flex items-center gap-1">
                      Número de Mesa <span className="text-amber-400 font-bold">*</span>
                    </label>
                    <Badge variant="amber" dot>Atención en sala</Badge>
                  </div>
                  <Input
                    id="checkout-table-number"
                    name="tableNumber"
                    type="text"
                    autoComplete="off"
                    placeholder="ej. Mesa 4"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="bg-[#18181C] border-zinc-700 text-white placeholder:text-zinc-400 font-medium focus-visible:border-amber-400 focus-visible:ring-amber-400/30"
                  />
                </div>
              )}

              {orderType === 'delivery' && (
                <div>
                  <label htmlFor="checkout-customer-address" className="text-xs font-black text-white flex items-center gap-1 mb-1.5">
                    Dirección de Entrega <span className="text-amber-400 font-bold">*</span>
                  </label>
                  <Input
                    id="checkout-customer-address"
                    name="street-address"
                    type="text"
                    autoComplete="street-address"
                    inputMode="text"
                    enterKeyHint="done"
                    placeholder="Calle, número, depto o referencia"
                    value={customerAddress}
                    onChange={(e) => {
                      setCustomerAddress(e.target.value);
                      try { localStorage.setItem('brew_customer_address', e.target.value); } catch {}
                    }}
                    className="bg-[#18181C] border-zinc-700 text-white placeholder:text-zinc-400 font-medium focus-visible:border-amber-400 focus-visible:ring-amber-400/30"
                  />
                </div>
              )}

              {/* Payment Method */}
              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1.5">Forma de Pago</label>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Webpay Plus')}
                    className={`p-2 rounded-xl border text-[11px] font-bold flex flex-col items-center justify-center gap-1 transition-all duration-200 active:scale-95 ${
                      paymentMethod.includes('Webpay')
                        ? 'bg-amber-500/20 text-white border-amber-500/50 shadow-sm'
                        : 'bg-white/[0.04] text-zinc-400 border-white/[0.08] hover:text-white'
                    }`}
                  >
                    <IconCreditCard className="w-4 h-4 text-orange-400" />
                    <span>Webpay Plus</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Mercado Pago')}
                    className={`p-2 rounded-xl border text-[11px] font-bold flex flex-col items-center justify-center gap-1 transition-all duration-200 active:scale-95 ${
                      paymentMethod === 'Mercado Pago'
                        ? 'bg-amber-500/20 text-white border-amber-500/50 shadow-sm'
                        : 'bg-white/[0.04] text-zinc-400 border-white/[0.08] hover:text-white'
                    }`}
                  >
                    <IconCreditCard className="w-4 h-4 text-cyan-400" />
                    <span>Mercado Pago</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Efectivo')}
                    className={`p-2 rounded-xl border text-[11px] font-bold flex flex-col items-center justify-center gap-1 transition-all duration-200 active:scale-95 ${
                      paymentMethod === 'Efectivo'
                        ? 'bg-amber-500/20 text-white border-amber-500/50 shadow-sm'
                        : 'bg-white/[0.04] text-zinc-400 border-white/[0.08] hover:text-white'
                    }`}
                  >
                    <IconCash className="w-4 h-4 text-emerald-400" />
                    <span>Efectivo</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Total & Submit Button */}
        <div className="p-5 border-t border-white/[0.08] bg-[#0E0E11]/90 backdrop-blur-xl space-y-3">
          <div className="space-y-1">
            {orderType === 'delivery' && (
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span>Costo Despacho</span>
                <span className="font-mono font-bold text-white">{business.currencySymbol || '$'}{deliveryCost.toLocaleString('es-CL')}</span>
              </div>
            )}
            <div className="flex items-center justify-between text-sm font-black text-white">
              <span>Total Comanda</span>
              <span className="text-base font-mono text-amber-400">{business.currencySymbol || '$'}{grandTotal.toLocaleString('es-CL')}</span>
            </div>
          </div>

          {paymentMethod.includes('Webpay') ? (
            <button
              type="button"
              onClick={async () => {
                try {
                  const res = await fetch('/api/payments/create-transaction', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      gateway: 'webpay',
                      amount: grandTotal,
                      customerName,
                      customerPhone,
                      items: cart,
                    }),
                  });
                  const data = await res.json();
                  if (data.redirectUrl) window.location.href = data.redirectUrl;
                } catch (err) {
                  console.error('Error iniciando Webpay:', err);
                }
              }}
              className="w-full py-3.5 rounded-2xl text-white font-black text-sm shadow-xl shadow-orange-500/20 flex items-center justify-center gap-2 transition-all duration-200 hover:brightness-105 active:scale-[0.98] bg-gradient-to-r from-orange-500 to-amber-600"
            >
              <IconCreditCard className="w-5 h-5" />
              <span>Pagar con Webpay Plus</span>
            </button>
          ) : paymentMethod === 'Mercado Pago' ? (
            <button
              type="button"
              onClick={async () => {
                try {
                  const res = await fetch('/api/payments/create-transaction', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      gateway: 'mercadopago',
                      amount: grandTotal,
                      customerName,
                      customerPhone,
                      items: cart,
                    }),
                  });
                  const data = await res.json();
                  if (data.redirectUrl) window.location.href = data.redirectUrl;
                } catch (err) {
                  console.error('Error iniciando Mercado Pago:', err);
                }
              }}
              className="w-full py-3.5 rounded-2xl text-black font-black text-sm shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all duration-200 hover:brightness-105 active:scale-[0.98] bg-gradient-to-r from-cyan-400 to-blue-500"
            >
              <IconCreditCard className="w-5 h-5" />
              <span>Pagar con Mercado Pago</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onSubmitWhatsApp}
              className="w-full py-3.5 rounded-2xl text-white font-black text-sm shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all duration-200 hover:brightness-105 active:scale-[0.98] bg-[#25D366]"
            >
              <IconBrandWhatsapp className="w-5 h-5" />
              <span>Confirmar Pedido por WhatsApp</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
