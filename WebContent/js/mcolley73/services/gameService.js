gameOfLifeApp.service('gameService', ['$log', '$interval', 'gameDataService', function($log, $interval, gameDataService){
	
	$log.info("gameService...");
	
	var gameService = {
		interval: null,
			
		startGame: function() {
			$log.info("service.startGame()");
			interval = $interval(function(){
				runRules();
			}, 1000, 0, true);
		},

		stopGame: function() {
			$log.info("service.stopGame()");
			if(interval != null){
				$interval.cancel(interval);
				interval = null;
			}
		}
	};
	
	function runRules(){
		$log.info("runRules()");
		var world = gameDataService.game.world;
		for(var i = 0; i < world.length; i++){
			for(var j = 0; j < world[i].length; j++){
				checkRules(i,j);
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
		
		if(world[row][column].alive){
			if(neighborCount < 2){
				// RULE 1
				world[row][column].alive = false;
			} else if (neighborCount > 3){
				// RULE 3
				world[row][column].alive = false;
			} else{
				// RULE 2
			}
		}else{
			if(neighborCount==3){
				// RULE 4
				world[row][column].alive = true;
			}
		}
	}
	
	function countNeighbors(row, column){
		var count = 0;
		count += checkNeighbor(row-1, column);
		count += checkNeighbor(row+1, column);
		count += checkNeighbor(row, column-1);
		count += checkNeighbor(row, column+1);
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
	
	$log.info("returning gameService.");
	
	return gameService;
	
}]);
