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