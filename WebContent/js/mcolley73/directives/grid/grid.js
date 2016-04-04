gameOfLifeApp.directive('golGrid', ['$log', function($log){
	
	$log.info("golGrid...");
	
	var controller = ['$scope', '$log', function($scope, $log){
		
		$scope.toggleCell = function(event, cell){
			//$log.info(event);
			cell.alive = !cell.alive;
		};
		
	}];

	$log.info("returning golGrid.");
	
	return {
		controller: controller,
		model: '=',
		templateUrl: '/GameOfLife/js/mcolley73/directives/grid/grid.html'
	};
	
}]);