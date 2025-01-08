// server/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { verifyToken, adminOnly } = require('../middlewares/authMiddleware');

// Example admin-only route
router.get('/dashboard', verifyToken, adminOnly, (req, res) => {
  return res.json({
    message: 'Welcome to the Admin Dashboard!'
  });
});

module.exports = router;
