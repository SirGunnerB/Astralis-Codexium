const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Item = require('../models/Item');
const World = require('../models/World');

// @route   GET api/items/world/:worldId
// @desc    Get all items for a world
// @access  Public
router.get('/world/:worldId', async (req, res) => {
  try {
    const items = await Item.find({ world: req.params.worldId })
      .sort({ name: 1 });
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/items
// @desc    Create an item
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('world', 'World ID is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if world exists and user has access
      const world = await World.findById(req.body.world);
      if (!world) {
        return res.status(404).json({ msg: 'World not found' });
      }

      if (world.owner.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }

      const newItem = new Item({
        name: req.body.name,
        description: req.body.description,
        world: req.body.world,
        type: req.body.type,
        rarity: req.body.rarity,
        properties: req.body.properties || [],
        history: req.body.history,
        currentOwner: req.body.currentOwner,
        location: req.body.location,
        images: req.body.images || []
      });

      const item = await newItem.save();
      res.json(item);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   PUT api/items/:id
// @desc    Update an item
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    let item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    // Check if user owns the world
    const world = await World.findById(item.world);
    if (world.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    item = await Item.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/items/:id
// @desc    Delete an item
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    // Check if user owns the world
    const world = await World.findById(item.world);
    if (world.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await item.remove();
    res.json({ msg: 'Item removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router; 