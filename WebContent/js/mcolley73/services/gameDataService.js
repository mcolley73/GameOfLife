gameOfLifeApp.factory('gameDataService', ['$log', function($log){
	
	var width = 20;
	var height = 20;
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
					alive: secretOfLife()
				}
			}
		}
		return arr;
	}
	
	function reset(){
		for(var i = 0; i < width; i++){
			for(var j = 0; j < height; j++){
				world[i][j].alive = secretOfLife();
			}
		}
		game.generationCount = 0;
	}

	function secretOfLife(){
		return (Math.random() < .5);
	}
	
	return {
		game: game,
		reset: reset
	};
	
}]);