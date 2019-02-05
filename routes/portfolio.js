const models = require("../models/models");
const router = require("express").Router();

router.get("/portfolio", (req, res) => {
  models.template.find().exec((err, callback) => {
    if (err) return console.error(err);
    res.render("portfolio", { title: "Protfolio", callback: callback });
    // console.log(callback);
  });
});

router.get("/portfolio/project/:id", (req, res) => {
  models.template.findOne({ _id: req.params.id }).exec((err, callback) => {
    if (err) return console.error(err);
    res.render("single-portfolio", { title: "Template", callback: callback });
    console.log(callback);
  });
});

// new models.template({
//   projectName: "New Template",
//   projectDescription: "New Template",
//   projectCategory: "Portfolio",
//   projectImage: "http://127.0.0.1:2000/img/bg-img/project4.png",
//   projectLink: "Download link"
// })
//   .save()
//   .then(callback => {
//     console.log(callback);
//   });

module.exports = router;
