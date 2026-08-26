import type { APIRoute } from 'astro';
import { db } from '../../db';
import { categories } from '../../db/schema';
import { INITIAL_CATEGORIES } from '../../lib/mockData';

export const GET: APIRoute = async () => {
  try {
    try {
      const dbCategories = await db.select().from(categories);
      if (dbCategories.length > 0) {
        return new Response(JSON.stringify({ success: true, data: dbCategories }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    } catch (dbErr) {
      console.warn('DB Fallback en /api/categories:', dbErr);
    }

    return new Response(JSON.stringify({ success: true, data: INITIAL_CATEGORIES }), {
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

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const newCategory = {
      id: body.id || `cat_${Date.now()}`,
      tenantId: 'tenant_001',
      businessId: 'biz_001',
      name: body.name,
      slug: body.slug || body.name.toLowerCase().replace(/\s+/g, '-'),
      description: body.description || '',
      position: body.position || 0,
      isVisible: body.isVisible ?? true,
    };

    try {
      await db.insert(categories).values(newCategory);
    } catch (dbErr) {
      console.warn('DB Fallback insert en /api/categories:', dbErr);
    }

    return new Response(JSON.stringify({ success: true, data: newCategory }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: (error as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
