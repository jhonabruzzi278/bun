import React, { useState } from 'react';
import QRCode from 'qrcode';
import { useCatalogStore } from '@/lib/useCatalogStore';
import { Globe, QrCode } from 'lucide-react';

import QRLinkCard from './QRLinkCard';
import QRDownloadModal from './QRDownloadModal';
import QRDomainModal from './QRDomainModal';

export default function QRGeneratorIsland() {
  const { business, isLoaded } = useCatalogStore();

  const [downloadModalQr, setDownloadModalQr] = useState<{ title: string; url: string; dataUrl: string } | null>(null);
  const [showDomainModal, setShowDomainModal] = useState<boolean>(false);

  const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:4321';
  const slug = business.slug || 'burger-craft';

  // URLs
  const welcomeUrl = `${origin}/menu/${slug}`;
  const table1Url = `${origin}/menu/${slug}?mesa=1`;
  const table4Url = `${origin}/menu/${slug}?mesa=4`;
  const readOnlyUrl = `${origin}/menu/${slug}?type=read`;

  const handleOpenDownloadModal = async (title: string, url: string) => {
    try {
      const dataUrl = await QRCode.toDataURL(url, {
        width: 450,
        margin: 2,
        color: {
          dark: '#774C3B',
          light: '#FFFFFF',
        },
      });
      setDownloadModalQr({ title, url, dataUrl });
    } catch (e) {
      console.error(e);
    }
  };

  if (!isLoaded) {
    return <div className="text-[#8C7E73] dark:text-[#A8988B] text-sm p-4">Cargando códigos QR...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-coffee-950 dark:text-white">
          Mis enlaces y códigos QR
        </h1>
        <p className="text-xs sm:text-sm text-[#70645A] dark:text-[#A8988B] mt-0.5">
          Genera códigos QR de alta resolución listos para imprimir en mesas, stickers o volantes.
        </p>
      </div>

      {/* Domain Connection Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] shadow-coffee-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-color4 dark:text-color2 flex items-center justify-center text-lg shrink-0">
            🔗
          </div>
          <div>
            <p className="text-xs sm:text-sm font-semibold text-coffee-950 dark:text-white">
              Personaliza tu enlace o conecta tu propio dominio (ej. <strong>menu.{slug}.cl</strong>).
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowDomainModal(true)}
          className="px-4 py-2.5 rounded-xl bg-color4 hover:bg-[#522B2B] text-white font-bold text-xs shadow-coffee-sm transition flex items-center gap-1.5 whitespace-nowrap self-stretch sm:self-auto justify-center"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Conectar dominio</span>
        </button>
      </div>

      {/* BLOQUE 1: Pedidos con Carrito & Checkout */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] shadow-coffee-sm space-y-5 transition-colors">
        <div className="flex items-center gap-3 pb-3 border-b border-[#F4EFEA] dark:border-[#331C18]">
          <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] flex items-center justify-center text-color4 dark:text-color2">
            📑
          </div>
          <h2 className="text-base sm:text-lg font-bold text-coffee-950 dark:text-white">
            Pedidos con Carrito & WhatsApp
          </h2>
        </div>

        <div className="space-y-3">
          <QRLinkCard
            title="Carta Principal con Carrito"
            badge="RECOMENDADO"
            badgeColor="green"
            description="Permite a los clientes armar su pedido, personalizar extras y enviarlo por WhatsApp."
            url={welcomeUrl}
            onOpenDownloadModal={handleOpenDownloadModal}
          />

          <QRLinkCard
            title="QR para Mesa #1 (Consumo en Salón)"
            badge="MESA 1"
            badgeColor="amber"
            description="Asigna automáticamente la Mesa #1 a la comanda del cliente al escanear."
            url={table1Url}
            onOpenDownloadModal={handleOpenDownloadModal}
          />

          <QRLinkCard
            title="QR para Mesa #4 (Consumo en Salón)"
            badge="MESA 4"
            badgeColor="amber"
            description="Asigna automáticamente la Mesa #4 a la comanda del cliente al escanear."
            url={table4Url}
            onOpenDownloadModal={handleOpenDownloadModal}
          />
        </div>
      </div>

      {/* BLOQUE 2: Menú Solo Lectura */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] shadow-coffee-sm space-y-5 transition-colors">
        <div className="flex items-center gap-3 pb-3 border-b border-[#F4EFEA] dark:border-[#331C18]">
          <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] flex items-center justify-center text-color4 dark:text-color2">
            👁️
          </div>
          <h2 className="text-base sm:text-lg font-bold text-coffee-950 dark:text-white">
            Menú Informativo (Solo Lectura)
          </h2>
        </div>

        <QRLinkCard
          title="Carta Digital sin Botones de Pedido"
          badge="SOLO VISUALIZAR"
          badgeColor="blue"
          description="Ideal para cartas de mesa donde los pedidos los toma el garzón directamente."
          url={readOnlyUrl}
          onOpenDownloadModal={handleOpenDownloadModal}
        />
      </div>

      {/* Modals */}
      <QRDownloadModal
        qrData={downloadModalQr}
        onClose={() => setDownloadModalQr(null)}
      />

      <QRDomainModal
        isOpen={showDomainModal}
        onClose={() => setShowDomainModal(false)}
      />
    </div>
  );
}
