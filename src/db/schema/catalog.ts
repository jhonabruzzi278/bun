import { pgTable, text, timestamp, boolean, integer } from 'drizzle-orm/pg-core';
import { tenants, businesses } from './tenants';

export const categories = pgTable('categories', {
  id: text('id').primaryKey(), // e.g. 'cat_001'
  tenantId: text('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),
  businessId: text('business_id').references(() => businesses.id, { onDelete: 'cascade' }).notNull(),
  name: text('name').notNull(),
  slug: text('slug').notNull(),
  description: text('description'),
  imageUrl: text('image_url'),
  position: integer('position').default(0).notNull(),
  isVisible: boolean('is_visible').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const products = pgTable('products', {
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
  isFeatured: boolean('is_featured').default(false).notNull(), // Aparece en Destacados
  isVisible: boolean('is_visible').default(true).notNull(),   // Visible en catálogo
  isAvailable: boolean('is_available').default(true).notNull(), // Stock / habilitado para venta
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const productVariants = pgTable('product_variants', {
  id: text('id').primaryKey(),
  tenantId: text('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),
  productId: text('product_id').references(() => products.id, { onDelete: 'cascade' }).notNull(),
  name: text('name').notNull(), // e.g. "Tamaño Normal", "Tamaño Grande"
  priceDelta: integer('price_delta').default(0).notNull(), // +1000
  isDefault: boolean('is_default').default(false).notNull(),
});

export const productModifiers = pgTable('product_modifiers', {
  id: text('id').primaryKey(),
  tenantId: text('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),
  productId: text('product_id').references(() => products.id, { onDelete: 'cascade' }).notNull(),
  groupName: text('group_name').notNull(), // e.g. "Extras", "Salsas"
  name: text('name').notNull(), // e.g. "Queso extra", "Bacon"
  price: integer('price').default(0).notNull(), // e.g. 500
  maxQuantity: integer('max_quantity').default(1).notNull(),
});
