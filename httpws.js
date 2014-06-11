var http = require("http");
//http.get("http://www.google.com/index.html", function(res) {
http.get("http://api.wunderground.com/api/011962152aba4089/conditions/q/CA/San_Francisco.json", function(res) {
  console.log("Got response: " + res.statusCode);
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});