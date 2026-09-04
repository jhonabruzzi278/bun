import type { APIRoute } from 'astro';
import { issueBoletaElectronica } from '@/lib/dte/dteService';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { orderId, items, customerName, customerRut } = body;

    if (!Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ success: false, error: 'Debe incluir al menos un ítem' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const boleta = await issueBoletaElectronica({
      orderId: orderId || `ord_${Date.now()}`,
      items,
      customerName,
      customerRut,
    });

    return new Response(
      JSON.stringify({
        success: true,
        data: boleta,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err: any) {
    console.error('Error issuing Boleta DTE:', err);
    return new Response(
      JSON.stringify({ success: false, error: err.message || 'Error emitiendo DTE' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
