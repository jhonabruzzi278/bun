import React from 'react';

export default function AiDemandForecast() {
  return (
    <div className="p-8 rounded-3xl bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] shadow-coffee-sm space-y-6">
      <div>
        <h2 className="text-lg font-extrabold text-coffee-950 dark:text-white">Previsión Algorítmica de Demanda para el Fin de Semana</h2>
        <p className="text-xs text-[#70645A] dark:text-[#A8988B] mt-1">Estimación basada en histórico de ventas y temperatura ambiental.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420]">
          <span className="text-xs text-[#8C7E73] dark:text-[#A8988B] font-semibold">Demanda Proyectada</span>
          <p className="text-2xl font-black text-coffee-950 dark:text-white mt-1">+32% Pedidos</p>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1">Pico: Sábado 21:00 - 23:00</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420]">
          <span className="text-xs text-[#8C7E73] dark:text-[#A8988B] font-semibold">Insumo Crítico</span>
          <p className="text-2xl font-black text-coffee-950 dark:text-white mt-1">120 Panes Brioche</p>
          <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-1">Pedir reposición antes del viernes 16h</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420]">
          <span className="text-xs text-[#8C7E73] dark:text-[#A8988B] font-semibold">Venta Estimada Fin de Semana</span>
          <p className="text-2xl font-black text-color4 dark:text-color2 mt-1">$ 1.840.000</p>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1">+14% vs fin de semana anterior</p>
        </div>
      </div>
    </div>
  );
}
