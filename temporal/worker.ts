import { Worker } from '@temporalio/worker';
import * as activities from './activities';

async function run() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('./workflow'),
    activities,
    taskQueue: 'hello-world',
  });

  console.log('Worker started on task queue: hello-world');
  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});