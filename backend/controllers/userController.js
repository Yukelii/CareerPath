const User = require('../models/userModel');

async function listUsers(req, res) {
  try {
    const users = await User.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}

module.exports = { listUsers };
