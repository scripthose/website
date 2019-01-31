const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Question = new Schema({
	title: String,
	body: String,
	tags: [{type: Schema.Types.ObjectId, ref:'tags'}],
	answers: [{type: Schema.Types.ObjectId, ref: 'answers'}],
	views: Number
});

const Tag = new Schema({
	title: String,
	questions: [{type: Schema.Types.ObjectId, ref: 'questions'}]
});

const Answer = new Schema({
	question: {type: Schema.Types.ObjectId, ref: 'questions'},
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
const tag = mongoose.model('tags', Tag);
const answer = mongoose.model('answers', Answer);
const question = mongoose.model('questions', Question);
const scriptor = mongoose.model('scriptors', scriptorSchema);
const nubiaProduct = mongoose.model('nubiaProducts', nubiaProductSchema);


// let prod = {
// 	prodName: 'String',
// 	prodPic: 'http://localhost:2000/img/bg-img/46.png',
// 	prodPrice: 12,
// 	prodDesc: 'String',
// 	prodLove: 1
// }

// let q = {
// 	title: 'Question',
// 	body: 'test data',
// 	tags: [],
// 	answers: [],
// 	views: 1
// }

// let ans = {
// 	question: null,
// 	body: 'Answer',
// 	votes: {total: 12, up: 9, down: 3},
// 	isCorrect: true,
// 	views: 20
// }

// let t = {
// 	title: "test",
// 	questions: []
// }

// new nubiaProduct(prod).save().then((data) => console.log(data));
// new question(q).save().then((data) => console.log(data));
// new answer(ans).save().then((data) => console.log(data));
// new tag(t).save().then((data) => console.log(data));

// exporting the models outside of the 
module.exports = {
	scriptor,
	nubiaProduct,
	question,
	answer,
	tag
}





