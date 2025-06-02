// src/PiPaymentButton.js

import React, { useState } from 'react';
import { initPiSdk } from './pi-sdk';

function PiPaymentButton() {
  const [message, setMessage] = useState("");

  const handlePayment = async () => {
    const Pi = initPiSdk();
    if (!Pi) {
      setMessage("❌ Pi SDK non disponible.");
      return;
    }

    try {
      const scopes = ["username", "payments"];
      const auth = await Pi.authenticate(scopes);
      const username = auth.user.username;

      const paymentData = {
        amount: 0.001,
        memo: "Paiement Test Pi",
        metadata: { user: username }
      };

      const payment = await Pi.createPayment(paymentData, {
        onReadyForServerApproval: async (paymentId) => {
          console.log("Paiement prêt :", paymentId);

          const res = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentId, username })
          });

          const result = await res.json();
          if (result.success) {
            setMessage("✅ Paiement confirmé !");
          } else {
            setMessage("❌ Paiement refusé ou invalide.");
          }
        },
        onCancel: () => {
          setMessage("Paiement annulé.");
        },
        onError: (error) => {
          console.error("Erreur paiement :", error);
          setMessage("Erreur lors du paiement.");
        }
      });

    } catch (err) {
      console.error("Erreur globale :", err);
      setMessage("❌ Échec de l'opération.");
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
