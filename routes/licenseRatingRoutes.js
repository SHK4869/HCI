const express=require('express');
const router=express.Router();

const LicenseRatingController=require('../controllers/licenseRatingController');
const checkAuth=require('../middleware/check-auth');

router.get('/:license_number', LicenseRatingController.get_rating);

router.post('/', LicenseRatingController.post_rating);

module.exports=router;