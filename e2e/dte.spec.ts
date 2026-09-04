import { test, expect } from '@playwright/test';

test.describe('Boleta Electrónica DTE 39 (Estándar SII de Chile) - Pruebas Automatizadas', () => {
  test('debe emitir Boleta Electrónica DTE 39 con cálculo exacto de IVA (19%) y Folio correlativo', async ({ request }) => {
    const items = [
      { name: 'Double Bacon Smash', quantity: 2, price: 7990 }, // Total: 15.980
      { name: 'Coca-Cola Original 350ml', quantity: 2, price: 1800 }, // Total: 3.600
    ];
    // Total bruto: 19.580
    // Neto esperado: Math.round(19580 / 1.19) = 16.454
    // IVA esperado: 19580 - 16454 = 3.126

    const res = await request.post('/api/dte/issue', {
      data: {
        orderId: 'ord_dte_test_001',
        items,
        customerName: 'Juan Pérez (Prueba DTE)',
        customerRut: '15.678.901-2',
      },
    });

    expect(res.status()).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);

    const dte = json.data;
    expect(dte.tipoDte).toBe(39);
    expect(dte.folio).toBeGreaterThan(10000);
    expect(dte.emisor.rut).toBe('76.432.198-5');
    expect(dte.receptor.rut).toBe('15.678.901-2');

    // Validación matemática exacta del SII
    expect(dte.totales.montoTotal).toBe(19580);
    expect(dte.totales.montoNeto).toBe(16454);
    expect(dte.totales.iva).toBe(3126);
    expect(dte.totales.montoNeto + dte.totales.iva).toBe(dte.totales.montoTotal);

    // Timbre Electrónico DTE (TED)
    expect(dte.ted.caf).toBeDefined();
    expect(dte.ted.firmaElectronica).toContain('SHA256:');
    expect(dte.ted.verificacionUrl).toContain('sii.cl');
  });

  test('debe rechazar emisión si no se envían ítems', async ({ request }) => {
    const res = await request.post('/api/dte/issue', {
      data: {
        orderId: 'ord_invalid',
        items: [],
      },
    });

    expect(res.status()).toBe(400);
    const json = await res.json();
    expect(json.success).toBe(false);
  });
});
