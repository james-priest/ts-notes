// Type annotations for functions
// - Code we add to tell TypeScript
//    - what type of arguments a function will receive
//    - what type of values it will return

// Type inference for functions
// - TypeScript tries to figure out what type of value a function will return
// - Only works for return type of a function not its arguments

// arrow function - without annotation
const add1 = (a, b) => {
  return a + b;
};

// fix - arrow function
const add2 = (a: number, b: number): number => {
  return a + b;
};

// We ALWAYS have to use type annotation for arguments (a and b)
// Type inference dictates that we don't need to specify return type
//  but we ALWAYS WILL! this is why...

// forgetting to return the result means TS infers a 'void' return type
//  and we lose TypeScript's ability to catch the syntax error.
const subtract = (a: number, b: number) => {
  a - b;
};

// named function
function divide(a: number, b: number): number {
  return a / b;
}

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

// Destructuring with annotations
// - replace variable itself with the actual destructuring statement
// - notice that destructuring and annotations are ALWAYS separate.
//    We did not try to annotate the destructured properties.
//    The destructuring and annotations are always going to be separated by colon (:)
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
