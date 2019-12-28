// Generics
//  - Like function arguments, but for types in class/function definitions
//  - Allows us to define the type of a property/argument/return value
//    at a future point in time
//  - Used heavily when writing reusable code

//  NOTHING TO DO WITH GENERICS
// Hard-code add
const addOne = (a: number): number => {
  return a + 1;
};
const addTwo = (a: number): number => {
  return a + 2;
};

// Dynamic add
const add = (a: number, b: number): number => {
  return a + b;
};
add(10, 1);
add(10, 2);
add(10, 3);

// GENERICS
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