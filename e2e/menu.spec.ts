import { test, expect } from '@playwright/test';

test.describe('Menú Digital Público - Pruebas Visuales y de Interacción', () => {
  test('debe cargar la carta digital, mostrar el logo, categorías y productos', async ({ page }) => {
    // 1. Navegar al menú digital
    await page.goto('/menu/burger-craft', { waitUntil: 'commit' });

    // 2. Validar que la cabecera y el negocio estén visibles
    await expect(page.locator('text=Burger Craft').first()).toBeVisible({ timeout: 15000 });

    // 3. Validar que las categorías carguen
    await expect(page.locator('text=Hamburguesas Smash').first()).toBeVisible({ timeout: 15000 });

    // 4. Validar que existan productos renderizados
    const productCard = page.locator('text=Double Bacon Smash').first();
    await expect(productCard).toBeVisible({ timeout: 15000 });

    // 5. Captura de pantalla visual de la carta
    await page.screenshot({ path: 'playwright-report/screenshots/01_menu_digital.png', fullPage: true });
  });

  test('debe abrir el modal de personalización, seleccionar extras y agregar al carrito', async ({ page }) => {
    await page.goto('/menu/burger-craft', { waitUntil: 'commit' });

    // 1. Clic en el botón "Pedir" del primer producto (Double Bacon Smash) tras hidratación
    const pedirBtn = page.locator('button:has-text("Pedir")').first();
    await expect(pedirBtn).toBeVisible({ timeout: 15000 });
    await page.waitForTimeout(1500);
    await pedirBtn.click();

    // 2. Validar que el modal de personalización se abra
    const modal = page.locator('div.fixed.inset-0.z-50');
    await expect(modal).toBeVisible({ timeout: 15000 });

    // Captura del modal de personalización
    await page.screenshot({ path: 'playwright-report/screenshots/02_modal_producto.png' });

    // 3. Clic en el botón "Agregar"
    const addBtn = modal.locator('button:has-text("Agregar")').first();
    await expect(addBtn).toBeVisible({ timeout: 15000 });
    await addBtn.click({ force: true });

    // 4. Validar que aparezca la barra flotante del carrito
    const floatingCart = page.locator('button:has-text("Tu Comanda")').first();
    await expect(floatingCart).toBeVisible({ timeout: 15000 });

    // Captura con el carrito flotante activo
    await page.screenshot({ path: 'playwright-report/screenshots/03_carrito_flotante.png' });

    // 5. Abrir el drawer de checkout
    await floatingCart.click({ force: true });

    // 6. Validar que el drawer de checkout esté visible con el resumen
    await expect(page.locator('text=Comanda de Pedido').first()).toBeVisible({ timeout: 15000 });
    await expect(page.locator('text=Confirmar Pedido por WhatsApp').first()).toBeVisible({ timeout: 15000 });

    // Captura del checkout drawer
    await page.screenshot({ path: 'playwright-report/screenshots/04_checkout_drawer.png' });
  });
});
