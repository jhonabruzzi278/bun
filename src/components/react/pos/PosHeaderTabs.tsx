import React from 'react';
import { ShoppingBag, Truck, Armchair, Plus, CheckCircle2 } from 'lucide-react';

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
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EAE1D6] dark:border-[#3D2420] pb-4">
      {/* Service Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => onTabChange('COUNTER')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition whitespace-nowrap ${
            activeTab === 'COUNTER'
              ? 'bg-color4 text-white shadow-coffee-sm'
              : 'bg-white dark:bg-[#241512] text-[#70645A] dark:text-[#A8988B] hover:text-coffee-950 dark:hover:text-white border border-[#EAE1D6] dark:border-[#3D2420]'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Mostrador</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-black/20 text-white font-mono">
            {counterCount}
          </span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange('DELIVERY')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition whitespace-nowrap ${
            activeTab === 'DELIVERY'
              ? 'bg-color4 text-white shadow-coffee-sm'
              : 'bg-white dark:bg-[#241512] text-[#70645A] dark:text-[#A8988B] hover:text-coffee-950 dark:hover:text-white border border-[#EAE1D6] dark:border-[#3D2420]'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>A domicilio</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-black/20 text-white font-mono">
            {deliveryCount}
          </span>
        </button>

        {!hideTablesTab && (
          <button
            type="button"
            onClick={() => onTabChange('TABLES')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition whitespace-nowrap ${
              activeTab === 'TABLES'
                ? 'bg-color4 text-white shadow-coffee-sm'
                : 'bg-white dark:bg-[#241512] text-[#70645A] dark:text-[#A8988B] hover:text-coffee-950 dark:hover:text-white border border-[#EAE1D6] dark:border-[#3D2420]'
            }`}
          >
            <Armchair className="w-4 h-4" />
            <span>Mesas</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-black/20 text-white font-mono">
              {tablesCount}
            </span>
          </button>
        )}
      </div>

      {/* Right Side: Total Sales & New Order Button */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span className="text-[#8C7E73] dark:text-[#A8988B]">Caja Abierta:</span>
          <span className="font-mono font-bold text-coffee-950 dark:text-white">
            {currencySymbol}{totalSalesToday.toLocaleString('es-CL')}
          </span>
        </div>

        <button
          type="button"
          onClick={onOpenNewOrder}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-color4 hover:bg-[#522B2B] text-white font-bold text-xs shadow-coffee-sm transition"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Pedido</span>
        </button>
      </div>
    </div>
  );
}
