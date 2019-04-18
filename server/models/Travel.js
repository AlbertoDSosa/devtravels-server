'use strict';

const mongoose = require('mongoose');

const TravelSchema = new mongoose.Schema({
  travelname: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    default: 'trip-planning.jpg'
  },
  price: {
    type: Number,
    required: true
  },
  updateAt: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: false
  },
  uri: {
    type: String,
    required: true,
    unique: true
  }
});

TravelSchema.statics.findByUri = async (uri) => {
  const travel = await Travel.findOne({uri});
  if(!travel) {
    throw {
      status: 400,
      message: `The ${uri} uri does not exist`
    }
  }
  return travel;
}



const Travel = mongoose.model('travel', TravelSchema);

module.exports = Travel;
