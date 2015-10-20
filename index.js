var express = require('express');
var app = express();
var request = require('request');

var port = process.env.PORT || 3000;

app.get('/api/weather/:location', function(req,res) {

	var uri = "http://api.openweathermap.org/data/2.5/weather?zip=" + req.params.location + ",us&units=imperial&appid=7a7876c8bc664c64008cd5bbbb4440c6";
	request(uri, function(error, response, body) {
		var parsed = JSON.parse(body);
  		res.send(parsed);
	});

});

app.get('/', function(req,res) {
	res.send('Weather-api');
});

app.listen(port);