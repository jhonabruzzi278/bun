import { test, expect } from '@playwright/test';

test.describe('Panel Maestro Superadmin & Gestión de Free Trials - brew.cl', () => {
  test('debe renderizar la consola privada /master con branding brew.cl y métricas', async ({ page }) => {
    await page.goto('/master', { waitUntil: 'commit' });

    // Validar título y badge de Superadmin
    await expect(page.locator('text=Panel Maestro de Clientes & Free Trials')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=MASTER HQ')).toBeVisible();

    // Validar métricas principales
    await expect(page.locator('text=Total Clientes')).toBeVisible();
    await expect(page.locator('text=Pruebas Activas')).toBeVisible();
    await expect(page.locator('text=Por Vencer (≤3d)')).toBeVisible();
    await expect(page.locator('text=Pruebas Vencidas').first()).toBeVisible();

    // Validar existencia de restaurantes en el panel
    await expect(page.locator('text=Burger Craft Santiago')).toBeVisible();
    await expect(page.locator('text=Cervecería Krossbar Bellavista')).toBeVisible();

    // Validar botones de acción para control manual
    await expect(page.locator('button:has-text("+14 Días")').first()).toBeVisible();
    await expect(page.locator('a:has-text("Contactar")').first()).toBeVisible();

    // Captura visual del panel superadmin privado
    await page.screenshot({ path: 'playwright-report/screenshots/13_superadmin_master_hq.png', fullPage: true });
  });

  test('el panel de restaurante regular (/admin) NO debe mostrar el enlace de Superadmin', async ({ page, isMobile }) => {
    await page.goto('/admin', { waitUntil: 'commit' });

    // El sidebar del restaurante debe ser limpio y no exponer la consola privada
    await expect(page.locator('text=Superadmin Clientes')).toHaveCount(0);
    if (!isMobile) {
      await expect(page.locator('text=Cocina KDS')).toBeVisible();
      await expect(page.locator('text=Punto de Venta (POS)')).toBeVisible();
    }
  });

  test('debe permitir filtrar por clientes con prueba vencida o bloqueados en /master', async ({ page }) => {
    await page.goto('/master', { waitUntil: 'commit' });

    // Clic en filtro de clientes
    const filterTab = page.locator('button:has-text("Bloqueados"), button:has-text("Vencidas")').first();
    await expect(filterTab).toBeVisible();
    await filterTab.click();

    // Validar que el panel mantenga las tarjetas de clientes o el estado de filtro aplicado
    const resultElement = page.locator('button:has-text("+14 Días")').or(page.getByText('No hay clientes con este filtro')).first();
    await expect(resultElement).toBeVisible({ timeout: 8000 });
  });

  test('debe mostrar la pantalla de cuenta suspendida/vencida correctamente', async ({ page }) => {
    await page.goto('/account-suspended', { waitUntil: 'commit' });

    await expect(page.locator('text=Período de Prueba Finalizado')).toBeVisible({ timeout: 8000 });
    await expect(page.locator('text=Tu cuenta en brew.cl está en pausa')).toBeVisible();
    await expect(page.locator('a:has-text("Contactar al Administrador para Reactivar")')).toBeVisible();
  });
});
