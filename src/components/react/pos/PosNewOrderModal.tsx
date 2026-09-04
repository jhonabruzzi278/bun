import React, { useState, useEffect } from 'react';
import type { Product } from '@/lib/types';
import { X, Plus, Minus, Search, ShoppingBag, Truck, Armchair, Barcode, Scan, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button, Badge, Input } from '@/components/ui';
import {
  playBarcodeBeep,
  RETAIL_BARCODE_SAMPLES,
  createPhysicalBarcodeListener,
} from '@/lib/barcodeSimulator';

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
  const [manualBarcodeInput, setManualBarcodeInput] = useState('');
  const [cartItems, setCartItems] = useState<{ product: Product; quantity: number }[]>([]);
  const [lastScannedName, setLastScannedName] = useState<string | null>(null);

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

  const handleScanBarcode = (barcode: string) => {
    playBarcodeBeep();

    // 1. Search in existing catalog by barcode or sku
    let match = products.find((p) => p.sku === barcode || (p as any).barcode === barcode);

    // 2. If not found in catalog, search in retail samples (Coca-Cola, etc.)
    if (!match) {
      const sample = RETAIL_BARCODE_SAMPLES.find((s) => s.barcode === barcode);
      if (sample) {
        match = {
          id: `prod_retail_${sample.barcode}`,
          tenantId: 'tenant_001',
          businessId: 'biz_001',
          name: sample.name,
          description: `Producto Retail (${sample.category}) - Código: ${sample.barcode}`,
          price: sample.price,
          sku: sample.barcode,
          categoryId: 'cat_drinks',
          imageUrl: '',
          isAvailable: true,
          isVisible: true,
          isFeatured: false,
          position: 0,
        };
      }
    }

    if (match) {
      handleAddItem(match);
      setLastScannedName(match.name);
      setTimeout(() => setLastScannedName(null), 3000);
    } else {
      alert(`Código de barras [${barcode}] no encontrado en el catálogo.`);
    }
  };

  // Attach physical barcode gun listener (USB HID)
  useEffect(() => {
    if (!isOpen) return;
    const cleanup = createPhysicalBarcodeListener(handleScanBarcode);
    return cleanup;
  }, [isOpen, products]);

  const handleUpdateQty = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as { product: Product; quantity: number }[]
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert('Debes agregar al menos 1 producto a la orden');
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#1C1C1E]/95 border border-white/[0.12] rounded-[36px] max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8 transition-colors backdrop-blur-2xl text-white">
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="font-black text-white text-lg sm:text-xl tracking-tight">
                Crear Nuevo Pedido POS
              </h3>
              <p className="text-xs text-[#A8988B]">Caja rápida y comanda directa a cocina KDS</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-white/80 hover:text-white flex items-center justify-center transition-all duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 max-h-[75vh] overflow-y-auto pr-1">
          {/* Apple Segmented Service Type */}
          <div className="grid grid-cols-3 gap-2 p-1 rounded-2xl bg-white/[0.05] border border-white/[0.08]">
            <button
              type="button"
              onClick={() => setServiceType('TAKEAWAY')}
              className={`py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 ${
                serviceType === 'TAKEAWAY'
                  ? 'bg-white text-black shadow-sm font-black'
                  : 'text-[#A8988B] hover:text-white'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Para Llevar</span>
            </button>
            <button
              type="button"
              onClick={() => setServiceType('TABLE')}
              className={`py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 ${
                serviceType === 'TABLE'
                  ? 'bg-white text-black shadow-sm font-black'
                  : 'text-[#A8988B] hover:text-white'
              }`}
            >
              <Armchair className="w-3.5 h-3.5" />
              <span>En Mesa</span>
            </button>
            <button
              type="button"
              onClick={() => setServiceType('DELIVERY')}
              className={`py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 ${
                serviceType === 'DELIVERY'
                  ? 'bg-white text-black shadow-sm font-black'
                  : 'text-[#A8988B] hover:text-white'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Delivery</span>
            </button>
          </div>

          {/* Table / Customer Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {serviceType === 'TABLE' ? (
              <div>
                <label htmlFor="pos-table-number" className="text-xs font-black text-white block mb-1.5">
                  Número de Mesa <span className="text-amber-400 font-bold">*</span>
                </label>
                <Input
                  id="pos-table-number"
                  name="tableNumber"
                  type="number"
                  min="1"
                  max="100"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(parseInt(e.target.value) || 1)}
                  className="bg-[#18181C] border-zinc-700 text-white placeholder:text-zinc-400 font-medium focus-visible:border-amber-400"
                />
              </div>
            ) : (
              <div>
                <label htmlFor="pos-customer-name" className="text-xs font-black text-white flex items-center justify-between mb-1.5">
                  <span>Nombre del Cliente <span className="text-amber-400 font-bold">*</span></span>
                  <span className="text-[10px] text-amber-400/90 font-mono">⚡ Rápido</span>
                </label>
                <Input
                  id="pos-customer-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  inputMode="text"
                  enterKeyHint="next"
                  placeholder="ej. Carlos Silva"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="bg-[#18181C] border-zinc-700 text-white placeholder:text-zinc-400 font-medium focus-visible:border-amber-400"
                />
              </div>
            )}

            <div>
              <label htmlFor="pos-customer-phone" className="text-xs font-black text-white flex items-center justify-between mb-1.5">
                <span>Teléfono / WhatsApp</span>
                <span className="text-[10px] text-zinc-400 font-mono">(Opcional)</span>
              </label>
              <Input
                id="pos-customer-phone"
                name="tel"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder="+56 9 1234 5678"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="bg-[#18181C] border-zinc-700 text-white placeholder:text-zinc-400 font-medium focus-visible:border-amber-400"
              />
            </div>
          </div>

          {/* Barcode Scanner & Retail Quick-Pick (Like Toteat / Fudo) */}
          <div className="p-3.5 rounded-2xl bg-amber-500/[0.07] border border-amber-500/25 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Scan className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-black text-white flex items-center gap-1.5">
                  Lector de Códigos de Barras <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">Fast Retail</span>
                </span>
              </div>
              <span className="text-[10px] text-zinc-400 font-mono hidden sm:inline">
                Pistola USB activa
              </span>
            </div>

            {/* Quick scan retail sample buttons (Coca-Cola, Corona, etc.) */}
            <div className="space-y-1">
              <p className="text-[10px] text-zinc-400">
                Simula el escaneo de una lata o botella de un clic (o dispara tu lector físico):
              </p>
              <div className="flex flex-wrap gap-1.5">
                {RETAIL_BARCODE_SAMPLES.map((sample) => (
                  <button
                    key={sample.barcode}
                    type="button"
                    onClick={() => handleScanBarcode(sample.barcode)}
                    className="px-2.5 py-1.5 rounded-xl bg-white/[0.06] hover:bg-amber-500/20 border border-white/[0.1] hover:border-amber-500/40 text-[11px] font-semibold text-zinc-200 flex items-center gap-1.5 transition active:scale-95"
                    title={`EAN: ${sample.barcode}`}
                  >
                    <span>{sample.icon}</span>
                    <span>{sample.name.split(' ')[0]} {sample.name.split(' ')[1]}</span>
                    <span className="font-mono text-amber-400 font-bold">${sample.price.toLocaleString('es-CL')}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Manual Barcode Input */}
            <div className="flex items-center gap-2 pt-1">
              <div className="relative flex-1">
                <Barcode className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="barcode-scanner-input"
                  type="text"
                  placeholder="Escanear o ingresar código EAN (ej. 7801620006785)..."
                  value={manualBarcodeInput}
                  onChange={(e) => setManualBarcodeInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (manualBarcodeInput.trim()) {
                        handleScanBarcode(manualBarcodeInput.trim());
                        setManualBarcodeInput('');
                      }
                    }
                  }}
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-black/40 border border-white/[0.1] text-xs font-mono text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  if (manualBarcodeInput.trim()) {
                    handleScanBarcode(manualBarcodeInput.trim());
                    setManualBarcodeInput('');
                  }
                }}
                className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-black text-xs transition"
              >
                Escanear
              </button>
            </div>

            {lastScannedName && (
              <div className="text-[11px] text-emerald-400 font-bold flex items-center gap-1 bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                <CheckCircle2 className="w-3 h-3" />
                ¡Escaneado con éxito: {lastScannedName}!
              </div>
            )}
          </div>

          {/* Product Quick-Picker */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-neutral-300">Seleccionar Productos:</span>
              <div className="relative w-48">
                <Search className="w-3.5 h-3.5 text-[#8C7E73] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar plato..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-xs text-white placeholder:text-neutral-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-48 overflow-y-auto p-1">
              {filteredProducts.map((prod) => (
                <button
                  key={prod.id}
                  type="button"
                  onClick={() => handleAddItem(prod)}
                  className="p-3 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-amber-500/40 text-left transition-all duration-200 active:scale-95 group"
                >
                  <p className="font-bold text-xs text-white truncate group-hover:text-amber-400">
                    {prod.name}
                  </p>
                  <p className="text-[11px] font-mono text-amber-400 font-bold mt-1">
                    {currencySymbol}{prod.price.toLocaleString('es-CL')}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Order Summary & Total */}
          {cartItems.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-white/[0.08]">
              <span className="text-xs font-bold text-neutral-300">Ítems Seleccionados:</span>
              <div className="space-y-1.5 max-h-32 overflow-y-auto">
                {cartItems.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-xs"
                  >
                    <span className="font-semibold text-white truncate max-w-[200px]">
                      {product.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-amber-400 font-bold">
                        {currencySymbol}{(product.price * quantity).toLocaleString('es-CL')}
                      </span>
                      <div className="flex items-center gap-1 bg-white/[0.08] rounded-lg p-0.5">
                        <button
                          type="button"
                          onClick={() => handleUpdateQty(product.id, -1)}
                          className="w-5 h-5 rounded flex items-center justify-center hover:bg-white/[0.15]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center font-bold font-mono">{quantity}</span>
                        <button
                          type="button"
                          onClick={() => handleUpdateQty(product.id, 1)}
                          className="w-5 h-5 rounded flex items-center justify-center hover:bg-white/[0.15]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer & Submit */}
          <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
            <div>
              <span className="text-xs text-[#A8988B] block">Total de la Orden:</span>
              <span className="text-xl font-black text-amber-400 font-mono">
                {currencySymbol}{calculateTotal().toLocaleString('es-CL')}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" type="button" onClick={onClose}>
                Cancelar
              </Button>
              <Button variant="primary" size="default" type="submit" disabled={cartItems.length === 0}>
                <span>Lanzar a Cocina</span>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
