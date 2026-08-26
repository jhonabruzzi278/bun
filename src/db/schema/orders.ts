import { pgTable, text, timestamp, integer, jsonb } from 'drizzle-orm/pg-core';
import { tenants, businesses } from './tenants';

export const orders = pgTable('orders', {
  id: text('id').primaryKey(),
  tenantId: text('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),
  businessId: text('business_id').references(() => businesses.id, { onDelete: 'cascade' }).notNull(),
  orderNumber: integer('order_number').notNull(),
  customerName: text('customer_name').notNull(),
  customerPhone: text('customer_phone'),
  customerAddress: text('customer_address'),
  orderType: text('order_type').default('delivery').notNull(), // 'delivery', 'takeaway', 'dine_in'
  tableNumber: text('table_number'),
  status: text('status').default('NEW').notNull(), // 'NEW', 'CONFIRMED', 'PREPARING', 'READY', 'DELIVERED', 'CANCELLED'
  total: integer('total').notNull(),
  items: jsonb('items').notNull(), // Snapshot of items at checkout
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
