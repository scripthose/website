function prodCategory(router, prodCategory) {

  router.route(/categories\/?/)

    .get((req, res) => {
      prodCategory.find()
        .populate('products')
        .exec((err, categories) => {
          if (err) return res.json(err);
          res.json(categories);
        })
    })

    .post((req, res) => {
      let name = req.body.name;
      prodCategory.create({name, products: []}, (err, category) => {
        if (err) return res.json(err);
        res.json(category);
      })
    });

  router.route('/categories/:id')

    .get((req, res) => {
      let id = req.params.id;
      prodCategory.findById(id)
        .populate('products')
        .exec((err, category) => {
          if (err) return res.json(err);
          res.json(category);
        });
    })

    .delete((req, res) => {
      let id = req.params.id;
      prodCategory.deleteOne({_id: id}, (err, aknowledge) => {
        if (err) return res.json(err);
        res.json(aknowledge);
      })
    })

}

module.exports = prodCategory;