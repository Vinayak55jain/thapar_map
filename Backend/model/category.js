
const pool = require('./db');

const getCategoryByName = async (name) => {
  const result = await pool.query('SELECT * FROM category WHERE category = $1', [name]);
  return result.rows.length > 0 ? result.rows[0].cat_id : null;

};

module.exports = {
  getCategoryByName
};