import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { getTemporalClient } from '@/temporal/client';
import { helloWorkflow } from '@/temporal/workflow';
import { WorkflowFailedError } from '@temporalio/client';

export async function POST(req: NextRequest) {
  const { name } = await req.json();

  const client = await getTemporalClient();

  const handle = await client.workflow.start(helloWorkflow, {
    taskQueue: 'hello-world',
    workflowId: `hello-${randomUUID().slice(0, 8)}`,
    args: [name],
  });

  try {
    const result = await handle.result();
    return NextResponse.json({ result, workflowId: handle.workflowId });
  } catch (err) {
    if (err instanceof WorkflowFailedError) {
      // Walk to the root cause to get the original thrown error
      let cause: any = err.cause;
      while (cause?.cause) cause = cause.cause;
      
      return NextResponse.json(
        {
          error: 'Workflow failed',
          type: cause?.type ?? 'Unknown',
          message: cause?.message ?? 'Unknown error',
          workflowId: handle.workflowId,
        },
        { status: 400 }
      );
    }
    throw err;
  }
}