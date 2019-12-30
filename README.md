# Typescript Notes

These are notes from Udemy course [Typescript: The Complete Developer's Guide 2020](https://www.udemy.com/course/typescript-the-complete-developers-guide/) by Stephen Grider.

- [Typescript Notes](#typescript-notes)
  - [I. Types](#i-types)
  - [II. Variables](#ii-variables)
    - [Primitives](#primitives)
    - [Built-in Objects](#built-in-objects)
    - [Annotation Rules](#annotation-rules)
      - [1. Function that returns the any type](#1-function-that-returns-the-any-type)
      - [2. When we declare a variable on one line then initialize it later](#2-when-we-declare-a-variable-on-one-line-then-initialize-it-later)
      - [3. Variable whose type cannot be inferred correctly](#3-variable-whose-type-cannot-be-inferred-correctly)
  - [III. Functions](#iii-functions)
    - [Type annotations for functions](#type-annotations-for-functions)
    - [Type inference for functions](#type-inference-for-functions)
    - [Type annotation for function example](#type-annotation-for-function-example)
    - [Destructuring with annotation](#destructuring-with-annotation)
  - [IV. Objects](#iv-objects)
  - [V. Arrays](#v-arrays)
    - [Why annotation with arrays matters](#why-annotation-with-arrays-matters)
  - [VI. Tuples](#vi-tuples)

## I. Types

```js
const today = new Date();
today.getMonth();

const person = {
  age: 20
};

class Color {}
const red = new Color();
```

## II. Variables

### Primitives

These are all type annotations but none are needed...

```js
let apples: number = 5;
let speed: string = 'fast';
let hasName: boolean = true;

let nothingMuch: null = null;
let nothing: undefined = undefined;
```

### Built-in Objects

```js
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
```

### Annotation Rules

If declaration and initialization are on the same line, TypeScript will figure out the type for us.

```js
let oranges = 5;
let distance = 'far';
let hasAge = true;
```

Type annotations should be used in 3 cases:

1. When a functions returns the `any` type and we need to clarify the value.
2. When we declare a variable on one line then initialize it later.
3. When we want a variable to have a type that can't be inferred.

#### 1. Function that returns the `any` type

`any` type is:

- a type, just as `string` or `boolean` are.
- means TS has no idea what this is.
- TS can't check for correct property references.

AVOID VARIABLES WITH `any` AT ALL COSTS!

Without annotation:

```js
const json = '{"x": 10, "y": 20}';

const coordinates = JSON.parse(json);
console.log(coordinates); // {x: 10, y: 20 };
```

Fix:

```js
const json = '{"x": 10, "y": 20}';

const coordinates: { x: number; y: number } = JSON.parse(json);
console.log(coordinates); // {x: 10, y: 20 };
```

#### 2. When we declare a variable on one line then initialize it later

Without annotation:

```js
let words = ['red', 'green', 'blue'];

let foundWord;

for (let word of words) {
  if (word === 'green') {
    foundWord = true;
  }
}
```

Fix:

```js
let words = ['red', 'green', 'blue'];

let foundWord: boolean;

for (let word of words) {
  if (word === 'green') {
    foundWord = true;
  }
}
```

#### 3. Variable whose type cannot be inferred correctly

Without annotation:

```js
let numbers = [-10, -1, 12];

let numberAboveZero = false;

for (let number of numbers) {
  if (number > 0) {
    numberAboveZero = number;
  }
}
```

Fix:

```js
let numbers = [-10, -1, 12];

let numberAboveZero: boolean | number = false;

for (let number of numbers) {
  if (number > 0) {
    numberAboveZero = number;
  }
}
```

## III. Functions

### Type annotations for functions

Code we add to tell TypeScript:

- what type of arguments a function will receive
- what type of values it will return

### Type inference for functions

- TypeScript tries to figure out what type of value a function will return
- Only works for return type of a function not its arguments

### Type annotation for function example

Arrow function without annotation:

```js
const add1 = (a, b) => {
  return a + b;
};
```

Fix:

```js
const add = (a: number, b: number): number => {
  return a + b;
};
```

We ALWAYS have to use type annotation for arguments (a and b).

Type inference dictates that we don't need to specify return type but we ALWAYS WILL!

This is why...

forgetting to return the result means TS infers a `void` return type and we lose TypeScript's ability to catch the syntax error.

```js
// named function
const subtract = (a: number, b: number) => {
  a - b;
};

// anonymous function
const multiply = function(a: number, b: number): number {
  return a * b;
};

// can return 'null' or 'undefined' with 'void' return type
const logger = (message: string): void => {
  console.log(message);
};

// rare corner case for function that will never return
const throwError = (message: string): never => {
  throw new Error(message);
};

// if it may possibly return a 'string' then we annotate it as such
const throwError2 = (message: string): string => {
  if (!message) {
    throw new Error(message);
  }

  return message;
};

// if there's a chance it may return 'void' then we annotate it as such
const throwError3 = (message: string): void => {
  if (!message) {
    throw new Error(message);
  }
};
```

### Destructuring with annotation

```js
// define weather object...
const todaysWeather = {
  date: new Date(),
  weather: 'sunny'
};

// annotation of forecast argument which is a weather object...
const logWeather = (forecast: { date: Date; weather: string }): void => {
  console.log(forecast.date);
  console.log(forecast.weather);
};
logWeather(todaysWeather);

// ES2015 destructuring (without annotations)
const logWeather2 = ({ date, weather }) => {
  console.log(date);
  console.log(weather);
};

logWeather2(todaysWeather);
```

Destructuring with annotation

- replace variable itself with the actual destructuring statement
- notice that destructuring and annotations are ALWAYS separate.
  - We did not try to annotate the destructured properties.
  - The destructuring and annotations are always going to be separated by colon (:)

```js
const logWeather3 = ({
  date,
  weather
}: {
  date: Date;
  weather: string;
}): void => {
  console.log(date);
  console.log(weather);
};
```

## IV. Objects

Here is an object literal.

```js
const profile = {
  firstName: 'alex',
  age: 20,
  coords: {
    lat: 0,
    lng: 15
  },
  setAge(age: number): void {
    this.age = age;
  }
};
```

Notice that rather than setting a function equal to a property, we are using ES2015 syntax of defining a method inside an object.

Now we can reference a property.

```js
// ES5
const age = profile.age;

// ES2015 object destructuring - no annotation
const { age } = profile;
```

If we need to annotate because of one of the three reasons then we need to annotate the structure of the whole property and not just the value...

```js
// wrong!
const { age }: number = profile;

// right
const { age }: { age: number } = profile;
```

Destructuring multiple properties:

```js
const { age, firstName }: { age: number; firstName: string } = profile;
```

ES2015 object destructuring - no annotation:

```js
const { coords: { lat, lng } } = profile;
```

ES2015 object destructuring with annotation:

```js
const {
  coords: { lat, lng }
}: {
  coords: { lat: number; lng: number }
} = profile;
```

## V. Arrays

Generally arrays in TS use only one data type per array...

```js
const carMakers = ['ford', 'toyota', 'chevy'];
```

Type inference shows `carMakers` is type `string[]` because we assigned values at instantiation... no need to annotate.

We would want to annotate if we were not initializing the array.

```js
const carModels: string[] = [];
```

We can also put complex objects inside of arrays

```js
const dates = [new Date(), new Date()];
```

No annotation needed when array is initialized

```js
const carsByMake = [['f150'], ['corolla'], ['camaro']];
```

Annotation included since we are not initializing...

```js
const carByMake2: string[][] = [];
```

### Why annotation with arrays matters

1. TS can do type inference when extracting values from an array
2. TS can prevent us from adding incompatible values to the array
3. We can get help with 'map', 'forEach', 'reduce' functions
4. Flexible - arrays can still contain multiple different types

```js
// 1) Help with inference when extracting values
const car = carMakers[0];
const myCar = carMakers.pop();

// 2) Prevent incompatible values
carMakers.push(100);

// 3) Help with 'map'
carMakers.map((car: string): string => {
  return car.toUpperCase(); // autocomplete on methods....
});

// 4) Flexible types
const importantDates = [new Date(), '2019-10-01'];

const importantDates2: (Date | string)[] = [new Date()];
importantDates2.push('2020-01-01'); // accepts string
importantDates2.push(new Date()); // accepts date
importantDates2.push(100); // doesn't accept
```

Where to use types arrays?

Any time we need to represent a collection of records with some arbitrary sort order.

## VI. Tuples

Tuple - Array-like structure where each element represents some property of a record.

Whereas arrays can hold many different records or a collection of records...a tuple usually contains multiple different properties to describe one single thing.

Usually inside of a tuple we will mix and match many different types of data.

A tuple is an array where we put the values in a very specific order... It loses its labels (as in an object) but keeps the values.

Here's an object representation of a drink.

```js
const drink = {
  color: 'brown',
  carbonated: true,
  sugar: 40
};
```

Without annotation TS infers it as an array with swappable values.

```js
const pepsi = ['brown', true, 40];
// Wrong inference: pepsi: (string | boolean | number)[]
```

Annotation turns this into a tuple rather than array.

```js
// Tuple
const pepsi: [string, boolean, number] = ['brown', true, 40];
```

To simplify we can also use a type alias. This eliminates having to annotate for each variable declaration.

```js
// Type alias defining a tuple
type Drink = [string, boolean, number];
```

This creates a brand new type that we can use as a tuple. Now we can create many different drinks.

```js
// Tuple instances
const cola: Drink = ['brown', true, 40];
const sprite: Drink = ['clear', true, 40];
const tea: Drink = ['brown', false, 0];
```

Why use them? Perhaps when processing a CSV file to represent a single row...

```js
// Here's a tuple
const carSpecs: [number, number] = [400, 3354];

// But objects may be better suited bc the key describes the data...
const carStats = {
  horsepower: 400,
  weight: 3354
};
```
