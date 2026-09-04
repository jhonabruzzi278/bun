import type { APIRoute } from 'astro';
import { commitWebpayTransaction } from '@/lib/payments/webpayService';
import { db } from '@/db';
import { orders } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { emitUpdateOrder } from '@/lib/realtime';

export const ALL: APIRoute = async ({ request, url }) => {
  let token = url.searchParams.get('token_ws') || url.searchParams.get('token');
  const mockTbk = url.searchParams.get('mock_tbk');
  const orderId = url.searchParams.get('order_id');

  // Si viene vía POST desde Transbank
  if (!token && request.method === 'POST') {
    try {
      const formData = await request.formData();
      token = formData.get('token_ws') as string;
    } catch {}
  }

  if (mockTbk) {
    token = `tbk_token_mock_${Date.now()}`;
  }

  if (!token) {
    return new Response('Token no proporcionado por Webpay', { status: 400 });
  }

  try {
    const commitResult = await commitWebpayTransaction(token);

    if (commitResult.status === 'AUTHORIZED' && commitResult.response_code === 0) {
      // Actualizar orden en Turso si existe
      if (orderId) {
        try {
          await db
            .update(orders)
            .set({
              status: 'CONFIRMED',
              notes: `PAGADO VÍA WEBPAY (Orden: ${commitResult.buy_order})`,
              updatedAt: new Date().toISOString(),
            })
            .where(eq(orders.id, orderId));

          emitUpdateOrder({ orderId, status: 'CONFIRMED' });
        } catch (dbErr) {
          console.warn('Error actualizando pago en DB:', dbErr);
        }
      }

      // Redirigir a pantalla de éxito
      return new Response(null, {
        status: 302,
        headers: {
          Location: `/menu/burger-craft?payment_status=approved&order_id=${orderId || commitResult.buy_order}&auth_code=${commitResult.authorization_code || '1213'}&amount=${commitResult.amount}`,
        },
      });
    } else {
      return new Response(null, {
        status: 302,
        headers: {
          Location: `/menu/burger-craft?payment_status=rejected&order_id=${orderId || commitResult.buy_order}`,
        },
      });
    }
  } catch (err: any) {
    console.error('Error committing Webpay transaction:', err);
    return new Response(null, {
      status: 302,
      headers: {
        Location: `/menu/burger-craft?payment_status=error&msg=${encodeURIComponent(err.message)}`,
      },
    });
  }
};
