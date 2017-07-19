// given an array of values, write a function that finds the
 //index of where the value is located, and if nothing is found,
  //returns -1.
// example: for ['apple', 'orange', 'pineapple']
// 'orange' returns '1'
// 'durian' returns '-1'

// now, write a function that finds all 
//the indexes of where the value is located 
//and returns them in an array, and if nothing 
//is found, returns -1
// example: ['apple', 'orange', 'orange', 'pineapple']
// 'orange' returns [1,2]


function fruits(array, fruitname){
	for(var i = 0; i < array.length; i++){
		if(array[i] === fruitname){
			return i;
		}
	}
		return -1;
}

console.log(fruits(["apple", "orange", "pineapple"], "pineapple"));
console.log(fruits(["apple", "orange", "pineapple"], "strawberry"));

// 

notemptyarray = ["apple", "orange", "orange", "pineapple"]
emptyarray = [];

function fruitlist(arraytwo, fruitnames){
	for(var i = 0; i < arraytwo.length; i++){
		if(arraytwo[i] === fruitnames){
			emptyarray.push(i);
			return emptyarray;
		}
	}
		return -1;
}

console.log(fruitlist, "orange");
console.log(fruitlist(["apple", "orange", "pineapple"], "strawberry"));


