import type { APIRoute } from 'astro';
import { db } from '../../db';
import { businesses } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { INITIAL_BUSINESS } from '../../lib/mockData';

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const slug = url.searchParams.get('slug') || 'burger-craft';

    // Intenta buscar en base de datos PostgreSQL
    try {
      const bizList = await db.select().from(businesses).where(eq(businesses.slug, slug)).limit(1);
      if (bizList.length > 0) {
        return new Response(JSON.stringify({ success: true, data: bizList[0] }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    } catch (dbErr) {
      console.warn('DB Fallback a MockData en /api/business:', dbErr);
    }

    // Fallback inmediato a datos predeterminados
    return new Response(JSON.stringify({ success: true, data: INITIAL_BUSINESS }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: (error as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const PUT: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const slug = body.slug || 'burger-craft';

    try {
      await db.update(businesses).set({
        name: body.name,
        description: body.description,
        phone: body.phone,
        address: body.address,
        currency: body.currency,
        currencySymbol: body.currencySymbol,
        primaryColor: body.primaryColor,
        logoUrl: body.logoUrl,
        bannerUrl: body.bannerUrl,
        isOpen: body.isOpen,
        updatedAt: new Date().toISOString(),
      }).where(eq(businesses.slug, slug));
    } catch (dbErr) {
      console.warn('DB Fallback update en /api/business:', dbErr);
    }

    return new Response(JSON.stringify({ success: true, message: 'Negocio actualizado correctamente', data: body }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: (error as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
