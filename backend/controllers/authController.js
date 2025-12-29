const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, getUserAuthByEmail, getUserByStudentNumber } = require('../models/userModel');

const PROGRAM_SECTIONS = {
  BSCS: ['1A', '1B', '1C', '1D', '2A', '2B', '2C', '2D', '3A', '3B', '3C', '3D', '3E', '4A', '4B', '4C'],
  BSIT: ['1A', '1B', '1C', '1D', '1E', '2A', '2B', '2C', '2D', '2E', '3A', '3B', '3C', '3D', '3E', '4A', '4B', '4C', '4D'],
};

function setAuthCookie(res, token) {
  const cookieName = process.env.AUTH_COOKIE_NAME || 'careerpath_token';
  const isProd = process.env.NODE_ENV === 'production';

  res.cookie(cookieName, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: isProd,
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

const register = async (req, res) => {
  try {
    const { name, email, program, section, studentNumber, password, confirmPassword } = req.body;

    if (!name || !email || !program || !section || !studentNumber || !password || !confirmPassword) {
      return res.status(400).json({
        error: 'All fields are required',
        fields: ['name', 'email', 'program', 'section', 'studentNumber', 'password', 'confirmPassword'],
      });
    }

    if (!PROGRAM_SECTIONS[program]) {
      return res.status(400).json({ error: 'Invalid program. Must be BSCS or BSIT' });
    }

    const normalizedSection = String(section).toUpperCase().trim();
    if (!PROGRAM_SECTIONS[program].includes(normalizedSection)) {
      return res.status(400).json({
        error: `Invalid section for ${program}`,
        validSections: PROGRAM_SECTIONS[program],
      });
    }

    if (!email.toLowerCase().endsWith('@cvsu.edu.ph')) {
      return res.status(400).json({ error: 'Email must be a valid CvSU email (@cvsu.edu.ph)' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const existingEmail = await getUserAuthByEmail(email);
    if (existingEmail) return res.status(409).json({ error: 'Email already registered' });

    const existingStudent = await getUserByStudentNumber(studentNumber);
    if (existingStudent) return res.status(409).json({ error: 'Student number already registered' });

    const passwordHash = await bcrypt.hash(password, 10);

    const userId = await createUser({
      studentNumber: studentNumber.trim(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      program: program.toUpperCase(),
      section: normalizedSection,
      passwordHash,
    });

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
    setAuthCookie(res, token);

    return res.status(201).json({ success: true, userId, message: 'Registration successful' });
  } catch (err) {
    console.error('Registration error:', err);
    return res.status(500).json({ error: 'Registration failed. Please try again later.' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

    const user = await getUserAuthByEmail(email);
    if (!user || !user.password_hash) return res.status(401).json({ error: 'Invalid email or password' });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'Invalid email or password' });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    setAuthCookie(res, token);

    return res.json({ success: true, message: 'Login successful' });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Login failed. Please try again later.' });
  }
};

const logout = (req, res) => {
  const cookieName = process.env.AUTH_COOKIE_NAME || 'careerpath_token';
  const isProd = process.env.NODE_ENV === 'production';

  res.clearCookie(cookieName, {
    path: '/',
    sameSite: 'lax',
    secure: isProd,
  });

  return res.json({ success: true, message: 'Logged out successfully' });
};

module.exports = { register, login, logout };
