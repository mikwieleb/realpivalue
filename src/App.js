// src/App.js

import React from 'react';
import PiPaymentButton from './PiPaymentButton';
import './pi-sdk';

function App() {
  const openApp = () => {
    window.location.href = "https://realpivalue.vercel.app";
  };

  return (
    <div style={{ textAlign: 'center', paddingTop: '100px', background: '#f3e6ff', minHeight: '100vh' }}>
      <h1 style={{ color: '#6b00b3' }}>RealPiValue</h1>

      <img
        src="https://upload.wikimedia.org/wikipedia/commons/9/91/Pi_Logo.png"
        alt="Pi Logo"
        style={{ width: '80px', margin: '20px auto' }}
      />

      <PiPaymentButton />

      <button
        onClick={openApp}
        style={{
          marginTop: '30px',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#ddd',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Ouvrir l'application
      </button>
    </div>
  );
}

export default App;
