const pool = require('../config/database');

async function getAllUsers() {
  const [rows] = await pool.query('SELECT id, name, email FROM users');
  return rows;
}

module.exports = { getAllUsers };
