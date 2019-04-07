'use strict';

const router = require('express').Router();
const User = require('../models/user/User');

// Trae todos los usuarios (Ruta protegida)
router.get('/all', (req, res) => {
  res.send(req.url);
});

// Registro de usuario
router.post('/singup', (req, res) => {
  new User(req.body).save()
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      err = err.message || err.errmsg;
      res.status(400).send(err);
    });
});

// Login de usuario
router.post('/singin', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body);
    const token = await user.createAuthToken();
    
    res.status(200).send({
      data: user,
      message: 'You have logged in correctly'
    });
  } catch(err) {
    res.status(err.status).send(err.message);
  }
});

// Trae un usuario por id(Ruta Protegida)
router.get('/:id', (req, res) => {
  res.send(req.url);
});

module.exports = router;
