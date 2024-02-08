//functions in Javascript

//*anonymous Functions - It is a function that does not have any name associated with it
const Hi = function (){
    return "Hello";
}
console.log(Hi())


//*function decleration
function square(num){
    return num * num;
}
const result = square(5);
console.log(result)

//*function expression
const AddTwo = function (num){
    return num + num;
}
console.log(AddTwo(5));

//*First-class functions 
//if functions in that language are treated like other variables.
//So the functions can be assigned to any other variable or passed as an argument or can be returned by another function.

function displaySquare(fn){
    console.log("Square is " + fn(5))
}
displaySquare(square) //display 25

//!A function that returns a function or takes other functions as arguments is called a higher-order function.

//*IIFE (Immediately Invoked Function Expression)
//An IIFE (Immediately Invoked Function Expression) is a function that runs the moment it is invoked or called in the JavaScript event loop.

// (function multiplyWithFour(num) {
//     console.log(num * 4);
//   })(4); // 16

// O/P based question on IIFE
// O/P of below function will be 1
// (function (x) {
//     return (function (y) {
//       console.log(x);
//     })(2);
//   })(1);


//*function scope

var num1 = 20,
num2 = 3,
name = "narender";

function multiply(){
 return num1 * num2;
}

multiply(); //returns 60;
 
//*A nested Function

function getScore(){
    var num1 = 2,
        num2 = 3;

    function add(){
        return name + " scored" + (num1 + num2);
    }
    return add();
}

getScore() //Returns narender scored 5


//o/p Based Questions

for(let i = 0; i < 5; i++){
    setTimeout(function(){
        // console.log(i)
    }, i*1000) // 1 2 3 4 will be printed after gap of one second each as let is blocked scope so seperate function call happen everytime and executed in the call stack managed by event loop
}

for(var i = 0; i < 5; i++){
    setTimeout(function(){
        // console.log(i)
    }, i*1000)  // 5 5 5 5  will be printed after gap of one second each as var does not have block scope so only one function call happens
}


//*Hoisting
// Function are hoisted differently than a normal variable
// Variables are assigned undefined initially but in case of function, complete function is copied so it does not give undefined

functionName(); //display Narender

function functionName(){
    console.log("Narender")
}

x = 5;

console.log(x); // 5

// We have a functional scope also inside a function
function fun() {
    var x = 50;
    console.log(x);
  }
  
  fun(); // 50 as this x has functional scope
  console.log(x); // 5 as its global scope


// O/P based question on function hoisting
var y = 21;

var func = function () {
  console.log(y);
  var y = 40;
};

func(); // gives undefined as function will have its separate execution context where variable y will be hoisted as undefined initially

//* Params vs Arguments

// num is a parameter
function print(num) {
    console.log(num * num);
  }
  
print(3); // 3 is Arguement


//* Spread vs Rest Operator

// This is spread operator
var arr = [2, 3];

function work2(...nums) {
    // ...num above is rest operator
    console.log(nums);
}
work2(...arr); //spread operator

// I/P based question on Params vs Args
// Below code gives us error
// Because, rest or spread operator should always be the last parameter in a parameter list
/*

const fn = (a, ...n ,x,y)=>{
    console.log(x,y);// 5 6
};

fn(3,4,5,6);


*/
// Below code works fine
// const fn = (a, x, y, ...n) => {
//     console.log(x, y); // 4 5
//   };
  
//   fn(3, 4, 5, 6);

//*callback function

// Function passed into another function as an arguement, which is then invoked inside the outer function to complete some kind of routine or action

// map,filter,reduce,setTimeout,eventListeners etc use callback functions

/*
document.addEventListener('click',()=>{

})
*/

//example
// function greeting(name){
//     alert("Hello " + name);
// }
// function processUserInput(callback){
//     var name = prompt("Please enter your name");
//     callback(name);
// }

// processUserInput(greeting);

//* Arrow functions
const adding = (num1, num2) => {
    return num1 + num2;
};

/*

//*Difference between normal function and arrow function
//1. Syntax is different
function add(num){
    return num + num;
}
const add = (num) => {
    return num + num;
}


//2. We can avoid return keyword if there is only one statement for arrow function

const add = (num) => num + num;

3. Argument
 function fn(){
    console.log(arguments)
 }
fn(1, 3, 2);

 const fnArr = () =>{
     console.log(arguments)
}
fnArr(1, 3, 2);

// 4. 'this' keyword -> works differently for both normal and arrow function
let user = {
  username: "Narender",
  rc1: () => {
    console.log("hey yoo " + this.username);
    // this is pointing to global object here
  },
  rc2() {
    console.log("hello ji " + this.username);
  },
};

user.rc1(); // hey yoo undefined
user.rc2(); // hello ji Narender

*/

