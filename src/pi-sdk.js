// src/pi-sdk.js

if (typeof window !== 'undefined') {
  // Active le mode sandbox pour le testnet
  window.__PI_NETWORK_SANDBOX__ = true;

  const isPiBrowser = window?.navigator?.userAgent.includes('PiBrowser');
  if (isPiBrowser && !window.Pi) {
    const script = document.createElement('script');
    script.src = 'https://sdk.minepi.com/pi-sdk.js';
    script.async = true;
    document.head.appendChild(script);
  }
}
