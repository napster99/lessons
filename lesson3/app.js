var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');

var app = express();

var netUrl = 'https://cnodejs.org/';

app.get('/',  function(req, res, next) {
  var q = req.query.q || netUrl;
  superagent.get(q)
  .end(function(err, sres) {
    if(err) {
      return next(err);
    }

    var $ = cheerio.load(sres.text);
    var items = [ ];
    $('#topic_list .topic_title').each(function(idx, element) {
      var $element = $(element);
      items.push({
        title : $element.attr('title'),
        href : $element.attr('href')
      });

    });

    res.send($element);

  });
});

app.listen(3000,  function() {
  console.log('app is listening at port 3000');
});