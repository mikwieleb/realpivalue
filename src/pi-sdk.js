// src/pi-sdk.js

if (typeof window !== 'undefined') {
  // Active le mode sandbox AVANT de charger le SDK
  window.__PI_NETWORK_SANDBOX__ = true;

  const isPiBrowser = window?.navigator?.userAgent.includes('PiBrowser');
  if (isPiBrowser && !window.Pi) {
    const script = document.createElement('script');
    script.src = 'https://sdk.minepi.com/pi-sdk.js';
    script.async = true;
    script.onload = () => {
      console.log('Pi SDK chargé avec succès');
    };
    document.head.appendChild(script);
  }
}
