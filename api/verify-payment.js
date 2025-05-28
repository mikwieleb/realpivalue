// api/verify-payment.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Méthode non autorisée" });
  }

  const { paymentId } = req.body;

  if (!paymentId) {
    return res.status(400).json({ success: false, message: "paymentId manquant" });
  }

  try {
    const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}`, {
      method: "GET",
      headers: {
        Authorization: `Key ${process.env.REACT_APP_PI_API_KEY}`,
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();

    if (data.transaction && data.transaction.transaction_id) {
      return res.status(200).json({ success: true, message: "Paiement validé ✅" });
    } else {
      return res.status(400).json({ success: false, message: "Paiement invalide" });
    }
  } catch (error) {
    console.error("Erreur backend :", error);
    return res.status(500).json({ success: false, message: "Erreur serveur" });
  }
}
