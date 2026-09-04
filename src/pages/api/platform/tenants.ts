import type { APIRoute } from 'astro';
import {
  getAllTenants,
  updateTenantAccess,
  extendTenantTrial,
  setTenantPlan,
  createNewTenantClient,
} from '@/lib/platform/tenantService';

export const GET: APIRoute = async () => {
  const tenants = getAllTenants();

  const total = tenants.length;
  const activeTrials = tenants.filter(
    (t) => t.subscriptionStatus === 'TRIAL' && t.isActive && t.daysRemaining > 3
  ).length;
  const expiringSoon = tenants.filter(
    (t) => t.subscriptionStatus === 'TRIAL' && t.isActive && t.daysRemaining <= 3 && t.daysRemaining >= 0
  ).length;
  const expired = tenants.filter(
    (t) => t.subscriptionStatus === 'EXPIRED' || t.daysRemaining < 0
  ).length;
  const suspended = tenants.filter((t) => !t.isActive).length;
  const subscribed = tenants.filter((t) => t.subscriptionStatus === 'ACTIVE').length;

  return new Response(
    JSON.stringify({
      tenants,
      stats: {
        total,
        activeTrials,
        expiringSoon,
        expired,
        suspended,
        subscribed,
      },
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};

export const PATCH: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { id, action, value } = body;

    if (!id || !action) {
      return new Response(JSON.stringify({ error: 'Faltan parámetros id y action' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let updatedTenant = null;

    if (action === 'TOGGLE_ACCESS') {
      updatedTenant = updateTenantAccess(id, Boolean(value));
    } else if (action === 'EXTEND_TRIAL') {
      const days = Number(value) || 14;
      updatedTenant = extendTenantTrial(id, days);
    } else if (action === 'UPGRADE_PLAN') {
      updatedTenant = setTenantPlan(id, value === 'ENTERPRISE' ? 'ENTERPRISE' : 'PRO');
    }

    if (!updatedTenant) {
      return new Response(JSON.stringify({ error: 'Tenant no encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        tenant: updatedTenant,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Error interno' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, slug, ownerName, ownerEmail, ownerPhone, city, trialDays } = body;

    if (!name || !slug || !ownerEmail) {
      return new Response(
        JSON.stringify({ error: 'Campos requeridos: name, slug, ownerEmail' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const newTenant = createNewTenantClient({
      name,
      slug,
      ownerName: ownerName || 'Administrador',
      ownerEmail,
      ownerPhone: ownerPhone || '+56900000000',
      city: city || 'Chile',
      trialDays: Number(trialDays) || 14,
    });

    return new Response(JSON.stringify({ success: true, tenant: newTenant }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Error interno' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
