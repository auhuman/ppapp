/*
	index2.js
	main1.js
*/
var _ = require("underscore");
var async = require("async");

Weather = function(){
	this.inputs = new Array();
	this.outputs = new Array();

	this.fill = function(params){
		if(_.isArray(params)){
			for(var i=0; i<params.length; i++){
				this.inputs.push(params[i]);
			}
		}
	};

	this.toString = function(){
		return this.values;
	};

	this.conditions = function(res){
		var http = require("http");
		var funcs = [];

		for(var i=0; i<this.inputs.length; i++){
			funcs.push(function(cb){
				var collect = "";
				var url = "http://api.wunderground.com/api/011962152aba4089/conditions/q/"+this.inputs[i].state+"/"+this.input[i].city+".json";
				http.get(url, function(resp) {
				  resp.setEncoding('utf8');
				  resp.on('data', function (chunk) {
				  	collect += chunk;
				  });
				  resp.on("end",function(){
				  	var condition = JSON.parse(collect);
				    callback(false, condition.current_observation);
				  });
				}).on('error', function(e) {
				  console.log("conditions:"+e.message);
				  cb(true);
				  return;
				});
			});
		}

		async.parallel(funcs, function(err, results){
			if(err){
				console.log(err);
				res.send(500, "Server Error");
				return;
			}
			res.json(results);
		});
	};

	this.conditionsRender = function(res){
		console.log("Inside conditions");
		var collect = "";
		var http = require("http");
		var url = "http://api.wunderground.com/api/011962152aba4089/conditions/q/"+this.values.state+"/"+this.values.city+".json";
		http.get(url, function(resp) {
		  resp.setEncoding('utf8');
		  resp.on('data', function (chunk) {
		  	collect += chunk;
		  });
		  resp.on("end",function(){
		  	var condition = JSON.parse(collect);
		    return res.render('list',{title:"List",ws:[condition.current_observation]});
		  });
		}).on('error', function(e) {
		  return res.json(e.message);
		});
	};
	
}

//factory function
module.exports = function(info){
	var instance =  new Weather();
	instance.fill(info);
	return instance;
}