import { pgTable, text, timestamp, integer, boolean } from 'drizzle-orm/pg-core';
import { tenants, businesses } from './tenants';
import { orders } from './orders';

export const prepStations = pgTable('prep_stations', {
  id: text('id').primaryKey(), // e.g. 'st_grill', 'st_fry', 'st_bar'
  tenantId: text('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),
  businessId: text('business_id').references(() => businesses.id, { onDelete: 'cascade' }).notNull(),
  name: text('name').notNull(), // e.g. "Parrilla / Plancha", "Frituras", "Bar / Bebidas"
  code: text('code').notNull(), // e.g. "GRILL", "FRY", "BAR"
  color: text('color').default('#f97316').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const kitchenTickets = pgTable('kitchen_tickets', {
  id: text('id').primaryKey(),
  tenantId: text('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),
  businessId: text('business_id').references(() => businesses.id, { onDelete: 'cascade' }).notNull(),
  orderId: text('order_id').references(() => orders.id, { onDelete: 'cascade' }),
  stationId: text('station_id').references(() => prepStations.id, { onDelete: 'set null' }),
  ticketNumber: integer('ticket_number').notNull(),
  orderType: text('order_type').default('delivery').notNull(), // 'delivery', 'takeaway', 'dine_in'
  tableNumber: text('table_number'),
  customerName: text('customer_name').notNull(),
  status: text('status').default('PENDING').notNull(), // 'PENDING', 'PREPARING', 'READY', 'DELIVERED', 'CANCELLED'
  notes: text('notes'),
  targetMinutes: integer('target_minutes').default(15).notNull(),
  prepStartedAt: timestamp('prep_started_at'),
  readyAt: timestamp('ready_at'),
  deliveredAt: timestamp('delivered_at'),
  cancelledAt: timestamp('cancelled_at'),
  cancellationReason: text('cancellation_reason'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const kitchenTicketItems = pgTable('kitchen_ticket_items', {
  id: text('id').primaryKey(),
  ticketId: text('ticket_id').references(() => kitchenTickets.id, { onDelete: 'cascade' }).notNull(),
  productId: text('product_id'),
  productName: text('product_name').notNull(),
  quantity: integer('quantity').notNull(),
  variantName: text('variant_name'),
  modifiers: text('modifiers'), // JSON string of extras
  notes: text('notes'),
  status: text('status').default('PENDING').notNull(), // 'PENDING', 'PREPARING', 'READY', 'CANCELLED'
});

export const prepEvents = pgTable('prep_events', {
  id: text('id').primaryKey(),
  ticketId: text('ticket_id').references(() => kitchenTickets.id, { onDelete: 'cascade' }).notNull(),
  eventType: text('event_type').notNull(), // 'CREATED', 'STARTED', 'READY', 'DELIVERED', 'CANCELLED', 'RESENT'
  timestamp: timestamp('timestamp').defaultNow().notNull(),
  actorName: text('actor_name').default('Sistema Cocina').notNull(),
  metadata: text('metadata'),
});
