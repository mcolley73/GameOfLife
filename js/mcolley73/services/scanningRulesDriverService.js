gameOfLifeApp.service('scanningRulesDriverService', ['$log', '$rootScope', 'gameDataService', 'rulesService', function($log, $rootScope, gameDataService, rulesService){

  /**
    This RulesDriver will scan every Cell in the Grid, Row by Row
      and Column by Column. It scans to identify necessary changes,
      storing them for possible reference to apply those changes,
      and will check neighbors 1 thru 8 for every cell.

    Cells that do not require change are stored in a separate array and
      then dealt with as well (for Tracers).
  **/

  var scanningRulesDriverService = {

    runRules: function(){
      runRulesOrPreview(true);
    },
    runPreview: function(){
      runRulesOrPreview(false);
    }

  };

  function runRulesOrPreview(commitChange){
    var cellsNeedingChange = [];
    var cellsWithoutChange = [];
    identifyChanges(cellsNeedingChange, cellsWithoutChange);
    applyChanges(cellsNeedingChange, cellsWithoutChange, commitChange);
  }

	function identifyChanges(cellsNeedingChange, cellsWithoutChange){
		var world = gameDataService.game.world;
		for(var i = 0; i < world.length; i++){
			for(var j = 0; j < world[i].length; j++){
				checkRules(cellsNeedingChange,cellsWithoutChange,i,j);
			}
		}
	}

	function applyChanges(cellsNeedingChange,cellsWithoutChange,commitChange){
		var world = gameDataService.game.world;
		if(commitChange){
			gameDataService.game.generationCount++;
		}
		if(cellsNeedingChange.length==0){
			$log.info("No changes in generation " + gameDataService.game.generationCount + ".")
      $rootScope.$broadcast('gol.game.stop');
		}else{
			for(var i = 0; i < cellsNeedingChange.length; i++){
				commitChangeOrPreview(commitChange, cellsNeedingChange[i]);
			}
      for(var i = 0; i < cellsWithoutChange.length; i++){
				handleNoChange(commitChange, cellsWithoutChange[i]);
			}
		}
	}

	function commitChangeOrPreview(commitChange, cell){
		if(commitChange){
			cell.alive = !cell.alive;
			if(cell.alive){
				cell.beenDead = -1;
			}else{
				cell.beenDead = 1;
			}
			cell.shouldChange = false;
		}else{
			cell.preview = true;
		}
	}

	function handleNoChange(commitChange, cell){
		if(commitChange && !cell.alive && cell.beenDead > -1){
			cell.beenDead++;
		}
	}

  function checkRules(cellsNeedingChange, cellsWithoutChange, row, column){
  	var world = gameDataService.game.world;
  	var neighborCount = countNeighbors(row, column);

  	var cell = world[row][column];

    if(rulesService.checkForChange(cell.alive, neighborCount)){
      cellsNeedingChange.push(cell);
      cell.shouldChange = true;
  	}else{
      cellsWithoutChange.push(cell);
    }
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

  return scanningRulesDriverService;

}]);
