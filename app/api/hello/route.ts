import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { getTemporalClient } from '@/temporal/client';
import { helloWorkflow } from '@/temporal/workflow';

export async function POST(req: NextRequest) {
  const { name } = await req.json();

  const client = await getTemporalClient();

  const handle = await client.workflow.start(helloWorkflow, {
    taskQueue: 'hello-world',
    workflowId: `hello-${randomUUID().slice(0, 8)}`,
    args: [name],
  });

  // Wait for the workflow to complete and return the result
  const result = await handle.result();

  return NextResponse.json({ result, workflowId: handle.workflowId });
}