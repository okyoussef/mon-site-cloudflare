document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    let recipes = [];

    // 1. Charger les données (le fichier index.json généré par Hugo)
    // Assure-toi que ton hugo.toml a bien [outputs] home = ["HTML", "RSS", "JSON"]
    fetch('/index.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur chargement JSON");
            }
            return response.json();
        })
        .then(data => {
            recipes = data;
            console.log("Recettes chargées :", recipes.length);
        })
        .catch(error => console.error("Erreur Search:", error));

    // 2. Écouter la frappe
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const term = e.target.value.toLowerCase();
            searchResults.innerHTML = ''; // Vider les anciens résultats
            
            // On cache si moins de 2 lettres
            if (term.length < 2) {
                searchResults.classList.add('hidden');
                return;
            }

            // 3. Filtrer les recettes (Par Titre ou Catégorie)
            const filtered = recipes.filter(recipe => 
                (recipe.title && recipe.title.toLowerCase().includes(term)) ||
                (recipe.category && recipe.category.toLowerCase().includes(term))
            );

            // 4. Afficher les résultats
            if (filtered.length > 0) {
                searchResults.classList.remove('hidden');
                
                // On affiche max 5 résultats
                filtered.slice(0, 5).forEach(recipe => {
                    const item = document.createElement('a');
                    item.href = recipe.url; // Le lien vers l'article
                    item.className = "block px-4 py-3 border-b border-gray-100 hover:bg-gray-50 flex items-center transition duration-150";
                    
                    // Image (si dispo) + Texte
                    let imageHTML = recipe.image ? `<img src="${recipe.image}" class="w-12 h-12 rounded object-cover mr-3 border border-gray-200">` : '';
                    
                    item.innerHTML = `
                        ${imageHTML}
                        <div>
                            <div class="font-bold text-gray-800 text-sm">${recipe.title}</div>
                            <div class="text-xs text-brand font-semibold uppercase tracking-wide">${recipe.category || 'Recette'}</div>
                        </div>
                    `;
                    searchResults.appendChild(item);
                });
            } else {
                // Pas de résultat
                searchResults.classList.remove('hidden');
                searchResults.innerHTML = `<div class="px-4 py-3 text-sm text-gray-500">Aucune recette trouvée pour "${term}"</div>`;
            }
        });

        // 5. Cacher si on clique ailleurs sur la page
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.classList.add('hidden');
            }
        });
    }
});