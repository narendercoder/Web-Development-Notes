//*closures
//A closure is a feature of JavaScript that allows inner functions to access the outer scope of a function.
//Lexical Scoping: A function scope’s ability to access variables from the parent scope is known as lexical scope. We refer to the parent function’s lexical binding of the child function as “lexically binding.”
var sum = function(a){
    console.log(a);
    var c = 4;
    return function(b){
        return a+b+c;
    }
}
var store = sum(5); //calling
console.log(store(6))

var sum = function(a,b,c){
 
    return{
        getSumTwo:function(b){
            return a+b;
        },
        getSumThree:function(b){
            return a+b;
        }
    }
}
var store = sum(3,4,5); //calling
console.log(store.getSumTwo())
console.log(store.getSumThree())

//Ques1: What will be logged to console?

let count = 0;
(function printCount(){
    if(count === 0){
        let count = 1; //shadowing
        console.log(count); //1
    }
    console.log(count) //0
}
)