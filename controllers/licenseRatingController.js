const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const LicenseData = require('../models/license');


exports.get_rating = function(req, res, next){
	LicenseData.license
	.find({license_number:req.params.license_number})
	.exec()
	.then(function(result){
		console.log("from database the driver ratings are: "+result);
		//TODO: compute the avg rating
        if(result.length>=1){
            res.status(200).json({
                rating: result,
            });
        }
        else{
            res.status(404).json({message: "Driver not in db"});
        }
	})
	.catch(function(err){
        console.log(err);
        res.status(500).json({error: err});
    });
};

exports.post_rating = function(req, res, next){
	const reviewUser = new LicenseData.review({
		_id: new mongoose.Types.ObjectId(),
		rating: req.body.rating,
		review: req.body.review,
	});
	console.log(req.body);

	const license_number_user = req.body.license_number;
	//db me hai ya nahi
	LicenseData.license
	.find({license_number: license_number_user})
	.exec()
	.then(function(license){
		console.log(license);
		if(license.length>=1){ //db me hai
			console.log(license);
			license[0].reviews.push(reviewUser);
			
			LicenseData.license
			.update({license_number: license_number_user}, {$set: {reviews: license[0].reviews} })
			.exec()
			.then(function(result){
				res.status(200).json({
					message: 'review inserted in DB',
				});
			})
			.catch(function(err){
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
        }
        else{
			const newRating = new LicenseData.license({
				_id: new mongoose.Types.ObjectId(),
				license_number: license_number_user,
				reviews: [reviewUser]
			})
			newRating
			.save()
			.then(function(result){
				console.log(result);
				res.status(201).json({
					message: 'New plate created and review added'
				});
			})
			.catch(function(err){
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
        }
    });
};

// exports.user_signup=function(req, res, next){
//     User
//     .find({email: req.body.email})
//     .exec()
//     .then(function(user){
//         if(user.length>=1){
//             return res.status(409).json({
//                 message: 'Mail exists'
//             });
//         }
//         else{
//             bcrypt.hash(req.body.password, 10, function(err, hash){
//                 if(err){
//                     return res.status(500).json({
//                         error: err
//                     });
//                 }
//                 else{
//                     const user=new User({
//                         _id: new mongoose.Types.ObjectId(),
//                         email: req.body.email,
//                         password: hash
//                     });
//                     user
//                     .save()
//                     .then(function(result){
//                         console.log(result);
//                         res.status(201).json({
//                             message: 'User created'
//                         });
//                     })
//                     .catch(function(err){
//                         console.log(err);
//                         res.status(500).json({
//                             error: err
//                         });
//                     });
//                 }
//             });
//         }
//     });
// }

