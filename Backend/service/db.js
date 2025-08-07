// service/db.js
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "buildings",
  password: "Naitik1310",
  port: 5432,
});

module.exports = pool;
