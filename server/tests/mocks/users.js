'use strict';

const casual = require('casual');
const _id = require('mongoose').Types.ObjectId

casual.define('user', function() {
  return {
      _id: _id(),
      username: casual.username,
      email: casual.email,
      password: '$Yalasabes69'
  };
});

let user = casual.user;

const users = (times) => {
  var result = [];

  for (var i = 0; i < times; ++i) {
      result.push(casual._user());
  }

  return result;
};

module.exports = {
  user,
  users
}
