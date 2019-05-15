'use strict';

const router = require('express').Router();

router.get('/', (req, res) => {
  res.send(req.url);
});

router.use('/user', require('./users'));
router.use('/travel', require('./travels'));
router.use('/profile', require('./profiles'))

module.exports = router;
