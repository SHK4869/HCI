const express=require('express');
const router=express.Router();

// const User=require('../models/user');
const ReportController=require('../controllers/reportController');
const checkAuth=require('../middleware/check-auth');


router.post('/', ReportController.add_report);

// router.post('/login', UserController.user_login);

// router.delete('/:userId', checkAuth, UserController.user_delete);

// router.get('/', curPositionController);

module.exports=router;