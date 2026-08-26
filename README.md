# 🍔 BUN — Plataforma SaaS de Menú Digital y Gestión Comercial (Estilo OlaClick)

Plataforma moderna de gestión comercial y menú digital diseñada desde sus cimientos para operar bajo una arquitectura **multi-tenant**, permitiendo evolucionar desde un cliente individual hasta un ecosistema SaaS multiempresa y soluciones White Label / Dedicated.

Inspirada en **OlaClick**, combinando un rendimiento ultrarrápido y SEO con **Astro**, componentes interactivos con **React Islands**, diseño premium con **Tailwind CSS**, y persistencia relacional con **PostgreSQL + Drizzle ORM**.

---

## 🚀 Arquitectura y Tecnologías

### Frontend & Rendering
- **Framework Principal:** [Astro](https://astro.build/) (Renderizado híbrido / SSR para alto rendimiento y SEO).
- **Componentes Dinámicos (Islands):** [React](https://react.dev/) (Formularios interactivos, gestión de catálogo, simulador móvil en tiempo real, carrito de compras).
- **Estilos & Diseño:** [Tailwind CSS](https://tailwindcss.com/) (Tema oscuro/claro, micro-animaciones, estética moderna).
- **Iconografía:** [Lucide React](https://lucide.dev/).

### Backend & Persistencia
- **Core:** Node.js + TypeScript (Monolito modular).
- **Base de Datos:** PostgreSQL (Multi-tenancy nativo vía `tenant_id`).
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/) + Drizzle Kit para migraciones.

### Roadmap AWS Progresivo
- **Fase Inicial:** Desarrollo local (Docker + PostgreSQL) & despliegue en Vercel.
- **Fases Cloud:** Amazon S3 (imágenes prefirmadas), Amazon Cognito (Auth), API Gateway + Lambda, EventBridge + SQS (event-driven), DynamoDB (carritos/sesiones) y WebSockets (pantalla de cocina en tiempo real).

---

## 📦 Estructura del Proyecto

```text
bun/
├── src/
│   ├── components/
│   │   ├── astro/             # Componentes estáticos (Sidebar, Navbar, Layouts)
│   │   └── react/             # React Islands (Onboarding, Managers, Simulador, Menú)
│   ├── db/                    # Esquemas Drizzle, cliente DB y scripts de seed
│   ├── layouts/               # Layouts para Admin y Menú Público
│   ├── lib/                   # Tipos, utilidades y stores
│   └── pages/
│       ├── admin/             # Panel administrativo (Dashboard, Negocio, Categorías, Productos, Preview)
│       ├── menu/              # Menú digital público responsive
│       └── api/               # Endpoints REST internos
├── drizzle/                   # Migraciones SQL generadas
├── docker-compose.yml         # Contenedor PostgreSQL para desarrollo local
└── package.json
```

---

## 🛠️ Instalación y Uso Local

### 1. Clonar el Repositorio
```bash
git clone https://github.com/jhonabruzzi278/bun.git
cd bun
```

### 2. Levantar la Base de Datos (Opcional - Docker)
```bash
docker-compose up -d
```

### 3. Instalar Dependencias y Ejecutar
```bash
npm install
npm run dev
```

El panel estará disponible en:
- **Admin Dashboard:** `http://localhost:4321/admin`
- **Vista Previa / Simulador Móvil:** `http://localhost:4321/admin/preview`
- **Menú Público Demo:** `http://localhost:4321/menu/burger-craft`

---

## 📄 Licencia
Este proyecto es privado y propiedad de su respectivo autor.
