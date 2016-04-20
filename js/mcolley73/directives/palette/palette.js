gameOfLifeApp.directive('golPalette', ['$log', 'gameDataService', function($log, gameDataService){

  var controller = ['$scope', '$log', 'gameDataService', function($scope, $log, gameDataService){

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

  }];

  return {
		controller: controller,
		model: '=',
		templateUrl: '/GameOfLife/js/mcolley73/directives/palette/palette.html'
	};

}]);
