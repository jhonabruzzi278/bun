import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const tenants = sqliteTable('tenants', {
  id: text('id').primaryKey(), // e.g. 'tenant_001'
  name: text('name').notNull(),
  plan: text('plan').default('starter').notNull(), // 'starter', 'pro', 'dedicated'
  isActive: integer('is_active', { mode: 'boolean' }).default(true).notNull(),
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`).notNull(),
  updatedAt: text('updated_at').default(sql`(CURRENT_TIMESTAMP)`).notNull(),
});

export const businesses = sqliteTable('businesses', {
  id: text('id').primaryKey(), // e.g. 'biz_001'
  tenantId: text('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(), // e.g. 'burger-craft' for subdomains / urls
  description: text('description'),
  logoUrl: text('logo_url'),
  bannerUrl: text('banner_url'),
  phone: text('phone'),
  address: text('address'),
  currency: text('currency').default('USD').notNull(), // 'USD', 'CLP', 'MXN', 'EUR'
  currencySymbol: text('currency_symbol').default('$').notNull(),
  primaryColor: text('primary_color').default('#f97316').notNull(),
  whatsappOrders: integer('whatsapp_orders', { mode: 'boolean' }).default(true).notNull(),
  isOpen: integer('is_open', { mode: 'boolean' }).default(true).notNull(),
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`).notNull(),
  updatedAt: text('updated_at').default(sql`(CURRENT_TIMESTAMP)`).notNull(),
});
