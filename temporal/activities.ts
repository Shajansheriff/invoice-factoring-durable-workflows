export async function sayHello(name: string): Promise<string> {
    console.log(`[activity] sayHello attempt for ${name}`);
    
    if (Math.random() < 0.6) {
      console.log(`[activity] sayHello FAILED for ${name}`);
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