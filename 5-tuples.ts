// Tuple - Array-like structure where each element represents
//  some property of a record

// Whereas arrays can hold many different records or a collection of records...
//  A tuple usually contains multiple different properties to describe one single thing
//  Usually inside of a tuple we will mix and match many different types of data

// A tuple is an array where we put the values in a very specific order...
//  It loses its labels (as in an object) but keeps the values...

// object representation
const drink = {
  color: 'brown',
  carbonated: true,
  sugar: 40
};

// no annotation keeps it as an array with swappable values
const pepsi = ['brown', true, 40]; // Wrong inference: pepsi: (string | boolean | number)[]

// annotation turns this into a tuple rather than an array
const pepsi2: [string, boolean, number] = ['brown', true, 40];

// We can also use a type alias...
//  this eliminates having to annotate for each variable declaration

// Type alias
type Drink = [string, boolean, number];
// This creates a brand new type that we can use as a tuple

// now we can create many different drinks
const cola: Drink = ['brown', true, 40];
const sprite: Drink = ['clear', true, 40];
const tea: Drink = ['brown', false, 0];

// Why use them?
// Perhaps when processing a CSV file to represent a single row...

// Here's a tuple
const carSpecs: [number, number] = [400, 3354];

// But objects may be better suited bc the key describes the data...
const carStats = {
  horsepower: 400,
  weight: 3354
};
