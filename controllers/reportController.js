const mongoose=require('mongoose');
const Region=require('../models/region');

exports.add_report = function(req, res, next){
	//grouping kaise hoga?
	console.log(req.body);
	const region = new Region({
		_id: new mongoose.Types.ObjectId(),
		//city_id: "",
		city: req.body.city, //add from arcgis
		long: req.body.long,
		lat: req.body.lat,
		reports: req.body.review,
	});

	console.log("POSTed region: "+region);
	region
	.save()
	.then(function(result){
		console.log(result);
		res.status(201).json({
			message: 'Region added'
		});
	})
	.catch(function(err){
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
	
}
//_id
// City_id
// City
// long
// lat
// Reports / Crimes [
// 	_crime_description1,
// _crime_description2,
// ...
// ]

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
                    // .then(function(result){
                    //     console.log(result);
                    //     res.status(201).json({
                    //         message: 'User created'
                    //     });
                    // })
                    // .catch(function(err){
                    //     console.log(err);
                    //     res.status(500).json({
                    //         error: err
                    //     });
                    // });
//                 }
//             });
//         }
//     });
// }

