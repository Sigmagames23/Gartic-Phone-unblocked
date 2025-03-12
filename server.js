const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const port = 8080;

// Configuración básica
app.use(express.static('public'));

// Middleware para solucionar problemas CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Proxy para Gartic Phone
app.use('/proxy/gartic', createProxyMiddleware({
  target: 'https://garticphone.com',
  changeOrigin: true,
  pathRewrite: {
    '^/proxy/gartic': '',
  },
  onProxyRes: function(proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
  }
}));

// Proxy para Skribbl.io
app.use('/proxy/skribbl', createProxyMiddleware({
  target: 'https://skribbl.io',
  changeOrigin: true,
  pathRewrite: {
    '^/proxy/skribbl': '',
  },
  onProxyRes: function(proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
  }
}));

// Página principal con interfaz de usuario
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Games Hub - Totalmente Desbloqueado</title>
      <style>
        body { 
          text-align: center; 
          font-family: Arial, sans-serif; 
          background-color: #f0f8ff;
          padding: 20px;
          color: #333;
        }
        h1 {
          color: #4169e1;
          margin-bottom: 30px;
        }
        .game-container {
          margin: 20px auto;
          max-width: 1000px;
          background-color: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .game-options {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
          margin: 30px 0;
        }
        .game-option {
          width: 250px;
          background: white;
          border-radius: 10px;
          padding: 15px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          transition: transform 0.3s;
          cursor: pointer;
        }
        .game-option:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        .game-option img {
          width: 100%;
          height: 150px;
          object-fit: cover;
          border-radius: 5px;
          margin-bottom: 10px;
        }
        iframe { 
          width: 100%; 
          height: 600px; 
          border: none; 
          margin-top: 20px; 
          border-radius: 8px;
          box-shadow: 0 0 5px rgba(0,0,0,0.2);
        }
        .instructions {
          background-color: #e6f7ff;
