import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Activer le mode sandbox
window.__PI_NETWORK_SANDBOX__ = true;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
