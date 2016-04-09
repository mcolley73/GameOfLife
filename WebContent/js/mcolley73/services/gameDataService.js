'use strict';

gameOfLifeApp.factory('gameDataService', ['$log', 'sampleWorldService', function($log, sampleWorldService){
	
	//$log.info($location.search());
	
	//$log.info(queryStringService.getParam('height'));
	//$log.info(queryStringService.getParam('width'));
	
	var width = 60; // (queryStringService.getParam('width') || 20);
	var height = 35; // (queryStringService.getParam('height') || 20);
//	var width = 60; // (queryStringService.getParam('width') || 20);
//	var height = 10; // (queryStringService.getParam('height') || 20);
	
	var gestation = 400;
	var gestationOptions = [50,100,150,200,250,300,350,400,450,500,600,700,800,900,1000,1100,1250,1500,1750,2000,3000,4000,5000];
	
	var oddsOfLife = .35;
	
	var showRecentDeath = false;
	
	var game = {
		gestation: gestation,
		oddsOfLife: oddsOfLife,
		generationCount: 0,
		running: false,
		previewing: false,
		gridlines: false,
		selectedSample: -1,
		dimensions: {
			height: height,
			width: width
		}
	};
	
	var world = createArray(width, height, true);
	
	//var world = createArray(width, height, false);
	//applyArray(sampleWorldService.getSamples()[1], world);
	
	game.world = world;
	
	function createArray(width, height, andGenerate){
		var arr = [];
		for(var i = 0; i < height; i++){
			arr[i] = [];
			for(var j = 0; j < width; j++){
				arr[i][j] = {
					alive: (andGenerate ? secretOfLife() : false),
					shouldChange: false
				}
			}
		}
		return arr;
	}
	
	function createSample(sampleWorld){
		clear();
		var sampleCell;
		for(var i = 0; i < sampleWorld.livingCells.length; i++){
			sampleCell = sampleWorld.livingCells[i];
			game.world[sampleCell.y][sampleCell.x].alive = true;
			game.world[sampleCell.y][sampleCell.x].shouldChange = false;
		}
	}
	
	function generateSampleWorldJson(){
		var livingCells = [];
		var sampleWorld = {
			"livingCells": livingCells
		};
		for(var i = 0; i < height; i++){
			for(var j = 0; j < width; j++){
				if(world[i][j].alive){
					livingCells.push({"x":j, "y":i});
				}
			}
		}
		$log.info(JSON.stringify(sampleWorld));
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
				world[i][j].justDied = false;
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
		createSample: createSample,
		generateSampleWorldJson: generateSampleWorldJson,
		removePreviews: removePreviews,
		gestationOptions: gestationOptions,
		showRecentDeath: showRecentDeath
	};
	
}]);