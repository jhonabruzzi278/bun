import type { APIRoute } from 'astro';
import { db } from '../../db';
import { products } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { INITIAL_PRODUCTS } from '../../lib/mockData';

export const GET: APIRoute = async () => {
  try {
    try {
      const dbProducts = await db.select().from(products);
      if (dbProducts.length > 0) {
        return new Response(JSON.stringify({ success: true, data: dbProducts }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    } catch (dbErr) {
      console.warn('DB Fallback en /api/products:', dbErr);
    }

    return new Response(JSON.stringify({ success: true, data: INITIAL_PRODUCTS }), {
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
    const newProduct = {
      id: body.id || `prod_${Date.now()}`,
      tenantId: 'tenant_001',
      businessId: 'biz_001',
      categoryId: body.categoryId || 'cat_burgers',
      name: body.name,
      description: body.description || '',
      price: Number(body.price) || 0,
      compareAtPrice: body.compareAtPrice ? Number(body.compareAtPrice) : null,
      imageUrl: body.imageUrl || '',
      sku: body.sku || '',
      position: body.position || 0,
      isFeatured: body.isFeatured ?? false,
      isVisible: body.isVisible ?? true,
      isAvailable: body.isAvailable ?? true,
    };

    try {
      await db.insert(products).values(newProduct);
    } catch (dbErr) {
      console.warn('DB Fallback insert en /api/products:', dbErr);
    }

    return new Response(JSON.stringify({ success: true, data: newProduct }), {
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
