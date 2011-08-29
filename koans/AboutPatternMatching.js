describe("About Pattern Matching", function() {

  it("can be used to abstract branching to look like mathematical functions", function() {
    var fib = pattern([
      [0, 1],
      [1, 1],
      [_, function(n){
        return fib(n-2) + fib(n-1);
      }]
    ]);

    expect(fib(0)).toEqual(1);
    expect(fib(1)).toEqual(1);
    expect(fib(2)).toEqual(2);
    expect(fib(10)).toEqual(89);
  });

});
