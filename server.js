// buit-ins
const path = require('path');

// external modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// app modules
const keys = require('./authentication/keys');
const router = require('./routing/route');

// initilaizations
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);


app.use(router.getPages); // use the external router file 
// use body parser to help catching data inbetween clients and server 
app.use(bodyParser.json()); // use bodyParser to parse json
app.use(bodyParser.urlencoded({extended: false})); // use bodyParser to parse req body
app.use(express.static(path.join(__dirname, 'home'))); // use a static resources
 
app.set('view engine', 'ejs'); // setup views engine
app.set('views', path.join(__dirname, 'home')) // setup views dir

const PORT = process.env.PORT || 2000;
const HOST = process.env.HOST || '127.0.0.1';

server.listen(PORT, HOST, () => {
    console.log(`To launch this app take this link http://${HOST}:${PORT}/ in the browser`)
})


// global vars
app.use(function(req, res, next){
    res.locals.postIdUrl = null;
    next();
})

// make the database connection.
mongoose.connect(keys.database.local, {useNewUrlParser: true}, () => {
    console.log('Opened a new connection..');
})

SocketServer(io, app);
