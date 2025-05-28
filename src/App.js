// src/App.js

import React, { useEffect, useState } from 'react';
import PiPaymentButton from './PiPaymentButton';
import './pi-sdk';

function App() {
  const [piUser, setPiUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initPi = async () => {
      if (!window.Pi) {
        setError("Pi SDK non détecté");
        return;
      }

      try {
        const scopes = ['payments'];
        const authResult = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
        setPiUser(authResult.user);
        console.log("Utilisateur connecté :", authResult.user);
      } catch (err) {
        setError("Erreur d'authentification");
        console.error(err);
      }
    };

    const onIncompletePaymentFound = (payment) => {
      console.warn('Paiement incomplet détecté :', payment);
    };

    initPi();
  }, []);

  return (
    <div style={{ textAlign: 'center', paddingTop: '100px', background: '#f3e6ff', height: '100vh' }}>
      <h1 style={{ color: '#6b00b3' }}>PiPrices</h1>

      {piUser ? (
        <>
          <p>Connecté en tant que : <strong>@{piUser.username}</strong></p>
          <PiPaymentButton username={piUser.username} />
        </>
      ) : (
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#6b00b3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Se connecter avec Pi
        </button>
      )}

      {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}
    </div>
  );
}

export default App;
