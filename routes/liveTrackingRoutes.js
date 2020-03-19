// given a user id, if the isLive flag is set, response will be the 
// last seen of that user

const express=require('express');
const router=express.Router();

// const User=require('../models/user');
// const UserController=require('../controllers/users');
const checkAuth=require('../middleware/check-auth');
const liveTrackingController=require('../controllers/liveTrackingController');

router.get('/:userId', liveTrackingController.location);

module.exports=router;