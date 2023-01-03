const express = require('express');
const {
  createUser,
  login,
  transaction,
} = require('../controllers/UserController');

const router = express.Router();

router.post('/', createUser);
router.post('/login', login);
router.post('/transaction', transaction);

module.exports = router;
