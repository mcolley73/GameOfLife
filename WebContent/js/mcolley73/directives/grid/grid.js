gameOfLifeApp.directive('golGrid', ['$log', 'gameDataService', function($log, gameDataService){
	
	//$log.info("golGrid received gameDataService with world of size " + gameDataService.game.world.length + "x" + gameDataService.game.world[0].length);
	
	var controller = ['$scope', '$log', 'gameDataService', function($scope, $log, gameDataService){
		
		$scope.gameDataService = gameDataService;
		
		$scope.toggleCell = function(event, cell){
			//$log.info(event);
			cell.alive = !cell.alive;
		};
		
	}];

	//$log.info("returning golGrid.");
	
	return {
		controller: controller,
		model: '=',
		templateUrl: '/GameOfLife/js/mcolley73/directives/grid/grid.html'
	};
	
}]);