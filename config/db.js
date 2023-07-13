const { Pool } = require('pg');

// Configurações da conexão
if (process.env.NODE_ENV !== 'production') require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.DB_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
