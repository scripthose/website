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

router.get("/cart", (req, res) => {
  res.render("cart", { title: "Cart" });
});

router.get("/checkout", (req, res) => {
  res.render("checkout", { title: "Checkout" });
});

module.exports = router;
