const pool = require('../config/database');

async function getAllUsers() {
  const [rows] = await pool.query('SELECT id, name, email, program, section FROM users');
  return rows;
}

async function getUserById(userId) {
  const [rows] = await pool.query(
    'SELECT id, name, email, program, section FROM users WHERE id = ?',
    [userId]
  );
  return rows[0] || null;
}

// AUTH helpers
async function getUserAuthByEmail(email) {
  const [rows] = await pool.query(
    'SELECT id, name, email, program, section, password_hash FROM users WHERE email = ?',
    [email]
  );
  return rows[0] || null;
}

async function createUser({ name, email, program, section, passwordHash }) {
  const [result] = await pool.query(
    `INSERT INTO users (name, email, program, section, password_hash)
     VALUES (?, ?, ?, ?, ?)`,
    [name, email, program, section, passwordHash]
  );

  return result.insertId;
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserAuthByEmail,
  createUser,
};
