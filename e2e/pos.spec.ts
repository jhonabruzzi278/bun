import { test, expect } from '@playwright/test';

test.describe('Punto de Venta (POS) - Flujo de Venta Rápida y Periféricos', () => {
  test('debe abrir modal, escanear código de barras de Coca-Cola, crear pedido e imprimir comanda térmica', async ({ page }) => {
    // 1. Navegar al Punto de Venta
    await page.goto('/admin/pos', { waitUntil: 'commit' });

    // 2. Verificar que los botones principales del POS estén visibles
    const newOrderBtn = page.locator('button:has-text("Nuevo Pedido")').first();
    await expect(newOrderBtn).toBeVisible({ timeout: 15000 });

    // 3. Captura visual del POS
    await page.screenshot({ path: 'playwright-report/screenshots/07_pos_general.png', fullPage: true });

    // Esperar hidratación
    await page.waitForTimeout(1000);

    // 4. Abrir modal de nueva orden
    await newOrderBtn.click();

    // 5. Validar que el modal de nueva orden se abra
    const modal = page.locator('div.fixed.inset-0.z-50');
    await expect(modal).toBeVisible({ timeout: 15000 });

    // 6. Verificar que la sección del Lector de Códigos de Barras esté visible
    await expect(page.locator('text=Lector de Códigos de Barras').first()).toBeVisible();

    // 7. Simular escaneo de código de barras haciendo clic en el botón de Coca-Cola Original
    const cokeBtn = page.locator('button:has-text("Coca-Cola Original")').first();
    await expect(cokeBtn).toBeVisible();
    await cokeBtn.click();

    // 8. Validar feedback de escaneo y que el ítem se haya agregado al carrito
    await expect(page.locator('text=Escaneado con éxito').first()).toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=1.800').first()).toBeVisible();

    // 9. Asignar nombre de cliente
    const nameInput = page.locator('input[placeholder*="Ej: Carlos"]').first();
    if (await nameInput.isVisible()) {
      await nameInput.fill('Prueba Comensal Barcode');
    }

    // 10. Captura visual del modal con producto escaneado
    await page.screenshot({ path: 'playwright-report/screenshots/08_pos_nueva_orden_barcode.png' });

    // 11. Confirmar creación de pedido
    const confirmBtn = page.locator('button:has-text("Lanzar a Cocina")').first();
    await expect(confirmBtn).toBeVisible();
    await confirmBtn.click();

    // 12. Validar que el modal se cierre y aparezca la tarjeta del pedido
    await expect(modal).not.toBeVisible({ timeout: 10000 });

    // 13. Abrir simulador de comanda térmica en la tarjeta creada
    const printBtn = page.locator('button[title*="Imprimir comanda"]').first();
    if (await printBtn.isVisible()) {
      await printBtn.click();

      // Validar que el modal de impresión térmica se despliegue
      await expect(page.locator('text=Impresión Comanda Térmica').first()).toBeVisible({ timeout: 10000 });
      await expect(page.locator('text=brew.cl Gastronomía').first()).toBeVisible();
      await expect(page.locator('text=PROPINA SUGERIDA').first()).toBeVisible();

      // Captura del ticket térmico
      await page.screenshot({ path: 'playwright-report/screenshots/08_pos_ticket_termico.png' });

      // Cerrar modal de impresión
      const closePrintBtn = page.locator('button:has(svg.lucide-x)').first();
      if (await closePrintBtn.isVisible()) {
        await closePrintBtn.click();
      }
    }
  });
});
