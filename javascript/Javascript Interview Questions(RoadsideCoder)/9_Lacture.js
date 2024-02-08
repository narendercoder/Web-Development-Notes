console.log("Debouncing and Throttling");
// Example is search bar of flipkar or amamzon
// While we are typing in search bar, it does not search for each word. when we stop writting it then searches and makes API call and show us results
// So in such cases we use Debouncing
// What happens is, There is a time limit after which an API call will be made say 400ms
// Everytime we write a word, timer runs and after 400ms an API call is made
// How throttling works?
// We scroll down our twitter and everytime, new posts come in the feed. An API call is made for it
// There might be a criteria that everytime we are 5px away from the bottom end screen of feeds. we make an API call so this way, user gets an infinite scrolling experience. if we make an API call on every scroll, there will be many calls and it might degrade the performance

// Interview Questions
// 1: Create a button UI and add debounce as follows =>
// -> show "Button Pressed <X> Time" every time button is pressed
// -> Increase "Triggered <Y> Times" count after 800ms of debounce
const btn = document.querySelector(".increment_btn");
const btnPress = document.querySelector(".increment_pressed");
const count = document.querySelector(".increment_count");

// To implement debouncing effect, either we can make a custom polyfill of it or we can make use of lodash, use its CDN and use its debounce function. Here we will use lodash and later we will see polyfill also
// _.debounce(func, [wait=0], [options={}])

var pressedCount = 0;
var triggerCount = 0;

const debounceCount = _.debounce(() => {
  count.innerHTML = ++triggerCount;
}, 800);

/*
btn.addEventListener("click", () => {
  btnPress.innerHTML = ++pressedCount;
  debounceCount();
});
*/

// 2: Create a button UI and add throttle as follows =>
// -> show "Button Pressed <X> Time" every time button is pressed
// -> Increase "Triggered <Y> Times" count after 800ms of throttle
// Now the Triggered count should increase after 800ms only earlier in debouncing, it was like, when we stop writing under 800ms then make a call
// Rest everything remains same, we just make throttle function using lodash

/*
const throlledCount = _.throttle(() => {
  count.innerHTML = ++triggerCount;
}, 800);
*/

btn.addEventListener("click", () => {
  btnPress.innerHTML = ++pressedCount;
  throlledCount();
});

// 3: Create Debounce() Ployfill Implementation
// from above function ._debounce we see it takes and callback and timer
const myDebounce = (cb, d) => {
  let timer;
  return function (...args) {
    // if there is already a timer,clear it before calling callback function
    // ...args are any arguments if we pass like in debounceCount() above inside event listener callback function
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      cb(...args);
    }, d);
  };
};

// 4: Create an Ployfill for throttle Function
// In throttle, we implement things one by one but we give a delay time that tells that next thing should be implemented after delay time
// So we need to check if ("time of last implemented thing" - "current time" > "delay time") then only implement that event otherwise do not implement that event.

const myThrottle = (cb, d) => {
  // Time of last implemented event
  let last = 0;

  return (...args) => {
    // curent time
    let now = new Date().getTime();
    // checking the condition
    if (now - last < d) return;
    // update last
    last = now;
    // call the callback function with arguments
    return cb(...args);
  };
};
