
const express = require('express');
const cors = require('cors');
const pool = require('./config/database');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 AS ok');
    res.json({ status: 'ok', db: rows[0].ok });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

const PORT = 3000;
app.use('/api/users', userRoutes);
app.listen(PORT, () => {
    

  console.log(`Server running on port ${PORT}`);
});
