const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Map_acm',
  password: 'Password',
  port: 5432, // default PostgreSQL port
});

module.exports = pool;
