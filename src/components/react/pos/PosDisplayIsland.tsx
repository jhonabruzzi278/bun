import React, { useState } from 'react';
import { useCatalogStore } from '@/lib/useCatalogStore';
import type { Product } from '@/lib/types';

import PosHeaderTabs, { type ServiceTab } from './PosHeaderTabs';
import PosFilterBar, { type FilterStatus } from './PosFilterBar';
import PosOrderCard, { type PosOrder } from './PosOrderCard';
import PosNewOrderModal from './PosNewOrderModal';

export default function PosDisplayIsland() {
  const { business, products, isLoaded } = useCatalogStore();

  const [activeTab, setActiveTab] = useState<ServiceTab>('COUNTER');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('ALL');
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);

  // Active Orders State
  const [orders, setOrders] = useState<PosOrder[]>([
    {
      id: 'ord_1',
      orderNumber: '#101',
      type: 'TAKEAWAY',
      status: 'PENDING',
      channel: 'POS',
      customerName: 'Jonathan Guerra',
      customerPhone: '+56 938980598',
      items: [{ product: products[0] || ({ name: 'Double Bacon Smash', price: 7990 } as any), quantity: 1 }],
      total: 7990,
      createdAt: '14:45',
    },
    {
      id: 'ord_2',
      orderNumber: '#102',
      type: 'TABLE',
      tableNumber: 3,
      status: 'IN_PROGRESS',
      channel: 'POS',
      customerName: 'Mesa #3 (Camila Fernandez)',
      items: [
        { product: products[0] || ({ name: 'Double Bacon Smash', price: 7990 } as any), quantity: 1 },
        { product: products[8] || ({ name: 'Papas Rústicas Cheddar', price: 4490 } as any), quantity: 1 }
      ],
      total: 12480,
      createdAt: '14:40',
    },
    {
      id: 'ord_3',
      orderNumber: '#103',
      type: 'DELIVERY',
      status: 'PENDING',
      channel: 'WEB',
      customerName: 'Mateo Silva',
      customerPhone: '+56 977112233',
      items: [{ product: products[5] || ({ name: 'Pizza Pepperoni Rústica', price: 13990 } as any), quantity: 1 }],
      total: 15990,
      createdAt: '14:35',
    }
  ]);

  if (!isLoaded) {
    return <div className="text-[#8C7E73] dark:text-[#A8988B] text-sm p-4">Cargando Punto de Venta...</div>;
  }

  const counterCount = orders.filter((o) => o.type === 'TAKEAWAY' || o.type === 'DINE_IN').length;
  const deliveryCount = orders.filter((o) => o.type === 'DELIVERY').length;
  const tablesCount = orders.filter((o) => o.type === 'TABLE').length;
  const totalSalesToday = orders.reduce((sum, o) => sum + o.total, 0);

  const handleAdvanceStatus = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        if (o.status === 'PENDING') return { ...o, status: 'IN_PROGRESS' };
        if (o.status === 'IN_PROGRESS') return { ...o, status: 'READY' };
        return { ...o, status: 'COMPLETED' };
      })
    );
  };

  const handleCreateOrder = (payload: {
    serviceType: 'TAKEAWAY' | 'DINE_IN' | 'DELIVERY' | 'TABLE';
    tableNumber?: number;
    customerName: string;
    customerPhone?: string;
    cartItems: { product: Product; quantity: number }[];
  }) => {
    const orderTotal = payload.cartItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

    const newOrder: PosOrder = {
      id: `ord_${Date.now()}`,
      orderNumber: `#${orders.length + 101}`,
      type: payload.serviceType,
      tableNumber: payload.tableNumber,
      status: 'PENDING',
      channel: 'POS',
      customerName: payload.customerName,
      customerPhone: payload.customerPhone,
      items: [...payload.cartItems],
      total: orderTotal,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setOrders((prev) => [newOrder, ...prev]);
    setShowNewOrderModal(false);
  };

  const filteredOrders = orders.filter((order) => {
    if (activeTab === 'COUNTER' && !(order.type === 'TAKEAWAY' || order.type === 'DINE_IN')) return false;
    if (activeTab === 'DELIVERY' && order.type !== 'DELIVERY') return false;
    if (activeTab === 'TABLES' && order.type !== 'TABLE') return false;

    if (filterStatus === 'PENDING' && order.status !== 'PENDING') return false;
    if (filterStatus === 'IN_PROGRESS' && order.status !== 'IN_PROGRESS') return false;
    if (filterStatus === 'POS_WEB' && order.channel === 'APPS') return false;
    if (filterStatus === 'APPS' && order.channel !== 'APPS') return false;

    return true;
  });

  return (
    <div className="space-y-5 max-w-6xl mx-auto pb-12">
      {/* 1. Header with Service Tabs and Cash Register Status */}
      <PosHeaderTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        counterCount={counterCount}
        deliveryCount={deliveryCount}
        tablesCount={tablesCount}
        totalSalesToday={totalSalesToday}
        currencySymbol={business.currencySymbol || '$'}
        onOpenNewOrder={() => setShowNewOrderModal(true)}
      />

      {/* 2. Status Filters */}
      <PosFilterBar
        filterStatus={filterStatus}
        onFilterChange={setFilterStatus}
      />

      {/* 3. Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOrders.length === 0 ? (
          <div className="col-span-full py-16 text-center text-[#8C7E73] dark:text-[#A8988B] bg-white dark:bg-[#241512] rounded-3xl border border-dashed border-[#EAE1D6] dark:border-[#3D2420] space-y-2">
            <span className="text-3xl">☕</span>
            <p className="text-sm font-semibold">No hay órdenes en esta sección actualmente.</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <PosOrderCard
              key={order.id}
              order={order}
              currencySymbol={business.currencySymbol || '$'}
              onAdvanceStatus={handleAdvanceStatus}
            />
          ))
        )}
      </div>

      {/* 4. New Order Modal */}
      <PosNewOrderModal
        isOpen={showNewOrderModal}
        onClose={() => setShowNewOrderModal(false)}
        products={products}
        currencySymbol={business.currencySymbol || '$'}
        onCreateOrder={handleCreateOrder}
      />
    </div>
  );
}
