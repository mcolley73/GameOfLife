gameOfLifeApp.service('gameService', ['$log', '$interval', '$rootScope', 'gameDataService', 'scanningRulesDriverService', 'rulesService', 'exportService', function($log, $interval, $rootScope, gameDataService, scanningRulesDriverService, rulesService, exportService){

	$log.info("gameService received gameDataService with world of size " + gameDataService.game.world.length + "x" + gameDataService.game.world[0].length);

	var gameService = {
		interval: null,
		snapshot: null,

		isRunning: function() {
			return gameDataService.game.running;
		},

		startGame: function() {
			$log.info("gameService.startGame()");
			gameDataService.game.running = true;
			interval = $interval(function(){
				runRules();
			}, gameDataService.game.gestation, 0, true);
		},

		stopGame: function() {
			$log.info("gameService.stopGame()");
			if(!gameDataService.game.running){
				return;
			}
			gameDataService.game.running = false;
			if(interval!==undefined && interval != null){
				$interval.cancel(interval);
				interval = null;
			}
		},

		stepGame: function() {
			$log.info("gameService.stepGame()");
			if(gameDataService.game.running){
				return;
			}
			runRules();
		},

		previewGeneration: function() {
			$log.info("gameService.previewGeneration()");
			if(gameDataService.game.running){
				return;
			}
			previewRules();
			gameDataService.game.previewing = true;
		},
		removePreview: function() {
			$log.info("gameService.removePreview()");
			if(gameDataService.game.running){
				return;
			}
			gameDataService.removePreviews();
			gameDataService.game.previewing = false;
		},

		newGame: function() {
			$log.info("gameService.newGame()");
			this.stopGame();
			gameDataService.reset();
		},

		clear: function() {
			$log.info("gameService.clear()");
			this.stopGame();
			gameDataService.clear();
		},

		rebuild: function() {
			$log.info("gameService.clear()");
			this.stopGame();
			// TODO finish
		},

		createSample: function(sample) {
			$log.info("createSample(sample)");
			gameDataService.createSample(sample);
		},

		createSnapshot: function(){
			this.snapshot = {
				livingCells: exportService.getLivingCells(gameDataService.game.world)
			};
			gameDataService.hasSnapshot = true;
		},

		revertToSnapshot: function(){
			gameDataService.createSample(this.snapshot);
			gameDataService.hasSnapshot = false;
		}

	};

	function runRules(){
		scanningRulesDriverService.runRules();
		$rootScope.$broadcast('gol.tick');
	}

	function previewRules(){
		scanningRulesDriverService.runPreview();
	}

	$rootScope.$on('gol.game.stop', function () {
		gameService.stopGame();
  })

	return gameService;

}]);
