  describe("Functions", function(){

    describe("As First class objects", function(){

      it("can be assigned to var", function(){
        function add(a, b){
          return a + b;
        }
        expect(add(2, 3)).toEqual(5);

        // Int and Strings are first class objects in a language and can
        // be assigned to var. Similary functions can be assigned to vars
        var multiply = function(a, b){
          return a * b;
        }
        expect(multiply(2,3)).toEqual(6);
      });

      it("can be passed as argument to another function", function(){
        function calculate(operation, a, b){
          return operation(a, b);
        }
        var add = function(a, b){ return a + b}
        var multiply = function(a, b) { return a * b}

        expect(calculate(add, 5, 10)).toEqual(15);
        expect(calculate(multiply, 5, 10)).toEqual(50);
      });


    });
  });
