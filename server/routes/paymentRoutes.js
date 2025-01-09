// server/routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const { verifyToken } = require('../middlewares/authMiddleware');

// Read secret key from .env
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * Minimal create-payment-intent route
 * We'll assume an "amount" in cents from the frontend.
 */
router.post('/create-payment-intent', verifyToken, async (req, res) => {
  try {
    const { amount } = req.body; // e.g. 2000 = $20.00 in "usd"

    // Create a PaymentIntent on Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd'
    });

    // Send the clientSecret back
    res.status(200).json({
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    console.error('Stripe error:', error);
    return res.status(500).json({ error: 'Stripe error' });
  }
});

module.exports = router;
