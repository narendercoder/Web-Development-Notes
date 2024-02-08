//*closures
//A closure is a feature of JavaScript that allows inner functions to access the outer scope of a function.
//Lexical Scoping: A function scope’s ability to access variables from the parent scope is known as lexical scope. We refer to the parent function’s lexical binding of the child function as “lexically binding.”
// var sum = function(a){
//     console.log(a);
//     var c = 4;
//     return function(b){
//         return a+b+c;
//     }
// }
// var store = sum(5); //calling
// console.log(store(6))

// var sum = function(a,b,c){
 
//     return{
//         getSumTwo:function(b){
//             return a+b;
//         },
//         getSumThree:function(b){
//             return a+b;
//         }
//     }
// }
// var store = sum(3,4,5); //calling
// console.log(store.getSumTwo())
// console.log(store.getSumThree())

//*closure scope chain
// Every closure has 3 scopes, local scope,outer function scope and global scope.
// Closure function has access to all the scopes, parent scope, parent's parent scope

// var branch = "EEE";
// function makeFunc1() {
//   var name = "Goggle";
//   // It has access to branch variable also which is parent's parent
//   function display1(num) {
//     console.log(name, num, branch);
//   }
//   return display1;
// }

// makeFunc1()(5); // Goggle 5 EEE

// another example
// var e = 10;
// function sum(a) {
//   return function (b) {
//     return function (d) {
//       return a + b + d + e;
//     };
//   };
// }

// console.log(sum(1)(2)(4)); // 17

//*Output based question

//*Ques1: What will be logged to console?

// let count = 0;
// (function printCount(){
//     if(count === 0){
//         let count = 1; //shadowing
           // let is block scope so count=1 inside this block only
//         console.log(count); //1
//     }
//     console.log(count) //0
// }
// )

//*Ques2: Write a function that would allow you to do this

// function createBase(num){
//     return function(innerNum){
//         return innerNum + num;
//     }
// }

// var addSix = createBase(6);
// addSix(10); //return 16
// addSix(21); //return 27


//*time optimisation

/*
 function find(index){
    let a = [];
    for(let i = 0; i < 1000000; i++){
        a[i] = i * i;
    }
    console.log(a[index]);
}

console.time("6");
find(6);
console.timeEnd("6"); //32.68310546875 ms
console.time("12");
find(50);
console.timeEnd("12"); //47.7548828125 ms
*/



// function find(){
//     let a = [];
//     for(let i = 0; i < 1000000; i++){
//         a[i] = i * i;
//     }
//     // console.log(a[index]);
//     return function(index){
//          console.log(a[index]);
//     }
    
// }

// const closure = find();
// console.time("6");
// closure(6);
// console.timeEnd("6"); //0.353759765625 ms
// console.time("50");
// closure(50);
// console.timeEnd("50"); //0.065185546875 ms

//*Ques4: Block scope and setTimeout output

// function a(){
//     for(var i=0; i<3; i++){
//         setTimeout(function log(){
//             console.log(i);
               // var is not a block scoped, it is function scoped so it does not create new execution context everytime 
               //so this setTimeout call will go on and last value of i was 3 after which it came out of  loop so we get 3 3 3 in answer
//         }, i*1000);
//     }
// }

// a(); //3 3 3

// function b(){
//     for(let i=0; i<3; i++){
//         setTimeout(function log(){
//             console.log(i);
                  // let is a block scoped,so it does create new execution context everytime so we get 0 1 2 in answer
//         }, i*1000);
//     }
// }

// b(); //0 1 2 


// Same question without using let but output should be 0 1 2 only so we use closures
// function a2() {
//     for (var i = 0; i < 3; i++) {
//       // We will use closure here and this function everytime will create its own execution context
//       function inner(i) {
//         setTimeout(function log() {
//           console.log(i);
//         }, 1000);
//       }
//       inner(i);
//     }
//   }
  
//   a2(); // 0 1 2


//*Ques5: How would you use a closure to create a private counter?
// Counter which is not accessible outside is private counter

// function Counter() {
//     var counter = 0;
//     function add(increment) {
//       counter += increment;
//     }
  
//     function retrieve() {
//       return "Counter = " + counter;
//     }
  
//     return {
//       add,
//       retrieve,
//     };
//   }
  
//   const c = Counter();
//   c.add(5);
//   c.add(10); // Till here counter value should have become 15
  
//   console.log(c.retrieve()); // Counter = 15
  

//* Ques6: What is Module Pattern?
// We have a private function which does the work we need to hide
// we have a public method which can access private method and can be returned to user

// var Module = (function () {
//     function privateMethod() {
//       console.log("Private");
//     }
  
//     return {
//       publicMethod: function () {
//         console.log("Public");
//       },
//     };
//   })();
  
// Module.publicMethod();   // Public
// Module.privateMethod(); // Uncaught TypeError: Module.privateMethod is not a function

//*Ques7: We have a function below, make it run only once
let view;
function runOnlyOnce() {
  view = "Closure Tutorial";
  console.log("This is " + view);
}

/*
We call it many times but it should be called only once
runOnlyOnce();
runOnlyOnce();
runOnlyOnce();
runOnlyOnce();
runOnlyOnce();
runOnlyOnce();
runOnlyOnce();
runOnlyOnce();
runOnlyOnce();
*/


let view1;
function runOnlyOnceAnswer() {
  let called = 0;
  return function () {
    if (called > 0) {
      console.log("Already called");
    } else {
      view1 = "Narender Singh";
      console.log("Hello! " + view1);
      called++;
    }
  };
}

let calling = runOnlyOnceAnswer();
calling(); // This is lokeshlokesh
calling(); // Already called
calling(); //Already called
calling(); //Already called
calling(); //Already called
calling(); //Already called
calling(); //Already called
calling(); //Already called
calling(); //Already called
calling(); //Already called
calling(); //Already called


//Ques8: Once Polyfill

function once(func, context){
  let ran;
  
  return function(){
    if(func){
      ran = func.apply(context || this, arguments); 
      // make it null so that it does not run again
      func = null;
    }
    return ran;
  }
}

const hello = once(() => console.log("hello"));

hello();
hello();
hello();
hello();
hello();
hello();
hello();
// Output of above multiple calls: only one time 'hello'

//* Ques9: Memoize/caching

// Polyfill of memoize/caching
/*
const clumsySquare = (num1, num2) => {
  for (let i = 1; i <= 100000000; i++) {}

  return num1 * num2;
};
*/


function myMemoise(fn, context){
  const res = {};
  return function (...args){
    var argsCache = JSON.stringify(args);
    if(!res[argsCache]){
     res[argsCache] = fn.call(context || this, ...args)
    }
      return res[argsCache];
  }
}


const clumsyProduct = (num1, num2) => {
  for (let i = 1; i <= 100000000; i++) {}

  return num1 * num2;
};

const memo = myMemoise(clumsyProduct);
console.time("first call");
console.log(memo(2345, 2456));
console.timeEnd("first call"); // 106ms

// if we call same function for same arguements we will see,we get answer very quickly
console.time("first call");
console.log(memo(2345, 2456));
console.timeEnd("first call"); // 0ms

//*Ques 10: Difference between closure and scope


// When we create a Function within a another function, then inner function is the closure. 
//this closure usually returned.so, we can use outer function variables at a later time.

// Scope defines what variable we have access to

//scopes: Global scope, local scope
// In case of closures: Global scope, Outer Scope local scope