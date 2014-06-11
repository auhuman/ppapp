var express = require('express');
var async = require('async');
var router = express.Router();

/* GET home page. */
var wm = require("../weather_module");


router.get('/wm', function(req, res) {
	var url = require('url');
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;

	var state = query["state"];
	var city = query["city"];

	//default
	var datas = [
					{"state":"CA","city":"Campbell"},
					{"state":"NE","city":"Omaha"},
					{"state":"TX","city":"Austin"},
					{"state":"MD","city":"Timonium"}
				];

	if(state && city){
		datas = [{"state":state,"city":city}];
	}

	//build dynamic functions
	var funcs = new Array();
	for(var i=0; i<datas.length; i++){
		funcs.push(function(cb){
			var dw = wm(datas[i++]);
			dw.conditions(cb);
		});
	}
	i=0;

	//build reponse
	async.parallel(
		funcs,function(err,results){
		res.json(results);
	});
});

router.get('/list', function(req, res) {
	var url = require('url');
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;

	var state = query["state"];
	var city = query["city"];

	//default
	var datas = [
					{"state":"CA","city":"Campbell"},
					{"state":"NE","city":"Omaha"},
					{"state":"TX","city":"Austin"},
					{"state":"MD","city":"Timonium"}
				];

	if(state && city){
		datas = [{"state":state,"city":city}];
	}

	//build dynamic functions
	var funcs = new Array();
	for(var i=0; i<datas.length; i++){
		funcs.push(function(cb){
			var dw = wm(datas[i++]);
			dw.conditions(cb);
		});
	}
	i=0;

	//build reponse
	async.parallel(
		funcs,function(err,results){
		res.render('list',{title:"Weather Report",ws:results})
	});
});

module.exports = router;
