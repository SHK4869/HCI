const mongoose=require('mongoose');
// const bcrypt=require('bcryptjs');
// const jwt=require('jsonwebtoken');

const Hospital=require('../models/hospital');
//let threshold_dist=1; // in km

/*
Distance Calculation taken from - https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
*/
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI/180);
}

function _dist(x1, y1, x2, y2){
    console.log('x1; ', x1, ' x2 ', x2, ' y1 ', y1, ' y2 ', y2);
    const dist= getDistanceFromLatLonInKm(y1, x1, y2, x2);    // Math.sqrt( (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) );
    console.log('dist ', dist);
    return dist;
    // return true;
}

exports.get_nearest=function(req, res, next){
    const city=1;           /* get your city here with any other api */
    //let unsafe_flag=false;
    Hospital
    .find({city: city})
    .exec()
    .then(function(hospitals){
		let distance_min = 100;
		let min_hospital_data = {};
		//console.log(hospitals);
        hospitals.forEach(function(hospital){
			if (_dist(hospital.long, hospital.lat, req.body.long, req.body.lat) < distance_min){
				//console.log(_dist(hospital.long, hospital.lat, req.body.long, req.body.lat));
				//console.log(distance_min);
				distance_min  = _dist(hospital.long, hospital.lat, req.body.long, req.body.lat);
				min_hospital_data = hospital;
			}
        });
		
		//console.log(min_hospital_data);
		res.status(200).json({
			nearest_hospital: min_hospital_data,
			distance: distance_min
		});
        
	})
	.catch(function(err){
        console.log(err);
        res.status(500).json({error: err});
    });
};
	
exports.add_data=function(req, res, next){

	let hospital=new Hospital({
		_id: new mongoose.Types.ObjectId(),
		city: 1,
		long: req.body.long,
    	lat: req.body.lat,
    	phone_number: req.body.phone_number
	});
	hospital
	.save()
	.then(function(result){
		console.log(result);
		res.status(201).json({
			message: 'hospital created'
		});
	})
	.catch(function(err){
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
    /* 
    get the place / city from the req.long and lat
    then query the regions db for that city
    iterate through each co-ordinate and calculate if its within threshold
    if any of it is in thershold, report unsafe
    */
};



// let get_city_from_coordinates = function(lat, long){
//     const https = require('https');
//     const options = {
//     //http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&featureTypes=&location=72.856440,%2019.023317
//     hostname: 'geocode.arcgis.com',
//     port: 443,
//     path: '/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&featureTypes=&location='+lat+','+long,
//     method: 'GET',
//     json:true
//     }

//     const req = https.request(options, res => {
//         console.log(`statusCode: ${res.statusCode}`)
//         var temp = "";
//         res.on('data', d => {
//             temp+=d;
//             console.log(d);
//         });
//         res.on('end', function(){
//             var fbResponse = JSON.parse(temp);
//             console.log(fbResponse);
//             console.log("Got a response: ", fbResponse.address.City);
//         });
//     });

//     req.on('error', error => {
//         console.error(error)
//     });

//     req.end();
//     return fbResponse.address.City;
// }

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

