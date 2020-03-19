const mongoose=require('mongoose');
// const bcrypt=require('bcryptjs');
// const jwt=require('jsonwebtoken');

// given a user id, if the isLive flag is set, response will be the 
// last seen of that user
const User=require('../models/user');

exports.location=function(req, res, next){

	const userId = req.params.userId;
    const city=1;           /* get your city here with any other api */
    let unsafe_flag=false;
    User
    .findById(userId)
    .exec()
    .then(function(result){
	   console.log(result);
	   if(result.isLive){
		   return res.status(200).json({
			   coordinates: result.lastSeen
		   })
	   }
	   else {
			res.status(200).json({
				message: "User has disabled live sharing"
			})
	   }
	})
	.catch(function(err){
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
	
	;
    /* 
    get the place / city from the req.long and lat
    then query the regions db for that city
    iterate through each co-ordinate and calculate if its within threshold
    if any of it is in thershold, report unsafe
    */
}