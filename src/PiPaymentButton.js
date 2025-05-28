// src/PiPaymentButton.js

import React, { useState } from 'react';

function PiPaymentButton({ username }) {
  const [message, setMessage] = useState("");

  const handlePayment = async () => {
    if (!window.Pi) {
      setMessage("Pi SDK non disponible.");
      return;
    }

    const paymentData = {
      amount: 0.001,
      memo: "Paiement Test Pi",
      metadata: { user: username }
    };

    try {
      const payment = await window.Pi.createPayment(paymentData, {
        onReadyForServerApproval: async (paymentId) => {
          console.log("Paiement prêt pour approbation serveur :", paymentId);

          const res = await fetch("/api/verify-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ paymentId })
          });

          const result = await res.json();
          if (result.success) {
            setMessage("✅ Paiement confirmé !");
          } else {
            setMessage("❌ Paiement refusé ou invalide.");
          }
        },
        onCancel: (paymentId) => {
          console.warn("Paiement annulé :", paymentId);
          setMessage("Paiement annulé.");
        },
        onError: (error, payment) => {
          console.error("Erreur lors du paiement :", error, payment);
          setMessage("Erreur lors du paiement.");
        }
      });
    } catch (error) {
      console.error("Erreur d'initiation du paiement :", error);
      setMessage("Échec du lancement du paiement.");
    }
  };

  return (
    <div>
      <button
        onClick={handlePayment}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#6b00b3',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        Payer 0.001 Pi
      </button>
      {message && <p style={{ marginTop: '20px', color: '#333' }}>{message}</p>}
    </div>
  );
}

export default PiPaymentButton;
