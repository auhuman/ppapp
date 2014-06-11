var express = require('express');
var router = express.Router();

/* GET home page. */
var wm = require("../weather_module");

var w1 = wm({"state":"CA","city":"San Francisco"});
var w2 = wm({"state":"CA","city":"San Ramon"});

router.get('/w1', function(req, res) {
  res.json(w1);
});

router.get('/w2', function(req, res) {
  res.json(w2);
});

router.get('/wm', function(req, res) {
	var url = require('url');
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;

	var state = query["state"];
	var city = query["city"];
	var dw = wm([{"state":state,"city":city}]);
	dw.conditions(res);
});

router.get('/list', function(req, res) {
	var url = require('url');
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;

	var state = query["state"];
	var city = query["city"];
	var dw = wm({"state":state,"city":city});
	dw.conditionsRender(res);
});

module.exports = router;
