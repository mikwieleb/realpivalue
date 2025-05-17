import React from 'react';
import PiPaymentButton from './PiPaymentButton';
import './styles.css';

function App() {
  return (
    <div className="App" style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Bienvenue sur RealPiValue</h1>
      <p>Appuyez sur le bouton ci-dessous pour effectuer un paiement Testnet de 0.001 Pi :</p>
      <PiPaymentButton />
    </div>
  );
}

export default App;
