// 'this' keyword in js (Implicit Binding)
// Explain 'this' keyword

//In JavaScript, the this keyword refers to an object.
//Which object depends on how this is being invoked (used or called).
//The this keyword refers to different objects depending on how it is used:

/*
In an object method, this refers to the object.
Alone, this refers to the global object.
In a function, this refers to the global object.
In a function, in strict mode, this is undefined.
In an event, this refers to the element that received the event.
Methods like call(), apply(), and bind() can refer this to any object. 
*/

this.a = 5;
console.log(this.a); // points to window object

function getParam(){
    console.log(this.a); //5
}

getParam();

let user={
   name: "narender",
   age: "23",
   getDetails(){
    // Here inside normal function, this will refer to its parent object, not the window object so we print 'narender'
    // if there is no property named 'name' inside object user, then this.name will print undefined
    console.log(this.name);
   },
}

user.getDetails();

// Let say there is object inside object then 'this' will point to?
let user1 = {
    name: "mohit",
    age: 213,
    childObj: {
      firstname: "rohit",
      getDetails() {
        // this will point to childObj now so this.name gives undefined as there is no property with 'name' inside childObj and this.firstname gives Rohit
        console.log(this.name + " " + this.firstname); // undefined rohit
      },
    },
  };
  
user1.childObj.getDetails();

  
//* Let us replace normal function with arrow function
  let user2 = {
    name: "Narender",
    age: 21,
    getDetails: () => {
      console.log(this.age); // undefined, nothing prints
      console.log(this); // window object prints
    },
  };
  
  user2.getDetails();
  
  // let say we make a normal function and inside it we make an arrow function
  // then, arrow function ka 'this' will point to normal function which is pointing to user3 object so 'this' will point to user3 object
  let user3 = {
    name: "Virat",
    age: 56,
    getDetails() {
      // now 'this' will refer to getDetails which points to user3 object
      const nestedArrow = () => console.log(this.name); // Virat
      nestedArrow();
    },
  };
  
  user3.getDetails(); // Virat
  
  //* 'this' inside a class or constructor
  // Inside a class, this points to variables inside constructor
  class user4 {
    constructor(n) {
      this.name = n;
    }
    getName() {
      console.log(this.name);
    }
  }
  
  const User = new user4("Narender");
  console.log(User); // Object { name: "Narender" }
  
  User.getName(); //Narender
  
  //* Interview Questions on 'this' keyword
  
  // 1: What is the output
  const user5 = {
    firstname: "Narender!",
    getName() {
      // this will point to user5 object so Narender! will be printed
      const firstname = "Narender Singh";
      return this.firstname;
    },
  };
  
  console.log(user5.getName()); // Narender!
  
  // 2: What is the result of accessing its ref? why?
  function makeUser() {
    return {
      name: "John",
      ref: this,
    };
  }
  
  // According to what we have studied till now, ref should point to {name: "John"} vala object
  // But when we call makeUser(), it refers to window object so 'this' refer to makeUser which is pointing to window object so ref also refers to window object
  
  let res = makeUser();
  console.log(res); // Object { name: "John", ref: Window }
  console.log(res.ref.name); // Nothing printed as there is not key named 'name' in window object and ref is pointing to window object
  
  // To make ref point to name:"John"
  // We can make a normal function inside ref which will refer to {name:"John"} vala object then
  function makeUser1() {
    return {
      // As ref() is a function now so if we use 'this' inside it, it refers to parent ref() which points to object {name:"John"} so John printed
      name: "John",
      ref() {
        return this; // John
      },
    };
  }
  
  let res1 = makeUser1();
  console.log(res1); // Object { name: "John", ref: ref() }
  console.log(res1.ref().name); // John
  
  // 3: What is the output
  const user6 = {
    username: "Mohit Sharma",
    logMessage() {
      console.log(this.username); // undefined
    },
  };
  
  // What happens is instead of pointing to user6, this is pointing to window object
  // Because, we pass user6.logMessage as a callback which then runs independently so its no longer referring to user6 but referring to window object and window object does not have anything like username so printed undefined
  setTimeout(user6.logMessage, 1000); // undefined
  
  // How to fix this thing and let username point to 'Mohit sharma'??
  // we will call it inside a function
  setTimeout(function () {
    user6.logMessage();
  }, 1000); // Mohit Sharma
  
  // 4: Tell the output?
  const user7 = {
    name: "Rohit Sharma",
    greet() {
      // its a normal function so this points to user7
      return `Hello ${this.name}`;
    },
    greetings: () => {
      // As it is a arrow function, greet will point to window object
      return `Hola ${this.name}`;
    },
  };
  
  console.log(user7.greet());
  // Rohit Sharma
  console.log(user7.greetings()); // undefined
  
  // 5: Create an Object Calculator
  /*
  let Calculator = {
    read() {
      // we do +prompt, so that it takes numbers as integer and not string
      // Using the Unary Operator: In Javascript, the Unary operator(+) is used to convert a string, boolean, and non-string to a number.
      // We could have also user Number() or parseInt() to do the same
      // we give 0 as default value to both A and  B in the prompt in the below example
      this.a = +prompt("A = ", 0);
      this.b = +prompt("B = ", 0);
    },
  
    sum() {
      return this.a + this.b;
    },
  
    Multiply() {
      return this.a * this.b;
    },
  };
  
  Calculator.read();
  console.log(Calculator.sum());
  console.log(Calculator.Multiply());
  
  */
  
  // 6: Output Based Question
  var length = 4;
  function callback() {
    console.log(this.length);
  }
  
  const obj2 = {
    length: 5,
    method(fn) {
      fn();
    },
  };
  
  obj2.method(callback); // 4
  // As we have passed a callback so it does not refer to object obj2 rather it points to Window() as its a callback so it is implemented independently
  
  // 7: What is the output
  var length = 4;
  function callback() {
    console.log(this.length);
  }
  
  const obj3 = {
    length: 5,
    method() {
      // arguments takes all arguments of the function inside an array
      console.log(arguments); // [callback,2,3]
      // Arguments { 0: callback(), 1: 2, 2: 3, … }
      // for callback, parent is array so when we do this.length, it gives array.length = 3 as array has a property of length in its prototype
      arguments[0](); // 3
    },
  };
  
  obj3.method(callback, 2, 3); // 3
  
  // 8: Implement this code
  // const result = calc.add(10).multiply(4).subtract(1).add(15);
  // console.log(result.total);
  
  const calc = {
    total: 0,
    add(a) {
      this.total += a;
      // we do return this
      // becuase so that we can return this object and append multiply or subtract method with the result using (.) operator
      return this;
    },
    multiply(b) {
      this.total *= b;
      return this;
    },
    subtract(c) {
      this.total -= c;
      return this;
    },
  };
  
  const result = calc.add(10).multiply(4).subtract(1).add(15); // 54
  console.log(result.total);




