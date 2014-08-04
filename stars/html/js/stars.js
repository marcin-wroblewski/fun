
angular.module('stars', []).
	controller('StarsController', ['$scope', function($scope) {
		$scope.paper = Raphael(10, 50, 800, 600),

		$scope.drawCircle = function(radius) {
			$scope.paper.clear();
			var circle = $scope.paper.circle(400, 300, 2*radius);
    		circle.attr("fill", "#fff");
    		circle.attr("stroke", "#000");		
		},

		$scope.refresh = function() {
			$scope.drawCircle($scope.pointsCount);
		}
	}]);

