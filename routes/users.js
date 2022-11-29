const express = require('express');
const { createUser } = require('../controllers/UserController');

const router = express.Router();

/* GET users listing. */
router.post('/', createUser);

module.exports = router;
