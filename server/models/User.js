// server/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ['customer', 'admin'],
      default: 'customer',
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    // Add any additional fields here, e.g., travelHistory, healthInfo, etc.
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
