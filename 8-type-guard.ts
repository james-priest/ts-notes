// Type guards allow methods on a type to become available
// Without type guards, only the methods in common for the union
//  would be usable
// Primitive type = uses 'typeof'  - number, string, boolean, symbol
// Every other type = uses 'instanceof'

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
  