import type { APIRoute } from 'astro';
import { createWebpayTransaction } from '@/lib/payments/webpayService';
import { createMercadoPagoPreference } from '@/lib/payments/mercadopagoService';

export const POST: APIRoute = async ({ request, url }) => {
  try {
    const body = await request.json();
    const {
      gateway, // 'webpay' | 'mercadopago'
      orderId,
      amount,
      customerName,
      customerPhone,
      items,
      returnUrl: clientReturnUrl,
    } = body;

    if (!amount || amount <= 0) {
      return new Response(JSON.stringify({ success: false, error: 'Monto inválido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const host = request.headers.get('host') || url.host;
    const proto = request.headers.get('x-forwarded-proto') || 'http';
    const baseUrl = `${proto}://${host}`;

    // 1. Webpay Plus
    if (gateway === 'webpay') {
      const returnUrl = clientReturnUrl || `${baseUrl}/api/payments/webpay-return?order_id=${orderId || 'ord_0'}`;
      const buyOrder = `BO-${Date.now()}`;
      const sessionId = `SESS-${Date.now()}`;

      const webpayRes = await createWebpayTransaction({
        buyOrder,
        sessionId,
        amount,
        returnUrl,
      });

      return new Response(
        JSON.stringify({
          success: true,
          gateway: 'webpay',
          redirectUrl: webpayRes.url,
          token: webpayRes.token,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 2. Mercado Pago
    if (gateway === 'mercadopago') {
      const returnUrl = clientReturnUrl || `${baseUrl}/menu/burger-craft?payment_status=approved&order_id=${orderId || 'ord_0'}`;
      const mpItems = Array.isArray(items) && items.length > 0
        ? items.map((it: any) => ({
            title: it.name || it.productName || 'Producto Gastronómico',
            quantity: Number(it.quantity) || 1,
            unit_price: Number(it.price) || amount,
          }))
        : [{ title: 'Consumo Restaurante brew.cl', quantity: 1, unit_price: amount }];

      const mpRes = await createMercadoPagoPreference({
        orderId: orderId || `ord_${Date.now()}`,
        items: mpItems,
        payer: {
          name: customerName || 'Comensal',
          phone: customerPhone,
        },
        backUrls: {
          success: returnUrl,
          failure: `${baseUrl}/menu/burger-craft?payment_status=rejected`,
          pending: `${baseUrl}/menu/burger-craft?payment_status=pending`,
        },
      });

      return new Response(
        JSON.stringify({
          success: true,
          gateway: 'mercadopago',
          preferenceId: mpRes.id,
          redirectUrl: mpRes.init_point,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: false, error: 'Pasarela no soportada. Usar "webpay" o "mercadopago"' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('Error creating payment transaction:', err);
    return new Response(
      JSON.stringify({ success: false, error: err.message || 'Error interno de pago' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
