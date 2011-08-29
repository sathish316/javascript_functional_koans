describe("About Closures", function() {

  it("can make functions refer to variables outside of their scope in surrounding functions", function() {
    function makePowerFn(power){
      return function(base){
        return Math.pow(base, power);
      };
    }

    var cube = makePowerFn(3);
    expect(cube(5)).toEqual(125);
  });

  it("can store local variables in heap instead of stack to be accessed outside of normal scope", function(){
    function makeIncrementer(){
      var n = 0;
      return function(){
        return ++n;
      }
    }

    var counter1 = makeIncrementer();
    var counter2 = makeIncrementer();

    counter1();
    counter1();
    expect(counter1()).toEqual(3);
    expect(counter2()).toEqual(1);
  });

});
