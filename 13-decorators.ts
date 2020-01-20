function classDecorator(constructor: Function): void {
  console.log(constructor);
}

function parameterDecorator(target: any, key: string, index: number): void {
  console.log(key, index);
}

// method/property decorator
function testDecorator(target: any, key: string): void {
  console.log(key);
}

// decorator factory
function logError(errorMessage: string) {
  return function(target: any, key: string, desc: PropertyDescriptor): void {
    const method = desc.value;

    desc.value = function(): void {
      try {
        method();
      } catch (e) {
        console.log(errorMessage);
      }
    };
  };
}

@classDecorator
class Boat {
  @testDecorator
  color = 'red';

  @testDecorator
  get formattedColor(): string {
    return `This boat's color is ${this.color}`;
  }

  @logError('Something bad!')
  pilot(
    @parameterDecorator speed: string,
    @parameterDecorator generateWake: boolean
  ): void {
    if (speed === 'fast') {
      console.log('swish');
    } else {
      console.log('nothing');
    }
  }
}

new Boat().pilot('fast', true);
