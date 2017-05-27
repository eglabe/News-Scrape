// Dependencies for web scrapping 
var request = require("request");
var cheerio = require("cheerio");

var express = require("express");
var router = express.Router();

var Article = require("../models/Articles.js");
// var Comments = require(".models/Comments.js");
// var Users = require("./models/Users.js");

router.get("/home", function(req, res) {
    Article.find({}).exec(function(e, data) {
        var news = {
            dbArticles: data
        };
        console.log(news);
        res.render("index", news);
    });
});

router.get("/scrape", function(req, res) {
    request("http://www.npr.org/sections/technology/", function(error, response, html) {
        var $ = cheerio.load(html);

        $("article.has-image").each(function(i, element) {
            var titleText = $(element).find('.item-info .title').text();
            var linkText = $(element).find('.item-info .title a').attr('href');
            var teaserText = $(element).find('.item-info .teaser').text();
            var imageSource = $(element).find('.item-image img').attr('src');

            var article = new Article({
                title: titleText,
                link: linkText,
                teaser: teaserText,
                image: imageSource
            });

            Article.count({ 'link': linkText }, function(err, count) {
                if (count === 0) {
                    article.save(function(err, data) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(data);
                        }
                    });
                } else {
                    console.log("Article already exists in database");
                }
            });

        });

    });
});

router.post("/addComment", function(req, res) {

});

module.exports = router;