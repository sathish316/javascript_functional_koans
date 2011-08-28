var Vars = function(){
  var values = {
    foo: "bar"
  }
  return {
    get: function(name){ return values[name] },
    set: function(name, value){
      if(values[name] != null)
        return values[name];
      values[name] = value;
      return value;
    }
  };
}();
