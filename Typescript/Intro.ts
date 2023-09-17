//* Introduction

//Typescript is superset of javascript

var user = {
    name: "Narender",
    age: 10,
  };
  
  console.log("Narender Singh Bisht");
//   console.log(user.email) //error

//*Write a program to add two numbers?

//* func define 
// function sum(a, b){
//     return a+b;
// }

//* func call
// console.log(sum(5, "5"))

//@ts-ignore

//How to catch error ans solve it

//typescript function
function sum(a:number, b:number){
    return a + b;
}

//console.log(sum(5, "5")) //error
console.log(sum(5, 5))



