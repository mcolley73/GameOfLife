gameOfLifeApp.directive('golGlyph', ['$log', '$document', '$rootScope', 'gameDataService', 'gameService', function($log, $document, $rootScope, gameDataService, gameService) {

  var controller = ['$scope', '$log', 'gameDataService', 'gameService', function($scope, $log, gameDataService, gameService){

    $scope.dynamicGlyphClasses = function($index, cell){
			var classes = "";
			classes += (cell.alive) ? 'alive ' : 'dead ';
      classes += "glyphcell";
			return classes;
		}

  }];

  return {

    controller: controller,

    templateUrl: '/GameOfLife/js/mcolley73/directives/glyph/glyph.html',

    scope: {
      glypharray: '=',
      glyphname: '@glyphname'
    },

    link: function(scope, element, attr) {

      var startX = 0, startY = 0, x = 0, y = 0;
      var currentX = 0;
      var currentY = 0;
      var clone = null;

      element.on('mousedown', function(event) {
        // Prevent default dragging of selected content
        event.preventDefault();
        startX = event.pageX - x;
        startY = event.pageY - y;

        cloneGlyphOntoBody(event);

        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);
        gameDataService.game.glyphDragging = true;
      });

      function mousemove(event) {
        x = event.pageX; // absolute css positioning
        y = event.pageY;
        clone.css({
          left: x + 'px',
          top: y + 'px'
        });
      }

      function mouseup() {
        $document.off('mousemove', mousemove);
        $document.off('mouseup', mouseup);
        gameDataService.game.glyphDragging = false;

        var foundCell = getCellBelowPoint(x, y);
        if(foundCell != null){
          var targetCellOffset = getElementOffset(foundCell);
          clone.css({
            top: (targetCellOffset.top) + 'px',
            left: (targetCellOffset.left) + 'px'
          });

          gameService.createSnapshot();
          applyGlyph(foundCell, scope.glypharray);
          clone.detach();
        }else{
          clone.detach();
        }
      }

      function cloneGlyphOntoBody(event){
        clone = element.clone();
        clone.addClass("cloned");
        var offset = getElementOffset(clone[0]);
        clone.css({
          float: 'none',
          position: 'absolute',
          left: event.pageX + 'px',
          top: event.pageY + 'px'
        });
        clone.addClass("dragging");
        $document.find("body").append(clone);
      }

      function applyGlyph(upperLeftCell, model){
        // Find the model associated with the targeted cell, modify and apply
        var angElem = angular.element(upperLeftCell);
        var scope = angElem.scope();

        var row = scope.cell.row;
        var column = scope.cell.column;
        for(var i = 0; i < model.length; i++){
          for(var j = 0; j < model[i].length; j++){
            gameDataService.game.world[row + i][column + j].alive = model[i][j].alive;
          }
        }
        $rootScope.$apply();
      }

      function getCellBelow(event){
        return getCellBelowPoint(event.pageX, event.pageY);
      }

      function getCellBelowPoint(pointX, pointY){
        var foundCell = null;
        var pointElements = document.elementsFromPoint(pointX, pointY);
        var foundRow = false;
        for(var i = 0; foundCell==null && i < pointElements.length; i++){
          var targetCell = angular.element(pointElements[i]);
          if(targetCell.hasClass("cell") && !targetCell.hasClass("glyphcell")){
            foundCell = pointElements[i];
          }else if(targetCell.hasClass("row")){
            foundRow = true;
          }
        }
        if(foundRow){
          return getCellBelowPoint(pointX + 3, pointY + 3);
        }
        return foundCell;
      }

      function getElementOffset(elementNeeded){
        var de = document.documentElement;
        var box = elementNeeded.getBoundingClientRect();
        var top = box.top + window.pageYOffset - de.clientTop;
        var left = box.left + window.pageXOffset - de.clientLeft;
        return { top: top, left: left };
      }
    }
  };
}]);
