
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://SexyP1nky.github.io/Projeto-Metodos-de-Projeto-de-Software/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/Projeto-Metodos-de-Projeto-de-Software"
  },
  {
    "renderMode": 2,
    "route": "/Projeto-Metodos-de-Projeto-de-Software/admin"
  },
  {
    "renderMode": 2,
    "route": "/Projeto-Metodos-de-Projeto-de-Software/login"
  },
  {
    "renderMode": 2,
    "route": "/Projeto-Metodos-de-Projeto-de-Software/playlist"
  },
  {
    "renderMode": 2,
    "redirectTo": "/Projeto-Metodos-de-Projeto-de-Software",
    "route": "/Projeto-Metodos-de-Projeto-de-Software/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 23914, hash: 'fefb2b40e3962f68df4114862a77a13ed40716bdd275eef71b09ae6389c6ecf8', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17254, hash: '7d33c09e2f99381773950dceb43fda8c4b642da18cafa7a7da10901976b1f860', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 42858, hash: '8814cd5e6b1371541bdf3e9bee51641cf81729412fc01b612ec34f69031f1eb2', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 91139, hash: '5607a8ffbd119c42d80e7d52f29956f6d81d804e72d3bc41a5c771e523f99768', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'index.html': {size: 89717, hash: '7a0b795d081be68d8740266b363e6b0bc346b9b18aa52c9b7aeb6964b753a18c', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'playlist/index.html': {size: 89717, hash: '7a0b795d081be68d8740266b363e6b0bc346b9b18aa52c9b7aeb6964b753a18c', text: () => import('./assets-chunks/playlist_index_html.mjs').then(m => m.default)},
    'styles-B4UOLXGZ.css': {size: 7217, hash: 'TjnNNwwh2gY', text: () => import('./assets-chunks/styles-B4UOLXGZ_css.mjs').then(m => m.default)}
  },
};
