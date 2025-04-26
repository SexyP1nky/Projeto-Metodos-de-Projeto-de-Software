
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
    'index.csr.html': {size: 24016, hash: 'bfdf8ae1368974ebf82ef5446fd2a5b068c0f6994129a9e62653a8dbeeae03d4', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17356, hash: 'fd14b73ac56b6cac1d492825740205d6b78a2f086cf5bcc8cd48f7c2dcaf4147', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 42960, hash: '201c1a1911fca7e930d79556ab9cd206a9b94baa4324b24c5488dc2f0442952b', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'playlist/index.html': {size: 89704, hash: 'bb9ded257304c16a0e0f5e401ee249a68c8e953638a4513c35df599761e3f95e', text: () => import('./assets-chunks/playlist_index_html.mjs').then(m => m.default)},
    'index.html': {size: 89689, hash: '301558b75509d283635fea32a08ab2b826cbfb694f6e31de90441a39a9e30801', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 90599, hash: '927902342af25244a32bdfc4996e52b17e71426cab66e7ef57640b6058bec939', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'styles-GUXOML6U.css': {size: 7217, hash: 'g6RDfAAx+1M', text: () => import('./assets-chunks/styles-GUXOML6U_css.mjs').then(m => m.default)}
  },
};
