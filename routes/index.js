const express = require('express');
const userRoutes = require('./users');
const contactRoutes = require('./contact');
const cardsRouter = require('./creditCard');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Banco Saint Patrick API' });
});

router.use('/user', userRoutes);
router.use('/contact', contactRoutes);
router.use('/cards', cardsRouter);

module.exports = router;
