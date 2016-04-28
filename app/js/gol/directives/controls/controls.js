gameOfLifeApp.directive('golControls', ['$log', 'gameService', 'gameDataService', 'sampleWorldService', 'rulesService', 'exportService', function($log, gameService, gameDataService, sampleWorldService, rulesService, exportService){

	var controller = ['$log', '$scope', 'gameService', 'gameDataService', 'sampleWorldService', 'rulesService', 'exportService', function($log, $scope, gameService, gameDataService, sampleWorldService, rulesService, exportService){

		$scope.gameService = gameService;
		$scope.gameDataService = gameDataService;
		$scope.sampleWorldService = sampleWorldService;
		$scope.rulesService = rulesService;
		$scope.exportService = exportService;

		$scope.help = {
			rulesVisible: false
		};

		$scope.startGame = function(){
			gameService.startGame();
			gameDataService.exportViewerVisible = false;
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
			if(gameDataService.exportViewerVisible){
				exportService.generateExportData(gameDataService.game.world, rulesService.effectiveRules);
			}
		}

		$scope.clear = function(){
			gameService.clear();
			gameDataService.game.selectedSample = "";
			gameDataService.exportViewerVisible = false;
		}

		$scope.pauseAndResume = function(){
			if(gameService.isRunning()){
				gameService.stopGame();
				gameService.startGame();
				gameDataService.exportViewerVisible = false;
			}
		}

		$scope.rebuildWorld = function(){
			gameService.rebuild();
			gameDataService.exportViewerVisible = false;
		}

		$scope.updateSampleWorld = function(){
			if(gameDataService.game.selectedSample == null || gameDataService.game.running){
				return;
			}
			gameService.createSample(gameDataService.game.selectedSample);
			if(gameDataService.exportViewerVisible){
				exportService.generateExportData(gameDataService.game.world, rulesService.effectiveRules);
			}
		}

		$scope.export = function(){
			exportService.generateExportData(gameDataService.game.world, rulesService.effectiveRules);
			gameDataService.exportViewerVisible = true;
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
		templateUrl: '/GameOfLife/app/js/gol/directives/controls/controls.html'
	};

}]);
