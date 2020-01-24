import 'reflect-metadata';

// decorator factory
function markFunction(secretInfo: string) {
  return function(target: Plane, key: string): void {
    Reflect.defineMetadata('secret', secretInfo, target, key);
  };
}

function printMetadata(target: typeof Plane): void {
  for (const key in target.prototype) {
    const secret = Reflect.getMetadata('secret', target.prototype, key);
    console.log(secret);
  }
}

@printMetadata
class Plane {
  color = 'red';

  @markFunction('passing metadata param')
  fly(): void {
    console.log('vrrrr');
  }
}

// const secret = Reflect.getMetadata('secret', Plane.prototype, 'fly');
// console.log(secret);
