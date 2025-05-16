import React, { useEffect, useState } from 'react';
import './styles.css';
import './pi-sdk';
import AddPriceForm from './AddPriceForm';
import PriceList from './PriceList';

function App() {
  const [username, setUsername] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const connectWithPi = async () => {
      if (window?.Pi) {
        try {
          const scopes = ['username'];
          const result = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
          setUsername(result.user.username);
        } catch (error) {
          console.error('Erreur de connexion Pi:', error);
        }
      }
    };

    const onIncompletePaymentFound = (payment) => {
      console.log('Paiement incomplet détecté :', payment);
    };

    connectWithPi();
  }, []);

  const handlePriceAdded = () => {
    setRefresh(!refresh); // force la mise à jour de la liste
  };

  return (
    <div className="container">
      <h1>PiPrices</h1>
      <p>Know the real-world value of Pi in your region.</p>

      {username ? (
        <>
          <p>Welcome, @{username}!</p>
          <AddPriceForm onPriceAdded={handlePriceAdded} />
          <PriceList key={refresh} />
        </>
      ) : (
        <button
          onClick={() => window?.Pi && window.Pi.authenticate(['username'], () => {})}
        >
          Connect with Pi
        </button>
      )}
    </div>
  );
}

export default App;
