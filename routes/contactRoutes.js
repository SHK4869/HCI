const express=require('express');
const router=express.Router();

// const User=require('../models/user');
// const UserController=require('../controllers/users');
const checkAuth=require('../middleware/check-auth');
const contactsController=require('../controllers/contacts');

router.get('/:userId', contactsController.get);
router.post('/:userId', contactsController.post);
router.delete('/:userId', contactsController.delete);
// router.post('/heartbeat', checkAuth, curPositionController.heart_beat);
// router.post('/signup', UserController.user_signup);

// router.post('/login', UserController.user_login);

// router.delete('/:userId', checkAuth, UserController.user_delete);

// router.get('/', curPositionController);

module.exports=router;