//Quest1 Palindrome Number / String (reads the same forwards and backwards)

//Palindrome Number 

const isPalindrome = function(x){
    // Compare the string with its reverse
    return x === +x.toString().split("").reverse().join("");
}

const isPalindrome1 = function(x){
    
    return x < 0 ? false : x === +x.toString().split("").reverse().join("");
}
const str1 = 121;
const str2 = "hello";

console.log(isPalindrome1(str1))

//Palindrome String
const isPalindrome2 = function(str){
    //  // Remove non-alphanumeric characters and convert to lowercase
    // const cleanStr = str.replace(/[^A-Za-z0-9]/g, "").toLowerCase();
     
    let newStr = str.split("").reverse().join("");
    return  str.toLowerCase() === newStr.toLowerCase();
}

//without using predefined function
const isPalindrome3 = function(str){
    let newStr = str.toLowerCase();
    let left = 0;
    let right = newStr.length - 1;
    while(left < right){
        if(newStr(left) != newStr[right]) return false;
        left++;
        right--;
    }
   return true;
}

//
const isPlaindrome4 = (inputChar) => {
    let str = inputChar.toString();
    let resultWord = '';
    for(let i=str.length-1; i>=0; i--)
    {
        resultWord += str[i];
    }
    return (resultWord == str) ? true : false;
}
console.log(isPlaindrome4('racecar'))
console.log(isPlaindrome4('abc'))
console.log(isPlaindrome4(121))



//121 => "121" => ["1", "2", "1"] => ["1", "2", "1"] => "121"

