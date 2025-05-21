// src/App.js

import React, { useEffect, useState } from 'react';
import './pi-sdk'; // Important pour charger le SDK en sandbox

function App() {
  const [piUser, setPiUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initPi = async () => {
      if (window.Pi) {
        try {
          const scopes = ['username'];
          const onIncompletePaymentFound = (payment) => {
            console.log('Paiement incomplet détecté :', payment);
          };

          const user = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
          setPiUser(user);
          console.log('Utilisateur Pi connecté :', user);
        } catch (err) {
          console.error('Erreur d\'authentification Pi :', err);
          setError(err.message);
        }
      } else {
        console.warn('Le SDK Pi n\'est pas encore chargé.');
      }
    };

    initPi();
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1>Bienvenue sur PiPrices</h1>
      {piUser ? (
        <p>Connecté en tant que : <strong>@{piUser.username}</strong></p>
      ) : error ? (
        <p style={{ color: 'red' }}>Erreur : {error}</p>
      ) : (
        <p>Connexion en cours...</p>
      )}
    </div>
  );
}

export default App;
