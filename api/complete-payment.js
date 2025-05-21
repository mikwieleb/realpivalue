// api/complete-payment.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { paymentId, txid } = req.body;

  console.log("Paiement complété :", paymentId, "Transaction ID :", txid);

  // Ici, tu peux marquer la commande comme payée, stocker dans la base, etc.
  // Pour le testnet, on valide simplement

  return res.status(200).json({ message: 'Paiement complété côté serveur' });
}
