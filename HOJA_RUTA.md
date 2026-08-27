# 🗺️ Hoja de Ruta (Roadmap) - Ecosistema BUN / PIDELISTO.CL

> **Sistema Híbrido de Gestión Gastronómica, Autoatención "Guest-First", KDS en Tiempo Real y Confirmación de Reservas con Inteligencia Artificial.**

---

## 📌 1. Ficha Técnica y Visión del Proyecto

* **Nombre del Producto:** PIDELISTO.CL / BUN Platform
* **Filosofía Principal:** **"Guest-First"** (Cero fricción: los clientes acceden, piden, dividen la cuenta y reservan sin registrar cuentas ni contraseñas).
* **Fase Actual:** **Construcción Avanzada** (Estructura Multi-Tenant, Drizzle ORM + PostgreSQL, KDS Base, POS Base y Menú Público operativos).
* **Stack Tecnológico:**
  * **Frontend:** Astro 5 SSR + React 19 + TailwindCSS + Lucide Icons.
  * **Backend & Datos:** Node.js (Astro API Endpoints) + PostgreSQL + Drizzle ORM + Redis (en vivo).
  * **Tiempo Real:** Server-Sent Events (SSE) / WebSockets para sincronización en milisegundos.
  * **Comunicaciones & IA:** WhatsApp Cloud API (Meta) + Voice Bots con IA (Vapi.ai / Bland.ai).
  * **Pasarelas de Pago:** Capa agnóstica multi-proveedor (Mercado Pago, Webpay Plus Transbank, Stripe).
  * **Despliegue:** Vercel (Staging) y VPS Coolify (Producción Docker Multi-stage).

---

## 🏗️ 2. Arquitectura Global del Ecosistema

```mermaid
flowchart TB
    subgraph CLIENTES["📱 Experiencia del Cliente (Guest-First)"]
        QR["Escaneo QR en Mesa"] --> PWA["Portal Web / PWA"]
        WEB["Sitio Web / Enlace"] --> PWA
        PWA --> FLOW_MESA["Flujo Mesa: Menú + Split Bill + Llamar Garzón"]
        PWA --> FLOW_RES["Flujo Reservas: Pre-pedido + Magic Link"]
        PWA --> FLOW_TICKETS["Flujo Eventos: Compra Entradas QR"]
    end

    subgraph CORE["⚙️ Core Backend & Datos"]
        API["API Gateway / Astro SSR"]
        DB[(PostgreSQL + Drizzle)]
        REDIS[(Redis State & Carts)]
        IA["Motor IA: WhatsApp + Voice Bot"]
        PAY["Capa Agnóstica de Pagos (Failover)"]
    end

    subgraph DASHBOARDS["🖥️ Red de Dashboards Operativos (Salón, Barra y Cocina)"]
        FLOOR["Floor Manager 2D: Plano de Mesas Interactivo"]
        KDS_KITCHEN["KDS Cocina: Comandas y Tiempos"]
        KDS_BAR["KDS Bar: Despacho Bebidas"]
        POS["Terminal POS / Caja / Cierres"]
        CRM["CRM Implícito & Analítica RFM"]
    end

    FLOW_MESA --> API
    FLOW_RES --> API
    FLOW_TICKETS --> API

    API <--> DB
    API <--> REDIS
    API <--> PAY
    API <--> IA

    API -->|Tiempo Real: SSE/WS| FLOOR
    API -->|Tiempo Real: SSE/WS| KDS_KITCHEN
    API -->|Tiempo Real: SSE/WS| KDS_BAR
    API -->|Tiempo Real: SSE/WS| POS
    DB --> CRM
```

---

## 👥 3. Flujos de Usuario Principales (Casos de Uso)

```mermaid
sequenceDiagram
    autonumber
    actor Cliente as 👤 Cliente en Mesa
    participant QR as 📱 QR / Menú PWA
    participant Backend as ⚙️ Servidor / API
    actor Garzon as 🤵 Floor Manager (Garzón)
    actor Cocina as 👨‍🍳 KDS Cocina / Bar
    actor Caja as 💳 POS / Caja

    Note over Cliente,QR: CASO A: Cliente Espontáneo en Salón
    Cliente->>QR: Escanea QR de la Mesa
    QR->>Cliente: Pide solo Nombre y Teléfono (Sin Login)
    Cliente->>QR: Selecciona platos + Opciones de Split Bill
    alt Paga en Línea
        Cliente->>QR: Paga vía Mercado Pago / Webpay
    else Paga en Efectivo / Llama Garzón
        Cliente->>QR: Pulsa "Llamar al Garzón" o "Pagar Efectivo"
        QR->>Garzon: Alerta visual parpadeante en Plano 2D
    end
    QR->>Backend: Envía comanda
    Backend->>Cocina: Ticket ingresa a KDS (Alerta sonora)
    Backend->>Garzon: Mesa cambia a estado 'Ocupada' (Rojo)
    Backend->>Caja: Comanda vinculada a la mesa en POS
```

```mermaid
sequenceDiagram
    autonumber
    actor Planificador as 📅 Cliente Planificador
    participant Web as 🌐 Web Reservas
    participant IA_Engine as 🤖 Motor IA (WhatsApp / Voz)
    participant Core as ⚙️ Sistema Pidelisto
    actor Salon as 🏢 Recepción / Floor Manager

    Note over Planificador,Salon: CASO B: Reservas con Pre-pedido e IA
    Planificador->>Web: Elige Fecha, Hora, Personas y arma Pre-pedido
    Planificador->>Web: Paga abono/total por pasarela
    Web->>Planificador: Envía Magic Link por WhatsApp/SMS
    Note over IA_Engine: 2 horas antes de la reserva
    IA_Engine->>Planificador: Mensaje WhatsApp de confirmación
    alt No responde a la hora límite (-1.5 hrs)
        IA_Engine->>Planificador: Voice Bot IA llama por teléfono y conversa en lenguaje natural
    end
    Planificador->>IA_Engine: Confirma o Cancela
    alt Cancela a tiempo
        Core->>Planificador: Genera Cupón "Saldo a Favor" asociado a su Teléfono
    else Confirma
        Core->>Salon: Bloquea mesa y programa comanda en KDS
    end
```

---

## 📦 4. Detalle Exhaustivo de Módulos y Funcionalidades

### 📱 MÓDULO 1: Portal Cliente (PWA Guest-First & Autoatención)
*Diseñado para eliminar fricciones y agilizar la rotación de mesas mediante autoservicio móvil.*

| Funcionalidad | Descripción Detallada | Estado | Ruta / Enlace |
| :--- | :--- | :---: | :--- |
| **Menú Digital Interactivo** | Catálogo dinámico con fotos, categorías (Comida, Bar, Promos), modificadores (extras, salsas), variantes y control de stock en tiempo real. | ✅ **Listo** | [`/menu/burger-craft`](http://localhost:4321/menu/burger-craft) |
| **Sesión de Mesa Guest-First** | Ingreso al menú vinculando número de mesa escaneada. Solicita únicamente **Nombre y Teléfono** (sin contraseñas) creando una sesión temporal. | 🔄 **En Progreso** | [`/menu/[slug]?table=X`](http://localhost:4321/menu/burger-craft) |
| **División de Cuenta (Split Bill)** | Permite a varios comensales en la misma mesa pagar sus propios productos de forma independiente o dividir el total en partes iguales desde sus propios teléfonos. | 🔄 **En Progreso** | En Menú PWA |
| **Botones de Asistencia en Mesa** | Botones de acción directa: **"Llamar al Garzón"** (para consultas) y **"Pagar en Efectivo / POS Físico"**, disparando alertas visuales inmediatas en salón. | 🔄 **En Progreso** | En Menú PWA |
| **Venta de Entradas para Eventos** | Módulo de ticketing para eventos y shows: selección de fecha, compra de entradas con QR dinámico por email/WhatsApp y lector para control de aforo en puerta. | 📋 **Planificado** | [`/admin/events`](http://localhost:4321/admin) |
| **Modo Carta Informativa (Solo Lectura)** | Modo de visualización estática para clientes que solo desean ver precios y platos sin interactuar con el carrito (`?type=read`). | ✅ **Listo** | [`/menu/burger-craft?type=read`](http://localhost:4321/menu/burger-craft?type=read) |

---

### 🤖 MÓDULO 2: Motor de Reservas, Pre-pedidos & Confirmación IA
*Sistema inteligente para maximizar la ocupación del local y erradicar el ausentismo (No-Show).*

| Funcionalidad | Descripción Detallada | Estado | Ruta / Enlace |
| :--- | :--- | :---: | :--- |
| **Reservas Web con Pre-pedido** | Widget para reservar fecha, hora y comensales con la opción de armar el pedido de comida/bebida por adelantado, pagando un abono o el total. | 📋 **Planificado** | [`/reservations`](http://localhost:4321) |
| **Magic Link de Reserva** | Generación de enlace seguro enviado por WhatsApp/SMS con el detalle, estado y acceso para modificar o cancelar la reserva sin requerir usuario/clave. | 📋 **Planificado** | Servicio `lib/magic-links` |
| **Recordatorio WhatsApp (-2 hrs)** | Envío automático de mensaje interactivo por Meta WhatsApp Cloud API pidiendo confirmación con botones (Confirmar / Cancelar). | 📋 **Planificado** | Worker / Cron Job |
| **Voice Bot IA Telefónico (-1.5 hrs)** | Si no hay confirmación digital a la hora límite, un agente de voz con IA (Vapi.ai / Bland.ai) llama al cliente y conversa en lenguaje natural para confirmar o reprogramar. | 📋 **Planificado** | Webhook `/api/webhooks/voice-bot` |
| **Política Flex / Saldo a Favor** | Si el cliente cancela antes del límite, el pago no se devuelve bancariamente, sino que se transforma automáticamente en un **Cupón / Saldo a Favor** asociado a su teléfono. | 📋 **Planificado** | [`/admin/marketing`](http://localhost:4321/admin) |
| **Tolerancia en Salón (15 min)** | Contador regresivo visual en el mapa de mesas al llegar la hora de la reserva. Si se vence el tiempo, la mesa se libera y se frena la comanda en cocina. | 📋 **Planificado** | En Floor Manager |

---

### 🖥️ MÓDULO 3: Red de Dashboards Operativos en Tiempo Real
*Interfaces táctiles sincronizadas para optimizar la velocidad del servicio en salón, barra y cocina.*

| Funcionalidad | Descripción Detallada | Estado | Ruta / Enlace |
| :--- | :--- | :---: | :--- |
| **Floor Manager 2D (Plano de Mesas)** | Vista gráfica 2D con *Drag & Drop* para organizar mesas, asignar garzones y visualizar estados por color: **Verde** (Libre), **Rojo** (Ocupada), **Parpadeante** (Llama garzón), **Amarillo** (Tolerancia). | 🔄 **En Progreso** | [`/admin/floor`](http://localhost:4321/admin/floor) |
| **KDS Cocina (Pantalla de Comandas)** | Pantalla táctil para cocineros: comandas ordenadas por antigüedad, semáforo de retrasos (+15 min en rojo), etapas de preparación y priorización de pre-pedidos. | ✅ **Listo (Base)** | [`/admin/kitchen`](http://localhost:4321/admin/kitchen) |
| **KDS Bar (Despacho de Bebidas)** | Pantalla especializada para barra que filtra automáticamente solo productos de coctelería y bebidas para despachos ultrarrápidos. | 🔄 **En Progreso** | [`/admin/kitchen?station=bar`](http://localhost:4321/admin/kitchen) |
| **Punto de Venta POS (`/admin/pos`)** | Terminal táctil de caja para toma de pedidos presenciales, cobro en mostrador, asignación de mesas y facturación. | 🔄 **En Progreso** | [`/admin/pos`](http://localhost:4321/admin/pos) |
| **Caja y Cierres de Turno (`/admin/cashier`)** | Módulo para apertura/cierre de caja, arqueo de dinero en efectivo, balance de tarjetas y registro de egresos. | ✅ **Listo (Base)** | [`/admin/cashier`](http://localhost:4321/admin/cashier) |
| **Sincronización en Tiempo Real** | Conexión bidireccional mediante SSE / WebSockets para que las órdenes de los clientes impacten al instante en KDS, POS y Floor Manager sin refrescar. | 🔄 **En Progreso** | Endpoint `/api/realtime` |
| **Impresión Térmica ESC/POS** | Módulo de conexión e impresión física de comandas en impresoras de 58mm y 80mm en cocina, barra y recibos de caja. | 📋 **Planificado** | [`/admin/printers`](http://localhost:4321/admin/printers) |

---

### 💳 MÓDULO 4: Motor Transaccional de Pagos Agnósticos
*Infraestructura de pagos resiliente con múltiples procesadores y alta disponibilidad.*

| Funcionalidad | Descripción Detallada | Estado | Ruta / Enlace |
| :--- | :--- | :---: | :--- |
| **Capa Agnóstica de Pagos (Adapter Pattern)** | Arquitectura desacoplada que permite procesar pagos a través de múltiples pasarelas mediante una interfaz unificada (`PaymentGateway`). | 📋 **Planificado** | `src/lib/payments/*` |
| **Integración Mercado Pago** | Cobro con Checkout Pro, QR dinámico y tarjetas de crédito/débito en Chile y Latinoamérica. | 📋 **Planificado** | Adaptador Mercado Pago |
| **Integración Webpay Plus (Transbank)** | Pasarela oficial para pagos con tarjetas bancarias y Redcompra en Chile. | 📋 **Planificado** | Adaptador Transbank |
| **Integración Stripe** | Cobros internacionales multidivisa para turistas y reservas extranjeras. | 📋 **Planificado** | Adaptador Stripe |
| **Failover Automático** | Conmutación inteligente: si una pasarela reporta caídas o rechazos recurrentes, el sistema desvía los cobros automáticamente a la pasarela de respaldo. | 📋 **Planificado** | Orquestador de Pagos |
| **Pagos Fraccionados (Split Payments)** | Lógica transaccional para liquidar comandas con múltiples tarjetas o combinación de métodos de pago (ej. Mitad Webpay, mitad Efectivo). | 📋 **Planificado** | En POS y Checkout |

---

### 📊 MÓDULO 5: CRM Implícito, Fidelización & Analítica
*Inteligencia de negocio automatizada sin necesidad de formularios invasivos para el comensal.*

| Funcionalidad | Descripción Detallada | Estado | Ruta / Enlace |
| :--- | :--- | :---: | :--- |
| **Identificación por Anclas** | Construcción automática del perfil de consumo del cliente vinculando su número de teléfono y Device Fingerprint a su historial de comandas. | 📋 **Planificado** | Modelo `customers` |
| **Analítica de Rotación de Mesas** | Métricas del tiempo promedio desde que el cliente se sienta, ordena, come y desocupa la mesa. | 📋 **Planificado** | [`/admin/reports`](http://localhost:4321/admin/reports) |
| **Tiempos de Cocina y Despacho** | Medición exacta de tiempos de preparación por estación (Plancha, Frituras, Bar) detectando cuellos de botella con `prep_events`. | ✅ **Listo (Base)** | [`/admin/reports`](http://localhost:4321/admin/reports) |
| **Segmentación RFM (Recencia, Frecuencia, Monto)** | Clasificación de clientes (VIP, Frecuentes, En Riesgo, Perdidos) para campañas automáticas de re-activación. | 📋 **Planificado** | [`/admin/marketing`](http://localhost:4321/admin) |
| **Matriz BCG de Productos** | Clasificación de platos y bebidas según volumen de ventas y margen de rentabilidad (Estrella, Vaca, Incógnita, Perro). | 📋 **Planificado** | [`/admin/reports`](http://localhost:4321/admin/reports) |

---

### ⚙️ MÓDULO 6: Gestión SaaS, Configuración & Operación
*Módulos administrativos para la gestión de locales, personal y personalización de marca.*

| Funcionalidad | Descripción Detallada | Estado | Ruta / Enlace |
| :--- | :--- | :---: | :--- |
| **Generador de Enlaces y Códigos QR** | Generador de QR dinámicos para mesas (1 a 20), QR de barra y QR general con descarga SVG y PNG. | ✅ **Listo** | [`/admin/qr`](http://localhost:4321/admin/qr) |
| **Guía de Onboarding 17 Pasos** | Asistente de configuración guiada para nuevos restaurantes con barra de progreso y widget 🚀 en Sidebar. | ✅ **Listo** | [`/admin/onboarding`](http://localhost:4321/admin/onboarding) |
| **Gestión de Roles y Equipo** | Creación y permisos de personal (Administrador, Mesero, Cajero, Cocinero, Repartidor). | ✅ **Listo** | [`/admin/team`](http://localhost:4321/admin/team) |
| **Configuración de Canales y Servicios** | Habilitación de Delivery, Para Llevar, Consumo en Local, Cobro de Propinas y Zonas de Cobertura. | ✅ **Listo** | [`/admin/settings`](http://localhost:4321/admin/settings) |
| **Personalización de Marca (Branding)** | Logotipo, banner de portada, paletas de colores, moneda e información de contacto del restaurante. | ✅ **Listo** | [`/admin/business`](http://localhost:4321/admin/business) |
| **Matriz de Planes SaaS y Precios** | Página de precios comparativa entre planes (Free, Starter, Pro) con tooltips explicativos. | ✅ **Listo** | [`/pricing`](http://localhost:4321/pricing) |
| **Modo Contingencia Offline (LAN Backup)** | Servidor local de respaldo para que la operación interna (KDS, Caja, Floor Manager) continúe funcionando si cae el proveedor de internet. | 📋 **Planificado** | Módulo de Red Local |

---

## 🚀 5. Cronograma de Fases de Desarrollo

```mermaid
gantt
    title Cronograma de Implementación Pidelisto / BUN
    dateFormat  YYYY-MM-DD
    section Fase 1: Salón y Mesas
    Floor Manager 2D (Mesas Drag & Drop)       :active, f1_1, 2026-08-26, 7d
    Flujo Guest-First en Mesa (Nombre/Tel)      :active, f1_2, 2026-08-28, 5d
    Split Bill & Llamar Garzón                  :f1_3, after f1_2, 5d
    Sincronización Tiempo Real (SSE/WS)         :f1_4, after f1_1, 6d
    section Fase 2: KDS & Operación
    KDS Bar y Cocina Especializados             :f2_1, after f1_4, 5d
    Punto de Venta POS Táctil Completo          :f2_2, after f2_1, 7d
    Impresión Térmica ESC/POS                   :f2_3, after f2_2, 4d
    section Fase 3: Pasarelas de Pago
    Capa Agnóstica de Pagos (Adapter)           :f3_1, after f2_2, 6d
    Integración Mercado Pago & Webpay Plus      :f3_2, after f3_1, 7d
    Failover Automático y Split Payments        :f3_3, after f3_2, 5d
    section Fase 4: Reservas e IA
    Módulo Web de Reservas con Pre-pedido       :f4_1, after f3_2, 7d
    Integración WhatsApp Cloud API (-2h)        :f4_2, after f4_1, 5d
    Voice Bot Telefónico con IA (-1.5h)         :f4_3, after f4_2, 6d
    Saldo a Favor / Wallet por Teléfono         :f4_4, after f4_1, 4d
    Timer de Tolerancia 15 min en Salón         :f4_5, after f4_4, 3d
    section Fase 5: Fidelización y Eventos
    Venta de Entradas para Eventos con QR       :f5_1, after f4_3, 6d
    CRM Implícito y Segmentación RFM            :f5_2, after f5_1, 5d
    Contingencia LAN Offline (Backup Local)     :f5_3, after f5_2, 7d
```

---

## 🎯 6. Backlog Inmediato (Próximas Tareas de Código)

1. 🟢 **Tarea 1 - Floor Manager 2D (`/admin/floor`):**
   * Crear el canvas interactivo con drag & drop de mesas.
   * Representación visual de estados: Libre (Verde), Ocupada (Rojo), Llamando Garzón (Parpadeo) y Reserva (Amarillo).
   * Asignación rápida de garzones por zona.

2. 🟢 **Tarea 2 - Flujo Mesa Guest-First (`/menu/[slug]?table=X`):**
   * Modal de bienvenida ligero que pide Nombre y Teléfono.
   * Selector para pagar individualmente o dividir la cuenta (*Split Bill*).
   * Botón interactivo de "Llamar al Garzón" con confirmación en pantalla.

3. 🟢 **Tarea 3 - Capa de Conectividad en Tiempo Real:**
   * Crear el endpoint SSE (`/api/realtime/events`) para despachar eventos de nuevas comandas, cambios de estado en cocina y llamados de asistencia.
   * Conectar `PosDisplayIsland`, `KitchenDisplayIsland` y `FloorManagerIsland` a la fuente de eventos.
