// server/models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // reference to User model
    required: true
  },
  package: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package', // reference to Package model
    required: true
  },
  status: {
    type: String,
    enum: ['reserved', 'canceled', 'completed'],
    default: 'reserved'
  },
  // Optional fields: date/time of booking, number of people, etc.
  bookingDate: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
