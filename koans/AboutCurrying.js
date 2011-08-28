describe("Currying", function() {

  it("can be used to partially apply functions and generate functions", function() {
    function power(x, y){
      return Math.pow(x, y);
    }
    var square =  curry(power, 2);
    var cube = curry(power, 3);

    expect(square(4)).toEqual(16);
    expect(cube(4)).toEqual(64);
  });

});
