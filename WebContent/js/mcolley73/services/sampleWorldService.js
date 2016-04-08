gameOfLifeApp.factory('sampleWorldService', ['$log', function($log){

	var U = {
		"name": "U",
		"livingCells": [
			{"x":28,"y":14},
			{"x":28,"y":15},
			{"x":28,"y":16},
			{"x":29,"y":16},
			{"x":30,"y":16},
			{"x":30,"y":15},
			{"x":30,"y":14}
		]
	};
	
	var tallU = {
		"name": "Tall U",
		"livingCells": [
		    {"x":28,"y":12},
		    {"x":28,"y":13},
			{"x":28,"y":14},
			{"x":28,"y":15},
			{"x":28,"y":16},
			{"x":29,"y":16},
			{"x":30,"y":16},
			{"x":30,"y":15},
			{"x":30,"y":14},
			{"x":30,"y":13},
			{"x":30,"y":12}
		]
	};
	
	var bigEars = {"name": "Big Ears", "livingCells":[{"x":25,"y":12},{"x":33,"y":12},{"x":24,"y":13},{"x":25,"y":13},{"x":33,"y":13},{"x":34,"y":13},{"x":27,"y":14},{"x":31,"y":14},{"x":22,"y":15},{"x":23,"y":15},{"x":24,"y":15},{"x":25,"y":15},{"x":33,"y":15},{"x":34,"y":15},{"x":35,"y":15},{"x":36,"y":15},{"x":21,"y":16},{"x":22,"y":16},{"x":24,"y":16},{"x":25,"y":16},{"x":29,"y":16},{"x":33,"y":16},{"x":34,"y":16},{"x":36,"y":16},{"x":37,"y":16},{"x":22,"y":17},{"x":24,"y":17},{"x":25,"y":17},{"x":29,"y":17},{"x":33,"y":17},{"x":34,"y":17},{"x":36,"y":17},{"x":23,"y":18},{"x":24,"y":18},{"x":25,"y":18},{"x":29,"y":18},{"x":33,"y":18},{"x":34,"y":18},{"x":35,"y":18},{"x":24,"y":19},{"x":34,"y":19},{"x":28,"y":20},{"x":29,"y":20},{"x":30,"y":20},{"x":28,"y":21},{"x":29,"y":21},{"x":30,"y":21},{"x":29,"y":22}]};
	
	var flower = {"name": "Repeating Flower", "livingCells":[{"x":25,"y":9},{"x":26,"y":9},{"x":27,"y":9},{"x":31,"y":9},{"x":32,"y":9},{"x":33,"y":9},{"x":23,"y":11},{"x":28,"y":11},{"x":30,"y":11},{"x":35,"y":11},{"x":23,"y":12},{"x":28,"y":12},{"x":30,"y":12},{"x":35,"y":12},{"x":23,"y":13},{"x":28,"y":13},{"x":30,"y":13},{"x":35,"y":13},{"x":25,"y":14},{"x":26,"y":14},{"x":27,"y":14},{"x":31,"y":14},{"x":32,"y":14},{"x":33,"y":14},{"x":25,"y":16},{"x":26,"y":16},{"x":27,"y":16},{"x":31,"y":16},{"x":32,"y":16},{"x":33,"y":16},{"x":23,"y":17},{"x":28,"y":17},{"x":30,"y":17},{"x":35,"y":17},{"x":23,"y":18},{"x":28,"y":18},{"x":30,"y":18},{"x":35,"y":18},{"x":23,"y":19},{"x":28,"y":19},{"x":30,"y":19},{"x":35,"y":19},{"x":25,"y":21},{"x":26,"y":21},{"x":27,"y":21},{"x":31,"y":21},{"x":32,"y":21},{"x":33,"y":21}]};
	
	var gliderGun = {"name": "Gosper Glider Gun", "livingCells":[{"x":27,"y":4},{"x":25,"y":5},{"x":27,"y":5},{"x":15,"y":6},{"x":16,"y":6},{"x":23,"y":6},{"x":24,"y":6},{"x":37,"y":6},{"x":38,"y":6},{"x":14,"y":7},{"x":18,"y":7},{"x":23,"y":7},{"x":24,"y":7},{"x":37,"y":7},{"x":38,"y":7},{"x":3,"y":8},{"x":4,"y":8},{"x":13,"y":8},{"x":19,"y":8},{"x":23,"y":8},{"x":24,"y":8},{"x":3,"y":9},{"x":4,"y":9},{"x":13,"y":9},{"x":17,"y":9},{"x":19,"y":9},{"x":20,"y":9},{"x":25,"y":9},{"x":27,"y":9},{"x":13,"y":10},{"x":19,"y":10},{"x":27,"y":10},{"x":14,"y":11},{"x":18,"y":11},{"x":15,"y":12},{"x":16,"y":12}]};
	
	var samples = [U, bigEars, flower, gliderGun];
	
	function getSamples(){
		return samples;
	}
	
	return {
		getSamples: getSamples
	};

}]);