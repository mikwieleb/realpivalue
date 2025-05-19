# PiPrices

Application React de démonstration pour l'authentification avec le **Pi Network SDK** en mode **Sandbox**.

## Objectif

Valider l'étape 7 sur le testnet de Pi Developer Portal : Authentification du Pioneer dans le Pi Browser.

## Technologies utilisées

- React 18
- Pi Network SDK (`https://sdk.minepi.com/pi-sdk.js`)
- Hébergement : Vercel

## Instructions

1. Déployer cette application sur Vercel
2. S'assurer que le lien est bien ouvert dans **Pi Browser**
3. Aller sur : `https://sandbox.minepi.com/app/realpivalue`
4. Le Pi SDK affichera un **code d’authentification**
5. Coller ce code dans l’interface Sandbox de l’app Pi principale
6. L’étape 7 sera validée automatiquement

## Important

- L'App ID utilisé est : `realpivalue`
- Le mode Sandbox est activé dans `pi-sdk.js`
