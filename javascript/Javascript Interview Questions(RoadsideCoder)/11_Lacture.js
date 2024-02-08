console.log("Callback, Promises, Async/Await");
/*
The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

Basically it allows you to add handlers with an asynchronous action's eventual success value or failure. So you get the result with little bit of delay which is a promise
*/

// Promise works with asynchrnous code
// What is sync or async code?

// sync
// Code is being executed line by line
console.log("Start");
console.log("This is Narender Singh");
console.log("End");

// async code
/*
-> Output of below code will be like:

Async statement start
Async statement end
I am inside timeout

Timeout is an web API, async code so it takes a callback and get stored in callback queue and when call stack gets empty, event loop brings it in call stack and executes it
*/
console.log("Async statement start");

setTimeout(() => {
  console.log("I am inside timeout ");
}, 1000);

console.log("Async statement end");

// JS executes sync code first, then async code

/*
-> Output of below code:
Starting
undefined
End

As message stores an setTimeout code so it will execute at last so initially message is undefined
*/

console.log("Starting");

function importantAction(username) {
  setTimeout(() => {
    return `This is ${username}`;
  }, 1000);
}

const message = importantAction("Narender Singh");

console.log(message);

console.log("End");

// What can we do to make message = This is Narender Singh?
// We can pass a callback function inside message variable so it goes to callback queue after setTimeout and it gets executed after it so that value of message variable is no longer undefined
// So we need to make following changes in message variable and importantAction function

/*
console.log("Starting of next code");

function importantAction1(username, cb) {
  setTimeout(() => {
    cb(`This is ${username}`);
  }, 1000);
}

const message1 = importantAction1("Narender Singh", function (message) {
  console.log(message);
});

console.log("Ending of next code");

*/

// Now let say we have another function softwareEngineer and we want to call it just after importantAction1

/*
-> Output of below code is like:

This is Narender Singh
My Profession is Software Developer

*/

function importantAction1(username, cb) {
  setTimeout(() => {
    cb(`This is ${username}`);
  }, 1000);
}

function softwareEngineer(profession, cb) {
  setTimeout(() => {
    cb(`My Profession is ${profession}`);
  }, 1000);
}

const message1 = importantAction1("Narender Singh", function (message) {
  console.log(message);
  softwareEngineer("Software Developer", (action) => {
    console.log(action);
  });
});

console.log("Ending of next code");

// But we see there are many nested callbacks, in a bigger codebase the number of callbacks will be more so this make our code look messy and un-readable, this problem is called callback hell or this structure is called pyramid of doom
// To solve this issue is Promises
// We have a Promise class in JS

console.log("Start of Promise");

const sub = new Promise((resolve, reject) => {
  setTimeout(() => {
    const result = false;
    if (result) resolve("Promise is resolved");
    else reject("Promise is rejected");
  }, 2000);
});

// How to access promise?
// resolve output comes inside then, reject comes under catch
sub
  .then((res) => {
    console.log(res); // Promise is resolved
  })
  .catch((err) => {
    console.log(err); // Promise is rejected
  });

console.log("End of Promise");

// Promise works asynchronously also
/*
-> Output of below code is:

Promise async work start
Promise { <state>: "fulfilled", <value>: "Promise 2 resolved" }
Promise async work end
Promise 2 resolved


Same happens with reject also
*/

console.log("Promise async work start");

const sub1 = Promise.resolve("Promise 2 resolved");
console.log(sub1); // It will print the state of the promise synchronously
sub1.then((res) => console.log(res)); // but the result of promise will be printed asynchronously only

console.log("Promise async work end");

// Previous Example using Promise

/*
-> Output of below code is:

Previous example using Promises start
Previous example using Promises end
Virat Kohli is Learning Promises
Cricket is his profession
West Delhi Academy is his college
*/

console.log("Previous example using Promises start");

function importantAction2(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${username} is Learning Promises`);
    }, 1000);
  });
}

function profession1(profession) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${profession} is his profession`);
    }, 1000);
  });
}

function study1(college) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${college} is his college`);
    }, 1000);
  });
}

importantAction2("Virat Kohli")
  .then((res) => {
    console.log(res);
    // If it gets resolved show profession function
    profession1("Cricket")
      .then((res) => {
        console.log(res);
        // If its resolved show study1 function
        study1("West Delhi Academy")
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  });

console.log("Previous example using Promises end");

// Promise Chaining
// We saw above that using promises also, it became pyramid like structure
// Promises chaining is another approach of solving this issue
// We can also write above code as

/*

importantAction2("Rohit Sharma")
  .then((res) => {
    console.log(res);
    return profession1("ODI Batsman");
  })
  .then((res) => {
    console.log(res);
    return study1("Mumbai College");
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });


*/

// Another approach of doing abpve thing is
// Promise combinators
// It helps us execute more than one promise at a time and return result accordingly
// But if anyone of the promise rejects, all result will be rejected

/*
-> Output of below code is:

Array(3) [ "MS Dhoni is Learning Promises", "Wicket Keeper is his profession", "Jharkhand is his college" ]
*/
Promise.all([
  importantAction2("MS Dhoni"),
  profession1("Wicket Keeper"),
  study1("Jharkhand"),
])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

// Promise.race is also there, which return us the first promise to get reject or resolved in catch or then block respectively
// Output of below code: MS Dhoni is Learning Promises as this is the first promise to get fulfilled
Promise.race([
  importantAction2("MS Dhoni"),
  profession1("Wicket Keeper"),
  study1("Jharkhand"),
])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

// Promise.allSettled  works same as Promise.all but it returns the failed promise as well
/*
-> output of below code:

Array(3) [ {…}, {…}, {…} ]
​
0: Object { status: "fulfilled", value: "MS Dhoni is Learning Promises" }
​
1: Object { status: "fulfilled", value: "Wicket Keeper is his profession" }
​
2: Object { status: "fulfilled", value: "Jharkhand is his college" }

*/
Promise.allSettled([
  importantAction2("MS Dhoni"),
  profession1("Wicket Keeper"),
  study1("Jharkhand"),
])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

// Promise.any same as Promise.race but it return first resolved promise and reject all others
// If all promise gets reject then it shows error that all promises rejected
// Output: MS Dhoni is Learning Promises
Promise.race([
  importantAction2("MS Dhoni"),
  profession1("Wicket Keeper"),
  study1("Jharkhand"),
])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

// Async/Await
// This is more modern approach of handling promises
/*
-> Output of below code:

Array(3) [ "Mohit Sharma is Learning Promises", "Bowler is his profession", "Lucknow is his college" ]
*/

const result = async () => {
  const messageFirst = await importantAction2("Mohit Sharma");
  const messageSecond = await profession1("Bowler");
  const messageThird = await study1("Lucknow");

  console.log([messageFirst, messageSecond, messageThird]);
};

result();

// To handle error in async/await, we use try-catch block
const result1 = async () => {
  try {
    const messageFirst = await importantAction2("Mohit Sharma");
    const messageSecond = await profession1("Bowler");
    const messageThird = await study1("Lucknow");

    console.log([messageFirst, messageSecond, messageThird]);
  } catch (error) {
    console.log("Promises Failed ", error);
  }
};

// Interview Questions
// 1: Whats the output?
/*
start
1
end
2

Because JS executes Sync code first so "start" is printed first then it goes inside promise10 and check any sync code so "1" is printed then it sees resolve and resolve will only be executed using .then which is async code so leave it, it sees "end" which is sync so print it, then at last it print "2"
*/

console.log("start");

const promise10 = new Promise((resolve, reject) => {
  console.log(1);
  resolve(2);
});

promise10.then((res) => {
  console.log(res);
});

console.log("end");

// 2: Whats the output
/*
start
1
3
end
2

Because JS executes Sync code first so "start" is printed first then it goes inside promise10 and check any sync code so "1" is printed then it sees resolve and resolve will only be executed using .then which is async code so leave it, then it sees "3" and its sync code so print it, it sees "end" which is sync so print it, then at last it print "2"
*/

console.log("start");

const promise11 = new Promise((resolve, reject) => {
  console.log(1);
  resolve(2);
  console.log(3);
});

promise11.then((res) => {
  console.log(res);
});

console.log("end");

// 3: Whats the output
/*
start
1
3
end


Because JS executes Sync code first so "start" is printed first then it goes inside promise10 and check any sync code so "1" is printed then it sees there is no resolve this time so it ignores .then code also which will give neither undefined nor anything else this time, then it sees "3" and its sync code so print it, it sees "end" which is sync so print it. thats it
*/

console.log("start");

const promise12 = new Promise((resolve, reject) => {
  console.log(1);
  //   resolve(2); This is not given now, whats the output then?
  console.log(3);
});

promise12.then((res) => {
  // This time there is no resolve inside promise12 so it does not come inside .then block
  console.log(res);
});

console.log("end");

// 4: Whats the output?
/*
-> Outout is:

start
middle
1
end
success

First 'start' is printed then it check function but the function call is after "middle" so "middle" is printed first then goes inside function to check any sync call, "1" is printed then sees resolve and come out, sees "end" prints it, at last .then block is executed and prints "success"

*/
console.log("start");

const func = () =>
  new Promise((resolve, reject) => {
    console.log(1);
    resolve("Success");
  });

console.log("middle");

func().then((res) => {
  console.log(res);
});

console.log("end");

// 4: Whats the output
// Promise chaining
/*
-> Output is:

Error 1
Success 4

As promise gets rejected so it ignore all .then initially in promise chain, it print .catch block and then it prints .then block because its attached to catch
*/
function job() {
  return new Promise(function (resolve, reject) {
    reject();
  });
}

let promise = job();

promise
  .then(function () {
    console.log("Success 1");
  })
  .then(function () {
    console.log("Success 2");
  })
  .then(function () {
    console.log("Success 3");
  })
  .catch(function () {
    console.log("Error 1");
  })
  .then(function () {
    console.log("Success 4");
  });

// 5: Whats the output?
/*
-> Output will be:

success
error
Error caught

Its being resolved at first as job(true) so it goes to first .then and print "success" then it retutns another promise job(false) which gets rejected and goes to .catch block and prints "error" and return "Error Caught" is just a simple string so it comes under a resolved promise so it goes to .then block and prints data which is "Error Caught" and then it returns another promise job(true) but there is not .then ahead its only .catch so execution finishes and we get our output
*/
function job1(state) {
  return new Promise(function (resolve, reject) {
    if (state) {
      resolve("success");
    } else {
      reject("error");
    }
  });
}

let promise1 = job1(true);

promise1
  .then(function (data) {
    console.log(data);
    return job(false);
  })
  .catch(function (error) {
    console.log(error);
    return "Error caught";
  })
  .then(function (data) {
    console.log(data);
    return job(true);
  })
  .catch(function (error) {
    console.log(error);
  });

// 6: Whats the output?
/*
-> Output will be:

success
Defeat
error
Error caught
Success: test

*/
function job2(state) {
  return new Promise(function (resolve, reject) {
    if (state) {
      resolve("success");
    } else {
      reject("error");
    }
  });
}

let promise2 = job2(true); // resolved initially

promise2
  .then(function (data) {
    console.log(data); // success is printed
    return job(true); // resolve so go to .then block
  })
  .then(function (error) {
    if (data !== "victory") {
      throw "Defeat"; // this will make rejected promise with data "Defeat" so it ignores job(true) and goes to catch block directly
    }
    return job(true);
  })
  .then(function (data) {
    console.log(data);
  })
  .catch(function (error) {
    console.log(error); // Defeat is printed
    return job(false); // reject so catch block
  })
  .then(function (data) {
    console.log(data);
    return job(true);
  })
  .catch(function (error) {
    console.log(error); // error is printed
    return "Error Caught"; // this is a normal string so promise resolved so goes inside .then
  })
  .then(function (data) {
    console.log(data); // Error Caught is printed
    return new Error("test"); // this is not rejected its a resolved promise so goes to .then
  })
  .then(function (data) {
    console.log("Success: ", data.message); // prints Success: test and execution ends here
  })
  .catch(function (data) {
    console.log("Error: ", data.message);
  });

// 7: Promise Chaining
// Output: First!
const firstPromise = new Promise((resolve, reject) => {
  resolve("First!");
});

const secondPromise = new Promise((resolve, reject) => {
  resolve(firstPromise);
});

secondPromise
  .then((res) => {
    return res;
  })
  .then((res) => console.log(res));

// 8: Given below is a code, re-write this using 'async/await' instead of '.then/catch'

function loadJson(url) {
  return fetch(url).then((response) => {
    if (response.status == 200) {
      return response.json();
    } else {
      throw new Error(response.status);
    }
  });
}

loadJson("https://pokeapi.co/api/v2/pokemon/ditto").catch((err) =>
  console.log(err)
);

// Answer
async function loadJSON(url) {
  let response = await fetch(url);

  if (response.status == 200) {
    let json = await response.json();
    return json;
  }

  throw new Error(response.status);
}

// 9: Solve Promise Recursively

function promRecursive(funcPromises) {
  // Implementation
  // Base case, we are passing promises in an array so first we will check if our array length is not equal to 0 then only we have something to implement otherwise we reach the end of function
  if (funcPromises.length === 0) return;

  // What array.shift() does is, it takes the first element from array and removes it from array and now original array gets modified

  const currPromise = funcPromises.shift();
  // it has our first promise
  // tackle this promise

  currPromise.then((res) => console.log(res)).catch((err) => console.log(err));

  // we pass modified array
  // call function recursively

  promRecursive(funcPromises);
}

promRecursive([
  importantAction2("Narender"),
  profession1("Student"),
  study1("Btech"),
]);

// 10: Polyfill of Promises

function PromisePolyFill(executor) {
  let onResolve,
    onReject,
    fulfilled = false,
    rejected = false,
    called = false,
    value;

  function resolve(v) {
    fulfilled = true;
    value = v;

    if (typeof onResolve === "function") {
      // for async
      console.log("inside resolve");
      onResolve(value);
      called = true;
    }
  }

  function reject(reason) {
    rejected = true;
    value = reason;

    if (typeof onReject === "function") {
      onReject(value);
      called = true;
    }
  }

  this.then = function (callback) {
    onResolve = callback;

    if (fulfilled && !called) {
      // for sync
      console.log("inside then");
      called = true;
      onResolve(value);
    }
    return this;
  };

  this.catch = function (callback) {
    onReject = callback;

    if (rejected && !called) {
      called = true;
      onReject(value);
    }
    return this;
  };

  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

const promise13 = new PromisePolyFill((resolve, reject) => {
  console.log(1);
  setTimeout(() => {
    resolve(2);
  }, 1000);
  console.log(3);
});

promise13.then((res) => {
  console.log(res);
});

// Implementing PromisePolyFill.resolve and PromisePolyFill.reject
// resolve and reject are simple which will return a PromisePolyfill object having an executor which will either resolve or reject.

PromisePolyFill.resolve = (val) =>
  new PromisePolyFill(function executor(resolve, _reject) {
    resolve(val);
  });

PromisePolyFill.reject = (reason) =>
  new PromisePolyFill(function executor(resolve, reject) {
    reject(reason);
  });

// Promise.all Polyfill
/*
Promise.all takes an array of promises as an input, and returns a single Promise that resolves to an array of the results of the input promises.

Here again we create our own executor function, and return back our promise object which would take in this executor.

    We create an array named fulfilledPromises and push values to it whenever any promise is resolved.
    If all promises are resolved ( fulfilledPromises.length === promises.length ) we invoke resolve .
    If any promise is rejected we invoke the reject
*/

PromisePolyFill.all = (promises) => {
  let fulfilledPromises = [],
    result = [];

  function executor(resolve, reject) {
    promises.forEach((promise, index) =>
      promise
        .then((val) => {
          fulfilledPromises.push(true);
          result[index] = val;

          if (fulfilledPromises.length === promises.length) {
            return resolve(result);
          }
        })
        .catch((error) => {
          return reject(error);
        })
    );
  }
  return new PromisePolyFill(executor);
};

// Promise.race Polyfill
/*
    Promise.race() returns the first settled value (either fulfillment or rejection).
    It takes an iterable object as input like array.
*/

export function promiseRace(promisesArray) {
  return new Promise((resolve, reject) => {
    promisesArray.forEach((promise) => {
      promise
        .then(resolve) // resolve outer promise, as and when any of the input promise resolves
        .catch(reject); // reject outer promise, as and when any of the input promise rejects
    });
  });
}

// Promise.allSettled Polyfill
/*
    The Promise.allSettled() method returns a promise that fulfills after all of the given promises have either fulfilled or rejected, with an array of objects that each describes the outcome of each promise.

    It is used when you have multiple asynchronous tasks that are not dependent on one another to complete successfully, or you'd always like to know the result of each promise.
*/

function allSettled(promises) {
  let mappedPromises = promises.map((p) => {
    return p
      .then((value) => {
        return {
          status: "fulfilled",
          value,
        };
      })
      .catch((reason) => {
        return {
          status: "rejected",
          reason,
        };
      });
  });
  return Promise.all(mappedPromises);
}

// Promise.any() Polyfill
/*
    Promise.any() takes an iterable of Promise objects which is promises in our polyfill.
    It returns a single promise that fulfills as soon as any of the promises in the iterable fulfills, with the value of the fulfilled promise.
    If no promises in the iterable fulfill (if all of the given promises are rejected), then the returned promise is rejected with an AggregateError, a new subclass of Error that groups together individual errors.
*/

function any(promises) {
  let results = [];
  var counter = 0;

  return new Promise((resolve, reject) => {
    promises.forEach((p, index) => {
      p.then((result) => {
        resolve(result);
      }).catch((err) => {
        results.push(err);
        ++counter;
        if (counter === promises.length) {
          reject(results);
        }
      });
    });
  });
}