const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// this model is made for script house users
const scriptorSchema = new Schema({
	scriptorName: String,
	scriptorPic: String,
	scriptorDescription: String,
	scriptorField: String,
	scriptorMediaLinks: {
		facebook: String,
		twitter: String,
		googlePlus: String,
		linkedIn: String
	}
})

// nubia products schema 
const nubiaProductSchema = new Schema({
	prodName: String,
	prodPic: String,
	prodPrice: Number,
	prodDesc: String,
	prodLove: Number,
	prodCat:{ type: String, require}, // product categories
	prodTags:{type: String}
})

// create the schema on the database
const scriptor = mongoose.model('scriptor', scriptorSchema);
const nubiaProduct = mongoose.model('nubiaProduct', nubiaProductSchema);

// exporting the models outside of the 
module.exports = {
	scriptor,
	nubiaProduct
}





