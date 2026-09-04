import { db } from './index';
import { tenants, businesses, categories, products, productVariants, productModifiers, prepStations, kitchenTickets, kitchenTicketItems } from './schema';
import { INITIAL_BUSINESS, INITIAL_CATEGORIES, INITIAL_PRODUCTS } from '../lib/mockData';
import { INITIAL_STATIONS, INITIAL_KITCHEN_TICKETS } from '../lib/useKitchenStore';

async function seed() {
  console.log('🌱 Iniciando Seed de la base de datos...');

  try {
    // 1. Tenant piloto
    console.log('Inserting tenant...');
    await db.insert(tenants).values({
      id: 'tenant_001',
      name: 'Burger Craft Organization',
      plan: 'pro',
      isActive: true,
    }).onConflictDoNothing();

    // 2. Business piloto
    console.log('Inserting business...');
    await db.insert(businesses).values({
      id: INITIAL_BUSINESS.id,
      tenantId: INITIAL_BUSINESS.tenantId,
      name: INITIAL_BUSINESS.name,
      slug: INITIAL_BUSINESS.slug,
      description: INITIAL_BUSINESS.description,
      logoUrl: INITIAL_BUSINESS.logoUrl,
      bannerUrl: INITIAL_BUSINESS.bannerUrl,
      phone: INITIAL_BUSINESS.phone,
      address: INITIAL_BUSINESS.address,
      currency: INITIAL_BUSINESS.currency,
      currencySymbol: INITIAL_BUSINESS.currencySymbol,
      primaryColor: INITIAL_BUSINESS.primaryColor,
      whatsappOrders: INITIAL_BUSINESS.whatsappOrders,
      isOpen: INITIAL_BUSINESS.isOpen,
    }).onConflictDoNothing();

    // 3. Categorías
    console.log('Inserting categories...');
    for (const cat of INITIAL_CATEGORIES) {
      await db.insert(categories).values({
        id: cat.id,
        tenantId: cat.tenantId,
        businessId: cat.businessId,
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        imageUrl: cat.imageUrl,
        position: cat.position,
        isVisible: cat.isVisible,
      }).onConflictDoNothing();
    }

    // 4. Productos, variantes y modificadores
    console.log('Inserting products...');
    for (const prod of INITIAL_PRODUCTS) {
      await db.insert(products).values({
        id: prod.id,
        tenantId: prod.tenantId,
        businessId: prod.businessId,
        categoryId: prod.categoryId,
        name: prod.name,
        description: prod.description,
        price: prod.price,
        compareAtPrice: prod.compareAtPrice,
        imageUrl: prod.imageUrl,
        sku: prod.sku,
        position: prod.position,
        isFeatured: prod.isFeatured,
        isVisible: prod.isVisible,
        isAvailable: prod.isAvailable,
      }).onConflictDoNothing();

      if (prod.variants) {
        for (const v of prod.variants) {
          await db.insert(productVariants).values({
            id: v.id,
            tenantId: prod.tenantId,
            productId: prod.id,
            name: v.name,
            priceDelta: v.priceDelta,
            isDefault: v.isDefault || false,
          }).onConflictDoNothing();
        }
      }

      if (prod.modifiers) {
        for (const m of prod.modifiers) {
          await db.insert(productModifiers).values({
            id: m.id,
            tenantId: prod.tenantId,
            productId: prod.id,
            groupName: m.groupName,
            name: m.name,
            price: m.price,
            maxQuantity: m.maxQuantity,
          }).onConflictDoNothing();
        }
      }
    }

    // 5. Estaciones de Cocina
    console.log('Inserting prep stations...');
    for (const st of INITIAL_STATIONS.filter(s => s.code !== 'ALL')) {
      await db.insert(prepStations).values({
        id: st.id,
        tenantId: 'tenant_001',
        businessId: 'biz_001',
        name: st.name,
        code: st.code,
        color: st.color,
        isActive: true,
      }).onConflictDoNothing();
    }

    // 6. Comandas iniciales KDS
    console.log('Inserting initial kitchen tickets...');
    for (const kt of INITIAL_KITCHEN_TICKETS) {
      await db.insert(kitchenTickets).values({
        id: kt.id,
        tenantId: kt.tenantId,
        businessId: kt.businessId,
        ticketNumber: kt.ticketNumber,
        orderType: kt.orderType,
        tableNumber: kt.tableNumber,
        customerName: kt.customerName,
        status: kt.status,
        notes: kt.notes,
        targetMinutes: kt.targetMinutes,
        prepStartedAt: kt.prepStartedAt || null,
        readyAt: kt.readyAt || null,
        createdAt: kt.createdAt,
        updatedAt: kt.updatedAt,
      }).onConflictDoNothing();

      for (const item of kt.items) {
        await db.insert(kitchenTicketItems).values({
          id: item.id,
          ticketId: kt.id,
          productName: item.productName,
          quantity: item.quantity,
          variantName: item.variantName,
          modifiers: item.modifiers ? JSON.stringify(item.modifiers) : null,
          status: item.status,
        }).onConflictDoNothing();
      }
    }

    console.log('✅ Seed completado con éxito!');
  } catch (error) {
    console.error('❌ Error ejecutando seed:', error);
  } finally {
    process.exit(0);
  }
}

seed();
