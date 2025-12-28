const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, getUserAuthByEmail } = require('../models/userModel');


const ALLOWED_SECTIONS = new Set([
  '1A','1B','1C',
  '2A','2B','2C','2D',
  '3A','3B','3C','3D','3F',
  '4A','4B','4C',
]);


function setAuthCookie(res, token) {
  const cookieName = process.env.AUTH_COOKIE_NAME || 'careerpath_token';
  const isProd = process.env.NODE_ENV === 'production';

  res.cookie(cookieName, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: isProd,
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
}


const register = async (req, res) => {
  try {
    const { name, email, password, section } = req.body;

    if (!name || !email || !password || !section) {
      return res.status(400).json({ error: 'name, email, password, section are required' });
    }

    const normalizedSection = String(section).toUpperCase().trim();
    if (!ALLOWED_SECTIONS.has(normalizedSection)) {
      return res.status(400).json({ error: 'Invalid section' });
    }

    const existing = await getUserAuthByEmail(email);
    if (existing) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // bcrypt hashing for safe password storage
    const passwordHash = await bcrypt.hash(password, 10); // 10 rounds
    const userId = await createUser({
      name,
      email,
      program: 'BSCS',
      section: normalizedSection,
      passwordHash,
    });

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
    setAuthCookie(res, token);

    return res.status(201).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Register failed' });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required' });
    }

    const user = await getUserAuthByEmail(email);
    if (!user || !user.password_hash) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    setAuthCookie(res, token);

    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Login failed' });
  }
};


const logout = async (req, res) => {
  const cookieName = process.env.AUTH_COOKIE_NAME || 'careerpath_token';
  res.clearCookie(cookieName, { path: '/' });
  res.json({ success: true });
};


module.exports = { register, login, logout };