'use strict';

const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
  trip: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: true
  }
});

const Trip = mongoose.model('trip', TripSchema);

module.exports = Trip;
