// Interfaces + Classes = How we get really strong code reuse in TS

// Interfaces - Creates a new type, describing the property names
//  and value types of an object

// Here's an object literal
const oldCivic = {
  name: 'civic',
  year: 2000,
  broken: true
};

// This is not ideal bc we would have to annotate for each new function
//   and it is unwieldy to work with if any more properties are added
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

// 1) Interfaces are created above the functions that use it
// 2) They begin with a capital letter
// 3) They use a generic term (Vehicle not Civic)
interface Vehicle {
  name: string;
  year: number;
  broken: boolean;
}

// Now we can replace the annotation with a reference to the interface
const printVehicle2 = (vehicle: Vehicle): void => {
  console.log(`Name: ${vehicle.name}`);
  console.log(`Year: ${vehicle.year}`);
  console.log(`Broken?: ${vehicle.broken}`);
};

printVehicle2(oldCivic);

// We can use complex data types such as Date for year
//  and we can express functions such as summary inside of our interface
interface Vehicle3 {
  name: string;
  year: Date;
  broken: boolean;
  summary(): string; // function that returns a string
}

// object with property for each type defined in interface
const oldDatsun = {
  name: 'datsun',
  year: new Date(),
  broken: true,
  summary(): string {
    return `Name: ${this.name}`;
  }
};

const printVehicle3 = (vehicle: Vehicle3): void => {
  console.group('Vehicle3 Interface');
  console.log(`Name: ${vehicle.name}`);
  console.log(`Year: ${vehicle.year}`);
  console.log(`Broken?: ${vehicle.broken}`);
  console.log(vehicle.summary());
  console.groupEnd();
};

printVehicle3(oldDatsun);

// Since 'printSummary' is only accessing the 'summary()' property
//  we only need to define that property in the interface.
//  We also further abstract the interface name to 'Reportable'.
//  Saying, "In order to be considered type Reportable,
//  you must have a summary function that returns a string"
interface Reportable {
  summary(): string;
}
const printSummary = (item: Reportable): void => {
  console.group('Reportable Interface');
  console.log(item.summary());
  console.groupEnd();
};

printSummary(oldDatsun);

// Since 'drink2' has a 'summary' function that returns a string...
//  just like 'oldDatsun' has a 'summary' function that returns a string...
//  both objects are considered to be of 'Reportable' types.
const drink2 = {
  color: 'brown',
  carbonated: true,
  sugar: 40,
  summary(): string {
    return `My drink has ${this.sugar} grams of sugar`;
  }
};

// That means we can call printSummary on each of theses very different objects.
printSummary(oldDatsun);
printSummary(drink2);
// We can use an interface to describe the various properties (or shape)
//  of very different objects.
//  This encourages us to write somewhat generic looking functions and interfaces
//  e.g. function name of 'printSummary' rather than 'printVehicleSummary'
//    interface name of 'Reportable' rather than 'Vehicle'

// Interface Reportable is a gatekeeper to 'printSummary'...
// 'oldDatsun' and 'drink2 'must satisfy Reportable interface to work with printSummary

// This mechanic of using an interface for gatekeeping is going to be
//  one of the prime ways we get code reuse from TS.

// ***************************************
// General Strategy for Code Reuse in TS...
//  - Create functions that accept arguments that are typed with interfaces
//  - Objects/classes can decide to 'implement' a given interface to work
//      with a function

// someFunction() implements interface XYZ.
// XYZ is a gatekeeper to someFunction().
// Object1 and Object2 must satisfy the XYZ interface to work with somFunction().

// Rest of the course will focus on defining different interfaces to
//  restrict access to different functions...
//  and then decide how to implement those different interfaces in
//  different objects that we're going to create!

// 1) The goal of an interface is to define a new type
// 2) TS iterates thru all the properties of an interface to make sure the object
//      has the same properties with the same type
