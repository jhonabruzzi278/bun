import React from 'react';
import type { Product } from '@/lib/types';
import { Clock, Eye, CheckCircle2 } from 'lucide-react';

export interface PosOrder {
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

interface PosOrderCardProps {
  order: PosOrder;
  currencySymbol: string;
  onAdvanceStatus: (orderId: string) => void;
}

export default function PosOrderCard({
  order,
  currencySymbol,
  onAdvanceStatus,
}: PosOrderCardProps) {
  const getStatusBadge = (status: PosOrder['status']) => {
    switch (status) {
      case 'PENDING':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">Pendiente</span>;
      case 'IN_PROGRESS':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300">En Preparación</span>;
      case 'READY':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">Listo</span>;
      case 'COMPLETED':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EAE1D6] dark:bg-[#3D2420] text-[#70645A] dark:text-[#A8988B]">Entregado</span>;
    }
  };

  return (
    <div className="p-4 rounded-2xl bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] shadow-coffee-sm flex flex-col justify-between space-y-3 hover:border-color4 transition">
      <div>
        <div className="flex items-center justify-between pb-2 border-b border-[#FAF7F2] dark:border-[#180E0C]">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-sm text-coffee-950 dark:text-white">
              {order.orderNumber}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#FAF7F2] dark:bg-[#180E0C] text-[#70645A] dark:text-[#A8988B] font-bold">
              {order.type === 'TABLE' ? `Mesa #${order.tableNumber}` : order.type === 'DELIVERY' ? 'Delivery' : 'Mostrador'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[#8C7E73] dark:text-[#A8988B] flex items-center gap-1 font-mono">
              <Clock className="w-3 h-3" />
              {order.createdAt}
            </span>
            {getStatusBadge(order.status)}
          </div>
        </div>

        <div className="pt-2">
          <p className="text-xs font-bold text-coffee-950 dark:text-white">{order.customerName}</p>
          {order.customerPhone && (
            <p className="text-[11px] text-[#8C7E73] dark:text-[#A8988B]">{order.customerPhone}</p>
          )}
        </div>

        {/* Items List */}
        <div className="pt-2 space-y-1">
          {order.items.map((i, idx) => (
            <div key={idx} className="flex justify-between text-xs text-[#70645A] dark:text-[#D4C5B9]">
              <span>{i.quantity}x {i.product.name}</span>
              <span className="font-mono">{currencySymbol}{(i.product.price * i.quantity).toLocaleString('es-CL')}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Total & Action */}
      <div className="pt-3 border-t border-[#FAF7F2] dark:border-[#180E0C] flex items-center justify-between">
        <div>
          <span className="block text-[10px] text-[#8C7E73] dark:text-[#A8988B] uppercase">Total</span>
          <span className="font-mono font-black text-sm text-coffee-950 dark:text-white">
            {currencySymbol}{order.total.toLocaleString('es-CL')}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onAdvanceStatus(order.id)}
          className="px-3 py-1.5 rounded-xl bg-color4 hover:bg-[#522B2B] text-white text-xs font-bold shadow-sm transition flex items-center gap-1"
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{order.status === 'PENDING' ? 'Preparar' : order.status === 'IN_PROGRESS' ? 'Despachar' : 'Completar'}</span>
        </button>
      </div>
    </div>
  );
}
