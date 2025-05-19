import React, { useEffect, useState } from 'react';
import './pi-sdk';

function App() {
  const [piUser, setPiUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initPi = async () => {
      if (!window.Pi) {
        console.error("Pi SDK not loaded");
        return;
      }

      try {
        const scopes = ['username'];
        const onIncompletePaymentFound = (payment) => {
          console.log("Incomplete payment:", payment);
        };

        const authResult = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
        setPiUser(authResult.user);
        console.log("Pi Auth success:", authResult);
      } catch (err) {
        console.error("Pi Auth error:", err);
        setError(err.message);
      }
    };

    initPi();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Bienvenue sur PiPrices</h1>
      {piUser ? (
        <p>Connecté en tant que : <strong>{piUser.username}</strong></p>
      ) : (
        <p>Connexion en cours…</p>
      )}
      {error && <p style={{ color: 'red' }}>Erreur : {error}</p>}
    </div>
  );
}

export default App;
