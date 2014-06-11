var city, state;
exports.setCity = function (cityVar){
	city = cityVar;
}
exports.setState = function(stateVar){
	state = stateVar;
}
exports.getCity = function (){
	return city;
}
exports.getState = function(){
	return state;
}
exports.toString = function(){
	return {
		"city":city,
		"state":state
	}
}