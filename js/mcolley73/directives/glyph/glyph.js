gameOfLifeApp.directive('golGlyph', ['$log', '$document', '$rootScope', 'gameDataService', function($log, $document, $rootScope, gameDataService) {

  return {

    templateUrl: '/GameOfLife/js/mcolley73/directives/glyph/glyph.html',

    link: function(scope, element, attr) {

      var startX = 0, startY = 0, x = 0, y = 0;
      var currentX = 0;
      var currentY = 0;

      element.on('mousedown', function(event) {
        // Prevent default dragging of selected content
        event.preventDefault();
        startX = event.pageX - x;
        startY = event.pageY - y;
        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);
        gameDataService.game.glyphDragging = true;
      });

      function mousemove(event) {
        x = event.pageX; // absolute css positioning
        y = event.pageY;
        element.css({
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
          element.css({
            top: (targetCellOffset.top) + 'px',
            left: (targetCellOffset.left) + 'px'
          });

          var model = [];
          model[0] = [{alive:false}, {alive:true}, {alive:false}];
          model[1] = [{alive:true}, {alive:false}, {alive:false}];
          model[2] = [{alive:true}, {alive:true}, {alive:true}];
          applyGlyph(foundCell, model);
          element.css({
            top: '50px',
            left: '50px'
          });
        }else{
          element.css({
            top: '50px',
            left: '50px'
          });
        }
      }

      function applyGlyph(upperLeftCell, model){
        // Find the model associated with the targeted cell, modify and apply
        var angElem = angular.element(upperLeftCell);
        var scope = angElem.scope();
        scope.cell.glyphHover = true;
        scope.$apply();
        $log.info(scope.cell);

        var row = scope.cell.row;
        var column = scope.cell.column;
        for(var i = 0; i < model.length; i++){
          for(var j = 0; j < model[i].length; j++){
            gameDataService.game.world[row + i][column + j].alive = model[i][j].alive;
          }
        }
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
          if(targetCell.hasClass("cell")){
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

      function getElementOffset(element){
        var de = document.documentElement;
        var box = element.getBoundingClientRect();
        var top = box.top + window.pageYOffset - de.clientTop;
        var left = box.left + window.pageXOffset - de.clientLeft;
        return { top: top, left: left };
      }
    }
  };
}]);
