var app = angular.module("weatherApp",[]);

app.controller("weatherCtrl", function($scope, $http) {
	$scope.showWeatherValue = false;
	$scope.submitLoc = function() {
		$http.get('/api/weather/' + $scope.location)
		.success(function(data) {
			$scope.weather = data;
			$scope.showWeatherValue = true;
		})
		.error(function(data, status, headers, config) {
	      console.log(status);
	    });		
	};

});

