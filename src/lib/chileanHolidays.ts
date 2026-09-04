/**
 * Chilean Holidays API Integration (API Oficial de Feriados del Gobierno de Chile)
 * Helps gastronomic businesses anticipate peak demand, long weekends, and ingredient purchasing.
 */

export interface ChileanHoliday {
  nombre: string;
  fecha: string;
  irrenunciable: string;
  tipo: string;
  diasRestantes?: number;
}

const FALLBACK_HOLIDAYS: ChileanHoliday[] = [
  { nombre: 'Independencia Nacional (Fiestas Patrias)', fecha: '2026-09-18', irrenunciable: '1', tipo: 'Civil' },
  { nombre: 'Día de las Glorias del Ejército', fecha: '2026-09-19', irrenunciable: '1', tipo: 'Civil' },
  { nombre: 'Encuentro de Dos Mundos', fecha: '2026-10-12', irrenunciable: '0', tipo: 'Civil' },
  { nombre: 'Día de las Iglesias Evangélicas y Protestantes', fecha: '2026-10-31', irrenunciable: '0', tipo: 'Religioso' },
  { nombre: 'Día de Todos los Santos', fecha: '2026-11-01', irrenunciable: '0', tipo: 'Religioso' },
  { nombre: 'Inmaculada Concepción', fecha: '2026-12-08', irrenunciable: '0', tipo: 'Religioso' },
  { nombre: 'Navidad', fecha: '2026-12-25', irrenunciable: '1', tipo: 'Religioso' },
];

export async function getUpcomingChileanHolidays(): Promise<ChileanHoliday[]> {
  const currentYear = new Date().getFullYear();
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(`https://apis.digital.gob.cl/fl/feriados/v1/${currentYear}`, {
      signal: controller.signal,
      headers: { 'User-Agent': 'brew.cl-gastronomia-app' },
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data: ChileanHoliday[] = await res.json();
      return processUpcoming(data);
    }
  } catch {
    // Fallback gracefully without throwing
  }

  return processUpcoming(FALLBACK_HOLIDAYS);
}

function processUpcoming(holidays: ChileanHoliday[]): ChileanHoliday[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return holidays
    .map((h) => {
      const holidayDate = new Date(h.fecha + 'T00:00:00');
      const diffDays = Math.ceil((holidayDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return {
        ...h,
        diasRestantes: diffDays,
      };
    })
    .filter((h) => (h.diasRestantes ?? -1) >= 0)
    .sort((a, b) => (a.diasRestantes ?? 0) - (b.diasRestantes ?? 0));
}
