'use strict';

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  const token = req.headers['authorization'];

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      _id: data._id,
      'tokens.token': token,
      'tokens.type': 'auth'
    });

    if(!user) {
      throw new Error('Invalid User')
    }

    req.user = user;

    next();
    
  } catch(err) {

    const decoded = jwt.decode(token);

    res.status(403).send(err.message || err);

    await User.findOneAndUpdate
      ({ 
          _id: decoded._id,
          'tokens.token': token,
          'tokens.type': 'auth'
        },
        {
          $pull: {
            tokens: {
              token: token, 
              type: 'auth'
            }
          }
      });
  }
}

const hasRole = (role) => {
  return (req, res, next) => {
    if(req.user.role === role) {
      return next();
    }
  
    res.status(403).send({message: `Rute only for ${role} user`});
  }
}

module.exports = {
  auth,
  hasRole
}
