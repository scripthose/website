const models = require("../models/models");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("nubia-team", { title: "Nubia Team" });
});

// send the products limit show the best sells
router.get("/products", (req, res, next) => {
  models.nubiaProduct
    .find()
    .limit(4)
    .sort({ $natural: -1 })
    .exec((err, bestSells) => {
      if (err) return console.error(err);
      // console.log(bestSells[0].prodName);
      res.render("nubia", {
        title: "Nubia Product",
        bestSells: bestSells
      });
    });
  next();
});

// getting id param and load the data on the blog post
router.get("/products/product_number=:id", (req, res) => {
  let shopIdUrl = req.params.id;

  models.nubiaProduct.findOne({ _id: shopIdUrl }, function(err, data) {
    if (err) return console.error(err);
    res.render("shop", {
      title: "Shop",
      data: data
    });
  });
});

module.exports = router;
