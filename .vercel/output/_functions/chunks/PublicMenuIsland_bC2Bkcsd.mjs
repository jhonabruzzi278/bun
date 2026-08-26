import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import { u as useCatalogStore } from './useCatalogStore_DoXAvo3e.mjs';
import { MapPin, Phone, Search, Star, X, Minus, Plus, ShoppingBag } from 'lucide-react';

function PublicMenuIsland() {
  const { business, categories, products, isLoaded } = useCatalogStore();
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProductModal, setActiveProductModal] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedModifiers, setSelectedModifiers] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [itemNotes, setItemNotes] = useState("");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [orderType, setOrderType] = useState("delivery");
  if (!isLoaded) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-slate-900 flex items-center justify-center p-4", children: /* @__PURE__ */ jsx("div", { className: "animate-spin text-3xl", children: "🍔" }) });
  }
  const featuredProducts = products.filter((p) => p.isFeatured && p.isVisible);
  const displayedProducts = products.filter((p) => {
    if (!p.isVisible) return false;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (selectedCategory === "ALL") return true;
    if (selectedCategory === "FEATURED") return p.isFeatured;
    return p.categoryId === selectedCategory;
  });
  const openProductDetail = (p) => {
    setActiveProductModal(p);
    setQuantity(1);
    setItemNotes("");
    setSelectedModifiers({});
    if (p.variants && p.variants.length > 0) {
      setSelectedVariant(p.variants.find((v) => v.isDefault) || p.variants[0]);
    } else {
      setSelectedVariant(null);
    }
  };
  const calculateModalPrice = () => {
    if (!activeProductModal) return 0;
    let base = activeProductModal.price;
    if (selectedVariant) base += selectedVariant.priceDelta;
    if (activeProductModal.modifiers) {
      for (const mod of activeProductModal.modifiers) {
        const qty = selectedModifiers[mod.id] || 0;
        base += mod.price * qty;
      }
    }
    return base * quantity;
  };
  const handleAddToCart = () => {
    if (!activeProductModal) return;
    const modDetails = (activeProductModal.modifiers || []).filter((m) => selectedModifiers[m.id] > 0).map((m) => ({ modifier: m, quantity: selectedModifiers[m.id] }));
    const newItem = {
      id: `cart_${Date.now()}_${Math.random()}`,
      productId: activeProductModal.id,
      name: activeProductModal.name,
      price: activeProductModal.price,
      quantity,
      imageUrl: activeProductModal.imageUrl,
      selectedVariant: selectedVariant || void 0,
      selectedModifiers: modDetails,
      itemTotal: calculateModalPrice(),
      notes: itemNotes.trim() || void 0
    };
    setCart((prev) => [...prev, newItem]);
    setActiveProductModal(null);
  };
  const cartTotal = cart.reduce((acc, item) => acc + item.itemTotal, 0);
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const handleSendWhatsAppOrder = () => {
    if (!customerName.trim()) {
      alert("Por favor indica tu nombre");
      return;
    }
    let message = `¡Hola *${business.name}*! 👋 Quiero hacer el siguiente pedido:%0A%0A`;
    message += `📋 *DETALLE DEL PEDIDO:*%0A`;
    cart.forEach((item, idx) => {
      message += `${idx + 1}. *${item.quantity}x ${item.name}*`;
      if (item.selectedVariant) message += ` (${item.selectedVariant.name})`;
      message += ` - ${business.currencySymbol}${item.itemTotal.toLocaleString("es-CL")}%0A`;
      if (item.selectedModifiers && item.selectedModifiers.length > 0) {
        item.selectedModifiers.forEach((m) => {
          message += `   └ + ${m.quantity}x ${m.modifier.name}%0A`;
        });
      }
      if (item.notes) {
        message += `   └ 📝 Nota: _${item.notes}_%0A`;
      }
    });
    message += `%0A💰 *TOTAL: ${business.currencySymbol}${cartTotal.toLocaleString("es-CL")}* %0A%0A`;
    message += `📍 *DATOS DE ENTREGA:*%0A`;
    message += `👤 *Cliente:* ${customerName}%0A`;
    message += `🛵 *Tipo:* ${orderType === "delivery" ? "Delivery a Domicilio" : "Retiro en Local"}%0A`;
    if (orderType === "delivery" && customerAddress) {
      message += `🏠 *Dirección:* ${customerAddress}%0A`;
    }
    const cleanPhone = business.phone.replace(/[^0-9]/g, "");
    const url = `https://wa.me/${cleanPhone}?text=${message}`;
    window.open(url, "_blank");
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-slate-950 text-slate-100 font-sans pb-28", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxs("div", { className: "h-44 md:h-64 w-full bg-slate-900 overflow-hidden relative", children: [
        business.bannerUrl && /* @__PURE__ */ jsx("img", { src: business.bannerUrl, alt: business.name, className: "w-full h-full object-cover opacity-60" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-4 -mt-16 relative z-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-end gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-24 h-24 rounded-2xl bg-slate-900 border-4 border-slate-950 shadow-2xl overflow-hidden shrink-0", children: business.logoUrl ? /* @__PURE__ */ jsx("img", { src: business.logoUrl, alt: business.name, className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center text-3xl", children: "🍔" }) }),
          /* @__PURE__ */ jsxs("div", { className: "pb-1 min-w-0 flex-1", children: [
            /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsx("h1", { className: "text-xl md:text-2xl font-black text-white truncate", children: business.name }) }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-emerald-400 font-semibold flex items-center gap-1.5 mt-0.5", children: [
              /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-emerald-400 animate-pulse" }),
              "Abierto ahora • Menú Digital"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 mt-3 line-clamp-2", children: business.description }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-[11px] text-slate-400 mt-2", children: [
          business.address && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 truncate", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "w-3.5 h-3.5 text-brand-400 shrink-0" }),
            business.address
          ] }),
          business.phone && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(Phone, { className: "w-3.5 h-3.5 text-brand-400 shrink-0" }),
            business.phone
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-4 mt-6 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx(Search, { className: "w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "Buscar hamburguesa, bebida, acompañamiento...",
            value: searchQuery,
            onChange: (e) => setSearchQuery(e.target.value),
            className: "w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-brand-500 shadow-inner"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "sticky top-0 z-30 bg-slate-950/90 backdrop-blur py-2 -mx-4 px-4 flex items-center gap-2 overflow-x-auto scrollbar-none border-b border-slate-900", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setSelectedCategory("ALL"),
            className: `px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${selectedCategory === "ALL" ? "bg-brand-500 text-white shadow-md shadow-brand-500/30" : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"}`,
            children: "Todos"
          }
        ),
        featuredProducts.length > 0 && /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setSelectedCategory("FEATURED"),
            className: `px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition flex items-center gap-1 ${selectedCategory === "FEATURED" ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30" : "bg-slate-900 text-amber-400 border border-slate-800"}`,
            children: [
              /* @__PURE__ */ jsx(Star, { className: "w-3 h-3 fill-current" }),
              "Destacados"
            ]
          }
        ),
        categories.filter((c) => c.isVisible).map((cat) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setSelectedCategory(cat.id),
            className: `px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${selectedCategory === cat.id ? "bg-brand-500 text-white shadow-md shadow-brand-500/30" : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"}`,
            children: cat.name
          },
          cat.id
        ))
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-3", children: displayedProducts.map((p) => /* @__PURE__ */ jsxs(
        "div",
        {
          onClick: () => openProductDetail(p),
          className: "p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition cursor-pointer flex gap-3.5 items-center justify-between group active:scale-[0.99]",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1 space-y-1", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("h3", { className: "font-bold text-white text-sm truncate group-hover:text-brand-400 transition", children: p.name }),
                p.isFeatured && /* @__PURE__ */ jsx("span", { className: "text-[9px] bg-amber-500/20 text-amber-300 font-extrabold px-1.5 py-0.5 rounded", children: "TOP" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 line-clamp-2", children: p.description }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-2 pt-1", children: [
                /* @__PURE__ */ jsxs("span", { className: "text-sm font-extrabold text-white", children: [
                  business.currencySymbol,
                  p.price.toLocaleString("es-CL")
                ] }),
                p.compareAtPrice && p.compareAtPrice > p.price && /* @__PURE__ */ jsxs("span", { className: "text-xs text-slate-500 line-through", children: [
                  business.currencySymbol,
                  p.compareAtPrice.toLocaleString("es-CL")
                ] })
              ] })
            ] }),
            p.imageUrl ? /* @__PURE__ */ jsxs("div", { className: "w-20 h-20 rounded-xl overflow-hidden bg-slate-950 shrink-0 border border-slate-800 relative", children: [
              /* @__PURE__ */ jsx("img", { src: p.imageUrl, alt: p.name, className: "w-full h-full object-cover" }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: "absolute bottom-1 right-1 w-6 h-6 rounded-lg bg-brand-500 text-white flex items-center justify-center font-bold text-xs shadow",
                  children: "+"
                }
              )
            ] }) : /* @__PURE__ */ jsx("button", { className: "w-8 h-8 rounded-xl bg-slate-800 group-hover:bg-brand-500 text-slate-300 group-hover:text-white flex items-center justify-center font-bold text-sm shrink-0 transition", children: "+" })
          ]
        },
        p.id
      )) })
    ] }),
    cart.length > 0 && /* @__PURE__ */ jsx("div", { className: "fixed bottom-4 inset-x-4 max-w-md mx-auto z-40", children: /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setIsCartOpen(true),
        className: "w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-brand-500 to-brand-600 text-white font-bold text-sm shadow-xl shadow-brand-500/30 flex items-center justify-between animate-bounce-subtle",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5", children: [
            /* @__PURE__ */ jsx("span", { className: "w-6 h-6 rounded-full bg-white/20 text-xs flex items-center justify-center font-black", children: totalItemsCount }),
            /* @__PURE__ */ jsx("span", { children: "Ver Carrito" })
          ] }),
          /* @__PURE__ */ jsxs("span", { children: [
            business.currencySymbol,
            cartTotal.toLocaleString("es-CL"),
            " ↗"
          ] })
        ]
      }
    ) }),
    activeProductModal && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-slate-900 border border-slate-800 w-full max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-slide-up", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative h-48 sm:h-56 bg-slate-950 shrink-0", children: [
        activeProductModal.imageUrl ? /* @__PURE__ */ jsx(
          "img",
          {
            src: activeProductModal.imageUrl,
            alt: activeProductModal.name,
            className: "w-full h-full object-cover"
          }
        ) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center text-5xl", children: "🍔" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setActiveProductModal(null),
            className: "absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-950/70 backdrop-blur text-white flex items-center justify-center hover:bg-slate-950",
            children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-5 overflow-y-auto space-y-5 flex-1", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-black text-white", children: activeProductModal.name }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 mt-1", children: activeProductModal.description }),
          /* @__PURE__ */ jsxs("span", { className: "text-base font-extrabold text-brand-400 mt-2 block", children: [
            business.currencySymbol,
            activeProductModal.price.toLocaleString("es-CL")
          ] })
        ] }),
        activeProductModal.variants && activeProductModal.variants.length > 0 && /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-slate-300", children: "Selecciona una opción" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-1.5", children: activeProductModal.variants.map((v) => /* @__PURE__ */ jsxs(
            "label",
            {
              onClick: () => setSelectedVariant(v),
              className: `flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition ${selectedVariant?.id === v.id ? "bg-brand-500/10 border-brand-500 text-white font-bold" : "bg-slate-950 border-slate-800 text-slate-300"}`,
              children: [
                /* @__PURE__ */ jsx("span", { children: v.name }),
                /* @__PURE__ */ jsx("span", { className: "font-mono text-brand-400", children: v.priceDelta > 0 ? `+${business.currencySymbol}${v.priceDelta}` : v.priceDelta < 0 ? `-${business.currencySymbol}${Math.abs(v.priceDelta)}` : "Incluido" })
              ]
            },
            v.id
          )) })
        ] }),
        activeProductModal.modifiers && activeProductModal.modifiers.length > 0 && /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-slate-300", children: "¿Deseas agregar extras?" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-1.5", children: activeProductModal.modifiers.map((m) => {
            const qty = selectedModifiers[m.id] || 0;
            return /* @__PURE__ */ jsxs(
              "div",
              {
                className: "flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs",
                children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("span", { className: "font-semibold text-slate-200", children: m.name }),
                    /* @__PURE__ */ jsxs("span", { className: "text-[11px] text-emerald-400 block font-mono", children: [
                      "+",
                      business.currencySymbol,
                      m.price.toLocaleString("es-CL")
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                    qty > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setSelectedModifiers((prev) => ({ ...prev, [m.id]: Math.max(0, qty - 1) })),
                          className: "w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-white",
                          children: "-"
                        }
                      ),
                      /* @__PURE__ */ jsx("span", { className: "font-bold text-white text-xs", children: qty })
                    ] }),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setSelectedModifiers((prev) => ({ ...prev, [m.id]: Math.min(m.maxQuantity, qty + 1) })),
                        className: "w-6 h-6 rounded-lg bg-brand-500 text-white flex items-center justify-center font-bold",
                        children: "+"
                      }
                    )
                  ] })
                ]
              },
              m.id
            );
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-slate-300 block mb-1", children: "Instrucciones especiales" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: "ej. Sin cebolla, aderezo aparte...",
              value: itemNotes,
              onChange: (e) => setItemNotes(e.target.value),
              className: "w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-600"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-4 border-t border-slate-800 bg-slate-950 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center bg-slate-900 rounded-xl border border-slate-800 p-1", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setQuantity((q) => Math.max(1, q - 1)),
              className: "w-8 h-8 rounded-lg flex items-center justify-center text-white hover:bg-slate-800",
              children: /* @__PURE__ */ jsx(Minus, { className: "w-3.5 h-3.5" })
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "w-8 text-center font-bold text-sm text-white", children: quantity }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setQuantity((q) => q + 1),
              className: "w-8 h-8 rounded-lg flex items-center justify-center text-white hover:bg-slate-800",
              children: /* @__PURE__ */ jsx(Plus, { className: "w-3.5 h-3.5" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: handleAddToCart,
            className: "flex-1 py-3 px-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-brand-500/25 flex items-center justify-between",
            children: [
              /* @__PURE__ */ jsx("span", { children: "Agregar al Carrito" }),
              /* @__PURE__ */ jsxs("span", { children: [
                business.currencySymbol,
                calculateModalPrice().toLocaleString("es-CL")
              ] })
            ]
          }
        )
      ] })
    ] }) }),
    isCartOpen && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex justify-end", children: /* @__PURE__ */ jsxs("div", { className: "bg-slate-900 border-l border-slate-800 w-full max-w-md h-full flex flex-col justify-between shadow-2xl animate-slide-left", children: [
      /* @__PURE__ */ jsxs("div", { className: "p-5 border-b border-slate-800 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(ShoppingBag, { className: "w-5 h-5 text-brand-400" }),
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-white text-base", children: "Mi Carrito de Pedido" })
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: () => setIsCartOpen(false), className: "text-slate-400 hover:text-white p-1", children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-5 overflow-y-auto flex-1 space-y-3", children: [
        cart.map((item, index) => /* @__PURE__ */ jsxs("div", { className: "p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("span", { className: "font-bold text-white text-xs", children: [
                item.quantity,
                "x ",
                item.name
              ] }),
              item.selectedVariant && /* @__PURE__ */ jsxs("span", { className: "text-[11px] text-slate-400 block font-medium", children: [
                "(",
                item.selectedVariant.name,
                ")"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxs("span", { className: "font-mono text-xs font-bold text-white", children: [
                business.currencySymbol,
                item.itemTotal.toLocaleString("es-CL")
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setCart((prev) => prev.filter((_, i) => i !== index)),
                  className: "text-slate-600 hover:text-rose-400",
                  children: /* @__PURE__ */ jsx(X, { className: "w-3.5 h-3.5" })
                }
              )
            ] })
          ] }),
          item.selectedModifiers && item.selectedModifiers.length > 0 && /* @__PURE__ */ jsx("div", { className: "text-[10px] text-slate-500 space-y-0.5 pl-2 border-l border-slate-800", children: item.selectedModifiers.map((m, mi) => /* @__PURE__ */ jsxs("div", { children: [
            "+ ",
            m.quantity,
            "x ",
            m.modifier.name
          ] }, mi)) }),
          item.notes && /* @__PURE__ */ jsxs("div", { className: "text-[10px] text-amber-400/80 italic", children: [
            "Nota: ",
            item.notes
          ] })
        ] }, item.id)),
        /* @__PURE__ */ jsxs("div", { className: "pt-4 border-t border-slate-800 space-y-3", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-xs font-bold text-slate-200", children: "Datos para la entrega" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setOrderType("delivery"),
                className: `py-2 text-xs font-bold rounded-xl border transition ${orderType === "delivery" ? "bg-brand-500 text-white border-brand-500" : "bg-slate-950 text-slate-400 border-slate-800"}`,
                children: "🛵 Delivery"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setOrderType("takeaway"),
                className: `py-2 text-xs font-bold rounded-xl border transition ${orderType === "takeaway" ? "bg-brand-500 text-white border-brand-500" : "bg-slate-950 text-slate-400 border-slate-800"}`,
                children: "🛍️ Retiro en Local"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-[11px] font-semibold text-slate-400 mb-1", children: "Tu Nombre" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                required: true,
                placeholder: "ej. Juan Pérez",
                value: customerName,
                onChange: (e) => setCustomerName(e.target.value),
                className: "w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              }
            )
          ] }),
          orderType === "delivery" && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-[11px] font-semibold text-slate-400 mb-1", children: "Dirección de Envío" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                placeholder: "ej. Av. Providencia 1240, Depto 402",
                value: customerAddress,
                onChange: (e) => setCustomerAddress(e.target.value),
                className: "w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-5 border-t border-slate-800 bg-slate-950 space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-sm font-black text-white", children: [
          /* @__PURE__ */ jsx("span", { children: "Total a Pagar" }),
          /* @__PURE__ */ jsxs("span", { className: "text-brand-400", children: [
            business.currencySymbol,
            cartTotal.toLocaleString("es-CL")
          ] })
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: handleSendWhatsAppOrder,
            className: "w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition",
            children: [
              /* @__PURE__ */ jsx("span", { children: "Enviar Pedido por WhatsApp" }),
              /* @__PURE__ */ jsx("span", { children: "💬" })
            ]
          }
        )
      ] })
    ] }) })
  ] });
}

export { PublicMenuIsland as P };
