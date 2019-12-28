// These are all type annotations but none are needed...
let apples: number = 5;
let speed: string = 'fast';
let hasName: boolean = true;

let nothingMuch: null = null;
let nothing: undefined = undefined;

// built in objects
let now: Date = new Date();

// Array
let colors: string[] = ['red', 'green', 'blue'];
let myNumbers: number[] = [1, 2, 3];
let truths: boolean[] = [true, true, false];

// Classes
class Car {}
var myCar: Car = new Car();

// Object literal
let point: { x: number; y: number } = {
  x: 10,
  y: 20
};

// Function
// - this does not annotate the function...
// - it annotates the variable that the function is assigned to
const logNumber: (i: number) => void = (i: number) => {
  console.log(i);
};

// If declaration and initialization are on the same line,
//  TypeScript will figure out the type for us.
let oranges = 5;
let distance = 'far';
let hasAge = true;

// Type annotations should be used in 3 cases:
// 1) When a functions returns the 'any' type and we need to clarify the value
// 2) When we declare a variable on one line then initialize it later
// 3) When we want a variable to have a type that can't be inferred

// When to use annotations
// 1) Function that returns the 'any' type
const json = '{"x": 10, "y": 20}';
// without annotation
const coordinates = JSON.parse(json);
console.log(coordinates); // {x: 10, y: 20 };

// 'any' type
// - a type, just as 'string' or 'boolean' are.
// - means TS has no idea what this is.
// - TS can't check for correct property references.
// - AVOID VARIABLES WITH 'any' AT ALL COSTS!

// fix
const coordinates2: { x: number; y: number } = JSON.parse(json);
console.log(coordinates2); // {x: 10, y: 20 };

// 2) When we declare a variable on one line then initialize it later
let words = ['red', 'green', 'blue'];
// without annotation
let foundWord;

for (let word of words) {
  if (word === 'green') {
    foundWord = true;
  }
}

// fix
let foundWord2: boolean;

for (let word of words) {
  if (word === 'green') {
    foundWord2 = true;
  }
}

// 3) Variable whose type cannot be inferred correctly
let numbers = [-10, -1, 12];
// without annotation
let numberAboveZero = false;

for (let number of numbers) {
  if (number > 0) {
    numberAboveZero = number;
  }
}

// fix
let numberAboveZero2: boolean | number = false;

for (let number of numbers) {
  if (number > 0) {
    numberAboveZero2 = number;
  }
}
