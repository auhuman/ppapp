
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

	this.conditions = function(){
		if(data)
			return data;
		//http://api.wunderground.com/api/011962152aba4089/conditions/q/CA/San_Francisco.json
		var options = {
			hostname:"api.wunderground.com",
			method:"GET",
			path:"/api/011962152aba4089/conditions/q/"+state+"/"+city+".json"
		};

		var req = http.request(options,function(response){
			response.setEncoding('utf8');
			response.on('data',function(data){
				console.log(data);
				return data;
			})
		});
	}
	
}

//factory function
module.exports = Weather;