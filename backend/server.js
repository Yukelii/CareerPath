require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const progressRoutes = require('./routes/progressRoutes');
const bookmarkRoutes = require('./routes/bookmarkRoutes');
const guideRoutes = require('./routes/guideRoutes');

const authMiddleware =
  process.env.USE_DEV_AUTH === 'true'
    ? require('./middleware/devAuth')
    : require('./middleware/auth');

const app = express();

// Parse FRONTEND_ORIGIN from .env (
const frontendOrigins = (process.env.FRONTEND_ORIGIN || 'http://localhost:3002')
  .split(',')
  .map((origin) => origin.trim());

console.log(`[CORS] Allowing origins:`, frontendOrigins);

app.use(
  cors({
    origin: frontendOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());
app.use(cookieParser());

// Helpful request log
app.use((req, res, next) => {
  console.log(`[REQ] ${req.method} ${req.originalUrl}`);
  next();
});

// Health check
app.get('/api/health', (req, res) => res.json({ ok: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/progress', authMiddleware, progressRoutes);
app.use('/api/bookmarks', authMiddleware, bookmarkRoutes);
app.use('/api/guides', authMiddleware, guideRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found', path: req.originalUrl });
});

const PORT = Number(process.env.PORT || 3000);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`USE_DEV_AUTH=${process.env.USE_DEV_AUTH} DEV_USER_ID=${process.env.DEV_USER_ID}`);
});
