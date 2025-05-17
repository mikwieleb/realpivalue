// src/pi-sdk.js

window.__PI_NETWORK_SANDBOX__ = true; // Active le mode sandbox Pi Testnet

if (typeof window !== 'undefined') {
  const isPiBrowser = window?.navigator?.userAgent.includes('PiBrowser');
  if (isPiBrowser && !window.Pi) {
    const script = document.createElement('script');
    script.src = 'https://sdk.minepi.com/pi-sdk.js';
    script.async = true;
    document.head.appendChild(script);
  }
}
