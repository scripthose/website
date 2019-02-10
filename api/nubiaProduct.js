function nubiaProduct(router, nubiaProduct) {

  // Nubia Products Routes
  router.route(/nubiaProducts\/?$/)

    .get((req, res) => {
      nubiaProduct
        .find()
        .populate('prodCategory', 'name')
        .exec((err, data) => {
          if (err) res.json({Error: 500})
          res.json(data)
        });
    })

    .post((req, res) => {
      let body = req.body;
      if (!body.prodCategory) body.prodCategory = "5c6028e83c046021940aa001";
      let prod = new nubiaProduct(body);
      prod.save().then((prod) => {
        res.json(prod);
      }).catch(err => console.error(err));
    })

  router.route('/nubiaProducts/:id')

    .get((req, res) => {
      let id = req.params.id;
      nubiaProduct
        .findById(id)
        .populate('prodCategory', 'name')
        .exec((err, prod) => {
          if (err) res.json({Error: 404});
          res.json(prod);
        })
    })

    .patch((req, res) => {
      let id = req.params.id;
      let fields = req.body;
      nubiaProduct.findById(id, (err, prod) => {
        if (err) return res.json({Error: 404});
        for (let key in fields) {
          if (prod[key]) {
            prod[key] = fields[key];
          }
        }
        prod.save().then((data) => {
          res.json(data);
        }).catch(console.error)
      });
    })

    .delete((req, res) => {
      let id = req.params.id;
      nubiaProduct.findOne({_id: id}, (err, doc) => {
        if (err) res.json({Error: 500});
        doc.remove((err, deleted) => {
          if (err) return res.json(err);
          res.json(deleted);
        });
      });
    })

}

module.exports = nubiaProduct;
