gameOfLifeApp.service('rulesService', ['$log', 'gameDataService', function($log, gameDataService){

  var conway =            parseRulesString('B3/S23', 'Conway\'s');
  var replicator =        parseRulesString('B1357/S1357', 'Replicator');
  var liveFreeOrDie =     parseRulesString('B2/S0', 'Live Free or Die');
  var lifeWithoutDeath =  parseRulesString('B3/S012345678', 'Life Without Death');
  var longLife =          parseRulesString('B345/S5', 'Long Life');
  var highLife =          parseRulesString('B36/S23', 'High Life');
  var pseudoLife =        parseRulesString('B357/S238', 'Pseudo Life');
  var serviettes =        parseRulesString('B234/S', 'Serviettes');
  var coral =             parseRulesString('B3/S45678', 'Coral');
  var maze =              parseRulesString('B3/S12345', 'Maze');
  var walledCities =      parseRulesString('B45678/S2345', 'Walled Cities');

  var rulesOptions = [conway, replicator, liveFreeOrDie, lifeWithoutDeath,
                        longLife, highLife, pseudoLife, serviettes, coral,
                        maze, walledCities];

  var startingRules = rulesOptions[0];

  var rulesService = {

    rulesOptions: rulesOptions,
    effectiveRules: startingRules,

    checkForChange: function(alive, neighborCount){
      if(alive){
        // Should change to dead if it's *not* in the 'S'urvive array
        return (this.effectiveRules.S[neighborCount]===undefined);
      }else{
        // Should change to alive if it *is* in the 'B'irth array
        return (this.effectiveRules.B[neighborCount]!==undefined);
      }
    }

  };

  function parseRulesString(rulesString, displayName){
    var newRules = {
      name: rulesString,
      displayName: (displayName ? displayName+' ('+rulesString+')' : rulesString),
      B: {},
      S: {}
    };

    var b = rulesString.split('/')[0];
    subParse(b, newRules.B);
    newRules.birthRules = b.length > 1 ? b.substring(1) : '';

    var s = rulesString.split('/')[1];
    subParse(s, newRules.S);
    newRules.surviveRules = s.length > 1 ? s.substring(1) : ''
    
    return newRules;
  }

  function subParse(subRulesString, rulesArr){
    if(subRulesString.length==1){
      // was simply 'S', w/ no numbers, for example
      return;
    }
    var numbers = subRulesString.substring(1);
    for(var i=0; i < numbers.length; i++){
      rulesArr[numbers.charAt(i)] = true;
    }
  }

  return rulesService;

}]);
