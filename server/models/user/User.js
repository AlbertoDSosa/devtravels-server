'use strict';

const mongoose = require('mongoose');
const validator = require('validator');
const validate = require('./validate');
const bcrypt = require('bcrypt');
const _ = require('lodash');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100,
    validate: {
      isAsync: true,
      validator: (email) => {
        return validator.isEmail(email);
      },
      message: (props) => {
        return `Email ${props.value} is not valid`
      }
    }
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    unique: true,
    minlength: [8, 'The password shold have 8 characters or more'],
    maxlength: 128,
    validate: {
      isAsync: true,
      validator: (password) => {
        return validate.passwordRules(password);
      },
      message: () => {
        return 'The password must contain: Uppercase, lowercase, numbers and special characters such as $';
      }
    }
  }
});

UserSchema.methods.toJSON = function () {
  const user = this;
  return _.pick(user, ['username', 'email', '_id']);
}

UserSchema.pre('save', function (next) {
  const user = this;

  if(user.isModified('password')) {
    bcrypt.hash(user.password, 10)
      .then(hash => {
        user.password = hash
        next();
      });
  } else {
    next();
  }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
