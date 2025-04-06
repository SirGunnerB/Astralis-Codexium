const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  world: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'World',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['city', 'town', 'village', 'dungeon', 'forest', 'mountain', 'desert', 'ocean', 'other'],
    default: 'other'
  },
  climate: String,
  population: Number,
  government: String,
  economy: String,
  culture: String,
  history: String,
  notableLocations: [{
    name: String,
    description: String
  }],
  notableCharacters: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Character'
  }],
  images: [{
    url: String,
    caption: String
  }],
  coordinates: {
    x: Number,
    y: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
LocationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Location', LocationSchema); 