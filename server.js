// built-ins
const path = require('path');

// external modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// internal modules
const router = require('./routing/route');
const keys = require('./authentication/keys');

// initiations
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const SocketServer = require('./socketServer');

// make the database connection.
mongoose.connect(keys.database.local, {useNewUrlParser: true}, () => {
    console.log('connected to mongo db')
})

app.use(router.getPages); // use the external router file 
app.use(bodyParser.json()); // use bodyParser json middleware
app.use(bodyParser.urlencoded({extended: false})); // use bodyParser to parse the req body.
app.use(express.static(path.join(__dirname, 'home'))); // use a static resources


app.set('view engine', 'ejs'); // setup a view engine
app.set('views', path.join(__dirname, 'home')) // setup views dirs.

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 2000;

// global vars
app.use(function(req, res, next){
    res.locals.postIdUrl = null;
    next();
})

// start listing for socket connections
SocketServer(io, app);

// start the server..
server.listen(PORT, HOST, () => {
    console.log(`To launch this app take this link http://${HOST}:${PORT}/ in the browser`)
})
