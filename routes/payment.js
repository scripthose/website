const route = require("express").Router();
const models = require("../models/models");

route.get("/product_id=:id?", (req, res) => {
  models.nubiaProduct.findOne({ _id: req.params.id }).exec((err, callback) => {
    if (err) return console.log(err);

    res.render("checkout", { title: "checkout", callback });
  });
});

module.exports = route;
