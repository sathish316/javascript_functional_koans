describe("About Pattern Matching", function() {

  it("can be used to abstract branching to look like mathematical functions", function() {
    var fib = pattern([
      [0, 1],
      [1, 1],
      [_, function(n){
        return fib(n-2) + fib(n-1);
      }]
    ]);

    expect(fib(0)).toEqual(FILL_ME_IN);
    expect(fib(1)).toEqual(FILL_ME_IN);
    expect(fib(2)).toEqual(FILL_ME_IN);
    expect(fib(10)).toEqual(FILL_ME_IN);
  });

});
