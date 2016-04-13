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

	var bigEars = {"name": "Big Ears", "height":35, "width":60, "livingCells":[{"x":25,"y":12},{"x":33,"y":12},{"x":24,"y":13},{"x":25,"y":13},{"x":33,"y":13},{"x":34,"y":13},{"x":27,"y":14},{"x":31,"y":14},{"x":22,"y":15},{"x":23,"y":15},{"x":24,"y":15},{"x":25,"y":15},{"x":33,"y":15},{"x":34,"y":15},{"x":35,"y":15},{"x":36,"y":15},{"x":21,"y":16},{"x":22,"y":16},{"x":24,"y":16},{"x":25,"y":16},{"x":29,"y":16},{"x":33,"y":16},{"x":34,"y":16},{"x":36,"y":16},{"x":37,"y":16},{"x":22,"y":17},{"x":24,"y":17},{"x":25,"y":17},{"x":29,"y":17},{"x":33,"y":17},{"x":34,"y":17},{"x":36,"y":17},{"x":23,"y":18},{"x":24,"y":18},{"x":25,"y":18},{"x":29,"y":18},{"x":33,"y":18},{"x":34,"y":18},{"x":35,"y":18},{"x":24,"y":19},{"x":34,"y":19},{"x":28,"y":20},{"x":29,"y":20},{"x":30,"y":20},{"x":28,"y":21},{"x":29,"y":21},{"x":30,"y":21},{"x":29,"y":22}]};

	var flower = {"name": "Repeating Flower", "height":35, "width":60, "livingCells":[{"x":25,"y":9},{"x":26,"y":9},{"x":27,"y":9},{"x":31,"y":9},{"x":32,"y":9},{"x":33,"y":9},{"x":23,"y":11},{"x":28,"y":11},{"x":30,"y":11},{"x":35,"y":11},{"x":23,"y":12},{"x":28,"y":12},{"x":30,"y":12},{"x":35,"y":12},{"x":23,"y":13},{"x":28,"y":13},{"x":30,"y":13},{"x":35,"y":13},{"x":25,"y":14},{"x":26,"y":14},{"x":27,"y":14},{"x":31,"y":14},{"x":32,"y":14},{"x":33,"y":14},{"x":25,"y":16},{"x":26,"y":16},{"x":27,"y":16},{"x":31,"y":16},{"x":32,"y":16},{"x":33,"y":16},{"x":23,"y":17},{"x":28,"y":17},{"x":30,"y":17},{"x":35,"y":17},{"x":23,"y":18},{"x":28,"y":18},{"x":30,"y":18},{"x":35,"y":18},{"x":23,"y":19},{"x":28,"y":19},{"x":30,"y":19},{"x":35,"y":19},{"x":25,"y":21},{"x":26,"y":21},{"x":27,"y":21},{"x":31,"y":21},{"x":32,"y":21},{"x":33,"y":21}]};

	var parallelLines = {"name":"Parallel Lines","height":35,"width":60,"livingCells":[{"x":27,"y":13},{"x":28,"y":14},{"x":29,"y":15},{"x":27,"y":16},{"x":30,"y":16},{"x":28,"y":17},{"x":31,"y":17},{"x":29,"y":18},{"x":32,"y":18},{"x":30,"y":19},{"x":31,"y":20},{"x":32,"y":21}]};

	var gliderGun = {"name": "Gosper Glider Gun", "height":35, "width":60, "livingCells":[{"x":27,"y":4},{"x":25,"y":5},{"x":27,"y":5},{"x":15,"y":6},{"x":16,"y":6},{"x":23,"y":6},{"x":24,"y":6},{"x":37,"y":6},{"x":38,"y":6},{"x":14,"y":7},{"x":18,"y":7},{"x":23,"y":7},{"x":24,"y":7},{"x":37,"y":7},{"x":38,"y":7},{"x":3,"y":8},{"x":4,"y":8},{"x":13,"y":8},{"x":19,"y":8},{"x":23,"y":8},{"x":24,"y":8},{"x":3,"y":9},{"x":4,"y":9},{"x":13,"y":9},{"x":17,"y":9},{"x":19,"y":9},{"x":20,"y":9},{"x":25,"y":9},{"x":27,"y":9},{"x":13,"y":10},{"x":19,"y":10},{"x":27,"y":10},{"x":14,"y":11},{"x":18,"y":11},{"x":15,"y":12},{"x":16,"y":12}]};

	var blinkerPuffer1 = {"name":"Blinker Puffer 1","height":35,"width":60,"livingCells":[{"x":52,"y":6},{"x":4,"y":7},{"x":50,"y":7},{"x":54,"y":7},{"x":4,"y":8},{"x":49,"y":8},{"x":4,"y":9},{"x":49,"y":9},{"x":54,"y":9},{"x":49,"y":10},{"x":50,"y":10},{"x":51,"y":10},{"x":52,"y":10},{"x":53,"y":10},{"x":50,"y":14},{"x":51,"y":14},{"x":49,"y":15},{"x":50,"y":15},{"x":52,"y":15},{"x":53,"y":15},{"x":54,"y":15},{"x":50,"y":16},{"x":51,"y":16},{"x":52,"y":16},{"x":53,"y":16},{"x":51,"y":17},{"x":52,"y":17},{"x":4,"y":20},{"x":54,"y":19},{"x":55,"y":19},{"x":4,"y":21},{"x":52,"y":20},{"x":57,"y":20},{"x":4,"y":22},{"x":51,"y":21},{"x":51,"y":22},{"x":57,"y":22},{"x":51,"y":23},{"x":52,"y":23},{"x":53,"y":23},{"x":54,"y":23},{"x":55,"y":23},{"x":56,"y":23}]}

	var armada = {"name": "Featherweight Spaceship Armada", "height":35, "width":60, "livingCells":[{"x":3,"y":2},{"x":13,"y":2},{"x":23,"y":2},{"x":33,"y":2},{"x":4,"y":3},{"x":14,"y":3},{"x":24,"y":3},{"x":34,"y":3},{"x":2,"y":4},{"x":3,"y":4},{"x":4,"y":4},{"x":12,"y":4},{"x":13,"y":4},{"x":14,"y":4},{"x":22,"y":4},{"x":23,"y":4},{"x":24,"y":4},{"x":32,"y":4},{"x":33,"y":4},{"x":34,"y":4},{"x":8,"y":7},{"x":18,"y":7},{"x":28,"y":7},{"x":9,"y":8},{"x":19,"y":8},{"x":29,"y":8},{"x":7,"y":9},{"x":8,"y":9},{"x":9,"y":9},{"x":17,"y":9},{"x":18,"y":9},{"x":19,"y":9},{"x":27,"y":9},{"x":28,"y":9},{"x":29,"y":9},{"x":3,"y":12},{"x":13,"y":12},{"x":23,"y":12},{"x":4,"y":13},{"x":14,"y":13},{"x":24,"y":13},{"x":2,"y":14},{"x":3,"y":14},{"x":4,"y":14},{"x":12,"y":14},{"x":13,"y":14},{"x":14,"y":14},{"x":22,"y":14},{"x":23,"y":14},{"x":24,"y":14},{"x":8,"y":17},{"x":18,"y":17},{"x":9,"y":18},{"x":19,"y":18},{"x":7,"y":19},{"x":8,"y":19},{"x":9,"y":19},{"x":17,"y":19},{"x":18,"y":19},{"x":19,"y":19},{"x":3,"y":22},{"x":13,"y":22},{"x":4,"y":23},{"x":14,"y":23},{"x":2,"y":24},{"x":3,"y":24},{"x":4,"y":24},{"x":12,"y":24},{"x":13,"y":24},{"x":14,"y":24},{"x":8,"y":27},{"x":9,"y":28},{"x":7,"y":29},{"x":8,"y":29},{"x":9,"y":29}]};

	var maxSpecial = {"name": "The Max Special", "height":35, "width":60, "livingCells":[{"x":5,"y":1},{"x":54,"y":1},{"x":6,"y":2},{"x":53,"y":2},{"x":4,"y":3},{"x":5,"y":3},{"x":6,"y":3},{"x":53,"y":3},{"x":54,"y":3},{"x":55,"y":3}]};

	var maxBowtie = {"name": "Max Bowtie", "height":35, "width":60, "livingCells":[{"x":28,"y":16},{"x":31,"y":16},{"x":29,"y":17},{"x":30,"y":17},{"x":27,"y":18},{"x":28,"y":18},{"x":29,"y":18},{"x":30,"y":18},{"x":31,"y":18},{"x":32,"y":18}]};

	var maxCentipede = {"name": "Max Centipede", "height":35, "width":60, "livingCells":[{"x":28,"y":13},{"x":31,"y":13},{"x":29,"y":14},{"x":30,"y":14},{"x":28,"y":15},{"x":31,"y":15},{"x":27,"y":16},{"x":28,"y":16},{"x":29,"y":16},{"x":30,"y":16},{"x":31,"y":16},{"x":32,"y":16},{"x":29,"y":17},{"x":30,"y":17},{"x":28,"y":18},{"x":31,"y":18},{"x":29,"y":19},{"x":30,"y":19},{"x":28,"y":20},{"x":31,"y":20},{"x":29,"y":21},{"x":30,"y":21},{"x":28,"y":22},{"x":31,"y":22},{"x":29,"y":23},{"x":30,"y":23},{"x":28,"y":24},{"x":31,"y":24},{"x":29,"y":25},{"x":30,"y":25},{"x":28,"y":26},{"x":31,"y":26},{"x":29,"y":27},{"x":30,"y":27},{"x":28,"y":28},{"x":31,"y":28},{"x":29,"y":29},{"x":30,"y":29},{"x":28,"y":30},{"x":31,"y":30},{"x":29,"y":31},{"x":30,"y":31},{"x":28,"y":32},{"x":31,"y":32},{"x":29,"y":33},{"x":30,"y":33},{"x":28,"y":34},{"x":31,"y":34}]};

	var maxExplodingFlower = {"name": "Max Exploding Flower", "height":35, "width":60, "livingCells":[{"x":29,"y":5},{"x":28,"y":6},{"x":30,"y":6},{"x":29,"y":7},{"x":28,"y":8},{"x":30,"y":8},{"x":25,"y":9},{"x":26,"y":9},{"x":27,"y":9},{"x":31,"y":9},{"x":32,"y":9},{"x":33,"y":9},{"x":24,"y":10},{"x":34,"y":10},{"x":23,"y":11},{"x":28,"y":11},{"x":30,"y":11},{"x":35,"y":11},{"x":23,"y":12},{"x":28,"y":12},{"x":30,"y":12},{"x":35,"y":12},{"x":23,"y":13},{"x":28,"y":13},{"x":30,"y":13},{"x":35,"y":13},{"x":22,"y":14},{"x":25,"y":14},{"x":26,"y":14},{"x":27,"y":14},{"x":31,"y":14},{"x":32,"y":14},{"x":33,"y":14},{"x":36,"y":14},{"x":22,"y":15},{"x":23,"y":15},{"x":24,"y":15},{"x":34,"y":15},{"x":35,"y":15},{"x":36,"y":15},{"x":22,"y":16},{"x":25,"y":16},{"x":26,"y":16},{"x":27,"y":16},{"x":31,"y":16},{"x":32,"y":16},{"x":33,"y":16},{"x":36,"y":16},{"x":23,"y":17},{"x":28,"y":17},{"x":30,"y":17},{"x":35,"y":17},{"x":23,"y":18},{"x":28,"y":18},{"x":30,"y":18},{"x":35,"y":18},{"x":23,"y":19},{"x":24,"y":19},{"x":25,"y":19},{"x":28,"y":19},{"x":30,"y":19},{"x":33,"y":19},{"x":34,"y":19},{"x":35,"y":19},{"x":25,"y":20},{"x":33,"y":20},{"x":25,"y":21},{"x":26,"y":21},{"x":27,"y":21},{"x":31,"y":21},{"x":32,"y":21},{"x":33,"y":21},{"x":28,"y":22},{"x":30,"y":22},{"x":29,"y":23}]};

	var samples = [U, bigEars, flower, parallelLines, gliderGun, blinkerPuffer1, armada, maxSpecial, maxBowtie, maxCentipede, maxExplodingFlower];

	function getSamples(){
		return samples;
	}

	return {
		getSamples: getSamples
	};

}]);
