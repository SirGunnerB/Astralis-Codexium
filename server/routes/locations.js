const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Location = require('../models/Location');
const World = require('../models/World');

// @route   GET api/locations/world/:worldId
// @desc    Get all locations for a world
// @access  Public
router.get('/world/:worldId', async (req, res) => {
  try {
    const locations = await Location.find({ world: req.params.worldId })
      .sort({ name: 1 });
    res.json(locations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/locations
// @desc    Create a location
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

      const newLocation = new Location({
        name: req.body.name,
        description: req.body.description,
        world: req.body.world,
        type: req.body.type,
        climate: req.body.climate,
        population: req.body.population,
        government: req.body.government,
        economy: req.body.economy,
        culture: req.body.culture,
        history: req.body.history,
        notableLocations: req.body.notableLocations || [],
        notableCharacters: req.body.notableCharacters || [],
        images: req.body.images || [],
        coordinates: req.body.coordinates || { x: 0, y: 0 }
      });

      const location = await newLocation.save();
      res.json(location);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   PUT api/locations/:id
// @desc    Update a location
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    let location = await Location.findById(req.params.id);

    if (!location) {
      return res.status(404).json({ msg: 'Location not found' });
    }

    // Check if user owns the world
    const world = await World.findById(location.world);
    if (world.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    location = await Location.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(location);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/locations/:id
// @desc    Delete a location
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);

    if (!location) {
      return res.status(404).json({ msg: 'Location not found' });
    }

    // Check if user owns the world
    const world = await World.findById(location.world);
    if (world.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await location.remove();
    res.json({ msg: 'Location removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router; 