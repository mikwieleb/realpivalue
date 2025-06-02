// src/pi-sdk.js

if (typeof window !== 'undefined') {
  // Activer le mode Sandbox AVANT le chargement
  window.__PI_NETWORK_SANDBOX__ = true;

  const isPiBrowser = window?.navigator?.userAgent.includes("PiBrowser");

  if (isPiBrowser && !window.Pi) {
    const script = document.createElement("script");
    script.src = "https://sdk.minepi.com/pi-sdk.js";
    script.async = true;
    document.head.appendChild(script);
  }
}

// Fonction à appeler dans tes composants pour initialiser le SDK
export const initPiSdk = () => {
  if (!window.Pi) {
    console.error("Pi Network SDK non chargé.");
    return null;
  }

  return window.Pi.init({
    version: "2.0",
    sandbox: true,
  });
};
