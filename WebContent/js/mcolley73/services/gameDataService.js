gameOfLifeApp.factory('gameDataService', ['$log', function($log){
	
	var width = 40;
	var height = 40;
	var world = createArray(width, height);
	var game = {
		world: world,
		generationCount: 0,
		running: false
	};
	
	function createArray(width, height){
		var arr = [];
		for(var i = 0; i < width; i++){
			arr[i] = [];
			for(var j = 0; j < height; j++){
				arr[i][j] = {
					alive: secretOfLife(),
					shouldChange: false
				}
			}
		}
		return arr;
	}
	
	function reset(){
		for(var i = 0; i < width; i++){
			for(var j = 0; j < height; j++){
				world[i][j].alive = secretOfLife();
				world[i][j].shouldChange = false;
			}
		}
		game.generationCount = 0;
	}
	
	function clear(){
		for(var i = 0; i < width; i++){
			for(var j = 0; j < height; j++){
				world[i][j].alive = false;
				world[i][j].shouldChange = false;
			}
		}
		game.generationCount = 0;
	}

	function secretOfLife(){
		return (Math.random() < .5);
	}
	
	return {
		game: game,
		reset: reset,
		clear: clear
	};
	
}]);