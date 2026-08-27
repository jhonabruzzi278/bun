# Metadatos del Proyecto BUN / PIDELISTO (Plataforma Híbrida Gastronómica)

## Definición del documento
- **Para qué sirve:** Resume la identidad, alcance, fase y estado documental del proyecto bajo el ciclo AI-DLC integrando los requerimientos de `Pidelisto.docx`.
- **Cuándo se crea o actualiza:** Durante cada auditoría AI-DLC o cambio estructural de arquitectura.
- **Qué contiene:** Nombre, responsable, fechas, fase, completitud de módulos, matriz de arquitectura y enlaces operativos.

---

- **Nombre del Proyecto:** BUN / PIDELISTO.CL (Plataforma Híbrida de Autoatención, Reservas, KDS, POS y Floor Manager con IA)
- **Responsable:** Jonathan Guerra (@jhonabruzzi278)
- **Analizado el:** 26 de Agosto de 2026
- **Fase actual:** **Construcción Media / Avanzada**
- **Última actualización:** 26 de Agosto de 2026

## Estado Documental y Operativo
- [x] **Iniciación:** Completa (Requisitos de `Pidelisto.docx`, casos de uso de clientes espontáneos/planificadores y arquitectura de módulos consolidada).
- [x] **Construcción:** Avanzada (Frontend interactivo, Drizzle ORM + PostgreSQL Multi-tenant, KDS y POS base, Generador QR dinámico).
- [ ] **Operaciones:** En progreso (Despliegue continuo en Vercel activo, Dockerfile para Coolify VPS).

## Ecosistema de Módulos (Pidelisto)
1. **Módulo 1: Portal Cliente (PWA Guest-First)** -> Menú QR, Split Bill, Llamar Garzón, Venta de Entradas QR.
2. **Módulo 2: Motor de Confirmación IA & Tolerancia** -> Reservas, Pre-pedidos, Voice Bot IA (Vapi/Bland), WhatsApp Reminders, Saldo a Favor, Timer 15 min.
3. **Módulo 3: Red de Dashboards Operativos** -> KDS Cocina, KDS Bar, Caja/Recepción, Floor Manager 2D de mesas.
4. **Módulo 4: Capa de Inteligencia & CRM Implícito** -> Identificación por teléfono/fingerprint, Analítica RFM, Rotación de mesas.
5. **Módulo 5: Motor Transaccional** -> Pagos agnósticos (Mercado Pago, Webpay, Stripe) con Failover automático.

## Enlaces Rápidos
- **Hoja de Ruta Completa (Roadmap):** [HOJA_RUTA.md](file:///c:/Trabajos/bun/HOJA_RUTA.md)
- **Especificación Original:** [Pidelisto.docx](file:///c:/Trabajos/bun/documentacion-aidlc/Pidelisto.docx)
- **Cocina KDS:** [/admin/kitchen](http://localhost:4321/admin/kitchen)
- **Punto de Venta (PDV / POS):** [/admin/pos](http://localhost:4321/admin/pos)
- **Plano de Mesas (Floor Manager):** [/admin/floor](http://localhost:4321/admin/floor)
- **Caja & Cierre de Turno:** [/admin/cashier](http://localhost:4321/admin/cashier)
- **Mis Enlaces y Códigos QR:** [/admin/qr](http://localhost:4321/admin/qr)
- **Guía de Configuración Onboarding:** [/admin/onboarding](http://localhost:4321/admin/onboarding)
- **Configuración General & Canales:** [/admin/settings](http://localhost:4321/admin/settings)
- **Reportes & Estadísticas:** [/admin/reports](http://localhost:4321/admin/reports)
- **Despliegue Vercel:** [https://bun-cyan.vercel.app](https://bun-cyan.vercel.app)
