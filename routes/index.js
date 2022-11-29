const express = require('express');
const userRoutes = require('./users');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Banco Saint Patrick API' });
});

router.use('/user', userRoutes);

module.exports = router;
