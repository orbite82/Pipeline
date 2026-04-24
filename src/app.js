// src/app.js
const express = require('express');
const app = express();

// Middleware para logar cada requisição
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Rota principal
app.get('/', (req, res) => {
  res.send('Hello from Kubernetes + Minikube!');
});

// Rota de saúde (healthcheck) para Kubernetes
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Rota de versão (útil para CI/CD)
app.get('/version', (req, res) => {
  res.json({ version: '1.0.0', environment: process.env.NODE_ENV || 'dev' });
});

// Porta padrão
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App rodando na porta ${PORT}`);
});