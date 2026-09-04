import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { tenants, businesses } from './tenants';

export const orders = sqliteTable('orders', {
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
  items: text('items', { mode: 'json' }).notNull(), // Snapshot of items at checkout
  notes: text('notes'),
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`).notNull(),
  updatedAt: text('updated_at').default(sql`(CURRENT_TIMESTAMP)`).notNull(),
});
