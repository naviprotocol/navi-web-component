import { Transaction } from '@mysten/sui/transactions';

export async function signTransaction(
  data: { bytes: string; address: string },
  context: {
    client: any;
  },
) {
  const tx = Transaction.from(Buffer.from(data.bytes, 'base64'));
  const resp = await context.client.onSignTransaction(tx);
  return resp;
}


export async function emitEvent(data: any, context: {
  client: any;
}) {
  if (!context.client.events) {
    return;
  }
  context.client.events.emit(data.event, data.data)
}

