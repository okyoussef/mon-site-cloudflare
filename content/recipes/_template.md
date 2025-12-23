---
title: "TITRE DE VOTRE RECETTE ICI"
date: 2025-01-01
slug: "url-optimisee-seo"
description: "Une description accrocheuse pour Google et les réseaux sociaux (150-160 caractères)."
image: "/images/votre-image-16x9.jpg" # Image principale
categories: ["Type de Plat"]
tags: ["ingrédient", "spécificité"]
draft: true # Mettre à 'false' pour publier

# --- DONNÉES STRUCTURÉES (SCHEMA.ORG & CARTE RECETTE) ---
recipe:
  author: "Sarah Baker"
  cuisine: "Française / Américaine"
  course: "Dessert / Petit Déj"
  yield: "8 parts"
  
  # TEMPS (Format double pour compatibilité Google)
  # ISO format: PT1H = 1 Heure, PT30M = 30 Minutes
  time:
    prep_human: "15 mins"
    prep_iso: "PT15M"
    cook_human: "45 mins"
    cook_iso: "PT45M"
    total_human: "1 hr"
    total_iso: "PT1H"
  
  # NUTRITION (Estimation)
  nutrition:
    calories: "300 kcal"
    fat: "12g"
    sugar: "15g"
    protein: "5g"

  # INGRÉDIENTS (Liste simple)
  ingredients:
    - "250g de Farine"
    - "3 Bananes mûres"
    - "100g de Sucre"

  # INSTRUCTIONS (Liste structurée)
  instructions:
    - name: "Préparation"
      text: "Préchauffez le four à 180°C."
      image: "" 
    - name: "Mélange"
      text: "Mélangez les ingrédients secs et humides séparément."
      image: ""
    - name: "Cuisson"
      text: "Enfournez pendant 45 minutes."
      image: ""

  # VIDÉO (Optionnel : Mettre enable: false si pas de vidéo)
  video:
    enable: false
    name: "Titre de la vidéo"
    description: "Description courte"
    uploadDate: "2025-01-01"
    thumbnailUrl: "/images/thumb.jpg"
    contentUrl: "https://youtube.com/..."
    embedUrl: "https://youtube.com/embed/..."

# --- FAQ (Questions Fréquentes pour SEO) ---
faq:
  - question: "Peut-on congeler ce gâteau ?"
    answer: "Oui, tout à fait..."
  - question: "Par quoi remplacer le beurre ?"
    answer: "Vous pouvez utiliser de l'huile ou de la compote."
---

# Introduction

Écrivez ici l'histoire de votre recette, pourquoi elle est géniale, etc.

## Les Ingrédients Clés

Expliquez le choix des ingrédients...

# La Recette

{{< recipe-card >}}

## Conseils du Chef

*   **Conseil 1:** ...
*   **Conseil 2:** ...
