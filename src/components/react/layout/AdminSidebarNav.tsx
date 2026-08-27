import React, { useState } from 'react';
import {
  LayoutDashboard,
  Receipt,
  UtensilsCrossed,
  Users,
  Settings,
  ChefHat,
  QrCode,
  FolderKanban,
  ChevronDown,
  ChevronUp,
  Store
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

export default function AdminSidebarNav({ activePath = '/admin' }: { activePath?: string }) {
  const [settingsOpen, setSettingsOpen] = useState(
    ['/admin/settings', '/admin/services', '/admin/payments', '/admin/business', '/admin/team', '/admin/printers'].some(
      (path) => activePath.startsWith(path)
    )
  );

  const primaryNavItems: NavItem[] = [
    { label: 'Panel', href: '/admin', icon: LayoutDashboard },
    { label: 'Órdenes', href: '/admin/sales', icon: Receipt },
    { label: 'Menú & Platos', href: '/admin/products', icon: UtensilsCrossed },
    { label: 'Categorías', href: '/admin/categories', icon: FolderKanban },
    { label: 'Punto de Venta (POS)', href: '/admin/pos', icon: Store, badge: 'EN VIVO' },
    { label: 'Cocina KDS', href: '/admin/kitchen', icon: ChefHat, badge: 'AUTO' },
    { label: 'Mesas & QR', href: '/admin/qr', icon: QrCode },
    { label: 'Clientes & Reportes', href: '/admin/reports', icon: Users },
  ];

  const settingsSubItems = [
    { label: 'General & Canales', href: '/admin/settings' },
    { label: 'Información del Negocio', href: '/admin/business' },
    { label: 'Equipo & Roles', href: '/admin/team' },
    { label: 'Tipos de Servicio', href: '/admin/services' },
    { label: 'Pasarelas de Pago', href: '/admin/payments' },
    { label: 'Impresoras Térmicas', href: '/admin/printers' },
  ];

  return (
    <nav className="px-3 space-y-1.5 mt-2 pb-6">
      {/* Primary Items */}
      {primaryNavItems.map((item) => {
        const Icon = item.icon;
        const isActive = activePath === item.href;

        return (
          <a
            key={item.href}
            href={item.href}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              isActive
                ? 'bg-color4 dark:bg-color3 text-white shadow-coffee-sm font-bold'
                : 'text-[#635A52] dark:text-[#A8988B] hover:bg-[#F3EDE3] dark:hover:bg-[#2D1B18] hover:text-coffee-950 dark:hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#8C7E73] dark:text-[#A8988B]'}`} />
              <span>{item.label}</span>
            </div>

            {item.badge && !isActive && (
              <span className="text-[9px] px-1.5 py-0.5 rounded font-mono font-bold bg-[#E7F3E8] dark:bg-[#1C3322] text-[#2E7D32] dark:text-[#4ADE80] border border-[#D0EBD2] dark:border-[#2E5936]">
                {item.badge}
              </span>
            )}
          </a>
        );
      })}

      {/* Accordion: Ajustes */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => setSettingsOpen(!settingsOpen)}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            settingsOpen
              ? 'border border-[#EAE1D6] dark:border-[#3D2420] bg-white dark:bg-[#241512] text-coffee-950 dark:text-white shadow-coffee-sm'
              : 'text-[#635A52] dark:text-[#A8988B] hover:bg-[#F3EDE3] dark:hover:bg-[#2D1B18] hover:text-coffee-950 dark:hover:text-white'
          }`}
        >
          <div className="flex items-center gap-3">
            <Settings className="w-4 h-4 text-[#8C7E73] dark:text-[#A8988B]" />
            <span>Ajustes</span>
          </div>
          {settingsOpen ? (
            <ChevronUp className="w-3.5 h-3.5 text-[#8C7E73] dark:text-[#A8988B]" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-[#8C7E73] dark:text-[#A8988B]" />
          )}
        </button>

        {settingsOpen && (
          <div className="pl-9 pr-2 py-1.5 space-y-1 mt-1">
            {settingsSubItems.map((sub) => {
              const isSubActive = activePath === sub.href;
              return (
                <a
                  key={sub.href}
                  href={sub.href}
                  className={`block py-1.5 px-2.5 rounded-lg text-[11px] transition ${
                    isSubActive
                      ? 'bg-[#F3EDE3] dark:bg-[#38201C] text-color4 dark:text-color2 font-bold'
                      : 'text-[#70645A] dark:text-[#A8988B] hover:text-coffee-950 dark:hover:text-white hover:bg-[#FAF7F2] dark:hover:bg-[#2D1B18]'
                  }`}
                >
                  {sub.label}
                </a>
              );
            })}
          </div>
        )}
      </div>

      {/* Mascot AI Assistant Card (Under Settings) */}
      <div className="pt-4">
        <a
          href="/admin/ai"
          className={`block p-3 rounded-2xl border transition-all group relative overflow-hidden ${
            activePath === '/admin/ai'
              ? 'bg-color4 text-white border-transparent shadow-coffee-sm'
              : 'bg-white dark:bg-[#241512] hover:bg-[#FAF7F2] dark:hover:bg-[#2D1B18] border-[#EAE1D6] dark:border-[#3D2420] text-coffee-950 dark:text-white'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#4D2D26] flex items-center justify-center text-xl shadow-inner">
                🐻‍🍳
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-[#241512]"></span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className={`text-xs font-black truncate ${activePath === '/admin/ai' ? 'text-white' : 'text-coffee-950 dark:text-white'}`}>
                  Chef Bunito IA
                </span>
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                  ACTIVO
                </span>
              </div>
              <p className={`text-[10px] truncate mt-0.5 ${activePath === '/admin/ai' ? 'text-white/80' : 'text-[#8C7E73] dark:text-[#A8988B]'}`}>
                3 sugerencias de margen
              </p>
            </div>
          </div>
        </a>
      </div>
    </nav>
  );
}
