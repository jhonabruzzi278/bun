import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_BJaHIebp.mjs';
import { manifest } from './manifest_CmABFVsw.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin/business.astro.mjs');
const _page2 = () => import('./pages/admin/categories.astro.mjs');
const _page3 = () => import('./pages/admin/preview.astro.mjs');
const _page4 = () => import('./pages/admin/products.astro.mjs');
const _page5 = () => import('./pages/admin.astro.mjs');
const _page6 = () => import('./pages/menu/_slug_.astro.mjs');
const _page7 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/admin/business.astro", _page1],
    ["src/pages/admin/categories.astro", _page2],
    ["src/pages/admin/preview.astro", _page3],
    ["src/pages/admin/products.astro", _page4],
    ["src/pages/admin/index.astro", _page5],
    ["src/pages/menu/[slug].astro", _page6],
    ["src/pages/index.astro", _page7]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "e7ae27f2-0dc8-4bf9-9475-9cc7dde5b75e",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
