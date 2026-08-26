# Hoja de Ruta (Roadmap) - Plataforma BUN (OlaClick SaaS)

## Definición del documento
- **Para qué sirve:** Define los objetivos estratégicos, estado actual de entrega, roadmap por horizontes y backlog técnico priorizado bajo el ciclo de desarrollo AI-DLC.
- **Cuándo se crea o actualiza:** Se actualiza al completar hitos, bolts de desarrollo o incorporar nuevos requisitos del negocio.
- **Qué debe contener:** Estado de módulos completados, backlog inmediato (local/Vercel), arquitectura del backend ligero (Node.js/NestJS en Coolify) y próximos horizontes.

---

## 🧭 Resumen Ejecutivo y Fase Actual

- **Fase AI-DLC detectada:** **Construcción Media / Avanzada** (Módulos frontend completados, persistencia local reactiva y base de backend con Docker y Drizzle ORM).
- **Entorno Actual:** Local (`localhost:4321`) y Staging en Vercel (`https://bun-cyan.vercel.app`).
- **Destino Productivo Backend:** VPS autohospedado con **Coolify** (Node.js / NestJS ultra ligero + PostgreSQL).

---

## 📊 Matriz de Estado de Módulos

| Módulo / Funcionalidad | Estado | Entorno Actual | Próximo Paso |
|---|---|---|---|
| **Landing Page Principal (`/`)** | ✅ **Completado (100%)** | Local / Vercel | Optimización SEO |
| **Menú Digital Público (`/menu/[slug]`)** | ✅ **Completado (100%)** | Local / Vercel | Checkout WhatsApp & Carrito |
| **Modo Solo Lectura (`?type=read`)** | ✅ **Completado (100%)** | Local / Vercel | Probado y operativo |
| **Personalización Logo & Portada** | ✅ **Completado (100%)** | Local / Vercel | Subida Base64 / Local Storage |
| **Generador de Enlaces & QR (`/admin/qr`)** | ✅ **Completado (100%)** | Local / Vercel | Mockups dinámicos idénticos a OlaClick |
| **Matriz de Funcionalidades & Tooltips (?)** | ✅ **Completado (100%)** | Local / Vercel | Disponible en `/pricing` |
| **Pantalla de Cocina KDS (`/admin/kitchen`)** | ✅ **Completado (MVP)** | Local / Vercel | Audio Web API y Kanban reactivo |
| **Punto de Venta POS & Caja (`/admin/pos`)** | 🟡 **En Roadmap Inmediato** | Local | Diseñar interfaz de cobro y turnos |
| **Backend Ligero Coolify (Node / Drizzle)** | 🟡 **Estructurado** | Local / Docker | Conectar API REST con PostgreSQL |
| **Chatbot WhatsApp con IA** | 🔵 **Horizonte 2** | Planificado | Integración webhook WhatsApp Cloud |

---

## 🗺️ Hoja de Ruta por Horizontes (Roadmap)

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ HORIZONTE 1: Consolidación Local & Frontend OlaClick (ACTUAL)               │
├─────────────────────────────────────────────────────────────────────────────┤
│  ✅ 1.1 Menú digital público responsive con carrito flotante y WhatsApp.    │
│  ✅ 1.2 Subida local de imágenes (Logo/Banner) y edición de marca.           │
│  ✅ 1.3 Módulo 'Mis enlaces y Códigos QR' con 3 bloques y mockups vivos.    │
│  ✅ 1.4 Modo Solo Lectura (?type=read) para cartas informativas.             │
│  ✅ 1.5 Matriz de Características y Planes con tooltips explicativos (?).   │
│  ✅ 1.6 Cocina KDS en vivo con alertas sonoras Web Audio y Kanban.          │
│  🔄 1.7 Punto de Venta (POS) rápido para registrar ventas presenciales.     │
│  🔄 1.8 Gestión de Categorías, Productos y Modificadores (Extras/Toppings). │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ HORIZONTE 2: Backend Ultra Ligero & Despliegue en Coolify (VPS)            │
├─────────────────────────────────────────────────────────────────────────────┤
│  ⚡ 2.1 Backend Node.js / NestJS minimalista:                                │
│       - Consumo de memoria optimizado (< 50MB RAM).                         │
│       - API REST / Fastify o Endpoints Astro SSR con Drizzle ORM.           │
│       - PostgreSQL en Docker con límites ligeros (256MB RAM).               │
│  ⚡ 2.2 Despliegue en Coolify con Dockerfile multi-stage.                   │
│  ⚡ 2.3 Sincronización WebSockets / SSE para tickets de cocina en vivo.      │
│  ⚡ 2.4 Autenticación multi-tenant (JWT / Cookies HttpOnly seguras).         │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ HORIZONTE 3: Automatización, Chatbot IA & Entregas                          │
├─────────────────────────────────────────────────────────────────────────────┤
│  🤖 3.1 Chatbot WhatsApp con IA para toma de pedidos y seguimiento.        │
│  🛵 3.2 App / Vista de Repartidores con cálculo de tarifa por km.           │
│  🖨️ 3.3 Servicio de impresión térmica automática (58mm / 80mm).             │
│  📊 3.4 Reportes automáticos diarios de KPIs y ventas por correo.           │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Decisiones de Arquitectura del Backend

1. **Ligereza Máxima:**
   - Stack: **Node.js (Astro Node Standalone / Fastify)** + **Drizzle ORM** + **PostgreSQL**.
   - Evitar frameworks pesados o Java/JVM; mantener la huella de memoria por debajo de los 100MB RAM en el VPS de Coolify.
2. **Dual Mode:**
   - Modo Staging / Serverless en **Vercel** (`@astrojs/vercel`).
   - Modo Self-Hosted en **Coolify VPS** (`@astrojs/node` standalone dentro de Docker).
3. **Persistencia Local First:**
   - Las pruebas locales funcionan inmediatamente con localStorage + EventBus, permitiendo iterar y validar la UI/UX en segundos sin requerir bases de datos remotas obligatorias.

---

## 📌 Próximas Acciones Inmediatas (Backlog):

1. **Módulo Punto de Venta (POS) en `/admin/pos`:** Pantalla táctil de cobro en barra para tomar comandas rápidas presenciales.
2. **Gestión de Stock e Inventario:** Control de disponibilidad de ingredientes en `/admin/products`.
3. **Validación del contenedor Docker en local:** Probar `docker-compose up` para verificar el contenedor standalone.
