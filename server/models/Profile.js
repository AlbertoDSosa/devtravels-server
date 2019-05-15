'use strict';

const mongoose = require('mongoose');
const _ = require('lodash');

const ProfileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    maxlength: 30,
    default: ''
  },
  lastname: {
    type: String,
    maxlength: 50,
    default: ''
  },
  image: {
    type: String,
    default: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
  },
  user_id: {
    type: String,
    required: true
  }
});

ProfileSchema.methods.toJSON = function () {
  const profile = this;
  return _.pick(profile, ['firstname', 'lastname', 'image']);
}

const Profile = mongoose.model('profile', ProfileSchema);

module.exports = Profile;
