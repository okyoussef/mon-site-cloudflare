---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: true

# --- CHAMPS SPÉCIFIQUES À LA RECETTE ---

# Catégories de la recette (Petit dejeuner, Dejeuner, Diner, Snack, Regime)
categories: ["Plat principal"] # Mettez une catégorie par défaut ici si vous voulez

# Tags de la recette (Végétarien, Rapide, Sans gluten)
tags: []

# Type de plat (Entree, Plat principal, Dessert)
plats: ["Plat principal"]

# Temps de préparation (en minutes)
preptime: 0

# Temps de cuisson (en minutes)
cooktime: 0

# Nombre de portions
portions: 0

# Image principale (pour l'Open Graph et le schéma)
image: "/images/recette/{{ .Name }}.jpg"

# --- CHAMPS SEO / OPEN GRAPH ---

# Description courte de la recette (pour Google et partage social)
description: "Une recette facile et rapide à préparer pour toute la famille."
canonicalurl: "" 
---

## Ingrédients (Liste)

* 200g de farine
* 2 oeufs

## Instructions (Étapes)

1. Mélanger les ingrédients secs.
2. Ajouter les ingrédients liquides.
3. Cuire à la poêle.