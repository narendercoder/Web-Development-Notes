console.log("Event Propagation in JS");
// In index.html, we have created a DIV, FORM, BUTTON which is one inside other
// Let say we put an event Listener inside DIV, FORM, BUTTON and as click BUTTON
// We know they are one inside other so if we click button then it should trigger the event of form and div also
// So what is the sequence or direction of propagation of these events?? This comes under Event Propagation

// Event Bubbling
// Bubble always go from down to up so this is the behaviour of event also
// by default, this is the event which happens
// button -> form -> div

const div = document.querySelector("div");
const form = document.querySelector("form");
const button = document.querySelector("button");

div.addEventListener("click", () => {
  console.log("Div fired");
});

form.addEventListener("click", () => {
  console.log("form fired");
});

button.addEventListener("click", () => {
  console.log("Button fired");
});

// Now when we click button, button fired -> form fired -> div fired comes
// When we click only form then form fired -> div fired comes
// There are some events which do not bubble in JS like focus(), blur()

// How to stop this bubbling
// If you want to stop the event bubbling, this can be achieved by the use of the event. stopPropagation() method. If you want to stop the event flow from event target to top element in DOM, event. stopPropagation() method stops the event to travel to the bottom to top.

// 3: event.target vs this.target vs event.currentTarget?

div.addEventListener("click", func);

form.addEventListener("click", func);

button.addEventListener("click", func);

function func(event) {
  // event.target will point to element which is origin of our bubbling like if we press button then event.target is button and if we click form then its form
  // event.currentTarget and this works same and they point to current element only in which the function is being called
  console.log(
    "currentTarget = " +
      event.currentTarget.tagName +
      ", target = " +
      event.target.tagName +
      ", this = " +
      this.tagName
  );
}

// 4: Event Capturing / Trickling
// Same as bubbling but it moves top to bottom
// by default, event bubbling happens, to make it event capturing we do capture: true; like we do below
// we need to do it for all elements in which we want capturing otherwise they will show bubbling behaviour

div.addEventListener(
  "click",
  function () {
    console.log("Hello");
  },
  {
    capture: true,
  }
);

// How to stop Bubbling ot capturing?
// I do not want to call top to bottom or bottom to top. I was just want button if I click button
// put event.stopPropagation() in the element you want to stop propagation at

// Below code will stop event propagation at form so it does not reach to div
form.addEventListener("click", function (e) {
  e.stopPropagation();
  console.log("Hello ji");
});

// 6: What is Event Delegation? (Most Important)
// In index.html, we add div of className products and other span inside it like mobile, headphone etc etc
// Let say we are an E-commerce website and we have 1000s of products, we want something to happen when we click an product so we need to add event listener also
// but, will we add event listener to all the products? would not that become little hectic?
// Here Event Delegation comes handy
// We put event listener at parent that is div with classname products and inside event object we have tagName for the element we have clicked say SPAN or BOLD or H1
// So we use this to check which product is clicked and we route user to that product URL
document.querySelector(".products").addEventListener("click", (event) => {
  // Let say one of our product has <BOLD> text then event.target.className will come as BOLD for it so to handle this we use event.target.closest also to check if its closest node is SPAN then also route us there
  console.log(event.target.closest("SPAN"));

  if (event.target.tagName === "SPAN") {
    window.location.href += "/" + event.target.tagName;
  }
});

// 6: What is the Output
// We have div, form and button like above, we want to do something such that when we click button, first form event should fire then button then div
// What we do is, we put capture:true for form so that first capturing happens where it goes like form -> button then bubbling happens like button -> form -> div
form.addEventListener(
  "click",
  function (e) {
    console.log("Hello ji");
  },
  {
    capture: true,
  }
);

// 7: Create a Modal which closess by clicking on negative space. negative space means space outside modal
// In index.html we make a modalButton which opens the modal and modalContainer and Modal content
// ModalContainer is whole space where if we click we want modal to close
// model has all our modal content
// we make display:none in CSS for modalContainer initially, we will make it display using modal button
const container = document.querySelector(".modalContainer");
const btn = document.querySelector(".modalButton");

btn.addEventListener("click", () => {
  toggleModal(true);
});

function toggleModal(toggle) {
  container.style.display = toggle ? "flex" : "none";
}

container.addEventListener("click", (e) => {
  // As modal class is child of modalContainer so when we click on modal, it get event delegated to modalContainer also and modal closes off
  // To get only closing modal when we click on modalContainer and not on modal class we do use
  if (e.target.className === "modalContainer") toggleModal(false);
});
