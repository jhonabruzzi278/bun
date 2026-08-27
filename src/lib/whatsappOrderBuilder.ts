import type { Business, CartItem } from './types';

export interface WhatsAppOrderPayload {
  business: Business;
  cart: CartItem[];
  cartTotal: number;
  customerName: string;
  customerPhone?: string;
  customerAddress?: string;
  tableNumber?: string;
  orderType: 'delivery' | 'takeaway' | 'dine_in';
  paymentMethod: string;
}

/**
 * Builds a clean, universally compatible WhatsApp order message.
 * Formatted with crisp emojis, clean bullet points, and zero broken special characters.
 */
export function buildWhatsAppOrderMessage(payload: WhatsAppOrderPayload): string {
  const {
    business,
    cart,
    cartTotal,
    customerName,
    customerPhone,
    customerAddress,
    tableNumber,
    orderType,
    paymentMethod,
  } = payload;

  const now = new Date();
  const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  const orderCode = `CL-${Math.floor(100000 + Math.random() * 900000)}`;

  const deliveryCost = orderType === 'delivery' ? (business.serviceSettings?.delivery?.serviceFee || 2000) : 0;
  const grandTotal = cartTotal + deliveryCost;

  let serviceLabel = 'Domicilio';
  let serviceEmoji = '🛵';
  if (orderType === 'dine_in') {
    serviceLabel = `Consumo en Mesa (#${tableNumber || '1'})`;
    serviceEmoji = '🍽️';
  } else if (orderType === 'takeaway') {
    serviceLabel = 'Retiro en Local';
    serviceEmoji = '🛍️';
  }

  let message = `🍔 *PEDIDO - ${(business.name || 'Burger Craft').toUpperCase()}*\n`;
  message += `🔖 *Código:* #${orderCode}\n`;
  message += `📅 *Fecha:* ${dateStr} • ${timeStr} hrs\n\n`;

  message += `${serviceEmoji} *Servicio:* ${serviceLabel}\n`;
  message += `👤 *Cliente:* ${customerName}\n`;
  message += `📱 *Teléfono:* ${customerPhone || '+56 938980598'}\n`;

  if (orderType === 'delivery') {
    message += `📍 *Dirección:* ${customerAddress || 'Por coordinar'}\n`;
  } else if (orderType === 'dine_in') {
    message += `📍 *Ubicación:* Mesa #${tableNumber || '1'}\n`;
  }

  message += `\n───────────────────\n`;
  message += `🛒 *PRODUCTOS DEL PEDIDO:*\n\n`;

  cart.forEach((item, idx) => {
    message += `• *${item.quantity}x ${item.name.toUpperCase()}* (${business.currencySymbol || '$'}${item.itemTotal.toLocaleString('es-CL')})\n`;
    if (item.selectedVariant) {
      message += `  ▫️ Opción: ${item.selectedVariant.name}\n`;
    }
    if (item.selectedModifiers && item.selectedModifiers.length > 0) {
      item.selectedModifiers.forEach((m) => {
        message += `  ▫️ Extra: +${m.quantity}x ${m.modifier.name}\n`;
      });
    }
    if (item.notes) {
      message += `  ▫️ Nota: ${item.notes}\n`;
    }
    if (idx < cart.length - 1) {
      message += `\n`;
    }
  });

  message += `\n───────────────────\n`;
  message += `💵 *DETALLE DE COBRO:*\n`;
  message += `• Subtotal: ${business.currencySymbol || '$'}${cartTotal.toLocaleString('es-CL')}\n`;
  if (orderType === 'delivery') {
    message += `• Envío a Domicilio: ${business.currencySymbol || '$'}${deliveryCost.toLocaleString('es-CL')}\n`;
  }
  message += `💰 *TOTAL A PAGAR: ${business.currencySymbol || '$'}${grandTotal.toLocaleString('es-CL')}*\n\n`;

  message += `💳 *Método de pago:* ${paymentMethod || 'Efectivo al recibir'}\n`;
  message += `✅ *Estado:* Pendiente de confirmación\n\n`;

  message += `👉 _Por favor envíanos este mensaje para iniciar la preparación de tu pedido._`;

  return message;
}

export function openWhatsAppOrder(payload: WhatsAppOrderPayload) {
  const message = buildWhatsAppOrderMessage(payload);
  const rawPhone = (payload.business.phone && payload.business.phone !== '+56912345678')
    ? payload.business.phone
    : '+56938980598';
  const cleanPhone = rawPhone.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(message);
  const url = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodedText}`;
  window.open(url, '_blank');
}
