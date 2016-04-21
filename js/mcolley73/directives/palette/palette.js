gameOfLifeApp.directive('golPalette', ['$log', 'gameDataService', 'gameService', function($scope, $log, gameDataService, gameService){

  var controller = ['$scope', '$log', 'gameDataService', 'gameService', function($scope, $log, gameDataService, gameService){

    $scope.gameDataService = gameDataService;

    var glyphArrays = [];

    var gArray = [];
    gArray.push([]);
    gArray.push([]);
    gArray[0].push({alive:false});
    gArray[0].push({alive:true});
    gArray[1].push({alive:false});
    gArray[1].push({alive:false});
    glyphArrays.push({
      glyph: gArray,
      name: 'Simple Block 1'
    });

    gArray = [];
    gArray.push([]);
    gArray.push([]);
    gArray.push([]);
    gArray[0].push({alive:false});
    gArray[0].push({alive:true});
    gArray[0].push({alive:false});
    gArray[1].push({alive:true});
    gArray[1].push({alive:false});
    gArray[1].push({alive:false});
    gArray[2].push({alive:true});
    gArray[2].push({alive:true});
    gArray[2].push({alive:true});
    glyphArrays.push({
      glyph: gArray,
      name: 'Southwest Featherweight'
    });

    gArray = [];
    gArray.push([]);
    gArray.push([]);
    gArray[0].push({alive:false});
    gArray[0].push({alive:false});
    gArray[1].push({alive:true});
    gArray[1].push({alive:false});
    glyphArrays.push({
      glyph: gArray,
      name: 'Simple Block 2'
    });

    gArray = [];
    gArray.push([]);
    gArray.push([]);
    gArray.push([]);
    gArray[0].push({alive:false});
    gArray[0].push({alive:true});
    gArray[0].push({alive:false});
    gArray[1].push({alive:false});
    gArray[1].push({alive:false});
    gArray[1].push({alive:true});
    gArray[2].push({alive:true});
    gArray[2].push({alive:true});
    gArray[2].push({alive:true});
    glyphArrays.push({
      glyph: gArray,
      name: 'Southeast Featherweight'
    });

    gArray = [];
    gArray.push([]);
    gArray.push([]);
    gArray.push([]);
    gArray[0].push({alive:false});
    gArray[0].push({alive:true});
    gArray[0].push({alive:false});
    gArray[1].push({alive:false});
    gArray[1].push({alive:true});
    gArray[1].push({alive:false});
    gArray[2].push({alive:false});
    gArray[2].push({alive:true});
    gArray[2].push({alive:false});
    glyphArrays.push({
      glyph: gArray,
      name: 'Vertical Blinker'
    });

    gArray = [];
    gArray.push([]);
    gArray.push([]);
    gArray.push([]);
    gArray[0].push({alive:false});
    gArray[0].push({alive:false});
    gArray[0].push({alive:false});
    gArray[1].push({alive:true});
    gArray[1].push({alive:true});
    gArray[1].push({alive:true});
    gArray[2].push({alive:false});
    gArray[2].push({alive:false});
    gArray[2].push({alive:false});
    glyphArrays.push({
      glyph: gArray,
      name: 'Horizontal Blinker'
    });

    gArray = [];
    gArray.push([]);
    gArray.push([]);
    gArray.push([]);
    gArray.push([]);
    gArray[0].push({alive:false});
    gArray[0].push({alive:true});
    gArray[0].push({alive:false});
    gArray[0].push({alive:false});
    gArray[0].push({alive:true});
    gArray[1].push({alive:true});
    gArray[1].push({alive:false});
    gArray[1].push({alive:false});
    gArray[1].push({alive:false});
    gArray[1].push({alive:false});
    gArray[2].push({alive:true});
    gArray[2].push({alive:false});
    gArray[2].push({alive:false});
    gArray[2].push({alive:false});
    gArray[2].push({alive:true});
    gArray[3].push({alive:true});
    gArray[3].push({alive:true});
    gArray[3].push({alive:true});
    gArray[3].push({alive:true});
    gArray[3].push({alive:false});
    glyphArrays.push({
      glyph: gArray,
      name: 'West Lightweight'
    });

    $scope.glyphArrays = glyphArrays;

    $scope.revert = function(){
      gameService.revertToSnapshot();
    };

    $scope.undoGlyphIconClass = function(){
      if(!gameDataService.hasSnapshot){
        return 'disabled-font';
      }
      return '';
    };

  }];

  return {
		controller: controller,
		model: '=',
		templateUrl: '/GameOfLife/js/mcolley73/directives/palette/palette.html'
	};

}]);
