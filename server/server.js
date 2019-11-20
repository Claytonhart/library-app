const express = require('express');
const app = express();
// const mysql = require('mysql');
// const faker = require('faker');
const db = require('./config/db');

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', async (req, res) => {
  const q = 'SELECT * FROM users';

  try {
    const response = await db.query(q);
    console.log(response);
    res.json(response);
  } catch (err) {
    console.log('error: ' + err);
  }
});

app.get('/test', async (req, res) => {
  const q = 'SELECT * FROM users WHERE username="johnsmith"';

  try {
    const response = await db.query(q);
    console.log(response);
    res.json(response);
  } catch (err) {
    console.log('error: ' + err);
  }
});

// Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
