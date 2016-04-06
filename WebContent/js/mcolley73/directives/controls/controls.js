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
		
		$scope.stepGame = function(){
			$log.info("stepGame()");
			gameService.stepGame();
		};
		
		$scope.newGame = function(){
			$log.info("newGame()");
			gameService.newGame();
		}
		
		$scope.clear = function(){
			$log.info("clear()");
			gameService.clear();
		}
		
		$scope.pauseAndResume = function(){
			$log.info("pauseAndResume()");
			if(gameService.isRunning()){
				gameService.stopGame();
				gameService.startGame();
			}
		}
		
		$scope.rebuildWorld = function(){
			$log.info("rebuildWorld()");
			gameService.rebuild();
		}
		
	}];
	
	//$log.info("returning golControls.");
	
	return {
		controller: controller,
		model: '=',
		templateUrl: '/GameOfLife/js/mcolley73/directives/controls/controls.html'
	};
	
}]);