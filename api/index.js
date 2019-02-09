const express = require('express');
const models = require('../models/models');

const router = express.Router();

// Index Route
router.get('/', (req, res) => {
  res.json('API route');
});


// Nubia Products Routes
router.route(/nubiaProducts\/?$/)

    .get((req, res) => {
      models.nubiaProduct
        .find()
        .populate('prodCategory', 'name')
        .exec((err, data) => {
          if (err) res.json({Error: 500})
          res.json(data)
        });
    })

    .post((req, res) => {
      let body = req.body;
      if (!body.prodCategory) body.prodCategory = "";
      models.nubiaProduct.create(body, (err, prod) => {
        if (err) res.json({Error: 500})
        res.json(prod)
      })
    })

router.route('/nubiaProducts/:id')

    .get((req, res) => {
      let id = req.params.id;
      models.nubiaProduct.findById(id, (err, prod) => {
        if (err) res.json({Error: 404});
        res.json(prod);
      })
    })

    .patch((req, res) => {
      let id = req.params.id;
      let fields = req.body;
      models.nubiaProduct.findById(id, (err, prod) => {
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
      models.nubiaProduct.deleteOne({_id: id}, (err, deleted) => {
        if (err) res.json({Error: 500});
        res.json(deleted);
      });
    })

module.exports = router;
