// const mongoose=require('mongoose');
// const bcrypt=require('bcryptjs');
// const jwt=require('jsonwebtoken');

const Region=require('../models/region');
const push_notification=require('../helpers/push_notificatin');
let threshold_dist=1; // in km

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
    return threshold_dist>=dist;
    // return true;
}

exports.heart_beat=function(req, res, next){
    const city=1;           /* get your city here with any other api */
    let unsafe_flag=false;
    Region
    .find({city: city})
    .exec()
    .then(function(regions){
        regions.forEach(function(region){
            if(!unsafe_flag){
                unsafe_flag=_dist(region.long, region.lat, req.body.long, req.body.lat);
            }
            else{
                push_notification.notify({});
                // return ;
                return res.status(200).json({
                    message: 'unsafe',
                    subs_key: []        /* this will be empty */
                });
            }
        });
        // this means at none of the unsafe regions, the user is present, so safe
        if(!res.headersSent){
            res.status(200).json({
                message: 'safe',
                subs_key: []        /* this will be empty */
            });
        }
        else {
            res.status(200).json({
                message: 'unsafe',
                subs_key: []        /* this will be empty */
            });
        }
        return res;
    });
    /* 
    get the place / city from the req.long and lat
    then query the regions db for that city
    iterate through each co-ordinate and calculate if its within threshold
    if any of it is in thershold, report unsafe
    */
}