// routes/authRoutes.js
const express = require('express');
const { registerUser, loginUser, getUserInfo } = require("../controller/auth");
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Register user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);

// Get user information (Should be GET, not POST)
router.get('/getUser', protect, getUserInfo);

module.exports = router;
