import React, { useState } from 'react';
import QRCode from 'qrcode';
import { useCatalogStore } from '@/lib/useCatalogStore';
import { 
  QrCode, 
  Share2, 
  Download, 
  ExternalLink, 
  Globe, 
  Sliders, 
  Check, 
  Copy, 
  AlertTriangle, 
  Store, 
  Utensils, 
  BookOpen, 
  Settings, 
  X,
  Smartphone,
  ChevronRight,
  Printer
} from 'lucide-react';

export default function QRGeneratorIsland() {
  const { business } = useCatalogStore();

  const [activeTab, setActiveTab] = useState<'ALL' | 'DINE_IN' | 'READ_ONLY'>('ALL');
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [downloadModalQr, setDownloadModalQr] = useState<{ title: string; url: string; dataUrl: string } | null>(null);
  const [dineInActive, setDineInActive] = useState<boolean>(true);
  const [showDomainModal, setShowDomainModal] = useState<boolean>(false);
  const [customDomain, setCustomDomain] = useState<string>('');

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://bun-cyan.vercel.app';
  const slug = business.slug || 'burger-craft';

  // URLs
  const welcomeUrl = `${origin}/menu/${slug}`;
  const productsUrl = `${origin}/menu/${slug}?view=products`;
  const readWelcomeUrl = `${origin}/menu/${slug}?type=read`;
  const readProductsUrl = `${origin}/menu/${slug}?type=read&view=products`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(text);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const handleOpenDownloadModal = async (title: string, url: string) => {
    try {
      const dataUrl = await QRCode.toDataURL(url, {
        width: 450,
        margin: 2,
        color: {
          dark: business.primaryColor || '#0074FF',
          light: '#FFFFFF',
        },
      });
      setDownloadModalQr({ title, url, dataUrl });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl font-black text-white">Mis enlaces y códigos QR</h1>
      </div>

      {/* Banner 1: Cambia tu enlace a un dominio .com */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center justify-center text-lg shrink-0">
            🔗
          </div>
          <div>
            <p className="text-xs sm:text-sm font-semibold text-slate-200">
              Cambia tu enlace <strong className="text-white">"bun.app"</strong> a un dominio <strong className="text-white">".com"</strong> para que tus clientes lo recuerden fácilmente.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setShowDomainModal(true)}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition whitespace-nowrap flex items-center justify-center gap-1.5"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Obtén tu propio dominio ".com"</span>
          </button>
          
          <span className="text-xs text-slate-500 font-bold hidden sm:inline">o</span>

          <a
            href="/admin/business"
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs border border-slate-700 hover:border-slate-600 transition whitespace-nowrap text-center"
          >
            Cambiar mi enlace
          </a>
        </div>
      </div>

      {/* BLOQUE 1: Pedidos de todo tipos */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 shadow-xl space-y-6">
        
        {/* Header Bloque 1 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300">
              📑
            </div>
            <h2 className="text-base sm:text-lg font-black text-white">Pedidos de todo tipos</h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              🛵 Delivery Activo
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              🛍️ Retiro Activo
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              🍽️ En el local Activo
            </span>

            <a
              href="/admin/business"
              className="text-xs font-bold text-brand-400 hover:text-brand-300 flex items-center gap-1 ml-2"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Configuración</span>
            </a>
          </div>
        </div>

        {/* Dos Mockups con Teléfonos Dinámicos del Cliente */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Card Izquierda: Página de bienvenida */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700 transition">
            
            {/* Phone Mini Mockup (Bienvenida) */}
            <div className="w-40 h-64 bg-black rounded-[28px] p-2 border-2 border-slate-700 shadow-2xl shrink-0 flex flex-col justify-between overflow-hidden">
              <div className="p-2.5 bg-slate-950 rounded-[22px] h-full flex flex-col items-center justify-between text-center relative overflow-hidden">
                {/* Top Banner */}
                <div className="w-full h-12 bg-slate-900 rounded-lg overflow-hidden absolute top-0 inset-x-0 opacity-40">
                  {business.bannerUrl && <img src={business.bannerUrl} alt="Cover" className="w-full h-full object-cover" />}
                </div>

                <div className="space-y-1 mt-6 relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border-2 border-slate-800 mx-auto flex items-center justify-center text-sm overflow-hidden shadow">
                    {business.logoUrl ? (
                      <img src={business.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                    ) : (
                      <span>🍔</span>
                    )}
                  </div>
                  <p className="text-[11px] font-black text-white truncate max-w-[120px]">{business.name || 'Burger Craft'}</p>
                  <p className="text-[8px] text-emerald-400 font-bold">● Abierto ahora</p>
                </div>

                <div className="space-y-1 w-full relative z-10">
                  <a
                    href={welcomeUrl}
                    target="_blank"
                    className="w-full py-1.5 bg-brand-500 hover:bg-brand-600 rounded-lg text-[10px] font-bold text-white shadow block"
                  >
                    Ver Menú 🍔
                  </a>
                  <p className="text-[8px] text-slate-500 font-mono truncate">bun.app/menu/{slug}</p>
                </div>
              </div>
            </div>

            {/* Content & Actions */}
            <div className="flex-1 space-y-3 text-center sm:text-left">
              <div>
                <h3 className="text-base font-bold text-white">Página de bienvenida</h3>
                <a
                  href={welcomeUrl}
                  target="_blank"
                  className="text-xs font-semibold text-brand-400 hover:underline break-all block mt-0.5"
                >
                  {welcomeUrl}
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => copyToClipboard(welcomeUrl)}
                  className="px-3.5 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink === welcomeUrl ? '¡Copiado!' : 'Compartir'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenDownloadModal('Página de Bienvenida', welcomeUrl)}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs border border-slate-700 flex items-center gap-1.5 transition"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Descargar QR</span>
                </button>
              </div>
            </div>

          </div>

          {/* Card Derecha: Página de productos */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700 transition">
            
            {/* Phone Mini Mockup (Productos) */}
            <div className="w-40 h-64 bg-black rounded-[28px] p-2 border-2 border-slate-700 shadow-2xl shrink-0 flex flex-col justify-between overflow-hidden">
              <div className="p-2.5 bg-slate-950 rounded-[22px] h-full flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 pb-1 border-b border-slate-900">
                    <div className="w-4 h-4 rounded bg-brand-500 text-[8px] flex items-center justify-center text-white font-bold">🍔</div>
                    <span className="text-[9px] font-bold text-white truncate">{business.name || 'Menú'}</span>
                  </div>
                  
                  <div className="p-1.5 bg-slate-900/80 rounded-lg border border-slate-800 space-y-0.5 text-left">
                    <p className="text-[8px] font-bold text-white truncate">Doble Smash Burger</p>
                    <p className="text-[8px] font-black text-brand-400">$6.990</p>
                  </div>
                  
                  <div className="p-1.5 bg-slate-900/80 rounded-lg border border-slate-800 space-y-0.5 text-left">
                    <p className="text-[8px] font-bold text-white truncate">Papas Rústicas Crispy</p>
                    <p className="text-[8px] font-black text-brand-400">$2.990</p>
                  </div>
                </div>

                <a
                  href={productsUrl}
                  target="_blank"
                  className="w-full py-1.5 bg-emerald-600 rounded-lg text-[9px] font-bold text-white text-center shadow"
                >
                  Pedir por WhatsApp 💬
                </a>
              </div>
            </div>

            {/* Content & Actions */}
            <div className="flex-1 space-y-3 text-center sm:text-left">
              <div>
                <h3 className="text-base font-bold text-white">Página de productos</h3>
                <a
                  href={productsUrl}
                  target="_blank"
                  className="text-xs font-semibold text-brand-400 hover:underline break-all block mt-0.5"
                >
                  {productsUrl}
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => copyToClipboard(productsUrl)}
                  className="px-3.5 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink === productsUrl ? '¡Copiado!' : 'Compartir'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenDownloadModal('Página de Productos', productsUrl)}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs border border-slate-700 flex items-center gap-1.5 transition"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Descargar QR</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* BLOQUE 2: Solo pedidos en el local */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 shadow-xl space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300">
              🛎️
            </div>
            <h2 className="text-base sm:text-lg font-black text-white">Solo pedidos en el local</h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setDineInActive(!dineInActive)}
              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border transition ${
                dineInActive
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${dineInActive ? 'bg-emerald-400' : 'bg-rose-400'}`}></span>
              <span>{dineInActive ? 'Activo' : 'Inactivo'}</span>
            </button>

            <a href="/admin/business" className="text-xs font-bold text-brand-400 hover:underline">
              Configuración de pedidos
            </a>
          </div>
        </div>

        {/* Warning Banner */}
        {!dineInActive && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <p>
              Tu menú digital para pedidos en el local está pausado. ¡Para habilitar los pedidos en mesa, haz clic en activar!
            </p>
          </div>
        )}

        {/* Local QR Features & Actions */}
        <div className="space-y-3">
          <h3 className="text-sm font-extrabold text-white">
            ¡Descarga QR's específicos para servicio en el local (Mesas, habitaciones o Barra)!
          </h3>
          <ul className="space-y-1 text-xs text-slate-400">
            <li>• Perfecto para que restaurantes ofrezcan pedidos desde la mesa sin esperar atención de meseros.</li>
            <li>• Tus clientes hacen pedidos de forma remota y llegan en tiempo real al Tablero de Cocina KDS.</li>
            <li>• Acepta pagos y pedidos organizados por zona o número de mesa.</li>
          </ul>

          <div className="pt-3 flex flex-wrap gap-3">
            <a
              href="/admin/qr"
              onClick={(e) => {
                e.preventDefault();
                handleOpenDownloadModal('Código QR Mesa 1', `${welcomeUrl}?mesa=1`);
              }}
              className="px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition"
            >
              Configurar mis QR en el local
            </a>

            <button
              type="button"
              onClick={() => handleOpenDownloadModal('QR Salón Principal', `${welcomeUrl}?zona=salon`)}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs border border-slate-700 transition"
            >
              Añadir zonas y QR's
            </button>
          </div>
        </div>
      </div>

      {/* BLOQUE 3: Solo lectura */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800/80">
          <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300">
            📖
          </div>
          <h2 className="text-base sm:text-lg font-black text-white">Solo lectura</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Image Mockup (Hand holding phone / Coffee) */}
          <div className="lg:col-span-5 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl relative group">
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=700&q=80"
              alt="Cliente viendo menú"
              className="w-full h-56 object-cover opacity-80 group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-4">
              <div className="space-y-1">
                <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-amber-500 text-slate-950">
                  MODO CARTA / LECTURA
                </span>
                <p className="text-xs font-bold text-white">Menú informativo sin carrito de compra</p>
              </div>
            </div>
          </div>

          {/* Right Info & Links */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <h3 className="text-lg font-black text-white">¡Usa tu menú digital en modo solo lectura!</h3>
              <p className="text-xs text-slate-400 mt-1">
                Muestra códigos QR que permiten a los clientes ver el menú, fotos y precios pero no realizar pedidos digitales.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Bienvenida Read Only */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-white">Página de bienvenida</h4>
                <p className="text-[11px] font-mono text-slate-400 truncate">{readWelcomeUrl}</p>
                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => copyToClipboard(readWelcomeUrl)}
                    className="flex-1 py-1.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-bold text-[11px] flex items-center justify-center gap-1 shadow-sm"
                  >
                    <Share2 className="w-3 h-3" />
                    <span>{copiedLink === readWelcomeUrl ? '¡Copiado!' : 'Compartir'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOpenDownloadModal('Bienvenida (Solo Lectura)', readWelcomeUrl)}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-[11px] border border-slate-700"
                  >
                    <QrCode className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Productos Read Only */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-white">Página de productos</h4>
                <p className="text-[11px] font-mono text-slate-400 truncate">{readProductsUrl}</p>
                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => copyToClipboard(readProductsUrl)}
                    className="flex-1 py-1.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-bold text-[11px] flex items-center justify-center gap-1 shadow-sm"
                  >
                    <Share2 className="w-3 h-3" />
                    <span>{copiedLink === readProductsUrl ? '¡Copiado!' : 'Compartir'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOpenDownloadModal('Productos (Solo Lectura)', readProductsUrl)}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-[11px] border border-slate-700"
                  >
                    <QrCode className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* MODAL DE DESCARGA DE QR */}
      {downloadModalQr && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-sm w-full p-6 space-y-6 shadow-2xl animate-scale-in text-center">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="font-extrabold text-white text-sm">{downloadModalQr.title}</h3>
              <button
                onClick={() => setDownloadModalQr(null)}
                className="p-1 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 bg-white rounded-2xl inline-block shadow-inner">
              <img src={downloadModalQr.dataUrl} alt="QR" className="w-48 h-48 mx-auto" />
            </div>

            <p className="text-xs font-mono text-slate-400 break-all">{downloadModalQr.url}</p>

            <div className="flex gap-2">
              <a
                href={downloadModalQr.dataUrl}
                download={`qr-${slug}.png`}
                className="flex-1 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-xs shadow-md shadow-brand-500/25 flex items-center justify-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Descargar PNG</span>
              </a>

              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 flex items-center justify-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE DOMINIO .COM */}
      {showDomainModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl animate-scale-in">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="font-extrabold text-white text-sm flex items-center gap-2">
                <Globe className="w-4 h-4 text-brand-400" />
                Conectar Dominio Personalizado
              </h3>
              <button
                onClick={() => setShowDomainModal(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <p>
                Puedes usar tu propio dominio (ej. <strong>burgercraft.com</strong> o <strong>burgercraft.cl</strong>) para que tus clientes no vean enlaces de terceros.
              </p>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Tu Dominio</label>
                <input
                  type="text"
                  placeholder="tudominio.com"
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 font-mono text-[11px]">
                <p className="text-brand-400 font-bold">Configuración DNS requerida:</p>
                <p className="text-slate-400">Tipo: <strong className="text-white">CNAME</strong></p>
                <p className="text-slate-400">Host: <strong className="text-white">@ / www</strong></p>
                <p className="text-slate-400">Valor: <strong className="text-white">cname.vercel-dns.com</strong> (o IP VPS)</p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowDomainModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
              >
                Cerrar
              </button>
              <button
                type="button"
                onClick={() => {
                  alert('Dominio guardado. La propagación DNS puede tomar hasta 24 horas.');
                  setShowDomainModal(false);
                }}
                className="px-5 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-xs shadow-md shadow-brand-500/25"
              >
                Guardar Dominio
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
