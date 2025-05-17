// src/PiPaymentButton.js

import React from "react";

const PiPaymentButton = () => {
  const handlePayment = async () => {
    const Pi = window.Pi;

    if (!Pi) {
      console.error("Pi SDK non chargé.");
      return;
    }

    try {
      const paymentData = {
        amount: 0.001,
        memo: "Paiement test RealPiValue",
        metadata: { paymentId: "realpivalue-test-001" },
      };

      const callbacks = {
        onReadyForServerApproval: (paymentId) => {
          console.log("Prêt pour approbation serveur :", paymentId);
        },
        onReadyForServerCompletion: (paymentId, txid) => {
          console.log("Prêt pour finalisation serveur :", paymentId, txid);
        },
        onCancel: (paymentId) => {
          console.log("Paiement annulé :", paymentId);
        },
        onError: (error, payment) => {
          console.error("Erreur de paiement :", error, payment);
        },
      };

      await Pi.createPayment(paymentData, callbacks, { sandbox: true });
    } catch (error) {
      console.error("Erreur lors du paiement :", error);
    }
  };

  return (
    <button onClick={handlePayment}>
      Payer 0.001 Pi
    </button>
  );
};

export default PiPaymentButton;
