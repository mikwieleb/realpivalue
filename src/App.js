// src/App.js
import React, { useEffect, useState } from 'react';
import './pi-sdk';

function App() {
  const [piUser, setPiUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initPi = async () => {
      try {
        if (window.Pi) {
          const scopes = ['username', 'payments'];
          const onIncompletePaymentFound = (payment) => {
            console.log('Paiement incomplet détecté :', payment);
          };

          const user = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
          setPiUser(user);
        } else {
          setError("Le SDK Pi n'est pas chargé.");
          console.warn("window.Pi est introuvable.");
        }
      } catch (err) {
        console.error("Erreur d'authentification :", err);
        setError(err.message || "Erreur d'authentification");
      }
    };

    initPi();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Bienvenue sur PiPrices</h1>
      {piUser ? (
        <p>Connecté en tant que : <strong>{piUser.username}</strong></p>
      ) : error ? (
        <p style={{ color: 'red' }}>Erreur : {error}</p>
      ) : (
        <p>Connexion à Pi Network en cours...</p>
      )}
    </div>
  );
}

export default App;
