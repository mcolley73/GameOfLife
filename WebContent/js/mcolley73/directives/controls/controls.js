gameOfLifeApp.directive('golControls', ['$log', 'gameService', 'gameDataService', function($log, gameService, gameDataService){
	
	var controller = ['$log', '$scope', 'gameService', 'gameDataService', function($log, $scope, gameService, gameDataService){
		
		//$log.info(gameService);
		
		$scope.gameService = gameService;
		$scope.gameDataService = gameDataService;

		$scope.startGame = function(){
			$log.info("startGame()");
			gameService.startGame();
		};
		
		$scope.pauseGame = function(){
			$log.info("pauseGame()");
			gameService.stopGame();
		};
		
		$scope.newGame = function(){
			$log.info("newGame()");
			gameService.newGame();
		}
		
		$scope.clear = function(){
			$log.info("clear()");
			gameService.clear();
		}
		
	}];
	
	//$log.info("returning golControls.");
	
	return {
		controller: controller,
		model: '=',
		templateUrl: '/GameOfLife/js/mcolley73/directives/controls/controls.html'
	};
	
}]);