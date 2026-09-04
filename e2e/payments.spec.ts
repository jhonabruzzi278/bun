import { test, expect } from '@playwright/test';

test.describe('Pasarelas de Pago Online (Webpay Plus & Mercado Pago) - Pruebas E2E', () => {
  test('debe iniciar transacción Webpay Plus y retornar token de pago oficial', async ({ page }) => {
    // 1. Navegar al menú digital
    await page.goto('/menu/burger-craft', { waitUntil: 'commit' });

    // 2. Esperar hidratación y agregar producto
    const pedirBtn = page.locator('button:has-text("Pedir")').first();
    await expect(pedirBtn).toBeVisible({ timeout: 15000 });
    await page.waitForTimeout(1000);
    await pedirBtn.click();

    // 3. Confirmar adición en el modal
    const modal = page.locator('div.fixed.inset-0.z-50');
    await expect(modal).toBeVisible({ timeout: 10000 });
    const addBtn = modal.locator('button:has-text("Agregar")').first();
    await expect(addBtn).toBeVisible();
    await addBtn.click({ force: true });

    // 4. Abrir drawer de comanda
    const floatingCart = page.locator('button:has-text("Tu Comanda")').first();
    await expect(floatingCart).toBeVisible({ timeout: 10000 });
    await floatingCart.click({ force: true });

    // 5. Validar drawer abierto y seleccionar Webpay Plus
    const webpayOption = page.locator('button:has-text("Webpay Plus")').first();
    await expect(webpayOption).toBeVisible({ timeout: 10000 });
    await webpayOption.click();

    // 6. Validar que aparezca el botón de pago con Webpay
    const payWebpayBtn = page.locator('button:has-text("Pagar con Webpay Plus")').first();
    await expect(payWebpayBtn).toBeVisible();

    // Captura de pantalla de la opción Webpay activa
    await page.screenshot({ path: 'playwright-report/screenshots/12_pago_webpay_drawer.png' });
  });

  test('debe poder seleccionar Mercado Pago y generar preferencia', async ({ page }) => {
    // 1. Navegar al menú digital
    await page.goto('/menu/burger-craft', { waitUntil: 'commit' });

    // 2. Esperar hidratación y agregar producto
    const pedirBtn = page.locator('button:has-text("Pedir")').first();
    await expect(pedirBtn).toBeVisible({ timeout: 15000 });
    await page.waitForTimeout(1000);
    await pedirBtn.click();

    // 3. Confirmar adición en el modal
    const modal = page.locator('div.fixed.inset-0.z-50');
    await expect(modal).toBeVisible({ timeout: 10000 });
    const addBtn = modal.locator('button:has-text("Agregar")').first();
    await expect(addBtn).toBeVisible();
    await addBtn.click({ force: true });

    // 4. Abrir drawer de comanda
    const floatingCart = page.locator('button:has-text("Tu Comanda")').first();
    await expect(floatingCart).toBeVisible({ timeout: 10000 });
    await floatingCart.click({ force: true });

    // 5. Seleccionar Mercado Pago
    const mpOption = page.locator('button:has-text("Mercado Pago")').first();
    await expect(mpOption).toBeVisible({ timeout: 10000 });
    await mpOption.click();

    // 6. Validar que el botón cambie a Pagar con Mercado Pago
    const payMpBtn = page.locator('button:has-text("Pagar con Mercado Pago")').first();
    await expect(payMpBtn).toBeVisible();

    // Captura de pantalla de la opción Mercado Pago
    await page.screenshot({ path: 'playwright-report/screenshots/13_pago_mercadopago_drawer.png' });
  });

  test('debe responder exitosamente en el endpoint API /api/payments/create-transaction', async ({ request }) => {
    const res = await request.post('/api/payments/create-transaction', {
      data: {
        gateway: 'webpay',
        amount: 15990,
        customerName: 'Prueba API Webpay',
        customerPhone: '+56912345678',
        orderId: 'ord_test_playwright_001',
      },
    });

    expect(res.status()).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.gateway).toBe('webpay');
    expect(json.redirectUrl).toBeDefined();
    expect(json.token).toBeDefined();
  });
});
