
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'Projeto-Metodos-de-Projeto-de-Software',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/Projeto-Metodos-de-Projeto-de-Software"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 23829, hash: '9f6b8b344c8e5420d6f6e82974c84bcdeb507de1deb80ecc1fcf4dc9f13a9344', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17225, hash: 'b4804c0da0649bca10b70714baf2f3c241e2e357853750079aef4146d64c62f3', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 90969, hash: '14777e0ca51ac4bc6580926fde9e809d7b993fc5801abacd6f8ce97e8be4954b', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-KHYE2QZJ.css': {size: 7160, hash: 'cz+rW6NX3j0', text: () => import('./assets-chunks/styles-KHYE2QZJ_css.mjs').then(m => m.default)}
  },
};
