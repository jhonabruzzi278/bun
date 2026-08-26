import React, { useState } from 'react';
import { useCatalogStore } from '@/lib/useCatalogStore';
import {
  ShoppingBag,
  Receipt,
  Bot,
  QrCode,
  Smartphone,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Download,
  MessageSquare,
  Sparkles,
  ExternalLink,
  Layers,
  ArrowRight,
  Truck,
  Armchair,
  Coins,
  MapPin,
  Plus,
  UserPlus,
  Compass,
  Check,
  RotateCcw,
  Store,
  DollarSign
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
  const [businessAddress, setBusinessAddress] = useState('El Toril 0214, 9582552 Melipilla, Región Metropolitana, Chile');

  // WhatsApp and Menu order settings
  const [whatsappPhone, setWhatsappPhone] = useState('938980598');
  const [ordersChannelWeb, setOrdersChannelWeb] = useState(true);

  if (!isLoaded) return <div className="text-slate-400 text-sm">Cargando configuración general...</div>;

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
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Configuración general
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Gestiona los canales donde vendes, tus modalidades de entrega, repartidores y herramientas de crecimiento.
        </p>
      </div>

      {savedToast && (
        <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-fade-in shadow-lg">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>¡Configuración actualizada y sincronizada en tiempo real!</span>
        </div>
      )}

      {/* Tabs Bar (OlaClick Style) */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-0 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('CHANNELS')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap ${
            activeTab === 'CHANNELS'
              ? 'border-brand-500 text-brand-400 bg-brand-500/10 rounded-t-xl'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
          }`}
        >
          Canales de venta
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('SERVICES')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap ${
            activeTab === 'SERVICES'
              ? 'border-brand-500 text-brand-400 bg-brand-500/10 rounded-t-xl'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
          }`}
        >
          Tipos de servicio
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('COVERAGE')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap ${
            activeTab === 'COVERAGE'
              ? 'border-brand-500 text-brand-400 bg-brand-500/10 rounded-t-xl'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
          }`}
        >
          Coberturas y repartidores
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('GROWTH')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap ${
            activeTab === 'GROWTH'
              ? 'border-brand-500 text-brand-400 bg-brand-500/10 rounded-t-xl'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
          }`}
        >
          Impulso de ventas
        </button>
      </div>

      {/* TAB 1: CANALES DE VENTA */}
      {activeTab === 'CHANNELS' && (
        <div className="space-y-4">
          {/* Card 1: Menú digital (WEB) */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700/80 transition-all shadow-md space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">Menú digital</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                      WEB
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      Activo
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 max-w-xl">
                    Tus clientes acceden a tu sitio web (código QR o enlace) para ver tu menú y hacer pedidos.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-center">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-300">Recibir pedidos</span>
                  <button
                    type="button"
                    onClick={handleToggleReceiveOrders}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      business.isOpen ? 'bg-brand-500' : 'bg-slate-700'
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
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition"
                  title="Abrir menú digital"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Menu digital extra details from screenshot */}
            <div className="pt-3 border-t border-slate-850 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400 block font-medium mb-1">Enlace de menú digital:</span>
                <a
                  href={`/menu/${business.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-400 font-semibold hover:underline flex items-center gap-1 truncate"
                >
                  <span>https://jonathan-guerra.ola.click/products</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block font-medium mb-0.5">WhatsApp para pedidos:</span>
                  <span className="font-bold text-white tracking-wide">{whatsappPhone}</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Conectado
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Punto de venta (PDV) */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700/80 transition-all shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                  <Receipt className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">Punto de venta</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                      PDV
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      Activo
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 max-w-xl">
                    Tu equipo registra los pedidos manualmente desde el panel.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white text-xs font-semibold border border-slate-800 hover:border-slate-700 transition"
                >
                  <Download className="w-3.5 h-3.5 text-brand-400" />
                  <span>Descargar app para meseros</span>
                  <span className="text-[9px] uppercase font-extrabold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Pronto
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Chatbot de WhatsApp */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700/80 transition-all shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">Chatbot de WhatsApp</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                      CHATBOT
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                      Inactivo
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 max-w-xl">
                    Tus clientes piden por WhatsApp, el chatbot los atiende y notifica sobre el estado del pedido.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <a
                  href="/admin/business#whatsapp"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-brand-400 hover:text-brand-300 text-xs font-bold border border-brand-500/30 hover:border-brand-500/50 transition"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Ir a chat</span>
                </a>
              </div>
            </div>
          </div>

          {/* Card 4: Pedidos por QR */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700/80 transition-all shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">Pedidos por QR</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                      QR
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      Activo
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 max-w-xl">
                    Tus clientes escanean un QR para realizar su pedido en el menu digital.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <a
                  href="/admin/qr"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold border border-slate-800 hover:border-slate-700 transition"
                >
                  <span>Generar Códigos QR</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Card 5: Aplicativos de comida (Apps delivery) */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700/80 transition-all shadow-md space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">Aplicativos de comida</h3>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                      Inactivo
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 max-w-xl">
                    Recibe y gestiona en BUN los pedidos de tus apps conectadas.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => alert('Próximamente disponible: Conexión con Rappi, PedidosYa, DiDi Food y Uber Eats.')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-brand-400 hover:text-brand-300 text-xs font-bold border border-brand-500/30 hover:border-brand-500/50 transition"
                >
                  <span>Ir a integraciones</span>
                </button>
              </div>
            </div>

            {/* Apps Banner from Prompt */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-3">
              <h4 className="text-xs font-bold text-white">Conecta tus aplicaciones de delivery gratis en BUN:</h4>
              <ul className="text-xs text-slate-300 space-y-1.5">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Recibe y gestiona los pedidos de todas las aplicaciones de delivery en un solo lugar.</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Mira todos tus pedidos, los propios y los de las aplicaciones, juntos en el mismo mapa.</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Evita errores y confusiones, para que nada se te pase.</span>
                </li>
              </ul>
              <div className="flex items-center gap-3 pt-2">
                <span className="px-2.5 py-1 rounded-lg bg-red-500/10 border border-red-500/20 text-[11px] font-black text-red-400">Rappi</span>
                <span className="px-2.5 py-1 rounded-lg bg-red-600/10 border border-red-600/20 text-[11px] font-black text-red-500">PedidosYa</span>
                <span className="px-2.5 py-1 rounded-lg bg-orange-500/10 border border-orange-500/20 text-[11px] font-black text-orange-400">DiDi Food</span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-black text-emerald-400">Uber Eats</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TIPOS DE SERVICIO */}
      {activeTab === 'SERVICES' && (
        <ServicesSettingsIsland />
      )}

      {/* TAB 3: COBERTURAS Y REPARTIDORES (Exact replica of prompt) */}
      {activeTab === 'COVERAGE' && (
        <div className="space-y-6">
          {/* Card: Dirección del negocio */}
          <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Dirección del negocio</h3>
                  <p className="text-xs text-slate-400">Ubicación de tu negocio y punto de origen de tus envíos.</p>
                </div>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200">
              {businessAddress}
            </div>
          </div>

          {/* Card: Precios y cobertura de envío */}
          <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 shadow-xl space-y-5">
            <div>
              <h3 className="text-base font-bold text-white">Configurar precios y cobertura de envío</h3>
              <p className="text-xs text-slate-400 mt-0.5">Selecciona el método de cálculo de costo de envío para tus clientes.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {[
                {
                  id: 'NONE',
                  title: 'Sin precio',
                  desc: 'Ofrece envío gratuito a tus clientes',
                  badge: 'Envío $0',
                },
                {
                  id: 'FIXED',
                  title: 'Precio fijo',
                  desc: 'El mismo precio de envío se aplica a todos los pedidos',
                  badge: `${business.currencySymbol}1.500`,
                },
                {
                  id: 'NEIGHBORHOOD',
                  title: 'Barrio de destino',
                  desc: 'El precio varía según el barrio de destino',
                  badge: 'Por zona',
                },
                {
                  id: 'DISTANCE',
                  title: 'Distancia recorrida',
                  desc: 'El cliente paga de acuerdo a los kilómetros recorridos',
                  badge: 'Por km',
                },
                {
                  id: 'POLYGON',
                  title: 'Áreas personalizadas',
                  desc: 'Define áreas específicas dibujadas en el mapa para calcular el precio',
                  badge: 'Mapa',
                },
                {
                  id: 'RANGES',
                  title: 'Rangos personalizados',
                  desc: 'Calcula el precio basado en la distancia desde tu negocio (0-3km, 3-6km)',
                  badge: 'Rangos',
                },
              ].map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => setCoverageType(opt.id as any)}
                  className={`p-4 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${
                    coverageType === opt.id
                      ? 'bg-brand-500/10 border-brand-500 text-white shadow-md shadow-brand-500/10'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{opt.title}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        coverageType === opt.id ? 'bg-brand-500/20 text-brand-300' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {opt.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{opt.desc}</p>
                  </div>
                  {coverageType === opt.id && (
                    <div className="mt-3 pt-2 border-t border-brand-500/20 flex items-center gap-1.5 text-[11px] text-brand-400 font-bold">
                      <Check className="w-3.5 h-3.5" />
                      <span>Seleccionado</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Card: Repartidores Propios (Own Riders) */}
          <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Repartidores propios</h3>
                <p className="text-xs text-slate-400 mt-0.5">Agrégalos para asignarlos a tus pedidos y crear rutas para entregas más rápidas.</p>
              </div>

              <a
                href="/admin/team"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold shadow-sm transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Agregar Repartidor</span>
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-dashed border-slate-800 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-slate-800 mx-auto flex items-center justify-center text-slate-400">
                <Truck className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-white">Aún no tienes repartidores propios asignados</p>
              <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
                Crea usuarios con rol «Repartidor» en la sección de Equipo para coordinar despachos en tiempo real.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: IMPULSO DE VENTAS (Exact replica from prompt) */}
      {activeTab === 'GROWTH' && (
        <div className="space-y-6">
          {/* Growth Card 1: Incrementa el carrito de tus clientes */}
          <div className="p-6 sm:p-7 rounded-3xl bg-slate-950 border border-slate-800 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Incrementa el carrito de tus clientes (Cross-selling)
                  </h3>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">WEB</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">QR</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">TOTEM</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-1 max-w-xl">
                  Aumenta tu ticket promedio, recomendando automáticamente productos adicionales en el carrito de compras.
                </p>
              </div>

              <div className="flex items-center gap-3 bg-slate-900/80 px-4 py-2 rounded-2xl border border-slate-800 self-end sm:self-center">
                <span className="text-xs font-semibold text-slate-300">
                  {upsellingActive ? 'Activo' : 'Inactivo'}
                </span>
                <button
                  type="button"
                  onClick={() => setUpsellingActive(!upsellingActive)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    upsellingActive ? 'bg-brand-500' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                      upsellingActive ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* How it works steps */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">¿Cómo funciona?</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <div className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 font-extrabold text-xs flex items-center justify-center mb-2">
                    1
                  </div>
                  <h5 className="text-xs font-bold text-white">El cliente llena su carrito</h5>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    El sistema analiza los productos agregados y selecciona otros productos para sugerir.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <div className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 font-extrabold text-xs flex items-center justify-center mb-2">
                    2
                  </div>
                  <h5 className="text-xs font-bold text-white">Se muestran productos sugeridos</h5>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Al final del carrito, el cliente verá productos ideales para acompañar su compra (bebidas, postres, salsas).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <div className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 font-extrabold text-xs flex items-center justify-center mb-2">
                    3
                  </div>
                  <h5 className="text-xs font-bold text-white">Incrementa tu ticket promedio</h5>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Cada cliente puede añadir más productos fácilmente, aumentando el valor de cada pedido en +15%.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Growth Card 2: Sugiere a tus clientes lo último que pidieron */}
          <div className="p-6 sm:p-7 rounded-3xl bg-slate-950 border border-slate-800 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Sugiere a tus clientes lo último que pidieron (Re-order rápido)
                  </h3>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">WEB</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">QR</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">TOTEM</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-1 max-w-xl">
                  Mejora la experiencia de tus clientes sugiriendo sus productos favoritos para que repitan sus pedidos en segundos.
                </p>
              </div>

              <div className="flex items-center gap-3 bg-slate-900/80 px-4 py-2 rounded-2xl border border-slate-800 self-end sm:self-center">
                <span className="text-xs font-semibold text-slate-300">
                  {reorderSuggestActive ? 'Activo' : 'Inactivo'}
                </span>
                <button
                  type="button"
                  onClick={() => setReorderSuggestActive(!reorderSuggestActive)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    reorderSuggestActive ? 'bg-brand-500' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                      reorderSuggestActive ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* How it works steps */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">¿Cómo funciona?</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 font-extrabold text-xs flex items-center justify-center mb-2">
                    1
                  </div>
                  <h5 className="text-xs font-bold text-white">Reconocimiento inteligente</h5>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    El sistema identifica los pedidos anteriores del cliente por teléfono o cookie de sesión.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 font-extrabold text-xs flex items-center justify-center mb-2">
                    2
                  </div>
                  <h5 className="text-xs font-bold text-white">Activación simple</h5>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Muestra la opción «Lo último que pediste», que permite seleccionar automáticamente las opciones de su último pedido.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 font-extrabold text-xs flex items-center justify-center mb-2">
                    3
                  </div>
                  <h5 className="text-xs font-bold text-white">Fidelización</h5>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Tus clientes se sienten recordados y completan su pedido en segundos, mejorando su experiencia de compra.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
