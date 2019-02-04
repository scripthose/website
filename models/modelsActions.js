const models = require("./models");

function handleError(func) {
  return function(model, conditions, callback) {
    return new Promise((resolve, reject) => {
      if (callback) {
        resolve = callback;
        reject = callback;
      }
      try {
        func(model, conditions, resolve);
      } catch (e) {
        reject(e);
      }
    });
  };
}

function findOne(model, conditions, callback) {
  models[model].findOne(conditions, callback);
}

function find(model, conditions, callback) {
  models[model].find(conditions, callback);
}

function deleteOne(model, conditions, callback) {
  models[model].deleteOne(conditions, callback);
}

function deleteMany(model, conditions, callback) {
  models[model].deleteMany(conditions, callback);
}

module.exports = {
  find: handleError(find),
  findOne: handleError(findOne),
  deleteOne: handleError(deleteOne),
  deleteMany: handleError(deleteMany)
};
