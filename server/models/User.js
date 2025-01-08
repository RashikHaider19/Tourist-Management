// server/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ['admin', 'customer'],
      default: 'customer'
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
    // Add more fields if needed
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
