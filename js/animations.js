function initAnimations() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const selectors = [
    '.solution-card',
    '.sector-card',
    '.value-card',
    '.about__feature',
    '.about__metric',
    '.hero__stat',
  ]

  const elements = document.querySelectorAll(selectors.join(', '))

  elements.forEach(function(el) {
    if (el.closest('.clients-carousel')) return

    el.style.opacity    = '0'
    el.style.transform  = 'translateY(32px)'
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'

    const siblings = Array.from(el.parentElement.children)
    const position = siblings.indexOf(el)
    el.style.transitionDelay = (position * 0.1) + 's'
  })

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) return
      if (entry.target.closest('.clients-carousel')) return

      const el = entry.target
      el.style.opacity   = '1'
      el.style.transform = 'translateY(0)'
      observer.unobserve(el)
    })
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px',
  })

  elements.forEach(function(el) {
    if (!el.closest('.clients-carousel')) {
      observer.observe(el)
    }
  })
}

document.addEventListener('DOMContentLoaded', initAnimations)