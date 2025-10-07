const express = require('express');
const router = express.Router();
const { getPosts, createPost } = require('../controllers/dataController');
const { validatePost } = require('../middleware/validation');
const { authenticate } = require('../middleware/auth');

// GET /api/data - posts data (optional authentication)
router.get('/data', authenticate, getPosts);

// POST /api/data - create new post (protected)
router.post('/data', authenticate, validatePost, createPost);

module.exports = router;