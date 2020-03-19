const express=require('express');
const router=express.Router();

// const User=require('../models/user');
const MarkController=require('../controllers/markController');
const checkAuth=require('../middleware/check-auth');

router.post('/home/:userId', MarkController.home);

router.post('/work/:userId', MarkController.work);

router.post('/other/:userId', MarkController.other);
// router.post('/signup', UserController.user_signup);

// router.post('/login', UserController.user_login);

// router.delete('/:userId', checkAuth, UserController.user_delete);

// router.get('/', curPositionController);

module.exports=router;