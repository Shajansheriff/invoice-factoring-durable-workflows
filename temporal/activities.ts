
export class InvalidNameError extends Error {
    constructor(msg: string) {
      super(msg);
      this.name = 'InvalidNameError';
    }
  }

export async function sayHello(name: string): Promise<string> {
  console.log(`[activity] sayHello attempt for "${name}"`);
  
  // Permanent failure — bad input, retrying won't help
  if (!name || name.trim() === '') {
    console.log(`[activity] sayHello PERMANENT FAILURE: empty name`);
    throw new InvalidNameError('Name cannot be empty');
  }
  
  // Transient failure — network hiccup, retrying might help
  if (Math.random() < 0.6) {
    console.log(`[activity] sayHello TRANSIENT FAILURE for ${name}`);
    throw new Error('Random transient failure');
  }
  
  console.log(`[activity] sayHello SUCCEEDED for ${name}`);
  return `Hello, ${name}!`;
}
  
  export async function getTimeOfDayGreeting(): Promise<string> {
    console.log(`[activity] getTimeOfDayGreeting called`);
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }