const express = require('express');
const {
  createUser,
  getUser,
  login,
} = require('../controllers/UserController');

const router = express.Router();

/* GET users listing. */
router.get('/', getUser);
router.post('/', createUser);
router.post('/login', login);

module.exports = router;
