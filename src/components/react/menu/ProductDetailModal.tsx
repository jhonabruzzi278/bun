import React, { useState } from 'react';
import type { Product, ProductVariant, CartItem } from '@/lib/types';
import { X, Plus, Minus } from 'lucide-react';
import { Input, Badge } from '@/components/ui';

interface ProductDetailModalProps {
  product: Product;
  currencySymbol: string;
  themeColor: string;
  onClose: () => void;
  onAddToCart: (itemData: Omit<CartItem, 'id'>) => void;
}

export default function ProductDetailModal({
  product,
  currencySymbol,
  themeColor,
  onClose,
  onAddToCart,
}: ProductDetailModalProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants && product.variants.length > 0
      ? product.variants.find((v) => v.isDefault) || product.variants[0]
      : null
  );
  const [selectedModifiers, setSelectedModifiers] = useState<Record<string, number>>({});
  const [quantity, setQuantity] = useState(1);
  const [itemNotes, setItemNotes] = useState('');

  const calculateTotalPrice = () => {
    let base = product.price;
    if (selectedVariant) base += selectedVariant.priceDelta;
    if (product.modifiers) {
      for (const mod of product.modifiers) {
        const qty = selectedModifiers[mod.id] || 0;
        base += mod.price * qty;
      }
    }
    return base * quantity;
  };

  const handleAdd = () => {
    const modDetails = (product.modifiers || [])
      .filter((m) => (selectedModifiers[m.id] || 0) > 0)
      .map((m) => ({ modifier: m, quantity: selectedModifiers[m.id] }));

    onAddToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      imageUrl: product.imageUrl,
      selectedVariant: selectedVariant || undefined,
      selectedModifiers: modDetails,
      itemTotal: calculateTotalPrice(),
      notes: itemNotes.trim() || undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-[#1C1C1E]/95 border border-white/[0.12] w-full max-w-lg rounded-t-[36px] sm:rounded-3xl max-h-[90vh] flex flex-col justify-between shadow-2xl overflow-hidden animate-slide-up text-white backdrop-blur-2xl">
        {/* Modal Image Header */}
        <div className="h-48 sm:h-56 w-full bg-black/40 relative shrink-0">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl">☕</div>
          )}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white/80 hover:text-white flex items-center justify-center hover:bg-black transition-all duration-200 border border-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <div>
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-xl font-black text-white tracking-tight">{product.name}</h3>
              {product.isFeatured && (
                <Badge variant="amber" dot>Destacado</Badge>
              )}
            </div>
            <p className="text-xs text-[#A8988B] mt-1.5 leading-relaxed">{product.description}</p>
            <span className="text-lg font-black mt-2.5 block font-mono text-amber-400">
              {currencySymbol}{product.price.toLocaleString('es-CL')}
            </span>
          </div>

          {/* Variants */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-neutral-300">Selecciona tu opción:</label>
              <div className="space-y-2">
                {product.variants.map((v) => (
                  <div
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border text-xs cursor-pointer transition-all duration-200 ${
                      selectedVariant?.id === v.id
                        ? 'bg-amber-500/15 border-amber-500/50 text-white font-bold shadow-sm'
                        : 'bg-white/[0.04] border-white/[0.08] text-neutral-300 hover:bg-white/[0.08]'
                    }`}
                  >
                    <span>{v.name}</span>
                    <span className="font-mono font-bold text-amber-400">
                      {v.priceDelta > 0
                        ? `+${currencySymbol}${v.priceDelta.toLocaleString('es-CL')}`
                        : v.priceDelta < 0
                        ? `-${currencySymbol}${Math.abs(v.priceDelta).toLocaleString('es-CL')}`
                        : 'Incluido'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Modifiers / Extras */}
          {product.modifiers && product.modifiers.length > 0 && (
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-neutral-300">¿Deseas agregar extras?</label>
              <div className="space-y-2">
                {product.modifiers.map((m) => {
                  const qty = selectedModifiers[m.id] || 0;
                  return (
                    <div
                      key={m.id}
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-xs"
                    >
                      <div>
                        <span className="font-semibold text-white block">{m.name}</span>
                        <span className="text-[11px] block font-mono text-amber-400 font-bold">
                          +{currencySymbol}{m.price.toLocaleString('es-CL')}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {qty > 0 && (
                          <>
                            <button
                              type="button"
                              onClick={() =>
                                setSelectedModifiers((prev) => ({
                                  ...prev,
                                  [m.id]: Math.max(0, qty - 1),
                                }))
                              }
                              className="w-7 h-7 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] flex items-center justify-center text-white transition active:scale-95"
                            >
                              -
                            </button>
                            <span className="font-bold text-white text-xs w-4 text-center">{qty}</span>
                          </>
                        )}
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedModifiers((prev) => ({
                              ...prev,
                              [m.id]: Math.min(m.maxQuantity, qty + 1),
                            }))
                          }
                          className="w-7 h-7 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold flex items-center justify-center shadow-sm hover:brightness-110 active:scale-95 transition"
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
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-300 block">Notas especiales</label>
            <Input
              type="text"
              placeholder="ej. Sin cebolla, salsa aparte, etc."
              value={itemNotes}
              onChange={(e) => setItemNotes(e.target.value)}
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-white/[0.08] bg-black/40 flex items-center gap-3 backdrop-blur-xl">
          <div className="flex items-center bg-white/[0.06] rounded-2xl border border-white/[0.08] p-1">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white hover:bg-white/[0.1] active:scale-90 transition"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center font-bold text-sm text-white font-mono">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white hover:bg-white/[0.1] active:scale-90 transition"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="flex-1 py-3.5 px-5 rounded-2xl text-black font-black text-xs sm:text-sm shadow-lg shadow-amber-500/25 flex items-center justify-between bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-105 active:scale-[0.98] transition-all duration-200"
          >
            <span>Agregar</span>
            <span className="font-mono">
              {currencySymbol}{calculateTotalPrice().toLocaleString('es-CL')}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
