import { e as createComponent, k as renderComponent, r as renderTemplate } from '../../chunks/astro/server_D1yw4fBs.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_BlrPdXnE.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import React, { useState } from 'react';
import { u as useCatalogStore } from '../../chunks/useCatalogStore_DoXAvo3e.mjs';
import { RotateCcw, CheckCircle2, Store, Palette, Phone, Save } from 'lucide-react';
export { renderers } from '../../renderers.mjs';

function BusinessSettingsIsland() {
  const { business, updateBusiness, resetToDemo, isLoaded } = useCatalogStore();
  const [formData, setFormData] = useState(business);
  const [savedMessage, setSavedMessage] = useState(false);
  React.useEffect(() => {
    if (isLoaded) {
      setFormData(business);
    }
  }, [isLoaded, business]);
  if (!isLoaded) return /* @__PURE__ */ jsx("div", { className: "text-slate-400 text-sm", children: "Cargando datos..." });
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = e.target.checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateBusiness(formData);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3e3);
  };
  return /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto space-y-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-extrabold text-white", children: "Configuración del Negocio" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400", children: "Personaliza la identidad, colores y datos de contacto de tu local." })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: resetToDemo,
          className: "inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-lg border border-slate-700 transition",
          children: [
            /* @__PURE__ */ jsx(RotateCcw, { className: "w-3.5 h-3.5" }),
            "Restablecer a Demo"
          ]
        }
      )
    ] }),
    savedMessage && /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-center gap-2 animate-fade-in", children: [
      /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4" }),
      "¡Configuración guardada correctamente! Los cambios ya se reflejan en el menú público."
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-base font-bold text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Store, { className: "w-4 h-4 text-brand-400" }),
          "Identidad General"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold text-slate-300 mb-1", children: "Nombre del Local / Restaurante" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "name",
                value: formData.name,
                onChange: handleChange,
                required: true,
                className: "w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-500"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold text-slate-300 mb-1", children: "Slug URL (Subdominio / Enlace)" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx("span", { className: "px-3 py-2.5 bg-slate-900 border border-r-0 border-slate-700 text-slate-400 text-xs rounded-l-xl", children: "/menu/" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  name: "slug",
                  value: formData.slug,
                  onChange: handleChange,
                  required: true,
                  className: "w-full px-3 py-2.5 rounded-r-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-500 font-mono"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold text-slate-300 mb-1", children: "Descripción / Eslogan" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                name: "description",
                rows: 2,
                value: formData.description,
                onChange: handleChange,
                className: "w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-500"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-base font-bold text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Palette, { className: "w-4 h-4 text-brand-400" }),
          "Imágenes & Color de Marca"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold text-slate-300 mb-1", children: "URL Logo Cuadrado" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "url",
                name: "logoUrl",
                value: formData.logoUrl,
                onChange: handleChange,
                placeholder: "https://...",
                className: "w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-500"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold text-slate-300 mb-1", children: "URL Banner / Portada" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "url",
                name: "bannerUrl",
                value: formData.bannerUrl,
                onChange: handleChange,
                placeholder: "https://...",
                className: "w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-500"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold text-slate-300 mb-1", children: "Color Principal (Hex)" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "color",
                  name: "primaryColor",
                  value: formData.primaryColor,
                  onChange: handleChange,
                  className: "w-10 h-10 rounded-lg border-0 bg-transparent cursor-pointer"
                }
              ),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  name: "primaryColor",
                  value: formData.primaryColor,
                  onChange: handleChange,
                  className: "w-32 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono"
                }
              )
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-base font-bold text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4 text-brand-400" }),
          "Contacto & Pedidos por WhatsApp"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold text-slate-300 mb-1", children: "Número de WhatsApp (con código de país)" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "phone",
                value: formData.phone,
                onChange: handleChange,
                placeholder: "+56912345678",
                className: "w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-500"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold text-slate-300 mb-1", children: "Dirección Física" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "address",
                value: formData.address,
                onChange: handleChange,
                placeholder: "Av. Providencia 1240...",
                className: "w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-500"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 pt-2 md:col-span-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                id: "whatsappOrders",
                name: "whatsappOrders",
                checked: formData.whatsappOrders,
                onChange: handleChange,
                className: "w-4 h-4 text-brand-500 rounded border-slate-700 bg-slate-900 focus:ring-brand-500"
              }
            ),
            /* @__PURE__ */ jsx("label", { htmlFor: "whatsappOrders", className: "text-xs font-medium text-slate-300 cursor-pointer", children: "Habilitar recepción de pedidos directamente por WhatsApp" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-end gap-3 pt-4", children: /* @__PURE__ */ jsxs(
        "button",
        {
          type: "submit",
          className: "inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-lg shadow-brand-500/25 transition",
          children: [
            /* @__PURE__ */ jsx(Save, { className: "w-4 h-4" }),
            "Guardar Cambios"
          ]
        }
      ) })
    ] })
  ] });
}

const $$Business = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Configuraci\xF3n de Mi Negocio", "activePath": "/admin/business" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "BusinessSettingsIsland", BusinessSettingsIsland, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Trabajos/bun/src/components/react/business/BusinessSettingsIsland", "client:component-export": "default" })} ` })}`;
}, "C:/Trabajos/bun/src/pages/admin/business.astro", void 0);

const $$file = "C:/Trabajos/bun/src/pages/admin/business.astro";
const $$url = "/admin/business";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Business,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
