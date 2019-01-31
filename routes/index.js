const models = require("../models/models");

const router = require("express").Router();

router.get("", (req, res) => {
  res.render("index", { title: "" });
});

router.get("home", (req, res) => {
  res.render("index", { title: "Home" });
});

router.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

router.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact" });
});

router.get("/portfolio", (req, res) => {
  res.render("portfolio", { title: "Protfolio" });
});

router.get("/cart", (req, res) => {
  res.render("cart", { title: "Cart" });
});

router.get("/portfolio/project", (req, res) => {
  res.render("single-portfolio", { title: "Protofolio" });
});

router.get("/nubia", (req, res) => {
  res.render("nubia-team", { title: "Nubia Team" });
});

router.get("/nubia/products", (req, res) => {
  res.render("nubia", { title: "Nubia Product" });
});

router.get("/checkout", (req, res) => {
  res.render("checkout", { title: "Checkout" });
});

// getting id param and load the data on the blog post
router.get("/nubia/products/product_number=:id", (req, res) => {
  global.shopIdUrl = req.params.id;

  models.nubiaProduct.findOne({ _id: shopIdUrl }, function(err, data) {
    if (err) return console.error(err);
    res.render("shop", {
      title: "Shop",
      prodName: data.prodName,
      prodPic: data.prodPic,
      prodPrice: data.prodPrice,
      prodDesc: data.prodDesc
    });
  });
});


module.exports = router;
