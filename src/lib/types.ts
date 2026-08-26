export interface Category {
  id: string;
  tenantId: string;
  businessId: string;
  name: string;
  slug: string;
  description?: string | null;
  imageUrl?: string | null;
  position: number;
  isVisible: boolean;
}

export interface ProductVariant {
  id: string;
  name: string;
  priceDelta: number;
  isDefault?: boolean;
}

export interface ProductModifier {
  id: string;
  groupName: string;
  name: string;
  price: number;
  maxQuantity: number;
}

export interface Product {
  id: string;
  tenantId: string;
  businessId: string;
  categoryId: string;
  name: string;
  description?: string | null;
  price: number;
  compareAtPrice?: number | null;
  imageUrl?: string | null;
  sku?: string | null;
  position: number;
  isFeatured: boolean;
  isVisible: boolean;
  isAvailable: boolean;
  variants?: ProductVariant[];
  modifiers?: ProductModifier[];
}

export interface Business {
  id: string;
  tenantId: string;
  name: string;
  slug: string;
  description: string;
  logoUrl: string;
  bannerUrl: string;
  phone: string;
  address: string;
  currency: string;
  currencySymbol: string;
  primaryColor: string;
  whatsappOrders: boolean;
  isOpen: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string | null;
  selectedVariant?: ProductVariant;
  selectedModifiers?: { modifier: ProductModifier; quantity: number }[];
  itemTotal: number;
  notes?: string;
}
