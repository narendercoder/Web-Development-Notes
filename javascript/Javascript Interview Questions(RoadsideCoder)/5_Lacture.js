//Object
//It is a collection of properties, and a property is an association between a name(or key) and a value

const user = {
    name: "Narender Singh Bisht",
    age: 22,
  };
  
  console.log(user.name); //Narender Singh Bisht
  
  //* modify property
  user.name = "Naveen"
  
  console.log(user.name)
  
  //* Delete property
  delete user.age;
  
  
  //* Output based question on delete
  const func = (function (a) {
      delete a; // a is local variable, delete is used to delete a property from an object so here delete will not do anything to 'a', we get 5 printed
      return a;
  })(5);
  
  console.log(func); // 5
  
  // What if we want to store something like 'this is me' : lokesh; as a key in object
  // For that we do like this
  const obj = {
      name: "Naveen",
      age: 10,
      "This is me": "Narender",
    };
    
  // Another way to access values from an object
  console.log(obj["This is me"]); // Narender
  
  delete obj["This is me"];
  
  console.log(obj["This is me"]); // undefined
  
  //* How to add computed properties in object
  const property = "firstname";
  const name = "Virat";
  
  const obj1 = {
    [property]: name,
  };
  
  console.log(obj1); //  { firstname: "Virat" }
  
  //* Traversing the object
  const obj2 = {
      name: "MS",
      age: 50,
      Profession: "Cricket",
      Height: 4,
      Weight: 68,
    };
    
  // For traversing we cannot use normal loop we use for-in loop
  for (key in obj2) {
      console.log(key); // name, age, profession, height, weight
      console.log(obj2[key]); // MS, 50, cricket etc etc
  }
  
  //* Interview Questions
  const obj3 = {
      a: "one",
      b: "two",
      a: "three",
    };
  
  // If we have 2 keys with same name, the latest value will be replaced by previous value
  
  console.log(obj3); // { a: "three", b: "two" }
  
  
  // 2: Create a function multiplyByTwo(obj) that multiplies all numeric property values of nums by 2
  
  let nums = {
      a: 100,
      b: 200,
      title: "My Nums",
  };
    
  multiplyByTwo(nums);
    
  function multiplyByTwo(nums) {
      for (key in nums) {
          if (typeof nums[key] === "number") {
              nums[key] *= 2;
          }
      }
  }
  
  console.log(nums); // { a: 200, b: 400, title: "My Nums" }
  
  //* Most Important
  // 3: What is the output of following code?
  
  const a = {};
  const b = { key: "b" };
  const c = { key: "c" };
  
  a[b] = 123; // a["object object"] = 123
  a[c] = 456; // a["object object"] = 456
  
  // What happens is
  // b = {key : "b"}
  // b is not a string so when we try to insert it as a key inside 'a', 
  //it goes as object object and its value become 123
  // Now c also goes like "object object" and value gets over-ridden by 456
  // In the output we get 456
  
  console.log(a[b]); // a[b] is object object so its value is 456
  console.log(a); // { "[object Object]": 456 }
  
  //* 4: What is JSON.stringify() and JSON.parse()?
  // JSON.stringify() is used to convert object key-value pairs to string
  // JSON.parse() is used to convert string key-value pairs as back to object
  
  
  const obj4 = {
      name: "Narender",
      age: 21,
    };
    
    console.log(obj4); // Object { name: "Narender", age: 21 }
    
    //convert obj into string
    const strObje = JSON.stringify(obj4);
    
    console.log(strObje); // {"name":"Narender","age":21}
    
     //convert string into obj
    const parseObj = JSON.parse(strObje);
    
    console.log(parseObj); // Object { name: "Narender", age: 21 }
  
  
  // How are these useful?
  // localstorage: Inside local storage we store key-value pairs 
  // where is we try to store object in object type then it will store it as object object
  // So we use JSON.stringify to store the object as value in localstorage
  localStorage.setItem("name", strObje); // name:"{"name":"Loki Melkani","age":21}"
  localStorage.setItem("name1", obj4); // name1:"[object Object]"
  
  // To get that object back we use JSON.parse then
  console.log(JSON.parse(localStorage.getItem("name")));
  
  // 5: What is the output here?
  // Spread operator is used to spread values inside a Array
  console.log([..."Lydia"]); //  [ "L", "y", "d", "i", "a" ]
  
  // 6: What is the output?
  const obj5 = { name: "Mahi", age: 31 };
  const obj6 = { admin: true, ...obj5 };
  
  console.log(obj6); // Object { admin: true, name: "Mahi", age: 31 }
  
  
  //* 7: What is output?
  const obj7 = {
    username: "Narender",
    level: 30,
    health: 41,
  };
  
  // When we pass 2 keys as an array inside stringify() with an object then it only stringify those 2 keys inside that object
  // if we give an value which is not the object inside that array, it does not do anything, it just ignore it and give same output as above
  const data = JSON.stringify(obj7, ["level", "health"]);
  
  console.log(data); // {"level":30,"health":41}
  
  
  //* 8: What is the output?
  const shape = {
    radius: 10,
    diameter() {
      // 'this' inside normal function will point to recent object ka radius so gives output 20
      return this.radius * 2;
    },
    perimeter: () => {
      // Arrow function behave differently with this keyword
      // Arrow function ka 'this' will point to window object where radius is not defined
      return 2 * Math.PI * this.radius;
    },
  };
  
  console.log(shape.diameter()); // 20
  console.log(shape.perimeter()); // NaN
  
  
  //9 - Destructring in Objects ?
  
  let userlist = {
    Username: "Narender Singh",
    age: "24",
    fullName: {
      first: "Narender",
      last: "Bisht"
    }
  };
  
  const Username = "Narender Singh";
  
  const {Username: myName} = userlist;
  
  const {fullName: {first}} = userlist
  
  console.log(myName)
  console.log(first)
  
  //* 10 - what's the Output
  // While passing as an function parameter, rest operator should always be the last parameter
  function getItems(fruitList, favoriteFruit, ...args){
    // But spread operators can be used in between
    return [...fruitList, ...args, favoriteFruit];
  }
  
  const list = getItems(["banana", "apple"], "peer", "orange");
  
  console.log(list);
  
  //* 11 - what's the Output
  // Object Referencing
  // When we write d = c1, we are not copying the values, we are just passing the reference of that object to d
  // Any changes made will be reflected there also
  
  let c1 = { geeting: "Hey!"};
  let d;
  
  d = c1;
  c1.geeting = "Hello";
  console.log(d.geeting) //Hello
  
  //* 12: What is the output
  // Both {a:1} are different object and are pointing to different block in the memory
  // Objects are only equal if they refer to particular part in the memory
  // console.log({ a: 1 } == { a: 1 }); // false
  // console.log({ a: 1 } === { a: 1 }); // false
  
  
  //* 13: What is the output
  // we are passing members[0] = person
  // we are then making whole object as NULL
  // if we make person.name = null
  // then our output will return us name = NULL
  let person = { name: "Narender" };
  const members = [person];
  person = null;
  console.log(members); // Array [ {…} ] 0: Object { name: "Lokesh" }
  
  //* 14: What is the output
  const value = { number: 10 };
  
  const multiply = (x = { ...value }) => {
    console.log((x.number *= 2));
  };
  
  // here we do not pass any value so by-default.
  // rest operator takes 10 as x in function and give us 20
  // rest operator do not take it as reference so value inside object will be 10 only
  multiply(); // 20
  // Same as above
  // rest operator do not take it as reference so value inside object will be 10 only
  multiply(); // 20
  // Now we pass value to the function explicitly, so now it is passed as a reference
  // so not value of number updated to 20 so next time
  multiply(value); // 20
  // next time, again value passed as reference and value become 20*2 = 40 and number is 40 now
  multiply(value); // 40
  
  console.log(value.number); // 40
  
  // 15: What is the output
  function changeAgeAndReference(person) {
    // we are passing personObj1 as reference so age will change to 25
    person.age = 25;
    // we are re-assining object which does not happen by reference so no change in personObj1 due to below code but personObj2 will get changed to below object due to below code
    person = {
      name: "John",
      age: 50,
    };
  
    return person;
  }
  
  const personObj1 = {
    name: "Alex",
    age: 30,
  };
  
  const personObj2 = changeAgeAndReference(personObj1);
  
  console.log(personObj1); // Object { name: "Alex", age: 25 }
  console.log(personObj2); // Object { name: "John", age: 50 }
  
  //* 16: Deep copy VS Shallow copy of an object
  // Shallow copying creates a new object with references to the same memory locations as the original object, while deep copying  creates a new object with new memory locations for all of its properties and nested objects or arrays also known as cloning an object.
  
  let obj10 = {
    name: "Hardik Gandya",
    age: 25,
  };
  
  //* 3 most popular ways to clone an object
  // .assign(target,object to be copied)
  // where target is an empty object for us as we want fresh object
  const objClone = Object.assign({}, obj10);
  
  console.log(obj10); // Object { name: "Hardik Gandya", age: 25 }
  console.log(objClone); // Object { name: "Hardik Gandya", age: 25 }
  
  objClone.name = "Jasprit Gumrah";
  // This will not affect the original object as its a deep copy
  
  console.log(obj10); // Object { name: "Hardik Gandya", age: 25 }
  console.log(objClone); // Object { name: "Jasprit Gumrah", age: 25 }
  
  // Method 2
  const objClone2 = JSON.parse(JSON.stringify(obj10));
  
  console.log(objClone2); // Object { name: "Hardik Gandya", age: 25 }
  
  // Method 3
  const objClone3 = { ...obj10 };
  
  console.log(objClone3); // Object { name: "Hardik Gandya", age: 25 }