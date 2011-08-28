function curry(f){
  var rightargs = Array.prototype.slice.call(arguments,1);
  return function(){
    Array.prototype.push.apply(arguments,rightargs);
    return f.apply(this, arguments);
  }
}

