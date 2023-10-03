//*JavaScript Array Methods

//*map()

//The map method is used for creating a new array from existing one by applying a function to each one of the elements of the first array.

//!Note:-
//map() does not execute the function for empty elements.
//map() does not change the original array.

//syntax
//array.map(function(currentValue, index, arr), thisValue)

const nums = [1, 2, 3, 4, 3, 4, 2];

// const multiplyThree = nums.map((num, i, nums ) =>{
//     return num*3 + i;
// })

// console.log(multiplyThree);

//*filter()
//filter() Method is used to create a new array from a given array consisting of only those elements from the given array which satisfy a condition provided by a function. 

//syntax
//array.filter(function(currentValue, index, arr), thisValue)

// const moreThanTwo = nums.filter((num, i, nums ) =>{
//     return num > 2;
// })

// console.log(moreThanTwo);

//*reduce()

//reduce() method in JavaScript is used to reduce the array to a single value and executes a provided function for each value of the array (from left to right) and the return value of the function is stored in an accumulator.

//syntax
//array.reduce(function(total, currentValue, currentIndex, arr), initialValue)

const sum = nums.reduce((acc, curr, i, arr)=>{
    return acc + curr;
}, 0)

// console.log(sum);

//Polyfill for map

Array.prototype.myMap= function (cb){
   let temp = [];
   for(let i = 0; i<this.length; i++){
     temp.push(cb(this[i], i, this))
   }
   return temp;
}

const multiplyThree = nums.myMap((num, i, nums ) =>{
    return num*3 + i;
})

console.log(multiplyThree);

//Polyfill for filter

Array.prototype.myFilter= function (cb){
    let temp = [];
    for(let i = 0; i < this.length; i++){
      if(cb(this[i], i, this)) temp.push(this[i])
    }
    return temp;
 }

 const moreThanTwo = nums.myFilter((num, i, nums ) =>{
    return num > 2;
})
 console.log(moreThanTwo);
