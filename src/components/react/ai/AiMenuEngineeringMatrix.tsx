import React from 'react';

export default function AiMenuEngineeringMatrix() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Estrellas */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#241512] border-2 border-emerald-500/40 shadow-coffee-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-emerald-600 dark:text-emerald-400">⭐ Platos Estrella</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">Alta Venta + Alto Margen</span>
          </div>
          <p className="text-lg font-black text-coffee-950 dark:text-white">Double Bacon Smash</p>
          <p className="text-xs text-[#70645A] dark:text-[#A8988B]">Margen 68% • 84 pedidos/semana</p>
          <div className="pt-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
            Acción IA: Mantener en posición #1 del menú y destacar en fotos.
          </div>
        </div>

        {/* Vacas Lecheras */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] shadow-coffee-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-amber-600 dark:text-amber-400">🐄 Vacas Lecheras</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">Alta Venta + Bajo Margen</span>
          </div>
          <p className="text-lg font-black text-coffee-950 dark:text-white">Papas Rústicas Cheddar</p>
          <p className="text-xs text-[#70645A] dark:text-[#A8988B]">Margen 44% • 110 pedidos/semana</p>
          <div className="pt-2 text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
            Acción IA: Aumentar precio $400 o incluir en combo con bebida.
          </div>
        </div>

        {/* Rompecabezas */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] shadow-coffee-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-blue-600 dark:text-blue-400">🧩 Rompecabezas</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">Baja Venta + Alto Margen</span>
          </div>
          <p className="text-lg font-black text-coffee-950 dark:text-white">Truffle Mushroom Burger</p>
          <p className="text-xs text-[#70645A] dark:text-[#A8988B]">Margen 74% • 19 pedidos/semana</p>
          <div className="pt-2 text-[11px] text-blue-600 dark:text-blue-400 font-semibold">
            Acción IA: Asignar insignia "Recomendación del Chef" en la carta.
          </div>
        </div>

        {/* Perros */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] shadow-coffee-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-rose-600 dark:text-rose-400">🐕 Perros</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300">Baja Venta + Bajo Margen</span>
          </div>
          <p className="text-lg font-black text-coffee-950 dark:text-white">Cerveza Porter Tostada</p>
          <p className="text-xs text-[#70645A] dark:text-[#A8988B]">Margen 38% • 6 pedidos/semana</p>
          <div className="pt-2 text-[11px] text-rose-600 dark:text-rose-400 font-semibold">
            Acción IA: Reemplazar por Cerveza Kross Golden o cóctel de autor.
          </div>
        </div>
      </div>
    </div>
  );
}
