// src/PiPaymentButton.js

import React, { useState } from 'react';
import '../src/styles.css'; // ou adapte selon ton style
import './pi-sdk';

function PiPaymentButton() {
  const [status, setStatus] = useState('');

  const handlePiPayment = async () => {
    if (!window.Pi) {
      alert('Le SDK Pi n’est pas chargé. Utilise le Pi Browser.');
      return;
    }

    const payment = await window.Pi.createPayment({
      amount: 0.001,
      memo: 'Paiement test pour RealPiValue',
      metadata: { type: 'test', purpose: 'validation étape 11' },
    });

    if (!payment || !payment.transaction) {
      setStatus('Erreur pendant le paiement.');
      return;
    }

    try {
      const res = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          txid: payment.transaction.txid,
          user_uid: payment.user.uid,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus('Paiement vérifié avec succès !');
      } else {
        setStatus('Paiement non vérifié.');
      }
    } catch (err) {
      console.error(err);
      setStatus('Erreur côté serveur.');
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <button onClick={handlePiPayment}>Payer 0.001 Pi</button>
      <p>{status}</p>
    </div>
  );
}

export default PiPaymentButton;
