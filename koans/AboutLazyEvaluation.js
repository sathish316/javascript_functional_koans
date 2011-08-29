describe("About Lazy evaluation", function() {

  it("can abstract control structures", function() {
    function unless(condition, block){
      if(!condition)
        block();
    }

    var answer = 42;
    unless(true, function(){
      answer = -42;
    });

    expect(answer).toBe(FILL_ME_IN);
  });

  it("can generate infinite sequences", function(){
    function lazyFibonacci(){
      var a = 1;
      var b = 1;
      return function(){
        var next = a;
        a = b;
        b = next + b;
        return next;
      }
    }
    var next = lazyFibonacci();
    for(var i=0;i<10;i++){
      next();
    }

    expect(next()).toEqual(FILL_ME_IN);
  });

});
