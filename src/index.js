import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

// Crée le point d'ancrage React dans l'élément root de index.html
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
