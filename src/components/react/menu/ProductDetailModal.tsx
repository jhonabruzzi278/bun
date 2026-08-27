import React, { useState } from 'react';
import type { Product, ProductVariant, CartItem } from '@/lib/types';
import { X, Plus, Minus } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-[#241512] border border-[#3D2420] w-full max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[90vh] flex flex-col justify-between shadow-2xl overflow-hidden animate-slide-up">
        {/* Modal Image Header */}
        <div className="h-44 sm:h-52 w-full bg-[#180E0C] relative shrink-0">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl">☕</div>
          )}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/70 backdrop-blur text-white flex items-center justify-center hover:bg-black transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          <div>
            <h3 className="text-lg font-black text-white">{product.name}</h3>
            <p className="text-xs text-[#A8988B] mt-1">{product.description}</p>
            <span className="text-base font-extrabold mt-2 block font-mono" style={{ color: themeColor }}>
              {currencySymbol}{product.price.toLocaleString('es-CL')}
            </span>
          </div>

          {/* Variants */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-white">Selecciona tu opción:</label>
              <div className="space-y-1.5">
                {product.variants.map((v) => (
                  <label
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition ${
                      selectedVariant?.id === v.id
                        ? 'bg-white/10 text-white font-bold'
                        : 'bg-[#180E0C] border-[#3D2420] text-[#D4C5B9]'
                    }`}
                    style={{
                      borderColor: selectedVariant?.id === v.id ? themeColor : undefined,
                    }}
                  >
                    <span>{v.name}</span>
                    <span className="font-mono font-bold" style={{ color: themeColor }}>
                      {v.priceDelta > 0
                        ? `+${currencySymbol}${v.priceDelta.toLocaleString('es-CL')}`
                        : v.priceDelta < 0
                        ? `-${currencySymbol}${Math.abs(v.priceDelta).toLocaleString('es-CL')}`
                        : 'Incluido'}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Modifiers / Extras */}
          {product.modifiers && product.modifiers.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-white">¿Deseas agregar extras?</label>
              <div className="space-y-1.5">
                {product.modifiers.map((m) => {
                  const qty = selectedModifiers[m.id] || 0;
                  return (
                    <div
                      key={m.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-[#180E0C] border border-[#3D2420] text-xs"
                    >
                      <div>
                        <span className="font-semibold text-white">{m.name}</span>
                        <span className="text-[11px] block font-mono" style={{ color: themeColor }}>
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
                              className="w-6 h-6 rounded-lg bg-[#2F1B17] flex items-center justify-center text-white"
                            >
                              -
                            </button>
                            <span className="font-bold text-white text-xs">{qty}</span>
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
                          className="w-6 h-6 rounded-lg text-white flex items-center justify-center font-bold shadow-sm"
                          style={{ backgroundColor: themeColor }}
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
            <label className="text-xs font-bold text-white block mb-1">Notas especiales</label>
            <input
              type="text"
              placeholder="ej. Sin cebolla, salsa aparte, etc."
              value={itemNotes}
              onChange={(e) => setItemNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#180E0C] border border-[#3D2420] text-xs text-white placeholder-[#70645A]"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#3D2420] bg-[#180E0C] flex items-center gap-3">
          <div className="flex items-center bg-[#241512] rounded-xl border border-[#3D2420] p-1">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white hover:bg-[#2F1B17]"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center font-bold text-sm text-white">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white hover:bg-[#2F1B17]"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="flex-1 py-3 px-4 rounded-xl text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-between"
            style={{ backgroundColor: themeColor }}
          >
            <span>Agregar</span>
            <span>
              {currencySymbol}{calculateTotalPrice().toLocaleString('es-CL')}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
