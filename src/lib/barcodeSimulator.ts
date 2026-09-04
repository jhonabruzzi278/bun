// Web Audio API Barcode Scanner Beep Generator (Zero dependencies)
export function playBarcodeBeep() {
  try {
    const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    // Classic high-pitched supermarket POS laser beep (approx. 2400Hz - 2600Hz, 80ms duration)
    osc.type = 'sine';
    osc.frequency.setValueAtTime(2600, now);
    
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.start(now);
    osc.stop(now + 0.08);
  } catch {
    // Audio might require user interaction first
  }
}

export interface BarcodeSampleItem {
  barcode: string;
  name: string;
  category: string;
  price: number;
  icon: string;
  sku: string;
}

// Common Chilean retail barcodes (EAN-13) for beverage & fast retail simulation
export const RETAIL_BARCODE_SAMPLES: BarcodeSampleItem[] = [
  {
    barcode: '7801620006785',
    name: 'Coca-Cola Original 350ml (Lata)',
    category: 'Bebidas',
    price: 1800,
    icon: '🥤',
    sku: 'BEB-COCA-350',
  },
  {
    barcode: '7801620006792',
    name: 'Coca-Cola Sin Azúcar 350ml (Lata)',
    category: 'Bebidas',
    price: 1800,
    icon: '🥫',
    sku: 'BEB-COCA-ZERO-350',
  },
  {
    barcode: '7501064191547',
    name: 'Cerveza Corona Extra 330ml (Botella)',
    category: 'Cervezas',
    price: 3200,
    icon: '🍺',
    sku: 'CERV-CORONA-330',
  },
  {
    barcode: '9002490100070',
    name: 'Bebida Energética Red Bull 250ml',
    category: 'Bebidas',
    price: 2600,
    icon: '⚡',
    sku: 'BEB-REDBULL-250',
  },
  {
    barcode: '7801610001234',
    name: 'Papas Fritas Lays Clásicas 200g',
    category: 'Snacks',
    price: 2400,
    icon: '🥔',
    sku: 'SNK-LAYS-200',
  },
  {
    barcode: '7801620009991',
    name: 'Agua Mineral Benedictino sin gas 500ml',
    category: 'Bebidas',
    price: 1500,
    icon: '💧',
    sku: 'BEB-AGUA-500',
  },
];

/**
 * Creates a physical USB / Bluetooth HID barcode gun listener.
 * Physical barcode scanners type keys at blazing speed (< 40ms between keys) followed by an 'Enter' key.
 */
export function createPhysicalBarcodeListener(onBarcodeScanned: (barcode: string) => void) {
  if (typeof window === 'undefined') return () => {};

  let buffer = '';
  let lastKeyTime = Date.now();

  const handleKeyDown = (e: KeyboardEvent) => {
    // Ignore input if user is actively typing in a standard input or textarea
    const activeEl = document.activeElement;
    const isEditingText = activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA') && (activeEl as HTMLElement).id !== 'barcode-scanner-input';
    if (isEditingText) return;

    const currentTime = Date.now();
    const timeDiff = currentTime - lastKeyTime;
    lastKeyTime = currentTime;

    // Reset buffer if delay exceeds 60ms (meaning manual human typing)
    if (timeDiff > 60) {
      buffer = '';
    }

    if (e.key === 'Enter') {
      if (buffer.length >= 4) {
        e.preventDefault();
        onBarcodeScanned(buffer);
        buffer = '';
      }
    } else if (e.key.length === 1) {
      buffer += e.key;
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}
