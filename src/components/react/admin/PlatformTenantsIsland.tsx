import React, { useState, useEffect } from 'react';
import type { TenantAccount } from '@/lib/types';
import {
  Users,
  AlertTriangle,
  Lock,
  Unlock,
  Plus,
  Clock,
  CheckCircle,
  MessageCircle,
  ExternalLink,
  Search,
  Building,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { buildSuperadminClientWhatsAppLink } from '@/lib/platform/tenantService';

interface Stats {
  total: number;
  activeTrials: number;
  expiringSoon: number;
  expired: number;
  suspended: number;
  subscribed: number;
}

export default function PlatformTenantsIsland() {
  const [tenants, setTenants] = useState<TenantAccount[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    activeTrials: 0,
    expiringSoon: 0,
    expired: 0,
    suspended: 0,
    subscribed: 0,
  });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'ALL' | 'EXPIRING' | 'EXPIRED' | 'SUSPENDED' | 'ACTIVE'>('ALL');
  const [search, setSearch] = useState('');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  // New Client Form
  const [newName, setNewName] = useState('');
  const [newSlug, setNewSlug] = useState('');
  const [newOwnerName, setNewOwnerName] = useState('');
  const [newOwnerEmail, setNewOwnerEmail] = useState('');
  const [newOwnerPhone, setNewOwnerPhone] = useState('+569');
  const [newCity, setNewCity] = useState('Santiago');
  const [newTrialDays, setNewTrialDays] = useState(14);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchTenants = async () => {
    try {
      const res = await fetch('/api/platform/tenants');
      if (res.ok) {
        const data = await res.json();
        setTenants(data.tenants || []);
        setStats(data.stats || {});
      }
    } catch (e) {
      console.error('Error fetching tenants:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  const handleToggleAccess = async (tenantId: string, currentStatus: boolean) => {
    try {
      const res = await fetch('/api/platform/tenants', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: tenantId,
          action: 'TOGGLE_ACCESS',
          value: !currentStatus,
        }),
      });
      if (res.ok) {
        await fetchTenants();
      }
    } catch (e) {
      console.error('Error toggling access:', e);
    }
  };

  const handleExtendTrial = async (tenantId: string, days: number = 14) => {
    try {
      const res = await fetch('/api/platform/tenants', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: tenantId,
          action: 'EXTEND_TRIAL',
          value: days,
        }),
      });
      if (res.ok) {
        await fetchTenants();
      }
    } catch (e) {
      console.error('Error extending trial:', e);
    }
  };

  const handleUpgradePlan = async (tenantId: string, plan: 'PRO' | 'ENTERPRISE' = 'PRO') => {
    try {
      const res = await fetch('/api/platform/tenants', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: tenantId,
          action: 'UPGRADE_PLAN',
          value: plan,
        }),
      });
      if (res.ok) {
        await fetchTenants();
      }
    } catch (e) {
      console.error('Error upgrading plan:', e);
    }
  };

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newSlug || !newOwnerEmail) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/platform/tenants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newName,
          slug: newSlug,
          ownerName: newOwnerName,
          ownerEmail: newOwnerEmail,
          ownerPhone: newOwnerPhone,
          city: newCity,
          trialDays: newTrialDays,
        }),
      });
      if (res.ok) {
        setIsNewModalOpen(false);
        setNewName('');
        setNewSlug('');
        setNewOwnerName('');
        setNewOwnerEmail('');
        await fetchTenants();
      }
    } catch (err) {
      console.error('Error creating tenant:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredTenants = tenants.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.ownerName.toLowerCase().includes(search.toLowerCase()) ||
      t.slug.toLowerCase().includes(search.toLowerCase()) ||
      t.ownerPhone.includes(search);

    if (!matchesSearch) return false;

    if (filter === 'EXPIRING') return t.subscriptionStatus === 'TRIAL' && t.isActive && t.daysRemaining <= 3 && t.daysRemaining >= 0;
    if (filter === 'EXPIRED') return t.subscriptionStatus === 'EXPIRED' || t.daysRemaining < 0;
    if (filter === 'SUSPENDED') return !t.isActive;
    if (filter === 'ACTIVE') return t.subscriptionStatus === 'ACTIVE';
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-[#151518] border border-white/[0.08] shadow-2xl">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-black text-2xl shadow-inner">
            🛡️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-white tracking-tight">
                Panel Maestro de Clientes & Free Trials
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-300 font-bold border border-amber-400/30">
                SUPERADMIN brew.cl
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Gestión manual de acceso, alertas de término de prueba y activación de restaurantes clientes.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={fetchTenants}
            className="p-2.5 rounded-2xl bg-white/[0.05] border border-white/[0.08] text-zinc-300 hover:text-white hover:bg-white/[0.1] transition"
            title="Recargar datos"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setIsNewModalOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 text-black font-black text-xs shadow-lg shadow-amber-500/20 flex items-center gap-2 hover:brightness-110 active:scale-95 transition"
          >
            <Plus className="w-4 h-4" />
            <span>+ Dar de Alta Cliente</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div className="p-4 rounded-2xl bg-[#151518] border border-white/[0.08] space-y-1">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[11px] font-bold">Total Clientes</span>
            <Users className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-black text-white font-mono">{stats.total}</p>
          <span className="text-[10px] text-zinc-500">Restaurantes en plataforma</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#151518] border border-white/[0.08] space-y-1">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[11px] font-bold">Pruebas Activas</span>
            <Clock className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl font-black text-blue-400 font-mono">{stats.activeTrials}</p>
          <span className="text-[10px] text-zinc-500">En período de 14 días</span>
        </div>

        <div className="p-4 rounded-2xl bg-amber-500/[0.08] border border-amber-500/30 space-y-1">
          <div className="flex items-center justify-between text-amber-300">
            <span className="text-[11px] font-bold">Por Vencer (≤3d)</span>
            <AlertTriangle className="w-4 h-4 text-amber-400 animate-bounce" />
          </div>
          <p className="text-2xl font-black text-amber-400 font-mono">{stats.expiringSoon}</p>
          <span className="text-[10px] text-amber-300/80">Alerta de seguimiento</span>
        </div>

        <div className="p-4 rounded-2xl bg-rose-500/[0.08] border border-rose-500/30 space-y-1">
          <div className="flex items-center justify-between text-rose-300">
            <span className="text-[11px] font-bold">Pruebas Vencidas</span>
            <Lock className="w-4 h-4 text-rose-400" />
          </div>
          <p className="text-2xl font-black text-rose-400 font-mono">{stats.expired}</p>
          <span className="text-[10px] text-rose-300/80">Candidatos a cobro</span>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-500/[0.08] border border-emerald-500/30 space-y-1">
          <div className="flex items-center justify-between text-emerald-300">
            <span className="text-[11px] font-bold">Suscritos PRO</span>
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-emerald-400 font-mono">{stats.subscribed}</p>
          <span className="text-[10px] text-emerald-300/80">Cuentas pagadas</span>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-2xl bg-[#151518] border border-white/[0.08]">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {(['ALL', 'EXPIRING', 'EXPIRED', 'SUSPENDED', 'ACTIVE'] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                filter === f
                  ? 'bg-amber-500 text-black shadow-md font-black'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              {f === 'ALL' && 'Todos los Clientes'}
              {f === 'EXPIRING' && '⚠️ Vencen Pronto (≤3d)'}
              {f === 'EXPIRED' && '⛔ Pruebas Vencidas'}
              {f === 'SUSPENDED' && '🔒 Bloqueados'}
              {f === 'ACTIVE' && '💎 Suscritos'}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por local o dueño..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-black/40 border border-white/[0.1] text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-400 font-medium"
          />
        </div>
      </div>

      {/* Client List */}
      <div className="space-y-3">
        {filteredTenants.length === 0 ? (
          <div className="text-center py-12 rounded-3xl bg-[#151518] border border-dashed border-white/[0.1]">
            <Building className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
            <p className="text-sm font-bold text-zinc-300">No hay clientes con este filtro</p>
            <p className="text-xs text-zinc-500 mt-0.5">Prueba seleccionando "Todos los Clientes" o ajusta tu búsqueda.</p>
          </div>
        ) : (
          filteredTenants.map((t) => {
            const isExpiringSoon = t.subscriptionStatus === 'TRIAL' && t.isActive && t.daysRemaining <= 3 && t.daysRemaining >= 0;
            const isExpired = t.subscriptionStatus === 'EXPIRED' || t.daysRemaining < 0;
            const isSuspended = !t.isActive;
            const whatsappLink = buildSuperadminClientWhatsAppLink(t);

            return (
              <div
                key={t.id}
                className={`p-5 rounded-3xl border transition-all duration-200 ${
                  isSuspended
                    ? 'bg-rose-950/20 border-rose-500/30'
                    : isExpiringSoon
                    ? 'bg-amber-950/20 border-amber-500/40'
                    : 'bg-[#151518] border-white/[0.08] hover:border-white/[0.2]'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Business & Owner Info */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="font-black text-white text-base leading-tight">
                        {t.name}
                      </h3>
                      <a
                        href={`/menu/${t.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-mono text-amber-400 hover:underline flex items-center gap-1"
                      >
                        /{t.slug}
                        <ExternalLink className="w-3 h-3" />
                      </a>

                      {/* Badges */}
                      {t.subscriptionStatus === 'ACTIVE' ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          💎 Plan {t.plan} Activo
                        </span>
                      ) : isExpired ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          Prueba Gratuita Finalizada
                        </span>
                      ) : isExpiringSoon ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1 animate-pulse">
                          <Clock className="w-3 h-3" />
                          Quedan {t.daysRemaining} días de prueba
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40">
                          ⏳ Prueba Activa ({t.daysRemaining} días)
                        </span>
                      )}

                      {isSuspended && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-950 text-rose-400 border border-rose-800">
                          🔒 LOGIN BLOQUEADO
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-xs text-zinc-400 flex-wrap">
                      <span>👤 Dueño: <strong className="text-zinc-200">{t.ownerName}</strong></span>
                      <span>📧 {t.ownerEmail}</span>
                      <span>📱 {t.ownerPhone}</span>
                      <span>📍 {t.city}</span>
                    </div>
                  </div>

                  {/* Actions for Superadmin */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Direct WhatsApp Message */}
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-sm"
                      title="Abrir chat en WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Contactar</span>
                    </a>

                    {/* Extend Trial */}
                    <button
                      type="button"
                      onClick={() => handleExtendTrial(t.id, 14)}
                      className="px-3 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-zinc-200 font-bold text-xs flex items-center gap-1 transition"
                      title="Dar 14 días adicionales de prueba gratuita"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>+14 Días</span>
                    </button>

                    {/* Set to Paid Pro */}
                    {t.subscriptionStatus !== 'ACTIVE' && (
                      <button
                        type="button"
                        onClick={() => handleUpgradePlan(t.id, 'PRO')}
                        className="px-3 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-bold text-xs transition"
                        title="Marcar como cliente pagado (Suscripción activa)"
                      >
                        Activar PRO
                      </button>
                    )}

                    {/* Toggle Login Access (Lock / Unlock) */}
                    <button
                      type="button"
                      onClick={() => handleToggleAccess(t.id, t.isActive)}
                      className={`px-3.5 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition ${
                        t.isActive
                          ? 'bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300'
                          : 'bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300'
                      }`}
                    >
                      {t.isActive ? (
                        <>
                          <Lock className="w-3.5 h-3.5" />
                          <span>Bloquear Login</span>
                        </>
                      ) : (
                        <>
                          <Unlock className="w-3.5 h-3.5" />
                          <span>Habilitar Acceso</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Create New Client Modal */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#18181C] border border-white/[0.1] rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-5 animate-scale-up">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  ➕
                </div>
                <h3 className="font-black text-white text-base">Dar de Alta Nuevo Restaurante</h3>
              </div>
              <button
                onClick={() => setIsNewModalOpen(false)}
                className="text-zinc-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateClient} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-white block mb-1">Nombre del Local</label>
                <input
                  type="text"
                  required
                  placeholder="ej. Cervecería Kunstmann Bar"
                  value={newName}
                  onChange={(e) => {
                    setNewName(e.target.value);
                    if (!newSlug) {
                      setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-'));
                    }
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-zinc-700 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-white block mb-1">URL / Slug</label>
                  <input
                    type="text"
                    required
                    placeholder="kunstmann-bar"
                    value={newSlug}
                    onChange={(e) => setNewSlug(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-zinc-700 text-xs font-mono text-amber-300 placeholder:text-zinc-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-white block mb-1">Días de Prueba</label>
                  <input
                    type="number"
                    min="1"
                    max="90"
                    value={newTrialDays}
                    onChange={(e) => setNewTrialDays(parseInt(e.target.value) || 14)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-zinc-700 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-white block mb-1">Nombre del Dueño</label>
                  <input
                    type="text"
                    placeholder="ej. Armin Kunstmann"
                    value={newOwnerName}
                    onChange={(e) => setNewOwnerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-zinc-700 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-white block mb-1">Ciudad</label>
                  <input
                    type="text"
                    placeholder="ej. Valdivia"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-zinc-700 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-white block mb-1">Email del Dueño</label>
                  <input
                    type="email"
                    required
                    placeholder="armin@kunstmann.cl"
                    value={newOwnerEmail}
                    onChange={(e) => setNewOwnerEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-zinc-700 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-white block mb-1">Teléfono / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    placeholder="+56912345678"
                    value={newOwnerPhone}
                    onChange={(e) => setNewOwnerPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-zinc-700 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setIsNewModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-zinc-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs transition shadow-md"
                >
                  {isSubmitting ? 'Registrando...' : 'Dar de Alta'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
