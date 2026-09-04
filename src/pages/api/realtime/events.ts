import type { APIRoute } from 'astro';
import { realtimeBus, REALTIME_EVENTS } from '../../../lib/realtime';

export const GET: APIRoute = ({ request }) => {
  let isClosed = false;

  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();

      const send = (eventType: string, data: unknown) => {
        if (isClosed) return;
        try {
          controller.enqueue(encoder.encode(`event: ${eventType}\ndata: ${JSON.stringify(data)}\n\n`));
        } catch {
          isClosed = true;
        }
      };

      // Send initial connection greeting
      send('connected', { time: new Date().toISOString() });

      const onKitchenNew = (ticket: unknown) => send(REALTIME_EVENTS.KITCHEN_NEW_TICKET, ticket);
      const onKitchenUpdate = (data: unknown) => send(REALTIME_EVENTS.KITCHEN_UPDATE_TICKET, data);
      const onOrderNew = (order: unknown) => send(REALTIME_EVENTS.ORDER_NEW, order);
      const onOrderUpdate = (data: unknown) => send(REALTIME_EVENTS.ORDER_UPDATE, data);

      realtimeBus.on(REALTIME_EVENTS.KITCHEN_NEW_TICKET, onKitchenNew);
      realtimeBus.on(REALTIME_EVENTS.KITCHEN_UPDATE_TICKET, onKitchenUpdate);
      realtimeBus.on(REALTIME_EVENTS.ORDER_NEW, onOrderNew);
      realtimeBus.on(REALTIME_EVENTS.ORDER_UPDATE, onOrderUpdate);

      // Keepalive heartbeat every 15s to keep connections alive through proxies
      const pingInterval = setInterval(() => {
        if (isClosed) {
          clearInterval(pingInterval);
          return;
        }
        try {
          controller.enqueue(encoder.encode(': ping\n\n'));
        } catch {
          isClosed = true;
          clearInterval(pingInterval);
        }
      }, 15000);

      request.signal.addEventListener('abort', () => {
        isClosed = true;
        clearInterval(pingInterval);
        realtimeBus.off(REALTIME_EVENTS.KITCHEN_NEW_TICKET, onKitchenNew);
        realtimeBus.off(REALTIME_EVENTS.KITCHEN_UPDATE_TICKET, onKitchenUpdate);
        realtimeBus.off(REALTIME_EVENTS.ORDER_NEW, onOrderNew);
        realtimeBus.off(REALTIME_EVENTS.ORDER_UPDATE, onOrderUpdate);
        try {
          controller.close();
        } catch {}
      });
    },
    cancel() {
      isClosed = true;
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
};
