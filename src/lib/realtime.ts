import { EventEmitter } from 'node:events';

// Global symbol to preserve singleton across hot module reloads in Vite/Astro dev
const REALTIME_BUS_KEY = Symbol.for('bun.realtime.bus');

interface GlobalWithRealtime {
  [REALTIME_BUS_KEY]?: EventEmitter;
}

const globalObj = globalThis as unknown as GlobalWithRealtime;

if (!globalObj[REALTIME_BUS_KEY]) {
  const emitter = new EventEmitter();
  emitter.setMaxListeners(200); // Allow multiple simultaneous browser tabs/clients
  globalObj[REALTIME_BUS_KEY] = emitter;
}

export const realtimeBus = globalObj[REALTIME_BUS_KEY]!;

export const REALTIME_EVENTS = {
  KITCHEN_NEW_TICKET: 'kitchen:new_ticket',
  KITCHEN_UPDATE_TICKET: 'kitchen:update_ticket',
  ORDER_NEW: 'order:new',
  ORDER_UPDATE: 'order:update',
} as const;

export function emitKitchenNewTicket(ticket: unknown) {
  realtimeBus.emit(REALTIME_EVENTS.KITCHEN_NEW_TICKET, ticket);
}

export function emitKitchenUpdateTicket(data: { ticketId: string; status: string; patch?: unknown }) {
  realtimeBus.emit(REALTIME_EVENTS.KITCHEN_UPDATE_TICKET, data);
}

export function emitNewOrder(order: unknown) {
  realtimeBus.emit(REALTIME_EVENTS.ORDER_NEW, order);
}

export function emitUpdateOrder(data: { orderId: string; status: string }) {
  realtimeBus.emit(REALTIME_EVENTS.ORDER_UPDATE, data);
}
