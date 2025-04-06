const mongoose = require('mongoose');

const CharacterSchema = new mongoose.Schema({
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
  race: {
    type: String,
    trim: true
  },
  class: {
    type: String,
    trim: true
  },
  age: Number,
  gender: String,
  appearance: String,
  personality: String,
  background: String,
  abilities: [{
    name: String,
    description: String
  }],
  relationships: [{
    character: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Character'
    },
    relationship: String,
    description: String
  }],
  timeline: [{
    event: String,
    date: String,
    description: String
  }],
  images: [{
    url: String,
    caption: String
  }],
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
CharacterSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Character', CharacterSchema); 