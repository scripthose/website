const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Question = new Schema({
	title: String,
	body: String,
	tags: [{type: Schema.Types.ObjectId, ref:'tag'}],
	answers: [{type: Schema.Types.ObjectId, ref: 'answer'}],
	views: Number
});

const Tag = new Schema({
	title: String,
	questions: [{type: Schema.Types.ObjectId, ref: 'question'}]
});

const Answer = new Schema({
	question: {type: Schema.Types.ObjectId, ref: 'question'},
	body: String,
	votes: {total: Number, up: Number, down: Number},
	isCorrect: Boolean,
	views: Number
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
const tag = mongoose.model('tag', Tag);
const answer = mongoose.model('answer', Answer);
const question = mongoose.model('question', Question);
const scriptor = mongoose.model('scriptor', scriptorSchema);
const nubiaProduct = mongoose.model('nubiaProduct', nubiaProductSchema);


// let prod = {
// 	prodName: 'String',
// 	prodPic: 'http://localhost:2000/img/bg-img/46.png',
// 	prodPrice: 12,
// 	prodDesc: 'String',
// 	prodLove: 1
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
	scriptor,
	nubiaProduct,
	question,
	answer,
	tag
}





