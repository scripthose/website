const mongoose = require("mongoose");

const { nubiaProduct, prodCategoryModal } = require("./nubiaProducts");

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

const nubiaProductCommentsSchema = new Schema({
  commentId: String,
  rate: { type: String, required: false },
  name: { type: String, required: true },
  RFR: { type: String, required: true },
  comment: { type: String, required: true }
});

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
const nubiaProdComment = mongoose.model(
  "nubiaProdComment",
  nubiaProductCommentsSchema
);

// exporting the models outside of the
module.exports = {
  nubiaProdComment,
  nubiaProduct,
  scriptor,
  prodCategory: prodCategoryModal,
  question,
  template,
  answer,
  tag
};
