// Fichier: tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./themes/recettes/layouts/**/*.html",  // Templates de votre thème
    "./layouts/**/*.html",                 // Layouts locaux
    "./content/**/*.md",                   // Contenu (recettes)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}