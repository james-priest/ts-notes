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

// This is a silly way of structuring code. We would never create duplicate class definitions and just sub out one property...
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

// So rather than defining separate classes we can just use a Generic

// A generic is going to customize the definition of this class in the exact same way that the `b` argument in the previous function customized the body of the function.

// Instead we write a single class that does what both the previous classes were doing but it allows us to customize the types on the fly.

class HoldAnything<TypeOfData> {
  data: TypeOfData;
}

// Notice we supply a type as an argument to the class in the angle brackets
// Now when we create an instance of HoldAnything, we can pass in an  argument for TypeOfData. 
// Remember, when we call a function we have to pass in a value for each argument... In the same way, when we define a generic, we have to pass in a type for the generic value TypeOfData

const holdNumber2 = new HoldAnything<number>();
holdNumber2.data = 123;

const holdString2 = new HoldAnything<string>();
holdString2.data = 'abc';

const holdDate = new HoldAnything<Date>();
holdDate.data = new Date('2019/12/28');

// When we work with generics, view it exactly like we are working with a function argument.

// By convention, rather than giving a generic a long name such as `<TypeOfData>`:

// we use a single letter like `<T>` which refers to a generic type:

class HoldAnything2<T> {
  data: T;

  add(a: T): T {
    return a;
  }
}

// Here's a real example

export abstract class CsvFileReader2<T> {
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