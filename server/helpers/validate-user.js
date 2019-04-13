'use strict';

const bcrypt = require('bcrypt');
const validator = require('validator');

const passwordRules = (password) => {
  return  password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W)/) ? true : false;
}

const comparePass = async (reqPass, dbPass) => {
  const result = await bcrypt.compare(reqPass, dbPass);
  
  if(!result) {
    throw {
      status: 401,
      message: 'Password does not match'
    }
  }
  return result;
}

const isEmail = (user) => {
  if(!validator.isEmail(user.email)) {
    throw {
      status: 400,
      message: `${user.email} does not a valid email`
    }
  }
  return user;
}

module.exports = {
  passwordRules,
  comparePass,
  isEmail
}
