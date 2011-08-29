describe("Currying", function() {

  it("can be used to partially apply functions and generate functions", function() {
    function power(x, y){
      return Math.pow(x, y);
    }
    var square =  curry(power, 2);
    var cube = curry(power, 3);

    expect(square(4)).toEqual(FILL_ME_IN);
    expect(cube(4)).toEqual(FILL_ME_IN);
  });

  it("can be used to write functions that generate other functions", function(){
    function greeter(greeting){
      return function(name){
        return greeting + " " + name;
      };
    }

    var hello = greeter("Hello");
    var goodbye = greeter("Goodbye");

    expect(hello("Jack")).toEqual(FILL_ME_IN);
    expect(goodbye("Jack")).toEqual(FILL_ME_IN);
  });

});
