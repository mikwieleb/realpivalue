import React, { useEffect, useState } from "react";
import PiPaymentButton from "./PiPaymentButton";
import "./styles.css";
import "./pi-sdk";

function App() {
  const [piUser, setPiUser] = useState(null);

  useEffect(() => {
    const initPi = async () => {
      const Pi = window.Pi;
      if (!Pi) {
        console.error("Pi SDK non disponible");
        return;
      }

      try {
        const scopes = ["username", "payments"];
        const sandbox = true;

        const user = await Pi.authenticate(scopes, onIncompletePaymentFound, { sandbox });
        setPiUser(user);
        console.log("Utilisateur connecté :", user);
      } catch (error) {
        console.error("Erreur d'authentification Pi :", error);
      }
    };

    const onIncompletePaymentFound = (payment) => {
      console.log("Paiement incomplet détecté :", payment);
    };

    initPi();
  }, []);

  return (
    <div className="App">
      <h1>Bienvenue dans RealPiValue</h1>
      {piUser ? (
        <>
          <p>Connecté en tant que : <strong>{piUser.username}</strong></p>
          <PiPaymentButton />
        </>
      ) : (
        <p>Chargement du SDK Pi...</p>
      )}
    </div>
  );
}

export default App;
