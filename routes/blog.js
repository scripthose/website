const models = require("../models/models");

const router = require("express").Router();

router.get("/questions/new/", (req, res) => {
  res.render("question-blog", { title: "new question" });
});
// the blog route
router.get("/", (req, res) => {
  models.question
    .find()
    .sort({ $natural: -1 })
    .exec((err, questions) => {
      if (err) {
        console.error(err);
        res.status(500).send("500: Server Error " + err);
      }
      res.render("blog", { title: "Blog", questions });
    });
});
// the questions route
router
  .route("/questions/")
  // get all questions
  .get((req, res) => {
    models.question
      .find({})
      .populate(["answers", "tags"])
      .exec((err, questions) => {
        if (err) {
          console.error(err);
          res.status(500).send("500: Server Error");
        }
        res.render("blog", { title: "Questions", questions });
      });
  })
  // post new question
  .post((req, res) => {
    res.render("question", { title: "Forum" });
  });

// question details
router.get("/questions/:id", (req, res) => {
  let id = req.params.id;
  models.question
    .findOne({ _id: id })
    .populate(["answers", "tags"])
    .exec((err, q) => {
      if (err) {
        res.status(500).send("500: Server Error ");
      }
      res.render("question", { title: q.title, q });
    });
});

module.exports = router;
