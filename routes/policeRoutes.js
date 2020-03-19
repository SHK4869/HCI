const express=require('express');
const router=express.Router();

// const User=require('../models/user');
// const UserController=require('../controllers/users');
const checkAuth=require('../middleware/check-auth');
const policeController=require('../controllers/policeController');

router.post('/get', policeController.get_nearest);

router.post('/add', policeController.add_data);
// router.post('/signup', UserController.user_signup);

// router.post('/login', UserController.user_login);

// router.delete('/:userId', checkAuth, UserController.user_delete);

// router.get('/', curPositionController);

module.exports=router;