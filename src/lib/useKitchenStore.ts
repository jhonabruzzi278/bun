import { useState, useEffect, useCallback, useRef } from 'react';
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
  const knownTicketIds = useRef<Set<string>>(new Set());
  const isInitialLoadDone = useRef<boolean>(false);
  const soundEnabledRef = useRef<boolean>(soundEnabled);

  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

  useEffect(() => {
    try {
      const storedTickets = localStorage.getItem(STORAGE_KEYS.TICKETS);
      const storedSound = localStorage.getItem(STORAGE_KEYS.SOUND_ENABLED);

      if (storedTickets) {
        const parsed: KitchenTicket[] = JSON.parse(storedTickets);
        setTickets(parsed);
        parsed.forEach((t) => knownTicketIds.current.add(t.id));
      }
      if (storedSound !== null) setSoundEnabled(storedSound === 'true');
    } catch (e) {
      console.error('Error loading kitchen tickets', e);
    } finally {
      setIsLoaded(true);
    }

    const processIncomingTickets = (serverTickets: KitchenTicket[]) => {
      if (!Array.isArray(serverTickets) || serverTickets.length === 0) return;

      let hasNewPendingTicket = false;
      serverTickets.forEach((t) => {
        if (!knownTicketIds.current.has(t.id)) {
          knownTicketIds.current.add(t.id);
          if (t.status === 'PENDING' && isInitialLoadDone.current) {
            hasNewPendingTicket = true;
          }
        }
      });

      if (hasNewPendingTicket && soundEnabledRef.current) {
        playKitchenSound('new');
      }

      setTickets(serverTickets);
      localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(serverTickets));
      isInitialLoadDone.current = true;
    };

    // 1. Initial fetch from Turso API
    fetch('/api/kitchen')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          processIncomingTickets(json.data);
        }
      })
      .catch((err) => console.warn('Turso tickets initial fetch warning:', err))
      .finally(() => {
        isInitialLoadDone.current = true;
      });

    // 2. Realtime SSE connection (<200ms latency)
    let eventSource: EventSource | null = null;
    try {
      eventSource = new EventSource('/api/realtime/events');

      eventSource.addEventListener('kitchen:new_ticket', (e) => {
        try {
          const newTicket: KitchenTicket = JSON.parse(e.data);
          if (!newTicket || !newTicket.id) return;

          knownTicketIds.current.add(newTicket.id);

          setTickets((prev) => {
            const exists = prev.some((t) => t.id === newTicket.id);
            if (exists) return prev;
            const updated = [newTicket, ...prev];
            localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(updated));
            return updated;
          });

          if (soundEnabledRef.current) {
            playKitchenSound('new');
          }
        } catch (err) {
          console.warn('Error processing SSE kitchen:new_ticket:', err);
        }
      });

      eventSource.addEventListener('kitchen:update_ticket', (e) => {
        try {
          const payload = JSON.parse(e.data);
          const { ticketId, status, patch } = payload || {};
          if (!ticketId) return;

          setTickets((prev) => {
            const updated = prev.map((t) =>
              t.id === ticketId ? { ...t, status: (status || t.status) as KitchenStatus, ...(patch || {}) } : t
            );
            localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(updated));
            return updated;
          });
        } catch (err) {
          console.warn('Error processing SSE kitchen:update_ticket:', err);
        }
      });

      eventSource.onerror = () => {
        // EventSource automatically attempts reconnects
      };
    } catch (sseErr) {
      console.warn('SSE not supported or failed to connect:', sseErr);
    }

    // 3. Fallback Polling (every 4 seconds for resilience)
    const pollInterval = setInterval(() => {
      fetch('/api/kitchen')
        .then((res) => res.json())
        .then((json) => {
          if (json.success && Array.isArray(json.data)) {
            processIncomingTickets(json.data);
          }
        })
        .catch(() => {});
    }, 4000);

    // 4. Local storage event listener for same-browser multi-tab sync
    const handleUpdate = () => {
      const storedTickets = localStorage.getItem(STORAGE_KEYS.TICKETS);
      if (storedTickets) {
        setTickets(JSON.parse(storedTickets));
      }
    };

    window.addEventListener('bun:kitchen_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      if (eventSource) eventSource.close();
      clearInterval(pollInterval);
      window.removeEventListener('bun:kitchen_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
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

    // Sync status change to Turso
    fetch('/api/kitchen', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ticketId, status: nextStatus }),
    }).catch((e) => console.warn('Turso status sync warning:', e));
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
