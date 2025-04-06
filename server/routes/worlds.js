const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const World = require('../models/World');
const User = require('../models/User');

// @route   GET api/worlds
// @desc    Get all worlds
// @access  Public
router.get('/', async (req, res) => {
  try {
    const worlds = await World.find({ isPublic: true })
      .populate('owner', 'username')
      .sort({ createdAt: -1 });
    res.json(worlds);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/worlds/user
// @desc    Get user's worlds
// @access  Private
router.get('/user', auth, async (req, res) => {
  try {
    const worlds = await World.find({ owner: req.user.id })
      .sort({ createdAt: -1 });
    res.json(worlds);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/worlds
// @desc    Create a world
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newWorld = new World({
        name: req.body.name,
        description: req.body.description,
        owner: req.user.id,
        isPublic: req.body.isPublic || false,
        tags: req.body.tags || []
      });

      const world = await newWorld.save();
      res.json(world);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   PUT api/worlds/:id
// @desc    Update a world
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    let world = await World.findById(req.params.id);

    if (!world) {
      return res.status(404).json({ msg: 'World not found' });
    }

    // Check if user owns the world
    if (world.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    world = await World.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(world);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/worlds/:id
// @desc    Delete a world
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const world = await World.findById(req.params.id);

    if (!world) {
      return res.status(404).json({ msg: 'World not found' });
    }

    // Check if user owns the world
    if (world.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await world.remove();
    res.json({ msg: 'World removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router; 