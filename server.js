var nunjucks = require('nunjucks');

var express = require("express");

var projects = require("./data/projects.json").projects;

var explore = require("./data/explore.json").explore;

var food = require("./data/food.json").food;

var signature = require('./data/signature.json').signature;

var pages = require('./data/scrapbook.json').pages;

var timeline = require('./data/timeline.json').events;

var reasons = require('./data/reasons.json');


var siteconfig = require("./data/global.json");

var fs = require('fs');
var letter = fs.readFileSync("./data/letter.html");

var app = express();

app.use(express.static('public'));

app.use('/media', express.static('media'));


nunjucks.configure('views', {
  autoescape: true,
  express: app
}).addGlobal("global", siteconfig);

app.get("/", function (req, res){
  res.render("index.njk", {
    letter: letter,
    signature: signature
  });
});

app.get("/scrapbook", function (req, res){
  res.render("scrapbook.njk", {
    pages: pages
  });
});

app.get("/timeline", function (req, res){
  res.render("timeline.njk", {
    events: timeline
  });
});

app.get("/reasons", function (req, res){
  res.render("reasons.njk", {
    reasons: reasons.why,
    intro: reasons.intro,
    pics: reasons.pics
  });
});

app.get("/future", function (req, res){
  res.render("future.njk");
});

app.get("/food", function (req, res){
  res.render("list.njk", {
    title: "Food to Try",
    list: food,
    image: "assets/images/vegan_food.jpg"
  });
});

app.get("/explore", function (req, res){
  res.render("list.njk", {
    title: "Places to Explore",
    list: explore,
    image: "assets/images/philly_skyline.jpg"
  });
});

app.get("/projects", function (req, res){
  res.render("list.njk", {
    title: "Projects to Do",
    list: projects,
    image: "assets/images/projects.jpg"
  });
});

app.listen(3000);
