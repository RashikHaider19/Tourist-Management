// server/routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const { verifyToken, adminOnly } = require('../middlewares/authMiddleware');
const Booking = require('../models/Booking');
const Package = require('../models/Package');

// CREATE booking (User-only)
router.post('/', verifyToken, async (req, res) => {
  try {
    // user is automatically known from req.user after verifyToken
    // you can pass "packageId" in req.body
    const { packageId } = req.body;

    // Optionally check if package exists
    const foundPackage = await Package.findById(packageId);
    if (!foundPackage) {
      return res.status(404).json({ error: 'Package not found' });
    }

    // Create booking
    const newBooking = await Booking.create({
      user: req.user.userId, // from the decoded token
      package: packageId,
      // status defaults to 'reserved'
      // add any other fields from req.body if needed
    });

    return res.status(201).json({ message: 'Booking created', data: newBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET all bookings (Admin-only)
router.get('/', verifyToken, adminOnly, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email')    // to show user info
      .populate('package', 'name price') // to show package info
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET my bookings (User-only)
router.get('/my-bookings', verifyToken, async (req, res) => {
  try {
    // find bookings for this specific user
    const userId = req.user.userId;
    const myBookings = await Booking.find({ user: userId })
      .populate('package', 'name price')
      .sort({ createdAt: -1 });

    res.json(myBookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// UPDATE booking status (Admin-only, e.g. to 'completed')
router.put('/:id/status', verifyToken, adminOnly, async (req, res) => {
  try {
    const { status } = req.body; // e.g., { "status": "completed" }
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({ message: 'Booking status updated', data: updatedBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// CANCEL a booking (User can cancel their own booking)
router.put('/:id/cancel', verifyToken, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Check if the booking belongs to this user or if user is admin
    if (booking.user.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to cancel this booking' });
    }

    booking.status = 'canceled';
    await booking.save();

    res.json({ message: 'Booking canceled', data: booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
