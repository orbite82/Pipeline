# Imagem base leve do Node.js
FROM node:18-alpine

# Diretório de trabalho dentro do container
WORKDIR /app

# Copiar apenas os arquivos necessários
COPY src/ ./src
COPY package*.json ./

# Instalar dependências
RUN npm install --production

# Expor a porta usada pelo app
EXPOSE 3000

# Comando padrão para iniciar a aplicação
CMD ["node", "src/app.js"]