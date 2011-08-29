describe("About Monads", function() {

  describe("Composing functions", function(){

    var sine = function(x){ return Math.sin(x)};

    var cube = function(x){ return x * x * x};

    it("can be composed by nesting functions", function(){
      var sineCubed = cube(sine(Math.PI/6));
      expect(sineCubed.toPrecision(3)).toEqual('0.125');
    });

    var compose = function(f, g){
      return function(x){
        return f(g(x));
      }
    }

    it("can use compose function for composing functions having same signature", function(){
      var sineCubed = compose(cube, sine);
      expect(sineCubed(Math.PI/6).toPrecision(3)).toEqual('0.125');
    });

    it("cannot compose functions if the signatures dont match", function(){
      var sine = function(x){
        return [Math.sin(x), 'sine was called.'];
      };
      var cube = function(x){
        return [x * x * x, 'cube was called.'];
      };
      var sineCubed = compose(cube, sine);

      var value = sineCubed(Math.PI/6)[0];
      expect(isNaN(value)).toBe(true);
    });

    var composeDebuggable = function(f, g){
      return function(x){
        var gx = g(x),
          y = gx[0],
          s = gx[1],
          fy = f(y),
          z = fy[0],
          t = fy[1];
          console.log(g(x));
        return [z, s+t];
      };
    };

    it("can compose functions having differnt signatures", function(){
      var sine = function(x){
        return [Math.sin(x), 'sine was called.'];
      };
      var cube = function(x){
        return [x * x * x, 'cube was called.'];
      };
      var sineCubed = composeDebuggable(cube, sine);
      var valueWithDebug = sineCubed(Math.PI/6);
console.log(valueWithDebug);
      expect(valueWithDebug[0].toPrecision(3)).toEqual('0.125');
    });

  })

});
