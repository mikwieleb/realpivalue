import React, { useState } from 'react';
import axios from 'axios';

function AddPriceForm({ onPriceAdded }) {
  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPrice = { product, amount, location };
      await axios.post('/api/prices', newPrice); // API backend à créer
      setProduct('');
      setAmount('');
      setLocation('');
      if (onPriceAdded) onPriceAdded();
    } catch (error) {
      console.error('Erreur lors de l’ajout du prix :', error);
    }
  };

  return (
    <div className="container">
      <h2>Add a Local Pi Price</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product or service"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount in Pi"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          step="0.001"
        />
        <input
          type="text"
          placeholder="Your city or country"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddPriceForm;
