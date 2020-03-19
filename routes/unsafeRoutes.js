const express=require('express');
const router=express.Router();

// const User=require('../models/user');
const UnsafeController=require('../controllers/unsafeController');
const checkAuth=require('../middleware/check-auth');

router.get('/city/:cityId', UnsafeController.coordinates_by_city);

router.get('/map', UnsafeController.coordinates_all);

// router.post('/signup', UserController.user_signup);

// router.post('/login', UserController.user_login);

// router.delete('/:userId', checkAuth, UserController.user_delete);

// router.get('/', curPositionController);

module.exports=router;