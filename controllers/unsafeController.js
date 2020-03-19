const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const Region = require('../models/region');

exports.coordinates_by_city = function(req, res, next){
    console.log(req.params.cityId)
	Region
	.find({city: req.params.cityId})
	.exec()
	.then(function(coordinates){
		console.log("from database the coordiantes by city are: "+coordinates);
        if(coordinates.length>=1){
            res.status(200).json({
                coordinates_by_city: coordinates,
            });
        }
        else{
            res.status(404).json({message: "Invalid city"});
        }
	})
	.catch(function(err){
        console.log(err);
        res.status(500).json({error: err});
    });
};

exports.coordinates_all = function(req, res, next){
	Region
	.find()
	.exec()
	.then(function(coordinates){
		console.log("from database the coordiantes are: "+coordinates);
        if(coordinates.length>=1){
            res.status(200).json({
                coordinates: coordinates,
            });
        }
        else{
            res.status(404).json({message: "No entries in the regions table"});
        }
	})
	.catch(function(err){
        console.log(err);
        res.status(500).json({error: err});
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

