import { e as createComponent, k as renderComponent, r as renderTemplate } from '../../chunks/astro/server_D1yw4fBs.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_BlrPdXnE.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import { u as useCatalogStore } from '../../chunks/useCatalogStore_DoXAvo3e.mjs';
import { Plus, FolderKanban, GripVertical, Eye, EyeOff, Edit2, Trash2, X } from 'lucide-react';
export { renderers } from '../../renderers.mjs';

function CategoryManagerIsland() {
  const { categories, products, addCategory, updateCategory, deleteCategory, isLoaded } = useCatalogStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    imageUrl: "",
    isVisible: true
  });
  if (!isLoaded) return /* @__PURE__ */ jsx("div", { className: "text-slate-400 text-sm", children: "Cargando categorías..." });
  const handleOpenCreate = () => {
    setEditingCategory(null);
    setFormData({ name: "", slug: "", description: "", imageUrl: "", isVisible: true });
    setIsModalOpen(true);
  };
  const handleOpenEdit = (cat) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      description: cat.description || "",
      imageUrl: cat.imageUrl || "",
      isVisible: cat.isVisible
    });
    setIsModalOpen(true);
  };
  const handleNameChange = (name) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    setFormData((prev) => ({ ...prev, name, slug: editingCategory ? prev.slug : slug }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCategory) {
      updateCategory(editingCategory.id, formData);
    } else {
      addCategory({
        ...formData,
        position: categories.length + 1
      });
    }
    setIsModalOpen(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6 max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-extrabold text-white", children: "Categorías del Menú" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400", children: "Organiza los platos y productos de tu carta digital." })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: handleOpenCreate,
          className: "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-lg shadow-brand-500/25 transition self-start sm:self-auto",
          children: [
            /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
            "Nueva Categoría"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-slate-950 rounded-2xl border border-slate-800 divide-y divide-slate-800/80 overflow-hidden", children: categories.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "p-12 text-center text-slate-500 space-y-3", children: [
      /* @__PURE__ */ jsx(FolderKanban, { className: "w-10 h-10 mx-auto text-slate-600" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm", children: "No has creado categorías todavía." }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleOpenCreate,
          className: "text-xs text-brand-400 hover:underline font-semibold",
          children: "Crear tu primera categoría"
        }
      )
    ] }) : categories.map((cat, index) => {
      const productCount = products.filter((p) => p.categoryId === cat.id).length;
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: "p-4 sm:px-6 flex items-center justify-between hover:bg-slate-900/50 transition group",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 min-w-0", children: [
              /* @__PURE__ */ jsx("div", { className: "text-slate-600 group-hover:text-slate-400 cursor-grab hidden sm:block", children: /* @__PURE__ */ jsx(GripVertical, { className: "w-4 h-4" }) }),
              cat.imageUrl ? /* @__PURE__ */ jsx(
                "img",
                {
                  src: cat.imageUrl,
                  alt: cat.name,
                  className: "w-12 h-12 rounded-xl object-cover border border-slate-800 shrink-0"
                }
              ) : /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-lg shrink-0 text-slate-400", children: "📁" }),
              /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("h3", { className: "font-bold text-white text-sm truncate", children: cat.name }),
                  !cat.isVisible && /* @__PURE__ */ jsx("span", { className: "text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30 px-1.5 py-0.5 rounded font-medium", children: "Oculta" })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 truncate max-w-md mt-0.5", children: cat.description || "Sin descripción" }),
                /* @__PURE__ */ jsxs("span", { className: "text-[11px] text-slate-500 mt-1 block", children: [
                  productCount,
                  " ",
                  productCount === 1 ? "producto" : "productos",
                  " vinculados"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 shrink-0", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => updateCategory(cat.id, { isVisible: !cat.isVisible }),
                  title: cat.isVisible ? "Ocultar categoría" : "Mostrar categoría",
                  className: "p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition",
                  children: cat.isVisible ? /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4 text-emerald-400" }) : /* @__PURE__ */ jsx(EyeOff, { className: "w-4 h-4 text-slate-500" })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => handleOpenEdit(cat),
                  title: "Editar categoría",
                  className: "p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition",
                  children: /* @__PURE__ */ jsx(Edit2, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    if (confirm(`¿Eliminar la categoría "${cat.name}"?`)) {
                      deleteCategory(cat.id);
                    }
                  },
                  title: "Eliminar categoría",
                  className: "p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition",
                  children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
                }
              )
            ] })
          ]
        },
        cat.id
      );
    }) }),
    isModalOpen && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-3 border-b border-slate-800", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-white text-base", children: editingCategory ? "Editar Categoría" : "Nueva Categoría" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setIsModalOpen(false),
            className: "text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800",
            children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold text-slate-300 mb-1", children: "Nombre de la Categoría" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              required: true,
              value: formData.name,
              onChange: (e) => handleNameChange(e.target.value),
              placeholder: "ej. Hamburguesas Smash",
              className: "w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-500"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold text-slate-300 mb-1", children: "Slug URL" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              required: true,
              value: formData.slug,
              onChange: (e) => setFormData({ ...formData, slug: e.target.value }),
              placeholder: "hamburguesas-smash",
              className: "w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-brand-500"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold text-slate-300 mb-1", children: "Descripción corta" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              rows: 2,
              value: formData.description,
              onChange: (e) => setFormData({ ...formData, description: e.target.value }),
              placeholder: "ej. Carne 100% Angus smash, pan brioche tostado...",
              className: "w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-500"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold text-slate-300 mb-1", children: "URL de Imagen (Opcional)" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "url",
              value: formData.imageUrl,
              onChange: (e) => setFormData({ ...formData, imageUrl: e.target.value }),
              placeholder: "https://images.unsplash.com/...",
              className: "w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-500"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 pt-2", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              id: "catVisible",
              checked: formData.isVisible,
              onChange: (e) => setFormData({ ...formData, isVisible: e.target.checked }),
              className: "w-4 h-4 text-brand-500 rounded border-slate-700 bg-slate-950 focus:ring-brand-500"
            }
          ),
          /* @__PURE__ */ jsx("label", { htmlFor: "catVisible", className: "text-xs font-medium text-slate-300 cursor-pointer", children: "Visible en el menú público" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-3 pt-3", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setIsModalOpen(false),
              className: "px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 transition",
              children: "Cancelar"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold shadow-md shadow-brand-500/20 transition",
              children: editingCategory ? "Guardar Cambios" : "Crear Categoría"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}

const $$Categories = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Categor\xEDas del Men\xFA", "activePath": "/admin/categories" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "CategoryManagerIsland", CategoryManagerIsland, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Trabajos/bun/src/components/react/categories/CategoryManagerIsland", "client:component-export": "default" })} ` })}`;
}, "C:/Trabajos/bun/src/pages/admin/categories.astro", void 0);

const $$file = "C:/Trabajos/bun/src/pages/admin/categories.astro";
const $$url = "/admin/categories";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Categories,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
