gameOfLifeApp.service('rulesService', ['$log', 'gameDataService', function($log, gameDataService){

  var conway = parseRulesString('B3/S23', 'Conway\'s');
  var b38s238 = parseRulesString('B38/S238');
  var b34s235 = parseRulesString('B34/S235');
  var coral = parseRulesString('B3/S45678', 'Coral');
  var maze = parseRulesString('B3/S12345', 'Maze');
  var walledCities = parseRulesString('B45678/S2345', 'Walled Cities');

  var rulesOptions = [conway, b38s238, b34s235, coral, maze, walledCities];
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
    var b = rulesString.split('/')[0].substring(1);
    var s = rulesString.split('/')[1].substring(1);
    for(var i=0; i < b.length; i++){
      newRules.B[b.charAt(i)] = true;
    }
    for(var i=0; i < s.length; i++){
      newRules.S[s.charAt(i)] = true;
    }
    return newRules;
  }

  return rulesService;

}]);
