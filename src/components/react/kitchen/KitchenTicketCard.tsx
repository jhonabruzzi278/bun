import React, { useState, useEffect } from 'react';
import type { KitchenTicket, KitchenStatus } from '@/lib/types';
import { Clock, CheckCircle2, Play, Send, Ban, Utensils, Flame, Coffee, X } from 'lucide-react';

interface Props {
  ticket: KitchenTicket;
  onUpdateStatus: (ticketId: string, status: KitchenStatus) => void;
  onCancelTicket: (ticketId: string, reason: string) => void;
}

export default function KitchenTicketCard({ ticket, onUpdateStatus, onCancelTicket }: Props) {
  const [elapsedMinutes, setElapsedMinutes] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('Cliente solicitó cancelar');

  // Dynamic Live Timer
  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(ticket.createdAt).getTime();
      const now = ticket.readyAt ? new Date(ticket.readyAt).getTime() : Date.now();
      const diffSecs = Math.floor((now - start) / 1000);
      setElapsedMinutes(Math.floor(diffSecs / 60));
      setElapsedSeconds(diffSecs % 60);
    };

    calculateTime();
    if (ticket.status !== 'DELIVERED' && ticket.status !== 'CANCELLED' && ticket.status !== 'READY') {
      const interval = setInterval(calculateTime, 1000);
      return () => clearInterval(interval);
    }
  }, [ticket.createdAt, ticket.readyAt, ticket.status]);

  // Traffic Light Color Code based on target time
  const isDelayed = elapsedMinutes >= ticket.targetMinutes && elapsedMinutes < ticket.targetMinutes + 5;
  const isVeryDelayed = elapsedMinutes >= ticket.targetMinutes + 5;

  let headerBg = 'bg-white dark:bg-[#241512] border-[#EAE1D6] dark:border-[#3D2420]';
  let badgeColor = 'bg-[#FAF7F2] dark:bg-[#180E0C] text-coffee-800 dark:text-[#E8DFD8] border border-[#EAE1D6] dark:border-[#3D2420]';

  if (ticket.status === 'CANCELLED') {
    headerBg = 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/60';
  } else if (ticket.status === 'READY') {
    headerBg = 'bg-[#F4F9F4] dark:bg-[#152919] border-[#D0EBD2] dark:border-[#2E5936]';
    badgeColor = 'bg-[#E7F3E8] dark:bg-[#1A3320] text-[#2E7D32] dark:text-[#4ADE80] border border-[#D0EBD2] dark:border-[#2C5935]';
  } else if (isVeryDelayed) {
    headerBg = 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 animate-pulse';
    badgeColor = 'bg-rose-600 text-white font-black';
  } else if (isDelayed) {
    headerBg = 'bg-[#FFFBEB] dark:bg-[#2E200C] border-[#FDE68A] dark:border-[#B45309]';
    badgeColor = 'bg-[#FEF8E3] text-[#A0740E] font-bold border border-[#FDECB8]';
  } else if (ticket.status === 'PREPARING') {
    headerBg = 'bg-[#FAF7F2] dark:bg-[#2A1916] border-[#EAE1D6] dark:border-[#4D2D26]';
    badgeColor = 'bg-color4 text-white font-bold';
  }

  const getStationIcon = (stationCode?: string) => {
    switch (stationCode) {
      case 'GRILL': return <Flame className="w-3 h-3 text-color4" />;
      case 'FRY': return <Utensils className="w-3 h-3 text-color3" />;
      case 'BAR': return <Coffee className="w-3 h-3 text-color2" />;
      default: return null;
    }
  };

  const handleCancelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCancelTicket(ticket.id, cancelReason);
    setIsCancelModalOpen(false);
  };

  return (
    <div className={`rounded-2xl border-2 flex flex-col justify-between shadow-coffee-sm transition-all ${headerBg} overflow-hidden`}>
      {/* Header */}
      <div className="p-3.5 border-b border-[#EAE1D6] dark:border-[#3D2420] flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-base font-black text-coffee-950 dark:text-white font-mono">
            #{ticket.ticketNumber}
          </span>
          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-[#FAF7F2] dark:bg-[#180E0C] text-coffee-900 dark:text-white border border-[#EAE1D6] dark:border-[#3D2420]">
            {ticket.orderType === 'dine_in' ? `🍽️ ${ticket.tableNumber || 'Salón'}` : ticket.orderType === 'takeaway' ? '🛍️ Retiro' : '🛵 Delivery'}
          </span>
        </div>

        {/* Live Timer */}
        <div className={`flex items-center gap-1 text-xs font-mono font-bold px-2 py-1 rounded-lg ${badgeColor}`}>
          <Clock className="w-3.5 h-3.5" />
          <span>{String(elapsedMinutes).padStart(2, '0')}:{String(elapsedSeconds).padStart(2, '0')}</span>
        </div>
      </div>

      {/* Customer Info & Notes */}
      <div className="p-3.5 space-y-2.5 flex-1">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-coffee-950 dark:text-white truncate">{ticket.customerName}</span>
          <span className="text-[10px] text-[#70645A] dark:text-[#A8988B]">Objetivo: {ticket.targetMinutes}m</span>
        </div>

        {ticket.notes && (
          <div className="p-2 rounded-xl bg-[#FEF8E3] dark:bg-[#33220E] border border-[#FDECB8] dark:border-[#593E1A] text-[#A0740E] dark:text-[#FBBF24] text-[11px] font-medium">
            📝 {ticket.notes}
          </div>
        )}

        {/* Items List */}
        <div className="space-y-1.5 pt-1">
          {ticket.items.map((item) => (
            <div
              key={item.id}
              className="p-2 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-xs space-y-0.5"
            >
              <div className="flex items-start justify-between gap-1.5">
                <div className="flex items-center gap-1.5">
                  {getStationIcon(item.stationCode)}
                  <span className="font-bold text-coffee-950 dark:text-white">
                    {item.quantity}x {item.productName}
                  </span>
                </div>
                {item.variantName && (
                  <span className="text-[10px] text-color3 font-semibold">
                    {item.variantName}
                  </span>
                )}
              </div>

              {item.modifiers && item.modifiers.length > 0 && (
                <div className="text-[10px] text-[#70645A] dark:text-[#A8988B] pl-4">
                  {item.modifiers.join(', ')}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-3 border-t border-[#EAE1D6] dark:border-[#3D2420] bg-white/50 dark:bg-[#180E0C]/50 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setIsCancelModalOpen(true)}
          className="p-2 rounded-xl text-[#8C7E73] hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition"
          title="Cancelar Comanda"
        >
          <Ban className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5">
          {ticket.status === 'PENDING' && (
            <button
              type="button"
              onClick={() => onUpdateStatus(ticket.id, 'PREPARING')}
              className="px-3.5 py-1.5 rounded-xl bg-color4 hover:bg-[#522B2B] text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Comenzar</span>
            </button>
          )}

          {ticket.status === 'PREPARING' && (
            <button
              type="button"
              onClick={() => onUpdateStatus(ticket.id, 'READY')}
              className="px-3.5 py-1.5 rounded-xl bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Marcar Listo</span>
            </button>
          )}

          {ticket.status === 'READY' && (
            <button
              type="button"
              onClick={() => onUpdateStatus(ticket.id, 'DELIVERED')}
              className="px-3.5 py-1.5 rounded-xl bg-color4 hover:bg-[#522B2B] text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Despachar</span>
            </button>
          )}
        </div>
      </div>

      {/* Cancel Modal */}
      {isCancelModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-[#EAE1D6] dark:border-[#3D2420]">
              <h4 className="font-bold text-coffee-950 dark:text-white text-sm">Cancelar Comanda #{ticket.ticketNumber}</h4>
              <button onClick={() => setIsCancelModalOpen(false)} className="text-[#8C7E73]">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCancelSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#70645A] dark:text-[#A8988B] mb-1">Motivo de cancelación</label>
                <input
                  type="text"
                  required
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-coffee-950 dark:text-white text-xs"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCancelModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-[#70645A]"
                >
                  Volver
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold"
                >
                  Confirmar Cancelación
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
