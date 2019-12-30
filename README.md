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
  - [VII. Interfaces](#vii-interfaces)
    - [Interface Rules](#interface-rules)
    - [General Strategy fro Code Reuse in TypeScript](#general-strategy-fro-code-reuse-in-typescript)
  - [VIII. Classes](#viii-classes)
    - [Fields](#fields)
    - [Methods](#methods)
  - [IX. Type Guards](#ix-type-guards)
  - [X. Abstract Classes](#x-abstract-classes)
  - [XI. Enums](#xi-enums)
  - [XII. Generics](#xii-generics)
    - [Function argument comparison](#function-argument-comparison)

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

## VII. Interfaces

Interfaces + Classes = How we get really strong code reuse in TS.

Interfaces - Creates a new type, describing the property names and value types of an object.

Here's an object literal that we will pass to a function.

```js
// Object literal
const oldCivic = {
  name: 'civic',
  year: 2000,
  broken: true
};
```

Annotating function arguments that are objects are unwieldy.

```js
// Unwieldy and hard to read
const printVehicle = (vehicle: {
  name: string;
  year: number;
  broken: boolean;
}): void => {
  console.log(`Name: ${vehicle.name}`);
  console.log(`Year: ${vehicle.year}`);
  console.log(`Broken?: ${vehicle.broken}`);
};

printVehicle(oldCivic);
```

This is not ideal bc we would have to annotate for each new function and it is unwieldy to work with if any more properties are added.

### Interface Rules

1. Interfaces are created above the functions that use it.
2. They begin with a capital letter.
3. They use a generic term (Vehicle not Civic).

```js
interface Vehicle {
  name: string;
  year: number;
  broken: boolean;
}

// Replace the annotation with a reference to the interface
const printVehicle = (vehicle: Vehicle): void => {
  console.log(`Name: ${vehicle.name}`);
  console.log(`Year: ${vehicle.year}`);
  console.log(`Broken?: ${vehicle.broken}`);
};

printVehicle(oldCivic);
```

Here's a more complex object where we use `Date` for `year` and a function for `summary`.

```js
// complex object
const oldDatsun = {
  name: 'datsun',
  year: new Date(),
  broken: true,
  summary(): string {
    return `Name: ${this.name}`;
  }
};
```

We can use complex data types such as `Date` for `year` and can express a function for `summary` inside of our interface.

```js
interface Vehicle {
  name: string;
  year: Date;
  broken: boolean;
  summary(): string; // function that returns a string
}

const printVehicle = (vehicle: Vehicle): void => {
  console.group('Vehicle3 Interface');
  console.log(`Name: ${vehicle.name}`);
  console.log(`Year: ${vehicle.year}`);
  console.log(`Broken?: ${vehicle.broken}`);
  console.log(vehicle.summary());
  console.groupEnd();
};

printVehicle(oldDatsun);
```

Here's an example that only defines a single property for an interface.

```js
interface Reportable {
  summary(): string;
}
const printSummary = (item: Reportable): void => {
  console.group('Reportable Interface');
  console.log(item.summary());
  console.groupEnd();
};

printSummary(oldDatsun);
```

Since `printSummary` is only accessing the `summary()` property we only need to define that property in the interface.

We also further abstract the interface name to `Reportable`, saying, "In order to be considered type `Reportable`, you must have a `summary` function that returns a string".

Here is another object that also has a `summary()` property.

```js
const drink = {
  color: 'brown',
  carbonated: true,
  sugar: 40,
  summary(): string {
    return `My drink has ${this.sugar} grams of sugar`;
  }
};
```

Since `drink` has a `summary` function that returns a string  just like `oldDatsun` has a `summary` function that returns a string... both objects are considered to be of `Reportable` types.

That means we can call `printSummary` on each of theses very different objects.

```js
printSummary(oldDatsun);
printSummary(drink2);
```

We can use an interface to describe the various properties (or shape) of very different objects.

This encourages us to write somewhat generic looking functions and interfaces. For example, function name of `printSummary` rather than `printVehicleSummary` or interface name of `Reportable` rather than `Vehicle`

Interface `Reportable` is a gatekeeper to `printSummary`...
`oldDatsun` and `drink` must satisfy `Reportable` interface to work with `printSummary`.

This mechanic of using an interface for gatekeeping is going to be one of the prime ways we get code reuse from TS.

### General Strategy fro Code Reuse in TypeScript

- Create functions that accept arguments that are typed with interfaces
- Objects/classes can decide to 'implement' a given interface to work with a function

1. `someFunction()` implements interface `XYZ`.
2. `XYZ` is a gatekeeper to `someFunction()`.
3. `object1` and `object2` must satisfy the `XYZ` interface to work with `somFunction()`.

Rest of the course will focus on defining different interfaces to restrict access to different functions... and then decide how to implement those different interfaces in different objects that we're going to create!

1. The goal of an interface is to define a new type.
2. TS iterates thru all the properties of an interface to make sure the object has the same properties with the same type.

## VIII. Classes

Classes are a blueprint to create an object with some fields (values) and methods (functions) to represent a 'thing'.

In TS we can use modifiers...

The goal of modifiers is to restrict access to different functions or different variables

- `public` - This method can be called any where, any time
- `private` - This method can only be called by other methods in this class
- `protected` - This method can be called by other methods in this class, or by other methods in child classes

When we create classes we can add modifiers

- Step 1 - Fields (values)
- Step 2 - Methods (functions)

### Fields

Fields - either we initialize a property on the same line...

```js
class Vehicle {
  color: string = 'red'; // initialize property on same line
}
```

or we initialize in the constructor...

```js
class Vehicle {
  color: string;

  constructor(color: string) {
    this.color = color; // initialize property in constructor
  }
}
```

Here's a shorthand for creating public fields that can be initialized in the constructor.

```js
class Vehicle {
  constructor(public color: string) {}
}
```

### Methods

Next we can add methods.

```js
class Vehicle {
  constructor(public color: string) {}

  protected honk(): void {
    console.log('beep');
  }
}
```

We don't actually call methods on the class directly. Usually we create an instance with the `new` keyword and call methods off of that object.

```js
const vehicle = new Vehicle('orange');

console.log(vehicle.color);

vehicle.honk();
```

Next we create a `Car` class.

```js
class Car extends Vehicle {
  constructor(public wheels: number, color: string) {
    super(color);
  }

  private drive(): void {
    console.log('screech');
  }

  startDrivingProcess(): void {
    this.drive();
    this.honk();
  }
}

const car = new Car(4, 'red');
car.startDrivingProcess(); // screech beep
```

We do not use `public` keyword for `color` bc we are not creating a new `color` field for `Car`. We are referencing `color` in `Vehicle`.

## IX. Type Guards

Type guards allow methods on a type to become available.

Without type guards, only the methods in common for the union would be usable.

- Primitive types (number, string, boolean, symbol) uses `typeof`
- Every other type uses `instanceof`

```js
class Sorter {
    constructor(public collection: number[] | string) {}
  
    sort(): void {
      const { length } = this.collection;
  
      for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - i - 1; j++) {
  
          // All of this only work if collection is number[]
          // If collection is an array of numbers
          if (this.collection instanceof Array) { // type guard
            if (this.collection[j] > this.collection[j + 1]) {
              const leftHand = this.collection[j];
              this.collection[j] = this.collection[j + 1];
              this.collection[j + 1] = leftHand;
            }
          }
  
          // Only going to work if collection is a string
          // If collection is a string
          if (typeof this.collection === 'string') { //type guard
            
          }
        }
      }
    }
  }
  
  const sorter = new Sorter([10, 3, -5, 0, -10, 2]);
  sorter.sort();
  
  console.log(sorter.collection);
```

## X. Abstract Classes

Abstract classes cannot be instantiated directly but serve as a model from which to base other classes from.

They allow you to specify abstract properties and methods that must exist in the child class.

```js

export abstract class Sorter {
  abstract length: number;
  abstract compare(leftIndex: number, rightIndex: number): boolean;
  abstract swap(leftIndex: number, rightIndex: number): void;

  sort(): void {
    const { length } = this; // destructure

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        if (this.compare(j, j + 1)) {
          this.swap(j, j + 1);
        }
      }
    }
  }
}
```

`length`, `compare`, and `swap` must all be implemented in child classes.

The `NumbersCollection` classes inherits from `Sorter`.

```js
export class NumbersCollection extends Sorter {
  constructor(public data: number[]) {
    super();
  }

  // adding 'get' makes length become a property
  get length(): number {
    return this.data.length;
  }

  compare(leftIndex: number, rightIndex: number): boolean {
    return this.data[leftIndex] > this.data[rightIndex];
  }

  swap(leftIndex: number, rightIndex: number): void {
    const leftData = this.data[leftIndex];
    this.data[leftIndex] = this.data[rightIndex];
    this.data[rightIndex] = leftData;
  }
}
```

The `CharactersCollection` also inherits from `Sorter`.

```js
export class CharactersCollection extends Sorter {
  constructor(public data: string) {
    super();
  }

  get length(): number {
    return this.data.length;
  }

  compare(leftIndex: number, rightIndex: number): boolean {
    return (
      this.data[leftIndex].toLowerCase() > this.data[rightIndex].toLowerCase()
    );
  }

  swap(leftIndex: number, rightIndex: number): void {
    const characters = this.data.split('');

    const leftData = characters[leftIndex];
    characters[leftIndex] = characters[rightIndex];
    characters[rightIndex] = leftData;

    this.data = characters.join('');
  }
}
```

## XI. Enums

Enum is an object that stores some closely related values.

Use enum to signal to other developers that these are a set of closely related objects.

```js
enum MatchResults {
  HomeWin = 'H',
  AwayWin = 'A',
  Draw = 'D'
}
```

Use whenever we have a small fixed set of values that are all closely related and known at compile time.

## XII. Generics

- Like function arguments, but for types in class and function definitions
- Allows us to define the type of a property/argument/return value at a future point in time
- Used heavily when writing reusable code

### Function argument comparison

Instead of creating hard-coded `addOne` and `addTwo` functions...

```js
// Hard-code add
const addOne = (a: number): number => {
  return a + 1;
};

const addTwo = (a: number): number => {
  return a + 2;
};
```

We can create a dynamic `add` function by passing in a second argument.

```js
// Dynamic add
const add = (a: number, b: number): number => {
  return a + b;
};

add(10, 1);
add(10, 2);
add(10, 3);
```

In the same way we can create a function argument to create a dynamic `add` function, we can create dynamic type arguments to a function/class definition. This allows us define the type at a later point.

Here is a class example...

```js
class HoldNumber {
  data: number;
}
class HoldString {
  data: string;
}

const holdNumber = new HoldNumber();
holdNumber.data = 123;

const holdString = new HoldString();
holdString.data = 'abc';
```

This is a silly way of structuring code. We would never create duplicate class definitions and just sub out one property...

So rather than defining separate classes we can just use a Generic.

- A generic is going to customize the definition of this class in the exact same way that the `b` argument in the previous function customized the body of the function.
- Instead we write a single class that does what both the previous classes were doing but it allows us to customize the types on the fly.

```js
class HoldAnything<TypeOfData> {
  data: TypeOfData;
}
```

Notice we supply a type as an argument to the class in the angle brackets.

Now when we create an instance of `HoldAnything`, we can pass in an  argument for `TypeOfData`.

Remember, when we call a function we have to pass in a value for each argument... In the same way, when we define a generic, we have to pass in a type for the generic value `TypeOfData`.

```js
const holdNumber = new HoldAnything<number>();
holdNumber.data = 123;

const holdString = new HoldAnything<string>();
holdString.data = 'abc';

const holdDate = new HoldAnything<Date>();
holdDate.data = new Date('2019/12/28');
```

When we work with generics, view it exactly like we are working with a function argument.

By convention, rather than giving a generic a long name such as `<TypeOfData>` we use a single letter like `<T>` which refers to a generic type:

```js
class HoldAnything<T> {
  data: T;

  add(a: T): T {
    return a;
  }
}
```

Here is a full example that uses an abstract class and generics.

```js
export abstract class CsvFileReader<T> {
  data: T[] = [];

  constructor(public filename: string) {}

  abstract mapRow(row: string[]): T;

  read(): void {
    this.data = fs
      .readFileSync(this.filename, {
        encoding: 'utf-8'
      })
      .split('\n')
      .map((row: string): string[] => row.split(','))
      .map(this.mapRow);
  }
}
```
