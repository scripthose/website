const mongoose = require("mongoose");

const {
  nubiaProduct,
  prodCategoryModal
} = require('./nubiaProducts');

const Schema = mongoose.Schema;

const Question = new Schema({
  title: String,
  body: String,
  tags: [{ type: Schema.Types.ObjectId, ref: "tags" }],
  answers: [{ type: Schema.Types.ObjectId, ref: "answers" }],
  views: Number
});

const Tag = new Schema({
  title: String,
  questions: [{ type: Schema.Types.ObjectId, ref: "questions" }]
});

const Answer = new Schema({
  question: { type: Schema.Types.ObjectId, ref: "questions" },
  body: String,
  votes: { total: Number, up: Number, down: Number },
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
});

<<<<<<< HEAD
// nubia products schema
const nubiaProductSchema = new Schema({
  prodName: String,
  prodPic: String,
  prodPrice: Number,
  prodDesc: String,
  prodLove: Number,
  prodCategory: { type: String, required: true }, // product categories
  prodTags: { type: String }
});
const nubiaProductCommentsSchema = new Schema({
  commentId: String,
  rate: { type: String, required: false },
  name: { type: String, required: true },
  RFR: { type: String, required: true },
  comment: { type: String, required: true }
});

=======
>>>>>>> 0c0fd84b276ab28c9826fcec1d47c7e027174f64
// portfolio templates schema
const Template = new Schema({
  projectName: String,
  projectDescription: String,
  projectCategory: String,
  projectImage: String,
  projectLink: String
});

// create the schema on the database
const tag = mongoose.model("tags", Tag);
const answer = mongoose.model("answers", Answer);
const template = mongoose.model("template", Template);
const question = mongoose.model("questions", Question);
const scriptor = mongoose.model("scriptors", scriptorSchema);
<<<<<<< HEAD
const nubiaProduct = mongoose.model("nubiaProducts", nubiaProductSchema);
const nubiaProdComment = mongoose.model(
  "nubiaProdComment",
  nubiaProductCommentsSchema
);
=======
>>>>>>> 0c0fd84b276ab28c9826fcec1d47c7e027174f64

// exporting the models outside of the
module.exports = {
  nubiaProdComment,
  nubiaProduct,
<<<<<<< HEAD
  scriptor,
=======
  prodCategory: prodCategoryModal,
>>>>>>> 0c0fd84b276ab28c9826fcec1d47c7e027174f64
  question,
  template,
  answer,
  tag
};
