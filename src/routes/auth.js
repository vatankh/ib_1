const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');
const { validateLogin } = require('../middleware/validation');

// POST /auth/login
router.post('/login', validateLogin, login);


module.exports = router;