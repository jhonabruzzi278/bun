import { test, expect } from '@playwright/test';

test.describe('Autenticación Gestionada con Clerk - brew.cl', () => {
  test('debe mostrar la pantalla de Sign-In con la mascota Brew y branding brew.cl', async ({ page }) => {
    await page.goto('/sign-in', { waitUntil: 'commit' });

    // Validar nombre de marca y subtítulo
    await expect(page.locator('text=brew.cl').first()).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=Acceso al Sistema Operativo Gastronómico')).toBeVisible();

    // Validar que la mascota oficial Brew esté presente
    const mascotImg = page.locator('img[alt="Brew Mascot"]');
    await expect(mascotImg).toBeVisible();

    // Captura visual de la pantalla de autenticación
    await page.screenshot({ path: 'playwright-report/screenshots/12_clerk_sign_in.png', fullPage: true });
  });
});
