import React, { useState, useEffect } from 'react';
import { Search, Bell, ChevronDown, Sparkles, Sun, Moon, Check, User, ShieldCheck, LogOut, UserCheck } from 'lucide-react';

interface TopHeaderBarProps {
  userName?: string;
  userRole?: string;
  businessName?: string;
  notificationCount?: number;
}

export const TopHeaderBar: React.FC<TopHeaderBarProps> = ({
  userName = 'Juan Doe',
  userRole = 'Gerente General',
  businessName = 'brew.cl',
  notificationCount = 3,
}) => {
  const [selectedRange, setSelectedRange] = useState('Hoy');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [clerkUser, setClerkUser] = useState<{
    name: string;
    email: string;
    imageUrl?: string;
  } | null>(null);

  // Sync real Clerk session details
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const syncUser = () => {
        const w = window as any;
        if (w.Clerk?.user) {
          const u = w.Clerk.user;
          setClerkUser({
            name: u.fullName || u.firstName || u.username || userName,
            email: u.primaryEmailAddress?.emailAddress || 'admin@brew.cl',
            imageUrl: u.imageUrl,
          });
        }
      };

      syncUser();
      const interval = setInterval(syncUser, 1000);
      return () => clearInterval(interval);
    }
  }, [userName]);

  const handleSignOut = async () => {
    try {
      const w = window as any;
      if (w.Clerk) {
        await w.Clerk.signOut();
      }
    } catch (e) {
      console.warn('Sign out warning:', e);
    }
    window.location.href = '/sign-in';
  };

  // Initialize theme from localStorage or document class
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('bun_theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
      
      setIsDarkMode(shouldBeDark);
      if (shouldBeDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  const toggleTheme = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    if (nextMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('bun_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('bun_theme', 'light');
    }
  };

  const notificationsList = [
    { id: '1', title: 'Nuevo pedido #108 recibido', time: 'Hace 2 min', type: 'order' },
    { id: '2', title: 'Stock bajo en Café Arábica Smash', time: 'Hace 15 min', type: 'alert' },
    { id: '3', title: 'Comanda #104 lista en Barra', time: 'Hace 22 min', type: 'success' },
  ];

  return (
    <header className="h-16 px-4 md:px-8 border-b border-[#ECE4DA] dark:border-[#3D2420] bg-white/90 dark:bg-[#1F1210]/95 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between gap-4 transition-colors">
      {/* Left / Search Box */}
      <div className="flex-1 max-w-xl flex items-center gap-2.5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#8C7E73] dark:text-[#A8988B] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar pedidos, clientes, artículos del menú..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#FAF7F2] dark:bg-[#2A1916] border border-[#EAE1D6] dark:border-[#422722] text-xs text-coffee-950 dark:text-[#F4EFEA] placeholder-[#8C7E73] dark:placeholder-[#9C8C80] focus:outline-none focus:border-color4 dark:focus:border-color3 transition"
          />
        </div>

        {/* Date Filter Dropdown */}
        <div className="relative hidden sm:block">
          <select
            value={selectedRange}
            onChange={(e) => setSelectedRange(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 rounded-xl bg-[#FAF7F2] dark:bg-[#2A1916] border border-[#EAE1D6] dark:border-[#422722] text-xs font-semibold text-coffee-800 dark:text-[#E8DFD8] hover:border-[#D7C7B5] dark:hover:border-[#5C3832] focus:outline-none cursor-pointer transition"
          >
            <option value="Hoy">Hoy</option>
            <option value="Ayer">Ayer</option>
            <option value="Esta semana">Esta semana</option>
            <option value="Este mes">Este mes</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-[#8C7E73] dark:text-[#A8988B] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5 shrink-0 relative">
        {/* Theme Toggle Button (Light Latte vs Dark Espresso) */}
        <button
          type="button"
          onClick={toggleTheme}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF7F2] dark:bg-[#2A1916] border border-[#EAE1D6] dark:border-[#422722] text-xs font-bold text-coffee-800 dark:text-[#E8DFD8] hover:bg-[#F3EDE3] dark:hover:bg-[#38201C] transition"
          title={isDarkMode ? 'Cambiar a Modo Claro (Latte)' : 'Cambiar a Modo Oscuro (Espresso)'}
        >
          {isDarkMode ? (
            <>
              <Sun className="w-3.5 h-3.5 text-[#EAB308]" />
              <span className="hidden md:inline text-[11px]">Latte</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-color4" />
              <span className="hidden md:inline text-[11px]">Espresso</span>
            </>
          )}
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="relative p-2 rounded-xl bg-[#FAF7F2] dark:bg-[#2A1916] border border-[#EAE1D6] dark:border-[#422722] hover:bg-[#F3EDE3] dark:hover:bg-[#38201C] transition"
            title="Notificaciones del local"
          >
            <Bell className="w-4 h-4 text-[#70645A] dark:text-[#D4C5B9]" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-color4 text-white text-[9px] font-extrabold flex items-center justify-center shadow-sm">
                {notificationCount}
              </span>
            )}
          </button>

          {/* Notifications Flyout */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] rounded-2xl shadow-coffee-lg p-3 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#EAE1D6] dark:border-[#3D2420]">
                <h6 className="text-xs font-bold text-coffee-950 dark:text-white">Notificaciones ({notificationCount})</h6>
                <span className="text-[10px] text-color3 font-semibold cursor-pointer hover:underline">Limpiar</span>
              </div>
              <div className="space-y-2">
                {notificationsList.map((notif) => (
                  <div key={notif.id} className="p-2 rounded-xl bg-[#FAF7F2] dark:bg-[#2D1B18] border border-[#EAE1D6] dark:border-[#422722] text-xs">
                    <p className="font-semibold text-coffee-950 dark:text-[#F4EFEA] text-[11px]">{notif.title}</p>
                    <span className="text-[9px] text-[#8C7E73] dark:text-[#A8988B]">{notif.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="h-6 w-px bg-[#EAE1D6] dark:bg-[#3D2420] hidden sm:block" />

        {/* User Profile Pill */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2.5 pl-1.5 pr-2.5 py-1 rounded-xl bg-[#FAF7F2] dark:bg-[#2A1916] border border-[#EAE1D6] dark:border-[#422722] hover:bg-[#F3EDE3] dark:hover:bg-[#38201C] cursor-pointer transition"
          >
            {clerkUser?.imageUrl ? (
              <img
                src={clerkUser.imageUrl}
                alt={clerkUser.name}
                className="w-7 h-7 rounded-full object-cover shadow-sm border border-amber-500/40"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-amber-500 text-black font-black text-xs flex items-center justify-center shadow-sm">
                {(clerkUser?.name || userName)
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()}
              </div>
            )}
            <div className="hidden sm:block text-left">
              <h5 className="text-xs font-bold text-coffee-950 dark:text-white leading-none">
                {clerkUser?.name || userName}
              </h5>
              <span className="text-[10px] text-[#70645A] dark:text-[#A8988B] font-medium">{userRole}</span>
            </div>
            <ChevronDown className="w-3 h-3 text-[#8C7E73] dark:text-[#A8988B] hidden sm:block" />
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#1C1210] border border-[#EAE1D6] dark:border-[#3D2420] rounded-2xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-3 py-2 border-b border-[#EAE1D6] dark:border-[#3D2420]/80">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <p className="text-xs font-black text-coffee-950 dark:text-white truncate">
                    {clerkUser?.name || userName}
                  </p>
                </div>
                <p className="text-[10px] text-[#70645A] dark:text-zinc-400 truncate">
                  {clerkUser?.email || 'admin@brew.cl'}
                </p>
              </div>

              <div className="py-1.5 space-y-0.5">
                <a
                  href="/admin/settings"
                  className="block px-3 py-1.5 text-xs text-coffee-800 dark:text-[#E8DFD8] hover:bg-[#FAF7F2] dark:hover:bg-[#2D1B18] rounded-lg transition"
                >
                  Configuración del Local
                </a>
                <a
                  href="/menu/burger-craft"
                  target="_blank"
                  className="block px-3 py-1.5 text-xs text-amber-500 font-bold hover:bg-[#FAF7F2] dark:hover:bg-[#2D1B18] rounded-lg transition"
                >
                  Ver Carta Digital ↗
                </a>
              </div>

              <div className="pt-1 border-t border-[#EAE1D6] dark:border-[#3D2420]/80">
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-rose-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopHeaderBar;
