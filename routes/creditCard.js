const express = require('express');
const {
  addCreditCard,
} = require('../controllers/creditCardController');

const router = express.Router();

router.post('/', addCreditCard);

module.exports = router;
