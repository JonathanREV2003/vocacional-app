const { Router } = require('express');
const pool = require('../models/postgres');

const router = Router();

router.get('/login', async (req, res) => {
  const result = await pool.query('SELECT NOW()')
  console.log(result);
  res.json('executed')
});

router.post('/login', (req, res) => {
  res.send('post login route');
});

router.delete('/login', (req, res) => {
  res.send('delete login route');
});

router.put('/login', (req, res) => {
  res.send('put login route');
});

module.exports = router;