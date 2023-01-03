const express = require('express');
const {
  addCreditCard,
  removeCreditCard,
  addFounds,
} = require('../controllers/creditCardController');

const router = express.Router();

router.post('/', addCreditCard);
router.post('/delete', removeCreditCard);
router.post('/addFounds', addFounds);

module.exports = router;
