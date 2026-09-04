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
  Store,
  ShieldCheck,
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
    <nav className="px-3 space-y-1 mt-3 pb-6">
      {/* Primary Items */}
      {primaryNavItems.map((item) => {
        const Icon = item.icon;
        const isActive = activePath === item.href;

        return (
          <a
            key={item.href}
            href={item.href}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 ${
              isActive
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20 font-black'
                : 'text-neutral-600 dark:text-zinc-400 hover:bg-neutral-100 dark:hover:bg-white/[0.06] hover:text-neutral-950 dark:hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-neutral-500 dark:text-zinc-400'}`} />
              <span>{item.label}</span>
            </div>

            {item.badge && !isActive && (
              <span className="text-[9px] px-1.5 py-0.5 rounded-full font-mono font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
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
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 ${
            settingsOpen
              ? 'border border-neutral-200 dark:border-white/[0.08] bg-neutral-100/70 dark:bg-white/[0.05] text-neutral-900 dark:text-white'
              : 'text-neutral-600 dark:text-zinc-400 hover:bg-neutral-100 dark:hover:bg-white/[0.06] hover:text-neutral-950 dark:hover:text-white'
          }`}
        >
          <div className="flex items-center gap-3">
            <Settings className="w-4 h-4 text-neutral-500 dark:text-zinc-400" />
            <span>Ajustes</span>
          </div>
          {settingsOpen ? (
            <ChevronUp className="w-3.5 h-3.5 text-neutral-500 dark:text-zinc-400" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-neutral-500 dark:text-zinc-400" />
          )}
        </button>

        {settingsOpen && (
          <div className="pl-9 pr-2 py-1 space-y-1 mt-1">
            {settingsSubItems.map((sub) => {
              const isSubActive = activePath === sub.href;
              return (
                <a
                  key={sub.href}
                  href={sub.href}
                  className={`block py-1.5 px-2.5 rounded-xl text-[11px] transition-all duration-150 ${
                    isSubActive
                      ? 'bg-amber-500/15 text-amber-500 dark:text-amber-400 font-bold'
                      : 'text-neutral-600 dark:text-zinc-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.04]'
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
      <div className="pt-3">
        <a
          href="/admin/ai"
          className={`block p-3 rounded-2xl border transition-all duration-200 group relative overflow-hidden ${
            activePath === '/admin/ai'
              ? 'bg-amber-500 text-black border-amber-500 shadow-md shadow-amber-500/20'
              : 'bg-neutral-50 dark:bg-[#121215] hover:bg-neutral-100 dark:hover:bg-[#18181D] border-neutral-200 dark:border-white/[0.08] text-neutral-900 dark:text-white'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-neutral-200 dark:border-white/[0.1] shadow-sm bg-zinc-900">
                <img src="/images/brew-mascot.jpg" alt="Brew" className="w-full h-full object-cover" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-[#121215]"></span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className={`text-xs font-black truncate ${activePath === '/admin/ai' ? 'text-black' : 'text-neutral-900 dark:text-white'}`}>
                  Brew IA
                </span>
                <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                  activePath === '/admin/ai'
                    ? 'bg-black/20 text-black'
                    : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                }`}>
                  ACTIVO
                </span>
              </div>
              <p className={`text-[10px] truncate mt-0.5 ${activePath === '/admin/ai' ? 'text-black/80' : 'text-neutral-500 dark:text-zinc-400'}`}>
                Copiloto Gastronómico
              </p>
            </div>
          </div>
        </a>
      </div>
    </nav>
  );
}
