const pool = require('../config/database');

async function getAllUsers() {
  const [rows] = await pool.query(
    'SELECT id, student_number, name, email, program, section, created_at FROM users'
  );
  return rows;
}

async function getUserById(userId) {
  const [rows] = await pool.query(
    'SELECT id, student_number, name, email, program, section, created_at FROM users WHERE id = ?',
    [userId]
  );
  return rows[0] || null;
}

// used by login + register duplicate check
async function getUserAuthByEmail(email) {
  const [rows] = await pool.query(
    'SELECT id, student_number, name, email, program, section, password_hash, created_at FROM users WHERE email = ?',
    [String(email).toLowerCase().trim()]
  );
  return rows[0] || null;
}

async function getUserByStudentNumber(studentNumber) {
  const [rows] = await pool.query(
    'SELECT id, student_number, name, email, program, section, created_at FROM users WHERE student_number = ?',
    [String(studentNumber).trim()]
  );
  return rows[0] || null;
}

async function createUser({ studentNumber, name, email, program, section, passwordHash }) {
  const [result] = await pool.query(
    'INSERT INTO users (student_number, name, email, program, section, password_hash) VALUES (?, ?, ?, ?, ?, ?)',
    [studentNumber, name, email, program, section, passwordHash]
  );
  return result.insertId;
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserAuthByEmail,
  getUserByStudentNumber,
  createUser,
};
