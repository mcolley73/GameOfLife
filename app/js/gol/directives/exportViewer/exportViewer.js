gameOfLifeApp.directive('golExportViewer', ['$log', 'gameDataService', 'exportService', 'rulesService', function($log, gameDataService, exportService, rulesService){

  var controller = ['$scope', '$log', 'gameDataService', 'exportService', 'rulesService', function($scope, $log, gameDataService, exportService, rulesService){

		$scope.gameDataService = gameDataService;
    $scope.exportService = exportService;
    $scope.rulesService = rulesService;

    $scope.updateFormat = function(){
      $scope.exportService.generateExportData(gameDataService.game.world, rulesService.effectiveRules);
    }

    $scope.save = function(){
      var a = document.getElementById("savehref");
      var file = new Blob([exportService.exportData], {type: "text/plain"});
      a.href = URL.createObjectURL(file);
      a.download = buildFilename();
      a.click();
    }

    function buildFilename(){
      return "cgol-" + new Date().getTime() + exportService.getExportFormatExtension();
    }

    $scope.copyText = function(){
      try{
        var copyTextarea = document.querySelector('textarea.viewer');
        copyTextarea.select();
        document.execCommand('copy');
      }catch(err){
        alert("Unable to automatically copy to clipboard.");
      }
    }

    $scope.closeViewer = function(){
      gameDataService.exportViewerVisible = false;
    }

	}];

	return {
		controller: controller,
		model: '=',
		templateUrl: '/GameOfLife/app/js/gol/directives/exportViewer/exportViewer.html'
	};

}]);
