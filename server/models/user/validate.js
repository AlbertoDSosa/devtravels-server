'use strict';

// Validaciones de el objeto req.body

const _ = require('lodash');
const bcrypt = require('bcrypt');
const validator = require('validator');
const isObject = (user) => {
  if(_.isArray(user)){
    throw {
      status: 400,
      meassage: 'The request shold be a object {}'
    };
  }
  return user;
}

const isEmpty = (user) => {
  if(_.isEmpty(user)) {
    throw {
      status: 400,
      message: 'The request object is empty'
    };
  }
  return user;
}

const hasProperties = (user, props) => {
  for(let value of props) {
    if(!_.has(user, value)) {
      throw {
        status: 400,
        message: `The request object should has the property ${value}`
      };
    }
  }
  return user;
}

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
  isObject,
  isEmpty,
  hasProperties,
  isEmail
}
