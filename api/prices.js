let prices = []; // Stockage temporaire en mémoire (sera réinitialisé à chaque déploiement)

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { product, amount, location } = req.body;

    if (!product || !amount || !location) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    prices.push({ product, amount, location });
    return res.status(201).json({ message: 'Price added successfully' });
  }

  if (req.method === 'GET') {
    return res.status(200).json(prices);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
