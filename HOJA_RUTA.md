# Hoja de Ruta (Roadmap) - Plataforma BUN (OlaClick SaaS)

## Definición del documento
- **Para qué sirve:** Define los objetivos estratégicos, estado actual de entrega, roadmap por horizontes y backlog técnico priorizado bajo el ciclo de desarrollo AI-DLC.
- **Cuándo se crea o actualiza:** Se actualiza al completar hitos, bolts de desarrollo o incorporar nuevos requisitos del negocio.
- **Qué debe contener:** Matriz de funcionalidades terminadas vs por desarrollar, arquitectura del backend ligero (Node.js/NestJS en Coolify) y próximos horizontes.

---

## 🧭 Resumen Ejecutivo y Estado del Proyecto

- **Fase AI-DLC:** **Construcción Media / Avanzada** (Frontend y maquetación interactiva 100% fiel a OlaClick, persistencia reactiva Local First, Dockerfile standalone listo para Coolify).
- **Entorno Actual:** Local (`localhost:4321`) y Staging en Vercel (`https://bun-cyan.vercel.app`).
- **Destino Productivo Backend:** VPS autohospedado con **Coolify** (Node.js standalone + PostgreSQL).

---

## 📊 Matriz Detallada: Funcionalidades Listas vs Por Desarrollar

### ✅ **1. FUNCIONALIDADES LISTAS (Completadas al 100% y Operativas)**

| Módulo / Funcionalidad | Descripción | Enlace Local |
|---|---|---|
| **Menú Digital Público Responsive** | E-commerce móvil con carrito flotante, cálculo de subtotales, extras/modificadores y checkout a WhatsApp. | [`/menu/burger-craft`](http://localhost:4321/menu/burger-craft) |
| **Modo Solo Lectura** | Modalidad para consultar cartas informativas en mesa sin botón de compra (`?type=read`). | [`/menu/burger-craft?type=read`](http://localhost:4321/menu/burger-craft?type=read) |
| **Guía de Onboarding 17 Pasos** | Checklist interactivo con 4 etapas de OlaClick, cálculo porcentual y widget de cohete 🚀 en Sidebar. | [`/admin/onboarding`](http://localhost:4321/admin/onboarding) |
| **Sidebar con Acordeón 'Configuraciones'** | Menú desplegable con indicador visual cian activo y enlaces a 6 sub-módulos. | En todo [`/admin`](http://localhost:4321/admin) |
| **Configuración General (4 Pestañas)** | Canales de venta (Web, PDV, Chatbot, QR, Apps), Tipos de Servicio, Coberturas e Impulso de Ventas. | [`/admin/settings`](http://localhost:4321/admin/settings) |
| **Tipos de Servicio y Canales** | Delivery a domicilio, Para llevar (Pick-up), En el local, En mesa (solo PDV) y Propinas voluntarias. | [`/admin/services`](http://localhost:4321/admin/services) |
| **Precios y Coberturas de Envío** | 6 métodos de cálculo: Sin precio ($0), Fijo, Barrio, Distancia (km GPS), Polígonos de mapa y Rangos. | [`/admin/settings#coverage`](http://localhost:4321/admin/settings) |
| **Impulso de Ventas (Cross-selling & Re-order)** | Sistema de recomendación de productos complementarios en carrito y sugerencia inteligente de último pedido. | [`/admin/settings#growth`](http://localhost:4321/admin/settings) |
| **Gestión de Equipo y Roles (Crear Usuario)** | Modal de creación de usuarios con roles dedicados (Admin, Mesero, Cajero, Cocinero, Repartidor). | [`/admin/team`](http://localhost:4321/admin/team) |
| **Generador de Enlaces y Códigos QR** | 3 bloques idénticos a OlaClick (Menú general, Mesas con selector 1-20 y Solo lectura) con descarga SVG/PNG. | [`/admin/qr`](http://localhost:4321/admin/qr) |
| **Cocina KDS en Vivo con Audio Web API** | Kanban de comandas (Pendiente, En preparación, Listo), temporizadores de target minutes y alertas de audio. | [`/admin/kitchen`](http://localhost:4321/admin/kitchen) |
| **Gestión de Catálogo y Modificadores** | Categorías, Productos con fotos, precios comparativos, variantes (Simple/Doble) y grupos de extras/toppings. | [`/admin/products`](http://localhost:4321/admin/products) |
| **Personalización de Marca y Negocio** | Subida de Logo, Banner de portada, selector de paleta de colores y moneda local (CLP, USD, etc.). | [`/admin/business`](http://localhost:4321/admin/business) |
| **Matriz de Funcionalidades & Precios** | Comparativa de planes (Free, Starter, Pro) con tooltips explicativos (?) en cada característica. | [`/pricing`](http://localhost:4321/pricing) |

---

### 🟡 **2. FUNCIONALIDADES EN ROADMAP INMEDIATO (Por Desarrollar / Próximo Bolt)**

| Módulo / Funcionalidad | Descripción | Prioridad |
|---|---|---|
| **Punto de Venta POS Táctil (`/admin/pos`)** | Pantalla de venta rápida en mostrador/mesas para cajeros y meseros con cobro en efectivo/tarjeta y envío a cocina. | 🔥 **Alta (Siguiente Paso)** |
| **Chatbot WhatsApp con IA (`/admin/chatbot`)** | Centro de configuración de mensajes automáticos: bienvenida, horarios, carrito abandonado, seguimiento de pedidos y recuperador de ventas. | 🔥 **Alta** |
| **Marketing: Cupones y Fidelidad (`/admin/marketing`)** | Generador de cupones de descuento (% o monto fijo), programa de cashback y recompensas automáticas por puntos. | 🟡 **Media** |
| **Visibilidad Dual de Catálogo (WEB vs PDV)** | Configuración de disponibilidad: mostrar productos ocultos en PDV, venta de productos agotados con advertencia. | 🟡 **Media** |
| **Conexión de Impresoras Térmicas (`/admin/printers`)** | Impresión directa de tickets de comanda (58mm / 80mm ESC/POS) para cocina y cierre de caja. | 🟡 **Media** |

---

### 🔵 **3. BACKEND & INFRAESTRUCTURA PRODUCTIVA (Coolify VPS)**

| Componente | Estado | Descripción |
|---|---|---|
| **Dockerfile Multi-stage** | ✅ **Listo** | Contenedor Node.js standalone ultra ligero optimizado para memoria (<50MB RAM). |
| **Drizzle ORM + PostgreSQL** | 🟡 **Esquema Creado** | Tablas de tenants, categories, products, orders, kitchen_tickets migradas. |
| **API Endpoints & Sincronización** | 🟡 **Por conectar** | Endpoints REST en Astro Node para reemplazar `localStorage` por PostgreSQL en Coolify. |
| **WebSockets / SSE Tickets KDS** | 🔵 **Planificado** | Notificación en tiempo real cuando ingresa un pedido desde WhatsApp o Menú Web a la Cocina KDS. |

---

## 🗺️ Hoja de Ruta por Horizontes

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ HORIZONTE 1: Consolidación Total de Módulos Frontend OlaClick (ACTUAL)      │
├─────────────────────────────────────────────────────────────────────────────┤
│  ✅ 1.1 Menú digital público responsive con carrito y checkout WhatsApp.    │
│  ✅ 1.2 Subida local de imágenes (Logo/Banner) y personalización de marca.   │
│  ✅ 1.3 Generador de Códigos QR para mesas y modo Solo Lectura.             │
│  ✅ 1.4 Guía Paso a Paso de 17 Pasos (4 Etapas) con cohete 🚀 en Sidebar.   │
│  ✅ 1.5 Configuración General (Canales, Servicios, Coberturas, Impulso).    │
│  ✅ 1.6 Módulo de Creación de Usuarios y Roles de Equipo.                   │
│  ✅ 1.7 Tablero de Cocina KDS en vivo con Web Audio API.                    │
│  🔄 1.8 Pantalla Punto de Venta (POS) para cobros en barra y salón.         │
│  🔄 1.9 Módulo de Chatbot WhatsApp con editor de plantillas de mensajes.    │
│  🔄 1.10 Módulo de Marketing (Cupones de descuento y Fidelidad).             │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ HORIZONTE 2: Backend Ligero & Despliegue en Coolify (VPS)                  │
├─────────────────────────────────────────────────────────────────────────────┤
│  ⚡ 2.1 Conexión API REST con PostgreSQL y Drizzle ORM.                     │
│  ⚡ 2.2 Despliegue en Coolify con Dockerfile multi-stage.                   │
│  ⚡ 2.3 WebSockets / SSE para tickets de cocina en vivo.                    │
│  ⚡ 2.4 Impresión térmica ESC/POS para comandas físicas.                    │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ HORIZONTE 3: Automatización IA & Integraciones Delivery                      │
├─────────────────────────────────────────────────────────────────────────────┤
│  🤖 3.1 Agente de IA para WhatsApp Cloud API con toma de pedidos natural.   │
│  🛵 3.2 App PWA para Repartidores con cálculo de ruta por GPS.              │
│  🌐 3.3 Sincronización con Google My Business y Delivery Apps externas.      │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🎯 Próximas Acciones Priorizadas:

1. **Punto de Venta POS (`/admin/pos`):** Interfaz táctil de cobro en mostrador y mesas.
2. **Centro de Chatbot WhatsApp (`/admin/chatbot`):** Simulador de chat en vivo y editor de los mensajes automáticos (Bienvenida, Horarios, Carrito abandonado, Estados de pedido).
3. **Marketing & Fidelización (`/admin/marketing`):** Cupones de descuento y programa de puntos.
