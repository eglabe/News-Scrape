// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var Promise = require("bluebird");


// Models
// var Articles = require("./models/Articles.js");
// var Comments = require(".models/Comments.js");
// var Users = require("./models/Users.js");

// Initialize Express
var app = express();

// Use Morgan and Body Parser
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
    extended: false
}));

// Make static files public
// app.use(express.static("public"));

// Database configuration with Mongoose
mongoose.connect("mongodb://localhost/newsdb");
var db = mongoose.connection;

db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});

db.once("open", function() {
    console.log("Mongoose connection successful.");
});

// Listen on port 3000
app.listen(3000, function() {
    console.log("App running on port 3000.");
});