'use strict';

const router = require('express').Router();
const User = require('../models/User');
const validate = require('../middlewares/validate-req');
const {auth} = require('../middlewares/auth-user');

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

const singInOpts = {
  type: 'object',
  props: ['email', 'password']
}
router.post('/singin', validate(singInOpts), async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body);
    const token = await user.createAuthToken();
    
    res.header('Authorization', token).status(200).send({
      data: user,
      message: 'You have logged in correctly'
    });
  } catch(err) {
    res.status(err.status || 500).send(err.message || err);
  }
});

// Trae el usuario autenticado en este momento.
router.get('/me', auth, (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch(err) {
    res.status(403).send(err);
  }

});

// Actualizo mi usuario.
router.put('/update', auth, (req, res) => {
  res.send(req.url);
});

router.patch('/update-pass', auth, (req, res) => {
  res.send(req.url);
});

router.delete('/delete', auth, (req, res) => { 
  res.send(req.url);
});

module.exports = router;
