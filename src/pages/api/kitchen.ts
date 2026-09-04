import type { APIRoute } from 'astro';
import { db } from '../../db';
import { kitchenTickets, kitchenTicketItems } from '../../db/schema';
import { desc, eq, inArray } from 'drizzle-orm';

function parseItemModifiers(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.map((m) => {
        if (typeof m === 'string') return m;
        if (m && typeof m === 'object') {
          const qty = (m as any).quantity ? `${(m as any).quantity}x ` : '';
          const name = (m as any).modifier?.name || (m as any).name || 'Extra';
          return `${qty}${name}`;
        }
        return String(m);
      });
    }
    return [String(parsed)];
  } catch {
    return [raw];
  }
}

function inferStation(productName: string): string {
  const lower = (productName || '').toLowerCase();
  if (lower.includes('cerveza') || lower.includes('limonada') || lower.includes('bebida') || lower.includes('trago') || lower.includes('jugo') || lower.includes('agua') || lower.includes('café') || lower.includes('coctel') || lower.includes('cocktail')) {
    return 'BAR';
  }
  if (lower.includes('papa') || lower.includes('aro') || lower.includes('nugget') || lower.includes('empanada') || lower.includes('fry') || lower.includes('frit')) {
    return 'FRY';
  }
  return 'GRILL';
}

export const GET: APIRoute = async () => {
  try {
    const tickets = await db.select().from(kitchenTickets).orderBy(desc(kitchenTickets.createdAt)).limit(50);
    
    if (tickets.length === 0) {
      return new Response(JSON.stringify({ success: true, data: [] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const ticketIds = tickets.map((t) => t.id);
    const items = await db
      .select()
      .from(kitchenTicketItems)
      .where(inArray(kitchenTicketItems.ticketId, ticketIds));

    const fullTickets = tickets.map((t) => {
      const ticketItems = items
        .filter((i) => i.ticketId === t.id)
        .map((i) => ({
          ...i,
          modifiers: parseItemModifiers(i.modifiers),
          stationCode: inferStation(i.productName),
        }));

      return {
        ...t,
        items: ticketItems,
      };
    });

    return new Response(JSON.stringify({ success: true, data: fullTickets }), {
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

export const PATCH: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { ticketId, status, cancellationReason } = body;

    if (!ticketId || !status) {
      return new Response(JSON.stringify({ success: false, error: 'ticketId and status are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const now = new Date().toISOString();
    const patchData: Record<string, unknown> = {
      status,
      updatedAt: now,
    };

    if (status === 'PREPARING') patchData.prepStartedAt = now;
    if (status === 'READY') patchData.readyAt = now;
    if (status === 'DELIVERED') patchData.deliveredAt = now;
    if (status === 'CANCELLED') {
      patchData.cancelledAt = now;
      patchData.cancellationReason = cancellationReason || 'Cancelado por el operador';
    }

    await db.update(kitchenTickets).set(patchData).where(eq(kitchenTickets.id, ticketId));

    try {
      const { emitKitchenUpdateTicket } = await import('../../lib/realtime');
      emitKitchenUpdateTicket({ ticketId, status, patch: patchData });
    } catch (realtimeErr) {
      console.warn('Error emitiendo update en realtime:', realtimeErr);
    }

    return new Response(JSON.stringify({ success: true, message: 'Ticket actualizado' }), {
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
