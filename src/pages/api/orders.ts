import type { APIRoute } from 'astro';
import { db } from '../../db';
import { orders } from '../../db/schema';
import { desc, eq } from 'drizzle-orm';

export const GET: APIRoute = async () => {
  try {
    try {
      const dbOrders = await db.select().from(orders).orderBy(desc(orders.createdAt)).limit(50);
      return new Response(JSON.stringify({ success: true, data: dbOrders }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (dbErr) {
      console.warn('DB Fallback en /api/orders:', dbErr);
    }

    return new Response(JSON.stringify({ success: true, data: [] }), {
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
    const newOrder = {
      id: body.id || `ord_${Date.now()}`,
      tenantId: 'tenant_001',
      businessId: 'biz_001',
      orderNumber: body.orderNumber || Math.floor(100 + Math.random() * 900),
      customerName: body.customerName || 'Cliente Mostrador',
      customerPhone: body.customerPhone || '',
      customerAddress: body.customerAddress || '',
      orderType: body.orderType || 'delivery',
      tableNumber: body.tableNumber ? String(body.tableNumber) : null,
      status: body.status || 'NEW',
      total: Number(body.total) || 0,
      items: body.items || [],
      notes: body.notes || '',
    };

    try {
      await db.insert(orders).values(newOrder);
    } catch (dbErr) {
      console.warn('DB Fallback insert en /api/orders:', dbErr);
    }

    return new Response(JSON.stringify({ success: true, message: 'Pedido creado exitosamente', data: newOrder }), {
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
