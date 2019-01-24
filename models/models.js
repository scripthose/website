const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// This model is made for blog posters
let postSchema = new Schema({
    postTitle: String,
    postPic: String,
    postDate: Date,
    postEditor: String,
    postTopic: String,
    postSubTitle: String,
    subTitleTopic: String
});


// this model is made for script house users
let scriptorSchema = new Schema({
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

// this model is made for comments system
let commentSchema = new Schema({
	postHeader: {type: Schema.Types.ObjectId, ref: 'post'},
	commentName: String,
	commentMsg: String,
	commentEmail: String,
	commentDate: Date,
})

// nubia products schema 
let nubiaProductSchema = new Schema({
	prodName: String,
	prodPic: String,
	prodPrice: Number,
	prodDesc: String,
	prodLove: String
})

// create the schema on the database 
const post = mongoose.model('post', postSchema);
const scriptor = mongoose.model('scriptor', scriptorSchema);
const comment = mongoose.model('comment', commentSchema);
const nubiaProduct = mongoose.model('nubiaProduct', nubiaProductSchema);


// exporting the models outside of the 
module.exports = {
	post,
	scriptor,
	comment,
	nubiaProduct
}





