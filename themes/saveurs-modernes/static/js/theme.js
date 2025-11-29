// ========================================
// theme.js - Fonctionnalités JavaScript
// ========================================

(function() {
  'use strict';

  // ========================================
  // Mode Sombre/Clair
  // ========================================
  
  const themeToggle = {
    init() {
      const savedTheme = localStorage.getItem('theme') || 'light';
      document.documentElement.setAttribute('data-theme', savedTheme);
      
      const toggleBtn = document.querySelector('.theme-toggle');
      if (toggleBtn) {
        toggleBtn.addEventListener('click', this.toggle.bind(this));
      }
    },
    
    toggle() {
      const current = document.documentElement.getAttribute('data-theme');
      const newTheme = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    }
  };

  // ========================================
  // Recherche de Recettes
  // ========================================
  
  const recipeSearch = {
    init() {
      const searchForm = document.querySelector('.search-form');
      if (!searchForm) return;
      
      searchForm.addEventListener('submit', this.handleSearch.bind(this));
    },
    
    async handleSearch(e) {
      e.preventDefault();
      const query = e.target.querySelector('input').value.toLowerCase();
      
      try {
        const response = await fetch('/index.json');
        const recipes = await response.json();
        const results = recipes.filter(recipe => 
          recipe.title.toLowerCase().includes(query) ||
          (recipe.tags && recipe.tags.some(tag => tag.toLowerCase().includes(query))) ||
          (recipe.categories && recipe.categories.some(cat => cat.toLowerCase().includes(query)))
        );
        
        this.displayResults(results, query);
      } catch (error) {
        console.error('Erreur de recherche:', error);
      }
    },
    
    displayResults(results, query) {
      window.location.href = `/search/?q=${encodeURIComponent(query)}`;
    }
  };

  // ========================================
  // Filtres de Recettes
  // ========================================
  
  const recipeFilters = {
    init() {
      const filterButtons = document.querySelectorAll('[data-filter]');
      filterButtons.forEach(btn => {
        btn.addEventListener('click', this.filter.bind(this));
      });
    },
    
    filter(e) {
      const filterValue = e.target.dataset.filter;
      const cards = document.querySelectorAll('.recipe-card');
      
      cards.forEach(card => {
        if (filterValue === 'all') {
          card.style.display = 'block';
        } else {
          const cardCategories = card.dataset.categories || '';
          card.style.display = cardCategories.includes(filterValue) ? 'block' : 'none';
        }
      });
      
      // Update active state
      document.querySelectorAll('[data-filter]').forEach(btn => {
        btn.classList.remove('active');
      });
      e.target.classList.add('active');
    }
  };

  // ========================================
  // Partage Social
  // ========================================
  
  const socialShare = {
    init() {
      const shareBtn = document.querySelector('.share-btn');
      if (!shareBtn) return;
      
      shareBtn.addEventListener('click', this.share.bind(this));
    },
    
    async share() {
      const title = document.querySelector('.recipe-title')?.textContent || '';
      const url = window.location.href;
      
      if (navigator.share) {
        try {
          await navigator.share({
            title: title,
            url: url
          });
        } catch (error) {
          console.log('Partage annulé');
        }
      } else {
        this.fallbackShare(url);
      }
    },
    
    fallbackShare(url) {
      const shareOptions = document.createElement('div');
      shareOptions.className = 'share-options';
      shareOptions.innerHTML = `
        <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}" target="_blank" rel="noopener">Facebook</a>
        <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}" target="_blank" rel="noopener">Twitter</a>
        <a href="https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}" target="_blank" rel="noopener">Pinterest</a>
        <button onclick="navigator.clipboard.writeText('${url}')">Copier le lien</button>
      `;
      
      document.body.appendChild(shareOptions);
      
      setTimeout(() => shareOptions.remove(), 5000);
    }
  };

  // ========================================
  // Animation au Scroll
  // ========================================
  
  const scrollAnimation = {
    init() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      }, {
        threshold: 0.1
      });
      
      document.querySelectorAll('.recipe-card, .info-card').forEach(el => {
        observer.observe(el);
      });
    }
  };

  // ========================================
  // Gestion des Ingrédients (Checkboxes)
  // ========================================
  
  const ingredientCheckboxes = {
    init() {
      const checkboxes = document.querySelectorAll('.ingredient-checkbox');
      
      // Restaurer l'état depuis localStorage
      checkboxes.forEach((checkbox, index) => {
        const savedState = localStorage.getItem(`ingredient-${window.location.pathname}-${index}`);
        if (savedState === 'checked') {
          checkbox.checked = true;
        }
        
        checkbox.addEventListener('change', (e) => {
          const state = e.target.checked ? 'checked' : 'unchecked';
          localStorage.setItem(`ingredient-${window.location.pathname}-${index}`, state);
        });
      });
    }
  };

  // ========================================
  // Lazy Loading Images
  // ========================================
  
  const lazyLoadImages = {
    init() {
      if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
          img.src = img.dataset.src || img.src;
        });
      } else {
        // Fallback pour navigateurs plus anciens
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
      }
    }
  };

  // ========================================
  // Smooth Scroll
  // ========================================
  
  const smoothScroll = {
    init() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            e.preventDefault();
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      });
    }
  };

  // ========================================
  // Menu Mobile
  // ========================================
  
  const mobileMenu = {
    init() {
      const menuToggle = document.querySelector('.menu-toggle');
      const mainNav = document.querySelector('.main-nav');
      
      if (!menuToggle || !mainNav) return;
      
      menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', 
          mainNav.classList.contains('active'));
      });
    }
  };

  // ========================================
  // Performance Monitoring
  // ========================================
  
  const performanceMonitor = {
    init() {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            console.log('Performance:', entry.name, entry.duration);
          }
        });
        
        observer.observe({ entryTypes: ['measure'] });
      }
    }
  };

  // ========================================
  // Initialisation
  // ========================================
  
  const app = {
    init() {
      // DOM Ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', this.ready.bind(this));
      } else {
        this.ready();
      }
    },
    
    ready() {
      themeToggle.init();
      recipeSearch.init();
      recipeFilters.init();
      socialShare.init();
      scrollAnimation.init();
      ingredientCheckboxes.init();
      lazyLoadImages.init();
      smoothScroll.init();
      mobileMenu.init();
      
      // Performance monitoring en dev seulement
      if (window.location.hostname === 'localhost') {
        performanceMonitor.init();
      }
      
      console.log('🍳 Thème Saveurs Modernes initialisé');
    }
  };

  // Lancer l'application
  app.init();

})();