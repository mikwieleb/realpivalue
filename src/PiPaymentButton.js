// src/PiPaymentButton.js

import React from 'react';

const PiPaymentButton = ({ username }) => {
  const handlePiPayment = async () => {
    if (!window.Pi) {
      alert("Pi SDK non disponible. Utilise le Pi Browser.");
      return;
    }

    const paymentData = {
      amount: 0.001,
      memo: "Paiement test Pi",
      metadata: { user: username },
    };

    await window.Pi.createPayment(paymentData, {
      onReadyForServerApproval: async (paymentId) => {
        await fetch('/api/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paymentId }),
        });
      },
      onReadyForServerCompletion: async (paymentId, txid) => {
        await fetch('/api/complete-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paymentId, txid }),
        });
        alert('Paiement terminé !');
      },
      onCancel: (paymentId) => {
        console.log('Paiement annulé', paymentId);
      },
      onError: (error) => {
        console.error('Erreur paiement Pi :', error);
      },
    });
  };

  return (
    <button onClick={handlePiPayment}>
      Payer 0.001 Pi
    </button>
  );
};

export default PiPaymentButton;
