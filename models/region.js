const mongoose=require('mongoose');

const regionSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    city: {
        type: Number,
        required: true,
        default: 1
    },
    long: Number,
    lat: Number,
    reports: [
        {
            type: String
        }
    ]
});

module.exports=mongoose.model('Region', regionSchema);

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