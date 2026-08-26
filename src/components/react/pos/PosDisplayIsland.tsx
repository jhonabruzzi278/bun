import React, { useState } from 'react';
import { useCatalogStore } from '@/lib/useCatalogStore';
import {
  ShoppingBag,
  Truck,
  Armchair,
  Sliders,
  RefreshCw,
  Search,
  Pause,
  Plus,
  Filter,
  CheckCircle2,
  Clock,
  User,
  Phone,
  Eye,
  EyeOff,
  ChevronDown,
  X,
  Store,
  DollarSign,
  Receipt,
  Layers,
  Utensils
} from 'lucide-react';
import type { Product } from '@/lib/types';

type ServiceTab = 'COUNTER' | 'DELIVERY' | 'TABLES';
type FilterStatus = 'ALL' | 'PENDING' | 'IN_PROGRESS' | 'POS_WEB' | 'APPS';

interface PosOrder {
  id: string;
  orderNumber: string;
  type: 'TAKEAWAY' | 'DINE_IN' | 'DELIVERY' | 'TABLE';
  tableNumber?: number;
  status: 'PENDING' | 'IN_PROGRESS' | 'READY' | 'COMPLETED';
  channel: 'POS' | 'WEB' | 'APPS';
  customerName: string;
  customerPhone?: string;
  items: { product: Product; quantity: number; notes?: string }[];
  total: number;
  createdAt: string;
}

export default function PosDisplayIsland() {
  const { business, products, categories, isLoaded } = useCatalogStore();

  // Navigation tabs
  const [activeTab, setActiveTab] = useState<ServiceTab>('COUNTER');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('ALL');

  // Options Modal State (Screenshot 2: Ver opciones)
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [mergeTabs, setMergeTabs] = useState(false); // Fusionar pestañas (Mostrador + A domicilio)
  const [hideTablesTab, setHideTablesTab] = useState(false); // Ocultar pestañas de Mesas

  // New Order Modal State
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [selectedServiceType, setSelectedServiceType] = useState<'TAKEAWAY' | 'DINE_IN' | 'DELIVERY' | 'TABLE'>('TAKEAWAY');
  const [selectedTable, setSelectedTable] = useState<number>(1);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [cartItems, setCartItems] = useState<{ product: Product; quantity: number }[]>([]);
  const [orderCreatedToast, setOrderCreatedToast] = useState(false);

  // Mock Active Orders
  const [orders, setOrders] = useState<PosOrder[]>([]);

  if (!isLoaded) return <div className="text-slate-400 text-sm">Cargando Punto de Venta...</div>;

  const counterOrdersCount = orders.filter((o) => o.type === 'TAKEAWAY' || o.type === 'DINE_IN').length;
  const deliveryOrdersCount = orders.filter((o) => o.type === 'DELIVERY').length;
  const tableOrdersCount = orders.filter((o) => o.type === 'TABLE').length;

  const totalSalesToday = orders.reduce((sum, o) => sum + o.total, 0);

  const handleAddToCart = (product: Product) => {
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

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert('Agrega al menos un producto al pedido');
      return;
    }

    const orderTotal = cartItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

    const newOrder: PosOrder = {
      id: `ord_${Date.now()}`,
      orderNumber: `#${orders.length + 101}`,
      type: selectedServiceType,
      tableNumber: selectedServiceType === 'TABLE' ? selectedTable : undefined,
      status: 'PENDING',
      channel: 'POS',
      customerName: customerName || (selectedServiceType === 'TABLE' ? `Mesa ${selectedTable}` : 'Cliente Mostrador'),
      customerPhone: customerPhone,
      items: [...cartItems],
      total: orderTotal,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setOrders((prev) => [newOrder, ...prev]);
    setShowNewOrderModal(false);
    setCartItems([]);
    setCustomerName('');
    setCustomerPhone('');
    setOrderCreatedToast(true);
    setTimeout(() => setOrderCreatedToast(false), 3000);
  };

  const filteredOrders = orders.filter((order) => {
    // Tab filtering
    if (!mergeTabs) {
      if (activeTab === 'COUNTER' && !(order.type === 'TAKEAWAY' || order.type === 'DINE_IN')) return false;
      if (activeTab === 'DELIVERY' && order.type !== 'DELIVERY') return false;
      if (activeTab === 'TABLES' && order.type !== 'TABLE') return false;
    }

    // Status filtering
    if (filterStatus === 'PENDING' && order.status !== 'PENDING') return false;
    if (filterStatus === 'IN_PROGRESS' && order.status !== 'IN_PROGRESS') return false;
    if (filterStatus === 'POS_WEB' && order.channel === 'APPS') return false;
    if (filterStatus === 'APPS' && order.channel !== 'APPS') return false;

    return true;
  });

  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
      {/* TOP HEADER BAR (Exact OlaClick Replica - Screenshot 1) */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Tab Switchers */}
        <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-2xl border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('COUNTER')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
              activeTab === 'COUNTER'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Store className="w-4 h-4" />
            <span>Mostrador</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
              activeTab === 'COUNTER' ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
            }`}>
              {counterOrdersCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('DELIVERY')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
              activeTab === 'DELIVERY'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>A domicilio</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
              activeTab === 'DELIVERY' ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
            }`}>
              {deliveryOrdersCount}
            </span>
          </button>

          {!hideTablesTab && (
            <button
              type="button"
              onClick={() => setActiveTab('TABLES')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                activeTab === 'TABLES'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Armchair className="w-4 h-4" />
              <span>Mesas</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                activeTab === 'TABLES' ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                {tableOrdersCount}
              </span>
            </button>
          )}

          {/* Options button (slider icon) */}
          <button
            type="button"
            onClick={() => setShowOptionsModal(true)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Ver opciones de visualización"
          >
            <Sliders className="w-4 h-4" />
          </button>
        </div>

        {/* Right Actions: Cashier indicator, refresh, search, pause, + Nuevo pedido */}
        <div className="flex items-center gap-2">
          {/* Caja abierta indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Caja abierta</span>
          </div>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition"
            title="Actualizar"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            type="button"
            className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition"
            title="Buscar pedido"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            type="button"
            className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition"
            title="Pausar recepción"
          >
            <Pause className="w-4 h-4" />
          </button>

          {/* Primary Action Button: + Nuevo pedido */}
          <button
            type="button"
            onClick={() => setShowNewOrderModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold shadow-lg shadow-blue-600/30 transition"
          >
            <Plus className="w-4 h-4" />
            <span>+ Nuevo pedido</span>
          </button>
        </div>
      </div>

      {/* FILTER & STATS BAR */}
      <div className="bg-slate-950 px-4 py-2 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <button
            type="button"
            onClick={() => setFilterStatus('ALL')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition ${
              filterStatus === 'ALL'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            ✓ Todo
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus('PENDING')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition ${
              filterStatus === 'PENDING'
                ? 'bg-amber-500 text-slate-950'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            Pendiente <span className="ml-1 px-1 rounded bg-amber-500/20 text-[10px]">0</span>
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus('IN_PROGRESS')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition ${
              filterStatus === 'IN_PROGRESS'
                ? 'bg-emerald-500 text-slate-950'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            En curso <span className="ml-1 px-1 rounded bg-emerald-500/20 text-[10px]">0</span>
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus('POS_WEB')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition ${
              filterStatus === 'POS_WEB'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            PDV / WEB
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus('APPS')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition ${
              filterStatus === 'APPS'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            Aplicaciones
          </button>
        </div>

        <div className="flex items-center gap-2 text-slate-300 font-bold">
          <span>Total: <span className="text-white font-mono text-sm">{business.currencySymbol}{totalSalesToday.toLocaleString()}</span></span>
          <Eye className="w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* TABLE HEADER (FECHA, ESTADO, TOTAL, CLIENTE) */}
      <div className="grid grid-cols-4 px-6 py-2 bg-slate-900/40 text-[10px] uppercase font-black tracking-wider text-slate-400 border-b border-slate-800">
        <div>FECHA</div>
        <div>ESTADO</div>
        <div>TOTAL</div>
        <div>CLIENTE</div>
      </div>

      {orderCreatedToast && (
        <div className="m-4 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-fade-in shadow-lg">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>¡Pedido ingresado y enviado a la cocina con éxito!</span>
        </div>
      )}

      {/* ORDERS LIST OR EMPTY STATE (Exact Replica of Screenshot 1) */}
      <div className="flex-1 flex flex-col justify-center items-center p-8">
        {filteredOrders.length === 0 ? (
          <div className="text-center space-y-6 max-w-sm mx-auto animate-fade-in">
            <div className="w-16 h-16 rounded-3xl bg-blue-500/10 text-blue-400 flex items-center justify-center mx-auto text-3xl">
              <Utensils className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-black text-white tracking-tight">Crea un pedido</h3>
              <p className="text-xs text-slate-400">Elige el tipo de servicio para empezar</p>
            </div>

            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedServiceType('TAKEAWAY');
                  setShowNewOrderModal(true);
                }}
                className="flex-1 p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500 hover:bg-blue-500/5 transition flex flex-col items-center gap-3 text-white group"
              >
                <div className="p-3 rounded-xl bg-slate-800 group-hover:bg-blue-500/20 text-slate-300 group-hover:text-blue-400 transition">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold">Para llevar</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedServiceType('DINE_IN');
                  setShowNewOrderModal(true);
                }}
                className="flex-1 p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500 hover:bg-blue-500/5 transition flex flex-col items-center gap-3 text-white group"
              >
                <div className="p-3 rounded-xl bg-slate-800 group-hover:bg-blue-500/20 text-slate-300 group-hover:text-blue-400 transition">
                  <Store className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold">En el local</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full divide-y divide-slate-800">
            {filteredOrders.map((order) => (
              <div key={order.id} className="grid grid-cols-4 px-6 py-4 items-center text-xs font-semibold hover:bg-slate-900/40 transition">
                <div className="text-slate-300 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>{order.createdAt} ({order.orderNumber})</span>
                </div>
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {order.status === 'PENDING' ? 'Pendiente' : 'En curso'}
                  </span>
                </div>
                <div className="text-white font-mono font-bold">
                  {business.currencySymbol}{order.total.toLocaleString()}
                </div>
                <div className="text-slate-200">
                  {order.customerName}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL 1: VER OPCIONES (Exact Replica of Screenshot 2) */}
      {showOptionsModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl w-full max-w-md p-6 sm:p-7 space-y-6 shadow-2xl animate-fade-in relative">
            <div className="flex items-center justify-between pb-2">
              <h3 className="text-lg font-black text-white tracking-tight">Ver opciones</h3>
              <button
                type="button"
                onClick={() => setShowOptionsModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Option 1: Fusionar pestañas */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-800 text-slate-300 shrink-0">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Fusionar pestañas</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                      Unir Mostrador y A domicilio en una sola pestaña de pedidos. En este dispositivo.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setMergeTabs(!mergeTabs)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    mergeTabs ? 'bg-blue-600' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                      mergeTabs ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Option 2: Ocultar pestañas de Mesas */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-800 text-slate-300 shrink-0">
                    <Armchair className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Ocultar pestañas de Mesas</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                      Oculta la pestaña de Mesas en este dispositivo, no afecta a los demás usuarios.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setHideTablesTab(!hideTablesTab)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    hideTablesTab ? 'bg-blue-600' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                      hideTablesTab ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowOptionsModal(false)}
                className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white"
              >
                Atrás
              </button>
              <button
                type="button"
                onClick={() => setShowOptionsModal(false)}
                className="px-6 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs shadow-md shadow-blue-500/25 transition"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: CREAR NUEVO PEDIDO PDV */}
      {showNewOrderModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl w-full max-w-2xl p-6 sm:p-7 space-y-5 shadow-2xl animate-fade-in relative max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-black text-white tracking-tight">+ Nuevo Pedido en PDV</h3>
                <p className="text-xs text-slate-400">Selecciona el tipo de servicio y añade productos del menú.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowNewOrderModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateOrder} className="flex-1 overflow-y-auto space-y-4 pr-1">
              {/* Type of service selector */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'TAKEAWAY', label: 'Para llevar', icon: ShoppingBag },
                  { id: 'DINE_IN', label: 'En el local', icon: Store },
                  { id: 'TABLE', label: 'En Mesa', icon: Armchair },
                ].map((st) => {
                  const Icon = st.icon;
                  return (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setSelectedServiceType(st.id as any)}
                      className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition ${
                        selectedServiceType === st.id
                          ? 'bg-blue-600 border-blue-500 text-white'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{st.label}</span>
                    </button>
                  );
                })}
              </div>

              {selectedServiceType === 'TABLE' && (
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Número de Mesa</label>
                  <select
                    value={selectedTable}
                    onChange={(e) => setSelectedTable(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-bold focus:outline-none focus:border-blue-500"
                  >
                    {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>Mesa #{n}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Customer Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Nombre del Cliente (Opcional)</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ej: Juan Pérez"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Teléfono</label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+56 9 1234 5678"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Product quick adder */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300">Seleccionar Productos</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-1 bg-slate-900/60 rounded-2xl border border-slate-800">
                  {products.map((prod) => (
                    <button
                      key={prod.id}
                      type="button"
                      onClick={() => handleAddToCart(prod)}
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-left transition flex flex-col justify-between"
                    >
                      <span className="text-xs font-bold text-white line-clamp-1">{prod.name}</span>
                      <span className="text-[11px] font-mono text-blue-400 font-bold mt-1">
                        {business.currencySymbol}{prod.price.toLocaleString()}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Cart summary in modal */}
              {cartItems.length > 0 && (
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <h5 className="text-xs font-bold text-white">Resumen del pedido:</h5>
                  <div className="space-y-1 divide-y divide-slate-800">
                    {cartItems.map((item) => (
                      <div key={item.product.id} className="flex items-center justify-between text-xs py-1">
                        <span className="text-slate-300">{item.quantity}x {item.product.name}</span>
                        <span className="font-mono text-white font-bold">
                          {business.currencySymbol}{(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-slate-700 flex items-center justify-between text-xs font-bold text-white">
                    <span>Total a cobrar:</span>
                    <span className="font-mono text-sm text-emerald-400">
                      {business.currencySymbol}{cartItems.reduce((s, i) => s + i.product.price * i.quantity, 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowNewOrderModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg transition"
                >
                  Confirmar y Enviar a Cocina
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
