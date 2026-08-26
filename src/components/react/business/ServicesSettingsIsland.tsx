import React, { useState } from 'react';
import { useCatalogStore } from '@/lib/useCatalogStore';
import {
  Truck,
  ShoppingBag,
  Store,
  Armchair,
  Coins,
  Save,
  CheckCircle2,
  Settings,
  HelpCircle,
  Clock,
  DollarSign,
  ShieldCheck,
  MapPin,
  Users,
  ChevronRight,
  Info
} from 'lucide-react';
import type { BusinessServiceSettings } from '@/lib/types';

export default function ServicesSettingsIsland() {
  const { business, updateBusiness, setOnboardingStepStatus, isLoaded } = useCatalogStore();
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

  if (!isLoaded) return <div className="text-slate-400 text-sm">Cargando configuración de servicios...</div>;

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

  const handleTableDineInToggle = () => {
    setServices((prev) => ({
      ...prev,
      tableDineIn: {
        ...prev.tableDineIn,
        enabledPos: !prev.tableDineIn.enabledPos,
      },
    }));
  };

  const handleTipsToggle = (key: 'enabledWeb' | 'enabledPos') => {
    setServices((prev) => ({
      ...prev,
      tips: {
        ...prev.tips,
        [key]: !prev.tips[key],
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBusiness({
      serviceSettings: services,
    });
    // Auto complete step 6 in onboarding
    setOnboardingStepStatus('step_service_types', true);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3500);
  };

  const currencySymbol = business.currencySymbol || '$';

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-bold mb-2">
            <Settings className="w-3.5 h-3.5" />
            Configuraciones de Canales & Servicios
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Tipos de Servicio y Canales de Venta
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Activa tus modalidades de entrega, tarifas de despacho, consumo en salón, pedidos para llevar y propinas.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-lg shadow-brand-500/25 transition shrink-0"
        >
          <Save className="w-4 h-4" />
          Guardar Cambios
        </button>
      </div>

      {savedMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm font-medium flex items-center gap-3 animate-fade-in shadow-lg shadow-emerald-500/10">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>¡Tipos de servicio y tarifas guardados con éxito! Los canales seleccionados ya están sincronizados en el menú digital y el PDV.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* 1. DELIVERY */}
        <div className="p-6 sm:p-7 rounded-3xl bg-slate-950 border border-slate-800/90 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 shadow-inner">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white tracking-tight">Delivery</h2>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    A domicilio
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Entrega a domicilio con tu propio equipo de reparto o flota externa.
                </p>
              </div>
            </div>

            {/* Main Switch */}
            <div className="flex items-center gap-3 bg-slate-900/80 px-4 py-2 rounded-2xl border border-slate-800">
              <span className="text-xs font-semibold text-slate-300">
                {services.delivery.enabledWeb ? 'Activo en menú digital' : 'Desactivado'}
              </span>
              <button
                type="button"
                onClick={() => handleDeliveryToggle('enabledWeb')}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  services.delivery.enabledWeb ? 'bg-brand-500' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    services.delivery.enabledWeb ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Channels Selection */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              Aplica para canales
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                services.delivery.enabledWeb
                  ? 'bg-brand-500/10 border-brand-500/40 text-white'
                  : 'bg-slate-900/50 border-slate-800 text-slate-400'
              }`}>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={services.delivery.enabledWeb}
                    onChange={() => handleDeliveryToggle('enabledWeb')}
                    className="w-4 h-4 rounded text-brand-500 bg-slate-900 border-slate-700 focus:ring-brand-500"
                  />
                  <div>
                    <span className="text-xs font-bold block">Canal WEB (Menú Digital)</span>
                    <span className="text-[11px] text-slate-400">Clientes piden por la web o QR</span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-brand-400">WEB</span>
              </label>

              <label className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                services.delivery.enabledPos
                  ? 'bg-brand-500/10 border-brand-500/40 text-white'
                  : 'bg-slate-900/50 border-slate-800 text-slate-400'
              }`}>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={services.delivery.enabledPos}
                    onChange={() => handleDeliveryToggle('enabledPos')}
                    className="w-4 h-4 rounded text-brand-500 bg-slate-900 border-slate-700 focus:ring-brand-500"
                  />
                  <div>
                    <span className="text-xs font-bold block">Canal PDV (Punto de Venta)</span>
                    <span className="text-[11px] text-slate-400">Cajeros crean pedidos a domicilio</span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-brand-400">PDV</span>
              </label>
            </div>
          </div>

          {/* Pricing & Fees */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Precio de servicio</span>
                <span className="text-[10px] text-slate-500">Tarifa base</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">{currencySymbol}</span>
                <input
                  type="number"
                  value={services.delivery.serviceFee}
                  onChange={(e) => handleDeliveryNumberChange('serviceFee', e.target.value)}
                  className="w-full pl-8 pr-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-500 font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Precio de embalaje</span>
                <span className="text-[10px] text-slate-500">Bolsa / Caja</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">{currencySymbol}</span>
                <input
                  type="number"
                  value={services.delivery.packagingFee}
                  onChange={(e) => handleDeliveryNumberChange('packagingFee', e.target.value)}
                  className="w-full pl-8 pr-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-500 font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Monto mín. entrega</span>
                <span className="text-[10px] text-slate-500">Pedido mínimo</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">{currencySymbol}</span>
                <input
                  type="number"
                  value={services.delivery.minOrderAmount}
                  onChange={(e) => handleDeliveryNumberChange('minOrderAmount', e.target.value)}
                  className="w-full pl-8 pr-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-500 font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Entrega gratuita desde</span>
                <span className="text-[10px] text-emerald-400 font-bold">Envío $0</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">{currencySymbol}</span>
                <input
                  type="number"
                  value={services.delivery.freeDeliveryThreshold}
                  onChange={(e) => handleDeliveryNumberChange('freeDeliveryThreshold', e.target.value)}
                  className="w-full pl-8 pr-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-500 font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Opciones avanzadas de entrega */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-brand-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Opciones para canales WEB & Coberturas
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div>
                  <span className="text-xs font-bold text-white block">Complemento obligatorio de dirección</span>
                  <span className="text-[10px] text-slate-400">Solicita piso, departamento o referencia</span>
                </div>
                <input
                  type="checkbox"
                  checked={services.delivery.requireAddressDetails}
                  onChange={() => handleDeliveryToggle('requireAddressDetails')}
                  className="w-4 h-4 rounded text-brand-500 bg-slate-800 border-slate-700 focus:ring-brand-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div>
                  <span className="text-xs font-bold text-white block">Permite pedidos programados</span>
                  <span className="text-[10px] text-slate-400">Clientes eligen fecha y hora de entrega</span>
                </div>
                <input
                  type="checkbox"
                  checked={services.delivery.scheduledOrders}
                  onChange={() => handleDeliveryToggle('scheduledOrders')}
                  className="w-4 h-4 rounded text-brand-500 bg-slate-800 border-slate-700 focus:ring-brand-500 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-semibold text-slate-300">Tiempo medio de entrega estimado:</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={services.delivery.avgDeliveryMinutes}
                  onChange={(e) => handleDeliveryNumberChange('avgDeliveryMinutes', e.target.value)}
                  className="w-20 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-bold text-center"
                />
                <span className="text-xs text-slate-400">minutos</span>
              </div>
            </div>
          </div>
        </div>


        {/* 2. PARA LLEVAR (TAKEAWAY) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-slate-950 border border-slate-800/90 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 shadow-inner">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white tracking-tight">Para llevar</h2>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Pick-up / Retiro
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Tus clientes recogen su pedido directamente en el local.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-900/80 px-4 py-2 rounded-2xl border border-slate-800">
              <span className="text-xs font-semibold text-slate-300">
                {services.takeaway.enabledWeb ? 'Activo en menú digital' : 'Desactivado'}
              </span>
              <button
                type="button"
                onClick={() => handleTakeawayToggle('enabledWeb')}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  services.takeaway.enabledWeb ? 'bg-amber-500' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    services.takeaway.enabledWeb ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
              services.takeaway.enabledWeb
                ? 'bg-amber-500/10 border-amber-500/40 text-white'
                : 'bg-slate-900/50 border-slate-800 text-slate-400'
            }`}>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={services.takeaway.enabledWeb}
                  onChange={() => handleTakeawayToggle('enabledWeb')}
                  className="w-4 h-4 rounded text-amber-500 bg-slate-900 border-slate-700 focus:ring-amber-500"
                />
                <span className="text-xs font-bold">Activo en menú digital (WEB)</span>
              </div>
            </label>

            <label className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
              services.takeaway.enabledPos
                ? 'bg-amber-500/10 border-amber-500/40 text-white'
                : 'bg-slate-900/50 border-slate-800 text-slate-400'
            }`}>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={services.takeaway.enabledPos}
                  onChange={() => handleTakeawayToggle('enabledPos')}
                  className="w-4 h-4 rounded text-amber-500 bg-slate-900 border-slate-700 focus:ring-amber-500"
                />
                <span className="text-xs font-bold">Activo en PDV / Caja</span>
              </div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs font-medium text-slate-300">Tiempo estimado de preparación para retiro:</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={services.takeaway.avgPrepMinutes}
                onChange={(e) => handleTakeawayNumberChange(e.target.value)}
                className="w-20 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-bold text-center"
              />
              <span className="text-xs text-slate-400">minutos</span>
            </div>
          </div>
        </div>


        {/* 3. EN EL LOCAL */}
        <div className="p-6 sm:p-7 rounded-3xl bg-slate-950 border border-slate-800/90 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-inner">
                <Store className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white tracking-tight">En el local</h2>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Mostrador / Barra
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Tus clientes consumen directamente en tu establecimiento (ej. pedidos en barra o mostrador).
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-900/80 px-4 py-2 rounded-2xl border border-slate-800">
              <span className="text-xs font-semibold text-slate-300">
                {services.dineIn.enabledWeb ? 'Activo en menú digital' : 'Desactivado'}
              </span>
              <button
                type="button"
                onClick={() => handleDineInToggle('enabledWeb')}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  services.dineIn.enabledWeb ? 'bg-emerald-500' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    services.dineIn.enabledWeb ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
              services.dineIn.enabledWeb
                ? 'bg-emerald-500/10 border-emerald-500/40 text-white'
                : 'bg-slate-900/50 border-slate-800 text-slate-400'
            }`}>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={services.dineIn.enabledWeb}
                  onChange={() => handleDineInToggle('enabledWeb')}
                  className="w-4 h-4 rounded text-emerald-500 bg-slate-900 border-slate-700 focus:ring-emerald-500"
                />
                <span className="text-xs font-bold">Activo en menú digital (WEB)</span>
              </div>
            </label>

            <label className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
              services.dineIn.enabledPos
                ? 'bg-emerald-500/10 border-emerald-500/40 text-white'
                : 'bg-slate-900/50 border-slate-800 text-slate-400'
            }`}>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={services.dineIn.enabledPos}
                  onChange={() => handleDineInToggle('enabledPos')}
                  className="w-4 h-4 rounded text-emerald-500 bg-slate-900 border-slate-700 focus:ring-emerald-500"
                />
                <span className="text-xs font-bold">Activo en PDV / Mostrador</span>
              </div>
            </label>
          </div>
        </div>


        {/* 4. EN MESA (SOLO PDV) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-slate-950 border border-slate-800/90 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0 shadow-inner">
                <Armchair className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white tracking-tight">En mesa ( solo PDV )</h2>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    Meseros / Salón
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Tus clientes consumen en el salón y los meseros asignan comandas por número de mesa.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-900/80 px-4 py-2 rounded-2xl border border-slate-800">
              <span className="text-xs font-semibold text-slate-300">
                {services.tableDineIn.enabledPos ? 'Activo en PDV' : 'Desactivado'}
              </span>
              <button
                type="button"
                onClick={handleTableDineInToggle}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  services.tableDineIn.enabledPos ? 'bg-purple-500' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    services.tableDineIn.enabledPos ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          <label className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition ${
            services.tableDineIn.enabledPos
              ? 'bg-purple-500/10 border-purple-500/40 text-white'
              : 'bg-slate-900/50 border-slate-800 text-slate-400'
          }`}>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={services.tableDineIn.enabledPos}
                onChange={handleTableDineInToggle}
                className="w-4 h-4 rounded text-purple-500 bg-slate-900 border-slate-700 focus:ring-purple-500"
              />
              <div>
                <span className="text-xs font-bold block">Habilitar asignación de mesas en Punto de Venta (PDV)</span>
                <span className="text-[11px] text-slate-400">Control de apertura de mesas, adición de platos y cobro por separado</span>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-purple-400">SALÓN</span>
          </label>
        </div>


        {/* 5. PROPINAS */}
        <div className="p-6 sm:p-7 rounded-3xl bg-slate-950 border border-slate-800/90 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-500/15 border border-brand-500/30 flex items-center justify-center text-brand-400 shrink-0 shadow-inner">
                <Coins className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white tracking-tight">Propinas</h2>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30">
                    Gratificación
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Permite a tus clientes dejar propina voluntaria al pagar en línea o en caja.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-900/80 px-4 py-2 rounded-2xl border border-slate-800">
              <span className="text-xs font-semibold text-slate-300">
                {services.tips.enabledWeb ? 'Activo en menú digital' : 'Desactivado'}
              </span>
              <button
                type="button"
                onClick={() => handleTipsToggle('enabledWeb')}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  services.tips.enabledWeb ? 'bg-brand-500' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    services.tips.enabledWeb ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
              services.tips.enabledWeb
                ? 'bg-brand-500/10 border-brand-500/40 text-white'
                : 'bg-slate-900/50 border-slate-800 text-slate-400'
            }`}>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={services.tips.enabledWeb}
                  onChange={() => handleTipsToggle('enabledWeb')}
                  className="w-4 h-4 rounded text-brand-500 bg-slate-900 border-slate-700 focus:ring-brand-500"
                />
                <span className="text-xs font-bold">Activo en checkout de Menú Digital (WEB)</span>
              </div>
            </label>

            <label className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
              services.tips.enabledPos
                ? 'bg-brand-500/10 border-brand-500/40 text-white'
                : 'bg-slate-900/50 border-slate-800 text-slate-400'
            }`}>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={services.tips.enabledPos}
                  onChange={() => handleTipsToggle('enabledPos')}
                  className="w-4 h-4 rounded text-brand-500 bg-slate-900 border-slate-700 focus:ring-brand-500"
                />
                <span className="text-xs font-bold">Activo en pantalla de cobro PDV</span>
              </div>
            </label>
          </div>

          {/* Sugerencias de propina */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-white block">Botones de propina rápida sugerida</span>
              <span className="text-[10px] text-slate-400">Valores rápidos calculados sobre el subtotal del pedido</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs font-bold text-brand-400">5%</span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs font-bold text-brand-400">10%</span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs font-bold text-brand-400">15%</span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300">Otro</span>
            </div>
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-brand-500 to-amber-500 hover:from-brand-600 hover:to-amber-600 text-white font-extrabold text-sm shadow-xl shadow-brand-500/25 transition transform hover:scale-[1.02]"
          >
            <Save className="w-4 h-4" />
            Guardar Todas las Configuraciones
          </button>
        </div>
      </form>
    </div>
  );
}
