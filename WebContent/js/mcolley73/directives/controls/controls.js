gameOfLifeApp.directive('golControls', ['$log', 'gameService', 'gameDataService', 'sampleWorldService', function($log, gameService, gameDataService, sampleWorldService){
	
	var controller = ['$log', '$scope', 'gameService', 'gameDataService', 'sampleWorldService', function($log, $scope, gameService, gameDataService, sampleWorldService){
		
		$scope.gameService = gameService;
		$scope.gameDataService = gameDataService;
		$scope.sampleWorldService = sampleWorldService;

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
		
		$scope.previewGeneration = function(){
			$log.info("previewGeneration()");
			gameService.previewGeneration();
		};
		$scope.removePreview = function(){
			$log.info("removePreview()");
			gameService.removePreview();
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
		
		$scope.updateSampleWorld = function(){
			$log.info("updateSampleWorld()");
			if(gameDataService.game.selectedSample == null){
				return;
			}
			gameService.createSample(gameDataService.game.selectedSample);
		}
		
		$scope.generateJson = function(){
			$log.info("generateJson()");
			gameService.generateJson();
		}
		
	}];
	
	return {
		controller: controller,
		model: '=',
		templateUrl: '/GameOfLife/js/mcolley73/directives/controls/controls.html'
	};
	
}]);