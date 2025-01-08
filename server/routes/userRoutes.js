// server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');

// Example user-only route
router.get('/profile', verifyToken, (req, res) => {
  return res.json({
    message: 'Welcome to your user profile!',
    userId: req.user.userId,
    role: req.user.role
  });
});

module.exports = router;
