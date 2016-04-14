gameOfLifeApp.service('scanningRulesDriverService', ['$log', '$rootScope', 'gameDataService', 'rulesService', function($log, $rootScope, gameDataService, rulesService){

  /**
    This RulesDriver will scan every Cell in the Grid, Row by Row
      and Column by Column. It scans to identify necessary changes,
      scans again to apply the changes, and will check neighbors
      1 thru 8 for every cell.
  **/

  var scanningRulesDriverService = {

    runRules: function(){
      var shouldChange = identifyChanges();
  		applyChanges(shouldChange, true);
    },

    runPreview: function(){
      var shouldChange = identifyChanges();
  		applyChanges(shouldChange, false);
    }

  };

	function identifyChanges(){
		var world = gameDataService.game.world;
		var shouldChange = 0;
		for(var i = 0; i < world.length; i++){
			for(var j = 0; j < world[i].length; j++){
				shouldChange += checkRules(i,j);
			}
		}
		return shouldChange;
	}

	function applyChanges(shouldChangeCount, commitChange){
		var world = gameDataService.game.world;
		if(commitChange){
			gameDataService.game.generationCount++;
		}
		if(shouldChangeCount==0){
			$log.info("No changes in generation " + gameDataService.game.generationCount + ".")
      $rootScope.$broadcast('gol.game.stop');
		}else{
			for(var i = 0; i < world.length; i++){
				for(var j = 0; j < world[i].length; j++){
					var cell = world[i][j];
					applyCellChanges(commitChange, cell);
				}
			}
		}
	}

	function applyCellChanges(commitChange, cell){
		if(cell.shouldChange){
			commitChangeOrPreview(commitChange, cell);
		}else{
			handleNoChange(cell);
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

	function handleNoChange(cell){
		if(!cell.alive && cell.beenDead > -1){
			cell.beenDead++;
		}
	}

  function checkRules(row, column){
  	var world = gameDataService.game.world;
  	var neighborCount = countNeighbors(row, column);

  	var shouldChange = 0;
  	var cell = world[row][column];

  	cell.shouldChange = rulesService.checkForChange(cell.alive, neighborCount);
  	if(cell.shouldChange){
  		shouldChange++;
  	}
  	return shouldChange;
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
