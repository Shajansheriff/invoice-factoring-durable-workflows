import { proxyActivities } from '@temporalio/workflow';
import * as activities from './activities';

const { sayHello, getTimeOfDayGreeting } = proxyActivities<typeof activities>({
  startToCloseTimeout: '10 seconds',
  retry: {
    initialInterval: '1 second',
    backoffCoefficient: 2,
    maximumAttempts: 10,
    nonRetryableErrorTypes: [activities.InvalidNameError.name]
  },
});

export async function helloWorkflow(name: string): Promise<string> {
  const greeting = await getTimeOfDayGreeting()
  const hello =  await sayHello(name);

  return `${greeting}! ${hello} `
}