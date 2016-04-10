gameOfLifeApp.service('gameService', ['$log', '$interval', 'gameDataService', function($log, $interval, gameDataService){
	
	$log.info("gameService received gameDataService with world of size " + gameDataService.game.world.length + "x" + gameDataService.game.world[0].length);
	
	var gameService = {
		interval: null,
		
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
		
		generateJson: function() {
			gameDataService.generateSampleWorldJson();
		}
		
	};
	
	function runRules(){
		var shouldChange = identifyChanges();
		applyChanges(shouldChange, true);
	}
	
	function previewRules(){
		var shouldChange = identifyChanges();
		applyChanges(shouldChange, false);
	}
	
	function identifyChanges(){
		var world = gameDataService.game.world;
		var shouldChange = 0;
		for(var i = 0; i < world.length; i++){
			for(var j = 0; j < world[i].length; j++){
				shouldChange += checkRules(i,j);
			}
		}
		return shouldChange;
	}
	
	function applyChanges(shouldChangeCount, commitChange){
		var world = gameDataService.game.world;
		if(commitChange){
			gameDataService.game.generationCount++;
		}
		if(shouldChangeCount==0){
			$log.info("No changes in generation " + gameDataService.game.generationCount + ".")
			gameService.stopGame();
		}else{
			for(var i = 0; i < world.length; i++){
				for(var j = 0; j < world[i].length; j++){
					var cell = world[i][j];
					applyCellChanges(commitChange, cell);
				}
			}	
		}		
	}
	
	function applyCellChanges(commitChange, cell){
		if(cell.shouldChange){
			commitChangeOrPreview(commitChange, cell);
		}else{
			handleNoChange(cell);
		}
	}
	
	function commitChangeOrPreview(commitChange, cell){
		if(commitChange){
			cell.alive = !cell.alive;
			if(!gameDataService.showRecentDeath || cell.alive){
				cell.beenDead = -1;
			}else{
				cell.beenDead = 1;
			}
//			else if(gameDataService.showRecentDeath && !cell.alive){
//				cell.beenDead = 1;
//			}else if(gameDataService.showRecentDeath && cell.alive){
//				cell.beenDead = -1;
//			}else{
//				//cell.justDied = false;
//			}
			cell.shouldChange = false;
		}else{
			cell.preview = true;
			//cell.justDied = false;
		}
	}
	
	function handleNoChange(cell){
		if(!gameDataService.showRecentDeath){
			cell.beenDead = -1;
		}else{
			if(!cell.alive && cell.beenDead > -1){
				cell.beenDead++;
			}
		}
	}
	
/**
	RULE 1 - Any live cell with fewer than two live neighbours dies, as if caused by under-population.
	RULE 2 - Any live cell with two or three live neighbours lives on to the next generation.
	RULE 3 - Any live cell with more than three live neighbours dies, as if by over-population.
	RULE 4 - Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
*/		
	
	function checkRules(row, column){
		var world = gameDataService.game.world;
		var neighborCount = countNeighbors(row, column);
		
		var shouldChange = 0;
		if(world[row][column].alive){
			if(neighborCount < 2){
				// RULE 1
				world[row][column].shouldChange = true;
				shouldChange++;
			} else if (neighborCount > 3){
				// RULE 3
				world[row][column].shouldChange = true;
				shouldChange++;
			} else{
				// RULE 2
			}
		}else{
			if(neighborCount==3){
				// RULE 4
				world[row][column].shouldChange = true;
				shouldChange++;
			}
		}
		return shouldChange;
	}
	
	function countNeighbors(row, column){
		var count = 0;
		count += checkNeighbor(row-1, column-1);
		count += checkNeighbor(row-1, column);
		count += checkNeighbor(row-1, column+1);
		
		count += checkNeighbor(row, column-1);
		count += checkNeighbor(row, column+1);

		count += checkNeighbor(row+1, column-1);
		count += checkNeighbor(row+1, column);
		count += checkNeighbor(row+1, column+1);
		return count;
	}
	
	function checkNeighbor(row, column){
		var world = gameDataService.game.world;
		var livingNeighbor = false;
		if(row < 0 || column < 0){
			// empty
		}else if (row >= world.length || column >= world[0].length){
			// empty
		}else{
			livingNeighbor = world[row][column].alive;
		}
		return livingNeighbor;
	}
	
	return gameService;
	
}]);
