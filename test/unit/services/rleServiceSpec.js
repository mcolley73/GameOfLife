describe('rleService', function () {

  var service;
  var mockLog = {
    info: function(str){
      console.info(str);
    }
  }

  beforeEach(function(){
    console.log('beforeEach()...');

    angular.mock.module('gameOfLifeApp');

    angular.mock.module(function($provide){
      $provide.value('$log', mockLog);
    });

    angular.mock.inject(function(rleService){
      service = rleService;
    });
    console.log('beforeEach().');
  });

  it('should be defined', function(){
    expect(service).toBeDefined();
  });

  describe('toGlyphArray', function(){

    it('should be a function', function(){
      expect(service.toGlyphArray).toBeDefined();
      expect(typeof service.toGlyphArray).toBe('function');
    });

    it('should parse RLE Strings[] into an array', function(){
      var glyphArray = service.toGlyphArray(glider());

      expect(glyphArray).toBeDefined();
    });

    it('should parse RLE glider into glyphArray with 3 rows', function(){
      var glyphArray = service.toGlyphArray(glider());

      expect(glyphArray.length).toBe(3);
    });

    it('should parse RLE glider into glyphArray with 1st row having 3 alive cells', function(){
      var glyphArray = service.toGlyphArray(glider());

      expect(glyphArray[0].length).toBe(3);
      expect(glyphArray[0][0].alive).toBe(true);
      expect(glyphArray[0][1].alive).toBe(true);
      expect(glyphArray[0][2].alive).toBe(true);
    });

    it('should parse RLE glider into glyphArray with 2nd row having 1 alive cell', function(){
      var glyphArray = service.toGlyphArray(glider());

      expect(glyphArray[1].length).toBe(3);
      expect(glyphArray[1][0].alive).toBe(true);
      expect(glyphArray[1][1].alive).toBe(false);
      expect(glyphArray[1][2].alive).toBe(false);
    });

    it('should parse RLE glider into glyphArray with 3rd row having 1 alive cell', function(){
      var glyphArray = service.toGlyphArray(glider());

      expect(glyphArray[2][0].alive).toBe(false);
      expect(glyphArray[2][1].alive).toBe(true);
      expect(glyphArray[2][2].alive).toBe(false);
    });

    it('should discard the exclamation mark at the end of the RLE format', function(){
      var glyphArray = service.toGlyphArray(glider());

      expect(glyphArray[2].length).toBe(3);
    });

  });

  describe('fromGlyphArray', function(){

    it('should be a function', function(){
      expect(service.fromGlyphArray).toBeDefined();
      expect(typeof service.fromGlyphArray).toBe('function');
    });

    it('should return an array of RLE strings', function(){
      var gArray = southwestGlider();

      expect(service.fromGlyphArray(gArray)).toBeDefined();
      expect(service.fromGlyphArray(gArray).length).toBeDefined();
    });

    it('should include a #O line noting the origins of the content', function(){
      var gArray = southwestGlider();

      var rleStrings = service.fromGlyphArray(gArray);
      var row0 = rleStrings[0];
      expect(row0[0]).toBe('#');
      expect(row0[1]).toBe('O');
    });

    it('should return an array that puts meta info second', function(){
      var gArray = southwestGlider();

      var rleStrings = service.fromGlyphArray(gArray);
      expect(rleStrings).toBeDefined();
      expect(rleStrings.length).toBeGreaterThan(0);
      expect(rleStrings[1]).toBe('x = 3, y = 3');
    });

    it('should return an RLE string with a dead cell to start', function(){
      var gArray = southwestGlider();

      var rleStrings = service.fromGlyphArray(gArray);
      expect(rleStrings.length).toBeGreaterThan(1);
      expect(rleStrings[2][0]).toBe('b');
    });

    it('should return an RLE string with a live cell second', function(){
      var gArray = southwestGlider();

      var rleStrings = service.fromGlyphArray(gArray);
      expect(rleStrings.length).toBeGreaterThan(1);
      expect(rleStrings[2][1]).toBe('o');
    });

    it('should return an RLE string with 2 $ marking row ends', function(){
      var gArray = southwestGlider();

      var rleStrings = service.fromGlyphArray(gArray);
      expect(rleStrings.length).toBeGreaterThan(1);
      expect(rleStrings[2].split('$').length).toBe(3);
    });

    it('should return an RLE string ending with an !', function(){
      var gArray = southwestGlider();

      var rleStrings = service.fromGlyphArray(gArray);
      var rleString = rleStrings[2];
      expect(rleString[rleString.length-1]).toBe('!');
    });

    it('should stop appending to an RLE string when no live cells remain in a row', function(){
      var gArray = southwestGlider();

      var rleStrings = service.fromGlyphArray(gArray);
      var row2 = rleStrings[2].split('$')[1];
      expect(row2).toBe('o');
    });

    it('should not produce lines longer than 70 characters', function(){
      var gArray = [];
      var totalCells = 0;

      // create silly pattern that repeats dead,alive,dead,alive,etc...
      for(var j = 0; j < 3; j++){
        gArray.push([])
        for(var i = 0; i < 40; i++){
          gArray[j].push({alive:false});
          gArray[j].push({alive:true}); // end pairs with true so we don't drop ending cell as dead
          totalCells += 2;
        }
      }

      var rleStrings = service.fromGlyphArray(gArray);
      var foundCells = 0;
      for(var i = 0; i < rleStrings.length; i++){
        var row = rleStrings[i];
        expect(row.length).toBeLessThan(71);
        foundCells += row.replace('$','').replace('!','').length;
      }
      foundCells -= rleStrings[0].length; // subtract #O line
      foundCells -= rleStrings[1].length; // subtract meta line
      expect(foundCells).toBe(totalCells);
    });

  });

});

function glider(){
  var rleStrings = [];
  rleStrings.push('#C some unit test comment');
  rleStrings.push('x = 3, y = 3, rule = B3/S23');
  rleStrings.push('3o$o$bo!');
  // ooo
  // o
  // bo
  return rleStrings;
}

function southwestGlider(){
  var gArray = [];
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
  return gArray;
}
