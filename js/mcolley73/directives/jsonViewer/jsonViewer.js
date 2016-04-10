gameOfLifeApp.directive('golJsonViewer', ['$log', 'gameDataService', function($log, gameDataService){

  var controller = ['$scope', '$log', 'gameDataService', function($scope, $log, gameDataService){

		$scope.gameDataService = gameDataService;

    $scope.copyJson = function(){
      try{
        var copyTextarea = document.querySelector('.json-viewer');
        copyTextarea.select();
        document.execCommand('copy');
      }catch(err){
        alert("Unable to automatically copy to clipboard.");
      }
    }

    $scope.closeJsonViewer = function(){
      gameDataService.jsonViewerVisible = false;
    }

	}];

	return {
		controller: controller,
		model: '=',
		templateUrl: '/GameOfLife/js/mcolley73/directives/jsonViewer/jsonViewer.html'
	};

}]);
