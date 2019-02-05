const models = require("../models/models");
const router = require("express").Router();

router.get("/portfolio", (req, res) => {
  models.template.find().exec((err, callback) => {
    res.render("portfolio", { title: "Protfolio", callback });
  });
});
