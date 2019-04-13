'use strict';

const _ = require('lodash');
const Schema = require('validate');
// Validaciones de el objeto req.body

const options = new Schema({
  type: {
    type: String,
    required: true,
    enum: ['object', 'array'],
    message: {
      type: 'The type option must be a String',
      required: 'The type option is required',
      enum: 'The options for type are: object or array'
    }
  },
  props: [{
    type: String,
    required: true,
    message: {
      required: 'You have to pass properties',
      type: 'You have to pass only strings to the properties array'
    }
  }]
});


// const isArray = (body) => {
//   if(!_.isArray(body)){
//     throw {
//       status: 400,
//       message: 'The request shold be a array []'
//     };
//   }
//   return body;
// }

const isObject = (body) => {
  if(_.isArray(body)){
    throw {
      status: 400,
      message: 'The request shold be a object {}'
    };
  }
  return body;
}

const isEmpty = (body) => {
  if(_.isEmpty(body)) {
    throw {
      status: 400,
      message: 'The request object is empty'
    };
  }
  return body;
}

const hasProperties = (body, props) => {
  for(let value of props) {
    if(!_.has(body, value)) {
      throw {
        status: 400,
        message: `The request object should has the property ${value}`
      };
    }
  }
  return body;
}

const ifIsObject = (body, props) => {
  body = isObject(body);
  body = isEmpty(body);
  body = _.pick(body, props);
  body = hasProperties(body, props)
  return body;
} 

const validateOpts = (opts) => {
  if(!opts) {
    throw new Error('El middleware necesita el objeto de opciones');
  }

  const errors = options.validate(opts);
  
  if(errors.length) {
    for(let value of errors) {
      throw new Error(`${value.path}: ${value.message}`)
    } 
  }

  return opts;
}

module.exports = (opts) => {
  opts = validateOpts(opts);
  const props = opts.props;
  return (req, res, next) => {
    try {
      req.body = ifIsObject(req.body, props);
      next()
    } catch(error) {
      res
        .status(error.status || error)
        .send(error.message || error);
    }  
  }
}
