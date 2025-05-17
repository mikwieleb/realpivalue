import React, { useEffect, useState } from "react";
import "./styles.css";
import PiPaymentButton from "./PiPaymentButton";
import "./pi-sdk";

function App() {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const isPiBrowser = window?.navigator?.userAgent.includes("PiBrowser");

    if (isPiBrowser && window.Pi) {
      window.Pi.authenticate(["username", "payments"], onLoginSuccess, onLoginFailure);
    } else {
      console.log("Not running inside Pi Browser.");
    }

    function onLoginSuccess(authData) {
      console.log("Pi Auth success:", authData);
      setUser(authData.user);
      setAccessToken(authData.accessToken);
    }

    function onLoginFailure(error) {
      console.error("Pi Auth failed:", error);
    }
  }, []);

  return (
    <div className="App">
      <h1>Bienvenue sur Realpivalue</h1>

      {!user ? (
        <p>Connexion à Pi en cours...</p>
      ) : (
        <>
          <p>Connecté en tant que : <strong>{user.username}</strong></p>
          <PiPaymentButton accessToken={accessToken} />
        </>
      )}
    </div>
  );
}

export default App;
