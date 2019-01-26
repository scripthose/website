let dbKeys = {
	dbURI: 'mongodb://Parser:slow5ge2loris@ds255364.mlab.com:55364/bitcoinlove_chat_app',
	// a local database for developing and testing.
	local: 'mongodb://127.0.0.1:27017/scriptHouse'
}


// exporting the database info outside 
module.exports = {
	database: dbKeys.dbURI
};