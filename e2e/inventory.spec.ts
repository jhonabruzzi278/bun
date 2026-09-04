import { test, expect } from '@playwright/test';

test.describe('Control de Inventario y Escandallos (BOM) - Pruebas Automatizadas', () => {
  test('debe descontar ingredientes de cocina al vender Double Bacon Smash', async ({ request }) => {
    // 1. Obtener inventario actual
    const getRes = await request.get('/api/inventory/deduct');
    expect(getRes.status()).toBe(200);
    const initialInv = (await getRes.json()).data;
    const initialMeatStock = initialInv.carne_smash.stock;
    const initialBreadStock = initialInv.pan_brioche.stock;

    // 2. Descontar 2 Double Bacon Smash (requiere 4 carnes y 2 panes)
    const deductRes = await request.post('/api/inventory/deduct', {
      data: {
        items: [{ name: 'Double Bacon Smash', quantity: 2 }],
      },
    });

    expect(deductRes.status()).toBe(200);
    const deductJson = await deductRes.json();
    expect(deductJson.success).toBe(true);

    // 3. Validar descuento en resultado
    const meatDeduction = deductJson.data.deductedItems.find((i: any) => i.inventoryId === 'carne_smash');
    expect(meatDeduction).toBeDefined();
    expect(meatDeduction.deducted).toBe(4);
    expect(meatDeduction.remaining).toBe(initialMeatStock - 4);

    const breadDeduction = deductJson.data.deductedItems.find((i: any) => i.inventoryId === 'pan_brioche');
    expect(breadDeduction).toBeDefined();
    expect(breadDeduction.deducted).toBe(2);
    expect(breadDeduction.remaining).toBe(initialBreadStock - 2);
  });

  test('debe descontar unidades exactas al vender latas retail de Coca-Cola', async ({ request }) => {
    const getRes = await request.get('/api/inventory/deduct');
    const initialInv = (await getRes.json()).data;
    const initialCokeStock = initialInv.coca_cola_lata.stock;

    // Venta de 3 latas de Coca-Cola
    const deductRes = await request.post('/api/inventory/deduct', {
      data: {
        items: [{ name: 'Coca-Cola Original 350ml Lata', quantity: 3 }],
      },
    });

    expect(deductRes.status()).toBe(200);
    const deductJson = await deductRes.json();
    const cokeDeduction = deductJson.data.deductedItems.find((i: any) => i.inventoryId === 'coca_cola_lata');
    expect(cokeDeduction.deducted).toBe(3);
    expect(cokeDeduction.remaining).toBe(initialCokeStock - 3);
  });

  test('debe descontar centímetros cúbicos (cc) al servir un schop de cerveza de barril', async ({ request }) => {
    const getRes = await request.get('/api/inventory/deduct');
    const initialInv = (await getRes.json()).data;
    const initialKegCc = initialInv.barril_ipa.stock;

    // Servir 2 pintas (473cc c/u = 946cc)
    const deductRes = await request.post('/api/inventory/deduct', {
      data: {
        items: [{ name: 'Cerveza IPA Artesanal 473cc', quantity: 2 }],
      },
    });

    expect(deductRes.status()).toBe(200);
    const deductJson = await deductRes.json();
    const kegDeduction = deductJson.data.deductedItems.find((i: any) => i.inventoryId === 'barril_ipa');
    expect(kegDeduction.deducted).toBe(946);
    expect(kegDeduction.remaining).toBe(initialKegCc - 946);
  });
});
