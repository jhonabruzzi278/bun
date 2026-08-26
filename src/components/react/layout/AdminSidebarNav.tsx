import React, { useState } from 'react';
import {
  LayoutDashboard,
  Rocket,
  ChefHat,
  QrCode,
  FolderKanban,
  UtensilsCrossed,
  Smartphone,
  Settings,
  ChevronDown,
  ChevronUp,
  Receipt,
  TrendingUp,
  History,
  BarChart3,
  DollarSign,
  Landmark,
  PiggyBank
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  iconName: string;
  isLive?: boolean;
}

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  Rocket,
  ChefHat,
  QrCode,
  FolderKanban,
  UtensilsCrossed,
  Smartphone,
  Settings,
  Receipt,
  TrendingUp,
};

export default function AdminSidebarNav({ activePath = '/admin' }: { activePath?: string }) {
  const isSettingsActive = [
    '/admin/settings',
    '/admin/services',
    '/admin/payments',
    '/admin/business',
    '/admin/team',
    '/admin/printers',
  ].some((path) => activePath.startsWith(path));

  const isSalesActive = [
    '/admin/sales',
    '/admin/reports',
    '/admin/transactions',
    '/admin/cashier',
  ].some((path) => activePath.startsWith(path));

  const [settingsOpen, setSettingsOpen] = useState<boolean>(isSettingsActive || true);
  const [salesOpen, setSalesOpen] = useState<boolean>(isSalesActive || true);

  const mainTopItems: NavItem[] = [
    { label: 'Dashboard', href: '/admin', iconName: 'LayoutDashboard' },
    { label: 'Guía de Pasos 🚀', href: '/admin/onboarding', iconName: 'Rocket' },
    { label: 'Punto de Venta (PDV)', href: '/admin/pos', iconName: 'Receipt', isLive: true },
    { label: 'Cocina KDS', href: '/admin/kitchen', iconName: 'ChefHat', isLive: true },
    { label: 'Códigos QR Mesas', href: '/admin/qr', iconName: 'QrCode' },
    { label: 'Categorías', href: '/admin/categories', iconName: 'FolderKanban' },
    { label: 'Productos', href: '/admin/products', iconName: 'UtensilsCrossed' },
    { label: 'Vista Previa Móvil', href: '/admin/preview', iconName: 'Smartphone' },
  ];

  const salesSubItems = [
    { label: 'Historial de pedidos', href: '/admin/sales' },
    { label: 'Reportes', href: '/admin/reports' },
    { label: 'Registros financieros', href: '/admin/transactions' },
    { label: 'Cajas', href: '/admin/cashier' },
  ];

  const configSubItems = [
    { label: 'Configuración general', href: '/admin/settings' },
    { label: 'Tipos de servicio', href: '/admin/services' },
    { label: 'Métodos de pago', href: '/admin/payments' },
    { label: 'Información del negocio', href: '/admin/business' },
    { label: 'Equipo y roles', href: '/admin/team' },
    { label: 'Impresoras y tickets', href: '/admin/printers' },
  ];

  return (
    <nav className="px-3 space-y-1 mt-1 pb-10">
      {mainTopItems.map((item) => {
        const Icon = iconMap[item.iconName] || LayoutDashboard;
        const isActive = activePath === item.href;

        return (
          <a
            key={item.href}
            href={item.href}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              isActive
                ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </div>
            {item.isLive && (
              <span
                className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-brand-500/20 text-brand-400 border border-brand-500/30'
                }`}
              >
                LIVE
              </span>
            )}
          </a>
        );
      })}

      {/* Accordion Group 1: Ventas */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => setSalesOpen(!salesOpen)}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            isSalesActive
              ? 'bg-slate-900 text-white'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
          }`}
        >
          <div className="flex items-center gap-3">
            <TrendingUp className={`w-4 h-4 shrink-0 ${isSalesActive ? 'text-brand-400' : ''}`} />
            <span>Ventas</span>
          </div>
          {salesOpen ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {salesOpen && (
          <div className="mt-1 ml-3 pl-3 border-l-2 border-slate-800 space-y-0.5 py-1">
            {salesSubItems.map((sub) => {
              const isSubActive = activePath === sub.href;
              return (
                <a
                  key={sub.href}
                  href={sub.href}
                  className={`block relative px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isSubActive
                      ? 'text-white bg-brand-500/15 font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                  }`}
                >
                  {isSubActive && (
                    <span className="absolute -left-[14px] top-1.5 bottom-1.5 w-1 rounded-r bg-brand-400"></span>
                  )}
                  {sub.label}
                </a>
              );
            })}
          </div>
        )}
      </div>

      {/* Accordion Group 2: Configuraciones */}
      <div className="pt-1">
        <button
          type="button"
          onClick={() => setSettingsOpen(!settingsOpen)}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            isSettingsActive
              ? 'bg-slate-900 text-white'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
          }`}
        >
          <div className="flex items-center gap-3">
            <Settings className={`w-4 h-4 shrink-0 ${isSettingsActive ? 'text-brand-400' : ''}`} />
            <span>Configuraciones</span>
          </div>
          {settingsOpen ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {settingsOpen && (
          <div className="mt-1 ml-3 pl-3 border-l-2 border-slate-800 space-y-0.5 py-1">
            {configSubItems.map((sub) => {
              const isSubActive = activePath === sub.href;
              return (
                <a
                  key={sub.href}
                  href={sub.href}
                  className={`block relative px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isSubActive
                      ? 'text-white bg-brand-500/15 font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                  }`}
                >
                  {isSubActive && (
                    <span className="absolute -left-[14px] top-1.5 bottom-1.5 w-1 rounded-r bg-brand-400"></span>
                  )}
                  {sub.label}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
