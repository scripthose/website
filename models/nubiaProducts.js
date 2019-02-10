const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const prodCategory = new Schema({
  name: String,
  products: [{ type: Schema.Types.ObjectId, ref: "nubiaProducts" }]
});

// nubia products schema
const nubiaProductSchema = new Schema({
  prodName: String,
  prodPic: String,
  prodPrice: Number,
  prodDesc: String,
  prodLove: Number,
  prodCategory: { type: Schema.Types.ObjectId, ref: "prodCategory" }, // product categories
  prodTags: String
});

// database Middlewares
// pre save middleware to add the new post to the category
// this middleware function will be called whenever save() is triggerd on a nubiaProductSchema Doc
nubiaProductSchema.pre("save", function(next) {
  let prod = this;
  prodCategoryModal.findOne({ _id: prod.prodCategory }, (err, category) => {
    if (err) return next(err);
    let products = [...category.products, prod];
    prodCategoryModal.updateOne(
      { _id: category._id },
      { $set: { products } },
      (err, newcate) => {
        if (err) return next(err);
        next();
      }
    );
  });
});

// pre remove middleware to remove the post from the category
// this middleware function will be called whenever remove() is triggerd on a nubiaProductSchema Doc
nubiaProductSchema.pre("remove", function(next) {
  let prod = this;
  prodCategoryModal.findOne({ _id: prod.prodCategory }, (err, category) => {
    if (err) return console.error(err);
    let products = category.products.filter(
      product => product._id !== prod._id
    );
    prodCategoryModal.updateOne(
      { _id: category._id },
      { $set: { products } },
      (err, newcate) => {
        if (err) return console.error(err);
        next();
      }
    );
  });
});

const nubiaProducts = mongoose.model("nubiaProducts", nubiaProductSchema);
const prodCategoryModal = mongoose.model("prodCategory", prodCategory);

module.exports = {
  nubiaProducts,
  prodCategoryModal
};
