import React from 'react';
import { Filter } from 'lucide-react';

export type FilterStatus = 'ALL' | 'PENDING' | 'IN_PROGRESS' | 'POS_WEB' | 'APPS';

interface PosFilterBarProps {
  filterStatus: FilterStatus;
  onFilterChange: (status: FilterStatus) => void;
}

export default function PosFilterBar({ filterStatus, onFilterChange }: PosFilterBarProps) {
  const filters: { id: FilterStatus; label: string }[] = [
    { id: 'ALL', label: 'Todos' },
    { id: 'PENDING', label: 'Pendiente' },
    { id: 'IN_PROGRESS', label: 'En curso' },
    { id: 'POS_WEB', label: 'POS / Web' },
    { id: 'APPS', label: 'Apps' },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1">
      <div className="flex items-center gap-1.5 text-xs text-[#8C7E73] dark:text-[#A8988B] pr-2">
        <Filter className="w-3.5 h-3.5" />
        <span className="font-semibold">Filtrar:</span>
      </div>

      {filters.map((f) => (
        <button
          key={f.id}
          type="button"
          onClick={() => onFilterChange(f.id)}
          className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
            filterStatus === f.id
              ? 'bg-color4 text-white shadow-sm'
              : 'bg-white dark:bg-[#241512] text-[#70645A] dark:text-[#A8988B] hover:text-coffee-950 dark:hover:text-white border border-[#EAE1D6] dark:border-[#3D2420]'
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
