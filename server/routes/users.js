'use strict';

const router = require('express').Router();
const User = require('../models/User');
const validate = require('../middlewares/validate-req');
const {auth, isAdmin} = require('../middlewares/auth-user');

// Trae todos los usuarios (Ruta protegida)
router.get('/all', (req, res) => {
  res.send(req.url);
});

// Registro de usuario
router.post('/singup', (req, res) => {
  new User(req.body).save()
    .then(user => {
      res
        .status(201)
        .send({
          message: 'You have registrered correctly',
          status: 201,
          user
        });
    })
    .catch(err => {
      res.status(400).send({
        status: 400,
        message: err.message || err.errmsg,
        err: true
      });
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
    
    res
      .header('Authorization', token)
      .status(200)
      .send({
        user,
        message: 'You have logged in correctly',
        status:200
      });
  } catch(err) {
    res.status(err.status || 500).send({
      message: err.message || err.errmsg || err,
      err: true
    });
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
const updateUserOpts = {
  type: 'object',
  props: ['username', 'email']
}
router.put('/update', auth, validate(updateUserOpts), async (req, res) => {
  try {
    await req.user.updateOne(req.body, { runValidators: true });
    res.status(200).send(await User.findById(req.user._id));
  } catch(err) {
    res.status(400).send(err.message || err);
  }
});

const updatePassOpts = {
  type: 'object',
  props: ['oldPass', 'newPass']
}

router.patch('/update-pass',
  auth, 
  validate(updatePassOpts),
  async (req, res) => {
    try {
      await req.user.updatePass(req.body); 
      res.status(200).send('Password updated successfully');
    } catch(err) {
      res.status(err.status || 400).send(err.message || err);
    }
});

router.delete('/delete', auth, async (req, res) => { 
  try {
    const user = await User.findByIdAndDelete(req.user._id);
    res.status(200).send(user);
  } catch(err) {
    res.status(500).send(err);
  }
});

module.exports = router;
