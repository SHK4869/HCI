const mongoose=require('mongoose');
// _id
// number_plate
// reviews [
// 	_id
// 	rating (1 to 5)
// 	review
// ]
// rating


const reviewSchema=mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	rating: {
		type: Number,
		required: true
	},
	review: {
		type: String
	}
});

const licenseSchema=mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	license_number: {
		type: String,
		required: true,
		unique: true
	},
	reviews: [{
		type: reviewSchema,
		required: true
	}]
});

module.exports= {
	license: mongoose.model('License', licenseSchema),
	review: mongoose.model('Review', reviewSchema)
}