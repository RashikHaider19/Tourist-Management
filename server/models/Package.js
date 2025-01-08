// server/models/Package.js
const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['event', 'tour', 'event+tour'], // or any categories you like
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
  },
  mediaUrls: {
    type: [String], // array of image or video URLs
    default: []
  },
  // Add fields for location, date, etc., if needed
  date: {
    type: Date
  }
}, { timestamps: true });

module.exports = mongoose.model('Package', packageSchema);
