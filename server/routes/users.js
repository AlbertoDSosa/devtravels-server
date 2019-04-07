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
router.post('/singin', (req, res) => {
  res.send(req.url);
});

// Trae un usuario por id
router.get('/:id', (req, res) => {
  res.send(req.url);
})

module.exports = router;
