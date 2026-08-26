import { e as createComponent, k as renderComponent, r as renderTemplate } from '../chunks/astro/server_D1yw4fBs.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../chunks/AdminLayout_BlrPdXnE.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import 'react';
import { u as useCatalogStore } from '../chunks/useCatalogStore_DoXAvo3e.mjs';
import { Sparkles, Smartphone, Share2, FolderKanban, UtensilsCrossed, Store, CheckCircle2, Circle, ArrowRight } from 'lucide-react';
export { renderers } from '../renderers.mjs';

function DashboardIsland() {
  const { business, categories, products, isLoaded } = useCatalogStore();
  if (!isLoaded) {
    return /* @__PURE__ */ jsx("div", { className: "p-8 text-slate-400 text-sm", children: "Cargando panel de control..." });
  }
  const steps = [
    { label: "Información y branding del negocio configurados", completed: !!business.name && !!business.phone, href: "/admin/business" },
    { label: "Logo y portada agregados", completed: !!business.logoUrl, href: "/admin/business" },
    { label: "Al menos una categoría creada", completed: categories.length > 0, href: "/admin/categories" },
    { label: "Al menos un producto cargado con precio", completed: products.length > 0, href: "/admin/products" },
    { label: "Producto marcado como destacado para portada", completed: products.some((p) => p.isFeatured), href: "/admin/products" },
    { label: "Variantes o modificadores configurados (ej. extras)", completed: products.some((p) => p.variants && p.variants.length > 0 || p.modifiers && p.modifiers.length > 0), href: "/admin/products" },
    { label: "Revisar vista previa móvil interactiva", completed: true, href: "/admin/preview" },
    { label: "Compartir enlace público con tus clientes", completed: true, href: `/menu/${business.slug}` }
  ];
  const completedCount = steps.filter((s) => s.completed).length;
  const progressPercent = Math.round(completedCount / steps.length * 100);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsx("div", { className: "relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 md:p-8 border border-slate-800 shadow-xl", children: /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold", children: [
          /* @__PURE__ */ jsx(Sparkles, { className: "w-3.5 h-3.5" }),
          "SaaS Multi-tenant v0.1 • Estilo OlaClick"
        ] }),
        /* @__PURE__ */ jsxs("h1", { className: "text-2xl md:text-3xl font-extrabold text-white tracking-tight", children: [
          "Bienvenido, ",
          business.name
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-sm max-w-xl", children: "Tu menú digital está activo y listo para recibir clientes. Administra tus productos, categorías y pedidos desde aquí." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "/admin/preview",
            className: "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium border border-slate-700 transition",
            children: [
              /* @__PURE__ */ jsx(Smartphone, { className: "w-4 h-4 text-brand-400" }),
              "Vista Previa"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: `/menu/${business.slug}`,
            target: "_blank",
            rel: "noreferrer",
            className: "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold shadow-lg shadow-brand-500/25 transition",
            children: [
              /* @__PURE__ */ jsx(Share2, { className: "w-4 h-4" }),
              "Ver Menú Público"
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-xl bg-slate-950 border border-slate-800/80", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-slate-400", children: "Categorías Activas" }),
          /* @__PURE__ */ jsx(FolderKanban, { className: "w-5 h-5 text-brand-400" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-white mt-2", children: categories.length }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 mt-1", children: "Organización del menú" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-xl bg-slate-950 border border-slate-800/80", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-slate-400", children: "Total Productos" }),
          /* @__PURE__ */ jsx(UtensilsCrossed, { className: "w-5 h-5 text-brand-400" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-white mt-2", children: products.length }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs text-slate-500 mt-1", children: [
          products.filter((p) => p.isFeatured).length,
          " destacados"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-xl bg-slate-950 border border-slate-800/80", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-slate-400", children: "Pedidos Hoy" }),
          /* @__PURE__ */ jsx(Store, { className: "w-5 h-5 text-emerald-400" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-white mt-2", children: "12" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-emerald-400 mt-1", children: "+18% vs ayer" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-xl bg-slate-950 border border-slate-800/80", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-slate-400", children: "Ventas Estimadas" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-brand-400", children: business.currencySymbol })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold text-white mt-2", children: [
          business.currencySymbol,
          "89.400"
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs text-slate-500 mt-1", children: [
          "Moneda: ",
          business.currency
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-2xl bg-slate-950 border border-slate-800", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-white flex items-center gap-2", children: "Guía de Configuración Inicial (Onboarding)" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 mt-0.5", children: "Completa estos pasos para tener tu catálogo y tienda al 100%." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-sm font-bold text-brand-400", children: [
            completedCount,
            " de ",
            steps.length,
            " completados"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-32 bg-slate-800 rounded-full h-2.5 overflow-hidden", children: /* @__PURE__ */ jsx(
            "div",
            {
              className: "bg-gradient-to-r from-brand-500 to-amber-400 h-2.5 rounded-full transition-all duration-500",
              style: { width: `${progressPercent}%` }
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "divide-y divide-slate-800/60 mt-2", children: steps.map((step, idx) => /* @__PURE__ */ jsxs(
        "a",
        {
          href: step.href,
          className: "py-3.5 px-2 flex items-center justify-between hover:bg-slate-900/60 rounded-xl transition group",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3.5", children: [
              step.completed ? /* @__PURE__ */ jsx(CheckCircle2, { className: "w-5 h-5 text-emerald-400 shrink-0" }) : /* @__PURE__ */ jsx(Circle, { className: "w-5 h-5 text-slate-600 shrink-0" }),
              /* @__PURE__ */ jsx("span", { className: `text-sm font-medium ${step.completed ? "text-slate-200 line-through opacity-80" : "text-slate-100 font-semibold"}`, children: step.label })
            ] }),
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 text-slate-600 group-hover:text-brand-400 group-hover:translate-x-1 transition" })
          ]
        },
        idx
      )) })
    ] })
  ] });
}

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Dashboard & Onboarding", "activePath": "/admin" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "DashboardIsland", DashboardIsland, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Trabajos/bun/src/components/react/dashboard/DashboardIsland", "client:component-export": "default" })} ` })}`;
}, "C:/Trabajos/bun/src/pages/admin/index.astro", void 0);

const $$file = "C:/Trabajos/bun/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
