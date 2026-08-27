import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { Share2, Download, Copy, Check } from 'lucide-react';

interface QRLinkCardProps {
  title: string;
  badge?: string;
  badgeColor?: 'green' | 'amber' | 'blue';
  description: string;
  url: string;
  onOpenDownloadModal: (title: string, url: string) => void;
}

export default function QRLinkCard({
  title,
  badge,
  badgeColor = 'green',
  description,
  url,
  onOpenDownloadModal,
}: QRLinkCardProps) {
  const [miniQr, setMiniQr] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    QRCode.toDataURL(url, {
      width: 120,
      margin: 1,
      color: {
        dark: '#774C3B',
        light: '#FFFFFF',
      },
    }).then(setMiniQr).catch(console.error);
  }, [url]);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getBadgeStyle = () => {
    switch (badgeColor) {
      case 'green':
        return 'bg-[#E7F3E8] dark:bg-[#1A3320] text-[#2E7D32] dark:text-[#4ADE80] border-[#D0EBD2] dark:border-[#2E5936]';
      case 'amber':
        return 'bg-[#FEF8E3] dark:bg-[#33220E] text-[#B1813B] dark:text-[#FBBF24] border-[#FDECB8] dark:border-[#593E1A]';
      case 'blue':
        return 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
    }
  };

  return (
    <div className="p-4 rounded-2xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-start gap-4">
        {/* Mini QR Thumbnail */}
        <div
          onClick={() => onOpenDownloadModal(title, url)}
          className="w-16 h-16 rounded-xl bg-white p-1 border border-[#EAE1D6] dark:border-[#3D2420] shadow-sm shrink-0 cursor-pointer hover:scale-105 transition"
          title="Ver en grande"
        >
          {miniQr ? (
            <img src={miniQr} alt={title} className="w-full h-full object-contain rounded" />
          ) : (
            <div className="w-full h-full animate-pulse bg-gray-200 rounded" />
          )}
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-coffee-950 dark:text-white text-xs sm:text-sm">{title}</h3>
            {badge && (
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${getBadgeStyle()}`}>
                {badge}
              </span>
            )}
          </div>
          <p className="text-xs text-[#70645A] dark:text-[#A8988B] leading-relaxed">{description}</p>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="text-[11px] text-color4 dark:text-color2 font-mono hover:underline block truncate max-w-xs sm:max-w-md"
          >
            {url}
          </a>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-center w-full sm:w-auto">
        <button
          type="button"
          onClick={handleCopy}
          className="flex-1 sm:flex-none px-3 py-1.5 rounded-xl bg-white dark:bg-[#241512] hover:bg-[#F3EDE3] dark:hover:bg-[#2D1B18] border border-[#EAE1D6] dark:border-[#3D2420] text-xs font-bold text-coffee-950 dark:text-white transition flex items-center justify-center gap-1.5"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-emerald-500">Copiado</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copiar</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => onOpenDownloadModal(title, url)}
          className="flex-1 sm:flex-none px-3 py-1.5 rounded-xl bg-color4 hover:bg-[#522B2B] text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Descargar QR</span>
        </button>
      </div>
    </div>
  );
}
