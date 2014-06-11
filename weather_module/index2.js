/*
	index2.js
	main1.js
*/
Weather = function(info){
	this.values = {
		state : null,
		city : null,
		data : null
	};

	this.fill = function(info){
		for(var prop in this.values){
			this.values[prop] = info[prop];
		}
	}

	this.toString = function(){
		return this.values;
	};

	this.conditions = function(res){
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
		    return res.json(condition.current_observation);
		  });
		}).on('error', function(e) {
		  return res.json(e.message);
		});
	}

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
	}
	
}

//factory function
module.exports = function(info){
	var instance =  new Weather();
	instance.fill(info);
	return instance;
}