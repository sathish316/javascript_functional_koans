describe("About Monads", function() {

  var sine = function(x){ return Math.sin(x)};

  var cube = function(x){ return x * x * x};

  var sineDebug = function(x){
    return [Math.sin(x), 'sine was called.'];
  };

  var cubeDebug = function(x){
    return [x * x * x, 'cube was called.'];
  };

  var compose = function(f, g){
    return function(x){
      return f(g(x));
    }
  }

  describe("Composing functions", function(){
    it("can be composed by nesting functions", function(){
      var sineCubed = cube(sine(Math.PI/6));
      expect(sineCubed.toPrecision(3)).toEqual(FILL_ME_IN);
    });

    it("can use compose function for composing functions having same signature", function(){
      var sineCubed = compose(cube, sine);
      expect(sineCubed(Math.PI/6).toPrecision(3)).toEqual(FILL_ME_IN);
    });

    it("cannot compose functions if the signatures dont match", function(){
      var sineCubed = compose(cubeDebug, sineDebug);

      var value = sineCubed(Math.PI/6)[0];
      expect(isNaN(value)).toBe(FILL_ME_IN);
    });

    var composeDebuggable = function(f, g){
      return function(x){
        var gx = g(x),
          y = gx[0],
          s = gx[1],
          fy = f(y),
          z = fy[0],
          t = fy[1];
        return [z, s+t];
      };
    };

    it("can compose functions having different signatures using glue functions", function(){
      var sineCubed = composeDebuggable(cubeDebug, sineDebug);
      var valueWithDebug = sineCubed(Math.PI/6);

      expect(valueWithDebug[0].toPrecision(3)).toEqual(FILL_ME_IN);
      expect(valueWithDebug[1]).toEqual(FILL_ME_IN);
    });
  })

  describe("Writer Monad", function(){

    // (Number -> (Number, String)) -> ((Number, String) -> (Number, String))
    function bind(f){
      return function(tuple){
        var x = tuple[0],
          s = tuple[1],
          fx = f(x),
          y = fx[0],
          t = fx[1];
        return [y, s+t];
      }
    }

    describe("bind", function(){
      it("can covert debuggable functions to have composable signatures", function(){
        var f = compose(bind(cubeDebug), bind(sineDebug));
        var result = f([Math.PI/6, '']);

        expect(result[0].toPrecision(3)).toEqual(FILL_ME_IN)
        expect(result[1]).toEqual(FILL_ME_IN)
      });
    });

    // Number -> (Number, String)
    function unit(x){
      return [x, ''];
    }

    describe("unit", function(){
      it("can take a value and wrap it in a container for composable functions", function(){
        var f = compose(bind(cubeDebug), bind(sineDebug));
        var result = compose(f, unit)(Math.PI/6);

        expect(result[0].toPrecision(3)).toEqual(FILL_ME_IN)
        expect(result[1]).toEqual(FILL_ME_IN)
      });

      it("can convert any function into a debuggable one", function(){
        var round = function(x){ return Math.round(x) };
        var roundDebug = function(x){ return unit(round(x)) };

        var result = roundDebug(5.5);
        expect(result[0]).toEqual(FILL_ME_IN);
        expect(result[1]).toEqual(FILL_ME_IN);
      });
    });

    //(Number -> Number) -> (Number -> (Number, String))
    function lift(f){
      return compose(unit, f);
    }

    describe("lift", function(){
      it("can convert any function into a debuggable function", function(){
        var round = function(x){ return Math.round(x) };
        var roundDebug = lift(round);

        var result = roundDebug(5.5);
        expect(result[0]).toEqual(FILL_ME_IN);
        expect(result[1]).toEqual(FILL_ME_IN);

      });
    });

    it("composes bind and unit to separate debugging and I/O concerns", function(){
      var sinDebug = function(x) {return [Math.sin(x), 'sin was called.']}
      var asinDebug = function(x) {return [Math.asin(x), 'asin was called.']}

      var asinOfSin = compose(compose(bind(asinDebug), bind(sinDebug)), unit);

      // asin(sin(x)) = x | 0 < x < PI/2
      var x = '1.5';
      var result = asinOfSin(x);

      expect(result[0].toPrecision(2)).toEqual(FILL_ME_IN);
      expect(result[1]).toEqual(FILL_ME_IN)
    });

  });

  describe("List Monad", function(){

    var animalTree = {
      vertebrates: {
        fish: {salmon: 'Salmon'},
        reptiles: {snake: 'Snake'},
        mammals: {monkey: 'Monkey', man: 'Man'}
      },
      invertebrates: {}
    }

    // Object -> [Object]
    function children(object){
      var ary = [];
      for(var key in object){
        ary.push(object[key]);
      }
      return ary;
    }

    it("should find the children of species", function(){
      var mammals = animalTree['vertebrates']['mammals'];
      expect(children(mammals)).toEqual(FILL_ME_IN)
    });

    // Object -> [Object]
    function grandchildren(node){
      var output = [];
      var childs = children(node);
      for(var i = 0; i < childs.length; i++){
        output = output.concat(children(childs[i]));
      }
      return output;
    }

    it("should find the grandchildren of species", function(){
      expect(grandchildren(animalTree['vertebrates'])).toEqual(FILL_ME_IN);
    });

    it("cannot find the grandchildren of species by direct composition", function(){
      // children is not symmetric and is not composable
      var grandchildren = compose(children, children);
      expect(grandchildren(animalTree['vertebrates'])).toEqual(FILL_ME_IN);
    });

    it("can use bind and unit to compose children to take an Object or List", function(){
      // a -> [a]
      var unit = function(x) { return [x] };

      // (a -> [a]) -> ([a] -> [a])
      var bind = function(f){
        return function(list){
          var output = [];
          for(var i = 0; i < list.length; i++){
            output = output.concat(f(list[i]));
          }
          return output;
        }
      }

      // [Object] -> [Object]
      var grandchildren = compose(bind(children), bind(children));
      // Object -> [Object]
      grandchildren = compose(compose(bind(children), bind(children)), unit);

      var vertebrates = animalTree['vertebrates'];
      var result = grandchildren(vertebrates);

      expect(result).toEqual(FILL_ME_IN);
    })
  })
});
