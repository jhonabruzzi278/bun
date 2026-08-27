import React from 'react';
import { X, Download, Printer } from 'lucide-react';

interface QRDownloadModalProps {
  qrData: { title: string; url: string; dataUrl: string } | null;
  onClose: () => void;
}

export default function QRDownloadModal({ qrData, onClose }: QRDownloadModalProps) {
  if (!qrData) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.download = `QR_${qrData.title.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
    link.href = qrData.dataUrl;
    link.click();
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Imprimir QR - ${qrData.title}</title>
            <style>
              body { font-family: sans-serif; text-align: center; padding: 40px; }
              img { width: 350px; height: 350px; margin: 20px auto; }
              h1 { font-size: 24px; color: #774C3B; }
              p { font-size: 14px; color: #666; }
            </style>
          </head>
          <body>
            <h1>${qrData.title}</h1>
            <p>Escanea con tu teléfono móvil para ver el menú digital</p>
            <img src="${qrData.dataUrl}" />
            <p>${qrData.url}</p>
            <script>window.print(); window.close();</script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-5 text-center transition-colors">
        <div className="flex items-center justify-between pb-2 border-b border-[#EAE1D6] dark:border-[#3D2420]">
          <h3 className="font-bold text-coffee-950 dark:text-white text-sm text-left truncate">
            {qrData.title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-[#8C7E73] hover:text-coffee-950 dark:hover:text-white p-1 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Big QR Display */}
        <div className="p-4 bg-white rounded-2xl border border-[#EAE1D6] inline-block mx-auto shadow-inner">
          <img src={qrData.dataUrl} alt={qrData.title} className="w-56 h-56 mx-auto object-contain" />
        </div>

        <p className="text-xs text-[#70645A] dark:text-[#A8988B] leading-relaxed">
          Listo para imprimir o colocar en acrílicos y mesas.
        </p>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={handlePrint}
            className="py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] hover:bg-[#F3EDE3] dark:hover:bg-[#2D1B18] text-coffee-950 dark:text-white font-bold text-xs border border-[#EAE1D6] dark:border-[#3D2420] flex items-center justify-center gap-1.5 transition"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir</span>
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="py-2.5 rounded-xl bg-color4 hover:bg-[#522B2B] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-coffee-sm transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Descargar PNG</span>
          </button>
        </div>
      </div>
    </div>
  );
}
