const models = require("../models/models");

const router = require("express").Router();

// the blog route
router.get("", (req, res) => {
  models.question.find({}).populate(['answers', 'tags']).exec((err, questions) => {
    if (err) {
      console.error(err);
      res.status(500).send('500: Server Error');
    }
    res.render("blog", { title: "Blog", questions });
  });
});

// the questions route
router.route("/questions/")
  // get all questions
  .get((req, res) => {
    models.question.find({}).populate(['answers', 'tags']).exec((err, questions) => {
      if (err) {
        console.error(err);
        res.status(500).send('500: Server Error');
      }
      res.render('blog', {title: 'Questions', questions})
    });
  })
  // post new question
  .post((req, res) => {
    res.render("question", { title: "Forum" });
  });

// question details
router.get('/questions/:id', (req, res) => {
  let id = req.params.id;
  models.question.findOne({_id: id}).populate(['answers', 'tags']).exec((err, q) => {
    if (err) {
      console.log(err);
      res.status(500).send("500: Server Error")
    }
    res.render('question', {title: q.title, q})
  })
})

router.get("/questions/new/", (req, res) => {
  res.render("question.blog.ejs", { title: "new question" });
});

module.exports = router;