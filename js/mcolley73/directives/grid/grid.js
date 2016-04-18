gameOfLifeApp.directive('golGrid', ['$log', 'gameDataService', function($log, gameDataService){

	//$log.info("golGrid received gameDataService with world of size " + gameDataService.game.world.length + "x" + gameDataService.game.world[0].length);

	var controller = ['$scope', '$log', 'gameDataService', function($scope, $log, gameDataService){

		$scope.gameDataService = gameDataService;

		$scope.toggleCell = function(event, cell){
			cell.alive = !cell.alive;
		};

		$scope.mouseoverCell = function(event, cell){
			if(gameDataService.game.glyphDragging){
				return;
			}
			if(event.buttons > 0){
				cell.alive = true;
			}
		};

		$scope.dynamicCellClasses = function($index, cell){
			var classes = "";
			classes += (cell.alive) ? 'alive ' : 'dead ';
			classes += (cell.preview) ? 'preview ' : ' ';
			classes += beenDeadClass(cell);
			classes += glyphHoverClass(cell);
			classes += ($index > 0 && $index % 5 == 0) ? 'vert-gridline ' : ' ';
			return classes;
		}

		function beenDeadClass(cell){
			if(cell.beenDead > 0 && cell.beenDead < 5){
				return 'been-dead-' + cell.beenDead + ' ';
			}
			return ' ';
		};

		function glyphHoverClass(cell){
			if(cell.glyphHover){
				return 'glyph-hover ';
			}
			return ' ';
		};

	}];

	//$log.info("returning golGrid.");

	return {
		controller: controller,
		model: '=',
		templateUrl: '/GameOfLife/js/mcolley73/directives/grid/grid.html'
	};

}]);
