// ============================================================
// parallax.js — Riskmind
// Efeito parallax suave no hero
// ============================================================

function initParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Não aplica em mobile — parallax em touch fica estranho
  if (window.innerWidth < 768) return;

  const hero        = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero__content');
  const heroVisual  = document.querySelector('.hero__visual');

  if (!hero) return;

  function onScroll() {
    const scrollY      = window.scrollY;
    const heroHeight   = hero.offsetHeight;

    // Só aplica enquanto o hero está visível
    if (scrollY > heroHeight) return;

    // O conteúdo sobe mais devagar que o scroll — fator 0.3
    const contentOffset = scrollY * 0.3;

    // O card visual sobe ainda mais devagar — fator 0.15
    // Cria a sensação de profundidade entre as duas camadas
    const visualOffset  = scrollY * 0.15;

    if (heroContent) {
      heroContent.style.transform = 'translateY(' + contentOffset + 'px)';
    }

    if (heroVisual) {
      heroVisual.style.transform = 'translateY(' + visualOffset + 'px)';
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
}

document.addEventListener('DOMContentLoaded', initParallax);