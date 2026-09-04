import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { tenants, businesses } from './tenants';

export const categories = sqliteTable('categories', {
  id: text('id').primaryKey(), // e.g. 'cat_001'
  tenantId: text('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),
  businessId: text('business_id').references(() => businesses.id, { onDelete: 'cascade' }).notNull(),
  name: text('name').notNull(),
  slug: text('slug').notNull(),
  description: text('description'),
  imageUrl: text('image_url'),
  position: integer('position').default(0).notNull(),
  isVisible: integer('is_visible', { mode: 'boolean' }).default(true).notNull(),
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`).notNull(),
  updatedAt: text('updated_at').default(sql`(CURRENT_TIMESTAMP)`).notNull(),
});

export const products = sqliteTable('products', {
  id: text('id').primaryKey(), // e.g. 'prod_001'
  tenantId: text('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),
  businessId: text('business_id').references(() => businesses.id, { onDelete: 'cascade' }).notNull(),
  categoryId: text('category_id').references(() => categories.id, { onDelete: 'cascade' }).notNull(),
  name: text('name').notNull(),
  description: text('description'),
  price: integer('price').notNull(), // Centavos o moneda base (ej. 7990)
  compareAtPrice: integer('compare_at_price'), // Precio anterior / tachado
  imageUrl: text('image_url'),
  sku: text('sku'),
  position: integer('position').default(0).notNull(),
  isFeatured: integer('is_featured', { mode: 'boolean' }).default(false).notNull(), // Aparece en Destacados
  isVisible: integer('is_visible', { mode: 'boolean' }).default(true).notNull(),   // Visible en catálogo
  isAvailable: integer('is_available', { mode: 'boolean' }).default(true).notNull(), // Stock / habilitado para venta
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`).notNull(),
  updatedAt: text('updated_at').default(sql`(CURRENT_TIMESTAMP)`).notNull(),
});

export const productVariants = sqliteTable('product_variants', {
  id: text('id').primaryKey(),
  tenantId: text('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),
  productId: text('product_id').references(() => products.id, { onDelete: 'cascade' }).notNull(),
  name: text('name').notNull(), // e.g. "Tamaño Normal", "Tamaño Grande"
  priceDelta: integer('price_delta').default(0).notNull(), // +1000
  isDefault: integer('is_default', { mode: 'boolean' }).default(false).notNull(),
});

export const productModifiers = sqliteTable('product_modifiers', {
  id: text('id').primaryKey(),
  tenantId: text('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),
  productId: text('product_id').references(() => products.id, { onDelete: 'cascade' }).notNull(),
  groupName: text('group_name').notNull(), // e.g. "Extras", "Salsas"
  name: text('name').notNull(), // e.g. "Queso extra", "Bacon"
  price: integer('price').default(0).notNull(), // e.g. 500
  maxQuantity: integer('max_quantity').default(1).notNull(),
});
