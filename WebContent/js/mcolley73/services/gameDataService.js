'use strict';

gameOfLifeApp.factory('gameDataService', ['$log', function($log){
	
	//$log.info($location.search());
	
	//$log.info(queryStringService.getParam('height'));
	//$log.info(queryStringService.getParam('width'));
	
	var width = 60; // (queryStringService.getParam('width') || 20);
	var height = 36; // (queryStringService.getParam('height') || 20);
//	var width = 60; // (queryStringService.getParam('width') || 20);
//	var height = 10; // (queryStringService.getParam('height') || 20);
	
	var gestation = 400;
	var oddsOfLife = .35;
	
	var game = {
		gestation: gestation,
		oddsOfLife: oddsOfLife,
		generationCount: 0,
		running: false,
		previewing: false,
		dimensions: {
			height: height,
			width: width
		}
	};
	var world = createArray(width, height);
	game.world = world;
	
	function createArray(width, height){
		var arr = [];
		for(var i = 0; i < height; i++){
			arr[i] = [];
			for(var j = 0; j < width; j++){
				arr[i][j] = {
					alive: secretOfLife(),
					shouldChange: false
				}
			}
		}
		return arr;
	}
	
	function reset(){
		for(var i = 0; i < height; i++){
			for(var j = 0; j < width; j++){
				world[i][j].alive = secretOfLife();
				world[i][j].shouldChange = false;
				world[i][j].preview = false;
			}
		}
		game.generationCount = 0;
	}
	
	function clear(){
		for(var i = 0; i < height; i++){
			for(var j = 0; j < width; j++){
				world[i][j].alive = false;
				world[i][j].shouldChange = false;
			}
		}
		game.generationCount = 0;
	}
	
	function removePreviews(){
		for(var i = 0; i < height; i++){
			for(var j = 0; j < width; j++){
				world[i][j].preview = false;
			}
		}
	}

	function secretOfLife(){
		return (Math.random() < game.oddsOfLife);
	}
	
	return {
		game: game,
		reset: reset,
		clear: clear,
		removePreviews: removePreviews
	};
	
}]);