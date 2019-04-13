'use strict';

const router = require('express').Router();

router.post('/add', (req, res) => {
  res.send(req.url);
});

router.get('/all', (req, res) => {
  res.send(req.url);
});

router.get('/:id', (req, res) => {
  res.send(req.url);
});


router.put('/:id', (req, res)=> {
  res.send(req.url);
});

router.delete('/:id', (req, res)=> { 
  res.send(req.url);
});

module.exports = router;
