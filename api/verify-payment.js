// api/verify-payment.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { paymentId } = req.body;

  console.log("Vérification du paiement :", paymentId);

  // Ici, normalement, tu peux valider avec la clé API ou base de données
  // Dans ce test, on suppose que tout est OK

  return res.status(200).json({ message: 'Paiement vérifié côté serveur' });
}
