import type { APIRoute } from 'astro';
import { db } from '../../../db';
import { kitchenTickets, kitchenTicketItems } from '../../../db/schema';
import { eq, desc } from 'drizzle-orm';

export const GET: APIRoute = async () => {
  try {
    const tickets = await db
      .select()
      .from(kitchenTickets)
      .where(eq(kitchenTickets.tenantId, 'tenant_001'))
      .orderBy(desc(kitchenTickets.createdAt));

    const items = await db.select().from(kitchenTicketItems);

    const result = tickets.map((t) => ({
      ...t,
      items: items
        .filter((i) => i.ticketId === t.id)
        .map((i) => ({
          ...i,
          modifiers: i.modifiers ? JSON.parse(i.modifiers) : [],
        })),
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
    const ticketId = `kt_${Date.now()}`;

    const createdTicket = await db
      .insert(kitchenTickets)
      .values({
        id: ticketId,
        tenantId: 'tenant_001',
        businessId: 'biz_001',
        ticketNumber: body.ticketNumber || Math.floor(Math.random() * 900 + 100),
        orderType: body.orderType || 'delivery',
        tableNumber: body.tableNumber,
        customerName: body.customerName || 'Cliente Mostrador',
        status: body.status || 'PENDING',
        notes: body.notes,
        targetMinutes: body.targetMinutes || 15,
      })
      .returning();

    if (body.items && body.items.length > 0) {
      for (const item of body.items) {
        await db.insert(kitchenTicketItems).values({
          id: `ki_${Date.now()}_${Math.random()}`,
          ticketId,
          productName: item.productName,
          quantity: item.quantity,
          variantName: item.variantName,
          modifiers: item.modifiers ? JSON.stringify(item.modifiers) : null,
          status: item.status || 'PENDING',
        });
      }
    }

    return new Response(JSON.stringify(createdTicket[0]), { status: 201 });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Error creating kitchen ticket', details: String(e) }), { status: 500 });
  }
};
