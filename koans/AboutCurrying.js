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

  it("can be used to write functions that generate other functions", function(){
    function greeter(greeting){
      return function(name){
        return greeting + " " + name;
      };
    }

    var hello = greeter("Hello");
    var goodbye = greeter("Goodbye");

    expect(hello("Jack")).toEqual("Hello Jack");
    expect(goodbye("Jack")).toEqual("Goodbye Jack");
  });

});
