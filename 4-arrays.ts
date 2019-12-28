// Generally arrays in TS use only one data type per array...
const carMakers = ['ford', 'toyota', 'chevy'];

// type inference shows 'carMakers' is type 'string[]'
// bc we assigned values at instantiation... no need to annotate

// We would want to annotate if we were not initializing the array.
const carModels: string[] = [];

// We can also put complex objects inside of arrays
const dates = [new Date(), new Date()];

// no annotation needed...
const carsByMake = [['f150'], ['corolla'], ['camaro']];

// annotation included since we are not initializing...
const carByMake2: string[][] = [];

// Why we care...
// 1) TS can do type inference when extracting values from an array
// 2) TS can prevent us from adding incompatible values to the array
// 3) We can get help with 'map', 'forEach', 'reduce' functions
// 4) Flexible - arrays can still contain multiple different types

// 1) Help with inference when extracting values
const car = carMakers[0];
const myCar2 = carMakers.pop();

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

// Where to use types arrays?
//  Any time we need to represent a collection of records
//  with some arbitrary sort order
