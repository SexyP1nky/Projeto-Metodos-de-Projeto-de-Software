
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/Projeto-Metodos-de-Projeto-de-Software/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/Projeto-Metodos-de-Projeto-de-Software"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 23676, hash: '97f3eda6cf2fbed74ad1f53bbdedc856fc0c8455478dc8f906f07edb65ec1ae8', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17227, hash: '923b4458b5e9aa5432aff5404c8984525fa3d6af86fd3f55b5cbf0d04a785a30', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 42538, hash: '83fe1f2e9c4cebadb2ef3781d9a81b8d8082be3ad15376b72e18e64034b57893', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-4B2PTE6Z.css': {size: 7002, hash: 'XXk4Cp9/byU', text: () => import('./assets-chunks/styles-4B2PTE6Z_css.mjs').then(m => m.default)}
  },
};
