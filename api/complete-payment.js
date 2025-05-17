import { Keypair, Server, TransactionBuilder, Networks, Operation } from 'stellar-sdk';

const server = new Server('https://api.testnet.minepi.com');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { paymentId, txid } = req.body;

  try {
    // Récupère la transaction
    const transaction = await server.transactions().transaction(txid).call();

    // Vérifie que la transaction existe bien
    if (!transaction) {
      return res.status(400).json({ error: "Transaction introuvable" });
    }

    // Crée une signature ou logique côté serveur (factice ici)
    console.log("Transaction validée côté serveur :", txid, "pour paymentId :", paymentId);

    // Tu peux aussi stocker cette confirmation dans une base de données ici

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Erreur server completion :", error);
    res.status(500).json({ error: error.message });
  }
}
