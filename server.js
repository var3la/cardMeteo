const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = 3000;

// Proxy para la API de Meteogalicia
app.use('/api', createProxyMiddleware({
  target: 'https://servizos.meteogalicia.gal',
  changeOrigin: true,
  pathRewrite: {
    '^/api': ''
  },
  onProxyRes: function(proxyRes) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
  }
}));

// Servir tu archivo HTML y recursos estáticos
app.use(express.static('.'));

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en: http://localhost:${PORT}`);
  console.log(`📡 Proxy activo para: https://servizos.meteogalicia.gal`);
});