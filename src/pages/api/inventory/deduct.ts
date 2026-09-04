import type { APIRoute } from 'astro';
import { deductInventoryForOrder, getInventory } from '@/lib/inventory/inventoryService';

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ success: true, data: getInventory() }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { items } = body;

    if (!Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ success: false, error: 'Lista de ítems requerida' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result = deductInventoryForOrder(items);

    return new Response(JSON.stringify({ success: true, data: result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err.message || 'Error de inventario' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
