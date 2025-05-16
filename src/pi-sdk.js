// Initialise le SDK Pi avec ton App ID depuis les variables d’environnement

const appId = process.env.REACT_APP_PI_APP_ID;

if (window.Pi) {
  window.Pi.init({ version: "2.0", appId });
  console.log("Pi SDK initialisé avec l'appId :", appId);
} else {
  console.warn("Pi SDK non disponible (hors de l'application Pi Network)");
}
