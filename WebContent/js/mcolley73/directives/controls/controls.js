gameOfLifeApp.directive('golControls', ['$log', 'gameService', function($log, gameService){
	
	$log.info("golControls...");
	
	var controller = ['$log', '$scope', function($log, $scope){

		$scope.startGame = function(){
			$log.info("startGame()");
			gameService.startGame();
		};
		
		$scope.stopGame = function(){
			$log.info("stopGame()");
			gameService.stopGame();
		};
		
	}];
	
	$log.info("returning golControls.");
	
	return {
		controller: controller,
		model: '=',
		templateUrl: '/GameOfLife/js/mcolley73/directives/controls/controls.html'
	};
	
}]);