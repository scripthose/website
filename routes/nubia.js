const models = require("../models/models");
// const events = require("events");

const router = require("express").Router();

router.get("/", (req, res) => {
  models.nubiaProduct
    .find()
    .limit(4)
    .sort({ $natural: -1 })
    .exec((err, bestSells) => {
      if (err) return console.error(err);
      res.render("nubia-team", {
        title: "Nubia Team",
        bestSells: bestSells
      });
    });
});

// send the products limit show the best sells
router.get("/products", (req, res, next) => {
  models.nubiaProduct
    .find()
    .limit(4)
    .sort({ $natural: -1 })
    .exec((err, bestSells) => {
      if (err) return console.error(err);
      res.render("nubia", {
        title: "Nubia Product",
        bestSells: bestSells
      });
    });
});

// getting id param and load the data on the blog post
router.get("/products/product_id=:id", (req, res) => {
  let shopIdUrl = req.params.id;

  models.nubiaProduct.findOne({ _id: shopIdUrl }, function(err, data) {
    if (err) return console.error(err);
    models.nubiaProdComment
      .find({ commentId: shopIdUrl })
      .exec((err, getComments) => {
        if (err) return console.error(err);
        res.render("shop", {
          title: "Shop",
          data: data,
          callback: getComments
        });
        console.log(getComments.length);
      });
  });
});

router.post("/products/product_id=:id", (req, res) => {
  let obj = {
    name: req.body.nickname,
    RFR: req.body.RFR,
    comment: req.body.comment,
    rate: req.body.star
  };
  new models.nubiaProdComment({
    commentId: req.params.id,
    rate: obj.rate,
    name: obj.name,
    RFR: obj.RFR,
    comment: obj.comment
  })
    .save()
    .then(callback => {
      res.redirect("/nubia/products/product_id=" + req.params.id);
    });
});

module.exports = router;
