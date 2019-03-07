let dbKeys = {
  dbURI:"mongodb://Parser:slow5ge2loris@ds255364.mlab.com:55364/bitcoinlove_chat_app",
  // "mongodb://Parser:slow5ge2loris@ds255364.mlab.com:55364/bitcoinlove_chat_app"
  // mongodb://Elsiddig:slow5ge2loris@ds349175.mlab.com:49175/ware_house
  // a local database for developing and testing.
  local: "mongodb://127.0.0.1:27017/scriptHouse"
};

// exporting the database info outside
module.exports = {
  database: dbKeys
};
