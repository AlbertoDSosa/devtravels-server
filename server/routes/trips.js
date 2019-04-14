'use strict';

const router = require('express').Router();

router.post('/add', (req, res) => {
  res.send(req.url);
});

router.get('/all', (req, res) => {
  res.send(req.url);
});

router.get('/', (req, res) => {
  res.send(req.url);
});


router.put('/', (req, res)=> {
  res.send(req.url);
});

router.delete('/', (req, res)=> { 
  res.send(req.url);
});

module.exports = router;
