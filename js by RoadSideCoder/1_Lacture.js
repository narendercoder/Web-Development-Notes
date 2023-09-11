//*Output

//riting into an HTML element, using innerHTML
//Writing into the HTML output using document.write().
//Writing into an alert box, using window.alert().
//Writing into the browser console, using console.log().

//*JavaScript Variables

//*scope: scope is a certain region of a program where a defined variable exists and can be recognized and beyond that it cannot be recognized so there can be multiple types of scopes for example global scope block scope functional scope

//var - global scope
//let and const - block scope

// {
//     var a = 5;
//     let b = 6;
//     const c = 7;
//     console.log(a)
//     console.log(b)
//     console.log(c)
// }

// console.log(a)
// console.log(b)
// console.log(c)

//* Variable Scope in Nested Function
//The nested functions have their own scope. But they also have access to the parent functions scope. Hence you need to remember two important points.
//A nested function is private to containing function
//A nested function can access the containing function’s scope
function test() {
  const a = 1;
  function logToConsole() {
    const b = 2;
    console.log(a);
  }
  console.log(b);

  logToConsole();
}

test();

//*variable shadowing

//Shadowing:-

//Variable shadowing occurs when an inner scope declares a variable
//with the same name as an outer scope. This results in the inner scope’s variable
//overriding the outer scope’s variable and shadowing it.

// function test(){

//     let a = "Hello";

//     if(true){
//         let a = "Hi";
//         console.log(a);
//     }

//     console.log(a);
// }
// test ()

//*Illegal Shadowing
//If you create a variable in a global scope with the let keyword and
//another variable with the var keyword in a block scope but the exact same name,
//it will throw an error. This is called illegal shadowing.

// function func() {
//     var a = 'Geeks';
//     let b = 'Geeks';

//     if (true) {
//         let a = 'GeeksforGeeks'; // Legal Shadowing
//         var b = 'Geeks'; // Illegal Shadowing
//         console.log(a); // It will print 'GeeksforGeeks'
//         console.log(b); // It will print error
//     }
// }
// func();

//*Declaration

//var can redeclared in same scope
//let, const cannot be redeclared in the same scope

// var a;
// var a;
// let b;
// let b;
// const c;
// const c;

//*Declaration with initialisation

//const cannot  be declared without initializing

//* Re-Initialisation

//const can naver be updated

//*Hoisting

//Hoisting is the default behavior of moving all the declarations
//at the top of the scope before code execution.


