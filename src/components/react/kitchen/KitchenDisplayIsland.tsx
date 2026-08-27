import React, { useState } from 'react';
import { useKitchenStore } from '@/lib/useKitchenStore';
import KitchenTicketCard from './KitchenTicketCard';
import { Volume2, VolumeX, Plus, Layers, History, RotateCcw } from 'lucide-react';

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
    return <div className="p-8 text-[#8C7E73] dark:text-[#A8988B] text-sm">Cargando Sistema KDS de Cocina...</div>;
  }

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
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] shadow-coffee-sm transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-color4 text-white flex items-center justify-center text-xl shadow-md font-black">
            👨‍🍳
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-coffee-950 dark:text-white flex items-center gap-2">
              KDS Cocina & Barra en Tiempo Real
              <span className="text-[10px] bg-[#E7F3E8] dark:bg-[#1A3320] text-[#2E7D32] dark:text-[#4ADE80] font-bold px-2 py-0.5 rounded-full border border-[#D0EBD2] dark:border-[#2C5935] animate-pulse">
                ● EN VIVO
              </span>
            </h1>
            <p className="text-xs text-[#70645A] dark:text-[#A8988B]">
              {pendingTickets.length + preparingTickets.length} comandas en proceso • {readyTickets.length} listas para despacho
            </p>
          </div>
        </div>

        {/* Station Selectors & Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Station Filter Tabs */}
          <div className="flex items-center bg-[#FAF7F2] dark:bg-[#180E0C] rounded-xl border border-[#EAE1D6] dark:border-[#3D2420] p-1">
            {stations.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedStation(s.code)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                  selectedStation === s.code
                    ? 'bg-color4 text-white shadow-sm'
                    : 'text-[#70645A] dark:text-[#A8988B] hover:text-coffee-950 dark:hover:text-white'
                }`}
              >
                {s.code === 'ALL' ? '🍽️ Todas' : s.code === 'GRILL' ? '🔥 Parrilla' : s.code === 'FRY' ? '🍟 Frituras' : '🍹 Bar'}
              </button>
            ))}
          </div>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            title={soundEnabled ? 'Silenciar Alertas' : 'Activar Sonidos'}
            className={`p-2 rounded-xl border transition ${
              soundEnabled
                ? 'bg-[#FAF7F2] dark:bg-[#2F1B17] text-color4 dark:text-color2 border-[#EAE1D6] dark:border-[#4D2D26]'
                : 'bg-[#FAF7F2] dark:bg-[#180E0C] text-[#8C7E73] border-[#EAE1D6] dark:border-[#3D2420]'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Simulate New Order Button */}
          <button
            type="button"
            onClick={handleSimulateNewOrder}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-color4 hover:bg-[#522B2B] text-white font-bold text-xs shadow-coffee-sm transition"
          >
            <Plus className="w-3.5 h-3.5" />
            + Simular Pedido
          </button>

          {/* Reset Demo */}
          <button
            type="button"
            onClick={resetKitchenDemo}
            title="Restablecer Comandas Demo"
            className="p-2 rounded-xl bg-[#FAF7F2] dark:bg-[#2F1B17] hover:bg-[#F3EDE3] text-[#70645A] dark:text-[#A8988B] border border-[#EAE1D6] dark:border-[#3D2420] transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navigation View Tabs */}
      <div className="flex items-center justify-between border-b border-[#EAE1D6] dark:border-[#3D2420] pb-2">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveTab('KDS')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'KDS'
                ? 'bg-[#FAF7F2] dark:bg-[#2F1B17] text-color4 dark:text-color2 border border-[#EAE1D6] dark:border-[#4D2D26]'
                : 'text-[#70645A] dark:text-[#A8988B] hover:text-coffee-950 dark:hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            Tablero de Comandas ({pendingTickets.length + preparingTickets.length + readyTickets.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('HISTORY')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'HISTORY'
                ? 'bg-[#FAF7F2] dark:bg-[#2F1B17] text-color4 dark:text-color2 border border-[#EAE1D6] dark:border-[#4D2D26]'
                : 'text-[#70645A] dark:text-[#A8988B] hover:text-coffee-950 dark:hover:text-white'
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
            <div className="p-3 rounded-xl bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] flex items-center justify-between shadow-coffee-sm">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-color2"></span>
                <h2 className="font-extrabold text-xs text-coffee-950 dark:text-white uppercase tracking-wider">
                  Pendientes
                </h2>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-[#FAF7F2] dark:bg-[#180E0C] text-coffee-950 dark:text-white font-mono text-xs font-bold border border-[#EAE1D6] dark:border-[#3D2420]">
                {pendingTickets.length}
              </span>
            </div>

            <div className="space-y-3">
              {pendingTickets.length === 0 ? (
                <div className="p-8 text-center bg-white/50 dark:bg-[#241512]/50 rounded-2xl border border-dashed border-[#EAE1D6] dark:border-[#3D2420] text-[#8C7E73] dark:text-[#A8988B] text-xs">
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

          {/* Column 2: EN PREPARACIÓN */}
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] flex items-center justify-between shadow-coffee-sm">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-color3 animate-pulse"></span>
                <h2 className="font-extrabold text-xs text-coffee-950 dark:text-white uppercase tracking-wider">
                  En Preparación
                </h2>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-[#FAF7F2] dark:bg-[#180E0C] text-coffee-950 dark:text-white font-mono text-xs font-bold border border-[#EAE1D6] dark:border-[#3D2420]">
                {preparingTickets.length}
              </span>
            </div>

            <div className="space-y-3">
              {preparingTickets.length === 0 ? (
                <div className="p-8 text-center bg-white/50 dark:bg-[#241512]/50 rounded-2xl border border-dashed border-[#EAE1D6] dark:border-[#3D2420] text-[#8C7E73] dark:text-[#A8988B] text-xs">
                  No hay comandas en cocción activa
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
            <div className="p-3 rounded-xl bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] flex items-center justify-between shadow-coffee-sm">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2E7D32]"></span>
                <h2 className="font-extrabold text-xs text-coffee-950 dark:text-white uppercase tracking-wider">
                  Listos / Despachar
                </h2>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-[#FAF7F2] dark:bg-[#180E0C] text-coffee-950 dark:text-white font-mono text-xs font-bold border border-[#EAE1D6] dark:border-[#3D2420]">
                {readyTickets.length}
              </span>
            </div>

            <div className="space-y-3">
              {readyTickets.length === 0 ? (
                <div className="p-8 text-center bg-white/50 dark:bg-[#241512]/50 rounded-2xl border border-dashed border-[#EAE1D6] dark:border-[#3D2420] text-[#8C7E73] dark:text-[#A8988B] text-xs">
                  No hay platos esperando garzón/delivery
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
        /* History View */
        <div className="bg-white dark:bg-[#241512] rounded-2xl border border-[#EAE1D6] dark:border-[#3D2420] p-6 shadow-coffee-sm space-y-4">
          <h3 className="font-bold text-coffee-950 dark:text-white text-base">Historial de Comandas Despachadas</h3>
          <div className="divide-y divide-[#F4EFEA] dark:divide-[#331C18]">
            {historyTickets.map((t) => (
              <div key={t.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-coffee-950 dark:text-white">#{t.ticketNumber} • {t.customerName}</span>
                  <span className="text-[#8C7E73] dark:text-[#A8988B] block text-[11px]">{t.items.map(i => `${i.quantity}x ${i.productName}`).join(', ')}</span>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  t.status === 'DELIVERED'
                    ? 'bg-[#E7F3E8] dark:bg-[#1A3320] text-[#2E7D32] dark:text-[#4ADE80]'
                    : 'bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400'
                }`}>
                  {t.status === 'DELIVERED' ? 'Despachado' : 'Cancelado'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
