'use strict';

gameOfLifeApp.factory('gameDataService', ['$log', 'sampleWorldService', function($log, sampleWorldService){

	var width = 60; // (queryStringService.getParam('width') || 20);
	var height = 35; // (queryStringService.getParam('height') || 20);

	var gestation = 400;
	var gestationOptions = [50,100,150,200,250,300,350,400,450,500,600,700,800,900,1000,1100,1250,1500,1750,2000,3000,4000,5000];

	var oddsOfLife = .35;

	var showRecentDeath = false;

	var jsonData = '';
	var jsonViewerVisible = false;

	var colorSchemeOptions = [
	    {"class":"greens","name":"Green"},
	    {"class":"greens tracers","name":"Green Tracers"},
	    {"class":"reds","name":"Red"},
	    {"class":"reds tracers","name":"Red Tracers"},
			{"class":"oranges","name":"Orange"},
	    {"class":"oranges tracers","name":"Orange Tracers"},
	    {"class":"blues","name":"Blue"},
	    {"class":"blues tracers","name":"Blue Tracers"},
	    {"class":"purples","name":"Purple"},
	    {"class":"purples tracers","name":"Purple Tracers"},
	    {"class":"rainbow","name":"Rainbow"}
	];
	var colorScheme = colorSchemeOptions[0];

	var game = {
		gestation: gestation,
		oddsOfLife: oddsOfLife,
		generationCount: 0,
		running: false,
		previewing: false,
		gridlines: false,
		selectedSample: "",
		dimensions: {
			height: height,
			width: width
		}
	};

	var world = createArray(width, height, true);
	game.world = world;

	function createArray(width, height, andGenerate){
		var arr = [];
		for(var i = 0; i < height; i++){
			arr[i] = [];
			for(var j = 0; j < width; j++){
				arr[i][j] = {
					alive: (andGenerate ? secretOfLife() : false),
					shouldChange: false,
					beenDead: -1
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
			var cell = game.world[sampleCell.y][sampleCell.x];
			cell.alive = true;
			cell.shouldChange = false;
			cell.beenDead = -1;
		}
	}

	function generateSampleWorldJson(){
		var livingCells = [];
		var sampleWorld = {
			"name": "generated-"+new Date().getTime(),
			"height": world.length,
			"width": world[0].length,
			"livingCells": livingCells
		};
		for(var i = 0; i < height; i++){
			for(var j = 0; j < width; j++){
				if(world[i][j].alive){
					livingCells.push({"x":j, "y":i});
				}
			}
		}
		//$log.info(JSON.stringify(sampleWorld));

		return JSON.stringify(sampleWorld);
	}

	function reset(){
		for(var i = 0; i < height; i++){
			for(var j = 0; j < width; j++){
				var cell = world[i][j];
				cell.alive = secretOfLife();
				cell.shouldChange = false;
				cell.preview = false;
				cell.beenDead = -1;
			}
		}
		game.generationCount = 0;
	}

	function clear(){
		for(var i = 0; i < height; i++){
			for(var j = 0; j < width; j++){
				var cell = world[i][j];
				cell.alive = false;
				cell.shouldChange = false;
				cell.beenDead = -1;
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

		showRecentDeath: showRecentDeath,
		colorScheme: colorScheme,
		colorSchemeOptions: colorSchemeOptions,

		jsonData: jsonData,
		jsonViewerVisible: jsonViewerVisible
	};

}]);
