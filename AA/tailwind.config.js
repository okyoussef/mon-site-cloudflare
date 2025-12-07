module.exports = {
  // --- SECTION CLÉS MANQUANTE ---
  content: [
    "./layouts/**/*.html",     // Scanne les layouts et baseof.html (où se trouve la classe 'prose')
    "./content/**/*.md",       // Scanne les fichiers Markdown pour les classes HTML/Tailwind en ligne (comme votre tableau !)
    "./themes/**/*.html",      // S'assure que votre thème 'recettes' est aussi scanné
    "./*.html",
  ],
  // -----------------------------
  theme: {
    extend: {
      // Vous pouvez ajouter des configurations de couleurs, polices ici si besoin
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Maintient le style pour les titres (h2, h3) et paragraphes
  ],
}