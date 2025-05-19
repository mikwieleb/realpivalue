if (typeof window !== 'undefined') {
  window.__PI_NETWORK_SANDBOX__ = true;

  if (!window.Pi) {
    const script = document.createElement('script');
    script.src = 'https://sdk.minepi.com/pi-sdk.js';
    script.async = true;
    document.head.appendChild(script);
  }
}
