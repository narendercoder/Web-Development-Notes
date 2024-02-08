//currying
//Currying is a function that takes one argument at a time and returns a new function expecting the next argument. 
//transforms a function with multiple arguments into a nested series of functions, each taking a single argument.
//It is a conversion of functions from callable as f(a,b,c)into callable as f(a)(b)(c).
//They are constructed by chaining closures by immediately returning their inner functions simultaneously.

//Normal function
function func(a, b) {
      return `${a} ${b}`;
}
console.log(func(5,6))

//currying
function f(a) {
    return function (b) {
        return `${a} ${b}`;
    };
}
  
console.log(f(5)(6)); // 5 6

//* Why do we use it
//1 To avoid passing same variable again and again
//2 To create higher order function
//3 To make function pure and less prone to error.


/*Simple function*/ 
const add = (a, b, c)=>{
    return a+ b + c
}
console.log(add(1,2 ,3)); // 6

/* Curried Function */
const addCurry = (a) => { // takes one argument
    return (b)=>{                 //takes second argument
        return (c)=>{             //takes third argument
            return a+b+c
        }
    }
}
console.log(addCurry(1)(2)(3)); //6
console.log(addCurry(1)); // function addCurry(b)

console.log(addCurry(1)(2)); // function addCurry(c)
// So each function returns the inner function