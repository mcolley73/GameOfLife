gameOfLifeApp.directive('golControls', ['$log', 'gameService', 'gameDataService', 'sampleWorldService', 'rulesService', function($log, gameService, gameDataService, sampleWorldService, rulesService){

	var controller = ['$log', '$scope', 'gameService', 'gameDataService', 'sampleWorldService', 'rulesService', function($log, $scope, gameService, gameDataService, sampleWorldService, rulesService){

		$scope.gameService = gameService;
		$scope.gameDataService = gameDataService;
		$scope.sampleWorldService = sampleWorldService;
		$scope.rulesService = rulesService;

		$scope.startGame = function(){
			gameService.startGame();
		};

		$scope.pauseGame = function(){
			gameService.stopGame();
		};

		$scope.stepGame = function(){
			gameService.stepGame();
		};

		$scope.previewGeneration = function(){
			gameService.previewGeneration();
		};
		$scope.removePreview = function(){
			gameService.removePreview();
		};

		$scope.newGame = function(){
			gameService.newGame();
		}

		$scope.clear = function(){
			gameService.clear();
			gameDataService.game.selectedSample = "";
		}

		$scope.pauseAndResume = function(){
			if(gameService.isRunning()){
				gameService.stopGame();
				gameService.startGame();
			}
		}

		$scope.rebuildWorld = function(){
			gameService.rebuild();
		}

		$scope.updateSampleWorld = function(){
			if(gameDataService.game.selectedSample == null || gameDataService.game.running){
				return;
			}
			gameService.createSample(gameDataService.game.selectedSample);
		}

		$scope.generateJson = function(){
			gameDataService.jsonData = gameService.generateJson();
			gameDataService.jsonViewerVisible = true;
		}

		$scope.gestationChange = function(){
    		$scope.pauseAndResume();
		}

		$scope.rulesChange = function(){
    		$scope.pauseAndResume();
		}

		$scope.undoIconClass = function(){
			if(gameDataService.game.running || gameDataService.game.selectedSample === ""){
				return 'disabled-font';
			}
			return '';
		}

	}];

	return {
		controller: controller,
		model: '=',
		templateUrl: '/GameOfLife/js/mcolley73/directives/controls/controls.html'
	};

}]);
