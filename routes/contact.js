const express = require('express');
const {
  addContact,
  deleteContact,
} = require('../controllers/ContactController');

const router = express.Router();

/* GET users listing. */
router.post('/add', addContact);
router.post('/delete', deleteContact);

module.exports = router;
