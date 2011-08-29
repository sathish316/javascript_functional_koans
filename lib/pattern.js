var _ = "any";

function pattern(arg_and_values){
  return function(arg){
    for(var i=0; i<arg_and_values.length; i++){
      var patternArg = arg_and_values[i][0];
      var patternValue = arg_and_values[i][1];
      if(arg == patternArg || patternArg == _){
        return typeof(patternValue) == 'function'? patternValue(arg) : patternValue;
      }
    }
  }
}
