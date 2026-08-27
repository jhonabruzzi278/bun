import React from 'react';

export type OrderStatus = 'PENDING' | 'PREPARING' | 'READY' | 'COMPLETED' | 'CANCELLED' | 'Pendiente' | 'Preparando' | 'Listo' | 'Terminado' | 'Cancelado';

interface StatusBadgeProps {
  status: OrderStatus | string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const normalized = status.toUpperCase();

  switch (normalized) {
    case 'READY':
    case 'LISTO':
      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-[#E7F3E8] dark:bg-[#1A3320] text-[#2E7D32] dark:text-[#4ADE80] border border-[#D0EBD2] dark:border-[#2C5935] ${className}`}>
          Listo
        </span>
      );
    case 'PREPARING':
    case 'PREPARANDO':
    case 'PREPARANTE':
      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-[#EAF1FC] dark:bg-[#1A2640] text-[#1A62C6] dark:text-[#60A5FA] border border-[#D3E3FA] dark:border-[#2A4373] ${className}`}>
          Preparando
        </span>
      );
    case 'PENDING':
    case 'PENDIENTE':
      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-[#FEF8E3] dark:bg-[#33220E] text-[#A0740E] dark:text-[#FBBF24] border border-[#FDECB8] dark:border-[#593E1A] ${className}`}>
          Pendiente
        </span>
      );
    case 'COMPLETED':
    case 'TERMINADO':
    case 'DELIVERED':
    case 'ENTREGADO':
      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-[#EFECE8] dark:bg-[#2F1D19] text-[#635A52] dark:text-[#D4C5B9] border border-[#E2DDD6] dark:border-[#472D27] ${className}`}>
          Terminado
        </span>
      );
    case 'CANCELLED':
    case 'CANCELADO':
      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-[#FDE8E8] dark:bg-[#3B1717] text-[#C53030] dark:text-[#F87171] border border-[#FBD0D0] dark:border-[#592626] ${className}`}>
          Cancelado
        </span>
      );
    default:
      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-coffee-100 dark:bg-[#2C1814] text-coffee-700 dark:text-[#E8DFD8] border border-coffee-200 dark:border-[#422621] ${className}`}>
          {status}
        </span>
      );
  }
};

export default StatusBadge;
