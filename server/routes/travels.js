'use strict';

const router = require('express').Router();
const Travel = require('../models/Travel');
const { auth, isAdmin } = require('../middlewares/auth-user');
const validate = require('../middlewares/validate-req');
const multer = require('../config/multer');
const path = require('path');

router.post('/add', async (req, res) => {
  try {
    const travel = await new Travel(req.body).save()
    res.status(201).send({
      message: 'Travel registered successfully',
      travel
    });
  } catch(err){
    res.send(err);
  }
});

router.get('/all', (req, res) => {
  Travel.find({})
    .then(travels => {
      res.status(200).send(travels);
    })
    .catch(err => {
      res.send(err);
    })
});

router.post('/upload-img/:uri', multer.single('file'), async (req, res) => {
  const uri = req.params.uri;
  
  try {
    const travel = await Travel.findOneAndUpdate({uri}, {image: req.file.originalname});
    res.status(200).send({
      message: 'Image upload successfully',
      travel
    });
  } catch(err) {
    res.send(err);
  }
});

router.patch('/update/:uri', (req, res) => {
  const uri = req.params.uri;
  res.send(req.url);
});

router.delete('/delete/:uri', (req, res) => { 
  const uri = req.params.uri;
  Travel.findOneAndDelete({uri})
    .then(travel => {
      res.status(200).send({
        travel,
        message: `Travel delete successfully`
      })
    })
    .catch(err => {
      res.send(err);
    });
});

router.get('/image/:uri', async (req, res) => {
  const uri = req.params.uri;
  
  try {
    const travel = await Travel.findByUri(uri);
    res.sendFile(path.join(__dirname, '../uploads', travel.image));
  } catch(err) {
    res.send(err.message || err);
  }
});

router.get('/:uri', async (req, res) => {
  const uri = req.params.uri;
  
  try {
    const travel = await Travel.findByUri(uri);
    res.status(200).send({
      travel
    });
  } catch(err){
    res
      .status(err.status || 500)
      .send(err.message || err);
  }
});

module.exports = router;
