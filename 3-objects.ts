// Rather than setting a function equal to a property
// We are using ES2015 syntax of defining a method inside an object
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

// ES5
// const age = profile.age;

// ES2015 object destructuring - no annotation
// const { age } = profile;

// if we need to annotate bc of one of the 3 reasons...
//  then we need to annotate the structure of the whole property,
//  not just the value...

// const { age }: number = profile; -- wrong!
// const { age }: { age: number } = profile; -- right!

const { age, firstName }: { age: number; firstName: string } = profile;

// ES2015 object destructuring - no annotation
// const { coords: { lat, lng } } = profile;

// ES2015 object destructuring with annotation
const {
  coords: { lat, lng }
}: { coords: { lat: number; lng: number } } = profile;
