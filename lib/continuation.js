function continuation(fn, arg, fnNext){
  return fnNext(fn(arg));
}
