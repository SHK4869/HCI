const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const User = require('../models/user');

exports.home = function(req, res, next){
	console.log(req.body);
	const home = {
        long: req.body.lat,
        lat: req.body.long,
        radius: req.body.radius
	};
	//TODO:flawed
	//const userEmail = jwt.decode(req.header.authorization.split(" ")[1]).email
	console.log(home);
	User
    .update({_id: req.params.userId}, {$set: {home:home}})
    .exec()
    .then(function(result){
        res.status(200).json({
            message: 'Home location inserted in DB',
        });
    })
	.catch(function(err){
		console.log(err);
		console.log("error")
		res.status(500).json({
			error: err
		});
	});
}

exports.work = function(req, res, next){
	console.log(req.body);
	const work = {
        long: req.body.lat,
        lat: req.body.long,
        radius: req.body.radius
	};
	//TODO:flawed
	//const userEmail = jwt.decode(req.header.authorization.split(" ")[1]).email
	console.log(work);
	User
    .update({_id: req.params.userId}, {$set: {work:work}})
    .exec()
    .then(function(result){
        res.status(200).json({
            message: 'Home location inserted in DB',
        });
    })
	.catch(function(err){
		console.log(err);
		console.log("error")
		res.status(500).json({
			error: err
		});
	});
}

exports.other = function(req, res, next){
	console.log(req.body);
	const other = {
        long: req.body.lat,
        lat: req.body.long,
        radius: req.body.radius
	};
	//TODO:flawed
	//const userEmail = jwt.decode(req.header.authorization.split(" ")[1]).email
	console.log(other);
	User
    .update({_id: req.params.userId}, {$set: {other:other}})
    .exec()
    .then(function(result){
        res.status(200).json({
            message: 'Home location inserted in DB',
        });
    })
	.catch(function(err){
		console.log(err);
		console.log("error")
		res.status(500).json({
			error: err
		});
	});
}
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

