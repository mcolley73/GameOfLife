gameOfLifeApp.service('gameService', ['$log', '$interval', 'gameDataService', function($log, $interval, gameDataService){
	
	$log.info("gameService received gameDataService with world of size " + gameDataService.game.world.length + "x" + gameDataService.game.world[0].length);
	
	var gameService = {
		interval: null,
		
		isRunning: function() {
			return gameDataService.game.running;
		},
			
		startGame: function() {
			$log.info("gameService.startGame()");
			$log.info("game was running? " + gameDataService.game.running);
			gameDataService.game.running = true;
			interval = $interval(function(){
				runRules();
			}, 1000, 0, true);
		},

		stopGame: function() {
			$log.info("gameService.stopGame()");
			$log.info("game was running? " + gameDataService.game.running);
			gameDataService.game.running = false;
			if(interval != null){
				$interval.cancel(interval);
				interval = null;
			}
		},
		
		newGame: function() {
			$log.info("gameService.newGame()");
			this.stopGame();
			gameDataService.reset();
		}
	};
	
	function runRules(){
		//$log.info("runRules()");
		var world = gameDataService.game.world;
		var changed = 0;
		for(var i = 0; i < world.length; i++){
			for(var j = 0; j < world[i].length; j++){
				changed += checkRules(i,j);
			}
		}
		gameDataService.game.generationCount++;
		if(changed==0){
			$log.info("No changes in generation " + gameDataService.game.generationCount + ".")
			gameService.stopGame();
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
		
		var changed = 0;
		if(world[row][column].alive){
			if(neighborCount < 2){
				// RULE 1
				world[row][column].alive = false;
				changed++;
			} else if (neighborCount > 3){
				// RULE 3
				world[row][column].alive = false;
				changed++;
			} else{
				// RULE 2
			}
		}else{
			if(neighborCount==3){
				// RULE 4
				world[row][column].alive = true;
				changed++;
			}
		}
		return changed;
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
