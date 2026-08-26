import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { useCatalogStore } from '@/lib/useCatalogStore';
import { QrCode, Download, Printer, Copy, Check, Sparkles, Sliders, ExternalLink, Utensils, LayoutGrid } from 'lucide-react';

export default function QRGeneratorIsland() {
  const { business } = useCatalogStore();

  const [tableNumber, setTableNumber] = useState<string>('1');
  const [qrType, setQrType] = useState<'GENERAL' | 'TABLE' | 'DELIVERY'>('TABLE');
  const [qrColor, setQrColor] = useState<string>(business.primaryColor || '#0074FF');
  const [qrBgColor, setQrBgColor] = useState<string>('#FFFFFF');
  const [dataUrl, setDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [numberOfTables, setNumberOfTables] = useState<number>(10);
  const [multiTableQrs, setMultiTableQrs] = useState<{ table: number; dataUrl: string }[]>([]);
  const [batchMode, setBatchMode] = useState(false);

  // Generate target URL
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://bun-cyan.vercel.app';
  let targetUrl = `${origin}/menu/${business.slug || 'burger-craft'}`;

  if (qrType === 'TABLE') {
    targetUrl += `?mesa=${tableNumber}`;
  } else if (qrType === 'DELIVERY') {
    targetUrl += `?tipo=delivery`;
  }

  // Generate Single QR
  useEffect(() => {
    QRCode.toDataURL(targetUrl, {
      width: 400,
      margin: 2,
      color: {
        dark: qrColor,
        light: qrBgColor,
      },
    })
      .then((url) => setDataUrl(url))
      .catch((err) => console.error(err));
  }, [targetUrl, qrColor, qrBgColor]);

  // Generate Batch Table QRs
  useEffect(() => {
    if (!batchMode) return;

    const generateBatch = async () => {
      const results = [];
      for (let i = 1; i <= numberOfTables; i++) {
        const url = `${origin}/menu/${business.slug || 'burger-craft'}?mesa=${i}`;
        const data = await QRCode.toDataURL(url, {
          width: 300,
          margin: 2,
          color: { dark: qrColor, light: qrBgColor },
        });
        results.push({ table: i, dataUrl: data });
      }
      setMultiTableQrs(results);
    };

    generateBatch();
  }, [batchMode, numberOfTables, business.slug, qrColor, qrBgColor, origin]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(targetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 print:p-0">
      
      {/* Header (Hidden on Print) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl print:hidden">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-amber-400 flex items-center justify-center text-2xl shadow-lg shadow-brand-500/25">
            📱
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white">Generador de Códigos QR para Mesas</h1>
            <p className="text-xs text-slate-400">
              Personaliza, imprime y descarga los códigos QR para tus mesas, acrílicos o volantes.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setBatchMode(!batchMode)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              batchMode
                ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>{batchMode ? 'Modo Individual' : 'Generar Lote de Mesas (1 a N)'}</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs border border-slate-700 flex items-center gap-2 transition"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir</span>
          </button>
        </div>
      </div>

      {/* SINGLE QR MODE */}
      {!batchMode ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Form (Hidden on Print) */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 shadow-xl space-y-6 print:hidden">
            <h2 className="text-base font-extrabold text-white flex items-center gap-2 pb-3 border-b border-slate-800">
              <Sliders className="w-4 h-4 text-brand-400" />
              Configurar Código QR
            </h2>

            {/* QR Type Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Destino del Código QR</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setQrType('TABLE')}
                  className={`p-3 rounded-xl text-xs font-bold border transition text-center ${
                    qrType === 'TABLE'
                      ? 'bg-brand-500/10 border-brand-500 text-brand-400 shadow-sm'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  🍽️ Mesa Específica
                </button>

                <button
                  type="button"
                  onClick={() => setQrType('GENERAL')}
                  className={`p-3 rounded-xl text-xs font-bold border transition text-center ${
                    qrType === 'GENERAL'
                      ? 'bg-brand-500/10 border-brand-500 text-brand-400 shadow-sm'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  🌐 Menú General
                </button>

                <button
                  type="button"
                  onClick={() => setQrType('DELIVERY')}
                  className={`p-3 rounded-xl text-xs font-bold border transition text-center ${
                    qrType === 'DELIVERY'
                      ? 'bg-brand-500/10 border-brand-500 text-brand-400 shadow-sm'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  🛵 Delivery
                </button>
              </div>
            </div>

            {/* Table Number Input */}
            {qrType === 'TABLE' && (
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Número / Nombre de la Mesa</label>
                <input
                  type="text"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  placeholder="Ej. 1, 2, Terraza 5, Barra"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-bold font-mono focus:border-brand-500 focus:outline-none"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">
                  Los pedidos escaneados desde este QR llegarán automáticamente a la Cocina KDS con la etiqueta #{tableNumber}.
                </span>
              </div>
            )}

            {/* Colors */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Color del QR</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={qrColor}
                    onChange={(e) => setQrColor(e.target.value)}
                    className="w-8 h-8 rounded-lg bg-transparent border-0 cursor-pointer"
                  />
                  <span className="text-xs font-mono text-slate-400 uppercase">{qrColor}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Color de Fondo</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={qrBgColor}
                    onChange={(e) => setQrBgColor(e.target.value)}
                    className="w-8 h-8 rounded-lg bg-transparent border-0 cursor-pointer"
                  />
                  <span className="text-xs font-mono text-slate-400 uppercase">{qrBgColor}</span>
                </div>
              </div>
            </div>

            {/* Link Preview & Copy */}
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-slate-400">Enlace Destino</span>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="text-brand-400 hover:text-brand-300 font-semibold flex items-center gap-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? '¡Copiado!' : 'Copiar'}</span>
                </button>
              </div>
              <p className="text-xs font-mono text-white truncate">{targetUrl}</p>
            </div>
          </div>

          {/* Stand Acrílico / Imprimible Preview */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div
              id="printable-card"
              className="w-full max-w-sm rounded-[32px] p-8 text-center shadow-2xl border-4 border-slate-800 space-y-6 transition-all"
              style={{ backgroundColor: qrBgColor, color: qrColor === '#FFFFFF' ? '#000000' : qrColor }}
            >
              {/* Card Header */}
              <div className="space-y-1">
                <div className="w-12 h-12 rounded-2xl bg-black/5 mx-auto flex items-center justify-center text-2xl">
                  🍔
                </div>
                <h3 className="text-xl font-black tracking-tight" style={{ color: qrColor === '#FFFFFF' ? '#000' : qrColor }}>
                  {business.name || 'Burger Craft'}
                </h3>
                <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                  {qrType === 'TABLE' ? `Mesa #${tableNumber}` : qrType === 'DELIVERY' ? 'Menú Delivery' : 'Menú Digital QR'}
                </p>
              </div>

              {/* QR Image */}
              <div className="p-4 bg-white rounded-2xl shadow-inner border border-slate-200 inline-block mx-auto">
                {dataUrl && <img src={dataUrl} alt="QR Code" className="w-48 h-48 mx-auto" />}
              </div>

              {/* Call to action */}
              <div className="space-y-1 text-slate-800">
                <p className="text-sm font-black uppercase tracking-wider">Escanea con tu cámara</p>
                <p className="text-[11px] font-semibold text-slate-600">
                  Pide directamente a la cocina sin esperar mesero
                </p>
              </div>

              <div className="pt-2 text-[10px] font-mono text-slate-500">
                bun-platform.app/menu/{business.slug}
              </div>
            </div>

            {/* Action Download Buttons */}
            <div className="flex items-center gap-3 mt-6 print:hidden">
              <a
                href={dataUrl}
                download={`qr-${business.slug || 'menu'}-${qrType === 'TABLE' ? `mesa-${tableNumber}` : 'general'}.png`}
                className="px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-lg shadow-brand-500/25 flex items-center gap-2 transition active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Descargar PNG HD</span>
              </a>

              <button
                type="button"
                onClick={handlePrint}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs border border-slate-700 flex items-center gap-2 transition"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimir Tarjeta</span>
              </button>
            </div>
          </div>

        </div>
      ) : (
        /* BATCH MULTI-TABLE MODE */
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4 print:hidden">
            <div>
              <h2 className="text-base font-extrabold text-white">Generar Lote de Mesas</h2>
              <p className="text-xs text-slate-400">Genera e imprime los QR de todas tus mesas en una sola hoja.</p>
            </div>

            <div className="flex items-center gap-3">
              <label className="text-xs font-bold text-slate-300">Cantidad de Mesas:</label>
              <input
                type="number"
                min="1"
                max="50"
                value={numberOfTables}
                onChange={(e) => setNumberOfTables(Number(e.target.value) || 1)}
                className="w-20 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-bold text-center"
              />
            </div>
          </div>

          {/* Grid of Printable Table Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {multiTableQrs.map((item) => (
              <div
                key={item.table}
                className="p-6 rounded-3xl bg-white text-slate-900 shadow-xl border-2 border-slate-300 text-center space-y-3 page-break-inside-avoid"
              >
                <div className="space-y-0.5">
                  <h4 className="font-extrabold text-sm">{business.name || 'Burger Craft'}</h4>
                  <p className="text-xs font-black text-brand-600 uppercase tracking-widest bg-brand-50 rounded-lg py-1">
                    Mesa #{item.table}
                  </p>
                </div>

                <div className="p-2 bg-slate-50 rounded-xl border border-slate-200">
                  <img src={item.dataUrl} alt={`QR Mesa ${item.table}`} className="w-36 h-36 mx-auto" />
                </div>

                <p className="text-[10px] font-bold text-slate-600">Escanea para pedir a cocina 📲</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
