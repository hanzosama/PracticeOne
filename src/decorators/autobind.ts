//Autobind Decorator
export function Autobind(_t: any, _mn: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
      configurable: true,
      get() {
        const boundFunc = originalMethod.bind(this);
        return boundFunc;
      },
    };
    return adjDescriptor;
  }