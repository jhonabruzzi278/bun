import type { TenantAccount } from '../types';

// Mock initial client restaurants for brew.cl
const INITIAL_TENANTS: TenantAccount[] = [
  {
    id: 'tenant_001',
    name: 'Burger Craft Santiago',
    slug: 'burger-craft',
    plan: 'FREE_TRIAL',
    subscriptionStatus: 'TRIAL',
    isActive: true,
    trialEndsAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // Vence en 3 días (Alerta preventiva)
    ownerName: 'Matías Osorio',
    ownerEmail: 'matias@burgercraft.cl',
    ownerPhone: '+56987654321',
    city: 'Providencia, Santiago',
    createdAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
    daysRemaining: 3,
  },
  {
    id: 'tenant_002',
    name: 'Cervecería Krossbar Bellavista',
    slug: 'krossbar-bellavista',
    plan: 'FREE_TRIAL',
    subscriptionStatus: 'EXPIRED',
    isActive: false, // Bloqueado por término de prueba gratuita
    trialEndsAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // Venció hace 2 días
    ownerName: 'Ignacio Valdés',
    ownerEmail: 'ignacio@cerveceriakross.cl',
    ownerPhone: '+56991234567',
    city: 'Recoleta, Santiago',
    createdAt: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString(),
    daysRemaining: -2,
  },
  {
    id: 'tenant_003',
    name: 'La Birrería Valparaíso',
    slug: 'la-birreria-valpo',
    plan: 'PRO',
    subscriptionStatus: 'ACTIVE',
    isActive: true, // Suscrito formalmente
    trialEndsAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    ownerName: 'Camila Sepúlveda',
    ownerEmail: 'camila@labirreria.cl',
    ownerPhone: '+56976543210',
    city: 'Cerro Alegre, Valparaíso',
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    daysRemaining: 365,
  },
  {
    id: 'tenant_004',
    name: 'Smash & Beer Concepción',
    slug: 'smash-beer-conce',
    plan: 'FREE_TRIAL',
    subscriptionStatus: 'TRIAL',
    isActive: true,
    trialEndsAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // Vence en 10 días
    ownerName: 'Rodrigo Fuentes',
    ownerEmail: 'rodrigo@smashbeer.cl',
    ownerPhone: '+56955443322',
    city: 'Concepción, Biobío',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    daysRemaining: 10,
  }
];

// Persistent state key in memory / global
const GLOBAL_KEY = Symbol.for('brew.platform.tenants');
const g = globalThis as unknown as { [GLOBAL_KEY]?: TenantAccount[] };

if (!g[GLOBAL_KEY]) {
  g[GLOBAL_KEY] = [...INITIAL_TENANTS];
}

function calculateDaysRemaining(trialEndsAt: string): number {
  const diff = new Date(trialEndsAt).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function getAllTenants(): TenantAccount[] {
  const tenants = g[GLOBAL_KEY]!;
  return tenants.map((t) => {
    const days = calculateDaysRemaining(t.trialEndsAt);
    let status = t.subscriptionStatus;
    if (status === 'TRIAL' && days < 0) {
      status = 'EXPIRED';
    }
    return {
      ...t,
      daysRemaining: days,
      subscriptionStatus: status,
    };
  });
}

export function getTenantBySlug(slug: string): TenantAccount | undefined {
  return getAllTenants().find((t) => t.slug === slug);
}

export function getTenantById(id: string): TenantAccount | undefined {
  return getAllTenants().find((t) => t.id === id);
}

export function updateTenantAccess(id: string, isActive: boolean): TenantAccount | null {
  const list = g[GLOBAL_KEY]!;
  const idx = list.findIndex((t) => t.id === id);
  if (idx === -1) return null;

  list[idx].isActive = isActive;
  if (!isActive && list[idx].subscriptionStatus === 'TRIAL') {
    list[idx].subscriptionStatus = 'SUSPENDED';
  } else if (isActive && list[idx].subscriptionStatus === 'SUSPENDED') {
    list[idx].subscriptionStatus = 'TRIAL';
  }
  return list[idx];
}

export function extendTenantTrial(id: string, daysToAdd: number = 14): TenantAccount | null {
  const list = g[GLOBAL_KEY]!;
  const idx = list.findIndex((t) => t.id === id);
  if (idx === -1) return null;

  const currentEndDate = new Date(list[idx].trialEndsAt);
  const baseDate = currentEndDate.getTime() > Date.now() ? currentEndDate : new Date();
  const newEndDate = new Date(baseDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000);

  list[idx].trialEndsAt = newEndDate.toISOString();
  list[idx].subscriptionStatus = 'TRIAL';
  list[idx].isActive = true;
  return list[idx];
}

export function setTenantPlan(id: string, plan: 'PRO' | 'ENTERPRISE'): TenantAccount | null {
  const list = g[GLOBAL_KEY]!;
  const idx = list.findIndex((t) => t.id === id);
  if (idx === -1) return null;

  list[idx].plan = plan;
  list[idx].subscriptionStatus = 'ACTIVE';
  list[idx].isActive = true;
  list[idx].trialEndsAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();
  return list[idx];
}

export function createNewTenantClient(data: {
  name: string;
  slug: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  city: string;
  trialDays?: number;
}): TenantAccount {
  const list = g[GLOBAL_KEY]!;
  const trialDays = data.trialDays || 14;
  const newTenant: TenantAccount = {
    id: `tenant_${Date.now()}`,
    name: data.name,
    slug: data.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
    plan: 'FREE_TRIAL',
    subscriptionStatus: 'TRIAL',
    isActive: true,
    trialEndsAt: new Date(Date.now() + trialDays * 24 * 60 * 60 * 1000).toISOString(),
    ownerName: data.ownerName,
    ownerEmail: data.ownerEmail,
    ownerPhone: data.ownerPhone,
    city: data.city,
    createdAt: new Date().toISOString(),
    daysRemaining: trialDays,
  };

  list.unshift(newTenant);
  return newTenant;
}

export function buildSuperadminClientWhatsAppLink(tenant: TenantAccount): string {
  const cleanPhone = tenant.ownerPhone.replace(/[^0-9]/g, '');
  let message = '';
  if (tenant.daysRemaining <= 0) {
    message = `Hola ${tenant.ownerName}! 👋 Te escribo de brew.cl respecto a tu cuenta de ${tenant.name}. Tu período de prueba de 14 días ha finalizado. ¿Te gustaría activar tu plan Pro para continuar operando sin interrupción?`;
  } else if (tenant.daysRemaining <= 3) {
    message = `Hola ${tenant.ownerName}! 👋 Te escribo de brew.cl respecto a ${tenant.name}. Te quedan ${tenant.daysRemaining} días de prueba gratuita. ¿Cómo ha sido tu experiencia con la carta QR y el KDS?`;
  } else {
    message = `Hola ${tenant.ownerName}! 👋 Te escribo de brew.cl para saludarte y ver cómo va la operación en ${tenant.name}.`;
  }
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
