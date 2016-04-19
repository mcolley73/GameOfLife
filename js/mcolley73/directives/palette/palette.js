gameOfLifeApp.directive('golPalette', ['$log', 'gameDataService', function($log, gameDataService){

  var controller = ['$scope', '$log', 'gameDataService', function($scope, $log, gameDataService){

    var gArray = [];
    gArray.push([]);
    gArray.push([]);
    gArray[0].push({alive:false});
    gArray[0].push({alive:true});
    gArray[1].push({alive:false});
    gArray[1].push({alive:false});
    $scope.glyphArray1 = gArray;

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
    $scope.glyphArray2 = gArray;


    gArray = [];
    gArray.push([]);
    gArray.push([]);
    gArray[0].push({alive:false});
    gArray[0].push({alive:false});
    gArray[1].push({alive:true});
    gArray[1].push({alive:false});
    $scope.glyphArray3 = gArray;

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
    $scope.glyphArray4 = gArray;

  }];

  return {
		controller: controller,
		model: '=',
		templateUrl: '/GameOfLife/js/mcolley73/directives/palette/palette.html'
	};

}]);
