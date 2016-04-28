describe('rulesService', function () {

  var service;
  var mockLog = {
    info: function(str){
      console.info(str);
    }
  };
  var mockGameDataService = {

  };

  beforeEach(function(){
    console.log('beforeEach()...');

    angular.mock.module('gameOfLifeApp');

    angular.mock.module(function($provide){
      $provide.value('$log', mockLog);
      $provide.value('gameDataService', mockGameDataService);
    });

    angular.mock.inject(function(rulesService){
      service = rulesService;
    });
    console.log('beforeEach().');
  });

  it('should be defined', function(){
    expect(service).toBeDefined();
  });

  describe('effectiveRules', function(){

    it('should have effectiveRules from the start', function(){
      expect(service.effectiveRules).toBeDefined();
      expect(typeof service.effectiveRules).toBe('object');
    });

    it('should start with traditional rules', function(){
      expect(service.effectiveRules.birthRules).toBe('3');
      expect(service.effectiveRules.surviveRules).toBe('23');
    });

  });

  describe('rulesOptions', function(){

    it('should have a list of rulesOptions', function(){
      expect(service.rulesOptions).toBeDefined();
    });

    it('should be an array with some rules contents', function(){
      expect(service.rulesOptions.length).toBeGreaterThan(1);
    });

    it('should have correct rules structure', function(){
      var options = service.rulesOptions;
      for(var i = 0; i < options.length; i++){
        console.log(options[i]);
        expect(options[i].name).toBeDefined();
        expect(options[i].displayName).toBeDefined();
        expect(options[i].B).toBeDefined();
        expect(options[i].S).toBeDefined();
        expect(options[i].birthRules).toBeDefined();
        expect(options[i].surviveRules).toBeDefined();
      }
    });

  });

  describe('checkForChange with Conway\'s Rules', function(){

    it('should say 2 neighbors sustains a live cell in B3/S23', function(){
      expect(service.checkForChange(true, 2)).toBe(false);
    });
    it('should say 3 neighbors sustains a live cell in B3/S23', function(){
      expect(service.checkForChange(true, 3)).toBe(false);
    });
    it('should say 3 neighbors revives a dead cell in B3/S23', function(){
      expect(service.checkForChange(false, 3)).toBe(true);
    });
    it('should say 4 neighbors kills a living cell in B3/S23', function(){
      expect(service.checkForChange(true, 4)).toBe(true);
    });
    it('should say 4 neighbors leaves a dead cell dead in B3/S23', function(){
      expect(service.checkForChange(false, 4)).toBe(false);
    });

  });

  describe('checkForChange with Rules Variations', function(){

    it('should honor changing rules to B2/S0', function(){
      service.effectiveRules = service.rulesOptions[2];

      expect(service.checkForChange(false, 4)).toBe(false);
      expect(service.checkForChange(false, 2)).toBe(true);
      expect(service.checkForChange(true, 2)).toBe(true);
      expect(service.checkForChange(true, 0)).toBe(false);
    });

    it('should honor changing rules to B45678/S2345', function(){
      service.effectiveRules = service.rulesOptions[10];

      expect(service.checkForChange(false, 4)).toBe(true);
      expect(service.checkForChange(true, 2)).toBe(false);
      expect(service.checkForChange(false, 2)).toBe(false);
      expect(service.checkForChange(false, 8)).toBe(true);
    });

  });

});
