# Use a imagem base do Node.js
FROM node:14

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante dos arquivos do projeto para o diretório de trabalho
COPY . .

# Expõe a porta em que a aplicação estará ouvindo
EXPOSE 3000

# Comando para iniciar a aplicação
CMD [ "node", "app.js" ]
