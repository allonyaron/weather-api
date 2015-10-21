var express = require('express');
var request = require('request');
var Promise = require('bluebird');

var weatherRouter = express.Router();

function requestPromise(url) {
    return new Promise(function (resolve, reject) {
        request({url:url}, function (err, res, body) {
            if (err) {
                return reject(err);
            } else if (res.statusCode !== 200) {
                err = new Error("Unexpected status code: " + res.statusCode);
                err.res = res;
                return reject(err);
            }
            resolve(body);
        });
    });
}

weatherRouter.route('/:location')
	.get(function(req,res) {
	//use open weather map api with city name
	var url = "http://api.openweathermap.org/data/2.5/weather?q=" + req.params.location + ",us&units=imperial&appid=7a7876c8bc664c64008cd5bbbb4440c6";
	var weatherObj = {};

	requestPromise(url)
	  .then(function (data) {
	  	jsonParse = JSON.parse(data);

	  	//filter data
	 	weatherObj = {
	 		city: jsonParse.name,
	 		country: jsonParse.sys.country,
	 		description: jsonParse.weather[0].description,
	 		temp: Math.round(jsonParse.main.temp),
	 		minTemp: Math.round(jsonParse.main.temp_min),
	 		maxTemp: Math.round(jsonParse.main.temp_max),
	 		icon: jsonParse.weather[0].icon
	 	};  	
	    return weatherObj;
	  })
	  .then(function (data) {
	  	res.json(data);
	  })
	  .catch(function (reason) {
	    console.error(reason);
	  });

});

module.exports = weatherRouter;