var gameOfLifeApp = angular.module('gameOfLifeApp', []);

gameOfLifeApp.factory('gameDataService', function(){
	return {};
});

gameOfLifeApp.controller('gameController', ['$scope', '$log', 'gameDataService', function($scope, $log, gameDataService) {
	
	$scope.width = 20;
	$scope.height = 20;
	
	$scope.game = {
		world: createArray($scope.width, $scope.height) 
	};
	
	gameDataService.game = $scope.game;
	
	function createArray(width, height){
		var arr = [];
		for(var i = 0; i < width; i++){
			arr[i] = [];
			for(var j = 0; j < height; j++){
				//$log.info(i + ":" + j);
				arr[i][j] = {
					alive: false
				}
			}
		}
		return arr;
	}
	
}]);
