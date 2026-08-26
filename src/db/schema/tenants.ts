import { pgTable, text, timestamp, boolean, uuid } from 'drizzle-orm/pg-core';

export const tenants = pgTable('tenants', {
  id: text('id').primaryKey(), // e.g. 'tenant_001'
  name: text('name').notNull(),
  plan: text('plan').default('starter').notNull(), // 'starter', 'pro', 'dedicated'
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const businesses = pgTable('businesses', {
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
  whatsappOrders: boolean('whatsapp_orders').default(true).notNull(),
  isOpen: boolean('is_open').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
