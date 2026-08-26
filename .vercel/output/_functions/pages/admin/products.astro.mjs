import { e as createComponent, k as renderComponent, r as renderTemplate } from '../../chunks/astro/server_D1yw4fBs.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_BlrPdXnE.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import { u as useCatalogStore } from '../../chunks/useCatalogStore_DoXAvo3e.mjs';
import { Plus, Star, Layers, Tag, Edit2, Trash2, X } from 'lucide-react';
export { renderers } from '../../renderers.mjs';

function ProductManagerIsland() {
  const { products, categories, business, addProduct, updateProduct, deleteProduct, isLoaded } = useCatalogStore();
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    description: "",
    price: 0,
    compareAtPrice: 0,
    imageUrl: "",
    sku: "",
    isFeatured: false,
    isVisible: true,
    isAvailable: true,
    variants: [],
    modifiers: []
  });
  const [newVariantName, setNewVariantName] = useState("");
  const [newVariantPriceDelta, setNewVariantPriceDelta] = useState(0);
  const [newModGroup, setNewModGroup] = useState("Extras");
  const [newModName, setNewModName] = useState("");
  const [newModPrice, setNewModPrice] = useState(0);
  if (!isLoaded) return /* @__PURE__ */ jsx("div", { className: "text-slate-400 text-sm", children: "Cargando catálogo de productos..." });
  const filteredProducts = products.filter((p) => {
    if (selectedCategoryFilter === "ALL") return true;
    if (selectedCategoryFilter === "FEATURED") return p.isFeatured;
    return p.categoryId === selectedCategoryFilter;
  });
  const handleOpenCreate = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      categoryId: categories[0]?.id || "",
      description: "",
      price: 0,
      compareAtPrice: null,
      imageUrl: "",
      sku: "",
      isFeatured: false,
      isVisible: true,
      isAvailable: true,
      variants: [],
      modifiers: []
    });
    setIsModalOpen(true);
  };
  const handleOpenEdit = (p) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      categoryId: p.categoryId,
      description: p.description || "",
      price: p.price,
      compareAtPrice: p.compareAtPrice || null,
      imageUrl: p.imageUrl || "",
      sku: p.sku || "",
      isFeatured: p.isFeatured,
      isVisible: p.isVisible,
      isAvailable: p.isAvailable,
      variants: p.variants ? [...p.variants] : [],
      modifiers: p.modifiers ? [...p.modifiers] : []
    });
    setIsModalOpen(true);
  };
  const handleAddVariant = () => {
    if (!newVariantName.trim()) return;
    const newVariant = {
      id: `v_${Date.now()}`,
      name: newVariantName.trim(),
      priceDelta: Number(newVariantPriceDelta) || 0
    };
    setFormData((prev) => ({ ...prev, variants: [...prev.variants, newVariant] }));
    setNewVariantName("");
    setNewVariantPriceDelta(0);
  };
  const handleRemoveVariant = (id) => {
    setFormData((prev) => ({ ...prev, variants: prev.variants.filter((v) => v.id !== id) }));
  };
  const handleAddModifier = () => {
    if (!newModName.trim()) return;
    const newMod = {
      id: `m_${Date.now()}`,
      groupName: newModGroup.trim() || "Extras",
      name: newModName.trim(),
      price: Number(newModPrice) || 0,
      maxQuantity: 1
    };
    setFormData((prev) => ({ ...prev, modifiers: [...prev.modifiers, newMod] }));
    setNewModName("");
    setNewModPrice(0);
  };
  const handleRemoveModifier = (id) => {
    setFormData((prev) => ({ ...prev, modifiers: prev.modifiers.filter((m) => m.id !== id) }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.categoryId && categories.length > 0) {
      formData.categoryId = categories[0].id;
    }
    if (editingProduct) {
      updateProduct(editingProduct.id, formData);
    } else {
      addProduct({
        ...formData,
        position: products.length + 1
      });
    }
    setIsModalOpen(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6 max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-extrabold text-white", children: "Catálogo de Productos" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400", children: "Gestiona precios, fotos, variantes y modificadores de tus platos." })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: handleOpenCreate,
          className: "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-lg shadow-brand-500/25 transition self-start sm:self-auto",
          children: [
            /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
            "Nuevo Producto"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setSelectedCategoryFilter("ALL"),
          className: `px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${selectedCategoryFilter === "ALL" ? "bg-brand-500 text-white" : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"}`,
          children: [
            "Todos (",
            products.length,
            ")"
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setSelectedCategoryFilter("FEATURED"),
          className: `px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${selectedCategoryFilter === "FEATURED" ? "bg-amber-500 text-slate-950 font-bold" : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"}`,
          children: [
            /* @__PURE__ */ jsx(Star, { className: "w-3.5 h-3.5 fill-current" }),
            "Destacados (",
            products.filter((p) => p.isFeatured).length,
            ")"
          ]
        }
      ),
      categories.map((c) => {
        const count = products.filter((p) => p.categoryId === c.id).length;
        return /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setSelectedCategoryFilter(c.id),
            className: `px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${selectedCategoryFilter === c.id ? "bg-brand-500 text-white" : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"}`,
            children: [
              c.name,
              " (",
              count,
              ")"
            ]
          },
          c.id
        );
      })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: filteredProducts.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "col-span-full p-12 text-center text-slate-500 bg-slate-950 border border-slate-800 rounded-2xl space-y-3", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm", children: "No se encontraron productos en esta sección." }),
      /* @__PURE__ */ jsx("button", { onClick: handleOpenCreate, className: "text-xs text-brand-400 font-semibold hover:underline", children: "Agregar un producto ahora" })
    ] }) : filteredProducts.map((p) => {
      const category = categories.find((c) => c.id === p.categoryId);
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: "bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition flex flex-col justify-between",
          children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "relative h-44 bg-slate-900 overflow-hidden", children: [
                p.imageUrl ? /* @__PURE__ */ jsx("img", { src: p.imageUrl, alt: p.name, className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center text-4xl text-slate-700", children: "🍔" }),
                /* @__PURE__ */ jsxs("div", { className: "absolute top-3 left-3 flex flex-wrap gap-1.5", children: [
                  p.isFeatured && /* @__PURE__ */ jsxs("span", { className: "px-2 py-1 bg-amber-500/90 text-slate-950 text-[10px] font-extrabold rounded-md shadow flex items-center gap-1 backdrop-blur-sm", children: [
                    /* @__PURE__ */ jsx(Star, { className: "w-3 h-3 fill-current" }),
                    "DESTACADO"
                  ] }),
                  !p.isAvailable && /* @__PURE__ */ jsx("span", { className: "px-2 py-1 bg-rose-600/90 text-white text-[10px] font-bold rounded-md shadow backdrop-blur-sm", children: "AGOTADO" })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "absolute top-3 right-3 flex gap-1", children: /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => updateProduct(p.id, { isFeatured: !p.isFeatured }),
                    title: p.isFeatured ? "Quitar de destacados" : "Marcar como destacado",
                    className: `p-1.5 rounded-lg backdrop-blur-md transition ${p.isFeatured ? "bg-amber-500 text-slate-950" : "bg-slate-900/80 text-slate-400 hover:text-white"}`,
                    children: /* @__PURE__ */ jsx(Star, { className: `w-4 h-4 ${p.isFeatured ? "fill-current" : ""}` })
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-4 space-y-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-[11px] font-semibold text-brand-400 uppercase tracking-wider", children: category?.name || "Sin Categoría" }),
                  /* @__PURE__ */ jsx("span", { className: "text-[11px] font-mono text-slate-500", children: p.sku || "" })
                ] }),
                /* @__PURE__ */ jsx("h3", { className: "font-bold text-white text-base line-clamp-1", children: p.name }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 line-clamp-2", children: p.description || "Sin descripción" }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-1.5 pt-1", children: [
                  p.variants && p.variants.length > 0 && /* @__PURE__ */ jsxs("span", { className: "text-[10px] bg-slate-900 border border-slate-800 text-slate-300 px-2 py-0.5 rounded-md flex items-center gap-1", children: [
                    /* @__PURE__ */ jsx(Layers, { className: "w-3 h-3 text-brand-400" }),
                    p.variants.length,
                    " variantes"
                  ] }),
                  p.modifiers && p.modifiers.length > 0 && /* @__PURE__ */ jsxs("span", { className: "text-[10px] bg-slate-900 border border-slate-800 text-slate-300 px-2 py-0.5 rounded-md flex items-center gap-1", children: [
                    /* @__PURE__ */ jsx(Tag, { className: "w-3 h-3 text-emerald-400" }),
                    p.modifiers.length,
                    " extras"
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-4 pt-0 border-t border-slate-900 mt-2 flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-2", children: [
                /* @__PURE__ */ jsxs("span", { className: "text-lg font-extrabold text-white", children: [
                  business.currencySymbol,
                  p.price.toLocaleString("es-CL")
                ] }),
                p.compareAtPrice && p.compareAtPrice > p.price && /* @__PURE__ */ jsxs("span", { className: "text-xs text-slate-500 line-through", children: [
                  business.currencySymbol,
                  p.compareAtPrice.toLocaleString("es-CL")
                ] })
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleOpenEdit(p),
                    className: "p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition",
                    title: "Editar producto",
                    children: /* @__PURE__ */ jsx(Edit2, { className: "w-4 h-4" })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => {
                      if (confirm(`¿Eliminar producto "${p.name}"?`)) {
                        deleteProduct(p.id);
                      }
                    },
                    className: "p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition",
                    title: "Eliminar producto",
                    children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
                  }
                )
              ] })
            ] })
          ]
        },
        p.id
      );
    }) }),
    isModalOpen && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto", children: /* @__PURE__ */ jsxs("div", { className: "bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 my-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-3 border-b border-slate-800", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-white text-lg", children: editingProduct ? "Editar Producto" : "Nuevo Producto" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setIsModalOpen(false),
            className: "text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800",
            children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 max-h-[75vh] overflow-y-auto pr-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "sm:col-span-2", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold text-slate-300 mb-1", children: "Nombre del Producto" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                required: true,
                value: formData.name,
                onChange: (e) => setFormData({ ...formData, name: e.target.value }),
                placeholder: "ej. Doble Cheddar Bacon Smash",
                className: "w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-500"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold text-slate-300 mb-1", children: "Categoría" }),
            /* @__PURE__ */ jsx(
              "select",
              {
                value: formData.categoryId,
                onChange: (e) => setFormData({ ...formData, categoryId: e.target.value }),
                required: true,
                className: "w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-500",
                children: categories.map((c) => /* @__PURE__ */ jsx("option", { value: c.id, children: c.name }, c.id))
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold text-slate-300 mb-1", children: "Código / SKU" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: formData.sku,
                onChange: (e) => setFormData({ ...formData, sku: e.target.value }),
                placeholder: "ej. BURG-001",
                className: "w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-brand-500"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-300 mb-1", children: [
              "Precio (",
              business.currencySymbol,
              ")"
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                required: true,
                value: formData.price,
                onChange: (e) => setFormData({ ...formData, price: Number(e.target.value) }),
                placeholder: "7990",
                className: "w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-500"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold text-slate-300 mb-1", children: "Precio Antes / Oferta (Opcional)" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                value: formData.compareAtPrice || "",
                onChange: (e) => setFormData({ ...formData, compareAtPrice: e.target.value ? Number(e.target.value) : null }),
                placeholder: "8990",
                className: "w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-500"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "sm:col-span-2", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold text-slate-300 mb-1", children: "Descripción de Ingredientes / Preparación" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                rows: 2,
                value: formData.description,
                onChange: (e) => setFormData({ ...formData, description: e.target.value }),
                placeholder: "ej. Dos hamburguesas de 90g con cheddar derretido, tocino crujiente...",
                className: "w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-500"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "sm:col-span-2", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold text-slate-300 mb-1", children: "URL de la Foto" }),
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
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800", children: [
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: formData.isFeatured,
                onChange: (e) => setFormData({ ...formData, isFeatured: e.target.checked }),
                className: "w-4 h-4 text-brand-500 rounded border-slate-700 bg-slate-900"
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-200 font-medium", children: "⭐ Destacado Portada" })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: formData.isAvailable,
                onChange: (e) => setFormData({ ...formData, isAvailable: e.target.checked }),
                className: "w-4 h-4 text-brand-500 rounded border-slate-700 bg-slate-900"
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-200 font-medium", children: "✅ En Stock / Disponible" })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: formData.isVisible,
                onChange: (e) => setFormData({ ...formData, isVisible: e.target.checked }),
                className: "w-4 h-4 text-brand-500 rounded border-slate-700 bg-slate-900"
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-200 font-medium", children: "👁️ Visible en Carta" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxs("span", { className: "text-xs font-bold text-white flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(Layers, { className: "w-4 h-4 text-brand-400" }),
            "Variantes de Tamaño / Tipo (Opcional)"
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            formData.variants.map((v) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between bg-slate-900 px-3 py-2 rounded-lg border border-slate-800 text-xs", children: [
              /* @__PURE__ */ jsx("span", { className: "font-semibold text-slate-200", children: v.name }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "text-brand-400 font-mono", children: v.priceDelta > 0 ? `+${business.currencySymbol}${v.priceDelta}` : v.priceDelta < 0 ? `-${business.currencySymbol}${Math.abs(v.priceDelta)}` : "Sin costo adicional" }),
                /* @__PURE__ */ jsx("button", { type: "button", onClick: () => handleRemoveVariant(v.id), className: "text-slate-500 hover:text-rose-400", children: /* @__PURE__ */ jsx(X, { className: "w-3.5 h-3.5" }) })
              ] })
            ] }, v.id)),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 pt-1", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  placeholder: "Nombre (ej. Triple Smash)",
                  value: newVariantName,
                  onChange: (e) => setNewVariantName(e.target.value),
                  className: "flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                }
              ),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "number",
                  placeholder: "Dif. Precio (+2000)",
                  value: newVariantPriceDelta || "",
                  onChange: (e) => setNewVariantPriceDelta(Number(e.target.value)),
                  className: "w-32 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: handleAddVariant,
                  className: "px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold",
                  children: "+ Añadir"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxs("span", { className: "text-xs font-bold text-white flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(Tag, { className: "w-4 h-4 text-emerald-400" }),
            "Modificadores & Extras (Opcional)"
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            formData.modifiers.map((m) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between bg-slate-900 px-3 py-2 rounded-lg border border-slate-800 text-xs", children: [
              /* @__PURE__ */ jsx("span", { className: "font-semibold text-slate-200", children: m.name }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxs("span", { className: "text-emerald-400 font-mono", children: [
                  "+",
                  business.currencySymbol,
                  m.price
                ] }),
                /* @__PURE__ */ jsx("button", { type: "button", onClick: () => handleRemoveModifier(m.id), className: "text-slate-500 hover:text-rose-400", children: /* @__PURE__ */ jsx(X, { className: "w-3.5 h-3.5" }) })
              ] })
            ] }, m.id)),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 pt-1", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  placeholder: "Extra (ej. Queso Cheddar Extra)",
                  value: newModName,
                  onChange: (e) => setNewModName(e.target.value),
                  className: "flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                }
              ),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "number",
                  placeholder: "Precio (+600)",
                  value: newModPrice || "",
                  onChange: (e) => setNewModPrice(Number(e.target.value)),
                  className: "w-28 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: handleAddModifier,
                  className: "px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold",
                  children: "+ Añadir"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-3 pt-3 border-t border-slate-800", children: [
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
              className: "px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold shadow-md shadow-brand-500/20 transition",
              children: editingProduct ? "Guardar Cambios" : "Crear Producto"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}

const $$Products = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Cat\xE1logo de Productos", "activePath": "/admin/products" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ProductManagerIsland", ProductManagerIsland, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Trabajos/bun/src/components/react/products/ProductManagerIsland", "client:component-export": "default" })} ` })}`;
}, "C:/Trabajos/bun/src/pages/admin/products.astro", void 0);

const $$file = "C:/Trabajos/bun/src/pages/admin/products.astro";
const $$url = "/admin/products";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Products,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
