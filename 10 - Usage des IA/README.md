# Salade by Mongoo

Une application web interactive qui propose des recettes de salade personnalisées en fonction de votre humeur du jour.

## Description

Salade by Mongoo est une application web qui utilise l'analyse de sentiment pour créer des recettes de salade personnalisées. L'utilisateur décrit son humeur du jour, et l'application, en utilisant l'IA, propose une recette de salade adaptée à son état d'esprit.

## Installation

1. Clonez le repository :

```bash
git clone [URL_DU_REPO]
```

2. Installez les dépendances :

```bash
cd "10 - Usage des IA"
npm install
```

3. Lancez l'application :
   Ouvrez le fichier `index.html` dans votre navigateur

## Fonctionnement

L'application utilise ml5.js pour analyser le sentiment du texte entré par l'utilisateur. En fonction du score de sentiment obtenu, elle propose différentes combinaisons d'ingrédients :

- Score > 0.75 : Salade énergique (roquette, avocat, concombre)
- Score > 0.4 : Salade équilibrée (laitue, tomate, emmental)
- Score ≤ 0.4 : Salade réconfortante (mâche, olive, œuf)

## Aide

L’analyse des sentiments a été implémentée en utilisant l’exemple fourni par la documentation officielle de **ml5.js** :  
[ml5.js - Sentiment Analysis](https://docs.ml5js.org/#/reference/sentiment)

[Vidéo explicative du rendu](https://youtu.be/IsAicV-UlU0)
