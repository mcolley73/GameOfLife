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
        //$rootScope.$broadcast('gol.glyph.dragstart');
        gameDataService.game.glyphDragging = true;
      });

      function mousemove(event) {
        x = event.pageX - startX; // relative css positioning, not absolute
        y = event.pageY - startY;
        //$log.info("x:"+x);
        //$log.info("y:"+y);
        // $log.info("event.pageY:"+event.pageY);

        var foundCell = getCellBelow(event);

        if(foundCell != null){
          var targetCellOffset = getElementOffset(foundCell);

          var adjustmentX = event.pageX - targetCellOffset.left;
          var adjustmentY = event.pageY - targetCellOffset.top;
          $log.info("adjustmentX:"+adjustmentX + ", adjustmentY:"+adjustmentY);
          element.css({
            top: (targetCellOffset.top - startY) + 'px',
            left: (targetCellOffset.left - startX) + 'px'
          });

          // This should be done by adjusting model of cell object
          angular.element(foundCell).addClass("glyph-hover");
        }else{
          element.css({
            left: x + 'px',
            top: y + 'px'
          });
        }
      }

      function mouseup() {
        $document.off('mousemove', mousemove);
        $document.off('mouseup', mouseup);
        gameDataService.game.glyphDragging = false;
        //$rootScope.$broadcast('gol.glyph.dragstop', event, currentX, currentY);
      }

      function getCellBelow(event){
        var foundCell = null;
        var pointElements = document.elementsFromPoint(event.pageX, event.pageY);
        for(var i = 0; foundCell==null && i < pointElements.length; i++){
          var targetCell = angular.element(pointElements[i]);
          if(targetCell.hasClass("cell")){
            foundCell = pointElements[i];
          }
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
