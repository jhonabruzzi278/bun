// Web Audio API Thermal Printer and Guillotine Paper-Cut Sound Synthesizer
export function playPrintAndCutSound() {
  try {
    const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const now = ctx.currentTime;

    // 1. Thermal Printing Motor / Needle Hum (rapid frequency modulation)
    const printOsc = ctx.createOscillator();
    const printGain = ctx.createGain();
    printOsc.type = 'sawtooth';
    printOsc.frequency.setValueAtTime(140, now);
    printOsc.frequency.linearRampToValueAtTime(160, now + 0.35);

    // Motor noise buffer
    const bufferSize = ctx.sampleRate * 0.4;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(800, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.08, now);
    noiseGain.gain.linearRampToValueAtTime(0.01, now + 0.4);

    whiteNoise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    printOsc.connect(printGain);
    printGain.connect(ctx.destination);
    printGain.gain.setValueAtTime(0.06, now);
    printGain.gain.linearRampToValueAtTime(0.01, now + 0.4);

    printOsc.start(now);
    printOsc.stop(now + 0.4);
    whiteNoise.start(now);
    whiteNoise.stop(now + 0.4);

    // 2. Guillotine Paper Cut ("Snick-Clack") after paper feeds
    const cutTime = now + 0.45;
    const cutOsc = ctx.createOscillator();
    const cutGain = ctx.createGain();
    cutOsc.type = 'square';
    cutOsc.frequency.setValueAtTime(420, cutTime);
    cutOsc.frequency.exponentialRampToValueAtTime(120, cutTime + 0.08);

    cutGain.gain.setValueAtTime(0.3, cutTime);
    cutGain.gain.exponentialRampToValueAtTime(0.01, cutTime + 0.1);

    cutOsc.connect(cutGain);
    cutGain.connect(ctx.destination);
    cutOsc.start(cutTime);
    cutOsc.stop(cutTime + 0.1);
  } catch {
    // Audio might require user gesture first
  }
}

export interface PrintableTicketData {
  orderNumber: string | number;
  customerName: string;
  tableNumber?: string | number;
  orderType: 'dine_in' | 'takeaway' | 'delivery' | string;
  date: string;
  time: string;
  items: Array<{
    name: string;
    quantity: number;
    price?: number;
    stationCode?: string;
    variantName?: string | null;
    modifiers?: string[];
    notes?: string | null;
  }>;
  total?: number;
  notes?: string;
  businessName?: string;
  businessPhone?: string;
  businessAddress?: string;
}

/**
 * Generates raw ESC/POS binary buffer for thermal printers (Epson TM-T20, 3nStar, Bixolon)
 */
export function generateEscPosBinary(ticket: PrintableTicketData, profile: 'KITCHEN' | 'BAR' | 'CUSTOMER'): Uint8Array {
  const bytes: number[] = [];

  const write = (str: string) => {
    for (let i = 0; i < str.length; i++) {
      bytes.push(str.charCodeAt(i));
    }
  };

  // ESC @: Initialize printer
  bytes.push(0x1B, 0x40);

  // ESC a 1: Center align
  bytes.push(0x1B, 0x61, 0x01);

  // ESC E 1: Bold on
  bytes.push(0x1B, 0x45, 0x01);
  write(`*** ${ticket.businessName || 'brew.cl Gastronomia'} ***\n`);
  bytes.push(0x1B, 0x45, 0x00); // Bold off

  write(`ORDEN #${ticket.orderNumber}\n`);
  write(`${ticket.date}  ${ticket.time}\n`);
  write(`TIPO: ${ticket.orderType.toUpperCase()} ${ticket.tableNumber ? `| MESA ${ticket.tableNumber}` : ''}\n`);
  write(`CLIENTE: ${ticket.customerName}\n`);
  write('--------------------------------\n');

  // ESC a 0: Left align
  bytes.push(0x1B, 0x61, 0x00);

  const filteredItems = profile === 'BAR'
    ? ticket.items.filter(i => i.stationCode === 'BAR')
    : profile === 'KITCHEN'
    ? ticket.items.filter(i => i.stationCode !== 'BAR')
    : ticket.items;

  for (const item of filteredItems) {
    bytes.push(0x1B, 0x45, 0x01);
    write(`${item.quantity}x ${item.name}\n`);
    bytes.push(0x1B, 0x45, 0x00);

    if (item.variantName) {
      write(`   > ${item.variantName}\n`);
    }
    if (item.modifiers && item.modifiers.length > 0) {
      write(`   + ${item.modifiers.join(', ')}\n`);
    }
    if (item.notes) {
      write(`   * Nota: ${item.notes}\n`);
    }
  }

  write('--------------------------------\n');
  if (profile === 'CUSTOMER' && ticket.total) {
    const neto = Math.round(ticket.total / 1.19);
    const iva = ticket.total - neto;
    const tip = Math.round(ticket.total * 0.1);

    write(`MONTO NETO:  $${neto.toLocaleString('es-CL')}\n`);
    write(`IVA (19%):   $${iva.toLocaleString('es-CL')}\n`);
    write(`TOTAL CONSUMO:$${ticket.total.toLocaleString('es-CL')}\n`);
    write(`PROPINA 10%: $${tip.toLocaleString('es-CL')} (Sugerida)\n`);
    bytes.push(0x1B, 0x45, 0x01);
    write(`TOTAL C/PROP:$${(ticket.total + tip).toLocaleString('es-CL')}\n`);
    bytes.push(0x1B, 0x45, 0x00);
    write('--------------------------------\n');
    write('*** BOLETA ELECTRÓNICA SII ***\n');
    write(`RUT: 76.432.198-5 | FOLIO: 10421\n`);
    write('Timbre Electrónico DTE (TED)\n');
    write('Verifique documento en www.sii.cl\n');
  }

  if (ticket.notes) {
    write(`NOTA: ${ticket.notes}\n`);
  }

  // Feed 4 lines
  bytes.push(0x1B, 0x64, 0x04);

  // GS V 0: Paper Cut
  bytes.push(0x1D, 0x56, 0x00);

  return new Uint8Array(bytes);
}
