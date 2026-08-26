import { e as createComponent, l as renderHead, k as renderComponent, r as renderTemplate, h as createAstro } from '../../chunks/astro/server_D1yw4fBs.mjs';
import 'piccolore';
/* empty css                                       */
import { P as PublicMenuIsland } from '../../chunks/PublicMenuIsland_bC2Bkcsd.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$slug = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  return renderTemplate`<html lang="es" class="bg-slate-950"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"><title>Menú Digital</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">${renderHead()}</head> <body class="bg-slate-950 text-slate-100 antialiased min-h-screen"> ${renderComponent($$result, "PublicMenuIsland", PublicMenuIsland, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Trabajos/bun/src/components/react/menu/PublicMenuIsland", "client:component-export": "default" })} </body></html>`;
}, "C:/Trabajos/bun/src/pages/menu/[slug].astro", void 0);

const $$file = "C:/Trabajos/bun/src/pages/menu/[slug].astro";
const $$url = "/menu/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
