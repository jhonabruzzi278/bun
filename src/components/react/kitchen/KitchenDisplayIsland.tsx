import React, { useState } from 'react';
import { useKitchenStore } from '@/lib/useKitchenStore';
import KitchenTicketCard from './KitchenTicketCard';
import { Volume2, VolumeX, RefreshCw, Plus, Clock, Filter, Layers, UtensilsCrossed, AlertCircle, CheckCircle2, History, RotateCcw } from 'lucide-react';

export default function KitchenDisplayIsland() {
  const {
    tickets,
    stations,
    selectedStation,
    setSelectedStation,
    soundEnabled,
    toggleSound,
    updateTicketStatus,
    cancelTicket,
    createTicketFromOrder,
    resetKitchenDemo,
    isLoaded
  } = useKitchenStore();

  const [activeTab, setActiveTab] = useState<'KDS' | 'HISTORY'>('KDS');

  if (!isLoaded) {
    return <div className="p-8 text-slate-400 text-sm">Cargando Sistema KDS de Cocina...</div>;
  }

  // Filter tickets by station
  const stationFilteredTickets = tickets.filter((t) => {
    if (selectedStation === 'ALL') return true;
    return t.items.some((item) => item.stationCode === selectedStation);
  });

  const pendingTickets = stationFilteredTickets.filter((t) => t.status === 'PENDING');
  const preparingTickets = stationFilteredTickets.filter((t) => t.status === 'PREPARING');
  const readyTickets = stationFilteredTickets.filter((t) => t.status === 'READY');
  const historyTickets = stationFilteredTickets.filter((t) => t.status === 'DELIVERED' || t.status === 'CANCELLED');

  const handleSimulateNewOrder = () => {
    const randomItems = [
      {
        id: `ki_${Date.now()}_1`,
        ticketId: '',
        productName: 'Double Bacon Smash',
        quantity: 1,
        variantName: 'Doble (2 Smash)',
        modifiers: ['Queso Cheddar Extra'],
        stationCode: 'GRILL',
        status: 'PENDING' as const,
      },
      {
        id: `ki_${Date.now()}_2`,
        ticketId: '',
        productName: 'Papas Rústicas con Cheddar & Bacon',
        quantity: 1,
        stationCode: 'FRY',
        status: 'PENDING' as const,
      }
    ];

    createTicketFromOrder({
      customerName: 'Cliente ' + Math.floor(Math.random() * 900 + 100),
      orderType: Math.random() > 0.5 ? 'dine_in' : 'delivery',
      tableNumber: 'Mesa ' + Math.floor(Math.random() * 8 + 1),
      notes: 'Pedido generado para prueba en tiempo real',
      items: randomItems,
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-amber-500 flex items-center justify-center text-xl shadow-lg shadow-brand-500/20 text-white font-black">
            👨‍🍳
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
              KDS Cocina en Tiempo Real
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30 animate-pulse">
                ● EN VIVO
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              {pendingTickets.length + preparingTickets.length} comandas en proceso • {readyTickets.length} listas para despacho
            </p>
          </div>
        </div>

        {/* Station Selectors & Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Station Filter Dropdown/Tabs */}
          <div className="flex items-center bg-slate-900 rounded-xl border border-slate-800 p-1">
            {stations.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedStation(s.code)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                  selectedStation === s.code
                    ? 'bg-brand-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {s.code === 'ALL' ? '🍽️ Todas' : s.code === 'GRILL' ? '🔥 Parrilla' : s.code === 'FRY' ? '🍟 Frituras' : '🍹 Bar'}
              </button>
            ))}
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? 'Silenciar Alertas' : 'Activar Sonidos'}
            className={`p-2 rounded-xl border transition ${
              soundEnabled
                ? 'bg-slate-900 text-brand-400 border-slate-800 hover:bg-slate-800'
                : 'bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Simulate New Order Button */}
          <button
            onClick={handleSimulateNewOrder}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition"
          >
            <Plus className="w-3.5 h-3.5" />
            + Simular Pedido
          </button>

          {/* Reset Demo */}
          <button
            onClick={resetKitchenDemo}
            title="Restablecer Comandas Demo"
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navigation View Tabs (KDS vs Historial) */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('KDS')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'KDS'
                ? 'bg-brand-500/10 text-brand-400 border border-brand-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            Tablero de Comandas Activas ({pendingTickets.length + preparingTickets.length + readyTickets.length})
          </button>

          <button
            onClick={() => setActiveTab('HISTORY')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'HISTORY'
                ? 'bg-brand-500/10 text-brand-400 border border-brand-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <History className="w-4 h-4" />
            Historial & Auditoría ({historyTickets.length})
          </button>
        </div>
      </div>

      {/* Main KDS 3-Column Board */}
      {activeTab === 'KDS' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Column 1: PENDIENTES */}
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-slate-500"></span>
                <h2 className="font-extrabold text-sm text-white uppercase tracking-wider">
                  Pendientes
                </h2>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-slate-900 text-slate-300 font-mono text-xs font-bold border border-slate-800">
                {pendingTickets.length}
              </span>
            </div>

            <div className="space-y-3">
              {pendingTickets.length === 0 ? (
                <div className="p-8 text-center bg-slate-950/40 rounded-2xl border border-dashed border-slate-800/80 text-slate-500 text-xs">
                  No hay pedidos pendientes
                </div>
              ) : (
                pendingTickets.map((ticket) => (
                  <KitchenTicketCard
                    key={ticket.id}
                    ticket={ticket}
                    onUpdateStatus={updateTicketStatus}
                    onCancelTicket={cancelTicket}
                  />
                ))
              )}
            </div>
          </div>

          {/* Column 2: PREPARANDO */}
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-brand-950/40 border border-brand-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-brand-500 animate-ping"></span>
                <h2 className="font-extrabold text-sm text-brand-400 uppercase tracking-wider">
                  En Preparación
                </h2>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-brand-500/20 text-brand-300 font-mono text-xs font-bold border border-brand-500/30">
                {preparingTickets.length}
              </span>
            </div>

            <div className="space-y-3">
              {preparingTickets.length === 0 ? (
                <div className="p-8 text-center bg-slate-950/40 rounded-2xl border border-dashed border-slate-800/80 text-slate-500 text-xs">
                  No hay pedidos en preparación
                </div>
              ) : (
                preparingTickets.map((ticket) => (
                  <KitchenTicketCard
                    key={ticket.id}
                    ticket={ticket}
                    onUpdateStatus={updateTicketStatus}
                    onCancelTicket={cancelTicket}
                  />
                ))
              )}
            </div>
          </div>

          {/* Column 3: LISTOS PARA ENTREGA */}
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                <h2 className="font-extrabold text-sm text-emerald-400 uppercase tracking-wider">
                  Listos para Entrega
                </h2>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/30">
                {readyTickets.length}
              </span>
            </div>

            <div className="space-y-3">
              {readyTickets.length === 0 ? (
                <div className="p-8 text-center bg-slate-950/40 rounded-2xl border border-dashed border-slate-800/80 text-slate-500 text-xs">
                  No hay pedidos listos pendientes de entrega
                </div>
              ) : (
                readyTickets.map((ticket) => (
                  <KitchenTicketCard
                    key={ticket.id}
                    ticket={ticket}
                    onUpdateStatus={updateTicketStatus}
                    onCancelTicket={cancelTicket}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      ) : (
        /* History & Audit Tab */
        <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-bold text-white text-base">Historial de Comandas del Turno</h3>
            <span className="text-xs text-slate-400">{historyTickets.length} comandas despachadas o canceladas</span>
          </div>

          <div className="divide-y divide-slate-800/60">
            {historyTickets.length === 0 ? (
              <p className="text-sm text-slate-500 py-6 text-center">No hay comandas finalizadas todavía.</p>
            ) : (
              historyTickets.map((t) => (
                <div key={t.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-white text-sm">#{t.ticketNumber}</span>
                      <span className="text-xs font-semibold text-slate-300">{t.customerName}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        t.status === 'DELIVERED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                      }`}>
                        {t.status === 'DELIVERED' ? 'ENTREGADO' : `CANCELADO: ${t.cancellationReason || 'Sin motivo'}`}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      {t.items.map(i => `${i.quantity}x ${i.productName}`).join(' • ')}
                    </p>
                  </div>

                  <div className="text-right text-xs text-slate-500 font-mono">
                    {new Date(t.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
