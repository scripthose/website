const express = require('express');
const models = require('../models/models');

const nubiaProduct = require('./nubiaProduct');

const router = express.Router();

// Index Route
router.get('/', (req, res) => {
  res.json('API route');
});

// nubiaProduct Routs
nubiaProduct(router, models);

module.exports = router;
