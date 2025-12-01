---
title: "{{ replace .Name "-" " " | title }}"
type: recette  # <--- CRUCIAL : Indique à Hugo d'utiliser le layout /recettes/single.html
date: {{ .Date }}
draft: true

# --- CHAMPS SPÉCIFIQUES À LA RECETTE ---

# Catégories de la recette (Dessert, Gouter, etc.)
categories: ["Dessert"] 

# Tags de la recette (Végétarien, Rapide, Sans gluten)
tags: []

# Type de plat (Entree, Plat principal, Dessert)
plats: ["Dessert"] # Utilise plats pour le champ recipeCategory du schema Recipe

# Temps de préparation (en minutes)
prep_time: "15M" # Format Hugo pour schéma
cook_time: "45M"  # Format Hugo pour schéma
servings: "8 parts"

# --- CHAMPS SCHÉMA RECIPE/SEO ---

h1_override: "{{ replace .Name "-" " " | title }} (Recette)" # Titre h1 si différent de title
description: "Une description experte et SEO optimisée ici."
canonicalurl: "" 

# Note: L'image est mieux gérée par le `recipe_image` pour le schéma
recipe_image: "/images/recette/{{ .Name }}.webp" 

# URL de la vidéo YouTube (ex: https://www.youtube.com/watch?v=XXXXXX)
video: ""  # <--- CHAMP VIDÉO AJOUTÉ ICI

# Agrégation des notes pour le schéma Recipe
rating: 4.8
vote_count: 500
schema_recipe_author: "Chef Galno"


# --- INGRÉDIENTS (DOIT ÊTRE UNE LISTE YAML) ---
ingredients:
  - "200g de Farine"
  - "3 Bananes très mûres"

# --- FAQ (DOIT ÊTRE UNE LISTE YAML) ---
faq:
  - question: "Pourquoi mon Banana Bread est-il trop dense ?"
    answer: "Vérifiez que vous n'avez pas trop mélangé la pâte et que votre levure est fraîche."
  - question: "Puis-je remplacer le beurre par de l'huile ?"
    answer: "Oui, mais cela affectera légèrement la texture et le goût final du pain."

---

## 🍌 Introduction : Le Contexte de la Recette

Rédigez votre introduction ici...

## 💡 Instructions détaillées du Chef

### Étape 1 : Le Mélange Sec
Mélangez la farine, le bicarbonate et le sel.

### Étape 2 : Le Mélange Humide
Mélangez le beurre, le sucre, l'œuf et les bananes écrasées.

### Étape 3 : Cuisson
Enfournez à 180°C pendant 55 minutes.