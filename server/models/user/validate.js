'use strict';

// Validaciones de el objeto req.body

const _ = require('lodash');

const isObject = (user) => {
  if(!_.isObject(user)){
    throw 'The request shold be a object';
  }
  return user;
}

const hasProperties = (user, props) => {
  if(!_.has(user, props)) {
    throw `The request object should have the properties ${props.toString()}`;
  }
  return user;
}

const passwordRules = (password) => {
  return  password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W)/) ? true : false;
}

module.exports = {
  passwordRules,
  isObject,
  hasProperties
}
