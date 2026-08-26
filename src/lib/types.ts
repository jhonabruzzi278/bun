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

export type KitchenStatus = 'PENDING' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED';

export interface PrepStation {
  id: string;
  name: string;
  code: string;
  color: string;
  isActive: boolean;
}

export interface KitchenTicketItem {
  id: string;
  ticketId: string;
  productId?: string;
  productName: string;
  quantity: number;
  variantName?: string;
  modifiers?: string[]; // Extras agregados
  notes?: string;
  stationCode?: string; // 'GRILL', 'FRY', 'BAR'
  status: 'PENDING' | 'PREPARING' | 'READY' | 'CANCELLED';
}

export interface PrepEvent {
  id: string;
  ticketId: string;
  eventType: 'CREATED' | 'STARTED' | 'READY' | 'DELIVERED' | 'CANCELLED' | 'RESENT';
  timestamp: string;
  actorName: string;
  metadata?: string;
}

export interface KitchenTicket {
  id: string;
  tenantId: string;
  businessId: string;
  orderId?: string;
  stationId?: string;
  ticketNumber: number;
  orderType: 'delivery' | 'takeaway' | 'dine_in';
  tableNumber?: string;
  customerName: string;
  status: KitchenStatus;
  notes?: string;
  targetMinutes: number;
  items: KitchenTicketItem[];
  prepStartedAt?: string;
  readyAt?: string;
  deliveredAt?: string;
  cancelledAt?: string;
  cancellationReason?: string;
  createdAt: string;
  updatedAt: string;
}

