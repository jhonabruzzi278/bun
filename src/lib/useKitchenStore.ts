import { useState, useEffect, useCallback } from 'react';
import type { KitchenTicket, KitchenStatus, PrepStation } from './types';

export const INITIAL_STATIONS: PrepStation[] = [
  { id: 'st_all', name: 'Todas las Estaciones (Jefe de Cocina)', code: 'ALL', color: '#f97316', isActive: true },
  { id: 'st_grill', name: 'Parrilla & Plancha', code: 'GRILL', color: '#ef4444', isActive: true },
  { id: 'st_fry', name: 'Frituras & Acompañamientos', code: 'FRY', color: '#eab308', isActive: true },
  { id: 'st_bar', name: 'Bar & Bebidas', code: 'BAR', color: '#06b6d4', isActive: true },
];

export const INITIAL_KITCHEN_TICKETS: KitchenTicket[] = [
  {
    id: 'kt_101',
    tenantId: 'tenant_001',
    businessId: 'biz_001',
    ticketNumber: 101,
    orderType: 'dine_in',
    tableNumber: 'Mesa 4',
    customerName: 'Rodrigo Fuentes',
    status: 'PREPARING',
    targetMinutes: 15,
    notes: 'Cliente pide pan bien dorado y servir todo junto.',
    prepStartedAt: new Date(Date.now() - 6 * 60 * 1000).toISOString(), // hace 6 min
    createdAt: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 6 * 60 * 1000).toISOString(),
    items: [
      {
        id: 'ki_1',
        ticketId: 'kt_101',
        productName: 'Double Bacon Smash',
        quantity: 2,
        variantName: 'Doble (2 Smash)',
        modifiers: ['Queso Cheddar Extra', 'Tiras de Tocino Extra'],
        stationCode: 'GRILL',
        status: 'PREPARING',
      },
      {
        id: 'ki_2',
        ticketId: 'kt_101',
        productName: 'Papas Rústicas con Cheddar & Bacon',
        quantity: 1,
        stationCode: 'FRY',
        status: 'READY',
      },
      {
        id: 'ki_3',
        ticketId: 'kt_101',
        productName: 'Limonada Menta Jengibre',
        quantity: 2,
        stationCode: 'BAR',
        status: 'READY',
      }
    ]
  },
  {
    id: 'kt_102',
    tenantId: 'tenant_001',
    businessId: 'biz_001',
    ticketNumber: 102,
    orderType: 'delivery',
    customerName: 'Camila Morales',
    status: 'PENDING',
    targetMinutes: 15,
    notes: 'Entregar sin cubiertos de plástico por favor.',
    createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(), // hace 2 min
    updatedAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    items: [
      {
        id: 'ki_4',
        ticketId: 'kt_102',
        productName: 'Truffle & Mushroom Burger',
        quantity: 1,
        modifiers: ['Huevo Frito de Campo'],
        stationCode: 'GRILL',
        status: 'PENDING',
      },
      {
        id: 'ki_5',
        ticketId: 'kt_102',
        productName: 'Papas Rústicas con Cheddar & Bacon',
        quantity: 1,
        stationCode: 'FRY',
        status: 'PENDING',
      }
    ]
  },
  {
    id: 'kt_100',
    tenantId: 'tenant_001',
    businessId: 'biz_001',
    ticketNumber: 100,
    orderType: 'takeaway',
    customerName: 'Gonzalo Silva',
    status: 'READY',
    targetMinutes: 15,
    prepStartedAt: new Date(Date.now() - 14 * 60 * 1000).toISOString(),
    readyAt: new Date(Date.now() - 1 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 16 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 60 * 1000).toISOString(),
    items: [
      {
        id: 'ki_6',
        ticketId: 'kt_100',
        productName: 'Double Bacon Smash',
        quantity: 1,
        stationCode: 'GRILL',
        status: 'READY',
      }
    ]
  }
];

const STORAGE_KEYS = {
  TICKETS: 'bun_kitchen_tickets_state',
  STATIONS: 'bun_kitchen_stations_state',
  SOUND_ENABLED: 'bun_kitchen_sound_enabled',
};

// Web Audio API Sound Synthesizer (Zero dependencies)
export function playKitchenSound(type: 'new' | 'ready' | 'delayed' | 'cancel') {
  try {
    const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === 'new') {
      // Double upbeat chime
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.setValueAtTime(880, now + 0.1); // A5
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'ready') {
      // Pleasant completed chime
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
      osc.start(now);
      osc.stop(now + 0.5);
    } else if (type === 'delayed') {
      // Warning low tone
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(329.63, now); // E4
      osc.frequency.setValueAtTime(293.66, now + 0.15); // D4
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'cancel') {
      // Harsh buzz
      osc.type = 'square';
      osc.frequency.setValueAtTime(220, now);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    }
  } catch {
    // Audio might be blocked until first user gesture
  }
}

export function useKitchenStore() {
  const [tickets, setTickets] = useState<KitchenTicket[]>(INITIAL_KITCHEN_TICKETS);
  const [stations] = useState<PrepStation[]>(INITIAL_STATIONS);
  const [selectedStation, setSelectedStation] = useState<string>('ALL');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    try {
      const storedTickets = localStorage.getItem(STORAGE_KEYS.TICKETS);
      const storedSound = localStorage.getItem(STORAGE_KEYS.SOUND_ENABLED);

      if (storedTickets) setTickets(JSON.parse(storedTickets));
      if (storedSound !== null) setSoundEnabled(storedSound === 'true');
    } catch (e) {
      console.error('Error loading kitchen tickets', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveTickets = useCallback((newTickets: KitchenTicket[]) => {
    setTickets(newTickets);
    localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(newTickets));
    window.dispatchEvent(new Event('bun:kitchen_updated'));
  }, []);

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEYS.SOUND_ENABLED, String(next));
      return next;
    });
  };

  const updateTicketStatus = (ticketId: string, nextStatus: KitchenStatus) => {
    const now = new Date().toISOString();
    const updated = tickets.map((t) => {
      if (t.id !== ticketId) return t;

      const patch: Partial<KitchenTicket> = {
        status: nextStatus,
        updatedAt: now,
      };

      if (nextStatus === 'PREPARING' && !t.prepStartedAt) {
        patch.prepStartedAt = now;
      } else if (nextStatus === 'READY' && !t.readyAt) {
        patch.readyAt = now;
        if (soundEnabled) playKitchenSound('ready');
      } else if (nextStatus === 'DELIVERED' && !t.deliveredAt) {
        patch.deliveredAt = now;
      }

      return { ...t, ...patch };
    });

    saveTickets(updated);
  };

  const cancelTicket = (ticketId: string, reason: string) => {
    const now = new Date().toISOString();
    const updated = tickets.map((t) => {
      if (t.id !== ticketId) return t;
      return {
        ...t,
        status: 'CANCELLED' as KitchenStatus,
        cancelledAt: now,
        cancellationReason: reason,
        updatedAt: now,
      };
    });

    if (soundEnabled) playKitchenSound('cancel');
    saveTickets(updated);
  };

  const createTicketFromOrder = (orderData: Partial<KitchenTicket>) => {
    const newTicket: KitchenTicket = {
      id: `kt_${Date.now()}`,
      tenantId: 'tenant_001',
      businessId: 'biz_001',
      ticketNumber: tickets.length > 0 ? Math.max(...tickets.map(t => t.ticketNumber)) + 1 : 101,
      orderType: orderData.orderType || 'delivery',
      tableNumber: orderData.tableNumber,
      customerName: orderData.customerName || 'Cliente Mostrador',
      status: 'PENDING',
      targetMinutes: 15,
      notes: orderData.notes,
      items: orderData.items || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const nextList = [newTicket, ...tickets];
    if (soundEnabled) playKitchenSound('new');
    saveTickets(nextList);
    return newTicket;
  };

  const resetKitchenDemo = () => {
    saveTickets(INITIAL_KITCHEN_TICKETS);
  };

  return {
    tickets,
    stations,
    selectedStation,
    setSelectedStation,
    soundEnabled,
    toggleSound,
    isLoaded,
    updateTicketStatus,
    cancelTicket,
    createTicketFromOrder,
    resetKitchenDemo,
  };
}
