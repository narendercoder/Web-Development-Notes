// Ques 2 - Fibonacci Number
//  Fibonacci Series -> 0, 1, 1, 2, 3, 5, 8, 13, 21, 34,....
//F(0) = 0; F(1) = 1;
//F(n) = F(n - 1) + F(n - 2), for n > 1

// Input: n = 3 ----->> output: 2

// var fib = function (n) {
//     const arr = [0, 1];

//     for(let i = 2; i <= n; i++){
//         arr.push(arr[i-1] + arr[i-2]);
//     }
//     return arr[n];
// }

// fib(5);

//using recursion

const fibo = function(n){
    if(n<=1) return n;

    return fibo(n-1) + fibo(n-2);
}

const res = fibo(6);
console.log(res);