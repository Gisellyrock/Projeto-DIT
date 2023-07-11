const { Pool } = require('pg');

// Configurações da conexão
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sistema_cadastro',
  password: 'Joyce000@',
  port: 5432, // Porta padrão do PostgreSQL
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
