var nunjucks = require('nunjucks');

var express = require("express");

var projects = require("./example_data/projects_example.json").projects;

var explore = require("./example_data/explore_example.json").explore;

var food = require("./example_data/food_example.json").food;

var signature = require('./example_data/signature_example.json').signature;

var pages = require('./example_data/scrapbook_example.json').pages;

var timeline = require('./example_data/timeline_example.json').events;

var reasons = require('./example_data/reasons_example.json');


var siteconfig = require("./example_data/global_example.json");

var fs = require('fs');
var letter = fs.readFileSync("./example_data/letter_example.html");

var app = express();

app.use(express.static('public'));

app.use('/example_media', express.static('example_media'));


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
