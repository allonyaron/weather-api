var express = require('express');
var app = express();
var request = require('request');

var port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/client"));

app.get('/api/weather/:location', function(req,res) {
	//use open weather map api with city name
	var uri = "http://api.openweathermap.org/data/2.5/weather?q=" + req.params.location + ",us&units=imperial&appid=7a7876c8bc664c64008cd5bbbb4440c6";
	request(uri, function(error, response, body) {
		if(error) {
			console.log(error);
		} else {
			var parsed = JSON.parse(body);
	  		res.json(parsed);	
		}
	});

});

app.get('/', function(req,res) {
	res.sendFile(__dirname + '/index.html');
});

app.listen(port);