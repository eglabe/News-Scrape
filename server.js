// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var Promise = require("bluebird");

var PORT = process.env.PORT || 3000;

// Models
// var Articles = require("./models/Articles.js");
// var Comments = require(".models/Comments.js");
// var Users = require("./models/Users.js");

// Initialize Express
var app = express();

// Use Morgan and Body Parser
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

// Make static files public
// app.use(express.static("public"));

// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Database configuration with Mongoose
mongoose.connect("mongodb://localhost/newsdb");
var db = mongoose.connection;

db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});

db.once("open", function() {
    console.log("Mongoose connection successful.");
});

// Listen on PORT
app.listen(PORT, function() {
    console.log("App running on port " + PORT);
});