// Dependencies for web scrapping 
var request = require("request");
var cheerio = require("cheerio");

var express = require("express");
var router = express.Router();

var Article = require("../models/Articles.js");

router.get("/scrape", function(req, res) {
    request("http://www.npr.org/sections/technology/", function(error, response, html) {

        var $ = cheerio.load(html);
        var result = [];

        $("article.has-image").each(function(i, element) {
            var titleText = $(element).find('.item-info .title').text();
            var linkText = $(element).find('.item-info .title a').attr('href');
            var teaserText = $(element).find('.item-info .teaser').text();
            var imageSource = $(element).find('.item-image img').attr('src');

            // Save these results in an object that we'll push into the result array we defined earlier
            var article = new Article({
                title: titleText,
                link: linkText,
                teaser: teaserText,
                image: imageSource
            });

            article.save(function(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(data);
                }
            });
        });

        // Log the result once cheerio analyzes each of its selected elements
        console.log(result);
    });
});

// Export routes for server.js to use.
module.exports = router;