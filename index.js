var express = require('express');
var app = express();
var request = require('request');
var weatherRouter = require('./app/routes/weather-router');
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/client'));

app.use('/api/weather', weatherRouter);

app.get('/', function(req,res) {
	res.sendFile(__dirname + '/index.html');
});

app.listen(port);