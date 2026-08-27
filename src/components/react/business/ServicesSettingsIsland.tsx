import React, { useState } from 'react';
import { useCatalogStore } from '@/lib/useCatalogStore';
import {
  Truck,
  ShoppingBag,
  Store,
  Armchair,
  Save,
  CheckCircle2,
  Clock,
  Info
} from 'lucide-react';
import type { BusinessServiceSettings } from '@/lib/types';

export default function ServicesSettingsIsland() {
  const { business, updateBusiness, isLoaded } = useCatalogStore();
  const [services, setServices] = useState<BusinessServiceSettings>(
    business.serviceSettings || {
      delivery: {
        enabledWeb: true,
        enabledPos: true,
        serviceFee: 1500,
        packagingFee: 500,
        minOrderAmount: 5000,
        freeDeliveryThreshold: 25000,
        avgDeliveryMinutes: 40,
        scheduledOrders: true,
        requireAddressDetails: true,
      },
      takeaway: {
        enabledWeb: true,
        enabledPos: true,
        avgPrepMinutes: 20,
      },
      dineIn: {
        enabledWeb: true,
        enabledPos: true,
      },
      tableDineIn: {
        enabledPos: true,
      },
      tips: {
        enabledWeb: true,
        enabledPos: true,
        suggestedPercentages: [5, 10, 15],
      },
    }
  );

  const [savedMessage, setSavedMessage] = useState(false);

  React.useEffect(() => {
    if (isLoaded && business.serviceSettings) {
      setServices(business.serviceSettings);
    }
  }, [isLoaded, business.serviceSettings]);

  if (!isLoaded) return <div className="text-[#8C7E73] dark:text-[#A8988B] text-sm">Cargando configuración de servicios...</div>;

  const handleDeliveryToggle = (key: 'enabledWeb' | 'enabledPos' | 'scheduledOrders' | 'requireAddressDetails') => {
    setServices((prev) => ({
      ...prev,
      delivery: {
        ...prev.delivery,
        [key]: !prev.delivery[key],
      },
    }));
  };

  const handleDeliveryNumberChange = (key: 'serviceFee' | 'packagingFee' | 'minOrderAmount' | 'freeDeliveryThreshold' | 'avgDeliveryMinutes', value: string) => {
    const num = Number(value) || 0;
    setServices((prev) => ({
      ...prev,
      delivery: {
        ...prev.delivery,
        [key]: num,
      },
    }));
  };

  const handleTakeawayToggle = (key: 'enabledWeb' | 'enabledPos') => {
    setServices((prev) => ({
      ...prev,
      takeaway: {
        ...prev.takeaway,
        [key]: !prev.takeaway[key],
      },
    }));
  };

  const handleTakeawayNumberChange = (value: string) => {
    const num = Number(value) || 0;
    setServices((prev) => ({
      ...prev,
      takeaway: {
        ...prev.takeaway,
        avgPrepMinutes: num,
      },
    }));
  };

  const handleDineInToggle = (key: 'enabledWeb' | 'enabledPos') => {
    setServices((prev) => ({
      ...prev,
      dineIn: {
        ...prev.dineIn,
        [key]: !prev.dineIn[key],
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBusiness({
      serviceSettings: services,
    });
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3500);
  };

  const currencySymbol = business.currencySymbol || '$';

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {savedMessage && (
        <div className="p-4 rounded-2xl bg-[#E7F3E8] dark:bg-[#1A3320] border border-[#D0EBD2] dark:border-[#2C5935] text-[#2E7D32] dark:text-[#4ADE80] text-sm font-semibold flex items-center gap-3 animate-fade-in shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-[#2E7D32] dark:text-[#4ADE80] shrink-0" />
          <span>¡Tipos de servicio y tarifas guardados con éxito!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. DELIVERY */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] shadow-coffee-sm space-y-6 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F4EFEA] dark:border-[#331C18]">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] flex items-center justify-center text-color4 dark:text-color2 shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-base font-bold text-coffee-950 dark:text-white">Delivery (A domicilio)</h2>
                <p className="text-xs text-[#70645A] dark:text-[#A8988B] mt-0.5">
                  Entrega a domicilio con tu propio equipo de reparto o flota externa.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleDeliveryToggle('enabledWeb')}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                services.delivery.enabledWeb ? 'bg-color4' : 'bg-[#D7C7B5] dark:bg-[#4D2D26]'
              }`}
            >
              <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transition transform ${services.delivery.enabledWeb ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-coffee-950 dark:text-white mb-1">Tarifa base de envío</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#8C7E73]">{currencySymbol}</span>
                <input
                  type="number"
                  value={services.delivery.serviceFee}
                  onChange={(e) => handleDeliveryNumberChange('serviceFee', e.target.value)}
                  className="w-full pl-8 pr-3.5 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-coffee-950 dark:text-white text-xs font-mono font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-coffee-950 dark:text-white mb-1">Monto mínimo de compra</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#8C7E73]">{currencySymbol}</span>
                <input
                  type="number"
                  value={services.delivery.minOrderAmount}
                  onChange={(e) => handleDeliveryNumberChange('minOrderAmount', e.target.value)}
                  className="w-full pl-8 pr-3.5 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-coffee-950 dark:text-white text-xs font-mono font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-coffee-950 dark:text-white mb-1">Envío gratis sobre</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#8C7E73]">{currencySymbol}</span>
                <input
                  type="number"
                  value={services.delivery.freeDeliveryThreshold}
                  onChange={(e) => handleDeliveryNumberChange('freeDeliveryThreshold', e.target.value)}
                  className="w-full pl-8 pr-3.5 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-coffee-950 dark:text-white text-xs font-mono font-bold"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 2. TAKEAWAY */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] shadow-coffee-sm space-y-4 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F4EFEA] dark:border-[#331C18]">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] flex items-center justify-center text-color3 shrink-0">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-base font-bold text-coffee-950 dark:text-white">Para llevar (Pick-up)</h2>
                <p className="text-xs text-[#70645A] dark:text-[#A8988B] mt-0.5">
                  Tus comensales retiran su pedido directamente en el local.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleTakeawayToggle('enabledWeb')}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                services.takeaway.enabledWeb ? 'bg-color3' : 'bg-[#D7C7B5] dark:bg-[#4D2D26]'
              }`}
            >
              <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transition transform ${services.takeaway.enabledWeb ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420]">
            <span className="text-xs font-medium text-coffee-950 dark:text-white">Tiempo de preparación estimado para retiro:</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={services.takeaway.avgPrepMinutes}
                onChange={(e) => handleTakeawayNumberChange(e.target.value)}
                className="w-20 px-3 py-1.5 rounded-lg bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] text-coffee-950 dark:text-white text-xs font-bold text-center"
              />
              <span className="text-xs text-[#70645A] dark:text-[#A8988B]">minutos</span>
            </div>
          </div>
        </div>

        {/* 3. DINE IN */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] shadow-coffee-sm space-y-4 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F4EFEA] dark:border-[#331C18]">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] flex items-center justify-center text-[#2E7D32] dark:text-[#4ADE80] shrink-0">
                <Store className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-base font-bold text-coffee-950 dark:text-white">En el local (Mesas & Salón)</h2>
                <p className="text-xs text-[#70645A] dark:text-[#A8988B] mt-0.5">
                  Pedidos escaneando QR en mesa o atendidos por garzones en salón.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleDineInToggle('enabledWeb')}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                services.dineIn.enabledWeb ? 'bg-[#2E7D32]' : 'bg-[#D7C7B5] dark:bg-[#4D2D26]'
              }`}
            >
              <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transition transform ${services.dineIn.enabledWeb ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-color4 hover:bg-[#522B2B] text-white font-bold text-xs shadow-coffee-sm transition"
          >
            <Save className="w-4 h-4" />
            Guardar Configuración de Servicios
          </button>
        </div>
      </form>
    </div>
  );
}
