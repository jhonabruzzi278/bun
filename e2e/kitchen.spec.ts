import { test, expect } from '@playwright/test';

test.describe('Cocina KDS en Tiempo Real - Pruebas Visuales', () => {
  test('debe mostrar el tablero de cocina con comandas activas y filtros de estación', async ({ page }) => {
    // 1. Navegar a la pantalla de cocina KDS
    await page.goto('/admin/kitchen', { waitUntil: 'commit' });

    // 2. Verificar que el título y badge EN VIVO estén visibles en el área principal
    await expect(page.locator('main').locator('text=KDS Cocina & Barra en Tiempo Real').first()).toBeVisible({ timeout: 10000 });
    await expect(page.locator('main').locator('text=EN VIVO').first()).toBeVisible();

    // 3. Verificar que las columnas de preparación existan
    await expect(page.locator('main').locator('text=Pendientes').first()).toBeVisible();
    await expect(page.locator('main').locator('text=En Preparación').first()).toBeVisible();

    // 4. Captura visual general del tablero KDS
    await page.screenshot({ path: 'playwright-report/screenshots/05_cocina_kds.png', fullPage: true });

    // 5. Interactuar con el filtro de estación Parrilla
    const grillTab = page.locator('button:has-text("Parrilla")').first();
    if (await grillTab.isVisible()) {
      await grillTab.click();
      await page.waitForTimeout(300);
      await page.screenshot({ path: 'playwright-report/screenshots/06_cocina_filtro_parrilla.png' });
    }
  });
});
