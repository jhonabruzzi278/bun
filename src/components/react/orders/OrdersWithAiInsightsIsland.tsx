import React, { useState } from 'react';
import { Search, ChevronDown, ArrowUpDown } from 'lucide-react';
import StatusBadge, { type OrderStatus } from '../ui/StatusBadge';

interface OrderRow {
  id: string;
  customerName: string;
  item: string;
  size: string;
  time: string;
  status: OrderStatus;
  price: number;
}

const INITIAL_ORDERS: OrderRow[] = [
  { id: '101', customerName: 'Jonathan Guerra', item: 'Double Bacon Smash + Papas Rústicas', size: 'Doble', time: '14:45', status: 'Listo', price: 12480 },
  { id: '102', customerName: 'Camila Fernandez', item: 'Truffle Mushroom Burger', size: 'Simple', time: '14:42', status: 'Preparando', price: 8490 },
  { id: '103', customerName: 'Mateo Silva', item: 'Pizza Pepperoni Rústica Artesanal', size: 'Familiar', time: '14:40', status: 'Pendiente', price: 13990 },
  { id: '104', customerName: 'Valentina Rojas', item: 'Crispy Chicken Supreme', size: 'Doble', time: '14:38', status: 'Preparando', price: 8990 },
  { id: '105', customerName: 'Diego Soto', item: 'Papas Rústicas con Cheddar & Bacon', size: 'Grande', time: '14:35', status: 'Terminado', price: 4490 },
  { id: '106', customerName: 'Sofía Vargas', item: 'Limonada Menta Jengibre (500ml)', size: 'Medio', time: '14:33', status: 'Listo', price: 2990 },
  { id: '107', customerName: 'Carlos Morales', item: 'Cerveza IPA Artesanal 473cc', size: 'Pinta', time: '14:30', status: 'Terminado', price: 4200 },
  { id: '108', customerName: 'Ignacio Fuentes', item: 'Smash Clásica con Queso Americano', size: 'Simple', time: '14:28', status: 'Listo', price: 6990 },
  { id: '109', customerName: 'Francisca Paredes', item: 'Aros de Cebolla Crujientes + BBQ', size: 'Porción', time: '14:25', status: 'Terminado', price: 3890 },
  { id: '110', customerName: 'Rodrigo Araya', item: 'Pizza Cuatro Quesos al Horno', size: 'Mediana', time: '14:22', status: 'Preparando', price: 11490 },
  { id: '111', customerName: 'Catalina Muñoz', item: 'Brownie Tibio con Helado de Vainilla', size: 'Postre', time: '14:18', status: 'Pendiente', price: 4190 },
  { id: '112', customerName: 'Felipe Valenzuela', item: 'Triple Monster Bacon Smash', size: 'Triple', time: '14:15', status: 'Listo', price: 10990 },
  { id: '113', customerName: 'Constanza Bravo', item: 'Tequeños de Queso Fundido (6 un)', size: 'Entrada', time: '14:10', status: 'Terminado', price: 4890 },
  { id: '114', customerName: 'Andrés Carrasco', item: 'Milkshake de Frutilla Natural', size: 'Grande', time: '14:05', status: 'Preparando', price: 3490 },
  { id: '115', customerName: 'Daniela Toro', item: 'Capuchino Doble Moca', size: 'Grande', time: '13:58', status: 'Terminado', price: 3100 },
  { id: '116', customerName: 'Gabriel Espinoza', item: 'Cerveza Porter Tostada Artesanal', size: 'Pinta', time: '13:50', status: 'Listo', price: 4300 },
  { id: '117', customerName: 'Javiera Cárdenas', item: 'Smash BBQ Ahumada con Cebolla Crispy', size: 'Doble', time: '13:45', status: 'Pendiente', price: 8790 },
  { id: '118', customerName: 'Sebastián Navarro', item: 'Sandwich Mechada Italiana en Marraqueta', size: 'Completo', time: '13:40', status: 'Terminado', price: 7890 },
  { id: '119', customerName: 'Paula Riquelme', item: 'Tiramisú Tradicional de la Casa', size: 'Postre', time: '13:30', status: 'Listo', price: 4290 },
  { id: '120', customerName: 'Tomás Henríquez', item: 'Combo Doble Smash + Papas + Bebida', size: 'Combo', time: '13:20', status: 'Terminado', price: 11990 },
];

export default function OrdersWithAiInsightsIsland() {
  const [orders, setOrders] = useState<OrderRow[]>(INITIAL_ORDERS);
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortField, setSortField] = useState<keyof OrderRow>('time');
  const [sortAsc, setSortAsc] = useState(false);

  const handleSort = (field: keyof OrderRow) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const filteredOrders = orders
    .filter((order) => {
      const matchesSearch =
        order.customerName.toLowerCase().includes(searchFilter.toLowerCase()) ||
        order.item.toLowerCase().includes(searchFilter.toLowerCase()) ||
        order.id.includes(searchFilter);

      const matchesStatus =
        statusFilter === 'ALL' ||
        order.status.toUpperCase() === statusFilter.toUpperCase();

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortAsc ? valA - valB : valB - valA;
      }
      return 0;
    });

  return (
    <div className="w-full pb-12">
      {/* Main Container: Pedidos recientes Table Full Width */}
      <div className="w-full bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] rounded-2xl shadow-coffee-sm p-5 md:p-6 space-y-5 transition-colors">
        {/* Table Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-coffee-950 dark:text-white tracking-tight">
              Pedidos recientes en tiempo real
            </h2>
            <p className="text-xs text-[#70645A] dark:text-[#A8988B] mt-0.5">
              Registro histórico y comanda de cocina de los últimos 20 pedidos atendidos.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Search inside table */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#8C7E73] dark:text-[#A8988B] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Buscar por cliente o plato..."
                className="pl-8 pr-3 py-1.5 rounded-xl bg-[#FAF7F2] dark:bg-[#2A1916] border border-[#EAE1D6] dark:border-[#422722] text-xs text-coffee-950 dark:text-[#F4EFEA] placeholder-[#8C7E73] dark:placeholder-[#9C8C80] focus:outline-none focus:border-color4 dark:focus:border-color3 w-48 md:w-60 transition"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none pl-3 pr-7 py-1.5 rounded-xl bg-[#FAF7F2] dark:bg-[#2A1916] border border-[#EAE1D6] dark:border-[#422722] text-xs font-semibold text-coffee-800 dark:text-[#E8DFD8] hover:border-[#D7C7B5] dark:hover:border-[#5C3832] focus:outline-none cursor-pointer transition"
              >
                <option value="ALL">Todos los estados</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Preparando">Preparando</option>
                <option value="Listo">Listo</option>
                <option value="Terminado">Terminado</option>
              </select>
              <ChevronDown className="w-3 h-3 text-[#8C7E73] dark:text-[#A8988B] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-[#8C7E73] dark:text-[#A8988B] border-b border-[#EAE1D6] dark:border-[#3D2420] text-[11px] font-semibold">
                <th
                  onClick={() => handleSort('customerName')}
                  className="py-3 px-3 cursor-pointer hover:text-coffee-950 dark:hover:text-white transition select-none"
                >
                  <div className="flex items-center gap-1">
                    <span>Cliente</span>
                    <ArrowUpDown className="w-3 h-3 opacity-60" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('item')}
                  className="py-3 px-3 cursor-pointer hover:text-coffee-950 dark:hover:text-white transition select-none"
                >
                  <div className="flex items-center gap-1">
                    <span>Bebida / Plato</span>
                    <ArrowUpDown className="w-3 h-3 opacity-60" />
                  </div>
                </th>
                <th className="py-3 px-3">Tamaño</th>
                <th
                  onClick={() => handleSort('time')}
                  className="py-3 px-3 cursor-pointer hover:text-coffee-950 dark:hover:text-white transition select-none"
                >
                  <div className="flex items-center gap-1">
                    <span>Tiempo</span>
                    <ArrowUpDown className="w-3 h-3 opacity-60" />
                  </div>
                </th>
                <th className="py-3 px-3 text-center">Estado</th>
                <th
                  onClick={() => handleSort('price')}
                  className="py-3 px-3 text-right cursor-pointer hover:text-coffee-950 dark:hover:text-white transition select-none"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Monto Total</span>
                    <ArrowUpDown className="w-3 h-3 opacity-60" />
                  </div>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#F4EFEA] dark:divide-[#331C18] text-coffee-950 dark:text-[#F4EFEA]">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#8C7E73] dark:text-[#A8988B] text-xs">
                    No se encontraron pedidos con los filtros aplicados.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((row) => (
                  <tr key={row.id} className="hover:bg-[#FAF7F2]/80 dark:hover:bg-[#2F1B17]/80 transition">
                    <td className="py-3.5 px-3 font-semibold text-coffee-950 dark:text-white">
                      {row.customerName}
                    </td>
                    <td className="py-3.5 px-3 text-[#70645A] dark:text-[#D4C5B9]">
                      {row.item}
                    </td>
                    <td className="py-3.5 px-3 text-[#8C7E73] dark:text-[#A8988B]">
                      {row.size}
                    </td>
                    <td className="py-3.5 px-3 font-mono text-[#70645A] dark:text-[#D4C5B9]">
                      {row.time}
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <StatusBadge status={row.status} />
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-bold text-coffee-950 dark:text-white">
                      $ {row.price.toLocaleString('es-CL')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
