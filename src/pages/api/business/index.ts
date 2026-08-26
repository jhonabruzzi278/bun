import type { APIRoute } from 'astro';
import { db } from '../../../db';
import { businesses } from '../../../db/schema';
import { eq } from 'drizzle-orm';

export const GET: APIRoute = async () => {
  try {
    const biz = await db.query.businesses.findFirst({
      where: eq(businesses.tenantId, 'tenant_001'),
    });

    if (!biz) {
      return new Response(JSON.stringify({ error: 'Business not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(biz), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Database error', details: String(e) }), { status: 500 });
  }
};

export const PUT: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    await db
      .update(businesses)
      .set({
        name: body.name,
        slug: body.slug,
        description: body.description,
        logoUrl: body.logoUrl,
        bannerUrl: body.bannerUrl,
        phone: body.phone,
        address: body.address,
        primaryColor: body.primaryColor,
        whatsappOrders: body.whatsappOrders,
        updatedAt: new Date(),
      })
      .where(eq(businesses.tenantId, 'tenant_001'));

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Error updating business', details: String(e) }), { status: 500 });
  }
};
