const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const User=require('../models/user');

exports.user_signup=function(req, res, next){
    console.log('user sign-up route');
    
    User
    .find({email: req.body.email})
    .exec()
    .then(function(user){
        if(user.length>=1){
            console.log(" userexists ");
            return res.status(409).json({
                message: 'Mail exists'
            });
        }
        else{
            console.log("new user");
            bcrypt.hash(req.body.password, 10, function(err, hash){
                if(err){
                    return res.status(500).json({
                        error: err
                    });
                }
                else{
                    let user=new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash,
                        lastSeen: {
                            long: 19.015659, //TODO: make the map send the current gps coordinates
                            lat: 72.861394
                        }
                    });
                    user
                    .save()
                    .then(function(result){
                        console.log(result);
                        res.status(201).json({
                            message: 'User created'
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
        }
    });
}

exports.user_login=function(req, res, next){
    console.log('user login route');
    User
    .find({email: req.body.email})
    .exec()
    .then(function(user){
        if(user.length<1){
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
        bcrypt.compare(req.body.password, user[0].password, function(err, result){
            if(err){
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            if(result){
                const token=jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id
                }, "secret", {
                    expiresIn: '120h'
                });
                return res.status(200).json({
                    message: 'Auth successful',
                    token: token,
                    userId: user[0]._id
                });
            }
            return res.status(401).json({
                message: 'Auth failed'
            });
        });
    })
    .catch(function(err){
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.user_delete=function(req, res, next){
    console.log('user logout route');
    User
    .remove({_id: req.params.userId})
    .exec()
    .then(function(result){
        res.status(200).json({
            message: 'User deleted'
        });
    })
    .catch(function(err){
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}