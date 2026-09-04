import React, { useState } from 'react';
import {
  Printer,
  FileText,
  Volume2,
  Download,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Flame,
  Coffee,
  Sparkles,
  Receipt
} from 'lucide-react';
import {
  playPrintAndCutSound,
  generateEscPosBinary,
  type PrintableTicketData
} from '@/lib/thermalPrinterSimulator';

const SAMPLE_TICKET: PrintableTicketData = {
  orderNumber: 104,
  customerName: 'Rodrigo Fuentes',
  tableNumber: '4',
  orderType: 'dine_in',
  date: new Date().toLocaleDateString('es-CL'),
  time: new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }),
  businessName: 'brew.cl — Cervecería & Grill',
  businessAddress: 'Av. Providencia 1240, Santiago',
  businessPhone: '+56 9 3898 0598',
  notes: 'Cliente solicita pan bien tostado y salsas aparte.',
  total: 18900,
  items: [
    {
      name: 'Double Bacon Smash Burger',
      quantity: 2,
      price: 7490,
      stationCode: 'GRILL',
      variantName: 'Doble Carne',
      modifiers: ['1x Queso Cheddar Extra', '1x Tocino Crujiente'],
      notes: 'Bien cocida',
    },
    {
      name: 'Papas Rústicas con Cheddar & Bacon',
      quantity: 1,
      price: 4990,
      stationCode: 'FRY',
      modifiers: ['Salsa BBQ Extra'],
    },
    {
      name: 'Cerveza Artesanal IPA 500ml',
      quantity: 2,
      price: 4500,
      stationCode: 'BAR',
      variantName: 'Schop Directo de Barril',
    },
    {
      name: 'Coca-Cola Zero 350ml (Lata)',
      quantity: 1,
      price: 1800,
      stationCode: 'BAR',
    },
  ],
};

export default function ThermalPrinterSimulatorIsland() {
  const [profile, setProfile] = useState<'KITCHEN' | 'BAR' | 'CUSTOMER'>('KITCHEN');
  const [paperWidth, setPaperWidth] = useState<'80mm' | '58mm'>('80mm');
  const [isPrinting, setIsPrinting] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [ticketData, setTicketData] = useState<PrintableTicketData>(SAMPLE_TICKET);
  const [paperAnimationKey, setPaperAnimationKey] = useState(0);

  const handleSimulatePrint = (selectedProfile = profile) => {
    setIsPrinting(true);
    setPaperAnimationKey((prev) => prev + 1);

    if (soundEnabled) {
      playPrintAndCutSound();
    }

    setTimeout(() => {
      setIsPrinting(false);
    }, 900);
  };

  const handleProfileChange = (newProfile: 'KITCHEN' | 'BAR' | 'CUSTOMER') => {
    setProfile(newProfile);
    if (newProfile === 'BAR') {
      setPaperWidth('58mm');
    } else {
      setPaperWidth('80mm');
    }
    handleSimulatePrint(newProfile);
  };

  const handleBrowserPrint = () => {
    if (soundEnabled) playPrintAndCutSound();
    window.print();
  };

  const handleDownloadEscPos = () => {
    const binary = generateEscPosBinary(ticketData, profile);
    const blob = new Blob([binary.buffer as ArrayBuffer], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `comanda_escpos_${profile.toLowerCase()}_#${ticketData.orderNumber}.bin`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredItems = profile === 'BAR'
    ? ticketData.items.filter((i) => i.stationCode === 'BAR')
    : profile === 'KITCHEN'
    ? ticketData.items.filter((i) => i.stationCode !== 'BAR')
    : ticketData.items;

  const tip10 = Math.round((ticketData.total || 0) * 0.1);
  const grandTotal = (ticketData.total || 0) + tip10;

  return (
    <div className="space-y-8">
      {/* Top Controls Bar */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] shadow-coffee-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleProfileChange('KITCHEN')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              profile === 'KITCHEN'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-[#FAF7F2] dark:bg-[#241512] text-[#70645A] dark:text-[#A8988B] hover:text-white hover:bg-amber-500/20'
            }`}
          >
            <Flame className="w-4 h-4" />
            Cocina (80mm)
          </button>

          <button
            type="button"
            onClick={() => handleProfileChange('BAR')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              profile === 'BAR'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'bg-[#FAF7F2] dark:bg-[#241512] text-[#70645A] dark:text-[#A8988B] hover:text-white hover:bg-cyan-500/20'
            }`}
          >
            <Coffee className="w-4 h-4" />
            Barra / Bar (58mm)
          </button>

          <button
            type="button"
            onClick={() => handleProfileChange('CUSTOMER')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              profile === 'CUSTOMER'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-[#FAF7F2] dark:bg-[#241512] text-[#70645A] dark:text-[#A8988B] hover:text-white hover:bg-emerald-500/20'
            }`}
          >
            <Receipt className="w-4 h-4" />
            Pre-cuenta Cliente (80mm)
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition ${
              soundEnabled
                ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 border-zinc-300 dark:border-zinc-700'
            }`}
            title="Activar/Desactivar sonido de impresión"
          >
            <Volume2 className="w-4 h-4" />
            <span className="hidden sm:inline">{soundEnabled ? 'Sonido Activado' : 'Silencio'}</span>
          </button>

          <button
            type="button"
            onClick={() => handleSimulatePrint()}
            disabled={isPrinting}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-black shadow-md flex items-center gap-2 transition disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isPrinting ? 'animate-spin' : ''}`} />
            Simular Impresión
          </button>
        </div>
      </div>

      {/* Main Workspace: Simulator Machine on Left, Details & Network on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Physical Printer Hardware Casing Simulation */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="w-full max-w-sm rounded-[32px] bg-zinc-900 border-4 border-zinc-800 shadow-2xl p-6 relative overflow-hidden">
            {/* Printer Top Lip and Output Slot */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black tracking-widest text-zinc-400 uppercase">
                  brew.cl POS PRINTER
                </span>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-zinc-800 text-amber-400 font-mono">
                  ESC/POS {paperWidth}
                </span>
              </div>

              {/* Status LEDs */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[8px] text-zinc-500 font-mono">PWR</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${isPrinting ? 'bg-amber-400 animate-ping' : 'bg-zinc-700'}`} />
                  <span className="text-[8px] text-zinc-500 font-mono">DATA</span>
                </div>
              </div>
            </div>

            {/* Paper Exit Mouth / Slot */}
            <div className="w-full h-3 bg-black rounded-full my-3 border border-zinc-950 shadow-inner" />

            {/* Thermal Paper Feed Animation */}
            <div className="overflow-hidden flex justify-center py-2">
              <div
                key={paperAnimationKey}
                className={`transition-all duration-700 ease-out origin-top shadow-xl ${
                  paperWidth === '58mm' ? 'w-[260px]' : 'w-[320px]'
                } ${isPrinting ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-0 opacity-100'}`}
              >
                {/* Thermal Receipt Paper */}
                <div className="bg-[#FFFDF9] text-zinc-900 p-5 rounded-b-md shadow-2xl font-mono text-xs border-t-2 border-dashed border-zinc-300 relative select-none">
                  {/* Jagged / Perforated Paper Top Edge */}
                  <div className="absolute -top-1 left-0 right-0 h-1 bg-[radial-gradient(circle,_transparent_3px,_#FFFDF9_3px)] bg-[length:8px_8px]" />

                  {/* Header */}
                  <div className="text-center space-y-1 pb-3 border-b border-dashed border-zinc-400">
                    <h3 className="font-black text-sm tracking-tight text-black">
                      {ticketData.businessName}
                    </h3>
                    <p className="text-[10px] text-zinc-600">{ticketData.businessAddress}</p>
                    <p className="text-[10px] text-zinc-600">{ticketData.businessPhone}</p>
                    
                    <div className="pt-2 text-center">
                      <span className="inline-block px-3 py-1 bg-black text-white font-black text-sm rounded">
                        {profile === 'KITCHEN' ? 'COMANDA COCINA' : profile === 'BAR' ? 'COMANDA BAR' : 'PRE-CUENTA'} #{ticketData.orderNumber}
                      </span>
                    </div>

                    <div className="text-[10px] text-zinc-600 pt-1 flex justify-between">
                      <span>{ticketData.date} {ticketData.time}</span>
                      <span className="font-bold uppercase text-black">
                        {ticketData.tableNumber ? `MESA ${ticketData.tableNumber}` : 'DELIVERY'}
                      </span>
                    </div>
                    <div className="text-[10px] text-left text-zinc-700">
                      Cliente: <strong>{ticketData.customerName}</strong>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="py-3 space-y-2 border-b border-dashed border-zinc-400">
                    {filteredItems.map((item, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <div className="flex justify-between font-bold text-xs text-black">
                          <span>{item.quantity}x {item.name}</span>
                          {profile === 'CUSTOMER' && item.price && (
                            <span>${(item.price * item.quantity).toLocaleString('es-CL')}</span>
                          )}
                        </div>
                        {item.variantName && (
                          <div className="text-[10px] text-zinc-600 pl-3">
                            &gt; {item.variantName}
                          </div>
                        )}
                        {item.modifiers && item.modifiers.length > 0 && (
                          <div className="text-[10px] text-zinc-600 pl-3">
                            + {item.modifiers.join(', ')}
                          </div>
                        )}
                        {item.notes && (
                          <div className="text-[10px] text-amber-900 bg-amber-50 p-1 rounded font-semibold pl-2">
                            * {item.notes}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Notes / Totals */}
                  {ticketData.notes && profile !== 'CUSTOMER' && (
                    <div className="py-2 text-[10px] text-zinc-700 border-b border-dashed border-zinc-400">
                      <strong>NOTAS GENERALES:</strong> {ticketData.notes}
                    </div>
                  )}

                  {/* Customer Totals Breakdown */}
                  {profile === 'CUSTOMER' && ticketData.total && (
                    <div className="py-3 space-y-1.5 border-b border-dashed border-zinc-400 text-xs">
                      <div className="flex justify-between text-zinc-700">
                        <span>Subtotal:</span>
                        <span>${ticketData.total.toLocaleString('es-CL')}</span>
                      </div>
                      <div className="flex justify-between text-zinc-700">
                        <span>Propina sugerida (10%):</span>
                        <span>${tip10.toLocaleString('es-CL')}</span>
                      </div>
                      <div className="flex justify-between text-sm font-black text-black pt-1 border-t border-zinc-300">
                        <span>TOTAL C/PROPINA:</span>
                        <span>${grandTotal.toLocaleString('es-CL')}</span>
                      </div>
                    </div>
                  )}

                  {/* Footer Barcode / QR */}
                  <div className="pt-3 text-center space-y-1">
                    <div className="font-mono tracking-widest text-[14px] font-black text-black">
                      ||| | ||||| || |||| ||| |||||
                    </div>
                    <p className="text-[9px] text-zinc-500 uppercase">
                      Impreso vía brew.cl ESC/POS Driver
                    </p>
                    {profile === 'CUSTOMER' && (
                      <p className="text-[9px] text-zinc-700 font-bold">
                        ¡Gracias por su visita! Vuelva pronto.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Paper Tear Guillotine Guide Bar */}
            <div className="mt-4 flex items-center justify-between text-[10px] text-zinc-500 px-2 font-mono">
              <span>GUILLOTINE: AUTO-CUT</span>
              <span>BUFFER: 100% READY</span>
            </div>
          </div>
        </div>

        {/* Configuration, Network & Export Actions */}
        <div className="lg:col-span-6 space-y-6">
          {/* Action Hub */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] shadow-coffee-sm space-y-4">
            <h3 className="font-bold text-coffee-950 dark:text-white text-base flex items-center gap-2">
              <Printer className="w-5 h-5 text-amber-500" />
              Operaciones de Impresión Real
            </h3>
            <p className="text-xs text-[#70645A] dark:text-[#A8988B]">
              Puedes enviar este ticket directamente a una impresora conectada a tu equipo o descargar el binario ESC/POS para impresión en red local.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={handleBrowserPrint}
                className="p-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition"
              >
                <Printer className="w-4 h-4" />
                Imprimir en Impresora Física
              </button>

              <button
                type="button"
                onClick={handleDownloadEscPos}
                className="p-3.5 rounded-2xl bg-[#FAF7F2] dark:bg-[#241512] hover:bg-zinc-200 dark:hover:bg-zinc-800 text-coffee-950 dark:text-white border border-[#EAE1D6] dark:border-[#3D2420] font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                <Download className="w-4 h-4 text-amber-500" />
                Descargar Binario ESC/POS (.bin)
              </button>
            </div>
          </div>

          {/* Network Destinations Matrix (Like Toteat & Fudo) */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] shadow-coffee-sm space-y-4">
            <h3 className="font-bold text-coffee-950 dark:text-white text-base flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Estaciones de Impresión Configura­das
            </h3>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-[#FAF7F2] dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-coffee-950 dark:text-white">Cocina Caliente</h4>
                    <p className="text-[10px] text-[#70645A] dark:text-[#A8988B]">Epson TM-T20 (80mm) • IP: 192.168.1.120:9100</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                  En línea
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF7F2] dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-600 flex items-center justify-center font-bold">
                    <Coffee className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-coffee-950 dark:text-white">Barra & Bebidas</h4>
                    <p className="text-[10px] text-[#70645A] dark:text-[#A8988B]">3nStar RPT008 (58mm) • Conexión USB Directa</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                  En línea
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF7F2] dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                    <Receipt className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-coffee-950 dark:text-white">Caja & Facturación</h4>
                    <p className="text-[10px] text-[#70645A] dark:text-[#A8988B]">Bixolon SRP-350 (80mm) • Emisión de Pre-cuenta</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                  Simulada
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
