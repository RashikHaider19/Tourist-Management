// server/routes/packageRoutes.js
const express = require('express');
const router = express.Router();
const { verifyToken, adminOnly } = require('../middlewares/authMiddleware');
const Package = require('../models/Package');

// CREATE a package (Admin-only)
router.post('/', verifyToken, adminOnly, async (req, res) => {
  try {
    const newPackage = await Package.create(req.body);
    res.status(201).json({ message: 'Package created', data: newPackage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// READ all packages (Public)
router.get('/', async (req, res) => {
  try {
    const packages = await Package.find().sort({ createdAt: -1 });
    res.json(packages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// READ single package by ID (Public)
router.get('/:id', async (req, res) => {
  try {
    const pack = await Package.findById(req.params.id);
    if (!pack) return res.status(404).json({ error: 'Package not found' });
    res.json(pack);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// UPDATE a package by ID (Admin-only)
router.put('/:id', verifyToken, adminOnly, async (req, res) => {
  try {
    const updatedPackage = await Package.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!updatedPackage) return res.status(404).json({ error: 'Package not found' });
    res.json({ message: 'Package updated', data: updatedPackage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE a package by ID (Admin-only)
router.delete('/:id', verifyToken, adminOnly, async (req, res) => {
  try {
    const deletedPackage = await Package.findByIdAndDelete(req.params.id);
    if (!deletedPackage) return res.status(404).json({ error: 'Package not found' });
    res.json({ message: 'Package deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
