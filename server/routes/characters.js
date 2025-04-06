const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Character = require('../models/Character');
const World = require('../models/World');

// @route   GET api/characters/world/:worldId
// @desc    Get all characters for a world
// @access  Public
router.get('/world/:worldId', async (req, res) => {
  try {
    const characters = await Character.find({ world: req.params.worldId })
      .sort({ name: 1 });
    res.json(characters);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/characters
// @desc    Create a character
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

      const newCharacter = new Character({
        name: req.body.name,
        description: req.body.description,
        world: req.body.world,
        race: req.body.race,
        class: req.body.class,
        age: req.body.age,
        gender: req.body.gender,
        appearance: req.body.appearance,
        personality: req.body.personality,
        background: req.body.background,
        abilities: req.body.abilities || [],
        relationships: req.body.relationships || [],
        timeline: req.body.timeline || [],
        images: req.body.images || []
      });

      const character = await newCharacter.save();
      res.json(character);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   PUT api/characters/:id
// @desc    Update a character
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    let character = await Character.findById(req.params.id);

    if (!character) {
      return res.status(404).json({ msg: 'Character not found' });
    }

    // Check if user owns the world
    const world = await World.findById(character.world);
    if (world.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    character = await Character.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(character);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/characters/:id
// @desc    Delete a character
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);

    if (!character) {
      return res.status(404).json({ msg: 'Character not found' });
    }

    // Check if user owns the world
    const world = await World.findById(character.world);
    if (world.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await character.remove();
    res.json({ msg: 'Character removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router; 