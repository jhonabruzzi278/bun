import React from 'react';
import { ShoppingBag, Truck, Armchair, Plus, CheckCircle2 } from 'lucide-react';
import { Button, Badge } from '@/components/ui';

export type ServiceTab = 'COUNTER' | 'DELIVERY' | 'TABLES';

interface PosHeaderTabsProps {
  activeTab: ServiceTab;
  onTabChange: (tab: ServiceTab) => void;
  counterCount: number;
  deliveryCount: number;
  tablesCount: number;
  totalSalesToday: number;
  currencySymbol: string;
  hideTablesTab?: boolean;
  onOpenNewOrder: () => void;
}

export default function PosHeaderTabs({
  activeTab,
  onTabChange,
  counterCount,
  deliveryCount,
  tablesCount,
  totalSalesToday,
  currencySymbol,
  hideTablesTab = false,
  onOpenNewOrder,
}: PosHeaderTabsProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-200 dark:border-white/[0.08] pb-4">
      {/* Apple-style Segmented Service Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto p-1 rounded-2xl bg-white/70 dark:bg-white/[0.05] border border-neutral-200 dark:border-white/[0.08] backdrop-blur-md">
        <button
          type="button"
          onClick={() => onTabChange('COUNTER')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-xs transition-all duration-200 whitespace-nowrap active:scale-95 ${
            activeTab === 'COUNTER'
              ? 'bg-white text-black dark:bg-white dark:text-black shadow-sm font-black'
              : 'text-[#70645A] dark:text-[#A8988B] hover:text-black dark:hover:text-white'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Mostrador</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-black/10 dark:bg-black/40 text-neutral-800 dark:text-neutral-300 font-mono">
            {counterCount}
          </span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange('DELIVERY')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-xs transition-all duration-200 whitespace-nowrap active:scale-95 ${
            activeTab === 'DELIVERY'
              ? 'bg-white text-black dark:bg-white dark:text-black shadow-sm font-black'
              : 'text-[#70645A] dark:text-[#A8988B] hover:text-black dark:hover:text-white'
          }`}
        >
          <Truck className="w-3.5 h-3.5" />
          <span>A domicilio</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-black/10 dark:bg-black/40 text-neutral-800 dark:text-neutral-300 font-mono">
            {deliveryCount}
          </span>
        </button>

        {!hideTablesTab && (
          <button
            type="button"
            onClick={() => onTabChange('TABLES')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-xs transition-all duration-200 whitespace-nowrap active:scale-95 ${
              activeTab === 'TABLES'
                ? 'bg-white text-black dark:bg-white dark:text-black shadow-sm font-black'
                : 'text-[#70645A] dark:text-[#A8988B] hover:text-black dark:hover:text-white'
            }`}
          >
            <Armchair className="w-3.5 h-3.5" />
            <span>Mesas</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-black/10 dark:bg-black/40 text-neutral-800 dark:text-neutral-300 font-mono">
              {tablesCount}
            </span>
          </button>
        )}
      </div>

      {/* Right Side: Total Sales & New Order Button */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/70 dark:bg-white/[0.05] border border-neutral-200 dark:border-white/[0.08] backdrop-blur-md text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-[#8C7E73] dark:text-[#A8988B] font-medium">Caja Abierta:</span>
          <span className="font-mono font-black text-coffee-950 dark:text-amber-400">
            {currencySymbol}{totalSalesToday.toLocaleString('es-CL')}
          </span>
        </div>

        <Button
          variant="primary"
          size="default"
          onClick={onOpenNewOrder}
          className="shadow-lg shadow-amber-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Pedido</span>
        </Button>
      </div>
    </div>
  );
}
