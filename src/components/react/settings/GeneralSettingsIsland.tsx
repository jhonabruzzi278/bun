import React, { useState } from 'react';
import { useCatalogStore } from '@/lib/useCatalogStore';
import {
  ShoppingBag,
  Receipt,
  Smartphone,
  CheckCircle2,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import ServicesSettingsIsland from '../business/ServicesSettingsIsland';

type SettingsTab = 'CHANNELS' | 'SERVICES' | 'COVERAGE' | 'GROWTH';

export default function GeneralSettingsIsland() {
  const { business, updateBusiness, isLoaded } = useCatalogStore();
  const [activeTab, setActiveTab] = useState<SettingsTab>('CHANNELS');
  const [savedToast, setSavedToast] = useState(false);

  // Growth Toggles
  const [upsellingActive, setUpsellingActive] = useState(true);
  const [reorderSuggestActive, setReorderSuggestActive] = useState(true);

  // Coverage pricing method
  const [coverageType, setCoverageType] = useState<'NONE' | 'FIXED' | 'NEIGHBORHOOD' | 'DISTANCE' | 'POLYGON' | 'RANGES'>('DISTANCE');
  const [fixedFee, setFixedFee] = useState(1500);
  const [perKmFee, setPerKmFee] = useState(450);

  if (!isLoaded) return <div className="text-[#8C7E73] dark:text-[#A8988B] text-sm">Cargando configuración general...</div>;

  const handleToggleReceiveOrders = () => {
    updateBusiness({
      isOpen: !business.isOpen,
    });
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-coffee-950 dark:text-white tracking-tight">
          Configuración General
        </h1>
        <p className="text-xs sm:text-sm text-[#70645A] dark:text-[#A8988B] mt-1">
          Gestiona los canales donde vendes, tus modalidades de entrega, repartidores y herramientas de crecimiento.
        </p>
      </div>

      {savedToast && (
        <div className="p-3.5 rounded-xl bg-[#E7F3E8] dark:bg-[#1A3320] border border-[#D0EBD2] dark:border-[#2C5935] text-[#2E7D32] dark:text-[#4ADE80] text-xs font-semibold flex items-center gap-2 animate-fade-in shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-[#2E7D32] dark:text-[#4ADE80] shrink-0" />
          <span>¡Configuración actualizada y sincronizada en tiempo real!</span>
        </div>
      )}

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-[#EAE1D6] dark:border-[#3D2420] pb-0 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('CHANNELS')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap ${
            activeTab === 'CHANNELS'
              ? 'border-color4 text-color4 dark:border-color2 dark:text-color2 bg-[#FAF7F2] dark:bg-[#241512] rounded-t-xl'
              : 'border-transparent text-[#70645A] dark:text-[#A8988B] hover:text-coffee-950 dark:hover:text-white'
          }`}
        >
          Canales de venta
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('SERVICES')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap ${
            activeTab === 'SERVICES'
              ? 'border-color4 text-color4 dark:border-color2 dark:text-color2 bg-[#FAF7F2] dark:bg-[#241512] rounded-t-xl'
              : 'border-transparent text-[#70645A] dark:text-[#A8988B] hover:text-coffee-950 dark:hover:text-white'
          }`}
        >
          Tipos de servicio
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('COVERAGE')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap ${
            activeTab === 'COVERAGE'
              ? 'border-color4 text-color4 dark:border-color2 dark:text-color2 bg-[#FAF7F2] dark:bg-[#241512] rounded-t-xl'
              : 'border-transparent text-[#70645A] dark:text-[#A8988B] hover:text-coffee-950 dark:hover:text-white'
          }`}
        >
          Coberturas y tarifas
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('GROWTH')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap ${
            activeTab === 'GROWTH'
              ? 'border-color4 text-color4 dark:border-color2 dark:text-color2 bg-[#FAF7F2] dark:bg-[#241512] rounded-t-xl'
              : 'border-transparent text-[#70645A] dark:text-[#A8988B] hover:text-coffee-950 dark:hover:text-white'
          }`}
        >
          Impulso con IA
        </button>
      </div>

      {/* TAB 1: CANALES DE VENTA */}
      {activeTab === 'CHANNELS' && (
        <div className="space-y-4">
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] shadow-coffee-sm space-y-4 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] flex items-center justify-center text-color4 dark:text-color2 shrink-0">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm sm:text-base font-bold text-coffee-950 dark:text-white tracking-tight">Menú digital</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#FAF7F2] dark:bg-[#180E0C] text-coffee-950 dark:text-white border border-[#EAE1D6] dark:border-[#3D2420] font-mono">
                      WEB
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#2E7D32] dark:text-[#4ADE80] bg-[#E7F3E8] dark:bg-[#1A3320] px-2 py-0.5 rounded-full border border-[#D0EBD2] dark:border-[#2C5935]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32] dark:bg-[#4ADE80] animate-pulse"></span>
                      Activo
                    </span>
                  </div>
                  <p className="text-xs text-[#70645A] dark:text-[#A8988B] mt-1 max-w-xl">
                    Tus comensales acceden a tu sitio web (código QR o enlace) para ver tu menú y hacer pedidos.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-center">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-coffee-950 dark:text-white">Recibir pedidos</span>
                  <button
                    type="button"
                    onClick={handleToggleReceiveOrders}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      business.isOpen ? 'bg-color4' : 'bg-[#D7C7B5] dark:bg-[#4D2D26]'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                        business.isOpen ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
                <a
                  href={`/menu/${business.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] text-color4 dark:text-color2 border border-[#EAE1D6] dark:border-[#3D2420] transition"
                  title="Abrir menú digital"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="pt-3 border-t border-[#F4EFEA] dark:border-[#331C18] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420]">
                <span className="text-[#70645A] dark:text-[#A8988B] block font-medium mb-1">Enlace de la carta:</span>
                <a
                  href={`/menu/${business.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-color4 dark:text-color2 font-semibold hover:underline flex items-center gap-1 truncate"
                >
                  <span>/menu/{business.slug}</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420]">
                <span className="text-[#70645A] dark:text-[#A8988B] block font-medium mb-1">Canal de recepción:</span>
                <span className="text-coffee-950 dark:text-white font-bold">WhatsApp & Tablero KDS Cocina</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TIPOS DE SERVICIO */}
      {activeTab === 'SERVICES' && <ServicesSettingsIsland />}

      {/* TAB 3: COBERTURAS Y TARIFAS */}
      {activeTab === 'COVERAGE' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] shadow-coffee-sm space-y-4 transition-colors">
          <h3 className="font-bold text-coffee-950 dark:text-white text-base">Tarifas de Despacho por Distancia</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-coffee-950 dark:text-white mb-1">Tarifa base de entrega</label>
              <input
                type="number"
                value={fixedFee}
                onChange={(e) => setFixedFee(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-xs font-mono font-bold text-coffee-950 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-coffee-950 dark:text-white mb-1">Tarifa adicional por Km extra</label>
              <input
                type="number"
                value={perKmFee}
                onChange={(e) => setPerKmFee(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-xs font-mono font-bold text-coffee-950 dark:text-white"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: IMPULSO CON IA */}
      {activeTab === 'GROWTH' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] shadow-coffee-sm space-y-4 transition-colors">
          <div className="flex items-center gap-2 text-color4 dark:text-color2">
            <Sparkles className="w-5 h-5" />
            <h3 className="font-bold text-coffee-950 dark:text-white text-base">Sugerencias Inteligentes de Venta Cruzada (Upselling)</h3>
          </div>
          <p className="text-xs text-[#70645A] dark:text-[#A8988B]">
            La IA sugiere automáticamente bebidas o postres cuando el cliente añade una hamburguesa o plato fuerte al carrito.
          </p>
          <div className="flex items-center justify-between p-4 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420]">
            <span className="text-xs font-bold text-coffee-950 dark:text-white">Upselling Automático en Carrito</span>
            <button
              type="button"
              onClick={() => setUpsellingActive(!upsellingActive)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                upsellingActive ? 'bg-color4' : 'bg-[#D7C7B5] dark:bg-[#4D2D26]'
              }`}
            >
              <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transition transform ${upsellingActive ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
