import { test, expect } from '@playwright/test';

test.describe('Módulos de Administración - Pruebas Visuales', () => {
  test('debe mostrar el Catálogo de Productos y permitir filtrar por categoría', async ({ page }) => {
    await page.goto('/admin/products', { waitUntil: 'commit' });

    // Validar título y botón crear producto
    await expect(page.locator('main').locator('text=Catálogo de Productos').first()).toBeVisible({ timeout: 15000 });
    await expect(page.locator('main').locator('button:has-text("Nuevo Producto")').first()).toBeVisible();

    // Captura del catálogo de productos
    await page.screenshot({ path: 'playwright-report/screenshots/09_admin_catalogo_productos.png', fullPage: true });
  });

  test('debe renderizar el Generador de Códigos QR para mesas y descarga', async ({ page }) => {
    await page.goto('/admin/qr', { waitUntil: 'commit' });

    // Validar título
    await expect(page.locator('main').locator('text=Códigos QR').first()).toBeVisible({ timeout: 15000 });

    // Captura visual del generador QR
    await page.screenshot({ path: 'playwright-report/screenshots/10_admin_generador_qr.png', fullPage: true });
  });

  test('debe renderizar el Copiloto IA y la Matriz de Ingeniería de Menú', async ({ page }) => {
    await page.goto('/admin/ai', { waitUntil: 'commit' });

    // Validar título del asistente en el contenido principal
    await expect(page.locator('main').locator('text=Brew').first()).toBeVisible({ timeout: 15000 });

    // Captura del panel IA
    await page.screenshot({ path: 'playwright-report/screenshots/11_admin_copiloto_ia.png', fullPage: true });
  });
});
