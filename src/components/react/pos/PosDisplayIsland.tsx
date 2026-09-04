import React, { useState, useEffect } from 'react';
import { useCatalogStore } from '@/lib/useCatalogStore';
import type { Product } from '@/lib/types';

import { Printer, X, Check, Volume2 } from 'lucide-react';
import { playPrintAndCutSound } from '@/lib/thermalPrinterSimulator';
import PosHeaderTabs, { type ServiceTab } from './PosHeaderTabs';
import PosFilterBar, { type FilterStatus } from './PosFilterBar';
import PosOrderCard, { type PosOrder } from './PosOrderCard';
import PosNewOrderModal from './PosNewOrderModal';

function mapDbOrderToPosOrder(dbO: any): PosOrder {
  let mappedType: 'TAKEAWAY' | 'DINE_IN' | 'DELIVERY' | 'TABLE' = 'TAKEAWAY';
  const oType = (dbO.orderType || '').toLowerCase();
  if (oType === 'delivery') mappedType = 'DELIVERY';
  else if (oType === 'dine_in' || dbO.tableNumber) mappedType = 'TABLE';
  else if (oType === 'takeaway') mappedType = 'TAKEAWAY';

  let rawItems: any[] = [];
  if (typeof dbO.items === 'string') {
    try { rawItems = JSON.parse(dbO.items); } catch {}
  } else if (Array.isArray(dbO.items)) {
    rawItems = dbO.items;
  }

  const formattedItems = rawItems.map((it: any) => ({
    product: it.product || {
      id: it.productId || 'p_unknown',
      name: it.name || it.productName || 'Producto',
      price: it.price || 0,
    },
    quantity: Number(it.quantity) || 1,
    notes: it.notes,
  }));

  const timeStr = dbO.createdAt
    ? new Date(dbO.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '12:00';

  let posStatus: PosOrder['status'] = 'PENDING';
  const st = (dbO.status || '').toUpperCase();
  if (st === 'PREPARING' || st === 'IN_PROGRESS') posStatus = 'IN_PROGRESS';
  else if (st === 'READY') posStatus = 'READY';
  else if (st === 'DELIVERED' || st === 'COMPLETED') posStatus = 'COMPLETED';

  return {
    id: dbO.id,
    orderNumber: `#${dbO.orderNumber || '000'}`,
    type: mappedType,
    tableNumber: dbO.tableNumber ? Number(dbO.tableNumber) : undefined,
    status: posStatus,
    channel: (dbO.notes || '').includes('POS') ? 'POS' : 'WEB',
    customerName: dbO.customerName || 'Cliente Mostrador',
    customerPhone: dbO.customerPhone || '',
    items: formattedItems,
    total: Number(dbO.total) || 0,
    createdAt: timeStr,
  };
}

export default function PosDisplayIsland() {
  const { business, products, isLoaded } = useCatalogStore();

  const [activeTab, setActiveTab] = useState<ServiceTab>('COUNTER');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('ALL');
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [printingOrder, setPrintingOrder] = useState<PosOrder | null>(null);
  const [printProfile, setPrintProfile] = useState<'KITCHEN' | 'BAR' | 'CUSTOMER'>('CUSTOMER');

  // Active Orders State
  const [orders, setOrders] = useState<PosOrder[]>([]);

  useEffect(() => {
    // 1. Initial fetch of real orders from DB
    fetch('/api/orders')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setOrders(json.data.map(mapDbOrderToPosOrder));
        }
      })
      .catch((err) => console.warn('Error cargando pedidos en POS:', err));

    // 2. Realtime SSE connection
    let eventSource: EventSource | null = null;
    try {
      eventSource = new EventSource('/api/realtime/events');
      eventSource.addEventListener('order:new', (e) => {
        try {
          const newOrder = JSON.parse(e.data);
          if (newOrder?.id) {
            const mapped = mapDbOrderToPosOrder(newOrder);
            setOrders((prev) => [mapped, ...prev.filter((o) => o.id !== mapped.id)]);
          }
        } catch (err) {
          console.warn('Error SSE order:new en POS:', err);
        }
      });
    } catch (sseErr) {
      console.warn('SSE no disponible en POS:', sseErr);
    }

    // 3. Fallback Polling every 6s
    const pollInterval = setInterval(() => {
      fetch('/api/orders')
        .then((res) => res.json())
        .then((json) => {
          if (json.success && Array.isArray(json.data) && json.data.length > 0) {
            setOrders(json.data.map(mapDbOrderToPosOrder));
          }
        })
        .catch(() => {});
    }, 6000);

    return () => {
      if (eventSource) eventSource.close();
      clearInterval(pollInterval);
    };
  }, []);

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
    const orderNum = orders.length + 101;
    const orderId = `ord_${Date.now()}`;
    const ticketId = `kt_${Date.now()}`;

    const newOrder: PosOrder = {
      id: orderId,
      orderNumber: `#${orderNum}`,
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

    // 1. Sync to Turso via API
    try {
      fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: orderId,
          orderNumber: orderNum,
          customerName: payload.customerName,
          customerPhone: payload.customerPhone || '',
          orderType: payload.serviceType === 'DELIVERY' ? 'delivery' : payload.serviceType === 'TABLE' ? 'dine_in' : 'takeaway',
          tableNumber: payload.tableNumber ? String(payload.tableNumber) : null,
          total: orderTotal,
          items: payload.cartItems,
          notes: 'Ingresado por Punto de Venta (POS)',
        }),
      }).catch((e) => console.warn('POS order sync warning:', e));
    } catch (e) {}

    // 2. Sync to Kitchen KDS board
    try {
      const storedTickets = localStorage.getItem('bun_kitchen_tickets_state');
      const tickets = storedTickets ? JSON.parse(storedTickets) : [];
      const kitchenItems = payload.cartItems.map((item, idx) => ({
        id: `ki_${Date.now()}_${idx}`,
        ticketId,
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        stationCode: 'GRILL',
        status: 'PENDING' as const,
      }));

      const newTicket = {
        id: ticketId,
        tenantId: business.tenantId || 'tenant_001',
        businessId: business.id || 'biz_001',
        ticketNumber: orderNum,
        orderType: (payload.serviceType === 'DELIVERY' ? 'delivery' : payload.serviceType === 'TABLE' ? 'dine_in' : 'takeaway') as any,
        tableNumber: payload.tableNumber ? `Mesa ${payload.tableNumber}` : undefined,
        customerName: payload.customerName,
        status: 'PENDING' as const,
        targetMinutes: 15,
        notes: 'Comanda ingresada en POS Mostrador',
        items: kitchenItems,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      localStorage.setItem('bun_kitchen_tickets_state', JSON.stringify([newTicket, ...tickets]));
      window.dispatchEvent(new Event('bun:kitchen_updated'));
    } catch (e) {}

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
              onPrintOrder={(ord) => {
                setPrintingOrder(ord);
                playPrintAndCutSound();
              }}
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

      {/* 5. Thermal Receipt Simulation & Print Modal */}
      {printingOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#241512] w-full max-w-md rounded-3xl p-6 shadow-2xl border border-[#EAE1D6] dark:border-[#3D2420] flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between pb-3 border-b border-[#FAF7F2] dark:border-[#180E0C]">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-600">
                  <Printer className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-coffee-950 dark:text-white text-base">Impresión Comanda Térmica</h3>
                  <p className="text-xs text-[#8C7E73] dark:text-[#A8988B]">Simulador ESC/POS (80mm / 58mm)</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPrintingOrder(null)}
                className="p-1.5 rounded-full hover:bg-[#FAF7F2] dark:hover:bg-[#180E0C] text-[#8C7E73] dark:text-[#A8988B]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Selector */}
            <div className="grid grid-cols-3 gap-2 py-3">
              {(['CUSTOMER', 'KITCHEN', 'BAR'] as const).map((prof) => (
                <button
                  key={prof}
                  type="button"
                  onClick={() => {
                    setPrintProfile(prof);
                    playPrintAndCutSound();
                  }}
                  className={`py-1.5 px-2 text-xs font-bold rounded-xl border transition ${
                    printProfile === prof
                      ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400'
                      : 'border-[#EAE1D6] dark:border-[#3D2420] text-[#70645A] dark:text-[#A8988B]'
                  }`}
                >
                  {prof === 'CUSTOMER' ? 'Pre-cuenta' : prof === 'KITCHEN' ? 'Cocina 80mm' : 'Bar 58mm'}
                </button>
              ))}
            </div>

            {/* Realistic Thermal Receipt Paper */}
            <div className="flex-1 overflow-y-auto my-2 p-4 bg-[#FBF9F5] dark:bg-[#150F0D] rounded-xl border border-dashed border-[#DDD2C4] dark:border-[#422923] font-mono text-[11px] leading-relaxed text-[#2C211D] dark:text-[#EAE1D6]">
              <div className="text-center font-bold pb-2 border-b border-dashed border-[#DDD2C4] dark:border-[#422923]">
                <p className="text-sm font-black tracking-wider">brew.cl Gastronomía</p>
                <p className="text-[10px] text-[#70645A] dark:text-[#A8988B]">Av. Providencia 1240, Santiago</p>
                <p className="text-[10px] text-[#70645A] dark:text-[#A8988B]">ORDEN {printingOrder.orderNumber}</p>
                <p className="text-[10px]">{printingOrder.createdAt} | {printingOrder.type === 'TABLE' ? `MESA ${printingOrder.tableNumber}` : printingOrder.type}</p>
                <p className="text-[10px]">Cliente: {printingOrder.customerName}</p>
              </div>

              <div className="py-2 space-y-1">
                {printingOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start">
                    <span>{item.quantity}x {item.product.name}</span>
                    <span className="font-bold">
                      {business.currencySymbol || '$'}{(item.product.price * item.quantity).toLocaleString('es-CL')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-dashed border-[#DDD2C4] dark:border-[#422923] space-y-1">
                <div className="flex justify-between font-bold">
                  <span>SUBTOTAL:</span>
                  <span>{business.currencySymbol || '$'}{printingOrder.total.toLocaleString('es-CL')}</span>
                </div>
                {printProfile === 'CUSTOMER' && (
                  <>
                    <div className="flex justify-between text-[10px] text-[#70645A] dark:text-[#A8988B]">
                      <span>PROPINA SUGERIDA (10%):</span>
                      <span>{business.currencySymbol || '$'}{Math.round(printingOrder.total * 0.1).toLocaleString('es-CL')}</span>
                    </div>
                    <div className="flex justify-between font-black text-xs pt-1 border-t border-dotted border-[#DDD2C4] dark:border-[#422923]">
                      <span>TOTAL C/ PROPINA:</span>
                      <span>{business.currencySymbol || '$'}{Math.round(printingOrder.total * 1.1).toLocaleString('es-CL')}</span>
                    </div>
                  </>
                )}
              </div>

              <div className="pt-3 text-center text-[9px] text-[#8C7E73] dark:text-[#A8988B] border-t border-dashed border-[#DDD2C4] dark:border-[#422923] mt-2">
                <p>¡Gracias por su visita!</p>
                <p>www.brew.cl — Sistema POS & KDS</p>
                <p className="tracking-widest mt-1">*** CORTE DE PAPEL ***</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-3">
              <button
                type="button"
                onClick={() => playPrintAndCutSound()}
                className="flex-1 py-2 rounded-xl border border-[#EAE1D6] dark:border-[#3D2420] text-[#70645A] dark:text-[#A8988B] text-xs font-bold hover:bg-[#FAF7F2] dark:hover:bg-[#180E0C] flex items-center justify-center gap-1.5 transition"
              >
                <Volume2 className="w-4 h-4" />
                <span>Simular Sonido</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playPrintAndCutSound();
                  window.print();
                }}
                className="flex-1 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow transition flex items-center justify-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimir Ticket</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
