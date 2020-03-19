const mongoose=require('mongoose');

const policeSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    city: {
        type: Number,
        required: true,
        default: 1
    },
    long: Number,
    lat: Number,
    phone_number: Number
});

module.exports=mongoose.model('Police', policeSchema);

// const mongoose=require('mongoose');
// // _id
// // City
// // long
// // lat
// // Reports / Crimes [
// // 	_crime_description1,
// // _crime_description2,
// // ...
// // ]

// const regionSchema=mongoose.Schema({
// 	_id: mongoose.Schema.Types.ObjectId,
// 	city: {
// 		type: String,
// 		required: true
// 	},
// 	long: Number,
// 	lat: Number,
// 	reports: String
    
// });

// module.exports=mongoose.model('Region', regionSchema);