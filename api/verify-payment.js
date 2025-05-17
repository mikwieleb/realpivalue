import { verifyPayment } from './utils';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    const paymentData = req.body;
    const result = await verifyPayment(paymentData);

    if (result.verified) {
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false, error: 'Paiement non vérifié' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
