// api/verify-payment.js
const APP_ID = "realpivalue";
const API_KEY = "tpk9grfy1kvj0vlwep4wbqtev5cumfaf4vrcoop5plkanviumkeee67w9g1nixuy"; // Ta clé Sandbox Pi Network

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Méthode non autorisée" });
  }

  const { paymentId } = req.body;

  if (!paymentId) {
    return res.status(400).json({ success: false, message: "paymentId manquant" });
  }

  try {
    const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
      method: "POST",
      headers: {
        "Authorization": `Key ${API_KEY}`,
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();

    if (data.status === "approved") {
      return res.status(200).json({ success: true, message: "Paiement validé ✅", data });
    } else {
      return res.status(400).json({ success: false, message: "Paiement non approuvé", data });
    }
  } catch (error) {
    console.error("Erreur API Pi Network :", error);
    return res.status(500).json({ success: false, message: "Erreur serveur", error: error.message });
  }
}
