import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PriceList() {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get('/api/prices'); // endpoint à créer ensuite
        setPrices(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des prix:', error);
      }
    };

    fetchPrices();
  }, []);

  return (
    <div className="container">
      <h2>Local Pi Prices</h2>
      {prices.length === 0 ? (
        <p>No data yet. Be the first to share a price!</p>
      ) : (
        <ul>
          {prices.map((item, index) => (
            <li key={index}>
              {item.product} — {item.amount} Pi ({item.location})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PriceList;
