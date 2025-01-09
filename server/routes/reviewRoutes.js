// server/routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');
const Review = require('../models/Review');
const Package = require('../models/Package');

// CREATE a new review (User must be logged in)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { packageId, rating, comment } = req.body;

    // Optional: check if package exists
    const foundPackage = await Package.findById(packageId);
    if (!foundPackage) {
      return res.status(404).json({ error: 'Package not found' });
    }

    // Create the review
    const newReview = await Review.create({
      user: req.user.userId,
      package: packageId,
      rating,
      comment
    });

    return res.status(201).json({ message: 'Review created', data: newReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET all reviews for a particular package (Public)
router.get('/package/:packageId', async (req, res) => {
  try {
    const { packageId } = req.params;
    const reviews = await Review.find({ package: packageId })
      .populate('user', 'name') // so we can see who wrote the review
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET reviews by the logged-in user (optional)
router.get('/my-reviews', verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const reviews = await Review.find({ user: userId })
      .populate('package', 'name price')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// UPDATE a review (User can edit their own review)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    // Check if this review belongs to the user
    if (review.user.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to edit this review' });
    }

    // Update the fields
    if (rating !== undefined) review.rating = rating;
    if (comment !== undefined) review.comment = comment;
    await review.save();

    res.json({ message: 'Review updated', data: review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE a review (User can delete their own or admin can delete)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    if (review.user.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to delete this review' });
    }

    await review.remove();
    res.json({ message: 'Review deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
