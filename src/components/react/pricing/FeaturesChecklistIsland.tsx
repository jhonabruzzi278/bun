import React, { useState } from 'react';
import { Check, X, HelpCircle, ChevronDown, Sparkles, ArrowRight, Gift, Layers, Bot, Printer, ChefHat, BarChart3, ShieldCheck } from 'lucide-react';

interface FeatureItem {
  name: string;
  tooltip: string;
  starter: string | boolean;
  advanced: string | boolean;
  premium: string | boolean;
  elite: string | boolean;
  infinity: string | boolean;
  badge?: string;
}

interface FeatureCategory {
  category: string;
  icon: string;
  items: FeatureItem[];
}

export const FEATURES_DATA: FeatureCategory[] = [
  {
    category: 'Menú digital y Dominio personalizado',
    icon: '🌐',
    items: [
      {
        name: 'Dominio web personalizado (.com, .cl, .mx)',
        tooltip: 'Vincula tu propio dominio web para que tus clientes naveguen directamente en la marca de tu restaurante.',
        starter: false,
        advanced: '🎁 1 año gratis anual',
        premium: '🎁 1 año gratis anual',
        elite: '🎁 1 año gratis anual',
        infinity: '🎁 1 año gratis anual',
        badge: 'POPULAR',
      },
      {
        name: 'Menú digital sin publicidad',
        tooltip: 'Tu catálogo online totalmente limpio, sin anuncios de terceros ni marcas externas que distraigan a tus comensales.',
        starter: false,
        advanced: true,
        premium: true,
        elite: true,
        infinity: true,
      },
      {
        name: 'Página de bienvenida con enlaces',
        tooltip: 'Página inicial con accesos rápidos a redes sociales, carta, ubicación en mapa y número de contacto.',
        starter: '1 enlace',
        advanced: '4 enlaces',
        premium: 'Ilimitado',
        elite: 'Ilimitado',
        infinity: 'Ilimitado',
      },
      {
        name: 'Publicación de calificación Google',
        tooltip: 'Muestra tus estrellas y reseñas positivas de Google Maps directamente en la portada de tu menú digital.',
        starter: false,
        advanced: true,
        premium: true,
        elite: true,
        infinity: true,
      },
      {
        name: 'Cross-selling de productos',
        tooltip: 'Sugiere automáticamente acompañamientos, bebidas y postres antes de finalizar la compra para aumentar el ticket promedio.',
        starter: false,
        advanced: true,
        premium: true,
        elite: true,
        infinity: true,
      },
      {
        name: 'Productos y toppings ilimitados',
        tooltip: 'Crea todas las categorías, platos, salsas, extras y modificadores que necesites sin límite de cantidad.',
        starter: 'Hasta 50',
        advanced: true,
        premium: true,
        elite: true,
        infinity: true,
      },
      {
        name: 'Múltiples precios por producto (Variantes)',
        tooltip: 'Configura diferentes precios según el tamaño de la porción (Simple, Doble, Familiar, 500ml, 1 Litro).',
        starter: true,
        advanced: true,
        premium: true,
        elite: true,
        infinity: true,
      },
      {
        name: 'Generador de menú en PDF',
        tooltip: 'Descarga un archivo PDF de alta resolución de tu menú listo para imprimir o enviar por mensajería.',
        starter: true,
        advanced: true,
        premium: true,
        elite: true,
        infinity: true,
      },
    ],
  },
  {
    category: 'Gestión y Tipos de Pedidos',
    icon: '🛍️',
    items: [
      {
        name: 'Pedidos en plataforma y WhatsApp',
        tooltip: 'Recibe comandas directamente con el desglose en el panel web y enviadas en formato estructurado a tu chat de WhatsApp.',
        starter: '75 pedidos/mes',
        advanced: '400 pedidos/mes',
        premium: 'Ilimitados',
        elite: 'Ilimitados',
        infinity: 'Ilimitados',
      },
      {
        name: 'Tipos de pedidos: Local, Llevar y Domicilio',
        tooltip: 'Permite a los clientes indicar si están sentados en una mesa, si pasarán a retirar o si requieren delivery a su dirección.',
        starter: true,
        advanced: true,
        premium: true,
        elite: true,
        infinity: true,
      },
      {
        name: 'Precio de entrega por zona o rango / km',
        tooltip: 'Calcula el costo del flete de delivery automáticamente según la distancia o polígonos de reparto definidos.',
        starter: false,
        advanced: true,
        premium: true,
        elite: true,
        infinity: true,
      },
      {
        name: 'Pagos online (Tarjetas, Débito, Transferencia)',
        tooltip: 'Permite a los clientes pagar con tarjeta de crédito, débito o billeteras virtuales al momento de hacer el pedido.',
        starter: false,
        advanced: 'Disponible*',
        premium: true,
        elite: true,
        infinity: true,
      },
      {
        name: 'Pedidos agendados',
        tooltip: 'Tus clientes pueden programar su orden para una hora o día específico (ideal para eventos o almuerzos corporativos).',
        starter: false,
        advanced: true,
        premium: true,
        elite: true,
        infinity: true,
      },
    ],
  },
  {
    category: 'Punto de Venta (POS) & Control de Caja',
    icon: '💻',
    items: [
      {
        name: 'Punto de venta multiplataforma',
        tooltip: 'Registra pedidos presenciales desde cualquier dispositivo (tablet, smartphone o computador) con interfaz rápida de mesero/cajero.',
        starter: 'Básico',
        advanced: true,
        premium: true,
        elite: true,
        infinity: true,
      },
      {
        name: 'Inventario y control de stock',
        tooltip: 'Descuenta automáticamente los ingredientes e insumos con cada venta y recibe alertas de stock crítico.',
        starter: false,
        advanced: true,
        premium: true,
        elite: true,
        infinity: true,
      },
      {
        name: 'Cierre de caja y arqueo de turnos',
        tooltip: 'Controla el flujo de dinero en efectivo, propinas y pagos con tarjeta al finalizar cada turno con reporte de diferencias.',
        starter: false,
        advanced: true,
        premium: true,
        elite: true,
        infinity: true,
      },
      {
        name: 'Facturación electrónica',
        tooltip: 'Emite boletas y facturas electrónicas válidas ante el ente tributario de tu país automáticamente con cada orden.',
        starter: false,
        advanced: 'Complemento*',
        premium: 'Complemento*',
        elite: '🎁 Gratis',
        infinity: '🎁 Gratis',
      },
    ],
  },
  {
    category: 'Chatbot WhatsApp con Inteligencia Artificial (IA)',
    icon: '🤖',
    items: [
      {
        name: 'Chatbot de atención automática 24/7',
        tooltip: 'Responde preguntas frecuentes, horarios de apertura y envía el menú a los clientes que te escriben a cualquier hora.',
        starter: false,
        advanced: true,
        premium: true,
        elite: true,
        infinity: true,
      },
      {
        name: 'Chatbot integrado a modelos IA',
        tooltip: 'Inteligencia artificial que comprende lenguaje natural y asiste al cliente para recomendarle platos según sus preferencias.',
        starter: false,
        advanced: '🎁 Con IA gratis',
        premium: '🎁 Con IA gratis',
        elite: '🎁 Con IA gratis',
        infinity: '🎁 Con IA gratis',
        badge: 'IA EXCLUSIVO',
      },
      {
        name: 'Recuperador de carritos abandonados',
        tooltip: 'Envía un recordatorio amistoso a los clientes que iniciaron un pedido pero no completaron el checkout para recuperar la venta.',
        starter: false,
        advanced: false,
        premium: true,
        elite: true,
        infinity: true,
      },
      {
        name: 'Chatbot de seguimiento de pedidos',
        tooltip: 'Notifica automáticamente al cliente en WhatsApp cuando su pedido entra a cocina, está en camino o listo para entrega.',
        starter: false,
        advanced: true,
        premium: true,
        elite: true,
        infinity: true,
      },
      {
        name: 'Chatbot de reseñas y fidelización',
        tooltip: 'Solicita una calificación a los clientes después de recibir su comida y premia con puntos a los compradores recurrentes.',
        starter: false,
        advanced: false,
        premium: true,
        elite: true,
        infinity: true,
      },
    ],
  },
  {
    category: 'Gestión de Entregas & Delivery',
    icon: '🛵',
    items: [
      {
        name: 'App / Vista para repartidores',
        tooltip: 'Pantalla optimizada para que los repartidores vean las direcciones, mapa de navegación y marquen entregas completadas.',
        starter: false,
        advanced: true,
        premium: true,
        elite: true,
        infinity: true,
      },
      {
        name: 'Ubicación del repartidor en directo',
        tooltip: 'Tus clientes pueden ver en un mapa en tiempo real por dónde viene el repartidor con su pedido.',
        starter: false,
        advanced: false,
        premium: true,
        elite: true,
        infinity: true,
      },
      {
        name: 'Comparador de delivery externo',
        tooltip: 'Compara tarifas de flotas de mensajería externas para elegir siempre la opción más económica de envío.',
        starter: false,
        advanced: false,
        premium: true,
        elite: true,
        infinity: true,
      },
    ],
  },
  {
    category: 'Marketing, Envíos Masivos (IA) & CRM',
    icon: '📢',
    items: [
      {
        name: 'Cupones de descuento y promociones',
        tooltip: 'Crea códigos promocionales (porcentaje, monto fijo o delivery gratis) con fecha de caducidad y límite de usos.',
        starter: false,
        advanced: true,
        premium: true,
        elite: true,
        infinity: true,
      },
      {
        name: 'Envío masivo por WhatsApp (IA)',
        tooltip: 'Envía campañas publicitarias con ofertas y fotos a toda tu base de clientes segmentada con ayuda de redacción por IA.',
        starter: false,
        advanced: 'Complemento*',
        premium: 'Complemento*',
        elite: '🎁 Gratis',
        infinity: '🎁 Gratis',
      },
      {
        name: 'Base de datos CRM (Importar/Exportar)',
        tooltip: 'Descarga y administra los nombres, teléfonos y direcciones de todos los comensales que han comprado en tu local.',
        starter: 'Básico',
        advanced: true,
        premium: true,
        elite: true,
        infinity: true,
      },
      {
        name: 'Píxeles de rastreo (Meta, TikTok, Google Ads)',
        tooltip: 'Instala tus códigos de seguimiento publicitario para hacer remarketing y medir la rentabilidad de tus anuncios.',
        starter: false,
        advanced: true,
        premium: true,
        elite: true,
        infinity: true,
      },
    ],
  },
  {
    category: 'Gestor de Cocina KDS & Impresión Térmica',
    icon: '👨‍🍳',
    items: [
      {
        name: 'Gestor de cocina KDS en tiempo real',
        tooltip: 'Pantalla digital de comandas con semáforo de demoras, cronómetros en vivo y separación por áreas (Parrilla, Frituras, Bar).',
        starter: false,
        advanced: true,
        premium: true,
        elite: true,
        infinity: true,
        badge: 'TOP',
      },
      {
        name: 'Impresión automática (58mm y 80mm)',
        tooltip: 'Imprime automáticamente las comandas de cocina y los recibos de cuenta al ingresar un pedido sin tocar la pantalla.',
        starter: false,
        advanced: true,
        premium: true,
        elite: true,
        infinity: true,
      },
      {
        name: 'Personalización de tickets de impresión',
        tooltip: 'Agrega tu logo, mensaje de agradecimiento, redes sociales y desglose fiscal en los tickets impresos.',
        starter: false,
        advanced: true,
        premium: true,
        elite: true,
        infinity: true,
      },
    ],
  },
  {
    category: 'Estadísticas, KPIs y Soporte',
    icon: '📊',
    items: [
      {
        name: 'Informes diarios de KPIs por correo',
        tooltip: 'Recibe informes diarios por correo electrónico sobre el rendimiento de tu negocio para que puedas seguir con precisión el avance de tus ventas.',
        starter: false,
        advanced: true,
        premium: true,
        elite: true,
        infinity: true,
      },
      {
        name: 'Ranking de productos más vendidos y analíticas',
        tooltip: 'Conoce cuáles son tus platos estrella, los horarios de mayor afluencia y el ticket promedio por cliente.',
        starter: 'Básico',
        advanced: true,
        premium: true,
        elite: true,
        infinity: true,
      },
      {
        name: 'Gestión de roles y permisos de equipo',
        tooltip: 'Crea cuentas para meseros, cajeros, administradores y cocineros con accesos restringidos a funciones críticas.',
        starter: '1 usuario',
        advanced: '3 usuarios',
        premium: '8 usuarios',
        elite: 'Ilimitados',
        infinity: 'Ilimitados',
      },
      {
        name: 'Soporte dedicado por WhatsApp',
        tooltip: 'Canal de atención directa y asesoría con ejecutivos especializados para resolver cualquier consulta en minutos.',
        starter: 'Comunitario',
        advanced: 'WhatsApp Advanced',
        premium: 'WhatsApp Premium',
        elite: 'WhatsApp Elite',
        infinity: 'WhatsApp Infinity (24/7)',
      },
    ],
  },
];

export default function FeaturesChecklistIsland() {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    'Menú digital y Dominio personalizado': true,
    'Gestión y Tipos de Pedidos': true,
    'Punto de Venta (POS) & Control de Caja': true,
    'Chatbot WhatsApp con Inteligencia Artificial (IA)': true,
    'Gestor de Cocina KDS & Impresión Térmica': true,
    'Marketing, Envíos Masivos (IA) & CRM': true,
    'Gestión de Entregas & Delivery': true,
    'Estadísticas, KPIs y Soporte': true,
  });

  const toggleCategory = (cat: string) => {
    setOpenCategories((prev) => ({ ...prev, [cat]: !prev[cat] }));
  };

  const renderCell = (val: string | boolean) => {
    if (typeof val === 'boolean') {
      return val ? (
        <Check className="w-4 h-4 text-emerald-400 mx-auto stroke-[2.5]" />
      ) : (
        <X className="w-4 h-4 text-slate-600 mx-auto" />
      );
    }
    return <span className="text-[11px] font-bold text-slate-200 text-center block leading-tight">{val}</span>;
  };

  return (
    <div className="w-full space-y-8">
      
      {/* Header Info */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-widest text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20">
          Tabla comparativa completa
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Todas las Funcionalidades Explicadas al Detalle
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Haz clic o pasa el cursor sobre el ícono <strong className="text-brand-400 font-bold">?</strong> de cualquier característica para leer su descripción completa.
        </p>
      </div>

      {/* Main Checklist Table Container */}
      <div className="rounded-3xl bg-slate-950/90 border border-slate-800 shadow-2xl overflow-hidden overflow-x-auto">
        
        <table className="w-full text-left border-collapse min-w-[700px]">
          {/* Table Header */}
          <thead>
            <tr className="bg-slate-900/90 border-b border-slate-800 text-xs">
              <th className="p-4 sm:p-5 font-black text-white w-2/5">Funcionalidad</th>
              <th className="p-3 font-bold text-slate-300 text-center w-[12%]">Starter<br/><span className="text-[10px] text-slate-500 font-normal">Gratis</span></th>
              <th className="p-3 font-bold text-slate-300 text-center w-[12%]">Advanced<br/><span className="text-[10px] text-slate-500 font-normal">$9/mes</span></th>
              <th className="p-3 font-black text-brand-400 text-center w-[12%] bg-brand-500/10 border-x border-brand-500/20">
                Premium ⭐<br/><span className="text-[10px] text-brand-300 font-bold">$19/mes</span>
              </th>
              <th className="p-3 font-bold text-slate-300 text-center w-[12%]">Elite<br/><span className="text-[10px] text-slate-500 font-normal">$39/mes</span></th>
              <th className="p-3 font-bold text-slate-300 text-center w-[12%]">Infinity<br/><span className="text-[10px] text-slate-500 font-normal">$79/mes</span></th>
            </tr>
          </thead>

          {/* Table Body Groups */}
          <tbody className="divide-y divide-slate-800/80">
            {FEATURES_DATA.map((group) => {
              const isOpen = openCategories[group.category];
              return (
                <React.Fragment key={group.category}>
                  {/* Category Header Row */}
                  <tr
                    onClick={() => toggleCategory(group.category)}
                    className="bg-slate-900/40 hover:bg-slate-900/70 transition cursor-pointer"
                  >
                    <td colSpan={6} className="p-3.5 sm:p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="text-base">{group.icon}</span>
                          <span className="text-xs sm:text-sm font-extrabold text-white uppercase tracking-wider">
                            {group.category}
                          </span>
                          <span className="text-[10px] font-bold text-slate-500">({group.items.length})</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-brand-400' : ''}`} />
                      </div>
                    </td>
                  </tr>

                  {/* Feature Rows */}
                  {isOpen &&
                    group.items.map((item, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-slate-900/30 transition border-b border-slate-800/40"
                      >
                        {/* Feature Name & Tooltip Button */}
                        <td className="p-3.5 sm:p-4 text-xs font-medium text-slate-200">
                          <div className="flex items-center gap-2 relative">
                            <span className="font-semibold text-white">{item.name}</span>
                            
                            {item.badge && (
                              <span className="text-[8px] font-black px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
                                {item.badge}
                              </span>
                            )}

                            {/* Help Tooltip Icon Button */}
                            <div className="relative inline-block">
                              <button
                                type="button"
                                onClick={() => setActiveTooltip(activeTooltip === item.name ? null : item.name)}
                                onMouseEnter={() => setActiveTooltip(item.name)}
                                onMouseLeave={() => setActiveTooltip(null)}
                                className="w-4 h-4 rounded-full bg-slate-800 hover:bg-brand-500 text-slate-400 hover:text-white flex items-center justify-center text-[10px] font-black transition shrink-0"
                                aria-label="Información adicional"
                              >
                                ?
                              </button>

                              {/* Tooltip Popup */}
                              {activeTooltip === item.name && (
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 z-50 w-64 sm:w-80 p-3.5 rounded-2xl bg-slate-900 border border-slate-700 text-slate-200 text-xs shadow-2xl animate-fade-in pointer-events-none">
                                  <div className="font-bold text-brand-400 mb-1 flex items-center gap-1.5">
                                    <Sparkles className="w-3 h-3 text-amber-400" />
                                    <span>{item.name}</span>
                                  </div>
                                  <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
                                    {item.tooltip}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Plan Values */}
                        <td className="p-3 text-center">{renderCell(item.starter)}</td>
                        <td className="p-3 text-center">{renderCell(item.advanced)}</td>
                        <td className="p-3 text-center bg-brand-500/5 border-x border-brand-500/20">{renderCell(item.premium)}</td>
                        <td className="p-3 text-center">{renderCell(item.elite)}</td>
                        <td className="p-3 text-center">{renderCell(item.infinity)}</td>
                      </tr>
                    ))}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Action Footer CTA */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-brand-600 to-amber-500 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl shadow-brand-500/25">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-xl font-black">¿Tienes dudas sobre qué plan elegir para tu local?</h3>
          <p className="text-xs text-white/90">
            Comienza gratis con el plan Starter hoy mismo o consulta con un asesor por WhatsApp.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/onboarding"
            className="px-6 py-3.5 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white font-extrabold text-xs shadow-xl transition hover:scale-105 active:scale-95 whitespace-nowrap flex items-center gap-2"
          >
            <span>Empezar Gratis</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

    </div>
  );
}
