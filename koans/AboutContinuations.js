describe("About Continuations", function() {

  it("can avoid the problem of lazy evaluated functions not executed in order", function() {
    var value = 10;
    var doubleIt = function(x) { value = 2 * value };
    var squareIt = function(x) { value = value * value };

    function execute(one, two) {
      two();
      one();
    }

    execute(doubleIt, squareIt);
    expect(value).toEqual(FILL_ME_IN);
  });

  it("can execute functions in order", function(){
    var doubleIt = function(x){ return 2 * x};
    var squareIt = function(x){ return x * x};

    var value = continuation(doubleIt, 10, squareIt);

    expect(value).toEqual(FILL_ME_IN);
  });

});
