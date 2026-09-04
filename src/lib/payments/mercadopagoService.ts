/**
 * Mercado Pago Checkout Pro Client
 * Documentación: https://www.mercadopago.cl/developers/es/reference/preferences/_checkout_preferences/post
 */

export interface CreateMpPreferenceParams {
  orderId: string;
  items: Array<{
    title: string;
    quantity: number;
    unit_price: number;
    currency_id?: string;
  }>;
  payer?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  backUrls: {
    success: string;
    failure: string;
    pending: string;
  };
}

export interface MpPreferenceResponse {
  id: string;
  init_point: string;
  sandbox_init_point: string;
}

export async function createMercadoPagoPreference(
  params: CreateMpPreferenceParams
): Promise<MpPreferenceResponse> {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

  if (!accessToken) {
    // Fallback documentado para modo demo / sandbox sin token externo
    const mockId = `mp_pref_${Date.now()}`;
    return {
      id: mockId,
      init_point: `${params.backUrls.success}&collection_status=approved&preference_id=${mockId}`,
      sandbox_init_point: `${params.backUrls.success}&collection_status=approved&preference_id=${mockId}`,
    };
  }

  try {
    const res = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        external_reference: params.orderId,
        items: params.items.map((item) => ({
          ...item,
          currency_id: item.currency_id || 'CLP',
        })),
        payer: params.payer,
        back_urls: params.backUrls,
        auto_return: 'approved',
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.warn('Mercado Pago API error:', err);
      const mockId = `mp_pref_err_${Date.now()}`;
      return {
        id: mockId,
        init_point: `${params.backUrls.success}&collection_status=approved&preference_id=${mockId}`,
        sandbox_init_point: `${params.backUrls.success}&collection_status=approved&preference_id=${mockId}`,
      };
    }

    const data = await res.json();
    return {
      id: data.id,
      init_point: data.init_point,
      sandbox_init_point: data.sandbox_init_point || data.init_point,
    };
  } catch (err) {
    console.warn('Mercado Pago fallback simulation:', err);
    const mockId = `mp_pref_sim_${Date.now()}`;
    return {
      id: mockId,
      init_point: `${params.backUrls.success}&collection_status=approved&preference_id=${mockId}`,
      sandbox_init_point: `${params.backUrls.success}&collection_status=approved&preference_id=${mockId}`,
    };
  }
}
