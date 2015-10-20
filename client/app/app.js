var app = angular.module("weatherApp",[]);

app.controller("weatherCtrl", function($scope, $http) {
	$scope.submitLoc = function() {
		$http.get('/api/weather/' + $scope.location)
		.success(function(data) {
			$scope.weather = data;
		})
		.error(function(data, status, headers, config) {
	      console.log(status);
	    });		
	};

});

