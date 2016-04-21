
gameOfLifeApp.factory('exportService', ['$log', 'sampleWorldService', function($log, sampleWorldService){

  var exportService = {

    exportFormat: "life106",
    exportData: null,

    /**
    See http://www.mirekw.com/ca/ca_files_formats.html
    **/

    generateExportData: function(world, rules){
      if(this.exportFormat === 'life106'){
        this.exportData = this.asLif1_06_file(world, rules);
      }else{
        this.exportData = this.asJson(world, rules);
      }
    },

    getExportFormatExtension(){
      if(this.exportFormat === 'life106'){
        return ".LIF";
      }else{
        return ".json";
      }
    },

    asJson: function(world){
      var livingCells = getLivingCells(world);
  		var jsonWorld = {
  			"name": "#D generated at "+new Date(),
  			"height": world.length,
  			"width": world[0].length,
  			"livingCells": livingCells
  		};
  		return JSON.stringify(jsonWorld);
    },

    asLif1_06_file: function(world, rules){
      var livingCells = getLivingCells(world);
  		var lif1_06txt = "";

      // filetype and metadata
      lif1_06txt += "#Life 1.06\n";
      lif1_06txt += "#D generated at "+new Date() + "\n";

      // add rules
      lif1_06txt += build1_06RulesString(rules);

      // add living cells
      for(var i = 0; i < livingCells.length; i++){
        lif1_06txt += livingCells[i].x + " " + livingCells[i].y + "\n";
      }
  		return lif1_06txt;
    },

    getLivingCells: function(world){
      return getLivingCells(world);
    }

  };

  function getLivingCells(world){
    var livingCells = [];
    for(var i = 0; i < world.length; i++){
      for(var j = 0; j < world[0].length; j++){
        if(world[i][j].alive){
          livingCells.push({"x":j, "y":i});
        }
      }
    }
    return livingCells;
  }

  function build1_06RulesString(rules){
    var rulesString = "";
    if(rules.surviveRules=='23' && rules.birthRules=='3'){
      rulesString += "#N\n";
    }else{
      rulesString += "#R " + rules.surviveRules + "/" + rules.birthRules + "\n";
    }
    return rulesString;
  }

  return exportService;

}]);
