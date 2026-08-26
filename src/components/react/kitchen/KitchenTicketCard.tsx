import React, { useState, useEffect } from 'react';
import type { KitchenTicket, KitchenStatus } from '@/lib/types';
import { Clock, AlertTriangle, CheckCircle2, Play, Send, Ban, Utensils, Flame, Coffee, Check, X } from 'lucide-react';

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

  let headerBg = 'bg-slate-900 border-slate-800';
  let badgeColor = 'bg-slate-800 text-slate-300';

  if (ticket.status === 'CANCELLED') {
    headerBg = 'bg-rose-950/40 border-rose-900/60';
  } else if (ticket.status === 'READY') {
    headerBg = 'bg-emerald-950/40 border-emerald-800/80';
    badgeColor = 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40';
  } else if (isVeryDelayed) {
    headerBg = 'bg-rose-950/50 border-rose-600 animate-pulse';
    badgeColor = 'bg-rose-500 text-white font-black';
  } else if (isDelayed) {
    headerBg = 'bg-amber-950/40 border-amber-600';
    badgeColor = 'bg-amber-500 text-slate-950 font-bold';
  } else if (ticket.status === 'PREPARING') {
    headerBg = 'bg-brand-950/30 border-brand-500/60';
    badgeColor = 'bg-brand-500/20 text-brand-400 border border-brand-500/30';
  }

  const getStationIcon = (stationCode?: string) => {
    switch (stationCode) {
      case 'GRILL': return <Flame className="w-3 h-3 text-rose-400" />;
      case 'FRY': return <Utensils className="w-3 h-3 text-amber-400" />;
      case 'BAR': return <Coffee className="w-3 h-3 text-cyan-400" />;
      default: return null;
    }
  };

  const handleCancelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCancelTicket(ticket.id, cancelReason);
    setIsCancelModalOpen(false);
  };

  return (
    <div className={`rounded-2xl border-2 flex flex-col justify-between shadow-xl transition-all ${headerBg} overflow-hidden`}>
      {/* Header */}
      <div className="p-3.5 border-b border-slate-800/80 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-base font-black text-white font-mono">
            #{ticket.ticketNumber}
          </span>
          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-slate-800/90 text-slate-300 border border-slate-700">
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
          <span className="font-bold text-white truncate">{ticket.customerName}</span>
          <span className="text-[10px] text-slate-400">Objetivo: {ticket.targetMinutes}m</span>
        </div>

        {ticket.notes && (
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-medium flex items-start gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <span>Nota: {ticket.notes}</span>
          </div>
        )}

        {/* Items List */}
        <div className="divide-y divide-slate-800/60 pt-1 space-y-1.5">
          {ticket.items.map((item) => (
            <div key={item.id} className="pt-1.5 first:pt-0 space-y-1">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-slate-800 text-brand-400 font-extrabold text-xs flex items-center justify-center font-mono">
                    {item.quantity}
                  </span>
                  <span className="text-xs font-bold text-white leading-tight">
                    {item.productName}
                  </span>
                </div>
                {item.stationCode && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-400 font-mono flex items-center gap-1 shrink-0">
                    {getStationIcon(item.stationCode)}
                    {item.stationCode}
                  </span>
                )}
              </div>

              {item.variantName && (
                <p className="text-[10px] text-slate-400 pl-7 font-medium">
                  Opción: <strong className="text-slate-200">{item.variantName}</strong>
                </p>
              )}

              {item.modifiers && item.modifiers.length > 0 && (
                <div className="pl-7 text-[10px] text-emerald-400 space-y-0.5">
                  {item.modifiers.map((mod, idx) => (
                    <div key={idx} className="flex items-center gap-1">
                      <span>└ +</span>
                      <span className="font-semibold">{mod}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Action Footer Button */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/70 flex items-center gap-2">
        {ticket.status === 'PENDING' && (
          <button
            type="button"
            onClick={() => onUpdateStatus(ticket.id, 'PREPARING')}
            className="flex-1 py-2.5 px-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-xs shadow-md shadow-brand-500/25 flex items-center justify-center gap-1.5 transition active:scale-[0.98]"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            COMENZAR
          </button>
        )}

        {ticket.status === 'PREPARING' && (
          <button
            type="button"
            onClick={() => onUpdateStatus(ticket.id, 'READY')}
            className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md shadow-emerald-600/25 flex items-center justify-center gap-1.5 transition active:scale-[0.98]"
          >
            <CheckCircle2 className="w-4 h-4" />
            MARCAR LISTO
          </button>
        )}

        {ticket.status === 'READY' && (
          <button
            type="button"
            onClick={() => onUpdateStatus(ticket.id, 'DELIVERED')}
            className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-extrabold text-xs border border-slate-700 flex items-center justify-center gap-1.5 transition active:scale-[0.98]"
          >
            <Send className="w-3.5 h-3.5" />
            ENTREGAR
          </button>
        )}

        {ticket.status !== 'CANCELLED' && ticket.status !== 'DELIVERED' && (
          <button
            type="button"
            onClick={() => setIsCancelModalOpen(true)}
            title="Cancelar Comanda"
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 border border-slate-800 transition"
          >
            <Ban className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Modal Cancelación */}
      {isCancelModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="font-bold text-white text-sm">Cancelar Comanda #{ticket.ticketNumber}</h3>
              <button onClick={() => setIsCancelModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCancelSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Motivo de Cancelación</label>
                <select
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                >
                  <option value="Cliente solicitó cancelar">Cliente solicitó cancelar</option>
                  <option value="Sin stock de insumo">Sin stock de insumo</option>
                  <option value="Error de digitación / duplicado">Error de digitación / duplicado</option>
                  <option value="Demora excesiva">Demora excesiva</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCancelModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Volver
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold"
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
