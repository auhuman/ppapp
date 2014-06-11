module.exports = function(info){
	var values = {
		state : null,
		city : null
	};

	for(var prop in values){
		values[prop] = info[prop];
	}

	var functions = {
		toString : function(){
			return values;
		}
	}
	return functions;
}