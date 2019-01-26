const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// This model is made for blog posters
const postSchema = new Schema({
    postTitle: String,
    postPic: String,
    postDate: String,
    postEditor: String,
    postTopic: String,
    postSubTitle: String,
	subTitconstopic: String,
	comments: [{type: Schema.Types.ObjectId, ref: 'comment'}]
});


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

// this model is made for comments system
const commentSchema = new Schema({
	postHeader: {type: Schema.Types.ObjectId, ref: 'post'},
	commentName: String,
	commentMsg: String,
	commentEmail: String,
	commentDate: Date,
})

// nubia products schema 
const nubiaProductSchema = new Schema({
	prodName: String,
	prodPic: String,
	prodPrice: Number,
	prodDesc: String,
	prodLove: String
})

// create the schema on the database 
let Post = mongoose.model('post', postSchema);
let Scriptor = mongoose.model('scriptor', scriptorSchema);
let Comment = mongoose.model('comment', commentSchema);
let NubiaProduct = mongoose.model('nubiaProduct', nubiaProductSchema);

// let prod = {
// 	prodName: 'String',
// 	prodPic: 'http://localhost:2000/img/bg-img/46.png',
// 	prodPrice: 12,
// 	prodDesc: 'String',
// 	prodLove: 'String'
// }

// let postTest = {
// 	postTitle: 'Simple',
// 	postPic: 'http://localhost:2000/img/bg-img/46.png',
// 	postDate: new Date(Date.now()),
// 	postEditor: 'Yassen',
// 	postTopic: 'Test',
// 	postSubTitle: "simplicty is the greatest sophistication",
// 	subTitconstopic: "Unknown",
// 	comments: [] 
// }

// new nubiaProduct(prod).save().then((data) => console.log(data));
// new post(postTest).save().then((data) => console.log(data));


// exporting the models outside of the 
module.exports = {
	post: Post,
	scriptor: Scriptor,
	comment: Comment,
	nubiaProd: NubiaProduct
}





