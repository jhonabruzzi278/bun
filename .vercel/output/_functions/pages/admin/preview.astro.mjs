import { e as createComponent, k as renderComponent, r as renderTemplate } from '../../chunks/astro/server_D1yw4fBs.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_BlrPdXnE.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { P as PublicMenuIsland } from '../../chunks/PublicMenuIsland_bC2Bkcsd.mjs';
import { RefreshCw, ExternalLink } from 'lucide-react';
import { u as useCatalogStore } from '../../chunks/useCatalogStore_DoXAvo3e.mjs';
export { renderers } from '../../renderers.mjs';

function MobilePreviewIsland() {
  const { business } = useCatalogStore();
  const [key, setKey] = useState(0);
  const handleRefresh = () => {
    setKey((prev) => prev + 1);
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6 max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-extrabold text-white", children: "Simulador Móvil en Vivo" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400", children: "Comprueba en tiempo real cómo verán tus clientes el menú desde sus teléfonos." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: handleRefresh,
            className: "inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition",
            children: [
              /* @__PURE__ */ jsx(RefreshCw, { className: "w-3.5 h-3.5" }),
              "Recargar Vista"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: `/menu/${business.slug}`,
            target: "_blank",
            rel: "noreferrer",
            className: "inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-brand-500 hover:bg-brand-600 rounded-xl shadow-md shadow-brand-500/20 transition",
            children: [
              /* @__PURE__ */ jsx(ExternalLink, { className: "w-3.5 h-3.5" }),
              "Abrir en Pestaña Nueva"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center py-6", children: /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-[390px] h-[780px] bg-black rounded-[48px] p-3.5 shadow-2xl shadow-black/80 ring-1 ring-slate-800 border-4 border-slate-800 flex flex-col", children: [
      /* @__PURE__ */ jsxs("div", { className: "absolute top-6 inset-x-0 mx-auto w-28 h-5 bg-black rounded-full z-50 flex items-center justify-center", children: [
        /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-slate-900 mr-2" }),
        /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-slate-800" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-full h-full bg-slate-950 rounded-[38px] overflow-y-auto relative scrollbar-none pt-4", children: /* @__PURE__ */ jsx(PublicMenuIsland, {}) }, key),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-2 inset-x-0 mx-auto w-32 h-1 bg-slate-700 rounded-full" })
    ] }) })
  ] });
}

const $$Preview = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Simulador M\xF3vil", "activePath": "/admin/preview" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "MobilePreviewIsland", MobilePreviewIsland, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Trabajos/bun/src/components/react/preview/MobilePreviewIsland", "client:component-export": "default" })} ` })}`;
}, "C:/Trabajos/bun/src/pages/admin/preview.astro", void 0);

const $$file = "C:/Trabajos/bun/src/pages/admin/preview.astro";
const $$url = "/admin/preview";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Preview,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
