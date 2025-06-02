// api/verify-payment.js

const APP_ID = "realpivalue";
const API_KEY = "tpk9grfy1kvj0vlwep4wbqtev5cumfaf4vrcoop5plkanviumkeee67w9g1nixuy"; // Backend uniquement

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Méthode non autorisée" });
  }

  const { paymentId, username } = req.body;

  if (!paymentId || !username) {
    return res.status(400).json({ success: false, message: "paymentId ou username manquant" });
  }

  try {
    const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
      method: "POST",
      headers: {
        "Authorization": `Key ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        appId: APP_ID,
        userUid: username
      })
    });

    const data = await response.json();

    if (data.identifier === paymentId || data.txid) {
      return res.status(200).json({ success: true, message: "Paiement validé ✅" });
    } else {
      return res.status(400).json({ success: false, message: "Paiement non confirmé" });
    }
  } catch (error) {
    console.error("Erreur de vérification paiement :", error);
    return res.status(500).json({ success: false, message: "Erreur serveur" });
  }
}
