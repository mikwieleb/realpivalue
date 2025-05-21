// src/App.js

import React, { useEffect, useState } from 'react';
import PiPaymentButton from './PiPaymentButton';
import './pi-sdk';

function App() {
  const [piUser, setPiUser] = useState(null);

  useEffect(() => {
    const initPi = async () => {
      if (!window.Pi) return;

      try {
        const scopes = ['username'];
        const authResult = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
        setPiUser(authResult.user);
        console.log("Utilisateur connecté :", authResult.user);
      } catch (error) {
        console.error("Erreur d'authentification :", error);
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
      <p>Connecté en tant que : <strong>{piUser?.username || "non connecté"}</strong></p>

      {piUser ? (
        <PiPaymentButton username={piUser.username} />
      ) : (
        <button onClick={() => window.location.reload()}>
          Connect with Pi
        </button>
      )}
    </div>
  );
}

export default App;
