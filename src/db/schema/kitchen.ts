import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { tenants, businesses } from './tenants';
import { orders } from './orders';

export const prepStations = sqliteTable('prep_stations', {
  id: text('id').primaryKey(), // e.g. 'st_grill', 'st_fry', 'st_bar'
  tenantId: text('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),
  businessId: text('business_id').references(() => businesses.id, { onDelete: 'cascade' }).notNull(),
  name: text('name').notNull(), // e.g. "Parrilla / Plancha", "Frituras", "Bar / Bebidas"
  code: text('code').notNull(), // e.g. "GRILL", "FRY", "BAR"
  color: text('color').default('#f97316').notNull(),
  isActive: integer('is_active', { mode: 'boolean' }).default(true).notNull(),
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`).notNull(),
});

export const kitchenTickets = sqliteTable('kitchen_tickets', {
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
  prepStartedAt: text('prep_started_at'),
  readyAt: text('ready_at'),
  deliveredAt: text('delivered_at'),
  cancelledAt: text('cancelled_at'),
  cancellationReason: text('cancellation_reason'),
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`).notNull(),
  updatedAt: text('updated_at').default(sql`(CURRENT_TIMESTAMP)`).notNull(),
});

export const kitchenTicketItems = sqliteTable('kitchen_ticket_items', {
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

export const prepEvents = sqliteTable('prep_events', {
  id: text('id').primaryKey(),
  ticketId: text('ticket_id').references(() => kitchenTickets.id, { onDelete: 'cascade' }).notNull(),
  eventType: text('event_type').notNull(), // 'CREATED', 'STARTED', 'READY', 'DELIVERED', 'CANCELLED', 'RESENT'
  timestamp: text('timestamp').default(sql`(CURRENT_TIMESTAMP)`).notNull(),
  actorName: text('actor_name').default('Sistema Cocina').notNull(),
  metadata: text('metadata'),
});
