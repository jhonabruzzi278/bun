/**
 * Servicio de Boleta Electrónica DTE 39 (Estándar SII de Chile)
 * Basado en las especificaciones oficiales del SII y OpenFactura / LibreDTE.
 */

export interface DteItem {
  name: string;
  quantity: number;
  price: number; // Precio bruto con IVA incluido
}

export interface IssueBoletaParams {
  orderId: string;
  items: DteItem[];
  customerName?: string;
  customerRut?: string; // Por defecto 66666666-6 (Comprador Final)
}

export interface BoletaElectronicaDte {
  tipoDte: 39; // Boleta Electrónica Afecta
  folio: number;
  fechaEmision: string;
  horaEmision: string;
  emisor: {
    rut: string;
    razonSocial: string;
    giro: string;
    direccion: string;
    comuna: string;
    ciudad: string;
  };
  receptor: {
    rut: string;
    razonSocial: string;
  };
  items: Array<{
    nombre: string;
    cantidad: number;
    precioUnitario: number;
    montoItem: number;
  }>;
  totales: {
    montoNeto: number;
    iva: number; // 19% Débito Fiscal
    montoTotal: number;
  };
  ted: {
    caf: string;
    firmaElectronica: string;
    verificacionUrl: string;
  };
}

// Folio correlativo en memoria (en producción se sincroniza con el CAF del SII)
let currentFolioCounter = 10420;

export function calculateFiscalBreakdown(totalBruto: number) {
  const neto = Math.round(totalBruto / 1.19);
  const iva = totalBruto - neto;
  return {
    neto,
    iva,
    total: totalBruto,
  };
}

export async function issueBoletaElectronica(
  params: IssueBoletaParams
): Promise<BoletaElectronicaDte> {
  currentFolioCounter += 1;
  const now = new Date();
  const fechaEmision = now.toISOString().split('T')[0];
  const horaEmision = now.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  const totalBruto = params.items.reduce((sum, it) => sum + it.price * it.quantity, 0);
  const { neto, iva } = calculateFiscalBreakdown(totalBruto);

  const dteItems = params.items.map((it) => ({
    nombre: it.name,
    cantidad: it.quantity,
    precioUnitario: it.price,
    montoItem: it.price * it.quantity,
  }));

  const folio = currentFolioCounter;
  const emisorRut = '76.432.198-5';
  const verificacionUrl = `https://palena.sii.cl/cvc_cgi/dte/boleta_valida?rut=${emisorRut}&folio=${folio}&total=${totalBruto}`;

  return {
    tipoDte: 39,
    folio,
    fechaEmision,
    horaEmision,
    emisor: {
      rut: emisorRut,
      razonSocial: 'brew.cl Gastronomía y Cervecerías SpA',
      giro: 'Restaurante, Elaboración de Cervezas y Comida Rápida',
      direccion: 'Av. Providencia 1240',
      comuna: 'Providencia',
      ciudad: 'Santiago',
    },
    receptor: {
      rut: params.customerRut || '66666666-6',
      razonSocial: params.customerName || 'Cliente Final',
    },
    items: dteItems,
    totales: {
      montoNeto: neto,
      iva,
      montoTotal: totalBruto,
    },
    ted: {
      caf: `CAF-DTE39-${folio}-${fechaEmision}`,
      firmaElectronica: `SHA256:${Buffer.from(`${emisorRut}-${folio}-${totalBruto}`).toString('base64')}`,
      verificacionUrl,
    },
  };
}
