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
            console.log('Paiement incomplet trouvé:', payment);
          };

          const user = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
          setPiUser(user);
        } else {
          console.log("Pi SDK non initialisé");
          setError("Pi SDK non initialisé");
        }
      } catch (err) {
        console.error("Erreur d'authentification Pi :", err);
        setError(err.message);
      }
    };

    initPi();
  }, []);

  return (
    <div>
      <h1>Bienvenue dans PiPrices</h1>
      {piUser ? (
        <p>Connecté en tant que : {piUser.username}</p>
      ) : error ? (
        <p>Erreur : {error}</p>
      ) : (
        <p>Connexion en cours...</p>
      )}
    </div>
  );
}

export default App;
