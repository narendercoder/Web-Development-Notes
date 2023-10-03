console.log("Call, Bind and Apply in JS");
// Call,Bind and apply are method og explicit object binding
// What is call?
// When we want to bind an object with an function we use call
var obj = { name: "Narender" };

function sayHello(age) {
  return "Hello " + this.name + " is " + age; // Hello  is 24
  // this.name points to window and window does not have name so undefined
  // what if we want to use obj.name for this.name, we use call()
}
console.log(sayHello(24)); //Hello is 24
// call(obj to be used as current object,arguments) is syntax of call()
console.log(sayHello.call(obj, 24)); // Hello Narender is 24

// What is apply?
// Apply is same as call but it sends all arguments in form of an array
// we can pass other arguments like [24,"Software Engineer",'Food']
console.log(sayHello.apply(obj, [24])); // Hello Narenderis 24

// What is bind?
// Instead of calling there only, it returns us a function which can be used later any number of times
const bindFunc = sayHello.bind(obj);

// We can also pass other arguments like 24,"Software","Food"
console.log(bindFunc(24)); // Hello Narender is 24
console.log(bindFunc(25)); // Hello Narender is 25

// Interview Questions
// 1: What is the output
const person = { name: "Narender" };

function sayHi(age) {
  return `${this.name} is ${age}`;
}

console.log(sayHi.call(person, 24)); // Narender is 24
// bind returns us a function that can be called later
console.log(sayHi.bind(person, 24)); // BoundFunctionObject { … }

// 2
const age = 10;

var person1 = {
  name: "Narender",
  age: 51,
  getAge: function () {
    return this.age;
  },
};

var person2 = { age: 21 };
console.log(person1.getAge()); // 51
// call will bind person2 object with myAge so 24 prints
// It works same with apply and bind
console.log(person1.getAge.call(person2)); // 21

// 3
var status = "🍔";

setTimeout(() => {
  const status = "💯";

  const dat = {
    status: "🥇",
    getStatus() {
      return this.status;
    },
  };
  console.log(dat.getStatus()); // 🥇
  // Inside a function, this points to global object and setTimeout is an function
  console.log(dat.getStatus.call(this)); // 🍔
}, 0);

// 4 - Call printAnimals such that it ptints all animals in object
const animals = [
  { species: "Lion", name: "King" },
  { species: "Dog", name: "Kaalu" },
];

function printAnimals(i) {
  this.print = function () {
    console.log("#" + i + " " + this.species + ": " + this.name);
  };
  this.print();
}

/*
output is
#0 Lion: King
#1 Dog: Kaalu
*/
// We use a for-loop because, animals is a array of objects so we need to pass every object inside function using looping
for (let i = 0; i < animals.length; i++) {
  printAnimals.call(animals[i], i);
}

// 5: Append an array to another array
const array = ["a", "b"];
const elements = [0, 1, 2];

array.push(elements);
// It takes whole elements array and push inside array instead we want to push only element of elements array
console.log(array); // Array(3) [ "a", "b", (3) […] ]

// apply takes array as argument so we pass elements as argument
// push will take element one by one and push in the array
array.push.apply(array, elements);
console.log(array); //[ "a", "b", 0, 1, 2 ]

// 6: Using apply to enhance built-in functions
// Find max/min number in an array
console.log(Math.max(3, 5, 6, 7)); // 7
const number = [1, 2, 4, 6];
console.log(Math.max(number)); // NaN because Math.max does not work in an array

// We can also do this using loop
max = -Infinity;
min = +Infinity;

for (let i = 0; i < number.length; i++) {
  if (number[i] > max) {
    max = number[i];
  }
  if (number[i] < min) {
    min = number[i];
  }
}

console.log(max, " ", min); // 6   1

// But there is other short way also
// Here we do not need any object so we paas null
console.log(Math.max.apply(null, number)); // 6
console.log(Math.min.apply(null, number)); // 1

// 7: Bound Function
function f() {
  console.log(this);
}

let user = {
  // bind will return a function with a null context
  g: f.bind(null),
};

user.g(); // Window Object

// 8: Bind Chaining
// Once an function is bind to an particular object, it will remain bind to that particular object
// bind chaining does not exits
// so below chaining will not change the name to Narender, it will remain to john
function f1() {
  console.log(this.name);
}

f = f.bind({ name: "John" }).bind({ name: "Narender" });
f(); // Object { name: "John" }

// 9: Fix the line 180, checkpassword(user1.loginSuccess,loginfail) to make code work properly
/*
function checkPassword(success, failed) {
  let password = prompt("Password? ", "");
  if (password == "Narender Singh") success();
  else failed();
}

let user1 = {
  name: "Mohit Sharma",
  loginSuccessful() {
    console.log(`${this.name} Logged In`);
  },

  loginFailed() {
    console.log(`${this.name} Failed to log In`);
  },
};

checkPassword(user1.loginSuccessful, user1.loginFailed); // Logged in, failed to logged in
// No this.name works as its not there in the function checkPassword to which this refers to so we have to use bind() to bind user1 with checkPassword

checkPassword(user1.loginSuccessful.bind(user1), user1.loginFailed.bind(user1)); // Logged in, failed to logged in
*/

// 10: Explicit binding with Arrow function
// Arrow function works the same, does not matter with or without call,bind or apply

const age1 = 10;
var person3 = {
  name: "Narender",
  age: 21,
  getAgeArrow: () => console.log(this.name),
  getAge: function () {
    console.log(this.age);
  },
};

var person4 = { age: 31 };

person3.getAgeArrow.call(person4); // undefined as its a arrow function so it refers to window object
person3.getAge.call(person4); // 24 as its a normal function

// Most Important Questions
// 11: Polyfill for call method
let car1 = {
  color: "Red",
  company: "Mercedes",
};

function purchaseCar(currency, price) {
  console.log(
    `I have Purchased ${this.color} - ${this.company} car for ${currency}${price}`
  );
}

// Let see output of normal call() method
purchaseCar.call(car1, "₹", 1000000); // I have Purchased Red - Mercedes car for ₹1000000

// So we see we need to pass arguments like above statement so
Function.prototype.myCall = function (context = {}, ...args) {
  // context is the object, we keep it empty initially
  // First we check if our function is of type function or not
  // if not, throw error
  // args contains all arguments which can be many in number so we use spread operator
  // our 'this' contain that function
  if (typeof this !== "function") {
    throw new Error(this + "It's not callable");
  }

  // we store function named fn inside our context object which points to 'this'
  context.fn = this;
  // Now we call that fn with arguments passed to our call method
  context.fn(...args);
};

purchaseCar.myCall(car1, "₹", 1000000); // I have Purchased Red - Mercedes car for ₹1000000

// Polyfill of Apply
// Same as call() just that we use array for arguments
Function.prototype.myCall = function (context = {}, args = []) {
  // context is the object, we keep it empty initially
  // First we check if our function is of type function or not
  // if not, throw error
  // args is an array which is empty initially
  // our 'this' contain that function
  if (typeof this !== "function") {
    throw new Error(this + "It's not callable");
  }

  // Edge case: check if args is an array or not, if not throw error
  if (!Array.isArray(args)) {
    throw new TypeError("CreateListFromArrayLike called on non-object");
  }

  // we store function named fn inside our context object which points to 'this'
  context.fn = this;
  // Now we call that fn with arguments passed to our call method
  context.fn(...args);
};

purchaseCar.myCall(car1, ["₹", 1000000]); // I have Purchased Red - Mercedes car for ₹1000000

// Polyfill for Bind
const fnc = purchaseCar.bind(car1);
// const fnc = purchaseCar.bind(car1,"$", 104566); is also correct or we give arguments below

console.log(fnc("$", 104566)); // I have Purchased Red - Mercedes car for $104566

Function.prototype.myBind = function (context = {}, ...args) {
  // context is the object, we keep it empty initially
  // First we check if our function is of type function or not
  // if not, throw error
  if (typeof this !== "function") {
    throw new Error(this + "cannot be bound as it's not callable");
  }

  context.fnction = this;
  // Return a function for bind()
  return function (...newArgs) {
    return context.fnction(...args, ...newArgs);
  };
};

const fnct = purchaseCar.myBind(car1); // I have Purchased Red - Mercedes car for ₹1000000

console.log(fnct("₹", 1000000));