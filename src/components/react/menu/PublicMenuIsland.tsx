import React, { useState, useEffect } from 'react';
import { useCatalogStore } from '@/lib/useCatalogStore';
import type { Product, CartItem } from '@/lib/types';
import { openWhatsAppOrder } from '@/lib/whatsappOrderBuilder';

import MenuTopBar from './MenuTopBar';
import MenuHeroHeader from './MenuHeroHeader';
import MenuCategoryTabs from './MenuCategoryTabs';
import MenuProductCard from './MenuProductCard';
import ProductDetailModal from './ProductDetailModal';
import CartFloatingBar from './CartFloatingBar';
import CartCheckoutDrawer from './CartCheckoutDrawer';

export default function PublicMenuIsland() {
  const { business, categories, products, isLoaded } = useCatalogStore();

  // State Management
  const [themeColor, setThemeColor] = useState<string>(business.primaryColor || '#774C3B');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);

  // Cart & Customer State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('+56 938980598');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Efectivo al recibir');
  const [tableNumber, setTableNumber] = useState<string>('');
  const [orderType, setOrderType] = useState<'delivery' | 'takeaway' | 'dine_in'>('delivery');
  const [isReadOnly, setIsReadOnly] = useState(false);

  // Query parameter synchronization (QR Code support ?mesa=4, ?type=read)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const mesa = params.get('mesa') || params.get('table');
      const tipo = params.get('tipo');
      const typeParam = params.get('type');
      const colorParam = params.get('color');

      if (colorParam) {
        setThemeColor(colorParam.startsWith('#') ? colorParam : `#${colorParam}`);
      }
      if (typeParam === 'read') {
        setIsReadOnly(true);
      }
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
      <div className="min-h-screen bg-[#1F1412] flex items-center justify-center p-4">
        <div className="animate-spin text-3xl">☕</div>
      </div>
    );
  }

  // Filtered Products
  const featuredProducts = products.filter((p) => p.isFeatured && p.isVisible);
  const displayedProducts = products.filter((p) => {
    if (!p.isVisible) return false;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
    if (!matchesSearch) return false;
    if (selectedCategory === 'ALL') return true;
    if (selectedCategory === 'FEATURED') return p.isFeatured;
    return p.categoryId === selectedCategory;
  });

  // Cart Calculations
  const cartTotal = cart.reduce((acc, item) => acc + item.itemTotal, 0);
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Handlers
  const handleAddToCart = (itemData: Omit<CartItem, 'id'>) => {
    const newItem: CartItem = {
      ...itemData,
      id: `cart_${Date.now()}_${Math.random()}`,
    };
    setCart((prev) => [...prev, newItem]);
    setActiveProductModal(null);
  };

  const handleRemoveCartItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSendWhatsApp = () => {
    if (!customerName.trim()) {
      alert('Por favor escribe tu nombre para registrar la comanda');
      return;
    }

    openWhatsAppOrder({
      business,
      cart,
      cartTotal,
      customerName,
      customerPhone,
      customerAddress,
      tableNumber,
      orderType,
      paymentMethod,
    });
  };

  return (
    <div className="min-h-screen bg-[#180E0C] text-[#F5EFE8] font-sans pb-32">
      {/* 1. Top Bar with Table Indicator & Client Theme Color Picker */}
      <MenuTopBar
        tableNumber={tableNumber}
        themeColor={themeColor}
        onColorChange={setThemeColor}
      />

      {/* 2. Restaurant Cover Banner & Identity Header */}
      <MenuHeroHeader
        business={business}
        themeColor={themeColor}
      />

      {/* 3. Main Catalog Section */}
      <div className="max-w-3xl mx-auto px-4 mt-6 space-y-6">
        {/* Search Bar and Category Tabs */}
        <MenuCategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          hasFeaturedProducts={featuredProducts.length > 0}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          themeColor={themeColor}
        />

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {displayedProducts.map((product) => (
            <MenuProductCard
              key={product.id}
              product={product}
              currencySymbol={business.currencySymbol || '$'}
              themeColor={themeColor}
              isReadOnly={isReadOnly}
              onSelect={setActiveProductModal}
            />
          ))}
        </div>

        {/* Empty Search State */}
        {displayedProducts.length === 0 && (
          <div className="text-center py-16 bg-[#241512]/50 rounded-3xl border border-dashed border-[#3D2420]">
            <span className="text-4xl">🔍</span>
            <h3 className="text-sm font-bold text-white mt-3">No se encontraron productos</h3>
            <p className="text-xs text-[#8C7E73] mt-1">Prueba con otra palabra clave o selecciona otra categoría.</p>
          </div>
        )}
      </div>

      {/* 4. Product Customization Modal */}
      {activeProductModal && (
        <ProductDetailModal
          product={activeProductModal}
          currencySymbol={business.currencySymbol || '$'}
          themeColor={themeColor}
          onClose={() => setActiveProductModal(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* 5. Sticky Floating Cart Summary Button */}
      <CartFloatingBar
        totalItemsCount={totalItemsCount}
        cartTotal={cartTotal}
        currencySymbol={business.currencySymbol || '$'}
        themeColor={themeColor}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* 6. Slide-out Checkout & WhatsApp Order Drawer */}
      <CartCheckoutDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        cartTotal={cartTotal}
        business={business}
        themeColor={themeColor}
        customerName={customerName}
        setCustomerName={setCustomerName}
        customerPhone={customerPhone}
        setCustomerPhone={setCustomerPhone}
        customerAddress={customerAddress}
        setCustomerAddress={setCustomerAddress}
        tableNumber={tableNumber}
        setTableNumber={setTableNumber}
        orderType={orderType}
        setOrderType={setOrderType}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        onRemoveItem={handleRemoveCartItem}
        onSubmitWhatsApp={handleSendWhatsApp}
      />
    </div>
  );
}
