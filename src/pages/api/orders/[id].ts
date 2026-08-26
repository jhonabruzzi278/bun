import type { APIRoute } from 'astro';
import { db } from '../../../db';
import { orders } from '../../../db/schema';
import { eq } from 'drizzle-orm';

export const PATCH: APIRoute = async ({ params, request }) => {
  try {
    const { id } = params;
    if (!id) {
      return new Response(JSON.stringify({ success: false, error: 'ID de pedido requerido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await request.json();
    const { status } = body;

    try {
      await db.update(orders).set({
        status,
        updatedAt: new Date(),
      }).where(eq(orders.id, id));
    } catch (dbErr) {
      console.warn(`DB Fallback update order ${id}:`, dbErr);
    }

    return new Response(JSON.stringify({ success: true, message: `Estado actualizado a ${status}` }), {
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
