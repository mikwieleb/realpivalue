import React from "react";

const PiPaymentButton = ({ accessToken }) => {
  const handlePayment = async () => {
    const paymentData = {
      amount: 0.001,
      memo: "Paiement test RealPiValue",
      metadata: { type: "test", user: "realpivalue" }
    };

    try {
      const payment = await window.Pi.createPayment(paymentData, {
        onReadyForServerApproval: async (paymentId) => {
          console.log("Ready for server approval:", paymentId);
          // Appeler votre backend ici si nécessaire
        },
        onReadyForServerCompletion: async (paymentId, txid) => {
          console.log("Ready for server completion:", paymentId, txid);
          // Valider la transaction côté serveur si besoin
        },
        onCancel: (paymentId) => {
          console.log("Paiement annulé :", paymentId);
        },
        onError: (error, payment) => {
          console.error("Erreur de paiement :", error, payment);
        },
      });

      console.log("Paiement lancé :", payment);
    } catch (error) {
      console.error("Erreur lors du lancement du paiement :", error);
    }
  };

  return (
    <button onClick={handlePayment} style={{ marginTop: "20px" }}>
      Payer 0.001 Pi
    </button>
  );
};

export default PiPaymentButton;
