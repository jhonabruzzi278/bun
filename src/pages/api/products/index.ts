import type { APIRoute } from 'astro';
import { db } from '../../../db';
import { products, productVariants, productModifiers } from '../../../db/schema';
import { eq, asc } from 'drizzle-orm';

export const GET: APIRoute = async () => {
  try {
    const prods = await db
      .select()
      .from(products)
      .where(eq(products.tenantId, 'tenant_001'))
      .orderBy(asc(products.position));

    const variants = await db
      .select()
      .from(productVariants)
      .where(eq(productVariants.tenantId, 'tenant_001'));

    const modifiers = await db
      .select()
      .from(productModifiers)
      .where(eq(productModifiers.tenantId, 'tenant_001'));

    const result = prods.map((p) => ({
      ...p,
      variants: variants.filter((v) => v.productId === p.id),
      modifiers: modifiers.filter((m) => m.productId === p.id),
    }));

    return new Response(JSON.stringify(result), {
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
    const prodId = `prod_${Date.now()}`;

    const createdProd = await db
      .insert(products)
      .values({
        id: prodId,
        tenantId: 'tenant_001',
        businessId: 'biz_001',
        categoryId: body.categoryId,
        name: body.name,
        description: body.description,
        price: body.price,
        compareAtPrice: body.compareAtPrice,
        imageUrl: body.imageUrl,
        sku: body.sku,
        position: body.position || 0,
        isFeatured: body.isFeatured ?? false,
        isVisible: body.isVisible ?? true,
        isAvailable: body.isAvailable ?? true,
      })
      .returning();

    if (body.variants && body.variants.length > 0) {
      for (const v of body.variants) {
        await db.insert(productVariants).values({
          id: `v_${Date.now()}_${Math.random()}`,
          tenantId: 'tenant_001',
          productId: prodId,
          name: v.name,
          priceDelta: v.priceDelta || 0,
          isDefault: v.isDefault || false,
        });
      }
    }

    if (body.modifiers && body.modifiers.length > 0) {
      for (const m of body.modifiers) {
        await db.insert(productModifiers).values({
          id: `m_${Date.now()}_${Math.random()}`,
          tenantId: 'tenant_001',
          productId: prodId,
          groupName: m.groupName || 'Extras',
          name: m.name,
          price: m.price || 0,
          maxQuantity: m.maxQuantity || 1,
        });
      }
    }

    return new Response(JSON.stringify(createdProd[0]), { status: 201 });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Error creating product', details: String(e) }), { status: 500 });
  }
};
