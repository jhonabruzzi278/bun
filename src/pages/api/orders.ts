import type { APIRoute } from 'astro';
import { db } from '../../db';
import { orders, kitchenTickets, kitchenTicketItems } from '../../db/schema';
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
    const orderNumber = body.orderNumber || Math.floor(100 + Math.random() * 900);
    const orderId = body.id || `ord_${Date.now()}`;
    const ticketId = `kt_${Date.now()}`;

    const newOrder = {
      id: orderId,
      tenantId: 'tenant_001',
      businessId: 'biz_001',
      orderNumber,
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

    // 1. Guardar orden comercial en Turso
    await db.insert(orders).values(newOrder);

    // 2. Generar ticket comanda para Cocina KDS en Turso
    const kitchenTicket = {
      id: ticketId,
      tenantId: 'tenant_001',
      businessId: 'biz_001',
      orderId: orderId,
      ticketNumber: orderNumber,
      orderType: newOrder.orderType,
      tableNumber: newOrder.tableNumber,
      customerName: newOrder.customerName,
      status: 'PENDING',
      notes: newOrder.notes,
      targetMinutes: 15,
    };
    await db.insert(kitchenTickets).values(kitchenTicket);

    // 3. Normalizar modificadores e inferir estación para cada item de comanda
    const createdKitchenItems: Array<{
      id: string;
      ticketId: string;
      productId: string | null;
      productName: string;
      quantity: number;
      variantName: string | null;
      modifiers: string[];
      notes: string | null;
      stationCode: string;
      status: 'PENDING';
    }> = [];

    if (Array.isArray(body.items)) {
      for (const it of body.items) {
        const itemId = `ki_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
        const pName = it.name || it.product?.name || 'Plato';
        const rawMods = it.selectedModifiers || it.modifiers || [];
        
        let normalizedMods: string[] = [];
        if (Array.isArray(rawMods)) {
          normalizedMods = rawMods.map((m: unknown) => {
            if (typeof m === 'string') return m;
            if (m && typeof m === 'object') {
              const qty = (m as any).quantity ? `${(m as any).quantity}x ` : '';
              const name = (m as any).modifier?.name || (m as any).name || 'Extra';
              return `${qty}${name}`;
            }
            return String(m);
          });
        } else if (typeof rawMods === 'string') {
          try {
            const parsed = JSON.parse(rawMods);
            if (Array.isArray(parsed)) {
              normalizedMods = parsed.map((p) => typeof p === 'string' ? p : (p?.name || 'Extra'));
            } else {
              normalizedMods = [rawMods];
            }
          } catch {
            normalizedMods = [rawMods];
          }
        }

        const lowerName = pName.toLowerCase();
        let stationCode = 'GRILL';
        if (lowerName.includes('cerveza') || lowerName.includes('limonada') || lowerName.includes('bebida') || lowerName.includes('trago') || lowerName.includes('jugo') || lowerName.includes('agua') || lowerName.includes('café') || lowerName.includes('coctel') || lowerName.includes('cocktail')) {
          stationCode = 'BAR';
        } else if (lowerName.includes('papa') || lowerName.includes('aro') || lowerName.includes('nugget') || lowerName.includes('empanada') || lowerName.includes('fry') || lowerName.includes('frit')) {
          stationCode = 'FRY';
        }

        const dbItem = {
          id: itemId,
          ticketId: ticketId,
          productId: it.productId || it.product?.id || null,
          productName: pName,
          quantity: Number(it.quantity) || 1,
          variantName: it.selectedVariant?.name || it.variantName || null,
          modifiers: JSON.stringify(normalizedMods),
          notes: it.notes || null,
          status: 'PENDING' as const,
        };

        await db.insert(kitchenTicketItems).values(dbItem);

        createdKitchenItems.push({
          ...dbItem,
          modifiers: normalizedMods,
          stationCode,
        });
      }
    }

    // 4. Emitir eventos en tiempo real para KDS y POS
    const fullKitchenTicket = {
      ...kitchenTicket,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      items: createdKitchenItems,
    };

    try {
      const { emitKitchenNewTicket, emitNewOrder } = await import('../../lib/realtime');
      emitKitchenNewTicket(fullKitchenTicket);
      emitNewOrder({
        ...newOrder,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    } catch (realtimeErr) {
      console.warn('Error emitiendo evento realtime:', realtimeErr);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Pedido y comanda creados exitosamente', 
      data: { ...newOrder, ticketId, kitchenTicket: fullKitchenTicket } 
    }), {
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
