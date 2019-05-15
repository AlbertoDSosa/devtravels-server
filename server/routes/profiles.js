'use strict';

const router = require('express').Router();
const Profile = require('../models/Profile');

const {auth} = require('../middlewares/auth-user');

router.get('/me', auth, async (req, res) => {
  // const _id = req.query.user_id;
  
  try {
    let profile = await Profile.findOne({ user_id: req.user._id });
    res.status(200).json(profile);
  } catch(error) {
    console.error(error); 
  }
});

module.exports = router;
