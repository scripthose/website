const models  = require('./models');

function findOne(model, constraints, callback) {
  models[model].findOne(constraints, callback);
}

function find(model, constraints, callback) {
  models[model].find(constraints, callback);
}

function deleteOne(model, constraints, callback) {
  models[model].deleteOne(constraints, callback);
}

function deleteMany(model, constraints, callback) {
  models[model].deleteMany(constraints, callback);
}

module.exports = {find, findOne, deleteOne, deleteMany};