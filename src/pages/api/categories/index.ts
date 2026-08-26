import type { APIRoute } from 'astro';
import { db } from '../../../db';
import { categories } from '../../../db/schema';
import { eq, asc } from 'drizzle-orm';

export const GET: APIRoute = async () => {
  try {
    const list = await db
      .select()
      .from(categories)
      .where(eq(categories.tenantId, 'tenant_001'))
      .orderBy(asc(categories.position));

    return new Response(JSON.stringify(list), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Database error', details: String(e) }), { status: 500 });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const newCat = await db
      .insert(categories)
      .values({
        id: `cat_${Date.now()}`,
        tenantId: 'tenant_001',
        businessId: 'biz_001',
        name: body.name,
        slug: body.slug,
        description: body.description,
        imageUrl: body.imageUrl,
        position: body.position || 0,
        isVisible: body.isVisible ?? true,
      })
      .returning();

    return new Response(JSON.stringify(newCat[0]), { status: 201 });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Error creating category', details: String(e) }), { status: 500 });
  }
};
