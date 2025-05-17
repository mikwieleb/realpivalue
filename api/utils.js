import { Keypair, Server } from 'stellar-sdk';

const server = new Server('https://api.testnet.minepi.com');

export async function verifyPayment(paymentData) {
  const { txid, user_uid } = paymentData;

  try {
    const transaction = await server.transactions().transaction(txid).call();
    const memo = transaction.memo;

    if (memo !== user_uid) return { verified: false };

    const operations = await transaction.operations();

    const paymentOp = operations.records.find(
      (op) =>
        op.type === 'payment' &&
        op.asset_type === 'native' &&
        op.to === process.env.PI_APP_PUBLIC_KEY &&
        parseFloat(op.amount) >= 0.001
    );

    return { verified: !!paymentOp };
  } catch (err) {
    console.error('Erreur lors de la vérification :', err);
    return { verified: false };
  }
}
