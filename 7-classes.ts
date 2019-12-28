// Classes are a blueprint to create an object with some
//   fields (values) and methods (functions) to represent a 'thing'.

// In TS we can use modifiers...
// The goal of modifiers is to restrict access to different functions
//  or different variables

// public - This method can be called any where, any time
// private - This method can only be called by other methods in this class
// protected - This method can be called by other methods in this class,
//               or by other methods in child classes

// Step 1 - Methods (functions)
// Step 2 - Fields (values)

// Fields - either we initialize a property on the same line,
//            or we initialize in the constructor

class Vehicle4 {
  // color: string = 'red';
  color: string;

  constructor(color: string) {
    this.color = color;
  }

  protected honk(): void {
    console.log('beep');
  }
}

// Here's a shorthand for creating a public field like above
class Vehicle5 {
  constructor(public color: string) {}

  protected honk(): void {
    console.log('beep');
  }
}

// We don't actually call methods on the class directly.
// Usually we create an instance with the 'new' keyword and call
//  methods off of that object.

const vehicle5 = new Vehicle5('orange');
console.log(vehicle5.color);
// vehicle5.drive();
// vehicle5.honk();

// Next we create a Car class
//  We do not use public keyword for 'color' bc we are not creating a
//  new 'color' field for Car5. We are referencing 'color' in Vehicle5
class Car5 extends Vehicle5 {
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

const car5 = new Car5(4, 'red');
car5.startDrivingProcess();
console.log(car5.color);
// car5.honk();
