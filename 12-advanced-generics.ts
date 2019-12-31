// Hard coded classes
class ArrayOfNumbers {
  constructor(public collection: number[]) { }
  
  get(index: number): number {
    return this.collection[index]
  }
}

class ArrayOfStrings {
  constructor(public collection: string[]) { }
  
  get(index: number): string {
    return this.collection[index]
  }
}

// Dynamic class
class ArrayOfAnything<T> {
  constructor(public collection: T[]) { }
  
  get(index: number): T {
    return this.collection[index];
  }
}

// explicit type definition
new ArrayOfAnything<string>(['a', 'b', 'c']);

// type inference around generics shows... 
//   arr: ArrayOfAnything<string>
const arr = new ArrayOfAnything(['a', 'b', 'c']);

// Example of generics with functions
// hard-coded functions
function printString(arr: string[]): void {
  for (let i = 0; i < arr.length; i++) {
    console.log('arr[i]', arr[i])
  }
}

function printNumbers(arr: number[]): void {
  for (let i = 0; i < arr.length; i++) {
    console.log('arr[i]', arr[i])
  }
}

// create one new function with generics that can receive
//   any type of array
function printAnything<T>(arr: T[]): void {
  for (let i = 0; i < arr.length; i++) {
    console.log('arr[i]', arr[i])
  }
}

// explicit type definition
printAnything<string>(['a', 'b', 'c']);
// not <string[]>... that is two-dimensional array

// we could also leave off generic type bcz
//  type inference would resolve this as
//  printAnything<string>(arr: string[]): void
printAnything(['a', 'b', 'c']);

// It is recommended to always use explicit type
//  definitions in order to catch errors
printAnything<string>([1, 2, 3]);

// Generic Constraints

class Car3 {
  print() {
    console.log('I am a car');
  }
}

class House {
  print() {
    console.log('I am a house')
  }
}

// here we have an error until we add a constraint to type T
function printHousesOrCars<T>(arr: T[]): void {
  for (let i = 0; i < arr.length; i++) {
    arr[i].print(); // Error
  }
}

// Fix
interface Printable {
  print(): void;
}

// now we use extends keyword
function printHousesOrCars2<T extends Printable>(arr: T[]): void {
  for (let i = 0; i < arr.length; i++) {
    arr[i].print(); // No error
  }
}

printHousesOrCars2([1, 2, 3]); // error
printHousesOrCars2<House>([new House(), new House()]); // No error
printHousesOrCars2<Car3>([new Car3(), new Car3()]); // No error
printHousesOrCars2<House | Car3>([new House(), new Car3()]); // No error