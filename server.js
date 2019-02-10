// buit-ins
const path = require("path");

// external modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// app modules
const keys = require("./authentication/keys");
const SocketServer = require("./socketServer");

// Routes
const router = require("./routes");
const apiRoutes = require('./api/index');
const blogRoutes = require("./routes/blog");
<<<<<<< HEAD
const payment = require("./routes/payment");
=======
const nubiaRoute = require("./routes/nubia");
>>>>>>> 0c0fd84b276ab28c9826fcec1d47c7e027174f64
const portfolioRoutes = require("./routes/portfolio");

// initilaizations
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);

app.use(bodyParser.json()); // use bodyParser to parse json
app.use(bodyParser.urlencoded({ extended: false })); // use bodyParser to parse req body
app.use(express.static(path.join(__dirname, "home"))); // use a static resources

// routes
app.use("/", router); // index routes
<<<<<<< HEAD
app.use("/", portfolioRoutes); // blog routes
app.use(payment); // blog routes
=======
app.use("/api", apiRoutes); // API routes
>>>>>>> 0c0fd84b276ab28c9826fcec1d47c7e027174f64
app.use("/blog", blogRoutes); // blog routes
app.use("/", portfolioRoutes); // portfolio routes
app.use("/nubia", nubiaRoute); // nubia routes

app.set("view engine", "ejs"); // setup views engine
app.set("views", path.join(__dirname, "home")); // setup views dir

// get post and host form the env vars
const PORT = process.env.PORT || 2000;
const HOST = process.env.HOST || "127.0.0.1";

// global vars
app.use(function(req, res, next) {
  res.locals.postIdUrl = null;
  next();
});

// make the database connection.
mongoose.connect(keys.database.local, { useNewUrlParser: true }, () => {
  console.log("Opened a new connection..");
});

// start the socket server;
SocketServer(io);

// start listening on the configured (port, host);
server.listen(PORT, HOST, () => {
  console.log(
    `To launch this app take this link http://${HOST}:${PORT}/ in the browser`
  );
});
