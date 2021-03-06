const models = require("../models/models");
const router = require("express").Router();

router.get("/", (req, res) => {
  models.template.find().exec((err, callback) => {
    if (err) return console.error(err);
    res.render("portfolio", { title: "Protfolio", callback: callback });
    // console.log(callback);
  });
});

router.get("/project/:id", (req, res) => {
  models.template.findOne({ _id: req.params.id }).exec((err, callback) => {
    if (err) return console.error(err);
    res.render("single-portfolio", { title: "Template", callback: callback });
    console.log(callback);
  });
});

// new models.template({
//   projectName: "Testing Template",
//   projectDescription: "This template is just for testing ",
//   projectCategory: "Portfolio",
//   projectImage: "http://127.0.0.1:2000/img/bg-img/project2.png",
//   projectLink: "Download link"
// })
//   .save()
//   .then(callback => {
//     console.log(callback);
//   });

module.exports = router;
